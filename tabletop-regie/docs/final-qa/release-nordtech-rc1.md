# Release `nordtech-rc1` – Baseline für die finale NordTech-Abnahme

**Zweck:** verbindliche Baseline für die finale NordTech-Abnahme; anschließend Ausgangspunkt für Waterkant.
**Getesteter Commit:** `aeffbce6b1c5dc84494b55a5969b419601ef53af` (Kopf von `main` vor diesem Release-Commit).
**Release-Commit und Tag:** Der Commit, der diese Datei zuletzt ändert, ist der Release-Commit und erhält das Tag `nordtech-rc1`. Er unterscheidet sich vom getesteten Commit ausschließlich durch diese Datei und den Ordner `release-nordtech-rc1/` (Testergebnisse). Hinweis: Die Ausführungsumgebung, in der dieser Stand erstellt wurde, darf keine Tags auf das Remote schieben (HTTP 403 des Git-Proxys). Das Tag wird deshalb auf GitHub als Release `nordtech-rc1` (Vorabversion) auf diesem Commit angelegt.
**Branches:** `main` und `claude/wonderful-bell-6q4aan` auf dem Remote `origin` zeigen auf denselben Release-Commit; weitere Branches gibt es auf dem Remote nicht.

## Inhalt des Stands

- NordTech: Drehbuch, Ablauflogik (`server/runEngine.js`) und Rechnungslogik (`server/finale.js`) byteidentisch mit dem eingefrorenen Stand `79c9b89`. Geändert sind seitdem nur zwei Tondateien (Pegelkorrektur, Zyklus 3, freigegeben): `media/nordtech/telefon-klingeln.mp3`, `media/nordtech/lk01-stille-gemurmel.mp3`.
- Waterkant: Stand von Zyklus 3 ohne offene fachliche Änderungen. **O-11 ist nicht umgesetzt** (Entscheidungsvorlage: Dokument 13). Geändert seit Zyklus 2 ist nur die Pegelkorrektur von `media/waterkant/telefon-klingeln.mp3` (byteidentisch mit der NordTech-Kopie).
- Plattform, Tests, Dokumentation: Stand Zyklus 3 (`docs/final-qa/01`–`14`).

## Tests vor dem Release (am getesteten Commit `aeffbce`, sauberer Arbeitsbaum)

| Prüfung | Werkzeug | Ergebnis | Exit-Code | Dauer | Nachweis |
|---|---|---|---|---|---|
| NordTech-Regression gegen `79c9b89` (41 Kombinationen, 8 Aspekte) | `tools/qa/regression.js` | **41/41 identisch**; Besetzung, Ablaufplan, Bühne inkl. Bild- und Tonzuordnung, Zustellungen, Kartentexte, Rechnung, 8 Kriterien, Summenzeile je 41/41 | 0 | 469 s | `release-nordtech-rc1/regression-nordtech.json`, `regression.txt` |
| Medien (alle Verweise beider Szenarien) | `tools/qa/medien.js` | NordTech **47/47**, Waterkant **45/45** technisch in Ordnung; Töne akustisch abgenommen: 0/25 (Hörtest offen) | 0 | 19 s | `release-nordtech-rc1/medien.json`, `medien.txt` |
| Negativ- und Lasttests | `tools/qa/negativ.js` | **17/17**, Prozess endet von selbst | 0 | 131 s | `release-nordtech-rc1/negativ.json`, `negativ.txt` |

Der vollständige Abnahmelauf aller 33 Prüfschritte (835/835 Einzelprüfungen) liegt für Commit `6809dee` vor (Dokument 14, Paket `BCM-FINAL-QA-NACHTRAG-ZYKLUS3.zip`). Zwischen `6809dee` und `aeffbce` wurden nur Dokumente unter `docs/final-qa/` geändert.

## Prüfungen vor dem Commit

- Arbeitsbaum ohne Änderungen, ohne untracked Dateien; ignoriert ist nur `node_modules/`.
- Im Repository keine ZIP- oder Archivdateien, keine Datei über 5 MB, keine Lauf- oder Einstellungsdateien (`data/settings.json`, `data/run-state.json`, `data/journal/`).
- Keine privaten Schlüssel, Tokens oder Klartext-Passwörter. Einzige Ausnahme ist der dokumentierte Platzhalter `GEHEIM-TEST-123` des Sicherheitstests. Mailadressen nur `@example.com` sowie die Eingabe-Platzhalter `dummy@deine-domain.de` und `name@firma.de`.
- Die Nachweispakete (ZIP, je rund 211 MB) sind bewusst nicht im Repository. SHA-256: `BCM-FINAL-QA-EVIDENCE.zip` (Zyklen 1–2) `6b859a7fa2df2ab4a76a919da920a01b3cd9d484e357fc85266913a545f7f083`; `BCM-FINAL-QA-NACHTRAG-ZYKLUS3.zip` (Zyklus 3) `1f681ff02e6e0dc9d7730d40b9a4cd29743941fa4ac3210de679728b48fccaa5`.

## Was dieses Release nicht bedeutet

`nordtech-rc1` ist ein **Release-Kandidat**, keine Pilotfreigabe. Offen bleiben Gate C (Hörtest im Raum, Beamer, echter Mailserver, Bild- und Tonrechte) und Gate D (moderierte Generalprobe mit Menschen, für Waterkant zusätzlich das Fachreview). Siehe Dokument 12.
