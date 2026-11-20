# BCM-FINAL-QA-EVIDENCE – Nachweispaket und Reproduktion

Dieses Paket belegt die QA-Abnahme der BCM Tabletop-Regie mit den Drehbüchern NordTech und Waterkant. Es ist ohne Zugriff auf das laufende System prüfbar. Ein bestandener Test ist **keine** fachliche Freigabe; über einen Pilot entscheidet die verantwortliche Spielleitung nach unabhängigem Review (Dokument 12).

## Aufbau

| Ordner / Datei | Inhalt |
|---|---|
| `docs/final-qa/01…12-*.md` | Teststrategie, Traceability, Testfallkatalog, Varianten, Browser-Durchläufe, Medien, Mail/Sicherheit, Regression, Waterkant-Delta, Fehler und Retests, offene Risiken, Freigabeentscheidung |
| `docs/final-qa/09-anhang-delta-regeln.md` | Regeln je Befund F01–F15 mit Beleg |
| `docs/final-qa/referenz-sollwerte.json` | von Hand nachgerechnete Sollwerte (Eingabe der Tests) |
| `docs/final-qa/gates.json`, `befunde.json`, `qa-status.json` | Gate-Bewertung, Befundliste, Stand für den Prüfstand `qa.html` |
| `nachweis/` | Ergebnisse des jeweils letzten vollständigen Laufs (zuletzt Zyklus 4, Commit `52f7c8f`) |
| `docs/final-qa/15-o11-umsetzung-zyklus4.md` | O-11: Umsetzung, Prüfhinweise, offene Entscheidung SK36 |
| `docs/final-qa/14-nachtrag-zyklus3.md` | Nachtrag: Pegelkorrektur, N-16, alte und neue Prüfsummen, NordTech-Basis |
| `docs/final-qa/13-o11-entscheidungsvorlage.md` | Alternativen zu O-11 (nicht umgesetzt) |
| frühere Zyklen | im Paket `BCM-FINAL-QA-EVIDENCE.zip` (Zyklus 1 und 2; Prüfsumme in Dokument 14) |
| `nachweis/umgebung.json` | Commit, Werkzeugversionen, SHA-256 aller Drehbücher und Quellen |
| `nachweis/gesamtlauf.json`, `nachweis/zaehlung.json` | Prüfschritte mit Exit-Code und Dauer; jede Einzelprüfung mit Ergebnis |
| `nachweis/e2e/<fall>/` | je Browser-Durchlauf: `ergebnis.json`, `bilder/` (Bühne und Moderation je Lage), `trace.zip` (Playwright-Trace), `server.log` (bereinigt), `protokoll.md` (Export), `journal.jsonl` (Ereignisjournal) |
| `nachweis/konsole/` | Konsolenausgabe jedes Prüfschritts |
| `quellen/` | geprüfter Stand aus `git archive`: Server, Oberfläche, Werkzeuge, Drehbücher, Handbuch, Funktionskatalog |
| `manifest.json` | jede Datei mit SHA-256 und Größe; geprüfte Commits; Ergebnis der Geheimnissuche |

Ohne laufendes System öffnen: Markdown in jedem Editor; Traces mit `npx playwright show-trace nachweis/e2e/<fall>/trace.zip` oder unter trace.playwright.dev (die Datei wird dabei lokal im Browser geöffnet).

## Testdaten und Seeds

- Personen: `Person N` bzw. `Test PersonN`, Adressen ausschließlich `@example.com`; Mails nur an den lokalen SMTP-Testempfänger (127.0.0.1) der jeweiligen Testumgebung.
- Feste Ports, feste Besetzungen (empfohlene Rollen je Dauer bzw. alle Rollen), feste Entscheidungsfolgen (`tools/qa/e2e-faelle.json`, Zählung in `integration.js`). Die Tests verwenden keine Zufallswerte.
- Die Stichprobensimulation der Drehbuchprüfung (`server/validate.js`) verwendet einen linearen Kongruenzgenerator mit festem Startwert 42 und ist damit reproduzierbar. (Die Angabe in `nachweis/umgebung.json` aus Zyklus 1 nennt hier fälschlich `Math.random` – siehe Dokument 10, Befund Z1-02.)
- Serverprotokolle im Paket sind bereinigt (Adressen → `<adresse>`, Testnamen → `<person>`); die Originale enthalten nur Testdaten.

## Reproduktion

Voraussetzungen: Node ≥ 20, Git, Chromium und Playwright (`NODE_PATH` auf ein Verzeichnis mit `playwright`, `CHROMIUM_PATH` auf die Chromium-Datei), ffmpeg/ffprobe, zip/unzip.

```sh
git clone <repository> && cd <repository>
git checkout <geprüfter Commit aus manifest.json>
cd tabletop-regie && npm install
export CHROMIUM_PATH=/pfad/zu/chromium NODE_PATH=/pfad/zu/node_modules
node tools/qa/abnahme.js /tmp/nachweis 79c9b89      # bricht ab, wenn nicht eingecheckt
node tools/qa/status.js /tmp/nachweis                 # Prüfstand (schreibt docs/final-qa/qa-status.json)
node tools/qa/berichte.js /tmp/nachweis /tmp/berichte # Dokumente 03–08 und Anhang zu 09
```

Der Gesamtlauf dauert rund 1,5 bis 2 Stunden. Die Projektdaten in `data/` werden nicht verändert; jeder Test arbeitet in einem eigenen temporären Datenordner. Einzelne Prüfungen lassen sich gezielt starten (Aufrufe im Kopf jeder Datei unter `tools/qa/` und `tools/tests/`).

Abweichungen bei Wiederholung sind zu erwarten bei: Zeitstempeln, Sitzungs-IDs, Laufzeiten, Bildschirmfotos (Schriftglättung) und Trace-Inhalten. Sollwerte, Pläne, Zustellungen, Entscheidungen, Rechnungen und Prüfergebnisse müssen gleich sein.
