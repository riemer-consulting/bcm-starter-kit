# 05 – End-to-End-Spielverläufe im Browser

**Geprüfter Commit:** `52f7c8fbe8465eb928d28b17873374bd051d41f5` · **Lauf:** 2026-11-20T08:27:50.312Z bis 2026-11-20T09:10:16.032Z · erzeugt mit `tools/qa/berichte.js` aus dem Nachweisordner (Pfadangaben relativ zum Nachweispaket).

Je Fall ein vollständiger Übungsverlauf im echten Browser (Chromium), bedient über die Oberfläche. Die Schnittstelle wurde nur lesend zur Dokumentation genutzt. Kein Teilnehmergespräch wurde simuliert: Gesprächsleitfäden sind nur als „angezeigt“ vermerkt. Zeit: Countdown echt (30 s), Lagen per „Zeitsprung hierhin“, Pause 8 s echt. Jede Lage: Bildschirmfoto Bühne und Moderation, Trace (`trace.zip`, öffnen mit `npx playwright show-trace`), bereinigtes Serverprotokoll (`server.log`), Protokoll- und Journal-Export.

## Übersicht

| Fall | Szenario | Dauer | Schwerpunkt | Besetzung | Entscheidungen | Lagen | Prüfungen | Ersatzklicks | Ergebnis |
|---|---|---|---|---|---|---|---|---|---|
| NT-45-unguenstig | NordTech | 45 | ausgewogen | 5 Rollen, 6 Personen | am-netz/abwarten/abwarten/gezahlt | 9 | 32/32 | 0 | bestanden |
| NT-60-gemischt | NordTech | 60 | kunden | 6 Rollen, 8 Personen | trennen/abwarten/melden/nicht-gezahlt | 9 | 29/29 | 0 | bestanden |
| NT-90-ausgewogen | NordTech | 90 | ausgewogen | 9 Rollen, 9 Personen | trennen/proaktiv/melden/nicht-gezahlt | 13 | 30/30 | 0 | bestanden |
| NT-90-krisenfuehrung | NordTech | 90 | fuehrung | 9 Rollen, 12 Personen | am-netz/proaktiv/abwarten/gezahlt | 13 | 30/30 | 0 | bestanden |
| NT-120-it | NordTech | 120 | it | 12 Rollen, 14 Personen | trennen/abwarten/melden/gezahlt | 15 | 30/30 | 0 | bestanden |
| NT-180-alle-rollen | NordTech | 180 | ausgewogen | 24 Rollen, 28 Personen | am-netz/proaktiv/melden/nicht-gezahlt | 21 | 29/29 | 0 | bestanden |
| WK-45-unguenstig | Waterkant | 45 | ausgewogen | 5 Rollen, 6 Personen | weiterlaufen/spaeter/bergen/minimal/eigene | 9 | 34/34 | 0 | bestanden |
| WK-60-gemischt | Waterkant | 60 | betrieb | 6 Rollen, 8 Personen | herunterfahren/spaeter/abwarten/ausbauen/gleichrangig | 9 | 31/31 | 0 | bestanden |
| WK-90-ausgewogen | Waterkant | 90 | ausgewogen | 9 Rollen, 9 Personen | herunterfahren/frueh/bergen/minimal/gleichrangig | 13 | 32/32 | 0 | bestanden |
| WK-90-krisenfuehrung | Waterkant | 90 | fuehrung | 9 Rollen, 12 Personen | weiterlaufen/frueh/abwarten/ausbauen/eigene | 12 | 32/32 | 0 | bestanden |
| WK-120-it | Waterkant | 120 | it | 12 Rollen, 14 Personen | herunterfahren/spaeter/bergen/ausbauen/eigene | 14 | 34/34 | 0 | bestanden |
| WK-180-alle-rollen | Waterkant | 180 | ausgewogen | 20 Rollen, 24 Personen | weiterlaufen/frueh/bergen/ausbauen/gleichrangig | 18 | 34/34 | 0 | bestanden |
| WK-120-kunden-zusatz | Waterkant | 120 | kunden | 12 Rollen, 13 Personen | weiterlaufen/spaeter/abwarten/minimal/eigene | 14 | 32/32 | 0 | bestanden |
| WK-180-betrieb-zusatz | Waterkant | 180 | betrieb | 18 Rollen, 20 Personen | herunterfahren/frueh/bergen/ausbauen/gleichrangig | 18 | 32/32 | 0 | bestanden |

„Ersatzklicks“: Klicks, bei denen die normale Klickprüfung von Playwright nicht abgeschlossen wurde und ein Mausklick ohne Ruheprüfung auf dieselbe Schaltfläche folgte. Sie sind ausgewiesen, damit die Zahl echter Bedienungen nicht überschätzt wird.

## NT-45-unguenstig

Sitzung `20261120084928-fab9` · Entscheidungen: W1=am-netz, W2=abwarten, W3=abwarten, W4=gezahlt · Überraschungen: B2 nach LK03, B7 nach LK17 (vorher gesperrt erwartet) · Bilder: Setup `e2e/NT-45-unguenstig/bilder/00-setup.jpg`, Bilanz `e2e/NT-45-unguenstig/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/NT-45-unguenstig/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK18 Anmeldung hakt | Montag 06:41 Uhr | 0 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 0 von 9 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v1-anmeldung-hakt.png / kein Ton läuft | 2 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-45-unguenstig/bilder/L01-LK18-buehne.jpg`, `e2e/NT-45-unguenstig/bilder/L01-LK18-moderation.jpg` |
| 2 | LK01 Cyberangriff | Montag 07:00 Uhr | 2 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 2 von 9 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | lk01-loesegeld-kamera-foto.webp / lk01-stille-gemurmel.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-45-unguenstig/bilder/L02-LK01-buehne.jpg`, `e2e/NT-45-unguenstig/bilder/L02-LK01-moderation.jpg` |
| 3 | LK02 Produktion stoppt | Montag 09:00 Uhr | 6.8 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 3 von 9 | ✓/✓ | ✓ | SK40→leitung-produktion:zugestellt | W1=offen W2=offen W3=offen W4=offen | – | lk02-produktion-gestoppt-foto.webp / lk02-produktion-faehrt-herunter.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-45-unguenstig/bilder/L03-LK02-buehne.jpg`, `e2e/NT-45-unguenstig/bilder/L03-LK02-moderation.jpg` |
| 4 | LK22 Kommunikation ohne IT | Montag 10:00 Uhr | 11.5 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 4 von 9 | ✓/✓ | ✓ | – | W1=am-netz W2=offen W3=offen W4=offen | – | lk22-kommunikation-ohne-it.png / lk22-funk-abgebrochen.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-45-unguenstig/bilder/L04-LK22-buehne.jpg`, `e2e/NT-45-unguenstig/bilder/L04-LK22-moderation.jpg` |
| 5 | LK07 Datenschutz | Dienstag 13:00 Uhr | 16.3 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 5 von 9 | ✓/✓ | ✓ | SK01→leiter-it:zugestellt, SK43→geschaeftsfuehrerin-vertrieb:zugestellt | W1=am-netz W2=abwarten W3=offen W4=offen | – | lk07-datenschutz.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-45-unguenstig/bilder/L05-LK07-buehne.jpg`, `e2e/NT-45-unguenstig/bilder/L05-LK07-moderation.jpg` |
| 6 | LK09 Backups gefunden | Mittwoch 11:00 Uhr | 21 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 6 von 9 | ✓/✓ | ✓ | SK22→kaufmaennische-leiterin-cfo:zugestellt, SK20→geschaeftsfuehrer-ceo:zugestellt | W1=am-netz W2=abwarten W3=abwarten W4=gezahlt | – | lk09-offline-backup-foto.webp / kein Ton läuft | 2 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-45-unguenstig/bilder/L06-LK09-buehne.jpg`, `e2e/NT-45-unguenstig/bilder/L06-LK09-moderation.jpg` |
| 7 | LK17 Beirat fordert Lagebericht | Donnerstag 07:00 Uhr | 25.8 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 7 von 9 | ✓/✓ | ✓ | SK27→leiter-it:zugestellt | W1=am-netz W2=abwarten W3=abwarten W4=gezahlt | – | lk17-zwischenfazit-foto.webp / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-45-unguenstig/bilder/L07-LK17-buehne.jpg`, `e2e/NT-45-unguenstig/bilder/L07-LK17-moderation.jpg` |
| 8 | LK12 Teilweiser Wiederanlauf | Freitag 08:00 Uhr | 30.5 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 8 von 9 | ✓/✓ | ✓ | SK17→geschaeftsfuehrer-ceo:zugestellt, SK44→geschaeftsfuehrer-ceo:zugestellt | W1=am-netz W2=abwarten W3=abwarten W4=gezahlt | – | lk12-werk-sued-online-foto.webp / lk12-anlage-faehrt-hoch.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-45-unguenstig/bilder/L08-LK12-buehne.jpg`, `e2e/NT-45-unguenstig/bilder/L08-LK12-moderation.jpg` |
| 9 | LK15 Wiederanlauf | Sonntag 12:00 Uhr | 35.3 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 9 von 9 | ✓/✓ | ✓ | SK18→geschaeftsfuehrerin-vertrieb:zugestellt | W1=am-netz W2=abwarten W3=abwarten W4=gezahlt | – | lk15-wiederanlauf.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-45-unguenstig/bilder/L09-LK15-buehne.jpg`, `e2e/NT-45-unguenstig/bilder/L09-LK15-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.nordtech.json | scenario.nordtech.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 6 Personen übernommen | 6 übernommen (6 auf vorhandene Rollen-Zeilen, 0 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 5 Rollen besetzt, 6 Personen | 5 Rollen besetzt, 6 Personen; Teams: 1 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 6 | Begrüßung 6, Briefing 6 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| T2 | Pause und Fortsetzen über die Oberfläche | Zeit steht in der Pause (8 s), läuft danach weiter (8 s; Anzeige auf 0,1 Min. gerundet) | 6.8 → 6.8 (8 s Pause) → 6.9 | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | am-netz | am-netz | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | abwarten | abwarten | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | abwarten | abwarten | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | gezahlt | gezahlt | bestanden |
| B-B7 | Überraschung B7: Auslösesperre | gesperrt | gesperrt („Passt erst nach: nur in Übungen ab 90 Minuten“) | bestanden |
| B-B2 | Überraschung B2 | nach LK03 | nicht ausgelöst: LK03 ist in diesem Ablauf nicht enthalten (kein Fehler, dokumentiert) | bestanden |
| E1 | Gesamteinschätzung (8 Kriterien) gespeichert und nach Neuladen angezeigt | 8 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1; Notizen 8/8 | bestanden |
| E2 | Szenariospezifisches Raster | 8 allgemeine Kriterien | 8 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 9 Zeilen wie im Journal | 9 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK40 SK01 SK43 SK22 SK20 SK27 SK17 SK44 SK18 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | keine | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | keine | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 8/8 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 7.360.000 €, beim Unternehmen 5.960.000 € | Protokoll enthält Brutto: ja; Moderation 7.360.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 6 Personen korrekt | bestanden |
| O3 | Folgekarte SK43 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK44 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK27 | zugestellt | zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): 6 Personen gleichmäßig auf 5 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## NT-60-gemischt

Sitzung `20261120084928-hjq2` · Entscheidungen: W1=trennen, W2=abwarten, W3=melden, W4=nicht-gezahlt · Überraschungen: B6 nach LK22, B4 nach LK05 · Bilder: Setup `e2e/NT-60-gemischt/bilder/00-setup.jpg`, Bilanz `e2e/NT-60-gemischt/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/NT-60-gemischt/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK18 Anmeldung hakt | Montag 06:41 Uhr | 0 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 0 von 9 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v1-anmeldung-hakt.png / kein Ton läuft | 2 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-60-gemischt/bilder/L01-LK18-buehne.jpg`, `e2e/NT-60-gemischt/bilder/L01-LK18-moderation.jpg` |
| 2 | LK01 Cyberangriff | Montag 07:00 Uhr | 2 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 2 von 9 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | lk01-loesegeld-kamera-foto.webp / lk01-stille-gemurmel.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-60-gemischt/bilder/L02-LK01-buehne.jpg`, `e2e/NT-60-gemischt/bilder/L02-LK01-moderation.jpg` |
| 3 | LK02 Produktion stoppt | Montag 09:00 Uhr | 8.5 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 3 von 9 | ✓/✓ | ✓ | SK40→leitung-produktion:zugestellt | W1=offen W2=offen W3=offen W4=offen | – | lk02-produktion-gestoppt-foto.webp / lk02-produktion-faehrt-herunter.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-60-gemischt/bilder/L03-LK02-buehne.jpg`, `e2e/NT-60-gemischt/bilder/L03-LK02-moderation.jpg` |
| 4 | LK22 Kommunikation ohne IT | Montag 10:00 Uhr | 15 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 4 von 9 | ✓/✓ | ✓ | – | W1=trennen W2=offen W3=offen W4=offen | – | lk22-kommunikation-ohne-it.png / lk22-funk-abgebrochen.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-60-gemischt/bilder/L04-LK22-buehne.jpg`, `e2e/NT-60-gemischt/bilder/L04-LK22-moderation.jpg` |
| 5 | LK07 Datenschutz | Dienstag 13:00 Uhr | 21.5 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 5 von 9 | ✓/✓ | ✓ | SK01→leiter-it:zugestellt, SK43→geschaeftsfuehrerin-vertrieb:zugestellt | W1=trennen W2=abwarten W3=offen W4=offen | – | lk07-datenschutz.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-60-gemischt/bilder/L05-LK07-buehne.jpg`, `e2e/NT-60-gemischt/bilder/L05-LK07-moderation.jpg` |
| 6 | LK09 Backups gefunden | Mittwoch 11:00 Uhr | 28 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 6 von 9 | ✓/✓ | ✓ | SK46→geschaeftsfuehrerin-vertrieb:zugestellt, SK41→leitung-qualitaet:zugestellt, SK20→geschaeftsfuehrer-ceo:zugestellt | W1=trennen W2=abwarten W3=melden W4=nicht-gezahlt | – | lk09-offline-backup-foto.webp / kein Ton läuft | 2 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-60-gemischt/bilder/L06-LK09-buehne.jpg`, `e2e/NT-60-gemischt/bilder/L06-LK09-moderation.jpg` |
| 7 | LK17 Beirat fordert Lagebericht | Donnerstag 07:00 Uhr | 34.5 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 7 von 9 | ✓/✓ | ✓ | SK19→leiter-it:zugestellt | W1=trennen W2=abwarten W3=melden W4=nicht-gezahlt | – | lk17-zwischenfazit-foto.webp / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-60-gemischt/bilder/L07-LK17-buehne.jpg`, `e2e/NT-60-gemischt/bilder/L07-LK17-moderation.jpg` |
| 8 | LK12 Teilweiser Wiederanlauf | Freitag 08:00 Uhr | 41 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 8 von 9 | ✓/✓ | ✓ | SK17→geschaeftsfuehrer-ceo:zugestellt | W1=trennen W2=abwarten W3=melden W4=nicht-gezahlt | – | lk12-werk-sued-online-foto.webp / lk12-anlage-faehrt-hoch.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-60-gemischt/bilder/L08-LK12-buehne.jpg`, `e2e/NT-60-gemischt/bilder/L08-LK12-moderation.jpg` |
| 9 | LK15 Wiederanlauf | Sonntag 12:00 Uhr | 47.5 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 9 von 9 | ✓/✓ | ✓ | SK37→geschaeftsfuehrerin-vertrieb:zugestellt, SK29→kaufmaennische-leiterin-cfo:zugestellt | W1=trennen W2=abwarten W3=melden W4=nicht-gezahlt | – | lk15-wiederanlauf.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-60-gemischt/bilder/L09-LK15-buehne.jpg`, `e2e/NT-60-gemischt/bilder/L09-LK15-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.nordtech.json | scenario.nordtech.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 8 Personen übernommen | 8 übernommen (7 auf vorhandene Rollen-Zeilen, 1 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 6 Rollen besetzt, 8 Personen | 6 Rollen besetzt, 8 Personen; Teams: 2 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 8 | Begrüßung 8, Briefing 8 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | trennen | trennen | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | abwarten | abwarten | bestanden |
| B-B6 | Überraschung B6 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B6-buehne.jpg | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | melden | melden | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | nicht-gezahlt | nicht-gezahlt | bestanden |
| B-B4 | Überraschung B4 | nach LK05 | nicht ausgelöst: LK05 ist in diesem Ablauf nicht enthalten (kein Fehler, dokumentiert) | bestanden |
| E1 | Gesamteinschätzung (8 Kriterien) gespeichert und nach Neuladen angezeigt | 8 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1; Notizen 8/8 | bestanden |
| E2 | Szenariospezifisches Raster | 8 allgemeine Kriterien | 8 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 9 Zeilen wie im Journal | 9 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK40 SK01 SK43 SK46 SK41 SK20 SK19 SK17 SK37 SK29 SK33 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B6 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B6 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 8/8 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 4.860.000 €, beim Unternehmen 3.460.000 € | Protokoll enthält Brutto: ja; Moderation 4.860.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 8 Personen korrekt | bestanden |
| O3 | Folgekarte SK43 | zugestellt | zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): 8 Personen gleichmäßig auf 6 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## NT-90-ausgewogen

Sitzung `20261120085122-sqhd` · Entscheidungen: W1=trennen, W2=proaktiv, W3=melden, W4=nicht-gezahlt · Überraschungen: B8 nach LK14, B1 nach LK05, B6 nach LK22 · Bilder: Setup `e2e/NT-90-ausgewogen/bilder/00-setup.jpg`, Bilanz `e2e/NT-90-ausgewogen/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/NT-90-ausgewogen/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK18 Anmeldung hakt | Montag 06:41 Uhr | 0 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 0 von 13 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v1-anmeldung-hakt.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L01-LK18-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L01-LK18-moderation.jpg` |
| 2 | LK19 Maschine 4 verhält sich seltsam | Montag 06:48 Uhr | 3 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 2 von 13 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v2-maschine-seltsam.png / lk19-fraeslinie-stoerung.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L02-LK19-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L02-LK19-moderation.jpg` |
| 3 | LK20 Keine Aufträge mehr | Montag 06:55 Uhr | 6 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 3 von 13 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v3-keine-auftraege.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L03-LK20-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L03-LK20-moderation.jpg` |
| 4 | LK01 Cyberangriff | Montag 07:00 Uhr | 9 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 4 von 13 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | lk01-loesegeld-kamera-foto.webp / lk01-stille-gemurmel.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L04-LK01-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L04-LK01-moderation.jpg` |
| 5 | LK02 Produktion stoppt | Montag 09:00 Uhr | 16.2 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 5 von 13 | ✓/✓ | ✓ | SK34→it-service-desk:zugestellt, SK40→leitung-produktion:zugestellt | W1=offen W2=offen W3=offen W4=offen | – | lk02-produktion-gestoppt-foto.webp / lk02-produktion-faehrt-herunter.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L05-LK02-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L05-LK02-moderation.jpg` |
| 6 | LK22 Kommunikation ohne IT | Montag 10:00 Uhr | 23.4 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 6 von 13 | ✓/✓ | ✓ | SK21→notfallmanagement-bcm:zugestellt | W1=trennen W2=offen W3=offen W4=offen | – | lk22-kommunikation-ohne-it.png / lk22-funk-abgebrochen.mp3 läuft | 7 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L06-LK22-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L06-LK22-moderation.jpg` |
| 7 | LK04 Nordkanal-Anfrage | Montag 14:00 Uhr | 30.6 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 7 von 13 | ✓/✓ | ✓ | SK01→leiter-it:zugestellt | W1=trennen W2=proaktiv W3=offen W4=offen | – · Gesprächsleitfaden angezeigt | lk04-nordkanal-anfrage.png / telefon-klingeln.mp3 läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L07-LK04-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L07-LK04-moderation.jpg` |
| 8 | LK07 Datenschutz | Dienstag 13:00 Uhr | 37.8 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 8 von 13 | ✓/✓ | ✓ | SK05→geschaeftsfuehrerin-vertrieb:zugestellt | W1=trennen W2=proaktiv W3=offen W4=offen | – | lk07-datenschutz.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L08-LK07-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L08-LK07-moderation.jpg` |
| 9 | LK09 Backups gefunden | Mittwoch 11:00 Uhr | 45 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 9 von 13 | ✓/✓ | ✓ | SK41→leitung-qualitaet:zugestellt, SK20→geschaeftsfuehrer-ceo:zugestellt | W1=trennen W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk09-offline-backup-foto.webp / kein Ton läuft | 2 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L09-LK09-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L09-LK09-moderation.jpg` |
| 10 | LK17 Beirat fordert Lagebericht | Donnerstag 07:00 Uhr | 52.2 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 10 von 13 | ✓/✓ | ✓ | SK19→leiter-it:zugestellt | W1=trennen W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk17-zwischenfazit-foto.webp / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L10-LK17-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L10-LK17-moderation.jpg` |
| 11 | LK12 Teilweiser Wiederanlauf | Freitag 08:00 Uhr | 59.4 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 11 von 13 | ✓/✓ | ✓ | SK17→geschaeftsfuehrer-ceo:zugestellt | W1=trennen W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk12-werk-sued-online-foto.webp / lk12-anlage-faehrt-hoch.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L11-LK12-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L11-LK12-moderation.jpg` |
| 12 | LK21 Chargenfreigabe | Freitag 16:00 Uhr | 66.6 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 12 von 13 | ✓/✓ | ✓ | SK29→kaufmaennische-leiterin-cfo:zugestellt | W1=trennen W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk21-chargenfreigabe.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L12-LK21-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L12-LK21-moderation.jpg` |
| 13 | LK15 Wiederanlauf | Sonntag 12:00 Uhr | 73.8 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 13 von 13 | ✓/✓ | ✓ | SK15→notfallmanagement-bcm:zugestellt | W1=trennen W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk15-wiederanlauf.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-ausgewogen/bilder/L13-LK15-buehne.jpg`, `e2e/NT-90-ausgewogen/bilder/L13-LK15-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.nordtech.json | scenario.nordtech.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 9 Personen übernommen | 9 übernommen (9 auf vorhandene Rollen-Zeilen, 0 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 9 Rollen besetzt, 9 Personen | 9 Rollen besetzt, 9 Personen; Teams: 0 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 9 | Begrüßung 9, Briefing 9 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| T2 | Pause und Fortsetzen über die Oberfläche | Zeit steht in der Pause (8 s), läuft danach weiter (8 s; Anzeige auf 0,1 Min. gerundet) | 16.3 → 16.3 (8 s Pause) → 16.4 | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | trennen | trennen | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | proaktiv | proaktiv | bestanden |
| B-B6 | Überraschung B6 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B6-buehne.jpg | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | melden | melden | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | nicht-gezahlt | nicht-gezahlt | bestanden |
| B-B8 | Überraschung B8 | nach LK14 | nicht ausgelöst: LK14 ist in diesem Ablauf nicht enthalten (kein Fehler, dokumentiert) | bestanden |
| B-B1 | Überraschung B1 | nach LK05 | nicht ausgelöst: LK05 ist in diesem Ablauf nicht enthalten (kein Fehler, dokumentiert) | bestanden |
| E1 | Gesamteinschätzung (8 Kriterien) gespeichert und nach Neuladen angezeigt | 8 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1; Notizen 8/8 | bestanden |
| E2 | Szenariospezifisches Raster | 8 allgemeine Kriterien | 8 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 13 Zeilen wie im Journal | 13 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK34 SK40 SK21 SK01 SK05 SK41 SK20 SK19 SK17 SK29 SK15 SK38 SK33 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B6 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B6 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 8/8 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 4.260.000 €, beim Unternehmen 2.860.000 € | Protokoll enthält Brutto: ja; Moderation 4.260.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 9 Personen korrekt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): 9 Personen gleichmäßig auf 9 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## NT-90-krisenfuehrung

Sitzung `20261120085141-w662` · Entscheidungen: W1=am-netz, W2=proaktiv, W3=abwarten, W4=gezahlt · Überraschungen: B7 nach LK17, B5 nach LK12 · Bilder: Setup `e2e/NT-90-krisenfuehrung/bilder/00-setup.jpg`, Bilanz `e2e/NT-90-krisenfuehrung/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/NT-90-krisenfuehrung/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK18 Anmeldung hakt | Montag 06:41 Uhr | 0 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 0 von 13 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v1-anmeldung-hakt.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L01-LK18-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L01-LK18-moderation.jpg` |
| 2 | LK19 Maschine 4 verhält sich seltsam | Montag 06:48 Uhr | 3 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 2 von 13 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v2-maschine-seltsam.png / lk19-fraeslinie-stoerung.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L02-LK19-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L02-LK19-moderation.jpg` |
| 3 | LK20 Keine Aufträge mehr | Montag 06:55 Uhr | 6 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 3 von 13 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v3-keine-auftraege.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L03-LK20-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L03-LK20-moderation.jpg` |
| 4 | LK01 Cyberangriff | Montag 07:00 Uhr | 9 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 4 von 13 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | lk01-loesegeld-kamera-foto.webp / lk01-stille-gemurmel.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L04-LK01-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L04-LK01-moderation.jpg` |
| 5 | LK02 Produktion stoppt | Montag 09:00 Uhr | 16.2 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 5 von 13 | ✓/✓ | ✓ | SK40→leitung-produktion:zugestellt | W1=offen W2=offen W3=offen W4=offen | – | lk02-produktion-gestoppt-foto.webp / lk02-produktion-faehrt-herunter.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L05-LK02-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L05-LK02-moderation.jpg` |
| 6 | LK22 Kommunikation ohne IT | Montag 10:00 Uhr | 23.4 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 6 von 13 | ✓/✓ | ✓ | SK21→notfallmanagement-bcm:zugestellt | W1=am-netz W2=offen W3=offen W4=offen | – | lk22-kommunikation-ohne-it.png / lk22-funk-abgebrochen.mp3 läuft | 7 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L06-LK22-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L06-LK22-moderation.jpg` |
| 7 | LK05 Schlüsselperson fällt aus | Dienstag 08:00 Uhr | 30.6 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 7 von 13 | ✓/✓ | ✓ | SK01→leiter-it:zugestellt | W1=am-netz W2=proaktiv W3=offen W4=offen | – | lk05-leerer-arbeitsplatz-foto.webp / lk05-it-bereitschaft.mp3 läuft | 2 am Zug, 1 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L07-LK05-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L07-LK05-moderation.jpg` |
| 8 | LK07 Datenschutz | Dienstag 13:00 Uhr | 37.8 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 8 von 13 | ✓/✓ | ✓ | SK05→geschaeftsfuehrerin-vertrieb:zugestellt, SK23→notfallmanagement-bcm:zugestellt | W1=am-netz W2=proaktiv W3=offen W4=offen | – | lk07-datenschutz.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L08-LK07-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L08-LK07-moderation.jpg` |
| 9 | LK09 Backups gefunden | Mittwoch 11:00 Uhr | 45 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 9 von 13 | ✓/✓ | ✓ | SK41→leitung-qualitaet:zugestellt, SK20→geschaeftsfuehrer-ceo:zugestellt | W1=am-netz W2=proaktiv W3=abwarten W4=gezahlt | – | lk09-offline-backup-foto.webp / kein Ton läuft | 2 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L09-LK09-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L09-LK09-moderation.jpg` |
| 10 | LK24 Wer bekommt das erste System? | Mittwoch 15:00 Uhr | 52.2 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 10 von 13 | ✓/✓ | ✓ | SK19→leiter-it:zugestellt | W1=am-netz W2=proaktiv W3=abwarten W4=gezahlt | – | lk24-erstes-system.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L10-LK24-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L10-LK24-moderation.jpg` |
| 11 | LK17 Beirat fordert Lagebericht | Donnerstag 07:00 Uhr | 59.4 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 11 von 13 | ✓/✓ | ✓ | SK27→leiter-it:zugestellt | W1=am-netz W2=proaktiv W3=abwarten W4=gezahlt | – | lk17-zwischenfazit-foto.webp / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L11-LK17-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L11-LK17-moderation.jpg` |
| 12 | LK12 Teilweiser Wiederanlauf | Freitag 08:00 Uhr | 66.6 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 12 von 13 | ✓/✓ | ✓ | SK17→geschaeftsfuehrer-ceo:zugestellt, SK47→kaufmaennische-leiterin-cfo:zugestellt, SK44→geschaeftsfuehrer-ceo:zugestellt | W1=am-netz W2=proaktiv W3=abwarten W4=gezahlt | – | lk12-werk-sued-online-foto.webp / lk12-anlage-faehrt-hoch.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L12-LK12-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L12-LK12-moderation.jpg` |
| 13 | LK15 Wiederanlauf | Sonntag 12:00 Uhr | 73.8 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 13 von 13 | ✓/✓ | ✓ | SK29→kaufmaennische-leiterin-cfo:zugestellt | W1=am-netz W2=proaktiv W3=abwarten W4=gezahlt | – | lk15-wiederanlauf.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-90-krisenfuehrung/bilder/L13-LK15-buehne.jpg`, `e2e/NT-90-krisenfuehrung/bilder/L13-LK15-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.nordtech.json | scenario.nordtech.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 12 Personen übernommen | 12 übernommen (10 auf vorhandene Rollen-Zeilen, 2 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 9 Rollen besetzt, 12 Personen | 9 Rollen besetzt, 12 Personen; Teams: 3 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 12 | Begrüßung 12, Briefing 12 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | am-netz | am-netz | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | proaktiv | proaktiv | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | abwarten | abwarten | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | gezahlt | gezahlt | bestanden |
| B-B7 | Überraschung B7 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B7-buehne.jpg | bestanden |
| B-B5 | Überraschung B5 über die Oberfläche | per Mail an die Rolle | 1 Mail(s); Bild bilder/U-B5-buehne.jpg | bestanden |
| E1 | Gesamteinschätzung (8 Kriterien) gespeichert und nach Neuladen angezeigt | 8 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1; Notizen 8/8 | bestanden |
| E2 | Szenariospezifisches Raster | 8 allgemeine Kriterien | 8 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 13 Zeilen wie im Journal | 13 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK40 SK21 SK01 SK05 SK23 SK41 SK20 SK19 SK27 SK17 SK47 SK44 SK29 SK38 SK33 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B7 B5 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B7 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 8/8 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 6.760.000 €, beim Unternehmen 5.360.000 € | Protokoll enthält Brutto: ja; Moderation 6.760.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 12 Personen korrekt | bestanden |
| O3 | Folgekarte SK44 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK27 | zugestellt | zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): 12 Personen gleichmäßig auf 9 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## NT-120-it

Sitzung `20261120085403-3j9d` · Entscheidungen: W1=trennen, W2=abwarten, W3=melden, W4=gezahlt · Überraschungen: B6 nach LK22, B3 nach LK07 · Bilder: Setup `e2e/NT-120-it/bilder/00-setup.jpg`, Bilanz `e2e/NT-120-it/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/NT-120-it/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK18 Anmeldung hakt | Montag 06:41 Uhr | 0 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 0 von 15 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v1-anmeldung-hakt.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L01-LK18-buehne.jpg`, `e2e/NT-120-it/bilder/L01-LK18-moderation.jpg` |
| 2 | LK19 Maschine 4 verhält sich seltsam | Montag 06:48 Uhr | 3 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 2 von 15 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v2-maschine-seltsam.png / lk19-fraeslinie-stoerung.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L02-LK19-buehne.jpg`, `e2e/NT-120-it/bilder/L02-LK19-moderation.jpg` |
| 3 | LK20 Keine Aufträge mehr | Montag 06:55 Uhr | 6 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 3 von 15 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v3-keine-auftraege.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L03-LK20-buehne.jpg`, `e2e/NT-120-it/bilder/L03-LK20-moderation.jpg` |
| 4 | LK01 Cyberangriff | Montag 07:00 Uhr | 9 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 4 von 15 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | lk01-loesegeld-kamera-foto.webp / lk01-stille-gemurmel.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L04-LK01-buehne.jpg`, `e2e/NT-120-it/bilder/L04-LK01-moderation.jpg` |
| 5 | LK16 OT-Trennung | Montag 08:00 Uhr | 17.3 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 5 von 15 | ✓/✓ | ✓ | SK34→it-service-desk:zugestellt, SK40→leitung-produktion:zugestellt | W1=offen W2=offen W3=offen W4=offen | – | lk16-incident-overview-foto.webp / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L05-LK16-buehne.jpg`, `e2e/NT-120-it/bilder/L05-LK16-moderation.jpg` |
| 6 | LK02 Produktion stoppt | Montag 09:00 Uhr | 25.5 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 6 von 15 | ✓/✓ | ✓ | – | W1=trennen W2=offen W3=offen W4=offen | – | lk02-produktion-gestoppt-foto.webp / lk02-produktion-faehrt-herunter.mp3 läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L06-LK02-buehne.jpg`, `e2e/NT-120-it/bilder/L06-LK02-moderation.jpg` |
| 7 | LK22 Kommunikation ohne IT | Montag 10:00 Uhr | 33.8 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 7 von 15 | ✓/✓ | ✓ | SK21→notfallmanagement-bcm:zugestellt | W1=trennen W2=offen W3=offen W4=offen | – | lk22-kommunikation-ohne-it.png / lk22-funk-abgebrochen.mp3 läuft | 8 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L07-LK22-buehne.jpg`, `e2e/NT-120-it/bilder/L07-LK22-moderation.jpg` |
| 8 | LK07 Datenschutz | Dienstag 13:00 Uhr | 42 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 8 von 15 | ✓/✓ | ✓ | SK01→leiter-it:zugestellt, SK43→geschaeftsfuehrerin-vertrieb:zugestellt | W1=trennen W2=abwarten W3=offen W4=offen | – | lk07-datenschutz.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L08-LK07-buehne.jpg`, `e2e/NT-120-it/bilder/L08-LK07-moderation.jpg` |
| 9 | LK09 Backups gefunden | Mittwoch 11:00 Uhr | 50.3 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 9 von 15 | ✓/✓ | ✓ | SK46→geschaeftsfuehrerin-vertrieb:zugestellt, SK41→leitung-qualitaet:zugestellt, SK20→geschaeftsfuehrer-ceo:zugestellt | W1=trennen W2=abwarten W3=melden W4=gezahlt | – | lk09-offline-backup-foto.webp / kein Ton läuft | 2 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L09-LK09-buehne.jpg`, `e2e/NT-120-it/bilder/L09-LK09-moderation.jpg` |
| 10 | LK24 Wer bekommt das erste System? | Mittwoch 15:00 Uhr | 58.5 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 10 von 15 | ✓/✓ | ✓ | SK19→leiter-it:zugestellt | W1=trennen W2=abwarten W3=melden W4=gezahlt | – | lk24-erstes-system.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L10-LK24-buehne.jpg`, `e2e/NT-120-it/bilder/L10-LK24-moderation.jpg` |
| 11 | LK17 Beirat fordert Lagebericht | Donnerstag 07:00 Uhr | 66.8 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 11 von 15 | ✓/✓ | ✓ | SK02→leiter-it:zugestellt, SK27→leiter-it:zugestellt | W1=trennen W2=abwarten W3=melden W4=gezahlt | – | lk17-zwischenfazit-foto.webp / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L11-LK17-buehne.jpg`, `e2e/NT-120-it/bilder/L11-LK17-moderation.jpg` |
| 12 | LK12 Teilweiser Wiederanlauf | Freitag 08:00 Uhr | 75 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 12 von 15 | ✓/✓ | ✓ | SK17→geschaeftsfuehrer-ceo:zugestellt, SK47→kaufmaennische-leiterin-cfo:zugestellt | W1=trennen W2=abwarten W3=melden W4=gezahlt | – | lk12-werk-sued-online-foto.webp / lk12-anlage-faehrt-hoch.mp3 läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L12-LK12-buehne.jpg`, `e2e/NT-120-it/bilder/L12-LK12-moderation.jpg` |
| 13 | LK14 ERP-Testbetrieb | Samstag 09:00 Uhr | 83.3 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 13 von 15 | ✓/✓ | ✓ | SK37→kundenservice-callcenter:zugestellt | W1=trennen W2=abwarten W3=melden W4=gezahlt | – | lk14-erp-testbetrieb-foto.webp / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L13-LK14-buehne.jpg`, `e2e/NT-120-it/bilder/L13-LK14-moderation.jpg` |
| 14 | LK25 Zwei Listen, zwei Wahrheiten | Samstag 11:00 Uhr | 91.5 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 14 von 15 | ✓/✓ | ✓ | SK38→it-service-desk:zugestellt | W1=trennen W2=abwarten W3=melden W4=gezahlt | – | lk25-zwei-listen.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L14-LK25-buehne.jpg`, `e2e/NT-120-it/bilder/L14-LK25-moderation.jpg` |
| 15 | LK15 Wiederanlauf | Sonntag 12:00 Uhr | 99.8 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 15 von 15 | ✓/✓ | ✓ | SK32→leiter-einkauf:zugestellt, SK33→kommunikation-marketing:zugestellt | W1=trennen W2=abwarten W3=melden W4=gezahlt | – | lk15-wiederanlauf.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-120-it/bilder/L15-LK15-buehne.jpg`, `e2e/NT-120-it/bilder/L15-LK15-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.nordtech.json | scenario.nordtech.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 14 Personen übernommen | 14 übernommen (13 auf vorhandene Rollen-Zeilen, 1 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 12 Rollen besetzt, 14 Personen | 12 Rollen besetzt, 14 Personen; Teams: 2 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 14 | Begrüßung 14, Briefing 14 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | trennen | trennen | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | abwarten | abwarten | bestanden |
| B-B6 | Überraschung B6 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B6-buehne.jpg | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | melden | melden | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | gezahlt | gezahlt | bestanden |
| B-B3 | Überraschung B3 über die Oberfläche | per Mail an die Rolle | 1 Mail(s); Bild bilder/U-B3-buehne.jpg | bestanden |
| E1 | Gesamteinschätzung (8 Kriterien) gespeichert und nach Neuladen angezeigt | 8 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1; Notizen 8/8 | bestanden |
| E2 | Szenariospezifisches Raster | 8 allgemeine Kriterien | 8 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 15 Zeilen wie im Journal | 15 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK34 SK40 SK21 SK01 SK43 SK46 SK41 SK20 SK19 SK02 SK27 SK17 SK47 SK37 SK38 SK32 SK33 SK49 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B6 B3 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B6 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 8/8 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 6.860.000 €, beim Unternehmen 5.460.000 € | Protokoll enthält Brutto: ja; Moderation 6.860.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 14 Personen korrekt | bestanden |
| O3 | Folgekarte SK43 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK27 | zugestellt | zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): 14 Personen gleichmäßig auf 12 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## NT-180-alle-rollen

Sitzung `20261120085336-l4c9` · Entscheidungen: W1=am-netz, W2=proaktiv, W3=melden, W4=nicht-gezahlt · Überraschungen: B8 nach LK14, B7 nach LK17, B6 nach LK22 · Bilder: Setup `e2e/NT-180-alle-rollen/bilder/00-setup.jpg`, Bilanz `e2e/NT-180-alle-rollen/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/NT-180-alle-rollen/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK18 Anmeldung hakt | Montag 06:41 Uhr | 0 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 0 von 21 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v1-anmeldung-hakt.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L01-LK18-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L01-LK18-moderation.jpg` |
| 2 | LK19 Maschine 4 verhält sich seltsam | Montag 06:48 Uhr | 3 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 2 von 21 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v2-maschine-seltsam.png / lk19-fraeslinie-stoerung.mp3 läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L02-LK19-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L02-LK19-moderation.jpg` |
| 3 | LK20 Keine Aufträge mehr | Montag 06:55 Uhr | 6 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 3 von 21 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | v3-keine-auftraege.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L03-LK20-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L03-LK20-moderation.jpg` |
| 4 | LK01 Cyberangriff | Montag 07:00 Uhr | 9 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 4 von 21 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen | – | lk01-loesegeld-kamera-foto.webp / lk01-stille-gemurmel.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L04-LK01-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L04-LK01-moderation.jpg` |
| 5 | LK16 OT-Trennung | Montag 08:00 Uhr | 17.7 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 5 von 21 | ✓/✓ | ✓ | SK40→leitung-produktion:zugestellt | W1=offen W2=offen W3=offen W4=offen | – | lk16-incident-overview-foto.webp / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L05-LK16-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L05-LK16-moderation.jpg` |
| 6 | LK02 Produktion stoppt | Montag 09:00 Uhr | 26.4 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 6 von 21 | ✓/✓ | ✓ | – | W1=am-netz W2=offen W3=offen W4=offen | – | lk02-produktion-gestoppt-foto.webp / lk02-produktion-faehrt-herunter.mp3 läuft | 8 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L06-LK02-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L06-LK02-moderation.jpg` |
| 7 | LK22 Kommunikation ohne IT | Montag 10:00 Uhr | 35 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 7 von 21 | ✓/✓ | ✓ | SK45→standortleitung-werk-sued:zugestellt, SK21→notfallmanagement-bcm:zugestellt | W1=am-netz W2=offen W3=offen W4=offen | – | lk22-kommunikation-ohne-it.png / lk22-funk-abgebrochen.mp3 läuft | 8 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L07-LK22-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L07-LK22-moderation.jpg` |
| 8 | LK04 Nordkanal-Anfrage | Montag 14:00 Uhr | 43.7 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 8 von 21 | ✓/✓ | ✓ | SK01→leiter-it:zugestellt | W1=am-netz W2=proaktiv W3=offen W4=offen | – · Gesprächsleitfaden angezeigt | lk04-nordkanal-anfrage.png / telefon-klingeln.mp3 läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L08-LK04-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L08-LK04-moderation.jpg` |
| 9 | LK05 Schlüsselperson fällt aus | Dienstag 08:00 Uhr | 52.3 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 9 von 21 | ✓/✓ | ✓ | SK05→geschaeftsfuehrerin-vertrieb:zugestellt, SK06→key-account-automotive:zugestellt | W1=am-netz W2=proaktiv W3=offen W4=offen | – | lk05-leerer-arbeitsplatz-foto.webp / lk05-it-bereitschaft.mp3 läuft | 3 am Zug, 1 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L09-LK05-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L09-LK05-moderation.jpg` |
| 10 | LK07 Datenschutz | Dienstag 13:00 Uhr | 61 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 10 von 21 | ✓/✓ | ✓ | SK25→key-account-pharma:zugestellt, SK08→kaufmaennische-leiterin-cfo:zugestellt | W1=am-netz W2=proaktiv W3=offen W4=offen | – | lk07-datenschutz.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L10-LK07-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L10-LK07-moderation.jpg` |
| 11 | LK09 Backups gefunden | Mittwoch 11:00 Uhr | 69.7 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 11 von 21 | ✓/✓ | ✓ | SK41→leitung-qualitaet:zugestellt, SK20→geschaeftsfuehrer-ceo:zugestellt, SK14→inventuren-spezialprozesse:zugestellt, SK09→debitorenbuchhaltung:zugestellt, SK10→debitorenmanagement:zugestellt | W1=am-netz W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk09-offline-backup-foto.webp / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L11-LK09-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L11-LK09-moderation.jpg` |
| 12 | LK24 Wer bekommt das erste System? | Mittwoch 15:00 Uhr | 78.4 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 12 von 21 | ✓/✓ | ✓ | – | W1=am-netz W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk24-erstes-system.png / kein Ton läuft | 8 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L12-LK24-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L12-LK24-moderation.jpg` |
| 13 | LK17 Beirat fordert Lagebericht | Donnerstag 07:00 Uhr | 87 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 13 von 21 | ✓/✓ | ✓ | SK02→it-mitarbeiter:zugestellt | W1=am-netz W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk17-zwischenfazit-foto.webp / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L13-LK17-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L13-LK17-moderation.jpg` |
| 14 | LK10 Nordkanal-Sonderbericht | Donnerstag 08:00 Uhr | 95.7 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 14 von 21 | ✓/✓ | ✓ | SK17→geschaeftsfuehrer-ceo:zugestellt | W1=am-netz W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk10-nordkanal-studio-foto.webp / lk10-nordkanal-nachrichten.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L14-LK10-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L14-LK10-moderation.jpg` |
| 15 | LK11 Pharmakunde eskaliert | Donnerstag 13:00 Uhr | 104.4 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 15 von 21 | ✓/✓ | ✓ | SK37→kundenservice-callcenter:zugestellt, SK13→erp-beratung:zugestellt, SK16→office-management:zugestellt | W1=am-netz W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk11-pharmakunde-foto.webp / kein Ton läuft | 8 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L15-LK11-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L15-LK11-moderation.jpg` |
| 16 | LK12 Teilweiser Wiederanlauf | Freitag 08:00 Uhr | 113 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 16 von 21 | ✓/✓ | ✓ | – | W1=am-netz W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk12-werk-sued-online-foto.webp / lk12-anlage-faehrt-hoch.mp3 läuft | 10 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L16-LK12-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L16-LK12-moderation.jpg` |
| 17 | LK13 Cyberversicherung | Freitag 11:00 Uhr | 121.7 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 17 von 21 | ✓/✓ | ✓ | – | W1=am-netz W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk13-cyberversicherung-foto.webp / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L17-LK13-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L17-LK13-moderation.jpg` |
| 18 | LK21 Chargenfreigabe | Freitag 16:00 Uhr | 130.3 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 18 von 21 | ✓/✓ | ✓ | – | W1=am-netz W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk21-chargenfreigabe.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L18-LK21-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L18-LK21-moderation.jpg` |
| 19 | LK14 ERP-Testbetrieb | Samstag 09:00 Uhr | 139 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 19 von 21 | ✓/✓ | ✓ | SK15→assistenz-gf-dokumentation:zugestellt | W1=am-netz W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk14-erp-testbetrieb-foto.webp / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L19-LK14-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L19-LK14-moderation.jpg` |
| 20 | LK25 Zwei Listen, zwei Wahrheiten | Samstag 11:00 Uhr | 147.7 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 20 von 21 | ✓/✓ | ✓ | SK48→erp-stammdaten:zugestellt, SK31→fakturierung:zugestellt, SK38→it-service-desk:zugestellt | W1=am-netz W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk25-zwei-listen.png / kein Ton läuft | 8 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L20-LK25-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L20-LK25-moderation.jpg` |
| 21 | LK15 Wiederanlauf | Sonntag 12:00 Uhr | 156.3 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 21 von 21 | ✓/✓ | ✓ | SK32→leiter-einkauf:zugestellt, SK33→kommunikation-marketing:zugestellt | W1=am-netz W2=proaktiv W3=melden W4=nicht-gezahlt | – | lk15-wiederanlauf.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/NT-180-alle-rollen/bilder/L21-LK15-buehne.jpg`, `e2e/NT-180-alle-rollen/bilder/L21-LK15-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.nordtech.json | scenario.nordtech.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 28 Personen übernommen | 28 übernommen (24 auf vorhandene Rollen-Zeilen, 4 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 24 Rollen besetzt, 28 Personen | 24 Rollen besetzt, 28 Personen; Teams: 4 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 28 | Begrüßung 28, Briefing 28 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | am-netz | am-netz | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | proaktiv | proaktiv | bestanden |
| B-B6 | Überraschung B6 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B6-buehne.jpg | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | melden | melden | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | nicht-gezahlt | nicht-gezahlt | bestanden |
| B-B7 | Überraschung B7 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B7-buehne.jpg | bestanden |
| B-B8 | Überraschung B8 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B8-buehne.jpg | bestanden |
| E1 | Gesamteinschätzung (8 Kriterien) gespeichert und nach Neuladen angezeigt | 8 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1; Notizen 8/8 | bestanden |
| E2 | Szenariospezifisches Raster | 8 allgemeine Kriterien | 8 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 21 Zeilen wie im Journal | 21 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK40 SK45 SK21 SK01 SK05 SK06 SK25 SK08 SK41 SK20 SK14 SK09 SK10 SK02 SK17 SK37 SK13 SK16 SK15 SK48 SK31 SK38 SK32 SK33 SK49 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B6 B7 B8 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B6 B7 B8 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 8/8 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 4.610.000 €, beim Unternehmen 3.210.000 € | Protokoll enthält Brutto: ja; Moderation 4.610.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 28 Personen korrekt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): 28 Personen gleichmäßig auf 24 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## WK-45-unguenstig

Sitzung `20261120085638-m84v` · Entscheidungen: W1=weiterlaufen, W2=spaeter, W3=bergen, W4=minimal, W5=eigene · Überraschungen: B6 nach LK09, B7 nach LK15 (vorher gesperrt erwartet) · Bilder: Setup `e2e/WK-45-unguenstig/bilder/00-setup.jpg`, Bilanz `e2e/WK-45-unguenstig/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/WK-45-unguenstig/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK03 Serverraum wird warm | Dienstag 03:02 Uhr | 0 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 1 von 9 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk03-serverraum-warm.png / lk03-klimaalarm.mp3 läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-45-unguenstig/bilder/L01-LK03-buehne.jpg`, `e2e/WK-45-unguenstig/bilder/L01-LK03-moderation.jpg` |
| 2 | LK04 Brandalarm im Rechenzentrum | Dienstag 03:10 Uhr | 2 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 2 von 9 | ✓/✓ | ✓ | SK03→leiter-it:zugestellt | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – | lk04-brandalarm.png / lk04-loeschanlage-durchsage.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-45-unguenstig/bilder/L02-LK04-buehne.jpg`, `e2e/WK-45-unguenstig/bilder/L02-LK04-moderation.jpg` |
| 3 | LK06 Lagebild nach dem Löschen | Dienstag 05:30 Uhr | 6.8 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 3 von 9 | ✓/✓ | ✓ | – | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – | lk06-lagebild.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-45-unguenstig/bilder/L03-LK06-buehne.jpg`, `e2e/WK-45-unguenstig/bilder/L03-LK06-moderation.jpg` |
| 4 | LK09 Die Partnermärkte rufen an | Dienstag 08:30 Uhr | 11.5 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 4 von 9 | ✓/✓ | ✓ | SK06→leiter-arbeitssicherheit:zugestellt, SK34→geschaeftsfuehrer-ceo:zugestellt | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – · Gesprächsleitfaden angezeigt | lk09-partnermaerkte.png / telefon-klingeln.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-45-unguenstig/bilder/L04-LK09-buehne.jpg`, `e2e/WK-45-unguenstig/bilder/L04-LK09-moderation.jpg` |
| 5 | LK14 Den Backup-Server bergen? | Mittwoch 07:30 Uhr | 16.3 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 5 von 9 | ✓/✓ | ✓ | SK11→partnerbetreuung:zugestellt, SK08→leiter-it:zugestellt, SK35→leiter-it:zugestellt, SK41→leiter-it:zugestellt, SK42→geschaeftsfuehrer-ceo:zugestellt | W1=weiterlaufen W2=spaeter W3=offen W4=offen W5=offen | – | lk14-bergen.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-45-unguenstig/bilder/L05-LK14-buehne.jpg`, `e2e/WK-45-unguenstig/bilder/L05-LK14-moderation.jpg` |
| 6 | LK15 Wie weit geht der Ausweichbetrieb? | Mittwoch 10:00 Uhr | 21 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 6 von 9 | ✓/✓ | ✓ | SK21→leiter-arbeitssicherheit:zugestellt, SK13→facility-management:zugestellt, SK14→leiter-it:zugestellt, SK18→leiter-it:zugestellt, SK19→leiter-it:zugestellt | W1=weiterlaufen W2=spaeter W3=bergen W4=offen W5=offen | – | lk15-ausweich.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-45-unguenstig/bilder/L06-LK15-buehne.jpg`, `e2e/WK-45-unguenstig/bilder/L06-LK15-moderation.jpg` |
| 7 | LK20 Wer wird zuerst umgestellt? | Donnerstag 10:00 Uhr | 25.8 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 7 von 9 | ✓/✓ | ✓ | SK46→geschaeftsfuehrer-ceo:zugestellt | W1=weiterlaufen W2=spaeter W3=bergen W4=minimal W5=offen | – | lk20-reihenfolge.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-45-unguenstig/bilder/L07-LK20-buehne.jpg`, `e2e/WK-45-unguenstig/bilder/L07-LK20-moderation.jpg` |
| 8 | LK22 Die Kassen laufen wieder | Donnerstag 18:00 Uhr | 30.5 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 8 von 9 | ✓/✓ | ✓ | SK43→leiter-arbeitssicherheit:zugestellt | W1=weiterlaufen W2=spaeter W3=bergen W4=minimal W5=eigene | – | lk22-kassen-laufen.png / lk22-kasse-startet.mp3 läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-45-unguenstig/bilder/L08-LK22-buehne.jpg`, `e2e/WK-45-unguenstig/bilder/L08-LK22-moderation.jpg` |
| 9 | LK27 Stabiler Notbetrieb | Sonntag 12:00 Uhr | 35.3 / 40 Min. + ca. 5 Min. Abschluss · Lagekarte 9 von 9 | ✓/✓ | ✓ | SK44→partnerbetreuung:zugestellt | W1=weiterlaufen W2=spaeter W3=bergen W4=minimal W5=eigene | – | lk27-notbetrieb.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-45-unguenstig/bilder/L09-LK27-buehne.jpg`, `e2e/WK-45-unguenstig/bilder/L09-LK27-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.waterkant.json | scenario.waterkant.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 6 Personen übernommen | 6 übernommen (3 auf vorhandene Rollen-Zeilen, 3 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 5 Rollen besetzt, 6 Personen | 5 Rollen besetzt, 6 Personen; Teams: 1 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 6 | Begrüßung 6, Briefing 6 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | weiterlaufen | weiterlaufen | bestanden |
| T2 | Pause und Fortsetzen über die Oberfläche | Zeit steht in der Pause (8 s), läuft danach weiter (8 s; Anzeige auf 0,1 Min. gerundet) | 6.8 → 6.8 (8 s Pause) → 6.9 | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | spaeter | spaeter | bestanden |
| B-B6 | Überraschung B6 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B6-buehne.jpg | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | bergen | bergen | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | minimal | minimal | bestanden |
| B-B7 | Überraschung B7: Auslösesperre | gesperrt | gesperrt („Passt erst nach: nur in Übungen ab 90 Minuten“) | bestanden |
| W-W5 | Entscheidung W5 über die Oberfläche festgehalten | eigene | eigene | bestanden |
| E1 | Gesamteinschätzung (10 Kriterien) gespeichert und nach Neuladen angezeigt | 10 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1,0,2; Notizen 10/10 | bestanden |
| E2 | Szenariospezifisches Raster | 10 Kriterien aus dem Drehbuch | 10 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 9 Zeilen wie im Journal | 9 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK03 SK06 SK34 SK11 SK08 SK35 SK41 SK42 SK21 SK13 SK14 SK18 SK19 SK46 SK43 SK44 SK32 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4, W5 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B6 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B6 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 10/10 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 3.676.000 €, beim Unternehmen 2.076.000 € | Protokoll enthält Brutto: ja; Moderation 3.676.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 6 Personen korrekt | bestanden |
| O3 | Folgekarte SK41 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK42 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK43 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK44 | zugestellt | zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): Szenario wirklich wechseln? Der aktuelle Lauf wird zurückgesetzt. Alle Personen bleiben erhalten, Rollen, die es im neuen Szenario nicht gibt, musst du neu zuweisen. · 6 Personen gleichmäßig auf 5 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## WK-60-gemischt

Sitzung `20261120085701-r1cd` · Entscheidungen: W1=herunterfahren, W2=spaeter, W3=abwarten, W4=ausbauen, W5=gleichrangig · Überraschungen: B5 nach LK14, B2 nach LK14 · Bilder: Setup `e2e/WK-60-gemischt/bilder/00-setup.jpg`, Bilanz `e2e/WK-60-gemischt/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/WK-60-gemischt/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK03 Serverraum wird warm | Dienstag 03:02 Uhr | 0 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 1 von 9 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk03-serverraum-warm.png / lk03-klimaalarm.mp3 läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-60-gemischt/bilder/L01-LK03-buehne.jpg`, `e2e/WK-60-gemischt/bilder/L01-LK03-moderation.jpg` |
| 2 | LK04 Brandalarm im Rechenzentrum | Dienstag 03:10 Uhr | 2 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 2 von 9 | ✓/✓ | ✓ | SK03→leiter-it:zugestellt | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – | lk04-brandalarm.png / lk04-loeschanlage-durchsage.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-60-gemischt/bilder/L02-LK04-buehne.jpg`, `e2e/WK-60-gemischt/bilder/L02-LK04-moderation.jpg` |
| 3 | LK06 Lagebild nach dem Löschen | Dienstag 05:30 Uhr | 8.5 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 3 von 9 | ✓/✓ | ✓ | – | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – | lk06-lagebild.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-60-gemischt/bilder/L03-LK06-buehne.jpg`, `e2e/WK-60-gemischt/bilder/L03-LK06-moderation.jpg` |
| 4 | LK09 Die Partnermärkte rufen an | Dienstag 08:30 Uhr | 15 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 4 von 9 | ✓/✓ | ✓ | SK06→leiter-arbeitssicherheit:zugestellt, SK34→geschaeftsfuehrer-ceo:zugestellt | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – · Gesprächsleitfaden angezeigt | lk09-partnermaerkte.png / telefon-klingeln.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-60-gemischt/bilder/L04-LK09-buehne.jpg`, `e2e/WK-60-gemischt/bilder/L04-LK09-moderation.jpg` |
| 5 | LK14 Den Backup-Server bergen? | Mittwoch 07:30 Uhr | 21.5 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 5 von 9 | ✓/✓ | ✓ | SK11→partnerbetreuung:zugestellt, SK08→leiter-it:zugestellt, SK35→leiter-it:zugestellt, SK42→geschaeftsfuehrer-ceo:zugestellt | W1=herunterfahren W2=spaeter W3=offen W4=offen W5=offen | – | lk14-bergen.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-60-gemischt/bilder/L05-LK14-buehne.jpg`, `e2e/WK-60-gemischt/bilder/L05-LK14-moderation.jpg` |
| 6 | LK15 Wie weit geht der Ausweichbetrieb? | Mittwoch 10:00 Uhr | 28 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 6 von 9 | ✓/✓ | ✓ | SK21→leiter-arbeitssicherheit:zugestellt, SK13→facility-management:zugestellt, SK14→leiter-it:zugestellt, SK18→leiter-finanzen-cfo:zugestellt, SK19→leiter-it:zugestellt | W1=herunterfahren W2=spaeter W3=abwarten W4=offen W5=offen | – | lk15-ausweich.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-60-gemischt/bilder/L06-LK15-buehne.jpg`, `e2e/WK-60-gemischt/bilder/L06-LK15-moderation.jpg` |
| 7 | LK20 Wer wird zuerst umgestellt? | Donnerstag 10:00 Uhr | 34.5 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 7 von 9 | ✓/✓ | ✓ | SK46→geschaeftsfuehrer-ceo:zugestellt | W1=herunterfahren W2=spaeter W3=abwarten W4=ausbauen W5=offen | – | lk20-reihenfolge.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-60-gemischt/bilder/L07-LK20-buehne.jpg`, `e2e/WK-60-gemischt/bilder/L07-LK20-moderation.jpg` |
| 8 | LK22 Die Kassen laufen wieder | Donnerstag 18:00 Uhr | 41 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 8 von 9 | ✓/✓ | ✓ | – | W1=herunterfahren W2=spaeter W3=abwarten W4=ausbauen W5=gleichrangig | – | lk22-kassen-laufen.png / lk22-kasse-startet.mp3 läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-60-gemischt/bilder/L08-LK22-buehne.jpg`, `e2e/WK-60-gemischt/bilder/L08-LK22-moderation.jpg` |
| 9 | LK27 Stabiler Notbetrieb | Sonntag 12:00 Uhr | 47.5 / 54 Min. + ca. 6 Min. Abschluss · Lagekarte 9 von 9 | ✓/✓ | ✓ | SK28→leiter-it:zugestellt | W1=herunterfahren W2=spaeter W3=abwarten W4=ausbauen W5=gleichrangig | – | lk27-notbetrieb.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-60-gemischt/bilder/L09-LK27-buehne.jpg`, `e2e/WK-60-gemischt/bilder/L09-LK27-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.waterkant.json | scenario.waterkant.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 8 Personen übernommen | 8 übernommen (3 auf vorhandene Rollen-Zeilen, 5 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 6 Rollen besetzt, 8 Personen | 6 Rollen besetzt, 8 Personen; Teams: 2 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 8 | Begrüßung 8, Briefing 8 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | herunterfahren | herunterfahren | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | spaeter | spaeter | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | abwarten | abwarten | bestanden |
| B-B5 | Überraschung B5 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B5-buehne.jpg | bestanden |
| B-B2 | Überraschung B2 über die Oberfläche | per Mail an die Rolle | 2 Mail(s); Bild bilder/U-B2-buehne.jpg | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | ausbauen | ausbauen | bestanden |
| W-W5 | Entscheidung W5 über die Oberfläche festgehalten | gleichrangig | gleichrangig | bestanden |
| E1 | Gesamteinschätzung (10 Kriterien) gespeichert und nach Neuladen angezeigt | 10 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1,0,2; Notizen 10/10 | bestanden |
| E2 | Szenariospezifisches Raster | 10 Kriterien aus dem Drehbuch | 10 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 9 Zeilen wie im Journal | 9 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK03 SK06 SK34 SK11 SK08 SK35 SK42 SK21 SK13 SK14 SK18 SK19 SK46 SK28 SK32 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4, W5 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B5 B2 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B5 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 10/10 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 3.711.000 €, beim Unternehmen 2.111.000 € | Protokoll enthält Brutto: ja; Moderation 3.711.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 8 Personen korrekt | bestanden |
| O3 | Folgekarte SK42 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK45 | nicht zugestellt (Lage nicht gespielt) | nicht zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): Szenario wirklich wechseln? Der aktuelle Lauf wird zurückgesetzt. Alle Personen bleiben erhalten, Rollen, die es im neuen Szenario nicht gibt, musst du neu zuweisen. · 8 Personen gleichmäßig auf 6 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## WK-90-ausgewogen

Sitzung `20261120085909-3027` · Entscheidungen: W1=herunterfahren, W2=frueh, W3=bergen, W4=minimal, W5=gleichrangig · Überraschungen: B6 nach LK09, B8 nach LK15, B1 nach LK15 · Bilder: Setup `e2e/WK-90-ausgewogen/bilder/00-setup.jpg`, Bilanz `e2e/WK-90-ausgewogen/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/WK-90-ausgewogen/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK01 USV meldet Batteriewarnung | Montag 22:40 Uhr | 0 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 1 von 13 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk01-usv-warnung.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L01-LK01-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L01-LK01-moderation.jpg` |
| 2 | LK02 Geruch im Technikflur | Dienstag 02:35 Uhr | 3 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 2 von 13 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk02-geruch-technikflur.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L02-LK02-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L02-LK02-moderation.jpg` |
| 3 | LK03 Serverraum wird warm | Dienstag 03:02 Uhr | 6 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 3 von 13 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk03-serverraum-warm.png / lk03-klimaalarm.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L03-LK03-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L03-LK03-moderation.jpg` |
| 4 | LK04 Brandalarm im Rechenzentrum | Dienstag 03:10 Uhr | 9 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 4 von 13 | ✓/✓ | ✓ | SK03→leiter-it:zugestellt | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – | lk04-brandalarm.png / lk04-loeschanlage-durchsage.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L04-LK04-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L04-LK04-moderation.jpg` |
| 5 | LK06 Lagebild nach dem Löschen | Dienstag 05:30 Uhr | 16.2 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 5 von 13 | ✓/✓ | ✓ | – | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – | lk06-lagebild.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L05-LK06-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L05-LK06-moderation.jpg` |
| 6 | LK08 Saisonstart ohne Aktionspreise | Dienstag 07:00 Uhr | 23.4 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 6 von 13 | ✓/✓ | ✓ | SK06→leiter-arbeitssicherheit:zugestellt, SK34→geschaeftsfuehrer-ceo:zugestellt | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – | lk08-saisonstart.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L06-LK08-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L06-LK08-moderation.jpg` |
| 7 | LK09 Die Partnermärkte rufen an | Dienstag 08:30 Uhr | 30.6 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 7 von 13 | ✓/✓ | ✓ | SK08→leiter-it:zugestellt, SK35→leiter-it:zugestellt | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – · Gesprächsleitfaden angezeigt | lk09-partnermaerkte.png / telefon-klingeln.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L07-LK09-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L07-LK09-moderation.jpg` |
| 8 | LK14 Den Backup-Server bergen? | Mittwoch 07:30 Uhr | 37.8 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 8 von 13 | ✓/✓ | ✓ | SK11→partnerbetreuung:zugestellt | W1=herunterfahren W2=frueh W3=offen W4=offen W5=offen | – | lk14-bergen.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L08-LK14-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L08-LK14-moderation.jpg` |
| 9 | LK15 Wie weit geht der Ausweichbetrieb? | Mittwoch 10:00 Uhr | 45 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 9 von 13 | ✓/✓ | ✓ | SK21→leiter-arbeitssicherheit:zugestellt, SK13→facility-management:zugestellt, SK14→rz-betrieb:zugestellt, SK18→leiter-finanzen-cfo:zugestellt, SK19→leiter-it:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=offen W5=offen | – | lk15-ausweich.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L09-LK15-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L09-LK15-moderation.jpg` |
| 10 | LK19 Rücksicherung im Ausweich-Rack | Donnerstag 08:00 Uhr | 52.2 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 10 von 13 | ✓/✓ | ✓ | SK46→geschaeftsfuehrer-ceo:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=minimal W5=offen | – | lk19-ruecksicherung.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L10-LK19-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L10-LK19-moderation.jpg` |
| 11 | LK20 Wer wird zuerst umgestellt? | Donnerstag 10:00 Uhr | 59.4 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 11 von 13 | ✓/✓ | ✓ | SK24→leiterin-kommunikation-pr:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=minimal W5=offen | – | lk20-reihenfolge.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L11-LK20-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L11-LK20-moderation.jpg` |
| 12 | LK22 Die Kassen laufen wieder | Donnerstag 18:00 Uhr | 66.6 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 12 von 13 | ✓/✓ | ✓ | SK43→leiter-arbeitssicherheit:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=minimal W5=gleichrangig | – | lk22-kassen-laufen.png / lk22-kasse-startet.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L12-LK22-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L12-LK22-moderation.jpg` |
| 13 | LK27 Stabiler Notbetrieb | Sonntag 12:00 Uhr | 73.8 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 13 von 13 | ✓/✓ | ✓ | SK38→regionalleiterin-filialen-nord:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=minimal W5=gleichrangig | – | lk27-notbetrieb.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-ausgewogen/bilder/L13-LK27-buehne.jpg`, `e2e/WK-90-ausgewogen/bilder/L13-LK27-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.waterkant.json | scenario.waterkant.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 9 Personen übernommen | 9 übernommen (3 auf vorhandene Rollen-Zeilen, 6 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 9 Rollen besetzt, 9 Personen | 9 Rollen besetzt, 9 Personen; Teams: 0 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 9 | Begrüßung 9, Briefing 9 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | herunterfahren | herunterfahren | bestanden |
| T2 | Pause und Fortsetzen über die Oberfläche | Zeit steht in der Pause (8 s), läuft danach weiter (8 s; Anzeige auf 0,1 Min. gerundet) | 16.3 → 16.3 (8 s Pause) → 16.4 | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | frueh | frueh | bestanden |
| B-B6 | Überraschung B6 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B6-buehne.jpg | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | bergen | bergen | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | minimal | minimal | bestanden |
| B-B8 | Überraschung B8 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B8-buehne.jpg | bestanden |
| B-B1 | Überraschung B1 über die Oberfläche | per Mail an die Rolle | 1 Mail(s); Bild bilder/U-B1-buehne.jpg | bestanden |
| W-W5 | Entscheidung W5 über die Oberfläche festgehalten | gleichrangig | gleichrangig | bestanden |
| E1 | Gesamteinschätzung (10 Kriterien) gespeichert und nach Neuladen angezeigt | 10 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1,0,2; Notizen 10/10 | bestanden |
| E2 | Szenariospezifisches Raster | 10 Kriterien aus dem Drehbuch | 10 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 13 Zeilen wie im Journal | 13 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK03 SK06 SK34 SK08 SK35 SK11 SK21 SK13 SK14 SK18 SK19 SK46 SK24 SK43 SK38 SK32 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4, W5 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B6 B8 B1 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B6 B8 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 10/10 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 3.651.000 €, beim Unternehmen 2.051.000 € | Protokoll enthält Brutto: ja; Moderation 3.651.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 9 Personen korrekt | bestanden |
| O3 | Folgekarte SK43 | zugestellt | zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): Szenario wirklich wechseln? Der aktuelle Lauf wird zurückgesetzt. Alle Personen bleiben erhalten, Rollen, die es im neuen Szenario nicht gibt, musst du neu zuweisen. · 9 Personen gleichmäßig auf 9 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## WK-90-krisenfuehrung

Sitzung `20261120085918-32gs` · Entscheidungen: W1=weiterlaufen, W2=frueh, W3=abwarten, W4=ausbauen, W5=eigene · Überraschungen: B7 nach LK15, B5 nach LK14 · Bilder: Setup `e2e/WK-90-krisenfuehrung/bilder/00-setup.jpg`, Bilanz `e2e/WK-90-krisenfuehrung/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/WK-90-krisenfuehrung/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK03 Serverraum wird warm | Dienstag 03:02 Uhr | 0 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 1 von 12 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk03-serverraum-warm.png / lk03-klimaalarm.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L01-LK03-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L01-LK03-moderation.jpg` |
| 2 | LK04 Brandalarm im Rechenzentrum | Dienstag 03:10 Uhr | 3 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 2 von 12 | ✓/✓ | ✓ | SK03→leiter-it:zugestellt | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – | lk04-brandalarm.png / lk04-loeschanlage-durchsage.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L02-LK04-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L02-LK04-moderation.jpg` |
| 3 | LK05 Feuerwehr im Einsatz | Dienstag 03:40 Uhr | 10.1 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 3 von 12 | ✓/✓ | ✓ | – | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – · Gesprächsleitfaden angezeigt | lk05-feuerwehr.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L03-LK05-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L03-LK05-moderation.jpg` |
| 4 | LK06 Lagebild nach dem Löschen | Dienstag 05:30 Uhr | 17.2 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 4 von 12 | ✓/✓ | ✓ | SK04→leiter-arbeitssicherheit:zugestellt | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – | lk06-lagebild.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L04-LK06-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L04-LK06-moderation.jpg` |
| 5 | LK09 Die Partnermärkte rufen an | Dienstag 08:30 Uhr | 24.3 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 5 von 12 | ✓/✓ | ✓ | SK06→leiter-arbeitssicherheit:zugestellt, SK34→geschaeftsfuehrer-ceo:zugestellt | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – · Gesprächsleitfaden angezeigt | lk09-partnermaerkte.png / telefon-klingeln.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L05-LK09-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L05-LK09-moderation.jpg` |
| 6 | LK14 Den Backup-Server bergen? | Mittwoch 07:30 Uhr | 31.4 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 6 von 12 | ✓/✓ | ✓ | SK11→partnerbetreuung:zugestellt, SK08→leiter-it:zugestellt, SK35→leiter-it:zugestellt, SK41→rz-betrieb:zugestellt | W1=weiterlaufen W2=frueh W3=offen W4=offen W5=offen | – | lk14-bergen.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L06-LK14-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L06-LK14-moderation.jpg` |
| 7 | LK15 Wie weit geht der Ausweichbetrieb? | Mittwoch 10:00 Uhr | 38.5 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 7 von 12 | ✓/✓ | ✓ | SK21→leiter-arbeitssicherheit:zugestellt, SK13→facility-management:zugestellt, SK14→rz-betrieb:zugestellt, SK18→leiter-finanzen-cfo:zugestellt, SK19→leiter-it:zugestellt | W1=weiterlaufen W2=frueh W3=abwarten W4=offen W5=offen | – | lk15-ausweich.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L07-LK15-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L07-LK15-moderation.jpg` |
| 8 | LK18 Der Verbundbeirat verlangt Antworten | Mittwoch 19:00 Uhr | 45.6 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 8 von 12 | ✓/✓ | ✓ | SK46→geschaeftsfuehrer-ceo:zugestellt | W1=weiterlaufen W2=frueh W3=abwarten W4=ausbauen W5=offen | – | lk18-verbundbeirat.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L08-LK18-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L08-LK18-moderation.jpg` |
| 9 | LK20 Wer wird zuerst umgestellt? | Donnerstag 10:00 Uhr | 52.7 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 9 von 12 | ✓/✓ | ✓ | SK20→geschaeftsfuehrer-ceo:zugestellt, SK24→leiterin-kommunikation-pr:zugestellt | W1=weiterlaufen W2=frueh W3=abwarten W4=ausbauen W5=offen | – | lk20-reihenfolge.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L09-LK20-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L09-LK20-moderation.jpg` |
| 10 | LK22 Die Kassen laufen wieder | Donnerstag 18:00 Uhr | 59.7 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 10 von 12 | ✓/✓ | ✓ | – | W1=weiterlaufen W2=frueh W3=abwarten W4=ausbauen W5=eigene | – | lk22-kassen-laufen.png / lk22-kasse-startet.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L10-LK22-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L10-LK22-moderation.jpg` |
| 11 | LK24 Der Versicherer ist da | Freitag 14:00 Uhr | 66.8 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 11 von 12 | ✓/✓ | ✓ | SK38→regionalleiterin-filialen-nord:zugestellt | W1=weiterlaufen W2=frueh W3=abwarten W4=ausbauen W5=eigene | – | lk24-versicherer.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L11-LK24-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L11-LK24-moderation.jpg` |
| 12 | LK27 Stabiler Notbetrieb | Sonntag 12:00 Uhr | 73.9 / 81 Min. + ca. 9 Min. Abschluss · Lagekarte 12 von 12 | ✓/✓ | ✓ | SK27→leiter-finanzen-cfo:zugestellt, SK44→partnerbetreuung:zugestellt | W1=weiterlaufen W2=frueh W3=abwarten W4=ausbauen W5=eigene | – | lk27-notbetrieb.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-90-krisenfuehrung/bilder/L12-LK27-buehne.jpg`, `e2e/WK-90-krisenfuehrung/bilder/L12-LK27-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.waterkant.json | scenario.waterkant.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 12 Personen übernommen | 12 übernommen (3 auf vorhandene Rollen-Zeilen, 9 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 9 Rollen besetzt, 12 Personen | 9 Rollen besetzt, 12 Personen; Teams: 3 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 12 | Begrüßung 12, Briefing 12 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | weiterlaufen | weiterlaufen | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | frueh | frueh | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | abwarten | abwarten | bestanden |
| B-B5 | Überraschung B5 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B5-buehne.jpg | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | ausbauen | ausbauen | bestanden |
| B-B7 | Überraschung B7 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B7-buehne.jpg | bestanden |
| W-W5 | Entscheidung W5 über die Oberfläche festgehalten | eigene | eigene | bestanden |
| E1 | Gesamteinschätzung (10 Kriterien) gespeichert und nach Neuladen angezeigt | 10 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1,0,2; Notizen 10/10 | bestanden |
| E2 | Szenariospezifisches Raster | 10 Kriterien aus dem Drehbuch | 10 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 12 Zeilen wie im Journal | 12 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK03 SK04 SK06 SK34 SK11 SK08 SK35 SK41 SK21 SK13 SK14 SK18 SK19 SK46 SK20 SK24 SK38 SK27 SK44 SK32 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4, W5 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B5 B7 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B5 B7 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 10/10 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 3.706.000 €, beim Unternehmen 2.106.000 € | Protokoll enthält Brutto: ja; Moderation 3.706.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 12 Personen korrekt | bestanden |
| O3 | Folgekarte SK41 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK45 | nicht zugestellt (Lage nicht gespielt) | nicht zugestellt | bestanden |
| O3 | Folgekarte SK44 | zugestellt | zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): Szenario wirklich wechseln? Der aktuelle Lauf wird zurückgesetzt. Alle Personen bleiben erhalten, Rollen, die es im neuen Szenario nicht gibt, musst du neu zuweisen. · 12 Personen gleichmäßig auf 9 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## WK-120-it

Sitzung `20261120090227-1ukk` · Entscheidungen: W1=herunterfahren, W2=spaeter, W3=bergen, W4=ausbauen, W5=eigene · Überraschungen: B8 nach LK15, B3 nach LK15, B4 nach LK22 · Bilder: Setup `e2e/WK-120-it/bilder/00-setup.jpg`, Bilanz `e2e/WK-120-it/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/WK-120-it/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK03 Serverraum wird warm | Dienstag 03:02 Uhr | 0 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 1 von 14 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk03-serverraum-warm.png / lk03-klimaalarm.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L01-LK03-buehne.jpg`, `e2e/WK-120-it/bilder/L01-LK03-moderation.jpg` |
| 2 | LK04 Brandalarm im Rechenzentrum | Dienstag 03:10 Uhr | 3 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 2 von 14 | ✓/✓ | ✓ | SK03→leiter-it:zugestellt | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – | lk04-brandalarm.png / lk04-loeschanlage-durchsage.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L02-LK04-buehne.jpg`, `e2e/WK-120-it/bilder/L02-LK04-moderation.jpg` |
| 3 | LK06 Lagebild nach dem Löschen | Dienstag 05:30 Uhr | 11.1 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 3 von 14 | ✓/✓ | ✓ | – | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – | lk06-lagebild.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L03-LK06-buehne.jpg`, `e2e/WK-120-it/bilder/L03-LK06-moderation.jpg` |
| 4 | LK07 Was noch läuft – und was nicht | Dienstag 06:30 Uhr | 19.2 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 4 von 14 | ✓/✓ | ✓ | SK06→leiter-arbeitssicherheit:zugestellt, SK34→notfallmanagement-bcm:zugestellt | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – | lk07-was-laeuft.png / kein Ton läuft | 4 am Zug, 1 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L04-LK07-buehne.jpg`, `e2e/WK-120-it/bilder/L04-LK07-moderation.jpg` |
| 5 | LK09 Die Partnermärkte rufen an | Dienstag 08:30 Uhr | 27.2 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 5 von 14 | ✓/✓ | ✓ | SK08→it-support-filialen:zugestellt, SK35→notfallmanagement-bcm:zugestellt | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – · Gesprächsleitfaden angezeigt | lk09-partnermaerkte.png / telefon-klingeln.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L05-LK09-buehne.jpg`, `e2e/WK-120-it/bilder/L05-LK09-moderation.jpg` |
| 6 | LK10 Serverraum gesperrt | Dienstag 10:00 Uhr | 35.3 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 6 von 14 | ✓/✓ | ✓ | SK11→partnerbetreuung:zugestellt | W1=herunterfahren W2=spaeter W3=offen W4=offen W5=offen | – | lk10-serverraum-gesperrt.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L06-LK10-buehne.jpg`, `e2e/WK-120-it/bilder/L06-LK10-moderation.jpg` |
| 7 | LK13 Ersatz: Hardware oder Ausweich-Rack? | Dienstag 17:00 Uhr | 43.4 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 7 von 14 | ✓/✓ | ✓ | SK13→facility-management:zugestellt, SK14→rz-betrieb:zugestellt | W1=herunterfahren W2=spaeter W3=offen W4=offen W5=offen | – | lk13-ersatz.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L07-LK13-buehne.jpg`, `e2e/WK-120-it/bilder/L07-LK13-moderation.jpg` |
| 8 | LK14 Den Backup-Server bergen? | Mittwoch 07:30 Uhr | 51.5 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 8 von 14 | ✓/✓ | ✓ | SK18→leiter-finanzen-cfo:zugestellt, SK19→leiter-it:zugestellt, SK42→geschaeftsfuehrer-ceo:zugestellt | W1=herunterfahren W2=spaeter W3=offen W4=offen W5=offen | – | lk14-bergen.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L08-LK14-buehne.jpg`, `e2e/WK-120-it/bilder/L08-LK14-moderation.jpg` |
| 9 | LK15 Wie weit geht der Ausweichbetrieb? | Mittwoch 10:00 Uhr | 59.6 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 9 von 14 | ✓/✓ | ✓ | SK21→leiter-arbeitssicherheit:zugestellt | W1=herunterfahren W2=spaeter W3=bergen W4=offen W5=offen | – | lk15-ausweich.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L09-LK15-buehne.jpg`, `e2e/WK-120-it/bilder/L09-LK15-moderation.jpg` |
| 10 | LK19 Rücksicherung im Ausweich-Rack | Donnerstag 08:00 Uhr | 67.6 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 10 von 14 | ✓/✓ | ✓ | SK46→geschaeftsfuehrer-ceo:zugestellt, SK23→online-shop-leitung:zugestellt | W1=herunterfahren W2=spaeter W3=bergen W4=ausbauen W5=offen | – | lk19-ruecksicherung.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L10-LK19-buehne.jpg`, `e2e/WK-120-it/bilder/L10-LK19-moderation.jpg` |
| 11 | LK20 Wer wird zuerst umgestellt? | Donnerstag 10:00 Uhr | 75.7 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 11 von 14 | ✓/✓ | ✓ | SK29→rz-betrieb:zugestellt, SK24→leiterin-kommunikation-pr:zugestellt | W1=herunterfahren W2=spaeter W3=bergen W4=ausbauen W5=offen | – | lk20-reihenfolge.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L11-LK20-buehne.jpg`, `e2e/WK-120-it/bilder/L11-LK20-moderation.jpg` |
| 12 | LK22 Die Kassen laufen wieder | Donnerstag 18:00 Uhr | 83.8 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 12 von 14 | ✓/✓ | ✓ | SK43→leiter-arbeitssicherheit:zugestellt | W1=herunterfahren W2=spaeter W3=bergen W4=ausbauen W5=eigene | – | lk22-kassen-laufen.png / lk22-kasse-startet.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L12-LK22-buehne.jpg`, `e2e/WK-120-it/bilder/L12-LK22-moderation.jpg` |
| 13 | LK23 Die Datenlücke | Freitag 09:00 Uhr | 91.9 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 13 von 14 | ✓/✓ | ✓ | SK38→regionalleiterin-filialen-nord:zugestellt | W1=herunterfahren W2=spaeter W3=bergen W4=ausbauen W5=eigene | – | lk23-datenluecke.png / kein Ton läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L13-LK23-buehne.jpg`, `e2e/WK-120-it/bilder/L13-LK23-moderation.jpg` |
| 14 | LK27 Stabiler Notbetrieb | Sonntag 12:00 Uhr | 99.9 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 14 von 14 | ✓/✓ | ✓ | SK44→partnerbetreuung:zugestellt | W1=herunterfahren W2=spaeter W3=bergen W4=ausbauen W5=eigene | – | lk27-notbetrieb.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-it/bilder/L14-LK27-buehne.jpg`, `e2e/WK-120-it/bilder/L14-LK27-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.waterkant.json | scenario.waterkant.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 14 Personen übernommen | 14 übernommen (4 auf vorhandene Rollen-Zeilen, 10 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 12 Rollen besetzt, 14 Personen | 12 Rollen besetzt, 14 Personen; Teams: 2 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 14 | Begrüßung 14, Briefing 14 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | herunterfahren | herunterfahren | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | spaeter | spaeter | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | bergen | bergen | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | ausbauen | ausbauen | bestanden |
| B-B8 | Überraschung B8 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B8-buehne.jpg | bestanden |
| B-B3 | Überraschung B3 über die Oberfläche | per Mail an die Rolle | 1 Mail(s); Bild bilder/U-B3-buehne.jpg | bestanden |
| W-W5 | Entscheidung W5 über die Oberfläche festgehalten | eigene | eigene | bestanden |
| B-B4 | Überraschung B4 über die Oberfläche | per Mail an die Rolle | 1 Mail(s); Bild bilder/U-B4-buehne.jpg | bestanden |
| E1 | Gesamteinschätzung (10 Kriterien) gespeichert und nach Neuladen angezeigt | 10 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1,0,2; Notizen 10/10 | bestanden |
| E2 | Szenariospezifisches Raster | 10 Kriterien aus dem Drehbuch | 10 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 14 Zeilen wie im Journal | 14 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK03 SK06 SK34 SK08 SK35 SK11 SK13 SK14 SK18 SK19 SK42 SK21 SK46 SK23 SK29 SK24 SK43 SK38 SK44 SK32 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4, W5 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B8 B3 B4 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B8 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 10/10 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 3.711.000 €, beim Unternehmen 2.111.000 € | Protokoll enthält Brutto: ja; Moderation 3.711.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 14 Personen korrekt | bestanden |
| O3 | Folgekarte SK42 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK43 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK45 | nicht zugestellt (Lage nicht gespielt) | nicht zugestellt | bestanden |
| O3 | Folgekarte SK44 | zugestellt | zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): Szenario wirklich wechseln? Der aktuelle Lauf wird zurückgesetzt. Alle Personen bleiben erhalten, Rollen, die es im neuen Szenario nicht gibt, musst du neu zuweisen. · 14 Personen gleichmäßig auf 12 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## WK-180-alle-rollen

Sitzung `20261120090146-qmeb` · Entscheidungen: W1=weiterlaufen, W2=frueh, W3=bergen, W4=ausbauen, W5=gleichrangig · Überraschungen: B6 nach LK09, B5 nach LK14, B7 nach LK15, B4 nach LK22 · Bilder: Setup `e2e/WK-180-alle-rollen/bilder/00-setup.jpg`, Bilanz `e2e/WK-180-alle-rollen/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/WK-180-alle-rollen/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK01 USV meldet Batteriewarnung | Montag 22:40 Uhr | 0 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 1 von 18 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk01-usv-warnung.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L01-LK01-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L01-LK01-moderation.jpg` |
| 2 | LK02 Geruch im Technikflur | Dienstag 02:35 Uhr | 3 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 2 von 18 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk02-geruch-technikflur.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L02-LK02-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L02-LK02-moderation.jpg` |
| 3 | LK03 Serverraum wird warm | Dienstag 03:02 Uhr | 6 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 3 von 18 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk03-serverraum-warm.png / lk03-klimaalarm.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L03-LK03-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L03-LK03-moderation.jpg` |
| 4 | LK04 Brandalarm im Rechenzentrum | Dienstag 03:10 Uhr | 9 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 4 von 18 | ✓/✓ | ✓ | SK03→leiter-it:zugestellt | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – | lk04-brandalarm.png / lk04-loeschanlage-durchsage.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L04-LK04-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L04-LK04-moderation.jpg` |
| 5 | LK05 Feuerwehr im Einsatz | Dienstag 03:40 Uhr | 19.4 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 5 von 18 | ✓/✓ | ✓ | – | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – · Gesprächsleitfaden angezeigt | lk05-feuerwehr.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L05-LK05-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L05-LK05-moderation.jpg` |
| 6 | LK06 Lagebild nach dem Löschen | Dienstag 05:30 Uhr | 29.8 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 6 von 18 | ✓/✓ | ✓ | SK04→schichtleiter-zentrallager:zugestellt | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – | lk06-lagebild.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L06-LK06-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L06-LK06-moderation.jpg` |
| 7 | LK08 Saisonstart ohne Aktionspreise | Dienstag 07:00 Uhr | 40.2 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 7 von 18 | ✓/✓ | ✓ | SK06→leiter-arbeitssicherheit:zugestellt, SK34→assistenz-gf-dokumentation:zugestellt | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – | lk08-saisonstart.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L07-LK08-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L07-LK08-moderation.jpg` |
| 8 | LK09 Die Partnermärkte rufen an | Dienstag 08:30 Uhr | 50.6 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 8 von 18 | ✓/✓ | ✓ | SK08→it-support-filialen:zugestellt, SK35→notfallmanagement-bcm:zugestellt, SK10→regionalleiter-filialen-sued:zugestellt | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – · Gesprächsleitfaden angezeigt | lk09-partnermaerkte.png / telefon-klingeln.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L08-LK09-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L08-LK09-moderation.jpg` |
| 9 | LK10 Serverraum gesperrt | Dienstag 10:00 Uhr | 61 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 9 von 18 | ✓/✓ | ✓ | SK11→partnerbetreuung:zugestellt, SK12→leiter-finanzen-cfo:zugestellt | W1=weiterlaufen W2=frueh W3=offen W4=offen W5=offen | – | lk10-serverraum-gesperrt.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L09-LK10-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L09-LK10-moderation.jpg` |
| 10 | LK14 Den Backup-Server bergen? | Mittwoch 07:30 Uhr | 71.4 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 10 von 18 | ✓/✓ | ✓ | SK13→facility-management:zugestellt, SK14→rz-betrieb:zugestellt, SK41→rz-betrieb:zugestellt | W1=weiterlaufen W2=frueh W3=offen W4=offen W5=offen | – | lk14-bergen.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L10-LK14-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L10-LK14-moderation.jpg` |
| 11 | LK15 Wie weit geht der Ausweichbetrieb? | Mittwoch 10:00 Uhr | 81.8 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 11 von 18 | ✓/✓ | ✓ | SK21→leiter-arbeitssicherheit:zugestellt, SK18→leiter-einkauf:zugestellt, SK19→leiter-it:zugestellt | W1=weiterlaufen W2=frueh W3=bergen W4=offen W5=offen | – | lk15-ausweich.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L11-LK15-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L11-LK15-moderation.jpg` |
| 12 | LK16 Ein Bauunternehmen will Vorrang | Mittwoch 13:00 Uhr | 92.2 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 12 von 18 | ✓/✓ | ✓ | SK46→geschaeftsfuehrer-ceo:zugestellt, SK22→informationssicherheit:zugestellt | W1=weiterlaufen W2=frueh W3=bergen W4=ausbauen W5=offen | – · Gesprächsleitfaden angezeigt | lk16-bauunternehmen.png / telefon-klingeln.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L12-LK16-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L12-LK16-moderation.jpg` |
| 13 | LK19 Rücksicherung im Ausweich-Rack | Donnerstag 08:00 Uhr | 102.6 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 13 von 18 | ✓/✓ | ✓ | – | W1=weiterlaufen W2=frueh W3=bergen W4=ausbauen W5=offen | – | lk19-ruecksicherung.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L13-LK19-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L13-LK19-moderation.jpg` |
| 14 | LK20 Wer wird zuerst umgestellt? | Donnerstag 10:00 Uhr | 113 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 14 von 18 | ✓/✓ | ✓ | SK24→kundenservice-hotline:zugestellt, SK25→leiterin-kommunikation-pr:zugestellt | W1=weiterlaufen W2=frueh W3=bergen W4=ausbauen W5=offen | – | lk20-reihenfolge.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L14-LK20-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L14-LK20-moderation.jpg` |
| 15 | LK21 Nordkanal berichtet ausführlich | Donnerstag 13:00 Uhr | 123.4 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 15 von 18 | ✓/✓ | ✓ | – | W1=weiterlaufen W2=frueh W3=bergen W4=ausbauen W5=gleichrangig | – | lk21-nordkanal-bericht.png / lk21-nordkanal-nachrichten.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L15-LK21-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L15-LK21-moderation.jpg` |
| 16 | LK22 Die Kassen laufen wieder | Donnerstag 18:00 Uhr | 133.8 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 16 von 18 | ✓/✓ | ✓ | SK43→leiter-arbeitssicherheit:zugestellt | W1=weiterlaufen W2=frueh W3=bergen W4=ausbauen W5=gleichrangig | – | lk22-kassen-laufen.png / lk22-kasse-startet.mp3 läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L16-LK22-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L16-LK22-moderation.jpg` |
| 17 | LK23 Die Datenlücke | Freitag 09:00 Uhr | 144.2 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 17 von 18 | ✓/✓ | ✓ | SK38→regionalleiterin-filialen-nord:zugestellt | W1=weiterlaufen W2=frueh W3=bergen W4=ausbauen W5=gleichrangig | – | lk23-datenluecke.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L17-LK23-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L17-LK23-moderation.jpg` |
| 18 | LK27 Stabiler Notbetrieb | Sonntag 12:00 Uhr | 154.6 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 18 von 18 | ✓/✓ | ✓ | SK31→leiterin-logistik-zentrallager:zugestellt | W1=weiterlaufen W2=frueh W3=bergen W4=ausbauen W5=gleichrangig | – | lk27-notbetrieb.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-alle-rollen/bilder/L18-LK27-buehne.jpg`, `e2e/WK-180-alle-rollen/bilder/L18-LK27-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.waterkant.json | scenario.waterkant.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 24 Personen übernommen | 24 übernommen (6 auf vorhandene Rollen-Zeilen, 18 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 20 Rollen besetzt, 24 Personen | 20 Rollen besetzt, 24 Personen; Teams: 4 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 24 | Begrüßung 24, Briefing 24 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | weiterlaufen | weiterlaufen | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | frueh | frueh | bestanden |
| B-B6 | Überraschung B6 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B6-buehne.jpg | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | bergen | bergen | bestanden |
| B-B5 | Überraschung B5 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B5-buehne.jpg | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | ausbauen | ausbauen | bestanden |
| B-B7 | Überraschung B7 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B7-buehne.jpg | bestanden |
| W-W5 | Entscheidung W5 über die Oberfläche festgehalten | gleichrangig | gleichrangig | bestanden |
| B-B4 | Überraschung B4 über die Oberfläche | per Mail an die Rolle | 2 Mail(s); Bild bilder/U-B4-buehne.jpg | bestanden |
| E1 | Gesamteinschätzung (10 Kriterien) gespeichert und nach Neuladen angezeigt | 10 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1,0,2; Notizen 10/10 | bestanden |
| E2 | Szenariospezifisches Raster | 10 Kriterien aus dem Drehbuch | 10 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 18 Zeilen wie im Journal | 18 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK03 SK04 SK06 SK34 SK08 SK35 SK10 SK11 SK12 SK13 SK14 SK41 SK21 SK18 SK19 SK46 SK22 SK24 SK25 SK43 SK38 SK31 SK32 SK39 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4, W5 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B6 B5 B7 B4 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B6 B5 B7 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 10/10 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 3.676.000 €, beim Unternehmen 2.076.000 € | Protokoll enthält Brutto: ja; Moderation 3.676.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 24 Personen korrekt | bestanden |
| O3 | Folgekarte SK41 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK43 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK45 | nicht zugestellt (Lage nicht gespielt) | nicht zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): Szenario wirklich wechseln? Der aktuelle Lauf wird zurückgesetzt. Alle Personen bleiben erhalten, Rollen, die es im neuen Szenario nicht gibt, musst du neu zuweisen. · 24 Personen gleichmäßig auf 20 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## WK-120-kunden-zusatz

Sitzung `20261120090505-giw2` · Entscheidungen: W1=weiterlaufen, W2=spaeter, W3=abwarten, W4=minimal, W5=eigene · Überraschungen: B6 nach LK09, B2 nach LK14 · Bilder: Setup `e2e/WK-120-kunden-zusatz/bilder/00-setup.jpg`, Bilanz `e2e/WK-120-kunden-zusatz/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/WK-120-kunden-zusatz/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK03 Serverraum wird warm | Dienstag 03:02 Uhr | 0 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 1 von 14 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk03-serverraum-warm.png / lk03-klimaalarm.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L01-LK03-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L01-LK03-moderation.jpg` |
| 2 | LK04 Brandalarm im Rechenzentrum | Dienstag 03:10 Uhr | 3 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 2 von 14 | ✓/✓ | ✓ | SK03→leiter-it:zugestellt | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – | lk04-brandalarm.png / lk04-loeschanlage-durchsage.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L02-LK04-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L02-LK04-moderation.jpg` |
| 3 | LK06 Lagebild nach dem Löschen | Dienstag 05:30 Uhr | 11.1 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 3 von 14 | ✓/✓ | ✓ | – | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – | lk06-lagebild.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L03-LK06-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L03-LK06-moderation.jpg` |
| 4 | LK09 Die Partnermärkte rufen an | Dienstag 08:30 Uhr | 19.2 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 4 von 14 | ✓/✓ | ✓ | SK06→leiter-arbeitssicherheit:zugestellt, SK34→notfallmanagement-bcm:zugestellt | W1=weiterlaufen W2=offen W3=offen W4=offen W5=offen | – · Gesprächsleitfaden angezeigt | lk09-partnermaerkte.png / telefon-klingeln.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L04-LK09-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L04-LK09-moderation.jpg` |
| 5 | LK11 Nordkanal fragt nach | Dienstag 11:30 Uhr | 27.2 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 5 von 14 | ✓/✓ | ✓ | SK11→partnerbetreuung:zugestellt, SK08→it-support-filialen:zugestellt, SK35→notfallmanagement-bcm:zugestellt | W1=weiterlaufen W2=spaeter W3=offen W4=offen W5=offen | – · Gesprächsleitfaden angezeigt | lk11-nordkanal.png / telefon-klingeln.mp3 läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L05-LK11-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L05-LK11-moderation.jpg` |
| 6 | LK14 Den Backup-Server bergen? | Mittwoch 07:30 Uhr | 35.3 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 6 von 14 | ✓/✓ | ✓ | SK13→facility-management:zugestellt, SK14→rz-betrieb:zugestellt, SK41→rz-betrieb:zugestellt, SK42→geschaeftsfuehrer-ceo:zugestellt | W1=weiterlaufen W2=spaeter W3=offen W4=offen W5=offen | – | lk14-bergen.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L06-LK14-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L06-LK14-moderation.jpg` |
| 7 | LK15 Wie weit geht der Ausweichbetrieb? | Mittwoch 10:00 Uhr | 43.4 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 7 von 14 | ✓/✓ | ✓ | SK21→leiter-arbeitssicherheit:zugestellt, SK18→leiter-finanzen-cfo:zugestellt, SK19→leiter-it:zugestellt | W1=weiterlaufen W2=spaeter W3=abwarten W4=offen W5=offen | – | lk15-ausweich.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L07-LK15-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L07-LK15-moderation.jpg` |
| 8 | LK16 Ein Bauunternehmen will Vorrang | Mittwoch 13:00 Uhr | 51.5 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 8 von 14 | ✓/✓ | ✓ | SK46→geschaeftsfuehrer-ceo:zugestellt, SK23→online-shop-leitung:zugestellt | W1=weiterlaufen W2=spaeter W3=abwarten W4=minimal W5=offen | – · Gesprächsleitfaden angezeigt | lk16-bauunternehmen.png / telefon-klingeln.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L08-LK16-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L08-LK16-moderation.jpg` |
| 9 | LK17 Prospektpreise vor der Kasse | Mittwoch 16:00 Uhr | 59.6 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 9 von 14 | ✓/✓ | ✓ | – | W1=weiterlaufen W2=spaeter W3=abwarten W4=minimal W5=offen | – | lk17-prospektpreise.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L09-LK17-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L09-LK17-moderation.jpg` |
| 10 | LK18 Der Verbundbeirat verlangt Antworten | Mittwoch 19:00 Uhr | 67.6 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 10 von 14 | ✓/✓ | ✓ | SK24→leiterin-kommunikation-pr:zugestellt | W1=weiterlaufen W2=spaeter W3=abwarten W4=minimal W5=offen | – | lk18-verbundbeirat.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L10-LK18-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L10-LK18-moderation.jpg` |
| 11 | LK20 Wer wird zuerst umgestellt? | Donnerstag 10:00 Uhr | 75.7 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 11 von 14 | ✓/✓ | ✓ | SK20→geschaeftsfuehrer-ceo:zugestellt | W1=weiterlaufen W2=spaeter W3=abwarten W4=minimal W5=offen | – | lk20-reihenfolge.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L11-LK20-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L11-LK20-moderation.jpg` |
| 12 | LK21 Nordkanal berichtet ausführlich | Donnerstag 13:00 Uhr | 83.8 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 12 von 14 | ✓/✓ | ✓ | – | W1=weiterlaufen W2=spaeter W3=abwarten W4=minimal W5=eigene | – | lk21-nordkanal-bericht.png / lk21-nordkanal-nachrichten.mp3 läuft | 3 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L12-LK21-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L12-LK21-moderation.jpg` |
| 13 | LK22 Die Kassen laufen wieder | Donnerstag 18:00 Uhr | 91.9 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 13 von 14 | ✓/✓ | ✓ | – | W1=weiterlaufen W2=spaeter W3=abwarten W4=minimal W5=eigene | – | lk22-kassen-laufen.png / lk22-kasse-startet.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L13-LK22-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L13-LK22-moderation.jpg` |
| 14 | LK27 Stabiler Notbetrieb | Sonntag 12:00 Uhr | 99.9 / 108 Min. + ca. 12 Min. Abschluss · Lagekarte 14 von 14 | ✓/✓ | ✓ | SK38→regionalleiterin-filialen-nord:zugestellt, SK44→partnerbetreuung:zugestellt | W1=weiterlaufen W2=spaeter W3=abwarten W4=minimal W5=eigene | – | lk27-notbetrieb.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-120-kunden-zusatz/bilder/L14-LK27-buehne.jpg`, `e2e/WK-120-kunden-zusatz/bilder/L14-LK27-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.waterkant.json | scenario.waterkant.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 13 Personen übernommen | 13 übernommen (4 auf vorhandene Rollen-Zeilen, 9 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 12 Rollen besetzt, 13 Personen | 12 Rollen besetzt, 13 Personen; Teams: 1 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 13 | Begrüßung 13, Briefing 13 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | weiterlaufen | weiterlaufen | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | spaeter | spaeter | bestanden |
| B-B6 | Überraschung B6 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B6-buehne.jpg | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | abwarten | abwarten | bestanden |
| B-B2 | Überraschung B2 über die Oberfläche | per Mail an die Rolle | 1 Mail(s); Bild bilder/U-B2-buehne.jpg | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | minimal | minimal | bestanden |
| W-W5 | Entscheidung W5 über die Oberfläche festgehalten | eigene | eigene | bestanden |
| E1 | Gesamteinschätzung (10 Kriterien) gespeichert und nach Neuladen angezeigt | 10 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1,0,2; Notizen 10/10 | bestanden |
| E2 | Szenariospezifisches Raster | 10 Kriterien aus dem Drehbuch | 10 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 14 Zeilen wie im Journal | 14 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK03 SK06 SK34 SK11 SK08 SK35 SK13 SK14 SK41 SK42 SK21 SK18 SK19 SK46 SK23 SK24 SK20 SK38 SK44 SK32 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4, W5 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B6 B2 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B6 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 10/10 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 3.691.000 €, beim Unternehmen 2.091.000 € | Protokoll enthält Brutto: ja; Moderation 3.691.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 13 Personen korrekt | bestanden |
| O3 | Folgekarte SK41 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK42 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK44 | zugestellt | zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): Szenario wirklich wechseln? Der aktuelle Lauf wird zurückgesetzt. Alle Personen bleiben erhalten, Rollen, die es im neuen Szenario nicht gibt, musst du neu zuweisen. · 13 Personen gleichmäßig auf 12 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

## WK-180-betrieb-zusatz

Sitzung `20261120090508-73t9` · Entscheidungen: W1=herunterfahren, W2=frueh, W3=bergen, W4=ausbauen, W5=gleichrangig · Überraschungen: B5 nach LK14, B8 nach LK15, B3 nach LK15 · Bilder: Setup `e2e/WK-180-betrieb-zusatz/bilder/00-setup.jpg`, Bilanz `e2e/WK-180-betrieb-zusatz/bilder/90-abschluss-bilanz.jpg`, Fazit `e2e/WK-180-betrieb-zusatz/bilder/91-abschluss-fazit.jpg`

### Lage für Lage

| # | Lage | Simulationszeit | Übungszeit / Zeitbudget | Bühne: Titel/Zeit | Moderation zeigt Lage | zugestellt (Karte→Rolle) | Entscheidungsstand | sichtbare Folgen | Bild / Ton | Spielbrett | Leck | Bilder |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | LK01 USV meldet Batteriewarnung | Montag 22:40 Uhr | 0 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 1 von 18 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk01-usv-warnung.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L01-LK01-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L01-LK01-moderation.jpg` |
| 2 | LK02 Geruch im Technikflur | Dienstag 02:35 Uhr | 3 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 2 von 18 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk02-geruch-technikflur.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L02-LK02-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L02-LK02-moderation.jpg` |
| 3 | LK03 Serverraum wird warm | Dienstag 03:02 Uhr | 6 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 3 von 18 | ✓/✓ | ✓ | – | W1=offen W2=offen W3=offen W4=offen W5=offen | – | lk03-serverraum-warm.png / lk03-klimaalarm.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L03-LK03-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L03-LK03-moderation.jpg` |
| 4 | LK04 Brandalarm im Rechenzentrum | Dienstag 03:10 Uhr | 9 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 4 von 18 | ✓/✓ | ✓ | SK03→leiter-it:zugestellt | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – | lk04-brandalarm.png / lk04-loeschanlage-durchsage.mp3 läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L04-LK04-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L04-LK04-moderation.jpg` |
| 5 | LK06 Lagebild nach dem Löschen | Dienstag 05:30 Uhr | 19.4 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 5 von 18 | ✓/✓ | ✓ | – | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – | lk06-lagebild.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L05-LK06-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L05-LK06-moderation.jpg` |
| 6 | LK08 Saisonstart ohne Aktionspreise | Dienstag 07:00 Uhr | 29.8 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 6 von 18 | ✓/✓ | ✓ | SK06→leiter-arbeitssicherheit:zugestellt, SK34→notfallmanagement-bcm:zugestellt | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – | lk08-saisonstart.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L06-LK08-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L06-LK08-moderation.jpg` |
| 7 | LK09 Die Partnermärkte rufen an | Dienstag 08:30 Uhr | 40.2 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 7 von 18 | ✓/✓ | ✓ | SK08→it-support-filialen:zugestellt, SK35→notfallmanagement-bcm:zugestellt, SK10→regionalleiter-filialen-sued:zugestellt | W1=herunterfahren W2=offen W3=offen W4=offen W5=offen | – · Gesprächsleitfaden angezeigt | lk09-partnermaerkte.png / telefon-klingeln.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L07-LK09-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L07-LK09-moderation.jpg` |
| 8 | LK12 Das Zentrallager steht | Dienstag 14:00 Uhr | 50.6 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 8 von 18 | ✓/✓ | ✓ | SK11→partnerbetreuung:zugestellt, SK12→leiter-finanzen-cfo:zugestellt | W1=herunterfahren W2=frueh W3=offen W4=offen W5=offen | – | lk12-zentrallager.png / kein Ton läuft | 4 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L08-LK12-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L08-LK12-moderation.jpg` |
| 9 | LK14 Den Backup-Server bergen? | Mittwoch 07:30 Uhr | 61 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 9 von 18 | ✓/✓ | ✓ | SK16→leiterin-logistik-zentrallager:zugestellt, SK13→facility-management:zugestellt, SK14→rz-betrieb:zugestellt | W1=herunterfahren W2=frueh W3=offen W4=offen W5=offen | – | lk14-bergen.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L09-LK14-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L09-LK14-moderation.jpg` |
| 10 | LK15 Wie weit geht der Ausweichbetrieb? | Mittwoch 10:00 Uhr | 71.4 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 10 von 18 | ✓/✓ | ✓ | SK21→leiter-arbeitssicherheit:zugestellt, SK18→leiter-einkauf:zugestellt, SK19→leiter-it:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=offen W5=offen | – | lk15-ausweich.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L10-LK15-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L10-LK15-moderation.jpg` |
| 11 | LK16 Ein Bauunternehmen will Vorrang | Mittwoch 13:00 Uhr | 81.8 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 11 von 18 | ✓/✓ | ✓ | SK46→geschaeftsfuehrer-ceo:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=ausbauen W5=offen | – · Gesprächsleitfaden angezeigt | lk16-bauunternehmen.png / telefon-klingeln.mp3 läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L11-LK16-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L11-LK16-moderation.jpg` |
| 12 | LK17 Prospektpreise vor der Kasse | Mittwoch 16:00 Uhr | 92.2 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 12 von 18 | ✓/✓ | ✓ | – | W1=herunterfahren W2=frueh W3=bergen W4=ausbauen W5=offen | – | lk17-prospektpreise.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L12-LK17-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L12-LK17-moderation.jpg` |
| 13 | LK19 Rücksicherung im Ausweich-Rack | Donnerstag 08:00 Uhr | 102.6 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 13 von 18 | ✓/✓ | ✓ | SK24→kundenservice-hotline:zugestellt, SK25→leiterin-kommunikation-pr:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=ausbauen W5=offen | – | lk19-ruecksicherung.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L13-LK19-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L13-LK19-moderation.jpg` |
| 14 | LK20 Wer wird zuerst umgestellt? | Donnerstag 10:00 Uhr | 113 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 14 von 18 | ✓/✓ | ✓ | SK40→informationssicherheit:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=ausbauen W5=offen | – | lk20-reihenfolge.png / kein Ton läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L14-LK20-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L14-LK20-moderation.jpg` |
| 15 | LK22 Die Kassen laufen wieder | Donnerstag 18:00 Uhr | 123.4 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 15 von 18 | ✓/✓ | ✓ | SK43→leiter-arbeitssicherheit:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=ausbauen W5=gleichrangig | – | lk22-kassen-laufen.png / lk22-kasse-startet.mp3 läuft | 6 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L15-LK22-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L15-LK22-moderation.jpg` |
| 16 | LK23 Die Datenlücke | Freitag 09:00 Uhr | 133.8 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 16 von 18 | ✓/✓ | ✓ | SK28→it-support-filialen:zugestellt, SK38→regionalleiterin-filialen-nord:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=ausbauen W5=gleichrangig | – | lk23-datenluecke.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L16-LK23-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L16-LK23-moderation.jpg` |
| 17 | LK25 Der große Saisonsamstag | Samstag 08:00 Uhr | 144.2 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 17 von 18 | ✓/✓ | ✓ | SK45→online-shop-leitung:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=ausbauen W5=gleichrangig | – | lk25-saisonsamstag.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L17-LK25-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L17-LK25-moderation.jpg` |
| 18 | LK27 Stabiler Notbetrieb | Sonntag 12:00 Uhr | 154.6 / 165 Min. + ca. 15 Min. Abschluss · Lagekarte 18 von 18 | ✓/✓ | ✓ | SK39→online-shop-leitung:zugestellt | W1=herunterfahren W2=frueh W3=bergen W4=ausbauen W5=gleichrangig | – | lk27-notbetrieb.png / kein Ton läuft | 5 am Zug, 0 nicht erreichbar | 0 | `e2e/WK-180-betrieb-zusatz/bilder/L18-LK27-buehne.jpg`, `e2e/WK-180-betrieb-zusatz/bilder/L18-LK27-moderation.jpg` |

### Einzelprüfungen

| ID | Prüfung | erwartet | beobachtet | Ergebnis |
|---|---|---|---|---|
| S1 | Szenario über die Oberfläche gewählt | scenario.waterkant.json | scenario.waterkant.json | bestanden |
| S2 | Testmail über die Oberfläche | genau eine Testmail an das lokale Testpostfach | 1 Mail(s); Status „Test-E-Mail gesendet.“ | bestanden |
| S3 | Teilnehmer-Import (CSV, Testadressen) | 20 Personen übernommen | 20 übernommen (6 auf vorhandene Rollen-Zeilen, 14 als „Teilnehmer“). Gespeichert. | bestanden |
| S4 | Rollenzuordnung über „Auf Teams verteilen“ | 18 Rollen besetzt, 20 Personen | 18 Rollen besetzt, 20 Personen; Teams: 2 | bestanden |
| S5 | Begrüßung und Rollenbriefing beim Vorbereiten | je 20 | Begrüßung 20, Briefing 20 | bestanden |
| T1 | Countdown nach „Jetzt beginnt die Krise“ (Standard 30 s) | 25–30 s Restzeit kurz nach dem Klick | 29 s | bestanden |
| W-W1 | Entscheidung W1 über die Oberfläche festgehalten | herunterfahren | herunterfahren | bestanden |
| W-W2 | Entscheidung W2 über die Oberfläche festgehalten | frueh | frueh | bestanden |
| W-W3 | Entscheidung W3 über die Oberfläche festgehalten | bergen | bergen | bestanden |
| B-B5 | Überraschung B5 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B5-buehne.jpg | bestanden |
| W-W4 | Entscheidung W4 über die Oberfläche festgehalten | ausbauen | ausbauen | bestanden |
| B-B8 | Überraschung B8 über die Oberfläche | auf der Bühne | auf der Bühne; Bild bilder/U-B8-buehne.jpg | bestanden |
| B-B3 | Überraschung B3 über die Oberfläche | per Mail an die Rolle | 1 Mail(s); Bild bilder/U-B3-buehne.jpg | bestanden |
| W-W5 | Entscheidung W5 über die Oberfläche festgehalten | gleichrangig | gleichrangig | bestanden |
| E1 | Gesamteinschätzung (10 Kriterien) gespeichert und nach Neuladen angezeigt | 10 Werte und Notizen wie eingegeben | Werte 2,1,0,2,1,0,2,1,0,2; Notizen 10/10 | bestanden |
| E2 | Szenariospezifisches Raster | 10 Kriterien aus dem Drehbuch | 10 | bestanden |
| P1 | Protokoll: alle gezeigten Lagen (Zeit und Titel, Reihenfolge) | 18 Zeilen wie im Journal | 18 Zeilen, identisch | bestanden |
| P2 | Protokoll: alle zugestellten vertraulichen Karten | SK03 SK06 SK34 SK08 SK35 SK10 SK11 SK12 SK16 SK13 SK14 SK21 SK18 SK19 SK46 SK24 SK25 SK40 SK43 SK28 SK38 SK45 SK39 SK32 | alle enthalten | bestanden |
| P3 | Protokoll: Entscheidungen im Wortlaut | Wortlaut jeder festgehaltenen Option | W1, W2, W3, W4, W5 | bestanden |
| P4 | Protokoll: ausgelöste Überraschungen | B5 B8 B3 | alle enthalten | bestanden |
| P5 | Protokoll: Beobachtungsbögen der ausgelösten Überraschungen | B5 B8 | alle enthalten | bestanden |
| P6 | Protokoll: Gesamteinschätzung mit gespeicherten Werten | jede Zeile mit Wert und Beobachtung | 10/10 | bestanden |
| P7 | Protokoll: Rechnung = unabhängige Berechnung | Brutto 3.681.000 €, beim Unternehmen 2.081.000 € | Protokoll enthält Brutto: ja; Moderation 3.681.000 € | bestanden |
| P8 | Protokoll: Maßnahmenplan und keine Namen/Adressen | Maßnahmenplan vorhanden, keine Namen | vorhanden; Namen/Adressen keine | bestanden |
| O1 | Empfängerrolle jeder vertraulichen Karte (Orakel) | erste besetzte Rolle aus Empfänger und Ersatzrollen | alle korrekt | bestanden |
| O2 | Jede Person erhält genau die Karten ihrer Rolle (keine unberechtigte Zustellung) | Mails je Person = Karten ihrer Rolle | alle 20 Personen korrekt | bestanden |
| O3 | Folgekarte SK43 | zugestellt | zugestellt | bestanden |
| O3 | Folgekarte SK45 | zugestellt | zugestellt | bestanden |
| O4 | Keine vertraulichen Texte auf der Bühne (je Lage geprüft) | 0 Treffer | 0 Treffer | bestanden |
| O5 | Ton der Lage gestartet (vorgesehene Datei) | vorgesehene Datei je Lage mit Ton | alle korrekt | bestanden |
| O6 | Bühne und Moderation zeigen jede Lage | Titel auf Bühne und in Moderation | alle | bestanden |
| O7 | Keine Browserfehler | keine | keine | bestanden |

Dialoge des Browsers (angenommen): Szenario wirklich wechseln? Der aktuelle Lauf wird zurückgesetzt. Alle Personen bleiben erhalten, Rollen, die es im neuen Szenario nicht gibt, musst du neu zuweisen. · 20 Personen gleichmäßig auf 18 Rollen verteilen? Bisherige Rollenzuweisungen werden dabei ersetzt. · Krisenphase jetzt beenden und den Abschluss (Nacharbeiten und Rechnung) auf der Bühne zeigen?

