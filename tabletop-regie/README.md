# BCM Tabletop-Regie

Eine lokale Regie-App zum Durchführen von BCM-Tabletop-Übungen (Krisensimulationen)
mit Live-Timer, Rollen, Bühnen-/Moderatoransicht, E-Mail-Benachrichtigungen an
einzelne Rollen und Teilnahme-Urkunden per E-Mail (kein Ausdrucken nötig).

**Eigenständiges Tool, getrennt vom [BCM Starter Kit](../README.md).** Es teilt
weder Datenmodell noch Code mit dem Starter Kit — beide laufen unabhängig
nebeneinander.

## Was diese App macht

- Du legst ein **Drehbuch** (Szenario) als JSON-Datei an: Lagekarten (öffentlich,
  für die Bühne), Sonderlagekarten (vertraulich, pro Rolle), Bonuskarten (manuell
  für Dynamik), Moderationsleitfaden, Bewertungskriterien.
- Du trägst **Teilnehmer** mit Name, E-Mail und zugewiesener(n) Rolle(n) ein.
  Mehrere Rollen können auf eine Person zusammengefasst werden (kompakte
  Besetzung für kleinere Gruppen).
- Beim Start läuft ein **Timer**. Lagekarten erscheinen automatisch auf der
  **Bühne** (für Beamer/TV, teilbar). Sonderlagekarten gehen automatisch **per
  E-Mail** an die zugeordnete Person — mit einer vertraulichen, rollenbezogenen
  Nachricht.
- Die **Moderationsansicht** (nicht teilen!) zeigt oben einen visuellen
  **Prozessablauf** (alle Lage-/Sonderlagekarten auf einer Zeitleiste,
  erledigt/aktuell/kommend) mit einem frei ziehbaren **Zeit-Schieberegler** —
  springe direkt auf jede beliebige Minute, statt dich nur von Karte zu Karte
  zu hangeln. Dazu kommende Ereignisse, manuelles Auslösen von Bonus-/
  Sonderkarten und **Urkunden direkt per E-Mail** an jede einzelne Person — kein Drucken, kein manuelles
  "Als PDF speichern".
- Die **Bühne** hat einen **Hell/Dunkel-Umschalter** (oben rechts) für helle
  Räume/Beamer — die Wahl merkt sich der Browser pro Gerät.
- Die Übungsdauer passt sich **Gruppengröße und Schwierigkeit** an, in drei
  wählbaren Zeitmodi (siehe unten): erprobte feste Zeiten, automatisch nach
  Rollenzahl berechnet (volles Drehbuch), oder eine **Zieldauer vorgeben**
  (z. B. 45/90/120 Minuten) — die App schneidet dann Kartenauswahl und
  Diskussionszeiten passend zu.

- Fast jeder Button in der App zeigt beim Draufhalten mit der Maus (Mouseover)
  eine kurze Erklärung, was er tut — und ein eigener **"Ablauf & Hilfe"**-Tab
  erklärt Start, die einzelnen Ansichten und zeigt Teilnehmenden Begrüßung,
  Spielregeln und bereits gezeigte Lagekarten zum Nachlesen (ohne vertrauliche
  Sonderlagekarten und ohne Spoiler kommender Karten).

## Installation & Start

Voraussetzung: [Node.js](https://nodejs.org/) **ab Version 20** (aktuelle LTS-Version) ist auf dem Rechner
installiert — Windows, macOS und Linux funktionieren alle gleich gut, es gibt
keine Linux-spezifischen Pfade oder Abhängigkeiten.

**Am einfachsten:** im Hauptordner des Repos (eine Ebene über `tabletop-regie`)
`start.sh` (macOS/Linux, im Terminal ausführen oder doppelklicken) bzw.
`start.bat` (Windows, doppelklicken) starten und "2) BCM Tabletop-Übung"
wählen. Vor jedem Start wird geprüft, ob die installierten Pakete zur
Programmversion passen; fehlen welche oder sind sie veraltet (z. B. weil eine
neue Version über einen alten Ordner entpackt wurde), wird automatisch
nachinstalliert. Einmal pro neuer Version braucht das eine Internetverbindung.

**Manuell unter Windows:** Ordner `tabletop-regie` im Explorer öffnen, in die
Adresszeile oben `cmd` eintippen und Enter drücken — das öffnet eine
Eingabeaufforderung direkt in diesem Ordner. Dort:

```
npm install
npm start
```

**Manuell unter macOS/Linux:** Terminal öffnen, dann:

```bash
cd tabletop-regie
npm install
npm start
```

In beiden Fällen bleibt das Fenster offen, solange die App läuft (schließen
beendet den Server). `npm install` ist nur beim ersten Mal nötig.

Danach:

- Setup: http://localhost:4173/setup.html
- Bühne (teilen): http://localhost:4173/stage.html
- Moderation (nicht teilen): http://localhost:4173/moderator.html
- Ablauf & Hilfe (für Teilnehmer + Erklärung der App): http://localhost:4173/ablauf.html

Die App läuft ausschließlich lokal. Die einzige ausgehende Netzwerkverbindung
ist der von dir eingetragene SMTP-Server für die Sonderlagekarten-Mails.

**Erreichbarkeit:** Der Server lauscht standardmäßig nur auf `127.0.0.1` –
Bühne und Moderation laufen auf demselben Rechner (zweiter Bildschirm oder
Beamer). Es gibt keine Anmeldung: Wer die App mit `HOST=0.0.0.0 npm start`
im Netzwerk freigibt, macht auch die Moderation mit allen vertraulichen
Karten für alle im Netz zugänglich. Das nur in einem vertrauenswürdigen Netz
tun. Der Vorlagen-Export enthält kein SMTP-Passwort.

## Unterlagen zum Szenario NordTech

Im Ordner `docs/`:

- `nordtech-moderationshandbuch.md` – Moderationshandbuch (Version 1.1, mit der Oberfläche abgeglichen)
- `nordtech-medienmatrix.md` / `.csv` – jedes Bild und jeder Ton mit Datei, Prüfstand und Befund
- `nordtech-gesamtpaket.md` – das komplette Szenario als Text (Faktenblatt, alle Karten, Zeitformate, Stand der Prüfrunden)
- `nordtech-durchlaeufe.md` – sieben vollständig durchgespielte Geschichten, direkt aus dem Werkzeug erzeugt
- `nordtech-redteam-auftrag.md` – Auftrag für einen inhaltlichen Red-Team-Test (Plausibilität des Angriffs, Geschäftsauswirkungen, echte Entscheidungen, Logik über sieben Tage)
- `nordtech-redteam-paket.md` – Auftrag, Gesamtpaket und Geschichten in einer Datei zum Hochladen beim Prüfer
- `nordtech-generalprobe.md` – Medien-Generalprobe: jede Karte so, wie die Bühne sie zeigt, mit Ton und Sichtbefund
- `nordtech-abnahmebericht.md` – Abnahme vor dem Pilot: Widersprüche, Spielbarkeit, alle 16 Entscheidungskombinationen, Rechnung, Go/No-Go-Checkliste

## Unterlagen zum Szenario Waterkant

- `docs/waterkant-moderationshandbuch.md` – Moderationshandbuch (Arbeitsfassung, aus dem Drehbuch erzeugt mit `node tools/handbuch-waterkant.js`): Format und Dauer (Pilotstandard ab 90 Minuten), Vorbereitung mit Abstimmung der Alarmtöne, Ablauf, Entscheidungen, Überraschungen, Live-Gespräche, Störungen und Abbruch, Debriefing
- `docs/review/05-waterkant-vollstaendiges-szenario.md` – das komplette Drehbuch mit Bestandsanalyse und Variantenprüfung
- `docs/review/11-finaler-unabhaengiger-review.md` – unabhängige Prüfungen und Umgang mit den Befunden

## Prüfwerkzeuge und Review-Paket

Für beide Drehbücher (Aufruf jeweils mit `data/scenario.<name>.json`):

- `npm run pruefen` – Drehbuchprüfung (Pflichtfelder, Verweise, Medien, Rollenabdeckung)
- `node tools/varianten.js <drehbuch> bericht.md` – alle 25 Kombinationen aus Dauer und Schwerpunkt und alle Entscheidungskombinationen
- `node tools/szenario-export.js <drehbuch> drehbuch.md` – das komplette Drehbuch als Text
- `node tools/geschichten.js <drehbuch> verlaeufe.md` – durchgespielte Verläufe, wie der Tisch sie erlebt
- `node tools/medienliste.js <drehbuch> medien.md` – alle Bilder und Töne mit Datei, Maßen, Dauer und Prüfsumme
- `node tools/tests/lauf.js scenario.<name>.json ergebnis.json` – Lauftest mit echtem Server und lokalem Test-Mailempfänger (keine echten Mails)
- `node tools/tests/buehne.js scenario.<name>.json ordner` – Browsertest der Bühne mit Bildschirmfotos (braucht Playwright)
- `node tools/tests/sicherheit.js` – Sicherheitsprüfung gegen den laufenden Server (für eine isolierte Umgebung: `node tools/qa/mit-server.js 4270 2670 sicherheit <ordner> -- node tools/tests/sicherheit.js {BASE}`)

QA-Abnahme (`tools/qa/`, alle Tests mit eigenem Datenordner und lokalem Test-Mailempfänger, die Projektdaten in `data/` bleiben unberührt):

- `node tools/qa/abnahme.js <nachweisordner>` – Gesamtlauf am eingecheckten Commit (bricht bei nicht eingecheckten Änderungen ab), danach `node tools/qa/status.js <nachweisordner>` für den Prüfstand
- `node tools/qa/e2e-browser.js <fall> <ordner>` – Übung im echten Browser über die Oberfläche (Fälle in `tools/qa/e2e-faelle.json`)
- `node tools/qa/integration.js`, `negativ.js`, `referenz.js`, `medien.js`, `regression.js`, `replay.js` – Orakelprüfung aller Varianten, Negativ- und Lasttests, handgerechnete Sollwerte, Medienmessung, NordTech-Regression, Wiederholung aus dem Ereignisjournal
- Prüfstand im Browser: `http://localhost:4173/qa.html` (Stand der letzten Abnahme; ein bestandener Test ist keine fachliche Freigabe)

Das Review-Paket aus dem Abschluss der Prüfung liegt unter `docs/review/` (zwölf Dokumente, Testberichte, Ablaufdiagramme, Szenariodaten, `manifest.json` mit Prüfsummen).

## Ablauf einer Übung

0. **Bereitest du Übungen öfter vor?** Dann zuerst ganz oben im Setup unter
   **"Vorlage"** prüfen, ob du schon eine **Vorlage herunterladen** kannst,
   die du beim letzten Mal gespeichert hast — "Vorlage laden …" spielt
   Teilnehmer, Rollenauswahl, SMTP-Zugangsdaten, Branding und Zeitmodus in
   einem Schritt ein (auch auf einem anderen Rechner), statt alles erneut
   einzutippen. Am Ende dieses Setups (Schritt 7) kannst du die aktuelle
   Konfiguration jederzeit wieder als neue Vorlage herunterladen.
1. **Setup öffnen.** Oben zuerst das **Szenario** wählen (z. B. NordTech oder
   Waterkant) — ein Wechsel setzt nur den Lauf zurück. Alle eingetragenen
   Personen bleiben erhalten; Rollen, die es im neuen Szenario genauso gibt
   (z. B. IT-Leitung, Personalleitung), bleiben zugewiesen, die übrigen wählst
   du neu. Die Auswahl wird gespeichert und
   bleibt auch nach einem Neustart erhalten (kein `SCENARIO_FILE` mehr nötig,
   außer du willst das gezielt per Kommandozeile erzwingen).
2. **Rollen für diesen Lauf auswählen.** Die Zahl der Rollen richtet sich
   nach der **Dauer**, nicht nach der Zahl der Personen: Jede Rolle kostet
   Sprechzeit pro Lagekarte und bekommt eigene vertrauliche Karten. Dauer
   wählen (45 Min. bis 3 Std.) und auf **"Passende Rollen vorschlagen"**
   klicken — die App wählt die Rollen, die das Drehbuch als fachlich wichtigste festlegt (sonst die, die in den Lagekarten dieser Dauer am
   meisten gefordert sind). Anzahl: 45 Min.: 5 Rollen, 60 Min.: 6, 90 Min.: 9,
   2 Std.: 12, 3 Std.: alle. Sind schon Personen anderen Rollen zugeordnet
   (z. B. nach einem Import), fragt die App, ob alle Personen als **Teams**
   auf die vorgeschlagenen Rollen verteilt werden sollen — niemand wird
   dabei gelöscht. Rollen lassen sich auch einzeln anhaken. Nur angehakte Rollen erscheinen danach in der
   Teilnehmerzuweisung und bei "Manuell auslösen". Zu
   jeder Rolle steht direkt eine kurze **Rollenbeschreibung** (Zuständigkeit,
   worauf die Person im Verlauf achten muss), damit klar ist, was mit einer
   Rolle überhaupt gemeint ist, bevor sie jemandem zugewiesen wird. Alle
   Rollenbezeichnungen sind bewusst **geschlechtsneutral** formuliert (z. B.
   "Personalleitung" statt "Leiterin Personal") — keine Rolle schreibt beim
   Zuweisen ein bestimmtes Geschlecht vor. Ändert sich die Teilnehmerzahl
   nachträglich (z. B. über "Passende Rollen vorschlagen" neu berechnet,
   oder "Alle"/"Keine"), bleiben Rollen, die bereits einer benannten Person
   zugeordnet sind, automatisch aktiv — die Zuweisung geht dabei nie verloren.
3. Teilnehmer eintragen (Name, E-Mail) und Rollen zuweisen — entweder "Alle N
   aktiven Rollen" (volle Besetzung der Auswahl) oder "Kompakt: X
   Funktionsbereiche" (für noch kleinere Gruppen), oder frei von Hand. Jede
   Person bekommt ihre Sonderlagekarten und Urkunde per E-Mail, unabhängig
   davon, ob sie im Raum oder remote zugeschaltet ist. Personen ganz ohne
   aktive Funktion (reine Zuschauer/Zuhörer) trägst du über "Teilnehmer ohne
   aktive Rolle (bekommen trotzdem eine Urkunde)" ein — Anzahl eingeben,
   "hinzufügen" klicken, Namen/E-Mails ergänzen. Sie bekommen die öffentlichen
   Lagekarten mit, bekommen keine vertraulichen Karten und erhalten am Ende
   trotzdem eine eigene Urkunde.
   Begrüßung/Spielregeln und Rollenbeschreibung sind **Pflicht, nicht
   optional**: Beim Klick auf "Übung vorbereiten" (Schritt 7) schickt die App
   automatisch an jede Person mit E-Mail sowohl die Begrüßung mit Spielregeln
   als auch die eigene Rollenbeschreibung — niemand steigt ohne Vorab-Info
   ein. Die Buttons **"Begrüßung an alle senden"** und **"Rollenbeschreibungen
   per E-Mail senden"** bleiben zusätzlich hier, falls du das vorab schon mal
   testen oder nach einer späten Änderung erneut verschicken willst.
   **Viele Personen auf einmal:** Unter **"Teilnehmer importieren"** die
   Zeilen direkt aus Excel kopieren und einfügen (oder eine CSV-Datei wählen).
   Erkannt werden Vorname, Nachname und E-Mail, auch wenn weitere Spalten wie
   Firma oder Anmeldedatum dabei sind, mit oder ohne Kopfzeile. Leere
   Rollen-Zeilen (z. B. nach "Alle N aktiven Rollen anlegen") werden zuerst
   befüllt, überzählige Personen als "Teilnehmer" angelegt; doppelte
   E-Mail-Adressen und Zeilen ohne gültige Adresse werden übersprungen.
   **Mehr Personen als Rollen (Teams):** "Auf Teams verteilen" verteilt alle
   eingetragenen Personen gleichmäßig auf die aktiven Rollen — aus 40
   Personen und 5 Rollen werden 5 Teams à 8. Vertrauliche Karten gehen an
   jedes Teammitglied, die Moderation zeigt die Teamnamen. Die Setup-Vorschau
   warnt, wenn für die gewählte Dauer zu viele Rollen besetzt sind.
4. **SMTP-Server eintragen** und mit "Test-E-Mail senden" prüfen. Bei internen
   Servern mit selbstsigniertem Zertifikat die entsprechende Checkbox setzen.
   **Trockenlauf:** Im Abschnitt "Trockenlauf (Testmodus)" eine eigene
   Dummy-Adresse eintragen und aktivieren. Dann bleiben alle echten Personen
   und Rollen bestehen, aber **jede** Mail (Begrüßung, Rollenbeschreibung,
   Sonderlagekarten, Bonuskarten, Urkunden) geht nur an die Dummy-Adresse —
   mit Betreff "[TESTLAUF → eigentlicher Empfänger]" und einem Hinweis im
   Text. So siehst du vorab, wie jede Mail ankommt. Solange der Testmodus an
   ist, zeigen Setup und Moderation ein deutliches Warnbanner. Vor dem echten
   Lauf wieder ausschalten.
5. **Branding** (Name/Logo der durchführenden Organisation, Ort) für die
   Urkunden prüfen — Standard ist "EXCON" mit mitgeliefertem Logo, unabhängig
   vom Kundenlogo, das im Szenario selbst steckt (z. B. Waterkant Baumärkte).
   Eigenes Logo per Klick auf "Datei auswählen" hochladen — kein Dateipfad im
   System nötig, landet automatisch am richtigen Ort und wird sofort als
   Vorschau angezeigt. Beides ist bereits hinterlegt, falls du nichts
   hochlädst. Der
   eingetragene **Ort** erscheint zusammen mit dem **Datum** (automatisch das
   Tagesdatum des Laufs) auf jeder Urkunde. Jede Urkunde endet außerdem mit
   einem kurzen Call-to-Action (Link, QR-Code, Screenshot) zum unter "Link auf
   der Urkunde" eingetragenen Ziel — standardmäßig das [BCM Starter
   Kit](../README.md), das eigentliche Produkt, für das diese Übung der
   Einstieg ist. Feld leer lassen, um den Abschnitt wegzulassen.
6. **Zeitmodus** wählen (siehe "Die drei Zeitmodi" unten) und bei Bedarf die
   Schwierigkeit bzw. Zieldauer setzen. Im Zieldauer-Modus zeigt die Setup-Seite
   sofort eine Live-Vorschau, wie viele Karten das ergibt und was entfällt.
7. **"Übung vorbereiten"** klicken — die Krise beginnt damit noch nicht. Schickt automatisch Begrüßung, Spielregeln und
   Rollenbeschreibungen an alle Teilnehmer mit E-Mail (siehe Schritt 3) und
   öffnet danach automatisch die **Moderationsansicht**
   in einem neuen Tab (noch nicht die Bühne!). Erst wenn ihr wirklich bereit
   seid, klickst du dort oben auf **"Bühne öffnen"** — erst in diesem Moment
   geht der Bühnen-Tab auf und die Ambience-Geräusche/-Bilder der "Ruhe vor
   dem Sturm" beginnen. So läuft nie unbeaufsichtigt im Hintergrund etwas,
   während noch niemand hinschaut. Lies in Ruhe Begrüßung und Eröffnung vor,
   verbinde Bildschirmfreigabe/Beamer usw.
8. Erst wenn alle bereit sind: in der Moderationsansicht auf **"Jetzt beginnt
   die Krise — Timer startet in 30s"** klicken. Die eigentliche Krisenuhr
   läuft dann erst **30 Sekunden später** los (mit sichtbarem Countdown auf
   Bühne und Moderation) — genug Zeit für die letzten Worte, bevor spürbar
   etwas passiert. Danach feuert die erste Lagekarte zum geplanten Zeitpunkt.
   Dauert eine Diskussion länger als geplant, pausiert **"Pause"** in der
   Moderation jederzeit die Uhr (keine Karte feuert währenddessen) —
   **"Fortsetzen"** setzt sie fort, ohne die Zieldauer zu verfälschen.
9. Während der Übung: Sonderlagekarten mit festem Zeitpunkt werden automatisch
   per Mail verschickt. Nicht zeitlich festgelegte Sonderlagekarten, die
   Bonuskarten und — im Zieldauer-Modus — aus Zeitgründen übersprungene Karten
   löst/holst du bei Bedarf manuell in der Moderationsansicht nach.
   Ist die eigentliche Rolle einer vertraulichen Karte nicht besetzt, geht sie
   automatisch an eine passende Ersatzrolle (z. B. Kündigung in der IT an die
   Geschäftsführung, wenn Personal fehlt). Unter **"Verschickte vertrauliche
   Karten"** siehst du jederzeit, was bei wem kursiert, inklusive
   Bewertungshilfe. Bei jeder Lagekarte zeigt die Moderation, welche Rollen
   besonders gefordert sind und ob sie besetzt sind.
   An einigen Lagen hält die Moderation unter **„Entscheidungen mit
   Folgen“** fest, wie der Tisch entschieden hat (z. B. Anlagen am Netz
   lassen oder trennen, Lösegeld ja/nein). Spätere Lagekarten bekommen dann
   einen passenden Satz dazu, manchmal folgt eine vertrauliche Karte, und die
   Rechnung im Abschluss passt sich an. Die Geschichte bleibt im Kern gleich.
   Unter **„Übungsprotokoll“** lädt die Moderation jederzeit ein Protokoll
   als Markdown-Datei herunter: gespielte Lagen, Entscheidungen, verschickte
   vertrauliche Karten, Rechnung, Debriefing-Fragen mit Platz für Notizen und
   ein leerer Maßnahmenplan (drei Verbesserungen mit Verantwortlichen,
   Priorität und Termin). Namen der Teilnehmenden stehen nicht darin.
   Das **Spielbrett** ("Wer ist am Zug?") steht auf der Bühne in der
   Seitenleiste und in der Moderation: alle besetzten Rollen mit Namen,
   sortiert nach dem Meldeweg — **Meldungen von draußen** (Service-Desk,
   Kundenservice/Hotline, Standorte), **Krisenstab**, **Weitergabe** nach innen
   und außen. Blau markiert ("am Zug") sind die Rollen, die bei der aktuellen
   Lage gefordert sind, gelb ("neue Info") die, die seit Beginn dieser Lage
   eine vertrauliche Karte bekommen haben — ohne deren Inhalt zu verraten. So
   behält der Tisch im Blick, wen er gerade fragen muss.
   Der **Prozessablauf** oben in der Moderationsansicht zeigt jederzeit, wo du
   stehst und was noch kommt. Läuft eine Diskussion deutlich kürzer oder
   länger als geplant, hast du zwei Möglichkeiten: bei der gewünschten Karte
   in "Nächste Ereignisse" auf **"Zeitsprung hierhin"** klicken, oder direkt
   am **Zeit-Schieberegler** im Prozessablauf auf eine beliebige Minute ziehen
   (z. B. 43,2 statt nur die nächste Kartenminute). Beides überspringt dabei
   fällig werdende Sonderlagekarten nicht (sie werden beim Zeitsprung mit
   ausgelöst/verschickt).
10. **Abschluss: "Alles läuft wieder?"** Ist die Übungszeit abgelaufen,
   wechselt die Bühne automatisch in den Abschluss (oder vorher per Klick auf
   "Krise beenden – Abschluss zeigen" in der Moderation). Mit **"Weiter"**
   (oder Pfeiltaste/Leertaste in der Moderation) deckst du Schritt für Schritt
   auf: erst die **Nacharbeiten** (z. B. 5.600 handschriftliche Lieferscheine,
   190.000 E-Mails im Rückstau, 87 Lkw-Ladungen Rückstand), dann die
   **Rechnung** Posten für Posten mit laufender Summe und jeweils "Was vorher
   geholfen hätte", dann die **Bilanz** (Schaden, Versicherung, Eigenanteil),
   dann **was das bedeutet** (Anteil am Jahresgewinn, nötiger Zusatzumsatz)
   und zum Schluss das **Fazit**: Eine Krise ist erst vorbei, wenn die Kunden
   wieder vertrauen. Posten, die von Entscheidungen in der Übung abhängen
   (z. B. Lösegeld gezahlt?), hakst du in der Moderation an oder ab. Alle
   Zahlen sind fiktive Beispielrechnungen, das steht auch auf der Bühne. Im
   Zieldauer-Modus ist dafür Zeit reserviert (10 % der Dauer, 4–15 Min.).
   **Nachrichtenbericht live oder als Aufnahme:** Beim Nordkanal-Sonderbericht
   zeigt die Moderation einen fertigen Sprechertext (ca. 50 Sekunden). Den
   können Sie live über Mikrofon und Box vorlesen. Alternativ sprechen Sie ihn
   vorher im Setup unter **„Eigene Töne für Lagekarten“** ein (oder wählen
   eine Audiodatei). Dann spielt die Bühne ihn automatisch ab, und in der
   Moderation gibt es „Ton noch einmal abspielen“. Das geht für jede
   Lagekarte. **Anrufe** (Presse, Automobilkunde, Werkschutz, Schichtleitung):
   Die Bühne klingelt bzw. funkt kurz, die Moderation spricht den Anrufer nach
   dem Sprechertext und bleibt für Rückfragen in der Rolle. Aufnahmen bleiben nur auf diesem Rechner (`media/custom/`) und
   sind im Browser nur möglich, wenn die App unter `http://localhost:4173`
   geöffnet ist.
11. **Urkunden:** Nach dem Debriefing in der Moderation auf "Alle Urkunden
   senden" (oder pro Person "Per E-Mail senden") klicken. Die Urkunde ist
   eine Teilnahmebestätigung ohne Note: "… hat an der BCM-Krisensimulation
   … in der Rolle … erfolgreich teilgenommen", mit Ort und Tagesdatum.
   Bewusst ohne Bewertung: Eine Übung lebt davon, dass Fehler erlaubt sind,
   und eine schriftliche Leistungsbewertung von Mitarbeitenden ist ein
   Personalthema. "Vorschau" zeigt die Urkunde im Browser an.

## Spannungsbogen: von "alles läuft" bis "alles läuft wieder"

Jede Lagekarte gehört zu einem Akt: **Vorboten → Ausbruch → Eskalation →
Höhepunkt → Folgen → Wiederanlauf**. Egal ob 45 Minuten oder 3 Stunden: Die
Bühne zeigt vorher das Unternehmen im Normalbetrieb (NordTech-Werk zum
Schichtbeginn, Waterkant-Zentrale in der Nacht vor dem Saisonstart) mit ruhigem
Hintergrundgeräusch. Nach dem Krisenstart kommt nicht sofort der Knall,
sondern erst zwei bis drei **Vorboten**, also kleine, harmlos wirkende
Meldungen (NordTech: ERP-Anmeldung hakt, Maschine 4 zeigt Dateien mit der
Endung .shadowvault, keine Aufträge mehr; Waterkant: Batteriewarnung der
USV, Geruch im Technikflur, Serverraum wird warm). Das
Hintergrundgeräusch läuft dabei weiter. Vorboten kosten nur die im Drehbuch
eingestellte Zeit (`standardablauf.vorbotenMinuten`, in beiden Drehbüchern
3 Minuten; wird es knapp, mindestens 2 Minuten), ohne Sprechrunde. Erst dann folgt der Ausbruch. Die Übung
durchläuft jeden Akt mindestens
einmal und endet mit dem Wiederanlauf, gefolgt vom Abschluss (Nacharbeiten und
Rechnung). Kürzere Übungen bekommen weniger Karten pro Akt, nicht weniger
Akte. Bei NordTech ist der Höhepunkt "Beirat fordert Lagebericht": Die
Krisenstabsleitung muss in kurzer Zeit eine belastbare Lage vortragen,
kurz vorher bekommt sie vertraulich zusätzlichen persönlichen Druck.
Vertrauliche Karten kosten keine eigene Spielzeit, sie landen in der
Diskussionsphase der vorangehenden Lagekarte; ihre Menge ist gedeckelt, damit
niemand mit Karten überflutet wird. Die Moderation zeigt bei jeder Lagekarte
den Akt an, die Setup-Vorschau zeigt den geplanten Bogen.

## Die drei Zeitmodi

| Modus | Wann nutzen | Was passiert |
|---|---|---|
| **Erprobte Zeiten** | Gruppe liegt nahe an der Referenzgröße (~18–20 Personen) | Feste, im Playbook bereits live getestete Minutenangaben (87 Min. Übungszeit), unverändert. |
| **Berechnet** | Du willst das **vollständige** Drehbuch, aber die Dauer soll sich der tatsächlichen Rollenzahl/Schwierigkeit anpassen | Alle Lagekarten + alle terminierten Sonderlagekarten bleiben erhalten; die Zeit je Lagekarte (Lesezeit + 30 Sek. je aktivem Funktionsbereich + Entscheidungszeit nach Schwierigkeit) bestimmt die Gesamtdauer — kann je nach Rollenzahl auch deutlich von 87 Min. abweichen. |
| **Zieldauer** | Du hast ein festes Zeitfenster (z. B. 45 Min. Workshop-Slot, 90 Min. Standard, 2 Std. Deep-Dive) und die **Lage soll sich daran anpassen** | Du gibst die gewünschte Gesamtdauer vor (Presets 45/60/90/120/180 Min. oder eigene Minutenzahl). Davon gehen ca. 10 % (4–15 Min.) für den Abschluss ab. Die App wählt Karten nach Priorität: **Kernszenen** und **mindestens eine Lagekarte je Akt des Spannungsbogens** sind immer dabei, danach bekommt **jede besetzte Rolle garantiert mindestens eine eigene Sonderlagekarte**, dann kommen wichtige Karten dazu, solange Zeit bleibt, optionale zuletzt. Vertrauliche Karten für Rollen, die niemand spielt, werden gar nicht erst eingeplant (in allen drei Zeitmodi). Die Setup-Vorschau zeigt an, ob wirklich jede besetzte Rolle eine Karte bekommt. Reicht die Zeit selbst für die Kernszenen nicht, werden die Entscheidungsphasen komprimiert (mit Mindestdauer) statt weitere Karten zu streichen — reicht sie trotzdem nicht, wird das ehrlich als Warnung angezeigt, statt die Zieldauer stillschweigend zu überschreiten. Ist mehr Zeit vorhanden als nötig, werden die Entscheidungsphasen stattdessen verlängert. Übersprungene Karten lassen sich in der Moderationsansicht jederzeit einzeln nachträglich aufnehmen. |

## Ein Drehbuch erweitern oder ein neues anlegen

Das Drehbuch liegt als lesbare JSON-Datei unter `data/scenario.<name>.json`.
Mitgeliefert sind zwei vollständig unabhängige Beispielszenarien aus
unterschiedlichen Branchen:

- `data/scenario.nordtech.json` — "7 Tage im Ausnahmezustand": Ransomware-Angriff
  bei einem fiktiven produzierenden Mittelständler (Automobil-/Pharmazulieferer).
  Wird ohne `SCENARIO_FILE` automatisch geladen (alphabetisch erste Datei).
- `data/scenario.waterkant.json` — "Wenn das Rechenzentrum brennt": Brand im
  eigenen Rechenzentrum eines fiktiven Baumarktunternehmens, das auch neun
  Partnermärkte mit Kassen- und Warenwirtschaftsdiensten versorgt. Physische
  statt Cyber-Krise: Personenschutz, gesperrter Serverraum, Ausweichbetrieb,
  Datenlücke, Saisonstart. Die frühere Fassung (Lagerbrand) liegt unter
  `data/archiv/` und wird nicht geladen.

Beide dienen als Vorlage für eigene Branchen (z. B. Spedition, Handwerk,
Dienstleistung) — Datei kopieren, Inhalte ersetzen. Struktur:

- `roles` / `roleGroups` — Personas und ihre Funktionsbereiche
- `lagekarten[]` — öffentliche Ereignisse mit `minuteOffset` (Minute ab
  Übungsstart), Text, Kriseninfo, Aufgaben, `prioritaet` (1 = Kernszene, nie
  weglassen; 2 = wichtig; 3 = zuerst gekürzt — relevant für den Zieldauer-Modus),
  optional `media`
- `sonderlagekarten[]` — vertrauliche, rollenbezogene Karten mit `prioritaet`
  (wie oben) sowie
  `empfaenger` (Rollen-ID), optionalem `minuteOffset` (leer = nur manuell
  auslösbar), `moderatorGut`/`moderatorSchlecht` als Einschätzungshilfe
  (in der Moderation sichtbar, sobald die Karte verschickt ist) und
  `fallbackEmpfaenger` (Liste von Rollen-IDs): Ist die eigentliche Rolle
  nicht besetzt, geht die Karte an die erste besetzte Ersatzrolle, mit einem
  Hinweis in der Mail, warum sie dort landet. Ist auch keine Ersatzrolle
  besetzt, wird die Karte gar nicht erst eingeplant. Texte deshalb so
  formulieren, dass sie auch für die Ersatzrolle Sinn ergeben.
- Lagekarten haben zusätzlich `zustaendig` (Rollen-IDs): Die Moderation zeigt
  an, welche davon besetzt sind, und warnt, wenn keine besetzt ist. Im
  Zieldauer-Modus werden solche Lagekarten beim Auffüllen hintangestellt.
- Rollen haben `ebene` (`eingang`, `krisenstab` oder `verteilung`): ordnet
  sie auf dem Spielbrett dem Meldeweg zu. Ohne Angabe gilt `krisenstab`.
- Inhaltliche Abhängigkeiten: `voraussetzung` (Liste von Lagekarten-IDs) an
  einer Lagekarte zieht diese Lagekarten im Zieldauer-Modus mit in den Plan;
  an einer vertraulichen Karte bedeutet es: Die Karte kommt nur, wenn alle
  Voraussetzungen gespielt werden, und immer danach (z. B. „ERP aus dem
  Backup wiederhergestellt“ nur nach „Backups gefunden“). `zuBeginnVon`
  lässt eine vertrauliche Karte direkt mit einer bestimmten Lagekarte
  kommen (z. B. der Anruf des Beiratsmitglieds mit dem Beirats-Lagebericht).
- Zeitbindung: Jede vertrauliche Karte gehört zu der Lage, in die ihre
  Minute im vollständigen Drehbuch fällt („Heimatlage“). Sie kommt nie
  früher; fehlt die Heimatlage in einer kurzen Übung, kommt sie mit der
  nächsten gespielten Lage. Texte deshalb so formulieren, dass sie auch
  etwas später noch stimmen. Mit `"nurInEigenerLage": true` entfällt die
  Karte stattdessen, wenn ihre Heimatlage nicht gespielt wird.
  `npm run pruefen` prüft Abhängigkeiten und Zeitbindung in allen Simulationen.
- `weichen[]` (optional): Entscheidungen mit Folgen. Jede Weiche hängt an
  der ersten ihrer `lagekarten`, die im Plan ist, und hat eine `frage` und
  mindestens zwei `optionen`. Eine Option kann späteren Lagekarten einen Satz
  hinzufügen oder ihre Krisen-Info ersetzen (`folgen`: `lagekarte`,
  `zusatz`, `kriseninfo`), eine vertrauliche Folgekarte verschicken, sobald
  eine bestimmte Lagekarte erreicht ist (`karte`: `sonderlagekarte`,
  `beiLagekarte`; die Karte trägt `"nurNachWeiche": true` und hat keine
  Minute), und Posten im Abschluss einrechnen (`posten`: IDs aus
  `nachspiel.optionalePosten`). Die Moderation hält die Entscheidung in der
  Karte „Entscheidungen mit Folgen“ fest; ohne Eintrag bleibt die Geschichte
  wie im Drehbuch. Folgen sollten auf Lagekarten mit Priorität 1 zielen,
  damit sie auch in kurzen Übungen ankommen (prüft `npm run pruefen`). Eine Weiche kann einen
  `hinweis` für die Moderation haben; mehrere Weichen an derselben Lage
  werden untereinander angezeigt. Eine Option kann auch den Text einer
  vertraulichen Karte ersetzen (`folgen`: `sonderlagekarte`, `text`) oder
  eine geplante vertrauliche Karte vorziehen (`karte`).
- Vertrauliche Karten können `textVarianten` haben
  (`[{ "nachLagekarte": "LK15", "text": "…" }]`): Ist diese Lage beim
  Verschicken schon gezeigt, gilt der andere Text – z. B. Prognose vor dem
  Wiederanlauf, Bestätigung danach.
- Rollen können `alteIds` haben: Wird eine Rolle umbenannt, übernehmen
  gespeicherte Teilnehmerlisten und Vorlagen mit der alten ID automatisch die
  neue Rolle.
- Lagekarten können wie vertrauliche Karten `moderatorGut` und
  `moderatorSchlecht` haben (Bewertungshilfe in der Moderation).
  Bonuskarten können `voraussetzung` haben: Sie lassen sich erst auslösen,
  wenn diese Lagekarten gezeigt wurden. Mit `minDauer` (Minuten) sind sie nur in
  Übungen ab dieser geplanten Dauer auslösbar.
- `schwerpunkte[]` (optional): Übungsschwerpunkte (`key`, `label`,
  `beschreibung`, `karten`: Liste von Lage-, vertraulichen und Bonuskarten).
  Im Setup bei „Zieldauer“ wählbar. Pflichtkarten und Spannungsbogen bleiben
  gleich; die Karten des Schwerpunkts werden beim Auffüllen bevorzugt, und
  passende Bonuskarten stehen in der Moderation oben mit dem Hinweis „passt
  zum Schwerpunkt“.
  Ein Schwerpunkt verändert auch, worüber der Tisch entscheidet:
  `zusatzfragen` (Lagekarten-ID → Frage) ergänzt die Fragen auf der Bühne,
  `leitfrage` steht für die Moderation bei jeder Lage, `debriefing` ergänzt
  die Debriefing-Fragen, und `pflicht` (IDs vertraulicher Karten) setzt
  Karten, die bei diesem Schwerpunkt immer kommen, sofern Rolle oder
  Ersatzrolle besetzt sind.
- `standardablauf.rollenPrioritaet` (optional): feste Reihenfolge für
  „Passende Rollen vorschlagen“ – bei 45 Minuten die ersten 5, bei 90 die
  ersten 9 usw. Ohne Angabe wählt die App nach Häufigkeit auf den Lagekarten.
- Lagekarten haben außerdem `akt` (`vorboten`, `ausbruch`, `eskalation`,
  `hoehepunkt`, `folgen` oder `wiederanlauf`): Daraus baut der Zieldauer-Modus den
  Spannungsbogen. Jeder Akt braucht mindestens eine Lagekarte.
- `bonuskarten[]` — manuell einsetzbare Zusatzereignisse (ebenfalls mit
  `fallbackEmpfaenger`, optional `moderatorHinweis`). Standard: privat per
  E-Mail an eine Rolle. Mit `oeffentlich: true` erscheinen sie stattdessen als
  „Überraschung“ auf der Bühne: `titel`, `buehnentext`, optional `kriseninfo`,
  `media`, `sound` (einmalig), `sprechertext` (Abschrift bzw. Text zum
  Sprechen) und `regie` für die Moderation. `unterbrechung` (`rolle`,
  `minuten`, `text`) nimmt eine Rolle für einige Minuten aus dem Spiel
  (Countdown auf der Bühne, „nicht erreichbar“ im Spielbrett);
  `erfordertBesetzt` sperrt die Karte, solange diese Rolle nicht besetzt ist.
- Lagekarten können `sprechertext` haben: ein Text zum Vorlesen oder
  Einsprechen (z. B. ein Nachrichtenbericht), der in der Moderation und im
  Setup unter „Eigene Töne“ erscheint. Hat die Lagekarte zusätzlich einen
  kurzen `sound` (z. B. Telefonklingeln), spielt die Bühne das Signal und die
  Moderation spricht den Anrufer danach live – Rückfragen sind so möglich.
  Dafür `sound.signal: true` setzen; ohne `signal` gilt der Ton als fertige
  Einspielung und der Sprechertext als Abschrift. `gespraech` (`nachfragen[]`,
  `abschluss`, optional `gut`/`schwach`) gibt der Moderation einen
  Gesprächsleitfaden. Eine eigene Aufnahme ersetzt Signal und Sprechertext.
- `nachspiel` — der Abschluss: `titel`, `einleitung`, `nacharbeiten[]`
  (`zahl`, `text`), `rechnung[]` (`posten`, `betrag`, `bcmHebel` = was vorher
  geholfen hätte), `optionalePosten[]` (zusätzlich `id` und `frage`, in der
  Moderation an-/abwählbar), `versicherung` (`text`, `betrag`),
  `jahresumsatz`, `umsatzrendite` (z. B. `0.05`), `fazit` und `hinweis`
  (z. B. "Fiktive Beispielrechnung")

**Drehbuch prüfen:** Nach jeder Änderung `npm run pruefen` ausführen. Die
Prüfung kontrolliert Verweise auf Rollen, Prioritäten und feste Zeitangaben
in Texten und simuliert je Szenario 2000 zufällige Besetzungen mit
unterschiedlicher Dauer (25 Min. bis 3 Std.) und Schwierigkeit: Jede besetzte
Rolle muss eine eigene Karte bekommen, keine Karte darf ins Leere laufen, und
jeder Plan muss mit den Vorboten beginnen, alle Akte in der richtigen
Reihenfolge enthalten und mit dem Wiederanlauf enden. Außerdem wird der Abschluss geprüft (Beträge,
Versicherung nicht höher als der Schaden, Fazit vorhanden). Das Ergebnis
steht außerdem im Setup unter dem Szenario.

**Weitere Dateien (Bilder oder Video) ablegen:** einfach in `media/` speichern
— z. B. `media/lk10-ndr-ausschnitt.mp4`. Dann bei der betreffenden Lagekarte
in der JSON-Datei ergänzen:

```json
"media": { "type": "video", "src": "/media/lk10-ndr-ausschnitt.mp4", "caption": "NDR-Sonderbericht" }
```

(`"type": "image"` für Bilder.) Die Bühne spielt/zeigt die Datei automatisch,
sobald diese Lagekarte aktiv wird. **Grundsatz:** Jede Lagekarte sollte nach
Möglichkeit ein Bild/Video haben — das vermittelt deutlich mehr als reiner
Text und verhindert eine leere Bühne.

**Eigene Sounds (Ambience/Effekte) einbinden:** Audiodateien (mp3/ogg) selbst
aufnehmen oder aus einer Sound-Bibliothek besorgen, in `media/` ablegen und
referenzieren:

```json
// Oben im Szenario, auf gleicher Ebene wie "roles" — Dauerschleife, solange
// noch keine Lagekarte aktiv ist (z. B. ruhige Büro-/Hallenatmosphäre):
"sounds": { "idle": { "src": "/media/nordtech/ambience-buero.mp3", "loop": true, "volume": 0.5 } }
```

```json
// Bei einer einzelnen Lagekarte — spielt einmalig (oder als Loop), sobald
// diese Karte aktiv wird, z. B. Alarm/Maschinenstillstand beim Störfall:
"sound": { "src": "/media/nordtech/lk01-alarm.mp3", "loop": false, "volume": 0.7 }
```

Die Bühne fragt beim ersten Laden einmal per Klick ("Ton aktivieren") die
Erlaubnis zur Audiowiedergabe ab (Browser blockieren Ton sonst), danach läuft
alles automatisch mit.

Beide Szenarien nutzen eine Dauerschleife für die Vorlaufphase
(Maschinenraum bei NordTech, Lüfter und Klima im Rechenzentrum bei Waterkant)
und Töne nur an Karten, bei denen ein Signal oder eine Einspielung die Lage
trägt (Alarm, Anruf, Funk, Nachrichten). Jeder Ton endet von selbst, ist in
der Moderation stummschaltbar und führt keine Fakten ein, die nicht auch auf
der Karte stehen; Alarmtöne zeigen auf der Bühne „Übungseinspielung – kein
echter Alarm“. Welche Karte welchen Ton hat, steht in der Medienliste
(`node tools/medienliste.js data/scenario.<name>.json liste.md`). Die Dateien
sind synthetisch erzeugt (Klangsynthese, freie Sprachsynthese-Stimmen), keine
Aufnahmen realer Personen oder Orte.
Wer echte Aufnahmen hat, ersetzt einfach die Dateien unter `media/<firma>/`,
ohne den JSON-Verweis zu ändern.

**Weitere Karten hinzufügen:** einfach ein neues Objekt in `lagekarten[]` bzw.
`sonderlagekarten[]` ergänzen. Der Server liest die Datei bei jedem Start neu
ein — kein Build-Schritt nötig.

**Ein weiteres Szenario anlegen:** Datei kopieren, z. B. zu
`data/scenario.andererkunde.json`, Inhalte anpassen. Jede `scenario.*.json`-
Datei in `data/` erscheint automatisch im **Szenario**-Dropdown oben im Setup
— das ist der normale Weg, zwischen mehreren Drehbüchern zu wechseln (merkt
sich die Auswahl auch über einen Neustart hinweg). Die Umgebungsvariable
`SCENARIO_FILE` bleibt als Override für Kommandozeilen-/Skript-Nutzung
erhalten und hat Vorrang vor der im Setup gespeicherten Auswahl; die
Schreibweise unterscheidet sich je nach Betriebssystem/Shell:

- **Windows, Eingabeaufforderung (cmd):**
  `set SCENARIO_FILE=scenario.waterkant.json && npm start`
- **Windows, PowerShell:**
  `$env:SCENARIO_FILE="scenario.waterkant.json"; npm start`
- **macOS/Linux:**
  `SCENARIO_FILE=scenario.waterkant.json npm start`

(Für ein eigenes Szenario `scenario.waterkant.json` oben entsprechend durch
den eigenen Dateinamen ersetzen, z. B. `scenario.andererkunde.json`.)

## Datenschutz & Lokalität

- Keine Cloud, keine externe Datenbank. Teilnehmerdaten, Bewertungen und der
  Laufstatus liegen ausschließlich lokal unter `data/` (nicht eingecheckt,
  siehe `.gitignore`).
- Die einzige externe Verbindung ist der von dir konfigurierte SMTP-Server.
- SMTP-Zugangsdaten liegen lokal in `data/settings.json` — niemals committen.
- Eine heruntergeladene **Vorlage** (JSON-Datei) enthält bewusst das echte
  SMTP-Passwort sowie alle eingetragenen Teilnehmernamen/-E-Mails im Klartext
  — ohne Passwort wäre sie beim Wiedereinspielen nutzlos. Diese Datei also
  genauso behandeln wie `data/settings.json`: lokal aufbewahren, nicht
  committen, nicht unverschlüsselt per Mail verschicken.

## Bekannte Grenzen (v1)

- Kein Mehrfach-Nutzer-Betrieb: ein Lauf zur Zeit, ein Moderator.
- Keine echte SMS — nur E-Mail (Begründung: SMS erfordert einen kostenpflichtigen
  Drittanbieter mit eigenem API-Zugang; E-Mail erreicht in der Praxis ebenfalls
  das Handy).
- Die automatisch berechnete Zeit (`"durationMode": "computed"`) ist eine
  Schätzung nach der im Playbook beschriebenen Formel, keine erneut
  "erprobte" Zeitplanung wie im Original-Drehbuch für die Referenzgruppe.
