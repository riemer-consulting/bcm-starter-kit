# BCM Tabletop-Regie

Eine lokale Regie-App zum Durchführen von BCM-Tabletop-Übungen (Krisensimulationen)
mit Live-Timer, Rollen, Bühnen-/Moderatoransicht, E-Mail-Benachrichtigungen an
einzelne Rollen und einer Bewertungsmatrix mit E-Mail-Versand der Urkunden
(kein Ausdrucken nötig).

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
  Sonderkarten, eine live ausfüllbare **Bewertungsmatrix** und **Urkunden
  direkt per E-Mail** an jede einzelne Person — kein Drucken, kein manuelles
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
wählen — installiert beim ersten Mal automatisch die Abhängigkeiten.

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
2. **Rollen für diesen Lauf auswählen.** Bei kleineren Gruppen muss nicht
   die komplette Rollenliste (15-20 Einträge) zur Auswahl stehen — Teilnehmerzahl
   eintragen und auf "Passende Rollen vorschlagen" klicken (wählt automatisch
   eine fachlich breite Auswahl über alle Funktionsbereiche hinweg), oder
   Rollen einzeln anhaken. Nur angehakte Rollen erscheinen danach in der
   Teilnehmerzuweisung, der Bewertungsmatrix und bei "Manuell auslösen". Zu
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
   Lagekarten mit, tauchen nicht in der Bewertungsmatrix auf (keine feste
   Funktion zu bewerten) und erhalten am Ende trotzdem eine eigene Urkunde.
   Begrüßung/Spielregeln und Rollenbeschreibung sind **Pflicht, nicht
   optional**: Beim Klick auf "Übung starten" (Schritt 7) schickt die App
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
7. **"Übung starten"** klickt — schickt automatisch Begrüßung, Spielregeln und
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
   Der **Prozessablauf** oben in der Moderationsansicht zeigt jederzeit, wo du
   stehst und was noch kommt. Läuft eine Diskussion deutlich kürzer oder
   länger als geplant, hast du zwei Möglichkeiten: bei der gewünschten Karte
   in "Nächste Ereignisse" auf **"Zeitsprung hierhin"** klicken, oder direkt
   am **Zeit-Schieberegler** im Prozessablauf auf eine beliebige Minute ziehen
   (z. B. 43,2 statt nur die nächste Kartenminute). Beides überspringt dabei
   fällig werdende Sonderlagekarten nicht (sie werden beim Zeitsprung mit
   ausgelöst/verschickt).
10. Bewertung direkt während/nach der Übung in der Matrix eintragen (die
   generische "Teilnehmer"-Rolle ohne feste Funktion erscheint hier bewusst
   nicht), danach pro Person unter "Urkunden" auf "Per E-Mail senden"
   klicken — die Urkunde geht direkt an die hinterlegte Adresse, mit Ort und
   Tagesdatum. "Vorschau" zeigt sie zusätzlich im Browser an.

## Die drei Zeitmodi

| Modus | Wann nutzen | Was passiert |
|---|---|---|
| **Erprobte Zeiten** | Gruppe liegt nahe an der Referenzgröße (~18–20 Personen) | Feste, im Playbook bereits live getestete Minutenangaben (87 Min. Übungszeit), unverändert. |
| **Berechnet** | Du willst das **vollständige** Drehbuch, aber die Dauer soll sich der tatsächlichen Rollenzahl/Schwierigkeit anpassen | Alle 15 Lagekarten + alle terminierten Sonderlagekarten bleiben erhalten; die Zeit je Lagekarte (Lesezeit + 30 Sek. je aktivem Funktionsbereich + Entscheidungszeit nach Schwierigkeit) bestimmt die Gesamtdauer — kann je nach Rollenzahl auch deutlich von 87 Min. abweichen. |
| **Zieldauer** | Du hast ein festes Zeitfenster (z. B. 45 Min. Workshop-Slot, 90 Min. Standard, 2 Std. Deep-Dive) und die **Lage soll sich daran anpassen** | Du gibst die gewünschte Gesamtdauer vor (Presets 45/60/90/120 Min. oder eigene Minutenzahl). Die App wählt Karten nach Priorität: **Kernszenen** (Start, der Beirat-Höhepunkt, Ende) sind immer dabei, danach bekommt **jede besetzte Rolle garantiert mindestens eine eigene Sonderlagekarte**, dann kommen wichtige Karten dazu, solange Zeit bleibt, optionale zuletzt. Vertrauliche Karten für Rollen, die niemand spielt, werden gar nicht erst eingeplant (in allen drei Zeitmodi). Die Setup-Vorschau zeigt an, ob wirklich jede besetzte Rolle eine Karte bekommt. Reicht die Zeit selbst für die Kernszenen nicht, werden die Entscheidungsphasen komprimiert (mit Mindestdauer) statt weitere Karten zu streichen — reicht sie trotzdem nicht, wird das ehrlich als Warnung angezeigt, statt die Zieldauer stillschweigend zu überschreiten. Ist mehr Zeit vorhanden als nötig, werden die Entscheidungsphasen stattdessen verlängert. Übersprungene Karten lassen sich in der Moderationsansicht jederzeit einzeln nachträglich aufnehmen. |

## Ein Drehbuch erweitern oder ein neues anlegen

Das Drehbuch liegt als lesbare JSON-Datei unter `data/scenario.<name>.json`.
Mitgeliefert sind zwei vollständig unabhängige Beispielszenarien aus
unterschiedlichen Branchen:

- `data/scenario.nordtech.json` — "7 Tage im Ausnahmezustand": Ransomware-Angriff
  bei einem fiktiven produzierenden Mittelständler (Automobil-/Pharmazulieferer).
  Wird ohne `SCENARIO_FILE` automatisch geladen (alphabetisch erste Datei).
- `data/scenario.waterkant.json` — "72 Stunden in Flammen": Großbrand im
  Zentrallager eines fiktiven Baumarkt-/Einzelhandelsunternehmens, mit ganz
  anderen Rollen (Logistik, Filialen, Online-Shop, Arbeitssicherheit statt
  IT-Wiederanlauf) und einer physischen statt einer Cyber-Krise.

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
- `bonuskarten[]` — manuell einsetzbare Zusatzereignisse (ebenfalls mit
  `fallbackEmpfaenger`, optional `moderatorHinweis`)

**Drehbuch prüfen:** Nach jeder Änderung `npm run pruefen` ausführen. Die
Prüfung kontrolliert Verweise auf Rollen, Prioritäten und feste Zeitangaben
in Texten und simuliert je Szenario 2000 zufällige Besetzungen mit
unterschiedlicher Dauer und Schwierigkeit: Jede besetzte Rolle muss eine
eigene Karte bekommen, und keine Karte darf ins Leere laufen. Das Ergebnis
steht außerdem im Setup unter dem Szenario.

**Weitere Dateien (Bilder, Video, PDF) ablegen:** einfach in `media/` speichern
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

Beide Szenarien in diesem Repo nutzen das **bewusst sparsam**: eine
durchgehende Dauerschleife für die Vorlaufphase (Maschinenraum-Atmosphäre bei
NordTech, Kundschaftsmurmeln bei Waterkant) und genau **ein** Kontrast-Moment
beim Krisenausbruch (NordTech: Maschinen stoppen, bedrücktes Gemurmel seit
"Cyberangriff"; Waterkant: Unruhe an der Kasse seit "Filialen öffnen
trotzdem") — nicht mehr. Die Dateien sind synthetisch erzeugt (keine
Field-Recordings, keine Sprachaufnahmen), funktionieren aber als Atmosphäre.
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
