# Testberichte

Stand: 2026-11-18 · Codestand `07b0fb2`

**Summe:** 67 von 67 automatisierten Prüfungen bestanden (ohne Drehbuch- und Variantenprüfung, die als eigene Berichte vorliegen).

Jede Zeile ist eine tatsächlich ausgeführte Prüfung. „Erwartet“ und „Beobachtet“ stammen aus dem Testlauf selbst (Rohdaten als JSON im selben Ordner).

## Drehbuchprüfung (`npm run pruefen`)

```
scenario.nordtech.json: 0 Fehler, 0 Hinweise

scenario.waterkant.json: 0 Fehler, 8 Hinweise
  Hinweis Weiche W1/herunterfahren: Folge-Lagekarte LK19 hat nicht Priorität 1 – die Folge kann entfallen.
  Hinweis Weiche W1/weiterlaufen: Folge-Lagekarte LK08 hat nicht Priorität 1 – die Folge kann entfallen.
  Hinweis Weiche W2/spaeter: Folge-Lagekarte LK18 hat nicht Priorität 1 – die Folge kann entfallen.
  Hinweis Weiche W3/bergen: Folge-Lagekarte LK23 hat nicht Priorität 1 – die Folge kann entfallen.
  Hinweis Weiche W3/abwarten: Folge-Lagekarte LK23 hat nicht Priorität 1 – die Folge kann entfallen.
  Hinweis Weiche W4/minimal: Folge-Lagekarte LK25 hat nicht Priorität 1 – die Folge kann entfallen.
  Hinweis Weiche W4/ausbauen: Folge-Lagekarte LK25 hat nicht Priorität 1 – die Folge kann entfallen.
  Hinweis Weiche W4/ausbauen: LK25 hat nicht Priorität 1 – die Folgekarte kann entfallen.

Alle Drehbücher in Ordnung.
```

## Lauftest NordTech (90 Min., 2026-11-18 16:35 UTC)

### Ergebnisse

| ID | Prüfung | Ergebnis | Erwartet | Beobachtet |
|---|---|---|---|---|
| M1 | Begrüßung und Rollenbriefing je Person genau einmal | bestanden | 9 Personen: je 1 Begrüßung, je 1 Briefing | Begrüßungen 9, Briefings 9, Personen 9 |
| N5 | Öffentliche Überraschung vor laufender Lage | bestanden | abgelehnt mit verständlicher Meldung; nichts auf der Bühne | vor Start: HTTP 400 „Diese Karte passt erst nach LK22.“; im Countdown: HTTP 400 |
| N5 | Überraschung B6 vor ihrer Lage LK22 | bestanden | abgelehnt | HTTP 400 „Diese Karte passt erst nach LK22.“ |
| N7 | Timer-Pause | bestanden | Zeit steht während der Pause und läuft danach weiter | vor Pause 0 Min., nach 4 s Pause 0 Min., 2,5 s nach Fortsetzen 0.1 Min. |
| N8 | Entscheidung W1 geändert (am-netz → trennen) | bestanden | Posten der Rechnung folgen der neuen Entscheidung; Folgen der alten Option entfallen | Posten vorher (Option 1): ot-ausbreitung; danach aktiv: keine; Bühne vorher Lage LK02 |
| N6 | Private Überraschung B1: weder it-mitarbeiter noch Ersatzrolle besetzt | bestanden | keine Mail; Warnung im Moderations-Log (Moderation entscheidet, ob sie die Karte mündlich einbringt) | HTTP 200; Mails 0; Log: warn „Bonuskarte B1 ausgelöst, aber weder IT-Fachkraft (Vertretung IT-Leitung) (niemand besetzt) noch eine Ersatzrolle ist besetzt.“ |
| N9 | Doppelauslösung: SK07 dreimal gleichzeitig | bestanden | genau 1 Mail(s) (eine je Person der Rolle) | 1 Mail(s) |
| N9 | Doppelauslösung: öffentliche Überraschung B6 zweimal | bestanden | erste angenommen, zweite abgelehnt | HTTP 200, dann HTTP 400 „Diese Karte wurde schon ausgelöst.“ |
| N6 | Überraschung B7 braucht geschaeftsfuehrer-ceo | bestanden | Rolle besetzt → angenommen | Rolle besetzt: HTTP 200  |
| M2 | Jede ausgelöste vertrauliche Karte genau einmal bei den richtigen Personen | bestanden | alle Empfänger der Rolle (inkl. Team), niemand sonst, keine Doppelung | 17 Karten, 22 Mails, Abweichungen: keine |
| M3 | Folgekarten der gewählten Entscheidungen | bestanden | Folgekarte kommt, sobald ihre Lage gespielt ist | SK43 bei LK07: Lage gespielt, zugestellt; SK44 bei LK12: Lage gespielt, zugestellt; SK27 bei LK17: Lage gespielt, zugestellt |
| M4 | Private Überraschung per Mail, öffentliche nur auf der Bühne | bestanden | B2 per Mail an kommunikation-marketing; B6 auf der Bühne, keine Mail | B2: person7@example.com; B6: Mails 0, Bühne zeigt Ereignis |
| M5 | Ersatzrolle (Rolle leiter-it bewusst nicht besetzt) | bestanden | Karten der freien Rolle gehen an die Ersatzrolle, mit Hinweis im Text | 4 Karte(n) an Ersatzrolle (SK45→leitung-produktion, SK01→geschaeftsfuehrer-ceo, SK15→notfallmanagement-bcm, SK27→geschaeftsfuehrer-ceo), davon mit Hinweis: 4 |
| V1 | Keine vertraulichen Inhalte in Bühnen- und Ablaufdaten | bestanden | kein Text vertraulicher Karten, Moderationshinweise, Gesprächsleitfäden, privater Überraschungen; keine Mailadressen | 164 Texte geprüft; Treffer: keine; Adressen: 0 |
| N1 | Mailversand schlägt fehl (SMTP nicht erreichbar) | bestanden | Lauf geht weiter; Fehler im Moderations-Log je Person; Karte als ausgelöst mit Fehlerstatus vermerkt; keine erneute automatische Zustellung | HTTP 200; Status running; Log-Einträge „fehlgeschlagen“: 1; Ergebnis je Person: Fehler; Hinweis: kein Knopf für erneuten Versand vorhanden – Moderation muss die Karte vorlesen oder manuell weitergeben |
| N2 | Server-Neustart mitten im Lauf | bestanden | Lauf, Entscheidungen, ausgelöste Karten und aktuelle Lage bleiben erhalten; keine Karte wird doppelt verschickt | Status running→running; Karten 18→18; Lage LK21→LK21; Zeit 72.1→72.1 Min. (die Ausfallzeit zählt als Übungszeit); Stummschaltung danach: aus |
| N2 | Nach Neustart keine Doppelzustellung | bestanden | jede Karte je Person höchstens einmal | 0 doppelte Zustellungen |
| R1 | Rechnung im Abschluss | bestanden | Brutto 7010000 € = Grundschaden 4260000 € + Posten der gewählten Optionen 2750000 €; Erstattung 1400000 € (Modellannahme); beim Unternehmen 5610000 € | Brutto 7010000 €, Erstattung 1400000 €, beim Unternehmen 5610000 € |
| P1 | Übungsprotokoll (Export) | bestanden | Entscheidungen mit Wortlaut, Abschnitt Überraschungen, keine Namen oder Adressen, kein Passwort | 13950 Zeichen; Entscheidungen enthalten: 4/4; Namen/Adressen: 0 |
| N10 | Fehlende Mediendatei | bestanden | Prüfung meldet die fehlende Datei als Fehler, bevor geübt wird; Server liefert 404 statt Absturz | Prüfung: „FEHLER  Karte LK01 (Bild): Datei /media/gibt-es-nicht.png fehlt.“; HTTP 404 |
| N6 | Überraschung B7, Pflichtrolle geschaeftsfuehrer-ceo nicht besetzt | bestanden | abgelehnt mit Begründung; Moderation sieht vorab, warum die Karte nicht passt | HTTP 400 „Diese Karte setzt voraus, dass Geschäftsführung (CEO), Krisenstabsleitung besetzt ist.“; Anzeige in der Moderation: ["nur wenn Geschäftsführung (CEO), Krisenstabsleitung besetzt ist"] |

## Browsertest NordTech (Chromium, 2026-11-18 16:54 UTC)

### Ergebnisse

| ID | Prüfung | Ergebnis | Erwartet | Beobachtet |
|---|---|---|---|---|
| B | Unterbrechung B7 (Geschäftsführung (CEO), Krisenstabsleitung, 5 Min.) | bestanden | Bühne zeigt die Unterbrechung mit Restzeit; Moderation sieht Rolle und Rückkehr | Bühne enthält Zeitangabe: ja; Moderation erwähnt B7: ja |
| G | Generalprobe: 26 Lagen und 3 öffentliche Überraschungen | bestanden | jedes Bild geladen; jeder vorgesehene Ton gestartet; Übungshinweis sichtbar, wo vorgesehen | 29 Bühnenzustände; Abweichungen: keine |
| N3 | Stummschalten mitten im Ton (LK10) | bestanden | Kartenton stoppt sofort (≤ 3 s); nach Aufheben startet er nicht ungefragt neu, sondern über „Ton erneut abspielen“ (Hintergrundton gibt es nur vor der Krise und in den Vorboten) | vorher: läuft lk10-nordkanal-nachrichten.mp3; nach Stumm: Kartenton aus, Hintergrund aus; nach Aufheben: Kartenton aus, Hintergrund aus |
| N3 | Ton erneut abspielen nach Stummschaltung | bestanden | Kartenton startet von vorn | Kartenton läuft (lk10-nordkanal-nachrichten.mp3, 1.9 s) |
| N4 | Zeitsprung mitten im Ton (LK10 → LK11) | bestanden | alter Ton endet; neue Lage ohne eigenen Ton bleibt still | danach: Kartenton aus; Hintergrund aus |
| N2 | Bühne neu laden mitten im Lauf | bestanden | Bühne zeigt sofort wieder die aktuelle Lage; Ton braucht einen Klick (Browserregel) | Ton-Freigabe angezeigt: ja; aktuelle Lage „Pharmakunde eskaliert“ sichtbar: ja; nach Klick Hintergrund aus |
| F | Abschluss auf der Bühne bis zum Fazit | bestanden | Nacharbeiten, Rechnung, Bilanz, Einordnung und Fazit erscheinen nacheinander | 6 Bildschirmfotos, letzte Phase: fazit |
| M | Keine Browserfehler in Bühne und Moderation | bestanden | keine JavaScript-Fehler | keine |

### Generalprobe: jede Lage und jede öffentliche Überraschung auf der Bühne

| ID | Titel | Bildschirmfoto | Bild geladen | vorgesehener Ton | beobachteter Ton | Übungshinweis |
|---|---|---|---|---|---|---|
| LK18 | Anmeldung hakt | `screenshots/nordtech/02-LK18.png` | ja | – | – | – |
| LK19 | Maschine 4 verhält sich seltsam | `screenshots/nordtech/03-LK19.png` | ja | lk19-fraeslinie-stoerung.mp3 | lk19-fraeslinie-stoerung.mp3 | – |
| LK20 | Keine Aufträge mehr | `screenshots/nordtech/04-LK20.png` | ja | – | – | – |
| LK01 | Cyberangriff | `screenshots/nordtech/05-LK01.png` | ja | lk01-stille-gemurmel.mp3 | lk01-stille-gemurmel.mp3 | – |
| LK16 | OT-Trennung | `screenshots/nordtech/06-LK16.png` | ja | – | – | – |
| LK02 | Produktion stoppt | `screenshots/nordtech/07-LK02.png` | ja | lk02-produktion-faehrt-herunter.mp3 | lk02-produktion-faehrt-herunter.mp3 | – |
| LK22 | Kommunikation ohne IT | `screenshots/nordtech/08-LK22.png` | ja | lk22-funk-abgebrochen.mp3 | lk22-funk-abgebrochen.mp3 | – |
| B6 | Zwei widersprüchliche Anweisungen | `screenshots/nordtech/09-B6.png` | ja | b6-zwei-durchsagen.mp3 | b6-zwei-durchsagen.mp3 | – |
| LK03 | LinkedIn-Beitrag | `screenshots/nordtech/10-LK03.png` | ja | – | – | – |
| LK04 | Nordkanal-Anfrage | `screenshots/nordtech/11-LK04.png` | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – |
| LK23 | Wer darf ins Werk? | `screenshots/nordtech/12-LK23.png` | ja | funk-ruf.mp3 | funk-ruf.mp3 (bereits zu Ende) | – |
| LK05 | Schlüsselperson fällt aus | `screenshots/nordtech/13-LK05.png` | ja | lk05-it-bereitschaft.mp3 | lk05-it-bereitschaft.mp3 | – |
| LK06 | Kunde eskaliert | `screenshots/nordtech/14-LK06.png` | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – |
| LK07 | Datenschutz | `screenshots/nordtech/15-LK07.png` | ja | – | – | – |
| LK08 | Positive Entwicklung | `screenshots/nordtech/16-LK08.png` | ja | – | – | – |
| LK09 | Backups gefunden | `screenshots/nordtech/17-LK09.png` | ja | – | – | – |
| LK24 | Wer bekommt das erste System? | `screenshots/nordtech/18-LK24.png` | ja | – | – | – |
| LK17 | Beirat fordert Lagebericht | `screenshots/nordtech/19-LK17.png` | ja | – | – | – |
| B7 | Die Krisenstabsleitung ist nicht erreichbar | `screenshots/nordtech/20-B7.png` | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – |
| LK10 | Nordkanal-Sonderbericht | `screenshots/nordtech/21-LK10.png` | ja | lk10-nordkanal-nachrichten.mp3 | lk10-nordkanal-nachrichten.mp3 | – |
| LK11 | Pharmakunde eskaliert | `screenshots/nordtech/22-LK11.png` | ja | – | – | – |
| LK12 | Teilweiser Wiederanlauf | `screenshots/nordtech/23-LK12.png` | ja | lk12-anlage-faehrt-hoch.mp3 | lk12-anlage-faehrt-hoch.mp3 | – |
| LK13 | Cyberversicherung | `screenshots/nordtech/24-LK13.png` | ja | – | – | – |
| LK21 | Chargenfreigabe | `screenshots/nordtech/25-LK21.png` | ja | – | – | – |
| LK14 | ERP-Testbetrieb | `screenshots/nordtech/26-LK14.png` | ja | – | – | – |
| B8 | Ein vermeintlicher Erfolg | `screenshots/nordtech/27-B8.png` | ja | b8-erp-test-meldung.mp3 | b8-erp-test-meldung.mp3 | – |
| LK25 | Zwei Listen, zwei Wahrheiten | `screenshots/nordtech/28-LK25.png` | ja | – | – | – |
| LK15 | Wiederanlauf | `screenshots/nordtech/29-LK15.png` | ja | – | – | – |
| LK26 | Die Menschen sind am Limit | `screenshots/nordtech/30-LK26.png` | ja | lk26-schichtleitung-nachricht.mp3 | lk26-schichtleitung-nachricht.mp3 | – |

## Lauftest Waterkant (90 Min., 2026-11-18 16:37 UTC)

### Ergebnisse

| ID | Prüfung | Ergebnis | Erwartet | Beobachtet |
|---|---|---|---|---|
| M1 | Begrüßung und Rollenbriefing je Person genau einmal | bestanden | 9 Personen: je 1 Begrüßung, je 1 Briefing | Begrüßungen 9, Briefings 9, Personen 9 |
| N5 | Öffentliche Überraschung vor laufender Lage | bestanden | abgelehnt mit verständlicher Meldung; nichts auf der Bühne | vor Start: HTTP 400 „Diese Karte passt erst nach LK14.“; im Countdown: HTTP 400 |
| N5 | Überraschung B1 vor ihrer Lage LK15 | bestanden | abgelehnt | HTTP 400 „Diese Karte passt erst nach LK15.“ |
| N7 | Timer-Pause | bestanden | Zeit steht während der Pause und läuft danach weiter | vor Pause 0 Min., nach 4 s Pause 0 Min., 2,5 s nach Fortsetzen 0.1 Min. |
| N8 | Entscheidung W1 geändert (herunterfahren → weiterlaufen) | bestanden | Posten der Rechnung folgen der neuen Entscheidung; Folgen der alten Option entfallen | Posten vorher (Option 1): preisuebertragung; danach aktiv: datenbankreparatur; Bühne vorher Lage LK03 |
| N9 | Doppelauslösung: SK01 dreimal gleichzeitig | bestanden | genau 1 Mail(s) (eine je Person der Rolle) | 1 Mail(s) |
| N9 | Doppelauslösung: öffentliche Überraschung B5 zweimal | bestanden | erste angenommen, zweite abgelehnt | HTTP 200, dann HTTP 400 „Diese Karte wurde schon ausgelöst.“ |
| N6 | Überraschung B7 braucht leiter-it | bestanden | Rolle besetzt → angenommen | Rolle besetzt: HTTP 200  |
| M2 | Jede ausgelöste vertrauliche Karte genau einmal bei den richtigen Personen | bestanden | alle Empfänger der Rolle (inkl. Team), niemand sonst, keine Doppelung | 19 Karten, 22 Mails, Abweichungen: keine |
| M3 | Folgekarten der gewählten Entscheidungen | bestanden | Folgekarte kommt, sobald ihre Lage gespielt ist | SK41 bei LK15: Lage gespielt, zugestellt; SK42 bei LK14: Lage gespielt, zugestellt; SK45 bei LK25: Lage nicht gespielt, nicht zugestellt; SK44 bei LK22: Lage gespielt, zugestellt |
| M4 | Private Überraschung per Mail, öffentliche nur auf der Bühne | bestanden | B1 per Mail an leiter-it; B5 auf der Bühne, keine Mail | B1: person2@example.com; B5: Mails 0, Bühne zeigt Ereignis |
| M5 | Ersatzrolle (Rolle facility-management bewusst nicht besetzt) | bestanden | Karten der freien Rolle gehen an die Ersatzrolle, mit Hinweis im Text | 6 Karte(n) an Ersatzrolle (SK04→leiter-arbeitssicherheit, SK08→leiter-it, SK35→leiter-it, SK13→leiter-arbeitssicherheit, SK18→leiter-finanzen-cfo, SK24→leiterin-kommunikation-pr), davon mit Hinweis: 6 |
| V1 | Keine vertraulichen Inhalte in Bühnen- und Ablaufdaten | bestanden | kein Text vertraulicher Karten, Moderationshinweise, Gesprächsleitfäden, privater Überraschungen; keine Mailadressen | 150 Texte geprüft; Treffer: keine; Adressen: 0 |
| N1 | Mailversand schlägt fehl (SMTP nicht erreichbar) | bestanden | Lauf geht weiter; Fehler im Moderations-Log je Person; Karte als ausgelöst mit Fehlerstatus vermerkt; keine erneute automatische Zustellung | HTTP 200; Status running; Log-Einträge „fehlgeschlagen“: 1; Ergebnis je Person: Fehler; Hinweis: kein Knopf für erneuten Versand vorhanden – Moderation muss die Karte vorlesen oder manuell weitergeben |
| N2 | Server-Neustart mitten im Lauf | bestanden | Lauf, Entscheidungen, ausgelöste Karten und aktuelle Lage bleiben erhalten; keine Karte wird doppelt verschickt | Status running→running; Karten 20→20; Lage LK22→LK22; Zeit 72.1→72.1 Min. (die Ausfallzeit zählt als Übungszeit); Stummschaltung danach: aus |
| N2 | Nach Neustart keine Doppelzustellung | bestanden | jede Karte je Person höchstens einmal | 0 doppelte Zustellungen |
| R1 | Rechnung im Abschluss | bestanden | Brutto 3751000 € = Grundschaden 3176000 € + Posten der gewählten Optionen 575000 €; Erstattung 1600000 € (Modellannahme); beim Unternehmen 2151000 € | Brutto 3751000 €, Erstattung 1600000 €, beim Unternehmen 2151000 € |
| P1 | Übungsprotokoll (Export) | bestanden | Entscheidungen mit Wortlaut, Abschnitt Überraschungen, keine Namen oder Adressen, kein Passwort | 14607 Zeichen; Entscheidungen enthalten: 5/5; Namen/Adressen: 0 |
| N10 | Fehlende Mediendatei | bestanden | Prüfung meldet die fehlende Datei als Fehler, bevor geübt wird; Server liefert 404 statt Absturz | Prüfung: „FEHLER  Karte LK01 (Bild): Datei /media/gibt-es-nicht.png fehlt.“; HTTP 404 |
| N6 | Überraschung B7, Pflichtrolle leiter-it nicht besetzt | bestanden | abgelehnt mit Begründung; Moderation sieht vorab, warum die Karte nicht passt | HTTP 400 „Diese Karte setzt voraus, dass IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) besetzt ist.“; Anzeige in der Moderation: ["nur wenn IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) besetzt ist"] |

## Browsertest Waterkant (Chromium, 2026-11-18 16:57 UTC)

### Ergebnisse

| ID | Prüfung | Ergebnis | Erwartet | Beobachtet |
|---|---|---|---|---|
| B | Unterbrechung B7 (IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), 5 Min.) | bestanden | Bühne zeigt die Unterbrechung mit Restzeit; Moderation sieht Rolle und Rückkehr | Bühne enthält Zeitangabe: ja; Moderation erwähnt B7: ja |
| G | Generalprobe: 28 Lagen und 4 öffentliche Überraschungen | bestanden | jedes Bild geladen; jeder vorgesehene Ton gestartet; Übungshinweis sichtbar, wo vorgesehen | 32 Bühnenzustände; Abweichungen: keine |
| N3 | Stummschalten mitten im Ton (LK21) | bestanden | Kartenton stoppt sofort (≤ 3 s); nach Aufheben startet er nicht ungefragt neu, sondern über „Ton erneut abspielen“ (Hintergrundton gibt es nur vor der Krise und in den Vorboten) | vorher: läuft lk21-nordkanal-nachrichten.mp3; nach Stumm: Kartenton aus, Hintergrund aus; nach Aufheben: Kartenton aus, Hintergrund aus |
| N3 | Ton erneut abspielen nach Stummschaltung | bestanden | Kartenton startet von vorn | Kartenton läuft (lk21-nordkanal-nachrichten.mp3, 2.5 s) |
| N4 | Zeitsprung mitten im Ton (LK21 → LK22) | bestanden | alter Ton endet, Ton der neuen Lage läuft | danach: läuft lk22-kasse-startet.mp3; Hintergrund aus |
| N2 | Bühne neu laden mitten im Lauf | bestanden | Bühne zeigt sofort wieder die aktuelle Lage; Ton braucht einen Klick (Browserregel) | Ton-Freigabe angezeigt: ja; aktuelle Lage „Die Kassen laufen wieder“ sichtbar: ja; nach Klick Hintergrund aus |
| F | Abschluss auf der Bühne bis zum Fazit | bestanden | Nacharbeiten, Rechnung, Bilanz, Einordnung und Fazit erscheinen nacheinander | 6 Bildschirmfotos, letzte Phase: fazit |
| M | Keine Browserfehler in Bühne und Moderation | bestanden | keine JavaScript-Fehler | keine |

### Generalprobe: jede Lage und jede öffentliche Überraschung auf der Bühne

| ID | Titel | Bildschirmfoto | Bild geladen | vorgesehener Ton | beobachteter Ton | Übungshinweis |
|---|---|---|---|---|---|---|
| LK01 | USV meldet Batteriewarnung | `screenshots/waterkant/02-LK01.png` | ja | – | – | – |
| LK02 | Geruch im Technikflur | `screenshots/waterkant/03-LK02.png` | ja | – | – | – |
| LK03 | Serverraum wird warm | `screenshots/waterkant/04-LK03.png` | ja | lk03-klimaalarm.mp3 | lk03-klimaalarm.mp3 | – |
| LK04 | Brandalarm im Rechenzentrum | `screenshots/waterkant/05-LK04.png` | ja | lk04-loeschanlage-durchsage.mp3 | lk04-loeschanlage-durchsage.mp3 | sichtbar |
| LK05 | Feuerwehr im Einsatz | `screenshots/waterkant/06-LK05.png` | ja | funk-ruf.mp3 | funk-ruf.mp3 (bereits zu Ende) | – |
| LK06 | Lagebild nach dem Löschen | `screenshots/waterkant/07-LK06.png` | ja | – | – | – |
| LK07 | Was noch läuft – und was nicht | `screenshots/waterkant/08-LK07.png` | ja | – | – | – |
| LK08 | Saisonstart ohne Aktionspreise | `screenshots/waterkant/09-LK08.png` | ja | – | – | – |
| LK09 | Die Partnermärkte rufen an | `screenshots/waterkant/10-LK09.png` | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – |
| B6 | Wo hat es gebrannt? | `screenshots/waterkant/11-B6.png` | ja | – | – | – |
| LK10 | Serverraum gesperrt | `screenshots/waterkant/12-LK10.png` | ja | – | – | – |
| LK11 | Nordkanal fragt nach | `screenshots/waterkant/13-LK11.png` | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – |
| LK12 | Das Zentrallager steht | `screenshots/waterkant/14-LK12.png` | ja | – | – | – |
| LK13 | Ersatz: Hardware oder Ausweich-Rack? | `screenshots/waterkant/15-LK13.png` | ja | – | – | – |
| LK14 | Den Backup-Server bergen? | `screenshots/waterkant/16-LK14.png` | ja | – | – | – |
| B5 | Zweiter Alarm | `screenshots/waterkant/17-B5.png` | ja | b5-zweiter-alarm.mp3 | b5-zweiter-alarm.mp3 | sichtbar |
| LK15 | Wie weit geht der Ausweichbetrieb? | `screenshots/waterkant/18-LK15.png` | ja | – | – | – |
| B7 | Die IT-Leitung muss raus | `screenshots/waterkant/19-B7.png` | ja | – | – | – |
| B8 | Ein Angebot mit Haken | `screenshots/waterkant/20-B8.png` | ja | – | – | – |
| LK16 | Ein Bauunternehmen will Vorrang | `screenshots/waterkant/21-LK16.png` | ja | telefon-klingeln.mp3 | telefon-klingeln.mp3 | – |
| LK17 | Prospektpreise vor der Kasse | `screenshots/waterkant/22-LK17.png` | ja | – | – | – |
| LK18 | Der Verbundbeirat verlangt Antworten | `screenshots/waterkant/23-LK18.png` | ja | – | – | – |
| LK19 | Rücksicherung im Ausweich-Rack | `screenshots/waterkant/24-LK19.png` | ja | – | – | – |
| LK20 | Wer kassiert zuerst? | `screenshots/waterkant/25-LK20.png` | ja | – | – | – |
| LK21 | Nordkanal berichtet | `screenshots/waterkant/26-LK21.png` | ja | lk21-nordkanal-nachrichten.mp3 | lk21-nordkanal-nachrichten.mp3 | – |
| LK22 | Die Kassen laufen wieder | `screenshots/waterkant/27-LK22.png` | ja | lk22-kasse-startet.mp3 | lk22-kasse-startet.mp3 | – |
| LK23 | Die Datenlücke | `screenshots/waterkant/28-LK23.png` | ja | – | – | – |
| LK24 | Der Versicherer ist da | `screenshots/waterkant/29-LK24.png` | ja | – | – | – |
| LK25 | Der große Saisonsamstag | `screenshots/waterkant/30-LK25.png` | ja | – | – | – |
| LK26 | Die Brandursache | `screenshots/waterkant/31-LK26.png` | ja | – | – | – |
| LK27 | Stabiler Notbetrieb | `screenshots/waterkant/32-LK27.png` | ja | – | – | – |
| LK28 | Zurück ins eigene Rechenzentrum? | `screenshots/waterkant/33-LK28.png` | ja | – | – | – |

## Sicherheitstest (laufender Server)

Derselbe Test lief gegen den Stand vor den Korrekturen (Commit `9372144`) und gegen den aktuellen Stand.

| Prüfung | vorher | nachher | Beobachtet (nachher) |
|---|---|---|---|
| Server nur auf 127.0.0.1 erreichbar | nicht bestanden | bestanden | Verbindung über 192.0.2.2:4173 abgelehnt |
| Vorlagen-Export enthält kein SMTP-Passwort | nicht bestanden | bestanden | pass im Export: "••••••••" |
| Import des Platzhalters lässt gespeichertes Passwort unverändert | bestanden | bestanden | data/settings.json enthält weiterhin das ursprüngliche Passwort |
| Logo-Pfad mit "../" liest keine Datei außerhalb media/ | nicht bestanden | bestanden | nichts eingebettet |
| Logo-Upload lehnt SVG ab | nicht bestanden | bestanden | HTTP 400 |
| Logo-Upload lehnt text/html ab | bestanden | bestanden | HTTP 400 |
| Logo-Upload: Dateiendung folgt dem Bildtyp, nicht dem Dateinamen | nicht bestanden | bestanden | HTTP 200, gespeichert als /media/branding/custom-logo-1795019052641.png |
| Bewertung mit roleId "__proto__" abgelehnt | nicht bestanden | bestanden | HTTP 400 |
| Bewertung mit unbekannter Rolle abgelehnt | nicht bestanden | bestanden | HTTP 400 |
| Bewertung mit gültiger Rolle/Kriterium angenommen | bestanden | bestanden | HTTP 200 |

