# 15 – O-11 umgesetzt (Zyklus 4)

**Geprüfter Commit:** `52f7c8f` (vollständiger Abnahmelauf, 33/33 Prüfschritte ohne Fehler, 836/836 Einzelprüfungen). **Ausgangsstand:** Release `nordtech-rc1` (`d89f902`).
**Auftrag:** „dann mal los mit O-11“ nach der Entscheidungsvorlage (Dokument 13) und der Leitlinie der Spielleitung: Fachliche und zeitliche Plausibilität haben Vorrang vor einer vollständigen Kartenverteilung.

## 1. Umgesetzt

| Punkt | Änderung | Wirkung (50 Kombinationen: 5 Dauern × 5 Schwerpunkte, empfohlene und volle Besetzung) |
|---|---|---|
| **A – SK31** | `zuBeginnVon: "LK23"` (`tools/build-waterkant.js` → `data/scenario.waterkant.json`) | SK31 kommt nur noch mit LK23 (Freitag 09:00), in 3 von 50 Kombinationen (180 Min.). Vorher kam sie in 22 Kombinationen erst nach LK27 (Sonntag) bzw. LK24. **Keine Waterkant-Karte kommt mehr zwei oder mehr Tage nach ihrer Heimatlage** (vorher 22 Fälle). |
| **E – SK28** | Pflichtkarte im Schwerpunkt „Filialen, Lager und Saisonstart“ | SK28 kommt in allen 10 Betriebs-Kombinationen, stets zu Beginn von LK22 (Donnerstag 18:00). Vorher kam sie nie. |
| Drehbuchprüfung | Fehlende eigene Karte einer Rolle bei Zieldauer: **Hinweis** statt Fehler (`server/validate.js`) | Folge der Leitlinie: Die Logistikleitung ist in 30 der 50 Kombinationen besetzt und bekommt in 21 davon keine eigene Karte – **ausschließlich bei Besetzung mit allen Rollen**. Mit der empfohlenen Besetzung (dort ist sie erst ab 180 Min. dabei) bekommt sie immer eine eigene Karte. In den Modi „Erprobte Zeiten“ und „berechnet“ bleibt fehlende Abdeckung ein Fehler. NordTech: weiterhin 0 Fehler, 0 Hinweise. |

Am Drehbuch geändert sind genau zwei Felder: `sonderlagekarten[SK31].zuBeginnVon` und `schwerpunkte[betrieb].pflicht`. Kein Kartentext ist geändert. NordTech ist unverändert (Drehbuch, Engine, Rechnung, Medien).

## 2. Nicht umgesetzt – SK36 (G), gesonderte Entscheidung nötig

G sah SK36 als Pflichtkarte im Schwerpunkt „Krisenführung und Personenschutz“ vor. SK36 hängt an LK26, und LK26 wird bei 45, 60 und 90 Minuten Krisenführung nicht gespielt. Die Variantenprüfung verlangt seit jeher, dass jede Pflichtkarte in **jeder** Dauer kommt (frühere Runde: SK16 wurde deshalb durch SK08 ersetzt). Mit G meldete sie 3 Befunde. Als bevorzugte Karte statt Pflichtkarte wird SK36 in keiner Kombination eingeplant. G wurde deshalb zurückgenommen, statt die Testregel nach dem Anschlagen aufzuweichen.

Möglichkeiten für Sie:

| | Weg | Folge |
|---|---|---|
| G1 | Testregel bewusst ändern: Pflichtkarte nur „sofern erreichbar“ (so arbeiten Engine und Orakel bereits) | SK36 in 120/180 Krisenführung (3 von 50 Kombinationen) |
| G2 | SK36 im Handbuch als manuell auslösbare Karte für lange Formate führen | kein Eingriff in Regeln oder Plan |
| G3 | SK36 bleibt ungenutzt | Lernimpuls „Zuständigkeit USV-Wartung“ nur über Abschluss und Debriefing |

## 3. Neue Prüfungen

- **Delta-Prüfung O-11** (`tools/qa/delta-waterkant.js`) mit 6 Regeln. Darunter: „keine Waterkant-Karte zwei oder mehr Tage nach ihrer Heimatlage“ in 50 Kombinationen, „SK31 nur mit LK23“, „SK28 in allen Betriebs-Kombinationen mit LK22“. **Gegenprobe gegen den alten Stand:** 5 von 6 Regeln schlagen an (die SK36-Regel bleibt dort erfüllt). Die Regel ist also nicht blind.
- **Variantenbericht** (`tools/varianten.js`), beide Szenarien: neuer Abschnitt „Vertrauliche Karten mindestens zwei Tage nach ihrer Heimatlage (Prüfhinweis)“. Er listet Kandidaten zur fachlichen Bewertung, ist aber kein automatischer Befund. Eine mechanische Tagesregel kann Plausibilität nicht entscheiden, sie liefert nur Kandidaten.

## 4. Neuer Prüfhinweis bei NordTech (keine Änderung)

Die neue Prüfung findet bei NordTech **SK15** in 16 von 50 Kombinationen mindestens zwei Tage nach ihrer Heimatlage LK21 (Freitag 16:00), z. B. bei 60 Min. Krisenführung erst nach LK15 (Sonntag 12:00). Text: „Zwei Bereiche behaupten: ‚Das haben wir so nie beschlossen.‘ Es geht um eine Entscheidung des Krisenstabs von heute Vormittag. Wie stellst du die Nachvollziehbarkeit sicher?“

**Einschätzung:** Der Text ist relativ formuliert („heute Vormittag“) und widerspricht keiner späteren Lage. Anders als SK31 enthält er keinen Sachstand, den eine spätere Lage schon überholt hat. Aus meiner Sicht deshalb **kein Plausibilitätsfehler**. NordTech ist eingefroren und bleibt unverändert; die Bewertung liegt bei der Spielleitung (O-19).

Daneben verschiebt die Engine in beiden Szenarien zahlreiche Karten um **genau einen Tag**: Sie kommen mit der nächsten gespielten Lage, wenn ihre eigene ausfällt (NordTech 245, Waterkant 254 Fälle in 50 Kombinationen). Das ist das dokumentierte Verhalten; der Variantenbericht weist es im Abschnitt „über eine Tagesgrenze verschoben“ aus. Ob jeder dieser Texte zeitneutral genug ist, wäre eine eigene redaktionelle Prüfung (O-20).

## 5. Ergebnis des Abnahmelaufs

| Prüfung | Zyklus 3 (`6809dee`) | Zyklus 4 (`52f7c8f`) |
|---|---|---|
| Gesamtlauf | 33/33 Prüfschritte | **33/33** |
| Einzelprüfungen | 835/835 | **836/836** (neu: Delta O-11) |
| Drehbuchprüfung | NordTech 0/0, Waterkant 0 Fehler/9 Hinweise | NordTech 0/0, **Waterkant 0 Fehler/10 Hinweise** (neu: Rollenabdeckung Logistik bei 60 Min.) |
| Variantenprüfung (Regeln) | 0 Befunde je Szenario | **0 Befunde** je Szenario; Prüfhinweise „≥ 2 Tage“: NordTech SK15 (16/50), Waterkant **keine** |
| Integration NordTech / Waterkant | 41/41 / 57/57 | **41/41 / 57/57** |
| Delta Waterkant | 9/9 | **10/10** (F01–F15 und O-11) |
| NordTech-Regression | 41/41 | **41/41** |
| Browser (14 Übungen) | 441/441 | **441/441** |
| Negativtests | 17/17 | **17/17** |
| Replay NT-90 / WK-90 | identisch | **identisch** |
