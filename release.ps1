# Erstellt eine FTP-fertige Kopie einschliesslich aller lokalen Medien.
# Die .gitignore wird bewusst nicht als Ausschlussliste verwendet.
[CmdletBinding()]
param(
    [string]$Destination = 'C:\Users\tilob\Documents\Ursula_Juengst_Release',
    [switch]$Preview
)

$ErrorActionPreference = 'Stop'

try {
    $sourcePath = [IO.Path]::GetFullPath($PSScriptRoot).TrimEnd('\', '/')
    # Relative Zielpfade beziehen sich immer auf den Projektordner.
    if (-not [IO.Path]::IsPathRooted($Destination)) {
        $Destination = Join-Path $sourcePath $Destination
    }
    $targetPath = [IO.Path]::GetFullPath($Destination).TrimEnd('\', '/')
    $comparison = [StringComparison]::OrdinalIgnoreCase
    if ($targetPath.Equals($sourcePath, $comparison) -or
        $targetPath.StartsWith($sourcePath + '\', $comparison) -or
        $sourcePath.StartsWith($targetPath + '\', $comparison)) {
        throw 'Quell- und Zielordner muessen getrennt sein und duerfen nicht ineinander liegen.'
    }
    if ([IO.Path]::GetPathRoot($targetPath).TrimEnd('\', '/') -eq $targetPath) {
        throw 'Bitte einen eigenen Release-Ordner statt eines Laufwerkstamms angeben.'
    }
    if ((Test-Path -LiteralPath $targetPath) -and
        -not (Test-Path -LiteralPath $targetPath -PathType Container)) {
        throw 'Der Zielpfad ist bereits als Datei vorhanden.'
    }

    $excludedDirectories = @(
        '.git', '.svn', '.hg', '.idea', '.vscode', '.vs',
        '.codex', '.agents', '.aws', '.github',
        'node_modules', '.cache', 'coverage', '__pycache__'
    )
    $excludedFiles = @(
        '.git', '.gitignore', '.gitattributes', '.gitmodules', '.gitkeep',
        '*.iml', '*.iws', '*.ipr', '.DS_Store', 'Thumbs.db', 'Desktop.ini',
        '.env', '.env.*', '*.log',
        'AGENTS.md', 'qodana.yaml', 'qodana.yml',
        'release.ps1', 'release.cmd', 'release.sh', 'release.command', 'RELEASE.md', '*_backup.html'
    )
    $copyArguments = @(
        $sourcePath, $targetPath,
        '/E', '/XJ', '/R:1', '/W:1', '/COPY:DAT', '/DCOPY:DAT',
        '/NP', '/NFL', '/NDL', '/XD'
    ) + $excludedDirectories + @('/XF') + $excludedFiles
    if ($Preview) {
        $copyArguments += '/L'
        Write-Host 'Vorschau: Es werden keine Dateien kopiert.'
    }

    Write-Host "Quelle: $sourcePath"
    Write-Host "Ziel:   $targetPath"
    & robocopy.exe @copyArguments
    $copyExitCode = $LASTEXITCODE
    # Robocopy verwendet 0 bis 7 fuer erfolgreiche Kopiervorgaenge.
    if ($copyExitCode -ge 8) {
        throw "Kopieren fehlgeschlagen (Robocopy-Code $copyExitCode)."
    }
    if ($Preview) {
        Write-Host 'Vorschau abgeschlossen.'
    } else {
        Write-Host 'Release fertig. Den Inhalt des Zielordners per FTP hochladen.'
    }
    exit 0
} catch {
    Write-Error $_ -ErrorAction Continue
    exit 1
}
