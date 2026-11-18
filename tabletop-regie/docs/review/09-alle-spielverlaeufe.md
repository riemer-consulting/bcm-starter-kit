# 09 – Alle Spielverläufe

Stand: 2026-11-18 · Codestand `07b0fb2`

Die Verläufe sind direkt aus dem Werkzeug erzeugt (`tools/geschichten.js`): genau diese Karten, Texte, Reihenfolgen, Empfänger und Rechnungen sieht der Tisch bei der angegebenen Dauer, dem Schwerpunkt und den Entscheidungen. NordTech: 7 Verläufe (identisch mit der Fassung aus der Vorabnahme). Waterkant: 8 Verläufe über alle fünf Dauern, alle vier Schwerpunkte und beide Optionen jeder Entscheidung.

Vollständige Abdeckung aller Kombinationen (25 je Szenario aus Dauer × Schwerpunkt, 16 bzw. 32 Entscheidungskombinationen) prüft die Variantenprüfung im Anhang von Dokument 04 bzw. 05. Die Verläufe hier dienen dem Lesen „wie der Tisch es erlebt“.


# Teil 1 – NordTech


Stand: 2026-11-18 · Alle Angaben fiktiv. Erzeugt direkt aus dem Werkzeug: genau diese Karten, Texte und Reihenfolgen sieht der Tisch.

### Auftrag

Lies jede Geschichte von vorne nach hinten so, wie der Tisch sie erlebt (öffentliche Lagen auf der Bühne, vertrauliche Karten per E-Mail an einzelne Rollen, Entscheidungen an den Weichen, am Ende die Rechnung). Prüfe für jede Geschichte:

1. Ist sie in sich schlüssig – Zeitangaben, Zahlen, Wissen der Beteiligten, Folgen der Entscheidungen?
2. Verändern Schwerpunkt und Entscheidungen tatsächlich, worüber der Tisch entscheiden muss (nicht nur, welche Karten kommen)?
3. Gibt es Stellen, an denen eine Karte etwas voraussetzt, das in *dieser* Geschichte nicht passiert ist?
4. Ist die Rechnung am Ende zu den getroffenen Entscheidungen plausibel?

Bitte als Tabelle antworten: Geschichte | Stelle (Karten-ID) | Problem | Vorschlag (fertiger Text) | Dringlichkeit. Danach je Geschichte ein Satz Gesamturteil.

### Übersicht

| Nr. | Dauer | Schwerpunkt | Entscheidungen |
|---:|---:|---|---|
| 1 | 45 Min. | Ausgewogen | alle Entscheidungen riskant |
| 2 | 90 Min. | Ausgewogen | alle Entscheidungen vorsichtig |
| 3 | 90 Min. | Krisenführung und BCM | alle Entscheidungen riskant |
| 4 | 90 Min. | IT-Sicherheit und Wiederanlauf | gemischt (trennen, Kunden abwarten, melden, gezahlt) |
| 5 | 90 Min. | Produktion und Qualitätsmanagement | alle Entscheidungen riskant |
| 6 | 90 Min. | Kunden und Krisenkommunikation | gemischt (am Netz, Kunden proaktiv, Datenschutz abwarten, nicht gezahlt) |
| 7 | 180 Min. | IT-Sicherheit und Wiederanlauf | alle Entscheidungen riskant |

---

### Geschichte 1: 45 Minuten · Ausgewogen · alle Entscheidungen riskant

**Besetzte Rollen (5):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (CIO), Leitung Produktion (Werksleitung), Geschäftsführung Vertrieb, stellv. Krisenstabsleitung, Kaufmännische Leitung (CFO)  
**Geplante Krisenzeit:** 40 Min. + ca. 5 Min. Abschluss · Entscheidungszeit je Lage ca. 1,25 Min.

#### Min. 0,0 · LK18 Anmeldung hakt · Montag 06:41 Uhr · Vorboten

Mehrere Kolleginnen und Kollegen der Frühschicht kommen nicht ins ERP. Die Anmeldung bricht mit einer Zeitüberschreitung ab, ein Neustart hilft nicht. Der IT-Service-Desk ist erst ab 07:00 Uhr besetzt.

- Was ist Ihre erste Reaktion – und wen informieren Sie?
- Welche Information würde Sie veranlassen, jetzt den IT-Notfallprozess auszulösen?

#### Min. 2,0 · LK01 Cyberangriff · Montag 07:00 Uhr · Ausbruch

Jetzt geht nichts mehr. Die Frühschicht meldet: ERP, Fileserver, Zeiterfassung und E-Mail sind ausgefallen. Auf immer mehr Bildschirmen erscheint eine Lösegeldforderung. Die Produktion kann keine neuen Fertigungsaufträge abrufen.

*Krisen-Info:* Lösegeldforderung: 2.000.000 € · Frist: 48 Stunden

- Welche Auswirkungen hat dies auf Ihren Bereich?
- Welche Sofortmaßnahmen leiten Sie ein?
- Welche Entscheidungen benötigt der Krisenstab?
- Welche Anweisung bekommen jetzt alle Beschäftigten – und über wen läuft sie?

> **Vertraulich SK40 an Leitung Produktion (Werksleitung)** (Min. 4,7): Die Schichtleitungen der drei Standorte rufen dich gleichzeitig an: Sollen die laufenden Aufträge zu Ende gefahren oder die Anlagen sofort gestoppt werden? An Fräslinie 4 sind die Programme verschlüsselt, an den anderen Linien läuft noch alles. Ein Automobilkunde erwartet heute Nachmittag eine Just-in-time-Lieferung. Wie weist du die Schichtleitungen an, bis der Krisenstab entschieden hat?

#### Min. 6,8 · LK02 Produktion stoppt · Montag 09:00 Uhr · Ausbruch

Die Produktionsleitung meldet: Neue Fertigungsaufträge können nicht gestartet werden. Laufende Aufträge enden in den nächsten Stunden. Ohne Gegenmaßnahmen kommt die Fertigung an allen drei Standorten zum Stillstand.

*Krisen-Info:* Fertigwaren reichen für Lieferungen noch ca. 48 Stunden

- Welche Folgen erwarten Sie?
- Welche Kunden sind betroffen?
- Welche Prioritäten setzen Sie?

**Entscheidung W1 (am Ende dieser Lage):** Bleiben die übrigen Anlagen am Netz, bis die laufenden Aufträge fertig sind – oder werden sie sofort getrennt?  
→ Der Tisch entscheidet: **Anlagen bleiben am Netz, Aufträge werden fertiggestellt**  
*Folge laut Drehbuch:* Später sind zwei weitere Fräslinien verschlüsselt: Werk Süd startet mit 20 % statt 30 %; bis Sonntag holen zusätzliche Teams das auf. Zusatzposten in der Rechnung.

#### Min. 11,5 · LK22 Kommunikation ohne IT · Montag 10:00 Uhr · Ausbruch

E-Mail, ERP und Teile der Telefonie sind nicht verfügbar. Gleichzeitig müssen 620 Beschäftigte an drei Standorten Anweisungen erhalten. Einige arbeiten weiter, andere haben ihre Geräte ausgeschaltet. Es gibt keine einheitliche Information.

*Krisen-Info:* 620 Beschäftigte · 3 Standorte · 3 Schichten · keine E-Mail

- Welchen unabhängigen Kanal nutzen Sie?
- Wer gibt die Nachricht frei?
- Wie stellen Sie sicher, dass jede Schicht und jeder Standort erreicht wird?

> **Vertraulich SK01 an IT-Leitung (CIO)** (Min. 14,2): Ein externer Dienstleister informiert dich: Die Backups könnten ebenfalls kompromittiert sein. Aktuell ist das nicht bestätigt. Du entscheidest selbst, wie du mit dieser Information umgehst.

**Entscheidung W2 (am Ende dieser Lage):** Informiert NordTech heute auch die Kunden proaktiv – oder erst, wenn die Lage klarer ist?  
→ Der Tisch entscheidet: **Erst informieren, wenn die Lage klar ist**  
*Folge laut Drehbuch:* Der größte Automobilkunde erfährt es über Dritte (vertrauliche Karte an den Vertrieb bei „Datenschutz“); beim Wiederanlauf öffentliche Kritik; Zusatzposten Kundenabwanderung.

#### Min. 16,3 · LK07 Datenschutz · Dienstag 13:00 Uhr · Eskalation

Es gibt Hinweise auf einen möglichen Abfluss personenbezogener und geschäftskritischer Daten. Welche Melde-, Informations- und Dokumentationspflichten bestehen, ist unverzüglich fachlich prüfen zu lassen.

*Krisen-Info:* Mögliche Meldefristen laufen bereits (z. B. Datenschutz: 72 Stunden) – fachlich prüfen lassen

- Welche Informationen liegen vor – und welche fehlen?
- Wer prüft die Meldepflichten, und bis wann?
- Wer übernimmt die Kommunikation?

> **Vertraulich (Folge einer Entscheidung) SK43 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung:** Der Einkaufsleiter eures größten Automobilkunden ruft an: Er hat über Dritte vom Cyberangriff erfahren, nicht von euch. Er verlangt bis heute Abend ein Gespräch mit der Geschäftsführung und eine schriftliche Lageinformation.

> **Vertraulich SK22 an Kaufmännische Leitung (CFO)** (Min. 18,6): Die Cyberversicherung meldet sich und weist auf mögliche Einschränkungen bei der Kostenerstattung hin: Kosten für Dienstleister außerhalb ihres Partnernetzwerks (Forensik, Anwalt, Krisenkommunikation) werden nach den Vertragsbedingungen möglicherweise nicht oder nur teilweise erstattet. Wer schon andere beauftragt hat, sollte das umgehend klären.

> **Vertraulich SK20 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 19,4): Die Frist der Erpresser endet am Mittwoch um 07:00 Uhr. Ein Beiratsmitglied fragt dich vorab, welche Haltung die Geschäftsführung zur Lösegeldforderung einnimmt: „Unter welchen Bedingungen würden Sie eine Zahlung überhaupt in Betracht ziehen?“ Die Finanzleitung rechnet vor: Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, und ein Backup ist bisher nicht gefunden. Euer Anwalt rät: Eine etwaige Zahlung erfordert vorher eine fachliche Prüfung der rechtlichen, wirtschaftlichen und sicherheitsbezogenen Risiken – unter anderem, ob die Gruppierung hinter SHADOWVAULT Sanktionen unterliegt. Bereite deine Position für den Krisenstab vor.

**Entscheidung W3 (am Ende dieser Lage):** Meldet NordTech den möglichen Datenabfluss vorsorglich an die Datenschutzaufsicht – oder wartet sie die Bestätigung ab?  
→ Der Tisch entscheidet: **Abwarten, bis der Abfluss bestätigt ist**  
*Folge laut Drehbuch:* Kritische Nachfrage im Beirat; später fragt die Aufsicht nach dem Ablauf (vertrauliche Karte an die Geschäftsführung); zusätzlicher Prüf- und Beratungsaufwand als Modellannahme in der Rechnung.

**Entscheidung W4 (am Ende dieser Lage):** Die Erpresserfrist endet morgen, Mittwoch 07:00 Uhr. Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, ein Backup ist bisher nicht gefunden. Niemand weiß, ob ein Schlüssel funktionieren würde oder wie schnell ein unabhängiger Wiederanlauf gelingt. Welche wirtschaftlichen und betrieblichen Gründe sprechen unter diesen Unsicherheiten für oder gegen eine Zahlung – und wie entscheidet NordTech?  
→ Der Tisch entscheidet: **Lösegeld gezahlt**  
*Folge laut Drehbuch:* Der gelieferte Schlüssel hilft nur teilweise, die Erpresser fordern danach mehr (vertrauliche Karte an die IT mit „Beirat fordert Lagebericht“), die Zahlung wird öffentlich. Lösegeld steht in der Rechnung.

#### Min. 21,0 · LK09 Backups gefunden · Mittwoch 11:00 Uhr · Eskalation

Im Tresor des Hauptsitzes wurden Offline-Backups gefunden, Stand: Samstag 23:00 Uhr. Der Sicherungsdatenträger ist lesbar. Die Zugangsdaten zur Sicherungssoftware lagen im versiegelten IT-Notfallumschlag – ohne ihn wäre ohne den erkrankten Administrator niemand an die Daten gekommen. Integrität, Schadcodefreiheit und Vollständigkeit der Daten sind noch nicht bestätigt.

*Krisen-Info:* Datenverlust: rund 32 Stunden (Sonntag bis Montagfrüh)

- Wiederherstellung vorbereiten – oder erst weiter prüfen?
- Welche Risiken bestehen, und wer gibt frei?
- Was bedeutet der Datenverlust für Ihren Bereich?

#### Min. 25,8 · LK17 Beirat fordert Lagebericht · Donnerstag 07:00 Uhr · Höhepunkt

Der Beirat hat für heute Vormittag eine Sondersitzung einberufen. Er erwartet in 30 Minuten einen Lagebericht: Schadenshöhe, Wiederanlaufprognose, Kommunikationsstrategie – und die Frage, ob das Management die Lage im Griff hat. Ein Beiratsmitglied will wissen, warum die Datenschutzaufsicht noch nicht informiert ist.

*Krisen-Info:* Sondersitzung in 30 Minuten · alle Bereiche müssen zuliefern

- Was meldet Ihr Bereich in höchstens drei Sätzen?
- Welche Zahl können Sie belastbar nennen – und welche nicht?
- Wer trägt vor, und was sagen Sie bewusst nicht?

> **Vertraulich (Folge einer Entscheidung) SK27 an IT-Leitung (CIO):** Trotz der Zahlung melden sich die Erpresser erneut über das Tor-Portal: „Wir sind noch in eurem Netz. Für die übrigen Schlüssel und die Löschung eurer Daten will die Gruppe weitere 500.000 €. Ihr habt 12 Stunden.“ Die Forensik kann nicht ausschließen, dass sie noch Zugang haben. Du entscheidest selbst, wie du mit dieser Information umgehst.

> **Vertraulich SK17 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 26,2): Ein Beiratsmitglied ruft dich am Donnerstagmorgen unmittelbar vor der Sondersitzung privat an: „Wenn wir heute keine belastbaren Zahlen und keinen Plan sehen, stelle ich die Führungsfrage.“ Niemand sonst weiß von diesem Anruf.

#### Min. 30,5 · LK12 Teilweiser Wiederanlauf · Freitag 08:00 Uhr · Folgen

Werk Süd kann im eingeschränkten Notbetrieb wieder anlaufen: Die Produktionssysteme wurden isoliert neu aufgesetzt und unabhängig geprüft. Dieser Notbetrieb nutzt keine ungeprüften Sicherungsdaten; die Prüfung des ERP-Backups dauert weiterhin an. Aufträge und Rückmeldungen laufen vorerst über Papierlisten. Weil die Anlagen am Montag am Netz blieben, wurden zwei weitere Fräslinien verschlüsselt und müssen neu aufgesetzt werden. Der nach der Zahlung gelieferte Schlüssel entschlüsselt nur einen Teil der übrigen Systeme und ist sehr langsam. Niemand verlässt sich darauf – die Wiederherstellung der übrigen Systeme wartet weiter auf das geprüfte Backup.

*Krisen-Info:* Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt)

- Welche Produkte und Kunden haben Vorrang?
- Wer gibt die Produktion frei – und nach welchen Kriterien?
- Wie wird ohne ERP dokumentiert?

> **Vertraulich (Folge einer Entscheidung) SK44 an Geschäftsführung (CEO), Krisenstabsleitung:** Die Datenschutzaufsicht fragt nach: Wann hat NordTech von einer möglichen Datenverletzung erfahren, welche Prüfung wurde vorgenommen, und weshalb ist bislang keine Meldung erfolgt? Ob eine Pflichtverletzung vorliegt, muss fachlich geprüft werden.

> **Vertraulich SK18 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung** (Min. 33,2): Ein Pharmakunde, der wegen der Lieferausfälle Schadensersatz prüft, bietet an, darauf zu verzichten. Voraussetzung: eine verbindliche Lieferzusage. Wie bewertest du die Situation?

#### Min. 35,3 · LK15 Wiederanlauf · Sonntag 12:00 Uhr · Wiederanlauf

70 % der technischen Fertigungskapazität sind auf priorisierten Anlagen wieder verfügbar – in isolierten, geprüften Produktionsumgebungen mit Sicherheitsfreigabe. Nicht alle 900 IT- und OT-Systeme sind wiederhergestellt; der ERP-Produktivbetrieb sowie die Freigaben von Daten und Ware werden gesondert bewertet. Personal und Material begrenzen die reale Leistung: Nach den Krisentagen sind die Schichten erschöpft, und wegen Materialengpässen ist nicht sicher, dass die Kapazität durchgehend ausgelastet werden kann. Kunden und Presse beobachten die Situation weiterhin kritisch. Zusätzliche Wiederherstellungsteams haben bis Sonntag auch die am Montag zusätzlich verschlüsselten Linien wieder freigegeben – der Schaden vom Montag hat den Wiederanlauf verteuert, aber nicht dauerhaft verhindert. Zwei Großkunden kritisieren öffentlich, dass sie vom Angriff zuerst über Dritte statt von NordTech erfahren haben, und kündigen an, ihre Lieferantenstrategie zu überprüfen. In der Presse wird berichtet, dass NordTech Lösegeld gezahlt hat.

*Krisen-Info:* 70 % technische Kapazität auf priorisierten Anlagen · ERP-Produktivbetrieb und Freigaben offen

- Welche Botschaft senden Sie an Kunden, Beschäftigte und Öffentlichkeit – und wer sagt es?
- Welchen Kunden vertrösten Sie bewusst, obwohl technische Kapazität vorhanden ist – und wer sagt es ihm?

#### Abschluss

Sonntag, nach sieben Tagen Unternehmenskrise. Die priorisierten Anlagen laufen wieder, 70 % der technischen Fertigungskapazität sind wiederhergestellt. ERP-Produktivbetrieb, Datenabgleich und Warenfreigaben sind noch nicht abgeschlossen. Materialengpässe und die Belastung der Beschäftigten begrenzen weiterhin die tatsächliche Leistung. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 4.260.000 € + aus Entscheidungen: Zwei zusätzlich verschlüsselte Fräslinien: Neuaufsetzen und längerer Stillstand (350.000 €); Zusätzliche Kundenabwanderung, weil Kunden zuerst von Dritten vom Angriff erfahren haben (600.000 €); Zusätzlicher Prüf- und Beratungsaufwand wegen Rückfragen der Aufsicht (Modellannahme, kein Bußgeld eingerechnet) (150.000 €); Lösegeldzahlung an die Erpresser (2.000.000 €) = **7.360.000 €**; Mögliche Erstattung durch die Cyberversicherung (optimistische Modellannahme, nicht bestätigt): − 1.400.000 € → **beim Unternehmen bleiben 5.960.000 €** (64 % des Jahresgewinns).

*Fazit auf der Bühne:* Die Systeme laufen nach sieben Tagen wieder. Das Vertrauen der Kunden braucht Monate. Eine Krise ist erst vorbei, wenn die Kunden uns wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das entscheiden dürfen?
- Wie kamen die Meldungen von Service-Desk, Kundenservice und Standorten beim Krisenstab an – und wie kamen Anweisungen und Sprachregelung zu ihnen zurück?
- Wer hätte früher eingebunden werden müssen?
- Welche Person oder Rolle war kritisch – und gab es eine Vertretung?
- Wo waren Single Points of Failure?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- „70 % technische Kapazität“ – wie viel davon war wirklich nutzbar, und was hat die reale Leistung begrenzt (Personal, Material, Freigaben)?
- Welche Kosten wären möglicherweise nicht von der Versicherung gedeckt – und wie verändert das den Liquiditätsbedarf?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?

---

### Geschichte 2: 90 Minuten · Ausgewogen · alle Entscheidungen vorsichtig

**Besetzte Rollen (9):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (CIO), Leitung Produktion (Werksleitung), Geschäftsführung Vertrieb, stellv. Krisenstabsleitung, Kaufmännische Leitung (CFO), Leitung Qualitätsmanagement, Notfallmanagement / BCM, Unternehmenskommunikation & Marketing, IT-Service-Desk (technischer Support)  
**Geplante Krisenzeit:** 81 Min. + ca. 9 Min. Abschluss · Entscheidungszeit je Lage ca. 2,5 Min.

#### Min. 0,0 · LK18 Anmeldung hakt · Montag 06:41 Uhr · Vorboten

Mehrere Kolleginnen und Kollegen der Frühschicht kommen nicht ins ERP. Die Anmeldung bricht mit einer Zeitüberschreitung ab, ein Neustart hilft nicht. Der IT-Service-Desk ist erst ab 07:00 Uhr besetzt.

- Was ist Ihre erste Reaktion – und wen informieren Sie?
- Welche Information würde Sie veranlassen, jetzt den IT-Notfallprozess auszulösen?

#### Min. 3,0 · LK19 Maschine 4 verhält sich seltsam · Montag 06:48 Uhr · Vorboten

An der Fräslinie 4 laufen die Programme nicht an. Im Programmverzeichnis haben alle Dateien plötzlich eine fremde Endung: .shadowvault. Die Schichtleitung startet das Bedienterminal neu und ruft die Instandhaltung.

- Wer muss jetzt informiert werden?
- Würden Sie die Linie bereits stoppen, bevor ein Angriff bestätigt ist?

#### Min. 6,0 · LK01 Cyberangriff · Montag 07:00 Uhr · Ausbruch

Jetzt geht nichts mehr. Die Frühschicht meldet: ERP, Fileserver, Zeiterfassung und E-Mail sind ausgefallen. Auf immer mehr Bildschirmen erscheint eine Lösegeldforderung. Die Produktion kann keine neuen Fertigungsaufträge abrufen.

*Krisen-Info:* Lösegeldforderung: 2.000.000 € · Frist: 48 Stunden

- Welche Auswirkungen hat dies auf Ihren Bereich?
- Welche Sofortmaßnahmen leiten Sie ein?
- Welche Entscheidungen benötigt der Krisenstab?
- Welche Anweisung bekommen jetzt alle Beschäftigten – und über wen läuft sie?

> **Vertraulich SK34 an IT-Service-Desk (technischer Support)** (Min. 9,6): Seit Beginn der Störung gehen beim IT-Service-Desk im Minutentakt Anrufe und Meldungen ein, der Rückstau wächst schnell. Die Beschäftigten fragen: Darf ich meinen Rechner weiter nutzen? Soll ich das Netzwerkkabel ziehen? Eine abgestimmte Anweisung fehlt noch – im Team antwortet jeder etwas anderes.

> **Vertraulich SK40 an Leitung Produktion (Werksleitung)** (Min. 11,0): Die Schichtleitungen der drei Standorte rufen dich gleichzeitig an: Sollen die laufenden Aufträge zu Ende gefahren oder die Anlagen sofort gestoppt werden? An Fräslinie 4 sind die Programme verschlüsselt, an den anderen Linien läuft noch alles. Ein Automobilkunde erwartet heute Nachmittag eine Just-in-time-Lieferung. Wie weist du die Schichtleitungen an, bis der Krisenstab entschieden hat?

#### Min. 13,5 · LK02 Produktion stoppt · Montag 09:00 Uhr · Ausbruch

Die Produktionsleitung meldet: Neue Fertigungsaufträge können nicht gestartet werden. Laufende Aufträge enden in den nächsten Stunden. Ohne Gegenmaßnahmen kommt die Fertigung an allen drei Standorten zum Stillstand.

*Krisen-Info:* Fertigwaren reichen für Lieferungen noch ca. 48 Stunden

- Welche Folgen erwarten Sie?
- Welche Kunden sind betroffen?
- Welche Prioritäten setzen Sie?

> **Vertraulich SK21 an Notfallmanagement / BCM** (Min. 17,8): Es besteht der Verdacht, dass NordTech neben dem Datenschutz weiteren gesetzlichen Meldepflichten unterliegt (z. B. als Einrichtung nach NIS2 an das BSI) – mit Fristen ab Kenntnis des Vorfalls. Betroffenheit, zuständige Stellen und Fristen sind umgehend fachlich prüfen zu lassen.

**Entscheidung W1 (am Ende dieser Lage):** Bleiben die übrigen Anlagen am Netz, bis die laufenden Aufträge fertig sind – oder werden sie sofort getrennt?  
→ Der Tisch entscheidet: **Übrige Anlagen kontrolliert in einen sicheren Zustand fahren und ihre Verbindungen zum IT-Netz gezielt trennen, laufende Aufträge geordnet abbrechen**  
*Folge laut Drehbuch:* Laufende Aufträge brechen ab, aber keine Anlage wird zusätzlich befallen. Werk Süd startet wie geplant.

#### Min. 21,0 · LK22 Kommunikation ohne IT · Montag 10:00 Uhr · Ausbruch

E-Mail, ERP und Teile der Telefonie sind nicht verfügbar. Gleichzeitig müssen 620 Beschäftigte an drei Standorten Anweisungen erhalten. Einige arbeiten weiter, andere haben ihre Geräte ausgeschaltet. Es gibt keine einheitliche Information.

*Krisen-Info:* 620 Beschäftigte · 3 Standorte · 3 Schichten · keine E-Mail

- Welchen unabhängigen Kanal nutzen Sie?
- Wer gibt die Nachricht frei?
- Wie stellen Sie sicher, dass jede Schicht und jeder Standort erreicht wird?

> **Vertraulich SK01 an IT-Leitung (CIO)** (Min. 25,3): Ein externer Dienstleister informiert dich: Die Backups könnten ebenfalls kompromittiert sein. Aktuell ist das nicht bestätigt. Du entscheidest selbst, wie du mit dieser Information umgehst.

**Entscheidung W2 (am Ende dieser Lage):** Informiert NordTech heute auch die Kunden proaktiv – oder erst, wenn die Lage klarer ist?  
→ Der Tisch entscheidet: **Kunden heute proaktiv informieren (gesicherte Fakten, nächster Update-Termin)**  
*Folge laut Drehbuch:* Beim Wiederanlauf danken einzelne Großkunden für die Offenheit; ein Kunde kritisiert, dass die erste Meldung mehr Fragen aufwarf als beantwortete.

#### Min. 28,5 · LK04 Nordkanal-Anfrage · Montag 14:00 Uhr · Eskalation

Der Regionalsender Nordkanal kontaktiert das Unternehmen. Fragen: Wurden Kundendaten gestohlen? Zahlen Sie Lösegeld? Ist die Produktion betroffen?

*Krisen-Info:* Antwortfrist: 2 Stunden

- Wer spricht?
- Was wird kommuniziert?
- Was wird bewusst nicht kommuniziert?

> **Vertraulich SK22 an Kaufmännische Leitung (CFO)** (Min. 32,1): Die Cyberversicherung meldet sich und weist auf mögliche Einschränkungen bei der Kostenerstattung hin: Kosten für Dienstleister außerhalb ihres Partnernetzwerks (Forensik, Anwalt, Krisenkommunikation) werden nach den Vertragsbedingungen möglicherweise nicht oder nur teilweise erstattet. Wer schon andere beauftragt hat, sollte das umgehend klären.

> **Vertraulich SK05 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung** (Min. 33,5): Ein Großkunde droht: Wenn heute keine verbindliche Aussage erfolgt, wird ein Wettbewerber beauftragt. Der Kunde erwartet zeitnah eine Reaktion.

#### Min. 36,0 · LK07 Datenschutz · Dienstag 13:00 Uhr · Eskalation

Es gibt Hinweise auf einen möglichen Abfluss personenbezogener und geschäftskritischer Daten. Welche Melde-, Informations- und Dokumentationspflichten bestehen, ist unverzüglich fachlich prüfen zu lassen.

*Krisen-Info:* Mögliche Meldefristen laufen bereits (z. B. Datenschutz: 72 Stunden) – fachlich prüfen lassen

- Welche Informationen liegen vor – und welche fehlen?
- Wer prüft die Meldepflichten, und bis wann?
- Wer übernimmt die Kommunikation?

> **Vertraulich SK41 an Leitung Qualitätsmanagement** (Min. 39,6): Seit Beginn des IT-Ausfalls werden die Messprotokolle für Pharma-Komponenten nicht mehr elektronisch übertragen. Die Fertigung dokumentiert auf Papier. Der Vertrieb möchte vorhandene Ware trotzdem ausliefern, weil der Kunde drängt. Welche Nachweise verlangst du vor einer Freigabe?

> **Vertraulich SK20 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 41,0): Die Frist der Erpresser endet am Mittwoch um 07:00 Uhr. Ein Beiratsmitglied fragt dich vorab, welche Haltung die Geschäftsführung zur Lösegeldforderung einnimmt: „Unter welchen Bedingungen würden Sie eine Zahlung überhaupt in Betracht ziehen?“ Die Finanzleitung rechnet vor: Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, und ein Backup ist bisher nicht gefunden. Euer Anwalt rät: Eine etwaige Zahlung erfordert vorher eine fachliche Prüfung der rechtlichen, wirtschaftlichen und sicherheitsbezogenen Risiken – unter anderem, ob die Gruppierung hinter SHADOWVAULT Sanktionen unterliegt. Bereite deine Position für den Krisenstab vor.

**Entscheidung W3 (am Ende dieser Lage):** Meldet NordTech den möglichen Datenabfluss vorsorglich an die Datenschutzaufsicht – oder wartet sie die Bestätigung ab?  
→ Der Tisch entscheidet: **Vorsorglich melden, Informationen nachreichen**  
*Folge laut Drehbuch:* Der Beirat vermerkt das frühe, dokumentierte Vorgehen positiv.

**Entscheidung W4 (am Ende dieser Lage):** Die Erpresserfrist endet morgen, Mittwoch 07:00 Uhr. Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, ein Backup ist bisher nicht gefunden. Niemand weiß, ob ein Schlüssel funktionieren würde oder wie schnell ein unabhängiger Wiederanlauf gelingt. Welche wirtschaftlichen und betrieblichen Gründe sprechen unter diesen Unsicherheiten für oder gegen eine Zahlung – und wie entscheidet NordTech?  
→ Der Tisch entscheidet: **Kein Lösegeld gezahlt**  
*Folge laut Drehbuch:* Keine Lösegeldzahlung. Die Wiederherstellung läuft über geprüfte Sicherungen und unabhängig neu aufgebaute Systeme nach dem festgelegten Wiederanlaufplan; die Geschichte bleibt wie im Drehbuch.

#### Min. 43,5 · LK09 Backups gefunden · Mittwoch 11:00 Uhr · Eskalation

Im Tresor des Hauptsitzes wurden Offline-Backups gefunden, Stand: Samstag 23:00 Uhr. Der Sicherungsdatenträger ist lesbar. Die Zugangsdaten zur Sicherungssoftware lagen im versiegelten IT-Notfallumschlag – ohne ihn wäre ohne den erkrankten Administrator niemand an die Daten gekommen. Integrität, Schadcodefreiheit und Vollständigkeit der Daten sind noch nicht bestätigt.

*Krisen-Info:* Datenverlust: rund 32 Stunden (Sonntag bis Montagfrüh)

- Wiederherstellung vorbereiten – oder erst weiter prüfen?
- Welche Risiken bestehen, und wer gibt frei?
- Was bedeutet der Datenverlust für Ihren Bereich?

> **Vertraulich SK19 an IT-Leitung (CIO)** (Min. 47,8): Die Forensiker warnen davor, betroffene Systeme oder Daten aus ungeprüften Backups produktiv wiederherzustellen – die Prüfung des Backups dauert mindestens zwei Tage. Eine isolierte Neuinstallation unabhängig von diesen Sicherungen kann nach gesonderter Sicherheitsprüfung freigegeben werden. Gleichzeitig steigt der Druck aus den Fachbereichen. Wie gehst du damit um?

#### Min. 51,0 · LK17 Beirat fordert Lagebericht · Donnerstag 07:00 Uhr · Höhepunkt

Der Beirat hat für heute Vormittag eine Sondersitzung einberufen. Er erwartet in 30 Minuten einen Lagebericht: Schadenshöhe, Wiederanlaufprognose, Kommunikationsstrategie – und die Frage, ob das Management die Lage im Griff hat. Positiv vermerkt der Beirat: NordTech hat die mögliche Datenverletzung frühzeitig adressiert und eine vorsorgliche Meldung mit dokumentierter fachlicher Bewertung veranlasst.

*Krisen-Info:* Sondersitzung in 30 Minuten · alle Bereiche müssen zuliefern

- Was meldet Ihr Bereich in höchstens drei Sätzen?
- Welche Zahl können Sie belastbar nennen – und welche nicht?
- Wer trägt vor, und was sagen Sie bewusst nicht?

> **Vertraulich SK17 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 51,5): Ein Beiratsmitglied ruft dich am Donnerstagmorgen unmittelbar vor der Sondersitzung privat an: „Wenn wir heute keine belastbaren Zahlen und keinen Plan sehen, stelle ich die Führungsfrage.“ Niemand sonst weiß von diesem Anruf.

#### Min. 58,5 · LK12 Teilweiser Wiederanlauf · Freitag 08:00 Uhr · Folgen

Werk Süd kann im eingeschränkten Notbetrieb wieder anlaufen: Die Produktionssysteme wurden isoliert neu aufgesetzt und unabhängig geprüft. Dieser Notbetrieb nutzt keine ungeprüften Sicherungsdaten; die Prüfung des ERP-Backups dauert weiterhin an. Aufträge und Rückmeldungen laufen vorerst über Papierlisten. Die frühe Trennung vom Netz hat sich ausgezahlt: Keine Fertigungsanlage wurde zusätzlich verschlüsselt.

*Krisen-Info:* Kapazität: 30 %

- Welche Produkte und Kunden haben Vorrang?
- Wer gibt die Produktion frei – und nach welchen Kriterien?
- Wie wird ohne ERP dokumentiert?

> **Vertraulich SK29 an Kaufmännische Leitung (CFO)** (Min. 62,8): Die Hausbank meldet sich erneut: Wegen der Ausfälle will sie die Kreditlinie überprüfen und bittet bis Montag um eine Liquiditätsplanung für die nächsten acht Wochen – inklusive Annahmen zu Kundenzahlungen und Vertragsstrafen.

#### Min. 66,0 · LK21 Chargenfreigabe · Freitag 16:00 Uhr · Folgen

Die Produktion ist teilweise wieder angelaufen. Für 260 Chargen für Pharmakunden fehlen durch den IT-Ausfall elektronische Produktions- und Prüfnachweise. Die Qualitätsleitung kann derzeit nicht bestätigen, welche Chargen freigegeben werden dürfen. Gleichzeitig fordert ein Pharmakunde eine verbindliche Lieferzusage.

*Krisen-Info:* 260 Chargen ohne vollständige Nachweise

- Wer darf welche Produkte freigeben?
- Wie wird die Nachdokumentation organisiert?
- Was sagt NordTech dem Kunden bis zur Freigabe?

> **Vertraulich SK15 an Notfallmanagement / BCM (statt Assistenz der Geschäftsführung / Lage & Dokumentation)** (Min. 70,3): Zwei Bereiche behaupten: „Das haben wir so nie beschlossen.“ Es geht um eine Entscheidung des Krisenstabs von heute Vormittag. Wie stellst du die Nachvollziehbarkeit sicher?

#### Min. 73,5 · LK15 Wiederanlauf · Sonntag 12:00 Uhr · Wiederanlauf

70 % der technischen Fertigungskapazität sind auf priorisierten Anlagen wieder verfügbar – in isolierten, geprüften Produktionsumgebungen mit Sicherheitsfreigabe. Nicht alle 900 IT- und OT-Systeme sind wiederhergestellt; der ERP-Produktivbetrieb sowie die Freigaben von Daten und Ware werden gesondert bewertet. Personal und Material begrenzen die reale Leistung: Nach den Krisentagen sind die Schichten erschöpft, und wegen Materialengpässen ist nicht sicher, dass die Kapazität durchgehend ausgelastet werden kann. Kunden und Presse beobachten die Situation weiterhin kritisch. Einzelne Großkunden bedanken sich für die frühe Information. Ein Kunde merkt an, dass die erste Meldung mehr Fragen aufwarf als beantwortete – das Vertrauen hat gelitten, ist aber nicht zerstört.

*Krisen-Info:* 70 % technische Kapazität auf priorisierten Anlagen · ERP-Produktivbetrieb und Freigaben offen

- Welche Botschaft senden Sie an Kunden, Beschäftigte und Öffentlichkeit – und wer sagt es?
- Welchen Kunden vertrösten Sie bewusst, obwohl technische Kapazität vorhanden ist – und wer sagt es ihm?

> **Vertraulich SK33 an Unternehmenskommunikation & Marketing** (Min. 77,8): 70 % der technischen Fertigungskapazität sind inzwischen bestätigt. Materialengpässe, personelle Belastung und ausstehende Produktfreigaben begrenzen jedoch die tatsächliche Lieferfähigkeit, und offen ist weiterhin, ob Kundendaten abgeflossen sind. Die Geschäftsführung möchte öffentlich erklären: „Alles wieder im Griff.“ Wie formulierst du eine belastbare Botschaft?

#### Abschluss

Sonntag, nach sieben Tagen Unternehmenskrise. Die priorisierten Anlagen laufen wieder, 70 % der technischen Fertigungskapazität sind wiederhergestellt. ERP-Produktivbetrieb, Datenabgleich und Warenfreigaben sind noch nicht abgeschlossen. Materialengpässe und die Belastung der Beschäftigten begrenzen weiterhin die tatsächliche Leistung. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 4.260.000 € (keine Zusatzposten) = **4.260.000 €**; Mögliche Erstattung durch die Cyberversicherung (optimistische Modellannahme, nicht bestätigt): − 1.400.000 € → **beim Unternehmen bleiben 2.860.000 €** (31 % des Jahresgewinns).

*Fazit auf der Bühne:* Die Systeme laufen nach sieben Tagen wieder. Das Vertrauen der Kunden braucht Monate. Eine Krise ist erst vorbei, wenn die Kunden uns wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das entscheiden dürfen?
- Wie kamen die Meldungen von Service-Desk, Kundenservice und Standorten beim Krisenstab an – und wie kamen Anweisungen und Sprachregelung zu ihnen zurück?
- Wer hätte früher eingebunden werden müssen?
- Welche Person oder Rolle war kritisch – und gab es eine Vertretung?
- Wo waren Single Points of Failure?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- „70 % technische Kapazität“ – wie viel davon war wirklich nutzbar, und was hat die reale Leistung begrenzt (Personal, Material, Freigaben)?
- Welche Kosten wären möglicherweise nicht von der Versicherung gedeckt – und wie verändert das den Liquiditätsbedarf?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?

---

### Geschichte 3: 90 Minuten · Krisenführung und BCM · alle Entscheidungen riskant

**Besetzte Rollen (9):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (CIO), Leitung Produktion (Werksleitung), Geschäftsführung Vertrieb, stellv. Krisenstabsleitung, Kaufmännische Leitung (CFO), Leitung Qualitätsmanagement, Notfallmanagement / BCM, Unternehmenskommunikation & Marketing, IT-Service-Desk (technischer Support)  
**Geplante Krisenzeit:** 81 Min. + ca. 9 Min. Abschluss · Entscheidungszeit je Lage ca. 2,5 Min.
  
**Leitfrage des Schwerpunkts (für die Moderation):** Wer entscheidet, wer eskaliert, wer kommuniziert – und ist das allen klar?

#### Min. 0,0 · LK18 Anmeldung hakt · Montag 06:41 Uhr · Vorboten

Mehrere Kolleginnen und Kollegen der Frühschicht kommen nicht ins ERP. Die Anmeldung bricht mit einer Zeitüberschreitung ab, ein Neustart hilft nicht. Der IT-Service-Desk ist erst ab 07:00 Uhr besetzt.

- Was ist Ihre erste Reaktion – und wen informieren Sie?
- Welche Information würde Sie veranlassen, jetzt den IT-Notfallprozess auszulösen?
- Wer darf entscheiden, dass das kein Routinefall mehr ist? *(Schwerpunkt)*

#### Min. 3,0 · LK19 Maschine 4 verhält sich seltsam · Montag 06:48 Uhr · Vorboten

An der Fräslinie 4 laufen die Programme nicht an. Im Programmverzeichnis haben alle Dateien plötzlich eine fremde Endung: .shadowvault. Die Schichtleitung startet das Bedienterminal neu und ruft die Instandhaltung.

- Wer muss jetzt informiert werden?
- Würden Sie die Linie bereits stoppen, bevor ein Angriff bestätigt ist?

#### Min. 6,0 · LK01 Cyberangriff · Montag 07:00 Uhr · Ausbruch

Jetzt geht nichts mehr. Die Frühschicht meldet: ERP, Fileserver, Zeiterfassung und E-Mail sind ausgefallen. Auf immer mehr Bildschirmen erscheint eine Lösegeldforderung. Die Produktion kann keine neuen Fertigungsaufträge abrufen.

*Krisen-Info:* Lösegeldforderung: 2.000.000 € · Frist: 48 Stunden

- Welche Auswirkungen hat dies auf Ihren Bereich?
- Welche Sofortmaßnahmen leiten Sie ein?
- Welche Entscheidungen benötigt der Krisenstab?
- Welche Anweisung bekommen jetzt alle Beschäftigten – und über wen läuft sie?
- Wer übernimmt jetzt die Leitung – und wie erfahren alle davon? *(Schwerpunkt)*

> **Vertraulich SK34 an IT-Service-Desk (technischer Support)** (Min. 9,6): Seit Beginn der Störung gehen beim IT-Service-Desk im Minutentakt Anrufe und Meldungen ein, der Rückstau wächst schnell. Die Beschäftigten fragen: Darf ich meinen Rechner weiter nutzen? Soll ich das Netzwerkkabel ziehen? Eine abgestimmte Anweisung fehlt noch – im Team antwortet jeder etwas anderes.

> **Vertraulich SK40 an Leitung Produktion (Werksleitung)** (Min. 11,0): Die Schichtleitungen der drei Standorte rufen dich gleichzeitig an: Sollen die laufenden Aufträge zu Ende gefahren oder die Anlagen sofort gestoppt werden? An Fräslinie 4 sind die Programme verschlüsselt, an den anderen Linien läuft noch alles. Ein Automobilkunde erwartet heute Nachmittag eine Just-in-time-Lieferung. Wie weist du die Schichtleitungen an, bis der Krisenstab entschieden hat?

#### Min. 13,5 · LK02 Produktion stoppt · Montag 09:00 Uhr · Ausbruch

Die Produktionsleitung meldet: Neue Fertigungsaufträge können nicht gestartet werden. Laufende Aufträge enden in den nächsten Stunden. Ohne Gegenmaßnahmen kommt die Fertigung an allen drei Standorten zum Stillstand.

*Krisen-Info:* Fertigwaren reichen für Lieferungen noch ca. 48 Stunden

- Welche Folgen erwarten Sie?
- Welche Kunden sind betroffen?
- Welche Prioritäten setzen Sie?
- Was entscheidet der Krisenstab, was entscheiden die Fachbereiche selbst? *(Schwerpunkt)*

> **Vertraulich SK21 an Notfallmanagement / BCM** (Min. 17,8): Es besteht der Verdacht, dass NordTech neben dem Datenschutz weiteren gesetzlichen Meldepflichten unterliegt (z. B. als Einrichtung nach NIS2 an das BSI) – mit Fristen ab Kenntnis des Vorfalls. Betroffenheit, zuständige Stellen und Fristen sind umgehend fachlich prüfen zu lassen.

**Entscheidung W1 (am Ende dieser Lage):** Bleiben die übrigen Anlagen am Netz, bis die laufenden Aufträge fertig sind – oder werden sie sofort getrennt?  
→ Der Tisch entscheidet: **Anlagen bleiben am Netz, Aufträge werden fertiggestellt**  
*Folge laut Drehbuch:* Später sind zwei weitere Fräslinien verschlüsselt: Werk Süd startet mit 20 % statt 30 %; bis Sonntag holen zusätzliche Teams das auf. Zusatzposten in der Rechnung.

#### Min. 21,0 · LK22 Kommunikation ohne IT · Montag 10:00 Uhr · Ausbruch

E-Mail, ERP und Teile der Telefonie sind nicht verfügbar. Gleichzeitig müssen 620 Beschäftigte an drei Standorten Anweisungen erhalten. Einige arbeiten weiter, andere haben ihre Geräte ausgeschaltet. Es gibt keine einheitliche Information.

*Krisen-Info:* 620 Beschäftigte · 3 Standorte · 3 Schichten · keine E-Mail

- Welchen unabhängigen Kanal nutzen Sie?
- Wer gibt die Nachricht frei?
- Wie stellen Sie sicher, dass jede Schicht und jeder Standort erreicht wird?
- Wer gibt Nachrichten frei – und wie schnell muss das gehen? *(Schwerpunkt)*

> **Vertraulich SK01 an IT-Leitung (CIO)** (Min. 25,3): Ein externer Dienstleister informiert dich: Die Backups könnten ebenfalls kompromittiert sein. Aktuell ist das nicht bestätigt. Du entscheidest selbst, wie du mit dieser Information umgehst.

**Entscheidung W2 (am Ende dieser Lage):** Informiert NordTech heute auch die Kunden proaktiv – oder erst, wenn die Lage klarer ist?  
→ Der Tisch entscheidet: **Erst informieren, wenn die Lage klar ist**  
*Folge laut Drehbuch:* Der größte Automobilkunde erfährt es über Dritte (vertrauliche Karte an den Vertrieb bei „Datenschutz“); beim Wiederanlauf öffentliche Kritik; Zusatzposten Kundenabwanderung.

#### Min. 28,5 · LK05 Schlüsselperson fällt aus · Dienstag 08:00 Uhr · Eskalation

Der leitende Systemadministrator liegt seit Montag im Krankenhaus und ist nicht erreichbar. Erst jetzt wird klar: Niemand sonst kennt Backup-Konfiguration, Notfallpasswörter oder Firewallregeln vollständig.

- Welche Risiken entstehen?
- Welche Aufgabe vergeben Sie sofort an externe Spezialisten, obwohl Zugriffsrechte und Sicherheitslage ungeklärt sind?
- Welche Prioritäten ändern sich?

> **Vertraulich SK05 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung** (Min. 32,1): Ein Großkunde droht: Wenn heute keine verbindliche Aussage erfolgt, wird ein Wettbewerber beauftragt. Der Kunde erwartet zeitnah eine Reaktion.

> **Vertraulich SK23 an Notfallmanagement / BCM** (Min. 33,5): Die Polizei (ZAC beim LKA) fragt an, ob bereits Anzeige erstattet wurde, und bietet Unterstützung bei der Beweissicherung an. Löscht niemand vorschnell Logs?

#### Min. 36,0 · LK07 Datenschutz · Dienstag 13:00 Uhr · Eskalation

Es gibt Hinweise auf einen möglichen Abfluss personenbezogener und geschäftskritischer Daten. Welche Melde-, Informations- und Dokumentationspflichten bestehen, ist unverzüglich fachlich prüfen zu lassen.

*Krisen-Info:* Mögliche Meldefristen laufen bereits (z. B. Datenschutz: 72 Stunden) – fachlich prüfen lassen

- Welche Informationen liegen vor – und welche fehlen?
- Wer prüft die Meldepflichten, und bis wann?
- Wer übernimmt die Kommunikation?
- Wer bekommt den Prüfauftrag, mit welchem Termin für die Rückmeldung? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK43 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung:** Der Einkaufsleiter eures größten Automobilkunden ruft an: Er hat über Dritte vom Cyberangriff erfahren, nicht von euch. Er verlangt bis heute Abend ein Gespräch mit der Geschäftsführung und eine schriftliche Lageinformation.

> **Vertraulich SK41 an Leitung Qualitätsmanagement** (Min. 39,6): Seit Beginn des IT-Ausfalls werden die Messprotokolle für Pharma-Komponenten nicht mehr elektronisch übertragen. Die Fertigung dokumentiert auf Papier. Der Vertrieb möchte vorhandene Ware trotzdem ausliefern, weil der Kunde drängt. Welche Nachweise verlangst du vor einer Freigabe?

> **Vertraulich SK20 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 41,0): Die Frist der Erpresser endet am Mittwoch um 07:00 Uhr. Ein Beiratsmitglied fragt dich vorab, welche Haltung die Geschäftsführung zur Lösegeldforderung einnimmt: „Unter welchen Bedingungen würden Sie eine Zahlung überhaupt in Betracht ziehen?“ Die Finanzleitung rechnet vor: Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, und ein Backup ist bisher nicht gefunden. Euer Anwalt rät: Eine etwaige Zahlung erfordert vorher eine fachliche Prüfung der rechtlichen, wirtschaftlichen und sicherheitsbezogenen Risiken – unter anderem, ob die Gruppierung hinter SHADOWVAULT Sanktionen unterliegt. Bereite deine Position für den Krisenstab vor.

**Entscheidung W3 (am Ende dieser Lage):** Meldet NordTech den möglichen Datenabfluss vorsorglich an die Datenschutzaufsicht – oder wartet sie die Bestätigung ab?  
→ Der Tisch entscheidet: **Abwarten, bis der Abfluss bestätigt ist**  
*Folge laut Drehbuch:* Kritische Nachfrage im Beirat; später fragt die Aufsicht nach dem Ablauf (vertrauliche Karte an die Geschäftsführung); zusätzlicher Prüf- und Beratungsaufwand als Modellannahme in der Rechnung.

**Entscheidung W4 (am Ende dieser Lage):** Die Erpresserfrist endet morgen, Mittwoch 07:00 Uhr. Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, ein Backup ist bisher nicht gefunden. Niemand weiß, ob ein Schlüssel funktionieren würde oder wie schnell ein unabhängiger Wiederanlauf gelingt. Welche wirtschaftlichen und betrieblichen Gründe sprechen unter diesen Unsicherheiten für oder gegen eine Zahlung – und wie entscheidet NordTech?  
→ Der Tisch entscheidet: **Lösegeld gezahlt**  
*Folge laut Drehbuch:* Der gelieferte Schlüssel hilft nur teilweise, die Erpresser fordern danach mehr (vertrauliche Karte an die IT mit „Beirat fordert Lagebericht“), die Zahlung wird öffentlich. Lösegeld steht in der Rechnung.

#### Min. 43,5 · LK09 Backups gefunden · Mittwoch 11:00 Uhr · Eskalation

Im Tresor des Hauptsitzes wurden Offline-Backups gefunden, Stand: Samstag 23:00 Uhr. Der Sicherungsdatenträger ist lesbar. Die Zugangsdaten zur Sicherungssoftware lagen im versiegelten IT-Notfallumschlag – ohne ihn wäre ohne den erkrankten Administrator niemand an die Daten gekommen. Integrität, Schadcodefreiheit und Vollständigkeit der Daten sind noch nicht bestätigt.

*Krisen-Info:* Datenverlust: rund 32 Stunden (Sonntag bis Montagfrüh)

- Wiederherstellung vorbereiten – oder erst weiter prüfen?
- Welche Risiken bestehen, und wer gibt frei?
- Was bedeutet der Datenverlust für Ihren Bereich?
- Welche Entscheidung muss jetzt fallen, welche kann warten – und wer hält das fest? *(Schwerpunkt)*

> **Vertraulich SK19 an IT-Leitung (CIO)** (Min. 47,8): Die Forensiker warnen davor, betroffene Systeme oder Daten aus ungeprüften Backups produktiv wiederherzustellen – die Prüfung des Backups dauert mindestens zwei Tage. Eine isolierte Neuinstallation unabhängig von diesen Sicherungen kann nach gesonderter Sicherheitsprüfung freigegeben werden. Gleichzeitig steigt der Druck aus den Fachbereichen. Wie gehst du damit um?

#### Min. 51,0 · LK24 Wer bekommt das erste System? · Mittwoch 15:00 Uhr · Eskalation

Die IT hat eine vom betroffenen Unternehmensnetz getrennte Umgebung für die Vorbereitung und Prüfung der Wiederherstellung aufgebaut. Rechenleistung, Fachpersonal und Zeit reichen zunächst nur für einen größeren Geschäftsprozess. Der Vertrieb fordert Zugriff auf Kundenaufträge, die Produktion auf Fertigungsinformationen, die Finanzleitung auf offene Forderungen. Das am Vormittag gefundene Offline-Backup ist lesbar, aber noch nicht abschließend auf Integrität, Vollständigkeit und Schadcode geprüft – ein produktiver Wiederanlauf daraus ist nicht freigegeben.

*Krisen-Info:* Nur ein Geschäftsprozess kann zunächst vorbereitet werden · Backup-Prüfung läuft · keine Produktivfreigabe

- Welchen Geschäftsprozess bereiten Sie zuerst vor – nach welchen unternehmensweiten Kriterien?
- Welche Abhängigkeiten bestehen zwischen Aufträgen, Material, Fertigung und Rechnungsstellung?
- Wie unterscheiden Sie technische Vorbereitung, Sicherheitstest und fachliche Freigabe?
- Wer dokumentiert die Priorisierung und informiert die zurückgestellten Bereiche?

#### Min. 58,5 · LK17 Beirat fordert Lagebericht · Donnerstag 07:00 Uhr · Höhepunkt

Der Beirat hat für heute Vormittag eine Sondersitzung einberufen. Er erwartet in 30 Minuten einen Lagebericht: Schadenshöhe, Wiederanlaufprognose, Kommunikationsstrategie – und die Frage, ob das Management die Lage im Griff hat. Ein Beiratsmitglied will wissen, warum die Datenschutzaufsicht noch nicht informiert ist.

*Krisen-Info:* Sondersitzung in 30 Minuten · alle Bereiche müssen zuliefern

- Was meldet Ihr Bereich in höchstens drei Sätzen?
- Welche Zahl können Sie belastbar nennen – und welche nicht?
- Wer trägt vor, und was sagen Sie bewusst nicht?
- Was ist gesichert, was geschätzt, was unbekannt – und sagt die Leitung das auch so? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK27 an IT-Leitung (CIO):** Trotz der Zahlung melden sich die Erpresser erneut über das Tor-Portal: „Wir sind noch in eurem Netz. Für die übrigen Schlüssel und die Löschung eurer Daten will die Gruppe weitere 500.000 €. Ihr habt 12 Stunden.“ Die Forensik kann nicht ausschließen, dass sie noch Zugang haben. Du entscheidest selbst, wie du mit dieser Information umgehst.

> **Vertraulich SK17 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 59,0): Ein Beiratsmitglied ruft dich am Donnerstagmorgen unmittelbar vor der Sondersitzung privat an: „Wenn wir heute keine belastbaren Zahlen und keinen Plan sehen, stelle ich die Führungsfrage.“ Niemand sonst weiß von diesem Anruf.

> **Vertraulich SK47 an Kaufmännische Leitung (CFO)** (Min. 59,0): Aus dem Kreis der Unternehmensführung kommt die Forderung, im Beiratsbericht nur den voraussichtlich versicherten Schaden zu nennen. Die noch nicht belastbar bezifferten Produktions- und Kundenverluste sollen vorerst nicht auftauchen: „Wir brauchen jetzt Vertrauen, keine Panik.“

#### Min. 66,0 · LK12 Teilweiser Wiederanlauf · Freitag 08:00 Uhr · Folgen

Werk Süd kann im eingeschränkten Notbetrieb wieder anlaufen: Die Produktionssysteme wurden isoliert neu aufgesetzt und unabhängig geprüft. Dieser Notbetrieb nutzt keine ungeprüften Sicherungsdaten; die Prüfung des ERP-Backups dauert weiterhin an. Aufträge und Rückmeldungen laufen vorerst über Papierlisten. Weil die Anlagen am Montag am Netz blieben, wurden zwei weitere Fräslinien verschlüsselt und müssen neu aufgesetzt werden. Der nach der Zahlung gelieferte Schlüssel entschlüsselt nur einen Teil der übrigen Systeme und ist sehr langsam. Niemand verlässt sich darauf – die Wiederherstellung der übrigen Systeme wartet weiter auf das geprüfte Backup.

*Krisen-Info:* Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt)

- Welche Produkte und Kunden haben Vorrang?
- Wer gibt die Produktion frei – und nach welchen Kriterien?
- Wie wird ohne ERP dokumentiert?
- Wer entscheidet, wenn Vertrieb und Produktion unterschiedliche Prioritäten wollen? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK44 an Geschäftsführung (CEO), Krisenstabsleitung:** Die Datenschutzaufsicht fragt nach: Wann hat NordTech von einer möglichen Datenverletzung erfahren, welche Prüfung wurde vorgenommen, und weshalb ist bislang keine Meldung erfolgt? Ob eine Pflichtverletzung vorliegt, muss fachlich geprüft werden.

> **Vertraulich SK29 an Kaufmännische Leitung (CFO)** (Min. 70,3): Die Hausbank meldet sich erneut: Wegen der Ausfälle will sie die Kreditlinie überprüfen und bittet bis Montag um eine Liquiditätsplanung für die nächsten acht Wochen – inklusive Annahmen zu Kundenzahlungen und Vertragsstrafen.

#### Min. 73,5 · LK15 Wiederanlauf · Sonntag 12:00 Uhr · Wiederanlauf

70 % der technischen Fertigungskapazität sind auf priorisierten Anlagen wieder verfügbar – in isolierten, geprüften Produktionsumgebungen mit Sicherheitsfreigabe. Nicht alle 900 IT- und OT-Systeme sind wiederhergestellt; der ERP-Produktivbetrieb sowie die Freigaben von Daten und Ware werden gesondert bewertet. Personal und Material begrenzen die reale Leistung: Nach den Krisentagen sind die Schichten erschöpft, und wegen Materialengpässen ist nicht sicher, dass die Kapazität durchgehend ausgelastet werden kann. Kunden und Presse beobachten die Situation weiterhin kritisch. Zusätzliche Wiederherstellungsteams haben bis Sonntag auch die am Montag zusätzlich verschlüsselten Linien wieder freigegeben – der Schaden vom Montag hat den Wiederanlauf verteuert, aber nicht dauerhaft verhindert. Zwei Großkunden kritisieren öffentlich, dass sie vom Angriff zuerst über Dritte statt von NordTech erfahren haben, und kündigen an, ihre Lieferantenstrategie zu überprüfen. In der Presse wird berichtet, dass NordTech Lösegeld gezahlt hat.

*Krisen-Info:* 70 % technische Kapazität auf priorisierten Anlagen · ERP-Produktivbetrieb und Freigaben offen

- Welche Botschaft senden Sie an Kunden, Beschäftigte und Öffentlichkeit – und wer sagt es?
- Welchen Kunden vertrösten Sie bewusst, obwohl technische Kapazität vorhanden ist – und wer sagt es ihm?
- Wann und von wem wird die Krisenorganisation beendet – und was bleibt bestehen? *(Schwerpunkt)*

> **Vertraulich SK33 an Unternehmenskommunikation & Marketing** (Min. 77,8): 70 % der technischen Fertigungskapazität sind inzwischen bestätigt. Materialengpässe, personelle Belastung und ausstehende Produktfreigaben begrenzen jedoch die tatsächliche Lieferfähigkeit, und offen ist weiterhin, ob Kundendaten abgeflossen sind. Die Geschäftsführung möchte öffentlich erklären: „Alles wieder im Griff.“ Wie formulierst du eine belastbare Botschaft?

#### Abschluss

Sonntag, nach sieben Tagen Unternehmenskrise. Die priorisierten Anlagen laufen wieder, 70 % der technischen Fertigungskapazität sind wiederhergestellt. ERP-Produktivbetrieb, Datenabgleich und Warenfreigaben sind noch nicht abgeschlossen. Materialengpässe und die Belastung der Beschäftigten begrenzen weiterhin die tatsächliche Leistung. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 4.260.000 € + aus Entscheidungen: Zwei zusätzlich verschlüsselte Fräslinien: Neuaufsetzen und längerer Stillstand (350.000 €); Zusätzliche Kundenabwanderung, weil Kunden zuerst von Dritten vom Angriff erfahren haben (600.000 €); Zusätzlicher Prüf- und Beratungsaufwand wegen Rückfragen der Aufsicht (Modellannahme, kein Bußgeld eingerechnet) (150.000 €); Lösegeldzahlung an die Erpresser (2.000.000 €) = **7.360.000 €**; Mögliche Erstattung durch die Cyberversicherung (optimistische Modellannahme, nicht bestätigt): − 1.400.000 € → **beim Unternehmen bleiben 5.960.000 €** (64 % des Jahresgewinns).

*Fazit auf der Bühne:* Die Systeme laufen nach sieben Tagen wieder. Das Vertrauen der Kunden braucht Monate. Eine Krise ist erst vorbei, wenn die Kunden uns wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das entscheiden dürfen?
- Wie kamen die Meldungen von Service-Desk, Kundenservice und Standorten beim Krisenstab an – und wie kamen Anweisungen und Sprachregelung zu ihnen zurück?
- Wer hätte früher eingebunden werden müssen?
- Welche Person oder Rolle war kritisch – und gab es eine Vertretung?
- Wo waren Single Points of Failure?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- „70 % technische Kapazität“ – wie viel davon war wirklich nutzbar, und was hat die reale Leistung begrenzt (Personal, Material, Freigaben)?
- Welche Kosten wären möglicherweise nicht von der Versicherung gedeckt – und wie verändert das den Liquiditätsbedarf?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?
- *(Schwerpunkt)* War jederzeit klar, wer entscheidet – und wer die Stellvertretung ist?
- *(Schwerpunkt)* Wo sind Entscheidungen hängen geblieben oder doppelt getroffen worden?

---

### Geschichte 4: 90 Minuten · IT-Sicherheit und Wiederanlauf · gemischt (trennen, Kunden abwarten, melden, gezahlt)

**Besetzte Rollen (9):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (CIO), Leitung Produktion (Werksleitung), Geschäftsführung Vertrieb, stellv. Krisenstabsleitung, Kaufmännische Leitung (CFO), Leitung Qualitätsmanagement, Notfallmanagement / BCM, Unternehmenskommunikation & Marketing, IT-Service-Desk (technischer Support)  
**Geplante Krisenzeit:** 81 Min. + ca. 9 Min. Abschluss · Entscheidungszeit je Lage ca. 2,5 Min.
  
**Leitfrage des Schwerpunkts (für die Moderation):** Was ist technisch bereit, was ist sicher, was ist fachlich freigegeben?

#### Min. 0,0 · LK18 Anmeldung hakt · Montag 06:41 Uhr · Vorboten

Mehrere Kolleginnen und Kollegen der Frühschicht kommen nicht ins ERP. Die Anmeldung bricht mit einer Zeitüberschreitung ab, ein Neustart hilft nicht. Der IT-Service-Desk ist erst ab 07:00 Uhr besetzt.

- Was ist Ihre erste Reaktion – und wen informieren Sie?
- Welche Information würde Sie veranlassen, jetzt den IT-Notfallprozess auszulösen?
- Welche technischen Sofortmaßnahmen sind jetzt richtig – und welche zerstören Spuren? *(Schwerpunkt)*

#### Min. 3,0 · LK19 Maschine 4 verhält sich seltsam · Montag 06:48 Uhr · Vorboten

An der Fräslinie 4 laufen die Programme nicht an. Im Programmverzeichnis haben alle Dateien plötzlich eine fremde Endung: .shadowvault. Die Schichtleitung startet das Bedienterminal neu und ruft die Instandhaltung.

- Wer muss jetzt informiert werden?
- Würden Sie die Linie bereits stoppen, bevor ein Angriff bestätigt ist?

#### Min. 6,0 · LK01 Cyberangriff · Montag 07:00 Uhr · Ausbruch

Jetzt geht nichts mehr. Die Frühschicht meldet: ERP, Fileserver, Zeiterfassung und E-Mail sind ausgefallen. Auf immer mehr Bildschirmen erscheint eine Lösegeldforderung. Die Produktion kann keine neuen Fertigungsaufträge abrufen.

*Krisen-Info:* Lösegeldforderung: 2.000.000 € · Frist: 48 Stunden

- Welche Auswirkungen hat dies auf Ihren Bereich?
- Welche Sofortmaßnahmen leiten Sie ein?
- Welche Entscheidungen benötigt der Krisenstab?
- Welche Anweisung bekommen jetzt alle Beschäftigten – und über wen läuft sie?
- Was wird jetzt vom Netz genommen, was bleibt an – und wer entscheidet das? *(Schwerpunkt)*

> **Vertraulich SK34 an IT-Service-Desk (technischer Support)** (Min. 9,6): Seit Beginn der Störung gehen beim IT-Service-Desk im Minutentakt Anrufe und Meldungen ein, der Rückstau wächst schnell. Die Beschäftigten fragen: Darf ich meinen Rechner weiter nutzen? Soll ich das Netzwerkkabel ziehen? Eine abgestimmte Anweisung fehlt noch – im Team antwortet jeder etwas anderes.

> **Vertraulich SK40 an Leitung Produktion (Werksleitung)** (Min. 11,0): Die Schichtleitungen der drei Standorte rufen dich gleichzeitig an: Sollen die laufenden Aufträge zu Ende gefahren oder die Anlagen sofort gestoppt werden? An Fräslinie 4 sind die Programme verschlüsselt, an den anderen Linien läuft noch alles. Ein Automobilkunde erwartet heute Nachmittag eine Just-in-time-Lieferung. Wie weist du die Schichtleitungen an, bis der Krisenstab entschieden hat?

#### Min. 13,5 · LK16 OT-Trennung · Montag 08:00 Uhr · Ausbruch

Die IT empfiehlt, auch unbetroffene Produktionsanlagen (OT) vorsorglich vom Netz zu nehmen, um eine Ausbreitung zu verhindern – das würde auch noch laufende, bislang unbetroffene Fertigungsaufträge stoppen.

*Krisen-Info:* Betrifft auch aktuell noch laufende, unbetroffene Anlagen

- Tragen Sie die vorsorgliche Trennung mit?
- Welche Aufträge wären zusätzlich betroffen?
- Wer entscheidet, wenn IT und Geschäftsführung unterschiedlicher Meinung sind?

**Entscheidung W1 (am Ende dieser Lage):** Bleiben die übrigen Anlagen am Netz, bis die laufenden Aufträge fertig sind – oder werden sie sofort getrennt?  
→ Der Tisch entscheidet: **Übrige Anlagen kontrolliert in einen sicheren Zustand fahren und ihre Verbindungen zum IT-Netz gezielt trennen, laufende Aufträge geordnet abbrechen**  
*Folge laut Drehbuch:* Laufende Aufträge brechen ab, aber keine Anlage wird zusätzlich befallen. Werk Süd startet wie geplant.

#### Min. 21,0 · LK02 Produktion stoppt · Montag 09:00 Uhr · Ausbruch

Die Produktionsleitung meldet: Neue Fertigungsaufträge können nicht gestartet werden. Laufende Aufträge enden in den nächsten Stunden. Ohne Gegenmaßnahmen kommt die Fertigung an allen drei Standorten zum Stillstand.

*Krisen-Info:* Fertigwaren reichen für Lieferungen noch ca. 48 Stunden

- Welche Folgen erwarten Sie?
- Welche Kunden sind betroffen?
- Welche Prioritäten setzen Sie?
- Welche Anlagen dürfen ohne Netz weiterlaufen, und wie wird das abgesichert? *(Schwerpunkt)*

> **Vertraulich SK21 an Notfallmanagement / BCM** (Min. 25,3): Es besteht der Verdacht, dass NordTech neben dem Datenschutz weiteren gesetzlichen Meldepflichten unterliegt (z. B. als Einrichtung nach NIS2 an das BSI) – mit Fristen ab Kenntnis des Vorfalls. Betroffenheit, zuständige Stellen und Fristen sind umgehend fachlich prüfen zu lassen.

#### Min. 28,5 · LK22 Kommunikation ohne IT · Montag 10:00 Uhr · Ausbruch

E-Mail, ERP und Teile der Telefonie sind nicht verfügbar. Gleichzeitig müssen 620 Beschäftigte an drei Standorten Anweisungen erhalten. Einige arbeiten weiter, andere haben ihre Geräte ausgeschaltet. Es gibt keine einheitliche Information.

*Krisen-Info:* 620 Beschäftigte · 3 Standorte · 3 Schichten · keine E-Mail

- Welchen unabhängigen Kanal nutzen Sie?
- Wer gibt die Nachricht frei?
- Wie stellen Sie sicher, dass jede Schicht und jeder Standort erreicht wird?
- Welche Kommunikationswege sind sicher, auch wenn der Angreifer noch im Netz sein könnte? *(Schwerpunkt)*

> **Vertraulich SK01 an IT-Leitung (CIO)** (Min. 32,8): Ein externer Dienstleister informiert dich: Die Backups könnten ebenfalls kompromittiert sein. Aktuell ist das nicht bestätigt. Du entscheidest selbst, wie du mit dieser Information umgehst.

**Entscheidung W2 (am Ende dieser Lage):** Informiert NordTech heute auch die Kunden proaktiv – oder erst, wenn die Lage klarer ist?  
→ Der Tisch entscheidet: **Erst informieren, wenn die Lage klar ist**  
*Folge laut Drehbuch:* Der größte Automobilkunde erfährt es über Dritte (vertrauliche Karte an den Vertrieb bei „Datenschutz“); beim Wiederanlauf öffentliche Kritik; Zusatzposten Kundenabwanderung.

#### Min. 36,0 · LK07 Datenschutz · Dienstag 13:00 Uhr · Eskalation

Es gibt Hinweise auf einen möglichen Abfluss personenbezogener und geschäftskritischer Daten. Welche Melde-, Informations- und Dokumentationspflichten bestehen, ist unverzüglich fachlich prüfen zu lassen.

*Krisen-Info:* Mögliche Meldefristen laufen bereits (z. B. Datenschutz: 72 Stunden) – fachlich prüfen lassen

- Welche Informationen liegen vor – und welche fehlen?
- Wer prüft die Meldepflichten, und bis wann?
- Wer übernimmt die Kommunikation?
- Welche Logs und Spuren müssen gesichert werden, bevor Systeme neu aufgesetzt werden? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK43 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung:** Der Einkaufsleiter eures größten Automobilkunden ruft an: Er hat über Dritte vom Cyberangriff erfahren, nicht von euch. Er verlangt bis heute Abend ein Gespräch mit der Geschäftsführung und eine schriftliche Lageinformation.

> **Vertraulich SK46 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung** (Min. 39,3): Ein großer Automobilkunde bietet an, eigene IT-Spezialisten zur Unterstützung zu schicken. Voraussetzung: Sie bekommen kurzfristig Einblick in eure Systeme und in den Sicherheitsvorfall. Der Kunde verlangt noch heute eine Entscheidung.

> **Vertraulich SK41 an Leitung Qualitätsmanagement** (Min. 40,3): Seit Beginn des IT-Ausfalls werden die Messprotokolle für Pharma-Komponenten nicht mehr elektronisch übertragen. Die Fertigung dokumentiert auf Papier. Der Vertrieb möchte vorhandene Ware trotzdem ausliefern, weil der Kunde drängt. Welche Nachweise verlangst du vor einer Freigabe?

> **Vertraulich SK20 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 41,3): Die Frist der Erpresser endet am Mittwoch um 07:00 Uhr. Ein Beiratsmitglied fragt dich vorab, welche Haltung die Geschäftsführung zur Lösegeldforderung einnimmt: „Unter welchen Bedingungen würden Sie eine Zahlung überhaupt in Betracht ziehen?“ Die Finanzleitung rechnet vor: Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, und ein Backup ist bisher nicht gefunden. Euer Anwalt rät: Eine etwaige Zahlung erfordert vorher eine fachliche Prüfung der rechtlichen, wirtschaftlichen und sicherheitsbezogenen Risiken – unter anderem, ob die Gruppierung hinter SHADOWVAULT Sanktionen unterliegt. Bereite deine Position für den Krisenstab vor.

**Entscheidung W3 (am Ende dieser Lage):** Meldet NordTech den möglichen Datenabfluss vorsorglich an die Datenschutzaufsicht – oder wartet sie die Bestätigung ab?  
→ Der Tisch entscheidet: **Vorsorglich melden, Informationen nachreichen**  
*Folge laut Drehbuch:* Der Beirat vermerkt das frühe, dokumentierte Vorgehen positiv.

**Entscheidung W4 (am Ende dieser Lage):** Die Erpresserfrist endet morgen, Mittwoch 07:00 Uhr. Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, ein Backup ist bisher nicht gefunden. Niemand weiß, ob ein Schlüssel funktionieren würde oder wie schnell ein unabhängiger Wiederanlauf gelingt. Welche wirtschaftlichen und betrieblichen Gründe sprechen unter diesen Unsicherheiten für oder gegen eine Zahlung – und wie entscheidet NordTech?  
→ Der Tisch entscheidet: **Lösegeld gezahlt**  
*Folge laut Drehbuch:* Der gelieferte Schlüssel hilft nur teilweise, die Erpresser fordern danach mehr (vertrauliche Karte an die IT mit „Beirat fordert Lagebericht“), die Zahlung wird öffentlich. Lösegeld steht in der Rechnung.

#### Min. 43,5 · LK09 Backups gefunden · Mittwoch 11:00 Uhr · Eskalation

Im Tresor des Hauptsitzes wurden Offline-Backups gefunden, Stand: Samstag 23:00 Uhr. Der Sicherungsdatenträger ist lesbar. Die Zugangsdaten zur Sicherungssoftware lagen im versiegelten IT-Notfallumschlag – ohne ihn wäre ohne den erkrankten Administrator niemand an die Daten gekommen. Integrität, Schadcodefreiheit und Vollständigkeit der Daten sind noch nicht bestätigt.

*Krisen-Info:* Datenverlust: rund 32 Stunden (Sonntag bis Montagfrüh)

- Wiederherstellung vorbereiten – oder erst weiter prüfen?
- Welche Risiken bestehen, und wer gibt frei?
- Was bedeutet der Datenverlust für Ihren Bereich?
- Welche Prüfschritte braucht das Backup, bevor irgendetwas daraus produktiv wird? *(Schwerpunkt)*

> **Vertraulich SK19 an IT-Leitung (CIO)** (Min. 47,8): Die Forensiker warnen davor, betroffene Systeme oder Daten aus ungeprüften Backups produktiv wiederherzustellen – die Prüfung des Backups dauert mindestens zwei Tage. Eine isolierte Neuinstallation unabhängig von diesen Sicherungen kann nach gesonderter Sicherheitsprüfung freigegeben werden. Gleichzeitig steigt der Druck aus den Fachbereichen. Wie gehst du damit um?

#### Min. 51,0 · LK24 Wer bekommt das erste System? · Mittwoch 15:00 Uhr · Eskalation

Die IT hat eine vom betroffenen Unternehmensnetz getrennte Umgebung für die Vorbereitung und Prüfung der Wiederherstellung aufgebaut. Rechenleistung, Fachpersonal und Zeit reichen zunächst nur für einen größeren Geschäftsprozess. Der Vertrieb fordert Zugriff auf Kundenaufträge, die Produktion auf Fertigungsinformationen, die Finanzleitung auf offene Forderungen. Das am Vormittag gefundene Offline-Backup ist lesbar, aber noch nicht abschließend auf Integrität, Vollständigkeit und Schadcode geprüft – ein produktiver Wiederanlauf daraus ist nicht freigegeben.

*Krisen-Info:* Nur ein Geschäftsprozess kann zunächst vorbereitet werden · Backup-Prüfung läuft · keine Produktivfreigabe

- Welchen Geschäftsprozess bereiten Sie zuerst vor – nach welchen unternehmensweiten Kriterien?
- Welche Abhängigkeiten bestehen zwischen Aufträgen, Material, Fertigung und Rechnungsstellung?
- Wie unterscheiden Sie technische Vorbereitung, Sicherheitstest und fachliche Freigabe?
- Wer dokumentiert die Priorisierung und informiert die zurückgestellten Bereiche?

> **Vertraulich SK02 an IT-Leitung (CIO) (statt IT-Fachkraft (Vertretung IT-Leitung))** (Min. 55,3): Du bist für das gefundene Offline-Backup zuständig. Einspielen darfst du es nur in eine isolierte Prüfumgebung, und die steht noch nicht vollständig. Ein Fachbereichsleiter bittet dich, „nur schnell“ die Auftragsdaten auf einen Laptop im Produktionsnetz zu kopieren, damit der Vertrieb wieder arbeiten kann. Du entscheidest selbst über das weitere Vorgehen.

#### Min. 58,5 · LK17 Beirat fordert Lagebericht · Donnerstag 07:00 Uhr · Höhepunkt

Der Beirat hat für heute Vormittag eine Sondersitzung einberufen. Er erwartet in 30 Minuten einen Lagebericht: Schadenshöhe, Wiederanlaufprognose, Kommunikationsstrategie – und die Frage, ob das Management die Lage im Griff hat. Positiv vermerkt der Beirat: NordTech hat die mögliche Datenverletzung frühzeitig adressiert und eine vorsorgliche Meldung mit dokumentierter fachlicher Bewertung veranlasst.

*Krisen-Info:* Sondersitzung in 30 Minuten · alle Bereiche müssen zuliefern

- Was meldet Ihr Bereich in höchstens drei Sätzen?
- Welche Zahl können Sie belastbar nennen – und welche nicht?
- Wer trägt vor, und was sagen Sie bewusst nicht?
- Welche Wiederanlauf-Prognose kann die IT belastbar nennen – und welche nicht? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK27 an IT-Leitung (CIO):** Trotz der Zahlung melden sich die Erpresser erneut über das Tor-Portal: „Wir sind noch in eurem Netz. Für die übrigen Schlüssel und die Löschung eurer Daten will die Gruppe weitere 500.000 €. Ihr habt 12 Stunden.“ Die Forensik kann nicht ausschließen, dass sie noch Zugang haben. Du entscheidest selbst, wie du mit dieser Information umgehst.

> **Vertraulich SK17 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 59,0): Ein Beiratsmitglied ruft dich am Donnerstagmorgen unmittelbar vor der Sondersitzung privat an: „Wenn wir heute keine belastbaren Zahlen und keinen Plan sehen, stelle ich die Führungsfrage.“ Niemand sonst weiß von diesem Anruf.

> **Vertraulich SK47 an Kaufmännische Leitung (CFO)** (Min. 59,0): Aus dem Kreis der Unternehmensführung kommt die Forderung, im Beiratsbericht nur den voraussichtlich versicherten Schaden zu nennen. Die noch nicht belastbar bezifferten Produktions- und Kundenverluste sollen vorerst nicht auftauchen: „Wir brauchen jetzt Vertrauen, keine Panik.“

#### Min. 66,0 · LK12 Teilweiser Wiederanlauf · Freitag 08:00 Uhr · Folgen

Werk Süd kann im eingeschränkten Notbetrieb wieder anlaufen: Die Produktionssysteme wurden isoliert neu aufgesetzt und unabhängig geprüft. Dieser Notbetrieb nutzt keine ungeprüften Sicherungsdaten; die Prüfung des ERP-Backups dauert weiterhin an. Aufträge und Rückmeldungen laufen vorerst über Papierlisten. Die frühe Trennung vom Netz hat sich ausgezahlt: Keine Fertigungsanlage wurde zusätzlich verschlüsselt. Der nach der Zahlung gelieferte Schlüssel entschlüsselt nur einen Teil der übrigen Systeme und ist sehr langsam. Niemand verlässt sich darauf – die Wiederherstellung der übrigen Systeme wartet weiter auf das geprüfte Backup.

*Krisen-Info:* Kapazität: 30 %

- Welche Produkte und Kunden haben Vorrang?
- Wer gibt die Produktion frei – und nach welchen Kriterien?
- Wie wird ohne ERP dokumentiert?
- Nach welchen Kriterien sind die Systeme in Werk Süd freigegeben – und von wem? *(Schwerpunkt)*

> **Vertraulich SK29 an Kaufmännische Leitung (CFO)** (Min. 70,3): Die Hausbank meldet sich erneut: Wegen der Ausfälle will sie die Kreditlinie überprüfen und bittet bis Montag um eine Liquiditätsplanung für die nächsten acht Wochen – inklusive Annahmen zu Kundenzahlungen und Vertragsstrafen.

#### Min. 73,5 · LK15 Wiederanlauf · Sonntag 12:00 Uhr · Wiederanlauf

70 % der technischen Fertigungskapazität sind auf priorisierten Anlagen wieder verfügbar – in isolierten, geprüften Produktionsumgebungen mit Sicherheitsfreigabe. Nicht alle 900 IT- und OT-Systeme sind wiederhergestellt; der ERP-Produktivbetrieb sowie die Freigaben von Daten und Ware werden gesondert bewertet. Personal und Material begrenzen die reale Leistung: Nach den Krisentagen sind die Schichten erschöpft, und wegen Materialengpässen ist nicht sicher, dass die Kapazität durchgehend ausgelastet werden kann. Kunden und Presse beobachten die Situation weiterhin kritisch. Zwei Großkunden kritisieren öffentlich, dass sie vom Angriff zuerst über Dritte statt von NordTech erfahren haben, und kündigen an, ihre Lieferantenstrategie zu überprüfen. In der Presse wird berichtet, dass NordTech Lösegeld gezahlt hat.

*Krisen-Info:* 70 % technische Kapazität auf priorisierten Anlagen · ERP-Produktivbetrieb und Freigaben offen

- Welche Botschaft senden Sie an Kunden, Beschäftigte und Öffentlichkeit – und wer sagt es?
- Welchen Kunden vertrösten Sie bewusst, obwohl technische Kapazität vorhanden ist – und wer sagt es ihm?
- Was läuft produktiv, was noch im Test – und wie merken Sie, wenn der Angreifer zurückkommt? *(Schwerpunkt)*

> **Vertraulich SK33 an Unternehmenskommunikation & Marketing** (Min. 77,8): 70 % der technischen Fertigungskapazität sind inzwischen bestätigt. Materialengpässe, personelle Belastung und ausstehende Produktfreigaben begrenzen jedoch die tatsächliche Lieferfähigkeit, und offen ist weiterhin, ob Kundendaten abgeflossen sind. Die Geschäftsführung möchte öffentlich erklären: „Alles wieder im Griff.“ Wie formulierst du eine belastbare Botschaft?

#### Abschluss

Sonntag, nach sieben Tagen Unternehmenskrise. Die priorisierten Anlagen laufen wieder, 70 % der technischen Fertigungskapazität sind wiederhergestellt. ERP-Produktivbetrieb, Datenabgleich und Warenfreigaben sind noch nicht abgeschlossen. Materialengpässe und die Belastung der Beschäftigten begrenzen weiterhin die tatsächliche Leistung. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 4.260.000 € + aus Entscheidungen: Zusätzliche Kundenabwanderung, weil Kunden zuerst von Dritten vom Angriff erfahren haben (600.000 €); Lösegeldzahlung an die Erpresser (2.000.000 €) = **6.860.000 €**; Mögliche Erstattung durch die Cyberversicherung (optimistische Modellannahme, nicht bestätigt): − 1.400.000 € → **beim Unternehmen bleiben 5.460.000 €** (59 % des Jahresgewinns).

*Fazit auf der Bühne:* Die Systeme laufen nach sieben Tagen wieder. Das Vertrauen der Kunden braucht Monate. Eine Krise ist erst vorbei, wenn die Kunden uns wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das entscheiden dürfen?
- Wie kamen die Meldungen von Service-Desk, Kundenservice und Standorten beim Krisenstab an – und wie kamen Anweisungen und Sprachregelung zu ihnen zurück?
- Wer hätte früher eingebunden werden müssen?
- Welche Person oder Rolle war kritisch – und gab es eine Vertretung?
- Wo waren Single Points of Failure?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- „70 % technische Kapazität“ – wie viel davon war wirklich nutzbar, und was hat die reale Leistung begrenzt (Personal, Material, Freigaben)?
- Welche Kosten wären möglicherweise nicht von der Versicherung gedeckt – und wie verändert das den Liquiditätsbedarf?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?
- *(Schwerpunkt)* Wo lagen technische Bereitstellung, Sicherheitsfreigabe und fachliche Freigabe zu dicht beieinander?
- *(Schwerpunkt)* Welche Daten waren am Ende wirklich belastbar – und woher wusstet ihr das?

---

### Geschichte 5: 90 Minuten · Produktion und Qualitätsmanagement · alle Entscheidungen riskant

**Besetzte Rollen (9):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (CIO), Leitung Produktion (Werksleitung), Geschäftsführung Vertrieb, stellv. Krisenstabsleitung, Kaufmännische Leitung (CFO), Leitung Qualitätsmanagement, Notfallmanagement / BCM, Unternehmenskommunikation & Marketing, IT-Service-Desk (technischer Support)  
**Geplante Krisenzeit:** 81 Min. + ca. 9 Min. Abschluss · Entscheidungszeit je Lage ca. 2,5 Min.
  
**Leitfrage des Schwerpunkts (für die Moderation):** Was können wir sicher fertigen und ausliefern – mit welchen Nachweisen?

#### Min. 0,0 · LK18 Anmeldung hakt · Montag 06:41 Uhr · Vorboten

Mehrere Kolleginnen und Kollegen der Frühschicht kommen nicht ins ERP. Die Anmeldung bricht mit einer Zeitüberschreitung ab, ein Neustart hilft nicht. Der IT-Service-Desk ist erst ab 07:00 Uhr besetzt.

- Was ist Ihre erste Reaktion – und wen informieren Sie?
- Welche Information würde Sie veranlassen, jetzt den IT-Notfallprozess auszulösen?
- Was bedeutet ein ERP-Ausfall für die laufende Schicht? *(Schwerpunkt)*

#### Min. 3,0 · LK19 Maschine 4 verhält sich seltsam · Montag 06:48 Uhr · Vorboten

An der Fräslinie 4 laufen die Programme nicht an. Im Programmverzeichnis haben alle Dateien plötzlich eine fremde Endung: .shadowvault. Die Schichtleitung startet das Bedienterminal neu und ruft die Instandhaltung.

- Wer muss jetzt informiert werden?
- Würden Sie die Linie bereits stoppen, bevor ein Angriff bestätigt ist?

#### Min. 6,0 · LK01 Cyberangriff · Montag 07:00 Uhr · Ausbruch

Jetzt geht nichts mehr. Die Frühschicht meldet: ERP, Fileserver, Zeiterfassung und E-Mail sind ausgefallen. Auf immer mehr Bildschirmen erscheint eine Lösegeldforderung. Die Produktion kann keine neuen Fertigungsaufträge abrufen.

*Krisen-Info:* Lösegeldforderung: 2.000.000 € · Frist: 48 Stunden

- Welche Auswirkungen hat dies auf Ihren Bereich?
- Welche Sofortmaßnahmen leiten Sie ein?
- Welche Entscheidungen benötigt der Krisenstab?
- Welche Anweisung bekommen jetzt alle Beschäftigten – und über wen läuft sie?
- Welche Linien laufen weiter, welche werden kontrolliert gestoppt? *(Schwerpunkt)*

> **Vertraulich SK34 an IT-Service-Desk (technischer Support)** (Min. 9,6): Seit Beginn der Störung gehen beim IT-Service-Desk im Minutentakt Anrufe und Meldungen ein, der Rückstau wächst schnell. Die Beschäftigten fragen: Darf ich meinen Rechner weiter nutzen? Soll ich das Netzwerkkabel ziehen? Eine abgestimmte Anweisung fehlt noch – im Team antwortet jeder etwas anderes.

> **Vertraulich SK40 an Leitung Produktion (Werksleitung)** (Min. 11,0): Die Schichtleitungen der drei Standorte rufen dich gleichzeitig an: Sollen die laufenden Aufträge zu Ende gefahren oder die Anlagen sofort gestoppt werden? An Fräslinie 4 sind die Programme verschlüsselt, an den anderen Linien läuft noch alles. Ein Automobilkunde erwartet heute Nachmittag eine Just-in-time-Lieferung. Wie weist du die Schichtleitungen an, bis der Krisenstab entschieden hat?

#### Min. 13,5 · LK16 OT-Trennung · Montag 08:00 Uhr · Ausbruch

Die IT empfiehlt, auch unbetroffene Produktionsanlagen (OT) vorsorglich vom Netz zu nehmen, um eine Ausbreitung zu verhindern – das würde auch noch laufende, bislang unbetroffene Fertigungsaufträge stoppen.

*Krisen-Info:* Betrifft auch aktuell noch laufende, unbetroffene Anlagen

- Tragen Sie die vorsorgliche Trennung mit?
- Welche Aufträge wären zusätzlich betroffen?
- Wer entscheidet, wenn IT und Geschäftsführung unterschiedlicher Meinung sind?

**Entscheidung W1 (am Ende dieser Lage):** Bleiben die übrigen Anlagen am Netz, bis die laufenden Aufträge fertig sind – oder werden sie sofort getrennt?  
→ Der Tisch entscheidet: **Anlagen bleiben am Netz, Aufträge werden fertiggestellt**  
*Folge laut Drehbuch:* Später sind zwei weitere Fräslinien verschlüsselt: Werk Süd startet mit 20 % statt 30 %; bis Sonntag holen zusätzliche Teams das auf. Zusatzposten in der Rechnung.

#### Min. 21,0 · LK02 Produktion stoppt · Montag 09:00 Uhr · Ausbruch

Die Produktionsleitung meldet: Neue Fertigungsaufträge können nicht gestartet werden. Laufende Aufträge enden in den nächsten Stunden. Ohne Gegenmaßnahmen kommt die Fertigung an allen drei Standorten zum Stillstand.

*Krisen-Info:* Fertigwaren reichen für Lieferungen noch ca. 48 Stunden

- Welche Folgen erwarten Sie?
- Welche Kunden sind betroffen?
- Welche Prioritäten setzen Sie?
- Welche Aufträge haben Vorrang – und reichen Material und Personal dafür? *(Schwerpunkt)*

> **Vertraulich SK45 an Leitung Produktion (Werksleitung) (statt Standortleitung Werk Süd)** (Min. 24,6): Ein Schichtleiter erklärt dir vertraulich, dass er einige Anlagen auch ohne zentrale IT weiterbetreiben könnte, und möchte die Produktion eigenständig fortsetzen. Eine technische Sicherheitsfreigabe gibt es nicht. Er bittet dich, diese Möglichkeit zunächst nicht an den Krisenstab weiterzugeben.

> **Vertraulich SK21 an Notfallmanagement / BCM** (Min. 26,0): Es besteht der Verdacht, dass NordTech neben dem Datenschutz weiteren gesetzlichen Meldepflichten unterliegt (z. B. als Einrichtung nach NIS2 an das BSI) – mit Fristen ab Kenntnis des Vorfalls. Betroffenheit, zuständige Stellen und Fristen sind umgehend fachlich prüfen zu lassen.

#### Min. 28,5 · LK22 Kommunikation ohne IT · Montag 10:00 Uhr · Ausbruch

E-Mail, ERP und Teile der Telefonie sind nicht verfügbar. Gleichzeitig müssen 620 Beschäftigte an drei Standorten Anweisungen erhalten. Einige arbeiten weiter, andere haben ihre Geräte ausgeschaltet. Es gibt keine einheitliche Information.

*Krisen-Info:* 620 Beschäftigte · 3 Standorte · 3 Schichten · keine E-Mail

- Welchen unabhängigen Kanal nutzen Sie?
- Wer gibt die Nachricht frei?
- Wie stellen Sie sicher, dass jede Schicht und jeder Standort erreicht wird?
- Wie erreichen Anweisungen jede Schicht und jede Linie, auch ohne E-Mail? *(Schwerpunkt)*

> **Vertraulich SK01 an IT-Leitung (CIO)** (Min. 32,8): Ein externer Dienstleister informiert dich: Die Backups könnten ebenfalls kompromittiert sein. Aktuell ist das nicht bestätigt. Du entscheidest selbst, wie du mit dieser Information umgehst.

**Entscheidung W2 (am Ende dieser Lage):** Informiert NordTech heute auch die Kunden proaktiv – oder erst, wenn die Lage klarer ist?  
→ Der Tisch entscheidet: **Erst informieren, wenn die Lage klar ist**  
*Folge laut Drehbuch:* Der größte Automobilkunde erfährt es über Dritte (vertrauliche Karte an den Vertrieb bei „Datenschutz“); beim Wiederanlauf öffentliche Kritik; Zusatzposten Kundenabwanderung.

#### Min. 36,0 · LK07 Datenschutz · Dienstag 13:00 Uhr · Eskalation

Es gibt Hinweise auf einen möglichen Abfluss personenbezogener und geschäftskritischer Daten. Welche Melde-, Informations- und Dokumentationspflichten bestehen, ist unverzüglich fachlich prüfen zu lassen.

*Krisen-Info:* Mögliche Meldefristen laufen bereits (z. B. Datenschutz: 72 Stunden) – fachlich prüfen lassen

- Welche Informationen liegen vor – und welche fehlen?
- Wer prüft die Meldepflichten, und bis wann?
- Wer übernimmt die Kommunikation?
- Welche Produktions- und Prüfdaten könnten betroffen sein – und was heißt das für Kunden? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK43 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung:** Der Einkaufsleiter eures größten Automobilkunden ruft an: Er hat über Dritte vom Cyberangriff erfahren, nicht von euch. Er verlangt bis heute Abend ein Gespräch mit der Geschäftsführung und eine schriftliche Lageinformation.

> **Vertraulich SK22 an Kaufmännische Leitung (CFO)** (Min. 39,3): Die Cyberversicherung meldet sich und weist auf mögliche Einschränkungen bei der Kostenerstattung hin: Kosten für Dienstleister außerhalb ihres Partnernetzwerks (Forensik, Anwalt, Krisenkommunikation) werden nach den Vertragsbedingungen möglicherweise nicht oder nur teilweise erstattet. Wer schon andere beauftragt hat, sollte das umgehend klären.

> **Vertraulich SK41 an Leitung Qualitätsmanagement** (Min. 40,3): Seit Beginn des IT-Ausfalls werden die Messprotokolle für Pharma-Komponenten nicht mehr elektronisch übertragen. Die Fertigung dokumentiert auf Papier. Der Vertrieb möchte vorhandene Ware trotzdem ausliefern, weil der Kunde drängt. Welche Nachweise verlangst du vor einer Freigabe?

> **Vertraulich SK20 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 41,3): Die Frist der Erpresser endet am Mittwoch um 07:00 Uhr. Ein Beiratsmitglied fragt dich vorab, welche Haltung die Geschäftsführung zur Lösegeldforderung einnimmt: „Unter welchen Bedingungen würden Sie eine Zahlung überhaupt in Betracht ziehen?“ Die Finanzleitung rechnet vor: Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, und ein Backup ist bisher nicht gefunden. Euer Anwalt rät: Eine etwaige Zahlung erfordert vorher eine fachliche Prüfung der rechtlichen, wirtschaftlichen und sicherheitsbezogenen Risiken – unter anderem, ob die Gruppierung hinter SHADOWVAULT Sanktionen unterliegt. Bereite deine Position für den Krisenstab vor.

**Entscheidung W3 (am Ende dieser Lage):** Meldet NordTech den möglichen Datenabfluss vorsorglich an die Datenschutzaufsicht – oder wartet sie die Bestätigung ab?  
→ Der Tisch entscheidet: **Abwarten, bis der Abfluss bestätigt ist**  
*Folge laut Drehbuch:* Kritische Nachfrage im Beirat; später fragt die Aufsicht nach dem Ablauf (vertrauliche Karte an die Geschäftsführung); zusätzlicher Prüf- und Beratungsaufwand als Modellannahme in der Rechnung.

**Entscheidung W4 (am Ende dieser Lage):** Die Erpresserfrist endet morgen, Mittwoch 07:00 Uhr. Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, ein Backup ist bisher nicht gefunden. Niemand weiß, ob ein Schlüssel funktionieren würde oder wie schnell ein unabhängiger Wiederanlauf gelingt. Welche wirtschaftlichen und betrieblichen Gründe sprechen unter diesen Unsicherheiten für oder gegen eine Zahlung – und wie entscheidet NordTech?  
→ Der Tisch entscheidet: **Lösegeld gezahlt**  
*Folge laut Drehbuch:* Der gelieferte Schlüssel hilft nur teilweise, die Erpresser fordern danach mehr (vertrauliche Karte an die IT mit „Beirat fordert Lagebericht“), die Zahlung wird öffentlich. Lösegeld steht in der Rechnung.

#### Min. 43,5 · LK09 Backups gefunden · Mittwoch 11:00 Uhr · Eskalation

Im Tresor des Hauptsitzes wurden Offline-Backups gefunden, Stand: Samstag 23:00 Uhr. Der Sicherungsdatenträger ist lesbar. Die Zugangsdaten zur Sicherungssoftware lagen im versiegelten IT-Notfallumschlag – ohne ihn wäre ohne den erkrankten Administrator niemand an die Daten gekommen. Integrität, Schadcodefreiheit und Vollständigkeit der Daten sind noch nicht bestätigt.

*Krisen-Info:* Datenverlust: rund 32 Stunden (Sonntag bis Montagfrüh)

- Wiederherstellung vorbereiten – oder erst weiter prüfen?
- Welche Risiken bestehen, und wer gibt frei?
- Was bedeutet der Datenverlust für Ihren Bereich?
- Welche Daten aus dem Backup braucht die Fertigung zuerst – und welche Lücken bleiben? *(Schwerpunkt)*

> **Vertraulich SK19 an IT-Leitung (CIO)** (Min. 47,8): Die Forensiker warnen davor, betroffene Systeme oder Daten aus ungeprüften Backups produktiv wiederherzustellen – die Prüfung des Backups dauert mindestens zwei Tage. Eine isolierte Neuinstallation unabhängig von diesen Sicherungen kann nach gesonderter Sicherheitsprüfung freigegeben werden. Gleichzeitig steigt der Druck aus den Fachbereichen. Wie gehst du damit um?

#### Min. 51,0 · LK17 Beirat fordert Lagebericht · Donnerstag 07:00 Uhr · Höhepunkt

Der Beirat hat für heute Vormittag eine Sondersitzung einberufen. Er erwartet in 30 Minuten einen Lagebericht: Schadenshöhe, Wiederanlaufprognose, Kommunikationsstrategie – und die Frage, ob das Management die Lage im Griff hat. Ein Beiratsmitglied will wissen, warum die Datenschutzaufsicht noch nicht informiert ist.

*Krisen-Info:* Sondersitzung in 30 Minuten · alle Bereiche müssen zuliefern

- Was meldet Ihr Bereich in höchstens drei Sätzen?
- Welche Zahl können Sie belastbar nennen – und welche nicht?
- Wer trägt vor, und was sagen Sie bewusst nicht?
- Welche Liefertermine kann die Produktion belastbar zusagen? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK27 an IT-Leitung (CIO):** Trotz der Zahlung melden sich die Erpresser erneut über das Tor-Portal: „Wir sind noch in eurem Netz. Für die übrigen Schlüssel und die Löschung eurer Daten will die Gruppe weitere 500.000 €. Ihr habt 12 Stunden.“ Die Forensik kann nicht ausschließen, dass sie noch Zugang haben. Du entscheidest selbst, wie du mit dieser Information umgehst.

> **Vertraulich SK17 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 51,5): Ein Beiratsmitglied ruft dich am Donnerstagmorgen unmittelbar vor der Sondersitzung privat an: „Wenn wir heute keine belastbaren Zahlen und keinen Plan sehen, stelle ich die Führungsfrage.“ Niemand sonst weiß von diesem Anruf.

#### Min. 58,5 · LK12 Teilweiser Wiederanlauf · Freitag 08:00 Uhr · Folgen

Werk Süd kann im eingeschränkten Notbetrieb wieder anlaufen: Die Produktionssysteme wurden isoliert neu aufgesetzt und unabhängig geprüft. Dieser Notbetrieb nutzt keine ungeprüften Sicherungsdaten; die Prüfung des ERP-Backups dauert weiterhin an. Aufträge und Rückmeldungen laufen vorerst über Papierlisten. Weil die Anlagen am Montag am Netz blieben, wurden zwei weitere Fräslinien verschlüsselt und müssen neu aufgesetzt werden. Der nach der Zahlung gelieferte Schlüssel entschlüsselt nur einen Teil der übrigen Systeme und ist sehr langsam. Niemand verlässt sich darauf – die Wiederherstellung der übrigen Systeme wartet weiter auf das geprüfte Backup.

*Krisen-Info:* Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt)

- Welche Produkte und Kunden haben Vorrang?
- Wer gibt die Produktion frei – und nach welchen Kriterien?
- Wie wird ohne ERP dokumentiert?
- Was wird in Werk Süd zuerst gefertigt – und wie wird ohne ERP dokumentiert und freigegeben? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK44 an Geschäftsführung (CEO), Krisenstabsleitung:** Die Datenschutzaufsicht fragt nach: Wann hat NordTech von einer möglichen Datenverletzung erfahren, welche Prüfung wurde vorgenommen, und weshalb ist bislang keine Meldung erfolgt? Ob eine Pflichtverletzung vorliegt, muss fachlich geprüft werden.

> **Vertraulich SK18 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung** (Min. 62,8): Ein Pharmakunde, der wegen der Lieferausfälle Schadensersatz prüft, bietet an, darauf zu verzichten. Voraussetzung: eine verbindliche Lieferzusage. Wie bewertest du die Situation?

#### Min. 66,0 · LK21 Chargenfreigabe · Freitag 16:00 Uhr · Folgen

Die Produktion ist teilweise wieder angelaufen. Für 260 Chargen für Pharmakunden fehlen durch den IT-Ausfall elektronische Produktions- und Prüfnachweise. Die Qualitätsleitung kann derzeit nicht bestätigen, welche Chargen freigegeben werden dürfen. Gleichzeitig fordert ein Pharmakunde eine verbindliche Lieferzusage.

*Krisen-Info:* 260 Chargen ohne vollständige Nachweise

- Wer darf welche Produkte freigeben?
- Wie wird die Nachdokumentation organisiert?
- Was sagt NordTech dem Kunden bis zur Freigabe?

#### Min. 73,5 · LK15 Wiederanlauf · Sonntag 12:00 Uhr · Wiederanlauf

70 % der technischen Fertigungskapazität sind auf priorisierten Anlagen wieder verfügbar – in isolierten, geprüften Produktionsumgebungen mit Sicherheitsfreigabe. Nicht alle 900 IT- und OT-Systeme sind wiederhergestellt; der ERP-Produktivbetrieb sowie die Freigaben von Daten und Ware werden gesondert bewertet. Personal und Material begrenzen die reale Leistung: Nach den Krisentagen sind die Schichten erschöpft, und wegen Materialengpässen ist nicht sicher, dass die Kapazität durchgehend ausgelastet werden kann. Kunden und Presse beobachten die Situation weiterhin kritisch. Zusätzliche Wiederherstellungsteams haben bis Sonntag auch die am Montag zusätzlich verschlüsselten Linien wieder freigegeben – der Schaden vom Montag hat den Wiederanlauf verteuert, aber nicht dauerhaft verhindert. Zwei Großkunden kritisieren öffentlich, dass sie vom Angriff zuerst über Dritte statt von NordTech erfahren haben, und kündigen an, ihre Lieferantenstrategie zu überprüfen. In der Presse wird berichtet, dass NordTech Lösegeld gezahlt hat.

*Krisen-Info:* 70 % technische Kapazität auf priorisierten Anlagen · ERP-Produktivbetrieb und Freigaben offen

- Welche Botschaft senden Sie an Kunden, Beschäftigte und Öffentlichkeit – und wer sagt es?
- Welchen Kunden vertrösten Sie bewusst, obwohl technische Kapazität vorhanden ist – und wer sagt es ihm?
- Was davon ist Anlagenverfügbarkeit, was ist durch Personal gedeckt – und was ist als Ware tatsächlich freigegeben? *(Schwerpunkt)*

> **Vertraulich SK33 an Unternehmenskommunikation & Marketing** (Min. 77,1): 70 % der technischen Fertigungskapazität sind inzwischen bestätigt. Materialengpässe, personelle Belastung und ausstehende Produktfreigaben begrenzen jedoch die tatsächliche Lieferfähigkeit, und offen ist weiterhin, ob Kundendaten abgeflossen sind. Die Geschäftsführung möchte öffentlich erklären: „Alles wieder im Griff.“ Wie formulierst du eine belastbare Botschaft?

> **Vertraulich SK42 an Leitung Produktion (Werksleitung)** (Min. 78,5): Für die nächste Erweiterung des Produktivbetriebs drängt die Produktion auf zusätzliche Systemfreigaben. Einzelne Tests sind abgeschlossen, die notwendigen Sicherheits- und Qualitätsfreigaben stehen aber noch aus. Ein wichtiger Kunde erwartet innerhalb von zwei Stunden eine Entscheidung.

#### Abschluss

Sonntag, nach sieben Tagen Unternehmenskrise. Die priorisierten Anlagen laufen wieder, 70 % der technischen Fertigungskapazität sind wiederhergestellt. ERP-Produktivbetrieb, Datenabgleich und Warenfreigaben sind noch nicht abgeschlossen. Materialengpässe und die Belastung der Beschäftigten begrenzen weiterhin die tatsächliche Leistung. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 4.260.000 € + aus Entscheidungen: Zwei zusätzlich verschlüsselte Fräslinien: Neuaufsetzen und längerer Stillstand (350.000 €); Zusätzliche Kundenabwanderung, weil Kunden zuerst von Dritten vom Angriff erfahren haben (600.000 €); Zusätzlicher Prüf- und Beratungsaufwand wegen Rückfragen der Aufsicht (Modellannahme, kein Bußgeld eingerechnet) (150.000 €); Lösegeldzahlung an die Erpresser (2.000.000 €) = **7.360.000 €**; Mögliche Erstattung durch die Cyberversicherung (optimistische Modellannahme, nicht bestätigt): − 1.400.000 € → **beim Unternehmen bleiben 5.960.000 €** (64 % des Jahresgewinns).

*Fazit auf der Bühne:* Die Systeme laufen nach sieben Tagen wieder. Das Vertrauen der Kunden braucht Monate. Eine Krise ist erst vorbei, wenn die Kunden uns wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das entscheiden dürfen?
- Wie kamen die Meldungen von Service-Desk, Kundenservice und Standorten beim Krisenstab an – und wie kamen Anweisungen und Sprachregelung zu ihnen zurück?
- Wer hätte früher eingebunden werden müssen?
- Welche Person oder Rolle war kritisch – und gab es eine Vertretung?
- Wo waren Single Points of Failure?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- „70 % technische Kapazität“ – wie viel davon war wirklich nutzbar, und was hat die reale Leistung begrenzt (Personal, Material, Freigaben)?
- Welche Kosten wären möglicherweise nicht von der Versicherung gedeckt – und wie verändert das den Liquiditätsbedarf?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?
- *(Schwerpunkt)* Wurde Ware freigegeben, ohne dass die Nachweise vollständig waren?
- *(Schwerpunkt)* Wie viel der technischen Kapazität war wirklich nutzbar – und was hat sie begrenzt?

---

### Geschichte 6: 90 Minuten · Kunden und Krisenkommunikation · gemischt (am Netz, Kunden proaktiv, Datenschutz abwarten, nicht gezahlt)

**Besetzte Rollen (9):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (CIO), Leitung Produktion (Werksleitung), Geschäftsführung Vertrieb, stellv. Krisenstabsleitung, Kaufmännische Leitung (CFO), Leitung Qualitätsmanagement, Notfallmanagement / BCM, Unternehmenskommunikation & Marketing, IT-Service-Desk (technischer Support)  
**Geplante Krisenzeit:** 81 Min. + ca. 9 Min. Abschluss · Entscheidungszeit je Lage ca. 2,5 Min.
  
**Leitfrage des Schwerpunkts (für die Moderation):** Wer erfährt was, wann, von wem – und passt das zusammen?

#### Min. 0,0 · LK18 Anmeldung hakt · Montag 06:41 Uhr · Vorboten

Mehrere Kolleginnen und Kollegen der Frühschicht kommen nicht ins ERP. Die Anmeldung bricht mit einer Zeitüberschreitung ab, ein Neustart hilft nicht. Der IT-Service-Desk ist erst ab 07:00 Uhr besetzt.

- Was ist Ihre erste Reaktion – und wen informieren Sie?
- Welche Information würde Sie veranlassen, jetzt den IT-Notfallprozess auszulösen?
- Ab wann müssten Kunden von einer Störung erfahren? *(Schwerpunkt)*

#### Min. 3,0 · LK19 Maschine 4 verhält sich seltsam · Montag 06:48 Uhr · Vorboten

An der Fräslinie 4 laufen die Programme nicht an. Im Programmverzeichnis haben alle Dateien plötzlich eine fremde Endung: .shadowvault. Die Schichtleitung startet das Bedienterminal neu und ruft die Instandhaltung.

- Wer muss jetzt informiert werden?
- Würden Sie die Linie bereits stoppen, bevor ein Angriff bestätigt ist?

#### Min. 6,0 · LK01 Cyberangriff · Montag 07:00 Uhr · Ausbruch

Jetzt geht nichts mehr. Die Frühschicht meldet: ERP, Fileserver, Zeiterfassung und E-Mail sind ausgefallen. Auf immer mehr Bildschirmen erscheint eine Lösegeldforderung. Die Produktion kann keine neuen Fertigungsaufträge abrufen.

*Krisen-Info:* Lösegeldforderung: 2.000.000 € · Frist: 48 Stunden

- Welche Auswirkungen hat dies auf Ihren Bereich?
- Welche Sofortmaßnahmen leiten Sie ein?
- Welche Entscheidungen benötigt der Krisenstab?
- Welche Anweisung bekommen jetzt alle Beschäftigten – und über wen läuft sie?
- Welche Kunden informieren Sie heute – mit welcher Botschaft? *(Schwerpunkt)*

> **Vertraulich SK34 an IT-Service-Desk (technischer Support)** (Min. 9,6): Seit Beginn der Störung gehen beim IT-Service-Desk im Minutentakt Anrufe und Meldungen ein, der Rückstau wächst schnell. Die Beschäftigten fragen: Darf ich meinen Rechner weiter nutzen? Soll ich das Netzwerkkabel ziehen? Eine abgestimmte Anweisung fehlt noch – im Team antwortet jeder etwas anderes.

> **Vertraulich SK40 an Leitung Produktion (Werksleitung)** (Min. 11,0): Die Schichtleitungen der drei Standorte rufen dich gleichzeitig an: Sollen die laufenden Aufträge zu Ende gefahren oder die Anlagen sofort gestoppt werden? An Fräslinie 4 sind die Programme verschlüsselt, an den anderen Linien läuft noch alles. Ein Automobilkunde erwartet heute Nachmittag eine Just-in-time-Lieferung. Wie weist du die Schichtleitungen an, bis der Krisenstab entschieden hat?

#### Min. 13,5 · LK02 Produktion stoppt · Montag 09:00 Uhr · Ausbruch

Die Produktionsleitung meldet: Neue Fertigungsaufträge können nicht gestartet werden. Laufende Aufträge enden in den nächsten Stunden. Ohne Gegenmaßnahmen kommt die Fertigung an allen drei Standorten zum Stillstand.

*Krisen-Info:* Fertigwaren reichen für Lieferungen noch ca. 48 Stunden

- Welche Folgen erwarten Sie?
- Welche Kunden sind betroffen?
- Welche Prioritäten setzen Sie?
- Welche Kunden sind zuerst betroffen, und wer ruft sie an? *(Schwerpunkt)*

> **Vertraulich SK21 an Notfallmanagement / BCM** (Min. 17,8): Es besteht der Verdacht, dass NordTech neben dem Datenschutz weiteren gesetzlichen Meldepflichten unterliegt (z. B. als Einrichtung nach NIS2 an das BSI) – mit Fristen ab Kenntnis des Vorfalls. Betroffenheit, zuständige Stellen und Fristen sind umgehend fachlich prüfen zu lassen.

**Entscheidung W1 (am Ende dieser Lage):** Bleiben die übrigen Anlagen am Netz, bis die laufenden Aufträge fertig sind – oder werden sie sofort getrennt?  
→ Der Tisch entscheidet: **Anlagen bleiben am Netz, Aufträge werden fertiggestellt**  
*Folge laut Drehbuch:* Später sind zwei weitere Fräslinien verschlüsselt: Werk Süd startet mit 20 % statt 30 %; bis Sonntag holen zusätzliche Teams das auf. Zusatzposten in der Rechnung.

#### Min. 21,0 · LK22 Kommunikation ohne IT · Montag 10:00 Uhr · Ausbruch

E-Mail, ERP und Teile der Telefonie sind nicht verfügbar. Gleichzeitig müssen 620 Beschäftigte an drei Standorten Anweisungen erhalten. Einige arbeiten weiter, andere haben ihre Geräte ausgeschaltet. Es gibt keine einheitliche Information.

*Krisen-Info:* 620 Beschäftigte · 3 Standorte · 3 Schichten · keine E-Mail

- Welchen unabhängigen Kanal nutzen Sie?
- Wer gibt die Nachricht frei?
- Wie stellen Sie sicher, dass jede Schicht und jeder Standort erreicht wird?
- Wer formuliert die Botschaft für Beschäftigte, Kunden und Presse – und wer gibt sie frei? *(Schwerpunkt)*

> **Vertraulich SK01 an IT-Leitung (CIO)** (Min. 25,3): Ein externer Dienstleister informiert dich: Die Backups könnten ebenfalls kompromittiert sein. Aktuell ist das nicht bestätigt. Du entscheidest selbst, wie du mit dieser Information umgehst.

**Entscheidung W2 (am Ende dieser Lage):** Informiert NordTech heute auch die Kunden proaktiv – oder erst, wenn die Lage klarer ist?  
→ Der Tisch entscheidet: **Kunden heute proaktiv informieren (gesicherte Fakten, nächster Update-Termin)**  
*Folge laut Drehbuch:* Beim Wiederanlauf danken einzelne Großkunden für die Offenheit; ein Kunde kritisiert, dass die erste Meldung mehr Fragen aufwarf als beantwortete.

#### Min. 28,5 · LK04 Nordkanal-Anfrage · Montag 14:00 Uhr · Eskalation

Der Regionalsender Nordkanal kontaktiert das Unternehmen. Fragen: Wurden Kundendaten gestohlen? Zahlen Sie Lösegeld? Ist die Produktion betroffen?

*Krisen-Info:* Antwortfrist: 2 Stunden

- Wer spricht?
- Was wird kommuniziert?
- Was wird bewusst nicht kommuniziert?

> **Vertraulich SK22 an Kaufmännische Leitung (CFO)** (Min. 32,1): Die Cyberversicherung meldet sich und weist auf mögliche Einschränkungen bei der Kostenerstattung hin: Kosten für Dienstleister außerhalb ihres Partnernetzwerks (Forensik, Anwalt, Krisenkommunikation) werden nach den Vertragsbedingungen möglicherweise nicht oder nur teilweise erstattet. Wer schon andere beauftragt hat, sollte das umgehend klären.

> **Vertraulich SK05 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung** (Min. 33,5): Ein Großkunde droht: Wenn heute keine verbindliche Aussage erfolgt, wird ein Wettbewerber beauftragt. Der Kunde erwartet zeitnah eine Reaktion.

#### Min. 36,0 · LK07 Datenschutz · Dienstag 13:00 Uhr · Eskalation

Es gibt Hinweise auf einen möglichen Abfluss personenbezogener und geschäftskritischer Daten. Welche Melde-, Informations- und Dokumentationspflichten bestehen, ist unverzüglich fachlich prüfen zu lassen.

*Krisen-Info:* Mögliche Meldefristen laufen bereits (z. B. Datenschutz: 72 Stunden) – fachlich prüfen lassen

- Welche Informationen liegen vor – und welche fehlen?
- Wer prüft die Meldepflichten, und bis wann?
- Wer übernimmt die Kommunikation?
- Was sagen Sie Kunden, deren Daten betroffen sein könnten, bevor alles geklärt ist? *(Schwerpunkt)*

> **Vertraulich SK46 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung** (Min. 39,3): Ein großer Automobilkunde bietet an, eigene IT-Spezialisten zur Unterstützung zu schicken. Voraussetzung: Sie bekommen kurzfristig Einblick in eure Systeme und in den Sicherheitsvorfall. Der Kunde verlangt noch heute eine Entscheidung.

> **Vertraulich SK41 an Leitung Qualitätsmanagement** (Min. 40,3): Seit Beginn des IT-Ausfalls werden die Messprotokolle für Pharma-Komponenten nicht mehr elektronisch übertragen. Die Fertigung dokumentiert auf Papier. Der Vertrieb möchte vorhandene Ware trotzdem ausliefern, weil der Kunde drängt. Welche Nachweise verlangst du vor einer Freigabe?

> **Vertraulich SK20 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 41,3): Die Frist der Erpresser endet am Mittwoch um 07:00 Uhr. Ein Beiratsmitglied fragt dich vorab, welche Haltung die Geschäftsführung zur Lösegeldforderung einnimmt: „Unter welchen Bedingungen würden Sie eine Zahlung überhaupt in Betracht ziehen?“ Die Finanzleitung rechnet vor: Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, und ein Backup ist bisher nicht gefunden. Euer Anwalt rät: Eine etwaige Zahlung erfordert vorher eine fachliche Prüfung der rechtlichen, wirtschaftlichen und sicherheitsbezogenen Risiken – unter anderem, ob die Gruppierung hinter SHADOWVAULT Sanktionen unterliegt. Bereite deine Position für den Krisenstab vor.

**Entscheidung W3 (am Ende dieser Lage):** Meldet NordTech den möglichen Datenabfluss vorsorglich an die Datenschutzaufsicht – oder wartet sie die Bestätigung ab?  
→ Der Tisch entscheidet: **Abwarten, bis der Abfluss bestätigt ist**  
*Folge laut Drehbuch:* Kritische Nachfrage im Beirat; später fragt die Aufsicht nach dem Ablauf (vertrauliche Karte an die Geschäftsführung); zusätzlicher Prüf- und Beratungsaufwand als Modellannahme in der Rechnung.

**Entscheidung W4 (am Ende dieser Lage):** Die Erpresserfrist endet morgen, Mittwoch 07:00 Uhr. Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, ein Backup ist bisher nicht gefunden. Niemand weiß, ob ein Schlüssel funktionieren würde oder wie schnell ein unabhängiger Wiederanlauf gelingt. Welche wirtschaftlichen und betrieblichen Gründe sprechen unter diesen Unsicherheiten für oder gegen eine Zahlung – und wie entscheidet NordTech?  
→ Der Tisch entscheidet: **Kein Lösegeld gezahlt**  
*Folge laut Drehbuch:* Keine Lösegeldzahlung. Die Wiederherstellung läuft über geprüfte Sicherungen und unabhängig neu aufgebaute Systeme nach dem festgelegten Wiederanlaufplan; die Geschichte bleibt wie im Drehbuch.

#### Min. 43,5 · LK09 Backups gefunden · Mittwoch 11:00 Uhr · Eskalation

Im Tresor des Hauptsitzes wurden Offline-Backups gefunden, Stand: Samstag 23:00 Uhr. Der Sicherungsdatenträger ist lesbar. Die Zugangsdaten zur Sicherungssoftware lagen im versiegelten IT-Notfallumschlag – ohne ihn wäre ohne den erkrankten Administrator niemand an die Daten gekommen. Integrität, Schadcodefreiheit und Vollständigkeit der Daten sind noch nicht bestätigt.

*Krisen-Info:* Datenverlust: rund 32 Stunden (Sonntag bis Montagfrüh)

- Wiederherstellung vorbereiten – oder erst weiter prüfen?
- Welche Risiken bestehen, und wer gibt frei?
- Was bedeutet der Datenverlust für Ihren Bereich?
- Wann ist eine gute Nachricht kommunizierbar, ohne zu viel zu versprechen? *(Schwerpunkt)*

> **Vertraulich SK19 an IT-Leitung (CIO)** (Min. 47,8): Die Forensiker warnen davor, betroffene Systeme oder Daten aus ungeprüften Backups produktiv wiederherzustellen – die Prüfung des Backups dauert mindestens zwei Tage. Eine isolierte Neuinstallation unabhängig von diesen Sicherungen kann nach gesonderter Sicherheitsprüfung freigegeben werden. Gleichzeitig steigt der Druck aus den Fachbereichen. Wie gehst du damit um?

#### Min. 51,0 · LK17 Beirat fordert Lagebericht · Donnerstag 07:00 Uhr · Höhepunkt

Der Beirat hat für heute Vormittag eine Sondersitzung einberufen. Er erwartet in 30 Minuten einen Lagebericht: Schadenshöhe, Wiederanlaufprognose, Kommunikationsstrategie – und die Frage, ob das Management die Lage im Griff hat. Ein Beiratsmitglied will wissen, warum die Datenschutzaufsicht noch nicht informiert ist.

*Krisen-Info:* Sondersitzung in 30 Minuten · alle Bereiche müssen zuliefern

- Was meldet Ihr Bereich in höchstens drei Sätzen?
- Welche Zahl können Sie belastbar nennen – und welche nicht?
- Wer trägt vor, und was sagen Sie bewusst nicht?
- Welche Kernbotschaft trägt nach innen und außen gleichermaßen? *(Schwerpunkt)*

> **Vertraulich SK17 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 51,5): Ein Beiratsmitglied ruft dich am Donnerstagmorgen unmittelbar vor der Sondersitzung privat an: „Wenn wir heute keine belastbaren Zahlen und keinen Plan sehen, stelle ich die Führungsfrage.“ Niemand sonst weiß von diesem Anruf.

#### Min. 58,5 · LK10 Nordkanal-Sonderbericht · Donnerstag 08:00 Uhr · Höhepunkt

Nordkanal veröffentlicht einen Bericht: „Cyber-Chaos bei NordTech“. Ein anonymer Beschäftigter kritisiert die interne Kommunikation.

*Krisen-Info:* Social Media reagiert massiv

- Reagieren oder ignorieren?
- Wie schützen Sie den Ruf des Unternehmens?
- Wer informiert die Belegschaft, bevor sie es aus den Medien erfährt?

> **Vertraulich SK37 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung (statt Kundenservice / Callcenter (Vertriebsinnendienst))** (Min. 62,8): Seit bekannt geworden ist, dass NordTech von einem Cyberangriff betroffen ist, nehmen die Kundenanrufe stark zu. Ein Anrufer gibt sich als Einkäufer eines Kunden aus und fragt auffällig gezielt nach vertraulichen Details zum Angriff und zur Lösegeldfrage. Die Rückrufnummer gehört zu einer Redaktion.

#### Min. 66,0 · LK12 Teilweiser Wiederanlauf · Freitag 08:00 Uhr · Folgen

Werk Süd kann im eingeschränkten Notbetrieb wieder anlaufen: Die Produktionssysteme wurden isoliert neu aufgesetzt und unabhängig geprüft. Dieser Notbetrieb nutzt keine ungeprüften Sicherungsdaten; die Prüfung des ERP-Backups dauert weiterhin an. Aufträge und Rückmeldungen laufen vorerst über Papierlisten. Weil die Anlagen am Montag am Netz blieben, wurden zwei weitere Fräslinien verschlüsselt und müssen neu aufgesetzt werden.

*Krisen-Info:* Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt)

- Welche Produkte und Kunden haben Vorrang?
- Wer gibt die Produktion frei – und nach welchen Kriterien?
- Wie wird ohne ERP dokumentiert?
- Welche Kunden bekommen die erste Ware – und was sagen Sie den anderen? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK44 an Geschäftsführung (CEO), Krisenstabsleitung:** Die Datenschutzaufsicht fragt nach: Wann hat NordTech von einer möglichen Datenverletzung erfahren, welche Prüfung wurde vorgenommen, und weshalb ist bislang keine Meldung erfolgt? Ob eine Pflichtverletzung vorliegt, muss fachlich geprüft werden.

#### Min. 73,5 · LK15 Wiederanlauf · Sonntag 12:00 Uhr · Wiederanlauf

70 % der technischen Fertigungskapazität sind auf priorisierten Anlagen wieder verfügbar – in isolierten, geprüften Produktionsumgebungen mit Sicherheitsfreigabe. Nicht alle 900 IT- und OT-Systeme sind wiederhergestellt; der ERP-Produktivbetrieb sowie die Freigaben von Daten und Ware werden gesondert bewertet. Personal und Material begrenzen die reale Leistung: Nach den Krisentagen sind die Schichten erschöpft, und wegen Materialengpässen ist nicht sicher, dass die Kapazität durchgehend ausgelastet werden kann. Kunden und Presse beobachten die Situation weiterhin kritisch. Zusätzliche Wiederherstellungsteams haben bis Sonntag auch die am Montag zusätzlich verschlüsselten Linien wieder freigegeben – der Schaden vom Montag hat den Wiederanlauf verteuert, aber nicht dauerhaft verhindert. Einzelne Großkunden bedanken sich für die frühe Information. Ein Kunde merkt an, dass die erste Meldung mehr Fragen aufwarf als beantwortete – das Vertrauen hat gelitten, ist aber nicht zerstört.

*Krisen-Info:* 70 % technische Kapazität auf priorisierten Anlagen · ERP-Produktivbetrieb und Freigaben offen

- Welche Botschaft senden Sie an Kunden, Beschäftigte und Öffentlichkeit – und wer sagt es?
- Welchen Kunden vertrösten Sie bewusst, obwohl technische Kapazität vorhanden ist – und wer sagt es ihm?
- Welche Aussage ist nachweisbar, welche bleibt eine Prognose? *(Schwerpunkt)*

> **Vertraulich SK33 an Unternehmenskommunikation & Marketing** (Min. 77,8): 70 % der technischen Fertigungskapazität sind inzwischen bestätigt. Materialengpässe, personelle Belastung und ausstehende Produktfreigaben begrenzen jedoch die tatsächliche Lieferfähigkeit, und offen ist weiterhin, ob Kundendaten abgeflossen sind. Die Geschäftsführung möchte öffentlich erklären: „Alles wieder im Griff.“ Wie formulierst du eine belastbare Botschaft?

#### Abschluss

Sonntag, nach sieben Tagen Unternehmenskrise. Die priorisierten Anlagen laufen wieder, 70 % der technischen Fertigungskapazität sind wiederhergestellt. ERP-Produktivbetrieb, Datenabgleich und Warenfreigaben sind noch nicht abgeschlossen. Materialengpässe und die Belastung der Beschäftigten begrenzen weiterhin die tatsächliche Leistung. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 4.260.000 € + aus Entscheidungen: Zwei zusätzlich verschlüsselte Fräslinien: Neuaufsetzen und längerer Stillstand (350.000 €); Zusätzlicher Prüf- und Beratungsaufwand wegen Rückfragen der Aufsicht (Modellannahme, kein Bußgeld eingerechnet) (150.000 €) = **4.760.000 €**; Mögliche Erstattung durch die Cyberversicherung (optimistische Modellannahme, nicht bestätigt): − 1.400.000 € → **beim Unternehmen bleiben 3.360.000 €** (36 % des Jahresgewinns).

*Fazit auf der Bühne:* Die Systeme laufen nach sieben Tagen wieder. Das Vertrauen der Kunden braucht Monate. Eine Krise ist erst vorbei, wenn die Kunden uns wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das entscheiden dürfen?
- Wie kamen die Meldungen von Service-Desk, Kundenservice und Standorten beim Krisenstab an – und wie kamen Anweisungen und Sprachregelung zu ihnen zurück?
- Wer hätte früher eingebunden werden müssen?
- Welche Person oder Rolle war kritisch – und gab es eine Vertretung?
- Wo waren Single Points of Failure?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- „70 % technische Kapazität“ – wie viel davon war wirklich nutzbar, und was hat die reale Leistung begrenzt (Personal, Material, Freigaben)?
- Welche Kosten wären möglicherweise nicht von der Versicherung gedeckt – und wie verändert das den Liquiditätsbedarf?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?
- *(Schwerpunkt)* Haben Kunden, Beschäftigte und Presse dieselbe Geschichte gehört?
- *(Schwerpunkt)* Wo kam eine Information zu spät oder über Dritte an?

---

### Geschichte 7: 180 Minuten · IT-Sicherheit und Wiederanlauf · alle Entscheidungen riskant

**Besetzte Rollen (21):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (CIO), Leitung Produktion (Werksleitung), Geschäftsführung Vertrieb, stellv. Krisenstabsleitung, Kaufmännische Leitung (CFO), Leitung Qualitätsmanagement, Notfallmanagement / BCM, Unternehmenskommunikation & Marketing, IT-Service-Desk (technischer Support), Kundenservice / Callcenter (Vertriebsinnendienst), Personalleitung, Leitung Strategischer Einkauf, ERP / Stammdaten, Debitorenbuchhaltung, Inventuren & Spezialprozesse, Key Account Management Automotive, IT-Fachkraft (Vertretung IT-Leitung), Standortleitung Werk Süd, ERP-Beratung, Key Account Management Pharma, Debitorenmanagement  
**Geplante Krisenzeit:** 165 Min. + ca. 15 Min. Abschluss · Entscheidungszeit je Lage ca. 2,68 Min.
  
**Leitfrage des Schwerpunkts (für die Moderation):** Was ist technisch bereit, was ist sicher, was ist fachlich freigegeben?

#### Min. 0,0 · LK18 Anmeldung hakt · Montag 06:41 Uhr · Vorboten

Mehrere Kolleginnen und Kollegen der Frühschicht kommen nicht ins ERP. Die Anmeldung bricht mit einer Zeitüberschreitung ab, ein Neustart hilft nicht. Der IT-Service-Desk ist erst ab 07:00 Uhr besetzt.

- Was ist Ihre erste Reaktion – und wen informieren Sie?
- Welche Information würde Sie veranlassen, jetzt den IT-Notfallprozess auszulösen?
- Welche technischen Sofortmaßnahmen sind jetzt richtig – und welche zerstören Spuren? *(Schwerpunkt)*

#### Min. 3,0 · LK19 Maschine 4 verhält sich seltsam · Montag 06:48 Uhr · Vorboten

An der Fräslinie 4 laufen die Programme nicht an. Im Programmverzeichnis haben alle Dateien plötzlich eine fremde Endung: .shadowvault. Die Schichtleitung startet das Bedienterminal neu und ruft die Instandhaltung.

- Wer muss jetzt informiert werden?
- Würden Sie die Linie bereits stoppen, bevor ein Angriff bestätigt ist?

#### Min. 6,0 · LK20 Keine Aufträge mehr · Montag 06:55 Uhr · Vorboten

Der Vertriebsinnendienst meldet: Seit 06:30 Uhr sind keine Abrufe der Automobilkunden mehr eingegangen – üblich sind um diese Zeit 40 bis 60. E-Mails an Kunden bleiben im Postausgang hängen. Erste Vermutung: ein Wartungsfenster beim Provider.

- Wie lange warten Sie auf den Provider, bevor Sie Kunden selbst kontaktieren?
- Wer ruft den Krisenstab zusammen – und wann?

#### Min. 9,0 · LK01 Cyberangriff · Montag 07:00 Uhr · Ausbruch

Jetzt geht nichts mehr. Die Frühschicht meldet: ERP, Fileserver, Zeiterfassung und E-Mail sind ausgefallen. Auf immer mehr Bildschirmen erscheint eine Lösegeldforderung. Die Produktion kann keine neuen Fertigungsaufträge abrufen.

*Krisen-Info:* Lösegeldforderung: 2.000.000 € · Frist: 48 Stunden

- Welche Auswirkungen hat dies auf Ihren Bereich?
- Welche Sofortmaßnahmen leiten Sie ein?
- Welche Entscheidungen benötigt der Krisenstab?
- Welche Anweisung bekommen jetzt alle Beschäftigten – und über wen läuft sie?
- Was wird jetzt vom Netz genommen, was bleibt an – und wer entscheidet das? *(Schwerpunkt)*

> **Vertraulich SK40 an Leitung Produktion (Werksleitung)** (Min. 14,3): Die Schichtleitungen der drei Standorte rufen dich gleichzeitig an: Sollen die laufenden Aufträge zu Ende gefahren oder die Anlagen sofort gestoppt werden? An Fräslinie 4 sind die Programme verschlüsselt, an den anderen Linien läuft noch alles. Ein Automobilkunde erwartet heute Nachmittag eine Just-in-time-Lieferung. Wie weist du die Schichtleitungen an, bis der Krisenstab entschieden hat?

#### Min. 18,2 · LK16 OT-Trennung · Montag 08:00 Uhr · Ausbruch

Die IT empfiehlt, auch unbetroffene Produktionsanlagen (OT) vorsorglich vom Netz zu nehmen, um eine Ausbreitung zu verhindern – das würde auch noch laufende, bislang unbetroffene Fertigungsaufträge stoppen.

*Krisen-Info:* Betrifft auch aktuell noch laufende, unbetroffene Anlagen

- Tragen Sie die vorsorgliche Trennung mit?
- Welche Aufträge wären zusätzlich betroffen?
- Wer entscheidet, wenn IT und Geschäftsführung unterschiedlicher Meinung sind?

**Entscheidung W1 (am Ende dieser Lage):** Bleiben die übrigen Anlagen am Netz, bis die laufenden Aufträge fertig sind – oder werden sie sofort getrennt?  
→ Der Tisch entscheidet: **Anlagen bleiben am Netz, Aufträge werden fertiggestellt**  
*Folge laut Drehbuch:* Später sind zwei weitere Fräslinien verschlüsselt: Werk Süd startet mit 20 % statt 30 %; bis Sonntag holen zusätzliche Teams das auf. Zusatzposten in der Rechnung.

#### Min. 27,4 · LK02 Produktion stoppt · Montag 09:00 Uhr · Ausbruch

Die Produktionsleitung meldet: Neue Fertigungsaufträge können nicht gestartet werden. Laufende Aufträge enden in den nächsten Stunden. Ohne Gegenmaßnahmen kommt die Fertigung an allen drei Standorten zum Stillstand.

*Krisen-Info:* Fertigwaren reichen für Lieferungen noch ca. 48 Stunden

- Welche Folgen erwarten Sie?
- Welche Kunden sind betroffen?
- Welche Prioritäten setzen Sie?
- Welche Anlagen dürfen ohne Netz weiterlaufen, und wie wird das abgesichert? *(Schwerpunkt)*

> **Vertraulich SK45 an Standortleitung Werk Süd** (Min. 31,8): Ein Schichtleiter erklärt dir vertraulich, dass er einige Anlagen auch ohne zentrale IT weiterbetreiben könnte, und möchte die Produktion eigenständig fortsetzen. Eine technische Sicherheitsfreigabe gibt es nicht. Er bittet dich, diese Möglichkeit zunächst nicht an den Krisenstab weiterzugeben.

> **Vertraulich SK21 an Notfallmanagement / BCM** (Min. 33,5): Es besteht der Verdacht, dass NordTech neben dem Datenschutz weiteren gesetzlichen Meldepflichten unterliegt (z. B. als Einrichtung nach NIS2 an das BSI) – mit Fristen ab Kenntnis des Vorfalls. Betroffenheit, zuständige Stellen und Fristen sind umgehend fachlich prüfen zu lassen.

#### Min. 36,5 · LK22 Kommunikation ohne IT · Montag 10:00 Uhr · Ausbruch

E-Mail, ERP und Teile der Telefonie sind nicht verfügbar. Gleichzeitig müssen 620 Beschäftigte an drei Standorten Anweisungen erhalten. Einige arbeiten weiter, andere haben ihre Geräte ausgeschaltet. Es gibt keine einheitliche Information.

*Krisen-Info:* 620 Beschäftigte · 3 Standorte · 3 Schichten · keine E-Mail

- Welchen unabhängigen Kanal nutzen Sie?
- Wer gibt die Nachricht frei?
- Wie stellen Sie sicher, dass jede Schicht und jeder Standort erreicht wird?
- Welche Kommunikationswege sind sicher, auch wenn der Angreifer noch im Netz sein könnte? *(Schwerpunkt)*

> **Vertraulich SK01 an IT-Leitung (CIO)** (Min. 41,8): Ein externer Dienstleister informiert dich: Die Backups könnten ebenfalls kompromittiert sein. Aktuell ist das nicht bestätigt. Du entscheidest selbst, wie du mit dieser Information umgehst.

**Entscheidung W2 (am Ende dieser Lage):** Informiert NordTech heute auch die Kunden proaktiv – oder erst, wenn die Lage klarer ist?  
→ Der Tisch entscheidet: **Erst informieren, wenn die Lage klar ist**  
*Folge laut Drehbuch:* Der größte Automobilkunde erfährt es über Dritte (vertrauliche Karte an den Vertrieb bei „Datenschutz“); beim Wiederanlauf öffentliche Kritik; Zusatzposten Kundenabwanderung.

#### Min. 45,7 · LK04 Nordkanal-Anfrage · Montag 14:00 Uhr · Eskalation

Der Regionalsender Nordkanal kontaktiert das Unternehmen. Fragen: Wurden Kundendaten gestohlen? Zahlen Sie Lösegeld? Ist die Produktion betroffen?

*Krisen-Info:* Antwortfrist: 2 Stunden

- Wer spricht?
- Was wird kommuniziert?
- Was wird bewusst nicht kommuniziert?

> **Vertraulich SK22 an Kaufmännische Leitung (CFO)** (Min. 50,1): Die Cyberversicherung meldet sich und weist auf mögliche Einschränkungen bei der Kostenerstattung hin: Kosten für Dienstleister außerhalb ihres Partnernetzwerks (Forensik, Anwalt, Krisenkommunikation) werden nach den Vertragsbedingungen möglicherweise nicht oder nur teilweise erstattet. Wer schon andere beauftragt hat, sollte das umgehend klären.

> **Vertraulich SK06 an Key Account Management Automotive** (Min. 51,8): Der Einkauf eines Automobilkunden meldet sich bei dir: Wenn bis morgen 10:00 Uhr kein belastbarer Lieferplan vorliegt, gibt er den Zweitlieferanten frei und stellt euch die Mehrkosten in Rechnung. Die Lage hat er bereits mit anderen Zulieferern im Branchennetzwerk besprochen.

#### Min. 54,9 · LK23 Wer darf ins Werk? · Montag 16:00 Uhr · Eskalation

Die Zutrittsverwaltung eines gesicherten Fertigungsbereichs in Werk Süd ist wegen des IT-Ausfalls nicht zuverlässig erreichbar. Am Werkstor warten zwei externe Techniker, die einen ausgefallenen Produktionsrechner begutachten sollen. Der Werkschutz kann ihre Berechtigung nicht elektronisch prüfen. Zugleich fordert die Instandhaltung, die Techniker sofort hineinzulassen, um den Stillstand zu begrenzen.

*Krisen-Info:* Zutrittsfreigabe nicht elektronisch prüfbar · 2 externe Techniker warten · keine pauschale Aufhebung der Sicherheitsregeln

- Wer entscheidet über einen manuellen Zutritt, und wer darf ihn anordnen?
- Wie werden Identität, Auftrag, Begleitung, Zutrittsbereich und Verlassen des Werks dokumentiert?
- Welche Arbeiten dürfen die Techniker vor einer IT-/OT-Sicherheitsfreigabe überhaupt durchführen?
- Wie wird die gleiche Regel an allen Standorten durchgesetzt?

> **Vertraulich SK25 an Key Account Management Pharma** (Min. 60,2): Ein Pharmakunde ruft persönlich an. Er hat von dem Angriff gehört – die Nachricht macht in der Branche bereits die Runde. Bis heute Abend muss er entscheiden, ob er seine Bestellung für nächste Woche bei einem anderen Lieferanten platziert. Er fragt auch, ob die Chargendokumentation vollständig sein wird.

#### Min. 64,1 · LK05 Schlüsselperson fällt aus · Dienstag 08:00 Uhr · Eskalation

Der leitende Systemadministrator liegt seit Montag im Krankenhaus und ist nicht erreichbar. Erst jetzt wird klar: Niemand sonst kennt Backup-Konfiguration, Notfallpasswörter oder Firewallregeln vollständig.

- Welche Risiken entstehen?
- Welche Aufgabe vergeben Sie sofort an externe Spezialisten, obwohl Zugriffsrechte und Sicherheitslage ungeklärt sind?
- Welche Prioritäten ändern sich?

> **Vertraulich SK04 an Personalleitung** (Min. 68,5): Eine erfahrene Person aus dem IT-Team hat heute gekündigt. Kündigungsfrist: 4 Wochen. Die Information ist bisher nur dir bekannt.

> **Vertraulich SK11 an Leitung Strategischer Einkauf** (Min. 70,2): Ein strategischer Lieferant meldet: Wegen eures Ausfalls hat er eure reservierten Kapazitäten an andere Kunden vergeben. Für den Wiederanlauf reicht das vorhandene Material nur für zwei Produktionstage, Nachschub kommt frühestens in drei Wochen.

#### Min. 73,2 · LK07 Datenschutz · Dienstag 13:00 Uhr · Eskalation

Es gibt Hinweise auf einen möglichen Abfluss personenbezogener und geschäftskritischer Daten. Welche Melde-, Informations- und Dokumentationspflichten bestehen, ist unverzüglich fachlich prüfen zu lassen.

*Krisen-Info:* Mögliche Meldefristen laufen bereits (z. B. Datenschutz: 72 Stunden) – fachlich prüfen lassen

- Welche Informationen liegen vor – und welche fehlen?
- Wer prüft die Meldepflichten, und bis wann?
- Wer übernimmt die Kommunikation?
- Welche Logs und Spuren müssen gesichert werden, bevor Systeme neu aufgesetzt werden? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK43 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung:** Der Einkaufsleiter eures größten Automobilkunden ruft an: Er hat über Dritte vom Cyberangriff erfahren, nicht von euch. Er verlangt bis heute Abend ein Gespräch mit der Geschäftsführung und eine schriftliche Lageinformation.

> **Vertraulich SK46 an Geschäftsführung Vertrieb, stellv. Krisenstabsleitung** (Min. 76,7): Ein großer Automobilkunde bietet an, eigene IT-Spezialisten zur Unterstützung zu schicken. Voraussetzung: Sie bekommen kurzfristig Einblick in eure Systeme und in den Sicherheitsvorfall. Der Kunde verlangt noch heute eine Entscheidung.

> **Vertraulich SK41 an Leitung Qualitätsmanagement** (Min. 77,4): Seit Beginn des IT-Ausfalls werden die Messprotokolle für Pharma-Komponenten nicht mehr elektronisch übertragen. Die Fertigung dokumentiert auf Papier. Der Vertrieb möchte vorhandene Ware trotzdem ausliefern, weil der Kunde drängt. Welche Nachweise verlangst du vor einer Freigabe?

> **Vertraulich SK20 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 78,2): Die Frist der Erpresser endet am Mittwoch um 07:00 Uhr. Ein Beiratsmitglied fragt dich vorab, welche Haltung die Geschäftsführung zur Lösegeldforderung einnimmt: „Unter welchen Bedingungen würden Sie eine Zahlung überhaupt in Betracht ziehen?“ Die Finanzleitung rechnet vor: Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, und ein Backup ist bisher nicht gefunden. Euer Anwalt rät: Eine etwaige Zahlung erfordert vorher eine fachliche Prüfung der rechtlichen, wirtschaftlichen und sicherheitsbezogenen Risiken – unter anderem, ob die Gruppierung hinter SHADOWVAULT Sanktionen unterliegt. Bereite deine Position für den Krisenstab vor.

> **Vertraulich SK14 an Inventuren & Spezialprozesse** (Min. 78,9): In vier Tagen wäre Inventurstichtag. Die Systeme stehen weiterhin nicht zur Verfügung. Welche Risiken siehst du?

> **Vertraulich SK09 an Debitorenbuchhaltung** (Min. 79,6): Mehrere Kunden halten ihre Zahlungen zurück. Begründung: Unsicherheit über die Lieferfähigkeit. Wie gehst du vor?

> **Vertraulich SK10 an Debitorenmanagement** (Min. 80,3): Die ersten Kunden drohen mit Schadensersatzforderungen. Noch liegen keine offiziellen Schreiben vor. Was unternimmst du?

**Entscheidung W3 (am Ende dieser Lage):** Meldet NordTech den möglichen Datenabfluss vorsorglich an die Datenschutzaufsicht – oder wartet sie die Bestätigung ab?  
→ Der Tisch entscheidet: **Abwarten, bis der Abfluss bestätigt ist**  
*Folge laut Drehbuch:* Kritische Nachfrage im Beirat; später fragt die Aufsicht nach dem Ablauf (vertrauliche Karte an die Geschäftsführung); zusätzlicher Prüf- und Beratungsaufwand als Modellannahme in der Rechnung.

**Entscheidung W4 (am Ende dieser Lage):** Die Erpresserfrist endet morgen, Mittwoch 07:00 Uhr. Jeder Stillstandstag kostet rund 260.000 € Deckungsbeitrag, ein Backup ist bisher nicht gefunden. Niemand weiß, ob ein Schlüssel funktionieren würde oder wie schnell ein unabhängiger Wiederanlauf gelingt. Welche wirtschaftlichen und betrieblichen Gründe sprechen unter diesen Unsicherheiten für oder gegen eine Zahlung – und wie entscheidet NordTech?  
→ Der Tisch entscheidet: **Lösegeld gezahlt**  
*Folge laut Drehbuch:* Der gelieferte Schlüssel hilft nur teilweise, die Erpresser fordern danach mehr (vertrauliche Karte an die IT mit „Beirat fordert Lagebericht“), die Zahlung wird öffentlich. Lösegeld steht in der Rechnung.

#### Min. 82,4 · LK08 Positive Entwicklung · Mittwoch 08:00 Uhr · Eskalation

Forensiker bestätigen den Einbruchsvektor: Eine Phishing-Mail hat die Zugangsdaten eines VPN-Kontos abgegriffen. Derzeit keine Hinweise auf aktive Angreifer im Netzwerk.

*Krisen-Info:* erste gute Nachricht der Übung

- Welche Einschränkungen heben Sie jetzt auf – und welche ausdrücklich nicht?
- Kommunizieren Sie diesen Erfolg?

#### Min. 91,6 · LK09 Backups gefunden · Mittwoch 11:00 Uhr · Eskalation

Im Tresor des Hauptsitzes wurden Offline-Backups gefunden, Stand: Samstag 23:00 Uhr. Der Sicherungsdatenträger ist lesbar. Die Zugangsdaten zur Sicherungssoftware lagen im versiegelten IT-Notfallumschlag – ohne ihn wäre ohne den erkrankten Administrator niemand an die Daten gekommen. Integrität, Schadcodefreiheit und Vollständigkeit der Daten sind noch nicht bestätigt.

*Krisen-Info:* Datenverlust: rund 32 Stunden (Sonntag bis Montagfrüh)

- Wiederherstellung vorbereiten – oder erst weiter prüfen?
- Welche Risiken bestehen, und wer gibt frei?
- Was bedeutet der Datenverlust für Ihren Bereich?
- Welche Prüfschritte braucht das Backup, bevor irgendetwas daraus produktiv wird? *(Schwerpunkt)*

> **Vertraulich SK19 an IT-Leitung (CIO)** (Min. 96,9): Die Forensiker warnen davor, betroffene Systeme oder Daten aus ungeprüften Backups produktiv wiederherzustellen – die Prüfung des Backups dauert mindestens zwei Tage. Eine isolierte Neuinstallation unabhängig von diesen Sicherungen kann nach gesonderter Sicherheitsprüfung freigegeben werden. Gleichzeitig steigt der Druck aus den Fachbereichen. Wie gehst du damit um?

#### Min. 100,8 · LK24 Wer bekommt das erste System? · Mittwoch 15:00 Uhr · Eskalation

Die IT hat eine vom betroffenen Unternehmensnetz getrennte Umgebung für die Vorbereitung und Prüfung der Wiederherstellung aufgebaut. Rechenleistung, Fachpersonal und Zeit reichen zunächst nur für einen größeren Geschäftsprozess. Der Vertrieb fordert Zugriff auf Kundenaufträge, die Produktion auf Fertigungsinformationen, die Finanzleitung auf offene Forderungen. Das am Vormittag gefundene Offline-Backup ist lesbar, aber noch nicht abschließend auf Integrität, Vollständigkeit und Schadcode geprüft – ein produktiver Wiederanlauf daraus ist nicht freigegeben.

*Krisen-Info:* Nur ein Geschäftsprozess kann zunächst vorbereitet werden · Backup-Prüfung läuft · keine Produktivfreigabe

- Welchen Geschäftsprozess bereiten Sie zuerst vor – nach welchen unternehmensweiten Kriterien?
- Welche Abhängigkeiten bestehen zwischen Aufträgen, Material, Fertigung und Rechnungsstellung?
- Wie unterscheiden Sie technische Vorbereitung, Sicherheitstest und fachliche Freigabe?
- Wer dokumentiert die Priorisierung und informiert die zurückgestellten Bereiche?

> **Vertraulich SK02 an IT-Fachkraft (Vertretung IT-Leitung)** (Min. 106,0): Du bist für das gefundene Offline-Backup zuständig. Einspielen darfst du es nur in eine isolierte Prüfumgebung, und die steht noch nicht vollständig. Ein Fachbereichsleiter bittet dich, „nur schnell“ die Auftragsdaten auf einen Laptop im Produktionsnetz zu kopieren, damit der Vertrieb wieder arbeiten kann. Du entscheidest selbst über das weitere Vorgehen.

#### Min. 109,9 · LK17 Beirat fordert Lagebericht · Donnerstag 07:00 Uhr · Höhepunkt

Der Beirat hat für heute Vormittag eine Sondersitzung einberufen. Er erwartet in 30 Minuten einen Lagebericht: Schadenshöhe, Wiederanlaufprognose, Kommunikationsstrategie – und die Frage, ob das Management die Lage im Griff hat. Ein Beiratsmitglied will wissen, warum die Datenschutzaufsicht noch nicht informiert ist.

*Krisen-Info:* Sondersitzung in 30 Minuten · alle Bereiche müssen zuliefern

- Was meldet Ihr Bereich in höchstens drei Sätzen?
- Welche Zahl können Sie belastbar nennen – und welche nicht?
- Wer trägt vor, und was sagen Sie bewusst nicht?
- Welche Wiederanlauf-Prognose kann die IT belastbar nennen – und welche nicht? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK27 an IT-Leitung (CIO):** Trotz der Zahlung melden sich die Erpresser erneut über das Tor-Portal: „Wir sind noch in eurem Netz. Für die übrigen Schlüssel und die Löschung eurer Daten will die Gruppe weitere 500.000 €. Ihr habt 12 Stunden.“ Die Forensik kann nicht ausschließen, dass sie noch Zugang haben. Du entscheidest selbst, wie du mit dieser Information umgehst.

> **Vertraulich SK17 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 110,4): Ein Beiratsmitglied ruft dich am Donnerstagmorgen unmittelbar vor der Sondersitzung privat an: „Wenn wir heute keine belastbaren Zahlen und keinen Plan sehen, stelle ich die Führungsfrage.“ Niemand sonst weiß von diesem Anruf.

#### Min. 119,1 · LK12 Teilweiser Wiederanlauf · Freitag 08:00 Uhr · Folgen

Werk Süd kann im eingeschränkten Notbetrieb wieder anlaufen: Die Produktionssysteme wurden isoliert neu aufgesetzt und unabhängig geprüft. Dieser Notbetrieb nutzt keine ungeprüften Sicherungsdaten; die Prüfung des ERP-Backups dauert weiterhin an. Aufträge und Rückmeldungen laufen vorerst über Papierlisten. Weil die Anlagen am Montag am Netz blieben, wurden zwei weitere Fräslinien verschlüsselt und müssen neu aufgesetzt werden. Der nach der Zahlung gelieferte Schlüssel entschlüsselt nur einen Teil der übrigen Systeme und ist sehr langsam. Niemand verlässt sich darauf – die Wiederherstellung der übrigen Systeme wartet weiter auf das geprüfte Backup.

*Krisen-Info:* Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt)

- Welche Produkte und Kunden haben Vorrang?
- Wer gibt die Produktion frei – und nach welchen Kriterien?
- Wie wird ohne ERP dokumentiert?
- Nach welchen Kriterien sind die Systeme in Werk Süd freigegeben – und von wem? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK44 an Geschäftsführung (CEO), Krisenstabsleitung:** Die Datenschutzaufsicht fragt nach: Wann hat NordTech von einer möglichen Datenverletzung erfahren, welche Prüfung wurde vorgenommen, und weshalb ist bislang keine Meldung erfolgt? Ob eine Pflichtverletzung vorliegt, muss fachlich geprüft werden.

> **Vertraulich SK37 an Kundenservice / Callcenter (Vertriebsinnendienst)** (Min. 123,5): Seit bekannt geworden ist, dass NordTech von einem Cyberangriff betroffen ist, nehmen die Kundenanrufe stark zu. Ein Anrufer gibt sich als Einkäufer eines Kunden aus und fragt auffällig gezielt nach vertraulichen Details zum Angriff und zur Lösegeldfrage. Die Rückrufnummer gehört zu einer Redaktion.

> **Vertraulich SK13 an ERP-Beratung** (Min. 125,2): Mehrere Fachbereiche führen Notfalllisten in Excel. Jeder Bereich arbeitet mit anderen Datenständen. Wie gehst du vor?

#### Min. 128,3 · LK21 Chargenfreigabe · Freitag 16:00 Uhr · Folgen

Die Produktion ist teilweise wieder angelaufen. Für 260 Chargen für Pharmakunden fehlen durch den IT-Ausfall elektronische Produktions- und Prüfnachweise. Die Qualitätsleitung kann derzeit nicht bestätigen, welche Chargen freigegeben werden dürfen. Gleichzeitig fordert ein Pharmakunde eine verbindliche Lieferzusage.

*Krisen-Info:* 260 Chargen ohne vollständige Nachweise

- Wer darf welche Produkte freigeben?
- Wie wird die Nachdokumentation organisiert?
- Was sagt NordTech dem Kunden bis zur Freigabe?

#### Min. 137,5 · LK14 ERP-Testbetrieb · Samstag 09:00 Uhr · Wiederanlauf

Das ERP wurde aus dem inzwischen auf Schadcode und Vollständigkeit geprüften Offline-Backup in einer isolierten Testumgebung wiederhergestellt. Erste Funktionstests sind erfolgreich. Die fachliche Prüfung der Daten und die Sicherheitsfreigabe für den Produktivbetrieb stehen aus. Vertrieb und Versand drängen: Ohne ERP lassen sich ab Montag weder Lieferpapiere noch Rechnungen erstellen.

*Krisen-Info:* Funktionstest bestanden · Daten- und Sicherheitsfreigabe offen · Versand braucht das ERP ab Montag

- Welchen einzigen Geschäftsprozess würden Sie unter welchen Freigabebedingungen zuerst aktivieren?
- Wer erteilt die Sicherheitsfreigabe – und was gilt, bis sie vorliegt?

> **Vertraulich SK48 an ERP / Stammdaten** (Min. 141,9): Eine Fachabteilung bietet dir an, den Rückstand schneller aufzuarbeiten: Sie hat während der Ausfalltage Fertigungs- und Materialbuchungen in einer Excel-Datei gesammelt. Einige Einträge haben jedoch keine eindeutige Belegnummer und keinen verlässlichen Zeitstempel. Der Fachbereich möchte die Datei heute noch vollständig ins ERP übernehmen, damit die Bestände endlich wieder stimmen. Du musst entscheiden, wie du mit dem Vorschlag umgehst.

> **Vertraulich SK38 an IT-Service-Desk (technischer Support)** (Min. 143,6): Für die nächste Wiederanlaufphase zeichnet sich erheblicher Prüfaufwand ab: 900 Endgeräte, Produktionsrechner und Server sind zu bewerten, die Zugänge von 620 Beschäftigten kontrolliert wiederherzustellen. Schon jetzt drängen Produktion und Verwaltung, zuerst dranzukommen. Welche Reihenfolge bereitest du vor?

#### Min. 146,7 · LK25 Zwei Listen, zwei Wahrheiten · Samstag 11:00 Uhr · Wiederanlauf

Das ERP läuft seit Samstagmorgen in einer Testumgebung. Beim Abgleich mit den Papierlisten aus dem Notbetrieb zeigen sich für mehrere Fertigungsaufträge unterschiedliche Materialverbräuche und Produktionsmengen. Noch ist unklar, ob Buchungen fehlen, doppelt erfasst wurden oder die Papierlisten uneinheitlich geführt sind. Die Buchungen sind nicht als verlässlicher Datenstand freigegeben. Gleichzeitig erwartet ein Kunde kurzfristig eine Lieferentscheidung zu Ware aus den betroffenen Aufträgen.

*Krisen-Info:* Datenabgleich widersprüchlich · ERP nur im Test · Lieferentscheidung offen

- Wer verantwortet die Klärung der Abweichungen und die fachliche Freigabe der Buchungsdaten?
- Wie prüfen Sie Mengen, Chargenbezug, Materialbewegungen und mögliche Doppelbuchungen nachvollziehbar?
- Welche Lieferungen können mit unabhängig nachgewiesener Qualität freigegeben werden, welche bleiben gesperrt?
- Wie verhindern Sie, dass eine fehlerhafte Nachbuchung weitere Probleme erzeugt?

> **Vertraulich SK33 an Unternehmenskommunikation & Marketing** (Min. 151,9): Die Geschäftsführung erwartet, dass am Sonntag bis zu 70 % der technischen Fertigungskapazität wieder verfügbar sein könnten; eine abschließende Bestätigung steht noch aus. Trotzdem möchte sie schon öffentlich erklären: „Alles wieder im Griff.“ Offen ist auch, ob Kundendaten abgeflossen sind. Wie formulierst du eine belastbare Botschaft?

#### Min. 155,8 · LK15 Wiederanlauf · Sonntag 12:00 Uhr · Wiederanlauf

70 % der technischen Fertigungskapazität sind auf priorisierten Anlagen wieder verfügbar – in isolierten, geprüften Produktionsumgebungen mit Sicherheitsfreigabe. Nicht alle 900 IT- und OT-Systeme sind wiederhergestellt; der ERP-Produktivbetrieb sowie die Freigaben von Daten und Ware werden gesondert bewertet. Personal und Material begrenzen die reale Leistung: Nach den Krisentagen sind die Schichten erschöpft, und wegen Materialengpässen ist nicht sicher, dass die Kapazität durchgehend ausgelastet werden kann. Kunden und Presse beobachten die Situation weiterhin kritisch. Zusätzliche Wiederherstellungsteams haben bis Sonntag auch die am Montag zusätzlich verschlüsselten Linien wieder freigegeben – der Schaden vom Montag hat den Wiederanlauf verteuert, aber nicht dauerhaft verhindert. Zwei Großkunden kritisieren öffentlich, dass sie vom Angriff zuerst über Dritte statt von NordTech erfahren haben, und kündigen an, ihre Lieferantenstrategie zu überprüfen. In der Presse wird berichtet, dass NordTech Lösegeld gezahlt hat.

*Krisen-Info:* 70 % technische Kapazität auf priorisierten Anlagen · ERP-Produktivbetrieb und Freigaben offen

- Welche Botschaft senden Sie an Kunden, Beschäftigte und Öffentlichkeit – und wer sagt es?
- Welchen Kunden vertrösten Sie bewusst, obwohl technische Kapazität vorhanden ist – und wer sagt es ihm?
- Was läuft produktiv, was noch im Test – und wie merken Sie, wenn der Angreifer zurückkommt? *(Schwerpunkt)*

#### Abschluss

Sonntag, nach sieben Tagen Unternehmenskrise. Die priorisierten Anlagen laufen wieder, 70 % der technischen Fertigungskapazität sind wiederhergestellt. ERP-Produktivbetrieb, Datenabgleich und Warenfreigaben sind noch nicht abgeschlossen. Materialengpässe und die Belastung der Beschäftigten begrenzen weiterhin die tatsächliche Leistung. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 4.260.000 € + aus Entscheidungen: Zwei zusätzlich verschlüsselte Fräslinien: Neuaufsetzen und längerer Stillstand (350.000 €); Zusätzliche Kundenabwanderung, weil Kunden zuerst von Dritten vom Angriff erfahren haben (600.000 €); Zusätzlicher Prüf- und Beratungsaufwand wegen Rückfragen der Aufsicht (Modellannahme, kein Bußgeld eingerechnet) (150.000 €); Lösegeldzahlung an die Erpresser (2.000.000 €) = **7.360.000 €**; Mögliche Erstattung durch die Cyberversicherung (optimistische Modellannahme, nicht bestätigt): − 1.400.000 € → **beim Unternehmen bleiben 5.960.000 €** (64 % des Jahresgewinns).

*Fazit auf der Bühne:* Die Systeme laufen nach sieben Tagen wieder. Das Vertrauen der Kunden braucht Monate. Eine Krise ist erst vorbei, wenn die Kunden uns wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das entscheiden dürfen?
- Wie kamen die Meldungen von Service-Desk, Kundenservice und Standorten beim Krisenstab an – und wie kamen Anweisungen und Sprachregelung zu ihnen zurück?
- Wer hätte früher eingebunden werden müssen?
- Welche Person oder Rolle war kritisch – und gab es eine Vertretung?
- Wo waren Single Points of Failure?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- „70 % technische Kapazität“ – wie viel davon war wirklich nutzbar, und was hat die reale Leistung begrenzt (Personal, Material, Freigaben)?
- Welche Kosten wären möglicherweise nicht von der Versicherung gedeckt – und wie verändert das den Liquiditätsbedarf?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?
- *(Schwerpunkt)* Wo lagen technische Bereitstellung, Sicherheitsfreigabe und fachliche Freigabe zu dicht beieinander?
- *(Schwerpunkt)* Welche Daten waren am Ende wirklich belastbar – und woher wusstet ihr das?



# Teil 2 – Waterkant


Stand: 2026-11-18 · Alle Angaben fiktiv. Erzeugt direkt aus dem Werkzeug: genau diese Karten, Texte und Reihenfolgen sieht der Tisch.

### Auftrag

Lies jede Geschichte von vorne nach hinten so, wie der Tisch sie erlebt (öffentliche Lagen auf der Bühne, vertrauliche Karten per E-Mail an einzelne Rollen, Entscheidungen an den Weichen, am Ende die Rechnung). Prüfe für jede Geschichte:

1. Ist sie in sich schlüssig – Zeitangaben, Zahlen, Wissen der Beteiligten, Folgen der Entscheidungen?
2. Verändern Schwerpunkt und Entscheidungen tatsächlich, worüber der Tisch entscheiden muss (nicht nur, welche Karten kommen)?
3. Gibt es Stellen, an denen eine Karte etwas voraussetzt, das in *dieser* Geschichte nicht passiert ist?
4. Ist die Rechnung am Ende zu den getroffenen Entscheidungen plausibel?

Bitte als Tabelle antworten: Geschichte | Stelle (Karten-ID) | Problem | Vorschlag (fertiger Text) | Dringlichkeit. Danach je Geschichte ein Satz Gesamturteil.

### Übersicht

| Nr. | Dauer | Schwerpunkt | Entscheidungen |
|---:|---:|---|---|
| 1 | 45 Min. | Ausgewogen | W1 herunterfahren, W2 frueh, W3 abwarten, W4 minimal, W5 gleichrangig |
| 2 | 60 Min. | Filialen, Lager und Saisonstart | W1 weiterlaufen, W2 spaeter, W3 bergen, W4 ausbauen, W5 eigene |
| 3 | 90 Min. | Ausgewogen | W1 herunterfahren, W2 frueh, W3 bergen, W4 minimal, W5 gleichrangig |
| 4 | 90 Min. | Krisenführung und Personenschutz | W1 weiterlaufen, W2 spaeter, W3 bergen, W4 ausbauen, W5 eigene |
| 5 | 90 Min. | IT-Wiederanlauf und Infrastruktur | W1 weiterlaufen, W2 frueh, W3 abwarten, W4 ausbauen, W5 gleichrangig |
| 6 | 120 Min. | Partner, Kunden und Kommunikation | W1 herunterfahren, W2 spaeter, W3 abwarten, W4 minimal, W5 eigene |
| 7 | 180 Min. | Ausgewogen | W1 weiterlaufen, W2 spaeter, W3 bergen, W4 ausbauen, W5 eigene |
| 8 | 180 Min. | Filialen, Lager und Saisonstart | W1 herunterfahren, W2 frueh, W3 abwarten, W4 minimal, W5 gleichrangig |

---

### Geschichte 1: 45 Minuten · Ausgewogen · W1 herunterfahren, W2 frueh, W3 abwarten, W4 minimal, W5 gleichrangig

**Besetzte Rollen (5):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz  
**Geplante Krisenzeit:** 40 Min. + ca. 5 Min. Abschluss · Entscheidungszeit je Lage ca. 1,25 Min.

#### Min. 0,0 · LK03 Serverraum wird warm · Dienstag 03:02 Uhr · Vorboten

Die Klimaanlage des Serverraums meldet Störung, die Temperatur steigt: 31 °C und weiter steigend. Seit 03:00 Uhr läuft die nächtliche Übertragung der Aktionspreise für den Saisonstart an die Filialkassen; gleichzeitig laden die Partnermärkte ihre Tagesabschlüsse hoch. Die Rufbereitschaft ruft die IT-Leitung an.

- Herunterfahren oder weiterlaufen lassen – was riskieren Sie jeweils?
- Wer darf nachts entscheiden, Systeme abzuschalten, die 23 Märkte betreffen?

> **Vertraulich SK03 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 0,2): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise an die Filialkassen läuft seit 03:00 Uhr und braucht noch etwa 40 Minuten; die Partnermärkte laden gerade ihre Tagesabschlüsse hoch. Herunterfahren heißt: Beides bricht ab – und das kurz vor dem Saisonstart.

**Entscheidung W1 (am Ende dieser Lage):** Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen sie weiter, bis die Gebäudetechnik die Ursache kennt?  
→ Der Tisch entscheidet: **Nicht zwingend benötigte Systeme sofort kontrolliert herunterfahren (Preisübertragung und Partner-Uploads brechen ab)**  
*Folge laut Drehbuch:* Die Datenbanken sind sauber beendet; die Rücksicherung braucht keine Reparatur. Die Aktionspreise fehlen dafür in allen 14 Filialen.

#### Min. 2,0 · LK04 Brandalarm im Rechenzentrum · Dienstag 03:10 Uhr · Ausbruch

Die Brandmeldeanlage löst aus: Rauch im USV-Raum neben dem Serverraum. Im Serverraum wird automatisch die Gaslöschanlage ausgelöst, der Raum wird mit Löschgas geflutet. Das Verwaltungsgebäude wird geräumt, die Nachtschicht im angrenzenden Zentrallager geht vorsorglich zum Sammelplatz. Die Feuerwehr ist alarmiert.

*Krisen-Info:* Brandort: USV-Raum · Gaslöschung im Serverraum ausgelöst · Gebäude geräumt

- Wer muss jetzt sofort informiert werden – in welcher Reihenfolge?
- Wer übernimmt bis zum Eintreffen der Feuerwehr die Führung vor Ort?
- Wann und wie wird der Krisenstab einberufen?

#### Min. 6,8 · LK06 Lagebild nach dem Löschen · Dienstag 05:30 Uhr · Ausbruch

Der Brand im USV-Raum ist gelöscht, alle Personen sind wohlauf. Der Serverraum selbst hat nicht gebrannt, ist aber verraucht; Löschgas und Rauch sind abgezogen. Das Gebäude bleibt bis zur Prüfung durch Sachverständige gesperrt. Im Rechenzentrum ist alles aus: Warenwirtschaft, Kassenzentrale, Lagerverwaltung, Gewerbekundenportal, Telefonanlage der Zentrale.

*Krisen-Info:* Rechenzentrum vollständig außer Betrieb · Gebäude gesperrt · Filialkassen offline-fähig ca. 72 Stunden (bis Freitag ca. 03:00 Uhr)

- Welche Geschäftsprozesse stehen jetzt – und welche laufen noch?
- Was ist bis zur Filialöffnung um 08:00 Uhr zu entscheiden?
- Wer übernimmt welche Aufgabe im Krisenstab?

> **Vertraulich SK06 an Leitung Arbeitssicherheit und Werkschutz** (Min. 7,2): Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Fluorwasserstoff und andere ätzende Gase entstehen. Er empfiehlt, USV-Raum und Serverraum erst nach Messung und Freigabe durch Sachverständige zu betreten – ausdrücklich auch für IT-Personal.

#### Min. 11,5 · LK09 Die Partnermärkte rufen an · Dienstag 08:30 Uhr · Eskalation

Die neun Partnermärkte im Einkaufsverbund, für die Waterkant Kassen- und Warenwirtschaft als Dienstleistung betreibt, stehen vor demselben Problem. Der Servicevertrag sieht ein Wiederherstellungsziel von 24 Stunden für Kassen- und Preisdienste vor. Die ersten Partner wollen wissen, wann es weitergeht – eine belastbare Prognose hat die IT noch nicht.

*Krisen-Info:* 9 Partnermärkte betroffen · Wiederherstellungsziel laut Vertrag: 24 Stunden · Prognose offen

- Was sagen Sie den Partnern – und wer sagt es?
- Was ist eine ehrliche Prognose, wenn Sie selbst keine haben?
- Welche Folgen hat das Überschreiten der 24 Stunden?

> **Vertraulich SK11 an Partnerbetreuung Verbund (Kundenmanagement IT-Service)** (Min. 12,0): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiederherstellungsziel 24 Stunden für Kassen- und Preisdienste. Er will bis 12 Uhr wissen, wann es weitergeht, sonst wendet er sich an den Verbundvorstand.

> **Vertraulich SK08 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Support Filialen und Kassen)** (Min. 13,6): Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe etwa 72 Stunden, danach verweigern sie neue Buchungen, bis sie wieder mit der Zentrale synchronisiert sind. Das wäre Freitag gegen 03:00 Uhr. In den Filialen weiß das noch niemand.

> **Vertraulich SK35 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt Notfallmanagement / BCM-Koordination)** (Min. 14,2): Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine Papierkopie gibt es im Tresor der Geschäftsführung – im Verwaltungsgebäude, das bis zur Freigabe gesperrt ist.

**Entscheidung W2 (am Ende dieser Lage):** Informiert Waterkant heute alle Partnermärkte mit einer ehrlichen, aber unsicheren Prognose – oder erst, wenn ein belastbarer Wiederanlauftermin feststeht?  
→ Der Tisch entscheidet: **Heute 11 Uhr alle Partner informieren: Lage, ehrliche Spanne („Kassen frühestens Donnerstag“), fester Update-Takt**  
*Folge laut Drehbuch:* Die Partner planen mit Donnerstag; einer kritisiert später, dass „Donnerstag“ nur für Kassen, nicht für Bestellungen galt.

#### Min. 16,3 · LK14 Den Backup-Server bergen? · Mittwoch 07:30 Uhr · Höhepunkt

Die letzte vollständige Sicherungskopie beim Colocation-Anbieter stammt von Montag 01:00 Uhr – die Übertragung der Dienstagssicherung war beim Brand noch nicht fertig. Die Dienstagssicherung liegt auf dem Backup-Server im verrußten Serverraum. Eine Sanierungsfachfirma könnte ihn heute mit Schutzausrüstung bergen; die Freigabe des Raums für alle anderen kommt erst nach der Reinigung in etwa einer Woche.

*Krisen-Info:* Datenlücke ohne Bergung: ca. 26 Stunden · Bergung nur durch Fachfirma mit Schutzausrüstung · Messergebnis: Grenzwerte im Raum noch überschritten

- Wie viel ist Ihnen die fehlende Datenlücke wert – und welches Risiko für Menschen ist dafür vertretbar?
- Wer entscheidet über das Betreten: IT, Arbeitssicherheit, Geschäftsführung?
- Welche Voraussetzungen müssen erfüllt sein, bevor jemand den Raum betritt?

> **Vertraulich SK21 an Leitung Arbeitssicherheit und Werkschutz** (Min. 16,7): Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, aktuelles Messergebnis, Fachfirma mit Schutzausrüstung, Freiwilligkeit, Dokumentation. Die Fachfirma könnte heute um 14 Uhr – mit eigenem Personal, nicht mit eurer IT.

> **Vertraulich SK13 an Gebäudetechnik und Facility Management** (Min. 18,1): Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht Arbeitstage. Die Klimaanlage darf bis zur Prüfung nicht laufen – Feuchtigkeit plus Ruß beschleunigt die Korrosion. Ob die Hardware danach noch zuverlässig ist, kann er nicht sagen.

> **Vertraulich SK14 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft))** (Min. 18,6): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall Rußfilm. In Rack 7 steht der Backup-Server mit der Dienstagssicherung von 01:00 Uhr. Wird er bald geborgen und gereinigt, sind die Daten vermutlich lesbar – je länger er im Ruß steht, desto größer die Korrosionsgefahr.

> **Vertraulich SK18 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt Leitung Einkauf und Dienstleistersteuerung)** (Min. 19,0): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-Anbieter kann das Ausweich-Rack binnen 48 Stunden erweitern – Mindestlaufzeit zwölf Monate, Kosten für das erste Jahr rund 210.000 € einschließlich Dienstleistern (Szenarioannahme).

> **Vertraulich SK19 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 19,4): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und den Kern der Warenwirtschaft. Die Netzwerkanbindung der 23 Märkte muss neu eingerichtet werden – das wurde nie vollständig geübt. Zwei deiner fünf Leute sind seit Dienstag 03:00 Uhr wach.

**Entscheidung W3 (am Ende dieser Lage):** Lässt Waterkant den Backup-Server mit der Dienstagssicherung heute von einer Fachfirma aus dem gesperrten Serverraum bergen – oder wartet es die Freigabe des Raums ab?  
→ Der Tisch entscheidet: **Freigabe des Raums abwarten (nach Reinigung, ca. eine Woche)**  
*Folge laut Drehbuch:* Niemand betritt den Raum vorzeitig. Die Lücke von etwa 26 Stunden muss von Hand nachgebucht werden; ob die Dienstagssicherung später noch lesbar ist, ist offen.

#### Min. 21,0 · LK15 Wie weit geht der Ausweichbetrieb? · Mittwoch 10:00 Uhr · Höhepunkt

Die IT hat einen Plan: Kassen- und Preisdienste und der Kern der Warenwirtschaft passen in das Ausweich-Rack und könnten am Donnerstag laufen. Lagerverwaltung, Gewerbekundenportal und Online-Bestände passen nur nach einer Erweiterung, die der Anbieter binnen 48 Stunden liefern kann – mit zwölf Monaten Mindestlaufzeit. Ohne Erweiterung warten diese Systeme auf das eigene Rechenzentrum, laut Sanierer frühestens in drei Wochen.

*Krisen-Info:* Kassen- und Preisdienste: Donnerstag möglich · Rest: Erweiterung (48 h, 12 Monate Vertrag) oder ca. 3 Wochen warten

- Was ist Ihnen schneller Online-Handel und Lagerbetrieb wert?
- Welche Risiken hat ein schneller, großer Umzug für ein müdes Team?
- Wer trägt diese Entscheidung – IT, Finanzen oder Geschäftsführung?

> **Vertraulich SK46 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 21,5): Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Ausweich-Racks gehört und ruft dich an. Nach eurer Geschäftsordnung brauchen Verträge mit mehr als zwölf Monaten Bindung die Zustimmung der Gesellschafter. Er ist bis Freitag im Ausland, aber telefonisch erreichbar: „Entscheiden Sie, was nötig ist – aber ich will es vorher wissen und nicht aus der Rechnung erfahren.“

**Entscheidung W4 (am Ende dieser Lage):** Bringt Waterkant nur das Nötigste ins Ausweich-Rack – oder erweitert es den Ausweichbetrieb, damit auch Lager, Gewerbeportal und Online-Bestände schnell zurückkommen?  
→ Der Tisch entscheidet: **Nur Kassen- und Preisdienste und den Kern der Warenwirtschaft verlagern; der Rest wartet auf das eigene Rechenzentrum**  
*Folge laut Drehbuch:* Lager, Gewerbeportal und Online-Bestände bleiben etwa drei Wochen eingeschränkt; Gewerbekunden weichen aus.

#### Min. 25,8 · LK20 Wer kassiert zuerst? · Donnerstag 10:00 Uhr · Folgen

Die Ausweichumgebung kann am Donnerstagabend die ersten Märkte versorgen, aber nicht alle gleichzeitig: Pro Stunde lassen sich etwa zwei Märkte sicher umstellen. Es sind 23. Die eigenen Filialen haben den größten Umsatz in der Saisonwoche; die Partnermärkte haben einen Vertrag. Um Freitag 03:00 Uhr erreichen die Kassen die 72-Stunden-Grenze.

*Krisen-Info:* ca. 2 Märkte pro Stunde · 23 Märkte · Kassen-Grenze Freitag ca. 03:00 Uhr

- Nach welchem Kriterium legen Sie die Reihenfolge fest?
- Wer entscheidet – und wer sagt es den Partnern?
- Was passiert mit Märkten, die die 72-Stunden-Grenze reißen?

**Entscheidung W5 (am Ende dieser Lage):** Stellt Waterkant eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium um – oder kommen die eigenen 14 Filialen zuerst?  
→ Der Tisch entscheidet: **Eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium (größte Märkte zuerst, unabhängig vom Eigentümer)**  
*Folge laut Drehbuch:* Alle Märkte laufen bis Freitagfrüh; einige eigene Filialen erst in der Nacht.

#### Min. 30,5 · LK22 Die Kassen laufen wieder · Donnerstag 18:00 Uhr · Wiederanlauf

Die Kassen- und Preisdienste laufen aus dem Ausweich-Rack. Die ersten Märkte sind umgestellt, die Kassen gleichen ihre Offline-Abverkäufe ab, die Aktionspreise sind hinterlegt. Die übrigen Märkte folgen in der Nacht – nach der festgelegten Reihenfolge. Die kontrollierte Abschaltung in der Brandnacht hat sich bezahlt gemacht: Die Datenbanken mussten nicht repariert werden. Die Partnermärkte hatten seit Dienstag mit Donnerstag geplant. Ein Partner kritisiert, dass „Donnerstag“ nur für die Kassen galt, nicht für Bestellungen und Bestände. Eigene Filialen und Partnermärkte werden nach derselben Reihenfolge umgestellt – einige eigene Filialen erst in der Nacht.

*Krisen-Info:* Kassen- und Preisdienste wieder verfügbar · Umstellung läuft bis in die Nacht

- Woran merken Sie, dass ein Markt wirklich sauber läuft?
- Wer informiert Filialen, Partner und Hotline – mit welcher Botschaft?

#### Min. 35,3 · LK27 Stabiler Notbetrieb · Sonntag 12:00 Uhr · Wiederanlauf

Nach fünf Tagen läuft Waterkant im stabilen Notbetrieb: Kassen und Preise aus dem Ausweich-Rack, die Warenwirtschaft mit nachgebuchten Daten, das Zentrallager liefert wieder. Das eigene Rechenzentrum ist gesperrt, die Reinigung hat begonnen. Das IT-Team arbeitet seit Dienstag in Doppelschichten, zwei Filialleitungen haben sich krankgemeldet. Die Nachbuchung der rund 26 Stunden Datenlücke läuft noch bis in die nächste Woche. Lagerverwaltung, Gewerbeportal und Online-Bestände bleiben bis zur Rückkehr ins eigene Rechenzentrum eingeschränkt.

*Krisen-Info:* Notbetrieb stabil · eigenes Rechenzentrum gesperrt · Team erschöpft

- Welche Botschaft senden Sie an Beschäftigte, Partner und Kundschaft – und wer sagt es?
- Wie entlasten Sie die Menschen, die seit Dienstag durcharbeiten?
- Was ist ab Montag „normal“ – und was noch nicht?

> **Vertraulich SK32 an Geschäftsführung (CEO), Krisenstabsleitung (statt Personalleitung)** (Min. 35,7): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei Filialleitungen sind krank. Der Betriebsrat fragt, wer die Einsätze am Wochenende angeordnet hat. Arbeitszeitfragen sind fachlich zu prüfen.

#### Abschluss

Nach sieben Tagen. Kassen und Preise laufen aus dem Ausweich-Rack, die Warenwirtschaft ist nachgebucht, das Zentrallager liefert. Das eigene Rechenzentrum ist gesperrt, die Reinigung läuft. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 3.176.000 € + aus Entscheidungen: Abgebrochene Preisübertragung: Aktionspreise auch in den 5 Filialen per Kulanz, die sie sonst erhalten hätten (50.000 €); Nacherfassung von rund 26 Stunden Bewegungsdaten (140.000 €); Entgangener Rohertrag Online-Shop und Gewerbekunden (ca. 3 Wochen eingeschränkt) (260.000 €); Saisonumsatz: einige eigene Filialen erst in der Nacht wieder voll (60.000 €) = **3.686.000 €**; Mögliche Erstattung durch Elektronik- und Betriebsunterbrechungsversicherung (optimistische Modellannahme, nicht bestätigt): − 1.600.000 € → **beim Unternehmen bleiben 2.086.000 €** (17 % des Jahresgewinns).

*Fazit auf der Bühne:* Nach fünf Tagen kassieren alle Märkte wieder. Ob das eigene Rechenzentrum zurückkommt, ist offen – das Vertrauen der Partner hängt an dieser Woche. Eine Krise ist erst vorbei, wenn Partner, Kundschaft und Beschäftigte wieder vertrauen.

#### Debriefing in dieser Geschichte

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

### Geschichte 2: 60 Minuten · Filialen, Lager und Saisonstart · W1 weiterlaufen, W2 spaeter, W3 bergen, W4 ausbauen, W5 eigene

**Besetzte Rollen (6):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz, Leitung Finanzen und Versicherung (CFO)  
**Geplante Krisenzeit:** 54 Min. + ca. 6 Min. Abschluss · Entscheidungszeit je Lage ca. 2,5 Min.
  
**Leitfrage des Schwerpunkts (für die Moderation):** Wie verkaufen Sie zum Saisonstart, ohne später nicht mehr nachvollziehen zu können, was verkauft wurde?

#### Min. 0,0 · LK03 Serverraum wird warm · Dienstag 03:02 Uhr · Vorboten

Die Klimaanlage des Serverraums meldet Störung, die Temperatur steigt: 31 °C und weiter steigend. Seit 03:00 Uhr läuft die nächtliche Übertragung der Aktionspreise für den Saisonstart an die Filialkassen; gleichzeitig laden die Partnermärkte ihre Tagesabschlüsse hoch. Die Rufbereitschaft ruft die IT-Leitung an.

- Herunterfahren oder weiterlaufen lassen – was riskieren Sie jeweils?
- Wer darf nachts entscheiden, Systeme abzuschalten, die 23 Märkte betreffen?

> **Vertraulich SK03 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 0,2): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise an die Filialkassen läuft seit 03:00 Uhr und braucht noch etwa 40 Minuten; die Partnermärkte laden gerade ihre Tagesabschlüsse hoch. Herunterfahren heißt: Beides bricht ab – und das kurz vor dem Saisonstart.

**Entscheidung W1 (am Ende dieser Lage):** Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen sie weiter, bis die Gebäudetechnik die Ursache kennt?  
→ Der Tisch entscheidet: **Weiterlaufen lassen, bis die Gebäudetechnik die Ursache geklärt hat**  
*Folge laut Drehbuch:* Die Preisübertragung erreicht vor dem Stromausfall noch 5 der 14 Filialen. Der harte Ausfall hinterlässt eine inkonsistente Datenbank: einen Tag Reparatur.

#### Min. 2,0 · LK04 Brandalarm im Rechenzentrum · Dienstag 03:10 Uhr · Ausbruch

Die Brandmeldeanlage löst aus: Rauch im USV-Raum neben dem Serverraum. Im Serverraum wird automatisch die Gaslöschanlage ausgelöst, der Raum wird mit Löschgas geflutet. Das Verwaltungsgebäude wird geräumt, die Nachtschicht im angrenzenden Zentrallager geht vorsorglich zum Sammelplatz. Die Feuerwehr ist alarmiert.

*Krisen-Info:* Brandort: USV-Raum · Gaslöschung im Serverraum ausgelöst · Gebäude geräumt

- Wer muss jetzt sofort informiert werden – in welcher Reihenfolge?
- Wer übernimmt bis zum Eintreffen der Feuerwehr die Führung vor Ort?
- Wann und wie wird der Krisenstab einberufen?

#### Min. 8,5 · LK06 Lagebild nach dem Löschen · Dienstag 05:30 Uhr · Ausbruch

Der Brand im USV-Raum ist gelöscht, alle Personen sind wohlauf. Der Serverraum selbst hat nicht gebrannt, ist aber verraucht; Löschgas und Rauch sind abgezogen. Das Gebäude bleibt bis zur Prüfung durch Sachverständige gesperrt. Im Rechenzentrum ist alles aus: Warenwirtschaft, Kassenzentrale, Lagerverwaltung, Gewerbekundenportal, Telefonanlage der Zentrale.

*Krisen-Info:* Rechenzentrum vollständig außer Betrieb · Gebäude gesperrt · Filialkassen offline-fähig ca. 72 Stunden (bis Freitag ca. 03:00 Uhr)

- Welche Geschäftsprozesse stehen jetzt – und welche laufen noch?
- Was ist bis zur Filialöffnung um 08:00 Uhr zu entscheiden?
- Wer übernimmt welche Aufgabe im Krisenstab?
- Was muss bis 08:00 Uhr in den Filialen ankommen? *(Schwerpunkt)*

> **Vertraulich SK06 an Leitung Arbeitssicherheit und Werkschutz** (Min. 9,0): Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Fluorwasserstoff und andere ätzende Gase entstehen. Er empfiehlt, USV-Raum und Serverraum erst nach Messung und Freigabe durch Sachverständige zu betreten – ausdrücklich auch für IT-Personal.

#### Min. 15,0 · LK09 Die Partnermärkte rufen an · Dienstag 08:30 Uhr · Eskalation

Die neun Partnermärkte im Einkaufsverbund, für die Waterkant Kassen- und Warenwirtschaft als Dienstleistung betreibt, stehen vor demselben Problem. Der Servicevertrag sieht ein Wiederherstellungsziel von 24 Stunden für Kassen- und Preisdienste vor. Die ersten Partner wollen wissen, wann es weitergeht – eine belastbare Prognose hat die IT noch nicht.

*Krisen-Info:* 9 Partnermärkte betroffen · Wiederherstellungsziel laut Vertrag: 24 Stunden · Prognose offen

- Was sagen Sie den Partnern – und wer sagt es?
- Was ist eine ehrliche Prognose, wenn Sie selbst keine haben?
- Welche Folgen hat das Überschreiten der 24 Stunden?
- Was brauchen die Partnermärkte, um morgen zu öffnen? *(Schwerpunkt)*

> **Vertraulich SK11 an Partnerbetreuung Verbund (Kundenmanagement IT-Service)** (Min. 15,5): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiederherstellungsziel 24 Stunden für Kassen- und Preisdienste. Er will bis 12 Uhr wissen, wann es weitergeht, sonst wendet er sich an den Verbundvorstand.

> **Vertraulich SK08 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Support Filialen und Kassen)** (Min. 17,8): Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe etwa 72 Stunden, danach verweigern sie neue Buchungen, bis sie wieder mit der Zentrale synchronisiert sind. Das wäre Freitag gegen 03:00 Uhr. In den Filialen weiß das noch niemand.

> **Vertraulich SK35 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt Notfallmanagement / BCM-Koordination)** (Min. 18,7): Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine Papierkopie gibt es im Tresor der Geschäftsführung – im Verwaltungsgebäude, das bis zur Freigabe gesperrt ist.

**Entscheidung W2 (am Ende dieser Lage):** Informiert Waterkant heute alle Partnermärkte mit einer ehrlichen, aber unsicheren Prognose – oder erst, wenn ein belastbarer Wiederanlauftermin feststeht?  
→ Der Tisch entscheidet: **Erst informieren, wenn ein belastbarer Termin feststeht (voraussichtlich Mittwoch)**  
*Folge laut Drehbuch:* Die Partner erfahren die Lage aus der Zeitung; der Verbundvorstand verlangt ein Gespräch (vertrauliche Karte bei „Den Backup-Server bergen?“); Kulanzposten in der Rechnung.

#### Min. 21,5 · LK14 Den Backup-Server bergen? · Mittwoch 07:30 Uhr · Höhepunkt

Die letzte vollständige Sicherungskopie beim Colocation-Anbieter stammt von Montag 01:00 Uhr – die Übertragung der Dienstagssicherung war beim Brand noch nicht fertig. Die Dienstagssicherung liegt auf dem Backup-Server im verrußten Serverraum. Eine Sanierungsfachfirma könnte ihn heute mit Schutzausrüstung bergen; die Freigabe des Raums für alle anderen kommt erst nach der Reinigung in etwa einer Woche.

*Krisen-Info:* Datenlücke ohne Bergung: ca. 26 Stunden · Bergung nur durch Fachfirma mit Schutzausrüstung · Messergebnis: Grenzwerte im Raum noch überschritten

- Wie viel ist Ihnen die fehlende Datenlücke wert – und welches Risiko für Menschen ist dafür vertretbar?
- Wer entscheidet über das Betreten: IT, Arbeitssicherheit, Geschäftsführung?
- Welche Voraussetzungen müssen erfüllt sein, bevor jemand den Raum betritt?
- Was bedeutet die Datenlücke für Bestände im Lager und in den Filialen? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK42 an Geschäftsführung (CEO), Krisenstabsleitung:** Der Verbundvorstand ruft an: Die Partner haben aus der Lokalzeitung mehr über den Brand erfahren als von Waterkant. Er verlangt bis heute Abend ein Gespräch mit dir.

> **Vertraulich SK21 an Leitung Arbeitssicherheit und Werkschutz** (Min. 22,0): Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, aktuelles Messergebnis, Fachfirma mit Schutzausrüstung, Freiwilligkeit, Dokumentation. Die Fachfirma könnte heute um 14 Uhr – mit eigenem Personal, nicht mit eurer IT.

> **Vertraulich SK13 an Gebäudetechnik und Facility Management** (Min. 24,1): Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht Arbeitstage. Die Klimaanlage darf bis zur Prüfung nicht laufen – Feuchtigkeit plus Ruß beschleunigt die Korrosion. Ob die Hardware danach noch zuverlässig ist, kann er nicht sagen.

> **Vertraulich SK14 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft))** (Min. 24,6): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall Rußfilm. In Rack 7 steht der Backup-Server mit der Dienstagssicherung von 01:00 Uhr. Wird er bald geborgen und gereinigt, sind die Daten vermutlich lesbar – je länger er im Ruß steht, desto größer die Korrosionsgefahr.

> **Vertraulich SK18 an Leitung Finanzen und Versicherung (CFO) (statt Leitung Einkauf und Dienstleistersteuerung)** (Min. 25,2): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-Anbieter kann das Ausweich-Rack binnen 48 Stunden erweitern – Mindestlaufzeit zwölf Monate, Kosten für das erste Jahr rund 210.000 € einschließlich Dienstleistern (Szenarioannahme).

> **Vertraulich SK19 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 25,8): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und den Kern der Warenwirtschaft. Die Netzwerkanbindung der 23 Märkte muss neu eingerichtet werden – das wurde nie vollständig geübt. Zwei deiner fünf Leute sind seit Dienstag 03:00 Uhr wach.

**Entscheidung W3 (am Ende dieser Lage):** Lässt Waterkant den Backup-Server mit der Dienstagssicherung heute von einer Fachfirma aus dem gesperrten Serverraum bergen – oder wartet es die Freigabe des Raums ab?  
→ Der Tisch entscheidet: **Heute durch die Fachfirma unter Schutzausrüstung bergen lassen (nach Gefährdungsbeurteilung), dann reinigen und prüfen**  
*Folge laut Drehbuch:* Die Dienstagssicherung ist nach Reinigung lesbar; die Datenlücke schrumpft auf etwa zwei Stunden. Die Berufsgenossenschaft fragt nach den Unterlagen.

#### Min. 28,0 · LK15 Wie weit geht der Ausweichbetrieb? · Mittwoch 10:00 Uhr · Höhepunkt

Die IT hat einen Plan: Kassen- und Preisdienste und der Kern der Warenwirtschaft passen in das Ausweich-Rack und könnten am Donnerstag laufen. Lagerverwaltung, Gewerbekundenportal und Online-Bestände passen nur nach einer Erweiterung, die der Anbieter binnen 48 Stunden liefern kann – mit zwölf Monaten Mindestlaufzeit. Ohne Erweiterung warten diese Systeme auf das eigene Rechenzentrum, laut Sanierer frühestens in drei Wochen.

*Krisen-Info:* Kassen- und Preisdienste: Donnerstag möglich · Rest: Erweiterung (48 h, 12 Monate Vertrag) oder ca. 3 Wochen warten

- Was ist Ihnen schneller Online-Handel und Lagerbetrieb wert?
- Welche Risiken hat ein schneller, großer Umzug für ein müdes Team?
- Wer trägt diese Entscheidung – IT, Finanzen oder Geschäftsführung?
- Wie lange kommt das Lager ohne Lagerverwaltung aus? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK41 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)):** Die Datenbank der Warenwirtschaft ist nach dem harten Stromausfall in der Brandnacht inkonsistent. Bevor ihr irgendetwas ins Ausweich-Rack übertragt, muss sie repariert werden – etwa ein Tag zusätzlich.

> **Vertraulich SK46 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 28,5): Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Ausweich-Racks gehört und ruft dich an. Nach eurer Geschäftsordnung brauchen Verträge mit mehr als zwölf Monaten Bindung die Zustimmung der Gesellschafter. Er ist bis Freitag im Ausland, aber telefonisch erreichbar: „Entscheiden Sie, was nötig ist – aber ich will es vorher wissen und nicht aus der Rechnung erfahren.“

**Entscheidung W4 (am Ende dieser Lage):** Bringt Waterkant nur das Nötigste ins Ausweich-Rack – oder erweitert es den Ausweichbetrieb, damit auch Lager, Gewerbeportal und Online-Bestände schnell zurückkommen?  
→ Der Tisch entscheidet: **Ausweich-Rack binnen 48 Stunden erweitern und auch Lager, Gewerbeportal und Online-Bestände verlagern (zwölf Monate Mindestlaufzeit)**  
*Folge laut Drehbuch:* Online-Shop und Portal laufen ab Freitagabend wieder; beim schnellen Umzug geht ein Preisabgleich verloren (vertrauliche Karte am Saisonsamstag).

#### Min. 34,5 · LK20 Wer kassiert zuerst? · Donnerstag 10:00 Uhr · Folgen

Die Ausweichumgebung kann am Donnerstagabend die ersten Märkte versorgen, aber nicht alle gleichzeitig: Pro Stunde lassen sich etwa zwei Märkte sicher umstellen. Es sind 23. Die eigenen Filialen haben den größten Umsatz in der Saisonwoche; die Partnermärkte haben einen Vertrag. Um Freitag 03:00 Uhr erreichen die Kassen die 72-Stunden-Grenze.

*Krisen-Info:* ca. 2 Märkte pro Stunde · 23 Märkte · Kassen-Grenze Freitag ca. 03:00 Uhr

- Nach welchem Kriterium legen Sie die Reihenfolge fest?
- Wer entscheidet – und wer sagt es den Partnern?
- Was passiert mit Märkten, die die 72-Stunden-Grenze reißen?
- Welche Märkte brauchen zuerst wieder Kassen – nach welchem Kriterium? *(Schwerpunkt)*

**Entscheidung W5 (am Ende dieser Lage):** Stellt Waterkant eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium um – oder kommen die eigenen 14 Filialen zuerst?  
→ Der Tisch entscheidet: **Eigene 14 Filialen zuerst, Partnermärkte etwa zwölf Stunden später**  
*Folge laut Drehbuch:* Die eigenen Filialen kassieren ab Donnerstagabend, die Partner erst kurz vor der 72-Stunden-Grenze; zwei Partner prüfen einen Wechsel (vertrauliche Karte).

#### Min. 41,0 · LK22 Die Kassen laufen wieder · Donnerstag 18:00 Uhr · Wiederanlauf

Die Kassen- und Preisdienste laufen aus dem Ausweich-Rack. Die ersten Märkte sind umgestellt, die Kassen gleichen ihre Offline-Abverkäufe ab, die Aktionspreise sind hinterlegt. Die übrigen Märkte folgen in der Nacht – nach der festgelegten Reihenfolge. Die eigenen Filialen kassieren seit Donnerstagabend, die Partnermärkte folgen in der Nacht – knapp vor der 72-Stunden-Grenze.

*Krisen-Info:* Kassen- und Preisdienste wieder verfügbar · Umstellung läuft bis in die Nacht

- Woran merken Sie, dass ein Markt wirklich sauber läuft?
- Wer informiert Filialen, Partner und Hotline – mit welcher Botschaft?
- Wie gehen Filialen mit Bons aus dem Offline-Zeitraum um? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK43 an Leitung Arbeitssicherheit und Werkschutz:** Die Berufsgenossenschaft fragt nach der Gefährdungsbeurteilung für den Einsatz der Fachfirma im kontaminierten Serverraum und nach dem Messprotokoll.

> **Vertraulich (Folge einer Entscheidung) SK44 an Partnerbetreuung Verbund (Kundenmanagement IT-Service):** Zwei Partnermärkte haben bemerkt, dass die Waterkant-Filialen zwölf Stunden früher wieder kassieren konnten. Einer hat Kontakt zu einem anderen IT-Dienstleister aufgenommen.

#### Min. 47,5 · LK27 Stabiler Notbetrieb · Sonntag 12:00 Uhr · Wiederanlauf

Nach fünf Tagen läuft Waterkant im stabilen Notbetrieb: Kassen und Preise aus dem Ausweich-Rack, die Warenwirtschaft mit nachgebuchten Daten, das Zentrallager liefert wieder. Das eigene Rechenzentrum ist gesperrt, die Reinigung hat begonnen. Das IT-Team arbeitet seit Dienstag in Doppelschichten, zwei Filialleitungen haben sich krankgemeldet. Dank der am Mittwoch geborgenen Dienstagssicherung fehlten nur rund zwei Stunden Daten. Auch Lagerverwaltung, Gewerbeportal und Online-Bestände laufen aus dem erweiterten Ausweich-Rack.

*Krisen-Info:* Notbetrieb stabil · eigenes Rechenzentrum gesperrt · Team erschöpft

- Welche Botschaft senden Sie an Beschäftigte, Partner und Kundschaft – und wer sagt es?
- Wie entlasten Sie die Menschen, die seit Dienstag durcharbeiten?
- Was ist ab Montag „normal“ – und was noch nicht?
- Was ist im Filialbetrieb ab Montag wieder normal – und was nicht? *(Schwerpunkt)*

> **Vertraulich SK32 an Geschäftsführung (CEO), Krisenstabsleitung (statt Personalleitung)** (Min. 48,0): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei Filialleitungen sind krank. Der Betriebsrat fragt, wer die Einsätze am Wochenende angeordnet hat. Arbeitszeitfragen sind fachlich zu prüfen.

#### Abschluss

Nach sieben Tagen. Kassen und Preise laufen aus dem Ausweich-Rack, die Warenwirtschaft ist nachgebucht, das Zentrallager liefert. Das eigene Rechenzentrum ist gesperrt, die Reinigung läuft. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 3.176.000 € + aus Entscheidungen: Reparatur der Warenwirtschafts-Datenbank nach hartem Ausfall (ein Tag Verzug) (95.000 €); Kulanz und Sonderkonditionen für Partnermärkte (40.000 €); Bergung, Reinigung und Datenrettung des Backup-Servers durch Fachfirmen (45.000 €); Erweiterung des Ausweichbetriebs (12 Monate) und zusätzliche Dienstleister (210.000 €); Zusätzliche Gutschriften und Risiko des Partnerverlusts im IT-Service (12 Monate) (90.000 €) = **3.656.000 €**; Mögliche Erstattung durch Elektronik- und Betriebsunterbrechungsversicherung (optimistische Modellannahme, nicht bestätigt): − 1.600.000 € → **beim Unternehmen bleiben 2.056.000 €** (17 % des Jahresgewinns).

*Fazit auf der Bühne:* Nach fünf Tagen kassieren alle Märkte wieder. Ob das eigene Rechenzentrum zurückkommt, ist offen – das Vertrauen der Partner hängt an dieser Woche. Eine Krise ist erst vorbei, wenn Partner, Kundschaft und Beschäftigte wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das in der Nacht entscheiden dürfen?
- Wann stand der Schutz von Menschen gegen Daten, Umsatz oder Tempo – und wie habt ihr entschieden?
- Wie kamen Meldungen aus Filialen, Partnermärkten und Hotline beim Krisenstab an – und wie kamen Anweisungen zurück?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- Welche Zusage an Partner oder Kunden war am riskantesten?
- Wo waren Single Points of Failure – Technik, Wissen, Personen?
- Welche Kosten trägt die Versicherung wahrscheinlich nicht – und was bedeutet das für die Liquidität?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?
- *(Schwerpunkt)* Welche Behelfslösung im Filial- und Lagerbetrieb hat am meisten Nacharbeit erzeugt?
- *(Schwerpunkt)* Wo hätte eine vorbereitete Papierlösung geholfen?

---

### Geschichte 3: 90 Minuten · Ausgewogen · W1 herunterfahren, W2 frueh, W3 bergen, W4 minimal, W5 gleichrangig

**Besetzte Rollen (9):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz, Leitung Finanzen und Versicherung (CFO), Leitung Unternehmenskommunikation und Marketing, IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Regionalleitung Filialen Nord  
**Geplante Krisenzeit:** 81 Min. + ca. 9 Min. Abschluss · Entscheidungszeit je Lage ca. 2,7 Min.

#### Min. 0,0 · LK01 USV meldet Batteriewarnung · Montag 22:40 Uhr · Vorboten

Die Gebäudeleittechnik meldet für die USV-Anlage im Rechenzentrum: „Batterietemperatur Modul 3 erhöht“. Der Sensor gilt als launisch, die Meldung kam in den letzten Wochen schon dreimal. Die Rufbereitschaft der IT quittiert die Meldung per App.

- Was tun Sie mit einer Meldung, die schon oft falsch war?
- Wer müsste davon wissen – IT, Gebäudetechnik oder beide?

#### Min. 3,0 · LK02 Geruch im Technikflur · Dienstag 02:35 Uhr · Vorboten

Der Wachdienst meldet bei seinem Rundgang einen Geruch nach verschmortem Kunststoff im Technikflur des Verwaltungsgebäudes, nahe dem USV-Raum. Sichtbar ist nichts, die Brandmeldeanlage ist ruhig. Der Wachmann ruft die Gebäudetechnik-Bereitschaft an.

- Wer entscheidet um 02:35 Uhr, ob das ein Notfall ist?
- Würden Sie jemanden wecken – und wen?

#### Min. 6,0 · LK03 Serverraum wird warm · Dienstag 03:02 Uhr · Vorboten

Die Klimaanlage des Serverraums meldet Störung, die Temperatur steigt: 31 °C und weiter steigend. Seit 03:00 Uhr läuft die nächtliche Übertragung der Aktionspreise für den Saisonstart an die Filialkassen; gleichzeitig laden die Partnermärkte ihre Tagesabschlüsse hoch. Die Rufbereitschaft ruft die IT-Leitung an.

- Herunterfahren oder weiterlaufen lassen – was riskieren Sie jeweils?
- Wer darf nachts entscheiden, Systeme abzuschalten, die 23 Märkte betreffen?

> **Vertraulich SK03 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 6,3): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise an die Filialkassen läuft seit 03:00 Uhr und braucht noch etwa 40 Minuten; die Partnermärkte laden gerade ihre Tagesabschlüsse hoch. Herunterfahren heißt: Beides bricht ab – und das kurz vor dem Saisonstart.

**Entscheidung W1 (am Ende dieser Lage):** Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen sie weiter, bis die Gebäudetechnik die Ursache kennt?  
→ Der Tisch entscheidet: **Nicht zwingend benötigte Systeme sofort kontrolliert herunterfahren (Preisübertragung und Partner-Uploads brechen ab)**  
*Folge laut Drehbuch:* Die Datenbanken sind sauber beendet; die Rücksicherung braucht keine Reparatur. Die Aktionspreise fehlen dafür in allen 14 Filialen.

#### Min. 9,0 · LK04 Brandalarm im Rechenzentrum · Dienstag 03:10 Uhr · Ausbruch

Die Brandmeldeanlage löst aus: Rauch im USV-Raum neben dem Serverraum. Im Serverraum wird automatisch die Gaslöschanlage ausgelöst, der Raum wird mit Löschgas geflutet. Das Verwaltungsgebäude wird geräumt, die Nachtschicht im angrenzenden Zentrallager geht vorsorglich zum Sammelplatz. Die Feuerwehr ist alarmiert.

*Krisen-Info:* Brandort: USV-Raum · Gaslöschung im Serverraum ausgelöst · Gebäude geräumt

- Wer muss jetzt sofort informiert werden – in welcher Reihenfolge?
- Wer übernimmt bis zum Eintreffen der Feuerwehr die Führung vor Ort?
- Wann und wie wird der Krisenstab einberufen?

#### Min. 16,2 · LK06 Lagebild nach dem Löschen · Dienstag 05:30 Uhr · Ausbruch

Der Brand im USV-Raum ist gelöscht, alle Personen sind wohlauf. Der Serverraum selbst hat nicht gebrannt, ist aber verraucht; Löschgas und Rauch sind abgezogen. Das Gebäude bleibt bis zur Prüfung durch Sachverständige gesperrt. Im Rechenzentrum ist alles aus: Warenwirtschaft, Kassenzentrale, Lagerverwaltung, Gewerbekundenportal, Telefonanlage der Zentrale.

*Krisen-Info:* Rechenzentrum vollständig außer Betrieb · Gebäude gesperrt · Filialkassen offline-fähig ca. 72 Stunden (bis Freitag ca. 03:00 Uhr)

- Welche Geschäftsprozesse stehen jetzt – und welche laufen noch?
- Was ist bis zur Filialöffnung um 08:00 Uhr zu entscheiden?
- Wer übernimmt welche Aufgabe im Krisenstab?

> **Vertraulich SK06 an Leitung Arbeitssicherheit und Werkschutz** (Min. 16,7): Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Fluorwasserstoff und andere ätzende Gase entstehen. Er empfiehlt, USV-Raum und Serverraum erst nach Messung und Freigabe durch Sachverständige zu betreten – ausdrücklich auch für IT-Personal.

#### Min. 23,4 · LK08 Saisonstart ohne Aktionspreise · Dienstag 07:00 Uhr · Eskalation

Die Filialen bereiten den Saisonstart vor; der Prospekt mit Aktionspreisen ist seit Sonntag verteilt. An den Kassen sind die Aktionspreise nicht hinterlegt, Bestandsauskünfte sind nicht möglich. Filialleitungen fragen, ob sie überhaupt öffnen sollen und ob sie Prospektpreise von Hand eingeben dürfen.

*Krisen-Info:* Öffnung 08:00 Uhr · Aktionspreise nicht an den Kassen · keine Bestandsauskunft

- Öffnen die Filialen – und mit welcher Anweisung?
- Wie gehen Kassen mit Prospektpreisen um, einheitlich in allen 14 Filialen?
- Wer gibt die Anweisung raus, und wie kommt sie an?

> **Vertraulich SK08 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Support Filialen und Kassen)** (Min. 26,9): Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe etwa 72 Stunden, danach verweigern sie neue Buchungen, bis sie wieder mit der Zentrale synchronisiert sind. Das wäre Freitag gegen 03:00 Uhr. In den Filialen weiß das noch niemand.

> **Vertraulich SK35 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt Notfallmanagement / BCM-Koordination)** (Min. 28,2): Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine Papierkopie gibt es im Tresor der Geschäftsführung – im Verwaltungsgebäude, das bis zur Freigabe gesperrt ist.

#### Min. 30,6 · LK09 Die Partnermärkte rufen an · Dienstag 08:30 Uhr · Eskalation

Die neun Partnermärkte im Einkaufsverbund, für die Waterkant Kassen- und Warenwirtschaft als Dienstleistung betreibt, stehen vor demselben Problem. Der Servicevertrag sieht ein Wiederherstellungsziel von 24 Stunden für Kassen- und Preisdienste vor. Die ersten Partner wollen wissen, wann es weitergeht – eine belastbare Prognose hat die IT noch nicht.

*Krisen-Info:* 9 Partnermärkte betroffen · Wiederherstellungsziel laut Vertrag: 24 Stunden · Prognose offen

- Was sagen Sie den Partnern – und wer sagt es?
- Was ist eine ehrliche Prognose, wenn Sie selbst keine haben?
- Welche Folgen hat das Überschreiten der 24 Stunden?

> **Vertraulich SK11 an Partnerbetreuung Verbund (Kundenmanagement IT-Service)** (Min. 31,1): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiederherstellungsziel 24 Stunden für Kassen- und Preisdienste. Er will bis 12 Uhr wissen, wann es weitergeht, sonst wendet er sich an den Verbundvorstand.

**Entscheidung W2 (am Ende dieser Lage):** Informiert Waterkant heute alle Partnermärkte mit einer ehrlichen, aber unsicheren Prognose – oder erst, wenn ein belastbarer Wiederanlauftermin feststeht?  
→ Der Tisch entscheidet: **Heute 11 Uhr alle Partner informieren: Lage, ehrliche Spanne („Kassen frühestens Donnerstag“), fester Update-Takt**  
*Folge laut Drehbuch:* Die Partner planen mit Donnerstag; einer kritisiert später, dass „Donnerstag“ nur für Kassen, nicht für Bestellungen galt.

#### Min. 37,8 · LK14 Den Backup-Server bergen? · Mittwoch 07:30 Uhr · Höhepunkt

Die letzte vollständige Sicherungskopie beim Colocation-Anbieter stammt von Montag 01:00 Uhr – die Übertragung der Dienstagssicherung war beim Brand noch nicht fertig. Die Dienstagssicherung liegt auf dem Backup-Server im verrußten Serverraum. Eine Sanierungsfachfirma könnte ihn heute mit Schutzausrüstung bergen; die Freigabe des Raums für alle anderen kommt erst nach der Reinigung in etwa einer Woche.

*Krisen-Info:* Datenlücke ohne Bergung: ca. 26 Stunden · Bergung nur durch Fachfirma mit Schutzausrüstung · Messergebnis: Grenzwerte im Raum noch überschritten

- Wie viel ist Ihnen die fehlende Datenlücke wert – und welches Risiko für Menschen ist dafür vertretbar?
- Wer entscheidet über das Betreten: IT, Arbeitssicherheit, Geschäftsführung?
- Welche Voraussetzungen müssen erfüllt sein, bevor jemand den Raum betritt?

> **Vertraulich SK21 an Leitung Arbeitssicherheit und Werkschutz** (Min. 38,3): Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, aktuelles Messergebnis, Fachfirma mit Schutzausrüstung, Freiwilligkeit, Dokumentation. Die Fachfirma könnte heute um 14 Uhr – mit eigenem Personal, nicht mit eurer IT.

> **Vertraulich SK13 an Gebäudetechnik und Facility Management** (Min. 40,6): Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht Arbeitstage. Die Klimaanlage darf bis zur Prüfung nicht laufen – Feuchtigkeit plus Ruß beschleunigt die Korrosion. Ob die Hardware danach noch zuverlässig ist, kann er nicht sagen.

> **Vertraulich SK14 an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)** (Min. 41,3): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall Rußfilm. In Rack 7 steht der Backup-Server mit der Dienstagssicherung von 01:00 Uhr. Wird er bald geborgen und gereinigt, sind die Daten vermutlich lesbar – je länger er im Ruß steht, desto größer die Korrosionsgefahr.

> **Vertraulich SK18 an Leitung Finanzen und Versicherung (CFO) (statt Leitung Einkauf und Dienstleistersteuerung)** (Min. 41,9): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-Anbieter kann das Ausweich-Rack binnen 48 Stunden erweitern – Mindestlaufzeit zwölf Monate, Kosten für das erste Jahr rund 210.000 € einschließlich Dienstleistern (Szenarioannahme).

> **Vertraulich SK19 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 42,6): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und den Kern der Warenwirtschaft. Die Netzwerkanbindung der 23 Märkte muss neu eingerichtet werden – das wurde nie vollständig geübt. Zwei deiner fünf Leute sind seit Dienstag 03:00 Uhr wach.

**Entscheidung W3 (am Ende dieser Lage):** Lässt Waterkant den Backup-Server mit der Dienstagssicherung heute von einer Fachfirma aus dem gesperrten Serverraum bergen – oder wartet es die Freigabe des Raums ab?  
→ Der Tisch entscheidet: **Heute durch die Fachfirma unter Schutzausrüstung bergen lassen (nach Gefährdungsbeurteilung), dann reinigen und prüfen**  
*Folge laut Drehbuch:* Die Dienstagssicherung ist nach Reinigung lesbar; die Datenlücke schrumpft auf etwa zwei Stunden. Die Berufsgenossenschaft fragt nach den Unterlagen.

#### Min. 45,0 · LK15 Wie weit geht der Ausweichbetrieb? · Mittwoch 10:00 Uhr · Höhepunkt

Die IT hat einen Plan: Kassen- und Preisdienste und der Kern der Warenwirtschaft passen in das Ausweich-Rack und könnten am Donnerstag laufen. Lagerverwaltung, Gewerbekundenportal und Online-Bestände passen nur nach einer Erweiterung, die der Anbieter binnen 48 Stunden liefern kann – mit zwölf Monaten Mindestlaufzeit. Ohne Erweiterung warten diese Systeme auf das eigene Rechenzentrum, laut Sanierer frühestens in drei Wochen.

*Krisen-Info:* Kassen- und Preisdienste: Donnerstag möglich · Rest: Erweiterung (48 h, 12 Monate Vertrag) oder ca. 3 Wochen warten

- Was ist Ihnen schneller Online-Handel und Lagerbetrieb wert?
- Welche Risiken hat ein schneller, großer Umzug für ein müdes Team?
- Wer trägt diese Entscheidung – IT, Finanzen oder Geschäftsführung?

> **Vertraulich SK46 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 45,5): Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Ausweich-Racks gehört und ruft dich an. Nach eurer Geschäftsordnung brauchen Verträge mit mehr als zwölf Monaten Bindung die Zustimmung der Gesellschafter. Er ist bis Freitag im Ausland, aber telefonisch erreichbar: „Entscheiden Sie, was nötig ist – aber ich will es vorher wissen und nicht aus der Rechnung erfahren.“

**Entscheidung W4 (am Ende dieser Lage):** Bringt Waterkant nur das Nötigste ins Ausweich-Rack – oder erweitert es den Ausweichbetrieb, damit auch Lager, Gewerbeportal und Online-Bestände schnell zurückkommen?  
→ Der Tisch entscheidet: **Nur Kassen- und Preisdienste und den Kern der Warenwirtschaft verlagern; der Rest wartet auf das eigene Rechenzentrum**  
*Folge laut Drehbuch:* Lager, Gewerbeportal und Online-Bestände bleiben etwa drei Wochen eingeschränkt; Gewerbekunden weichen aus.

#### Min. 52,2 · LK19 Rücksicherung im Ausweich-Rack · Donnerstag 08:00 Uhr · Folgen

Im Ausweich-Rack läuft die Rücksicherung aus der Montagskopie. Die Prüfsummen stimmen. Damit 14 Filialen und neun Partnermärkte die Ausweichumgebung erreichen, müssen Netzwerkverbindungen und Firewall-Regeln neu eingerichtet werden – Stück für Stück, Markt für Markt. Die Aktionspreise sind in der Montagskopie noch nicht enthalten. Weil die Systeme in der Brandnacht kontrolliert heruntergefahren wurden, sind die Datenbanken konsistent – die Rücksicherung kommt ohne Reparatur aus.

*Krisen-Info:* Rücksicherung läuft · Netzwerkumstellung Markt für Markt · Aktionspreise fehlen in der Kopie

- Wer prüft und gibt frei, bevor ein Markt umgestellt wird?
- Wie bekommen Sie die Aktionspreise sicher in das System?
- Welche Abkürzungen sind verlockend – und welche verboten?

> **Vertraulich SK24 an Leitung Unternehmenskommunikation und Marketing (statt Kundenservice-Hotline)** (Min. 56,3): Seit dem Morgen über 600 Anrufe. Die häufigste Frage: „Gilt der Prospektpreis?“ Ihr habt keine Sprachregelung. Mehrere Anrufer drohen mit einer Beschwerde wegen irreführender Werbung.

#### Min. 59,4 · LK20 Wer kassiert zuerst? · Donnerstag 10:00 Uhr · Folgen

Die Ausweichumgebung kann am Donnerstagabend die ersten Märkte versorgen, aber nicht alle gleichzeitig: Pro Stunde lassen sich etwa zwei Märkte sicher umstellen. Es sind 23. Die eigenen Filialen haben den größten Umsatz in der Saisonwoche; die Partnermärkte haben einen Vertrag. Um Freitag 03:00 Uhr erreichen die Kassen die 72-Stunden-Grenze.

*Krisen-Info:* ca. 2 Märkte pro Stunde · 23 Märkte · Kassen-Grenze Freitag ca. 03:00 Uhr

- Nach welchem Kriterium legen Sie die Reihenfolge fest?
- Wer entscheidet – und wer sagt es den Partnern?
- Was passiert mit Märkten, die die 72-Stunden-Grenze reißen?

**Entscheidung W5 (am Ende dieser Lage):** Stellt Waterkant eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium um – oder kommen die eigenen 14 Filialen zuerst?  
→ Der Tisch entscheidet: **Eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium (größte Märkte zuerst, unabhängig vom Eigentümer)**  
*Folge laut Drehbuch:* Alle Märkte laufen bis Freitagfrüh; einige eigene Filialen erst in der Nacht.

#### Min. 66,6 · LK22 Die Kassen laufen wieder · Donnerstag 18:00 Uhr · Wiederanlauf

Die Kassen- und Preisdienste laufen aus dem Ausweich-Rack. Die ersten Märkte sind umgestellt, die Kassen gleichen ihre Offline-Abverkäufe ab, die Aktionspreise sind hinterlegt. Die übrigen Märkte folgen in der Nacht – nach der festgelegten Reihenfolge. Die kontrollierte Abschaltung in der Brandnacht hat sich bezahlt gemacht: Die Datenbanken mussten nicht repariert werden. Die Partnermärkte hatten seit Dienstag mit Donnerstag geplant. Ein Partner kritisiert, dass „Donnerstag“ nur für die Kassen galt, nicht für Bestellungen und Bestände. Eigene Filialen und Partnermärkte werden nach derselben Reihenfolge umgestellt – einige eigene Filialen erst in der Nacht.

*Krisen-Info:* Kassen- und Preisdienste wieder verfügbar · Umstellung läuft bis in die Nacht

- Woran merken Sie, dass ein Markt wirklich sauber läuft?
- Wer informiert Filialen, Partner und Hotline – mit welcher Botschaft?

> **Vertraulich (Folge einer Entscheidung) SK43 an Leitung Arbeitssicherheit und Werkschutz:** Die Berufsgenossenschaft fragt nach der Gefährdungsbeurteilung für den Einsatz der Fachfirma im kontaminierten Serverraum und nach dem Messprotokoll.

> **Vertraulich SK38 an Regionalleitung Filialen Nord** (Min. 70,7): Die Kassen laufen wieder, aber Rückgaben von Bons aus dem Offline-Zeitraum lassen sich nicht stornieren. Kundinnen und Kunden stehen mit Ware und Bon an der Information.

#### Min. 73,8 · LK27 Stabiler Notbetrieb · Sonntag 12:00 Uhr · Wiederanlauf

Nach fünf Tagen läuft Waterkant im stabilen Notbetrieb: Kassen und Preise aus dem Ausweich-Rack, die Warenwirtschaft mit nachgebuchten Daten, das Zentrallager liefert wieder. Das eigene Rechenzentrum ist gesperrt, die Reinigung hat begonnen. Das IT-Team arbeitet seit Dienstag in Doppelschichten, zwei Filialleitungen haben sich krankgemeldet. Dank der am Mittwoch geborgenen Dienstagssicherung fehlten nur rund zwei Stunden Daten. Lagerverwaltung, Gewerbeportal und Online-Bestände bleiben bis zur Rückkehr ins eigene Rechenzentrum eingeschränkt.

*Krisen-Info:* Notbetrieb stabil · eigenes Rechenzentrum gesperrt · Team erschöpft

- Welche Botschaft senden Sie an Beschäftigte, Partner und Kundschaft – und wer sagt es?
- Wie entlasten Sie die Menschen, die seit Dienstag durcharbeiten?
- Was ist ab Montag „normal“ – und was noch nicht?

> **Vertraulich SK32 an Geschäftsführung (CEO), Krisenstabsleitung (statt Personalleitung)** (Min. 74,3): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei Filialleitungen sind krank. Der Betriebsrat fragt, wer die Einsätze am Wochenende angeordnet hat. Arbeitszeitfragen sind fachlich zu prüfen.

#### Abschluss

Nach sieben Tagen. Kassen und Preise laufen aus dem Ausweich-Rack, die Warenwirtschaft ist nachgebucht, das Zentrallager liefert. Das eigene Rechenzentrum ist gesperrt, die Reinigung läuft. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 3.176.000 € + aus Entscheidungen: Abgebrochene Preisübertragung: Aktionspreise auch in den 5 Filialen per Kulanz, die sie sonst erhalten hätten (50.000 €); Bergung, Reinigung und Datenrettung des Backup-Servers durch Fachfirmen (45.000 €); Entgangener Rohertrag Online-Shop und Gewerbekunden (ca. 3 Wochen eingeschränkt) (260.000 €); Saisonumsatz: einige eigene Filialen erst in der Nacht wieder voll (60.000 €) = **3.591.000 €**; Mögliche Erstattung durch Elektronik- und Betriebsunterbrechungsversicherung (optimistische Modellannahme, nicht bestätigt): − 1.600.000 € → **beim Unternehmen bleiben 1.991.000 €** (17 % des Jahresgewinns).

*Fazit auf der Bühne:* Nach fünf Tagen kassieren alle Märkte wieder. Ob das eigene Rechenzentrum zurückkommt, ist offen – das Vertrauen der Partner hängt an dieser Woche. Eine Krise ist erst vorbei, wenn Partner, Kundschaft und Beschäftigte wieder vertrauen.

#### Debriefing in dieser Geschichte

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

### Geschichte 4: 90 Minuten · Krisenführung und Personenschutz · W1 weiterlaufen, W2 spaeter, W3 bergen, W4 ausbauen, W5 eigene

**Besetzte Rollen (9):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz, Leitung Finanzen und Versicherung (CFO), Leitung Unternehmenskommunikation und Marketing, IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Regionalleitung Filialen Nord  
**Geplante Krisenzeit:** 81 Min. + ca. 9 Min. Abschluss · Entscheidungszeit je Lage ca. 2,7 Min.
  
**Leitfrage des Schwerpunkts (für die Moderation):** Wer entscheidet – und gilt Personenschutz auch dann, wenn Daten und Umsatz auf dem Spiel stehen?

#### Min. 0,0 · LK01 USV meldet Batteriewarnung · Montag 22:40 Uhr · Vorboten

Die Gebäudeleittechnik meldet für die USV-Anlage im Rechenzentrum: „Batterietemperatur Modul 3 erhöht“. Der Sensor gilt als launisch, die Meldung kam in den letzten Wochen schon dreimal. Die Rufbereitschaft der IT quittiert die Meldung per App.

- Was tun Sie mit einer Meldung, die schon oft falsch war?
- Wer müsste davon wissen – IT, Gebäudetechnik oder beide?

#### Min. 3,0 · LK02 Geruch im Technikflur · Dienstag 02:35 Uhr · Vorboten

Der Wachdienst meldet bei seinem Rundgang einen Geruch nach verschmortem Kunststoff im Technikflur des Verwaltungsgebäudes, nahe dem USV-Raum. Sichtbar ist nichts, die Brandmeldeanlage ist ruhig. Der Wachmann ruft die Gebäudetechnik-Bereitschaft an.

- Wer entscheidet um 02:35 Uhr, ob das ein Notfall ist?
- Würden Sie jemanden wecken – und wen?

#### Min. 6,0 · LK03 Serverraum wird warm · Dienstag 03:02 Uhr · Vorboten

Die Klimaanlage des Serverraums meldet Störung, die Temperatur steigt: 31 °C und weiter steigend. Seit 03:00 Uhr läuft die nächtliche Übertragung der Aktionspreise für den Saisonstart an die Filialkassen; gleichzeitig laden die Partnermärkte ihre Tagesabschlüsse hoch. Die Rufbereitschaft ruft die IT-Leitung an.

- Herunterfahren oder weiterlaufen lassen – was riskieren Sie jeweils?
- Wer darf nachts entscheiden, Systeme abzuschalten, die 23 Märkte betreffen?
- Wer darf um 03:02 Uhr entscheiden – und wie erfährt die Geschäftsführung davon? *(Schwerpunkt)*

> **Vertraulich SK03 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 6,3): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise an die Filialkassen läuft seit 03:00 Uhr und braucht noch etwa 40 Minuten; die Partnermärkte laden gerade ihre Tagesabschlüsse hoch. Herunterfahren heißt: Beides bricht ab – und das kurz vor dem Saisonstart.

**Entscheidung W1 (am Ende dieser Lage):** Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen sie weiter, bis die Gebäudetechnik die Ursache kennt?  
→ Der Tisch entscheidet: **Weiterlaufen lassen, bis die Gebäudetechnik die Ursache geklärt hat**  
*Folge laut Drehbuch:* Die Preisübertragung erreicht vor dem Stromausfall noch 5 der 14 Filialen. Der harte Ausfall hinterlässt eine inkonsistente Datenbank: einen Tag Reparatur.

#### Min. 9,0 · LK04 Brandalarm im Rechenzentrum · Dienstag 03:10 Uhr · Ausbruch

Die Brandmeldeanlage löst aus: Rauch im USV-Raum neben dem Serverraum. Im Serverraum wird automatisch die Gaslöschanlage ausgelöst, der Raum wird mit Löschgas geflutet. Das Verwaltungsgebäude wird geräumt, die Nachtschicht im angrenzenden Zentrallager geht vorsorglich zum Sammelplatz. Die Feuerwehr ist alarmiert.

*Krisen-Info:* Brandort: USV-Raum · Gaslöschung im Serverraum ausgelöst · Gebäude geräumt

- Wer muss jetzt sofort informiert werden – in welcher Reihenfolge?
- Wer übernimmt bis zum Eintreffen der Feuerwehr die Führung vor Ort?
- Wann und wie wird der Krisenstab einberufen?
- Wer übernimmt die Führung, bis der Krisenstab steht? *(Schwerpunkt)*

#### Min. 16,2 · LK05 Feuerwehr im Einsatz · Dienstag 03:40 Uhr · Ausbruch

Die Feuerwehr bekämpft den Brand im USV-Raum und schaltet den Strom für das Verwaltungsgebäude ab. Der Einsatzleiter verlangt einen Ansprechpartner, der das Gebäude kennt. Am Sammelplatz fehlt eine Person: Ein Kollege der IT-Rufbereitschaft war gegen 03:05 Uhr ins Gebäude gefahren, um nach der Klimaanlage zu sehen.

*Krisen-Info:* Strom im Verwaltungsgebäude abgeschaltet · 1 Person am Sammelplatz nicht gemeldet

- Wer spricht mit der Einsatzleitung – und mit welchen Informationen?
- Wie klären Sie, ob noch jemand im Gebäude ist?
- Wer kümmert sich um Angehörige?

> **Vertraulich SK04 an Leitung Arbeitssicherheit und Werkschutz (statt Schichtleitung Zentrallager (vor Ort in der Brandnacht))** (Min. 16,7): Am Sammelplatz fehlt der Kollege der IT-Rufbereitschaft. Sein Auto steht auf dem Hof, ans Telefon geht er nicht. Die Feuerwehr fragt dich, ob noch jemand im Gebäude ist.

#### Min. 23,4 · LK06 Lagebild nach dem Löschen · Dienstag 05:30 Uhr · Ausbruch

Der Brand im USV-Raum ist gelöscht, alle Personen sind wohlauf. Der Serverraum selbst hat nicht gebrannt, ist aber verraucht; Löschgas und Rauch sind abgezogen. Das Gebäude bleibt bis zur Prüfung durch Sachverständige gesperrt. Im Rechenzentrum ist alles aus: Warenwirtschaft, Kassenzentrale, Lagerverwaltung, Gewerbekundenportal, Telefonanlage der Zentrale.

*Krisen-Info:* Rechenzentrum vollständig außer Betrieb · Gebäude gesperrt · Filialkassen offline-fähig ca. 72 Stunden (bis Freitag ca. 03:00 Uhr)

- Welche Geschäftsprozesse stehen jetzt – und welche laufen noch?
- Was ist bis zur Filialöffnung um 08:00 Uhr zu entscheiden?
- Wer übernimmt welche Aufgabe im Krisenstab?
- Ist jetzt allen klar, wer den Krisenstab leitet und wer die Vertretung ist? *(Schwerpunkt)*

> **Vertraulich SK06 an Leitung Arbeitssicherheit und Werkschutz** (Min. 23,9): Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Fluorwasserstoff und andere ätzende Gase entstehen. Er empfiehlt, USV-Raum und Serverraum erst nach Messung und Freigabe durch Sachverständige zu betreten – ausdrücklich auch für IT-Personal.

#### Min. 30,6 · LK09 Die Partnermärkte rufen an · Dienstag 08:30 Uhr · Eskalation

Die neun Partnermärkte im Einkaufsverbund, für die Waterkant Kassen- und Warenwirtschaft als Dienstleistung betreibt, stehen vor demselben Problem. Der Servicevertrag sieht ein Wiederherstellungsziel von 24 Stunden für Kassen- und Preisdienste vor. Die ersten Partner wollen wissen, wann es weitergeht – eine belastbare Prognose hat die IT noch nicht.

*Krisen-Info:* 9 Partnermärkte betroffen · Wiederherstellungsziel laut Vertrag: 24 Stunden · Prognose offen

- Was sagen Sie den Partnern – und wer sagt es?
- Was ist eine ehrliche Prognose, wenn Sie selbst keine haben?
- Welche Folgen hat das Überschreiten der 24 Stunden?

> **Vertraulich SK11 an Partnerbetreuung Verbund (Kundenmanagement IT-Service)** (Min. 31,1): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiederherstellungsziel 24 Stunden für Kassen- und Preisdienste. Er will bis 12 Uhr wissen, wann es weitergeht, sonst wendet er sich an den Verbundvorstand.

> **Vertraulich SK08 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Support Filialen und Kassen)** (Min. 33,8): Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe etwa 72 Stunden, danach verweigern sie neue Buchungen, bis sie wieder mit der Zentrale synchronisiert sind. Das wäre Freitag gegen 03:00 Uhr. In den Filialen weiß das noch niemand.

> **Vertraulich SK35 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt Notfallmanagement / BCM-Koordination)** (Min. 34,7): Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine Papierkopie gibt es im Tresor der Geschäftsführung – im Verwaltungsgebäude, das bis zur Freigabe gesperrt ist.

**Entscheidung W2 (am Ende dieser Lage):** Informiert Waterkant heute alle Partnermärkte mit einer ehrlichen, aber unsicheren Prognose – oder erst, wenn ein belastbarer Wiederanlauftermin feststeht?  
→ Der Tisch entscheidet: **Erst informieren, wenn ein belastbarer Termin feststeht (voraussichtlich Mittwoch)**  
*Folge laut Drehbuch:* Die Partner erfahren die Lage aus der Zeitung; der Verbundvorstand verlangt ein Gespräch (vertrauliche Karte bei „Den Backup-Server bergen?“); Kulanzposten in der Rechnung.

#### Min. 37,8 · LK14 Den Backup-Server bergen? · Mittwoch 07:30 Uhr · Höhepunkt

Die letzte vollständige Sicherungskopie beim Colocation-Anbieter stammt von Montag 01:00 Uhr – die Übertragung der Dienstagssicherung war beim Brand noch nicht fertig. Die Dienstagssicherung liegt auf dem Backup-Server im verrußten Serverraum. Eine Sanierungsfachfirma könnte ihn heute mit Schutzausrüstung bergen; die Freigabe des Raums für alle anderen kommt erst nach der Reinigung in etwa einer Woche.

*Krisen-Info:* Datenlücke ohne Bergung: ca. 26 Stunden · Bergung nur durch Fachfirma mit Schutzausrüstung · Messergebnis: Grenzwerte im Raum noch überschritten

- Wie viel ist Ihnen die fehlende Datenlücke wert – und welches Risiko für Menschen ist dafür vertretbar?
- Wer entscheidet über das Betreten: IT, Arbeitssicherheit, Geschäftsführung?
- Welche Voraussetzungen müssen erfüllt sein, bevor jemand den Raum betritt?
- Wer hat das letzte Wort beim Betreten – und ist das allen klar? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK42 an Geschäftsführung (CEO), Krisenstabsleitung:** Der Verbundvorstand ruft an: Die Partner haben aus der Lokalzeitung mehr über den Brand erfahren als von Waterkant. Er verlangt bis heute Abend ein Gespräch mit dir.

> **Vertraulich SK21 an Leitung Arbeitssicherheit und Werkschutz** (Min. 38,3): Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, aktuelles Messergebnis, Fachfirma mit Schutzausrüstung, Freiwilligkeit, Dokumentation. Die Fachfirma könnte heute um 14 Uhr – mit eigenem Personal, nicht mit eurer IT.

> **Vertraulich SK13 an Gebäudetechnik und Facility Management** (Min. 40,6): Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht Arbeitstage. Die Klimaanlage darf bis zur Prüfung nicht laufen – Feuchtigkeit plus Ruß beschleunigt die Korrosion. Ob die Hardware danach noch zuverlässig ist, kann er nicht sagen.

> **Vertraulich SK14 an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)** (Min. 41,3): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall Rußfilm. In Rack 7 steht der Backup-Server mit der Dienstagssicherung von 01:00 Uhr. Wird er bald geborgen und gereinigt, sind die Daten vermutlich lesbar – je länger er im Ruß steht, desto größer die Korrosionsgefahr.

> **Vertraulich SK18 an Leitung Finanzen und Versicherung (CFO) (statt Leitung Einkauf und Dienstleistersteuerung)** (Min. 41,9): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-Anbieter kann das Ausweich-Rack binnen 48 Stunden erweitern – Mindestlaufzeit zwölf Monate, Kosten für das erste Jahr rund 210.000 € einschließlich Dienstleistern (Szenarioannahme).

> **Vertraulich SK19 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 42,6): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und den Kern der Warenwirtschaft. Die Netzwerkanbindung der 23 Märkte muss neu eingerichtet werden – das wurde nie vollständig geübt. Zwei deiner fünf Leute sind seit Dienstag 03:00 Uhr wach.

**Entscheidung W3 (am Ende dieser Lage):** Lässt Waterkant den Backup-Server mit der Dienstagssicherung heute von einer Fachfirma aus dem gesperrten Serverraum bergen – oder wartet es die Freigabe des Raums ab?  
→ Der Tisch entscheidet: **Heute durch die Fachfirma unter Schutzausrüstung bergen lassen (nach Gefährdungsbeurteilung), dann reinigen und prüfen**  
*Folge laut Drehbuch:* Die Dienstagssicherung ist nach Reinigung lesbar; die Datenlücke schrumpft auf etwa zwei Stunden. Die Berufsgenossenschaft fragt nach den Unterlagen.

#### Min. 45,0 · LK15 Wie weit geht der Ausweichbetrieb? · Mittwoch 10:00 Uhr · Höhepunkt

Die IT hat einen Plan: Kassen- und Preisdienste und der Kern der Warenwirtschaft passen in das Ausweich-Rack und könnten am Donnerstag laufen. Lagerverwaltung, Gewerbekundenportal und Online-Bestände passen nur nach einer Erweiterung, die der Anbieter binnen 48 Stunden liefern kann – mit zwölf Monaten Mindestlaufzeit. Ohne Erweiterung warten diese Systeme auf das eigene Rechenzentrum, laut Sanierer frühestens in drei Wochen.

*Krisen-Info:* Kassen- und Preisdienste: Donnerstag möglich · Rest: Erweiterung (48 h, 12 Monate Vertrag) oder ca. 3 Wochen warten

- Was ist Ihnen schneller Online-Handel und Lagerbetrieb wert?
- Welche Risiken hat ein schneller, großer Umzug für ein müdes Team?
- Wer trägt diese Entscheidung – IT, Finanzen oder Geschäftsführung?
- Wer trägt diese Entscheidung, und wie wird sie dokumentiert? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK41 an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft):** Die Datenbank der Warenwirtschaft ist nach dem harten Stromausfall in der Brandnacht inkonsistent. Bevor ihr irgendetwas ins Ausweich-Rack übertragt, muss sie repariert werden – etwa ein Tag zusätzlich.

> **Vertraulich SK46 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 45,5): Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Ausweich-Racks gehört und ruft dich an. Nach eurer Geschäftsordnung brauchen Verträge mit mehr als zwölf Monaten Bindung die Zustimmung der Gesellschafter. Er ist bis Freitag im Ausland, aber telefonisch erreichbar: „Entscheiden Sie, was nötig ist – aber ich will es vorher wissen und nicht aus der Rechnung erfahren.“

**Entscheidung W4 (am Ende dieser Lage):** Bringt Waterkant nur das Nötigste ins Ausweich-Rack – oder erweitert es den Ausweichbetrieb, damit auch Lager, Gewerbeportal und Online-Bestände schnell zurückkommen?  
→ Der Tisch entscheidet: **Ausweich-Rack binnen 48 Stunden erweitern und auch Lager, Gewerbeportal und Online-Bestände verlagern (zwölf Monate Mindestlaufzeit)**  
*Folge laut Drehbuch:* Online-Shop und Portal laufen ab Freitagabend wieder; beim schnellen Umzug geht ein Preisabgleich verloren (vertrauliche Karte am Saisonsamstag).

#### Min. 52,2 · LK18 Der Verbundbeirat verlangt Antworten · Mittwoch 19:00 Uhr · Höhepunkt

Der Beirat des Einkaufsverbunds hat kurzfristig eine Videokonferenz einberufen. Die Partnermärkte wollen wissen: Wann laufen ihre Kassen wieder voll, wer kommt zuerst dran, und warum gab es für ein Rechenzentrum, das 23 Märkte versorgt, keinen funktionierenden Ausweichplan? Die Geschäftsführung hat 15 Minuten Redezeit. Mehrere Partner beklagen, dass sie bis Mittwoch nur Gerüchte hatten.

*Krisen-Info:* Videokonferenz in 30 Minuten · 15 Minuten Redezeit

- Welche drei Aussagen müssen in den 15 Minuten fallen?
- Was sagen Sie zur Reihenfolge, wenn sie noch nicht entschieden ist?
- Welche Zusage geben Sie bewusst nicht?

> **Vertraulich SK20 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 52,7): Der Vorsitzende des Verbundbeirats ruft dich vor der Videokonferenz privat an: Zwei Partner wollen den IT-Servicevertrag kündigen. Er erwartet eine klare Aussage, wann ihre Kassen wieder voll laufen – und ob Waterkant die eigenen Märkte bevorzugt. „Ich will nicht hören, dass Sie es nicht wissen.“

> **Vertraulich SK24 an Leitung Unternehmenskommunikation und Marketing (statt Kundenservice-Hotline)** (Min. 55,7): Seit dem Morgen über 600 Anrufe. Die häufigste Frage: „Gilt der Prospektpreis?“ Ihr habt keine Sprachregelung. Mehrere Anrufer drohen mit einer Beschwerde wegen irreführender Werbung.

#### Min. 59,4 · LK20 Wer kassiert zuerst? · Donnerstag 10:00 Uhr · Folgen

Die Ausweichumgebung kann am Donnerstagabend die ersten Märkte versorgen, aber nicht alle gleichzeitig: Pro Stunde lassen sich etwa zwei Märkte sicher umstellen. Es sind 23. Die eigenen Filialen haben den größten Umsatz in der Saisonwoche; die Partnermärkte haben einen Vertrag. Um Freitag 03:00 Uhr erreichen die Kassen die 72-Stunden-Grenze.

*Krisen-Info:* ca. 2 Märkte pro Stunde · 23 Märkte · Kassen-Grenze Freitag ca. 03:00 Uhr

- Nach welchem Kriterium legen Sie die Reihenfolge fest?
- Wer entscheidet – und wer sagt es den Partnern?
- Was passiert mit Märkten, die die 72-Stunden-Grenze reißen?
- Wie wird die Entscheidung begründet und wem erklärt? *(Schwerpunkt)*

**Entscheidung W5 (am Ende dieser Lage):** Stellt Waterkant eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium um – oder kommen die eigenen 14 Filialen zuerst?  
→ Der Tisch entscheidet: **Eigene 14 Filialen zuerst, Partnermärkte etwa zwölf Stunden später**  
*Folge laut Drehbuch:* Die eigenen Filialen kassieren ab Donnerstagabend, die Partner erst kurz vor der 72-Stunden-Grenze; zwei Partner prüfen einen Wechsel (vertrauliche Karte).

#### Min. 66,6 · LK22 Die Kassen laufen wieder · Donnerstag 18:00 Uhr · Wiederanlauf

Die Kassen- und Preisdienste laufen aus dem Ausweich-Rack. Die ersten Märkte sind umgestellt, die Kassen gleichen ihre Offline-Abverkäufe ab, die Aktionspreise sind hinterlegt. Die übrigen Märkte folgen in der Nacht – nach der festgelegten Reihenfolge. Die eigenen Filialen kassieren seit Donnerstagabend, die Partnermärkte folgen in der Nacht – knapp vor der 72-Stunden-Grenze.

*Krisen-Info:* Kassen- und Preisdienste wieder verfügbar · Umstellung läuft bis in die Nacht

- Woran merken Sie, dass ein Markt wirklich sauber läuft?
- Wer informiert Filialen, Partner und Hotline – mit welcher Botschaft?
- Wer prüft, dass „läuft wieder“ wirklich stimmt? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK43 an Leitung Arbeitssicherheit und Werkschutz:** Die Berufsgenossenschaft fragt nach der Gefährdungsbeurteilung für den Einsatz der Fachfirma im kontaminierten Serverraum und nach dem Messprotokoll.

> **Vertraulich (Folge einer Entscheidung) SK44 an Partnerbetreuung Verbund (Kundenmanagement IT-Service):** Zwei Partnermärkte haben bemerkt, dass die Waterkant-Filialen zwölf Stunden früher wieder kassieren konnten. Einer hat Kontakt zu einem anderen IT-Dienstleister aufgenommen.

> **Vertraulich SK38 an Regionalleitung Filialen Nord** (Min. 70,7): Die Kassen laufen wieder, aber Rückgaben von Bons aus dem Offline-Zeitraum lassen sich nicht stornieren. Kundinnen und Kunden stehen mit Ware und Bon an der Information.

#### Min. 73,8 · LK27 Stabiler Notbetrieb · Sonntag 12:00 Uhr · Wiederanlauf

Nach fünf Tagen läuft Waterkant im stabilen Notbetrieb: Kassen und Preise aus dem Ausweich-Rack, die Warenwirtschaft mit nachgebuchten Daten, das Zentrallager liefert wieder. Das eigene Rechenzentrum ist gesperrt, die Reinigung hat begonnen. Das IT-Team arbeitet seit Dienstag in Doppelschichten, zwei Filialleitungen haben sich krankgemeldet. Dank der am Mittwoch geborgenen Dienstagssicherung fehlten nur rund zwei Stunden Daten. Auch Lagerverwaltung, Gewerbeportal und Online-Bestände laufen aus dem erweiterten Ausweich-Rack.

*Krisen-Info:* Notbetrieb stabil · eigenes Rechenzentrum gesperrt · Team erschöpft

- Welche Botschaft senden Sie an Beschäftigte, Partner und Kundschaft – und wer sagt es?
- Wie entlasten Sie die Menschen, die seit Dienstag durcharbeiten?
- Was ist ab Montag „normal“ – und was noch nicht?
- Wer achtet auf die Menschen, die seit Dienstag durcharbeiten? *(Schwerpunkt)*

> **Vertraulich SK32 an Geschäftsführung (CEO), Krisenstabsleitung (statt Personalleitung)** (Min. 74,3): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei Filialleitungen sind krank. Der Betriebsrat fragt, wer die Einsätze am Wochenende angeordnet hat. Arbeitszeitfragen sind fachlich zu prüfen.

#### Abschluss

Nach sieben Tagen. Kassen und Preise laufen aus dem Ausweich-Rack, die Warenwirtschaft ist nachgebucht, das Zentrallager liefert. Das eigene Rechenzentrum ist gesperrt, die Reinigung läuft. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 3.176.000 € + aus Entscheidungen: Reparatur der Warenwirtschafts-Datenbank nach hartem Ausfall (ein Tag Verzug) (95.000 €); Kulanz und Sonderkonditionen für Partnermärkte (40.000 €); Bergung, Reinigung und Datenrettung des Backup-Servers durch Fachfirmen (45.000 €); Erweiterung des Ausweichbetriebs (12 Monate) und zusätzliche Dienstleister (210.000 €); Zusätzliche Gutschriften und Risiko des Partnerverlusts im IT-Service (12 Monate) (90.000 €) = **3.656.000 €**; Mögliche Erstattung durch Elektronik- und Betriebsunterbrechungsversicherung (optimistische Modellannahme, nicht bestätigt): − 1.600.000 € → **beim Unternehmen bleiben 2.056.000 €** (17 % des Jahresgewinns).

*Fazit auf der Bühne:* Nach fünf Tagen kassieren alle Märkte wieder. Ob das eigene Rechenzentrum zurückkommt, ist offen – das Vertrauen der Partner hängt an dieser Woche. Eine Krise ist erst vorbei, wenn Partner, Kundschaft und Beschäftigte wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das in der Nacht entscheiden dürfen?
- Wann stand der Schutz von Menschen gegen Daten, Umsatz oder Tempo – und wie habt ihr entschieden?
- Wie kamen Meldungen aus Filialen, Partnermärkten und Hotline beim Krisenstab an – und wie kamen Anweisungen zurück?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- Welche Zusage an Partner oder Kunden war am riskantesten?
- Wo waren Single Points of Failure – Technik, Wissen, Personen?
- Welche Kosten trägt die Versicherung wahrscheinlich nicht – und was bedeutet das für die Liquidität?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?
- *(Schwerpunkt)* War jederzeit klar, wer entscheidet – auch in der Nacht?
- *(Schwerpunkt)* Wann stand Personenschutz gegen Daten oder Umsatz – und wie habt ihr entschieden?

---

### Geschichte 5: 90 Minuten · IT-Wiederanlauf und Infrastruktur · W1 weiterlaufen, W2 frueh, W3 abwarten, W4 ausbauen, W5 gleichrangig

**Besetzte Rollen (9):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz, Leitung Finanzen und Versicherung (CFO), Leitung Unternehmenskommunikation und Marketing, IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Regionalleitung Filialen Nord  
**Geplante Krisenzeit:** 81 Min. + ca. 9 Min. Abschluss · Entscheidungszeit je Lage ca. 2,59 Min.
  
**Leitfrage des Schwerpunkts (für die Moderation):** Was muss technisch geprüft, sicher und fachlich freigegeben sein, bevor etwas wieder läuft?

#### Min. 0,0 · LK03 Serverraum wird warm · Dienstag 03:02 Uhr · Vorboten

Die Klimaanlage des Serverraums meldet Störung, die Temperatur steigt: 31 °C und weiter steigend. Seit 03:00 Uhr läuft die nächtliche Übertragung der Aktionspreise für den Saisonstart an die Filialkassen; gleichzeitig laden die Partnermärkte ihre Tagesabschlüsse hoch. Die Rufbereitschaft ruft die IT-Leitung an.

- Herunterfahren oder weiterlaufen lassen – was riskieren Sie jeweils?
- Wer darf nachts entscheiden, Systeme abzuschalten, die 23 Märkte betreffen?
- Gibt es eine Regel, ab welcher Temperatur abgeschaltet wird – und wer sie kennt? *(Schwerpunkt)*

> **Vertraulich SK03 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 0,3): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise an die Filialkassen läuft seit 03:00 Uhr und braucht noch etwa 40 Minuten; die Partnermärkte laden gerade ihre Tagesabschlüsse hoch. Herunterfahren heißt: Beides bricht ab – und das kurz vor dem Saisonstart.

**Entscheidung W1 (am Ende dieser Lage):** Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen sie weiter, bis die Gebäudetechnik die Ursache kennt?  
→ Der Tisch entscheidet: **Weiterlaufen lassen, bis die Gebäudetechnik die Ursache geklärt hat**  
*Folge laut Drehbuch:* Die Preisübertragung erreicht vor dem Stromausfall noch 5 der 14 Filialen. Der harte Ausfall hinterlässt eine inkonsistente Datenbank: einen Tag Reparatur.

#### Min. 3,0 · LK04 Brandalarm im Rechenzentrum · Dienstag 03:10 Uhr · Ausbruch

Die Brandmeldeanlage löst aus: Rauch im USV-Raum neben dem Serverraum. Im Serverraum wird automatisch die Gaslöschanlage ausgelöst, der Raum wird mit Löschgas geflutet. Das Verwaltungsgebäude wird geräumt, die Nachtschicht im angrenzenden Zentrallager geht vorsorglich zum Sammelplatz. Die Feuerwehr ist alarmiert.

*Krisen-Info:* Brandort: USV-Raum · Gaslöschung im Serverraum ausgelöst · Gebäude geräumt

- Wer muss jetzt sofort informiert werden – in welcher Reihenfolge?
- Wer übernimmt bis zum Eintreffen der Feuerwehr die Führung vor Ort?
- Wann und wie wird der Krisenstab einberufen?

#### Min. 10,1 · LK06 Lagebild nach dem Löschen · Dienstag 05:30 Uhr · Ausbruch

Der Brand im USV-Raum ist gelöscht, alle Personen sind wohlauf. Der Serverraum selbst hat nicht gebrannt, ist aber verraucht; Löschgas und Rauch sind abgezogen. Das Gebäude bleibt bis zur Prüfung durch Sachverständige gesperrt. Im Rechenzentrum ist alles aus: Warenwirtschaft, Kassenzentrale, Lagerverwaltung, Gewerbekundenportal, Telefonanlage der Zentrale.

*Krisen-Info:* Rechenzentrum vollständig außer Betrieb · Gebäude gesperrt · Filialkassen offline-fähig ca. 72 Stunden (bis Freitag ca. 03:00 Uhr)

- Welche Geschäftsprozesse stehen jetzt – und welche laufen noch?
- Was ist bis zur Filialöffnung um 08:00 Uhr zu entscheiden?
- Wer übernimmt welche Aufgabe im Krisenstab?
- Welche Abhängigkeiten zwischen den Systemen kennen Sie – und welche nicht? *(Schwerpunkt)*

> **Vertraulich SK06 an Leitung Arbeitssicherheit und Werkschutz** (Min. 10,6): Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Fluorwasserstoff und andere ätzende Gase entstehen. Er empfiehlt, USV-Raum und Serverraum erst nach Messung und Freigabe durch Sachverständige zu betreten – ausdrücklich auch für IT-Personal.

#### Min. 17,2 · LK07 Was noch läuft – und was nicht · Dienstag 06:30 Uhr · Ausbruch

Die IT sortiert: E-Mail und Chat laufen in der Cloud weiter, die Anmeldung an Geräten der Zentrale funktioniert aber nicht, weil die Anmeldedienste im Serverraum standen. Die Filialkassen arbeiten offline mit dem Preisstand von Montag; Kartenzahlung läuft direkt über den Zahlungsdienstleister. Der Online-Shop ist erreichbar, zeigt aber Bestände von Montagnacht. Die Zentrale ist telefonisch nicht erreichbar.

*Krisen-Info:* Cloud-Mail läuft · Telefon Zentrale tot · Kassen offline · Online-Shop mit veralteten Beständen

- Über welche Kanäle erreicht der Krisenstab jetzt Filialen, Partner und Beschäftigte?
- Wo liegt Ihr Notfallhandbuch – und kommen Sie heran?
- Welche Behelfslösung ist sicher genug, welche nicht?

> **Vertraulich SK08 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt IT-Support Filialen und Kassen)** (Min. 20,6): Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe etwa 72 Stunden, danach verweigern sie neue Buchungen, bis sie wieder mit der Zentrale synchronisiert sind. Das wäre Freitag gegen 03:00 Uhr. In den Filialen weiß das noch niemand.

> **Vertraulich SK35 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum) (statt Notfallmanagement / BCM-Koordination)** (Min. 21,9): Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine Papierkopie gibt es im Tresor der Geschäftsführung – im Verwaltungsgebäude, das bis zur Freigabe gesperrt ist.

#### Min. 24,3 · LK09 Die Partnermärkte rufen an · Dienstag 08:30 Uhr · Eskalation

Die neun Partnermärkte im Einkaufsverbund, für die Waterkant Kassen- und Warenwirtschaft als Dienstleistung betreibt, stehen vor demselben Problem. Der Servicevertrag sieht ein Wiederherstellungsziel von 24 Stunden für Kassen- und Preisdienste vor. Die ersten Partner wollen wissen, wann es weitergeht – eine belastbare Prognose hat die IT noch nicht.

*Krisen-Info:* 9 Partnermärkte betroffen · Wiederherstellungsziel laut Vertrag: 24 Stunden · Prognose offen

- Was sagen Sie den Partnern – und wer sagt es?
- Was ist eine ehrliche Prognose, wenn Sie selbst keine haben?
- Welche Folgen hat das Überschreiten der 24 Stunden?
- Welches Wiederherstellungsziel ist realistisch, nicht vertraglich? *(Schwerpunkt)*

> **Vertraulich SK11 an Partnerbetreuung Verbund (Kundenmanagement IT-Service)** (Min. 24,8): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiederherstellungsziel 24 Stunden für Kassen- und Preisdienste. Er will bis 12 Uhr wissen, wann es weitergeht, sonst wendet er sich an den Verbundvorstand.

**Entscheidung W2 (am Ende dieser Lage):** Informiert Waterkant heute alle Partnermärkte mit einer ehrlichen, aber unsicheren Prognose – oder erst, wenn ein belastbarer Wiederanlauftermin feststeht?  
→ Der Tisch entscheidet: **Heute 11 Uhr alle Partner informieren: Lage, ehrliche Spanne („Kassen frühestens Donnerstag“), fester Update-Takt**  
*Folge laut Drehbuch:* Die Partner planen mit Donnerstag; einer kritisiert später, dass „Donnerstag“ nur für Kassen, nicht für Bestellungen galt.

#### Min. 31,4 · LK10 Serverraum gesperrt · Dienstag 10:00 Uhr · Eskalation

Die Feuerwehr übergibt das Gebäude. Ein Sachverständiger gibt Büros und Flure frei, nicht aber USV-Raum und Serverraum: Auf allen Racks liegt ein Rußfilm, bei brennenden Lithium-Ionen-Batterien können ätzende Gase entstehen. Eine Messung läuft, das Ergebnis kommt frühestens Mittwochmorgen. Die Klimaanlage darf bis dahin nicht laufen.

*Krisen-Info:* Büros freigegeben · Serverraum und USV-Raum gesperrt · Messergebnis frühestens Mittwochmorgen

- Wer entscheidet, wann der Serverraum wieder betreten wird – und auf welcher Grundlage?
- Was bedeutet der Rußfilm für die Hardware?
- Wer hält Kontakt zu Sachverständigen und Sanierern?

> **Vertraulich SK13 an Gebäudetechnik und Facility Management** (Min. 34,8): Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht Arbeitstage. Die Klimaanlage darf bis zur Prüfung nicht laufen – Feuchtigkeit plus Ruß beschleunigt die Korrosion. Ob die Hardware danach noch zuverlässig ist, kann er nicht sagen.

> **Vertraulich SK14 an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)** (Min. 36,1): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall Rußfilm. In Rack 7 steht der Backup-Server mit der Dienstagssicherung von 01:00 Uhr. Wird er bald geborgen und gereinigt, sind die Daten vermutlich lesbar – je länger er im Ruß steht, desto größer die Korrosionsgefahr.

#### Min. 38,5 · LK14 Den Backup-Server bergen? · Mittwoch 07:30 Uhr · Höhepunkt

Die letzte vollständige Sicherungskopie beim Colocation-Anbieter stammt von Montag 01:00 Uhr – die Übertragung der Dienstagssicherung war beim Brand noch nicht fertig. Die Dienstagssicherung liegt auf dem Backup-Server im verrußten Serverraum. Eine Sanierungsfachfirma könnte ihn heute mit Schutzausrüstung bergen; die Freigabe des Raums für alle anderen kommt erst nach der Reinigung in etwa einer Woche.

*Krisen-Info:* Datenlücke ohne Bergung: ca. 26 Stunden · Bergung nur durch Fachfirma mit Schutzausrüstung · Messergebnis: Grenzwerte im Raum noch überschritten

- Wie viel ist Ihnen die fehlende Datenlücke wert – und welches Risiko für Menschen ist dafür vertretbar?
- Wer entscheidet über das Betreten: IT, Arbeitssicherheit, Geschäftsführung?
- Welche Voraussetzungen müssen erfüllt sein, bevor jemand den Raum betritt?
- Welche Daten fehlen ohne Bergung genau – und wie würden Sie sie rekonstruieren? *(Schwerpunkt)*

> **Vertraulich SK21 an Leitung Arbeitssicherheit und Werkschutz** (Min. 39,0): Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, aktuelles Messergebnis, Fachfirma mit Schutzausrüstung, Freiwilligkeit, Dokumentation. Die Fachfirma könnte heute um 14 Uhr – mit eigenem Personal, nicht mit eurer IT.

> **Vertraulich SK18 an Leitung Finanzen und Versicherung (CFO) (statt Leitung Einkauf und Dienstleistersteuerung)** (Min. 41,6): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-Anbieter kann das Ausweich-Rack binnen 48 Stunden erweitern – Mindestlaufzeit zwölf Monate, Kosten für das erste Jahr rund 210.000 € einschließlich Dienstleistern (Szenarioannahme).

> **Vertraulich SK19 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 42,5): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und den Kern der Warenwirtschaft. Die Netzwerkanbindung der 23 Märkte muss neu eingerichtet werden – das wurde nie vollständig geübt. Zwei deiner fünf Leute sind seit Dienstag 03:00 Uhr wach.

**Entscheidung W3 (am Ende dieser Lage):** Lässt Waterkant den Backup-Server mit der Dienstagssicherung heute von einer Fachfirma aus dem gesperrten Serverraum bergen – oder wartet es die Freigabe des Raums ab?  
→ Der Tisch entscheidet: **Freigabe des Raums abwarten (nach Reinigung, ca. eine Woche)**  
*Folge laut Drehbuch:* Niemand betritt den Raum vorzeitig. Die Lücke von etwa 26 Stunden muss von Hand nachgebucht werden; ob die Dienstagssicherung später noch lesbar ist, ist offen.

#### Min. 45,5 · LK15 Wie weit geht der Ausweichbetrieb? · Mittwoch 10:00 Uhr · Höhepunkt

Die IT hat einen Plan: Kassen- und Preisdienste und der Kern der Warenwirtschaft passen in das Ausweich-Rack und könnten am Donnerstag laufen. Lagerverwaltung, Gewerbekundenportal und Online-Bestände passen nur nach einer Erweiterung, die der Anbieter binnen 48 Stunden liefern kann – mit zwölf Monaten Mindestlaufzeit. Ohne Erweiterung warten diese Systeme auf das eigene Rechenzentrum, laut Sanierer frühestens in drei Wochen.

*Krisen-Info:* Kassen- und Preisdienste: Donnerstag möglich · Rest: Erweiterung (48 h, 12 Monate Vertrag) oder ca. 3 Wochen warten

- Was ist Ihnen schneller Online-Handel und Lagerbetrieb wert?
- Welche Risiken hat ein schneller, großer Umzug für ein müdes Team?
- Wer trägt diese Entscheidung – IT, Finanzen oder Geschäftsführung?
- Welche Abhängigkeiten zwischen Kassen, Warenwirtschaft und Netzwerk bestimmen die Reihenfolge? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK41 an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft):** Die Datenbank der Warenwirtschaft ist nach dem harten Stromausfall in der Brandnacht inkonsistent. Bevor ihr irgendetwas ins Ausweich-Rack übertragt, muss sie repariert werden – etwa ein Tag zusätzlich.

> **Vertraulich SK46 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 46,0): Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Ausweich-Racks gehört und ruft dich an. Nach eurer Geschäftsordnung brauchen Verträge mit mehr als zwölf Monaten Bindung die Zustimmung der Gesellschafter. Er ist bis Freitag im Ausland, aber telefonisch erreichbar: „Entscheiden Sie, was nötig ist – aber ich will es vorher wissen und nicht aus der Rechnung erfahren.“

**Entscheidung W4 (am Ende dieser Lage):** Bringt Waterkant nur das Nötigste ins Ausweich-Rack – oder erweitert es den Ausweichbetrieb, damit auch Lager, Gewerbeportal und Online-Bestände schnell zurückkommen?  
→ Der Tisch entscheidet: **Ausweich-Rack binnen 48 Stunden erweitern und auch Lager, Gewerbeportal und Online-Bestände verlagern (zwölf Monate Mindestlaufzeit)**  
*Folge laut Drehbuch:* Online-Shop und Portal laufen ab Freitagabend wieder; beim schnellen Umzug geht ein Preisabgleich verloren (vertrauliche Karte am Saisonsamstag).

#### Min. 52,6 · LK19 Rücksicherung im Ausweich-Rack · Donnerstag 08:00 Uhr · Folgen

Im Ausweich-Rack läuft die Rücksicherung aus der Montagskopie. Die Prüfsummen stimmen. Damit 14 Filialen und neun Partnermärkte die Ausweichumgebung erreichen, müssen Netzwerkverbindungen und Firewall-Regeln neu eingerichtet werden – Stück für Stück, Markt für Markt. Die Aktionspreise sind in der Montagskopie noch nicht enthalten.

*Krisen-Info:* Rücksicherung läuft · Netzwerkumstellung Markt für Markt · Aktionspreise fehlen in der Kopie

- Wer prüft und gibt frei, bevor ein Markt umgestellt wird?
- Wie bekommen Sie die Aktionspreise sicher in das System?
- Welche Abkürzungen sind verlockend – und welche verboten?

> **Vertraulich SK24 an Leitung Unternehmenskommunikation und Marketing (statt Kundenservice-Hotline)** (Min. 56,7): Seit dem Morgen über 600 Anrufe. Die häufigste Frage: „Gilt der Prospektpreis?“ Ihr habt keine Sprachregelung. Mehrere Anrufer drohen mit einer Beschwerde wegen irreführender Werbung.

#### Min. 59,7 · LK20 Wer kassiert zuerst? · Donnerstag 10:00 Uhr · Folgen

Die Ausweichumgebung kann am Donnerstagabend die ersten Märkte versorgen, aber nicht alle gleichzeitig: Pro Stunde lassen sich etwa zwei Märkte sicher umstellen. Es sind 23. Die eigenen Filialen haben den größten Umsatz in der Saisonwoche; die Partnermärkte haben einen Vertrag. Um Freitag 03:00 Uhr erreichen die Kassen die 72-Stunden-Grenze.

*Krisen-Info:* ca. 2 Märkte pro Stunde · 23 Märkte · Kassen-Grenze Freitag ca. 03:00 Uhr

- Nach welchem Kriterium legen Sie die Reihenfolge fest?
- Wer entscheidet – und wer sagt es den Partnern?
- Was passiert mit Märkten, die die 72-Stunden-Grenze reißen?
- Wie stellen Sie sicher, dass jeder umgestellte Markt geprüft ist? *(Schwerpunkt)*

**Entscheidung W5 (am Ende dieser Lage):** Stellt Waterkant eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium um – oder kommen die eigenen 14 Filialen zuerst?  
→ Der Tisch entscheidet: **Eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium (größte Märkte zuerst, unabhängig vom Eigentümer)**  
*Folge laut Drehbuch:* Alle Märkte laufen bis Freitagfrüh; einige eigene Filialen erst in der Nacht.

#### Min. 66,8 · LK22 Die Kassen laufen wieder · Donnerstag 18:00 Uhr · Wiederanlauf

Die Kassen- und Preisdienste laufen aus dem Ausweich-Rack. Die ersten Märkte sind umgestellt, die Kassen gleichen ihre Offline-Abverkäufe ab, die Aktionspreise sind hinterlegt. Die übrigen Märkte folgen in der Nacht – nach der festgelegten Reihenfolge. Die Partnermärkte hatten seit Dienstag mit Donnerstag geplant. Ein Partner kritisiert, dass „Donnerstag“ nur für die Kassen galt, nicht für Bestellungen und Bestände. Eigene Filialen und Partnermärkte werden nach derselben Reihenfolge umgestellt – einige eigene Filialen erst in der Nacht.

*Krisen-Info:* Kassen- und Preisdienste wieder verfügbar · Umstellung läuft bis in die Nacht

- Woran merken Sie, dass ein Markt wirklich sauber läuft?
- Wer informiert Filialen, Partner und Hotline – mit welcher Botschaft?
- Woran erkennen Sie technisch, dass ein Markt sauber läuft? *(Schwerpunkt)*

> **Vertraulich SK38 an Regionalleitung Filialen Nord** (Min. 70,9): Die Kassen laufen wieder, aber Rückgaben von Bons aus dem Offline-Zeitraum lassen sich nicht stornieren. Kundinnen und Kunden stehen mit Ware und Bon an der Information.

#### Min. 73,9 · LK27 Stabiler Notbetrieb · Sonntag 12:00 Uhr · Wiederanlauf

Nach fünf Tagen läuft Waterkant im stabilen Notbetrieb: Kassen und Preise aus dem Ausweich-Rack, die Warenwirtschaft mit nachgebuchten Daten, das Zentrallager liefert wieder. Das eigene Rechenzentrum ist gesperrt, die Reinigung hat begonnen. Das IT-Team arbeitet seit Dienstag in Doppelschichten, zwei Filialleitungen haben sich krankgemeldet. Die Nachbuchung der rund 26 Stunden Datenlücke läuft noch bis in die nächste Woche. Auch Lagerverwaltung, Gewerbeportal und Online-Bestände laufen aus dem erweiterten Ausweich-Rack.

*Krisen-Info:* Notbetrieb stabil · eigenes Rechenzentrum gesperrt · Team erschöpft

- Welche Botschaft senden Sie an Beschäftigte, Partner und Kundschaft – und wer sagt es?
- Wie entlasten Sie die Menschen, die seit Dienstag durcharbeiten?
- Was ist ab Montag „normal“ – und was noch nicht?
- Welche technischen Schulden aus dem Notbetrieb müssen Sie zurückzahlen? *(Schwerpunkt)*

> **Vertraulich SK32 an Geschäftsführung (CEO), Krisenstabsleitung (statt Personalleitung)** (Min. 74,4): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei Filialleitungen sind krank. Der Betriebsrat fragt, wer die Einsätze am Wochenende angeordnet hat. Arbeitszeitfragen sind fachlich zu prüfen.

#### Abschluss

Nach sieben Tagen. Kassen und Preise laufen aus dem Ausweich-Rack, die Warenwirtschaft ist nachgebucht, das Zentrallager liefert. Das eigene Rechenzentrum ist gesperrt, die Reinigung läuft. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 3.176.000 € + aus Entscheidungen: Reparatur der Warenwirtschafts-Datenbank nach hartem Ausfall (ein Tag Verzug) (95.000 €); Nacherfassung von rund 26 Stunden Bewegungsdaten (140.000 €); Erweiterung des Ausweichbetriebs (12 Monate) und zusätzliche Dienstleister (210.000 €); Saisonumsatz: einige eigene Filialen erst in der Nacht wieder voll (60.000 €) = **3.681.000 €**; Mögliche Erstattung durch Elektronik- und Betriebsunterbrechungsversicherung (optimistische Modellannahme, nicht bestätigt): − 1.600.000 € → **beim Unternehmen bleiben 2.081.000 €** (17 % des Jahresgewinns).

*Fazit auf der Bühne:* Nach fünf Tagen kassieren alle Märkte wieder. Ob das eigene Rechenzentrum zurückkommt, ist offen – das Vertrauen der Partner hängt an dieser Woche. Eine Krise ist erst vorbei, wenn Partner, Kundschaft und Beschäftigte wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das in der Nacht entscheiden dürfen?
- Wann stand der Schutz von Menschen gegen Daten, Umsatz oder Tempo – und wie habt ihr entschieden?
- Wie kamen Meldungen aus Filialen, Partnermärkten und Hotline beim Krisenstab an – und wie kamen Anweisungen zurück?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- Welche Zusage an Partner oder Kunden war am riskantesten?
- Wo waren Single Points of Failure – Technik, Wissen, Personen?
- Welche Kosten trägt die Versicherung wahrscheinlich nicht – und was bedeutet das für die Liquidität?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?
- *(Schwerpunkt)* Welche Abkürzung war im Notbetrieb verlockend – und welche habt ihr genommen?
- *(Schwerpunkt)* Was hätte der Ausweichplan vorher geübt haben müssen?

---

### Geschichte 6: 120 Minuten · Partner, Kunden und Kommunikation · W1 herunterfahren, W2 spaeter, W3 abwarten, W4 minimal, W5 eigene

**Besetzte Rollen (12):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz, Leitung Finanzen und Versicherung (CFO), Leitung Unternehmenskommunikation und Marketing, IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Regionalleitung Filialen Nord, Notfallmanagement / BCM-Koordination, IT-Support Filialen und Kassen, Leitung Online-Shop und Gewerbekundenportal  
**Geplante Krisenzeit:** 108 Min. + ca. 12 Min. Abschluss · Entscheidungszeit je Lage ca. 2,5 Min.
  
**Leitfrage des Schwerpunkts (für die Moderation):** Wer erfährt wann was von wem – und stimmt das mit dem überein, was wir wirklich wissen?

#### Min. 0,0 · LK01 USV meldet Batteriewarnung · Montag 22:40 Uhr · Vorboten

Die Gebäudeleittechnik meldet für die USV-Anlage im Rechenzentrum: „Batterietemperatur Modul 3 erhöht“. Der Sensor gilt als launisch, die Meldung kam in den letzten Wochen schon dreimal. Die Rufbereitschaft der IT quittiert die Meldung per App.

- Was tun Sie mit einer Meldung, die schon oft falsch war?
- Wer müsste davon wissen – IT, Gebäudetechnik oder beide?

#### Min. 3,0 · LK03 Serverraum wird warm · Dienstag 03:02 Uhr · Vorboten

Die Klimaanlage des Serverraums meldet Störung, die Temperatur steigt: 31 °C und weiter steigend. Seit 03:00 Uhr läuft die nächtliche Übertragung der Aktionspreise für den Saisonstart an die Filialkassen; gleichzeitig laden die Partnermärkte ihre Tagesabschlüsse hoch. Die Rufbereitschaft ruft die IT-Leitung an.

- Herunterfahren oder weiterlaufen lassen – was riskieren Sie jeweils?
- Wer darf nachts entscheiden, Systeme abzuschalten, die 23 Märkte betreffen?

> **Vertraulich SK03 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 3,3): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise an die Filialkassen läuft seit 03:00 Uhr und braucht noch etwa 40 Minuten; die Partnermärkte laden gerade ihre Tagesabschlüsse hoch. Herunterfahren heißt: Beides bricht ab – und das kurz vor dem Saisonstart.

**Entscheidung W1 (am Ende dieser Lage):** Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen sie weiter, bis die Gebäudetechnik die Ursache kennt?  
→ Der Tisch entscheidet: **Nicht zwingend benötigte Systeme sofort kontrolliert herunterfahren (Preisübertragung und Partner-Uploads brechen ab)**  
*Folge laut Drehbuch:* Die Datenbanken sind sauber beendet; die Rücksicherung braucht keine Reparatur. Die Aktionspreise fehlen dafür in allen 14 Filialen.

#### Min. 6,0 · LK04 Brandalarm im Rechenzentrum · Dienstag 03:10 Uhr · Ausbruch

Die Brandmeldeanlage löst aus: Rauch im USV-Raum neben dem Serverraum. Im Serverraum wird automatisch die Gaslöschanlage ausgelöst, der Raum wird mit Löschgas geflutet. Das Verwaltungsgebäude wird geräumt, die Nachtschicht im angrenzenden Zentrallager geht vorsorglich zum Sammelplatz. Die Feuerwehr ist alarmiert.

*Krisen-Info:* Brandort: USV-Raum · Gaslöschung im Serverraum ausgelöst · Gebäude geräumt

- Wer muss jetzt sofort informiert werden – in welcher Reihenfolge?
- Wer übernimmt bis zum Eintreffen der Feuerwehr die Führung vor Ort?
- Wann und wie wird der Krisenstab einberufen?

#### Min. 14,5 · LK06 Lagebild nach dem Löschen · Dienstag 05:30 Uhr · Ausbruch

Der Brand im USV-Raum ist gelöscht, alle Personen sind wohlauf. Der Serverraum selbst hat nicht gebrannt, ist aber verraucht; Löschgas und Rauch sind abgezogen. Das Gebäude bleibt bis zur Prüfung durch Sachverständige gesperrt. Im Rechenzentrum ist alles aus: Warenwirtschaft, Kassenzentrale, Lagerverwaltung, Gewerbekundenportal, Telefonanlage der Zentrale.

*Krisen-Info:* Rechenzentrum vollständig außer Betrieb · Gebäude gesperrt · Filialkassen offline-fähig ca. 72 Stunden (bis Freitag ca. 03:00 Uhr)

- Welche Geschäftsprozesse stehen jetzt – und welche laufen noch?
- Was ist bis zur Filialöffnung um 08:00 Uhr zu entscheiden?
- Wer übernimmt welche Aufgabe im Krisenstab?
- Wer muss es von Ihnen hören, bevor er es aus den Medien erfährt? *(Schwerpunkt)*

> **Vertraulich SK06 an Leitung Arbeitssicherheit und Werkschutz** (Min. 15,0): Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Fluorwasserstoff und andere ätzende Gase entstehen. Er empfiehlt, USV-Raum und Serverraum erst nach Messung und Freigabe durch Sachverständige zu betreten – ausdrücklich auch für IT-Personal.

#### Min. 23,0 · LK09 Die Partnermärkte rufen an · Dienstag 08:30 Uhr · Eskalation

Die neun Partnermärkte im Einkaufsverbund, für die Waterkant Kassen- und Warenwirtschaft als Dienstleistung betreibt, stehen vor demselben Problem. Der Servicevertrag sieht ein Wiederherstellungsziel von 24 Stunden für Kassen- und Preisdienste vor. Die ersten Partner wollen wissen, wann es weitergeht – eine belastbare Prognose hat die IT noch nicht.

*Krisen-Info:* 9 Partnermärkte betroffen · Wiederherstellungsziel laut Vertrag: 24 Stunden · Prognose offen

- Was sagen Sie den Partnern – und wer sagt es?
- Was ist eine ehrliche Prognose, wenn Sie selbst keine haben?
- Welche Folgen hat das Überschreiten der 24 Stunden?
- Ist Ihre Aussage eine Prognose oder ein Versprechen – und weiß der Partner den Unterschied? *(Schwerpunkt)*

> **Vertraulich SK11 an Partnerbetreuung Verbund (Kundenmanagement IT-Service)** (Min. 23,5): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiederherstellungsziel 24 Stunden für Kassen- und Preisdienste. Er will bis 12 Uhr wissen, wann es weitergeht, sonst wendet er sich an den Verbundvorstand.

> **Vertraulich SK08 an IT-Support Filialen und Kassen** (Min. 26,7): Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe etwa 72 Stunden, danach verweigern sie neue Buchungen, bis sie wieder mit der Zentrale synchronisiert sind. Das wäre Freitag gegen 03:00 Uhr. In den Filialen weiß das noch niemand.

> **Vertraulich SK35 an Notfallmanagement / BCM-Koordination** (Min. 27,9): Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine Papierkopie gibt es im Tresor der Geschäftsführung – im Verwaltungsgebäude, das bis zur Freigabe gesperrt ist.

**Entscheidung W2 (am Ende dieser Lage):** Informiert Waterkant heute alle Partnermärkte mit einer ehrlichen, aber unsicheren Prognose – oder erst, wenn ein belastbarer Wiederanlauftermin feststeht?  
→ Der Tisch entscheidet: **Erst informieren, wenn ein belastbarer Termin feststeht (voraussichtlich Mittwoch)**  
*Folge laut Drehbuch:* Die Partner erfahren die Lage aus der Zeitung; der Verbundvorstand verlangt ein Gespräch (vertrauliche Karte bei „Den Backup-Server bergen?“); Kulanzposten in der Rechnung.

#### Min. 31,5 · LK11 Nordkanal fragt nach · Dienstag 11:30 Uhr · Eskalation

Der Regionalsender Nordkanal ruft an: Auf Fotos stehen Feuerwehrfahrzeuge vor dem Verwaltungsgebäude, in sozialen Netzwerken ist von einem „Akkubrand mit giftigen Gasen“ die Rede. Gleichzeitig berichten Kundinnen und Kunden, dass die Prospektpreise an der Kasse nicht gelten.

*Krisen-Info:* Antwortfrist: bis 13:00 Uhr

- Wer spricht – und was ist gesichert?
- Wie trennen Sie Brand, Gesundheitsfrage und Preisärger in der Kommunikation?
- Welche Sprachregelung bekommen Filialen und Hotline?

> **Vertraulich SK13 an Gebäudetechnik und Facility Management** (Min. 35,6): Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht Arbeitstage. Die Klimaanlage darf bis zur Prüfung nicht laufen – Feuchtigkeit plus Ruß beschleunigt die Korrosion. Ob die Hardware danach noch zuverlässig ist, kann er nicht sagen.

> **Vertraulich SK14 an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)** (Min. 37,2): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall Rußfilm. In Rack 7 steht der Backup-Server mit der Dienstagssicherung von 01:00 Uhr. Wird er bald geborgen und gereinigt, sind die Daten vermutlich lesbar – je länger er im Ruß steht, desto größer die Korrosionsgefahr.

#### Min. 40,0 · LK14 Den Backup-Server bergen? · Mittwoch 07:30 Uhr · Höhepunkt

Die letzte vollständige Sicherungskopie beim Colocation-Anbieter stammt von Montag 01:00 Uhr – die Übertragung der Dienstagssicherung war beim Brand noch nicht fertig. Die Dienstagssicherung liegt auf dem Backup-Server im verrußten Serverraum. Eine Sanierungsfachfirma könnte ihn heute mit Schutzausrüstung bergen; die Freigabe des Raums für alle anderen kommt erst nach der Reinigung in etwa einer Woche.

*Krisen-Info:* Datenlücke ohne Bergung: ca. 26 Stunden · Bergung nur durch Fachfirma mit Schutzausrüstung · Messergebnis: Grenzwerte im Raum noch überschritten

- Wie viel ist Ihnen die fehlende Datenlücke wert – und welches Risiko für Menschen ist dafür vertretbar?
- Wer entscheidet über das Betreten: IT, Arbeitssicherheit, Geschäftsführung?
- Welche Voraussetzungen müssen erfüllt sein, bevor jemand den Raum betritt?
- Was sagen Sie Partnern und Kunden zur Datenlücke? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK42 an Geschäftsführung (CEO), Krisenstabsleitung:** Der Verbundvorstand ruft an: Die Partner haben aus der Lokalzeitung mehr über den Brand erfahren als von Waterkant. Er verlangt bis heute Abend ein Gespräch mit dir.

> **Vertraulich SK21 an Leitung Arbeitssicherheit und Werkschutz** (Min. 40,5): Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, aktuelles Messergebnis, Fachfirma mit Schutzausrüstung, Freiwilligkeit, Dokumentation. Die Fachfirma könnte heute um 14 Uhr – mit eigenem Personal, nicht mit eurer IT.

> **Vertraulich SK18 an Leitung Finanzen und Versicherung (CFO) (statt Leitung Einkauf und Dienstleistersteuerung)** (Min. 43,7): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-Anbieter kann das Ausweich-Rack binnen 48 Stunden erweitern – Mindestlaufzeit zwölf Monate, Kosten für das erste Jahr rund 210.000 € einschließlich Dienstleistern (Szenarioannahme).

> **Vertraulich SK19 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 44,9): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und den Kern der Warenwirtschaft. Die Netzwerkanbindung der 23 Märkte muss neu eingerichtet werden – das wurde nie vollständig geübt. Zwei deiner fünf Leute sind seit Dienstag 03:00 Uhr wach.

**Entscheidung W3 (am Ende dieser Lage):** Lässt Waterkant den Backup-Server mit der Dienstagssicherung heute von einer Fachfirma aus dem gesperrten Serverraum bergen – oder wartet es die Freigabe des Raums ab?  
→ Der Tisch entscheidet: **Freigabe des Raums abwarten (nach Reinigung, ca. eine Woche)**  
*Folge laut Drehbuch:* Niemand betritt den Raum vorzeitig. Die Lücke von etwa 26 Stunden muss von Hand nachgebucht werden; ob die Dienstagssicherung später noch lesbar ist, ist offen.

#### Min. 48,5 · LK15 Wie weit geht der Ausweichbetrieb? · Mittwoch 10:00 Uhr · Höhepunkt

Die IT hat einen Plan: Kassen- und Preisdienste und der Kern der Warenwirtschaft passen in das Ausweich-Rack und könnten am Donnerstag laufen. Lagerverwaltung, Gewerbekundenportal und Online-Bestände passen nur nach einer Erweiterung, die der Anbieter binnen 48 Stunden liefern kann – mit zwölf Monaten Mindestlaufzeit. Ohne Erweiterung warten diese Systeme auf das eigene Rechenzentrum, laut Sanierer frühestens in drei Wochen.

*Krisen-Info:* Kassen- und Preisdienste: Donnerstag möglich · Rest: Erweiterung (48 h, 12 Monate Vertrag) oder ca. 3 Wochen warten

- Was ist Ihnen schneller Online-Handel und Lagerbetrieb wert?
- Welche Risiken hat ein schneller, großer Umzug für ein müdes Team?
- Wer trägt diese Entscheidung – IT, Finanzen oder Geschäftsführung?
- Wie erklären Sie Gewerbekunden, dass ihr Portal (noch) nicht läuft? *(Schwerpunkt)*

> **Vertraulich SK46 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 49,0): Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Ausweich-Racks gehört und ruft dich an. Nach eurer Geschäftsordnung brauchen Verträge mit mehr als zwölf Monaten Bindung die Zustimmung der Gesellschafter. Er ist bis Freitag im Ausland, aber telefonisch erreichbar: „Entscheiden Sie, was nötig ist – aber ich will es vorher wissen und nicht aus der Rechnung erfahren.“

> **Vertraulich SK23 an Leitung Online-Shop und Gewerbekundenportal** (Min. 52,6): Der Shop zeigt seit Dienstag Bestände von Montagnacht. 312 Bestellungen „Abholung in der Filiale“ sind eingegangen, ein Teil für Artikel, die vermutlich nicht da sind. Der Hoster könnte den Shop auf „nur Information“ schalten.

**Entscheidung W4 (am Ende dieser Lage):** Bringt Waterkant nur das Nötigste ins Ausweich-Rack – oder erweitert es den Ausweichbetrieb, damit auch Lager, Gewerbeportal und Online-Bestände schnell zurückkommen?  
→ Der Tisch entscheidet: **Nur Kassen- und Preisdienste und den Kern der Warenwirtschaft verlagern; der Rest wartet auf das eigene Rechenzentrum**  
*Folge laut Drehbuch:* Lager, Gewerbeportal und Online-Bestände bleiben etwa drei Wochen eingeschränkt; Gewerbekunden weichen aus.

#### Min. 57,0 · LK16 Ein Bauunternehmen will Vorrang · Mittwoch 13:00 Uhr · Höhepunkt

Der größte Gewerbekunde, ein regionales Bauunternehmen, kann seit Dienstag nicht über das Portal bestellen. Für zwei Baustellen braucht es bis Freitag Dämmstoff und Trockenbaumaterial. Der Einkaufsleiter verlangt eine verbindliche Lieferzusage und droht, die Rahmenvereinbarung zu kündigen.

*Krisen-Info:* Liefertermin Freitag · Rahmenvereinbarung in Gefahr · Portal außer Betrieb

- Was können Sie zusagen, ohne Lagerverwaltung und Portal?
- Bekommt ein Großkunde Vorrang vor den Filialen?
- Wer führt das Gespräch?

#### Min. 65,5 · LK17 Prospektpreise vor der Kasse · Mittwoch 16:00 Uhr · Höhepunkt

In sozialen Netzwerken kursieren Videos von Kassen, an denen der Prospektpreis nicht gilt; Kommentare sprechen von „Lockvogelwerbung“. Filialen haben unterschiedlich reagiert: Manche geben den Aktionspreis per Handeingabe, andere verweisen auf „technische Probleme“. Die Hotline ist überlastet.

*Krisen-Info:* Mehrere tausend Interaktionen · uneinheitliche Praxis in den Filialen · Hotline überlastet

- Welche einheitliche Regel gilt ab sofort für Prospektpreise?
- Was sagen Sie öffentlich – und was sagen Hotline und Filialen?
- Wer trägt die Kosten der Kulanz, und ist das entschieden?

> **Vertraulich SK24 an Leitung Unternehmenskommunikation und Marketing (statt Kundenservice-Hotline)** (Min. 70,4): Seit dem Morgen über 600 Anrufe. Die häufigste Frage: „Gilt der Prospektpreis?“ Ihr habt keine Sprachregelung. Mehrere Anrufer drohen mit einer Beschwerde wegen irreführender Werbung.

#### Min. 74,0 · LK20 Wer kassiert zuerst? · Donnerstag 10:00 Uhr · Folgen

Die Ausweichumgebung kann am Donnerstagabend die ersten Märkte versorgen, aber nicht alle gleichzeitig: Pro Stunde lassen sich etwa zwei Märkte sicher umstellen. Es sind 23. Die eigenen Filialen haben den größten Umsatz in der Saisonwoche; die Partnermärkte haben einen Vertrag. Um Freitag 03:00 Uhr erreichen die Kassen die 72-Stunden-Grenze.

*Krisen-Info:* ca. 2 Märkte pro Stunde · 23 Märkte · Kassen-Grenze Freitag ca. 03:00 Uhr

- Nach welchem Kriterium legen Sie die Reihenfolge fest?
- Wer entscheidet – und wer sagt es den Partnern?
- Was passiert mit Märkten, die die 72-Stunden-Grenze reißen?
- Wie erklären Sie die Reihenfolge – und wem zuerst? *(Schwerpunkt)*

> **Vertraulich SK26 an Partnerbetreuung Verbund (Kundenmanagement IT-Service)** (Min. 78,9): Ein Partnermarkt hat eigenständig einen anderen Kassenanbieter angefragt und will dir heute sagen, ob er „vorerst selbst etwas aufbaut“. Damit würde er aus dem gemeinsamen Preis- und Warenwirtschaftssystem ausscheren.

**Entscheidung W5 (am Ende dieser Lage):** Stellt Waterkant eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium um – oder kommen die eigenen 14 Filialen zuerst?  
→ Der Tisch entscheidet: **Eigene 14 Filialen zuerst, Partnermärkte etwa zwölf Stunden später**  
*Folge laut Drehbuch:* Die eigenen Filialen kassieren ab Donnerstagabend, die Partner erst kurz vor der 72-Stunden-Grenze; zwei Partner prüfen einen Wechsel (vertrauliche Karte).

#### Min. 82,5 · LK21 Nordkanal berichtet · Donnerstag 13:00 Uhr · Folgen

Nordkanal sendet einen Beitrag: „Brand im Rechenzentrum – Kassenchaos zum Saisonstart bei Waterkant“. Ein Partnermarkt-Inhaber kommt zu Wort, die Feuerwehr bestätigt einen Batteriebrand im Technikraum.

- Reagieren Sie öffentlich auf den Beitrag?
- Was erfahren die eigenen Beschäftigten – bevor sie es aus den Medien hören?

#### Min. 91,0 · LK22 Die Kassen laufen wieder · Donnerstag 18:00 Uhr · Wiederanlauf

Die Kassen- und Preisdienste laufen aus dem Ausweich-Rack. Die ersten Märkte sind umgestellt, die Kassen gleichen ihre Offline-Abverkäufe ab, die Aktionspreise sind hinterlegt. Die übrigen Märkte folgen in der Nacht – nach der festgelegten Reihenfolge. Die kontrollierte Abschaltung in der Brandnacht hat sich bezahlt gemacht: Die Datenbanken mussten nicht repariert werden. Die eigenen Filialen kassieren seit Donnerstagabend, die Partnermärkte folgen in der Nacht – knapp vor der 72-Stunden-Grenze.

*Krisen-Info:* Kassen- und Preisdienste wieder verfügbar · Umstellung läuft bis in die Nacht

- Woran merken Sie, dass ein Markt wirklich sauber läuft?
- Wer informiert Filialen, Partner und Hotline – mit welcher Botschaft?
- Welche Botschaft bekommen Filialen, Partner und Hotline zur gleichen Zeit? *(Schwerpunkt)*

> **Vertraulich (Folge einer Entscheidung) SK44 an Partnerbetreuung Verbund (Kundenmanagement IT-Service):** Zwei Partnermärkte haben bemerkt, dass die Waterkant-Filialen zwölf Stunden früher wieder kassieren konnten. Einer hat Kontakt zu einem anderen IT-Dienstleister aufgenommen.

> **Vertraulich SK38 an Regionalleitung Filialen Nord** (Min. 95,9): Die Kassen laufen wieder, aber Rückgaben von Bons aus dem Offline-Zeitraum lassen sich nicht stornieren. Kundinnen und Kunden stehen mit Ware und Bon an der Information.

#### Min. 99,5 · LK27 Stabiler Notbetrieb · Sonntag 12:00 Uhr · Wiederanlauf

Nach fünf Tagen läuft Waterkant im stabilen Notbetrieb: Kassen und Preise aus dem Ausweich-Rack, die Warenwirtschaft mit nachgebuchten Daten, das Zentrallager liefert wieder. Das eigene Rechenzentrum ist gesperrt, die Reinigung hat begonnen. Das IT-Team arbeitet seit Dienstag in Doppelschichten, zwei Filialleitungen haben sich krankgemeldet. Die Nachbuchung der rund 26 Stunden Datenlücke läuft noch bis in die nächste Woche. Lagerverwaltung, Gewerbeportal und Online-Bestände bleiben bis zur Rückkehr ins eigene Rechenzentrum eingeschränkt.

*Krisen-Info:* Notbetrieb stabil · eigenes Rechenzentrum gesperrt · Team erschöpft

- Welche Botschaft senden Sie an Beschäftigte, Partner und Kundschaft – und wer sagt es?
- Wie entlasten Sie die Menschen, die seit Dienstag durcharbeiten?
- Was ist ab Montag „normal“ – und was noch nicht?
- Wie schließen Sie die Woche nach außen ab, ohne zu viel zu versprechen? *(Schwerpunkt)*

> **Vertraulich SK32 an Geschäftsführung (CEO), Krisenstabsleitung (statt Personalleitung)** (Min. 100,0): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei Filialleitungen sind krank. Der Betriebsrat fragt, wer die Einsätze am Wochenende angeordnet hat. Arbeitszeitfragen sind fachlich zu prüfen.

#### Abschluss

Nach sieben Tagen. Kassen und Preise laufen aus dem Ausweich-Rack, die Warenwirtschaft ist nachgebucht, das Zentrallager liefert. Das eigene Rechenzentrum ist gesperrt, die Reinigung läuft. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 3.176.000 € + aus Entscheidungen: Abgebrochene Preisübertragung: Aktionspreise auch in den 5 Filialen per Kulanz, die sie sonst erhalten hätten (50.000 €); Kulanz und Sonderkonditionen für Partnermärkte (40.000 €); Nacherfassung von rund 26 Stunden Bewegungsdaten (140.000 €); Entgangener Rohertrag Online-Shop und Gewerbekunden (ca. 3 Wochen eingeschränkt) (260.000 €); Zusätzliche Gutschriften und Risiko des Partnerverlusts im IT-Service (12 Monate) (90.000 €) = **3.756.000 €**; Mögliche Erstattung durch Elektronik- und Betriebsunterbrechungsversicherung (optimistische Modellannahme, nicht bestätigt): − 1.600.000 € → **beim Unternehmen bleiben 2.156.000 €** (18 % des Jahresgewinns).

*Fazit auf der Bühne:* Nach fünf Tagen kassieren alle Märkte wieder. Ob das eigene Rechenzentrum zurückkommt, ist offen – das Vertrauen der Partner hängt an dieser Woche. Eine Krise ist erst vorbei, wenn Partner, Kundschaft und Beschäftigte wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das in der Nacht entscheiden dürfen?
- Wann stand der Schutz von Menschen gegen Daten, Umsatz oder Tempo – und wie habt ihr entschieden?
- Wie kamen Meldungen aus Filialen, Partnermärkten und Hotline beim Krisenstab an – und wie kamen Anweisungen zurück?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- Welche Zusage an Partner oder Kunden war am riskantesten?
- Wo waren Single Points of Failure – Technik, Wissen, Personen?
- Welche Kosten trägt die Versicherung wahrscheinlich nicht – und was bedeutet das für die Liquidität?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?
- *(Schwerpunkt)* Welche Zusage nach außen war am riskantesten?
- *(Schwerpunkt)* Wo kamen Informationen bei Partnern oder Kundschaft zu spät oder widersprüchlich an?

---

### Geschichte 7: 180 Minuten · Ausgewogen · W1 weiterlaufen, W2 spaeter, W3 bergen, W4 ausbauen, W5 eigene

**Besetzte Rollen (18):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz, Leitung Finanzen und Versicherung (CFO), Leitung Unternehmenskommunikation und Marketing, IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Regionalleitung Filialen Nord, Notfallmanagement / BCM-Koordination, IT-Support Filialen und Kassen, Leitung Online-Shop und Gewerbekundenportal, Leitung Logistik und Zentrallager, Informationssicherheit und Datenschutzkoordination, Leitung Einkauf und Dienstleistersteuerung, Kundenservice-Hotline, Personalleitung, Regionalleitung Filialen Süd  
**Geplante Krisenzeit:** 165 Min. + ca. 15 Min. Abschluss · Entscheidungszeit je Lage ca. 3,14 Min.

#### Min. 0,0 · LK01 USV meldet Batteriewarnung · Montag 22:40 Uhr · Vorboten

Die Gebäudeleittechnik meldet für die USV-Anlage im Rechenzentrum: „Batterietemperatur Modul 3 erhöht“. Der Sensor gilt als launisch, die Meldung kam in den letzten Wochen schon dreimal. Die Rufbereitschaft der IT quittiert die Meldung per App.

- Was tun Sie mit einer Meldung, die schon oft falsch war?
- Wer müsste davon wissen – IT, Gebäudetechnik oder beide?

#### Min. 3,0 · LK02 Geruch im Technikflur · Dienstag 02:35 Uhr · Vorboten

Der Wachdienst meldet bei seinem Rundgang einen Geruch nach verschmortem Kunststoff im Technikflur des Verwaltungsgebäudes, nahe dem USV-Raum. Sichtbar ist nichts, die Brandmeldeanlage ist ruhig. Der Wachmann ruft die Gebäudetechnik-Bereitschaft an.

- Wer entscheidet um 02:35 Uhr, ob das ein Notfall ist?
- Würden Sie jemanden wecken – und wen?

#### Min. 6,0 · LK03 Serverraum wird warm · Dienstag 03:02 Uhr · Vorboten

Die Klimaanlage des Serverraums meldet Störung, die Temperatur steigt: 31 °C und weiter steigend. Seit 03:00 Uhr läuft die nächtliche Übertragung der Aktionspreise für den Saisonstart an die Filialkassen; gleichzeitig laden die Partnermärkte ihre Tagesabschlüsse hoch. Die Rufbereitschaft ruft die IT-Leitung an.

- Herunterfahren oder weiterlaufen lassen – was riskieren Sie jeweils?
- Wer darf nachts entscheiden, Systeme abzuschalten, die 23 Märkte betreffen?

> **Vertraulich SK03 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 6,3): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise an die Filialkassen läuft seit 03:00 Uhr und braucht noch etwa 40 Minuten; die Partnermärkte laden gerade ihre Tagesabschlüsse hoch. Herunterfahren heißt: Beides bricht ab – und das kurz vor dem Saisonstart.

**Entscheidung W1 (am Ende dieser Lage):** Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen sie weiter, bis die Gebäudetechnik die Ursache kennt?  
→ Der Tisch entscheidet: **Weiterlaufen lassen, bis die Gebäudetechnik die Ursache geklärt hat**  
*Folge laut Drehbuch:* Die Preisübertragung erreicht vor dem Stromausfall noch 5 der 14 Filialen. Der harte Ausfall hinterlässt eine inkonsistente Datenbank: einen Tag Reparatur.

#### Min. 9,0 · LK04 Brandalarm im Rechenzentrum · Dienstag 03:10 Uhr · Ausbruch

Die Brandmeldeanlage löst aus: Rauch im USV-Raum neben dem Serverraum. Im Serverraum wird automatisch die Gaslöschanlage ausgelöst, der Raum wird mit Löschgas geflutet. Das Verwaltungsgebäude wird geräumt, die Nachtschicht im angrenzenden Zentrallager geht vorsorglich zum Sammelplatz. Die Feuerwehr ist alarmiert.

*Krisen-Info:* Brandort: USV-Raum · Gaslöschung im Serverraum ausgelöst · Gebäude geräumt

- Wer muss jetzt sofort informiert werden – in welcher Reihenfolge?
- Wer übernimmt bis zum Eintreffen der Feuerwehr die Führung vor Ort?
- Wann und wie wird der Krisenstab einberufen?

#### Min. 20,1 · LK05 Feuerwehr im Einsatz · Dienstag 03:40 Uhr · Ausbruch

Die Feuerwehr bekämpft den Brand im USV-Raum und schaltet den Strom für das Verwaltungsgebäude ab. Der Einsatzleiter verlangt einen Ansprechpartner, der das Gebäude kennt. Am Sammelplatz fehlt eine Person: Ein Kollege der IT-Rufbereitschaft war gegen 03:05 Uhr ins Gebäude gefahren, um nach der Klimaanlage zu sehen.

*Krisen-Info:* Strom im Verwaltungsgebäude abgeschaltet · 1 Person am Sammelplatz nicht gemeldet

- Wer spricht mit der Einsatzleitung – und mit welchen Informationen?
- Wie klären Sie, ob noch jemand im Gebäude ist?
- Wer kümmert sich um Angehörige?

> **Vertraulich SK04 an Leitung Arbeitssicherheit und Werkschutz (statt Schichtleitung Zentrallager (vor Ort in der Brandnacht))** (Min. 20,6): Am Sammelplatz fehlt der Kollege der IT-Rufbereitschaft. Sein Auto steht auf dem Hof, ans Telefon geht er nicht. Die Feuerwehr fragt dich, ob noch jemand im Gebäude ist.

#### Min. 31,3 · LK06 Lagebild nach dem Löschen · Dienstag 05:30 Uhr · Ausbruch

Der Brand im USV-Raum ist gelöscht, alle Personen sind wohlauf. Der Serverraum selbst hat nicht gebrannt, ist aber verraucht; Löschgas und Rauch sind abgezogen. Das Gebäude bleibt bis zur Prüfung durch Sachverständige gesperrt. Im Rechenzentrum ist alles aus: Warenwirtschaft, Kassenzentrale, Lagerverwaltung, Gewerbekundenportal, Telefonanlage der Zentrale.

*Krisen-Info:* Rechenzentrum vollständig außer Betrieb · Gebäude gesperrt · Filialkassen offline-fähig ca. 72 Stunden (bis Freitag ca. 03:00 Uhr)

- Welche Geschäftsprozesse stehen jetzt – und welche laufen noch?
- Was ist bis zur Filialöffnung um 08:00 Uhr zu entscheiden?
- Wer übernimmt welche Aufgabe im Krisenstab?

> **Vertraulich SK06 an Leitung Arbeitssicherheit und Werkschutz** (Min. 31,8): Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Fluorwasserstoff und andere ätzende Gase entstehen. Er empfiehlt, USV-Raum und Serverraum erst nach Messung und Freigabe durch Sachverständige zu betreten – ausdrücklich auch für IT-Personal.

#### Min. 42,4 · LK08 Saisonstart ohne Aktionspreise · Dienstag 07:00 Uhr · Eskalation

Die Filialen bereiten den Saisonstart vor; der Prospekt mit Aktionspreisen ist seit Sonntag verteilt. An den Kassen sind die Aktionspreise nicht hinterlegt, Bestandsauskünfte sind nicht möglich. Filialleitungen fragen, ob sie überhaupt öffnen sollen und ob sie Prospektpreise von Hand eingeben dürfen. Ausnahme: In 5 der 14 Filialen kam die Preisübertragung vor dem Stromausfall noch an – dort stimmen die Aktionspreise.

*Krisen-Info:* Öffnung 08:00 Uhr · Aktionspreise nicht an den Kassen · keine Bestandsauskunft

- Öffnen die Filialen – und mit welcher Anweisung?
- Wie gehen Kassen mit Prospektpreisen um, einheitlich in allen 14 Filialen?
- Wer gibt die Anweisung raus, und wie kommt sie an?

> **Vertraulich SK08 an IT-Support Filialen und Kassen** (Min. 47,3): Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe etwa 72 Stunden, danach verweigern sie neue Buchungen, bis sie wieder mit der Zentrale synchronisiert sind. Das wäre Freitag gegen 03:00 Uhr. In den Filialen weiß das noch niemand.

> **Vertraulich SK35 an Notfallmanagement / BCM-Koordination** (Min. 48,8): Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine Papierkopie gibt es im Tresor der Geschäftsführung – im Verwaltungsgebäude, das bis zur Freigabe gesperrt ist.

> **Vertraulich SK10 an Regionalleitung Filialen Süd** (Min. 50,4): In einer Filiale gibt die Filialleitung den Prospektpreis per Handeingabe, die Nachbarfiliale verweigert ihn. Kundinnen vergleichen die Bons in einer Facebook-Gruppe.

#### Min. 53,6 · LK09 Die Partnermärkte rufen an · Dienstag 08:30 Uhr · Eskalation

Die neun Partnermärkte im Einkaufsverbund, für die Waterkant Kassen- und Warenwirtschaft als Dienstleistung betreibt, stehen vor demselben Problem. Der Servicevertrag sieht ein Wiederherstellungsziel von 24 Stunden für Kassen- und Preisdienste vor. Die ersten Partner wollen wissen, wann es weitergeht – eine belastbare Prognose hat die IT noch nicht.

*Krisen-Info:* 9 Partnermärkte betroffen · Wiederherstellungsziel laut Vertrag: 24 Stunden · Prognose offen

- Was sagen Sie den Partnern – und wer sagt es?
- Was ist eine ehrliche Prognose, wenn Sie selbst keine haben?
- Welche Folgen hat das Überschreiten der 24 Stunden?

> **Vertraulich SK11 an Partnerbetreuung Verbund (Kundenmanagement IT-Service)** (Min. 54,1): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiederherstellungsziel 24 Stunden für Kassen- und Preisdienste. Er will bis 12 Uhr wissen, wann es weitergeht, sonst wendet er sich an den Verbundvorstand.

> **Vertraulich SK12 an Leitung Finanzen und Versicherung (CFO)** (Min. 59,0): Im Servicevertrag mit den Partnermärkten stehen Gutschriften bei Überschreiten des Wiederherstellungsziels (Szenarioannahme: 2.000 € je Markt und angefangenem Tag). Zwei Verträge enthalten zusätzlich ein Sonderkündigungsrecht bei „erheblicher Störung“. Ob dieser Fall eintritt, ist fachlich zu prüfen.

**Entscheidung W2 (am Ende dieser Lage):** Informiert Waterkant heute alle Partnermärkte mit einer ehrlichen, aber unsicheren Prognose – oder erst, wenn ein belastbarer Wiederanlauftermin feststeht?  
→ Der Tisch entscheidet: **Erst informieren, wenn ein belastbarer Termin feststeht (voraussichtlich Mittwoch)**  
*Folge laut Drehbuch:* Die Partner erfahren die Lage aus der Zeitung; der Verbundvorstand verlangt ein Gespräch (vertrauliche Karte bei „Den Backup-Server bergen?“); Kulanzposten in der Rechnung.

#### Min. 64,7 · LK10 Serverraum gesperrt · Dienstag 10:00 Uhr · Eskalation

Die Feuerwehr übergibt das Gebäude. Ein Sachverständiger gibt Büros und Flure frei, nicht aber USV-Raum und Serverraum: Auf allen Racks liegt ein Rußfilm, bei brennenden Lithium-Ionen-Batterien können ätzende Gase entstehen. Eine Messung läuft, das Ergebnis kommt frühestens Mittwochmorgen. Die Klimaanlage darf bis dahin nicht laufen.

*Krisen-Info:* Büros freigegeben · Serverraum und USV-Raum gesperrt · Messergebnis frühestens Mittwochmorgen

- Wer entscheidet, wann der Serverraum wieder betreten wird – und auf welcher Grundlage?
- Was bedeutet der Rußfilm für die Hardware?
- Wer hält Kontakt zu Sachverständigen und Sanierern?

> **Vertraulich SK13 an Gebäudetechnik und Facility Management** (Min. 70,1): Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht Arbeitstage. Die Klimaanlage darf bis zur Prüfung nicht laufen – Feuchtigkeit plus Ruß beschleunigt die Korrosion. Ob die Hardware danach noch zuverlässig ist, kann er nicht sagen.

> **Vertraulich SK14 an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)** (Min. 72,1): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall Rußfilm. In Rack 7 steht der Backup-Server mit der Dienstagssicherung von 01:00 Uhr. Wird er bald geborgen und gereinigt, sind die Daten vermutlich lesbar – je länger er im Ruß steht, desto größer die Korrosionsgefahr.

#### Min. 75,9 · LK14 Den Backup-Server bergen? · Mittwoch 07:30 Uhr · Höhepunkt

Die letzte vollständige Sicherungskopie beim Colocation-Anbieter stammt von Montag 01:00 Uhr – die Übertragung der Dienstagssicherung war beim Brand noch nicht fertig. Die Dienstagssicherung liegt auf dem Backup-Server im verrußten Serverraum. Eine Sanierungsfachfirma könnte ihn heute mit Schutzausrüstung bergen; die Freigabe des Raums für alle anderen kommt erst nach der Reinigung in etwa einer Woche.

*Krisen-Info:* Datenlücke ohne Bergung: ca. 26 Stunden · Bergung nur durch Fachfirma mit Schutzausrüstung · Messergebnis: Grenzwerte im Raum noch überschritten

- Wie viel ist Ihnen die fehlende Datenlücke wert – und welches Risiko für Menschen ist dafür vertretbar?
- Wer entscheidet über das Betreten: IT, Arbeitssicherheit, Geschäftsführung?
- Welche Voraussetzungen müssen erfüllt sein, bevor jemand den Raum betritt?

> **Vertraulich (Folge einer Entscheidung) SK42 an Geschäftsführung (CEO), Krisenstabsleitung:** Der Verbundvorstand ruft an: Die Partner haben aus der Lokalzeitung mehr über den Brand erfahren als von Waterkant. Er verlangt bis heute Abend ein Gespräch mit dir.

> **Vertraulich SK21 an Leitung Arbeitssicherheit und Werkschutz** (Min. 76,4): Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, aktuelles Messergebnis, Fachfirma mit Schutzausrüstung, Freiwilligkeit, Dokumentation. Die Fachfirma könnte heute um 14 Uhr – mit eigenem Personal, nicht mit eurer IT.

> **Vertraulich SK18 an Leitung Einkauf und Dienstleistersteuerung** (Min. 80,7): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-Anbieter kann das Ausweich-Rack binnen 48 Stunden erweitern – Mindestlaufzeit zwölf Monate, Kosten für das erste Jahr rund 210.000 € einschließlich Dienstleistern (Szenarioannahme).

> **Vertraulich SK19 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 82,3): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und den Kern der Warenwirtschaft. Die Netzwerkanbindung der 23 Märkte muss neu eingerichtet werden – das wurde nie vollständig geübt. Zwei deiner fünf Leute sind seit Dienstag 03:00 Uhr wach.

**Entscheidung W3 (am Ende dieser Lage):** Lässt Waterkant den Backup-Server mit der Dienstagssicherung heute von einer Fachfirma aus dem gesperrten Serverraum bergen – oder wartet es die Freigabe des Raums ab?  
→ Der Tisch entscheidet: **Heute durch die Fachfirma unter Schutzausrüstung bergen lassen (nach Gefährdungsbeurteilung), dann reinigen und prüfen**  
*Folge laut Drehbuch:* Die Dienstagssicherung ist nach Reinigung lesbar; die Datenlücke schrumpft auf etwa zwei Stunden. Die Berufsgenossenschaft fragt nach den Unterlagen.

#### Min. 87,0 · LK15 Wie weit geht der Ausweichbetrieb? · Mittwoch 10:00 Uhr · Höhepunkt

Die IT hat einen Plan: Kassen- und Preisdienste und der Kern der Warenwirtschaft passen in das Ausweich-Rack und könnten am Donnerstag laufen. Lagerverwaltung, Gewerbekundenportal und Online-Bestände passen nur nach einer Erweiterung, die der Anbieter binnen 48 Stunden liefern kann – mit zwölf Monaten Mindestlaufzeit. Ohne Erweiterung warten diese Systeme auf das eigene Rechenzentrum, laut Sanierer frühestens in drei Wochen.

*Krisen-Info:* Kassen- und Preisdienste: Donnerstag möglich · Rest: Erweiterung (48 h, 12 Monate Vertrag) oder ca. 3 Wochen warten

- Was ist Ihnen schneller Online-Handel und Lagerbetrieb wert?
- Welche Risiken hat ein schneller, großer Umzug für ein müdes Team?
- Wer trägt diese Entscheidung – IT, Finanzen oder Geschäftsführung?

> **Vertraulich (Folge einer Entscheidung) SK41 an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft):** Die Datenbank der Warenwirtschaft ist nach dem harten Stromausfall in der Brandnacht inkonsistent. Bevor ihr irgendetwas ins Ausweich-Rack übertragt, muss sie repariert werden – etwa ein Tag zusätzlich.

> **Vertraulich SK46 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 87,5): Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Ausweich-Racks gehört und ruft dich an. Nach eurer Geschäftsordnung brauchen Verträge mit mehr als zwölf Monaten Bindung die Zustimmung der Gesellschafter. Er ist bis Freitag im Ausland, aber telefonisch erreichbar: „Entscheiden Sie, was nötig ist – aber ich will es vorher wissen und nicht aus der Rechnung erfahren.“

> **Vertraulich SK22 an Informationssicherheit und Datenschutzkoordination** (Min. 87,5): Wenn die Warenwirtschaft ins Ausweich-Rack zieht, laufen dort auch Daten der Gewerbekunden und Partnermärkte. Der Vertrag mit dem Colocation-Anbieter beschreibt nur die Lagerung von Sicherungskopien, nicht den Produktivbetrieb. Was das bedeutet, ist fachlich zu prüfen.

> **Vertraulich SK23 an Leitung Online-Shop und Gewerbekundenportal** (Min. 91,9): Der Shop zeigt seit Dienstag Bestände von Montagnacht. 312 Bestellungen „Abholung in der Filiale“ sind eingegangen, ein Teil für Artikel, die vermutlich nicht da sind. Der Hoster könnte den Shop auf „nur Information“ schalten.

**Entscheidung W4 (am Ende dieser Lage):** Bringt Waterkant nur das Nötigste ins Ausweich-Rack – oder erweitert es den Ausweichbetrieb, damit auch Lager, Gewerbeportal und Online-Bestände schnell zurückkommen?  
→ Der Tisch entscheidet: **Ausweich-Rack binnen 48 Stunden erweitern und auch Lager, Gewerbeportal und Online-Bestände verlagern (zwölf Monate Mindestlaufzeit)**  
*Folge laut Drehbuch:* Online-Shop und Portal laufen ab Freitagabend wieder; beim schnellen Umzug geht ein Preisabgleich verloren (vertrauliche Karte am Saisonsamstag).

#### Min. 98,1 · LK16 Ein Bauunternehmen will Vorrang · Mittwoch 13:00 Uhr · Höhepunkt

Der größte Gewerbekunde, ein regionales Bauunternehmen, kann seit Dienstag nicht über das Portal bestellen. Für zwei Baustellen braucht es bis Freitag Dämmstoff und Trockenbaumaterial. Der Einkaufsleiter verlangt eine verbindliche Lieferzusage und droht, die Rahmenvereinbarung zu kündigen.

*Krisen-Info:* Liefertermin Freitag · Rahmenvereinbarung in Gefahr · Portal außer Betrieb

- Was können Sie zusagen, ohne Lagerverwaltung und Portal?
- Bekommt ein Großkunde Vorrang vor den Filialen?
- Wer führt das Gespräch?

#### Min. 109,3 · LK19 Rücksicherung im Ausweich-Rack · Donnerstag 08:00 Uhr · Folgen

Im Ausweich-Rack läuft die Rücksicherung aus der Montagskopie. Die Prüfsummen stimmen. Damit 14 Filialen und neun Partnermärkte die Ausweichumgebung erreichen, müssen Netzwerkverbindungen und Firewall-Regeln neu eingerichtet werden – Stück für Stück, Markt für Markt. Die Aktionspreise sind in der Montagskopie noch nicht enthalten.

*Krisen-Info:* Rücksicherung läuft · Netzwerkumstellung Markt für Markt · Aktionspreise fehlen in der Kopie

- Wer prüft und gibt frei, bevor ein Markt umgestellt wird?
- Wie bekommen Sie die Aktionspreise sicher in das System?
- Welche Abkürzungen sind verlockend – und welche verboten?

> **Vertraulich SK24 an Kundenservice-Hotline** (Min. 114,7): Seit dem Morgen über 600 Anrufe. Die häufigste Frage: „Gilt der Prospektpreis?“ Ihr habt keine Sprachregelung. Mehrere Anrufer drohen mit einer Beschwerde wegen irreführender Werbung.

> **Vertraulich SK25 an Leitung Unternehmenskommunikation und Marketing** (Min. 116,7): Ein bekannter Heimwerker-Kanal hat ein Video aus einer Filiale gepostet: Der Bon zeigt den alten Preis, daneben der Prospekt. 80.000 Aufrufe seit dem Mittag.

#### Min. 120,4 · LK20 Wer kassiert zuerst? · Donnerstag 10:00 Uhr · Folgen

Die Ausweichumgebung kann am Donnerstagabend die ersten Märkte versorgen, aber nicht alle gleichzeitig: Pro Stunde lassen sich etwa zwei Märkte sicher umstellen. Es sind 23. Die eigenen Filialen haben den größten Umsatz in der Saisonwoche; die Partnermärkte haben einen Vertrag. Um Freitag 03:00 Uhr erreichen die Kassen die 72-Stunden-Grenze.

*Krisen-Info:* ca. 2 Märkte pro Stunde · 23 Märkte · Kassen-Grenze Freitag ca. 03:00 Uhr

- Nach welchem Kriterium legen Sie die Reihenfolge fest?
- Wer entscheidet – und wer sagt es den Partnern?
- Was passiert mit Märkten, die die 72-Stunden-Grenze reißen?

**Entscheidung W5 (am Ende dieser Lage):** Stellt Waterkant eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium um – oder kommen die eigenen 14 Filialen zuerst?  
→ Der Tisch entscheidet: **Eigene 14 Filialen zuerst, Partnermärkte etwa zwölf Stunden später**  
*Folge laut Drehbuch:* Die eigenen Filialen kassieren ab Donnerstagabend, die Partner erst kurz vor der 72-Stunden-Grenze; zwei Partner prüfen einen Wechsel (vertrauliche Karte).

#### Min. 131,6 · LK21 Nordkanal berichtet · Donnerstag 13:00 Uhr · Folgen

Nordkanal sendet einen Beitrag: „Brand im Rechenzentrum – Kassenchaos zum Saisonstart bei Waterkant“. Ein Partnermarkt-Inhaber kommt zu Wort, die Feuerwehr bestätigt einen Batteriebrand im Technikraum.

- Reagieren Sie öffentlich auf den Beitrag?
- Was erfahren die eigenen Beschäftigten – bevor sie es aus den Medien hören?

#### Min. 142,7 · LK22 Die Kassen laufen wieder · Donnerstag 18:00 Uhr · Wiederanlauf

Die Kassen- und Preisdienste laufen aus dem Ausweich-Rack. Die ersten Märkte sind umgestellt, die Kassen gleichen ihre Offline-Abverkäufe ab, die Aktionspreise sind hinterlegt. Die übrigen Märkte folgen in der Nacht – nach der festgelegten Reihenfolge. Die eigenen Filialen kassieren seit Donnerstagabend, die Partnermärkte folgen in der Nacht – knapp vor der 72-Stunden-Grenze.

*Krisen-Info:* Kassen- und Preisdienste wieder verfügbar · Umstellung läuft bis in die Nacht

- Woran merken Sie, dass ein Markt wirklich sauber läuft?
- Wer informiert Filialen, Partner und Hotline – mit welcher Botschaft?

> **Vertraulich (Folge einer Entscheidung) SK43 an Leitung Arbeitssicherheit und Werkschutz:** Die Berufsgenossenschaft fragt nach der Gefährdungsbeurteilung für den Einsatz der Fachfirma im kontaminierten Serverraum und nach dem Messprotokoll.

> **Vertraulich (Folge einer Entscheidung) SK44 an Partnerbetreuung Verbund (Kundenmanagement IT-Service):** Zwei Partnermärkte haben bemerkt, dass die Waterkant-Filialen zwölf Stunden früher wieder kassieren konnten. Einer hat Kontakt zu einem anderen IT-Dienstleister aufgenommen.

> **Vertraulich SK38 an Regionalleitung Filialen Nord** (Min. 149,1): Die Kassen laufen wieder, aber Rückgaben von Bons aus dem Offline-Zeitraum lassen sich nicht stornieren. Kundinnen und Kunden stehen mit Ware und Bon an der Information.

#### Min. 153,9 · LK27 Stabiler Notbetrieb · Sonntag 12:00 Uhr · Wiederanlauf

Nach fünf Tagen läuft Waterkant im stabilen Notbetrieb: Kassen und Preise aus dem Ausweich-Rack, die Warenwirtschaft mit nachgebuchten Daten, das Zentrallager liefert wieder. Das eigene Rechenzentrum ist gesperrt, die Reinigung hat begonnen. Das IT-Team arbeitet seit Dienstag in Doppelschichten, zwei Filialleitungen haben sich krankgemeldet. Dank der am Mittwoch geborgenen Dienstagssicherung fehlten nur rund zwei Stunden Daten. Auch Lagerverwaltung, Gewerbeportal und Online-Bestände laufen aus dem erweiterten Ausweich-Rack.

*Krisen-Info:* Notbetrieb stabil · eigenes Rechenzentrum gesperrt · Team erschöpft

- Welche Botschaft senden Sie an Beschäftigte, Partner und Kundschaft – und wer sagt es?
- Wie entlasten Sie die Menschen, die seit Dienstag durcharbeiten?
- Was ist ab Montag „normal“ – und was noch nicht?

> **Vertraulich SK32 an Personalleitung** (Min. 154,4): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei Filialleitungen sind krank. Der Betriebsrat fragt, wer die Einsätze am Wochenende angeordnet hat. Arbeitszeitfragen sind fachlich zu prüfen.

> **Vertraulich SK31 an Leitung Logistik und Zentrallager** (Min. 159,2): Die Wareneingänge vom Montag (38 Lkw) sind im System nicht gebucht. Die Ware steht im Lager, laut System gibt es sie nicht – die Filialen sehen „nicht verfügbar“.

#### Abschluss

Nach sieben Tagen. Kassen und Preise laufen aus dem Ausweich-Rack, die Warenwirtschaft ist nachgebucht, das Zentrallager liefert. Das eigene Rechenzentrum ist gesperrt, die Reinigung läuft. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 3.176.000 € + aus Entscheidungen: Reparatur der Warenwirtschafts-Datenbank nach hartem Ausfall (ein Tag Verzug) (95.000 €); Kulanz und Sonderkonditionen für Partnermärkte (40.000 €); Bergung, Reinigung und Datenrettung des Backup-Servers durch Fachfirmen (45.000 €); Erweiterung des Ausweichbetriebs (12 Monate) und zusätzliche Dienstleister (210.000 €); Zusätzliche Gutschriften und Risiko des Partnerverlusts im IT-Service (12 Monate) (90.000 €) = **3.656.000 €**; Mögliche Erstattung durch Elektronik- und Betriebsunterbrechungsversicherung (optimistische Modellannahme, nicht bestätigt): − 1.600.000 € → **beim Unternehmen bleiben 2.056.000 €** (17 % des Jahresgewinns).

*Fazit auf der Bühne:* Nach fünf Tagen kassieren alle Märkte wieder. Ob das eigene Rechenzentrum zurückkommt, ist offen – das Vertrauen der Partner hängt an dieser Woche. Eine Krise ist erst vorbei, wenn Partner, Kundschaft und Beschäftigte wieder vertrauen.

#### Debriefing in dieser Geschichte

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

### Geschichte 8: 180 Minuten · Filialen, Lager und Saisonstart · W1 herunterfahren, W2 frueh, W3 abwarten, W4 minimal, W5 gleichrangig

**Besetzte Rollen (18):** Geschäftsführung (CEO), Krisenstabsleitung, IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum), Gebäudetechnik und Facility Management, Partnerbetreuung Verbund (Kundenmanagement IT-Service), Leitung Arbeitssicherheit und Werkschutz, Leitung Finanzen und Versicherung (CFO), Leitung Unternehmenskommunikation und Marketing, IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft), Regionalleitung Filialen Nord, Notfallmanagement / BCM-Koordination, IT-Support Filialen und Kassen, Leitung Online-Shop und Gewerbekundenportal, Leitung Logistik und Zentrallager, Informationssicherheit und Datenschutzkoordination, Leitung Einkauf und Dienstleistersteuerung, Kundenservice-Hotline, Personalleitung, Regionalleitung Filialen Süd  
**Geplante Krisenzeit:** 165 Min. + ca. 15 Min. Abschluss · Entscheidungszeit je Lage ca. 2,6 Min.
  
**Leitfrage des Schwerpunkts (für die Moderation):** Wie verkaufen Sie zum Saisonstart, ohne später nicht mehr nachvollziehen zu können, was verkauft wurde?

#### Min. 0,0 · LK01 USV meldet Batteriewarnung · Montag 22:40 Uhr · Vorboten

Die Gebäudeleittechnik meldet für die USV-Anlage im Rechenzentrum: „Batterietemperatur Modul 3 erhöht“. Der Sensor gilt als launisch, die Meldung kam in den letzten Wochen schon dreimal. Die Rufbereitschaft der IT quittiert die Meldung per App.

- Was tun Sie mit einer Meldung, die schon oft falsch war?
- Wer müsste davon wissen – IT, Gebäudetechnik oder beide?

#### Min. 3,0 · LK03 Serverraum wird warm · Dienstag 03:02 Uhr · Vorboten

Die Klimaanlage des Serverraums meldet Störung, die Temperatur steigt: 31 °C und weiter steigend. Seit 03:00 Uhr läuft die nächtliche Übertragung der Aktionspreise für den Saisonstart an die Filialkassen; gleichzeitig laden die Partnermärkte ihre Tagesabschlüsse hoch. Die Rufbereitschaft ruft die IT-Leitung an.

- Herunterfahren oder weiterlaufen lassen – was riskieren Sie jeweils?
- Wer darf nachts entscheiden, Systeme abzuschalten, die 23 Märkte betreffen?

> **Vertraulich SK03 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 3,3): Die Rufbereitschaft meldet: Serverraum 31 °C, steigend. Die Übertragung der Aktionspreise an die Filialkassen läuft seit 03:00 Uhr und braucht noch etwa 40 Minuten; die Partnermärkte laden gerade ihre Tagesabschlüsse hoch. Herunterfahren heißt: Beides bricht ab – und das kurz vor dem Saisonstart.

**Entscheidung W1 (am Ende dieser Lage):** Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen sie weiter, bis die Gebäudetechnik die Ursache kennt?  
→ Der Tisch entscheidet: **Nicht zwingend benötigte Systeme sofort kontrolliert herunterfahren (Preisübertragung und Partner-Uploads brechen ab)**  
*Folge laut Drehbuch:* Die Datenbanken sind sauber beendet; die Rücksicherung braucht keine Reparatur. Die Aktionspreise fehlen dafür in allen 14 Filialen.

#### Min. 6,0 · LK04 Brandalarm im Rechenzentrum · Dienstag 03:10 Uhr · Ausbruch

Die Brandmeldeanlage löst aus: Rauch im USV-Raum neben dem Serverraum. Im Serverraum wird automatisch die Gaslöschanlage ausgelöst, der Raum wird mit Löschgas geflutet. Das Verwaltungsgebäude wird geräumt, die Nachtschicht im angrenzenden Zentrallager geht vorsorglich zum Sammelplatz. Die Feuerwehr ist alarmiert.

*Krisen-Info:* Brandort: USV-Raum · Gaslöschung im Serverraum ausgelöst · Gebäude geräumt

- Wer muss jetzt sofort informiert werden – in welcher Reihenfolge?
- Wer übernimmt bis zum Eintreffen der Feuerwehr die Führung vor Ort?
- Wann und wie wird der Krisenstab einberufen?

#### Min. 16,6 · LK06 Lagebild nach dem Löschen · Dienstag 05:30 Uhr · Ausbruch

Der Brand im USV-Raum ist gelöscht, alle Personen sind wohlauf. Der Serverraum selbst hat nicht gebrannt, ist aber verraucht; Löschgas und Rauch sind abgezogen. Das Gebäude bleibt bis zur Prüfung durch Sachverständige gesperrt. Im Rechenzentrum ist alles aus: Warenwirtschaft, Kassenzentrale, Lagerverwaltung, Gewerbekundenportal, Telefonanlage der Zentrale.

*Krisen-Info:* Rechenzentrum vollständig außer Betrieb · Gebäude gesperrt · Filialkassen offline-fähig ca. 72 Stunden (bis Freitag ca. 03:00 Uhr)

- Welche Geschäftsprozesse stehen jetzt – und welche laufen noch?
- Was ist bis zur Filialöffnung um 08:00 Uhr zu entscheiden?
- Wer übernimmt welche Aufgabe im Krisenstab?
- Was muss bis 08:00 Uhr in den Filialen ankommen? *(Schwerpunkt)*

> **Vertraulich SK06 an Leitung Arbeitssicherheit und Werkschutz** (Min. 17,1): Der Einsatzleiter weist dich darauf hin: Bei brennenden Lithium-Ionen-Batterien können Fluorwasserstoff und andere ätzende Gase entstehen. Er empfiehlt, USV-Raum und Serverraum erst nach Messung und Freigabe durch Sachverständige zu betreten – ausdrücklich auch für IT-Personal.

#### Min. 27,2 · LK08 Saisonstart ohne Aktionspreise · Dienstag 07:00 Uhr · Eskalation

Die Filialen bereiten den Saisonstart vor; der Prospekt mit Aktionspreisen ist seit Sonntag verteilt. An den Kassen sind die Aktionspreise nicht hinterlegt, Bestandsauskünfte sind nicht möglich. Filialleitungen fragen, ob sie überhaupt öffnen sollen und ob sie Prospektpreise von Hand eingeben dürfen.

*Krisen-Info:* Öffnung 08:00 Uhr · Aktionspreise nicht an den Kassen · keine Bestandsauskunft

- Öffnen die Filialen – und mit welcher Anweisung?
- Wie gehen Kassen mit Prospektpreisen um, einheitlich in allen 14 Filialen?
- Wer gibt die Anweisung raus, und wie kommt sie an?

> **Vertraulich SK08 an IT-Support Filialen und Kassen** (Min. 31,8): Die Herstellerdokumentation der Kassen sagt: Im Offline-Betrieb speichern sie Abverkäufe etwa 72 Stunden, danach verweigern sie neue Buchungen, bis sie wieder mit der Zentrale synchronisiert sind. Das wäre Freitag gegen 03:00 Uhr. In den Filialen weiß das noch niemand.

> **Vertraulich SK35 an Notfallmanagement / BCM-Koordination** (Min. 33,3): Das IT-Notfallhandbuch liegt als Datei auf dem Fileserver im gesperrten Serverraum. Eine Papierkopie gibt es im Tresor der Geschäftsführung – im Verwaltungsgebäude, das bis zur Freigabe gesperrt ist.

> **Vertraulich SK10 an Regionalleitung Filialen Süd** (Min. 34,8): In einer Filiale gibt die Filialleitung den Prospektpreis per Handeingabe, die Nachbarfiliale verweigert ihn. Kundinnen vergleichen die Bons in einer Facebook-Gruppe.

#### Min. 37,8 · LK09 Die Partnermärkte rufen an · Dienstag 08:30 Uhr · Eskalation

Die neun Partnermärkte im Einkaufsverbund, für die Waterkant Kassen- und Warenwirtschaft als Dienstleistung betreibt, stehen vor demselben Problem. Der Servicevertrag sieht ein Wiederherstellungsziel von 24 Stunden für Kassen- und Preisdienste vor. Die ersten Partner wollen wissen, wann es weitergeht – eine belastbare Prognose hat die IT noch nicht.

*Krisen-Info:* 9 Partnermärkte betroffen · Wiederherstellungsziel laut Vertrag: 24 Stunden · Prognose offen

- Was sagen Sie den Partnern – und wer sagt es?
- Was ist eine ehrliche Prognose, wenn Sie selbst keine haben?
- Welche Folgen hat das Überschreiten der 24 Stunden?
- Was brauchen die Partnermärkte, um morgen zu öffnen? *(Schwerpunkt)*

> **Vertraulich SK11 an Partnerbetreuung Verbund (Kundenmanagement IT-Service)** (Min. 38,3): Drei Partner haben dich schon angerufen. Einer liest dir aus dem Servicevertrag vor: Wiederherstellungsziel 24 Stunden für Kassen- und Preisdienste. Er will bis 12 Uhr wissen, wann es weitergeht, sonst wendet er sich an den Verbundvorstand.

> **Vertraulich SK12 an Leitung Finanzen und Versicherung (CFO)** (Min. 42,9): Im Servicevertrag mit den Partnermärkten stehen Gutschriften bei Überschreiten des Wiederherstellungsziels (Szenarioannahme: 2.000 € je Markt und angefangenem Tag). Zwei Verträge enthalten zusätzlich ein Sonderkündigungsrecht bei „erheblicher Störung“. Ob dieser Fall eintritt, ist fachlich zu prüfen.

**Entscheidung W2 (am Ende dieser Lage):** Informiert Waterkant heute alle Partnermärkte mit einer ehrlichen, aber unsicheren Prognose – oder erst, wenn ein belastbarer Wiederanlauftermin feststeht?  
→ Der Tisch entscheidet: **Heute 11 Uhr alle Partner informieren: Lage, ehrliche Spanne („Kassen frühestens Donnerstag“), fester Update-Takt**  
*Folge laut Drehbuch:* Die Partner planen mit Donnerstag; einer kritisiert später, dass „Donnerstag“ nur für Kassen, nicht für Bestellungen galt.

#### Min. 48,4 · LK12 Das Zentrallager steht · Dienstag 14:00 Uhr · Eskalation

Ohne Lagerverwaltung weiß im Zentrallager niemand verlässlich, wo welche Ware liegt. Die ausgedruckten Lagerplatzlisten sind von Freitag. Die Filialen bestellen für den Saisonstart per Telefon und Mail nach, Speditionen warten auf Ladung. Das Lagerpersonal schlägt vor, nach Erfahrung und Papierliste zu kommissionieren.

*Krisen-Info:* Lagerverwaltung aus · Lagerplatzlisten von Freitag · Speditionen warten

- Kommissionieren auf Papier – ja, nein, für welche Artikel?
- Welche Filialen und Warengruppen haben Vorrang?
- Wie verhindern Sie, dass Papierbetrieb später nicht mehr nachzubuchen ist?

> **Vertraulich SK16 an Leitung Logistik und Zentrallager** (Min. 48,9): Ohne Lagerverwaltung kennt niemand die Lagerplätze von rund 40.000 Artikeln. Ein Spediteur wartet seit 06:00 Uhr auf Ladung und berechnet ab Mittag Standgeld. Die Filialen rufen einzeln an und bestellen „das Wichtigste“.

> **Vertraulich SK13 an Gebäudetechnik und Facility Management** (Min. 53,0): Der Sachverständige: Reinigung des Serverraums durch eine Fachfirma dauert fünf bis acht Arbeitstage. Die Klimaanlage darf bis zur Prüfung nicht laufen – Feuchtigkeit plus Ruß beschleunigt die Korrosion. Ob die Hardware danach noch zuverlässig ist, kann er nicht sagen.

> **Vertraulich SK14 an IT-Infrastruktur und Rechenzentrumsbetrieb (Rufbereitschaft)** (Min. 54,5): Über die Kamera der Gebäudetechnik siehst du in den Serverraum: Die Racks stehen, überall Rußfilm. In Rack 7 steht der Backup-Server mit der Dienstagssicherung von 01:00 Uhr. Wird er bald geborgen und gereinigt, sind die Daten vermutlich lesbar – je länger er im Ruß steht, desto größer die Korrosionsgefahr.

#### Min. 59,0 · LK14 Den Backup-Server bergen? · Mittwoch 07:30 Uhr · Höhepunkt

Die letzte vollständige Sicherungskopie beim Colocation-Anbieter stammt von Montag 01:00 Uhr – die Übertragung der Dienstagssicherung war beim Brand noch nicht fertig. Die Dienstagssicherung liegt auf dem Backup-Server im verrußten Serverraum. Eine Sanierungsfachfirma könnte ihn heute mit Schutzausrüstung bergen; die Freigabe des Raums für alle anderen kommt erst nach der Reinigung in etwa einer Woche.

*Krisen-Info:* Datenlücke ohne Bergung: ca. 26 Stunden · Bergung nur durch Fachfirma mit Schutzausrüstung · Messergebnis: Grenzwerte im Raum noch überschritten

- Wie viel ist Ihnen die fehlende Datenlücke wert – und welches Risiko für Menschen ist dafür vertretbar?
- Wer entscheidet über das Betreten: IT, Arbeitssicherheit, Geschäftsführung?
- Welche Voraussetzungen müssen erfüllt sein, bevor jemand den Raum betritt?
- Was bedeutet die Datenlücke für Bestände im Lager und in den Filialen? *(Schwerpunkt)*

> **Vertraulich SK21 an Leitung Arbeitssicherheit und Werkschutz** (Min. 59,5): Für eine Bergung aus dem Serverraum vor der Freigabe brauchst du: Gefährdungsbeurteilung, aktuelles Messergebnis, Fachfirma mit Schutzausrüstung, Freiwilligkeit, Dokumentation. Die Fachfirma könnte heute um 14 Uhr – mit eigenem Personal, nicht mit eurer IT.

> **Vertraulich SK18 an Leitung Einkauf und Dienstleistersteuerung** (Min. 63,6): Der Serverhändler bietet zwei Rahmen in drei Tagen gegen 35 % Aufschlag. Der Colocation-Anbieter kann das Ausweich-Rack binnen 48 Stunden erweitern – Mindestlaufzeit zwölf Monate, Kosten für das erste Jahr rund 210.000 € einschließlich Dienstleistern (Szenarioannahme).

> **Vertraulich SK19 an IT-Leitung (Kassen, Warenwirtschaft, Rechenzentrum)** (Min. 65,1): Dein Team rechnet: Im Ausweich-Rack reicht die Leistung für Kassen- und Preisdienste und den Kern der Warenwirtschaft. Die Netzwerkanbindung der 23 Märkte muss neu eingerichtet werden – das wurde nie vollständig geübt. Zwei deiner fünf Leute sind seit Dienstag 03:00 Uhr wach.

**Entscheidung W3 (am Ende dieser Lage):** Lässt Waterkant den Backup-Server mit der Dienstagssicherung heute von einer Fachfirma aus dem gesperrten Serverraum bergen – oder wartet es die Freigabe des Raums ab?  
→ Der Tisch entscheidet: **Freigabe des Raums abwarten (nach Reinigung, ca. eine Woche)**  
*Folge laut Drehbuch:* Niemand betritt den Raum vorzeitig. Die Lücke von etwa 26 Stunden muss von Hand nachgebucht werden; ob die Dienstagssicherung später noch lesbar ist, ist offen.

#### Min. 69,6 · LK15 Wie weit geht der Ausweichbetrieb? · Mittwoch 10:00 Uhr · Höhepunkt

Die IT hat einen Plan: Kassen- und Preisdienste und der Kern der Warenwirtschaft passen in das Ausweich-Rack und könnten am Donnerstag laufen. Lagerverwaltung, Gewerbekundenportal und Online-Bestände passen nur nach einer Erweiterung, die der Anbieter binnen 48 Stunden liefern kann – mit zwölf Monaten Mindestlaufzeit. Ohne Erweiterung warten diese Systeme auf das eigene Rechenzentrum, laut Sanierer frühestens in drei Wochen.

*Krisen-Info:* Kassen- und Preisdienste: Donnerstag möglich · Rest: Erweiterung (48 h, 12 Monate Vertrag) oder ca. 3 Wochen warten

- Was ist Ihnen schneller Online-Handel und Lagerbetrieb wert?
- Welche Risiken hat ein schneller, großer Umzug für ein müdes Team?
- Wer trägt diese Entscheidung – IT, Finanzen oder Geschäftsführung?
- Wie lange kommt das Lager ohne Lagerverwaltung aus? *(Schwerpunkt)*

> **Vertraulich SK46 an Geschäftsführung (CEO), Krisenstabsleitung** (Min. 70,1): Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Ausweich-Racks gehört und ruft dich an. Nach eurer Geschäftsordnung brauchen Verträge mit mehr als zwölf Monaten Bindung die Zustimmung der Gesellschafter. Er ist bis Freitag im Ausland, aber telefonisch erreichbar: „Entscheiden Sie, was nötig ist – aber ich will es vorher wissen und nicht aus der Rechnung erfahren.“

**Entscheidung W4 (am Ende dieser Lage):** Bringt Waterkant nur das Nötigste ins Ausweich-Rack – oder erweitert es den Ausweichbetrieb, damit auch Lager, Gewerbeportal und Online-Bestände schnell zurückkommen?  
→ Der Tisch entscheidet: **Nur Kassen- und Preisdienste und den Kern der Warenwirtschaft verlagern; der Rest wartet auf das eigene Rechenzentrum**  
*Folge laut Drehbuch:* Lager, Gewerbeportal und Online-Bestände bleiben etwa drei Wochen eingeschränkt; Gewerbekunden weichen aus.

#### Min. 80,2 · LK16 Ein Bauunternehmen will Vorrang · Mittwoch 13:00 Uhr · Höhepunkt

Der größte Gewerbekunde, ein regionales Bauunternehmen, kann seit Dienstag nicht über das Portal bestellen. Für zwei Baustellen braucht es bis Freitag Dämmstoff und Trockenbaumaterial. Der Einkaufsleiter verlangt eine verbindliche Lieferzusage und droht, die Rahmenvereinbarung zu kündigen.

*Krisen-Info:* Liefertermin Freitag · Rahmenvereinbarung in Gefahr · Portal außer Betrieb

- Was können Sie zusagen, ohne Lagerverwaltung und Portal?
- Bekommt ein Großkunde Vorrang vor den Filialen?
- Wer führt das Gespräch?

#### Min. 90,8 · LK17 Prospektpreise vor der Kasse · Mittwoch 16:00 Uhr · Höhepunkt

In sozialen Netzwerken kursieren Videos von Kassen, an denen der Prospektpreis nicht gilt; Kommentare sprechen von „Lockvogelwerbung“. Filialen haben unterschiedlich reagiert: Manche geben den Aktionspreis per Handeingabe, andere verweisen auf „technische Probleme“. Die Hotline ist überlastet.

*Krisen-Info:* Mehrere tausend Interaktionen · uneinheitliche Praxis in den Filialen · Hotline überlastet

- Welche einheitliche Regel gilt ab sofort für Prospektpreise?
- Was sagen Sie öffentlich – und was sagen Hotline und Filialen?
- Wer trägt die Kosten der Kulanz, und ist das entschieden?

> **Vertraulich SK24 an Kundenservice-Hotline** (Min. 95,9): Seit dem Morgen über 600 Anrufe. Die häufigste Frage: „Gilt der Prospektpreis?“ Ihr habt keine Sprachregelung. Mehrere Anrufer drohen mit einer Beschwerde wegen irreführender Werbung.

> **Vertraulich SK25 an Leitung Unternehmenskommunikation und Marketing** (Min. 97,9): Ein bekannter Heimwerker-Kanal hat ein Video aus einer Filiale gepostet: Der Bon zeigt den alten Preis, daneben der Prospekt. 80.000 Aufrufe seit dem Mittag.

#### Min. 101,4 · LK19 Rücksicherung im Ausweich-Rack · Donnerstag 08:00 Uhr · Folgen

Im Ausweich-Rack läuft die Rücksicherung aus der Montagskopie. Die Prüfsummen stimmen. Damit 14 Filialen und neun Partnermärkte die Ausweichumgebung erreichen, müssen Netzwerkverbindungen und Firewall-Regeln neu eingerichtet werden – Stück für Stück, Markt für Markt. Die Aktionspreise sind in der Montagskopie noch nicht enthalten. Weil die Systeme in der Brandnacht kontrolliert heruntergefahren wurden, sind die Datenbanken konsistent – die Rücksicherung kommt ohne Reparatur aus.

*Krisen-Info:* Rücksicherung läuft · Netzwerkumstellung Markt für Markt · Aktionspreise fehlen in der Kopie

- Wer prüft und gibt frei, bevor ein Markt umgestellt wird?
- Wie bekommen Sie die Aktionspreise sicher in das System?
- Welche Abkürzungen sind verlockend – und welche verboten?

> **Vertraulich SK40 an Informationssicherheit und Datenschutzkoordination** (Min. 107,5): Das Team will für die Umstellung der 23 Märkte die Firewall des Ausweich-Racks „vorübergehend für alles öffnen“, damit es schneller geht. Später zu schließen ist geplant, aber nicht terminiert.

#### Min. 112,0 · LK20 Wer kassiert zuerst? · Donnerstag 10:00 Uhr · Folgen

Die Ausweichumgebung kann am Donnerstagabend die ersten Märkte versorgen, aber nicht alle gleichzeitig: Pro Stunde lassen sich etwa zwei Märkte sicher umstellen. Es sind 23. Die eigenen Filialen haben den größten Umsatz in der Saisonwoche; die Partnermärkte haben einen Vertrag. Um Freitag 03:00 Uhr erreichen die Kassen die 72-Stunden-Grenze.

*Krisen-Info:* ca. 2 Märkte pro Stunde · 23 Märkte · Kassen-Grenze Freitag ca. 03:00 Uhr

- Nach welchem Kriterium legen Sie die Reihenfolge fest?
- Wer entscheidet – und wer sagt es den Partnern?
- Was passiert mit Märkten, die die 72-Stunden-Grenze reißen?
- Welche Märkte brauchen zuerst wieder Kassen – nach welchem Kriterium? *(Schwerpunkt)*

**Entscheidung W5 (am Ende dieser Lage):** Stellt Waterkant eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium um – oder kommen die eigenen 14 Filialen zuerst?  
→ Der Tisch entscheidet: **Eigene Filialen und Partnermärkte nach einem gemeinsamen Kriterium (größte Märkte zuerst, unabhängig vom Eigentümer)**  
*Folge laut Drehbuch:* Alle Märkte laufen bis Freitagfrüh; einige eigene Filialen erst in der Nacht.

#### Min. 122,6 · LK22 Die Kassen laufen wieder · Donnerstag 18:00 Uhr · Wiederanlauf

Die Kassen- und Preisdienste laufen aus dem Ausweich-Rack. Die ersten Märkte sind umgestellt, die Kassen gleichen ihre Offline-Abverkäufe ab, die Aktionspreise sind hinterlegt. Die übrigen Märkte folgen in der Nacht – nach der festgelegten Reihenfolge. Die kontrollierte Abschaltung in der Brandnacht hat sich bezahlt gemacht: Die Datenbanken mussten nicht repariert werden. Die Partnermärkte hatten seit Dienstag mit Donnerstag geplant. Ein Partner kritisiert, dass „Donnerstag“ nur für die Kassen galt, nicht für Bestellungen und Bestände. Eigene Filialen und Partnermärkte werden nach derselben Reihenfolge umgestellt – einige eigene Filialen erst in der Nacht.

*Krisen-Info:* Kassen- und Preisdienste wieder verfügbar · Umstellung läuft bis in die Nacht

- Woran merken Sie, dass ein Markt wirklich sauber läuft?
- Wer informiert Filialen, Partner und Hotline – mit welcher Botschaft?
- Wie gehen Filialen mit Bons aus dem Offline-Zeitraum um? *(Schwerpunkt)*

> **Vertraulich SK38 an Regionalleitung Filialen Nord** (Min. 128,7): Die Kassen laufen wieder, aber Rückgaben von Bons aus dem Offline-Zeitraum lassen sich nicht stornieren. Kundinnen und Kunden stehen mit Ware und Bon an der Information.

#### Min. 133,2 · LK23 Die Datenlücke · Freitag 09:00 Uhr · Wiederanlauf

Die Warenwirtschaft läuft im Ausweich-Rack auf dem Stand der letzten verfügbaren Sicherung. Der Abgleich zeigt: Wareneingänge, Bestellungen an Lieferanten und Retouren aus der Lücke fehlen. Im Lager steht Ware, die es laut System nicht gibt; Lieferanten fragen nach Bestellungen, die im System nicht existieren. Der Backup-Server bleibt bis zur Freigabe im Raum; ob die Dienstagssicherung danach noch lesbar ist, ist offen.

*Krisen-Info:* Datenlücke: ca. 26 Stunden (Montag 01:00 bis Dienstag 03:10 Uhr)

- Wie schließen Sie die Lücke – und in welcher Reihenfolge?
- Was darf bis dahin auf Basis unvollständiger Daten entschieden werden?
- Wer gibt den Datenstand fachlich frei?

#### Min. 143,8 · LK25 Der große Saisonsamstag · Samstag 08:00 Uhr · Wiederanlauf

Der umsatzstärkste Tag der Saison beginnt. Die Kassen laufen, die Aktionspreise stimmen. Die Frage ist, was außerhalb der Kassen geht: Online-Bestellungen, Abholung in der Filiale, Gewerbekunden. Jeder Fehler in Bestand oder Preis wird heute von Tausenden gesehen. Online-Shop und Gewerbeportal laufen weiter nur mit „Abholung nach telefonischer Bestätigung“ – Gewerbekunden weichen zu Wettbewerbern aus.

*Krisen-Info:* umsatzstärkster Tag · Kassen laufen · Online und Gewerbe: siehe Entscheidung vom Mittwoch

- Was bieten Sie heute online und für Gewerbekunden an – und was bewusst nicht?
- Wer gibt Daten und Preise frei, bevor sie öffentlich sichtbar sind?

> **Vertraulich SK39 an Leitung Online-Shop und Gewerbekundenportal** (Min. 149,9): Für Samstag erwartet der Shop-Hoster das Dreifache der üblichen Besucherzahl. Jeder Preis- oder Bestandsfehler wird heute tausendfach gesehen.

#### Min. 154,4 · LK27 Stabiler Notbetrieb · Sonntag 12:00 Uhr · Wiederanlauf

Nach fünf Tagen läuft Waterkant im stabilen Notbetrieb: Kassen und Preise aus dem Ausweich-Rack, die Warenwirtschaft mit nachgebuchten Daten, das Zentrallager liefert wieder. Das eigene Rechenzentrum ist gesperrt, die Reinigung hat begonnen. Das IT-Team arbeitet seit Dienstag in Doppelschichten, zwei Filialleitungen haben sich krankgemeldet. Die Nachbuchung der rund 26 Stunden Datenlücke läuft noch bis in die nächste Woche. Lagerverwaltung, Gewerbeportal und Online-Bestände bleiben bis zur Rückkehr ins eigene Rechenzentrum eingeschränkt.

*Krisen-Info:* Notbetrieb stabil · eigenes Rechenzentrum gesperrt · Team erschöpft

- Welche Botschaft senden Sie an Beschäftigte, Partner und Kundschaft – und wer sagt es?
- Wie entlasten Sie die Menschen, die seit Dienstag durcharbeiten?
- Was ist ab Montag „normal“ – und was noch nicht?
- Was ist im Filialbetrieb ab Montag wieder normal – und was nicht? *(Schwerpunkt)*

> **Vertraulich SK32 an Personalleitung** (Min. 154,9): Drei Kolleginnen und Kollegen der IT haben seit Dienstag über 60 Stunden gearbeitet, zwei Filialleitungen sind krank. Der Betriebsrat fragt, wer die Einsätze am Wochenende angeordnet hat. Arbeitszeitfragen sind fachlich zu prüfen.

#### Abschluss

Nach sieben Tagen. Kassen und Preise laufen aus dem Ausweich-Rack, die Warenwirtschaft ist nachgebucht, das Zentrallager liefert. Das eigene Rechenzentrum ist gesperrt, die Reinigung läuft. Von außen sieht es aus, als wäre es überstanden. Drinnen beginnt jetzt die eigentliche Arbeit.

Rechnung: Grundschaden 3.176.000 € + aus Entscheidungen: Abgebrochene Preisübertragung: Aktionspreise auch in den 5 Filialen per Kulanz, die sie sonst erhalten hätten (50.000 €); Nacherfassung von rund 26 Stunden Bewegungsdaten (140.000 €); Entgangener Rohertrag Online-Shop und Gewerbekunden (ca. 3 Wochen eingeschränkt) (260.000 €); Saisonumsatz: einige eigene Filialen erst in der Nacht wieder voll (60.000 €) = **3.686.000 €**; Mögliche Erstattung durch Elektronik- und Betriebsunterbrechungsversicherung (optimistische Modellannahme, nicht bestätigt): − 1.600.000 € → **beim Unternehmen bleiben 2.086.000 €** (17 % des Jahresgewinns).

*Fazit auf der Bühne:* Nach fünf Tagen kassieren alle Märkte wieder. Ob das eigene Rechenzentrum zurückkommt, ist offen – das Vertrauen der Partner hängt an dieser Woche. Eine Krise ist erst vorbei, wenn Partner, Kundschaft und Beschäftigte wieder vertrauen.

#### Debriefing in dieser Geschichte

- Wann wart ihr am stärksten unter Druck?
- Ab welcher Meldung hättet ihr den Krisenstab einberufen – und wer hätte das in der Nacht entscheiden dürfen?
- Wann stand der Schutz von Menschen gegen Daten, Umsatz oder Tempo – und wie habt ihr entschieden?
- Wie kamen Meldungen aus Filialen, Partnermärkten und Hotline beim Krisenstab an – und wie kamen Anweisungen zurück?
- Welche eurer Entscheidungen hat den weiteren Verlauf verändert – und wie würdet ihr mit dem heutigen Wissen entscheiden?
- Welche Zusage an Partner oder Kunden war am riskantesten?
- Wo waren Single Points of Failure – Technik, Wissen, Personen?
- Welche Kosten trägt die Versicherung wahrscheinlich nicht – und was bedeutet das für die Liquidität?
- Welche drei Verbesserungen setzen wir um – wer ist verantwortlich, mit welcher Priorität, bis wann?
- *(Schwerpunkt)* Welche Behelfslösung im Filial- und Lagerbetrieb hat am meisten Nacharbeit erzeugt?
- *(Schwerpunkt)* Wo hätte eine vorbereitete Papierlösung geholfen?

