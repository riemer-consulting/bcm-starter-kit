# 13 – Entscheidungsvorlage O-11 (Waterkant: SK31, SK28, SK36)

**Status:** In Zyklus 4 umgesetzt sind A (SK31) und E (SK28). G (SK36) ist zurückgestellt und braucht eine gesonderte Entscheidung (Dokument 15). Ursprünglicher Text der Vorlage: Grundlage: Drehbuch und Engine im Stand `6809dee` (Zyklus 3). Die Wirkungen sind mit der Ablauf-Engine an Kopien des Drehbuchs im Speicher berechnet. Geprüft wurden 50 Kombinationen: 5 Dauern × 5 Schwerpunkte, jeweils mit empfohlener Besetzung („empf“) und mit allen Rollen („alle“). Am Projekt wurde nichts geändert.
**Leitlinie der Spielleitung:** Fachliche und zeitliche Plausibilität haben Vorrang vor einer vollständigen Kartenverteilung. Eine Rolle ohne eigene vertrauliche Karte in einem Kurzformat ist eher hinnehmbar als eine Information, die sie zu diesem Zeitpunkt noch nicht oder nicht mehr so wissen dürfte.

## 1. Befund – größer als bisher dokumentiert

Bisher hieß es (W2-R11): „SK31 kommt bei 180 Min. erst nach LK27.“ Die Nachrechnung zeigt mehr:

| Karte | Inhalt (gekürzt) | Heimatlage | Ist-Stand |
|---|---|---|---|
| SK31 an Logistikleitung | „Die Wareneingänge vom Montag (38 Lkw) sind im System nicht gebucht … die Filialen sehen ‚nicht verfügbar‘.“ | LK23, Freitag 09:00 | in 27 von 50 Kombinationen gespielt, davon **22 nach LK27 (Sonntag 12:00)**: mit allen Rollen in allen Schwerpunkten bei 45, 60, 90 und 120 Min. sowie bei 180 Min. Ausgewogen und Kunden (beide Besetzungen) |
| SK28 an IT-Support Filialen | „Bei vier Filialen schlägt der Kassenabgleich fehl … wenn ihr die Kassen neu aufsetzt, sind die Daten weg.“ | LK22, Donnerstag 18:00 (zu Beginn von LK22) | in **0 von 50** gespielt (Kartenbudget), obwohl LK22 immer gespielt wird |
| SK36 an Gebäudetechnik | „Wer war für die USV-Wartung zuständig: Gebäudetechnik oder IT?“ | LK26, Samstag 15:00 (zu Beginn von LK26) | in **0 von 50** gespielt (LK26 fehlt oder Kartenbudget) |

**Ursache SK31:** Die Engine gibt jeder besetzten Rolle mindestens eine eigene Karte. Für die Logistikleitung ist SK31 oft die einzige wählbare Karte, weil SK16 an LK12 hängt und LK12 in vielen Formaten fehlt. Wird LK23 nicht gespielt, landet SK31 hinter der nächsten gespielten Lage. Das ist LK27, in der es heißt, das Zentrallager liefere wieder. Die Logistikleitung erfährt dann am Sonntag von einem Freitagsproblem, nachdem der Tisch schon „läuft wieder“ gehört hat. Genau diesen Fall soll Ihre Leitlinie verhindern.

**SK28 und SK36** sind zeitlich unproblematisch, weil sie fest zu Beginn ihrer Lage kommen. Sie werden aber nie gespielt. Hier geht es um Spieltiefe, nicht um Plausibilität.

**Lücke in der eigenen Prüfung:** Orakel und Variantenprüfung haben diesen Fall nicht als Fehler gemeldet. Sie prüfen, dass keine Karte **vor** ihrer Heimatlage kommt, aber nicht, dass sie nicht **lange danach** kommt. Der Variantenbericht weist solche Karten nur im Abschnitt „über eine Tagesgrenze verschoben“ aus, ohne sie als Verstoß zu werten. Eine solche Regel wäre mit der Umsetzung als neuer, vorab festgelegter Test zu ergänzen.

## 2. Alternativen und Wirkung

| Nr | Alternative | Mechanik | kurze Formate (45–90 Min.) | lange Formate (120–180 Min.) | zu frühe/zu späte Information | Rollenabdeckung | NordTech |
|---|---|---|---|---|---|---|---|
| **A** | SK31 fest an LK23 binden | Drehbuchfeld `zuBeginnVon: "LK23"` (wie SK28/SK36) | SK31 entfällt (LK23 wird nicht gespielt) | SK31 nur, wenn LK23 gespielt wird: 3 von 50 (180 IT; 180 Ausgewogen mit allen Rollen), jeweils pünktlich zu LK23 | **0 von 50** verspätet | Logistikleitung ist in **21 von 50** Kombinationen besetzt, ohne eine eigene Karte zu bekommen (fast nur „alle Rollen“ in kurzen Formaten; bei empfohlener Besetzung ist sie erst ab 180 Min. dabei) | keine Wirkung (nur Waterkant-Daten) |
| A+ | wie A, dazu eine zeitneutrale Logistikkarte | zusätzlich eine früh spielbare Karte für die Logistik (neuer Text, z. B. an LK06/LK09) | Logistik bekommt wieder eine Karte | wie A | 0 verspätet | vollständig | keine |
| B | SK31 zeitneutral umschreiben | Text so fassen, dass er auch am Sonntag stimmt (z. B. Inventurstichprobe deckt nie gebuchte Wareneingänge auf) | unverändert gespielt, meist nach LK27 | unverändert | formal plausibel, aber die Information kommt erst nach „Zentrallager liefert“ | unverändert vollständig | keine |
| C | allgemeine Engine-Regel: eine Karte, deren Heimatlage fehlt, darf nicht in einem späteren Tagesabschnitt landen | Änderung in `server/runEngine.js` | betrifft alle Karten mit fehlender Heimatlage | dto. | verhindert Verspätungen allgemein | Lücken für mehrere Rollen möglich | **wirkt auch auf NordTech** (eingefroren) – Regression würde Abweichungen zeigen |
| D | Status quo, Hinweis im Handbuch | Moderation kündigt SK31 als „spät nachgereichte Meldung“ an | unverändert | unverändert | bleibt unplausibel | vollständig | keine |

Für SK28 und SK36 (Spieltiefe):

| Nr | Alternative | Wirkung | Bewertung |
|---|---|---|---|
| E | SK28 als Pflichtkarte im Schwerpunkt „Filialen, Lager und Saisonstart“ | in 10 von 50 gespielt (alle Betriebs-Kombinationen), stets zu Beginn von LK22; durchschnittlich +0,2 Karten | zeitlich sauber; passt fachlich zum Schwerpunkt |
| F | SK28 auf Priorität 1 | in 50 von 50 gespielt, auch in 45 Minuten; durchschnittlich +1,0 Karten | macht die dichten Kurzformate noch dichter |
| G | SK36 als Pflichtkarte im Schwerpunkt „Krisenführung und Personenschutz“ | in 3 von 50 gespielt (120/180 Krisenführung), stets zu Beginn von LK26 | zeitlich sauber; stärkt Lernziel „Ursache und Zuständigkeit“ |
| H | SK28/SK36 unverändert, im Handbuch als manuell auslösbar | keine Planänderung | Moderation kann sie gezielt einsetzen |

## 3. Empfehlung (zur Entscheidung durch die Spielleitung)

1. **SK31: Alternative A.** Sie folgt Ihrer Leitlinie ohne Ausnahme: In keiner Kombination kommt SK31 mehr verspätet. Die Kosten sind 21 Kombinationen, in denen die Logistikleitung besetzt ist, aber keine eigene Karte bekommt. Das sind fast ausschließlich Besetzungen mit allen Rollen in kurzen Formaten, die das Handbuch ohnehin nicht empfiehlt. Die Drehbuchprüfung (`server/validate.js`) weist das in ihren Simulationen als Hinweis aus, nicht als Fehler; die statische Prüfung bleibt erfüllt, weil die Logistikleitung mit SK16 eine terminierte eigene Karte hat. **[Korrektur Zyklus 4: Diese Aussage war falsch. Die Simulation wertete fehlende Rollenabdeckung als Fehler. Die Regel wurde im Sinne der Leitlinie zum Hinweis geändert (Dokument 15, Befund Z4-02).]** Wer die Lücke schließen will, ergänzt später A+; dafür braucht es einen neuen, fachlich geprüften Kartentext.
2. **SK28: Alternative E**, **SK36: Alternative G.** Beide kommen damit nur in den Formaten, zu denen sie fachlich gehören, und immer zu Beginn ihrer Lage.
3. **Nicht empfohlen:** C (greift in die eingefrorene NordTech-Logik ein), F (überlädt Kurzformate), B und D (die Information bliebe zeitlich unplausibel).

## 4. Prüfung nach einer Umsetzung

Die Prüfungen folgen Ihrer Freigabe. Variantenprüfung und Integration für Waterkant, also 25 Kombinationen Dauer × Schwerpunkt und 32 Entscheidungskombinationen. Zusätzlich eine neue Regelprüfung: „keine vertrauliche Karte nach einer Lage eines späteren Tagesabschnitts als ihre Heimatlage“. Dazu die Waterkant-Browserläufe und die NordTech-Regression, die unverändert bleiben muss, weil nur Waterkant-Daten geändert werden.
