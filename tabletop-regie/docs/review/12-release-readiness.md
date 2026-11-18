# 12 – Release Readiness

Stand: siehe `manifest.json`.

## 1. Freigabeaussage

**Technische und redaktionelle Vorabnahme bestanden – keine Pilotfreigabe.** Für beide Szenarien sind Drehbuch, Ablauflogik, Zustellung, Vertraulichkeit, Bühne, Ton, Abschluss und Export automatisiert und nachvollziehbar geprüft. Eine Pilotfreigabe erteilt dieses Paket ausdrücklich nicht: Sie setzt die fachliche Prüfung durch die Verantwortlichen, einen moderierten Probelauf mit echten Personen und die unten offenen Punkte voraus.

## 2. Abnahmekriterien

| Nr. | Kriterium | Stand | Beleg |
|---|---|---|---|
| F1 | Alle Funktionen mit Beleg im Code und ehrlichem Status | erfüllt | 07 |
| F2 | Keine Tests behauptet, die nicht ausgeführt wurden | erfüllt; nicht Getestetes ist benannt | 07, `testberichte/` |
| F3 | Beide Szenarien gegen dieselben Kriterien geprüft | erfüllt | 07 Abschnitt 2, Variantenprüfung in 04/05 |
| F4 | Alle 25 Kombinationen aus Dauer und Schwerpunkt ohne Befund | erfüllt (beide) | Anhang 04/05 |
| F5 | Alle Entscheidungskombinationen (16 / 32) schlüssig, Rechnung nachvollziehbar | erfüllt (beide) | Anhang 04/05, 10 |
| F6 | Keine vertraulichen Informationen auf der Bühne | erfüllt (automatische Leak-Prüfung, 0 Treffer) | `testberichte/testbericht.md` V1 |
| F7 | Zehn Negativtests mit Methode, Erwartung, Beobachtung | erfüllt | 07 Abschnitt 3 |
| F8 | Bühne und Ton im Browser geprüft, jede Karte fotografiert | erfüllt (Chromium) | `screenshots/`, Testbericht |
| F9 | Sicherheitsbefunde der Inventur behoben oder als Restrisiko benannt | erfüllt | 03, Sicherheitstest 10/10 |
| F10 | Unabhängige Prüfung von Waterkant durchgeführt, Befunde bearbeitet | siehe 11 | 11 |
| F11 | Neue Medien rechtlich geklärt | **offen** – technisch geprüft, nicht endgültig freigegeben | 08 Abschnitt 2 |
| F12 | Paket ohne Repository prüfbar, ohne Passwörter, Tokens, reale Adressen | erfüllt (automatische Prüfung beim Bau des Pakets) | `manifest.json` |
| F13 | Moderierter Probelauf mit echten Personen | **offen** | – |
| F14 | Fachliche Prüfung von Annahmen (Versicherung, Verträge, Arbeitsschutz, Datenschutz) durch zuständige Fachabteilungen | **offen** | 10, 11 |

## 3. Offene Prüfschritte vor einem Pilot

1. Moderierter Probelauf je Szenario (mind. 90 Minuten, Schwerpunkt nach Zielgruppe) mit Protokoll; besonders B7 (Stellvertretung) beobachten.
2. Echten SMTP-Zugang mit TLS testen (Testmail, ein Lauf im Testmodus, danach ein Lauf mit zwei echten Postfächern).
3. Zielbrowser prüfen (z. B. Edge/Firefox auf dem Moderationsrechner, Ton freigeben, zweiter Bildschirm).
4. Waterkant-Medien und Stimmen anhören und abnehmen lassen; Rechteklärung dokumentieren.
5. Annahmen der Rechnungen und Fristen von Fachabteilungen bestätigen lassen (kein Rechts- oder Versicherungsrat in den Karten; Hinweise „fachlich prüfen lassen“ bleiben).
6. Urkunden, Testmodus und Teilnehmer-Import einmal durchklicken (in dieser Runde nicht getestet).

## 4. Restrisiken

| Risiko | Auswirkung | Umgang |
|---|---|---|
| Keine Anmeldung; Moderationsdaten über die API abrufbar | Wer den Server erreicht, sieht alle vertraulichen Karten und kann Einstellungen ändern (auch Mailumleitung) | Standard nur `127.0.0.1`; Netzbetrieb nur bewusst und nur im vertrauenswürdigen Netz (README) |
| Namen auf dem Spielbrett der Bühne | Namen der Teilnehmenden sind für alle sichtbar | bei Bedarf Funktionsnamen statt Personennamen eintragen |
| Kein erneuter Versand fehlgeschlagener Mails | Karte erreicht die Person nicht | Moderation sieht den Fehler rot im Log und gibt die Karte mündlich oder auf Papier weiter |
| Ausfallzeit zählt als Übungszeit; Stummschaltung nach Neustart aufgehoben | nach einem Absturz verschiebt sich der Plan | Pause vor geplanten Unterbrechungen; nach Neustart Ton prüfen |
| Einstellungen und Laufdaten im Klartext unter `data/` | SMTP-Passwort lesbar für alle mit Zugriff auf den Rechner | Rechner der Moderation schützen; Export enthält kein Passwort |
| Nur Chromium getestet | Darstellung oder Ton in anderen Browsern ungeprüft | Prüfschritt 3 |
| Synthetische Stimmen nicht angehört | Aussprache oder Betonung unpassend | Prüfschritt 4; Ton jederzeit stummschaltbar, Sprechertext liegt der Moderation vor |
