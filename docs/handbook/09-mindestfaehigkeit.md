# 9. Mindestfähigkeit

## Wofür ist diese Funktion da?

Im Ernstfall läuft selten der gesamte Prozess normal weiter. Die
Mindestfähigkeit legt fest, **was im Notbetrieb wirklich unverzichtbar
ist** — und was reduziert oder ganz zurückgestellt werden kann. Das ist
die Grundlage dafür, den Notbetrieb (siehe [Kapitel 11](11-notbetrieb.md))
realistisch statt überambitioniert zu planen.

## Wo finde ich sie?

Im Reiter **Mindestfähigkeit** jeder Prozessakte.

## So gehe ich vor

### 1. Die Drei-Spalten-Übersicht

Ordnen Sie einzelne Leistungen oder Teilaufgaben des Prozesses einer von
drei Spalten zu:

- **Muss funktionieren** — ohne das geht es im Notbetrieb nicht.
- **Kann reduziert werden** — geht auch mit weniger Umfang, langsamer
  oder mit geringerer Qualität.
- **Kann warten** — kann während der Störung vollständig pausieren.

Fügen Sie in jeder Spalte einzelne Stichpunkte hinzu; jeder Eintrag lässt
sich einzeln wieder entfernen.

### 2. Mindestmenge/-qualität und Auslöser

- **Welche Mindestmenge/Mindestqualität ist erforderlich?** — Freitext,
  z. B. "mindestens die Top-20-Kunden bedienbar".
- **Welche Entscheidung löst den Notbetrieb aus?** — ab wann wird
  überhaupt in den hier beschriebenen reduzierten Modus gewechselt?

### 3. Mindestfähigkeit messbar erfassen (optional, aber empfohlen)

Damit die Mindestfähigkeit nicht nur beschrieben, sondern auch geprüft
werden kann, bietet das Starter Kit eine **messbare** Erfassung mit genau
einem von drei Modi:

- **Prozent** — z. B. "30 % der normalen Auftragsmenge".
- **Menge** — eine Zahl mit Einheit und Zeitraum, z. B. "100
  Bestellungen pro Tag".
- **Nur Beschreibung** — wenn sich die Mindestfähigkeit nicht sinnvoll
  in Prozent oder Menge fassen lässt.

**Wichtig:** Wählen Sie genau einen Modus. Das Starter Kit rechnet
zwischen Prozent und Menge nicht automatisch um — beide gleichzeitig
auszufüllen ohne einen gewählten Modus führt zu einem Hinweis, dass eine
eindeutige Wahl noch fehlt (das kommt typischerweise beim Import älterer
Daten vor).

## Was das Starter Kit automatisch macht

Es weist auf Datenqualitätslücken hin, etwa wenn Prozent- **und**
Mengenangabe gleichzeitig aus einem älteren Stand vorhanden sind, aber
kein Modus gewählt wurde. Es erfindet dabei nie selbst einen Modus oder
einen Wert.

## Was ich selbst entscheiden muss

Welche Leistungen tatsächlich unverzichtbar sind und welcher Umfang im
Ernstfall ausreicht, ist eine fachliche Einschätzung — idealerweise mit
dem Prozessverantwortlichen und den Fachbereichen gemeinsam erarbeitet
(siehe [Kapitel 13](13-workshop.md)).

## Beispiel aus der Praxis

Prozess "Warenausgang": Spalte "Muss funktionieren" — Verpackung und
Versand für Top-Kunden; Spalte "Kann reduziert werden" —
Sonderkonditionsprüfung; Spalte "Kann warten" — Reporting. Messbare
Mindestfähigkeit im Modus "Menge": 100 Bestellungen pro Tag.

## Typische Fehler

- Die Drei-Spalten-Übersicht ausfüllen, aber die messbare Erfassung
  überspringen — dadurch bleibt "Mindestfähigkeit" unscharf und ist
  später schwer zu prüfen.
- "Muss funktionieren" zu breit fassen ("eigentlich alles") — das nimmt
  der Einstufung ihren Zweck.

## Verwandte Kapitel

- [Notbetrieb](11-notbetrieb.md)
- [Business Impact Analysis (BIA)](07-bia.md)
