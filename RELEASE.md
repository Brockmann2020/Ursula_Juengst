# Website fuer FTP vorbereiten

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

HTML, CSS, JavaScript, Bilder, Videos, PDFs, Schriften und weitere Website-Dateien
werden mit ihrer Ordnerstruktur kopiert. Auch von Git ignorierte Medien sind dabei.
Git- und IDE-Dateien, lokale Zugangsdaten (`.env`), Entwicklungs-Caches,
Release-Helfer und HTML-Dateien mit der Endung `_backup.html` bleiben draussen.
Verzeichnisverknuepfungen werden nicht verfolgt.

Vorhandene Dateien im Ziel werden bei Aenderungen aktualisiert. Zusaetzliche Dateien
im Ziel werden nicht geloescht. Fuer eine vollstaendig frische Zusammenstellung
einen neuen, leeren Zielordner angeben.

Anschliessend den **Inhalt** des Release-Ordners per FTP in das Webverzeichnis
hochladen. Das Skript fuehrt keinen FTP-Upload aus und aendert keine Quelldateien.
