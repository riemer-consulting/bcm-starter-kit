@echo off
setlocal
cd /d "%~dp0"

echo Was moechtest du starten?
echo   1^) BCM Starter Kit        (oeffnet bcm-starter-kit.html direkt im Browser, kein Server)
echo   2^) BCM Tabletop-Uebung    (startet den lokalen Server unter tabletop-regie\)
set /p choice="Auswahl [1/2]: "

if "%choice%"=="1" (
  start "" "%cd%\bcm-starter-kit.html"
  goto :eof
)
if "%choice%"=="2" (
  node -e "process.exit(+process.versions.node.split('.')[0] >= 20 ? 0 : 1)" >nul 2>&1
  if errorlevel 1 (
    echo Node.js 20 oder neuer wird benoetigt - bitte die LTS-Version von https://nodejs.org/ installieren.
    pause
    goto :eof
  )
  cd tabletop-regie
  rem npm start prueft selbst, ob die Pakete passen, und installiert bei Bedarf.
  call npm start
  pause
  goto :eof
)

echo Ungueltige Auswahl. Bitte 1 oder 2 eingeben.
pause
