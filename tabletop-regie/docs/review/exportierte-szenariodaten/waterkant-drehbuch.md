# Wenn das Rechenzentrum brennt – vollständiges Drehbuch

*Sieben Tage zwischen Feuer, Infrastrukturverlust und Verantwortung*  
Stand: 2026-11-18 · automatisch erzeugt mit `tools/szenario-export.js` aus `scenario.waterkant.json` (Drehbuch-ID `waterkant-rechenzentrum`). Alle Inhalte sind fiktiv. Beträge und Fristen sind Szenarioannahmen, keine Rechts- oder Versicherungsauskunft.

**Inhalt:** Teil B Faktenblatt und Zeitleiste · Teil C Szenario vollständig (Begrüßung, Regeln, Rollen, Lagekarten, vertrauliche Karten, Entscheidungen, Schwerpunkte, Überraschungen, Abschluss mit Rechnung, Debriefing) · Teil D Ablauf je Übungsdauer

---

## Teil B – Faktenblatt und Zeitleiste

Diese Eckdaten gelten für alle Karten. Alles, was davon abweicht, ist ein Widerspruch.

| Eckdatum | Wert |
|---|---|
| Unternehmen | Waterkant Baumärkte GmbH (fiktiv), 14 Filialen in Norddeutschland · ca. 850 Mitarbeitende · ca. 240 Mio. € Umsatz · Baustoffe, Garten & Heimwerkerbedarf |
| Produkte und Leistungen | Baustoffe, Garten- und Heimwerkerbedarf in 14 eigenen Filialen, Online-Shop mit Abholung in der Filiale, Bestellportal für Gewerbekunden (Rahmenvereinbarungen). Eigenes Rechenzentrum in der Zentrale; Kassen- und Warenwirtschaftsdienste auch für 9 selbständige Partnermärkte im Einkaufsverbund (IT-Servicevertrag). |
| Standorte | Zentrale mit Verwaltungsgebäude, eigenem Rechenzentrum und angrenzendem Zentrallager; 14 eigene Filialen (7 Nord, 7 Süd) |
| IT-Dienstleistung für Dritte | 9 selbständige Partnermärkte im Einkaufsverbund beziehen Kassen- und Warenwirtschaftsdienste aus dem Waterkant-Rechenzentrum (IT-Servicevertrag); vertragliches Wiederherstellungsziel 24 Stunden; zusammen 23 Märkte |
| Ereignis | Montag 22:40 Uhr Warnung der USV; Dienstag 03:10 Uhr Brand im USV-Raum neben dem Serverraum, Gaslöschung im Serverraum; alle Personen wohlauf (eine Person zunächst vermisst, später wohlauf); vorläufige Ursache (Samstag): thermisches Durchgehen eines Batteriemoduls, ein Update war nicht eingespielt |
| Gebäude | Verwaltungsgebäude bis zur Prüfung gesperrt; Büros ab Dienstag 10:00 Uhr freigegeben; Server- und USV-Raum gesperrt (Rußfilm, mögliche ätzende Gase), Messergebnis Mittwochmorgen: Grenzwerte noch überschritten; Freigabe nach Reinigung in ca. einer Woche; eigenes Rechenzentrum frühestens in ca. drei Wochen |
| Ausfall | Warenwirtschaft, Kassenzentrale, Lagerverwaltung, Gewerbekundenportal, Telefonanlage der Zentrale; Cloud-Mail läuft; Online-Shop zeigt veraltete Bestände |
| Kassen | Offline-Betrieb ca. 72 Stunden laut Herstellerdokumentation, danach keine Buchungen bis zur Synchronisation: Grenze Freitag ca. 03:00 Uhr |
| Datensicherung | Letzte vollständige Sicherung beim Colocation-Anbieter: Montag 01:00 Uhr; Dienstagssicherung nur auf dem Backup-Server im gesperrten Serverraum; ohne Bergung Datenlücke ca. 26 Stunden (Montag 01:00 bis Dienstag 03:10 Uhr) |
| Ausweichbetrieb | Vertraglich vereinbartes Ausweich-Rack beim Colocation-Anbieter, ca. 40 % der bisherigen Rechenleistung, nie vollständig geübt; Kassen- und Preisdienste ab Donnerstag möglich; Erweiterung für die übrigen Systeme binnen 48 Stunden mit zwölf Monaten Mindestlaufzeit (Zustimmungsvorbehalt der Gesellschafter ab zwölf Monaten Bindung) |
| Ersatzhardware | 10–12 Arbeitstage, zwei Rahmen gegen Aufpreis in drei Tagen |
| Wiederanlauf | Donnerstag 18:00 Uhr Kassen- und Preisdienste wieder verfügbar, Umstellung Markt für Markt (ca. 2 Märkte pro Stunde) bis in die Nacht; Sonntag 12:00 Uhr stabiler Notbetrieb aus dem Ausweich-Rack; eigenes Rechenzentrum weiter gesperrt (Szenarioannahme: der Notbetrieb gelingt, wenn die Freigaben wie beschrieben erteilt werden) |
| Saison | Saisonstart mit Prospekt-Aktionspreisen; Samstag ist der umsatzstärkste Tag |
| Medien | Regionalsender „Nordkanal“: Anfrage Dienstag 11:30 Uhr (Frist 13:00 Uhr), Bericht Donnerstag 13:00 Uhr; Falschmeldung „Großbrand im Zentrallager“ eines Nachrichtenportals (Überraschung B6) |
| Geld | Elektronik- und Betriebsunterbrechungsversicherung: Erstattung bis zu 1,6 Mio. € als optimistische, unbestätigte Modellannahme (Kostenübernahme nur „unter Vorbehalt“); Jahresumsatz 240 Mio. €, Umsatzrendite 5 % (Jahresgewinn 12 Mio. €) |
| Zeitmodell | ca. 30 Sekunden Sprechzeit je Funktionsbereich und Lage, dazu Lese- und Entscheidungszeit; nicht jede Rolle spricht bei jeder Lage |
| Gremien und Externe | Gesellschafterversammlung, Verbundbeirat der Partnermärkte, Feuerwehr, Sachverständige, Sanierungsfachfirma, Berufsgenossenschaft, Versicherer mit Gutachter, Colocation-Anbieter |

### Zeitleiste der Lagekarten (Reihenfolge im vollständigen Drehbuch)

| Minute | ID | Simulationszeit | Titel | Station | Priorität |
|---:|---|---|---|---|---:|
| 0 | LK01 | Montag 22:40 Uhr | USV meldet Batteriewarnung | Vorboten | 2 |
| 3 | LK02 | Dienstag 02:35 Uhr | Geruch im Technikflur | Vorboten | 2 |
| 6 | LK03 | Dienstag 03:02 Uhr | Serverraum wird warm | Vorboten | 1 |
| 9 | LK04 | Dienstag 03:10 Uhr | Brandalarm im Rechenzentrum | Ausbruch | 1 |
| 13 | LK05 | Dienstag 03:40 Uhr | Feuerwehr im Einsatz | Ausbruch | 2 |
| 17 | LK06 | Dienstag 05:30 Uhr | Lagebild nach dem Löschen | Ausbruch | 1 |
| 21 | LK07 | Dienstag 06:30 Uhr | Was noch läuft – und was nicht | Ausbruch | 2 |
| 25 | LK08 | Dienstag 07:00 Uhr | Saisonstart ohne Aktionspreise | Eskalation | 2 |
| 29 | LK09 | Dienstag 08:30 Uhr | Die Partnermärkte rufen an | Eskalation | 1 |
| 33 | LK10 | Dienstag 10:00 Uhr | Serverraum gesperrt | Eskalation | 2 |
| 37 | LK11 | Dienstag 11:30 Uhr | Nordkanal fragt nach | Eskalation | 2 |
| 41 | LK12 | Dienstag 14:00 Uhr | Das Zentrallager steht | Eskalation | 2 |
| 45 | LK13 | Dienstag 17:00 Uhr | Ersatz: Hardware oder Ausweich-Rack? | Eskalation | 2 |
| 49 | LK14 | Mittwoch 07:30 Uhr | Den Backup-Server bergen? | Höhepunkt | 1 |
| 53 | LK15 | Mittwoch 10:00 Uhr | Wie weit geht der Ausweichbetrieb? | Höhepunkt | 1 |
| 57 | LK16 | Mittwoch 13:00 Uhr | Ein Bauunternehmen will Vorrang | Höhepunkt | 2 |
| 61 | LK17 | Mittwoch 16:00 Uhr | Prospektpreise vor der Kasse | Höhepunkt | 2 |
| 65 | LK18 | Mittwoch 19:00 Uhr | Der Verbundbeirat verlangt Antworten | Höhepunkt | 2 |
| 69 | LK19 | Donnerstag 08:00 Uhr | Rücksicherung im Ausweich-Rack | Folgen | 2 |
| 73 | LK20 | Donnerstag 10:00 Uhr | Wer kassiert zuerst? | Folgen | 1 |
| 77 | LK21 | Donnerstag 13:00 Uhr | Nordkanal berichtet | Folgen | 2 |
| 81 | LK22 | Donnerstag 18:00 Uhr | Die Kassen laufen wieder | Wiederanlauf | 1 |
| 85 | LK23 | Freitag 09:00 Uhr | Die Datenlücke | Wiederanlauf | 2 |
| 88 | LK24 | Freitag 14:00 Uhr | Der Versicherer ist da | Wiederanlauf | 2 |
| 91 | LK25 | Samstag 08:00 Uhr | Der große Saisonsamstag | Wiederanlauf | 2 |
| 94 | LK26 | Samstag 15:00 Uhr | Die Brandursache | Wiederanlauf | 2 |
| 97 | LK27 | Sonntag 12:00 Uhr | Stabiler Notbetrieb | Wiederanlauf | 1 |
| 100 | LK28 | Montag 09:00 Uhr | Zurück ins eigene Rechenzentrum? | Wiederanlauf | 3 |

Priorität 1 = in jeder Übungsdauer enthalten.

---

## Teil C – Das Szenario vollständig

**Titel:** Wenn das Rechenzentrum brennt  
**Untertitel:** Sieben Tage zwischen Feuer, Infrastrukturverlust und Verantwortung  
**Unternehmen (fiktiv):** Waterkant Baumärkte GmbH – 14 Filialen in Norddeutschland · ca. 850 Mitarbeitende · ca. 240 Mio. € Umsatz · Baustoffe, Garten & Heimwerkerbedarf  
**Schwierigkeit:** mittel · **Teilnehmende:** 6–22 (Referenz 18)

### Begrüßung (vorgelesen)

Guten Morgen zusammen. Heute löschen wir kein Feuer und schrauben an keinem Server. Wir erleben gemeinsam die schwierigste Woche in der Geschichte der Waterkant Baumärkte GmbH. Die meisten von Ihnen vertreten eine Funktion im Unternehmen, alle anderen beobachten mit kritischem Blick. Sie sind nicht Zuschauer. Sie sind verantwortlich. Wir durchlaufen sieben Tage Unternehmenskrise in verdichteter Form. Es gibt keine richtigen oder falschen Antworten. Es gibt nur Entscheidungen und deren Auswirkungen. Hinweis: Alle Alarm- und Durchsagetöne in dieser Übung sind Übungseinspielungen.

### Eröffnung (vorgelesen und auf der Bühne)

Montag, 18 Uhr. In den 14 Filialen der Waterkant Baumärkte GmbH laufen die letzten Vorbereitungen für den wichtigsten Tag des Jahres: Morgen startet die Frühjahrssaison, der Prospekt mit den Aktionspreisen ist verteilt. Im eigenen Rechenzentrum der Zentrale laufen Kassen, Preise und Warenwirtschaft – für die eigenen Filialen und für neun Partnermärkte im Einkaufsverbund. Waterkant ist ein gesunder Mittelständler: 850 Beschäftigte, 240 Mio. Euro Umsatz. Heute erleben wir sieben Tage Unternehmenskrise in verdichteter Form.

### Spielregeln

- Alle vertreten ausschließlich ihren eigenen Verantwortungsbereich.
- Jede Lagekarte enthält neue Informationen.
- Nach jeder Lagekarte beantwortet jeder Bereich: Was bedeutet diese Information für meinen Bereich? Welche Risiken entstehen? Welche Maßnahmen leite ich ein? Welche Unterstützung benötige ich vom Krisenstab?
- Meldungen von draußen (Anwender, Kunden, Standorte) laufen gebündelt an den Krisenstab. Der Krisenstab entscheidet und gibt Anweisungen und eine einheitliche Sprachregelung zurück – an alle, die Fragen beantworten müssen.
- Anschließend erfolgt die Abstimmung im Krisenstab.
- Teilnehmende ohne feste Rolle beobachten, bringen auf Nachfrage ihre Sicht ein und notieren Auffälligkeiten für das Debriefing.

### Moderationsregel

Nicht diskutieren lassen. Nicht in technische oder bauliche Details abgleiten lassen. Bei zu tiefem Einstieg: 'Das ist wichtig. Für diese Übung reicht die Aussage: Was bedeutet das für das Unternehmen?' Danach nächste Person.

### Hinweis zur stärksten Szene

Die stärksten Szenen sind nicht der Brand, sondern die Entscheidungen danach: Darf jemand für eine kleinere Datenlücke in einen kontaminierten Raum („Den Backup-Server bergen?“) – und wer kassiert zuerst, die eigenen Filialen oder die Partner mit Vertrag („Wer kassiert zuerst?“).

### Rollen

20 Rollen in 14 Funktionsbereichen. „teilnehmer“ ist eine Beobachterrolle ohne eigene Karten.

#### Geschäftsführung

- **Geschäftsführung (CEO), Krisenstabsleitung** (`geschaeftsfuehrer-ceo`, Ebene: Krisenstab)  
  Du leitest das Unternehmen und den Krisenstab. Du triffst die letzten Entscheidungen, vertrittst Waterkant gegenüber Gesellschaftern, Partnermärkten und Öffentlichkeit und musst das Team durch die Woche führen.

#### IT und Rechenzentrum

- **IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (`leiter-it`, Ebene: Krisenstab)  
  Du verantwortest die gesamte IT einschließlich des eigenen Rechenzentrums. Du musst entscheiden, was wann und wo wieder anläuft – und dem Krisenstab ehrlich sagen, was technisch geht und was nicht.
- **IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)** (`rz-betrieb`, Ebene: Eingang (Meldungen von draußen))  
  Du betreust Server, Speicher, Netzwerk und USV im Rechenzentrum und hast in der Brandnacht Rufbereitschaft. Du kennst die Technik im Detail und lieferst dem Krisenstab das technische Lagebild.

#### Gebäudetechnik

- **Gebäudetechnik und Facility Management** (`facility-management`, Ebene: Krisenstab)  
  Du verantwortest Gebäude, Klima, Strom und USV-Wartung am Hauptstandort. Du bist Ansprechpartner für Feuerwehr, Sachverständige und Sanierer und gibst Räume erst frei, wenn sie sicher sind.

#### Arbeitssicherheit

- **Leitung Arbeitssicherheit und Werkschutz** (`leiter-arbeitssicherheit`, Ebene: Krisenstab)  
  Du verantwortest Evakuierung, Sammelplätze, Gefährdungsbeurteilungen und den Schutz der Beschäftigten. Wer wann welchen Raum betreten darf, ist auch deine Frage.

#### Informationssicherheit

- **Informationssicherheit und Datenschutzkoordination** (`informationssicherheit`, Ebene: Krisenstab)  
  Du achtest darauf, dass im Notbetrieb keine Sicherheitslücken und keine unkontrollierten Datenflüsse entstehen. Rechtliche Bewertungen gibst du nicht selbst ab, sondern stößt die fachliche Prüfung an.

#### Logistik

- **Leitung Logistik und Zentrallager** (`leiterin-logistik-zentrallager`, Ebene: Krisenstab)  
  Du verantwortest das Zentrallager neben dem Verwaltungsgebäude und die Belieferung der Filialen. Ohne Lagerverwaltung weißt du nicht, wo welche Ware liegt – und der Saisonstart läuft.
- **Schichtleitung Zentrallager (vor Ort in der Brandnacht)** (`schichtleiter-zentrallager`, Ebene: Eingang (Meldungen von draußen))  
  Du leitest die Nachtschicht im Zentrallager auf demselben Gelände. In der Brandnacht bist du vor Ort: Evakuierung, Sammelplatz, Zählung der Leute.

#### Einkauf und Dienstleister

- **Leitung Einkauf und Dienstleistersteuerung** (`leiter-einkauf`, Ebene: Krisenstab)  
  Du verantwortest Lieferanten und Dienstleister – in dieser Woche vor allem Ersatzhardware, Sanierer und den Anbieter des Ausweich-Racks. Du verhandelst Lieferzeiten, Preise und Verträge.

#### Finanzen

- **Leitung Finanzen und Versicherung (CFO)** (`leiter-finanzen-cfo`, Ebene: Krisenstab)  
  Du verantwortest Finanzen, Versicherungen und die Verträge mit den Partnermärkten. Du musst früh einschätzen, was die Krise kostet, was die Versicherung wahrscheinlich trägt und was Waterkant selbst schultern muss.

#### Filialen und Partner

- **Regionalleitung Filialen Nord** (`regionalleiterin-filialen-nord`, Ebene: Eingang (Meldungen von draußen))  
  Du verantwortest sieben Filialen. Du erfährst als Erste, wie Kundschaft und Personal auf Kassen im Offline-Betrieb und fehlende Aktionspreise reagieren.
- **Regionalleitung Filialen Süd** (`regionalleiter-filialen-sued`, Ebene: Eingang (Meldungen von draußen))  
  Du verantwortest sieben Filialen. Du erfährst als Erster, wie Kundschaft und Personal auf Kassen im Offline-Betrieb und fehlende Aktionspreise reagieren.
- **Partnerbetreuung Verbund (Kundenmanagement IT-Service)** (`partnerbetreuung`, Ebene: Eingang (Meldungen von draußen))  
  Du betreust die neun selbständigen Partnermärkte im Einkaufsverbund, für die Waterkant Kassen- und Warenwirtschaft als Dienstleistung betreibt. Für sie bist du die erste Anlaufstelle – und du kennst den Servicevertrag.

#### Online und Gewerbekunden

- **Leitung Online-Shop und Gewerbekundenportal** (`online-shop-leitung`, Ebene: Eingang (Meldungen von draußen))  
  Du verantwortest den Online-Shop (Oberfläche beim externen Hoster, Bestände aus der Warenwirtschaft) und das Bestellportal für Gewerbekunden.

#### Kommunikation

- **Leitung Unternehmenskommunikation und Marketing** (`leiterin-kommunikation-pr`, Ebene: Weitergabe nach innen/außen)  
  Du verantwortest Presse, soziale Medien und den Saisonprospekt. Was nach außen gesagt wird, läuft über deinen Tisch – auch wenn die Fakten noch unsicher sind.

#### Personal

- **Personalleitung** (`leiterin-personal`, Ebene: Weitergabe nach innen/außen)  
  Du verantwortest alles rund um die Beschäftigten: Angehörige in der Brandnacht, Arbeitszeiten im Dauereinsatz, Information der Belegschaft.

#### Support und Hotline

- **IT-Support Filialen und Kassen** (`it-support-filialen`, Ebene: Eingang (Meldungen von draußen))  
  Du bist die Hotline für 14 Filialen und neun Partnermärkte: Kassen im Offline-Betrieb, Bondrucker, Kartenzahlung. Du bündelst die Meldungen und gibst Anweisungen des Krisenstabs zurück.
- **Kundenservice-Hotline** (`kundenservice-hotline`, Ebene: Eingang (Meldungen von draußen))  
  Du nimmst Anrufe, Mails und Chats von Kundinnen und Kunden entgegen: Prospektpreise, Online-Bestellungen, Abholungen. Ohne Sprachregelung stehst du allein da.

#### Krisenstab-Unterstützung

- **Notfallmanagement / BCM-Koordination** (`notfallmanagement-bcm`, Ebene: Krisenstab)  
  Du koordinierst den Krisenstab organisatorisch: Notfallhandbuch, Fristen, Meldewege, Lagebesprechungen. Ohne feste Sprechzeit, aber wichtig für die Struktur.
- **Assistenz der Geschäftsführung / Lage und Dokumentation** (`assistenz-gf-dokumentation`, Ebene: Krisenstab)  
  Du dokumentierst Entscheidungen, Zeitpunkte und Begründungen – für Versicherer, Sachverständige und die Nachbereitung. Ohne feste Sprechzeit.

### Lagekarten (öffentlich, chronologisch nach Drehbuch-Minute)

Minute = Zeitpunkt im vollständigen Drehbuch (letzte Lage bei Minute 100). Bei kürzeren Übungen verschiebt das Werkzeug die Zeiten (siehe Teil D).

#### LK01 – USV meldet Batteriewarnung

*Simulationszeit:* Montag 22:40 Uhr · *Station:* Vorboten · *Priorität:* 2 · *Drehbuch-Minute:* 0 · *Diskussion:* 2 Min.

Die Gebäudeleittechnik meldet für die USV-Anlage im Rechenzentrum: „Batterietemperatur Modul 3 erhöht“. Der Sensor gilt als launisch, die Meldung kam in den letzten Wochen schon dreimal. Die Rufbereitschaft der IT quittiert die Meldung per App.

*Fragen an die Gruppe:*

- Was tun Sie mit einer Meldung, die schon oft falsch war?
- Wer müsste davon wissen – IT, Gebäudetechnik oder beide?

*Bild auf der Bühne:* Gebäudeleittechnik, Montag 22:40 Uhr.

*Zuständig:* IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Gebäudetechnik und Facility Management, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)

*Hinweis für die Moderation:* Vorbote: ruhig und beiläufig vorlesen, nicht dramatisieren. Kurz Reaktionen sammeln (1–2 Min.), keine lange Diskussion. Beobachten: Wer erkennt, dass die Meldungen zusammenhängen, und wer eskaliert früh? Im Debriefing aufgreifen.

#### LK02 – Geruch im Technikflur

*Simulationszeit:* Dienstag 02:35 Uhr · *Station:* Vorboten · *Priorität:* 2 · *Drehbuch-Minute:* 3 · *Diskussion:* 2 Min.

Der Wachdienst meldet bei seinem Rundgang einen Geruch nach verschmortem Kunststoff im Technikflur des Verwaltungsgebäudes, nahe dem USV-Raum. Sichtbar ist nichts, die Brandmeldeanlage ist ruhig. Der Wachmann ruft die Gebäudetechnik-Bereitschaft an.

*Fragen an die Gruppe:*

- Wer entscheidet um 02:35 Uhr, ob das ein Notfall ist?
- Würden Sie jemanden wecken – und wen?

*Bild auf der Bühne:* Rundgang des Wachdienstes, Dienstag 02:35 Uhr.

*Zuständig:* Gebäudetechnik und Facility Management, Leitung Arbeitssicherheit und Werkschutz, IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)

*Hinweis für die Moderation:* Vorbote: ruhig und beiläufig vorlesen, nicht dramatisieren. Kurz Reaktionen sammeln (1–2 Min.), keine lange Diskussion. Beobachten: Wer erkennt, dass die Meldungen zusammenhängen, und wer eskaliert früh? Im Debriefing aufgreifen.

#### LK03 – Serverraum wird warm

*Simulationszeit:* Dienstag 03:02 Uhr · *Station:* Vorboten · *Priorität:* 1 · *Drehbuch-Minute:* 6 · *Diskussion:* 2 Min.

Die Klimaanlage des Serverraums meldet Störung, die Temperatur steigt: 31 °C und weiter steigend. Seit 03:00 Uhr läuft die nächtliche Übertragung der Aktionspreise für den Saisonstart an die Filialkassen; gleichzeitig laden die Partnermärkte ihre Tagesabschlüsse hoch. Die Rufbereitschaft ruft die IT-Leitung an.

*Fragen an die Gruppe:*

- Herunterfahren oder weiterlaufen lassen – was riskieren Sie jeweils?
- Wer darf nachts entscheiden, Systeme abzuschalten, die 23 Märkte betreffen?

*Bild auf der Bühne:* Klimaüberwachung Serverraum, Dienstag 03:02 Uhr.

*Ton:* `lk03-klimaalarm.mp3`

*Zuständig:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Gebäudetechnik und Facility Management

*Hinweis für die Moderation:* Vorbote: ruhig und beiläufig vorlesen, nicht dramatisieren. Kurz Reaktionen sammeln (1–2 Min.), keine lange Diskussion. Beobachten: Wer erkennt, dass die Meldungen zusammenhängen, und wer eskaliert früh? Im Debriefing aufgreifen. Hier fällt die erste Entscheidung mit Folgen. Kurz halten: Die Frage ist echt, beide Antworten sind vertretbar.

#### LK04 – Brandalarm im Rechenzentrum

*Simulationszeit:* Dienstag 03:10 Uhr · *Station:* Ausbruch · *Priorität:* 1 · *Drehbuch-Minute:* 9 · *Diskussion:* 4 Min.

Die Brandmeldeanlage löst aus: Rauch im USV-Raum neben dem Serverraum. Im Serverraum wird automatisch die Gaslöschanlage ausgelöst, der Raum wird mit Löschgas geflutet. Das Verwaltungsgebäude wird geräumt, die Nachtschicht im angrenzenden Zentrallager geht vorsorglich zum Sammelplatz. Die Feuerwehr ist alarmiert.

*Krisen-Info (rot hervorgehoben):* Brandort: USV-Raum · Gaslöschung im Serverraum ausgelöst · Gebäude geräumt

*Fragen an die Gruppe:*

- Wer muss jetzt sofort informiert werden – in welcher Reihenfolge?
- Wer übernimmt bis zum Eintreffen der Feuerwehr die Führung vor Ort?
- Wann und wie wird der Krisenstab einberufen?

*Bild auf der Bühne:* Brandmeldezentrale, Dienstag 03:10 Uhr.

*Ton:* `lk04-loeschanlage-durchsage.mp3` · Bühne zeigt „Übungseinspielung – kein echter Alarm“

*Zuständig:* Leitung Arbeitssicherheit und Werkschutz, Schichtleitung Zentrallager (vor Ort in der Brandnacht), Gebäudetechnik und Facility Management, Geschäftsführung (CEO), Krisenstabsleitung

*Hinweis für die Moderation:* Jetzt ist es ernst: Die Vorboten hingen zusammen. Die Einspielung ist ausdrücklich als Übung gekennzeichnet und kurz – danach Ruhe einkehren lassen. Personenschutz vor Technik: Wer fragt zuerst nach den Menschen?

#### LK05 – Feuerwehr im Einsatz

*Simulationszeit:* Dienstag 03:40 Uhr · *Station:* Ausbruch · *Priorität:* 2 · *Drehbuch-Minute:* 13 · *Diskussion:* 4 Min.

Die Feuerwehr bekämpft den Brand im USV-Raum und schaltet den Strom für das Verwaltungsgebäude ab. Der Einsatzleiter verlangt einen Ansprechpartner, der das Gebäude kennt. Am Sammelplatz fehlt eine Person: Ein Kollege der IT-Rufbereitschaft war gegen 03:05 Uhr ins Gebäude gefahren, um nach der Klimaanlage zu sehen.

*Krisen-Info (rot hervorgehoben):* Strom im Verwaltungsgebäude abgeschaltet · 1 Person am Sammelplatz nicht gemeldet

*Fragen an die Gruppe:*

- Wer spricht mit der Einsatzleitung – und mit welchen Informationen?
- Wie klären Sie, ob noch jemand im Gebäude ist?
- Wer kümmert sich um Angehörige?

*Bild auf der Bühne:* Einsatzstelle Hauptstandort, Dienstag 03:40 Uhr.

*Sprechertext:* Einsatzleitung Feuerwehr an Waterkant. Wer ist bei Ihnen verantwortlich? Ich brauche sofort drei Dinge: Ist noch jemand im Gebäude? Wo genau liegt der Batterieraum, und was für Batterien sind das? Und wer kann mir sagen, was hinter der Tür mit der Löschanlage ist?

*Gespräch führen – Nachfragen:* „Wie viele Personen waren heute Nacht im Gebäude – haben Sie eine Liste?“ · „Lithium-Ionen oder Blei? Wie groß ist die Anlage?“ (Wer am Tisch weiß das?) · „Ihr Kollege mit dem Auto auf dem Hof – wo könnte er sein? Hat er ein Telefon dabei?“  
*Gesprächsende:* „Verstanden. Niemand betritt das Gebäude ohne meine Freigabe – auch nicht Ihre IT. Ich melde mich, wenn der Brand aus ist.“ Danach Funkruf beenden.  
*Gesprächsführung gut:* Ein benannter Ansprechpartner mit Gebäudekenntnis, eine Personenliste, klare Aussage zu Batterieart und Löschanlage; Angehörige werden erst informiert, wenn Fakten vorliegen.  
*Gesprächsführung schwach:* Mehrere Leute reden gleichzeitig mit der Feuerwehr, niemand weiß, wer im Gebäude war, oder die IT will „schnell die Server retten“.

*Ton:* `funk-ruf.mp3` (Signal, danach spricht die Moderation live)

*Zuständig:* Leitung Arbeitssicherheit und Werkschutz, Gebäudetechnik und Facility Management, Schichtleitung Zentrallager (vor Ort in der Brandnacht), Personalleitung

*Hinweis für die Moderation:* Die Moderation spricht nach dem Funksignal die Einsatzleitung der Feuerwehr (Sprechertext) und bleibt in der Rolle. Die vermisste Person ist wohlauf (vertrauliche Karte an die Personalleitung kurz danach) – bis dahin die Unsicherheit wirken lassen.

#### LK06 – Lagebild nach dem Löschen

*Simulationszeit:* Dienstag 05:30 Uhr · *Station:* Ausbruch · *Priorität:* 1 · *Drehbuch-Minute:* 17 · *Diskussion:* 4 Min.

Der Brand im USV-Raum ist gelöscht, alle Personen sind wohlauf. Der Serverraum selbst hat nicht gebrannt, ist aber verraucht; Löschgas und Rauch sind abgezogen. Das Gebäude bleibt bis zur Prüfung durch Sachverständige gesperrt. Im Rechenzentrum ist alles aus: Warenwirtschaft, Kassenzentrale, Lagerverwaltung, Gewerbekundenportal, Telefonanlage der Zentrale.

*Krisen-Info (rot hervorgehoben):* Rechenzentrum vollständig außer Betrieb · Gebäude gesperrt · Filialkassen offline-fähig ca. 72 Stunden (bis Freitag ca. 03:00 Uhr)

*Fragen an die Gruppe:*

- Welche Geschäftsprozesse stehen jetzt – und welche laufen noch?
- Was ist bis zur Filialöffnung um 08:00 Uhr zu entscheiden?
- Wer übernimmt welche Aufgabe im Krisenstab?

*Bild auf der Bühne:* Gesperrtes Verwaltungsgebäude, Dienstag 05:30 Uhr.

*Zuständig:* Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Notfallmanagement / BCM-Koordination

*Hinweis für die Moderation:* Ab hier arbeitet der Krisenstab. Auf Rollenklarheit achten: Wer leitet, wer protokolliert, wann ist die nächste Lagebesprechung? Die 72-Stunden-Grenze der Kassen ist der rote Faden der nächsten Tage.

#### LK07 – Was noch läuft – und was nicht

*Simulationszeit:* Dienstag 06:30 Uhr · *Station:* Ausbruch · *Priorität:* 2 · *Drehbuch-Minute:* 21 · *Diskussion:* 4 Min.

Die IT sortiert: E-Mail und Chat laufen in der Cloud weiter, die Anmeldung an Geräten der Zentrale funktioniert aber nicht, weil die Anmeldedienste im Serverraum standen. Die Filialkassen arbeiten offline mit dem Preisstand von Montag; Kartenzahlung läuft direkt über den Zahlungsdienstleister. Der Online-Shop ist erreichbar, zeigt aber Bestände von Montagnacht. Die Zentrale ist telefonisch nicht erreichbar.

*Krisen-Info (rot hervorgehoben):* Cloud-Mail läuft · Telefon Zentrale tot · Kassen offline · Online-Shop mit veralteten Beständen

*Fragen an die Gruppe:*

- Über welche Kanäle erreicht der Krisenstab jetzt Filialen, Partner und Beschäftigte?
- Wo liegt Ihr Notfallhandbuch – und kommen Sie heran?
- Welche Behelfslösung ist sicher genug, welche nicht?

*Bild auf der Bühne:* Übersicht der IT, Dienstag 06:30 Uhr.

*Zuständig:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Informationssicherheit und Datenschutzkoordination, IT-Support Filialen und Kassen, Notfallmanagement / BCM-Koordination

#### LK08 – Saisonstart ohne Aktionspreise

*Simulationszeit:* Dienstag 07:00 Uhr · *Station:* Eskalation · *Priorität:* 2 · *Drehbuch-Minute:* 25 · *Diskussion:* 4 Min.

Die Filialen bereiten den Saisonstart vor; der Prospekt mit Aktionspreisen ist seit Sonntag verteilt. An den Kassen sind die Aktionspreise nicht hinterlegt, Bestandsauskünfte sind nicht möglich. Filialleitungen fragen, ob sie überhaupt öffnen sollen und ob sie Prospektpreise von Hand eingeben dürfen.

*Krisen-Info (rot hervorgehoben):* Öffnung 08:00 Uhr · Aktionspreise nicht an den Kassen · keine Bestandsauskunft

*Fragen an die Gruppe:*

- Öffnen die Filialen – und mit welcher Anweisung?
- Wie gehen Kassen mit Prospektpreisen um, einheitlich in allen 14 Filialen?
- Wer gibt die Anweisung raus, und wie kommt sie an?

*Bild auf der Bühne:* Filiale kurz vor der Öffnung, Dienstag 07:00 Uhr.

*Zuständig:* Regionalleitung Filialen Nord, Regionalleitung Filialen Süd, IT-Support Filialen und Kassen, Leitung Unternehmenskommunikation und Marketing

*Hinweis für die Moderation:* Kein IT-Thema mehr, sondern Geschäft: Saisonstart, Kundschaft, Personal vor Ort. Gut ist eine einheitliche, schriftlich verteilte Anweisung mit Ansprechpartner.

#### LK09 – Die Partnermärkte rufen an

*Simulationszeit:* Dienstag 08:30 Uhr · *Station:* Eskalation · *Priorität:* 1 · *Drehbuch-Minute:* 29 · *Diskussion:* 4 Min.

Die neun Partnermärkte im Einkaufsverbund, für die Waterkant Kassen- und Warenwirtschaft als Dienstleistung betreibt, stehen vor demselben Problem. Der Servicevertrag sieht ein Wiederherstellungsziel von 24 Stunden für Kassen- und Preisdienste vor. Die ersten Partner wollen wissen, wann es weitergeht – eine belastbare Prognose hat die IT noch nicht.

*Krisen-Info (rot hervorgehoben):* 9 Partnermärkte betroffen · Wiederherstellungsziel laut Vertrag: 24 Stunden · Prognose offen

*Fragen an die Gruppe:*

- Was sagen Sie den Partnern – und wer sagt es?
- Was ist eine ehrliche Prognose, wenn Sie selbst keine haben?
- Welche Folgen hat das Überschreiten der 24 Stunden?

*Bild auf der Bühne:* Neun Partnermärkte hängen am Waterkant-Rechenzentrum.

*Sprechertext:* Guten Morgen, hier spricht der Inhaber eines Partnermarkts. Meine Kassen laufen offline, die Aktionspreise fehlen, und von Ihnen höre ich nichts außer Gerüchten über einen Brand. Laut Vertrag haben Sie 24 Stunden. Ich will heute wissen, wann meine Kassen wieder laufen – und was ich meinen Leuten sagen soll.

*Gespräch führen – Nachfragen:* „Heißt ‚wir arbeiten dran‘ heute Abend, morgen oder nächste Woche?“ · „Bekomme ich dieselbe Priorität wie Ihre eigenen Märkte?“ · „Wer ist ab jetzt mein Ansprechpartner, und wann melden Sie sich wieder?“  
*Gesprächsende:* „Gut, ich notiere: nächste Information um … von … Wenn ich bis dahin nichts höre, rufe ich den Verbundvorstand an.“ Danach auflegen.  
*Gesprächsführung gut:* Ehrliche Spanne statt Zusage, fester Update-Termin, benannter Ansprechpartner, keine Aussage zur Reihenfolge, die nicht entschieden ist.  
*Gesprächsführung schwach:* Ein fester Termin, den niemand halten kann, oder Ausweichen ohne nächsten Kontakt.

*Ton:* `telefon-klingeln.mp3` (Signal, danach spricht die Moderation live)

*Zuständig:* Partnerbetreuung Verbund (Kundenmanagement IT-Service), Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Leitung Finanzen und Versicherung (CFO)

*Hinweis für die Moderation:* Auf der Bühne klingelt das Telefon. Die Moderation spricht danach einen Partner (Sprechertext) und bleibt für Rückfragen in der Rolle. Danach fällt die Entscheidung, wann und wie alle Partner informiert werden.

#### LK10 – Serverraum gesperrt

*Simulationszeit:* Dienstag 10:00 Uhr · *Station:* Eskalation · *Priorität:* 2 · *Drehbuch-Minute:* 33 · *Diskussion:* 4 Min.

Die Feuerwehr übergibt das Gebäude. Ein Sachverständiger gibt Büros und Flure frei, nicht aber USV-Raum und Serverraum: Auf allen Racks liegt ein Rußfilm, bei brennenden Lithium-Ionen-Batterien können ätzende Gase entstehen. Eine Messung läuft, das Ergebnis kommt frühestens Mittwochmorgen. Die Klimaanlage darf bis dahin nicht laufen.

*Krisen-Info (rot hervorgehoben):* Büros freigegeben · Serverraum und USV-Raum gesperrt · Messergebnis frühestens Mittwochmorgen

*Fragen an die Gruppe:*

- Wer entscheidet, wann der Serverraum wieder betreten wird – und auf welcher Grundlage?
- Was bedeutet der Rußfilm für die Hardware?
- Wer hält Kontakt zu Sachverständigen und Sanierern?

*Bild auf der Bühne:* Serverraum nach dem Brand, Dienstag 10:00 Uhr.

*Zuständig:* Gebäudetechnik und Facility Management, Leitung Arbeitssicherheit und Werkschutz, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)

*Hinweis für die Moderation:* Sekundärschäden ernst nehmen: Ruß plus Feuchtigkeit greift Elektronik an. Beobachten, ob der Tisch Freigabe (Sicherheit) und Wiederinbetriebnahme (Technik) auseinanderhält.

#### LK11 – Nordkanal fragt nach

*Simulationszeit:* Dienstag 11:30 Uhr · *Station:* Eskalation · *Priorität:* 2 · *Drehbuch-Minute:* 37 · *Diskussion:* 4 Min.

Der Regionalsender Nordkanal ruft an: Auf Fotos stehen Feuerwehrfahrzeuge vor dem Verwaltungsgebäude, in sozialen Netzwerken ist von einem „Akkubrand mit giftigen Gasen“ die Rede. Gleichzeitig berichten Kundinnen und Kunden, dass die Prospektpreise an der Kasse nicht gelten.

*Krisen-Info (rot hervorgehoben):* Antwortfrist: bis 13:00 Uhr

*Fragen an die Gruppe:*

- Wer spricht – und was ist gesichert?
- Wie trennen Sie Brand, Gesundheitsfrage und Preisärger in der Kommunikation?
- Welche Sprachregelung bekommen Filialen und Hotline?

*Bild auf der Bühne:* Presseanfrage von Nordkanal.

*Sprechertext:* Guten Tag, Redaktion Nordkanal. Bei Ihnen hat es heute Nacht gebrannt, im Netz ist von giftigen Gasen die Rede. Waren Menschen in Gefahr? Was ist mit Ihrer IT – stimmt es, dass Ihre Kassen nicht funktionieren? Und warum gelten Ihre Prospektpreise nicht? Wir senden um 13 Uhr.

*Gespräch führen – Nachfragen:* „Können Sie ausschließen, dass Anwohner gefährdet waren?“ · „Wie lange werden Ihre Kunden mit falschen Preisen leben müssen?“ · „Betrifft das auch andere Baumärkte, für die Sie die IT machen?“  
*Gesprächsende:* „Ich halte fest: … (Kernsatz des Tisches). Wenn sich etwas ändert, melden Sie sich bei mir.“ Lehnt der Tisch ab: „Dann senden wir: Das Unternehmen äußerte sich bis Redaktionsschluss nicht.“  
*Gesprächsführung gut:* Gesicherte Fakten (Brand im Technikraum, alle Personen wohlauf), keine Spekulation zu Gasen – Verweis auf Feuerwehr –, klare Aussage zu Prospektpreisen und Kulanz, ein Ansprechpartner.  
*Gesprächsführung schwach:* Spekulation über Ursache oder Gesundheitsfolgen, Preisärger kleinreden oder Partnermärkte nennen, bevor sie informiert sind.

*Ton:* `telefon-klingeln.mp3` (Signal, danach spricht die Moderation live)

*Zuständig:* Leitung Unternehmenskommunikation und Marketing, Geschäftsführung (CEO), Krisenstabsleitung, Kundenservice-Hotline

*Hinweis für die Moderation:* Auf der Bühne klingelt das Telefon, die Moderation spricht die Redaktion (Sprechertext) und bleibt in der Rolle.

#### LK12 – Das Zentrallager steht

*Simulationszeit:* Dienstag 14:00 Uhr · *Station:* Eskalation · *Priorität:* 2 · *Drehbuch-Minute:* 41 · *Diskussion:* 4 Min.

Ohne Lagerverwaltung weiß im Zentrallager niemand verlässlich, wo welche Ware liegt. Die ausgedruckten Lagerplatzlisten sind von Freitag. Die Filialen bestellen für den Saisonstart per Telefon und Mail nach, Speditionen warten auf Ladung. Das Lagerpersonal schlägt vor, nach Erfahrung und Papierliste zu kommissionieren.

*Krisen-Info (rot hervorgehoben):* Lagerverwaltung aus · Lagerplatzlisten von Freitag · Speditionen warten

*Fragen an die Gruppe:*

- Kommissionieren auf Papier – ja, nein, für welche Artikel?
- Welche Filialen und Warengruppen haben Vorrang?
- Wie verhindern Sie, dass Papierbetrieb später nicht mehr nachzubuchen ist?

*Bild auf der Bühne:* Zentrallager ohne Lagerverwaltung, Dienstag 14:00 Uhr.

*Zuständig:* Leitung Logistik und Zentrallager, Schichtleitung Zentrallager (vor Ort in der Brandnacht), Regionalleitung Filialen Nord, Regionalleitung Filialen Süd

#### LK13 – Ersatz: Hardware oder Ausweich-Rack?

*Simulationszeit:* Dienstag 17:00 Uhr · *Station:* Eskalation · *Priorität:* 2 · *Drehbuch-Minute:* 45 · *Diskussion:* 4 Min.

Der Einkauf hat Angebote: Neue Server und Speichersysteme sind in zehn bis zwölf Arbeitstagen lieferbar, zwei Rahmen gegen Aufpreis in drei Tagen. Beim Colocation-Anbieter, bei dem Waterkant seine Sicherungskopien lagert, steht ein vorbereitetes Ausweich-Rack mit etwa 40 % der bisherigen Rechenleistung. Es ist für einen solchen Fall vertraglich vereinbart – vollständig geübt wurde der Umzug nie.

*Krisen-Info (rot hervorgehoben):* Ersatzhardware: 10–12 Arbeitstage · Ausweich-Rack: ca. 40 % Leistung, sofort nutzbar

*Fragen an die Gruppe:*

- Was muss zuerst wieder laufen – und wo?
- Welche Risiken hat ein nie geübter Umzug?
- Was braucht die IT jetzt vom Krisenstab: Geld, Personal, Entscheidungen?

*Bild auf der Bühne:* Zwei Wege zurück, Dienstag 17:00 Uhr.

*Zuständig:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Leitung Einkauf und Dienstleistersteuerung, Leitung Finanzen und Versicherung (CFO), IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)

#### LK14 – Den Backup-Server bergen?

*Simulationszeit:* Mittwoch 07:30 Uhr · *Station:* Höhepunkt · *Priorität:* 1 · *Drehbuch-Minute:* 49 · *Diskussion:* 4 Min.

Die letzte vollständige Sicherungskopie beim Colocation-Anbieter stammt von Montag 01:00 Uhr – die Übertragung der Dienstagssicherung war beim Brand noch nicht fertig. Die Dienstagssicherung liegt auf dem Backup-Server im verrußten Serverraum. Eine Sanierungsfachfirma könnte ihn heute mit Schutzausrüstung bergen; die Freigabe des Raums für alle anderen kommt erst nach der Reinigung in etwa einer Woche.

*Krisen-Info (rot hervorgehoben):* Datenlücke ohne Bergung: ca. 26 Stunden · Bergung nur durch Fachfirma mit Schutzausrüstung · Messergebnis: Grenzwerte im Raum noch überschritten

*Fragen an die Gruppe:*

- Wie viel ist Ihnen die fehlende Datenlücke wert – und welches Risiko für Menschen ist dafür vertretbar?
- Wer entscheidet über das Betreten: IT, Arbeitssicherheit, Geschäftsführung?
- Welche Voraussetzungen müssen erfüllt sein, bevor jemand den Raum betritt?

*Bild auf der Bühne:* Backup-Server im gesperrten Serverraum.

*Zuständig:* Leitung Arbeitssicherheit und Werkschutz, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Geschäftsführung (CEO), Krisenstabsleitung

*Hinweis für die Moderation:* Personenschutz gegen Datenschutz im wörtlichen Sinn. Beide Wege sind vertretbar – bewertet wird, wie entschieden wird: Gefährdungsbeurteilung, Messwerte, Fachfirma, Freiwilligkeit, Dokumentation. Die eigene IT geht in keinem Fall hinein.

#### LK15 – Wie weit geht der Ausweichbetrieb?

*Simulationszeit:* Mittwoch 10:00 Uhr · *Station:* Höhepunkt · *Priorität:* 1 · *Drehbuch-Minute:* 53 · *Diskussion:* 4 Min.

Die IT hat einen Plan: Kassen- und Preisdienste und der Kern der Warenwirtschaft passen in das Ausweich-Rack und könnten am Donnerstag laufen. Lagerverwaltung, Gewerbekundenportal und Online-Bestände passen nur nach einer Erweiterung, die der Anbieter binnen 48 Stunden liefern kann – mit zwölf Monaten Mindestlaufzeit. Ohne Erweiterung warten diese Systeme auf das eigene Rechenzentrum, laut Sanierer frühestens in drei Wochen.

*Krisen-Info (rot hervorgehoben):* Kassen- und Preisdienste: Donnerstag möglich · Rest: Erweiterung (48 h, 12 Monate Vertrag) oder ca. 3 Wochen warten

*Fragen an die Gruppe:*

- Was ist Ihnen schneller Online-Handel und Lagerbetrieb wert?
- Welche Risiken hat ein schneller, großer Umzug für ein müdes Team?
- Wer trägt diese Entscheidung – IT, Finanzen oder Geschäftsführung?

*Bild auf der Bühne:* Ausweich-Rack beim Colocation-Anbieter.

*Zuständig:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Leitung Finanzen und Versicherung (CFO), Geschäftsführung (CEO), Krisenstabsleitung, Leitung Online-Shop und Gewerbekundenportal, Leitung Logistik und Zentrallager

*Hinweis für die Moderation:* Keine Option ist kostenlos: Klein heißt drei Wochen ohne Online-Bestände und Lagerverwaltung, groß heißt Vertrag, Kosten und Fehlerrisiko. Den Tisch zu einer Begründung zwingen, nicht zur „richtigen“ Antwort.

#### LK16 – Ein Bauunternehmen will Vorrang

*Simulationszeit:* Mittwoch 13:00 Uhr · *Station:* Höhepunkt · *Priorität:* 2 · *Drehbuch-Minute:* 57 · *Diskussion:* 4 Min.

Der größte Gewerbekunde, ein regionales Bauunternehmen, kann seit Dienstag nicht über das Portal bestellen. Für zwei Baustellen braucht es bis Freitag Dämmstoff und Trockenbaumaterial. Der Einkaufsleiter verlangt eine verbindliche Lieferzusage und droht, die Rahmenvereinbarung zu kündigen.

*Krisen-Info (rot hervorgehoben):* Liefertermin Freitag · Rahmenvereinbarung in Gefahr · Portal außer Betrieb

*Fragen an die Gruppe:*

- Was können Sie zusagen, ohne Lagerverwaltung und Portal?
- Bekommt ein Großkunde Vorrang vor den Filialen?
- Wer führt das Gespräch?

*Bild auf der Bühne:* Gewerbekunde am Telefon, Mittwoch 13:00 Uhr.

*Sprechertext:* Hier ist der Einkauf. Ich habe zwei Baustellen, die am Freitag Material brauchen – Dämmung und Trockenbau, die Liste liegt Ihnen seit Montag vor. Ihr Portal geht nicht, Ihre Zentrale geht nicht ans Telefon. Ich brauche heute eine verbindliche Zusage, sonst bestelle ich woanders – und dann dauerhaft.

*Gespräch führen – Nachfragen:* „Haben Sie die Ware überhaupt am Lager – ja oder nein?“ · „Können Sie direkt aus einer Filiale liefern?“ · „Wer haftet, wenn meine Baustelle steht?“  
*Gesprächsende:* „Ich halte fest: … bis Freitag, … Uhr. Wenn das nicht klappt, melde ich mich nicht mehr bei Ihnen.“ Danach auflegen.  
*Gesprächsführung gut:* Nur zusagen, was belegbar ist (Bestandsprüfung von Hand, Lieferung aus Filialbestand), Alternative anbieten, Rückruf mit Termin.  
*Gesprächsführung schwach:* Zusage ohne Bestandsprüfung oder Vorrang zulasten der Filialen, ohne dass der Krisenstab das entschieden hat.

*Ton:* `telefon-klingeln.mp3` (Signal, danach spricht die Moderation live)

*Zuständig:* Leitung Online-Shop und Gewerbekundenportal, Leitung Logistik und Zentrallager, Regionalleitung Filialen Nord, Geschäftsführung (CEO), Krisenstabsleitung

*Hinweis für die Moderation:* Auf der Bühne klingelt das Telefon, die Moderation spricht den Einkaufsleiter des Bauunternehmens und bleibt in der Rolle.

#### LK17 – Prospektpreise vor der Kasse

*Simulationszeit:* Mittwoch 16:00 Uhr · *Station:* Höhepunkt · *Priorität:* 2 · *Drehbuch-Minute:* 61 · *Diskussion:* 4 Min.

In sozialen Netzwerken kursieren Videos von Kassen, an denen der Prospektpreis nicht gilt; Kommentare sprechen von „Lockvogelwerbung“. Filialen haben unterschiedlich reagiert: Manche geben den Aktionspreis per Handeingabe, andere verweisen auf „technische Probleme“. Die Hotline ist überlastet.

*Krisen-Info (rot hervorgehoben):* Mehrere tausend Interaktionen · uneinheitliche Praxis in den Filialen · Hotline überlastet

*Fragen an die Gruppe:*

- Welche einheitliche Regel gilt ab sofort für Prospektpreise?
- Was sagen Sie öffentlich – und was sagen Hotline und Filialen?
- Wer trägt die Kosten der Kulanz, und ist das entschieden?

*Bild auf der Bühne:* Social-Media-Beitrag, Mittwoch 16:00 Uhr.

*Zuständig:* Leitung Unternehmenskommunikation und Marketing, Kundenservice-Hotline, Regionalleitung Filialen Nord, Regionalleitung Filialen Süd, Leitung Finanzen und Versicherung (CFO)

*Hinweis für die Moderation:* Rechtliche Bewertung der Werbung nicht am Tisch klären („fachlich prüfen lassen“), sondern: Gibt es eine einheitliche Regel, und kommt sie überall an?

#### LK18 – Der Verbundbeirat verlangt Antworten

*Simulationszeit:* Mittwoch 19:00 Uhr · *Station:* Höhepunkt · *Priorität:* 2 · *Drehbuch-Minute:* 65 · *Diskussion:* 4 Min.

Der Beirat des Einkaufsverbunds hat kurzfristig eine Videokonferenz einberufen. Die Partnermärkte wollen wissen: Wann laufen ihre Kassen wieder voll, wer kommt zuerst dran, und warum gab es für ein Rechenzentrum, das 23 Märkte versorgt, keinen funktionierenden Ausweichplan? Die Geschäftsführung hat 15 Minuten Redezeit.

*Krisen-Info (rot hervorgehoben):* Videokonferenz in 30 Minuten · 15 Minuten Redezeit

*Fragen an die Gruppe:*

- Welche drei Aussagen müssen in den 15 Minuten fallen?
- Was sagen Sie zur Reihenfolge, wenn sie noch nicht entschieden ist?
- Welche Zusage geben Sie bewusst nicht?

*Bild auf der Bühne:* Videokonferenz des Verbundbeirats, Mittwoch 19:00 Uhr.

*Zuständig:* Geschäftsführung (CEO), Krisenstabsleitung, Partnerbetreuung Verbund (Kundenmanagement IT-Service), IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Leitung Finanzen und Versicherung (CFO)

*Hinweis für die Moderation:* Szenischer Höhepunkt: Die Krisenstabsleitung hat zwei Minuten Vorbereitung und trägt 60 Sekunden vor; die Moderation spielt den Beiratsvorsitz und stellt eine Nachfrage.

#### LK19 – Rücksicherung im Ausweich-Rack

*Simulationszeit:* Donnerstag 08:00 Uhr · *Station:* Folgen · *Priorität:* 2 · *Drehbuch-Minute:* 69 · *Diskussion:* 4 Min.

Im Ausweich-Rack läuft die Rücksicherung aus der Montagskopie. Die Prüfsummen stimmen. Damit 14 Filialen und neun Partnermärkte die Ausweichumgebung erreichen, müssen Netzwerkverbindungen und Firewall-Regeln neu eingerichtet werden – Stück für Stück, Markt für Markt. Die Aktionspreise sind in der Montagskopie noch nicht enthalten.

*Krisen-Info (rot hervorgehoben):* Rücksicherung läuft · Netzwerkumstellung Markt für Markt · Aktionspreise fehlen in der Kopie

*Fragen an die Gruppe:*

- Wer prüft und gibt frei, bevor ein Markt umgestellt wird?
- Wie bekommen Sie die Aktionspreise sicher in das System?
- Welche Abkürzungen sind verlockend – und welche verboten?

*Bild auf der Bühne:* Rücksicherung im Ausweich-Rack, Donnerstag 08:00 Uhr.

*Zuständig:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Informationssicherheit und Datenschutzkoordination, IT-Support Filialen und Kassen

#### LK20 – Wer kassiert zuerst?

*Simulationszeit:* Donnerstag 10:00 Uhr · *Station:* Folgen · *Priorität:* 1 · *Drehbuch-Minute:* 73 · *Diskussion:* 4 Min.

Die Ausweichumgebung kann am Donnerstagabend die ersten Märkte versorgen, aber nicht alle gleichzeitig: Pro Stunde lassen sich etwa zwei Märkte sicher umstellen. Es sind 23. Die eigenen Filialen haben den größten Umsatz in der Saisonwoche; die Partnermärkte haben einen Vertrag. Um Freitag 03:00 Uhr erreichen die Kassen die 72-Stunden-Grenze.

*Krisen-Info (rot hervorgehoben):* ca. 2 Märkte pro Stunde · 23 Märkte · Kassen-Grenze Freitag ca. 03:00 Uhr

*Fragen an die Gruppe:*

- Nach welchem Kriterium legen Sie die Reihenfolge fest?
- Wer entscheidet – und wer sagt es den Partnern?
- Was passiert mit Märkten, die die 72-Stunden-Grenze reißen?

*Bild auf der Bühne:* 23 Märkte, eine Reihenfolge.

*Zuständig:* Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Partnerbetreuung Verbund (Kundenmanagement IT-Service), Regionalleitung Filialen Nord, Leitung Finanzen und Versicherung (CFO)

*Hinweis für die Moderation:* Gleichbehandlung gegen Eigeninteresse. Der Vertrag regelt keine Reihenfolge – das macht es schwer. Gut ist ein offengelegtes Kriterium, das allen mitgeteilt wird.

#### LK21 – Nordkanal berichtet

*Simulationszeit:* Donnerstag 13:00 Uhr · *Station:* Folgen · *Priorität:* 2 · *Drehbuch-Minute:* 77 · *Diskussion:* 4 Min.

Nordkanal sendet einen Beitrag: „Brand im Rechenzentrum – Kassenchaos zum Saisonstart bei Waterkant“. Ein Partnermarkt-Inhaber kommt zu Wort, die Feuerwehr bestätigt einen Batteriebrand im Technikraum.

*Fragen an die Gruppe:*

- Reagieren Sie öffentlich auf den Beitrag?
- Was erfahren die eigenen Beschäftigten – bevor sie es aus den Medien hören?

*Bild auf der Bühne:* Nordkanal, Donnerstag 13:00 Uhr.

*Einspielung (Ton):* Nordkanal Nachrichten, Donnerstag, dreizehn Uhr. Bei der Waterkant Baumärkte GmbH hat in der Nacht zum Dienstag ein Brand im Technikraum des Firmenrechenzentrums die IT lahmgelegt. Nach Angaben der Feuerwehr geriet eine Batterieanlage in Brand, verletzt wurde niemand. Seitdem kassieren die vierzehn Filialen im Notbetrieb, die Preise aus dem aktuellen Prospekt gelten an vielen Kassen nicht. Betroffen sind auch neun selbständige Partnermärkte, deren Kassensysteme Waterkant betreibt. Ein Inhaber sagt, er habe aus der Zeitung mehr erfahren als von seinem Dienstleister. Waterkant kündigte an, die Systeme in einem Ausweichrechenzentrum wieder in Betrieb zu nehmen. Wann der Normalbetrieb zurückkehrt, ist offen. Wir bleiben für Sie dran.

*Ton:* `lk21-nordkanal-nachrichten.mp3`

*Zuständig:* Leitung Unternehmenskommunikation und Marketing, Personalleitung, Geschäftsführung (CEO), Krisenstabsleitung

*Hinweis für die Moderation:* Der Nachrichtenbeitrag läuft als Einspielung auf der Bühne (Abschrift in der Moderation).

#### LK22 – Die Kassen laufen wieder

*Simulationszeit:* Donnerstag 18:00 Uhr · *Station:* Wiederanlauf · *Priorität:* 1 · *Drehbuch-Minute:* 81 · *Diskussion:* 4 Min.

Die Kassen- und Preisdienste laufen aus dem Ausweich-Rack. Die ersten Märkte sind umgestellt, die Kassen gleichen ihre Offline-Abverkäufe ab, die Aktionspreise sind hinterlegt. Die übrigen Märkte folgen in der Nacht – nach der festgelegten Reihenfolge.

*Krisen-Info (rot hervorgehoben):* Kassen- und Preisdienste wieder verfügbar · Umstellung läuft bis in die Nacht

*Fragen an die Gruppe:*

- Woran merken Sie, dass ein Markt wirklich sauber läuft?
- Wer informiert Filialen, Partner und Hotline – mit welcher Botschaft?

*Bild auf der Bühne:* Erster Bon nach dem Wiederanlauf, Donnerstag 18:00 Uhr.

*Ton:* `lk22-kasse-startet.mp3`

*Zuständig:* IT-Support Filialen und Kassen, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Regionalleitung Filialen Nord, Regionalleitung Filialen Süd, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)

*Hinweis für die Moderation:* Erste Entlastung – aber nicht als Ende der Krise spielen. Warenwirtschaft, Lager, Portal und Datenlücke sind noch offen.

#### LK23 – Die Datenlücke

*Simulationszeit:* Freitag 09:00 Uhr · *Station:* Wiederanlauf · *Priorität:* 2 · *Drehbuch-Minute:* 85 · *Diskussion:* 4 Min.

Die Warenwirtschaft läuft im Ausweich-Rack auf dem Stand der letzten verfügbaren Sicherung. Der Abgleich zeigt: Wareneingänge, Bestellungen an Lieferanten und Retouren aus der Lücke fehlen. Im Lager steht Ware, die es laut System nicht gibt; Lieferanten fragen nach Bestellungen, die im System nicht existieren.

*Krisen-Info (rot hervorgehoben):* Datenlücke: ca. 26 Stunden (Montag 01:00 bis Dienstag 03:10 Uhr)

*Fragen an die Gruppe:*

- Wie schließen Sie die Lücke – und in welcher Reihenfolge?
- Was darf bis dahin auf Basis unvollständiger Daten entschieden werden?
- Wer gibt den Datenstand fachlich frei?

*Bild auf der Bühne:* Abgleich der Warenwirtschaft, Freitag 09:00 Uhr.

*Zuständig:* Leitung Logistik und Zentrallager, Leitung Einkauf und Dienstleistersteuerung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Leitung Finanzen und Versicherung (CFO)

*Kommt nur mit/nach:* LK19 Rücksicherung im Ausweich-Rack

#### LK24 – Der Versicherer ist da

*Simulationszeit:* Freitag 14:00 Uhr · *Station:* Wiederanlauf · *Priorität:* 2 · *Drehbuch-Minute:* 88 · *Diskussion:* 4 Min.

Der Gutachter der Elektronik- und Betriebsunterbrechungsversicherung besichtigt den Schaden. Er fragt nach Wartungsnachweisen der USV, nach der Dokumentation der Entscheidungen seit Dienstag und nach den Kosten des Ausweichbetriebs. Eine Zusage zur Kostenübernahme gibt er nicht – nur „unter Vorbehalt der Vertragsbedingungen“.

*Krisen-Info (rot hervorgehoben):* Kostenübernahme unter Vorbehalt · Wartungsnachweise angefordert

*Fragen an die Gruppe:*

- Welche Unterlagen liegen vor – und welche fehlen?
- Welche Kosten sind entschieden, welche nur geplant?
- Wer ist Ansprechpartner für den Gutachter?

*Bild auf der Bühne:* Begehung mit dem Gutachter, Freitag 14:00 Uhr.

*Zuständig:* Leitung Finanzen und Versicherung (CFO), Gebäudetechnik und Facility Management, Assistenz der Geschäftsführung / Lage und Dokumentation

#### LK25 – Der große Saisonsamstag

*Simulationszeit:* Samstag 08:00 Uhr · *Station:* Wiederanlauf · *Priorität:* 2 · *Drehbuch-Minute:* 91 · *Diskussion:* 4 Min.

Der umsatzstärkste Tag der Saison beginnt. Die Kassen laufen, die Aktionspreise stimmen. Die Frage ist, was außerhalb der Kassen geht: Online-Bestellungen, Abholung in der Filiale, Gewerbekunden. Jeder Fehler in Bestand oder Preis wird heute von Tausenden gesehen.

*Krisen-Info (rot hervorgehoben):* umsatzstärkster Tag · Kassen laufen · Online und Gewerbe: siehe Entscheidung vom Mittwoch

*Fragen an die Gruppe:*

- Was bieten Sie heute online und für Gewerbekunden an – und was bewusst nicht?
- Wer gibt Daten und Preise frei, bevor sie öffentlich sichtbar sind?

*Bild auf der Bühne:* Samstag, 08:00 Uhr: Die Filialen öffnen.

*Zuständig:* Leitung Online-Shop und Gewerbekundenportal, Regionalleitung Filialen Nord, Regionalleitung Filialen Süd, Kundenservice-Hotline

*Kommt nur mit/nach:* LK15 Wie weit geht der Ausweichbetrieb?

#### LK26 – Die Brandursache

*Simulationszeit:* Samstag 15:00 Uhr · *Station:* Wiederanlauf · *Priorität:* 2 · *Drehbuch-Minute:* 94 · *Diskussion:* 4 Min.

Der Brandsachverständige legt sein vorläufiges Ergebnis vor: Ein Batteriemodul der USV ist thermisch durchgegangen. Der Hersteller hatte im Herbst ein Sicherheits-Update für die Batteriesteuerung angekündigt; eingespielt wurde es nicht. Der Wartungstermin war zweimal verschoben worden. Die Warnmeldung vom Montagabend steht im Protokoll.

*Krisen-Info (rot hervorgehoben):* Vorläufige Ursache: thermisches Durchgehen eines Batteriemoduls · Update nicht eingespielt

*Fragen an die Gruppe:*

- Wie gehen Sie intern mit der Verantwortungsfrage um?
- Was sagen Sie Versicherer, Partnern und Öffentlichkeit – und was nicht?
- Welche Maßnahme verhindert das beim nächsten Mal?

*Bild auf der Bühne:* Vorläufiges Gutachten, Samstag 15:00 Uhr.

*Zuständig:* Gebäudetechnik und Facility Management, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Geschäftsführung (CEO), Krisenstabsleitung, Leitung Finanzen und Versicherung (CFO)

*Hinweis für die Moderation:* Keine Schuldsuche am Tisch. Gut: Ursache sachlich dokumentieren, Zuständigkeit für Wartung von IT-naher Gebäudetechnik klären, Lehren ableiten. Rechtliche Folgen fachlich prüfen lassen.

#### LK27 – Stabiler Notbetrieb

*Simulationszeit:* Sonntag 12:00 Uhr · *Station:* Wiederanlauf · *Priorität:* 1 · *Drehbuch-Minute:* 97 · *Diskussion:* 4 Min.

Nach fünf Tagen läuft Waterkant im stabilen Notbetrieb: Kassen und Preise aus dem Ausweich-Rack, die Warenwirtschaft mit nachgebuchten Daten, das Zentrallager liefert wieder. Das eigene Rechenzentrum ist gesperrt, die Reinigung hat begonnen. Das IT-Team arbeitet seit Dienstag in Doppelschichten, zwei Filialleitungen haben sich krankgemeldet.

*Krisen-Info (rot hervorgehoben):* Notbetrieb stabil · eigenes Rechenzentrum gesperrt · Team erschöpft

*Fragen an die Gruppe:*

- Welche Botschaft senden Sie an Beschäftigte, Partner und Kundschaft – und wer sagt es?
- Wie entlasten Sie die Menschen, die seit Dienstag durcharbeiten?
- Was ist ab Montag „normal“ – und was noch nicht?

*Bild auf der Bühne:* Sonntag, 12:00 Uhr: Notbetrieb stabil.

*Zuständig:* Geschäftsführung (CEO), Krisenstabsleitung, Personalleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Leitung Unternehmenskommunikation und Marketing

*Hinweis für die Moderation:* Nicht mit Erleichterung enden lassen. Folgen im Ablauf noch weitere Lagen, erst danach in den Abschluss überleiten. Arbeitszeitfragen nicht im Detail klären, sondern festhalten, wer sie fachlich prüft.

#### LK28 – Zurück ins eigene Rechenzentrum?

*Simulationszeit:* Montag 09:00 Uhr · *Station:* Wiederanlauf · *Priorität:* 3 · *Drehbuch-Minute:* 100 · *Diskussion:* 4 Min.

Der Sanierer meldet: Nach Reinigung, Prüfung und neuer USV ist das eigene Rechenzentrum in etwa drei Wochen wieder nutzbar. Der Colocation-Anbieter bietet an, den Betrieb dauerhaft zu übernehmen. Die Partnermärkte fragen, ob Waterkant künftig zwei Standorte betreibt. Die Geschäftsführung will bis Mittwoch eine Empfehlung.

*Krisen-Info (rot hervorgehoben):* Eigenes Rechenzentrum: ca. 3 Wochen · dauerhafte Auslagerung angeboten

*Fragen an die Gruppe:*

- Zurück, auslagern oder zwei Standorte – nach welchen Kriterien entscheiden Sie?
- Was muss vor der Rückkehr geprüft und freigegeben sein?

*Bild auf der Bühne:* Montag, 09:00 Uhr: Wie geht es weiter?

*Zuständig:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Geschäftsführung (CEO), Krisenstabsleitung, Leitung Finanzen und Versicherung (CFO), Gebäudetechnik und Facility Management

### Vertrauliche Karten (per E-Mail an eine Rolle, chronologisch)

#### SK01 – an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)

*Drehbuch-Minute:* 1 · *fällt in die Lage:* LK01 USV meldet Batteriewarnung (Montag 22:40 Uhr) · *Priorität:* 2 · *Ersatzrollen:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) → Gebäudetechnik und Facility Management

Die USV-Warnung kennst du: Der Temperatursensor meldet seit Wochen sporadisch. Das Sicherheits-Update des Herstellers für die Batteriesteuerung ist seit drei Monaten überfällig, der Wartungstermin wurde zweimal verschoben. Du hast Bereitschaft und entscheidest, ob du heute Nacht noch etwas unternimmst.

*Gute Reaktion:* Gebäudetechnik informiert, Hersteller-Hotline angefragt, Meldung dokumentiert – auch wenn es ein Fehlalarm sein könnte.  
*Schwache Reaktion:* Quittiert und vergessen, weil der Sensor „sowieso spinnt“.

#### SK02 – an Gebäudetechnik und Facility Management

*Drehbuch-Minute:* 3.5 · *fällt in die Lage:* LK02 Geruch im Technikflur (Dienstag 02:35 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Leitung Arbeitssicherheit und Werkschutz → IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)

*Kommt immer direkt mit:* LK02 Geruch im Technikflur

Der Wachdienst ruft dich an: Geruch im Technikflur. Deine Gebäudeleittechnik zeigt für den USV-Raum zusätzlich „Lüftung Störung“. Du bist 40 Minuten entfernt. Die Brandmeldeanlage ist ruhig.

*Gute Reaktion:* Sofort losfahren, IT-Rufbereitschaft informieren, Wachdienst anweisen, nicht allein in den USV-Raum zu gehen.  
*Schwache Reaktion:* Bis zum Morgen abwarten oder den Wachmann allein nachsehen lassen.

#### SK03 – an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)

*Drehbuch-Minute:* 6.5 · *fällt in die Lage:* LK03 Serverraum wird warm (Dienstag 03:02 Uhr) · *Priorität:* 1 · *Ersatzrollen:* IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft) → Geschäftsführung (CEO), Krisenstabsleitung

*Kommt immer direkt mit:* LK03 Serverraum wird warm

Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise an die Filialkassen läuft seit 03:00 Uhr und braucht noch etwa 40 Minuten; die Partnermärkte laden gerade ihre Tagesabschlüsse hoch. Herunterfahren heißt: Beides bricht ab – und das kurz vor dem Saisonstart.

*Gute Reaktion:* Abwägung laut aussprechen, Entscheidung treffen und dokumentieren; Gebäudetechnik und Geschäftsführung informieren.  
*Schwache Reaktion:* Abwarten, ohne zu entscheiden, oder allein entscheiden, ohne dass es jemand erfährt.

#### SK04 – an Schichtleitung Zentrallager (vor Ort in der Brandnacht)

*Drehbuch-Minute:* 13.5 · *fällt in die Lage:* LK05 Feuerwehr im Einsatz (Dienstag 03:40 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Leitung Arbeitssicherheit und Werkschutz → Personalleitung

*Kommt immer direkt mit:* LK05 Feuerwehr im Einsatz

Am Sammelplatz fehlt der Kollege der IT-Rufbereitschaft. Sein Auto steht auf dem Hof, ans Telefon geht er nicht. Die Feuerwehr fragt dich, ob noch jemand im Gebäude ist.

*Gute Reaktion:* Sofort an die Einsatzleitung melden, Name und letzter bekannter Ort; niemand geht selbst suchen.  
*Schwache Reaktion:* Selbst ins Gebäude gehen oder die Information erst nach eigener Suche weitergeben.

#### SK05 – an Personalleitung

*Drehbuch-Minute:* 15 · *fällt in die Lage:* LK05 Feuerwehr im Einsatz (Dienstag 03:40 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Geschäftsführung (CEO), Krisenstabsleitung → Leitung Arbeitssicherheit und Werkschutz

Entwarnung: Der Kollege der Rufbereitschaft ist wohlauf. Er hatte das Gebäude über den Hinterausgang verlassen und stand am falschen Sammelplatz an Tor 2. Seine Frau hat inzwischen dreimal in der Zentrale angerufen – die Telefonanlage ist tot, sie hat nur die Bandansage gehört.

*Gute Reaktion:* Angehörige zurückrufen, Sammelplatzregelung festhalten, Nachbereitung des Vorfalls ansetzen.  
*Schwache Reaktion:* Angehörige vergessen, weil „ja alles gut ausgegangen ist“.

#### SK06 – an Leitung Arbeitssicherheit und Werkschutz

*Drehbuch-Minute:* 17.5 · *fällt in die Lage:* LK06 Lagebild nach dem Löschen (Dienstag 05:30 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Gebäudetechnik und Facility Management → Geschäftsführung (CEO), Krisenstabsleitung

*Kommt immer direkt mit:* LK06 Lagebild nach dem Löschen

Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Fluorwasserstoff und andere ätzende Gase entstehen. Er empfiehlt, USV-Raum und Serverraum erst nach Messung und Freigabe durch Sachverständige zu betreten – ausdrücklich auch für IT-Personal.

*Gute Reaktion:* Betretungsverbot klar festlegen und allen Bereichen mitteilen, Messung beauftragen.  
*Schwache Reaktion:* Die Empfehlung bleibt bei dir, die IT plant schon das Betreten.

#### SK34 – an Assistenz der Geschäftsführung / Lage und Dokumentation

*Drehbuch-Minute:* 17.5 · *fällt in die Lage:* LK06 Lagebild nach dem Löschen (Dienstag 05:30 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Notfallmanagement / BCM-Koordination → Geschäftsführung (CEO), Krisenstabsleitung

*Kommt immer direkt mit:* LK06 Lagebild nach dem Löschen

Die Entscheidungen der Brandnacht sind nirgends dokumentiert: wer wann was abgeschaltet, wen informiert, wem welche Anweisung gegeben hat. Versicherer und Sachverständige werden danach fragen.

*Gute Reaktion:* Chronologie jetzt aus Telefonlisten, Chats und Erinnerungen rekonstruieren und ab sofort mitschreiben.  
*Schwache Reaktion:* Erst am Ende aufschreiben.

#### SK07 – an Informationssicherheit und Datenschutzkoordination

*Drehbuch-Minute:* 21.5 · *fällt in die Lage:* LK07 Was noch läuft – und was nicht (Dienstag 06:30 Uhr) · *Priorität:* 2 · *Ersatzrollen:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) → Notfallmanagement / BCM-Koordination

*Kommt immer direkt mit:* LK07 Was noch läuft – und was nicht

Weil die Anmeldedienste der Zentrale ausgefallen sind, teilen Beschäftigte Zugangsdaten im Chat und nutzen private Hotspots. Ein Filialleiter fragt, ob er die Kundenliste der Gewerbekunden als Tabelle an seine private Mailadresse schicken darf, um telefonisch nachfassen zu können.

*Gute Reaktion:* Klare Regel für Behelfslösungen ausgeben (was erlaubt ist, was nicht, wer genehmigt); Datenschutzfrage fachlich prüfen lassen statt Einzelfall durchwinken.  
*Schwache Reaktion:* Alles erlauben, „weil Notfall ist“, oder alles verbieten, ohne Alternative.

#### SK08 – an IT-Support Filialen und Kassen

*Drehbuch-Minute:* 21.5 · *fällt in die Lage:* LK07 Was noch läuft – und was nicht (Dienstag 06:30 Uhr) · *Priorität:* 1 · *Ersatzrollen:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) → Regionalleitung Filialen Nord

Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe etwa 72 Stunden, danach verweigern sie neue Buchungen, bis sie wieder mit der Zentrale synchronisiert sind. Das wäre Freitag gegen 03:00 Uhr. In den Filialen weiß das noch niemand.

*Gute Reaktion:* Die Frist sofort an den Krisenstab geben – sie bestimmt die Wiederanlaufplanung.  
*Schwache Reaktion:* Die Frist für sich behalten, „bis dahin läuft es ja wieder“.

#### SK35 – an Notfallmanagement / BCM-Koordination

*Drehbuch-Minute:* 21.5 · *fällt in die Lage:* LK07 Was noch läuft – und was nicht (Dienstag 06:30 Uhr) · *Priorität:* 1 · *Ersatzrollen:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) → Geschäftsführung (CEO), Krisenstabsleitung

Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine Papierkopie gibt es im Tresor der Geschäftsführung – im Verwaltungsgebäude, das bis zur Freigabe gesperrt ist.

*Gute Reaktion:* Lücke offen benennen, Kopie aus der Cloud oder von Einzelpersonen beschaffen, Krisenstab nach Erfahrung und Checkliste arbeiten lassen.  
*Schwache Reaktion:* So tun, als gäbe es einen Plan.

#### SK09 – an Regionalleitung Filialen Nord

*Drehbuch-Minute:* 25.5 · *fällt in die Lage:* LK08 Saisonstart ohne Aktionspreise (Dienstag 07:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Regionalleitung Filialen Süd → Geschäftsführung (CEO), Krisenstabsleitung

*Kommt immer direkt mit:* LK08 Saisonstart ohne Aktionspreise

Zwei Filialleitungen fragen, ob sie heute öffnen sollen. Eine Filiale hat schon handgeschriebene Schilder aufgehängt: „Aktionspreise gelten ab Donnerstag“ – niemand hat das entschieden.

*Gute Reaktion:* Einheitliche Entscheidung einfordern und an alle Filialen geben; eigenmächtige Zusagen stoppen.  
*Schwache Reaktion:* Jede Filiale entscheiden lassen.

#### SK10 – an Regionalleitung Filialen Süd

*Drehbuch-Minute:* 27 · *fällt in die Lage:* LK08 Saisonstart ohne Aktionspreise (Dienstag 07:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Regionalleitung Filialen Nord → Geschäftsführung (CEO), Krisenstabsleitung

In einer Filiale gibt die Filialleitung den Prospektpreis per Handeingabe, die Nachbarfiliale verweigert ihn. Kundinnen vergleichen die Bons in einer Facebook-Gruppe.

*Gute Reaktion:* Den Widerspruch sofort in den Krisenstab tragen und eine einheitliche Regel verlangen.  
*Schwache Reaktion:* Die eigene Region regeln, ohne die andere Region und den Krisenstab einzubinden.

#### SK11 – an Partnerbetreuung Verbund (Kundenmanagement IT-Service)

*Drehbuch-Minute:* 29.5 · *fällt in die Lage:* LK09 Die Partnermärkte rufen an (Dienstag 08:30 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Leitung Finanzen und Versicherung (CFO) → Geschäftsführung (CEO), Krisenstabsleitung

*Kommt immer direkt mit:* LK09 Die Partnermärkte rufen an

Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiederherstellungsziel 24 Stunden für Kassen- und Preisdienste. Er will bis 12 Uhr wissen, wann es weitergeht, sonst wendet er sich an den Verbundvorstand.

*Gute Reaktion:* Die Frist und die Stimmung in den Krisenstab tragen und eine abgestimmte Botschaft mit Termin holen.  
*Schwache Reaktion:* Den Partnern auf eigene Faust einen Termin nennen.

#### SK12 – an Leitung Finanzen und Versicherung (CFO)

*Drehbuch-Minute:* 30.5 · *fällt in die Lage:* LK09 Die Partnermärkte rufen an (Dienstag 08:30 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Geschäftsführung (CEO), Krisenstabsleitung → Partnerbetreuung Verbund (Kundenmanagement IT-Service)

Im Servicevertrag mit den Partnermärkten stehen Gutschriften bei Überschreiten des Wiederherstellungsziels (Szenarioannahme: 2.000 € je Markt und angefangenem Tag). Zwei Verträge enthalten zusätzlich ein Sonderkündigungsrecht bei „erheblicher Störung“. Ob dieser Fall eintritt, ist fachlich zu prüfen.

*Gute Reaktion:* Vertragsrisiko beziffern, fachliche Prüfung anstoßen, Geschäftsführung informieren.  
*Schwache Reaktion:* Vertragsfolgen herunterspielen oder als sicher behaupten.

#### SK13 – an Gebäudetechnik und Facility Management

*Drehbuch-Minute:* 33.5 · *fällt in die Lage:* LK10 Serverraum gesperrt (Dienstag 10:00 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Leitung Arbeitssicherheit und Werkschutz → IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)

Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht Arbeitstage. Die Klimaanlage darf bis zur Prüfung nicht laufen – Feuchtigkeit plus Ruß beschleunigt die Korrosion. Ob die Hardware danach noch zuverlässig ist, kann er nicht sagen.

*Gute Reaktion:* Zeitrahmen und Unsicherheit offen in den Krisenstab geben; Freigabeprozess festlegen.  
*Schwache Reaktion:* Einen Wiederinbetriebnahmetermin versprechen.

#### SK14 – an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)

*Drehbuch-Minute:* 35 · *fällt in die Lage:* LK10 Serverraum gesperrt (Dienstag 10:00 Uhr) · *Priorität:* 1 · *Ersatzrollen:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)

Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall Rußfilm. In Rack 7 steht der Backup-Server mit der Dienstagssicherung von 01:00 Uhr. Wird er bald geborgen und gereinigt, sind die Daten vermutlich lesbar – je länger er im Ruß steht, desto größer die Korrosionsgefahr.

*Gute Reaktion:* Die Information mit Unsicherheit an die IT-Leitung und den Krisenstab geben; nicht selbst hineingehen.  
*Schwache Reaktion:* Eine eigene „schnelle Bergung“ planen.

#### SK15 – an Leitung Unternehmenskommunikation und Marketing

*Drehbuch-Minute:* 37.5 · *fällt in die Lage:* LK11 Nordkanal fragt nach (Dienstag 11:30 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Geschäftsführung (CEO), Krisenstabsleitung

*Kommt immer direkt mit:* LK11 Nordkanal fragt nach

Ein Lokaljournalist hat ein Foto: Feuerwehr vor dem Verwaltungsgebäude, Rauch aus einem Lüftungsgitter. Auf Facebook schreibt jemand von „Akkubrand, giftige Gase, Anwohner sollen Fenster schließen“. Die Feuerwehr hat bisher nur „Brand in einem Technikraum“ bestätigt.

*Gute Reaktion:* Nur Bestätigtes sagen, für Gesundheitsfragen auf Feuerwehr und Behörden verweisen, Hotline briefen.  
*Schwache Reaktion:* Gerüchte dementieren, ohne es zu wissen.

#### SK16 – an Leitung Logistik und Zentrallager

*Drehbuch-Minute:* 41.5 · *fällt in die Lage:* LK12 Das Zentrallager steht (Dienstag 14:00 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Schichtleitung Zentrallager (vor Ort in der Brandnacht) → Geschäftsführung (CEO), Krisenstabsleitung

*Kommt immer direkt mit:* LK12 Das Zentrallager steht

Ohne Lagerverwaltung kennt niemand die Lagerplätze von rund 40.000 Artikeln. Ein Spediteur wartet seit 06:00 Uhr auf Ladung und berechnet ab Mittag Standgeld. Die Filialen rufen einzeln an und bestellen „das Wichtigste“.

*Gute Reaktion:* Bestellungen bündeln, Prioritäten mit dem Krisenstab festlegen, Papierbetrieb so organisieren, dass er nachgebucht werden kann.  
*Schwache Reaktion:* Wer zuerst anruft, bekommt zuerst.

#### SK17 – an Schichtleitung Zentrallager (vor Ort in der Brandnacht)

*Drehbuch-Minute:* 43 · *fällt in die Lage:* LK12 Das Zentrallager steht (Dienstag 14:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Leitung Logistik und Zentrallager

Die Kommissionierer der Frühschicht sagen: „Wir kennen das Lager, wir machen das auf Zuruf.“ Fehllieferungen wären wahrscheinlich, aber die Filialen hätten Ware zum Saisonstart.

*Gute Reaktion:* Vorschlag mit Risiko an die Lagerleitung geben; Papierbelege für jede Entnahme verlangen.  
*Schwache Reaktion:* Ohne Belege loslegen.

#### SK18 – an Leitung Einkauf und Dienstleistersteuerung

*Drehbuch-Minute:* 45.5 · *fällt in die Lage:* LK13 Ersatz: Hardware oder Ausweich-Rack? (Dienstag 17:00 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Leitung Finanzen und Versicherung (CFO) → IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)

Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-Anbieter kann das Ausweich-Rack binnen 48 Stunden erweitern – Mindestlaufzeit zwölf Monate, Kosten für das erste Jahr rund 210.000 € einschließlich Dienstleistern (Szenarioannahme).

*Gute Reaktion:* Angebote vergleichbar machen und dem Krisenstab zur Entscheidung vorlegen; Fristen der Angebote nennen.  
*Schwache Reaktion:* Allein bestellen oder Angebote verfallen lassen.

#### SK19 – an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)

*Drehbuch-Minute:* 47 · *fällt in die Lage:* LK13 Ersatz: Hardware oder Ausweich-Rack? (Dienstag 17:00 Uhr) · *Priorität:* 1 · *Ersatzrollen:* IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft) → Geschäftsführung (CEO), Krisenstabsleitung

Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und den Kern der Warenwirtschaft. Die Netzwerkanbindung der 23 Märkte muss neu eingerichtet werden – das wurde nie vollständig geübt. Zwei deiner fünf Leute sind seit Dienstag 03:00 Uhr wach.

*Gute Reaktion:* Realistisches Lagebild mit Personalengpass an den Krisenstab; Ruhezeiten einplanen.  
*Schwache Reaktion:* Zu optimistische Zusagen, um Druck abzubauen.

#### SK21 – an Leitung Arbeitssicherheit und Werkschutz

*Drehbuch-Minute:* 49.5 · *fällt in die Lage:* LK14 Den Backup-Server bergen? (Mittwoch 07:30 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Gebäudetechnik und Facility Management → Geschäftsführung (CEO), Krisenstabsleitung

*Kommt immer direkt mit:* LK14 Den Backup-Server bergen?

Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, aktuelles Messergebnis, Fachfirma mit Schutzausrüstung, Freiwilligkeit, Dokumentation. Die Fachfirma könnte heute um 14 Uhr – mit eigenem Personal, nicht mit eurer IT.

*Gute Reaktion:* Voraussetzungen klar benennen; entscheiden lässt du dir nicht abnehmen, aber auch nicht aufdrängen.  
*Schwache Reaktion:* Aus Zeitdruck zustimmen, ohne Voraussetzungen zu prüfen – oder pauschal ablehnen, ohne zu begründen.

#### SK22 – an Informationssicherheit und Datenschutzkoordination

*Drehbuch-Minute:* 53.5 · *fällt in die Lage:* LK15 Wie weit geht der Ausweichbetrieb? (Mittwoch 10:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) → Leitung Finanzen und Versicherung (CFO)

*Kommt immer direkt mit:* LK15 Wie weit geht der Ausweichbetrieb?

Wenn die Warenwirtschaft ins Ausweich-Rack zieht, laufen dort auch Daten der Gewerbekunden und Partnermärkte. Der Vertrag mit dem Colocation-Anbieter beschreibt nur die Lagerung von Sicherungskopien, nicht den Produktivbetrieb. Was das bedeutet, ist fachlich zu prüfen.

*Gute Reaktion:* Thema in den Krisenstab, fachliche Prüfung parallel anstoßen, ohne den Wiederanlauf zu blockieren.  
*Schwache Reaktion:* Schweigen oder den Wiederanlauf allein stoppen.

#### SK46 – an Geschäftsführung (CEO), Krisenstabsleitung

*Drehbuch-Minute:* 53.5 · *fällt in die Lage:* LK15 Wie weit geht der Ausweichbetrieb? (Mittwoch 10:00 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Leitung Finanzen und Versicherung (CFO)

*Kommt immer direkt mit:* LK15 Wie weit geht der Ausweichbetrieb?

Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Ausweich-Racks gehört und ruft dich an. Nach eurer Geschäftsordnung brauchen Verträge mit mehr als zwölf Monaten Bindung die Zustimmung der Gesellschafter. Er ist bis Freitag im Ausland, aber telefonisch erreichbar: „Entscheiden Sie, was nötig ist – aber ich will es vorher wissen und nicht aus der Rechnung erfahren.“

*Gute Reaktion:* Beide Wege mit Kosten und Folgen kurz darstellen, Zustimmung einholen und dokumentieren, bevor unterschrieben wird.  
*Schwache Reaktion:* Ohne Zustimmung unterschreiben – oder die Entscheidung bis Freitag liegen lassen.

#### SK23 – an Leitung Online-Shop und Gewerbekundenportal

*Drehbuch-Minute:* 55 · *fällt in die Lage:* LK15 Wie weit geht der Ausweichbetrieb? (Mittwoch 10:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) → Leitung Unternehmenskommunikation und Marketing

Der Shop zeigt seit Dienstag Bestände von Montagnacht. 312 Bestellungen „Abholung in der Filiale“ sind eingegangen, ein Teil für Artikel, die vermutlich nicht da sind. Der Hoster könnte den Shop auf „nur Information“ schalten.

*Gute Reaktion:* Entscheidung über den Shop in den Krisenstab, Kundinnen und Kunden aktiv informieren.  
*Schwache Reaktion:* Den Shop laufen lassen und hoffen.

#### SK24 – an Kundenservice-Hotline

*Drehbuch-Minute:* 61.5 · *fällt in die Lage:* LK17 Prospektpreise vor der Kasse (Mittwoch 16:00 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Leitung Unternehmenskommunikation und Marketing → Regionalleitung Filialen Nord

Seit dem Morgen über 600 Anrufe. Die häufigste Frage: „Gilt der Prospektpreis?“ Ihr habt keine Sprachregelung. Mehrere Anrufer drohen mit einer Beschwerde wegen irreführender Werbung.

*Gute Reaktion:* Sprachregelung einfordern und die Lage mit Zahlen an den Krisenstab geben.  
*Schwache Reaktion:* Jede Kollegin antwortet nach eigenem Ermessen.

#### SK25 – an Leitung Unternehmenskommunikation und Marketing

*Drehbuch-Minute:* 62.5 · *fällt in die Lage:* LK17 Prospektpreise vor der Kasse (Mittwoch 16:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Geschäftsführung (CEO), Krisenstabsleitung → Kundenservice-Hotline

Ein bekannter Heimwerker-Kanal hat ein Video aus einer Filiale gepostet: Der Bon zeigt den alten Preis, daneben der Prospekt. 80.000 Aufrufe seit dem Mittag.

*Gute Reaktion:* Einheitliche Kulanzregel öffentlich machen, Fehler einräumen, ohne rechtlich zu bewerten.  
*Schwache Reaktion:* Löschen lassen wollen oder den Kanal angreifen.

#### SK20 – an Geschäftsführung (CEO), Krisenstabsleitung

*Drehbuch-Minute:* 65.5 · *fällt in die Lage:* LK18 Der Verbundbeirat verlangt Antworten (Mittwoch 19:00 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Partnerbetreuung Verbund (Kundenmanagement IT-Service) → Leitung Finanzen und Versicherung (CFO)

*Kommt immer direkt mit:* LK18 Der Verbundbeirat verlangt Antworten

Der Vorsitzende des Verbundbeirats ruft dich vor der Videokonferenz privat an: Zwei Partner wollen den IT-Servicevertrag kündigen. Er erwartet eine klare Aussage, wann ihre Kassen wieder voll laufen – und ob Waterkant die eigenen Märkte bevorzugt. „Ich will nicht hören, dass Sie es nicht wissen.“

*Gute Reaktion:* Ruhig bleiben, ehrliche Spanne, keine Zusage zur Reihenfolge, die nicht entschieden ist; Druck in den Krisenstab tragen.  
*Schwache Reaktion:* Eine Zusage machen, die den Krisenstab bindet, ohne dass er es weiß.

#### SK26 – an Partnerbetreuung Verbund (Kundenmanagement IT-Service)

*Drehbuch-Minute:* 66 · *fällt in die Lage:* LK18 Der Verbundbeirat verlangt Antworten (Mittwoch 19:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Geschäftsführung (CEO), Krisenstabsleitung

Ein Partnermarkt hat eigenständig einen anderen Kassenanbieter angefragt und will dir heute sagen, ob er „vorerst selbst etwas aufbaut“. Damit würde er aus dem gemeinsamen Preis- und Warenwirtschaftssystem ausscheren.

*Gute Reaktion:* Verständnis zeigen, Lage ehrlich darstellen, Entscheidung der Geschäftsführung einholen.  
*Schwache Reaktion:* Den Partner unter Druck setzen oder ihn kommentarlos ziehen lassen.

#### SK29 – an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)

*Drehbuch-Minute:* 69.5 · *fällt in die Lage:* LK19 Rücksicherung im Ausweich-Rack (Donnerstag 08:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) → Informationssicherheit und Datenschutzkoordination

*Kommt immer direkt mit:* LK19 Rücksicherung im Ausweich-Rack

Die Rücksicherung läuft sauber. Die Aktionspreise fehlen in der Montagskopie; der Einkauf hat sie nur als PDF vom Druckdienstleister. Abtippen dauert, Einlesen per Skript aus dem PDF ist schnell, aber ungeprüft.

*Gute Reaktion:* Vier-Augen-Prüfung für jeden Preisimport festlegen und Freigabe einholen.  
*Schwache Reaktion:* Ungeprüftes Einlesen, „weil Samstag ist“.

#### SK40 – an Informationssicherheit und Datenschutzkoordination

*Drehbuch-Minute:* 70 · *fällt in die Lage:* LK19 Rücksicherung im Ausweich-Rack (Donnerstag 08:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) → IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)

Das Team will für die Umstellung der 23 Märkte die Firewall des Ausweich-Racks „vorübergehend für alles öffnen“, damit es schneller geht. Später zu schließen ist geplant, aber nicht terminiert.

*Gute Reaktion:* Keine pauschale Öffnung; Regeln je Markt mit Vier-Augen-Prüfung; Ausnahme nur mit Befristung und Freigabe.  
*Schwache Reaktion:* Zustimmen, weil der Druck groß ist.

#### SK28 – an IT-Support Filialen und Kassen

*Drehbuch-Minute:* 81.5 · *fällt in die Lage:* LK22 Die Kassen laufen wieder (Donnerstag 18:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) → IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)

*Kommt immer direkt mit:* LK22 Die Kassen laufen wieder

Bei vier Filialen schlägt der Kassenabgleich fehl: Die Abverkäufe von Dienstag bis Donnerstag liegen nur auf den Kassen selbst. Wenn ihr die Kassen neu aufsetzt, sind die Daten weg.

*Gute Reaktion:* Abgleich stoppen, Daten sichern lassen, Krisenstab informieren.  
*Schwache Reaktion:* Neu aufsetzen, damit es schnell geht.

#### SK38 – an Regionalleitung Filialen Nord

*Drehbuch-Minute:* 83 · *fällt in die Lage:* LK22 Die Kassen laufen wieder (Donnerstag 18:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Regionalleitung Filialen Süd

Die Kassen laufen wieder, aber Rückgaben von Bons aus dem Offline-Zeitraum lassen sich nicht stornieren. Kundinnen und Kunden stehen mit Ware und Bon an der Information.

*Gute Reaktion:* Übergangsregel für Rückgaben einfordern und kommunizieren.  
*Schwache Reaktion:* Jede Filiale improvisiert.

#### SK30 – an Leitung Einkauf und Dienstleistersteuerung

*Drehbuch-Minute:* 85.5 · *fällt in die Lage:* LK23 Die Datenlücke (Freitag 09:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Leitung Logistik und Zentrallager → Leitung Finanzen und Versicherung (CFO)

*Kommt immer direkt mit:* LK23 Die Datenlücke

Lieferanten fragen nach Bestellungen von Montag, die im System fehlen. Zwei haben „vorsichtshalber“ doppelt geliefert, einer hat gar nicht geliefert, weil keine Bestätigung kam.

*Gute Reaktion:* Bestellungen aus Lieferantenbestätigungen rekonstruieren, Abgleich organisieren, Krisenstab informieren.  
*Schwache Reaktion:* Alles annehmen, was kommt, und später sortieren.

#### SK31 – an Leitung Logistik und Zentrallager

*Drehbuch-Minute:* 86 · *fällt in die Lage:* LK23 Die Datenlücke (Freitag 09:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Schichtleitung Zentrallager (vor Ort in der Brandnacht) → Leitung Einkauf und Dienstleistersteuerung

Die Wareneingänge vom Montag (38 Lkw) sind im System nicht gebucht. Die Ware steht im Lager, laut System gibt es sie nicht – die Filialen sehen „nicht verfügbar“.

*Gute Reaktion:* Nachbuchung priorisieren (schnelldrehende Saisonware zuerst) und Datenstand erst danach freigeben.  
*Schwache Reaktion:* Bestände schätzen und freigeben.

#### SK27 – an Leitung Finanzen und Versicherung (CFO)

*Drehbuch-Minute:* 88.5 · *fällt in die Lage:* LK24 Der Versicherer ist da (Freitag 14:00 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Geschäftsführung (CEO), Krisenstabsleitung → Gebäudetechnik und Facility Management

*Kommt immer direkt mit:* LK24 Der Versicherer ist da

Der Versicherungsmakler weist darauf hin: Die Elektronikversicherung leistet nach den Bedingungen nur, wenn Wartungsauflagen eingehalten wurden. Die USV-Wartung war überfällig. Ob und wie stark das die Leistung mindert, ist fachlich zu prüfen.

*Gute Reaktion:* Risiko in die Liquiditätsplanung aufnehmen und offen in den Krisenstab geben.  
*Schwache Reaktion:* Mit der vollen Erstattung planen.

#### SK33 – an Kundenservice-Hotline

*Drehbuch-Minute:* 91.5 · *fällt in die Lage:* LK25 Der große Saisonsamstag (Samstag 08:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Leitung Online-Shop und Gewerbekundenportal

*Kommt immer direkt mit:* LK25 Der große Saisonsamstag

Kundinnen und Kunden fragen, ob ihre Online-Abholungen vom Dienstag noch gelten und ob sie den Prospektpreis nachträglich erstattet bekommen.

*Gute Reaktion:* Sprachregelung für Abholungen und Erstattungen einfordern.  
*Schwache Reaktion:* Einzelfallzusagen ohne Regel.

#### SK39 – an Leitung Online-Shop und Gewerbekundenportal

*Drehbuch-Minute:* 92 · *fällt in die Lage:* LK25 Der große Saisonsamstag (Samstag 08:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Leitung Unternehmenskommunikation und Marketing

Für Samstag erwartet der Shop-Hoster das Dreifache der üblichen Besucherzahl. Jeder Preis- oder Bestandsfehler wird heute tausendfach gesehen.

*Gute Reaktion:* Nur freigegebene Daten zeigen, Aussagen zu Verfügbarkeit vorsichtig formulieren.  
*Schwache Reaktion:* Alles freischalten, was technisch geht.

#### SK36 – an Gebäudetechnik und Facility Management

*Drehbuch-Minute:* 94.5 · *fällt in die Lage:* LK26 Die Brandursache (Samstag 15:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) → Geschäftsführung (CEO), Krisenstabsleitung

*Kommt immer direkt mit:* LK26 Die Brandursache

Der Sachverständige fragt dich, wer für die USV-Wartung zuständig war: Gebäudetechnik, weil es Haustechnik ist, oder IT, weil sie im Rechenzentrum steht. In den Unterlagen ist es nicht eindeutig geregelt.

*Gute Reaktion:* Lücke ehrlich benennen und als Maßnahme festhalten.  
*Schwache Reaktion:* Die Verantwortung der jeweils anderen Abteilung zuschieben.

#### SK32 – an Personalleitung

*Drehbuch-Minute:* 97.5 · *fällt in die Lage:* LK27 Stabiler Notbetrieb (Sonntag 12:00 Uhr) · *Priorität:* 1 · *Ersatzrollen:* Geschäftsführung (CEO), Krisenstabsleitung → IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)

*Kommt immer direkt mit:* LK27 Stabiler Notbetrieb

Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei Filialleitungen sind krank. Der Betriebsrat fragt, wer die Einsätze am Wochenende angeordnet hat. Arbeitszeitfragen sind fachlich zu prüfen.

*Gute Reaktion:* Ruhezeiten organisieren, Vertretungen planen, Betriebsrat einbinden.  
*Schwache Reaktion:* Weitermachen wie bisher, „es ist ja bald vorbei“.

#### SK37 – an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)

*Drehbuch-Minute:* 100.5 · *fällt in die Lage:* LK28 Zurück ins eigene Rechenzentrum? (Montag 09:00 Uhr) · *Priorität:* 2 · *Ersatzrollen:* Geschäftsführung (CEO), Krisenstabsleitung → Leitung Finanzen und Versicherung (CFO)

*Kommt immer direkt mit:* LK28 Zurück ins eigene Rechenzentrum?

Die Geschäftsführung will bis Mittwoch deine Empfehlung: zurück ins eigene Rechenzentrum, dauerhaft auslagern oder zwei Standorte. Dein Team ist erschöpft, die Partnermärkte wollen Gewissheit.

*Gute Reaktion:* Kriterien statt Bauchgefühl: Risiko, Kosten, Zeit, Personal; Entscheidung erst nach Prüfung.  
*Schwache Reaktion:* Unter Druck aus dem Bauch entscheiden.

### Entscheidungen mit Folgen (Weichen)

Die Moderation hält fest, wie der Tisch entschieden hat. Ohne Eintrag bleibt die Geschichte wie im Drehbuch.

#### W1 – bei LK03 Serverraum wird warm

**Frage:** Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen sie weiter, bis die Gebäudetechnik die Ursache kennt?

- **Nicht zwingend benötigte Systeme sofort kontrolliert herunterfahren (Preisübertragung und Partner-Uploads brechen ab)** – Die Datenbanken sind sauber beendet; die Rücksicherung braucht keine Reparatur. Die Aktionspreise fehlen dafür in allen 14 Filialen.
  - LK19 bekommt dazu: „Weil die Systeme in der Brandnacht kontrolliert heruntergefahren wurden, sind die Datenbanken konsistent – die Rücksicherung kommt ohne Reparatur aus.“
  - LK22 bekommt dazu: „Die kontrollierte Abschaltung in der Brandnacht hat sich bezahlt gemacht: Die Datenbanken mussten nicht repariert werden.“
  - Abschluss: Abgebrochene Preisübertragung: Aktionspreise auch in den 5 Filialen per Kulanz, die sie sonst erhalten hätten (50.000 €)
- **Weiterlaufen lassen, bis die Gebäudetechnik die Ursache geklärt hat** – Die Preisübertragung erreicht vor dem Stromausfall noch 5 der 14 Filialen. Der harte Ausfall hinterlässt eine inkonsistente Datenbank: einen Tag Reparatur.
  - LK08 bekommt dazu: „Ausnahme: In 5 der 14 Filialen kam die Preisübertragung vor dem Stromausfall noch an – dort stimmen die Aktionspreise.“
  - Folgekarte SK41 an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft) bei LK15: „Die Datenbank der Warenwirtschaft ist nach dem harten Stromausfall in der Brandnacht inkonsistent. Bevor ihr irgendetwas ins Ausweich-Rack übertragt, muss sie repariert werden – etwa ein Tag zusätzlich.“
  - Abschluss: Reparatur der Warenwirtschafts-Datenbank nach hartem Ausfall (ein Tag Verzug) (95.000 €)

#### W2 – bei LK09 Die Partnermärkte rufen an

**Frage:** Informiert Waterkant heute alle Partnermärkte mit einer ehrlichen, aber unsicheren Prognose – oder erst, wenn ein belastbarer Wiederanlauftermin feststeht?

- **Heute 11 Uhr alle Partner informieren: Lage, ehrliche Spanne („Kassen frühestens Donnerstag“), fester Update-Takt** – Die Partner planen mit Donnerstag; einer kritisiert später, dass „Donnerstag“ nur für Kassen, nicht für Bestellungen galt.
  - LK22 bekommt dazu: „Die Partnermärkte hatten seit Dienstag mit Donnerstag geplant. Ein Partner kritisiert, dass „Donnerstag“ nur für die Kassen galt, nicht für Bestellungen und Bestände.“
- **Erst informieren, wenn ein belastbarer Termin feststeht (voraussichtlich Mittwoch)** – Die Partner erfahren die Lage aus der Zeitung; der Verbundvorstand verlangt ein Gespräch (vertrauliche Karte bei „Den Backup-Server bergen?“); Kulanzposten in der Rechnung.
  - LK18 bekommt dazu: „Mehrere Partner beklagen, dass sie bis Mittwoch nur Gerüchte hatten.“
  - Folgekarte SK42 an Geschäftsführung (CEO), Krisenstabsleitung bei LK14: „Der Verbundvorstand ruft an: Die Partner haben aus der Lokalzeitung mehr über den Brand erfahren als von Waterkant. Er verlangt bis heute Abend ein Gespräch mit dir.“
  - Abschluss: Kulanz und Sonderkonditionen für Partnermärkte (40.000 €)

#### W3 – bei LK14 Den Backup-Server bergen?

**Frage:** Lässt Waterkant den Backup-Server mit der Dienstagssicherung heute von einer Fachfirma aus dem gesperrten Serverraum bergen – oder wartet es die Freigabe des Raums ab?

- **Heute durch die Fachfirma unter Schutzausrüstung bergen lassen (nach Gefährdungsbeurteilung), dann reinigen und prüfen** – Die Dienstagssicherung ist nach Reinigung lesbar; die Datenlücke schrumpft auf etwa zwei Stunden. Die Berufsgenossenschaft fragt nach den Unterlagen.
  - LK23 bekommt dazu: „Die am Mittwoch geborgene Dienstagssicherung war nach Reinigung lesbar: Die Lücke schrumpft auf die zwei Stunden vor dem Brand.“ · Krisen-Info: Datenlücke: ca. 2 Stunden (Dienstagssicherung geborgen und geprüft)
  - LK27 bekommt dazu: „Dank der am Mittwoch geborgenen Dienstagssicherung fehlten nur rund zwei Stunden Daten.“
  - Folgekarte SK43 an Leitung Arbeitssicherheit und Werkschutz bei LK22: „Die Berufsgenossenschaft fragt nach der Gefährdungsbeurteilung für den Einsatz der Fachfirma im kontaminierten Serverraum und nach dem Messprotokoll.“
  - Abschluss: Bergung, Reinigung und Datenrettung des Backup-Servers durch Fachfirmen (45.000 €)
- **Freigabe des Raums abwarten (nach Reinigung, ca. eine Woche)** – Niemand betritt den Raum vorzeitig. Die Lücke von etwa 26 Stunden muss von Hand nachgebucht werden; ob die Dienstagssicherung später noch lesbar ist, ist offen.
  - LK23 bekommt dazu: „Der Backup-Server bleibt bis zur Freigabe im Raum; ob die Dienstagssicherung danach noch lesbar ist, ist offen.“
  - LK27 bekommt dazu: „Die Nachbuchung der rund 26 Stunden Datenlücke läuft noch bis in die nächste Woche.“
  - Abschluss: Nacherfassung von rund 26 Stunden Bewegungsdaten (140.000 €)

#### W4 – bei LK15 Wie weit geht der Ausweichbetrieb?

**Frage:** Bringt Waterkant nur das Nötigste ins Ausweich-Rack – oder erweitert es den Ausweichbetrieb, damit auch Lager, Gewerbeportal und Online-Bestände schnell zurückkommen?

- **Nur Kassen- und Preisdienste und den Kern der Warenwirtschaft verlagern; der Rest wartet auf das eigene Rechenzentrum** – Lager, Gewerbeportal und Online-Bestände bleiben etwa drei Wochen eingeschränkt; Gewerbekunden weichen aus.
  - LK25 bekommt dazu: „Online-Shop und Gewerbeportal laufen weiter nur mit „Abholung nach telefonischer Bestätigung“ – Gewerbekunden weichen zu Wettbewerbern aus.“
  - LK27 bekommt dazu: „Lagerverwaltung, Gewerbeportal und Online-Bestände bleiben bis zur Rückkehr ins eigene Rechenzentrum eingeschränkt.“
  - Abschluss: Entgangener Rohertrag Online-Shop und Gewerbekunden (ca. 3 Wochen eingeschränkt) (260.000 €)
- **Ausweich-Rack binnen 48 Stunden erweitern und auch Lager, Gewerbeportal und Online-Bestände verlagern (zwölf Monate Mindestlaufzeit)** – Online-Shop und Portal laufen ab Freitagabend wieder; beim schnellen Umzug geht ein Preisabgleich verloren (vertrauliche Karte am Saisonsamstag).
  - LK25 bekommt dazu: „Online-Shop und Gewerbeportal laufen seit Freitagabend wieder aus dem erweiterten Ausweich-Rack.“
  - LK27 bekommt dazu: „Auch Lagerverwaltung, Gewerbeportal und Online-Bestände laufen aus dem erweiterten Ausweich-Rack.“
  - Folgekarte SK45 an Leitung Online-Shop und Gewerbekundenportal bei LK25: „Nach der schnellen Verlagerung zeigt der Online-Shop für 140 Artikel noch Preise von Montag – der Abgleich der Aktionspreise fehlt in der neuen Umgebung.“
  - Abschluss: Erweiterung des Ausweichbetriebs (12 Monate) und zusätzliche Dienstleister (210.000 €)

#### W5 – bei LK20 Wer kassiert zuerst?

**Frage:** Stellt Waterkant eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium um – oder kommen die eigenen 14 Filialen zuerst?

- **Eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium (größte Märkte zuerst, unabhängig vom Eigentümer)** – Alle Märkte laufen bis Freitagfrüh; einige eigene Filialen erst in der Nacht.
  - LK22 bekommt dazu: „Eigene Filialen und Partnermärkte werden nach derselben Reihenfolge umgestellt – einige eigene Filialen erst in der Nacht.“
  - Abschluss: Saisonumsatz: einige eigene Filialen erst in der Nacht wieder voll (60.000 €)
- **Eigene 14 Filialen zuerst, Partnermärkte etwa zwölf Stunden später** – Die eigenen Filialen kassieren ab Donnerstagabend, die Partner erst kurz vor der 72-Stunden-Grenze; zwei Partner prüfen einen Wechsel (vertrauliche Karte).
  - LK22 bekommt dazu: „Die eigenen Filialen kassieren seit Donnerstagabend, die Partnermärkte folgen in der Nacht – knapp vor der 72-Stunden-Grenze.“
  - Folgekarte SK44 an Partnerbetreuung Verbund (Kundenmanagement IT-Service) bei LK22: „Zwei Partnermärkte haben bemerkt, dass die Waterkant-Filialen zwölf Stunden früher wieder kassieren konnten. Einer hat Kontakt zu einem anderen IT-Dienstleister aufgenommen.“
  - Abschluss: Zusätzliche Gutschriften und Risiko des Partnerverlusts im IT-Service (12 Monate) (90.000 €)

### Übungsschwerpunkte (Auswahl im Setup)

Pflichtkarten und Spannungsbogen bleiben gleich; die genannten Karten werden beim Auffüllen bevorzugt.

#### Krisenführung und Personenschutz

Wer entscheidet in der Nacht, wer schützt die Menschen, wer vertritt wen? **Leitfrage:** Wer entscheidet – und gilt Personenschutz auch dann, wenn Daten und Umsatz auf dem Spiel stehen?

Bevorzugt: LK04, LK05, LK14, LK18, LK27, SK04, SK05, SK06, SK21, SK20, SK46, SK34, SK32, B5, B7 · immer dabei (sofern besetzt): SK21

- LK03 Serverraum wird warm: Wer darf um 03:02 Uhr entscheiden – und wie erfährt die Geschäftsführung davon?
- LK04 Brandalarm im Rechenzentrum: Wer übernimmt die Führung, bis der Krisenstab steht?
- LK06 Lagebild nach dem Löschen: Ist jetzt allen klar, wer den Krisenstab leitet und wer die Vertretung ist?
- LK14 Den Backup-Server bergen?: Wer hat das letzte Wort beim Betreten – und ist das allen klar?
- LK15 Wie weit geht der Ausweichbetrieb?: Wer trägt diese Entscheidung, und wie wird sie dokumentiert?
- LK20 Wer kassiert zuerst?: Wie wird die Entscheidung begründet und wem erklärt?
- LK22 Die Kassen laufen wieder: Wer prüft, dass „läuft wieder“ wirklich stimmt?
- LK27 Stabiler Notbetrieb: Wer achtet auf die Menschen, die seit Dienstag durcharbeiten?

- Debriefing: War jederzeit klar, wer entscheidet – auch in der Nacht?
- Debriefing: Wann stand Personenschutz gegen Daten oder Umsatz – und wie habt ihr entschieden?

#### IT-Wiederanlauf und Infrastruktur

Abschalten, Freigabe, Ausweichbetrieb, Datenlücke und sichere Umstellung. **Leitfrage:** Was muss technisch geprüft, sicher und fachlich freigegeben sein, bevor etwas wieder läuft?

Bevorzugt: LK03, LK07, LK10, LK13, LK19, LK23, SK03, SK08, SK14, SK19, SK29, SK40, SK22, B1, B8 · immer dabei (sofern besetzt): SK19

- LK03 Serverraum wird warm: Gibt es eine Regel, ab welcher Temperatur abgeschaltet wird – und wer sie kennt?
- LK06 Lagebild nach dem Löschen: Welche Abhängigkeiten zwischen den Systemen kennen Sie – und welche nicht?
- LK09 Die Partnermärkte rufen an: Welches Wiederherstellungsziel ist realistisch, nicht vertraglich?
- LK14 Den Backup-Server bergen?: Welche Daten fehlen ohne Bergung genau – und wie würden Sie sie rekonstruieren?
- LK15 Wie weit geht der Ausweichbetrieb?: Welche Abhängigkeiten zwischen Kassen, Warenwirtschaft und Netzwerk bestimmen die Reihenfolge?
- LK20 Wer kassiert zuerst?: Wie stellen Sie sicher, dass jeder umgestellte Markt geprüft ist?
- LK22 Die Kassen laufen wieder: Woran erkennen Sie technisch, dass ein Markt sauber läuft?
- LK27 Stabiler Notbetrieb: Welche technischen Schulden aus dem Notbetrieb müssen Sie zurückzahlen?

- Debriefing: Welche Abkürzung war im Notbetrieb verlockend – und welche habt ihr genommen?
- Debriefing: Was hätte der Ausweichplan vorher geübt haben müssen?

#### Partner, Kunden und Kommunikation

Partnermärkte mit Vertrag, Gewerbekunden, Kundschaft, Presse. **Leitfrage:** Wer erfährt wann was von wem – und stimmt das mit dem überein, was wir wirklich wissen?

Bevorzugt: LK09, LK11, LK16, LK17, LK18, LK21, SK11, SK12, SK15, SK24, SK25, SK26, B2, B6, B8 · immer dabei (sofern besetzt): SK11

- LK06 Lagebild nach dem Löschen: Wer muss es von Ihnen hören, bevor er es aus den Medien erfährt?
- LK08 Saisonstart ohne Aktionspreise: Was sagt die Kassiererin, wenn jemand mit dem Prospekt kommt?
- LK09 Die Partnermärkte rufen an: Ist Ihre Aussage eine Prognose oder ein Versprechen – und weiß der Partner den Unterschied?
- LK14 Den Backup-Server bergen?: Was sagen Sie Partnern und Kunden zur Datenlücke?
- LK15 Wie weit geht der Ausweichbetrieb?: Wie erklären Sie Gewerbekunden, dass ihr Portal (noch) nicht läuft?
- LK20 Wer kassiert zuerst?: Wie erklären Sie die Reihenfolge – und wem zuerst?
- LK22 Die Kassen laufen wieder: Welche Botschaft bekommen Filialen, Partner und Hotline zur gleichen Zeit?
- LK27 Stabiler Notbetrieb: Wie schließen Sie die Woche nach außen ab, ohne zu viel zu versprechen?

- Debriefing: Welche Zusage nach außen war am riskantesten?
- Debriefing: Wo kamen Informationen bei Partnern oder Kundschaft zu spät oder widersprüchlich an?

#### Filialen, Lager und Saisonstart

Kassen, Preise, Lager und Gewerbekunden im Notbetrieb. **Leitfrage:** Wie verkaufen Sie zum Saisonstart, ohne später nicht mehr nachvollziehen zu können, was verkauft wurde?

Bevorzugt: LK08, LK12, LK16, LK17, LK23, LK25, SK08, SK09, SK10, SK16, SK17, SK31, SK38, B5, B6 · immer dabei (sofern besetzt): SK08

- LK06 Lagebild nach dem Löschen: Was muss bis 08:00 Uhr in den Filialen ankommen?
- LK09 Die Partnermärkte rufen an: Was brauchen die Partnermärkte, um morgen zu öffnen?
- LK14 Den Backup-Server bergen?: Was bedeutet die Datenlücke für Bestände im Lager und in den Filialen?
- LK15 Wie weit geht der Ausweichbetrieb?: Wie lange kommt das Lager ohne Lagerverwaltung aus?
- LK20 Wer kassiert zuerst?: Welche Märkte brauchen zuerst wieder Kassen – nach welchem Kriterium?
- LK22 Die Kassen laufen wieder: Wie gehen Filialen mit Bons aus dem Offline-Zeitraum um?
- LK27 Stabiler Notbetrieb: Was ist im Filialbetrieb ab Montag wieder normal – und was nicht?

- Debriefing: Welche Behelfslösung im Filial- und Lagerbetrieb hat am meisten Nacharbeit erzeugt?
- Debriefing: Wo hätte eine vorbereitete Papierlösung geholfen?


### Bonuskarten (nur bei Bedarf manuell)

- **B1 – Der Netzwerkschlüssel** (erst nach LK15) an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (Ersatz: IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)): Der einzige Netzwerkadministrator mit Zugang zur Firewall des Ausweich-Racks ist im Urlaub; sein Flug geht in drei Stunden. Die Zugangsdaten liegen im Passwortsafe – auf einem Server im gesperrten Serverraum.  
  *Moderation:* Testet Single Point of Failure und Notfallzugänge. Gut: sofort Kontakt aufnehmen, sichere Übergabe organisieren, Lücke als Maßnahme festhalten.
- **B2 – Das Foto aus dem Serverraum** (erst nach LK14) an Leitung Unternehmenskommunikation und Marketing (Ersatz: Geschäftsführung (CEO), Krisenstabsleitung): Ein Foto aus dem verrußten Serverraum kursiert im Netz – aufgenommen offenbar von einer beschäftigten Person durch die Glastür. Auf einem Rack ist ein Aufkleber mit dem Namen eines Partnermarkts zu erkennen.  
  *Moderation:* Kommunikation und interne Regeln. Gut: Partner informieren, bevor sie es selbst sehen; interne Regel zu Fotos, keine Jagd auf die Person.
- **B3 – Vorkasse** (erst nach LK15) an Leitung Finanzen und Versicherung (CFO) (Ersatz: Geschäftsführung (CEO), Krisenstabsleitung → Leitung Einkauf und Dienstleistersteuerung): Der Colocation-Anbieter will vor der Aktivierung eine Vorauszahlung von 60.000 € und eine unterschriebene Vertragsergänzung bis 16 Uhr.  
  *Moderation:* Prüft Entscheidungswege unter Zeitdruck. Gut: Freigabe nach Zeichnungsregel, Vertrag kurz fachlich prüfen lassen, Zahlung dokumentieren.
- **B4 – Wartungsnachweise** (erst nach LK22) an Gebäudetechnik und Facility Management (Ersatz: Leitung Arbeitssicherheit und Werkschutz → Leitung Finanzen und Versicherung (CFO)): Der Versicherer fordert bis Montag alle Wartungsnachweise der USV der letzten zwei Jahre an. Einer der beiden Wartungsberichte ist nicht auffindbar.  
  *Moderation:* Ehrlichkeit unter Druck. Gut: Lücke offen benennen, Hersteller um Kopie bitten, nichts nachträglich erstellen.
- **B5 – Zweiter Alarm** (erst nach LK14), **öffentlich auf der Bühne**: Die Brandmeldeanlage im Zentrallager löst aus. Wahrscheinlich hat Staub von den Reinigungsarbeiten im Verwaltungsgebäude den Melder ausgelöst – sicher ist das nicht. Im Lager arbeiten 40 Menschen, die Spedition lädt gerade. *Krisen-Info:* Wahrscheinlich Fehlalarm – nicht bestätigt · 40 Beschäftigte im Lager  
  *Ton/Sprechertext:* Signal der Brandmeldeanlage, gedämpft. Durchsage: „Übung. Achtung, Feueralarm im Zentrallager. Bitte verlassen Sie das Lager über die gekennzeichneten Wege.“  
  *Moderation:* Alarmmüdigkeit: Nach dem echten Brand ist die Versuchung groß, „wahrscheinlich Staub“ abzuwarten. Gut: Räumung nach Plan, Feuerwehr entscheidet über Fehlalarm. 60 Sekunden für eine Entscheidung.
- **B6 – Wo hat es gebrannt?** (erst nach LK09), **öffentlich auf der Bühne**: Ein Nachrichtenportal meldet „Großbrand im Zentrallager von Waterkant – Lieferungen in Gefahr“ und bebildert es mit einem Archivfoto eines fremden Lagerbrands. Zwei Lieferanten und drei Partner rufen deshalb an. *Krisen-Info:* Falschmeldung im Umlauf · Rückfragen von Lieferanten und Partnern  
  *Moderation:* Widersprüchliche Information korrigieren, ohne sie größer zu machen. Gut: Korrektur beim Portal anfragen, Lieferanten und Partner direkt informieren, Hotline briefen.
- **B7 – Die IT-Leitung muss raus** (erst nach LK15), **öffentlich auf der Bühne** (IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) 5 Minuten nicht erreichbar, Countdown): Die IT-Leitung ist seit Dienstagnacht fast ohne Schlaf. Der Betriebsarzt schickt sie nach Hause – sofort. Die Wiederherstellung im Ausweich-Rack läuft, Entscheidungen stehen an. Die Vertretung übernimmt.  
  *Ton/Sprechertext:* „Der Betriebsarzt hat entschieden: Sie gehen jetzt nach Hause und schlafen. Bitte kommen Sie mit.“  
  *Regie:* Die Moderation bittet die IT-Leitung persönlich hinaus. Die Bühne zählt fünf Minuten herunter. B7 ersetzt Lagebearbeitung, der Übungstimer läuft weiter.  
  *Moderation:* Vertretungsstresstest, nur in Übungen ab 90 Minuten und nur mit besetzter IT-Leitung. Prüfziel: Gibt es eine handlungsfähige Vertretung mit Wissen und Befugnis?
- **B8 – Ein Angebot mit Haken** (erst nach LK15), **öffentlich auf der Bühne**: Ein großer Partnermarkt mit eigenem Serverraum bietet an, die Kassendienste für alle 23 Märkte ab sofort auf seinen Servern zu betreiben – kostenlos, „unter Partnern“. Er braucht nur heute Abend die Daten aller Märkte. *Krisen-Info:* Angebot: sofort, kostenlos · Bedingung: Daten aller 23 Märkte heute Abend  
  *Moderation:* Gute Nachricht mit Haken: Sicherheit, Datenschutz, Wettbewerb unter Partnern, Verträge, Kapazität. Gut: dankend prüfen, nicht unter Zeitdruck Daten anderer Märkte weitergeben; fachlich prüfen lassen.

**B5 – Regie und Beobachtung:**

- [ ] Wird geräumt, obwohl ein Fehlalarm wahrscheinlich ist?
- [ ] Wer entscheidet – und ist das vorher geregelt?
- [ ] Wird die Unterbrechung im Lager (Spedition, Saisonware) danach sauber wieder aufgenommen?

**B6 – Regie und Beobachtung:**

- [ ] Wird die Falschmeldung sachlich korrigiert, ohne sie weiterzuverbreiten?
- [ ] Werden Lieferanten und Partner direkt informiert?
- [ ] Bekommen Hotline und Filialen eine Sprachregelung?

**B7 – Regie und Beobachtung:** nur in Übungen ab 90 Min. · setzt voraus, dass IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) besetzt ist

Die Moderation bittet die IT-Leitung persönlich hinaus. Die Bühne zählt fünf Minuten herunter. B7 ersetzt Lagebearbeitung, der Übungstimer läuft weiter.

*Unterbrechung:* Bitte den Tisch verlassen und in dieser Zeit nicht mit dem Krisenstab sprechen. *Rückkehr:* IT-Leitung an den Tisch bitten. Erst übergibt die Vertretung in zwei Sätzen („Wir haben entschieden …, offen ist …“), dann darf die IT-Leitung sagen, ob sie etwas ändert – und warum.

- [ ] Übernimmt innerhalb von etwa einer Minute sichtbar jemand die technische Führung?
- [ ] Kennt die Vertretung den Stand der Wiederherstellung und die nächsten Schritte?
- [ ] Werden anstehende Entscheidungen getroffen statt vertagt?
- [ ] Hat die Vertretung die nötigen Zugänge und Befugnisse – oder fehlen sie?
- [ ] Bekommt die IT-Leitung bei der Rückkehr eine kurze Übergabe?

**B8 – Regie und Beobachtung:**

- [ ] Wird das Angebot geprüft statt reflexhaft angenommen oder abgelehnt?
- [ ] Wird bedacht, dass Daten anderer Märkte betroffen sind?
- [ ] Wer entscheidet – und wird es den anderen Partnern erklärt?

### Abschluss: „Läuft alles wieder? Die Krise ist nicht vorbei.“

Nach sieben Tagen. Kassen und Preise laufen aus dem Ausweich-Rack, die Warenwirtschaft ist nachgebucht, das Zentrallager liefert. Das eigene Rechenzentrum ist gesperrt, die Reinigung läuft. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

**Nacharbeiten:**

- **23** Märkte (14 Filialen, 9 Partner) gleichen Offline-Abverkäufe mit der Warenwirtschaft ab
- **38** Lkw-Ladungen vom Montag werden aus Lieferscheinen nachgebucht
- **312** Online-Abholungen werden erfüllt, umgebucht oder erstattet
- **16** Racks werden gereinigt, geprüft oder ersetzt – ob die gereinigte Hardware dauerhaft zuverlässig ist, bleibt offen
- **1** neue USV-Anlage, mit geklärter Zuständigkeit für Wartung und Updates
- **3 Wochen** bis zur Entscheidung: zurück ins eigene Rechenzentrum, auslagern oder zwei Standorte
- **9** Partnergespräche über Vertrauen, Gutschriften und die Zukunft des gemeinsamen IT-Betriebs

**Rechnung (fiktiv):**

| Posten | Betrag | Was vorher geholfen hätte |
|---|---:|---|
| Reinigung und Dekontamination des Serverraums, Sanierung des USV-Raums, Gutachten<br>*Rechenweg:* Szenarioannahme: Angebot einer Fachfirma für 120 m² Serverraum mit 16 Racks plus Sanierung des USV-Raums und Brandgutachten. | 480.000 € | Brandabschnitte, Rauchschutz und ein geübter Sanierungsvertrag begrenzen Sekundärschäden. |
| Ersatz der USV-Anlage und korrosionsgefährdeter Hardware (Server, Speicher, Netzwerk)<br>*Rechenweg:* Szenarioannahme: Neuwert, rund 60 % der Komponenten werden wegen Korrosionsrisiko ersetzt; neue USV einschließlich Einbau. | 1.250.000 € | Gewartete USV mit aktueller Batteriesteuerung; räumliche Trennung von Batterie und Serverraum. |
| Ausweichbetrieb im Grundumfang (Aktivierung, Anbindung von 23 Märkten)<br>*Rechenweg:* Szenarioannahme: Aktivierungsgebühr laut Notfallvertrag plus Netzwerkanbindung. | 90.000 € | Ein geübter Ausweichplan macht die Aktivierung planbar. |
| Externe Dienstleister für die Wiederherstellung (7 Tage)<br>*Rechenweg:* Szenarioannahme: drei Dienstleisterteams (Netzwerk, Datenbank, Kassensystem) über sieben Tage, teils rund um die Uhr. | 260.000 € | Rahmenverträge mit Reaktionszeiten statt Notfallpreisen. |
| Überstunden und Sonderschichten in IT, Filialen und Zentrallager<br>*Rechenweg:* Szenarioannahme auf Basis der Einsatzzeiten der Woche. | 180.000 € | Vertretungsregeln und Schichtpläne für den Notbetrieb. |
| Entgangener Rohertrag in der Saisonstart-Woche (Filialen, Lager, Gewerbekunden)<br>*Rechenweg:* Umsatz 240 Mio. € ÷ ca. 300 Verkaufstage ≈ 800.000 € je Tag; Saisonstart-Woche etwa das 1,5-Fache ≈ 1,2 Mio. € je Tag; Umsatzminderung Dienstag bis Samstag rund 20 % ≈ 1,2 Mio. € Umsatz, dazu rund 0,9 Mio. € Umsatz bei Gewerbekunden und durch Lieferstopp aus dem Zentrallager; Rohertragsquote ca. 33 % (fachliche Annahme) ≈ 0,7 Mio. €. Vom Controlling bestätigen lassen. | 700.000 € | Offline-Preisdienste und vorbereitete Notprozesse halten den Verkauf am Laufen. |
| Kulanz bei Prospektpreisen, Gutscheine und Mehraufwand der Hotline<br>*Rechenweg:* Szenarioannahme. | 120.000 € | Eine einheitliche, früh entschiedene Kulanzregel ist billiger als Einzelfälle. |
| Gutschriften an Partnermärkte laut Servicevertrag (Grundumfang)<br>*Rechenweg:* Szenarioannahme: 9 Märkte × 2 angefangene Tage über dem 24-Stunden-Ziel × 2.000 €. | 36.000 € | Realistische Wiederherstellungsziele, die ein Ausweichplan auch einhält. |
| Nacherfassung, Kassenabgleich und Inventurstichproben (Grundumfang)<br>*Rechenweg:* Szenarioannahme. | 60.000 € | Kürzere Sicherungsintervalle und schnellere Übertragung der Kopien verkleinern die Lücke. |

**Zusätzliche Posten, je nach Entscheidung in der Übung:**

| Frage an die Moderation | Posten | Betrag |
|---|---|---:|
| Hat die IT in der Brandnacht kontrolliert heruntergefahren? | Abgebrochene Preisübertragung: Aktionspreise auch in den 5 Filialen per Kulanz, die sie sonst erhalten hätten | 50.000 € |
| Liefen die Systeme bis zum Stromausfall weiter? | Reparatur der Warenwirtschafts-Datenbank nach hartem Ausfall (ein Tag Verzug) | 95.000 € |
| Wurden die Partnermärkte erst informiert, als ein Termin feststand? | Kulanz und Sonderkonditionen für Partnermärkte | 40.000 € |
| Wurde der Backup-Server durch eine Fachfirma geborgen? | Bergung, Reinigung und Datenrettung des Backup-Servers durch Fachfirmen | 45.000 € |
| Wurde die Freigabe des Serverraums abgewartet? | Nacherfassung von rund 26 Stunden Bewegungsdaten | 140.000 € |
| Wurde nur das Nötigste ins Ausweich-Rack verlagert? | Entgangener Rohertrag Online-Shop und Gewerbekunden (ca. 3 Wochen eingeschränkt) | 260.000 € |
| Wurde der Ausweichbetrieb erweitert? | Erweiterung des Ausweichbetriebs (12 Monate) und zusätzliche Dienstleister | 210.000 € |
| Wurden eigene Filialen und Partner nach einem gemeinsamen Kriterium umgestellt? | Saisonumsatz: einige eigene Filialen erst in der Nacht wieder voll | 60.000 € |
| Kamen die eigenen Filialen zuerst? | Zusätzliche Gutschriften und Risiko des Partnerverlusts im IT-Service (12 Monate) | 90.000 € |

**Versicherung:** Mögliche Erstattung durch Elektronik- und Betriebsunterbrechungsversicherung (optimistische Modellannahme, nicht bestätigt): − 1.600.000 €  
*Der Gesamtschaden steht brutto. Die Erstattung von bis zu 1,6 Mio. € ist eine unbestätigte Modellannahme; Wartungsauflagen (USV-Wartung überfällig), Selbstbehalte, Karenzzeit und die Anerkennung einzelner Kostenpositionen sind nicht bewertet.*  
**Jahresumsatz:** 240.000.000 € · **Umsatzrendite:** 5 %

**Fazit:** Nach fünf Tagen kassieren alle Märkte wieder. Ob das eigene Rechenzentrum zurückkommt, ist offen – das Vertrauen der Partner hängt an dieser Woche. Eine Krise ist erst vorbei, wenn Partner, Kundschaft und Beschäftigte wieder vertrauen.

*Fiktive Beispielrechnung für dieses Szenario. Die Größenordnungen sind bewusst realistisch gewählt; alle Beträge sind Szenarioannahmen. Die Erstattung ist eine hypothetische Modellannahme. Liquiditätswirkungen (z. B. Vorkasse, verschobene Lieferantenrechnungen) sind kein Schaden und deshalb nicht enthalten.*

### Debriefing

**Kurze Runde vor dem Debriefing:**

- Worüber haben wir am meisten diskutiert?
- Welche Informationen haben gefehlt?
- Welche Entscheidung fiel besonders schwer?
- Welche BCM-Maßnahme hätte uns geholfen?

**Debriefing-Fragen:**

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das in der Nacht entscheiden dürfen?
- Wann stand der Schutz von Menschen gegen Daten, Umsatz oder Tempo – und wie habt ihr entschieden?
- Wie kamen Meldungen aus Filialen, Partnermärkten und Hotline beim Krisenstab an – und wie kamen Anweisungen zurück?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- Welche Zusage an Partner oder Kunden war am riskantesten?
- Wo waren Single Points of Failure – Technik, Wissen, Personen?
- Welche Kosten trägt die Versicherung wahrscheinlich nicht – und was bedeutet das für die Liquidität?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?

---

## Teil D – Was bei welcher Übungsdauer gespielt wird

Automatisch erzeugt vom Werkzeug, Schwierigkeit „mittel“, mit den vom Werkzeug vorgeschlagenen Rollen. Karten an unbesetzte Rollen gehen an die Ersatzrolle (in Klammern). Die Folgekarten aus Entscheidungen (SK41, SK42, SK43, SK44, SK45) stehen nicht in den Tabellen; sie kommen zusätzlich, wenn die jeweilige Entscheidung fällt.

### 45 Minuten

**Besetzte Rollen (5):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz

**Geplante Krisenzeit:** 40 Min. + ca. 5 Min. Abschluss · Hinweis des Werkzeugs: Zieldauer (45 Min.) reicht für den kompletten Spannungsbogen nur knapp. Entscheidungszeiten wurden auf ca. 1.3 Min. je Lagekarte komprimiert. Mehr Zeit oder weniger Funktionsbereiche einplanen, wenn möglich.

| Minute | Art | ID | Inhalt |
|---:|---|---|---|
| 0.0 | Lagekarte (Vorboten) | LK03 | Dienstag 03:02 Uhr: Serverraum wird warm · **Weiche W1** |
| 0.2 | vertraulich | SK03 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise … |
| 2.0 | Lagekarte (Ausbruch) | LK04 | Dienstag 03:10 Uhr: Brandalarm im Rechenzentrum |
| 6.8 | Lagekarte (Ausbruch) | LK06 | Dienstag 05:30 Uhr: Lagebild nach dem Löschen |
| 7.2 | vertraulich | SK06 | an Leitung Arbeitssicherheit und Werkschutz: Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Flu… |
| 11.5 | Lagekarte (Eskalation) | LK09 | Dienstag 08:30 Uhr: Die Partnermärkte rufen an · **Weiche W2** |
| 12.0 | vertraulich | SK11 | an Partnerbetreuung Verbund (Kundenmanagement IT-Service): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiede… |
| 13.6 | vertraulich | SK08 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Support Filialen und Kassen): Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe e… |
| 14.2 | vertraulich | SK35 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt Notfallmanagement / BCM-Koordination): Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine P… |
| 16.3 | Lagekarte (Höhepunkt) | LK14 | Mittwoch 07:30 Uhr: Den Backup-Server bergen? · **Weiche W3** |
| 16.7 | vertraulich | SK21 | an Leitung Arbeitssicherheit und Werkschutz: Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, … |
| 18.1 | vertraulich | SK13 | an Gebäudetechnik und Facility Management: Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht A… |
| 18.6 | vertraulich | SK14 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall … |
| 19.0 | vertraulich | SK18 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt Leitung Einkauf und Dienstleistersteuerung): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-An… |
| 19.4 | vertraulich | SK19 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und d… |
| 21.0 | Lagekarte (Höhepunkt) | LK15 | Mittwoch 10:00 Uhr: Wie weit geht der Ausweichbetrieb? · **Weiche W4** |
| 21.5 | vertraulich | SK46 | an Geschäftsführung (CEO), Krisenstabsleitung: Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Auswei… |
| 25.8 | Lagekarte (Folgen) | LK20 | Donnerstag 10:00 Uhr: Wer kassiert zuerst? · **Weiche W5** |
| 30.5 | Lagekarte (Wiederanlauf) | LK22 | Donnerstag 18:00 Uhr: Die Kassen laufen wieder |
| 35.3 | Lagekarte (Wiederanlauf) | LK27 | Sonntag 12:00 Uhr: Stabiler Notbetrieb |
| 35.7 | vertraulich | SK32 | an Geschäftsführung (CEO), Krisenstabsleitung (statt Personalleitung): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei … |

**Entfallene Lagekarten (19):** LK01 USV meldet Batteriewarnung · LK02 Geruch im Technikflur · LK05 Feuerwehr im Einsatz · LK07 Was noch läuft – und was nicht · LK10 Serverraum gesperrt · LK11 Nordkanal fragt nach · LK13 Ersatz: Hardware oder Ausweich-Rack? · LK16 Ein Bauunternehmen will Vorrang · LK18 Der Verbundbeirat verlangt Antworten · LK19 Rücksicherung im Ausweich-Rack · LK21 Nordkanal berichtet · LK23 Die Datenlücke · LK24 Der Versicherer ist da · LK26 Die Brandursache · LK28 Zurück ins eigene Rechenzentrum? · LK08 Saisonstart ohne Aktionspreise · LK12 Das Zentrallager steht · LK17 Prospektpreise vor der Kasse · LK25 Der große Saisonsamstag

**Entfallene vertrauliche Karten (22):** SK27, SK20, SK16, SK04, SK01, SK02, SK05, SK34, SK07, SK09, SK10, SK12, SK15, SK22, SK23, SK25, SK26, SK29, SK40, SK28, SK36, SK37

*Gründe laut Werkzeug:* Zeitbudget reicht nur für den Spannungsbogen – zusätzliche Karten entfallen. / Baut auf LK24 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK18 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK12 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK05 auf – diese Lagekarte ist nicht im Plan. / Nicht eingeplant, damit die vertraulichen Karten gleichmäßig über die Übung verteilt sind und niemand überflutet wird. / Baut auf LK02 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK07 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK08 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK11 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK19 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK26 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK28 auf – diese Lagekarte ist nicht im Plan.

### 60 Minuten

**Besetzte Rollen (6):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz, Leitung Finanzen und Versicherung (CFO)

**Geplante Krisenzeit:** 54 Min. + ca. 6 Min. Abschluss · Hinweis des Werkzeugs: Zieldauer (60 Min.) reicht für den kompletten Spannungsbogen nur knapp. Entscheidungszeiten wurden auf ca. 2.5 Min. je Lagekarte komprimiert. Mehr Zeit oder weniger Funktionsbereiche einplanen, wenn möglich.

| Minute | Art | ID | Inhalt |
|---:|---|---|---|
| 0.0 | Lagekarte (Vorboten) | LK03 | Dienstag 03:02 Uhr: Serverraum wird warm · **Weiche W1** |
| 0.2 | vertraulich | SK03 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise … |
| 2.0 | Lagekarte (Ausbruch) | LK04 | Dienstag 03:10 Uhr: Brandalarm im Rechenzentrum |
| 8.5 | Lagekarte (Ausbruch) | LK06 | Dienstag 05:30 Uhr: Lagebild nach dem Löschen |
| 9.0 | vertraulich | SK06 | an Leitung Arbeitssicherheit und Werkschutz: Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Flu… |
| 15.0 | Lagekarte (Eskalation) | LK09 | Dienstag 08:30 Uhr: Die Partnermärkte rufen an · **Weiche W2** |
| 15.5 | vertraulich | SK11 | an Partnerbetreuung Verbund (Kundenmanagement IT-Service): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiede… |
| 17.8 | vertraulich | SK08 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Support Filialen und Kassen): Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe e… |
| 18.7 | vertraulich | SK35 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt Notfallmanagement / BCM-Koordination): Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine P… |
| 21.5 | Lagekarte (Höhepunkt) | LK14 | Mittwoch 07:30 Uhr: Den Backup-Server bergen? · **Weiche W3** |
| 22.0 | vertraulich | SK21 | an Leitung Arbeitssicherheit und Werkschutz: Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, … |
| 24.1 | vertraulich | SK13 | an Gebäudetechnik und Facility Management: Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht A… |
| 24.6 | vertraulich | SK14 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall … |
| 25.2 | vertraulich | SK18 | an Leitung Finanzen und Versicherung (CFO) (statt Leitung Einkauf und Dienstleistersteuerung): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-An… |
| 25.8 | vertraulich | SK19 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und d… |
| 28.0 | Lagekarte (Höhepunkt) | LK15 | Mittwoch 10:00 Uhr: Wie weit geht der Ausweichbetrieb? · **Weiche W4** |
| 28.5 | vertraulich | SK46 | an Geschäftsführung (CEO), Krisenstabsleitung: Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Auswei… |
| 34.5 | Lagekarte (Folgen) | LK20 | Donnerstag 10:00 Uhr: Wer kassiert zuerst? · **Weiche W5** |
| 41.0 | Lagekarte (Wiederanlauf) | LK22 | Donnerstag 18:00 Uhr: Die Kassen laufen wieder |
| 47.5 | Lagekarte (Wiederanlauf) | LK27 | Sonntag 12:00 Uhr: Stabiler Notbetrieb |
| 48.0 | vertraulich | SK32 | an Geschäftsführung (CEO), Krisenstabsleitung (statt Personalleitung): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei … |

**Entfallene Lagekarten (19):** LK01 USV meldet Batteriewarnung · LK02 Geruch im Technikflur · LK05 Feuerwehr im Einsatz · LK07 Was noch läuft – und was nicht · LK10 Serverraum gesperrt · LK11 Nordkanal fragt nach · LK13 Ersatz: Hardware oder Ausweich-Rack? · LK16 Ein Bauunternehmen will Vorrang · LK17 Prospektpreise vor der Kasse · LK18 Der Verbundbeirat verlangt Antworten · LK19 Rücksicherung im Ausweich-Rack · LK21 Nordkanal berichtet · LK23 Die Datenlücke · LK24 Der Versicherer ist da · LK26 Die Brandursache · LK28 Zurück ins eigene Rechenzentrum? · LK08 Saisonstart ohne Aktionspreise · LK12 Das Zentrallager steht · LK25 Der große Saisonsamstag

**Entfallene vertrauliche Karten (23):** SK27, SK20, SK16, SK04, SK01, SK02, SK05, SK34, SK07, SK09, SK10, SK12, SK15, SK22, SK23, SK25, SK26, SK29, SK40, SK28, SK30, SK36, SK37

*Gründe laut Werkzeug:* Zeitbudget reicht nur für den Spannungsbogen – zusätzliche Karten entfallen. / Baut auf LK24 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK18 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK12 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK05 auf – diese Lagekarte ist nicht im Plan. / Nicht eingeplant, damit die vertraulichen Karten gleichmäßig über die Übung verteilt sind und niemand überflutet wird. / Baut auf LK02 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK07 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK08 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK11 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK19 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK23 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK26 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK28 auf – diese Lagekarte ist nicht im Plan.

### 90 Minuten

**Besetzte Rollen (9):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz, Leitung Finanzen und Versicherung (CFO), Leitung Unternehmenskommunikation und Marketing, IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Regionalleitung Filialen Nord

**Geplante Krisenzeit:** 81 Min. + ca. 9 Min. Abschluss

| Minute | Art | ID | Inhalt |
|---:|---|---|---|
| 0.0 | Lagekarte (Vorboten) | LK01 | Montag 22:40 Uhr: USV meldet Batteriewarnung |
| 3.0 | Lagekarte (Vorboten) | LK02 | Dienstag 02:35 Uhr: Geruch im Technikflur |
| 6.0 | Lagekarte (Vorboten) | LK03 | Dienstag 03:02 Uhr: Serverraum wird warm · **Weiche W1** |
| 6.3 | vertraulich | SK03 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise … |
| 9.0 | Lagekarte (Ausbruch) | LK04 | Dienstag 03:10 Uhr: Brandalarm im Rechenzentrum |
| 16.2 | Lagekarte (Ausbruch) | LK06 | Dienstag 05:30 Uhr: Lagebild nach dem Löschen |
| 16.7 | vertraulich | SK06 | an Leitung Arbeitssicherheit und Werkschutz: Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Flu… |
| 23.4 | Lagekarte (Eskalation) | LK08 | Dienstag 07:00 Uhr: Saisonstart ohne Aktionspreise |
| 26.9 | vertraulich | SK08 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Support Filialen und Kassen): Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe e… |
| 28.2 | vertraulich | SK35 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt Notfallmanagement / BCM-Koordination): Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine P… |
| 30.6 | Lagekarte (Eskalation) | LK09 | Dienstag 08:30 Uhr: Die Partnermärkte rufen an · **Weiche W2** |
| 31.1 | vertraulich | SK11 | an Partnerbetreuung Verbund (Kundenmanagement IT-Service): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiede… |
| 37.8 | Lagekarte (Höhepunkt) | LK14 | Mittwoch 07:30 Uhr: Den Backup-Server bergen? · **Weiche W3** |
| 38.3 | vertraulich | SK21 | an Leitung Arbeitssicherheit und Werkschutz: Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, … |
| 40.6 | vertraulich | SK13 | an Gebäudetechnik und Facility Management: Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht A… |
| 41.3 | vertraulich | SK14 | an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall … |
| 41.9 | vertraulich | SK18 | an Leitung Finanzen und Versicherung (CFO) (statt Leitung Einkauf und Dienstleistersteuerung): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-An… |
| 42.6 | vertraulich | SK19 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und d… |
| 45.0 | Lagekarte (Höhepunkt) | LK15 | Mittwoch 10:00 Uhr: Wie weit geht der Ausweichbetrieb? · **Weiche W4** |
| 45.5 | vertraulich | SK46 | an Geschäftsführung (CEO), Krisenstabsleitung: Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Auswei… |
| 52.2 | Lagekarte (Folgen) | LK19 | Donnerstag 08:00 Uhr: Rücksicherung im Ausweich-Rack |
| 56.3 | vertraulich | SK24 | an Leitung Unternehmenskommunikation und Marketing (statt Kundenservice-Hotline): Seit dem Morgen über 600 Anrufe. Die häufigste Frage: „Gilt der Prospektpreis?“ Ihr habt k… |
| 59.4 | Lagekarte (Folgen) | LK20 | Donnerstag 10:00 Uhr: Wer kassiert zuerst? · **Weiche W5** |
| 66.6 | Lagekarte (Wiederanlauf) | LK22 | Donnerstag 18:00 Uhr: Die Kassen laufen wieder |
| 70.7 | vertraulich | SK38 | an Regionalleitung Filialen Nord: Die Kassen laufen wieder, aber Rückgaben von Bons aus dem Offline-Zeitraum lassen sich nic… |
| 73.8 | Lagekarte (Wiederanlauf) | LK27 | Sonntag 12:00 Uhr: Stabiler Notbetrieb |
| 74.3 | vertraulich | SK32 | an Geschäftsführung (CEO), Krisenstabsleitung (statt Personalleitung): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei … |

**Entfallene Lagekarten (15):** LK05 Feuerwehr im Einsatz · LK07 Was noch läuft – und was nicht · LK10 Serverraum gesperrt · LK11 Nordkanal fragt nach · LK12 Das Zentrallager steht · LK13 Ersatz: Hardware oder Ausweich-Rack? · LK16 Ein Bauunternehmen will Vorrang · LK17 Prospektpreise vor der Kasse · LK18 Der Verbundbeirat verlangt Antworten · LK21 Nordkanal berichtet · LK23 Die Datenlücke · LK24 Der Versicherer ist da · LK25 Der große Saisonsamstag · LK26 Die Brandursache · LK28 Zurück ins eigene Rechenzentrum?

**Entfallene vertrauliche Karten (24):** SK27, SK20, SK16, SK04, SK01, SK02, SK05, SK34, SK07, SK09, SK10, SK12, SK15, SK22, SK23, SK25, SK26, SK29, SK40, SK28, SK30, SK39, SK36, SK37

*Gründe laut Werkzeug:* Für die gewählte Zieldauer nicht enthalten (wichtige Karte, Zeitbudget ausgeschöpft). / Für die gewählte Zieldauer nicht enthalten (optionale Karte, Zeitbudget ausgeschöpft). / Baut auf LK24 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK18 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK12 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK05 auf – diese Lagekarte ist nicht im Plan. / Nicht eingeplant, damit die vertraulichen Karten gleichmäßig über die Übung verteilt sind und niemand überflutet wird. / Baut auf LK07 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK11 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK23 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK26 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK28 auf – diese Lagekarte ist nicht im Plan.

### 120 Minuten

**Besetzte Rollen (12):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz, Leitung Finanzen und Versicherung (CFO), Leitung Unternehmenskommunikation und Marketing, IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Regionalleitung Filialen Nord, Notfallmanagement / BCM-Koordination, IT-Support Filialen und Kassen, Leitung Online-Shop und Gewerbekundenportal

**Geplante Krisenzeit:** 108 Min. + ca. 12 Min. Abschluss

| Minute | Art | ID | Inhalt |
|---:|---|---|---|
| 0.0 | Lagekarte (Vorboten) | LK01 | Montag 22:40 Uhr: USV meldet Batteriewarnung |
| 3.0 | Lagekarte (Vorboten) | LK02 | Dienstag 02:35 Uhr: Geruch im Technikflur |
| 6.0 | Lagekarte (Vorboten) | LK03 | Dienstag 03:02 Uhr: Serverraum wird warm · **Weiche W1** |
| 6.3 | vertraulich | SK03 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise … |
| 9.0 | Lagekarte (Ausbruch) | LK04 | Dienstag 03:10 Uhr: Brandalarm im Rechenzentrum |
| 18.0 | Lagekarte (Ausbruch) | LK05 | Dienstag 03:40 Uhr: Feuerwehr im Einsatz |
| 18.5 | vertraulich | SK04 | an Leitung Arbeitssicherheit und Werkschutz (statt Schichtleitung Zentrallager (vor Ort in der Brandnacht)): Am Sammelplatz fehlt der Kollege der IT-Rufbereitschaft. Sein Auto steht auf dem Hof, ans … |
| 27.0 | Lagekarte (Ausbruch) | LK06 | Dienstag 05:30 Uhr: Lagebild nach dem Löschen |
| 27.5 | vertraulich | SK06 | an Leitung Arbeitssicherheit und Werkschutz: Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Flu… |
| 36.0 | Lagekarte (Eskalation) | LK08 | Dienstag 07:00 Uhr: Saisonstart ohne Aktionspreise |
| 40.4 | vertraulich | SK08 | an IT-Support Filialen und Kassen: Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe e… |
| 42.0 | vertraulich | SK35 | an Notfallmanagement / BCM-Koordination: Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine P… |
| 45.0 | Lagekarte (Eskalation) | LK09 | Dienstag 08:30 Uhr: Die Partnermärkte rufen an · **Weiche W2** |
| 45.5 | vertraulich | SK11 | an Partnerbetreuung Verbund (Kundenmanagement IT-Service): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiede… |
| 54.0 | Lagekarte (Höhepunkt) | LK14 | Mittwoch 07:30 Uhr: Den Backup-Server bergen? · **Weiche W3** |
| 54.5 | vertraulich | SK21 | an Leitung Arbeitssicherheit und Werkschutz: Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, … |
| 57.5 | vertraulich | SK13 | an Gebäudetechnik und Facility Management: Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht A… |
| 58.4 | vertraulich | SK14 | an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall … |
| 59.2 | vertraulich | SK18 | an Leitung Finanzen und Versicherung (CFO) (statt Leitung Einkauf und Dienstleistersteuerung): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-An… |
| 60.0 | vertraulich | SK19 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und d… |
| 63.0 | Lagekarte (Höhepunkt) | LK15 | Mittwoch 10:00 Uhr: Wie weit geht der Ausweichbetrieb? · **Weiche W4** |
| 63.5 | vertraulich | SK46 | an Geschäftsführung (CEO), Krisenstabsleitung: Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Auswei… |
| 67.3 | vertraulich | SK23 | an Leitung Online-Shop und Gewerbekundenportal: Der Shop zeigt seit Dienstag Bestände von Montagnacht. 312 Bestellungen „Abholung in der F… |
| 72.0 | Lagekarte (Folgen) | LK19 | Donnerstag 08:00 Uhr: Rücksicherung im Ausweich-Rack |
| 77.2 | vertraulich | SK24 | an Leitung Unternehmenskommunikation und Marketing (statt Kundenservice-Hotline): Seit dem Morgen über 600 Anrufe. Die häufigste Frage: „Gilt der Prospektpreis?“ Ihr habt k… |
| 81.0 | Lagekarte (Folgen) | LK20 | Donnerstag 10:00 Uhr: Wer kassiert zuerst? · **Weiche W5** |
| 90.0 | Lagekarte (Wiederanlauf) | LK22 | Donnerstag 18:00 Uhr: Die Kassen laufen wieder |
| 95.2 | vertraulich | SK38 | an Regionalleitung Filialen Nord: Die Kassen laufen wieder, aber Rückgaben von Bons aus dem Offline-Zeitraum lassen sich nic… |
| 99.0 | Lagekarte (Wiederanlauf) | LK27 | Sonntag 12:00 Uhr: Stabiler Notbetrieb |
| 99.5 | vertraulich | SK32 | an Geschäftsführung (CEO), Krisenstabsleitung (statt Personalleitung): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei … |

**Entfallene Lagekarten (14):** LK10 Serverraum gesperrt · LK11 Nordkanal fragt nach · LK12 Das Zentrallager steht · LK13 Ersatz: Hardware oder Ausweich-Rack? · LK16 Ein Bauunternehmen will Vorrang · LK17 Prospektpreise vor der Kasse · LK18 Der Verbundbeirat verlangt Antworten · LK21 Nordkanal berichtet · LK23 Die Datenlücke · LK24 Der Versicherer ist da · LK25 Der große Saisonsamstag · LK26 Die Brandursache · LK07 Was noch läuft – und was nicht · LK28 Zurück ins eigene Rechenzentrum?

**Entfallene vertrauliche Karten (23):** SK27, SK20, SK16, SK01, SK02, SK05, SK34, SK07, SK09, SK10, SK12, SK15, SK22, SK25, SK26, SK29, SK40, SK28, SK30, SK33, SK39, SK36, SK37

*Gründe laut Werkzeug:* Für die gewählte Zieldauer nicht enthalten (wichtige Karte, Zeitbudget ausgeschöpft). / Für die gewählte Zieldauer nicht enthalten (optionale Karte, Zeitbudget ausgeschöpft). / Baut auf LK24 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK18 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK12 auf – diese Lagekarte ist nicht im Plan. / Nicht eingeplant, damit die vertraulichen Karten gleichmäßig über die Übung verteilt sind und niemand überflutet wird. / Baut auf LK07 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK11 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK23 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK25 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK26 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK28 auf – diese Lagekarte ist nicht im Plan.

### 180 Minuten

**Besetzte Rollen (18):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz, Leitung Finanzen und Versicherung (CFO), Leitung Unternehmenskommunikation und Marketing, IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Regionalleitung Filialen Nord, Notfallmanagement / BCM-Koordination, IT-Support Filialen und Kassen, Leitung Online-Shop und Gewerbekundenportal, Leitung Logistik und Zentrallager, Informationssicherheit und Datenschutzkoordination, Leitung Einkauf und Dienstleistersteuerung, Kundenservice-Hotline, Personalleitung, Regionalleitung Filialen Süd

**Geplante Krisenzeit:** 165 Min. + ca. 15 Min. Abschluss

| Minute | Art | ID | Inhalt |
|---:|---|---|---|
| 0.0 | Lagekarte (Vorboten) | LK01 | Montag 22:40 Uhr: USV meldet Batteriewarnung |
| 3.0 | Lagekarte (Vorboten) | LK02 | Dienstag 02:35 Uhr: Geruch im Technikflur |
| 6.0 | Lagekarte (Vorboten) | LK03 | Dienstag 03:02 Uhr: Serverraum wird warm · **Weiche W1** |
| 6.3 | vertraulich | SK03 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise … |
| 9.0 | Lagekarte (Ausbruch) | LK04 | Dienstag 03:10 Uhr: Brandalarm im Rechenzentrum |
| 20.1 | Lagekarte (Ausbruch) | LK05 | Dienstag 03:40 Uhr: Feuerwehr im Einsatz |
| 20.6 | vertraulich | SK04 | an Leitung Arbeitssicherheit und Werkschutz (statt Schichtleitung Zentrallager (vor Ort in der Brandnacht)): Am Sammelplatz fehlt der Kollege der IT-Rufbereitschaft. Sein Auto steht auf dem Hof, ans … |
| 31.3 | Lagekarte (Ausbruch) | LK06 | Dienstag 05:30 Uhr: Lagebild nach dem Löschen |
| 31.8 | vertraulich | SK06 | an Leitung Arbeitssicherheit und Werkschutz: Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Flu… |
| 42.4 | Lagekarte (Eskalation) | LK08 | Dienstag 07:00 Uhr: Saisonstart ohne Aktionspreise |
| 47.3 | vertraulich | SK08 | an IT-Support Filialen und Kassen: Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe e… |
| 48.8 | vertraulich | SK35 | an Notfallmanagement / BCM-Koordination: Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine P… |
| 50.4 | vertraulich | SK10 | an Regionalleitung Filialen Süd: In einer Filiale gibt die Filialleitung den Prospektpreis per Handeingabe, die Nachbarfili… |
| 53.6 | Lagekarte (Eskalation) | LK09 | Dienstag 08:30 Uhr: Die Partnermärkte rufen an · **Weiche W2** |
| 54.1 | vertraulich | SK11 | an Partnerbetreuung Verbund (Kundenmanagement IT-Service): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiede… |
| 59.0 | vertraulich | SK12 | an Leitung Finanzen und Versicherung (CFO): Im Servicevertrag mit den Partnermärkten stehen Gutschriften bei Überschreiten des Wiederh… |
| 64.7 | Lagekarte (Eskalation) | LK10 | Dienstag 10:00 Uhr: Serverraum gesperrt |
| 70.1 | vertraulich | SK13 | an Gebäudetechnik und Facility Management: Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht A… |
| 72.1 | vertraulich | SK14 | an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall … |
| 75.9 | Lagekarte (Höhepunkt) | LK14 | Mittwoch 07:30 Uhr: Den Backup-Server bergen? · **Weiche W3** |
| 76.4 | vertraulich | SK21 | an Leitung Arbeitssicherheit und Werkschutz: Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, … |
| 80.7 | vertraulich | SK18 | an Leitung Einkauf und Dienstleistersteuerung: Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-An… |
| 82.3 | vertraulich | SK19 | an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und d… |
| 87.0 | Lagekarte (Höhepunkt) | LK15 | Mittwoch 10:00 Uhr: Wie weit geht der Ausweichbetrieb? · **Weiche W4** |
| 87.5 | vertraulich | SK46 | an Geschäftsführung (CEO), Krisenstabsleitung: Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Auswei… |
| 87.5 | vertraulich | SK22 | an Informationssicherheit und Datenschutzkoordination: Wenn die Warenwirtschaft ins Ausweich-Rack zieht, laufen dort auch Daten der Gewerbekunden… |
| 91.9 | vertraulich | SK23 | an Leitung Online-Shop und Gewerbekundenportal: Der Shop zeigt seit Dienstag Bestände von Montagnacht. 312 Bestellungen „Abholung in der F… |
| 98.1 | Lagekarte (Höhepunkt) | LK16 | Mittwoch 13:00 Uhr: Ein Bauunternehmen will Vorrang |
| 109.3 | Lagekarte (Folgen) | LK19 | Donnerstag 08:00 Uhr: Rücksicherung im Ausweich-Rack |
| 114.7 | vertraulich | SK24 | an Kundenservice-Hotline: Seit dem Morgen über 600 Anrufe. Die häufigste Frage: „Gilt der Prospektpreis?“ Ihr habt k… |
| 116.7 | vertraulich | SK25 | an Leitung Unternehmenskommunikation und Marketing: Ein bekannter Heimwerker-Kanal hat ein Video aus einer Filiale gepostet: Der Bon zeigt den… |
| 120.4 | Lagekarte (Folgen) | LK20 | Donnerstag 10:00 Uhr: Wer kassiert zuerst? · **Weiche W5** |
| 131.6 | Lagekarte (Folgen) | LK21 | Donnerstag 13:00 Uhr: Nordkanal berichtet |
| 142.7 | Lagekarte (Wiederanlauf) | LK22 | Donnerstag 18:00 Uhr: Die Kassen laufen wieder |
| 149.1 | vertraulich | SK38 | an Regionalleitung Filialen Nord: Die Kassen laufen wieder, aber Rückgaben von Bons aus dem Offline-Zeitraum lassen sich nic… |
| 153.9 | Lagekarte (Wiederanlauf) | LK27 | Sonntag 12:00 Uhr: Stabiler Notbetrieb |
| 154.4 | vertraulich | SK32 | an Personalleitung: Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei … |
| 159.2 | vertraulich | SK31 | an Leitung Logistik und Zentrallager: Die Wareneingänge vom Montag (38 Lkw) sind im System nicht gebucht. Die Ware steht im Lage… |

**Entfallene Lagekarten (11):** LK23 Die Datenlücke · LK24 Der Versicherer ist da · LK25 Der große Saisonsamstag · LK26 Die Brandursache · LK07 Was noch läuft – und was nicht · LK11 Nordkanal fragt nach · LK12 Das Zentrallager steht · LK13 Ersatz: Hardware oder Ausweich-Rack? · LK17 Prospektpreise vor der Kasse · LK18 Der Verbundbeirat verlangt Antworten · LK28 Zurück ins eigene Rechenzentrum?

**Entfallene vertrauliche Karten (20):** SK27, SK20, SK16, SK01, SK02, SK05, SK34, SK07, SK09, SK15, SK17, SK26, SK29, SK40, SK28, SK30, SK33, SK39, SK36, SK37

*Gründe laut Werkzeug:* Für die gewählte Zieldauer nicht enthalten (wichtige Karte, Zeitbudget ausgeschöpft). / Für die gewählte Zieldauer nicht enthalten (optionale Karte, Zeitbudget ausgeschöpft). / Baut auf LK24 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK18 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK12 auf – diese Lagekarte ist nicht im Plan. / Nicht eingeplant, damit die vertraulichen Karten gleichmäßig über die Übung verteilt sind und niemand überflutet wird. / Baut auf LK07 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK11 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK23 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK25 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK26 auf – diese Lagekarte ist nicht im Plan. / Baut auf LK28 auf – diese Lagekarte ist nicht im Plan.

