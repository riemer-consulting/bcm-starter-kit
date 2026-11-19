# 02 – Traceability-Matrix

Anforderung → Implementierung → Testfall → tatsächliches Ergebnis → Nachweis (Stufe und Pfad). Stufen wie in Dokument 01 definiert; angegeben ist jeweils die **höchste** erreichte Stufe. „schwach“ kennzeichnet Prüfungen, bei denen Soll und Ist (teilweise) aus derselben Quelle stammen. Pfade relativ zum Nachweispaket; Testfallkennungen wie in Dokument 03. Alle Ergebnisse aus Zyklus 2 (vollständiger Lauf, Commit `33154fd`); Zyklus 1 (`5a61845`) siehe Dokument 10.

## Plattform

| ID | Anforderung | Implementierung | Testfall | Ergebnis | Stufe | Nachweis |
|---|---|---|---|---|---|---|
| P-01 | Szenarioauswahl in der Einrichtung | `public/setup.js`; `POST /api/scenarios/select` | E2E S1 (14 Fälle) | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | `nachweis/e2e/*/ergebnis.json` |
| P-02 | SMTP-Einstellungen, Testmail an lokales Testpostfach | `POST /api/settings`, Testmail-Route; `server/mailer.js` | E2E S2 | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | dto. |
| P-03 | Teilnehmerimport (CSV), Anlegen, Teams verteilen | `public/setup.js` (Import, „Auf Teams verteilen“) | E2E S3, S4 | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | dto. |
| P-04 | Rollenzuordnung nach Dauer, alle Rollen, Ersatzrollen | `runEngine.recommendRoles`; `recipientRoleFor` | E2E S4; REF NT-E1…E3, WK-E1…E3; Lauf M5 | 14/14 | End-to-End im Browser (Zuordnung), integriert (Ersatzrollen) | `nachweis/referenz/`, `nachweis/lauf/` |
| P-05 | Begrüßung und Rollenbriefing je Person genau einmal | `POST /api/run/start` | E2E S5; Lauf M1 | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | |
| P-06 | Bühne öffnen, Ton freigeben | `public/stage.js` | E2E (Schritte), Bühne G | je Szenario 8/8 | End-to-End im Browser | `nachweis/buehne/` |
| P-07 | Countdown 30 s vor Krisenbeginn | `POST /api/run/begin-crisis` | E2E T1 (echte 30 s) | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | |
| P-08 | Pause und Fortsetzen | `/api/run/pause`, `/resume` | E2E T2; N-11 | 441/441 Einzelprüfungen in 14 Fällen / 17/17 Fälle | End-to-End im Browser | |
| P-09 | Zeitsprung vorwärts | `POST /api/run/jump-to-event`, `jump-to-minute` | alle E2E („Zeitsprung hierhin“), Lauf | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | |
| P-10 | Zeitsprung zurück | `runEngine.setElapsedMinutes` | N-17 (Zyklus 2) | bestanden (Zyklus 2) | integriert | `nachweis/negativ/` |
| P-11 | Öffentliche Karten auf der Bühne (Titel, Zeit, Bild, Text, Zusätze) | `GET /api/run/stage-state`, `lageMitWeichen` | E2E je Lage; Bühne G; Integration | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | `nachweis/e2e/*/bilder/` |
| P-12 | Vertrauliche Karten an die richtige Rolle, je Person genau eine Mail | `fireSonderlagekarte`, `recipientRoleFor` | Integration; E2E O1, O2; N-09 | NordTech 41/41, Waterkant 57/57 Läufe ohne Befund; Orakel-Selbsttest erkennt falsche Erwartungen | End-to-End im Browser | |
| P-13 | Keine vertraulichen Inhalte auf der Bühne | `stage-state` liefert nur öffentliche Felder | E2E O4 je Lage; N-03; N-14 | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | |
| P-14 | Mailfehler sichtbar, Übung läuft weiter, kein automatischer Neuversand | `fireSonderlagekarteIntern`; `public/moderator.js` | N-01, N-02 | 17/17 Fälle | End-to-End im Browser (Anzeige), integriert (Versand) | `nachweis/negativ/` |
| P-15 | Überraschungen: Sperren und Freigabe (Voraussetzung, Mindestdauer, Pflichtrolle), öffentlich/vertraulich | `POST /api/run/fire-bonuskarte` | Integration (Orakel `bonusEinsetzbar`); E2E (vorher gesperrt erwartet); N-10; Lauf N6 | NordTech 41/41, Waterkant 57/57 Läufe ohne Befund; Orakel-Selbsttest erkennt falsche Erwartungen | End-to-End im Browser | |
| P-16 | Entscheidungen festhalten, ändern; Folgen (Zusatz, Krisen-Info, Folgekarte, ersetzter Text) | `POST /api/run/weiche`; `lageMitWeichen`, `skMitWeichen`, `fireWeichenKarten` | Integration (alle Kombinationen); E2E O3; N-07 | NordTech 41/41, Waterkant 57/57 Läufe ohne Befund; Orakel-Selbsttest erkennt falsche Erwartungen | End-to-End im Browser | |
| P-17 | Folgenberechnung / Rechnung | `server/finale.js` `bill` | Integration (Orakel `rechnung`); REF R1…R6; E2E P7 | 14/14 | End-to-End im Browser; Sollwerte unabhängig | |
| P-18 | Gesamteinschätzung bewertbar, gespeichert, nach Neuladen sichtbar | `POST /api/run/einschaetzung`; `renderEinschaetzung` | E2E E1, E2 | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | |
| P-19 | Szenariospezifisches Raster (NordTech 8, Waterkant 10) | `protokollKriterien()` | REF NT-K, WK-K; Protokolltest (25 Varianten je Szenario); Regression „kriterien“ | je Szenario 25/25 Varianten; REF NT-K, WK-K bestanden | integriert | `nachweis/protokoll/` |
| P-20 | Protokoll entspricht den Ereignissen (Lagen, Karten, Rollen, Entscheidungen, Überraschungen, Beobachtungsbögen, Raster, Rechnung, Maßnahmenplan, keine Namen) | `GET /api/run/protokoll` | E2E P1–P8 (gegen Journal und Orakel) | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | `nachweis/e2e/*/protokoll.md` |
| P-21 | Abschluss bis Fazit | `/api/run/finale/*` | E2E; Bühne F; Integration | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | |
| P-22 | Medien: Abspielen nur beim Ereignis, Stopp bei Wechsel, Stummschalten, Wiederholen, keine Überlappung | `public/stage.js` `applySound` | Bühne G, N2, N3, N4; N-03; N-13 | je Szenario 8/8 | End-to-End im Browser (technisch) | `nachweis/buehne/` |
| P-23 | Medien: vollständig ladbar, Dauer, Pegel, Zuordnung | Drehbuchfelder `media`, `sound` | MED-NT, MED-WK | NordTech 43/47, Waterkant 42/45 technisch in Ordnung (Lautheit Telefonklingeln, True Peak NordTech LK01); 0/25 Töne akustisch abgenommen | integriert (Messung); **akustisch nicht abgenommen** | `nachweis/medien/medien.json` |
| P-24 | Bühne neu laden, schließen, wieder öffnen | `public/stage.js` | N-03, N-04; Bühne N2 | 17/17 Fälle | End-to-End im Browser | |
| P-25 | Browserabbruch | – (Serverzustand) | N-16 (Zyklus 2) | bestanden (Zyklus 2) | End-to-End im Browser | `nachweis/negativ/` |
| P-26 | Serverneustart: Zustand, keine Doppelzustellung, Journal fortgesetzt | `server/store.js` (atomares Schreiben), Laden beim Start | N-05 | 17/17 Fälle | integriert | |
| P-27 | Gleichzeitige Aktionen, Doppelzustellung | `skImVersand` | N-06, N-08; Lauf N9 | 17/17 Fälle | integriert | |
| P-28 | Zwei Moderationsfenster, zwei Bühnen | Polling, `sound-claim` | N-13 | 17/17 Fälle | End-to-End im Browser | |
| P-29 | Zugriffsschutz: lokal, CSRF-Kopf, Pfade, Uploads, Eingabeprüfung | Middleware, `mediaUrlToFile`, Upload-Filter | Sicherheit S1–S12; N-15 | 12/12 | integriert | `nachweis/sicherheit/` |
| P-30 | Trennung Bühne/Moderation, Anmeldung | **nicht vorhanden** | N-14 (Abruf gelingt – erwartet und als Risiko O-06 geführt) | 17/17 Fälle | integriert | |
| P-31 | Ereignisjournal: Folgenummer, Zeit, Sitzung, Szenario, Typ, Karte, Ergebnis; nur Anhängen | `journal()` | E2E P1–P5; N-05 (Folgenummern lückenlos); Replay | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | `nachweis/e2e/*/journal.jsonl` |
| P-32 | Journal pseudonymisiert (keine Namen/Adressen) | `aktionsDetails()` loggt nur Rollen und Anzahlen | manuelle Durchsicht aller 14 Journale im Paket (Suche nach `@` und Personennamen) | in allen 14 Journalen keine Adresse und kein Name; Notizen werden nicht protokolliert | durch Quellcode geprüft + manuelle Prüfung der Nachweisdateien | `nachweis/e2e/*/journal.jsonl` |
| P-33 | Replay aus dem Journal | `tools/qa/replay.js` | REPLAY NT-90, WK-90 | Zyklus 2: beide identisch (Zyklus 1: beide abweichend, Befund Z1-03) | integriert | `nachweis/replay/` |
| P-34 | Prüfstand zeigt Versionen, letzten Lauf, Ergebnisse, Befunde, Gates ohne Freigabesuggestion | `public/qa.html`, `GET /api/qa-status` | Sichtprüfung im Browser (Bildschirmfoto) | Seite zeigt Commit, Werkzeugversionen, Prüfschritte, Ergebnisse, Befunde und vier Gates mit Hinweis „keine fachliche Freigabe“ | End-to-End im Browser (Sichtprüfung, kein automatischer Test) | `docs/final-qa/pruefstand.jpg` |
| P-35 | Tests verändern die Projektkonfiguration nicht | `TABLETOP_DATA_DIR`, `tools/qa/umgebung.js` | `git status` nach dem Lauf leer; `data/` ohne Laufdateien | Arbeitsbaum nach beiden Läufen unverändert; `data/` nur mit Drehbüchern | manuelle Prüfung | 10 |

## Szenarien

| ID | Anforderung | Implementierung | Testfall | Ergebnis | Stufe | Nachweis |
|---|---|---|---|---|---|---|
| S-01 | Pflichtlagen in jeder Dauer, Chronologie, keine Duplikate | Drehbuch + `buildAdaptiveSchedule` | Varianten; Integration Planregeln 1–3, 6 (25 + 16/32 Läufe je Szenario) | NordTech 41/41, Waterkant 57/57 Läufe ohne Befund; Orakel-Selbsttest erkennt falsche Erwartungen | integriert; Auswahl optionaler Karten **schwach** | `nachweis/integration/` |
| S-02 | Vorausgesetzte Ereignisse, keine verfrühten vertraulichen Karten | `voraussetzung`, `zuBeginnVon`, Heimatlage | Integration Planregel 4 und Zustellreihenfolge im Journal; E2E | NordTech 41/41, Waterkant 57/57 Läufe ohne Befund; Orakel-Selbsttest erkennt falsche Erwartungen | End-to-End im Browser | |
| S-03 | Zeitabhängige Informationen, über Tagesgrenzen verschobene Karten | Drehbuch `minuteOffset`, `simZeit` | Variantenbericht Abschnitt „über eine Tagesgrenze verschoben“ | keine Befunde (beide Szenarien) | Regelprüfung (Unit) | `nachweis/varianten/` |
| S-04 | Wissensstand: vertrauliche Information nur bei der Rolle | Empfängerrouting | E2E O2 (Mails je Person = Karten ihrer Rolle) | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser | |
| S-05 | Entscheidungen und Auswirkungen | `weichen` im Drehbuch | Integration (alle Kombinationen), E2E | NordTech 41/41, Waterkant 57/57 Läufe ohne Befund; Orakel-Selbsttest erkennt falsche Erwartungen | End-to-End im Browser | |
| S-06 | Wirtschaftliche Berechnung | `nachspiel` | Orakel, REF R1…R6 | 14/14 | integriert, Sollwerte unabhängig | |
| S-07 | Waterkant: Wiederanlaufabhängigkeiten, fachliche Freigaben (F02, F04) | LK13, LK19, LK06, LK10, LK14 | DELTA-F02, F04 | 9/9 Befunde mit erfüllten Regeln | durch Quellcode (Drehbuch) geprüft – **fachlich nicht geprüft** | `nachweis/delta/` |
| S-08 | Waterkant: Vertrag, Zustimmung, Meilensteine, Kosten, Handbuch, Raster (F01, F03, F05, F12, F13, F15) | siehe 09 | DELTA | 9/9 Befunde mit erfüllten Regeln | durch Quellcode (Drehbuch) geprüft | |
| S-09 | Waterkant: lange Formate enthalten Ursache und Rückkehr (F07) | Schwerpunkte | DELTA-F07 über Integrationsläufe | 9/9 Befunde mit erfüllten Regeln | integriert | |
| S-10 | Rollenbeteiligung | `recommendRoles`, Drehbuch `zustaendig` | E2E Spielbrett je Lage; Variantenbericht | 441/441 Einzelprüfungen in 14 Fällen | End-to-End im Browser (Anzeige) | |
| S-11 | NordTech unverändert (Karten, Chronologie, 4 Weichen, Folgen, Rechnung, Routing, Zustellung, Medien, 8 Kriterien) | eingefroren seit `79c9b89` | Regression (41 Kombinationen über den Server) | 41/41 Kombinationen in allen Aspekten identisch | integriert | `nachweis/regression/` |
| S-12 | Waterkant-Alarme mit Übungskennzeichnung | Drehbuch `uebungshinweis`, Abschrift; `tools/medien/waterkant-toene.py` | MED-WK Alarmregeln; Bühne G (Hinweis sichtbar) | NordTech 43/47, Waterkant 42/45 technisch in Ordnung (Lautheit Telefonklingeln, True Peak NordTech LK01); 0/25 Töne akustisch abgenommen | Browser (Bühnenhinweis), Quellcode (gesprochene Kennzeichnung); **akustisch nicht abgenommen** | |
| S-13 | Dramaturgische Zielkonflikte, Debriefing, Lernziele | Drehbuch, Handbuch | – | – | **nicht getestet** (Gate D) | |
| S-14 | Fachliche Richtigkeit Brand, Strom, Verträge, Räumung, Kosten | – | – | – | **nicht getestet** (Gate D) | |
| S-15 | Wirkung in einer Übung mit Menschen | – | – | – | **nicht getestet** | |
