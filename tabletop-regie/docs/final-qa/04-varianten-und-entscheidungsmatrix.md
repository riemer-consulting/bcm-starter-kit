# 04 – Varianten und Entscheidungsmatrix

**Geprüfter Commit:** `6809dee1a7f2daac4685ace87b31a31d6e587ede` · **Lauf:** 2026-11-19T15:33:06.782Z bis 2026-11-19T16:15:36.947Z · erzeugt mit `tools/qa/berichte.js` aus dem Nachweisordner (Pfadangaben relativ zum Nachweispaket).

Alle Kombinationen aus Dauer (45, 60, 90, 120, 180 Min.) und Schwerpunkt (Ausgewogen und vier fachliche Schwerpunkte = 5; 25 Kombinationen je Szenario) sowie alle Entscheidungskombinationen (NordTech W1–W4: 16; Waterkant W1–W5: 32) – einmal als Regelprüfung des Drehbuchs (`tools/varianten.js`) und einmal über den echten Server gegen das unabhängige Orakel (`tools/qa/integration.js`).

## Je Kombination geprüft (Integration)

| Prüfung | Quelle des Solls |
|---|---|
| alle Pflichtlagen (Priorität 1) enthalten | Drehbuch, Orakel-Planregel 1 |
| Lagen in aufsteigender Drehbuchminute (Reihenfolge) | Orakel-Planregel 2 |
| keine Karte doppelt | Orakel-Planregel 3 |
| vertrauliche Karte erreichbar, nach Voraussetzungen, nach „zu Beginn von“-Lage, nie vor ihrer Heimatlage (keine verfrühte Karte) | Orakel-Planregel 4 und Prüfung der Zustellreihenfolge im Journal |
| Pflichtkarte des Schwerpunkts gespielt, sofern erreichbar | Orakel-Planregel 5 |
| erste Lage Vorbote, letzte Wiederanlauf | Orakel-Planregel 6 |
| gezeigte Lagen = Plan | Journal |
| Empfängerrolle jeder Zustellung (inkl. Ersatzrollen), genau eine Mail je Person | Orakel `empfaenger` |
| eingeplante vertrauliche Karten tatsächlich zugestellt | Plan/Journal |
| Zusatztexte und Krisen-Info der gewählten Option auf der Bühne; keine Zusätze nicht gewählter Optionen (spätere Wirkungen) | Orakel `wirkungen` |
| Folgekarten der gewählten Option zugestellt, sofern ihre Lage gespielt wird; nie Folgekarten anderer Optionen | Orakel `wirkungen` |
| ersetzte Kartentexte in der Mail | Orakel `wirkungen` |
| Überraschungen gesperrt/freigegeben wie im Drehbuch (Voraussetzung, Mindestdauer, Pflichtrolle) | Orakel `bonusEinsetzbar` |
| Rechnung (Brutto, Erstattung, beim Unternehmen) | Orakel `rechnung` (eigene Summierung) |
| Krisenzeit ≤ Zieldauer | Fallvorgabe |

## NordTech

**Regelprüfung des Drehbuchs** (`varianten/nordtech.md`, `varianten/nordtech.json`): keine Befunde in den automatisch geprüften Regeln. Der Bericht enthält zusätzlich die Abschnitte „in keiner der Kombinationen gespielt“, „Reichweite der Entscheidungsfolgen“ und „über eine Tagesgrenze verschoben“.

**Integration:** 41/41 Läufe ohne Befund (`integration/nordtech.json`).

### Dauer × Schwerpunkt (Anzahl Lagen / vertrauliche Karten; ✓ = ohne Befund)

| Dauer | ausgewogen | fuehrung | it | produktion | kunden |
|---|---|---|---|---|---|
| 45 | ✓ 9/6 | ✓ 9/7 | ✓ 9/8 | ✓ 9/9 | ✓ 9/7 |
| 60 | ✓ 9/12 | ✓ 9/12 | ✓ 9/12 | ✓ 9/10 | ✓ 9/11 |
| 90 | ✓ 13/14 | ✓ 13/15 | ✓ 13/14 | ✓ 13/15 | ✓ 13/15 |
| 120 | ✓ 15/19 | ✓ 15/16 | ✓ 15/17 | ✓ 15/17 | ✓ 15/18 |
| 180 | ✓ 21/24 | ✓ 21/25 | ✓ 21/25 | ✓ 21/26 | ✓ 21/23 |

### Entscheidungskombinationen bei 90 Min., Ausgewogen

| Lauf | W1 | W2 | W3 | W4 | Lagen | vertr. Karten | Brutto | beim Unternehmen | Ergebnis |
|---|---|---|---|---|---|---|---|---|---|
| E01 | am-netz | proaktiv | melden | nicht-gezahlt | 13 | 13 | 4.610.000 € | 3.210.000 € | ohne Befund |
| E02 | am-netz | proaktiv | melden | gezahlt | 13 | 14 | 6.610.000 € | 5.210.000 € | ohne Befund |
| E03 | am-netz | proaktiv | abwarten | nicht-gezahlt | 13 | 14 | 4.760.000 € | 3.360.000 € | ohne Befund |
| E04 | am-netz | proaktiv | abwarten | gezahlt | 13 | 15 | 6.760.000 € | 5.360.000 € | ohne Befund |
| E05 | am-netz | abwarten | melden | nicht-gezahlt | 13 | 14 | 5.210.000 € | 3.810.000 € | ohne Befund |
| E06 | am-netz | abwarten | melden | gezahlt | 13 | 15 | 7.210.000 € | 5.810.000 € | ohne Befund |
| E07 | am-netz | abwarten | abwarten | nicht-gezahlt | 13 | 15 | 5.360.000 € | 3.960.000 € | ohne Befund |
| E08 | am-netz | abwarten | abwarten | gezahlt | 13 | 16 | 7.360.000 € | 5.960.000 € | ohne Befund |
| E09 | trennen | proaktiv | melden | nicht-gezahlt | 13 | 13 | 4.260.000 € | 2.860.000 € | ohne Befund |
| E10 | trennen | proaktiv | melden | gezahlt | 13 | 14 | 6.260.000 € | 4.860.000 € | ohne Befund |
| E11 | trennen | proaktiv | abwarten | nicht-gezahlt | 13 | 14 | 4.410.000 € | 3.010.000 € | ohne Befund |
| E12 | trennen | proaktiv | abwarten | gezahlt | 13 | 15 | 6.410.000 € | 5.010.000 € | ohne Befund |
| E13 | trennen | abwarten | melden | nicht-gezahlt | 13 | 14 | 4.860.000 € | 3.460.000 € | ohne Befund |
| E14 | trennen | abwarten | melden | gezahlt | 13 | 15 | 6.860.000 € | 5.460.000 € | ohne Befund |
| E15 | trennen | abwarten | abwarten | nicht-gezahlt | 13 | 15 | 5.010.000 € | 3.610.000 € | ohne Befund |
| E16 | trennen | abwarten | abwarten | gezahlt | 13 | 16 | 7.010.000 € | 5.610.000 € | ohne Befund |

## Waterkant

**Regelprüfung des Drehbuchs** (`varianten/waterkant.md`, `varianten/waterkant.json`): keine Befunde in den automatisch geprüften Regeln. Der Bericht enthält zusätzlich die Abschnitte „in keiner der Kombinationen gespielt“, „Reichweite der Entscheidungsfolgen“ und „über eine Tagesgrenze verschoben“.

**Integration:** 57/57 Läufe ohne Befund (`integration/waterkant.json`).

### Dauer × Schwerpunkt (Anzahl Lagen / vertrauliche Karten; ✓ = ohne Befund)

| Dauer | ausgewogen | fuehrung | it | kunden | betrieb |
|---|---|---|---|---|---|
| 45 | ✓ 9/14 | ✓ 9/15 | ✓ 9/14 | ✓ 9/15 | ✓ 9/13 |
| 60 | ✓ 9/14 | ✓ 9/13 | ✓ 9/14 | ✓ 9/15 | ✓ 9/16 |
| 90 | ✓ 13/17 | ✓ 12/21 | ✓ 12/16 | ✓ 12/17 | ✓ 12/17 |
| 120 | ✓ 15/19 | ✓ 14/21 | ✓ 14/20 | ✓ 14/19 | ✓ 14/21 |
| 180 | ✓ 18/23 | ✓ 18/25 | ✓ 18/22 | ✓ 18/25 | ✓ 18/24 |

### Entscheidungskombinationen bei 90 Min., Ausgewogen

| Lauf | W1 | W2 | W3 | W4 | W5 | Lagen | vertr. Karten | Brutto | beim Unternehmen | Ergebnis |
|---|---|---|---|---|---|---|---|---|---|---|
| E01 | herunterfahren | frueh | bergen | minimal | gleichrangig | 13 | 16 | 3.651.000 € | 2.051.000 € | ohne Befund |
| E02 | herunterfahren | frueh | bergen | minimal | eigene | 13 | 17 | 3.666.000 € | 2.066.000 € | ohne Befund |
| E03 | herunterfahren | frueh | bergen | ausbauen | gleichrangig | 13 | 16 | 3.681.000 € | 2.081.000 € | ohne Befund |
| E04 | herunterfahren | frueh | bergen | ausbauen | eigene | 13 | 17 | 3.696.000 € | 2.096.000 € | ohne Befund |
| E05 | herunterfahren | frueh | abwarten | minimal | gleichrangig | 13 | 15 | 3.666.000 € | 2.066.000 € | ohne Befund |
| E06 | herunterfahren | frueh | abwarten | minimal | eigene | 13 | 16 | 3.681.000 € | 2.081.000 € | ohne Befund |
| E07 | herunterfahren | frueh | abwarten | ausbauen | gleichrangig | 13 | 15 | 3.696.000 € | 2.096.000 € | ohne Befund |
| E08 | herunterfahren | frueh | abwarten | ausbauen | eigene | 13 | 16 | 3.711.000 € | 2.111.000 € | ohne Befund |
| E09 | herunterfahren | spaeter | bergen | minimal | gleichrangig | 13 | 17 | 3.666.000 € | 2.066.000 € | ohne Befund |
| E10 | herunterfahren | spaeter | bergen | minimal | eigene | 13 | 18 | 3.681.000 € | 2.081.000 € | ohne Befund |
| E11 | herunterfahren | spaeter | bergen | ausbauen | gleichrangig | 13 | 17 | 3.696.000 € | 2.096.000 € | ohne Befund |
| E12 | herunterfahren | spaeter | bergen | ausbauen | eigene | 13 | 18 | 3.711.000 € | 2.111.000 € | ohne Befund |
| E13 | herunterfahren | spaeter | abwarten | minimal | gleichrangig | 13 | 16 | 3.681.000 € | 2.081.000 € | ohne Befund |
| E14 | herunterfahren | spaeter | abwarten | minimal | eigene | 13 | 17 | 3.696.000 € | 2.096.000 € | ohne Befund |
| E15 | herunterfahren | spaeter | abwarten | ausbauen | gleichrangig | 13 | 16 | 3.711.000 € | 2.111.000 € | ohne Befund |
| E16 | herunterfahren | spaeter | abwarten | ausbauen | eigene | 13 | 17 | 3.726.000 € | 2.126.000 € | ohne Befund |
| E17 | weiterlaufen | frueh | bergen | minimal | gleichrangig | 13 | 17 | 3.646.000 € | 2.046.000 € | ohne Befund |
| E18 | weiterlaufen | frueh | bergen | minimal | eigene | 13 | 18 | 3.661.000 € | 2.061.000 € | ohne Befund |
| E19 | weiterlaufen | frueh | bergen | ausbauen | gleichrangig | 13 | 17 | 3.676.000 € | 2.076.000 € | ohne Befund |
| E20 | weiterlaufen | frueh | bergen | ausbauen | eigene | 13 | 18 | 3.691.000 € | 2.091.000 € | ohne Befund |
| E21 | weiterlaufen | frueh | abwarten | minimal | gleichrangig | 13 | 16 | 3.661.000 € | 2.061.000 € | ohne Befund |
| E22 | weiterlaufen | frueh | abwarten | minimal | eigene | 13 | 17 | 3.676.000 € | 2.076.000 € | ohne Befund |
| E23 | weiterlaufen | frueh | abwarten | ausbauen | gleichrangig | 13 | 16 | 3.691.000 € | 2.091.000 € | ohne Befund |
| E24 | weiterlaufen | frueh | abwarten | ausbauen | eigene | 13 | 17 | 3.706.000 € | 2.106.000 € | ohne Befund |
| E25 | weiterlaufen | spaeter | bergen | minimal | gleichrangig | 13 | 18 | 3.661.000 € | 2.061.000 € | ohne Befund |
| E26 | weiterlaufen | spaeter | bergen | minimal | eigene | 13 | 19 | 3.676.000 € | 2.076.000 € | ohne Befund |
| E27 | weiterlaufen | spaeter | bergen | ausbauen | gleichrangig | 13 | 18 | 3.691.000 € | 2.091.000 € | ohne Befund |
| E28 | weiterlaufen | spaeter | bergen | ausbauen | eigene | 13 | 19 | 3.706.000 € | 2.106.000 € | ohne Befund |
| E29 | weiterlaufen | spaeter | abwarten | minimal | gleichrangig | 13 | 17 | 3.676.000 € | 2.076.000 € | ohne Befund |
| E30 | weiterlaufen | spaeter | abwarten | minimal | eigene | 13 | 18 | 3.691.000 € | 2.091.000 € | ohne Befund |
| E31 | weiterlaufen | spaeter | abwarten | ausbauen | gleichrangig | 13 | 17 | 3.706.000 € | 2.106.000 € | ohne Befund |
| E32 | weiterlaufen | spaeter | abwarten | ausbauen | eigene | 13 | 18 | 3.721.000 € | 2.121.000 € | ohne Befund |

## Grenzen

- Welche optionalen Karten das Zeitbudget auswählt, ist kein unabhängiger Sollwert: geprüft werden nur die Regeln (schwache Prüfung im Sinne von Dokument 01, Abschnitt 5).
- Die 25 Läufe Dauer × Schwerpunkt verwenden je eine Entscheidungskombination (zyklisch), nicht alle Kombinationen je Dauer.
- Ob eine Variante fachlich und didaktisch trägt, prüft keine dieser Regeln (Gate D).
