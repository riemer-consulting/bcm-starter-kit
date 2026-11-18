# 01 – Management Summary

Stand: siehe `manifest.json` (Commit, Erstellungszeit, Prüfsummen).

## Worum es geht

Die **Tabletop-Regie** führt moderierte Krisenstabsübungen (BCM) automatisch durch: öffentliche Lagen auf einer Bühne, vertrauliche Informationen per E-Mail an einzelne Rollen, Entscheidungen mit Folgen, Überraschungen und eine fiktive Schadensrechnung zum Abschluss. Das Werkzeug läuft lokal auf dem Rechner der Moderation. Dieses Paket ist die abschließende Qualitätssicherung für zwei Szenarien:

- **NordTech – 7 Tage im Ausnahmezustand:** Ransomware in einem produzierenden Unternehmen. Nach Red-Team-Test und Vorabnahme **eingefroren**; in dieser Runde nur geprüft, nicht verändert.
- **Waterkant – Wenn das Rechenzentrum brennt:** Brand im eigenen Rechenzentrum einer Baumarktkette, die auch neun Partnermärkte mit IT versorgt. In dieser Runde **neu ausgearbeitet**; die alte Fassung ist archiviert.

## Ergebnis in fünf Punkten

1. **Beide Szenarien bestehen dieselben automatisierten Prüfungen:** alle 25 Kombinationen aus Dauer (45–180 Min.) und Schwerpunkt, alle 16 bzw. 32 Entscheidungskombinationen, Zustellung vertraulicher Karten an die richtigen Personen, keine vertraulichen Inhalte auf der Bühne, Rechnung nachvollziehbar.
2. **67 von 67 automatisierten Laufzeit-, Browser- und Sicherheitsprüfungen bestanden**, darunter zehn Negativtests (Mailausfall, Neustart, Stummschalten und Zeitsprung im Ton, zu frühe Überraschung, fehlende Rolle, Pause, geänderte Entscheidung, Doppelauslösung, fehlendes Medium). Jede Lage und jede öffentliche Überraschung beider Szenarien wurde im Browser angezeigt und fotografiert.
3. **Sechs Sicherheitsbefunde behoben:** Das Werkzeug ist jetzt standardmäßig nur auf dem eigenen Rechner erreichbar; der Vorlagen-Export enthält kein Passwort mehr; Pfad-, Upload- und Eingabeprüfungen sind ergänzt; Doppelversand ist gesperrt. Verbleibend: keine Anmeldung (Schutz durch lokalen Betrieb).
4. **Waterkant** hat jetzt echte Entscheidungen (vorher keine), öffentliche Überraschungen einschließlich eines Stellvertretungstests, Partner mit vertraglichem Wiederherstellungsziel, eine hergeleitete Rechnung mit getrennter, unbestätigter Erstattungsannahme und vier Schwerpunkte. Eigene Prüfungen fanden vier Spielbarkeitsfehler. Eine unabhängige Prüfung fand danach 39 inhaltliche Befunde, davon 11 mit hoher Dringlichkeit, unter anderem nicht schlüssige Folgen von Entscheidungen, eine Rechnung, die immer die Lehrbuch-Antwort belohnte, und Alarm-Einspielungen ohne ausreichende gesprochene Rahmung als Übung. Alle hohen und zehn weitere Befunde sind umgesetzt und erneut getestet; 18 mittlere und niedrige sind mit Begründung offen (Dokument 11).
5. **Ehrlich offen:** Bedienoberfläche des Setups, andere Browser, echter Mailserver mit TLS, Urkunden und Testmodus sind in dieser Runde nicht getestet; neue Medien und synthetische Stimmen sind technisch geprüft, aber nicht angehört und nicht rechtlich freigegeben.

## Freigabestand

**Technische und redaktionelle Vorabnahme bestanden – keine Pilotfreigabe.** Vor einem Pilot sind ein moderierter Probelauf mit echten Personen, die Rechteklärung der neuen Medien und die fachliche Bestätigung der Annahmen (Versicherung, Verträge, Arbeitsschutz) nötig (Dokument 12).

## Hinweis

Alle Unternehmen, Personen, Beträge und Fristen sind fiktiv. Die Karten enthalten keine Rechtsberatung; bei rechtlichen, versicherungs- oder datenschutzrechtlichen Fragen sind die zuständigen Fachabteilungen einzubeziehen.

## Wegweiser

| Frage | Dokument |
|---|---|
| Was kann das Werkzeug, wer nutzt es wie? | 02 |
| Wie ist es gebaut, wo fließen Daten? | 03 |
| Was steht in den Szenarien? | 04, 05, 06, 09 |
| Was ist getestet, was nicht? | 07, `testberichte/` |
| Medien, Töne, Rechte? | 08 |
| Schaden, Verträge, Versicherung? | 10 |
| Was hat die unabhängige Prüfung gefunden? | 11 |
| Was fehlt bis zum Pilot? | 12 |
