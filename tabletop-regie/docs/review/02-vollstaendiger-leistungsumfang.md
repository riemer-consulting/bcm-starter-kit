# 02 – Vollständiger Leistungsumfang

Stand: siehe `manifest.json` (Commit und Erstellungszeit). Jede Funktion mit Beleg im Code und Teststatus steht in `07-funktions-und-testmatrix.md`; hier steht, was das Werkzeug für wen leistet.

## 1. Was die Tabletop-Regie ist

Ein lokal laufendes Werkzeug für moderierte Krisenstabsübungen (Tabletop). Es führt ein Drehbuch automatisch durch: öffentliche Lagekarten auf einer Bühne (Beamer, zweiter Bildschirm), vertrauliche Karten per E-Mail an einzelne Rollen, Entscheidungen mit Folgen, Überraschungen, ein Abschluss mit Nacharbeiten und fiktiver Schadensrechnung, Übungsprotokoll und Urkunden. Mitgeliefert sind zwei Drehbücher: **NordTech** (Ransomware in einem produzierenden Unternehmen, eingefroren) und **Waterkant** (Brand im eigenen Rechenzentrum eines Baumarktunternehmens, neu).

## 2. Leistungsumfang im Überblick

| Bereich | Leistung | Umsetzung / Test (Details in 07) |
|---|---|---|
| Vorbereitung | Szenario wählen, Drehbuch prüfen, Dauer 45–180 Min. oder feste Drehbuchzeiten, Schwerpunkt, Schwierigkeit, Rollen vorschlagen, Personen erfassen oder importieren, Teams, Ersatzrollen, Begrüßung und Rollenbriefing per Mail, SMTP, Testmodus, Vorlage speichern/laden, eigene Töne, Branding | implementiert; Kernlogik getestet, Bedienoberfläche nur teilweise |
| Durchführung | Countdown, Lagen automatisch nach Plan, Bühne mit Bild, Ton und Krisen-Info, vertrauliche Karten automatisch per Mail, Spielbrett (wer ist am Zug), Entscheidungen mit Folgen, Folgekarten, öffentliche und private Überraschungen, Unterbrechung mit Countdown (Stellvertretung), Gesprächsleitfäden, Sprechertexte, Stummschaltung, Pause, Zeitsprung, manuelle Auslösung, Moderationsleitfaden | implementiert und getestet (beide Szenarien) |
| Abschluss | Nacharbeiten, Rechnung Schritt für Schritt, Bilanz brutto / Erstattung / beim Unternehmen, Einordnung am Jahresgewinn, Fazit, Debriefing-Fragen, Übungsprotokoll ohne Namen, Urkunden | implementiert; Abschluss und Protokoll getestet, Urkunden in dieser Runde nicht |
| Betrieb | Start per Doppelklick bzw. `npm start`, nur lokal erreichbar (Standard), Zustand übersteht Neustart, Drehbuchprüfung per Kommandozeile, Variantenprüfung, Export- und Testwerkzeuge | implementiert und getestet; keine Anmeldung, kein HTTPS |

**Nicht vorhanden:** Anmeldung und Rechte, Termineinladungen mit Kalender, mehrere parallele Übungen, HTTPS, Wiederholen fehlgeschlagener Mails per Knopf, Bewertungsoberfläche (nur Schnittstelle).

## 3. Nutzerabläufe (sechs Personas)

Alle Bildschirmfotos stammen aus den Testläufen dieser Runde (`screenshots/`), mit fiktiven Personen „Person 1 …“ und Testadressen.

### 3.1 Vorbereitung durch die Übungsleitung (Organisation)

1. Startseite öffnen (`screenshots/waterkant/persona-00-startseite.png`) → **Setup**.
2. Szenario wählen; die Drehbuchprüfung erscheint direkt darunter (`persona-01-setup-oben.png`).
3. Dauer wählen → „Passende Rollen vorschlagen“; Personen eintragen oder importieren; bei mehr Personen als Rollen Teams bilden.
4. SMTP eintragen und Testmail senden; bei Bedarf Testmodus (alle Mails an eine Dummy-Adresse).
5. Zeitmodus „Zieldauer“, Schwerpunkt, Schwierigkeit; die Vorschau zeigt Kartenzahl, entfallene Karten und Umleitungen an Ersatzrollen (`persona-02-setup-ganz.png`).
6. „Übung vorbereiten“ verschickt Begrüßung und Rollenbriefing. Optional: Vorlage herunterladen (ohne SMTP-Passwort).

### 3.2 Moderation während der Übung

1. **Moderation** auf dem eigenen Bildschirm öffnen – nie teilen (`persona-04-moderation-oben.png`). Bühne über „Bühne öffnen“ auf Beamer/zweiten Bildschirm.
2. „Jetzt beginnt die Krise“ → 30 Sekunden Countdown (`screenshots/*/01-buehne-countdown.png`).
3. Je Lage: Text, Fragen, Schwerpunktfrage, zuständige Rollen, Moderationshinweis, Bewertungshinweise; bei Telefon-/Funk-Karten Sprechertext und Gesprächsleitfaden für das Live-Gespräch.
4. Entscheidung des Tisches unter „Entscheidungen mit Folgen“ festhalten; spätere Lagen und die Rechnung passen sich an.
5. Überraschungen auslösen, wenn es passt; die Moderation sieht vorher, ob die Karte schon passt („wartet auf …“) und ob die nötige Rolle besetzt ist (`moderation-B7-unterbrechung.png`).
6. Bei Bedarf Ton aus, Pause, Zeitsprung, Karte manuell auslösen; fehlgeschlagene Mails stehen rot im Log.
7. „Abschluss“ starten und Schritt für Schritt durch Nacharbeiten, Rechnung, Bilanz und Fazit führen (`abschluss-*.png`, `moderation-03-abschluss.png`).

### 3.3 Teilnehmende mit Rolle (Krisenstab)

1. Vorab: Mail mit Begrüßung und Spielregeln, Mail mit der eigenen Rolle.
2. In der Übung: Bühne lesen, bei „am Zug“ auf dem Spielbrett Stellung nehmen, vertrauliche Karten im eigenen Postfach lesen und selbst entscheiden, ob und wie sie die Information einbringen.
3. Bei einer Unterbrechung (B7) den Tisch verlassen; die Stellvertretung übernimmt (`19-B7.png` bei Waterkant, `B7` bei NordTech).
4. Nach der Übung: Debriefing, Urkunde.

### 3.4 Teilnehmende ohne feste Rolle (Beobachtung)

Sehen nur die Bühne und die Ablaufseite; bekommen keine vertraulichen Karten, aber eine Urkunde. Für Überraschungen mit Beobachtungsbogen (B5–B8 Waterkant, B6–B8 NordTech) erhalten sie von der Moderation die Beobachtungspunkte.

### 3.5 Publikum / Bühne

Sieht ausschließlich öffentliche Inhalte: Unternehmen vor dem Start, Countdown, aktuelle Lage mit Bild, Krisen-Info und Fragen, öffentliche Überraschungen mit Übungshinweis bei Alarmtönen, Spielbrett, Abschluss. Die Leak-Prüfung belegt: keine vertraulichen Texte und keine Mailadressen in den Bühnendaten. Hinweis: Das Spielbrett zeigt die eingetragenen Namen der Personen.

### 3.6 Nachbereitung (BCM-Verantwortliche, Revision)

1. Übungsprotokoll exportieren: Ablauf, Entscheidungen im Wortlaut, Überraschungen, Beobachtungsbögen, Rechnung, Debriefing-Fragen, Maßnahmenplan zum Ausfüllen; ohne Namen (`testberichte/uebungsprotokoll-beispiel-*.md`).
2. Mit dem Drehbuch-Export (`exportierte-szenariodaten/*-drehbuch.md`) nachvollziehen, welche Karten bei welcher Dauer kamen.

## 4. Ablaufseite für Teilnehmende

`ablauf.html` zeigt Begrüßung, Regeln und nur bereits gezeigte Lagen – keine vertraulichen Inhalte, keine künftigen Karten (`persona-03-ablaufseite.png`). Sie ist wie alle Seiten standardmäßig nur auf dem Rechner der Moderation erreichbar.
