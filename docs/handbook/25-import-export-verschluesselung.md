# 25. Import, Export und Verschlüsselung

## Wofür sind diese Funktionen da?

Das Starter Kit speichert alle Daten lokal (siehe
[Kapitel 4](04-workbook.md)). Import und Export sind der Weg, Daten
zwischen Geräten, mit Kolleginnen und Kollegen oder als Sicherung
auszutauschen — wahlweise offen als JSON-Datei oder passwortgeschützt
verschlüsselt.

## Wo finde ich diese Funktionen?

In der Topleiste: **Import JSON** und **Daten exportieren**. In den
Einstellungen, Karte "Daten & Bedienbarkeit": zusätzlich
**Verschlüsselter Export** und **Verschlüsselter Import**.

## JSON-Export

Erstellt eine vollständige, unverschlüsselte JSON-Datei des gesamten
aktuellen Stands — geeignet für Weitergabe innerhalb vertrauenswürdiger
Kanäle oder als einfache Sicherung.

## JSON-Import: Drei Strategien

Enthält Ihr aktueller Stand bereits Daten, fragt das Starter Kit vor dem
Import, wie verfahren werden soll:

- **Vollständig ersetzen** — der aktuelle Stand wird komplett durch die
  Importdatei ersetzt. Nicht exportierte eigene Eingaben gehen dabei
  verloren. Das Starter Kit verlangt vorher eine ausdrückliche
  Bestätigung.
- **Zusammenführen** — übereinstimmende Prozesse/Ressourcen/Maßnahmen
  (gleiche ID, z. B. aus einer früher gemeinsam genutzten Datei) werden
  ergänzt, ohne vorhandene Inhalte zu überschreiben; neue Einträge aus
  dem Import kommen hinzu.
- **Manuell auswählen** — Sie wählen einzeln aus, welche Prozesse,
  Ressourcen und Maßnahmen aus der Datei zusätzlich übernommen werden
  sollen. Nichts Bestehendes wird dabei überschrieben.

Ist der aktuelle Stand vollständig leer, importiert das Starter Kit ohne
Rückfrage.

## Verschlüsselter Export und Import

Für die Weitergabe über weniger vertrauenswürdige Kanäle (z. B. E-Mail)
lässt sich der komplette Stand mit einem selbst gewählten Passwort
verschlüsseln (AES-GCM, mit einer sehr hohen Anzahl an
Schlüsselableitungs-Runden über die im Browser eingebaute Web Crypto
API). **Wichtig:** Das Passwort wird nirgends gespeichert und ist bei
Verlust **nicht wiederherstellbar** — ohne das Passwort lässt sich die
Datei nicht mehr entschlüsseln. Der verschlüsselte Import verlangt das
gleiche Passwort und führt danach durch dieselben drei Importstrategien
wie ein normaler JSON-Import.

## Was das Starter Kit automatisch macht

Es prüft jede Importdatei auf Gültigkeit, bevor überhaupt etwas
übernommen wird, und meldet Warnungen oder unklare Verweise (z. B. eine
Ressource, deren zugehöriger Prozess in der Importdatei fehlt), statt sie
stillschweigend zu ignorieren.

## Was ich selbst entscheiden muss

Welche Importstrategie im konkreten Fall die richtige ist (Ersetzen,
Zusammenführen, Manuell), hängt davon ab, ob und welche eigenen
Änderungen seit der letzten gemeinsamen Datei entstanden sind — das
entscheiden Sie im Einzelfall.

## Beispiel aus der Praxis

Zwei Kolleginnen arbeiten an unterschiedlichen Prozessen im selben
Workbook, jede lokal auf ihrem Rechner. Beim Zusammenführen der beiden
Stände wählt die eine "Zusammenführen" — ihre eigenen, bereits
vorhandenen Prozesse bleiben unverändert, die von der Kollegin neu
hinzugefügten Prozesse werden ergänzt.

## Typische Fehler

- "Vollständig ersetzen" wählen, ohne vorher den eigenen aktuellen Stand
  zu exportieren — nicht exportierte Eingaben gehen dann verloren.
- Das Passwort eines verschlüsselten Exports nicht sicher aufbewahren —
  es lässt sich nicht zurücksetzen.

## Verwandte Kapitel

- [Das Workbook: Speichern, Dateien und Sicherung](04-workbook.md)
- [Datensicherung und Wiederherstellung](26-datensicherung-recovery.md)
- [Einstellungen](28-einstellungen.md)
