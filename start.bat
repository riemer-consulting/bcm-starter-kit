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
  cd tabletop-regie
  if not exist node_modules (
    echo Erster Start: installiere Abhaengigkeiten ...
    call npm install
  )
  call npm start
  goto :eof
)

echo Ungueltige Auswahl. Bitte 1 oder 2 eingeben.
pause
