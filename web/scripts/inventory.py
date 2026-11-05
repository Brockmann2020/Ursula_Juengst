"""Inventory tracked legacy pages, media paths and translation collisions."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from subprocess import check_output
from urllib.parse import unquote, urlsplit
import json
import posixpath
import re

ROOT = Path(__file__).resolve().parents[2]
HOSTS = {"www.ursula-juengst.com", "ursula-juengst.com"}
MEDIA = re.compile(r"\.(?:jpe?g|jfif|png|gif|webp|avif|svg|ico|pdf|mp4|m4v|mov|webm|woff2?|ttf|otf)$", re.I)
CSS_URL = re.compile(r"url\(\s*['\"]?([^)'\"]+)", re.I)
HELPERS = {"website_shared_header.html", "website_shared_footer.html"}


class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = Counter()
        self.urls = set()

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if not value:
                continue
            if key == "id":
                self.ids[value] += 1
            if key in {"src", "href", "poster"}:
                self.urls.add(value)


def media_entry(url, parent):
    if url.startswith("data:"):
        return None
    parts = urlsplit(url)
    if not MEDIA.search(unquote(parts.path)):
        return None
    kind = Path(parts.path).suffix.lower()[1:]
    if parts.hostname and parts.hostname not in HOSTS:
        return {"url": url, "type": kind, "status": "external"}
    path = unquote(parts.path)
    relative = posixpath.normpath(path.lstrip("/") if path.startswith("/") else f"{parent}/{path}")
    if relative.startswith("../"):
        return {"url": url, "type": kind, "status": "outside-checkout"}
    current = ROOT
    status = "present"
    for segment in relative.split("/"):
        if not current.is_dir():
            status = "missing"
            break
        names = {item.name for item in current.iterdir()}
        if segment not in names:
            status = "case-mismatch" if any(name.casefold() == segment.casefold() for name in names) else "missing"
            break
        current /= segment
    if status == "present" and not current.is_file():
        status = "missing"
    return {"url": url, "path": relative, "type": kind, "status": status}


def inspect(source, text):
    document = Document()
    document.feed(text)
    document.urls.update(match.strip() for match in CSS_URL.findall(text))
    media = []
    for url in sorted(document.urls):
        entry = media_entry(url, str(Path(source).parent.as_posix()))
        if entry:
            media.append(entry)
    collisions = {key: count for key, count in document.ids.items() if count > 1}
    return media, collisions


def main():
    tracked = check_output(["git", "ls-files", "-z"], cwd=ROOT).decode().split("\0")
    pages, references, collisions = [], {}, {}
    for source in sorted(path for path in tracked if path.endswith(".html")):
        if "/" in source:
            status = "separate-legacy-tree"
        elif source.endswith("_backup.html"):
            status = "backup"
        elif source in HELPERS:
            status = "helper"
        elif source == "Horizonte.html":
            status = "pilot"
        elif source == "ArtKa_2017.html":
            status = "archive-decision-open"
        else:
            status = "legacy"
        pages.append({"source": source, "status": status})
        media, duplicate_ids = inspect(source, (ROOT / source).read_text(encoding="utf-8-sig", errors="replace"))
        if media:
            references[source] = media
        if duplicate_ids:
            collisions[source] = duplicate_ids

    for source in sorted(path for path in tracked if path.endswith("/en.json") or path.endswith("/de.json")):
        catalog = json.loads((ROOT / source).read_text(encoding="utf-8-sig"))
        for key, value in catalog.items():
            if not isinstance(value, str) or "<" not in value:
                continue
            candidates = [page["source"] for page in pages
                          if Path(page["source"]).parent == Path(source).parent.parent
                          and key.startswith(Path(page["source"]).stem + "_")]
            media, _ = inspect(candidates[0] if candidates else source, value)
            if media:
                references[f"{source}#{key}"] = media

    print(json.dumps({"pages": pages, "media": references, "duplicateIds": collisions}, ensure_ascii=True, indent=2))


if __name__ == "__main__":
    main()
