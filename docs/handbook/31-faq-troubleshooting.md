# 31. Häufige Fragen und Problemlösung

## Tastaturbedienung

- **Strg+K** — Schnellzugriff/Kommandopalette: schnelle Suche über alle
  Funktionen und Ansichten, per Tastatur bedienbar.
- **Tab** — springt im Workshop-Modus direkt ins Antwortfeld.
- **Escape** — schließt Dialoge und Hilfefenster.

## "Mehrere Tabs geöffnet" — was bedeutet das?

Öffnen Sie dasselbe Workbook in zwei Browser-Tabs gleichzeitig und ändern
in beiden etwas, erkennt das Starter Kit den Konflikt und bietet zwei
Optionen:

- **Stand des anderen Tabs laden** — übernimmt den fremden Stand; der
  hier angezeigte Stand wird vorher automatisch gesichert.
- **Diesen Stand behalten** — überschreibt den anderen Tab; dessen Stand
  wird vorher automatisch gesichert.

In beiden Fällen geht also nichts endgültig verloren — der verworfene
Stand liegt als automatische Sicherung vor (siehe
[Kapitel 26](26-datensicherung-recovery.md)).

## "Mein Browser unterstützt keine Datei-Verknüpfung"

Das Starter Kit nutzt für die direkte Dateispeicherung eine Funktion
(File System Access API), die aktuell nur in Chrome, Edge und ähnlichen
Chromium-Browsern verfügbar ist. In anderen Browsern funktionieren
Export/Import als JSON-Datei vollständig und unverändert — nutzen Sie
diese als Alternative (siehe [Kapitel 4](04-workbook.md)).

## "Ich habe mein Verschlüsselungspasswort vergessen"

Das Passwort eines verschlüsselten Exports wird an keiner Stelle
gespeichert und kann daher nicht zurückgesetzt oder wiederhergestellt
werden. Ohne das Passwort lässt sich die verschlüsselte Datei nicht mehr
entschlüsseln — sichern Sie deshalb parallel auch unverschlüsselte
Exporte oder Versionen, wenn das für Sie ein Risiko darstellt.

## "Meine Daten sind weg" — was tun?

1. Prüfen Sie in den Einstellungen unter "Wiederherstellung und
   Sicherungen", ob eine automatische Sicherung vorliegt (siehe
   [Kapitel 26](26-datensicherung-recovery.md)).
2. Prüfen Sie die Versionshistorie — möglicherweise lässt sich eine
   ältere Version wiederherstellen (siehe [Kapitel 23](23-versionierung.md)).
3. Prüfen Sie, ob eine JSON-Exportdatei aus einer früheren Sitzung
   vorliegt.

## Die eingebaute Selbstprüfung (für technisch Interessierte)

Über **Strg+Alt+T** lässt sich ein versteckter Entwicklermodus öffnen,
der eine interne Selbstprüfung der Anwendungslogik anhand synthetischer
Testdaten ausführt — Ihr aktives Workbook bleibt dabei unverändert. Diese
Funktion richtet sich an technisch interessierte Anwender und wird auch
automatisch beim Versuch einer Freigabe ausgeführt (siehe
[Kapitel 24](24-freigabe.md)).

## Warum sehe ich keine automatische Übernahme meiner Werte in andere Felder?

Das Starter Kit erfindet grundsätzlich keine Werte, die Sie nicht selbst
eingegeben haben — z. B. wird eine Mindestfähigkeit nie automatisch aus
einem Prozentwert in eine Menge umgerechnet (siehe
[Kapitel 9](09-mindestfaehigkeit.md)), und ein Reviewtermin wird nie ohne
hinterlegte Zykluspolicy erfunden (siehe [Kapitel 18](18-reviewzyklen.md)).
Das ist Absicht: lieber eine sichtbare Lücke als ein erfundener Wert.

## Verwandte Kapitel

- [Das Workbook: Speichern, Dateien und Sicherung](04-workbook.md)
- [Datensicherung und Wiederherstellung](26-datensicherung-recovery.md)
- [Import, Export und Verschlüsselung](25-import-export-verschluesselung.md)
