# 2. Schnellstart

Diese kurze Anleitung bringt Sie in etwa zehn Minuten zu einem ersten,
funktionierenden Workbook. Für eine noch kürzere englischsprachige Fassung
siehe auch [Quickstart](../quickstart.md).

## 1. Anwendung öffnen (30 Sekunden)

Öffnen Sie `bcm-starter-kit.html` in einem Desktop-Browser (Chrome, Edge,
Firefox oder Safari) — per Doppelklick oder indem Sie die Datei in ein
offenes Browserfenster ziehen. Es gibt nichts zu installieren.

Beim ersten Start erscheint ein Startbildschirm mit einem kurzen
Lizenzhinweis. Bestätigen Sie mit **"Verstanden – Software nutzen"**. Das
sehen Sie danach nicht mehr (siehe [Kapitel 3](03-navigation.md)).

## 2. Mit Beispieldaten erkunden — oder direkt loslegen (30 Sekunden)

- **Erst ausprobieren:** Klicken Sie auf **Beispieldaten laden** auf dem
  Dashboard. Das ergänzt zwei Beispielprozesse, damit Sie jede Ansicht
  bereits mit Inhalten sehen, bevor Sie eigene Daten eingeben (siehe
  [Kapitel 29](29-demo-daten.md)). Eine noch umfangreichere, realistische
  Beispielfirma finden Sie unter [`examples/`](../../examples/README.md)
  — importierbar über **Import JSON** in der oberen Leiste.
- **Direkt loslegen:** Klicken Sie in der Seitenleiste auf
  **+ Neue Prozessakte**, um Ihren ersten echten Prozess anzulegen.

## 3. Einen Prozess füllen (5 Minuten)

Jede Prozessakte hat acht Reiter (siehe [Kapitel 5](05-prozesse.md)). Für
den ersten Durchgang reichen vier davon:

1. **Steckbrief** — Name, Verantwortlicher, Fachbereich, Ziel und die
   Kritikalitätseinstufung. Nur dieser Reiter enthält Pflichtfelder für
   die Fortschrittsanzeige (siehe [Kapitel 6](06-kritikalitaet.md)).
2. **Business Impact** — bewerten Sie, wie stark ein Ausfall in acht
   Kategorien wirkt, je nach Zeitpunkt nach Ausfallbeginn (siehe
   [Kapitel 7](07-bia.md)). Daraus leitet das Starter Kit eine
   Kritikalitäts-Empfehlung ab, die es Ihnen im Steckbrief zeigt.
3. **Kritische Ressourcen** — verknüpfen Sie Personen, Systeme, Daten und
   Lieferanten, ohne die der Prozess nicht läuft. Markieren Sie, wo es
   keine Ausweichmöglichkeit gibt (siehe [Kapitel 10](10-ressourcen-abhaengigkeiten.md)).
4. **Notbetrieb** — was passiert in den ersten Stunden einer Störung: wer
   entscheidet, wer wird informiert, was sind die ersten Schritte (siehe
   [Kapitel 11](11-notbetrieb.md)).

Die übrigen Reiter (60-Sekunden-Vorstellung, Mindestfähigkeit,
Resilienz-Check, Maßnahmen) können Sie über die Zeit ergänzen — nichts
hindert Sie daran, eine unvollständige Akte zu speichern.

## 4. Einen Blick auf die Management-Sicht werfen (1 Minute)

Klicken Sie in der Seitenleiste auf **Management Summary** oder auf
**Managementbericht** (GF-Ansicht). Das ist die entscheidungsorientierte
Zusammenfassung: Gesamtstatus, die am stärksten gefährdeten Prozesse und
Ressourcen, Datenqualitätslücken (bewusst getrennt von bestätigten
Risiken) und alles, was eine Managemententscheidung braucht (siehe
[Kapitel 22](22-management-summary-gf-ansicht.md)).

## 5. Ihre Arbeit sichern (1 Minute)

Ihr Workbook wird standardmäßig automatisch im lokalen Speicher Ihres
Browsers gesichert — Sie müssen dafür nichts anklicken. Für alles, was Sie
zusätzlich außerhalb des Browsers sichern möchten (siehe
[Kapitel 4](04-workbook.md)):

- **Chrome/Edge/Opera/Brave:** verknüpfen Sie über
  **Einstellungen → Datei-Verknüpfung** eine echte Datei auf Ihrem
  Rechner. Jede Änderung wird ab dann automatisch dorthin geschrieben.
  **Speichern unter…** in der oberen Leiste macht dasselbe.
- **Jeder Browser:** nutzen Sie **Daten exportieren** in der oberen
  Leiste oder in den Einstellungen, um jederzeit eine JSON-Datei
  herunterzuladen.

## 6. Ein PDF erzeugen (30 Sekunden)

Klicken Sie in der oberen Leiste auf **PDF erzeugen**, wählen Sie einen
Umfang (Kurzbericht, vollständiger Bericht, nur Maßnahmen oder ein
einzelner Prozess) und bestätigen Sie. Das öffnet den nativen Druckdialog
Ihres Browsers — wählen Sie dort "Als PDF speichern" (siehe
[Kapitel 27](27-pdf-druck.md)).

## Wie geht es weiter?

- [Bedienkonzept und Navigation](03-navigation.md) — wie die Anwendung
  aufgebaut ist
- [Prozesse erfassen und pflegen](05-prozesse.md) — der Kern der
  täglichen Arbeit
- [Häufige Fragen und Troubleshooting](31-faq-troubleshooting.md)
