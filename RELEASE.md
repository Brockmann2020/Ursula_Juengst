# Website fuer FTP vorbereiten

## macOS

`release.command` im Finder doppelklicken oder im Terminal aus dem Projektordner starten. Standardziel:

```text
~/Ursula Juengst Release
```

Im Terminal:

```bash
./release.sh
./release.sh --preview
./release.sh "$HOME/Documents/Ursula Juengst Release"
```

## Windows

`release.cmd` doppelklicken. Standardziel:

```text
C:\Users\tilob\Documents\Ursula_Juengst_Release
```

Alternativ in PowerShell aus dem Projektordner starten:

```powershell
.\release.ps1
.\release.ps1 -Destination 'D:\Website-Release'
.\release.ps1 -Preview
```

## Verhalten

HTML, CSS, JavaScript, Bilder, Videos, PDFs, Schriften und weitere Website-Dateien
werden mit ihrer Ordnerstruktur kopiert. Auch von Git ignorierte Medien sind dabei.
Git- und IDE-Dateien, lokale Zugangsdaten (`.env`), Entwicklungs-Caches,
Release-Helfer und HTML-Dateien mit der Endung `_backup.html` bleiben draussen.
Verzeichnisverknuepfungen werden nicht verfolgt.

Vorhandene Dateien im Ziel werden bei inhaltlichen Aenderungen aktualisiert. Zusaetzliche
Dateien im Ziel (insbesondere die dort liegenden Bestandsmedien) werden **nicht** geloescht.
Fuer eine vollstaendig frische Zusammenstellung einen neuen, leeren Zielordner angeben.

Anschliessend den **Inhalt** des Release-Ordners per FTP in das Webverzeichnis
hochladen/spiegeln. Das Skript fuehrt keinen FTP-Upload aus und aendert keine Quelldateien.
