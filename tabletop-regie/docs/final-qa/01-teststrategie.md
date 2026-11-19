# 01 – Teststrategie

**Gegenstand:** Tabletop-Regie mit den Drehbüchern NordTech (Ransomware, eingefroren) und Waterkant („Wenn das Rechenzentrum brennt“).
**Geprüfter Stand:** Commit `33154fd (Zyklus 2; Zyklus 1: 5a61845)` (siehe `umgebung.json` im Nachweispaket). Die Ergebnisdokumente in `docs/final-qa/` wurden danach in einem eigenen Commit ergänzt; dieser enthält ausschließlich Dateien unter `docs/final-qa/` (geprüft beim Paketbau).
**Ziel:** reproduzierbare, belastbare Nachweise – nicht möglichst viele grüne Tests. Ein bestandener Test ist keine fachliche Freigabe.

## 1. Nachweisstufen

Jede Anforderung erhält in der Traceability-Matrix (Dokument 02) genau eine höchste erreichte Stufe:

| Stufe | Bedeutung | Beispiel |
|---|---|---|
| nicht getestet | weder ausgeführt noch im Quelltext nachvollzogen | akustische Wirkung im Raum |
| durch Quellcode geprüft | Verhalten im Quelltext nachvollzogen, nicht ausgeführt | Übungskennzeichnung im Erzeugungsskript der Alarmtöne |
| Unit-Test | einzelne Funktion ohne Server | Orakel-Selbsttest, Drehbuchprüfung (`server/validate.js`) |
| integriert getestet | echter Server über seine Schnittstelle, lokaler Test-Mailempfänger, ohne Bedienoberfläche | Integration, Negativtests, Referenzfälle, Regression |
| End-to-End im Browser | echter Server, echter Browser (Chromium), Bedienung über Schaltflächen und Eingabefelder der Oberfläche, zwei Fenster (Moderation und Bühne) | 14 Browser-Durchläufe |
| mit echten Menschen | in einer Übung oder Generalprobe mit Teilnehmenden | **in diesem Zyklus nicht erreicht** |

Ein API-Aufruf wird nie als „End-to-End“ gezählt. In den Browser-Durchläufen wird die Schnittstelle nur **lesend** benutzt, um den Zustand zu dokumentieren; jede Aktion läuft über die Oberfläche.

## 2. Unveränderliche Testbasis

- Der Gesamtlauf `tools/qa/abnahme.js` bricht ab, wenn in `tabletop-regie/` nicht eingecheckte Änderungen vorliegen. Er hält Commit, Werkzeugversionen (Node, Chromium, Playwright, ffmpeg) und SHA-256-Prüfsummen der Drehbücher und aller Quellen fest (`umgebung.json`).
- Jeder Test startet einen eigenen Server mit eigenem Datenordner (`TABLETOP_DATA_DIR`, Kopie der Drehbücher in einem temporären Ordner) und einem lokalen SMTP-Testempfänger auf 127.0.0.1. Die Projektkonfiguration in `data/` wird nicht gelesen und nicht verändert. Einzige Ausnahme: der Logo-Upload-Test legt kurzzeitig eine Datei im per `.gitignore` ausgeschlossenen Ordner `media/branding/custom-logo-*` an und entfernt sie wieder.
- Testadressen ausschließlich `@example.com`, Namen „Person N“ bzw. „Test PersonN“. Keine echten Mails, keine Passwörter (der Sicherheitstest setzt ein Platzhalter-Passwort nur im isolierten Datenordner).
- Zufall: Die Tests verwenden keine Zufallswerte (feste Ports, feste Entscheidungsfolgen, feste Besetzungen). Die Stichprobensimulation der Drehbuchprüfung nutzt `Math.random`; sie liefert keine Sollwerte.
- Während der Abnahme werden weder Drehbuch noch Code noch Dokumente geändert. Ein Fehler, der eine Korrektur erfordert, beginnt einen neuen Zyklus mit neuer Commit-ID; alte und neue Nachweise bleiben erhalten (Dokument 10).

## 3. Testebenen und Werkzeuge

| Ebene | Werkzeug | Umfang |
|---|---|---|
| Drehbuchprüfung | `server/validate.js` | Struktur, Verweise, Medien vorhanden, 2000 simulierte Besetzungen |
| Varianten (Regeln) | `tools/varianten.js` | je Szenario 25 Kombinationen Dauer × Schwerpunkt; alle Entscheidungskombinationen (NordTech 16, Waterkant 32); über Tagesgrenzen verschobene Karten; Abdeckung |
| Integration mit Orakel | `tools/qa/integration.js` + `tools/qa/orakel.js` | alle Entscheidungskombinationen bei 90 Min. und alle 25 Kombinationen Dauer × Schwerpunkt über den echten Server; Orakel-Selbsttest mit absichtlich falschen Erwartungen |
| Lauf, Bühne, Protokoll | `tools/tests/lauf.js`, `buehne.js`, `protokoll.js` | Zeitablauf, Mails, Medien je Lage im Browser, Protokoll über alle 25 Varianten |
| Browser-Durchläufe | `tools/qa/e2e-browser.js` | 14 Übungen über die Oberfläche (je Szenario 6 Pflichtgeschichten, Waterkant 2 zusätzliche mit stark abweichenden Entscheidungen) |
| Negativ- und Lasttests | `tools/qa/negativ.js` | 15 Fälle mit vorab festgelegtem Soll |
| Sicherheit | `tools/tests/sicherheit.js` | lokale Bindung, Passwort im Export, Pfade, Uploads, CSRF-Kopf, Eingabeprüfung |
| Referenzfälle | `tools/qa/referenz.js` | 14 von Hand nachgerechnete Sollwerte (Rechnung, Ersatzrollen, Raster) |
| Medien | `tools/qa/medien.js` | Dekodierung, Dauer, Lautheit (EBU R128), True Peak, Zuordnung, Übungskennzeichnung |
| NordTech-Regression | `tools/qa/regression.js` | 41 Kombinationen, eingefrorener Stand `79c9b89` gegen geprüften Stand, über die Server-Schnittstelle |
| Replay | `tools/qa/replay.js` | je Szenario ein Browser-Durchlauf aus dem Ereignisjournal wiederholt und verglichen |

## 4. Zeitraffer

Der Countdown vor Krisenbeginn (30 s) läuft in allen Browser-Durchläufen echt und wird dort gemessen (Prüfung T1). In Integrations-, Negativ- und Referenztests ist er über `TABLETOP_COUNTDOWN_SEKUNDEN=0` abgeschaltet. Die Übungszeit selbst wird nicht beschleunigt, sondern mit „Zeitsprung hierhin“ (Browser) bzw. dem Zeitsprung der Schnittstelle (Integration) erreicht. Pause und Fortsetzen werden in Echtzeit gemessen (je 8 s). Die Wirkung eines Zeitsprungs auf die gleichzeitige Auslösung fälliger Karten ist damit mitgeprüft; das Verhalten bei 45–180 Minuten Echtzeit ist **nicht** geprüft.

## 5. Orakel

Sollwerte stammen nicht aus derselben Implementierung:
- `tools/qa/orakel.js` leitet Empfänger, Rechnung, Wirkungen der Entscheidungen, Sperren der Überraschungen und Planregeln direkt aus dem Drehbuch ab, ohne `server/runEngine.js`, `server/finale.js` oder den Server zu verwenden. Ein Selbsttest füttert es mit absichtlich falschen Erwartungen (vertauschte Entscheidungen, falsche Empfängerrolle, umgekehrte Reihenfolge) und verlangt, dass es Befunde meldet.
- `docs/final-qa/referenz-sollwerte.json` enthält von Hand nachgerechnete Zahlen mit Rechenweg.
- NordTech-Regression: Sollwert ist das beobachtete Verhalten des eingefrorenen Stands.
- **Schwache Prüfungen** (Erwartung und Ergebnis aus derselben Quelle) sind in Dokument 02 gekennzeichnet: welche optionalen Karten das Zeitbudget auswählt, prüft das Orakel nur als Regel (Pflichtlagen, Reihenfolge, Voraussetzungen), nicht als exakten Sollwert.

## 6. Was automatisierte Tests nicht ersetzen

Die fachliche Richtigkeit zu Brandschutz, Stromversorgung und Lithium-Ionen-Batterien, Verträgen und Versicherung, Räumung und Arbeitsschutz kann kein automatischer Test belegen. Sie bleibt Gegenstand des fachlichen Reviews (Gate D). Diese Unterlage ersetzt keine rechtliche, versicherungs- oder arbeitsschutzrechtliche Beratung; die zuständigen Fachabteilungen sind einzubeziehen.
