# 4. Workbook erstellen, öffnen und sichern

Ihr **Workbook** ist der gesamte Datenbestand: alle Prozesse, Ressourcen,
Maßnahmen, Reviews, Versionen und Einstellungen. Dieses Kapitel erklärt,
wo diese Daten liegen und wie Sie sie sichern.

## Wo Ihre Daten liegen

Die Anwendungsdatei `bcm-starter-kit.html` selbst enthält **keine**
Eingaben — sie ist nur das Programm. Ihre Daten werden getrennt davon
gespeichert, und zwar auf eine von zwei Arten:

1. **Im Browser** (Standard): Ihr Workbook liegt im lokalen Speicher
   („LocalStorage") des Browserprofils, in dem Sie die Anwendung geöffnet
   haben. Es wird automatisch gespeichert, sobald Sie etwas ändern — Sie
   müssen nichts anklicken. Dieser Speicher ist an den Browser und das
   Gerät gebunden.
2. **In einer verknüpften Datei** (optional, nur Chrome/Edge/Opera/Brave):
   Sie können die Anwendung mit einer echten Datei auf Ihrem Rechner
   verknüpfen. Jede Änderung wird dann automatisch in diese Datei
   geschrieben — ähnlich wie bei einem Textverarbeitungsprogramm.

Die obere Leiste zeigt jederzeit, welcher Fall aktuell gilt: "Lokal
gespeichert", "Nur im Browser gespeichert" oder "Verknüpft mit: …".

## Eine Datei verknüpfen

Unter **Einstellungen → Datei-Verknüpfung** verknüpfen Sie eine
bestehende oder neue Datei. Danach stehen in der oberen Leiste zusätzlich
zur Verfügung:

- **Datei öffnen** — eine andere verknüpfte Datei laden
- **Speichern** — sofort in die verknüpfte Datei schreiben
- **Speichern unter…** — eine neue Verknüpfung anlegen

Dieser Weg funktioniert nur in Chromium-basierten Browsern (Chrome, Edge,
Opera, Brave), da er auf einer Browser-Funktion beruht, die Firefox und
Safari nicht anbieten. Ohne Datei-Verknüpfung nutzen Sie stattdessen
**Daten exportieren** (siehe [Kapitel 25](25-import-export-verschluesselung.md)).

Wenn der Browser die Berechtigung zur Datei zwischenzeitlich zurücksetzt
(normales Sicherheitsverhalten, z. B. nach Neustart des Browsers), zeigt
die Anwendung einen Hinweis und bietet an, die Verknüpfung mit einem
Klick wiederherzustellen.

## Ein neues, leeres Workbook beginnen

Öffnen Sie die Anwendung einfach in einem Browserprofil, in dem noch
kein Workbook gespeichert ist — Sie starten dann mit einer leeren
Willkommenskarte auf dem Dashboard. Von dort aus legen Sie über
**+ Neue Prozessakte** Ihren ersten Prozess an, oder laden zunächst
Beispieldaten zur Orientierung (siehe [Kapitel 29](29-demo-daten.md)).

## Arbeiten in mehreren Browser-Tabs

Der Browserspeicher gehört zum Browserprofil, nicht zu einem einzelnen
Tab — zwei Tabs mit demselben Workbook schreiben also in denselben
Speicher. Speichert ein Tab, während Sie im anderen noch arbeiten, meldet
sich die Anwendung mit einem Hinweis und lässt Sie wählen, welcher Stand
gilt. Der jeweils verworfene Stand wird vorher automatisch gesichert,
sodass eine falsche Wahl nicht endgültig ist. Am einfachsten vermeiden
Sie die Situation von vornherein, indem Sie ein Workbook nur in einem
Tab geöffnet halten.

## Automatische Sicherung

Zusätzlich zur laufenden Speicherung legt das Starter Kit automatisch
bis zu fünf Sicherungen an — vor riskanten Vorgängen wie Import,
Versions-Wiederherstellung oder dem Bereinigen der Daten. Mehr dazu in
[Kapitel 26](26-datensicherung-recovery.md).

## Verwandte Kapitel

- [Import, Export und Verschlüsselung](25-import-export-verschluesselung.md)
- [Datensicherung und Recovery](26-datensicherung-recovery.md)
- [Einstellungen](28-einstellungen.md)
