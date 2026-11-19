# 03 – Testfallkatalog

**Geprüfter Commit:** `33154fdfaa660fb48cedf3d5823a795ce3200d56` · **Lauf:** 2026-11-19T12:07:29.913Z bis 2026-11-19T13:02:40.338Z · erzeugt mit `tools/qa/berichte.js` aus dem Nachweisordner (Pfadangaben relativ zum Nachweispaket).

Alle ausgeführten Testfälle mit Kennung. Felder je Fall: Zweck, Voraussetzung, Eingaben, Schritte, erwartet, tatsächlich, Ergebnis, Schweregrad (nur bei Abweichung), Beweispfad. Gemeinsame Voraussetzungen und Schritte einer Gruppe stehen über der Tabelle. Schweregrad und Einordnung jeder Abweichung: Dokument 10.

## A. End-to-End im Browser (Bedienung über die Oberfläche)

**Voraussetzung:** isolierter Server (eigener Datenordner, lokaler SMTP-Testempfänger), Chromium, Countdown 30 s. **Schritte:** Szenario wählen, SMTP-Felder, Testmail, Rollenvorschlag bzw. alle Rollen, CSV-Import, Teams verteilen, Zieldauer und Schwerpunkt, „Übung vorbereiten“, Moderation, „Bühne öffnen“, Ton aktivieren, „Jetzt beginnt die Krise“, Lage für Lage „Zeitsprung hierhin“, Entscheidungen und Überraschungen über die Schaltflächen, Pause/Fortsetzen, Abschluss bis Fazit, Gesamteinschätzung mit Neuladen, Protokoll- und Journal-Download. Einzelprüfungen je Fall: Dokument 05.

| ID | Zweck | Eingaben | erwartet | tatsächlich | Ergebnis | Schweregrad | Beweis |
|---|---|---|---|---|---|---|---|
| E2E-NT-45-unguenstig | Übung 45 Min., ausgewogen, NordTech | Entscheidungen W1=am-netz, W2=abwarten, W3=abwarten, W4=gezahlt; Überraschungen B2, B7; +1 Personen | alle 32 Einzelprüfungen erfüllt | 32/32 erfüllt | bestanden | – | `e2e/NT-45-unguenstig/` |
| E2E-NT-60-gemischt | Übung 60 Min., kunden, NordTech | Entscheidungen W1=trennen, W2=abwarten, W3=melden, W4=nicht-gezahlt; Überraschungen B6, B4; +2 Personen | alle 29 Einzelprüfungen erfüllt | 29/29 erfüllt | bestanden | – | `e2e/NT-60-gemischt/` |
| E2E-NT-90-ausgewogen | Übung 90 Min., ausgewogen, NordTech | Entscheidungen W1=trennen, W2=proaktiv, W3=melden, W4=nicht-gezahlt; Überraschungen B8, B1, B6 | alle 30 Einzelprüfungen erfüllt | 30/30 erfüllt | bestanden | – | `e2e/NT-90-ausgewogen/` |
| E2E-NT-90-krisenfuehrung | Übung 90 Min., fuehrung, NordTech | Entscheidungen W1=am-netz, W2=proaktiv, W3=abwarten, W4=gezahlt; Überraschungen B7, B5; +3 Personen | alle 30 Einzelprüfungen erfüllt | 30/30 erfüllt | bestanden | – | `e2e/NT-90-krisenfuehrung/` |
| E2E-NT-120-it | Übung 120 Min., it, NordTech | Entscheidungen W1=trennen, W2=abwarten, W3=melden, W4=gezahlt; Überraschungen B6, B3; +2 Personen | alle 30 Einzelprüfungen erfüllt | 30/30 erfüllt | bestanden | – | `e2e/NT-120-it/` |
| E2E-NT-180-alle-rollen | Übung 180 Min., ausgewogen, NordTech | Entscheidungen W1=am-netz, W2=proaktiv, W3=melden, W4=nicht-gezahlt; Überraschungen B8, B7, B6; alle Rollen; +4 Personen | alle 29 Einzelprüfungen erfüllt | 29/29 erfüllt | bestanden | – | `e2e/NT-180-alle-rollen/` |
| E2E-WK-45-unguenstig | Übung 45 Min., ausgewogen, Waterkant | Entscheidungen W1=weiterlaufen, W2=spaeter, W3=bergen, W4=minimal, W5=eigene; Überraschungen B6, B7; +1 Personen | alle 34 Einzelprüfungen erfüllt | 34/34 erfüllt | bestanden | – | `e2e/WK-45-unguenstig/` |
| E2E-WK-60-gemischt | Übung 60 Min., betrieb, Waterkant | Entscheidungen W1=herunterfahren, W2=spaeter, W3=abwarten, W4=ausbauen, W5=gleichrangig; Überraschungen B5, B2; +2 Personen | alle 31 Einzelprüfungen erfüllt | 31/31 erfüllt | bestanden | – | `e2e/WK-60-gemischt/` |
| E2E-WK-90-ausgewogen | Übung 90 Min., ausgewogen, Waterkant | Entscheidungen W1=herunterfahren, W2=frueh, W3=bergen, W4=minimal, W5=gleichrangig; Überraschungen B6, B8, B1 | alle 32 Einzelprüfungen erfüllt | 32/32 erfüllt | bestanden | – | `e2e/WK-90-ausgewogen/` |
| E2E-WK-90-krisenfuehrung | Übung 90 Min., fuehrung, Waterkant | Entscheidungen W1=weiterlaufen, W2=frueh, W3=abwarten, W4=ausbauen, W5=eigene; Überraschungen B7, B5; +3 Personen | alle 32 Einzelprüfungen erfüllt | 32/32 erfüllt | bestanden | – | `e2e/WK-90-krisenfuehrung/` |
| E2E-WK-120-it | Übung 120 Min., it, Waterkant | Entscheidungen W1=herunterfahren, W2=spaeter, W3=bergen, W4=ausbauen, W5=eigene; Überraschungen B8, B3, B4; +2 Personen | alle 34 Einzelprüfungen erfüllt | 34/34 erfüllt | bestanden | – | `e2e/WK-120-it/` |
| E2E-WK-180-alle-rollen | Übung 180 Min., ausgewogen, Waterkant | Entscheidungen W1=weiterlaufen, W2=frueh, W3=bergen, W4=ausbauen, W5=gleichrangig; Überraschungen B6, B5, B7, B4; alle Rollen; +4 Personen | alle 34 Einzelprüfungen erfüllt | 34/34 erfüllt | bestanden | – | `e2e/WK-180-alle-rollen/` |
| E2E-WK-120-kunden-zusatz | Übung 120 Min., kunden, Waterkant | Entscheidungen W1=weiterlaufen, W2=spaeter, W3=abwarten, W4=minimal, W5=eigene; Überraschungen B6, B2; +1 Personen | alle 32 Einzelprüfungen erfüllt | 32/32 erfüllt | bestanden | – | `e2e/WK-120-kunden-zusatz/` |
| E2E-WK-180-betrieb-zusatz | Übung 180 Min., betrieb, Waterkant | Entscheidungen W1=herunterfahren, W2=frueh, W3=bergen, W4=ausbauen, W5=gleichrangig; Überraschungen B5, B8, B3; +2 Personen | alle 32 Einzelprüfungen erfüllt | 32/32 erfüllt | bestanden | – | `e2e/WK-180-betrieb-zusatz/` |

## B. Negativ- und Lasttests

**Voraussetzung:** isolierter Server, Waterkant, 7 besetzte Rollen, Countdown 0 s; SMTP-Testempfänger mit Fehlermodi. Das Soll wurde vor der Ausführung im Testcode festgelegt.

| ID | Zweck | erwartet (vorab festgelegt) | tatsächlich | Ergebnis | Schweregrad | Beweis |
|---|---|---|---|---|---|---|
| N-01 | Empfänger nicht erreichbar (SMTP 550 bei RCPT) | Versand schlägt fehl, Übung läuft weiter; Moderation zeigt „E-Mail fehlgeschlagen … mündlich oder auf Papier übergeben“; Journal: „zustellung fehlgeschlagen“; kein erneuter Versand ohne Aktion. | ✓ Server antwortet: HTTP 200 nach 34 ms · ✓ Ergebnis je Person als fehlgeschlagen vermerkt: [{"ok":false,"fehler":"Can't send mail - all recipients were rejected: 550 Empfänge"}] · ✓ Übung läuft weiter: running · ✓ Journal vermerkt den Fehlschlag: zustellung fehlgeschlagen · ✓ geöffnete Moderation zeigt den Fehlschlag mit Handlungsanweisung: Hinweis sichtbar · ✓ nach Neuladen bleibt der Fehlschlag bei der Karte sichtbar: in „Verschickte vertrauliche Karten“ sichtbar · ✓ kein automatischer zweiter Versuch: 0 Mails angekommen | bestanden | – | `negativ/negativ.json` |
| N-02 | SMTP-Verbindung bricht während der Übertragung ab | Versand schlägt nach kurzer Zeit fehl (kein Hängenbleiben über 60 s), Übung läuft weiter, Fehlschlag sichtbar und im Journal; nachfolgende Karten werden wieder normal zugestellt, sobald der Server erreichbar ist. | ✓ Antwort innerhalb 60 s: HTTP 200 nach 11 ms · ✓ Fehlschlag vermerkt: write EPIPE · ✓ nächste Karte nach Wiederherstellung zugestellt: 1 Mail(s) für SK44 · ✓ Übung läuft weiter: running | bestanden | – | `negativ/negativ.json` |
| N-03 | Bühne wird während eines Einspielers neu geladen | Nach dem Neuladen zeigt die Bühne dieselbe Lage; der Browser verlangt erneut die Tonfreigabe; nach „Ton aktivieren“ läuft genau ein Einspieler (der der aktuellen Lage) von vorn, kein zweiter Ton parallel, keine vertraulichen Texte. | ✓ vor dem Neuladen lief der Einspieler der Lage: [{"src":"","laeuft":false},{"src":"lk04-loeschanlage-durchsage.mp3","laeuft":true}] · ✓ dieselbe Lage nach dem Neuladen: Brandalarm im Rechenzentrum · ✓ Tonfreigabe wird erneut verlangt: Freigabe sichtbar · ✓ genau ein Ton läuft, der der aktuellen Lage: [{"src":"","laeuft":false,"zeit":0},{"src":"lk04-loeschanlage-durchsage.mp3","laeuft":true,"zeit":2.445028}] · ✓ keine vertraulichen Texte auf der Bühne: geprüft gegen alle Kartentexte | bestanden | – | `negativ/negativ.json` |
| N-04 | Bühnenfenster wird geschlossen und später neu geöffnet | Die Übung läuft ohne Bühne weiter (Zeit, Lagen, Zustellungen); die neu geöffnete Bühne zeigt sofort die aktuelle Lage. | ✓ Übung läuft ohne Bühne weiter: running, Minute 0.1 → 22.1 · ✓ neu geöffnete Bühne zeigt die aktuelle Lage: LK06 Lagebild nach dem Löschen | bestanden | – | `negativ/negativ.json` |
| N-05 | Server-Neustart während laufender Übung | Zustand bleibt erhalten (Status, Übungsminute ± 1, gezeigte Lagen, Entscheidungen); bereits verschickte Karten werden nicht erneut verschickt; das Journal setzt die Folgenummern fort. | ✓ Status erhalten: running → running · ✓ Übungsminute fortgesetzt: 22.10 → 22.20 · ✓ gezeigte Lagen erhalten: LK01 LK02 LK03 LK04 LK05 LK06 · ✓ Entscheidung erhalten: [{"id":"W1","frage":"Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen sie weiter, bis die Gebäudetechnik die Ursache kennt?","hinweis":"Um 03:02 Uhr weiß niemand, dass es brennt. Herunterfahren bricht die Preisübertragung zum Saisonstart und die Partner-Uploads ab und könnte ein Fehlalarm sein; Weiterlaufen riskiert einen harten Ausfall. Beide Antworten sind vertretbar – bewertet wird, ob jemand e… | bestanden | – | `negativ/negativ.json` |
| N-06 | Zwei schnelle gleichzeitige Aktionen | Gleiche Karte zweimal gleichzeitig ausgelöst → genau eine Zustellung je Person. Zwei verschiedene Optionen derselben Entscheidung gleichzeitig → Endzustand ist genau eine Option, Abschlussposten passen zu ihr. | ✓ dreifach gleichzeitig ausgelöst → eine Mail: 1 Mail(s) · ✓ genau eine Option festgehalten: ausbauen · ✓ Abschlussposten passen zur festgehaltenen Option: aktiv: ausweichausbau | bestanden | – | `negativ/negativ.json` |
| N-07 | Entscheidung wird nachträglich geändert | Die Bühne zeigt danach nur die Folge der neuen Option; die Rechnung enthält nur deren Posten; eine Folgekarte der alten Option, die schon zugestellt war, bleibt zugestellt (wird nicht zurückgeholt) und wird nicht erneut verschickt. | ✓ Bühne zeigt die Folge der neuen Option: LK08 · ✓ Bühne zeigt keine Folge der alten Option: alte Option ohne Zusatz an dieser Lage · ✓ Endzustand = neue Option: weiterlaufen · ✓ Wechsel löst keinen erneuten Versand aus: jede Karte höchstens einmal im Journal | bestanden | – | `negativ/negativ.json` |
| N-08 | Bereits zugestellte Karte wird erneut ausgelöst | Keine zweite Mail; Übung unverändert. | ✓ genau eine Zustellung: 1 → 1 | bestanden | – | `negativ/negativ.json` |
| N-09 | Nicht berechtigte Rolle erhält keine Nachricht | Eine Karte an Rolle X erreicht nur Personen mit Rolle X (oder der dokumentierten Ersatzrolle, wenn X unbesetzt ist), niemanden sonst. | ✓ nur berechtigte Empfänger: person6@example.com (berechtigt: person6@example.com) | bestanden | – | `negativ/negativ.json` |
| N-10 | Überraschung vor ihrer Voraussetzung | Ablehnung mit Begründung (HTTP 400, Text nennt die fehlende Lage), keine Mail, keine Bühnenanzeige, Journal vermerkt „abgelehnt“; die Moderation zeigt die Schaltfläche gesperrt. | ✓ vertrauliche Überraschung abgelehnt: HTTP 400: Diese Karte passt erst nach LK15. · ✓ öffentliche Überraschung abgelehnt: HTTP 400: Diese Karte passt erst nach LK14. · ✓ keine Mail, keine Bühnenanzeige: 0 Mails · ✓ Journal vermerkt die Ablehnung: B1:abgelehnt (HTTP 400), B5:abgelehnt (HTTP 400) · ✓ Moderation zeigt B1 und B5 gesperrt: gesperrt: B1 B2 B3 B4 B5 B6 B7 B8 | bestanden | – | `negativ/negativ.json` |
| N-11 | Pause hält Zeit und Versand an | Während der Pause steht die Übungsminute, es wird keine Lage gezeigt und keine Karte verschickt; nach dem Fortsetzen läuft die Zeit ab dem Pausenstand weiter. | ✓ Zeit steht: 0.000 → 0.000 · ✓ keine neue Lage, keine Mail: 0 Lagen, 0 Mails · ✓ Zeit läuft nach dem Fortsetzen ab Pausenstand weiter: 0.000 → 0.100 | bestanden | – | `negativ/negativ.json` |
| N-12 | Mediendatei fehlt bzw. ist keine Audiodatei | Fehlende Datei: die Drehbuchprüfung meldet sie als Fehler (sichtbar in der Einrichtung). Beschädigte Datei: die Bühne zeigt die Lage weiter, ohne Skriptabbruch; die Übung läuft weiter. | ✓ fehlende Datei in der Drehbuchprüfung gemeldet: Karte LK04 (Ton): Datei /media/waterkant/gibt-es-nicht.mp3 fehlt. · ✓ Bühne zeigt LK04 trotz Medienfehler: Brandalarm im Rechenzentrum · ✓ Bühne zeigt LK05 trotz Medienfehler: Feuerwehr im Einsatz · ✓ kein Skriptabbruch auf der Bühne: keine Fehler · ✓ Übung läuft weiter: running · Befund: [niedrig] Moderation zeigt einen Hinweis auf den Medienfehler. | bestanden | Befund niedrig | `negativ/negativ.json` |
| N-13 | Zwei Moderationsfenster und zwei Bühnen gleichzeitig | Beide Moderationsfenster zeigen nach spätestens 3 s denselben Zustand (Pause, Entscheidung); von zwei Bühnen mit Ton spielt nur die zuletzt freigegebene, die andere zeigt „Ton läuft auf einer anderen Bühne“. | ✓ Pause aus Fenster 1 in Fenster 2 sichtbar: pausiert angezeigt · ✓ Fortsetzen aus Fenster 2 wirksam: running · ✓ nur die zuletzt freigegebene Bühne spielt Ton: Bühne 1 still, Bühne 2 spielt · ✓ Bühne 1 zeigt den Hinweis „Ton auf anderer Bühne“: sichtbar | bestanden | – | `negativ/negativ.json` |
| N-14 | Bühnenseite ruft Moderationsdaten ab | Erwartung nach heutiger Architektur (Einzelplatz, nur 127.0.0.1, keine Anmeldung): der Abruf GELINGT – es gibt keine Zugriffstrennung zwischen Bühne und Moderation. Geschützt ist nur, dass die Bühne von sich aus keine vertraulichen Inhalte lädt oder zeigt: die Bühnen-Schnittstelle enthält keinen Text einer vertraulichen Karte. | ✓ Abruf der Moderationsdaten aus der Bühnenseite gelingt (bekannte Einschränkung): HTTP 200, 184982 Zeichen · ✓ Bühnen-Schnittstelle enthält keine vertraulichen Kartentexte: 0 Treffer · Befund: [mittel] Keine Zugriffstrennung: Wer den Rechner der Moderation im Netz erreicht oder an der Bühne die Adresse ändert, kann die Moderationsansicht mit allen vertraulichen Texten öffnen. Gemindert durch Bindung an 127.0.0.1 (Standard). Eigenes Projekt „Zugriffsschutz“ (siehe offene Risiken). | bestanden | Befund mittel | `negativ/negativ.json` |
| N-15 | Unzulässige Medien- und Pfadangaben | Kein Abruf von Dateien außerhalb von media/ (Projektquellen, Daten, Einstellungen), weder direkt noch kodiert; Logo-Pfad mit „../“ wird ignoriert. | ✓ keine Datei außerhalb media/ ausgeliefert: /media/../server/index.js → 404; /media/%2e%2e/server/index.js → 404; /media/..%2fserver/index.js → 404; /media/%2e%2e%2fdata%2fsettings.json → 404; /../data/settings.json → 404; /media/waterkant/../../package.json → 404 · ✓ Logo-Pfad mit „../“ wird nicht in den Export eingebettet: HTTP 200; eingebettet: nichts | bestanden | – | `negativ/negativ.json` |
| N-16 | Browser der Moderation stürzt während der Übung ab (Prozess beendet) | Die Übung läuft serverseitig weiter (Zeit, Lagen, Zustellungen); ein neu gestarteter Browser zeigt in der Moderation den aktuellen Stand einschließlich festgehaltener Entscheidung; keine Doppelzustellung durch den Abbruch. | ✓ Übung läuft serverseitig weiter: running · ✓ Entscheidung aus dem abgestürzten Fenster erhalten: W1 = herunterfahren · ✓ neuer Browser zeigt die aktuelle Lage: Lagebild nach dem Löschen · ✓ keine Doppelzustellung: 2 Zustellungen, 2 verschiedene Karten | bestanden | – | `negativ/negativ.json` |
| N-17 | Zeitsprung zurück auf eine frühere Übungsminute | Die Bühne zeigt die zur neuen Minute gehörende frühere Lage; bereits gezeigte Lagen und verschickte Karten werden weder erneut ausgelöst noch erneut verschickt – auch nicht, wenn die Zeit danach wieder über ihre Minuten läuft; festgehaltene Entscheidungen bleiben. | ✓ Bühne zeigt die frühere Lage: LK04 (erwartet LK04 Brandalarm im Rechenzentrum) · ✓ kein erneuter Versand beim Rücksprung: 0 neue Mails · ✓ beim erneuten Vorlauf keine Lage doppelt gezeigt: 8 → 8 Einträge „lage gezeigt“ · ✓ beim erneuten Vorlauf keine Karte doppelt zugestellt: 6 → 6 Zustellungen · ✓ Entscheidung bleibt festgehalten: herunterfahren | bestanden | – | `negativ/negativ.json` |

## C. Sicherheit

**Voraussetzung:** isolierter Server (`tools/qa/mit-server.js`), Prüfung gegen dessen Adresse. Prüfschritt `sicherheit`: Exit-Code 0, 1 s, Konsole `konsole/sicherheit.txt`

| ID | Zweck | tatsächlich | Ergebnis | Beweis |
|---|---|---|---|---|
| S1 | Server nur auf 127.0.0.1 erreichbar | Verbindung über 192.0.2.2:4270 abgelehnt | bestanden | `sicherheit/sicherheit.json` |
| S2 | Vorlagen-Export enthält kein SMTP-Passwort | pass im Export: "••••••••" | bestanden | `sicherheit/sicherheit.json` |
| S3 | Import des Platzhalters lässt gespeichertes Passwort unverändert | data/settings.json enthält weiterhin das ursprüngliche Passwort | bestanden | `sicherheit/sicherheit.json` |
| S4 | Logo-Pfad mit "../" liest keine Datei außerhalb media/ | nichts eingebettet | bestanden | `sicherheit/sicherheit.json` |
| S5 | Logo-Upload lehnt SVG ab | HTTP 400 | bestanden | `sicherheit/sicherheit.json` |
| S6 | Logo-Upload lehnt text/html ab | HTTP 400 | bestanden | `sicherheit/sicherheit.json` |
| S7 | Logo-Upload: Dateiendung folgt dem Bildtyp, nicht dem Dateinamen | HTTP 200, gespeichert als /media/branding/custom-logo-1795090673290.png | bestanden | `sicherheit/sicherheit.json` |
| S8 | Schreibender Aufruf ohne X-Regie-Header abgelehnt (Schutz vor Fremdauslösung) | POST ohne Header: HTTP 403; als Formular: HTTP 403 | bestanden | `sicherheit/sicherheit.json` |
| S9 | Unzulässige Medienpfade liefern keine Dateien außerhalb von media/ | /media/../server/index.js → HTTP 404; /media/%2e%2e/server/index.js → HTTP 404; /media/..%2fdata%2fsettings.json → HTTP 404; /../data/settings.json → HTTP 404 | bestanden | `sicherheit/sicherheit.json` |
| S10 | Bewertung mit roleId "__proto__" abgelehnt | HTTP 400 | bestanden | `sicherheit/sicherheit.json` |
| S11 | Bewertung mit unbekannter Rolle abgelehnt | HTTP 400 | bestanden | `sicherheit/sicherheit.json` |
| S12 | Bewertung mit gültiger Rolle/Kriterium angenommen | HTTP 200 | bestanden | `sicherheit/sicherheit.json` |

## D. Handgerechnete Referenzfälle

**Voraussetzung:** Sollwerte in `docs/final-qa/referenz-sollwerte.json` (feste Zahlen mit Rechenweg). **Schritte:** Übung mit 90 Min. starten, Entscheidungen festhalten bzw. Karte auslösen, Werte der Moderation lesen.

| ID | Art | erwartet | tatsächlich | Ergebnis | Beweis |
|---|---|---|---|---|---|
| NT-R1 | Rechnung | 4260000 / 1400000 / 2860000 (Grundposten 1.550.000 + 420.000 + 380.000 + 310.000 + 200.000 + 250.000 + 160.000 + 90.000 + 900.000 = 4.260.000; keine Zusatzposten; Erstattung min(4.260.000; 1.400.000) = 1.400.000) | 4260000 / 1400000 / 2860000 | bestanden | `referenz/referenz.json` |
| NT-R2 | Rechnung | 7360000 / 1400000 / 5960000 (4.260.000 + ot-ausbreitung 350.000 + kundenkommunikation 600.000 + datenschutz-verspaetet 150.000 + loesegeld 2.000.000 = 7.360.000; Erstattung 1.400.000) | 7360000 / 1400000 / 5960000 | bestanden | `referenz/referenz.json` |
| NT-R3 | Rechnung | 4760000 / 1400000 / 3360000 (4.260.000 + 350.000 + 150.000 = 4.760.000; Erstattung 1.400.000) | 4760000 / 1400000 / 3360000 | bestanden | `referenz/referenz.json` |
| WK-R1 | Rechnung | 3651000 / 1600000 / 2051000 (Grundposten 480.000 + 1.250.000 + 90.000 + 260.000 + 180.000 + 700.000 + 120.000 + 36.000 + 60.000 = 3.176.000; Zusatz 100.000 + 25.000 + 95.000 + 180.000 + 75.000 = 475.000; brutto 3.651.000; Erstat…) | 3651000 / 1600000 / 2051000 | bestanden | `referenz/referenz.json` |
| WK-R2 | Rechnung | 3721000 / 1600000 / 2121000 (3.176.000 + 95.000 + 40.000 + 110.000 + 210.000 + 90.000 = 3.721.000; Erstattung 1.600.000) | 3721000 / 1600000 / 2121000 | bestanden | `referenz/referenz.json` |
| WK-R3 | Rechnung | 3711000 / 1600000 / 2111000 (3.176.000 + 100.000 + 40.000 + 110.000 + 210.000 + 75.000 = 3.711.000; Erstattung 1.600.000) | 3711000 / 1600000 / 2111000 | bestanden | `referenz/referenz.json` |
| NT-E1 | Empfänger | it-mitarbeiter | it-mitarbeiter | bestanden | `referenz/referenz.json` |
| NT-E2 | Empfänger | geschaeftsfuehrer-ceo | geschaeftsfuehrer-ceo | bestanden | `referenz/referenz.json` |
| NT-E3 | Empfänger | leiter-it | leiter-it | bestanden | `referenz/referenz.json` |
| WK-E1 | Empfänger | facility-management | facility-management | bestanden | `referenz/referenz.json` |
| WK-E2 | Empfänger | leiter-arbeitssicherheit | leiter-arbeitssicherheit | bestanden | `referenz/referenz.json` |
| WK-E3 | Empfänger | null | null | bestanden | `referenz/referenz.json` |
| NT-K | Bewertungsraster | 8 Kriterien | 8 Kriterien | bestanden | `referenz/referenz.json` |
| WK-K | Bewertungsraster | 10 Kriterien, Themen: Personenschutz, Brand- und Raumfreigabe, Kunden- und Partnerpriorisierung, Wiederanlaufabhängigkeiten, Krisenkommunikation | 10 Kriterien | bestanden | `referenz/referenz.json` |

## E. Integration mit Orakel – NordTech

**Voraussetzung:** isolierter Server, Countdown 0 s, Lagen per Zeitsprung, empfohlene Besetzung je Dauer. **Orakel:** `tools/qa/orakel.js` (eigene Logik, ohne Engine und Server). Orakel-Selbsttest: Entscheidungskombination: falsche Erwartungen erkannt (13/13/26 Befunde); Dauer × Schwerpunkt: falsche Erwartungen erkannt (13/6/17 Befunde). Prüfschritt `integration-nordtech`: Exit-Code 0, 21 s, Konsole `konsole/integration-nordtech.txt`

| ID | Gruppe | Eingaben | Lagen | vertrauliche Karten | Brutto (Orakel) | Ergebnis | Befunde |
|---|---|---|---|---|---|---|---|
| INT-NO-E01 | Entscheidungskombination | 90 Min., ausgewogen, am-netz/proaktiv/melden/nicht-gezahlt | 13 | 13 | 4.610.000 | bestanden | – |
| INT-NO-E02 | Entscheidungskombination | 90 Min., ausgewogen, am-netz/proaktiv/melden/gezahlt | 13 | 14 | 6.610.000 | bestanden | – |
| INT-NO-E03 | Entscheidungskombination | 90 Min., ausgewogen, am-netz/proaktiv/abwarten/nicht-gezahlt | 13 | 14 | 4.760.000 | bestanden | – |
| INT-NO-E04 | Entscheidungskombination | 90 Min., ausgewogen, am-netz/proaktiv/abwarten/gezahlt | 13 | 15 | 6.760.000 | bestanden | – |
| INT-NO-E05 | Entscheidungskombination | 90 Min., ausgewogen, am-netz/abwarten/melden/nicht-gezahlt | 13 | 14 | 5.210.000 | bestanden | – |
| INT-NO-E06 | Entscheidungskombination | 90 Min., ausgewogen, am-netz/abwarten/melden/gezahlt | 13 | 15 | 7.210.000 | bestanden | – |
| INT-NO-E07 | Entscheidungskombination | 90 Min., ausgewogen, am-netz/abwarten/abwarten/nicht-gezahlt | 13 | 15 | 5.360.000 | bestanden | – |
| INT-NO-E08 | Entscheidungskombination | 90 Min., ausgewogen, am-netz/abwarten/abwarten/gezahlt | 13 | 16 | 7.360.000 | bestanden | – |
| INT-NO-E09 | Entscheidungskombination | 90 Min., ausgewogen, trennen/proaktiv/melden/nicht-gezahlt | 13 | 13 | 4.260.000 | bestanden | – |
| INT-NO-E10 | Entscheidungskombination | 90 Min., ausgewogen, trennen/proaktiv/melden/gezahlt | 13 | 14 | 6.260.000 | bestanden | – |
| INT-NO-E11 | Entscheidungskombination | 90 Min., ausgewogen, trennen/proaktiv/abwarten/nicht-gezahlt | 13 | 14 | 4.410.000 | bestanden | – |
| INT-NO-E12 | Entscheidungskombination | 90 Min., ausgewogen, trennen/proaktiv/abwarten/gezahlt | 13 | 15 | 6.410.000 | bestanden | – |
| INT-NO-E13 | Entscheidungskombination | 90 Min., ausgewogen, trennen/abwarten/melden/nicht-gezahlt | 13 | 14 | 4.860.000 | bestanden | – |
| INT-NO-E14 | Entscheidungskombination | 90 Min., ausgewogen, trennen/abwarten/melden/gezahlt | 13 | 15 | 6.860.000 | bestanden | – |
| INT-NO-E15 | Entscheidungskombination | 90 Min., ausgewogen, trennen/abwarten/abwarten/nicht-gezahlt | 13 | 15 | 5.010.000 | bestanden | – |
| INT-NO-E16 | Entscheidungskombination | 90 Min., ausgewogen, trennen/abwarten/abwarten/gezahlt | 13 | 16 | 7.010.000 | bestanden | – |
| INT-NO-D45-ausgewogen | Dauer × Schwerpunkt | 45 Min., ausgewogen, am-netz/proaktiv/melden/nicht-gezahlt | 9 | 6 | 4.610.000 | bestanden | – |
| INT-NO-D45-fuehrung | Dauer × Schwerpunkt | 45 Min., fuehrung, am-netz/proaktiv/melden/gezahlt | 9 | 7 | 6.610.000 | bestanden | – |
| INT-NO-D45-it | Dauer × Schwerpunkt | 45 Min., it, am-netz/proaktiv/abwarten/nicht-gezahlt | 9 | 8 | 4.760.000 | bestanden | – |
| INT-NO-D45-produktion | Dauer × Schwerpunkt | 45 Min., produktion, am-netz/proaktiv/abwarten/gezahlt | 9 | 9 | 6.760.000 | bestanden | – |
| INT-NO-D45-kunden | Dauer × Schwerpunkt | 45 Min., kunden, am-netz/abwarten/melden/nicht-gezahlt | 9 | 7 | 5.210.000 | bestanden | – |
| INT-NO-D60-ausgewogen | Dauer × Schwerpunkt | 60 Min., ausgewogen, am-netz/abwarten/melden/gezahlt | 9 | 12 | 7.210.000 | bestanden | – |
| INT-NO-D60-fuehrung | Dauer × Schwerpunkt | 60 Min., fuehrung, am-netz/abwarten/abwarten/nicht-gezahlt | 9 | 12 | 5.360.000 | bestanden | – |
| INT-NO-D60-it | Dauer × Schwerpunkt | 60 Min., it, am-netz/abwarten/abwarten/gezahlt | 9 | 12 | 7.360.000 | bestanden | – |
| INT-NO-D60-produktion | Dauer × Schwerpunkt | 60 Min., produktion, trennen/proaktiv/melden/nicht-gezahlt | 9 | 10 | 4.260.000 | bestanden | – |
| INT-NO-D60-kunden | Dauer × Schwerpunkt | 60 Min., kunden, trennen/proaktiv/melden/gezahlt | 9 | 11 | 6.260.000 | bestanden | – |
| INT-NO-D90-ausgewogen | Dauer × Schwerpunkt | 90 Min., ausgewogen, trennen/proaktiv/abwarten/nicht-gezahlt | 13 | 14 | 4.410.000 | bestanden | – |
| INT-NO-D90-fuehrung | Dauer × Schwerpunkt | 90 Min., fuehrung, trennen/proaktiv/abwarten/gezahlt | 13 | 15 | 6.410.000 | bestanden | – |
| INT-NO-D90-it | Dauer × Schwerpunkt | 90 Min., it, trennen/abwarten/melden/nicht-gezahlt | 13 | 14 | 4.860.000 | bestanden | – |
| INT-NO-D90-produktion | Dauer × Schwerpunkt | 90 Min., produktion, trennen/abwarten/melden/gezahlt | 13 | 15 | 6.860.000 | bestanden | – |
| INT-NO-D90-kunden | Dauer × Schwerpunkt | 90 Min., kunden, trennen/abwarten/abwarten/nicht-gezahlt | 13 | 15 | 5.010.000 | bestanden | – |
| INT-NO-D120-ausgewogen | Dauer × Schwerpunkt | 120 Min., ausgewogen, trennen/abwarten/abwarten/gezahlt | 15 | 19 | 7.010.000 | bestanden | – |
| INT-NO-D120-fuehrung | Dauer × Schwerpunkt | 120 Min., fuehrung, am-netz/proaktiv/melden/nicht-gezahlt | 15 | 16 | 4.610.000 | bestanden | – |
| INT-NO-D120-it | Dauer × Schwerpunkt | 120 Min., it, am-netz/proaktiv/melden/gezahlt | 15 | 17 | 6.610.000 | bestanden | – |
| INT-NO-D120-produktion | Dauer × Schwerpunkt | 120 Min., produktion, am-netz/proaktiv/abwarten/nicht-gezahlt | 15 | 17 | 4.760.000 | bestanden | – |
| INT-NO-D120-kunden | Dauer × Schwerpunkt | 120 Min., kunden, am-netz/proaktiv/abwarten/gezahlt | 15 | 18 | 6.760.000 | bestanden | – |
| INT-NO-D180-ausgewogen | Dauer × Schwerpunkt | 180 Min., ausgewogen, am-netz/abwarten/melden/nicht-gezahlt | 21 | 24 | 5.210.000 | bestanden | – |
| INT-NO-D180-fuehrung | Dauer × Schwerpunkt | 180 Min., fuehrung, am-netz/abwarten/melden/gezahlt | 21 | 25 | 7.210.000 | bestanden | – |
| INT-NO-D180-it | Dauer × Schwerpunkt | 180 Min., it, am-netz/abwarten/abwarten/nicht-gezahlt | 21 | 25 | 5.360.000 | bestanden | – |
| INT-NO-D180-produktion | Dauer × Schwerpunkt | 180 Min., produktion, am-netz/abwarten/abwarten/gezahlt | 21 | 26 | 7.360.000 | bestanden | – |
| INT-NO-D180-kunden | Dauer × Schwerpunkt | 180 Min., kunden, trennen/proaktiv/melden/nicht-gezahlt | 21 | 23 | 4.260.000 | bestanden | – |

## E. Integration mit Orakel – Waterkant

**Voraussetzung:** isolierter Server, Countdown 0 s, Lagen per Zeitsprung, empfohlene Besetzung je Dauer. **Orakel:** `tools/qa/orakel.js` (eigene Logik, ohne Engine und Server). Orakel-Selbsttest: Entscheidungskombination: falsche Erwartungen erkannt (16/16/30 Befunde); Dauer × Schwerpunkt: falsche Erwartungen erkannt (13/14/25 Befunde). Prüfschritt `integration-waterkant`: Exit-Code 0, 30 s, Konsole `konsole/integration-waterkant.txt`

| ID | Gruppe | Eingaben | Lagen | vertrauliche Karten | Brutto (Orakel) | Ergebnis | Befunde |
|---|---|---|---|---|---|---|---|
| INT-WA-E01 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/frueh/bergen/minimal/gleichrangig | 13 | 16 | 3.651.000 | bestanden | – |
| INT-WA-E02 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/frueh/bergen/minimal/eigene | 13 | 17 | 3.666.000 | bestanden | – |
| INT-WA-E03 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/frueh/bergen/ausbauen/gleichrangig | 13 | 16 | 3.681.000 | bestanden | – |
| INT-WA-E04 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/frueh/bergen/ausbauen/eigene | 13 | 17 | 3.696.000 | bestanden | – |
| INT-WA-E05 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/frueh/abwarten/minimal/gleichrangig | 13 | 15 | 3.666.000 | bestanden | – |
| INT-WA-E06 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/frueh/abwarten/minimal/eigene | 13 | 16 | 3.681.000 | bestanden | – |
| INT-WA-E07 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/frueh/abwarten/ausbauen/gleichrangig | 13 | 15 | 3.696.000 | bestanden | – |
| INT-WA-E08 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/frueh/abwarten/ausbauen/eigene | 13 | 16 | 3.711.000 | bestanden | – |
| INT-WA-E09 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/spaeter/bergen/minimal/gleichrangig | 13 | 17 | 3.666.000 | bestanden | – |
| INT-WA-E10 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/spaeter/bergen/minimal/eigene | 13 | 18 | 3.681.000 | bestanden | – |
| INT-WA-E11 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/spaeter/bergen/ausbauen/gleichrangig | 13 | 17 | 3.696.000 | bestanden | – |
| INT-WA-E12 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/spaeter/bergen/ausbauen/eigene | 13 | 18 | 3.711.000 | bestanden | – |
| INT-WA-E13 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/spaeter/abwarten/minimal/gleichrangig | 13 | 16 | 3.681.000 | bestanden | – |
| INT-WA-E14 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/spaeter/abwarten/minimal/eigene | 13 | 17 | 3.696.000 | bestanden | – |
| INT-WA-E15 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/spaeter/abwarten/ausbauen/gleichrangig | 13 | 16 | 3.711.000 | bestanden | – |
| INT-WA-E16 | Entscheidungskombination | 90 Min., ausgewogen, herunterfahren/spaeter/abwarten/ausbauen/eigene | 13 | 17 | 3.726.000 | bestanden | – |
| INT-WA-E17 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/frueh/bergen/minimal/gleichrangig | 13 | 17 | 3.646.000 | bestanden | – |
| INT-WA-E18 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/frueh/bergen/minimal/eigene | 13 | 18 | 3.661.000 | bestanden | – |
| INT-WA-E19 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/frueh/bergen/ausbauen/gleichrangig | 13 | 17 | 3.676.000 | bestanden | – |
| INT-WA-E20 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/frueh/bergen/ausbauen/eigene | 13 | 18 | 3.691.000 | bestanden | – |
| INT-WA-E21 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/frueh/abwarten/minimal/gleichrangig | 13 | 16 | 3.661.000 | bestanden | – |
| INT-WA-E22 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/frueh/abwarten/minimal/eigene | 13 | 17 | 3.676.000 | bestanden | – |
| INT-WA-E23 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/frueh/abwarten/ausbauen/gleichrangig | 13 | 16 | 3.691.000 | bestanden | – |
| INT-WA-E24 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/frueh/abwarten/ausbauen/eigene | 13 | 17 | 3.706.000 | bestanden | – |
| INT-WA-E25 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/spaeter/bergen/minimal/gleichrangig | 13 | 18 | 3.661.000 | bestanden | – |
| INT-WA-E26 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/spaeter/bergen/minimal/eigene | 13 | 19 | 3.676.000 | bestanden | – |
| INT-WA-E27 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/spaeter/bergen/ausbauen/gleichrangig | 13 | 18 | 3.691.000 | bestanden | – |
| INT-WA-E28 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/spaeter/bergen/ausbauen/eigene | 13 | 19 | 3.706.000 | bestanden | – |
| INT-WA-E29 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/spaeter/abwarten/minimal/gleichrangig | 13 | 17 | 3.676.000 | bestanden | – |
| INT-WA-E30 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/spaeter/abwarten/minimal/eigene | 13 | 18 | 3.691.000 | bestanden | – |
| INT-WA-E31 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/spaeter/abwarten/ausbauen/gleichrangig | 13 | 17 | 3.706.000 | bestanden | – |
| INT-WA-E32 | Entscheidungskombination | 90 Min., ausgewogen, weiterlaufen/spaeter/abwarten/ausbauen/eigene | 13 | 18 | 3.721.000 | bestanden | – |
| INT-WA-D45-ausgewogen | Dauer × Schwerpunkt | 45 Min., ausgewogen, herunterfahren/frueh/bergen/minimal/gleichrangig | 9 | 14 | 3.651.000 | bestanden | – |
| INT-WA-D45-fuehrung | Dauer × Schwerpunkt | 45 Min., fuehrung, herunterfahren/frueh/bergen/minimal/eigene | 9 | 15 | 3.666.000 | bestanden | – |
| INT-WA-D45-it | Dauer × Schwerpunkt | 45 Min., it, herunterfahren/frueh/bergen/ausbauen/gleichrangig | 9 | 14 | 3.681.000 | bestanden | – |
| INT-WA-D45-kunden | Dauer × Schwerpunkt | 45 Min., kunden, herunterfahren/frueh/bergen/ausbauen/eigene | 9 | 15 | 3.696.000 | bestanden | – |
| INT-WA-D45-betrieb | Dauer × Schwerpunkt | 45 Min., betrieb, herunterfahren/frueh/abwarten/minimal/gleichrangig | 9 | 13 | 3.666.000 | bestanden | – |
| INT-WA-D60-ausgewogen | Dauer × Schwerpunkt | 60 Min., ausgewogen, herunterfahren/frueh/abwarten/minimal/eigene | 9 | 14 | 3.681.000 | bestanden | – |
| INT-WA-D60-fuehrung | Dauer × Schwerpunkt | 60 Min., fuehrung, herunterfahren/frueh/abwarten/ausbauen/gleichrangig | 9 | 13 | 3.696.000 | bestanden | – |
| INT-WA-D60-it | Dauer × Schwerpunkt | 60 Min., it, herunterfahren/frueh/abwarten/ausbauen/eigene | 9 | 14 | 3.711.000 | bestanden | – |
| INT-WA-D60-kunden | Dauer × Schwerpunkt | 60 Min., kunden, herunterfahren/spaeter/bergen/minimal/gleichrangig | 9 | 15 | 3.666.000 | bestanden | – |
| INT-WA-D60-betrieb | Dauer × Schwerpunkt | 60 Min., betrieb, herunterfahren/spaeter/bergen/minimal/eigene | 9 | 16 | 3.681.000 | bestanden | – |
| INT-WA-D90-ausgewogen | Dauer × Schwerpunkt | 90 Min., ausgewogen, herunterfahren/spaeter/bergen/ausbauen/gleichrangig | 13 | 17 | 3.696.000 | bestanden | – |
| INT-WA-D90-fuehrung | Dauer × Schwerpunkt | 90 Min., fuehrung, herunterfahren/spaeter/bergen/ausbauen/eigene | 12 | 21 | 3.711.000 | bestanden | – |
| INT-WA-D90-it | Dauer × Schwerpunkt | 90 Min., it, herunterfahren/spaeter/abwarten/minimal/gleichrangig | 12 | 16 | 3.681.000 | bestanden | – |
| INT-WA-D90-kunden | Dauer × Schwerpunkt | 90 Min., kunden, herunterfahren/spaeter/abwarten/minimal/eigene | 12 | 17 | 3.696.000 | bestanden | – |
| INT-WA-D90-betrieb | Dauer × Schwerpunkt | 90 Min., betrieb, herunterfahren/spaeter/abwarten/ausbauen/gleichrangig | 12 | 17 | 3.711.000 | bestanden | – |
| INT-WA-D120-ausgewogen | Dauer × Schwerpunkt | 120 Min., ausgewogen, herunterfahren/spaeter/abwarten/ausbauen/eigene | 15 | 19 | 3.726.000 | bestanden | – |
| INT-WA-D120-fuehrung | Dauer × Schwerpunkt | 120 Min., fuehrung, weiterlaufen/frueh/bergen/minimal/gleichrangig | 14 | 21 | 3.646.000 | bestanden | – |
| INT-WA-D120-it | Dauer × Schwerpunkt | 120 Min., it, weiterlaufen/frueh/bergen/minimal/eigene | 14 | 20 | 3.661.000 | bestanden | – |
| INT-WA-D120-kunden | Dauer × Schwerpunkt | 120 Min., kunden, weiterlaufen/frueh/bergen/ausbauen/gleichrangig | 14 | 19 | 3.676.000 | bestanden | – |
| INT-WA-D120-betrieb | Dauer × Schwerpunkt | 120 Min., betrieb, weiterlaufen/frueh/bergen/ausbauen/eigene | 14 | 21 | 3.691.000 | bestanden | – |
| INT-WA-D180-ausgewogen | Dauer × Schwerpunkt | 180 Min., ausgewogen, weiterlaufen/frueh/abwarten/minimal/gleichrangig | 18 | 23 | 3.661.000 | bestanden | – |
| INT-WA-D180-fuehrung | Dauer × Schwerpunkt | 180 Min., fuehrung, weiterlaufen/frueh/abwarten/minimal/eigene | 18 | 25 | 3.676.000 | bestanden | – |
| INT-WA-D180-it | Dauer × Schwerpunkt | 180 Min., it, weiterlaufen/frueh/abwarten/ausbauen/gleichrangig | 18 | 22 | 3.691.000 | bestanden | – |
| INT-WA-D180-kunden | Dauer × Schwerpunkt | 180 Min., kunden, weiterlaufen/frueh/abwarten/ausbauen/eigene | 18 | 25 | 3.706.000 | bestanden | – |
| INT-WA-D180-betrieb | Dauer × Schwerpunkt | 180 Min., betrieb, weiterlaufen/spaeter/bergen/minimal/gleichrangig | 18 | 24 | 3.661.000 | bestanden | – |

## F. Zeitablauf und Mails – NordTech

Prüfschritt `lauf-nordtech`: Exit-Code 0, 91 s, Konsole `konsole/lauf-nordtech.txt`

| ID | Zweck | erwartet | tatsächlich | Ergebnis | Beweis |
|---|---|---|---|---|---|
| LAU-NO-M11 | Begrüßung und Rollenbriefing je Person genau einmal | 9 Personen: je 1 Begrüßung, je 1 Briefing | Begrüßungen 9, Briefings 9, Personen 9 | bestanden | `lauf/nordtech.json` |
| LAU-NO-N52 | Öffentliche Überraschung vor laufender Lage | abgelehnt mit verständlicher Meldung; nichts auf der Bühne | vor Start: HTTP 400 „Diese Karte passt erst nach LK22.“; im Countdown: HTTP 400 | bestanden | `lauf/nordtech.json` |
| LAU-NO-N53 | Überraschung B6 vor ihrer Lage LK22 | abgelehnt | HTTP 400 „Diese Karte passt erst nach LK22.“ | bestanden | `lauf/nordtech.json` |
| LAU-NO-N74 | Timer-Pause | Zeit steht während der Pause und läuft danach weiter | vor Pause 0 Min., nach 4 s Pause 0 Min., 2,5 s nach Fortsetzen 0.1 Min. | bestanden | `lauf/nordtech.json` |
| LAU-NO-N85 | Entscheidung W1 geändert (am-netz → trennen) | Posten der Rechnung folgen der neuen Entscheidung; Folgen der alten Option entfallen | Posten vorher (Option 1): ot-ausbreitung; danach aktiv: keine; Bühne vorher Lage LK02 | bestanden | `lauf/nordtech.json` |
| LAU-NO-N66 | Private Überraschung B1: weder it-mitarbeiter noch Ersatzrolle besetzt | keine Mail; Warnung im Moderations-Log (Moderation entscheidet, ob sie die Karte mündlich einbringt) | HTTP 200; Mails 0; Log: warn „Bonuskarte B1 ausgelöst, aber weder IT-Fachkraft (Vertretung IT-Leitung) (niemand besetzt) noch eine Ersatzrolle ist besetzt.“ | bestanden | `lauf/nordtech.json` |
| LAU-NO-N97 | Doppelauslösung: SK07 dreimal gleichzeitig | genau 1 Mail(s) (eine je Person der Rolle) | 1 Mail(s) | bestanden | `lauf/nordtech.json` |
| LAU-NO-N98 | Doppelauslösung: öffentliche Überraschung B6 zweimal | erste angenommen, zweite abgelehnt | HTTP 200, dann HTTP 400 „Diese Karte wurde schon ausgelöst.“ | bestanden | `lauf/nordtech.json` |
| LAU-NO-N69 | Überraschung B7 braucht geschaeftsfuehrer-ceo | Rolle besetzt → angenommen | Rolle besetzt: HTTP 200  | bestanden | `lauf/nordtech.json` |
| LAU-NO-M210 | Jede ausgelöste vertrauliche Karte genau einmal bei den richtigen Personen | alle Empfänger der Rolle (inkl. Team), niemand sonst, keine Doppelung | 17 Karten, 22 Mails, Abweichungen: keine | bestanden | `lauf/nordtech.json` |
| LAU-NO-M311 | Folgekarten der gewählten Entscheidungen | Folgekarte kommt, sobald ihre Lage gespielt ist | SK43 bei LK07: Lage gespielt, zugestellt; SK44 bei LK12: Lage gespielt, zugestellt; SK27 bei LK17: Lage gespielt, zugestellt | bestanden | `lauf/nordtech.json` |
| LAU-NO-M412 | Private Überraschung per Mail, öffentliche nur auf der Bühne | B2 per Mail an kommunikation-marketing; B6 auf der Bühne, keine Mail | B2: person7@example.com; B6: Mails 0, Bühne zeigt Ereignis | bestanden | `lauf/nordtech.json` |
| LAU-NO-M513 | Ersatzrolle (Rolle leiter-it bewusst nicht besetzt) | Karten der freien Rolle gehen an die Ersatzrolle, mit Hinweis im Text | 4 Karte(n) an Ersatzrolle (SK45→leitung-produktion, SK01→geschaeftsfuehrer-ceo, SK15→notfallmanagement-bcm, SK27→geschaeftsfuehrer-ceo), davon mit Hinweis: 4 | bestanden | `lauf/nordtech.json` |
| LAU-NO-V114 | Keine vertraulichen Inhalte in Bühnen- und Ablaufdaten | kein Text vertraulicher Karten, Moderationshinweise, Gesprächsleitfäden, privater Überraschungen; keine Mailadressen | 164 Texte geprüft; Treffer: keine; Adressen: 0 | bestanden | `lauf/nordtech.json` |
| LAU-NO-N115 | Mailversand schlägt fehl (SMTP nicht erreichbar) | Lauf geht weiter; Fehler im Moderations-Log je Person; Karte als ausgelöst mit Fehlerstatus vermerkt; keine erneute automatische Zustellung | HTTP 200; Status running; Log-Einträge „fehlgeschlagen“: 1; Ergebnis je Person: Fehler; Hinweis: kein Knopf für erneuten Versand vorhanden – Moderation muss die Karte vorlesen oder manuell weitergeben | bestanden | `lauf/nordtech.json` |
| LAU-NO-N216 | Server-Neustart mitten im Lauf | Lauf, Entscheidungen, ausgelöste Karten und aktuelle Lage bleiben erhalten; keine Karte wird doppelt verschickt | Status running→running; Karten 18→18; Lage LK21→LK21; Zeit 72.1→72.1 Min. (die Ausfallzeit zählt als Übungszeit); Stummschaltung danach: aus | bestanden | `lauf/nordtech.json` |
| LAU-NO-N217 | Nach Neustart keine Doppelzustellung | jede Karte je Person höchstens einmal | 0 doppelte Zustellungen | bestanden | `lauf/nordtech.json` |
| LAU-NO-R118 | Rechnung im Abschluss | Brutto 7010000 € = Grundschaden 4260000 € + Posten der gewählten Optionen 2750000 €; Erstattung 1400000 € (Modellannahme); beim Unternehmen 5610000 € | Brutto 7010000 €, Erstattung 1400000 €, beim Unternehmen 5610000 € | bestanden | `lauf/nordtech.json` |
| LAU-NO-P119 | Übungsprotokoll (Export) | Entscheidungen mit Wortlaut, Abschnitt Überraschungen, keine Namen oder Adressen, kein Passwort | 13967 Zeichen; Entscheidungen enthalten: 4/4; Namen/Adressen: 0 | bestanden | `lauf/nordtech.json` |
| LAU-NO-N1020 | Fehlende Mediendatei | Prüfung meldet die fehlende Datei als Fehler, bevor geübt wird; Server liefert 404 statt Absturz | Prüfung: „FEHLER  Karte LK01 (Bild): Datei /media/gibt-es-nicht.png fehlt.“; HTTP 404 | bestanden | `lauf/nordtech.json` |
| LAU-NO-N621 | Überraschung B7, Pflichtrolle geschaeftsfuehrer-ceo nicht besetzt | abgelehnt mit Begründung; Moderation sieht vorab, warum die Karte nicht passt | HTTP 400 „Diese Karte setzt voraus, dass Geschäftsführung (CEO), Krisenstabsleitung besetzt ist.“; Anzeige in der Moderation: ["nur wenn Geschäftsführung (CEO), Krisenstabsleitung besetzt ist"] | bestanden | `lauf/nordtech.json` |

## F. Zeitablauf und Mails – Waterkant

Prüfschritt `lauf-waterkant`: Exit-Code 0, 92 s, Konsole `konsole/lauf-waterkant.txt`

| ID | Zweck | erwartet | tatsächlich | Ergebnis | Beweis |
|---|---|---|---|---|---|
| LAU-WA-M11 | Begrüßung und Rollenbriefing je Person genau einmal | 9 Personen: je 1 Begrüßung, je 1 Briefing | Begrüßungen 9, Briefings 9, Personen 9 | bestanden | `lauf/waterkant.json` |
| LAU-WA-N52 | Öffentliche Überraschung vor laufender Lage | abgelehnt mit verständlicher Meldung; nichts auf der Bühne | vor Start: HTTP 400 „Diese Karte passt erst nach LK14.“; im Countdown: HTTP 400 | bestanden | `lauf/waterkant.json` |
| LAU-WA-N53 | Überraschung B1 vor ihrer Lage LK15 | abgelehnt | HTTP 400 „Diese Karte passt erst nach LK15.“ | bestanden | `lauf/waterkant.json` |
| LAU-WA-N74 | Timer-Pause | Zeit steht während der Pause und läuft danach weiter | vor Pause 0 Min., nach 4 s Pause 0 Min., 2,5 s nach Fortsetzen 0.1 Min. | bestanden | `lauf/waterkant.json` |
| LAU-WA-N85 | Entscheidung W1 geändert (herunterfahren → weiterlaufen) | Posten der Rechnung folgen der neuen Entscheidung; Folgen der alten Option entfallen | Posten vorher (Option 1): preisuebertragung; danach aktiv: russeintrag; Bühne vorher Lage LK03 | bestanden | `lauf/waterkant.json` |
| LAU-WA-N96 | Doppelauslösung: SK01 dreimal gleichzeitig | genau 1 Mail(s) (eine je Person der Rolle) | 1 Mail(s) | bestanden | `lauf/waterkant.json` |
| LAU-WA-N97 | Doppelauslösung: öffentliche Überraschung B5 zweimal | erste angenommen, zweite abgelehnt | HTTP 200, dann HTTP 400 „Diese Karte wurde schon ausgelöst.“ | bestanden | `lauf/waterkant.json` |
| LAU-WA-N68 | Überraschung B7 braucht leiter-it | Rolle besetzt → angenommen | Rolle besetzt: HTTP 200  | bestanden | `lauf/waterkant.json` |
| LAU-WA-M29 | Jede ausgelöste vertrauliche Karte genau einmal bei den richtigen Personen | alle Empfänger der Rolle (inkl. Team), niemand sonst, keine Doppelung | 20 Karten, 24 Mails, Abweichungen: keine | bestanden | `lauf/waterkant.json` |
| LAU-WA-M310 | Folgekarten der gewählten Entscheidungen | Folgekarte kommt, sobald ihre Lage gespielt ist | SK41 bei LK14: Lage gespielt, zugestellt; SK42 bei LK14: Lage gespielt, zugestellt; SK45 bei LK25: Lage nicht gespielt, nicht zugestellt; SK44 bei LK27: Lage nicht gespielt, nicht zugestellt | bestanden | `lauf/waterkant.json` |
| LAU-WA-M411 | Private Überraschung per Mail, öffentliche nur auf der Bühne | B1 per Mail an leiter-it; B5 auf der Bühne, keine Mail | B1: person2@example.com; B5: Mails 0, Bühne zeigt Ereignis | bestanden | `lauf/waterkant.json` |
| LAU-WA-M512 | Ersatzrolle (Rolle facility-management bewusst nicht besetzt) | Karten der freien Rolle gehen an die Ersatzrolle, mit Hinweis im Text | 7 Karte(n) an Ersatzrolle (SK04→leiter-arbeitssicherheit, SK34→geschaeftsfuehrer-ceo, SK08→leiter-it, SK35→leiter-it, SK13→leiter-arbeitssicherheit, SK18→leiter-finanzen-cfo, SK24→leiterin-kommunikat… | bestanden | `lauf/waterkant.json` |
| LAU-WA-V113 | Keine vertraulichen Inhalte in Bühnen- und Ablaufdaten | kein Text vertraulicher Karten, Moderationshinweise, Gesprächsleitfäden, privater Überraschungen; keine Mailadressen | 152 Texte geprüft; Treffer: keine; Adressen: 0 | bestanden | `lauf/waterkant.json` |
| LAU-WA-N114 | Mailversand schlägt fehl (SMTP nicht erreichbar) | Lauf geht weiter; Fehler im Moderations-Log je Person; Karte als ausgelöst mit Fehlerstatus vermerkt; keine erneute automatische Zustellung | HTTP 200; Status running; Log-Einträge „fehlgeschlagen“: 1; Ergebnis je Person: Fehler; Hinweis: kein Knopf für erneuten Versand vorhanden – Moderation muss die Karte vorlesen oder manuell weitergeben | bestanden | `lauf/waterkant.json` |
| LAU-WA-N215 | Server-Neustart mitten im Lauf | Lauf, Entscheidungen, ausgelöste Karten und aktuelle Lage bleiben erhalten; keine Karte wird doppelt verschickt | Status running→running; Karten 21→21; Lage LK26→LK26; Zeit 72.1→72.1 Min. (die Ausfallzeit zählt als Übungszeit); Stummschaltung danach: aus | bestanden | `lauf/waterkant.json` |
| LAU-WA-N216 | Nach Neustart keine Doppelzustellung | jede Karte je Person höchstens einmal | 0 doppelte Zustellungen | bestanden | `lauf/waterkant.json` |
| LAU-WA-R117 | Rechnung im Abschluss | Brutto 3721000 € = Grundschaden 3176000 € + Posten der gewählten Optionen 545000 €; Erstattung 1600000 € (Modellannahme); beim Unternehmen 2121000 € | Brutto 3721000 €, Erstattung 1600000 €, beim Unternehmen 2121000 € | bestanden | `lauf/waterkant.json` |
| LAU-WA-P118 | Übungsprotokoll (Export) | Entscheidungen mit Wortlaut, Abschnitt Überraschungen, keine Namen oder Adressen, kein Passwort | 16464 Zeichen; Entscheidungen enthalten: 5/5; Namen/Adressen: 0 | bestanden | `lauf/waterkant.json` |
| LAU-WA-N1019 | Fehlende Mediendatei | Prüfung meldet die fehlende Datei als Fehler, bevor geübt wird; Server liefert 404 statt Absturz | Prüfung: „FEHLER  Karte LK01 (Bild): Datei /media/gibt-es-nicht.png fehlt.“; HTTP 404 | bestanden | `lauf/waterkant.json` |
| LAU-WA-N620 | Überraschung B7, Pflichtrolle leiter-it nicht besetzt | abgelehnt mit Begründung; Moderation sieht vorab, warum die Karte nicht passt | HTTP 400 „Diese Karte setzt voraus, dass IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) besetzt ist.“; Anzeige in der Moderation: ["nur wenn IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) b… | bestanden | `lauf/waterkant.json` |

## F. Bühne im Browser – NordTech

Prüfschritt `buehne-nordtech`: Exit-Code 0, 191 s, Konsole `konsole/buehne-nordtech.txt`

| ID | Zweck | erwartet | tatsächlich | Ergebnis | Beweis |
|---|---|---|---|---|---|
| BUE-NO-B1 | Unterbrechung B7 (Geschäftsführung (CEO), Krisenstabsleitung, 5 Min.) | Bühne zeigt die Unterbrechung mit Restzeit; Moderation sieht Rolle und Rückkehr | Bühne enthält Zeitangabe: ja; Moderation erwähnt B7: ja | bestanden | `buehne/nordtech/ergebnis.json` |
| BUE-NO-G2 | Generalprobe: 26 Lagen und 3 öffentliche Überraschungen | jedes Bild geladen; jeder vorgesehene Ton gestartet; Übungshinweis sichtbar, wo vorgesehen | 29 Bühnenzustände; Abweichungen: keine | bestanden | `buehne/nordtech/ergebnis.json` |
| BUE-NO-N33 | Stummschalten mitten im Ton (LK10) | Kartenton stoppt sofort (≤ 3 s); nach Aufheben startet er nicht ungefragt neu, sondern über „Ton erneut abspielen“ (Hintergrundton gibt es nur vor der Krise un… | vorher: läuft lk10-nordkanal-nachrichten.mp3; nach Stumm: Kartenton aus, Hintergrund aus; nach Aufheben: Kartenton aus, Hintergrund aus | bestanden | `buehne/nordtech/ergebnis.json` |
| BUE-NO-N34 | Ton erneut abspielen nach Stummschaltung | Kartenton startet von vorn | Kartenton läuft (lk10-nordkanal-nachrichten.mp3, 2.3 s) | bestanden | `buehne/nordtech/ergebnis.json` |
| BUE-NO-N45 | Zeitsprung mitten im Ton (LK10 → LK11) | alter Ton endet; neue Lage ohne eigenen Ton bleibt still | danach: Kartenton aus; Hintergrund aus | bestanden | `buehne/nordtech/ergebnis.json` |
| BUE-NO-N26 | Bühne neu laden mitten im Lauf | Bühne zeigt sofort wieder die aktuelle Lage; Ton braucht einen Klick (Browserregel) | Ton-Freigabe angezeigt: ja; aktuelle Lage „Pharmakunde eskaliert“ sichtbar: ja; nach Klick Hintergrund aus | bestanden | `buehne/nordtech/ergebnis.json` |
| BUE-NO-F7 | Abschluss auf der Bühne bis zum Fazit | Nacharbeiten, Rechnung, Bilanz, Einordnung und Fazit erscheinen nacheinander | 6 Bildschirmfotos, letzte Phase: fazit | bestanden | `buehne/nordtech/ergebnis.json` |
| BUE-NO-M8 | Keine Browserfehler in Bühne und Moderation | keine JavaScript-Fehler | keine | bestanden | `buehne/nordtech/ergebnis.json` |

## F. Bühne im Browser – Waterkant

Prüfschritt `buehne-waterkant`: Exit-Code 0, 191 s, Konsole `konsole/buehne-waterkant.txt`

| ID | Zweck | erwartet | tatsächlich | Ergebnis | Beweis |
|---|---|---|---|---|---|
| BUE-WA-B1 | Unterbrechung B7 (IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), 5 Min.) | Bühne zeigt die Unterbrechung mit Restzeit; Moderation sieht Rolle und Rückkehr | Bühne enthält Zeitangabe: ja; Moderation erwähnt B7: ja | bestanden | `buehne/waterkant/ergebnis.json` |
| BUE-WA-G2 | Generalprobe: 28 Lagen und 4 öffentliche Überraschungen | jedes Bild geladen; jeder vorgesehene Ton gestartet; Übungshinweis sichtbar, wo vorgesehen | 32 Bühnenzustände; Abweichungen: keine | bestanden | `buehne/waterkant/ergebnis.json` |
| BUE-WA-N33 | Stummschalten mitten im Ton (LK21) | Kartenton stoppt sofort (≤ 3 s); nach Aufheben startet er nicht ungefragt neu, sondern über „Ton erneut abspielen“ (Hintergrundton gibt es nur vor der Krise un… | vorher: läuft lk21-nordkanal-nachrichten.mp3; nach Stumm: Kartenton aus, Hintergrund aus; nach Aufheben: Kartenton aus, Hintergrund aus | bestanden | `buehne/waterkant/ergebnis.json` |
| BUE-WA-N34 | Ton erneut abspielen nach Stummschaltung | Kartenton startet von vorn | Kartenton läuft (lk21-nordkanal-nachrichten.mp3, 1.5 s) | bestanden | `buehne/waterkant/ergebnis.json` |
| BUE-WA-N45 | Zeitsprung mitten im Ton (LK21 → LK22) | alter Ton endet, Ton der neuen Lage läuft | danach: läuft lk22-kasse-startet.mp3; Hintergrund aus | bestanden | `buehne/waterkant/ergebnis.json` |
| BUE-WA-N26 | Bühne neu laden mitten im Lauf | Bühne zeigt sofort wieder die aktuelle Lage; Ton braucht einen Klick (Browserregel) | Ton-Freigabe angezeigt: ja; aktuelle Lage „Die Kassen laufen wieder“ sichtbar: ja; nach Klick Hintergrund aus | bestanden | `buehne/waterkant/ergebnis.json` |
| BUE-WA-F7 | Abschluss auf der Bühne bis zum Fazit | Nacharbeiten, Rechnung, Bilanz, Einordnung und Fazit erscheinen nacheinander | 6 Bildschirmfotos, letzte Phase: fazit | bestanden | `buehne/waterkant/ergebnis.json` |
| BUE-WA-M8 | Keine Browserfehler in Bühne und Moderation | keine JavaScript-Fehler | keine | bestanden | `buehne/waterkant/ergebnis.json` |

## F. Protokoll über alle Varianten – NordTech

Prüfschritt `protokoll-nordtech`: Exit-Code 0, 2 s, Konsole `konsole/protokoll-nordtech.txt`

| ID | Zweck | erwartet | tatsächlich | Ergebnis | Beweis |
|---|---|---|---|---|---|
| PRO-NO-PR1 | Protokoll 45 Min. / Ausgewogen | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR2 | Protokoll 45 Min. / fuehrung | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR3 | Protokoll 45 Min. / it | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR4 | Protokoll 45 Min. / produktion | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR5 | Protokoll 45 Min. / kunden | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR6 | Protokoll 60 Min. / Ausgewogen | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR7 | Protokoll 60 Min. / fuehrung | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR8 | Protokoll 60 Min. / it | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR9 | Protokoll 60 Min. / produktion | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR10 | Protokoll 60 Min. / kunden | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR11 | Protokoll 90 Min. / Ausgewogen | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR12 | Protokoll 90 Min. / fuehrung | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR13 | Protokoll 90 Min. / it | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR14 | Protokoll 90 Min. / produktion | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR15 | Protokoll 90 Min. / kunden | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR16 | Protokoll 120 Min. / Ausgewogen | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR17 | Protokoll 120 Min. / fuehrung | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR18 | Protokoll 120 Min. / it | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR19 | Protokoll 120 Min. / produktion | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR20 | Protokoll 120 Min. / kunden | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR21 | Protokoll 180 Min. / Ausgewogen | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR22 | Protokoll 180 Min. / fuehrung | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR23 | Protokoll 180 Min. / it | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR24 | Protokoll 180 Min. / produktion | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |
| PRO-NO-PR25 | Protokoll 180 Min. / kunden | 8 Kriterien des Drehbuchs, max. 16 Punkte, keine Namen | 8 Kriterien, max. 16, keine Namen | bestanden | `protokoll/nordtech.json` |

## F. Protokoll über alle Varianten – Waterkant

Prüfschritt `protokoll-waterkant`: Exit-Code 0, 2 s, Konsole `konsole/protokoll-waterkant.txt`

| ID | Zweck | erwartet | tatsächlich | Ergebnis | Beweis |
|---|---|---|---|---|---|
| PRO-WA-PR1 | Protokoll 45 Min. / Ausgewogen | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR2 | Protokoll 45 Min. / fuehrung | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR3 | Protokoll 45 Min. / it | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR4 | Protokoll 45 Min. / kunden | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR5 | Protokoll 45 Min. / betrieb | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR6 | Protokoll 60 Min. / Ausgewogen | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR7 | Protokoll 60 Min. / fuehrung | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR8 | Protokoll 60 Min. / it | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR9 | Protokoll 60 Min. / kunden | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR10 | Protokoll 60 Min. / betrieb | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR11 | Protokoll 90 Min. / Ausgewogen | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR12 | Protokoll 90 Min. / fuehrung | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR13 | Protokoll 90 Min. / it | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR14 | Protokoll 90 Min. / kunden | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR15 | Protokoll 90 Min. / betrieb | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR16 | Protokoll 120 Min. / Ausgewogen | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR17 | Protokoll 120 Min. / fuehrung | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR18 | Protokoll 120 Min. / it | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR19 | Protokoll 120 Min. / kunden | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR20 | Protokoll 120 Min. / betrieb | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR21 | Protokoll 180 Min. / Ausgewogen | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR22 | Protokoll 180 Min. / fuehrung | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR23 | Protokoll 180 Min. / it | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR24 | Protokoll 180 Min. / kunden | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |
| PRO-WA-PR25 | Protokoll 180 Min. / betrieb | 10 Kriterien des Drehbuchs, max. 20 Punkte, keine Namen | 10 Kriterien, max. 20, keine Namen | bestanden | `protokoll/waterkant.json` |

## G. Medien (technische Messung)

Einzelwerte je Datei: Dokument 06.

| ID | Szenario | Verweise | technisch in Ordnung | akustisch abgenommen |
|---|---|---|---|---|
| MED-NT | scenario.nordtech.json | 47 | 43/47 | 0/15 Töne |
| MED-WK | scenario.waterkant.json | 45 | 42/45 | 0/10 Töne |

## H. NordTech-Regression

41 Kombinationen, Ausgangsstand `79c9b89` gegen geprüften Stand. Einzelheiten: Dokument 08.

| ID | Aspekt | gleich |
|---|---|---|
| REG-besetzung | besetzung | 41/41 |
| REG-ablaufplan | ablaufplan | 41/41 |
| REG-buehne | buehne | 41/41 |
| REG-zustellungen | zustellungen | 41/41 |
| REG-kartentexte | kartentexte | 41/41 |
| REG-rechnung | rechnung | 41/41 |
| REG-kriterien | kriterien | 41/41 |
| REG-summenzeile | summenzeile | 41/41 |

**REPLAY-NT-90-ausgewogen:** identischer Verlauf (59 Bedienaktionen wiederholt; gleiches Drehbuch: ja) – `replay/NT-90-ausgewogen.json`

**REPLAY-WK-90-ausgewogen:** identischer Verlauf (71 Bedienaktionen wiederholt; gleiches Drehbuch: ja) – `replay/WK-90-ausgewogen.json`
