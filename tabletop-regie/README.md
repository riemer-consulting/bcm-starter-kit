# BCM Tabletop-Regie

Eine lokale Regie-App zum Durchführen von BCM-Tabletop-Übungen (Krisensimulationen)
mit Live-Timer, Rollen, Bühnen-/Moderatoransicht, E-Mail-Benachrichtigungen an
einzelne Rollen und einer Bewertungsmatrix mit Urkundendruck.

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
- Die **Moderationsansicht** (nicht teilen!) zeigt kommende Ereignisse, erlaubt
  manuelles Auslösen von Bonus-/Sonderkarten, enthält eine live ausfüllbare
  **Bewertungsmatrix** und erzeugt druckfertige **Urkunden**.
- Die Übungsdauer passt sich **Gruppengröße und Schwierigkeit** an, in drei
  wählbaren Zeitmodi (siehe unten): erprobte feste Zeiten, automatisch nach
  Rollenzahl berechnet (volles Drehbuch), oder eine **Zieldauer vorgeben**
  (z. B. 45/90/120 Minuten) — die App schneidet dann Kartenauswahl und
  Diskussionszeiten passend zu.

## Installation & Start

Voraussetzung: [Node.js](https://nodejs.org/) (LTS-Version) ist auf dem Rechner
installiert — Windows, macOS und Linux funktionieren alle gleich gut, es gibt
keine Linux-spezifischen Pfade oder Abhängigkeiten.

**Unter Windows:** Ordner `tabletop-regie` im Explorer öffnen, in die
Adresszeile oben `cmd` eintippen und Enter drücken — das öffnet eine
Eingabeaufforderung direkt in diesem Ordner. Dort:

```
npm install
npm start
```

**Unter macOS/Linux:** Terminal öffnen, dann:

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

Die App läuft ausschließlich lokal. Die einzige ausgehende Netzwerkverbindung
ist der von dir eingetragene SMTP-Server für die Sonderlagekarten-Mails.

## Ablauf einer Übung

1. **Setup öffnen.** Teilnehmer eintragen (Name, E-Mail, ggf. "Remote"-Haken)
   und Rollen zuweisen — entweder "Alle 20 Einzelrollen" (volle Besetzung) oder
   "Kompakt: 8 Funktionsbereiche" (für kleinere Gruppen), oder frei von Hand.
2. **SMTP-Server eintragen** und mit "Test-E-Mail senden" prüfen. Bei internen
   Servern mit selbstsigniertem Zertifikat die entsprechende Checkbox setzen.
3. **Branding** (Name/Logo der durchführenden Organisation) für die Urkunden
   eintragen — unabhängig vom Kundenlogo, das im Szenario selbst steckt.
4. **Zeitmodus** wählen (siehe "Die drei Zeitmodi" unten) und bei Bedarf die
   Schwierigkeit bzw. Zieldauer setzen. Im Zieldauer-Modus zeigt die Setup-Seite
   sofort eine Live-Vorschau, wie viele Karten das ergibt und was entfällt.
5. **"Übung starten"** klickt — öffnet automatisch Bühne und Moderation in
   neuen Tabs/Fenstern. Den Bühnen-Tab per Bildschirmfreigabe/Beamer zeigen,
   die Moderation läuft parallel auf deinem eigenen, nicht geteilten Bildschirm.
6. Während der Übung: Sonderlagekarten mit festem Zeitpunkt werden automatisch
   per Mail verschickt. Nicht zeitlich festgelegte Sonderlagekarten, die
   Bonuskarten und — im Zieldauer-Modus — aus Zeitgründen übersprungene Karten
   löst/holst du bei Bedarf manuell in der Moderationsansicht nach.
7. Bewertung direkt während/nach der Übung in der Matrix eintragen, danach pro
   Teilnehmer die Urkunde öffnen und drucken (Browser-Druckdialog → "Als PDF
   speichern").

## Die drei Zeitmodi

| Modus | Wann nutzen | Was passiert |
|---|---|---|
| **Erprobte Zeiten** | Gruppe liegt nahe an der Referenzgröße (~18–20 Personen) | Feste, im Playbook bereits live getestete Minutenangaben (87 Min. Übungszeit), unverändert. |
| **Berechnet** | Du willst das **vollständige** Drehbuch, aber die Dauer soll sich der tatsächlichen Rollenzahl/Schwierigkeit anpassen | Alle 15 Lagekarten + alle terminierten Sonderlagekarten bleiben erhalten; die Zeit je Lagekarte (Lesezeit + 30 Sek. je aktivem Funktionsbereich + Entscheidungszeit nach Schwierigkeit) bestimmt die Gesamtdauer — kann je nach Rollenzahl auch deutlich von 87 Min. abweichen. |
| **Zieldauer** | Du hast ein festes Zeitfenster (z. B. 45 Min. Workshop-Slot, 90 Min. Standard, 2 Std. Deep-Dive) und die **Lage soll sich daran anpassen** | Du gibst die gewünschte Gesamtdauer vor (Presets 45/60/90/120 Min. oder eigene Minutenzahl). Die App wählt Karten nach Priorität: **Kernszenen** (Start, der Beirat-Höhepunkt, Ende) sind immer dabei, wichtige Karten kommen dazu, solange Zeit bleibt, optionale zuletzt. Reicht die Zeit selbst für die Kernszenen nicht, werden die Entscheidungsphasen komprimiert (mit Mindestdauer) statt weitere Karten zu streichen — reicht sie trotzdem nicht, wird das ehrlich als Warnung angezeigt, statt die Zieldauer stillschweigend zu überschreiten. Ist mehr Zeit vorhanden als nötig, werden die Entscheidungsphasen stattdessen verlängert. Übersprungene Karten lassen sich in der Moderationsansicht jederzeit einzeln nachträglich aufnehmen. |

## Ein Drehbuch erweitern oder ein neues anlegen

Das Drehbuch liegt als lesbare JSON-Datei unter `data/scenario.<name>.json`
(mitgeliefert: `data/scenario.nordtech.json`). Struktur:

- `roles` / `roleGroups` — Personas und ihre Funktionsbereiche
- `lagekarten[]` — öffentliche Ereignisse mit `minuteOffset` (Minute ab
  Übungsstart), Text, Kriseninfo, Aufgaben, `prioritaet` (1 = Kernszene, nie
  weglassen; 2 = wichtig; 3 = zuerst gekürzt — relevant für den Zieldauer-Modus),
  optional `media`
- `sonderlagekarten[]` — vertrauliche, rollenbezogene Karten mit `prioritaet`
  (wie oben) sowie
  `empfaenger` (Rollen-ID), optionalem `minuteOffset` (leer = nur manuell
  auslösbar) und `moderatorGut`/`moderatorSchlecht` als Einschätzungshilfe
- `bonuskarten[]` — manuell einsetzbare Zusatzereignisse

**Weitere Dateien (Bilder, Video, PDF) ablegen:** einfach in `media/` speichern
— z. B. `media/lk10-ndr-ausschnitt.mp4`. Dann bei der betreffenden Lagekarte
in der JSON-Datei ergänzen:

```json
"media": { "type": "video", "src": "/media/lk10-ndr-ausschnitt.mp4", "caption": "NDR-Sonderbericht" }
```

(`"type": "image"` für Bilder.) Die Bühne spielt/zeigt die Datei automatisch,
sobald diese Lagekarte aktiv wird.

**Weitere Karten hinzufügen:** einfach ein neues Objekt in `lagekarten[]` bzw.
`sonderlagekarten[]` ergänzen. Der Server liest die Datei bei jedem Start neu
ein — kein Build-Schritt nötig.

**Ein zweites Kundenszenario anlegen:** Datei kopieren, z. B. zu
`data/scenario.andererkunde.json`, Inhalte anpassen. Liegen mehrere
`scenario.*.json`-Dateien in `data/`, wird beim Start ohne weitere Angabe
alphabetisch die erste geladen. Um gezielt eine andere auszuwählen, die
Umgebungsvariable `SCENARIO_FILE` setzen — die Schreibweise unterscheidet
sich je nach Betriebssystem/Shell:

- **Windows, Eingabeaufforderung (cmd):**
  `set SCENARIO_FILE=scenario.andererkunde.json && npm start`
- **Windows, PowerShell:**
  `$env:SCENARIO_FILE="scenario.andererkunde.json"; npm start`
- **macOS/Linux:**
  `SCENARIO_FILE=scenario.andererkunde.json npm start`

## Datenschutz & Lokalität

- Keine Cloud, keine externe Datenbank. Teilnehmerdaten, Bewertungen und der
  Laufstatus liegen ausschließlich lokal unter `data/` (nicht eingecheckt,
  siehe `.gitignore`).
- Die einzige externe Verbindung ist der von dir konfigurierte SMTP-Server.
- SMTP-Zugangsdaten liegen lokal in `data/settings.json` — niemals committen.

## Bekannte Grenzen (v1)

- Kein Mehrfach-Nutzer-Betrieb: ein Lauf zur Zeit, ein Moderator.
- Keine echte SMS — nur E-Mail (Begründung: SMS erfordert einen kostenpflichtigen
  Drittanbieter mit eigenem API-Zugang; E-Mail erreicht in der Praxis ebenfalls
  das Handy).
- Die automatisch berechnete Zeit (`"durationMode": "computed"`) ist eine
  Schätzung nach der im Playbook beschriebenen Formel, keine erneut
  "erprobte" Zeitplanung wie im Original-Drehbuch für die Referenzgruppe.
