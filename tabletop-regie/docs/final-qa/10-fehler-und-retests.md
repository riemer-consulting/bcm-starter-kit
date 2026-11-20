# 10 – Fehler und Retests

Alle beobachteten Fehler und gescheiterten Tests bleiben hier stehen, auch wenn sie behoben sind. Vorgehen je Fehler: isolieren → reproduzieren → minimales Beispiel sichern → klassifizieren (Produktfehler, Testfehler, Testumgebungsfehler, Dokumentationsfehler) → Ursache bestimmen → Korrektur auf separatem Stand → gezielter Retest → vollständige Regression → alter und neuer Nachweis.

## Testzyklen

| Zyklus | Commit | Inhalt | Ergebnis |
|---|---|---|---|
| frühere Runde | – | Waterkant-Lauftest während der Zweitprüfung (Fehllauf, siehe F-00) | 10/15, Abbruch; Wiederholung 20/20 |
| 0 (Vorlauf) | Arbeitsstand vor `5a61845` (teils nicht eingecheckt) | Entwicklung und Erprobung der QA-Suite; Befunde V-01 bis V-09 | nicht als Abnahme gewertet; Ergebnisse nicht im Paket außer wo genannt |
| 1a | `5a61845` | erster Start des Gesamtlaufs, nach drei Schritten vom Prüfer abgebrochen (siehe Z1-01) | keine Ergebnisse verwertet |
| 1 | `5a61845` | vollständiger Gesamtlauf | 31 Prüfschritte, davon 30 inhaltlich ohne Befund; Medien mit bekannten Grenzwertbefunden; Replay NT und WK abweichend (Z1-03) → Produktkorrektur |
| 2 | `33154fd` | Ergänzungstests N-16 (Browserabbruch) und N-17 (Rücksprung), Korrektur der Seed-Angabe; Produktquellen gegenüber Zyklus 1 byteweise gleich | vollständige Regression: alle Einzelprüfungen bis auf 7 bekannte Medien-Grenzwerte bestanden (828/835); Replay identisch; Negativtest-Prozess hing nach Abschluss (Z2-01) |
| 3 | `6809dee` | Pegelkorrektur von drei Tondateien (freigegeben), Korrektur des Negativtests N-16; vollständige Regression | **33/33 Prüfschritte ohne Fehler, 835/835 Einzelprüfungen** |
| 4 | `52f7c8f` | O-11: SK31 an LK23 gebunden, SK28 Pflichtkarte im Schwerpunkt Betrieb; Rollenabdeckung bei Zieldauer als Hinweis; neue Prüfungen; vollständige Regression | **33/33 Prüfschritte ohne Fehler, 836/836 Einzelprüfungen** |

## F-00 – Waterkant-Fehllauf (Testumgebungsfehler, frühere Runde)

**Beobachtung:** Lauftest Waterkant 10 von 15 Prüfungen bestanden, danach Abbruch („Unexpected token '<' … is not valid JSON“). M2: 19 Karten, 0 Mails; M4, M5, N9 ebenfalls ohne Mails.
**Ursache (festgestellt):** Während der Test lief, wurden im Arbeitsverzeichnis `data/run-state.json` und `data/settings.json` gelöscht (Aufräumschritt vor einem Commit, parallel zum Test). Dem laufenden Server fehlte die SMTP-Konfiguration des Tests; nach dem Neustart in N2 fehlte der Laufzustand.
**Klasse:** Testumgebungsfehler (Durchführung), kein Produktfehler.
**Maßnahme:** Wiederholungslauf ohne Eingriff 20/20. Dauerhafte Abhilfe: Seither arbeitet jeder Test in einem eigenen Datenordner (`TABLETOP_DATA_DIR`); die Projektdaten in `data/` werden von Tests weder gelesen noch verändert.
**Nachweis:** `docs/final-qa/anhang-fehllauf-waterkant.md` (Rohausgabe), Wiederholung im damaligen Review-Paket.

## Zyklus 0 – Vorlauf der QA-Suite

| Nr | Bereich | Beobachtung | Klasse | Ursache | Maßnahme / Retest |
|---|---|---|---|---|---|
| V-01 | Browser-E2E | Klick auf „Zeitsprung hierhin“ (LK09) scheiterte („element was detached … waiting for stable“), auch mit Ersatzklick | Testumgebungsfehler | Moderationsfenster lag nach dem Öffnen der Bühne im Hintergrund; Chromium drosselt dort die Bildwiederholung, die Ruheprüfung des Klicks endet nie. Minimalbeispiel: Moderation allein im Vordergrund → Klicks gelingen, auch nach Pause | Jede Bedienung holt ihr Fenster zuerst in den Vordergrund (wie ein Mensch); alle Klicks über einen Helfer, Ersatzklicks werden gezählt. Retest: WK-45 33/34 → nach V-02 34/34 |
| V-02 | Browser-E2E | P1 meldete gezeigte Lagen als fehlend im Protokoll | Testfehler (falsches Orakel) | Protokoll nennt Lagen mit Zeit und Titel, der Test suchte IDs | P1 vergleicht den Abschnitt „Gespielte Lagen“ zeilengenau und in Reihenfolge mit dem Journal (strenger als vorher) |
| V-03 | Negativtest N-01 | kein Hinweis auf fehlgeschlagenen Versand in der Moderation | Testaufbau **und Produktbefund** | Test öffnete die Moderation erst nach dem Fehlschlag; der Hinweis erscheint nur für Karten, die bei geöffneter Moderation verschickt werden. Nach „Gesehen“ oder Neuladen war der Fehlschlag bei der Karte nicht mehr erkennbar (nur im Versand-Log) | Test: Moderation vorher geöffnet (wie in der Übung). Zusätzliche Bedingung „nach Neuladen bleibt der Fehlschlag sichtbar“ (nach dem Vorlauf ergänzt, dokumentiert). **Produktkorrektur** in `public/moderator.js` (Commit `e820987`): Zustellstatus dauerhaft unter „Verschickte vertrauliche Karten“. Retest N-01 bestanden; Regression: Zyklus 1 |
| V-04 | Negativtest N-05 | Skriptabbruch, Fall trotzdem „bestanden“ gezählt | Testfehler | Feld `firedLagekarten` gehört nicht zur Moderations-Schnittstelle; Abbruch wurde keinem Fall zugeordnet | gezeigte Lagen aus dem Journal; Abbruch zählt als nicht erfüllte Bedingung des laufenden Falls |
| V-05 | Negativtest N-06 | „dreifach gleichzeitig ausgelöst → 2 Mails“ | Testfehler | Mails über den ganzen Lauf gezählt; dieselbe Karte war in N-02 zugestellt worden | Zählung je Fall ab dessen Beginn |
| V-06 | Negativtests N-06/N-07 | „Option festgehalten: undefined“ | Testfehler | Entscheidungen liegen als Liste mit `gewaehlt` vor | Test liest `gewaehlt` und `finale.optionen[].aktiv` |
| V-07 | Medienprüfung | NordTech B6 als Alarm ohne Übungskennzeichnung beanstandet | Testfehler (Geltungsbereich) | Regel war laut Kopf auf Waterkant-Alarme festgelegt, wurde auf beide angewandt | Regel auf den festgelegten Geltungsbereich beschränkt; NordTech-Durchsage als Hinweis „fachlich bewerten“ ausgewiesen (O-13) |
| V-08 | Medienprüfung | Lautheit 0 LUFS bei allen Tönen | Testfehler | ffmpeg schreibt Messwerte auf stderr; bei Exit-Code 0 wurde stderr nicht gelesen | stderr unabhängig vom Exit-Code ausgewertet |
| V-09 | NordTech-Regression | „Kriterien 0/41 gleich“ trotz identischer Listen | Testfehler | Summenzeile als 9. Kriterium gezählt | Summenzeile getrennt verglichen; Gegenprobe auf den Rohdaten des Vorlaufs 41/41 |

Bei V-03, V-07 und V-09 wurde die Prüfung nach Sichtung des Ergebnisses geändert. Das ist hier offen ausgewiesen: In keinem Fall wurde ein Soll gelockert. V-03 wurde strenger (zusätzliche Bedingung), V-07 auf den vorher festgelegten Umfang zurückgeführt, V-09 korrigiert einen Zählfehler. Die eigentlichen Befunde (Medien-Lautheit, NordTech-Durchsage) bleiben als Risiken stehen.

## Zyklus 1

| Nr | Bereich | Beobachtung | Klasse | Ursache | Maßnahme / Retest |
|---|---|---|---|---|---|
| Z1-01 | Durchführung | Erster Start des Gesamtlaufs (1a) nach drei Prüfschritten vom Prüfer abgebrochen | Testumgebungsfehler | Der Lauf war an die Zeitgrenze der Ausführungsumgebung (2 Stunden) gebunden und wäre vor seinem Ende beendet worden | Neustart losgelöst (Lauf 1); keine Ergebnisse aus 1a verwertet |
| Z1-02 | Dokumentation | `umgebung.json` nennt für die Drehbuchsimulation `Math.random` | Dokumentationsfehler | Falsche Angabe im Gesamtlauf-Werkzeug; tatsächlich linearer Kongruenzgenerator mit Startwert 42 (`server/validate.js`) | In Zyklus 2 korrigiert (`tools/qa/abnahme.js`) |
| Z1-03 | Replay | Replay NT-90 und WK-90: dieselben Karten, Empfängerrollen und Ergebnisse, aber andere Reihenfolge gleichzeitig fälliger Karten (NT: SK41/SK20; WK: mehrere Paare) | **Produktbefund** | `tick()` verschickte gleichzeitig fällige vertrauliche Karten parallel; die Journalreihenfolge folgte den SMTP-Antworten (Einträge 1 ms auseinander). Im Vorlauf war NT zufällig identisch | Korrektur in Zyklus 2 (Commit `33154fd`, `server/index.js`: Warteschlange `einreihen`, Versand nacheinander in Planreihenfolge). Gezielter Retest: NT-90 30/30, Replay identisch. Vollständige Regression: Zyklus 2, beide Replays identisch. Alter Nachweis: `nachweis-zyklus1/replay/` |
| Z1-04 | Medien | 7 Einzelprüfungen über Grenzwert (Telefonklingeln −12,4 LUFS an 6 Stellen; NordTech LK01 True Peak +0,2 dBTP) | Produktbefund (Medien), niedrig | Datei-Lautheit; NordTech eingefroren | keine Änderung; als O-12 geführt, im Hörtest zu bewerten |

Alle übrigen Prüfschritte in Zyklus 1 ohne Befund: Integration NT 41/41, WK 57/57; Lauf 21/21, 20/20; Bühne 8/8, 8/8; Protokoll 25/25, 25/25; Sicherheit 12/12; Negativ 15/15; Referenz 14/14; Regression 41/41; Delta 9/9; Browser 441/441.

## Zyklus 2

Commit `33154fd`: Produktkorrektur Z1-03, Ergänzungstests N-16 (Browserabbruch) und N-17 (Rücksprung), Korrektur Z1-02, Paketwerkzeug. Danach **vollständige Regression** aller 33 Prüfschritte.

| Nr | Bereich | Beobachtung | Klasse | Ursache | Maßnahme |
|---|---|---|---|---|---|
| Z2-01 | Negativtest | Prüfschritt `negativ` mit SIGKILL nach 900 s beendet, obwohl alle 17 Fälle als bestanden geschrieben waren (12:20:04) | **Testfehler mit falsch positivem Ergebnis** | In Zyklus 2 vermutet: offene Verbindung zum abgestürzten Browser. **In Zyklus 3 festgestellt:** `b1.process()` gibt es an einem Playwright-Browser nicht; der Fehler wurde von einem leeren `catch` verschluckt. Der Absturz fand nie statt, der Browser blieb offen und hielt den Testprozess am Leben. **N-16 hat in Zyklus 2 „bestanden“, ohne seinen Zweck zu prüfen.** Minimalbeispiel: alter Weg endet erst durch Zeitlimit (Exit 124), neuer Weg Exit 0 nach 6 s | Korrektur in Zyklus 3, siehe Z3-01 |
| Z2-02 | Medien | wie Z1-04 | Produktbefund (Medien), niedrig | – | O-12 |

Ergebnis Zyklus 2: 828 von 835 Einzelprüfungen bestanden; die 7 nicht bestandenen sind Z2-02. Replay NT-90 und WK-90 identisch. Produktquellen außer `server/index.js` gegenüber Zyklus 1 unverändert (Prüfsummen in `nachweis/umgebung.json` und `nachweis-zyklus1/umgebung.json`).

## Zyklus 3

Commit `6809dee`. Freigegeben durch die Spielleitung: Pegelkorrektur der drei Tondateien (einschließlich der beiden NordTech-Dateien) und Korrektur von N-16. O-11 ist ausdrücklich nicht umgesetzt (Vorlage: Dokument 13). Einzelheiten und Prüfsummen: Dokument 14.

| Nr | Bereich | Beobachtung | Klasse | Ursache | Maßnahme / Retest |
|---|---|---|---|---|---|
| Z3-01 | Negativtest N-16 | Korrektur von Z2-01: Browser jetzt per `launchServer` gestartet und seine Prozessgruppe per SIGKILL beendet; „tatsächlich abgestürzt“ und „Entscheidung vor dem Absturz festgehalten“ sind eigene Bedingungen; keine verschluckten Fehler | Korrektur | – | gezielter Retest 1: Prozess endet von selbst nach 133 s, aber Exit 1 (siehe Z3-02) |
| Z3-02 | Negativtest N-16 | Retest 1: Bedingung „Hauptprozess beendet: false“, obwohl getrennt | Testfehler | Der abgestürzte Browser ist Kindprozess des Testprozesses; bis zum Abholen existiert er als Zombie, eine Signal-0-Probe meldet ihn als lebend | Prozessende über das `exit`-Ereignis festgestellt. Retest 2: 17/17, Exit-Code 0 nach 132 s, „Hauptprozess beendet: ja (SIGKILL)“ |
| Z3-03 | Medien | Pegelkorrektur: lineare Absenkung um 2,6 dB (Klingeln) bzw. 1,5 dB (NordTech LK01), sonst unverändert (Abtastrate, Kanäle, Länge) | Produktkorrektur (freigegeben) | Grenzwertverstöße Z1-04/Z2-02 | Medienprüfung 47/47, 45/45; Signalvergleich alt × Faktor gegen neu: Länge gleich, Versatz 0, Korrelation 1,000 bzw. 0,999 |
| Z3-04 | Waterkant O-11 | Bei der Ausarbeitung der Vorlage festgestellt: SK31 kommt in 22 von 50 Kombinationen verspätet, nicht nur bei 180 Min.; Orakel und Variantenprüfung erkennen „zu spät“ nicht | Szenariobefund und Lücke in der Prüfung | Rollenabdeckung wählt SK31 als einzige Logistikkarte; fehlt LK23, rutscht SK31 hinter LK27 | nicht umgesetzt (Entscheidung der Spielleitung, Dokument 13); O-11 aktualisiert |

**Vollständige Regression Zyklus 3:** 33/33 Prüfschritte mit Exit-Code 0; 835/835 Einzelprüfungen. Darunter Negativtests 17/17, Medien 47/47 und 45/45, NordTech-Regression 41/41 in allen Aspekten, Browser 441/441 in 14 Übungen, Replay NT-90 und WK-90 identisch, Delta Waterkant 9/9.

## Zyklus 4

Commit `52f7c8f`, Auftrag „dann mal los mit O-11“ (Dokument 15). NordTech unverändert.

| Nr | Bereich | Beobachtung | Klasse | Ursache | Maßnahme / Retest |
|---|---|---|---|---|---|
| Z4-01 | Variantenprüfung | Mit G (SK36 als Pflichtkarte Krisenführung) 3 Befunde „Pflichtkarte fehlt“ bei 45/60/90 Min. | Zielkonflikt Szenario ↔ Testregel | SK36 hängt an LK26, die in diesen Formaten nicht gespielt wird; die Regel verlangt Pflichtkarten in jeder Dauer | G zurückgenommen statt die Regel nach dem Anschlagen aufzuweichen; Entscheidung G1–G3 bei der Spielleitung (Dokument 15) |
| Z4-02 | Drehbuchprüfung / eigene Vorlage | Mit A meldete die Drehbuchprüfung 1 Fehler („Logistikleitung bekam bei 60 Min. keine eigene Karte“). In Dokument 13 hatte ich angegeben, das sei nur ein Hinweis | Analysefehler in der Vorlage; Regelkonflikt mit der Leitlinie | Die Simulation wertete fehlende Abdeckung als Fehler | Regel im Sinne der Leitlinie geändert: bei Zieldauer Hinweis, sonst Fehler (`server/validate.js`). NordTech unverändert 0/0. Dokument 13 mit Korrekturvermerk |
| Z4-03 | Neue Prüfung | Die Regel „Karte zwei oder mehr Tage nach ihrer Heimatlage“ findet bei NordTech SK15 (16/50) | Prüfhinweis im eingefrorenen Szenario | Rollenabdeckung bzw. Budget legt SK15 in Kurzformaten hinter die nächste gespielte Lage | keine Änderung (NordTech eingefroren); Einschätzung: Text relativ formuliert, kein Plausibilitätsfehler; Bewertung durch die Spielleitung (O-19) |
| Z4-04 | Neue Prüfung | Eine naive Regel „jede Karte nach einer Lage eines späteren Tages“ ergäbe NordTech 261 und Waterkant 254 Treffer | Testentwurf | Ein-Tages-Verschiebungen sind dokumentiertes Engine-Verhalten bei übersprungenen Lagen | Regel auf zwei oder mehr Tage festgelegt, und zwar vor dem Abnahmelauf; Waterkant als harte Delta-Regel, beide Szenarien als Prüfhinweis im Variantenbericht. Ein-Tages-Fälle bleiben im bestehenden Abschnitt „über eine Tagesgrenze verschoben“ (O-20) |

**Gegenprobe:** Die neue Delta-Regel O-11 schlägt gegen den alten Waterkant-Stand mit 5 von 6 Bedingungen an.
**Vollständige Regression Zyklus 4:** 33/33 Prüfschritte, 836/836 Einzelprüfungen.

