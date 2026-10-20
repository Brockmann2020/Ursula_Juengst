@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0release.ps1" %*
set "releaseExitCode=%ERRORLEVEL%"
echo.
pause
exit /b %releaseExitCode%
