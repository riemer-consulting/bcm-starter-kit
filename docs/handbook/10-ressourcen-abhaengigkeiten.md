# 10. Ressourcen und Abhängigkeiten

## Wofür ist diese Funktion da?

Kein Prozess läuft für sich allein. Er braucht Personen, Systeme, Daten,
Lieferanten und anderes, um zu funktionieren — und hängt oft auch von
anderen Prozessen ab. Dieses Kapitel beschreibt zwei zusammengehörige
Funktionen: die **Kritischen Ressourcen** je Prozess und den
**Abhängigkeitscluster**, der diese Ressourcen prozessübergreifend
auswertet.

## Teil 1: Kritische Ressourcen

### Wo finde ich sie?

Im Reiter **Kritische Ressourcen** jeder Prozessakte.

### So gehe ich vor

Fügen Sie für jede benötigte Ressource einen Eintrag hinzu und ordnen Sie
sie einer von elf Kategorien zu:

Personen, Informationen, IT-Systeme, Anwendungen, Daten,
Gebäude/Standorte, Maschinen/Arbeitsmittel, Lieferanten, Dienstleister,
Behörden, Kommunikationswege.

Zu jeder Ressource lassen sich erfassen:

- **Name** und **Kritikalität** für den Prozess.
- **Alternative vorhanden?** (Ja/Teilweise/Nein) mit einer Beschreibung
  der Ausweichlösung.
- **Schwachstelle** — was an dieser Ressource ist besonders verwundbar?
- **Maßnahme erforderlich?** — ein erster Hinweis, ob hierzu noch eine
  Maßnahme angelegt werden sollte (siehe
  [Kapitel 15](15-massnahmenmanagement.md)).
- **Verantwortlich** und **Anbieter/Vertragsbezug**.
- **Verfügbarkeitsanforderung** und **Recovery-Anforderung** (Wert +
  Einheit) — wie schnell muss diese Ressource im Ernstfall wieder zur
  Verfügung stehen.
- **Ausweichlösung getestet am** und **Testergebnis** — falls eine
  Alternative schon einmal ausprobiert wurde.
- **Datenklassifizierung** und **Enthält personenbezogene Daten** — für
  Ressourcen mit Datenbezug.
- **Single Point of Failure** — als solches markierbar, wenn ein Ausfall
  dieser einen Ressource den Prozess vollständig stoppen würde.

### Eine Ressource, mehrfach genutzt

Ressourcen werden nicht pro Prozess neu angelegt, sondern in einem
gemeinsamen Ressourcenpool geführt und über die Liste "genutzt in
Prozessen" mit einem oder mehreren Prozessen verknüpft. Legen Sie
dieselbe IT-Anwendung oder denselben Lieferanten also nicht in jeder
Prozessakte neu an — verknüpfen Sie stattdessen den bestehenden Eintrag.
Das ist die Voraussetzung dafür, dass der Abhängigkeitscluster (Teil 2)
Mehrfachnutzung überhaupt erkennen kann.

## Teil 2: Der Abhängigkeitscluster

### Wo finde ich ihn?

Als eigener Menüpunkt **Abhängigkeitscluster** in der Seitenleiste,
unter den übergreifenden Bereichen.

### Was zeigt diese Ansicht?

- **Schlüsselpersonen** — Personen, die in mehr als einem Prozess als
  unverzichtbar geführt werden.
- **Häufig kritische IT-Systeme** — Systeme/Anwendungen, die in mehreren
  Prozessen vorkommen.
- **Mehrfach kritische Lieferanten** — externe Abhängigkeiten mit
  Auswirkung auf mehrere Prozesse.
- **Alle Ressourcen nach Priorität** — eine Tabelle aller Ressourcen,
  sortiert nach einer aus Häufigkeit und Kritikalität berechneten
  Priorität (angezeigt als Sterne).
- **Maßnahmen, die mehreren Prozessen gleichzeitig helfen** — ein
  Hinweis, wo sich eine einzelne Maßnahme an einer mehrfach genutzten
  Ressource besonders lohnt, weil sie mehrere Prozesse gleichzeitig
  absichert.
- **Potenzielle Ressourcen-Duplikate** — automatisch anhand ähnlicher
  Namen erkannte mögliche Doppelanlagen (z. B. Tippfehler-Varianten).

### Duplikate zusammenführen

Erkennt das Starter Kit zwei vermutlich identische Ressourcen, können Sie
sie per Klick zusammenführen — Sie wählen dabei, welcher der beiden
Namen erhalten bleibt. Alle Prozessverknüpfungen der zusammengeführten
Ressource werden auf die verbleibende übertragen. Das ändert nichts
automatisch im Hintergrund, ohne dass Sie es ausgelöst haben.

### Formale Abhängigkeiten zwischen Prozessen

Der Abhängigkeitscluster wertet auch die **formalen Abhängigkeiten**
aus, die Sie im Steckbrief eines Prozesses anlegen können (siehe
[Kapitel 5](05-prozesse.md)). Nur formale Abhängigkeiten — nicht die
Freitextfelder "vor-/nachgelagerte Prozesse" — lassen sich zuverlässig
auswerten, weil sie auf den Prozess selbst verweisen und nicht nur auf
seinen zum Zeitpunkt der Eingabe gültigen Namen.

## Was ich selbst entscheiden muss

Ob eine Ressource wirklich kritisch ist, ob eine Alternative ausreicht
und ob zwei erkannte Duplikate tatsächlich dieselbe Ressource sind,
entscheiden Sie. Das Starter Kit erkennt Muster und Häufungen, bewertet
aber nicht, ob eine bestimmte Abhängigkeit fachlich hingenommen werden
kann.

## Beispiel aus der Praxis

Prozess "Warenausgang" nutzt die Ressource "Auftragssystem XY"
(Kategorie IT-Systeme, Single Point of Failure, keine Alternative). Im
Abhängigkeitscluster taucht dieselbe Ressource auch beim Prozess
"Rechnungsstellung" auf — sie wird deshalb als mehrfach genutzt
hervorgehoben, und eine Maßnahme zur Absicherung dieses Systems würde
beiden Prozessen gleichzeitig helfen.

## Typische Fehler

- Dieselbe Ressource für jeden Prozess neu anlegen, statt eine bestehende
  zu verknüpfen — dadurch bleibt Mehrfachnutzung im Cluster unsichtbar.
- Formale Abhängigkeiten nicht anlegen und sich nur auf die Freitextfelder
  verlassen — dann bleibt der Abhängigkeitscluster für Prozessketten leer.
- Ein "Single Point of Failure" markieren, aber die Ausweichlösung nie
  weiterverfolgen.

## Verwandte Kapitel

- [Prozesse erfassen und pflegen](05-prozesse.md)
- [Notbetrieb](11-notbetrieb.md)
- [Maßnahmenmanagement](15-massnahmenmanagement.md)
