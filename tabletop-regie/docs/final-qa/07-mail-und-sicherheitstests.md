# 07 – Mail- und Sicherheitstests

**Geprüfter Commit:** `6809dee1a7f2daac4685ace87b31a31d6e587ede` · **Lauf:** 2026-11-19T15:33:06.782Z bis 2026-11-19T16:15:36.947Z · erzeugt mit `tools/qa/berichte.js` aus dem Nachweisordner (Pfadangaben relativ zum Nachweispaket).

Alle Mails gingen ausschließlich an den lokalen SMTP-Testempfänger der jeweiligen Testumgebung (127.0.0.1); Adressen nur `@example.com`. Mailzählung und Empfängerprüfung in den Browser-Durchläufen: Prüfungen S2, S5, O1, O2 in Dokument 05.

## Negativ- und Lasttests

17/17 Fälle bestanden (`negativ/negativ.json`, Bilder in `negativ/bilder/`). Prüfschritt `negativ`: Exit-Code 0, 132 s, Konsole `konsole/negativ.txt`

### N-01 – Empfänger nicht erreichbar (SMTP 550 bei RCPT)

**Soll (vorab festgelegt):** Versand schlägt fehl, Übung läuft weiter; Moderation zeigt „E-Mail fehlgeschlagen … mündlich oder auf Papier übergeben“; Journal: „zustellung fehlgeschlagen“; kein erneuter Versand ohne Aktion.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| Server antwortet | HTTP 200 nach 24 ms | ja |
| Ergebnis je Person als fehlgeschlagen vermerkt | [{"ok":false,"fehler":"Can't send mail - all recipients were rejected: 550 Empfänge"}] | ja |
| Übung läuft weiter | running | ja |
| Journal vermerkt den Fehlschlag | zustellung fehlgeschlagen | ja |
| geöffnete Moderation zeigt den Fehlschlag mit Handlungsanweisung | Hinweis sichtbar | ja |
| nach Neuladen bleibt der Fehlschlag bei der Karte sichtbar | in „Verschickte vertrauliche Karten“ sichtbar | ja |
| kein automatischer zweiter Versuch | 0 Mails angekommen | ja |

**Ergebnis:** bestanden

### N-02 – SMTP-Verbindung bricht während der Übertragung ab

**Soll (vorab festgelegt):** Versand schlägt nach kurzer Zeit fehl (kein Hängenbleiben über 60 s), Übung läuft weiter, Fehlschlag sichtbar und im Journal; nachfolgende Karten werden wieder normal zugestellt, sobald der Server erreichbar ist.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| Antwort innerhalb 60 s | HTTP 200 nach 14 ms | ja |
| Fehlschlag vermerkt | write ECONNRESET | ja |
| nächste Karte nach Wiederherstellung zugestellt | 1 Mail(s) für SK44 | ja |
| Übung läuft weiter | running | ja |

**Ergebnis:** bestanden

### N-03 – Bühne wird während eines Einspielers neu geladen

**Soll (vorab festgelegt):** Nach dem Neuladen zeigt die Bühne dieselbe Lage; der Browser verlangt erneut die Tonfreigabe; nach „Ton aktivieren“ läuft genau ein Einspieler (der der aktuellen Lage) von vorn, kein zweiter Ton parallel, keine vertraulichen Texte.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| vor dem Neuladen lief der Einspieler der Lage | [{"src":"","laeuft":false},{"src":"lk04-loeschanlage-durchsage.mp3","laeuft":true}] | ja |
| dieselbe Lage nach dem Neuladen | Brandalarm im Rechenzentrum | ja |
| Tonfreigabe wird erneut verlangt | Freigabe sichtbar | ja |
| genau ein Ton läuft, der der aktuellen Lage | [{"src":"","laeuft":false,"zeit":0},{"src":"lk04-loeschanlage-durchsage.mp3","laeuft":true,"zeit":2.443615}] | ja |
| keine vertraulichen Texte auf der Bühne | geprüft gegen alle Kartentexte | ja |

**Ergebnis:** bestanden

### N-04 – Bühnenfenster wird geschlossen und später neu geöffnet

**Soll (vorab festgelegt):** Die Übung läuft ohne Bühne weiter (Zeit, Lagen, Zustellungen); die neu geöffnete Bühne zeigt sofort die aktuelle Lage.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| Übung läuft ohne Bühne weiter | running, Minute 0.1 → 22.1 | ja |
| neu geöffnete Bühne zeigt die aktuelle Lage | LK06 Lagebild nach dem Löschen | ja |

**Ergebnis:** bestanden

### N-05 – Server-Neustart während laufender Übung

**Soll (vorab festgelegt):** Zustand bleibt erhalten (Status, Übungsminute ± 1, gezeigte Lagen, Entscheidungen); bereits verschickte Karten werden nicht erneut verschickt; das Journal setzt die Folgenummern fort.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| Status erhalten | running → running | ja |
| Übungsminute fortgesetzt | 22.10 → 22.20 | ja |
| gezeigte Lagen erhalten | LK01 LK02 LK03 LK04 LK05 LK06 | ja |
| Entscheidung erhalten | [{"id":"W1","frage":"Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen sie weiter, bis die Gebäudetechnik die Ursache kennt?","hinweis":"Um 03:02 Uhr weiß niemand, dass es brennt. Herunterfahren bricht die Preisübertragung zum Saisonstart und die Partner-Uploads ab un… | ja |
| keine Doppelzustellung durch den Neustart | 6 → 6 Mails | ja |
| Journal: Folgenummern lückenlos fortgesetzt | 14 → 14 Einträge, letzte seq 14 | ja |

**Ergebnis:** bestanden

### N-06 – Zwei schnelle gleichzeitige Aktionen

**Soll (vorab festgelegt):** Gleiche Karte zweimal gleichzeitig ausgelöst → genau eine Zustellung je Person. Zwei verschiedene Optionen derselben Entscheidung gleichzeitig → Endzustand ist genau eine Option, Abschlussposten passen zu ihr.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| dreifach gleichzeitig ausgelöst → eine Mail | 1 Mail(s) | ja |
| genau eine Option festgehalten | ausbauen | ja |
| Abschlussposten passen zur festgehaltenen Option | aktiv: ausweichausbau | ja |

**Ergebnis:** bestanden

### N-07 – Entscheidung wird nachträglich geändert

**Soll (vorab festgelegt):** Die Bühne zeigt danach nur die Folge der neuen Option; die Rechnung enthält nur deren Posten; eine Folgekarte der alten Option, die schon zugestellt war, bleibt zugestellt (wird nicht zurückgeholt) und wird nicht erneut verschickt.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| Bühne zeigt die Folge der neuen Option | LK08 | ja |
| Bühne zeigt keine Folge der alten Option | alte Option ohne Zusatz an dieser Lage | ja |
| Endzustand = neue Option | weiterlaufen | ja |
| Wechsel löst keinen erneuten Versand aus | jede Karte höchstens einmal im Journal | ja |

**Ergebnis:** bestanden

### N-08 – Bereits zugestellte Karte wird erneut ausgelöst

**Soll (vorab festgelegt):** Keine zweite Mail; Übung unverändert.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| genau eine Zustellung | 1 → 1 | ja |

**Ergebnis:** bestanden

### N-09 – Nicht berechtigte Rolle erhält keine Nachricht

**Soll (vorab festgelegt):** Eine Karte an Rolle X erreicht nur Personen mit Rolle X (oder der dokumentierten Ersatzrolle, wenn X unbesetzt ist), niemanden sonst.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| nur berechtigte Empfänger | person6@example.com (berechtigt: person6@example.com) | ja |

**Ergebnis:** bestanden

### N-10 – Überraschung vor ihrer Voraussetzung

**Soll (vorab festgelegt):** Ablehnung mit Begründung (HTTP 400, Text nennt die fehlende Lage), keine Mail, keine Bühnenanzeige, Journal vermerkt „abgelehnt“; die Moderation zeigt die Schaltfläche gesperrt.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| vertrauliche Überraschung abgelehnt | HTTP 400: Diese Karte passt erst nach LK15. | ja |
| öffentliche Überraschung abgelehnt | HTTP 400: Diese Karte passt erst nach LK14. | ja |
| keine Mail, keine Bühnenanzeige | 0 Mails | ja |
| Journal vermerkt die Ablehnung | B1:abgelehnt (HTTP 400), B5:abgelehnt (HTTP 400) | ja |
| Moderation zeigt B1 und B5 gesperrt | gesperrt: B1 B2 B3 B4 B5 B6 B7 B8 | ja |

**Ergebnis:** bestanden

### N-11 – Pause hält Zeit und Versand an

**Soll (vorab festgelegt):** Während der Pause steht die Übungsminute, es wird keine Lage gezeigt und keine Karte verschickt; nach dem Fortsetzen läuft die Zeit ab dem Pausenstand weiter.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| Zeit steht | 0.000 → 0.000 | ja |
| keine neue Lage, keine Mail | 0 Lagen, 0 Mails | ja |
| Zeit läuft nach dem Fortsetzen ab Pausenstand weiter | 0.000 → 0.100 | ja |

**Ergebnis:** bestanden

### N-12 – Mediendatei fehlt bzw. ist keine Audiodatei

**Soll (vorab festgelegt):** Fehlende Datei: die Drehbuchprüfung meldet sie als Fehler (sichtbar in der Einrichtung). Beschädigte Datei: die Bühne zeigt die Lage weiter, ohne Skriptabbruch; die Übung läuft weiter.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| fehlende Datei in der Drehbuchprüfung gemeldet | Karte LK04 (Ton): Datei /media/waterkant/gibt-es-nicht.mp3 fehlt. | ja |
| Bühne zeigt LK04 trotz Medienfehler | Brandalarm im Rechenzentrum | ja |
| Bühne zeigt LK05 trotz Medienfehler | Feuerwehr im Einsatz | ja |
| kein Skriptabbruch auf der Bühne | keine Fehler | ja |
| Übung läuft weiter | running | ja |

**Ergebnis:** bestanden

**Befund (niedrig):** Moderation zeigt einen Hinweis auf den Medienfehler.

### N-13 – Zwei Moderationsfenster und zwei Bühnen gleichzeitig

**Soll (vorab festgelegt):** Beide Moderationsfenster zeigen nach spätestens 3 s denselben Zustand (Pause, Entscheidung); von zwei Bühnen mit Ton spielt nur die zuletzt freigegebene, die andere zeigt „Ton läuft auf einer anderen Bühne“.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| Pause aus Fenster 1 in Fenster 2 sichtbar | pausiert angezeigt | ja |
| Fortsetzen aus Fenster 2 wirksam | running | ja |
| nur die zuletzt freigegebene Bühne spielt Ton | Bühne 1 still, Bühne 2 spielt | ja |
| Bühne 1 zeigt den Hinweis „Ton auf anderer Bühne“ | sichtbar | ja |

**Ergebnis:** bestanden

### N-14 – Bühnenseite ruft Moderationsdaten ab

**Soll (vorab festgelegt):** Erwartung nach heutiger Architektur (Einzelplatz, nur 127.0.0.1, keine Anmeldung): der Abruf GELINGT – es gibt keine Zugriffstrennung zwischen Bühne und Moderation. Geschützt ist nur, dass die Bühne von sich aus keine vertraulichen Inhalte lädt oder zeigt: die Bühnen-Schnittstelle enthält keinen Text einer vertraulichen Karte.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| Abruf der Moderationsdaten aus der Bühnenseite gelingt (bekannte Einschränkung) | HTTP 200, 184963 Zeichen | ja |
| Bühnen-Schnittstelle enthält keine vertraulichen Kartentexte | 0 Treffer | ja |

**Ergebnis:** bestanden

**Befund (mittel):** Keine Zugriffstrennung: Wer den Rechner der Moderation im Netz erreicht oder an der Bühne die Adresse ändert, kann die Moderationsansicht mit allen vertraulichen Texten öffnen. Gemindert durch Bindung an 127.0.0.1 (Standard). Eigenes Projekt „Zugriffsschutz“ (siehe offene Risiken).

### N-15 – Unzulässige Medien- und Pfadangaben

**Soll (vorab festgelegt):** Kein Abruf von Dateien außerhalb von media/ (Projektquellen, Daten, Einstellungen), weder direkt noch kodiert; Logo-Pfad mit „../“ wird ignoriert.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| keine Datei außerhalb media/ ausgeliefert | /media/../server/index.js → 404; /media/%2e%2e/server/index.js → 404; /media/..%2fserver/index.js → 404; /media/%2e%2e%2fdata%2fsettings.json → 404; /../data/settings.json → 404; /media/waterkant/../../package.json → 404 | ja |
| Logo-Pfad mit „../“ wird nicht in den Export eingebettet | HTTP 200; eingebettet: nichts | ja |

**Ergebnis:** bestanden

### N-16 – Browser der Moderation stürzt während der Übung ab (Prozess beendet)

**Soll (vorab festgelegt):** Die Übung läuft serverseitig weiter (Zeit, Lagen, Zustellungen); ein neu gestarteter Browser zeigt in der Moderation den aktuellen Stand einschließlich festgehaltener Entscheidung; keine Doppelzustellung durch den Abbruch.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| Entscheidung vor dem Absturz über die Oberfläche festgehalten | W1 = herunterfahren | ja |
| Browser tatsächlich abgestürzt (Verbindung getrennt, Prozess beendet) | getrennt: true, Hauptprozess beendet: ja (SIGKILL) | ja |
| Übung läuft serverseitig weiter | running | ja |
| Entscheidung aus dem abgestürzten Fenster erhalten | W1 = herunterfahren | ja |
| neuer Browser zeigt die aktuelle Lage | Lagebild nach dem Löschen | ja |
| keine Doppelzustellung | 2 Zustellungen, 2 verschiedene Karten | ja |

**Ergebnis:** bestanden

### N-17 – Zeitsprung zurück auf eine frühere Übungsminute

**Soll (vorab festgelegt):** Die Bühne zeigt die zur neuen Minute gehörende frühere Lage; bereits gezeigte Lagen und verschickte Karten werden weder erneut ausgelöst noch erneut verschickt – auch nicht, wenn die Zeit danach wieder über ihre Minuten läuft; festgehaltene Entscheidungen bleiben.

| Bedingung | beobachtet | erfüllt |
|---|---|---|
| Bühne zeigt die frühere Lage | LK04 (erwartet LK04 Brandalarm im Rechenzentrum) | ja |
| kein erneuter Versand beim Rücksprung | 0 neue Mails | ja |
| beim erneuten Vorlauf keine Lage doppelt gezeigt | 8 → 8 Einträge „lage gezeigt“ | ja |
| beim erneuten Vorlauf keine Karte doppelt zugestellt | 6 → 6 Zustellungen | ja |
| Entscheidung bleibt festgehalten | herunterfahren | ja |

**Ergebnis:** bestanden

## Sicherheitsprüfung

Prüfschritt `sicherheit`: Exit-Code 0, 1 s, Konsole `konsole/sicherheit.txt`

| ID | Prüfung | beobachtet | Ergebnis |
|---|---|---|---|
| S1 | Server nur auf 127.0.0.1 erreichbar | Verbindung über 192.0.2.2:4270 abgelehnt | bestanden |
| S2 | Vorlagen-Export enthält kein SMTP-Passwort | pass im Export: "••••••••" | bestanden |
| S3 | Import des Platzhalters lässt gespeichertes Passwort unverändert | data/settings.json enthält weiterhin das ursprüngliche Passwort | bestanden |
| S4 | Logo-Pfad mit "../" liest keine Datei außerhalb media/ | nichts eingebettet | bestanden |
| S5 | Logo-Upload lehnt SVG ab | HTTP 400 | bestanden |
| S6 | Logo-Upload lehnt text/html ab | HTTP 400 | bestanden |
| S7 | Logo-Upload: Dateiendung folgt dem Bildtyp, nicht dem Dateinamen | HTTP 200, gespeichert als /media/branding/custom-logo-1795103024287.png | bestanden |
| S8 | Schreibender Aufruf ohne X-Regie-Header abgelehnt (Schutz vor Fremdauslösung) | POST ohne Header: HTTP 403; als Formular: HTTP 403 | bestanden |
| S9 | Unzulässige Medienpfade liefern keine Dateien außerhalb von media/ | /media/../server/index.js → HTTP 404; /media/%2e%2e/server/index.js → HTTP 404; /media/..%2fdata%2fsettings.json → HTTP 404; /../data/settings.json → HTTP 404 | bestanden |
| S10 | Bewertung mit roleId "__proto__" abgelehnt | HTTP 400 | bestanden |
| S11 | Bewertung mit unbekannter Rolle abgelehnt | HTTP 400 | bestanden |
| S12 | Bewertung mit gültiger Rolle/Kriterium angenommen | HTTP 200 | bestanden |

## Mailbezogene Prüfungen im Lauftest – NordTech

| ID | Prüfung | beobachtet | Ergebnis |
|---|---|---|---|
| M1 | Begrüßung und Rollenbriefing je Person genau einmal | Begrüßungen 9, Briefings 9, Personen 9 | bestanden |
| N6 | Private Überraschung B1: weder it-mitarbeiter noch Ersatzrolle besetzt | HTTP 200; Mails 0; Log: warn „Bonuskarte B1 ausgelöst, aber weder IT-Fachkraft (Vertretung IT-Leitung) (niemand besetzt) noch eine Ersatzrolle ist besetzt.“ | bestanden |
| N9 | Doppelauslösung: SK07 dreimal gleichzeitig | 1 Mail(s) | bestanden |
| M4 | Private Überraschung per Mail, öffentliche nur auf der Bühne | B2: person7@example.com; B6: Mails 0, Bühne zeigt Ereignis | bestanden |
| V1 | Keine vertraulichen Inhalte in Bühnen- und Ablaufdaten | 164 Texte geprüft; Treffer: keine; Adressen: 0 | bestanden |
| N1 | Mailversand schlägt fehl (SMTP nicht erreichbar) | HTTP 200; Status running; Log-Einträge „fehlgeschlagen“: 1; Ergebnis je Person: Fehler; Hinweis: kein Knopf für erneuten Versand vorhanden – Moderation muss die Karte vorlesen oder manuell weitergeben | bestanden |
| N2 | Nach Neustart keine Doppelzustellung | 0 doppelte Zustellungen | bestanden |

## Mailbezogene Prüfungen im Lauftest – Waterkant

| ID | Prüfung | beobachtet | Ergebnis |
|---|---|---|---|
| M1 | Begrüßung und Rollenbriefing je Person genau einmal | Begrüßungen 9, Briefings 9, Personen 9 | bestanden |
| N9 | Doppelauslösung: SK01 dreimal gleichzeitig | 1 Mail(s) | bestanden |
| M4 | Private Überraschung per Mail, öffentliche nur auf der Bühne | B1: person2@example.com; B5: Mails 0, Bühne zeigt Ereignis | bestanden |
| V1 | Keine vertraulichen Inhalte in Bühnen- und Ablaufdaten | 152 Texte geprüft; Treffer: keine; Adressen: 0 | bestanden |
| N1 | Mailversand schlägt fehl (SMTP nicht erreichbar) | HTTP 200; Status running; Log-Einträge „fehlgeschlagen“: 1; Ergebnis je Person: Fehler; Hinweis: kein Knopf für erneuten Versand vorhanden – Moderation muss die Karte vorlesen oder manuell weitergeben | bestanden |
| N2 | Nach Neustart keine Doppelzustellung | 0 doppelte Zustellungen | bestanden |
