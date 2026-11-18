# 10 – Schäden, SLA und Versicherungen

Stand: 2026-11-18 · Codestand `0c8013e`

## 1. Regeln für beide Rechnungen

1. **Alle Beträge sind fiktive Szenarioannahmen** mit realistisch gewählter Größenordnung. Sie sind keine Kalkulation für ein reales Unternehmen und keine Versicherungs- oder Rechtsauskunft.
2. **Modellschaden, Liquidität und Versicherung werden nicht vermischt:**
   - *Brutto-Schaden* = Grundschaden (fällt immer an) + Posten der getroffenen Entscheidungen. Die Bühne zeigt ihn zuerst und vollständig.
   - *Mögliche Erstattung* = eine optimistische, ausdrücklich **unbestätigte Modellannahme**, getrennt ausgewiesen; Bedingungen, Selbstbehalte, Ausschlüsse und Anerkennung einzelner Posten sind nicht bewertet. Ein Lösegeld (NordTech) ist nicht enthalten.
   - *Liquidität* (z. B. Vorkasse an den Ausweich-Anbieter in Waterkant B3, verschobene Rechnungen, Vertragsbindung über zwölf Monate) ist **kein Schaden** und steht nicht in der Rechnung; die Bühne sagt das ausdrücklich.
   - Die Einordnung „Anteil am Jahresgewinn“ wird **mit und ohne** Erstattung gezeigt.
3. **Keine Folge ohne Ursache:** Jeder zusätzliche Posten hängt an einer Entscheidung des Tisches (oder an einer ausdrücklichen Frage der Moderation im Abschluss); die Variantenprüfung belegt für jede Kombination Rechnung = Grundschaden + Posten der gewählten Optionen.
4. Die Moderation kann Posten im Abschluss an- oder abwählen, wenn der Tisch anders gehandelt hat als die festgehaltene Entscheidung; das Protokoll hält fest, was gezeigt wurde.

## 2. Kunden, Verträge und Wiederherstellungsziele

| | NordTech | Waterkant |
|---|---|---|
| Wichtigste Kunden / Leistungsempfänger | Automobilkunden (Just-in-time) und Pharmakunden (260 Chargen, Dokumentationspflichten) | eigene Kundschaft in 14 Filialen, Online-Shop, Gewerbekunden mit Rahmenvereinbarungen; 9 Partnermärkte als Kunden des IT-Servicevertrags |
| Vertragliche Zusagen im Szenario | Vertragsstrafe 50.000 € je Tag Lieferausfall (Automobil) | Wiederherstellungsziel 24 Stunden für Kassen- und Preisdienste der Partner; Gutschrift je angefangenem Tag darüber (Szenarioannahme 2.000 € je Markt) |
| Wiederanlaufzeit (tatsächlich im Szenario) | Werk Süd Notbetrieb ab Freitag (30 %), Sonntag 70 % der technischen Kapazität auf priorisierten Anlagen; ERP nicht produktiv | Kassen- und Preisdienste Donnerstag 18:00 Uhr (ca. 63 Stunden nach dem Brand), stabiler Notbetrieb Sonntag; eigenes Rechenzentrum frühestens nach ca. drei Wochen |
| Datenverlust (tatsächlich) | rund 32 Stunden (Offline-Backup Samstag 23:00 Uhr) | rund 26 Stunden ohne Bergung (Sicherung Montag 01:00 Uhr); mit Bergung (W3) kleiner, aber Personen-/Arbeitsschutzfragen |
| Harte Frist im Betrieb | Erpresserfrist Mittwoch 07:00 Uhr | Kassen-Offline-Grenze Freitag ca. 03:00 Uhr (72 Stunden) |
| Bewusste Lernstelle | Wiederanlauf nur über die Freigabekette (Backup → Integrität → Wiederherstellung → Sicherheitsfreigabe → fachliche Datenprüfung → Produktionsfreigabe → Lieferung) | Wiederanlauf nur mit Raumfreigabe, Messung und geprüften Firewall-Regeln; Reihenfolge der Märkte nach einem Kriterium |

Beide Wiederanläufe sind **Szenarioannahmen**: Das Drehbuch unterstellt, dass die genannten Freigaben erteilt werden. Ob das in der Realität gelingt, ist Gegenstand der Diskussion, nicht Inhalt der Karten.

## 3. Waterkant: Jede Entscheidung hat ihren Preis

Nach der unabhängigen Prüfung (W-R03) hat jede Option einer Entscheidung einen eigenen, hergeleiteten Posten. Die Beträge je Entscheidung liegen nah beieinander und zeigen nicht mehr durchgehend zugunsten der „Lehrbuch-Antwort“:

| Entscheidung | Option A | Option B |
|---|---:|---:|
| W1 herunterfahren / weiterlaufen | 100.000 € (Kulanz, abgebrochene Partner-Tagesabschlüsse, Preisnachtrag) | 95.000 € (Hardwareersatz nach Rußeintrag) |
| W2 früh / später informieren | 25.000 € (Mehrkosten von Partnern, die auf die Prognose hin geplant hatten) | 40.000 € (Kulanz und Sonderkonditionen) |
| W3 bergen / abwarten | 95.000 € (Bergung, Datenrettung, ein Tag spätere Reinigung) | 110.000 € (Nacherfassung bis zur Datenrettung) |
| W4 minimal / ausbauen | 180.000 € (entgangener Rohertrag Wochen 2–3) | 210.000 € (Erweiterung zwölf Monate; zugleich Liquiditätsbindung) |
| W5 gleichrangig / eigene zuerst | 75.000 € (drei eigene Filialen Freitagmorgen ohne Kassen) | 90.000 € (Gutschriften, Risiko Partnerverlust) |

Damit unterscheiden sich die Verläufe in der Summe kaum (Spanne rund 80.000 €). Das ist gewollt: Bei Waterkant entscheidet der Tisch über Menschen, Daten, Vertrauen der Partner und Vertragsbindung – nicht über die günstigste Rechnung. Die Bühne sagt dazu: „Die Rechnung bewertet nicht, ob richtig entschieden wurde – sie zeigt, was jede Entscheidung kostet, auch die guten.“

## 4. Unterschied in der Spanne

Bei NordTech entscheiden die Weichen über bis zu 3,1 Mio. € (Lösegeld 2 Mio. € allein). Bei Waterkant liegt die Spanne bei etwa 0,08 Mio. €. Für die Moderation heißt das: Bei Waterkant ist die Rechnung nicht das stärkste Argument im Debriefing, sondern die Frage, welche Risiken der Tisch für welchen Nutzen eingegangen ist.


# NordTech

**Jahresumsatz** 185.000.000 € · **Umsatzrendite** 5 % · **Jahresgewinn (Modell)** 9.250.000 €

## Grundschaden (fällt in jedem Verlauf an)

| Posten | Betrag | Rechenweg (Szenarioannahme) | Was vorher geholfen hätte |
|---|---:|---|---|
| Entgangener Deckungsbeitrag (rund 6 Produktionstage) | 1.550.000 € | Umsatz 185 Mio. € ÷ ca. 250 Arbeitstage ≈ 740.000 € je Tag; Deckungsbeitragsquote ca. 35 % (fachliche Annahme) ≈ 260.000 € je Tag; ca. 6 Ausfalltage-Äquivalente (Montag bis Donnerstag weitgehend Stillstand, Freitag bis Sonntag eingeschränkter Betrieb), abzüglich der aus Fertigware gelieferten und später nachholbaren Mengen vereinfacht berücksichtigt ≈ 1,55 Mio. €. Vom Controlling bestätigen lassen. | Getestete Wiederanlaufpläne und Offline-Backups verkürzen den Stillstand. |
| Forensik und Incident Response (7 Tage rund um die Uhr) | 420.000 € | – | Ein vorab vereinbarter Dienstleister aus dem Versicherungsnetzwerk – die Kosten können dann erstattet werden. |
| IT-Wiederherstellung, Ersatzhardware, Überstunden IT | 380.000 € | – | Dokumentierte Notfallpasswörter und Konfigurationen – kein Wissen nur in einem Kopf. |
| Sonderschichten und Überstunden in der Produktion | 310.000 € | – | Eine vorab festgelegte Wiederanlauf-Reihenfolge der Aufträge. |
| Vertragsstrafen Automobilkunde (4 Tage à 50.000 €) | 200.000 € | Fertigware reicht ca. 48 Stunden (bis Mittwochfrüh); Lieferausfall beim Automobilkunden Mittwoch bis Samstag = 4 Tage à 50.000 € laut LK06. | Vorbereitete Störungsberichte und Notfallkommunikation für Schlüsselkunden. |
| Kulanz und Schadensersatz Pharmakunde | 250.000 € | – | Kritische Kunden und Lieferzusagen vorab identifiziert und priorisiert. |
| Recht, Datenschutz, Meldungen, Krisenkommunikation | 160.000 € | – | Meldepflichten (NIS2, DSGVO) und Zuständigkeiten vorab geklärt. |
| Nacherfassung und Rekonstruktion durch externe Kräfte | 90.000 € | – | Notfallbelege mit klarem Nacherfassungsprozess. |
| Verlorene Folgeaufträge infolge eingeschränkter Lieferfähigkeit und anhaltender Sicherheitsbedenken: zwei Kunden wechseln zum Wettbewerber (Deckungsbeitrag der folgenden 12 Monate) | 900.000 € | – | Schnelle, ehrliche Kommunikation hält Kunden – Schweigen treibt sie zum Wettbewerber. |
| **Summe** | **4.260.000 €** | | |

## Posten, die von Entscheidungen abhängen

| Posten | Betrag | ausgelöst durch | Rechenweg |
|---|---:|---|---|
| Lösegeldzahlung an die Erpresser | 2.000.000 € | W4 „Lösegeld gezahlt“ | – |
| Zusätzliche Kundenabwanderung, weil Kunden zuerst von Dritten vom Angriff erfahren haben | 600.000 € | W2 „Erst informieren, wenn die Lage klar ist“ | – |
| Zwei zusätzlich verschlüsselte Fräslinien: Neuaufsetzen und längerer Stillstand | 350.000 € | W1 „Anlagen bleiben am Netz, Aufträge werden fertiggestellt“ | – |
| Zusätzlicher Prüf- und Beratungsaufwand wegen Rückfragen der Aufsicht (Modellannahme, kein Bußgeld eingerechnet) | 150.000 € | W3 „Abwarten, bis der Abfluss bestätigt ist“ | – |

## Spanne über alle Entscheidungskombinationen

| | Brutto-Schaden | mögliche Erstattung (Modellannahme) | beim Unternehmen | Anteil am Jahresgewinn ohne Erstattung |
|---|---:|---:|---:|---:|
| günstigster Verlauf (W1 trennen, W2 proaktiv, W3 melden, W4 nicht-gezahlt) | 4.260.000 € | 1.400.000 € | 2.860.000 € | 46 % |
| teuerster Verlauf (W1 am-netz, W2 abwarten, W3 abwarten, W4 gezahlt) | 7.360.000 € | 1.400.000 € | 5.960.000 € | 80 % |

**Versicherung:** Mögliche Erstattung durch die Cyberversicherung (optimistische Modellannahme, nicht bestätigt) – bis zu 1.400.000 €. Der Gesamtschaden steht brutto. Die Erstattung von bis zu 1,4 Mio. € ist eine unbestätigte Modellannahme; Vertragsbedingungen, Selbstbehalte, Ausschlüsse und die Anerkennung einzelner Kostenpositionen sind nicht bewertet. Ein Lösegeld ist darin nicht enthalten.

*Hinweis auf der Bühne:* Fiktive Beispielrechnung für dieses Szenario. Sie gilt für den gesamten Krisenverlauf über sieben Tage – auch für Ereignisse wie Vertragsstrafen, die in kurzen Übungen nicht als eigene Karte vorkommen. Die Größenordnungen sind bewusst realistisch gewählt. Zusatzposten aus Entscheidungen sind fiktive Übungsannahmen; sie veranschaulichen mögliche Folgen und sind keine Prognose oder rechtliche Bewertung. Die Erstattung ist eine hypothetische Modellannahme. Offene Forderungen aus nicht gestellten Rechnungen sind ein Liquiditätsproblem, kein endgültiger Schaden, und deshalb nicht enthalten.

# Waterkant

**Jahresumsatz** 240.000.000 € · **Umsatzrendite** 5 % · **Jahresgewinn (Modell)** 12.000.000 €

## Grundschaden (fällt in jedem Verlauf an)

| Posten | Betrag | Rechenweg (Szenarioannahme) | Was vorher geholfen hätte |
|---|---:|---|---|
| Reinigung und Dekontamination des Serverraums, Sanierung des USV-Raums, Gutachten | 480.000 € | Szenarioannahme: Angebot einer Fachfirma für 120 m² Serverraum mit 16 Racks plus Sanierung des USV-Raums und Brandgutachten. | Brandabschnitte, Rauchschutz und ein geübter Sanierungsvertrag begrenzen Sekundärschäden. |
| Ersatz der USV-Anlage und korrosionsgefährdeter Hardware (Server, Speicher, Netzwerk) | 1.250.000 € | Szenarioannahme: Neuwert, rund 60 % der Komponenten werden wegen Korrosionsrisiko ersetzt; neue USV einschließlich Einbau. | Gewartete USV mit aktueller Batteriesteuerung; räumliche Trennung von Batterie und Serverraum. |
| Ausweichbetrieb im Grundumfang (Aktivierung, Anbindung von 23 Märkten) | 90.000 € | Szenarioannahme: Aktivierungsgebühr laut Notfallvertrag plus Netzwerkanbindung. | Ein geübter Ausweichplan macht die Aktivierung planbar. |
| Externe Dienstleister für die Wiederherstellung (7 Tage) | 260.000 € | Szenarioannahme: drei Dienstleisterteams (Netzwerk, Datenbank, Kassensystem) über sieben Tage, teils rund um die Uhr. | Rahmenverträge mit Reaktionszeiten statt Notfallpreisen. |
| Überstunden und Sonderschichten in IT, Filialen und Zentrallager | 180.000 € | Szenarioannahme auf Basis der Einsatzzeiten der Woche. | Vertretungsregeln und Schichtpläne für den Notbetrieb. |
| Entgangener Rohertrag in der Saisonstart-Woche (Filialen, Lager, Gewerbekunden) | 700.000 € | Umsatz 240 Mio. € ÷ ca. 300 Verkaufstage ≈ 800.000 € je Tag; Saisonstart-Woche etwa das 1,5-Fache ≈ 1,2 Mio. € je Tag; Umsatzminderung Dienstag bis Samstag rund 20 % ≈ 1,2 Mio. € Umsatz, dazu rund 0,9 Mio. € Umsatz bei Gewerbekunden und durch Lieferstopp aus dem Zentrallager; Rohertragsquote ca. 33 % (fachliche Annahme) ≈ 0,7 Mio. €. Vom Controlling bestätigen lassen. | Offline-Preisdienste und vorbereitete Notprozesse halten den Verkauf am Laufen. |
| Kulanz bei Prospektpreisen, Gutscheine und Mehraufwand der Hotline | 120.000 € | Szenarioannahme. | Eine einheitliche, früh entschiedene Kulanzregel ist billiger als Einzelfälle. |
| Gutschriften an Partnermärkte laut Servicevertrag (Grundumfang) | 36.000 € | Szenarioannahme: 9 Märkte × 2 angefangene Tage über dem 24-Stunden-Ziel × 2.000 €. | Realistische Wiederherstellungsziele, die ein Ausweichplan auch einhält. |
| Nacherfassung, Kassenabgleich und Inventurstichproben (Grundumfang) | 60.000 € | Szenarioannahme. | Kürzere Sicherungsintervalle und schnellere Übertragung der Kopien verkleinern die Lücke. |
| **Summe** | **3.176.000 €** | | |

## Posten, die von Entscheidungen abhängen

| Posten | Betrag | ausgelöst durch | Rechenweg |
|---|---:|---|---|
| Abgebrochene Preisübertragung: Kulanz für Aktionspreise und Nacharbeit der Partner-Tagesabschlüsse | 100.000 € | W1 „Nicht zwingend benötigte Systeme sofort kontrolliert herunterfahren (Preisübertragung und Partner-Uploads brechen ab)“ | Szenarioannahme: Kulanz in 5 Filialen (5 × ca. 4 Verkaufstage × ca. 2.500 €) = 50.000 €, Nacharbeit abgebrochener Tagesabschlüsse von 9 Partnermärkten (je ca. 3.300 €) ≈ 30.000 €, Nachtrag der Aktionspreise in allen 14 Filialen von Hand ≈ 20.000 €. |
| Zusätzlicher Hardwareersatz nach Rußeintrag in laufende Geräte | 95.000 € | W1 „Weiterlaufen lassen, bis die Gebäudetechnik die Ursache geklärt hat“ | Szenarioannahme: rund 10 % mehr Geräte nicht reinigungsfähig, Neuwert einschließlich Einbau ca. 95.000 €. |
| Erstattete Mehrkosten von Partnern, die auf die frühe Prognose hin geplant hatten | 25.000 € | W2 „Heute 11 Uhr alle Partner informieren: Lage, ehrliche Spanne („Kassen frühestens Donnerstag“), fester Update-Takt“ | Szenarioannahme: 2 Partnermärkte × ca. 12.500 € (Personal und Werbung für Donnerstag). |
| Kulanz und Sonderkonditionen für Partnermärkte | 40.000 € | W2 „Erst informieren, wenn ein belastbarer Termin feststeht (voraussichtlich Mittwoch)“ | Szenarioannahme: 9 Partnermärkte × ca. 4.450 € (eine rabattierte Monatsgebühr des IT-Servicevertrags). |
| Bergung, Reinigung und Datenrettung des Backup-Servers; Reinigung des Serverraums einen Tag später | 95.000 € | W3 „Heute durch die Fachfirma unter Schutzausrüstung bergen lassen (nach Gefährdungsbeurteilung), dann reinigen und prüfen“ | Szenarioannahme: Fachfirma mit Schutzausrüstung und Messbegleitung ca. 15.000 €, Laborreinigung und Datenrettung ca. 30.000 €, ein Tag längerer Ausweichbetrieb und Bereitschaft ca. 50.000 €. |
| Nacherfassung der Montagsdaten bis zur Datenrettung | 110.000 € | W3 „Freigabe des Raums abwarten (nach Reinigung, ca. eine Woche)“ | Szenarioannahme: ca. 1.600 Personenstunden Nacherfassung und Abgleich in 23 Märkten und Zentrallager × ca. 70 € (intern und extern gemischt); danach übernimmt die vom Datenretter gelesene Dienstagssicherung den Rest. |
| Entgangener Rohertrag Online-Shop und Gewerbekunden (Wochen 2 und 3 eingeschränkt) | 180.000 € | W4 „Nur Kassen- und Preisdienste und den Kern der Warenwirtschaft verlagern; der Rest wartet auf das eigene Rechenzentrum“ | Szenarioannahme: ca. 15 Verkaufstage × ca. 12.000 € entgangener Rohertrag je Tag (Woche 1 ist im Grundschaden enthalten). |
| Erweiterung des Ausweichbetriebs (12 Monate) und zusätzliche Dienstleister | 210.000 € | W4 „Ausweich-Rack binnen 48 Stunden erweitern und auch Lager, Gewerbeportal und Online-Bestände verlagern (zwölf Monate Mindestlaufzeit)“ | Szenarioannahme: Erweiterung 12 Monate Mindestlaufzeit × ca. 15.000 € = 180.000 € plus Einrichtung durch Dienstleister ca. 30.000 €. Die Vertragsbindung über zwölf Monate ist zugleich eine Liquiditätsbelastung, die über die Übungswoche hinausreicht. |
| Saisonfreitag: drei eigene Filialen bis zur Freischaltung ohne Kassen | 75.000 € | W5 „Eigene Filialen und Partnermärkte nach einem gemeinsamen, offengelegten Kriterium (z. B. Umsatz, unabhängig vom Eigentümer)“ | Szenarioannahme: 3 Filialen × ca. halber Verkaufstag × ca. 25.000 € Rohertrag am Saisonfreitag. |
| Zusätzliche Gutschriften und Risiko des Partnerverlusts im IT-Service (12 Monate) | 90.000 € | W5 „Eigene 14 Filialen zuerst, danach die Partnermärkte“ | Szenarioannahme: zusätzliche Gutschriften an die Partner ca. 30.000 € plus gewichteter Deckungsbeitragsverlust von ca. 60.000 € im ersten Jahr, falls ein Partner den IT-Servicevertrag kündigt. |

## Spanne über alle Entscheidungskombinationen

| | Brutto-Schaden | mögliche Erstattung (Modellannahme) | beim Unternehmen | Anteil am Jahresgewinn ohne Erstattung |
|---|---:|---:|---:|---:|
| günstigster Verlauf (W1 weiterlaufen, W2 frueh, W3 bergen, W4 minimal, W5 gleichrangig) | 3.646.000 € | 1.600.000 € | 2.046.000 € | 30 % |
| teuerster Verlauf (W1 herunterfahren, W2 spaeter, W3 abwarten, W4 ausbauen, W5 eigene) | 3.726.000 € | 1.600.000 € | 2.126.000 € | 31 % |

**Versicherung:** Mögliche Erstattung durch Elektronik- und Betriebsunterbrechungsversicherung (optimistische Modellannahme, nicht bestätigt) – bis zu 1.600.000 €. Der Gesamtschaden steht brutto. Die Erstattung von bis zu 1,6 Mio. € ist eine unbestätigte Modellannahme; Wartungsauflagen (USV-Wartung überfällig), Selbstbehalte, Karenzzeit und die Anerkennung einzelner Kostenpositionen sind nicht bewertet.

*Hinweis auf der Bühne:* Fiktive Beispielrechnung für dieses Szenario. Die Größenordnungen sind bewusst realistisch gewählt; alle Beträge sind Szenarioannahmen. Die Erstattung ist eine hypothetische Modellannahme. Liquiditätswirkungen (z. B. Vorkasse, verschobene Lieferantenrechnungen) sind kein Schaden und deshalb nicht enthalten.
