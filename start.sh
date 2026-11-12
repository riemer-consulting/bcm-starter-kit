#!/usr/bin/env bash
# Startet wahlweise das BCM Starter Kit (einzelne HTML-Datei, kein Server)
# oder die BCM Tabletop-Regie (lokaler Node-Server).
set -e
cd "$(dirname "$0")"

echo "Was möchtest du starten?"
echo "  1) BCM Starter Kit        (öffnet bcm-starter-kit.html direkt im Browser, kein Server)"
echo "  2) BCM Tabletop-Übung     (startet den lokalen Server unter tabletop-regie/)"
read -r -p "Auswahl [1/2]: " choice

case "$choice" in
  1)
    FILE="$(pwd)/bcm-starter-kit.html"
    if command -v open >/dev/null 2>&1; then
      open "$FILE"
    elif command -v xdg-open >/dev/null 2>&1; then
      xdg-open "$FILE"
    else
      echo "Bitte diese Datei manuell im Browser öffnen: $FILE"
    fi
    ;;
  2)
    cd tabletop-regie
    if [ ! -d node_modules ]; then
      echo "Erster Start: installiere Abhängigkeiten …"
      npm install
    fi
    npm start
    ;;
  *)
    echo "Ungültige Auswahl. Bitte 1 oder 2 eingeben."
    exit 1
    ;;
esac
