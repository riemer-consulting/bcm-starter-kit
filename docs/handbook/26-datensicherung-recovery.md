# 26. Datensicherung und Wiederherstellung

## Wofür ist diese Funktion da?

Zusätzlich zu manuellen Exporten (siehe
[Kapitel 25](25-import-export-verschluesselung.md)) legt das Starter Kit
automatisch **Sicherungen** an, bevor riskante Vorgänge stattfinden — und
bietet einen Weg, Daten wiederherzustellen, falls der gespeicherte Stand
einmal nicht mehr lesbar sein sollte.

## Wo finde ich das?

In den Einstellungen, Karte **"Wiederherstellung und Sicherungen"**.

## Automatische Sicherungen

Das Starter Kit legt automatisch eine Sicherung an, bevor:

- ein Import durchgeführt wird,
- eine Version wiederhergestellt wird,
- Daten gelöscht/bereinigt werden (siehe [Kapitel 29](29-demo-daten.md)),
- eine Schema-Aktualisierung stattfindet,
- ein Konflikt zwischen mehreren offenen Tabs aufgelöst wird.

Es werden bis zu 5 Sicherungen rotierend vorgehalten — die älteste wird
verdrängt, sobald eine neue hinzukommt. Zu jeder Sicherung sehen Sie
Zeitpunkt, Grund und den betroffenen Workbook-Namen, und können sie
**wiederherstellen**, als **JSON herunterladen** oder **löschen**.

## Nicht ladbare Rohdaten

Sollte der gespeicherte Stand einmal nicht mehr normal lesbar sein (z. B.
nach einem Browserfehler), erscheint hier zusätzlich ein Abschnitt
**"Nicht ladbare Rohdaten"**. Sie können die Rohdaten herunterladen (für
eine manuelle Rettung), eine automatische Wiederherstellung versuchen
oder den Eintrag löschen.

## Was das Starter Kit automatisch macht

Es erkennt riskante Vorgänge selbst und legt vor jedem von ihnen
automatisch eine Sicherung an — ohne dass Sie daran denken müssen. Es
ersetzt aber nicht die bewusste, manuelle Versionierung (siehe
[Kapitel 23](23-versionierung.md)) oder einen eigenen Export.

## Was ich selbst entscheiden muss

Automatische Sicherungen sind ein Sicherheitsnetz, kein Ersatz für
regelmäßige eigene Exporte oder Versionssicherungen — insbesondere, weil
nur 5 Sicherungen rotierend vorgehalten werden.

## Beispiel aus der Praxis

Vor einem größeren Import aus einer anderen Datei legt das Starter Kit
automatisch eine Sicherung mit Grund "Vor Import" an. Stellt sich nach
dem Import heraus, dass die falsche Datei gewählt wurde, lässt sich diese
Sicherung direkt wiederherstellen.

## Typische Fehler

- Sich ausschließlich auf automatische Sicherungen verlassen, statt
  regelmäßig selbst eine Version zu speichern oder zu exportieren.
- Eine Sicherung löschen, ohne vorher zu prüfen, ob sie noch benötigt wird.

## Verwandte Kapitel

- [Versionierung und Versionshistorie](23-versionierung.md)
- [Import, Export und Verschlüsselung](25-import-export-verschluesselung.md)
- [Einstellungen](28-einstellungen.md)
