# 06 – Szenariovergleich NordTech und Waterkant

Stand: siehe `manifest.json`. Zahlen aus den Drehbüchern ermittelt.

| Merkmal | NordTech | Waterkant |
|---|---|---|
| Titel | 7 Tage im Ausnahmezustand | Wenn das Rechenzentrum brennt |
| Unternehmen (fiktiv) | produzierender Mittelständler, 3 Standorte, ca. 620 Beschäftigte, 185 Mio. € Umsatz | Baumarktkette, 14 Filialen, ca. 850 Beschäftigte, 240 Mio. € Umsatz, IT-Dienstleister für 9 Partnermärkte |
| Krisenart | Cyberangriff (Ransomware, Erpressung, möglicher Datenabfluss) | physisches Ereignis (Brand im USV-Raum, Gaslöschung, gesperrtes Rechenzentrum) |
| Zeitraum | Montag 06:41 – Sonntag 15:00 | Montag 22:40 – folgender Montag 09:00 |
| Status | eingefroren (nach Red-Team-Test und Vorabnahme) | neu; unabhängig geprüft (39 Befunde, alle hohen umgesetzt), fachliche Abnahme ausstehend |
| Lagekarten (Priorität 1) | 26 (9) | 28 (9) |
| Vertrauliche Karten (davon Folgekarten) | 49 (2) | 46 (5) |
| Entscheidungen mit Folgen | 4 → 16 Kombinationen | 5 → 32 Kombinationen |
| Überraschungen (öffentlich) | 8 (3) | 8 (4) |
| Stellvertretungstest | B7 Geschäftsführung fällt aus (ab 90 Min.) | B7 IT-Leitung fällt aus (ab 90 Min.) |
| Rollen / Funktionsbereiche | 24 / 11 | 20 / 14 |
| Schwerpunkte | Krisenführung und BCM · IT-Sicherheit und Wiederanlauf · Produktion und Qualität · Kunden und Kommunikation | Krisenführung und Personenschutz · IT-Wiederanlauf und Infrastruktur · Partner, Kunden und Kommunikation · Filialen, Lager und Saisonstart |
| Töne an Lagen / Überraschungen | 11 / 3 | 8 / 1 |
| Sprechertexte / Gesprächssimulationen | 10 / 3 | 8 / 4 |
| Grundschaden | 4,26 Mio. € | 3,18 Mio. € |
| Spanne der Entscheidungen (brutto) | bis + 3,1 Mio. € (Lösegeld 2 Mio. €) | rund 0,08 Mio. € zwischen günstigstem und teuerstem Verlauf; jede Option hat einen eigenen Preis |
| Mögliche Erstattung (Modellannahme) | bis 1,4 Mio. € (Cyberversicherung) | bis 1,6 Mio. € (Elektronik/BU) |
| Kernkonflikte | Lösegeld zahlen? Kunden früh informieren? Meldung an Datenschutzaufsicht? Produktion am Netz? | Herunterfahren in der Nacht? Partner früh informieren? Bergung vor Freigabe und Gutachter? Vertragsbindung 12 Monate? Welche drei Märkte reißen die Kassen-Grenze? |
| Wiederanlauf | Freigabekette Backup → Integrität → Wiederherstellung → Sicherheit → Daten → Produktion → Lieferung | Raumfreigabe und Messung → Ausweich-Rack → geprüfte Firewall-Regeln → Märkte nach Kriterium → Nachbuchen der Datenlücke |
| Varianten- und Lauftests | ohne Befund | ohne Befund (nach vier eigenen Korrekturen und Einarbeitung der unabhängigen Prüfung, Dokument 11) |

## Gemeinsame Qualitätskriterien

Beide Drehbücher erfüllen dieselben automatisch geprüften Kriterien: vollständiger Spannungsbogen in jeder Dauer, keine vertrauliche Karte vor ihrer Lage, jede besetzte Rolle mit eigener Karte, Pflichtkarte je Schwerpunkt, jede Folge nach ihrer Entscheidung, Rechnung = Grundschaden + Posten, alle Medien vorhanden, keine vertraulichen Inhalte auf der Bühne.

## Wofür welches Szenario

- **NordTech**, wenn Informationssicherheit, Erpressung, Meldepflichten und Abhängigkeit von IT in der Produktion im Mittelpunkt stehen.
- **Waterkant**, wenn Personenschutz, physische Infrastruktur, Ausweichbetrieb, Dienstleisterrolle gegenüber Dritten (SLA) und Notbetrieb im Handel im Mittelpunkt stehen. Ohne Cyberbezug geeignet für Teams, die NordTech schon gespielt haben.
