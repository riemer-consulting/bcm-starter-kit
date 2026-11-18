# 07 – Funktions- und Testmatrix

{{STAND}}

## 1. Wie diese Matrix entstanden ist

- **Funktionskatalog:** technische Inventur ausschließlich aus dem Quellcode (85 Funktionen mit Beleg `Datei:Zeile`), danach mit dem README abgeglichen (Abschnitte 5 und 6 unten).
- **Status Umsetzung:** implementiert / teilweise implementiert / nur dokumentiert / nicht vorhanden. Befunde, die in dieser Runde behoben wurden, sind gekennzeichnet.
- **Status Test:** „implementiert und getestet“ nur, wenn in dieser Runde ein automatisierter Test die Funktion tatsächlich ausgeführt hat. Alles andere heißt „nicht getestet“ – auch wenn die Funktion in einer früheren Runde schon einmal geprüft wurde. Es werden keine Tests behauptet, die nicht gelaufen sind.
- **Testbelege:** `VAL` Drehbuchprüfung · `VAR` Variantenprüfung · `LAUF` Lauftest mit echtem Server und SMTP-Testempfänger · `BUE` Browsertest (Chromium) · `SEC` Sicherheitstest · `GES` Geschichten-Generator · `MED` Medienliste. Ergebnisse: `testberichte/testbericht.md` und Rohdaten im selben Ordner.

**Ergebnis der automatisierten Prüfungen dieser Runde:** {{SUMME}} bestanden; Drehbuch- und Variantenprüfung beider Szenarien ohne Befund.

## 2. Testarten je Szenario

| Testart | Methode | NordTech | Waterkant |
|---|---|---|---|
| Datenintegrität | `npm run pruefen`: Pflichtfelder, IDs, Verweise, Medien vorhanden, Rollenabdeckung je Dauer, Zufallsstichproben | bestanden | bestanden (0 Fehler, Hinweise zu Folgen auf Lagen mit Priorität 2/3) |
| Reihenfolge | `VAR`: keine doppelte Karte, Akte in Reihenfolge, vertrauliche Karte nie vor ihrer Lage | 25/25 | 25/25 |
| Abhängigkeiten | `VAR`: Voraussetzung und „zu Beginn von“ eingehalten; `LAUF N5`: Überraschung vor ihrer Lage abgelehnt | bestanden | bestanden |
| Vertrauliche Zustellung | `LAUF M2`: jede ausgelöste Karte genau einmal bei genau den Personen der Rolle (inkl. Team) | bestanden | bestanden |
| Stellvertretende Rollen | `LAUF M5`: eine Rolle bewusst unbesetzt, Karten an Ersatzrolle mit Hinweis; `N6`: Überraschung ohne Pflichtrolle abgelehnt; private Überraschung ohne erreichbare Rolle → Warnung | bestanden | bestanden |
| Alle Entscheidungskombinationen | `VAR`: 16 bzw. 32 Kombinationen; Folgen nach der Entscheidung, Folgekarten markiert, Posten vorhanden, Rechnung = Grundschaden + Posten | 16/16 | 32/32 |
| Folgekarten | `LAUF M3` (zugestellt, sobald ihre Lage gespielt ist) + `VAR` | bestanden | bestanden |
| Dauern | `VAR`: 45/60/90/120/180 Min. in der Zieldauer | bestanden | bestanden (nach Korrektur LK18) |
| Schwerpunkte | `VAR`: Pflichtkarte in jeder Dauer enthalten | bestanden | bestanden (nach Korrektur Pflichtkarte) |
| Rechnungen | `VAR` für alle Kombinationen; `LAUF R1`: Abschluss im laufenden Werkzeug | bestanden | bestanden |
| Browser Moderation | `BUE M`: Moderation vor, während, nach dem Lauf; keine Browserfehler | bestanden | bestanden |
| Browser Bühne | `BUE G`: jede Lage und jede öffentliche Überraschung angezeigt und fotografiert | 26 Lagen + 3 Überraschungen | 28 Lagen + 4 Überraschungen |
| Audio | `BUE G` (vorgesehener Ton startet), `N3` (stumm), `N4` (Zeitsprung) | bestanden | bestanden |
| SMTP | `LAUF M1–M4` gegen lokalen SMTP-Testempfänger; Betreff und Empfänger je Mail ausgewertet | bestanden | bestanden |
| Export | `LAUF P1` (Übungsprotokoll), `SEC` (Vorlage ohne Passwort) | bestanden | bestanden |
| Leak-Prüfung | `LAUF V1`: Bühnen- und Ablaufdaten gegen alle vertraulichen Texte (Karten, Bewertungshinweise, Varianten, private Überraschungen, Entscheidungshinweise, Gesprächsleitfäden) und Mailadressen | 0 Treffer | 0 Treffer |

Nicht getestet wurden: Bedienoberfläche des Setups (Klickwege), Firefox/Safari/Edge, echter SMTP-Anbieter mit TLS, Netzwerkausfall zwischen Browser und Server, Urkunden, Testmodus, Teilnehmer-Import. Diese Punkte stehen in `12-release-readiness.md` als offene Prüfschritte.

## 3. Negativtests

| Nr. | Fall | Methode | Erwartet | Beobachtet (beide Szenarien) |
|---|---|---|---|---|
| N1 | E-Mail schlägt fehl | SMTP-Port auf nicht erreichbaren Port, vertrauliche Karte auslösen | Lauf geht weiter, Fehler je Person im Log, Karte als ausgelöst mit Fehlerstatus | wie erwartet; **kein Knopf für erneuten Versand** – Moderation muss die Karte vorlesen oder weitergeben |
| N2 | Neuladen / Neustart | Server mitten im Lauf beenden und neu starten; Bühne im Browser neu laden | Lauf, Entscheidungen, Karten und Lage bleiben; keine Doppelzustellung; Bühne zeigt sofort die Lage | wie erwartet; Ausfallzeit zählt als Übungszeit; Stummschaltung ist nach Neustart aufgehoben; Ton braucht nach Neuladen einen Klick (Browserregel) |
| N3 | Stummschalten mitten im Ton | Ton läuft, Moderation schaltet stumm | Ton stoppt sofort; startet nach Aufheben nicht ungefragt neu; „Ton erneut abspielen“ startet ihn | wie erwartet (≤ 3 s) |
| N4 | Zeitsprung mitten im Ton | Ton läuft, Sprung zur nächsten Lage | alter Ton endet; neue Lage spielt ihren eigenen Ton oder bleibt still | wie erwartet |
| N5 | Überraschung zu früh | öffentliche Überraschung vor Start, im Countdown und vor ihrer Lage auslösen | abgelehnt mit Begründung | wie erwartet (HTTP 400 mit Text „Diese Karte passt erst nach …“) |
| N6 | Fehlende Rolle | Überraschung mit Pflichtrolle ohne diese Rolle; private Überraschung ohne erreichbare Rolle | abgelehnt bzw. Warnung, keine Mail | wie erwartet; Moderation sieht vorab „nur wenn … besetzt ist“ |
| N7 | Timer-Pause | Pause 4 s, dann fortsetzen | Zeit steht, läuft danach weiter | wie erwartet |
| N8 | Entscheidung geändert | erste Entscheidung festhalten, dann umentscheiden | Posten und Folgen folgen der neuen Entscheidung | wie erwartet; eine bereits zugestellte Folgekarte bleibt zugestellt (Mail lässt sich nicht zurückholen) |
| N9 | Doppelauslösung | vertrauliche Karte dreimal gleichzeitig; öffentliche Überraschung zweimal | genau eine Mail je Person; zweite Überraschung abgelehnt | wie erwartet (vor der Korrektur in dieser Runde war Doppelversand möglich) |
| N10 | Fehlendes Medium | Kopie des Drehbuchs mit nicht vorhandener Bilddatei prüfen; Datei abrufen | Prüfung meldet die Datei als Fehler; Server liefert 404 statt abzustürzen | wie erwartet; die Bühne selbst zeigt bei fehlendem Bild keinen eigenen Hinweis |
