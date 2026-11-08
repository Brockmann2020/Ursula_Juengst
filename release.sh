#!/usr/bin/env bash
# Erstellt bzw. aktualisiert einen FTP-fertigen Release-Ordner unter macOS/Linux.
# Vorhandene Medien im Zielordner bleiben erhalten (kein --delete).
# Die .gitignore wird bewusst nicht als Ausschlussliste verwendet, damit auch
# neue lokale Mediendateien aus dem Projektordner mitkopiert werden.

set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
DESTINATION="${HOME}/Ursula Juengst Release"
PREVIEW=0

usage() {
    cat <<EOF
Verwendung:
  ./release.sh [Optionen] [Zielordner]

Optionen:
  -d, --destination PFAD   Zielordner angeben (Standard: ~/Ursula Juengst Release)
  -n, --preview, --dry-run Vorschau anzeigen, ohne Dateien zu kopieren
  -h, --help               Diese Hilfe anzeigen

Beispiele:
  ./release.sh
  ./release.sh --preview
  ./release.sh "${HOME}/Documents/Ursula Juengst Release"
EOF
}

POSITIONAL_DEST_SET=0
while [[ $# -gt 0 ]]; do
    case "$1" in
        -n|--preview|--dry-run)
            PREVIEW=1
            shift
            ;;
        -d|--destination)
            if [[ $# -lt 2 ]]; then
                echo "Fehler: Fuer '$1' fehlt die Pfadangabe." >&2
                exit 1
            fi
            DESTINATION="$2"
            POSITIONAL_DEST_SET=1
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        -*)
            echo "Fehler: Unbekannte Option '$1'." >&2
            usage >&2
            exit 1
            ;;
        *)
            if [[ $POSITIONAL_DEST_SET -eq 1 ]]; then
                echo "Fehler: Mehr als ein Zielordner angegeben." >&2
                usage >&2
                exit 1
            fi
            DESTINATION="$1"
            POSITIONAL_DEST_SET=1
            shift
            ;;
    esac
done

# Relative Zielpfade beziehen sich wie in release.ps1 auf den Projektordner.
if [[ "$DESTINATION" == "~" ]]; then
    DESTINATION="$HOME"
elif [[ "$DESTINATION" == "~/"* ]]; then
    DESTINATION="${HOME}/${DESTINATION:2}"
elif [[ "$DESTINATION" != /* ]]; then
    DESTINATION="${SOURCE_DIR}/${DESTINATION}"
fi

if [[ -e "$DESTINATION" && ! -d "$DESTINATION" ]]; then
    echo "Fehler: Der Zielpfad existiert bereits als Datei: $DESTINATION" >&2
    exit 1
fi

# Kanonischen Zielpfad aufloesen (ohne den Ordner im Vorschau-Modus anzulegen)
TARGET_DIR="$(python3 -c 'import os, sys; print(os.path.realpath(sys.argv[1]))' "$DESTINATION")"
HOME_REAL="$(python3 -c 'import os, sys; print(os.path.realpath(sys.argv[1]))' "$HOME")"

if [[ "$TARGET_DIR" == "/" || "$TARGET_DIR" == "$HOME_REAL" ]]; then
    echo "Fehler: Bitte einen eigenen Release-Ordner (nicht '/' oder '$HOME') angeben." >&2
    exit 1
fi

if [[ "$TARGET_DIR" == "$SOURCE_DIR" || "$TARGET_DIR" == "${SOURCE_DIR}/"* || "$SOURCE_DIR" == "${TARGET_DIR}/"* ]]; then
    echo "Fehler: Quell- und Zielordner muessen getrennt sein und duerfen nicht ineinander liegen." >&2
    exit 1
fi

if [[ $PREVIEW -eq 0 ]]; then
    mkdir -p "$TARGET_DIR"
else
    echo "Vorschau: Es werden keine Dateien kopiert."
fi

echo "Quelle: $SOURCE_DIR"
echo "Ziel:   $TARGET_DIR"
echo ""

RSYNC_ARGS=(
    -rtpv
    # Verzeichnisse ausschliessen
    --exclude='/.git/'
    --exclude='/.svn/'
    --exclude='/.hg/'
    --exclude='/.idea/'
    --exclude='/.vscode/'
    --exclude='/.vs/'
    --exclude='/.codex/'
    --exclude='/.agents/'
    --exclude='/.aws/'
    --exclude='/.github/'
    --exclude='/node_modules/'
    --exclude='/.cache/'
    --exclude='/coverage/'
    --exclude='__pycache__/'
    # Dateien ausschliessen
    --exclude='.git'
    --exclude='.gitignore'
    --exclude='.gitattributes'
    --exclude='.gitmodules'
    --exclude='.gitkeep'
    --exclude='*.iml'
    --exclude='*.iws'
    --exclude='*.ipr'
    --exclude='.DS_Store'
    --exclude='._*'
    --exclude='Thumbs.db'
    --exclude='Desktop.ini'
    --exclude='.env'
    --exclude='.env.*'
    --exclude='*.log'
    --exclude='AGENTS.md'
    --exclude='qodana.yaml'
    --exclude='qodana.yml'
    --exclude='release.ps1'
    --exclude='release.cmd'
    --exclude='release.sh'
    --exclude='release.command'
    --exclude='RELEASE.md'
    --exclude='*_backup.html'
)

if [[ $PREVIEW -eq 1 ]]; then
    RSYNC_ARGS+=(-n)
fi

rsync "${RSYNC_ARGS[@]}" "${SOURCE_DIR}/" "${TARGET_DIR}/"

echo ""
if [[ $PREVIEW -eq 1 ]]; then
    echo "Vorschau abgeschlossen."
else
    echo "Release fertig. Vorhandene Medien im Zielordner blieben erhalten."
    echo "Den Inhalt von '$TARGET_DIR' anschliessend per FTP spiegeln/hochladen."
fi
