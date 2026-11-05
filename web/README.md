# Horizonte – Prototyp

Horizonte ist die erste migrierte Galerie der Website von Ursula Jüngst. Der Prototyp zeigt vier Werke mit sieben Abbildungen, darunter drei Ausschnitte. Beide Sprachversionen verwenden dieselbe Galerie und Bildreihenfolge. Beschriftungen und Alternativtexte erscheinen in der gewählten Sprache, die Werktitel bleiben im Original.

Die Anwendung in `web/` nutzt Next.js, React, TypeScript und MUI. Next.js erzeugt beim Build fertige HTML-Seiten und die zugehörigen Dateien für einen statischen Webserver. Der bisherige FTP-Release schließt den Prototyp aus.

## Lokal ansehen

Im Verzeichnis `web/` mit Node.js 24 ausführen.

```sh
npm ci
npm run build
npm run typecheck
python -m http.server 8080 --bind 127.0.0.1 --directory out
```

Die [lokale Startseite](http://127.0.0.1:8080/) verlinkt die Galerien unter `/de/horizonte/` und `/en/horizonte/`. Mit `npm run dev` lässt sich alternativ die Entwicklungsansicht starten.

Der Build benötigt die sieben Originalbilder im Verzeichnis `Horizonte/` neben `web/`. Die genauen Dateinamen stehen in [horizonte.json](src/content/horizonte.json). Ein frischer Git-Checkout benötigt die Bilder separat. Im bisherigen lokalen Website-Bestand sind sie vorhanden.

## Wie die Galerie aus Daten entsteht

[horizonte.json](src/content/horizonte.json) trennt die Werkdaten in `works` von den geordneten Abbildungen in `entries`. Ein Werk enthält Titel, Jahr, Material und Maße in Zentimetern. Jeder Eintrag verbindet eine Quelldatei über die Werk-ID mit dem Werk und bestimmt die Ansicht.

Beim Werk **Slide** verweisen zwei Einträge auf die Werk-ID `slide`. Der erste zeigt `Slide_2026.jpg` als Gesamtansicht mit Jahr, Material und Werkmaßen. Der zweite zeigt `Slide_2026_Ausschnitt.jpg` als Detail mit der Beschriftung „Ausschnitt aus Slide“ bzw. „Detail from Slide“. Für einen weiteren Ausschnitt genügt ein Eintrag mit eigener ID, vorhandenem Dateinamen und `view: "detail"`. Seine Position in `entries` bestimmt die Anzeigereihenfolge.

Vor dem Build erzeugt [prepare-media.mjs](scripts/prepare-media.mjs) WebP-Bilder mit höchstens 1.920 Pixeln je Seite und erfasst deren Pixelmaße. [Die Datenaufbereitung](src/features/galleries/horizonte.ts) prüft Werk- und Bildzuordnungen und erzeugt die Texte. [Die Galeriekomponente](src/features/galleries/Gallery.tsx) rendert daraus responsive Bilder mit Bildunterschriften und wechselnden Hintergrundflächen. Die gemeinsamen Gestaltungswerte liegen im [MUI-Theme](src/theme/Theme.tsx).

## Geprüft und offen

- Statischer Build und Typprüfung erfolgreich. In Chrome wurden bei 375, 1.240 und 1.440 Pixeln Direktaufruf, Neuladen, Sprachwechsel, Bilddarstellung und Tastaturnavigation geprüft. Ein zusätzlicher Testeintrag erschien nach einer reinen Datenänderung in beiden Sprachen und wurde anschließend entfernt.
- Vom Repository-Stamm aus liefert `python web/scripts/inventory.py` einen JSON-Bericht zu Seiten, Medienverweisen und doppelten IDs. Alle 760 erfassten Medienreferenzen pro Quelle ließen sich im lokalen Bestand auflösen.
- Die Sprachpfade sind vorläufig. Die Erreichbarkeit der Übergangslinks zu den bestehenden HTML-Seiten ließ sich wegen der TLS-Zertifikatsprüfung nicht bestätigen. Öffentliche URL-Zuordnung, Bereitstellung der Medien für frische Checkouts und Abnahme auf echten Mobilgeräten stehen aus.

[Roadmap und Status der geplanten Features](ROADMAP.md)
