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
| Z2-01 | Negativtest | Prüfschritt `negativ` mit SIGKILL nach 900 s beendet, obwohl alle 17 Fälle bestanden und die Ergebnisse um 12:20:04 vollständig geschrieben waren | Testfehler (Werkzeug) | Prozess beendet sich nach Abschluss nicht; vermutet: offene Verbindung zum in N-16 absichtlich hart beendeten Browser (nicht nachgewiesen) | nicht korrigiert, als O-18 geführt; Ergebnis der Fälle gilt, der Exit-Status des Schritts bleibt „mit Fehlern“ |
| Z2-02 | Medien | wie Z1-04 | Produktbefund (Medien), niedrig | – | O-12 |

Ergebnis Zyklus 2: 828 von 835 Einzelprüfungen bestanden; die 7 nicht bestandenen sind Z2-02. Replay NT-90 und WK-90 identisch. Produktquellen außer `server/index.js` gegenüber Zyklus 1 unverändert (Prüfsummen in `nachweis/umgebung.json` und `nachweis-zyklus1/umgebung.json`).
