# 14 – Nachtrag Zyklus 3

**Geprüfter Commit:** `6809dee` (vollständiger Abnahmelauf am 19.11.2026, `nachweis/umgebung.json`: sauber eingecheckt). **Vorheriger Stand:** Zyklus 2, Commit `33154fd`, Ergebnis-Commit `1f3065d`.
**Freigabe:** Die Spielleitung hat Schritt 1 (Negativtest N-16) und Schritt 2 (Pegelkorrektur einschließlich der beiden NordTech-Tondateien) ausdrücklich freigegeben, weil die Fehler messtechnisch nachgewiesen sind. Bedingung: Fehlerbehebung, keine inhaltliche Weiterentwicklung. O-11 ist **nicht** umgesetzt (Vorlage: Dokument 13).

## 1. Ergebnis

| Prüfschritt | Zyklus 2 (`33154fd`) | Zyklus 3 (`6809dee`) |
|---|---|---|
| Gesamtlauf | 31/33 Prüfschritte ohne Fehler | **33/33** |
| Einzelprüfungen | 828/835 | **835/835** |
| Negativtests | 17/17 geschrieben, Prozess nach 900 s abgebrochen; N-16 ohne tatsächlichen Absturz (Z2-01) | **17/17, Exit-Code 0 nach 132 s**; Absturz nachweislich ausgelöst |
| Medien NordTech / Waterkant | 43/47 / 42/45 | **47/47 / 45/45** |
| NordTech-Regression | 41/41 | **41/41** |
| Browser (14 Übungen) | 441/441 | **441/441** |
| Replay NT-90 / WK-90 | identisch / identisch | **identisch / identisch** |
| Delta Waterkant F01–F15 | 9/9 | **9/9** |

## 2. Geänderte Dateien (`git diff 1f3065d 6809dee`)

Genau vier Dateien: `media/nordtech/lk01-stille-gemurmel.mp3`, `media/nordtech/telefon-klingeln.mp3`, `media/waterkant/telefon-klingeln.mp3`, `tools/qa/negativ.js`. Keine Änderung an Drehbüchern, Kartentexten, Entscheidungen, Server oder Oberfläche.

## 3. Pegelkorrektur – alte und neue Werte

Verfahren: lineare Pegelabsenkung (`ffmpeg -af volume=…dB`), sonst unverändert. Kein Kompressor, Limiter oder Filter. Abtastrate, Kanalzahl und Länge bleiben gleich; Kodierung MP3 (libmp3lame), Metadaten entfernt. Die Klingeldatei wurde einmal erzeugt und in beide Ordner kopiert.

| Datei | SHA-256 alt | SHA-256 neu | Lautheit alt → neu | True Peak alt → neu | Absenkung | Länge |
|---|---|---|---|---|---|---|
| `media/nordtech/telefon-klingeln.mp3` | `ff8d5274ddab3735b016040e58cf1932f31aa6fdc06fdd38745354100bfcf728` | `7e2cafa54049a7debfb56416607ae968913182dd0f9ea321ca60426544060e06` | −12,4 → **−15,5 LUFS** | −3,7 → −6,8 dBTP | 2,6 dB | 4,86 s (22 050 Hz, mono, 64 kbit/s) unverändert |
| `media/waterkant/telefon-klingeln.mp3` | `ff8d5274ddab3735…` (wie oben) | `7e2cafa54049a7de…` (wie oben, **byteidentisch**) | −12,4 → **−15,5 LUFS** | −3,7 → −6,8 dBTP | 2,6 dB | wie oben |
| `media/nordtech/lk01-stille-gemurmel.mp3` | `0db4a6afa8332072f67df849ab693673386a8adc8e2c213551b0385ac4ad038a` | `d606acfd7e1e991f7f20d3d85c68390112370e49489960279b38b5a37be54791` | −18,4 → **−20,3 LUFS** | **+0,2 → −1,7 dBTP** | 1,5 dB | 7,18 s (44 100 Hz, mono) unverändert |

Grenzwerte (unverändert, vor der ersten Messung festgelegt): −30 … −14 LUFS, True Peak ≤ −0,5 dBTP. Gemessen mit ffmpeg `ebur128=peak=true`. Die gemessene Änderung ist etwas größer als die eingestellte Absenkung (MP3-Neukodierung).

**Keine inhaltliche Änderung – Signalvergleich:** Original mit dem Korrekturfaktor gegen die neue Datei, dekodiert:

| Datei | Samples alt / neu | Versatz | Korrelation | Restsignal |
|---|---|---|---|---|
| telefon-klingeln | 105 836 / 105 836 | 0 | 1,000 | 26 dB unter dem Nutzsignal |
| lk01-stille-gemurmel | 315 315 / 315 315 | 0 | 0,999 | 24 dB unter dem Nutzsignal |

Das Restsignal ist Kodierrauschen der erneuten MP3-Kodierung. **Akustisch abgenommen sind die Dateien nicht** (O-03).

## 4. NordTech – unveränderte Szenariobasis

| Gegenstand | eingefrorener Stand `79c9b89` | `6809dee` | Ergebnis |
|---|---|---|---|
| `data/scenario.nordtech.json` | `7b5c26437379aab9…` | `7b5c26437379aab9…` | byteidentisch |
| `server/runEngine.js` (Ablauf, Rollen, Empfänger) | `3d812cc7871d0a7e…` | `3d812cc7871d0a7e…` | byteidentisch |
| `server/finale.js` (Rechnung) | `0df6963e97aeafb3…` | `0df6963e97aeafb3…` | byteidentisch |
| `media/nordtech/` | – | – | geändert sind ausschließlich `lk01-stille-gemurmel.mp3` und `telefon-klingeln.mp3` (`git diff --stat 79c9b89 6809dee -- tabletop-regie/media/nordtech`) |

NordTech-Regression über die Server-Schnittstelle, eingefrorener Stand gegen `6809dee`, 41 Kombinationen (25 Dauer × Schwerpunkt, 16 Entscheidungskombinationen), 469 s:

| Aspekt | gleich |
|---|---|
| Besetzung | 41/41 |
| Ablaufplan (Karten, Reihenfolge, Minute) | 41/41 |
| Bühne je Lage (Text, Zusätze, Krisen-Info, Aufgabe, **Bild- und Tonzuordnung**) | 41/41 |
| Zustellungen (Karte → Empfängerrolle) | 41/41 |
| Kartentexte | 41/41 |
| Rechnung | 41/41 |
| Bewertungsraster (8 Kriterien) | 41/41 |
| Summenzeile | 41/41 |

**Festgestellt:** Bei NordTech sind die Medien technisch korrigiert. Szenario, Kartentexte, Entscheidungen, Folgen, Rechnung, Rollenrouting, vertrauliche Zustellung, Medienzuordnung (Dateinamen je Karte) und die acht Bewertungskriterien sind unverändert. Die Regression vergleicht Dateipfade, nicht Dateiinhalte. Die geänderten Inhalte stehen in Abschnitt 3.

## 5. Negativtest N-16 – Ursache und Korrektur

- **Befund (Z2-01):** In Zyklus 2 rief N-16 `b1.process()` auf. Diese Methode gibt es an einem Playwright-Browser nicht. Ein leerer `catch` hat den Fehler verschluckt. Der simulierte Absturz fand nie statt, der Browser blieb offen und hielt den Testprozess am Leben. N-16 meldete „bestanden“, ohne den Absturz geprüft zu haben. Das war ein falsch positives Ergebnis.
- **Minimalbeispiel:** alter Weg endet nur durch das Zeitlimit (Exit 124 nach 25 s), neuer Weg mit Exit 0 nach 6 s.
- **Korrektur (Z3-01, Z3-02):** Browser über `launchServer`, Abbruch der ganzen Prozessgruppe per SIGKILL, Prozessende über das `exit`-Ereignis. Eine Signal-0-Probe hielt den noch nicht abgeholten Kindprozess fälschlich für lebend (Retest 1, Exit 1). Neue Bedingungen: „Entscheidung vor dem Absturz über die Oberfläche festgehalten“ und „Browser tatsächlich abgestürzt“. Kein Prüfschritt des Negativtests wird mehr durch einen verschluckten Fehler übergangen; nur das Aufräumen am Ende ignoriert Fehler.
- **Ergebnis im Gesamtlauf:** 17/17, Exit-Code 0, 132 s; „getrennt: true, Hauptprozess beendet: ja (SIGKILL)“.

## 6. Nachweise

- Dieses Paket: `nachweis/` (Zyklus 3 vollständig, mit Traces, Bildschirmfotos, Journalen, Protokoll-Exporten und bereinigten Serverprotokollen), `manifest.json` mit SHA-256 jeder Datei.
- Zyklus 1 und 2: Paket `BCM-FINAL-QA-EVIDENCE.zip`, SHA-256 `6b859a7fa2df2ab4a76a919da920a01b3cd9d484e357fc85266913a545f7f083` (876 Dateien, eigenes Manifest).
