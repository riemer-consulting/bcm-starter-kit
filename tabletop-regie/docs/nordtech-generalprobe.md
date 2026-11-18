# NordTech – Medien-Generalprobe

Stand: 2026-11-18 · Durchgeführt im laufenden Werkzeug (Bühne 1600 × 900, Ton eingeschaltet, Modus „Erprobte feste Zeiten“, alle 26 Lagekarten). Jede Karte wurde per „Zeitsprung“ aufgerufen, nach ca. 2,5 Sekunden abfotografiert und der Ton auf der Bühne ausgelesen. B6, B7 und B8 wurden jeweils direkt nach ihrer Voraussetzung ausgelöst (Krisenstabsleitung besetzt).

## Ergebnis

- 29 Bühnenansichten geprüft (26 Lagekarten, 3 öffentliche Überraschungen). Alle Bilder geladen, keine Skriptfehler.
- Jeder Ton startete an der richtigen Karte; Karten ohne Ton blieben still.
- **Gefundener Fehler (behoben):** Ein langer Ton (z. B. der LK10-Nachrichtenbeitrag) lief nach einem Zeitsprung über die nächste Lage weiter. Jetzt beendet eine neue Lage ohne eigenen Ton einen noch laufenden Ton.
- Sichtprüfung aller Ansichten: Wochentag, Uhrzeit, Zahlen und Bildinhalte passen zum Kartentext; kein Widerspruch gefunden.
- **Nachprüfung nach dem Red-Team-Test (Fotos in voller Auflösung):** zwei reale Marken gefunden und entfernt – „SAP S/4HANA“ auf dem ERP-Bildschirm in LK14 (jetzt „NT-ERP“) und „iiyama“ am Monitorrand in LK01. Weitere Schriftzüge an Geräten sind unleserlich. Die Generalprobe wurde danach mit den geänderten Karten LK09, LK14 und LK15 wiederholt.
- **Sechs zusätzliche Töne (LK19, LK02, LK22, LK05, LK12, LK26):** in diesem Durchlauf an der richtigen Karte gestartet; LK19 läuft über der weiterlaufenden Hallen-Atmosphäre; „Ton aus“ stoppt auch diese Töne.

## Ablauf wie auf der Bühne

| Nr. | Karte | Zeit | Titel | Ton auf der Bühne | Bild | Sichtbefund |
|---:|---|---|---|---|---|---|
| 1 | LK18 | Montag 06:41 Uhr | Anmeldung hakt | – | geladen | Login-Fehler, Zusatz „Service-Desk erst ab 07:00 Uhr besetzt“ passt zu 06:41 Uhr |
| 2 | LK19 | Montag 06:48 Uhr | Maschine 4 verhält sich seltsam | lk19-fraeslinie-stoerung.mp3 | geladen | Terminal mit .shadowvault-Dateien; Ton: Fräslinie stoppt, über der Halle |
| 3 | LK20 | Montag 06:55 Uhr | Keine Aufträge mehr | – | geladen | EDI-Kurve bricht 06:30 ein, passt |
| 4 | LK01 | Montag 07:00 Uhr | Cyberangriff | lk01-stille-gemurmel.mp3 | geladen | Kamerabild 07:02, Lösegeld-Bildschirm, Restzeit 47:59 passt zu Frist 48 h, Herstellername am Monitor entfernt; Ton: Stille und Gemurmel |
| 5 | LK16 | Montag 08:00 Uhr | OT-Trennung | – | geladen | IT-Lagebesprechung, Bildunterschrift VPN-Konto passt zu LK08 |
| 6 | LK02 | Montag 09:00 Uhr | Produktion stoppt | lk02-produktion-faehrt-herunter.mp3 | geladen | stehende Linie, „Produktion gestoppt“; Ton: Linien fahren herunter |
| 7 | LK22 | Montag 10:00 Uhr | Kommunikation ohne IT | lk22-funk-abgebrochen.mp3 | geladen | Kommunikationskarte, 620 Beschäftigte · 3 Standorte; Ton: abgebrochener Werkfunk |
| 8 | B6 | Überraschung | Zwei widersprüchliche Anweisungen | b6-zwei-durchsagen.mp3 | geladen | Überraschungskennzeichen, Megafon-Karte; Ton: Gong und zwei Durchsagen |
| 9 | LK03 | Montag 11:00 Uhr | LinkedIn-Beitrag | – | geladen | Social-Media-Beitrag ohne Plattformlogo, Foto der Lösegeldforderung |
| 10 | LK04 | Montag 14:00 Uhr | Nordkanal-Anfrage | telefon-klingeln.mp3 | geladen | Karte Presseanfrage, Antwortfrist 2 Stunden passt zu „bis 16 Uhr“; Ton: Telefon, danach live |
| 11 | LK23 | Montag 16:00 Uhr | Wer darf ins Werk? | funk-ruf.mp3 (kurz, bereits zu Ende) | geladen | Zutrittskarte; Ton: Funksignal, danach live |
| 12 | LK05 | Dienstag 08:00 Uhr | Schlüsselperson fällt aus | lk05-it-bereitschaft.mp3 | geladen | leerer Arbeitsplatz; Ton: Telefon, IT-Bereitschaft |
| 13 | LK06 | Dienstag 10:00 Uhr | Kunde eskaliert | telefon-klingeln.mp3 | geladen | Videotelefonat mit verärgertem Kunden; Ton: Telefon, danach live |
| 14 | LK07 | Dienstag 13:00 Uhr | Datenschutz | – | geladen | Datenschutzkarte, Meldefristen „fachlich prüfen lassen“ |
| 15 | LK08 | Mittwoch 08:00 Uhr | Positive Entwicklung | – | geladen | Zusatz „Keine Hinweise auf aktive Angreifer“ |
| 16 | LK09 | Mittwoch 11:00 Uhr | Backups gefunden | – | geladen | Backup-Prüfung läuft, nicht freigegeben; Fund im Tresor, Zugang über Notfallumschlag; Datenverlust 32 h passt zu Stand Sa 23:00 |
| 17 | LK24 | Mittwoch 15:00 Uhr | Wer bekommt das erste System? | – | geladen | eine Ressource, drei Prioritäten; Text verweist auf das Backup vom Vormittag (LK09) |
| 18 | LK17 | Donnerstag 07:00 Uhr | Beirat fordert Lagebericht | – | geladen | Folie „Lagebericht für den Beirat · Entwurf · Donnerstag 07:30“ |
| 19 | B7 | Überraschung | Die Krisenstabsleitung ist nicht erreichbar | telefon-klingeln.mp3 | geladen | Countdown 5:00, Krisenstabsleitung im Spielbrett „nicht erreichbar“; Ton: Telefon |
| 20 | LK10 | Donnerstag 08:00 Uhr | Nordkanal-Sonderbericht | lk10-nordkanal-nachrichten.mp3 | geladen | Studio Nordkanal; Ton: Nachrichteneinspieler 56 s |
| 21 | LK11 | Donnerstag 13:00 Uhr | Pharmakunde eskaliert | – | geladen | Krisengespräch Pharma, Frist Samstag 13:00 passt zu Do 13:00 + 48 h |
| 22 | LK12 | Freitag 08:00 Uhr | Teilweiser Wiederanlauf | lk12-anlage-faehrt-hoch.mp3 | geladen | Werk Süd Notbetrieb, Kapazität 30 %; Ton: Anlage fährt hoch |
| 23 | LK13 | Freitag 11:00 Uhr | Cyberversicherung | – | geladen | IR-Team der Versicherung, bis zu 1,4 Mio. € unter Vorbehalt |
| 24 | LK21 | Freitag 16:00 Uhr | Chargenfreigabe | – | geladen | Chargenfreigabe, 260 Chargen |
| 25 | LK14 | Samstag 09:00 Uhr | ERP-Testbetrieb | – | geladen | ERP aus geprüftem Backup im Test, Daten- und Sicherheitsfreigabe offen; Bildschirm „NT-ERP“ (Marke entfernt) |
| 26 | B8 | Überraschung | Ein vermeintlicher Erfolg | b8-erp-test-meldung.mp3 | geladen | Überraschungskennzeichen, Bildschirm-Karte; Ton: Signal, Ansage, Warnton, Meldung |
| 27 | LK25 | Samstag 11:00 Uhr | Zwei Listen, zwei Wahrheiten | – | geladen | zwei Listen, Daten nicht belastbar |
| 28 | LK15 | Sonntag 12:00 Uhr | Wiederanlauf | – | geladen | 70 % technische Kapazität auf priorisierten Anlagen, nicht alle Systeme, ERP nicht produktiv |
| 29 | LK26 | Sonntag 15:00 Uhr | Die Menschen sind am Limit | lk26-schichtleitung-nachricht.mp3 | geladen | Personal am Limit, Schichtplan offen; Ton: Sprachnachricht Schichtleitung |

## E-Mail-Zustellung (Ende-zu-Ende über SMTP)

Durchgeführt mit einem lokalen SMTP-Testempfänger anstelle eines echten Mailservers: 90 Minuten, Schwerpunkt Krisenführung, alle neun vom Werkzeug empfohlenen Rollen mit je einer Testperson (`person1@example.com` … `person9@example.com`), Kundenentscheidung W2 auf „abwarten“, B2 (privat) und B6 (öffentlich) ausgelöst, Ablauf bis Sonntag.

| Prüfung | Ergebnis |
|---|---|
| Begrüßung und Rollenbriefing | 9 von 9 Personen je einmal |
| Vertrauliche Karten | 14 ausgelöst, 14 Mails, jede bei genau der Person mit der richtigen Rolle, 0 falsch zugestellt |
| Folgekarte aus Entscheidung (SK43 nach W2 „abwarten“) | zugestellt an Geschäftsführung Vertrieb |
| Private Überraschung B2 | per Mail an Unternehmenskommunikation & Marketing |
| Öffentliche Überraschung B6 | keine Mail (nur Bühne) – wie vorgesehen |
| Vertraulicher Text in den Bühnendaten | keiner |
| Besetzte Rollen ohne eigene vertrauliche Karte | keine |
| Fehler im Versand-Log | 0 |

Damit ist der Weg Werkzeug → SMTP → richtige Person nachgewiesen. Offen bleibt nur euer echter Mailserver (Zugangsdaten, Spamfilter, Zustellzeit): im Setup „Test-E-Mail senden“ an zwei echte Adressen.

## Nicht durch die Generalprobe abgedeckt

- Klang und Lautstärke im echten Raum, Lesbarkeit am Beamer aus der letzten Reihe.
- Wirkung der Live-Gespräche (LK04, LK06, LK23) – das hängt von der Moderation ab; einmal mit einer zweiten Person üben.
- Zustellung über euren echten Mailserver (Spamfilter, Zustellzeit) – der SMTP-Weg selbst ist geprüft.
- Das Zusammenspiel echter Menschen in allen Rollen unter Zeitdruck – das zeigt erst der Pilot.
- Die Sprachaufnahmen (LK05, LK10, LK22, LK26, B6, B8) sind synthetisch erzeugt (Piper, CC0-Stimmen). Wer sie natürlicher möchte, spricht die Texte im Setup unter „Eigene Töne für Lagekarten“ selbst ein.
