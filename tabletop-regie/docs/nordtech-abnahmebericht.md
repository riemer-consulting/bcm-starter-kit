# NordTech – Abnahmebericht vor Pilotfreigabe

Stand: 18.11.2026 · Prüfgrundlage: Werkzeug auf `main` (Drehbuch `data/scenario.nordtech.json`, Medien `media/nordtech/`), Moderationshandbuch 1.0 und Medienmatrix aus dem Vorabnahme-Paket, Abnahmeauftrag P0–P5. Alle Angaben zum Unternehmen sind fiktiv.

**Prüfweise.** Was hier als „geprüft“ steht, wurde am laufenden Werkzeug oder an den Dateien nachgewiesen:
- **Ablaufpläne:** 25 Kombinationen aus Dauer und Schwerpunkt.
- **Entscheidungen:** alle 16 Weichenkombinationen.
- **Geschichten:** sieben vollständig erzeugte Geschichten (`nordtech-durchlaeufe.md`).
- **Prüflauf:** `npm run pruefen` mit 2.000 Zufallsbesetzungen je Drehbuch.
- **Bedienung:** Sperren der Überraschungskarten, Protokoll-Export und Stummschaltung über Schnittstelle und Browser getestet.
- **Bilder:** Sichtprüfung jedes Bildes über Kontaktbogen und Ausschnitte.

Kennzeichnungen:
- **nicht geprüft:** im Raum, mit echter Technik oder rechtlich nicht prüfbar.
- **fachliche Annahme:** eine Annahme des Drehbuchs, die fachlich bestätigt werden sollte.

## 0. Nachtrag: Red-Team-Test (unabhängiger Prüfer)

Urteil des Prüfers: **bedingt pilotfähig**. Er sieht alle vier Prüffragen als „mit Auflagen tragfähig“ und keinen Grund, die sieben Tage oder die vier Weichen neu zu bauen. Empfohlenes Pilotformat: 90 Minuten, Schwerpunkt Krisenführung und BCM, neun Rollen. Umsetzung der Befunde:

| Nr. | Befund | Umsetzung | Datei / ID |
|---|---|---|---|
| R01 Hoch | Wiederanlauftempo ohne erklärte Voraussetzungen | LK15 nennt die Voraussetzungen (priorisierte Anlagen, isolierte geprüfte Umgebungen, Sicherheitsfreigabe; nicht alle 900 Systeme; ERP-Produktivbetrieb und Freigaben offen). LK14: ERP aus dem inzwischen geprüften Backup in isolierter Testumgebung, Daten- und Sicherheitsfreigabe offen. Abschluss-Einleitung angepasst. | LK14, LK15, Abschluss |
| R02 Hoch | Zeitmodell „30 s je Rolle“ wörtlich unmöglich | Die Beschreibung war falsch, die Rechnung nicht: Das Werkzeug plant 30 s je **Funktionsbereich** (180 Min.: 11 Bereiche für 21 Rollen). Teil E korrigiert, Handbuch 7.2 mit der Regel des Prüfers; Stoppuhr-Durchlauf vor 180 Min. bleibt offen. | Gesamtpaket Teil B/E, Handbuch 7.2 |
| R03 Hoch | Zahlung dramaturgisch benachteiligt | W4-Frage und SK20 nennen die Gründe für eine Zahlung (ca. 260.000 € Deckungsbeitrag je Stillstandstag, kein Backup bekannt); Moderation vertritt notfalls die Gegenposition. Folgen unverändert. | W4, SK20, Handbuch 7.3 |
| R04 Mittel | Rechenweg Deckungsbeitrag fehlt | Rechenweg im Drehbuch (`herleitung`), im Gesamtpaket und im Handbuch; Annahme „35 % DB-Quote“ als fachlich zu bestätigen markiert. | Abschluss, Handbuch 11 |
| R05 Mittel | Weg zum Backup dünn | LK09: Fund im Tresor des Hauptsitzes, Zugang über den versiegelten IT-Notfallumschlag. SK02 (passte nach LK09 nicht mehr) neu als Entscheidung der IT-Fachkraft, immer nach LK09. | LK09, SK02 |
| R06 Mittel | OT-Zielkonflikt zu grob | W1 „trennen“ = kontrolliert in sicheren Zustand fahren, gezielt vom IT-Netz trennen; Moderationshinweis zu OT-Sicherheit. | W1 |
| R07 Mittel | Versicherung als voller Maximalbetrag | Bühne: Bruttoschaden zuerst, Erstattung als optimistische, unbestätigte Annahme mit Erläuterung, Anteil am Jahresgewinn auch ohne Erstattung. | Abschluss, `server/finale.js`, Bühne |
| R08 Mittel | W2 belohnt/bestraft zu eindeutig | „Proaktiv“: einzelne Kunden danken, einer kritisiert die lückenhafte erste Meldung; Hinweis, dass beide Wege Risiken haben. | W2 |
| R09 Mittel | Qualitätsrahmen Pharma offen | Faktenblatt: Produkte und Qualitätsrahmen (Komponenten nach Qualitätssicherungsvereinbarung, Arzneimittelfreigabe beim Kunden – fachliche Annahme); LK21-Hinweis. | Faktenblatt, LK21 |
| R10 Mittel | LK14 mit offensichtlicher Antwort | Geschäftsdruck (Lieferpapiere und Rechnungen ab Montag) und Fragen: welcher Prozess zuerst, wer erteilt die Sicherheitsfreigabe. | LK14 |
| R11 Mittel | W3 und W4 bei 45 Min. zu knapp | Regel: Lösegeld priorisieren, Datenschutz als dokumentierter Prüfauftrag (gilt ohne Beschluss als „abwarten“). | W3-Hinweis, Handbuch 7.3 |
| R12 Niedrig | B7 könnte Zeit addieren | B7 ersetzt fünf Minuten von LK17, Timer läuft weiter. | B7, Handbuch 9 |
| Eigenbefund | Bei der Browser-Prüfung von LK14 fiel ein echtes Produktlogo auf | Alle 14 Fotos in voller Auflösung nachgeprüft: „SAP S/4HANA“ (LK14) durch „NT-ERP“ ersetzt, „iiyama“ am Monitor (LK01) entfernt; übrige Geräteschriftzüge unleserlich. Die frühere Aussage „keine fremden Marken“ war damit falsch und ist jetzt korrigiert. | LK01, LK14, Medienmatrix |
| Abschnitt 3 | Karten ohne echten Zielkonflikt | Fragen des Prüfers übernommen bei LK18, LK19, LK20, LK03, LK05, LK08, LK13, LK14, LK15. | Drehbuch |

Danach: Prüflauf 0 Fehler, 0 Hinweise; Modellcheck aller 16 Kombinationen und 25 Fassungen ohne Befund (Tabellen unten neu erzeugt). **Weiter offen, weil nur fachlich oder im Raum zu klären:** Bestätigung der Annahmen durch IT/OT, Backup-Verantwortliche, Controlling, QM/Regulatory und Versicherung (Liste des Prüfers, Abschnitt 5); Stoppuhr-Durchlauf 180 Minuten; Raum- und Technik-Generalprobe.

## 1. Freigabeurteil

**Technische und redaktionelle Vorabnahme bestanden. Die zwölf Red-Team-Befunde sind bearbeitet. Vor der endgültigen Pilotfreigabe sind die Raum- und Technik-Generalprobe, die erforderliche Medienrechteklärung sowie die Entscheidung über offene fachliche Annahmen abzuschließen. Der 180-Minuten-Stoppuhr-Test ist spätestens vor dem ersten Einsatz dieses Formats erforderlich.**

Empfohlenes Pilotformat: 90 Minuten, Krisenführung und BCM, neun Rollen, B7 als optionaler Führungsstresstest. Die Pilotfreigabe erteilt die verantwortliche Spielleitung.

1. Faktenkanon, Kartenlogik und Chronologie sind über alle Dauern, alle fünf Schwerpunkte und alle 16 Entscheidungskombinationen widerspruchsfrei (Abschnitte 3 und 4, automatische Regelprüfung ohne Befund).
2. Alle 26 Lagekarten und das Ruhebild haben ein eigenes, eindeutig zugeordnetes Bild. Sechs Bilder widersprachen dem Text und sind korrigiert (LK08, LK09, LK12, LK15, LK17, LK18).
3. Das Moderationshandbuch 1.0 widersprach dem Werkzeug in einem Kernpunkt: Es beschreibt die Lösegeld-Entscheidung W4 als Rückblende bei LK09, das Werkzeug stellt sie bei LK07 vor Fristablauf. Version 1.1 behebt das und nennt alle Schaltflächen so, wie sie im Werkzeug heißen.
4. Der Ton ist sparsam eingesetzt: eine synthetisch erzeugte Halle und eine eigene Aufnahme. Er ist jederzeit stummschaltbar, ohne dass Information verloren geht.
5. Überraschungskarten: Nach Rückmeldung des Auftraggebers sind B6–B8 öffentliche Ereignisse auf der Bühne. Sie haben ein eigenes Bild und einen eigenen Ton, B7 ist eine echte Spielunterbrechung mit Countdown. B1–B5 bleiben private Nachrichten an eine Rolle. Die Anrufe LK04, LK06 und LK23 sind Gesprächssimulationen mit Nachfragen und Gesprächsende. LK10 ist ein fertiger Nachrichteneinspieler. Die Medien-Generalprobe hat alle 29 Bühnenbilder und alle Töne im laufenden Werkzeug bestätigt (`docs/nordtech-generalprobe.md`).
6. **Nicht geprüft** sind:
   - die Darstellung am Beamer und die Lautstärke im Veranstaltungsraum,
   - der E-Mail-Versand über euren echten Mailserver (der SMTP-Weg selbst ist Ende-zu-Ende geprüft, siehe `docs/nordtech-generalprobe.md`),
   - Herkunft und Nutzungsrechte der Fotos.

## 2. Widerspruchstabelle

| Nr. | ID / Story / Min. | Faktenlage / beobachteter Fehler | Auswirkung für den Tisch | Ersatztext / Logikregel | Schweregrad | Status / Quelle |
|---:|---|---|---|---|---|---|
| 1 | Handbuch 1.0, Abschnitt 7.3, „Besonderheit W4“ | Handbuch: W4 rückblickend bei LK09 (Mi 11:00). Werkzeug: W4 bei LK07 (Di 13:00), vor Fristablauf Mi 07:00 | Moderation hätte rückblickend gefragt, obwohl der Tisch längst entschieden hat; Backup aus der Zukunft wäre im Raum | Tabelle 7.3: „W4 · LK07 (Dienstag 13:00, gemeinsam mit W3) · Lösegeld zahlen oder ablehnen – vor Fristablauf Mittwoch 07:00, ohne Wissen um das später gefundene Backup“; Absatz „Besonderheit LK07“ statt „Besonderheit W4“ | Blocker (Handbuch) | behoben in `docs/nordtech-moderationshandbuch.md` |
| 2 | LK09, alle Storys | Text: Backup „lesbar, aber noch nicht auf Schadcode geprüft“. Bild zeigte „Backup erfolgreich / freigegeben“ | Tisch hält das Backup für sofort nutzbar; SK19 und LK14 verlieren ihren Sinn | Bild: „BACKUP-PRÜFUNG LÄUFT / NOCH NICHT FREIGEGEBEN“, Stempel „PRÜFUNG OFFEN“ | Hoch | behoben, `lk09-offline-backup-foto.webp` |
| 3 | LK12, alle Storys | Text: Werk Süd im Notbetrieb, eingeschränkte Kapazität, ohne ERP. Bild zeigte Leitstand im Normalbetrieb | Wiederanlauf wirkt schon am Freitag erledigt | Bild: „WERK SÜD NOTBETRIEB“, Kapazität eingeschränkt, ERP offline / Papierlisten | Hoch | behoben, `lk12-werk-sued-online-foto.webp` |
| 4 | LK15, alle Storys | „70 %“ war als Lieferfähigkeit lesbar | Kunden würden falsche Zusage bekommen; Konflikt mit SK33, LK25, LK26 | Bildunterschrift: „Wiederanlauf: 70 % technische Kapazität – noch nicht 70 % Lieferfähigkeit.“; Karte: „70 % technisch verfügbar – Personal und Material begrenzen.“ | Hoch | behoben, Drehbuch und `lk15-wiederanlauf.png` |
| 5 | LK17, alle Storys (Do 07:00) | Folie im Foto trug falschen Tag / Titel | Zeitverwirrung genau in der Drucksituation | Folie: „LAGEBERICHT FÜR DEN BEIRAT / ENTWURF · DONNERSTAG, 07:30 UHR“, Gliederung gesichert / geschätzt / offen | Mittel | behoben, `lk17-zwischenfazit-foto.webp` |
| 6 | LK18 (Vorbote Mo 06:41) | Karte deutete erreichbaren Service-Desk an; laut Drehbuch erst ab 07:00 besetzt | kleiner Zeitwiderspruch zu SK34 | Zusatz: „Service-Desk erst ab 07:00 Uhr besetzt“ | Mittel | behoben, `v1-anmeldung-hakt.png` |
| 7 | LK08 | Karte war als Entwarnung lesbar | Tisch lockert Sicherheitsmaßnahmen zu früh | Zusatz: „Keine Hinweise auf aktive Angreifer“ | Mittel | behoben, `lk08-positive-entwicklung.png` |
| 8 | Handbuch 1.0 Abschnitt 10, Abnahmeauftrag | Bildpflicht für B1–B8; das Werkzeug zeigte B-Karten nie auf der Bühne | Überraschungen, die der ganze Tisch erleben soll, wurden privat zugestellt | B6–B8 öffentlich mit Bild und Ton; B1–B5 privat; Handbuch Abschnitt 9 | Mittel | behoben (Werkzeug, Drehbuch, Handbuch 1.2) |
| 9 | Handbuch 1.0, Status-Absatz | „konkrete Buttonnamen … zu verifizieren“ | Moderation sucht Schaltflächen | Abschnitt 7.0 mit allen Schaltflächen im Wortlaut der Oberfläche | Mittel | behoben |
| 10 | Handbuch Abschnitt 12 vs. Protokoll | Bewertungsraster (8 Kriterien, 0/1/2) fehlte im exportierten Protokoll | Auswertung musste von Hand nachgebaut werden | Protokoll enthält Abschnitt „Gesamteinschätzung der Übung (Team)“ mit allen acht Kriterien | Mittel | behoben, `server/index.js` |
| 11 | 180 Min., Ausgewogen | Debitoren-, Bestands- und Key-Account-Rollen hatten eigene Karten, waren in Lagen aber kaum gefordert | Rollen sitzen lange still | Zuständigkeiten ergänzt in LK02, LK06, LK11, LK12, LK14, LK17, LK24, LK25 | Niedrig | behoben, Drehbuch |
| 12 | 45 Min., LK07 | Zwei Entscheidungen (W3, W4) bei ca. 1,25 Min. Entscheidungszeit | Lösegeldfrage kann zu kurz kommen | Handbuch „Besonderheit LK07“: W3 kurz halten, W4 am Ende der Lage mit Begründung | Mittel | als Moderationsregel gelöst; im Pilot beobachten |
| 13 | B8, alle Fassungen unter 180 Min. | B8 setzt LK14 voraus; LK14 ist nur bei 180 Min. eingeplant | B8 ist in kürzeren Fassungen gesperrt | Handbuch-Hinweis: LK14 erst über „Jetzt einsetzen“ spielen, sonst B8 auslassen | Niedrig | dokumentiert |
| 14 | Fotos LK01–LK17 | Fotos zeigen ein älteres Firmenzeichen (Dreieck), Werkzeug das N-Logo | rein optisch | – | Niedrig | offen, kein Einfluss auf die Spiellogik |

**Faktenkanon (P0), automatisch über alle Karten gesucht:**
- Die Eckdaten erscheinen nur dort, wo sie hingehören, und überall gleich:
  - 32 Stunden Datenverlust: LK09, Abschluss.
  - 1.900 Buchungen: LK25, SK31, Abschluss.
  - 260 Chargen: LK21, LK25.
  - 900 Systeme: LK25, SK31, SK38, Abschluss.
  - 620 Beschäftigte: LK10, LK22, SK38, Abschluss.
  - 2,0 Mio. € Lösegeld: LK01.
  - Frist Mittwoch 07:00: W4.
  - 30 % / 20 %: LK12 und W1.
  - 70 %: LK15, LK26, SK33, B8, Abschluss.
- Die Zeitleiste ist streng aufsteigend, die Vorboten LK18–LK20 liegen vor LK01. LK26 (So 15:00) folgt LK15 (So 12:00); der Abschluss nennt keine Uhrzeit und passt deshalb auch nach LK26.

## 3. Spielbarkeitstabelle

Erzeugt mit den vom Werkzeug vorgeschlagenen Rollen, Schwierigkeit „mittel“.
- **Geheimkartenlast** = Zahl der vertraulichen Karten / Höchstzahl bei einer Rolle.
- **Entscheidungszeit** = Diskussionszeit je Lage nach der Sprechzeit der Rollen.

### Die sieben Geschichten

| Nr. | Dauer · Schwerpunkt · Entscheidungen | Tatsächlicher Ablauf (Lagen) | Entscheidungsspielraum | Geheimkartenlast | Offene Voraussetzungen | Urteil |
|---:|---|---|---|---|---|---|
| 1 | 45 · Ausgewogen · alles riskant | LK18 LK01 LK02 LK22 LK07 LK09 LK17 LK12 LK15 | alle vier Weichen; ca. 1,25 Min. je Lage, LK07 mit zwei Entscheidungen | 6 / 2 + Folgekarten SK43, SK44, SK27 | keine | spielbar mit straffer Moderation; LK07 eng |
| 2 | 90 · Ausgewogen · alles vorsichtig | LK18 LK19 LK01 LK02 LK22 LK04 LK07 LK09 LK17 LK12 LK21 LK15 | ca. 2,5 Min. je Lage | 13 / 2, keine Folgekarten | keine | gut spielbar |
| 3 | 90 · Krisenführung · alles riskant | wie 2, aber LK05 und LK24 statt LK04 und LK21 | Schwerpunktfragen in LK07, LK17 | 13 / 2 + SK43, SK44, SK27; Pflichtkarte SK47 enthalten | keine | gut spielbar |
| 4 | 90 · IT · gemischt (trennen, abwarten, melden, gezahlt) | mit LK16 und LK24 | W1 früh bei LK16 | 13 / 3 + SK43, SK27; Pflichtkarte SK19 enthalten | keine | gut spielbar |
| 5 | 90 · Produktion · alles riskant | mit LK16 und LK21 | LK15-Schwerpunktfrage trennt Anlage, Personal, Freigabe | 13 / 3 + SK43, SK44, SK27; Pflichtkarte SK45 enthalten | keine | gut spielbar |
| 6 | 90 · Kunden · gemischt (am Netz, proaktiv, abwarten, nicht gezahlt) | mit LK04 und LK10 | Kundenfragen in LK06/LK11 entfallen, Kern über LK22 und LK10 | 13 / 3 + SK44; Pflichtkarte SK46 enthalten | keine | gut spielbar |
| 7 | 180 · IT · alles riskant | 20 Lagen inkl. LK23, LK08, LK24, LK14, LK25 | ca. 2,7 Min. je Lage | 23 / 2 + SK43, SK44, SK27; 21 Rollen | LK25 zieht LK14, LK14 zieht LK09 – geprüft | gut spielbar; längste Phase Mittwoch bis Freitag |

### Fünf Dauern und fünf Schwerpunkte

Alle 25 Kombinationen sind geprüft (Tabelle „Zeitbudget und Kartenlast“ in Abschnitt 4):
- keine doppelte Karte,
- keine verletzte Abhängigkeit,
- keine vertrauliche Karte vor ihrer Lage,
- Krise plus Abschluss innerhalb der Zieldauer,
- alle vier Weichen in jeder Fassung erreichbar (LK02, LK22 und LK07 sind Priorität 1),
- Pflichtkarte des Schwerpunkts immer enthalten.

| Dauer | Rollen | Lagen | Entscheidungszeit | Urteil |
|---:|---:|---:|---:|---|
| 45 | 5 | 9 | 1,25 Min. | spielbar, nur mit strikter Zeitführung; Debriefing (ca. 15 Min.) kommt zusätzlich |
| 60 | 6 | 9 | 3 Min. | gut |
| 90 | 9 | 12 | 2,5 Min. | gut, empfohlenes Pilotformat |
| 120 | 12 | 14 | 2,5 Min. | gut |
| 180 | 21 | 20 | 2,7 Min. | gut; jede der 21 Rollen hat mindestens eine eigene Karte und ist in gespielten Lagen als zuständig genannt |

**Bedienung (P3), am Werkzeug nachgewiesen:**
- **45 Minuten, vor LK22:** B6, B7 und B8 werden auch bei direkter Auslösung abgelehnt („Diese Karte passt erst nach LK22/LK17/LK14.“).
- **Nach LK17 bei 45 Minuten:** B6 lässt sich auslösen. B7 bleibt gesperrt („Diese Karte ist nur für Übungen ab 90 Minuten gedacht.“).
- **Vertrauliche Karten mit „zuBeginnVon“:** Sie kommen ca. 30 Sekunden nach der Lage (vom Prüflauf in allen Simulationen bestätigt).
- **Ersatzrolle:** Die Moderation zeigt einen Prüfhinweis an.
- **Fairness bei LK17:** nicht geprüft, nur im Pilot beobachtbar.

## 4. 16-Weichen-Matrix und Zeitbudgets

Die Matrix wurde **tatsächlich ausgeführt** (kein gedanklicher Modellcheck): Für jede Kombination wurden die Texte erzeugt, die das Werkzeug auf LK12, LK15 und LK17 anzeigt. Geprüft wurde außerdem:
- Folgekarten nur nach ihrer Entscheidung,
- 20 % genau bei W1 „am Netz“,
- SK27 genau bei Zahlung.

W4 liegt bei LK07 und damit vor Fristablauf. Die im Abnahmeauftrag genannte Rückblende bei LK09 gibt es nicht mehr; Backups aus der Zukunft können nicht in die Entscheidung einfließen.

### Alle 16 Kombinationen

Erzeugt direkt aus dem Drehbuch (`data/scenario.nordtech.json`). Geprüft wird, welcher Text bei jeder Kombination auf LK12, LK15 und LK17 steht, welche Folgekarten kommen und was die Rechnung ergibt. Automatische Prüfregeln: Kapazität 20 % genau dann, wenn W1 „am Netz“; Erklärung „bis Sonntag aufgeholt“ genau dann; Erpresser-Folgekarte SK27 mit geänderter Forderung genau bei Zahlung; keine Folge vor ihrer Entscheidung.

| Nr. | W1 | W2 | W3 | W4 | LK12 Krisen-Info | Folgekarten | Zusatzsätze LK12 / LK15 / LK17 | Zusatzposten | Beim Unternehmen | Regelprüfung |
|---:|---|---|---|---|---|---|---|---|---:|---|
| 1 | trennen | proaktiv | melden | nicht-gezahlt | Kapazität: 30 % | – | Die frühe Trennung vom Netz hat sich ausgezahlt… / Einzelne Großkunden bedanken sich für die frühe … / Positiv vermerkt der Beirat… | – | 2.860.000 € (31 %) | ok |
| 2 | trennen | proaktiv | melden | gezahlt | Kapazität: 30 % | SK27 bei LK17 | Die frühe Trennung vom Netz hat sich ausgezahlt… + Der nach der Zahlung gelieferte Schlüssel entsch… / Einzelne Großkunden bedanken sich für die frühe … + In der Presse wird berichtet, dass NordTech Löse… / Positiv vermerkt der Beirat… | 2.000.000 € | 4.860.000 € (53 %) | ok |
| 3 | trennen | proaktiv | abwarten | nicht-gezahlt | Kapazität: 30 % | SK44 bei LK12 | Die frühe Trennung vom Netz hat sich ausgezahlt… / Einzelne Großkunden bedanken sich für die frühe … / Ein Beiratsmitglied will wissen, warum die Daten… | 150.000 € | 3.010.000 € (33 %) | ok |
| 4 | trennen | proaktiv | abwarten | gezahlt | Kapazität: 30 % | SK44 bei LK12, SK27 bei LK17 | Die frühe Trennung vom Netz hat sich ausgezahlt… + Der nach der Zahlung gelieferte Schlüssel entsch… / Einzelne Großkunden bedanken sich für die frühe … + In der Presse wird berichtet, dass NordTech Löse… / Ein Beiratsmitglied will wissen, warum die Daten… | 150.000 € + 2.000.000 € | 5.010.000 € (54 %) | ok |
| 5 | trennen | abwarten | melden | nicht-gezahlt | Kapazität: 30 % | SK43 bei LK07 | Die frühe Trennung vom Netz hat sich ausgezahlt… / Zwei Großkunden kritisieren öffentlich, dass sie… / Positiv vermerkt der Beirat… | 600.000 € | 3.460.000 € (37 %) | ok |
| 6 | trennen | abwarten | melden | gezahlt | Kapazität: 30 % | SK43 bei LK07, SK27 bei LK17 | Die frühe Trennung vom Netz hat sich ausgezahlt… + Der nach der Zahlung gelieferte Schlüssel entsch… / Zwei Großkunden kritisieren öffentlich, dass sie… + In der Presse wird berichtet, dass NordTech Löse… / Positiv vermerkt der Beirat… | 600.000 € + 2.000.000 € | 5.460.000 € (59 %) | ok |
| 7 | trennen | abwarten | abwarten | nicht-gezahlt | Kapazität: 30 % | SK43 bei LK07, SK44 bei LK12 | Die frühe Trennung vom Netz hat sich ausgezahlt… / Zwei Großkunden kritisieren öffentlich, dass sie… / Ein Beiratsmitglied will wissen, warum die Daten… | 600.000 € + 150.000 € | 3.610.000 € (39 %) | ok |
| 8 | trennen | abwarten | abwarten | gezahlt | Kapazität: 30 % | SK43 bei LK07, SK44 bei LK12, SK27 bei LK17 | Die frühe Trennung vom Netz hat sich ausgezahlt… + Der nach der Zahlung gelieferte Schlüssel entsch… / Zwei Großkunden kritisieren öffentlich, dass sie… + In der Presse wird berichtet, dass NordTech Löse… / Ein Beiratsmitglied will wissen, warum die Daten… | 600.000 € + 150.000 € + 2.000.000 € | 5.610.000 € (61 %) | ok |
| 9 | am-netz | proaktiv | melden | nicht-gezahlt | Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt) | – | Weil die Anlagen am Montag am Netz blieben, wurd… / Zusätzliche Wiederherstellungsteams haben bis So… + Einzelne Großkunden bedanken sich für die frühe … / Positiv vermerkt der Beirat… | 350.000 € | 3.210.000 € (35 %) | ok |
| 10 | am-netz | proaktiv | melden | gezahlt | Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt) | SK27 bei LK17 | Weil die Anlagen am Montag am Netz blieben, wurd… + Der nach der Zahlung gelieferte Schlüssel entsch… / Zusätzliche Wiederherstellungsteams haben bis So… + Einzelne Großkunden bedanken sich für die frühe … + In der Presse wird berichtet, dass NordTech Löse… / Positiv vermerkt der Beirat… | 350.000 € + 2.000.000 € | 5.210.000 € (56 %) | ok |
| 11 | am-netz | proaktiv | abwarten | nicht-gezahlt | Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt) | SK44 bei LK12 | Weil die Anlagen am Montag am Netz blieben, wurd… / Zusätzliche Wiederherstellungsteams haben bis So… + Einzelne Großkunden bedanken sich für die frühe … / Ein Beiratsmitglied will wissen, warum die Daten… | 350.000 € + 150.000 € | 3.360.000 € (36 %) | ok |
| 12 | am-netz | proaktiv | abwarten | gezahlt | Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt) | SK44 bei LK12, SK27 bei LK17 | Weil die Anlagen am Montag am Netz blieben, wurd… + Der nach der Zahlung gelieferte Schlüssel entsch… / Zusätzliche Wiederherstellungsteams haben bis So… + Einzelne Großkunden bedanken sich für die frühe … + In der Presse wird berichtet, dass NordTech Löse… / Ein Beiratsmitglied will wissen, warum die Daten… | 350.000 € + 150.000 € + 2.000.000 € | 5.360.000 € (58 %) | ok |
| 13 | am-netz | abwarten | melden | nicht-gezahlt | Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt) | SK43 bei LK07 | Weil die Anlagen am Montag am Netz blieben, wurd… / Zusätzliche Wiederherstellungsteams haben bis So… + Zwei Großkunden kritisieren öffentlich, dass sie… / Positiv vermerkt der Beirat… | 350.000 € + 600.000 € | 3.810.000 € (41 %) | ok |
| 14 | am-netz | abwarten | melden | gezahlt | Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt) | SK43 bei LK07, SK27 bei LK17 | Weil die Anlagen am Montag am Netz blieben, wurd… + Der nach der Zahlung gelieferte Schlüssel entsch… / Zusätzliche Wiederherstellungsteams haben bis So… + Zwei Großkunden kritisieren öffentlich, dass sie… + In der Presse wird berichtet, dass NordTech Löse… / Positiv vermerkt der Beirat… | 350.000 € + 600.000 € + 2.000.000 € | 5.810.000 € (63 %) | ok |
| 15 | am-netz | abwarten | abwarten | nicht-gezahlt | Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt) | SK43 bei LK07, SK44 bei LK12 | Weil die Anlagen am Montag am Netz blieben, wurd… / Zusätzliche Wiederherstellungsteams haben bis So… + Zwei Großkunden kritisieren öffentlich, dass sie… / Ein Beiratsmitglied will wissen, warum die Daten… | 350.000 € + 600.000 € + 150.000 € | 3.960.000 € (43 %) | ok |
| 16 | am-netz | abwarten | abwarten | gezahlt | Kapazität: 20 % (zwei Linien zusätzlich verschlüsselt) | SK43 bei LK07, SK44 bei LK12, SK27 bei LK17 | Weil die Anlagen am Montag am Netz blieben, wurd… + Der nach der Zahlung gelieferte Schlüssel entsch… / Zusätzliche Wiederherstellungsteams haben bis So… + Zwei Großkunden kritisieren öffentlich, dass sie… + In der Presse wird berichtet, dass NordTech Löse… / Ein Beiratsmitglied will wissen, warum die Daten… | 350.000 € + 600.000 € + 150.000 € + 2.000.000 € | 5.960.000 € (64 %) | ok |

**Ergebnis:** Alle 16 Kombinationen erfüllen die Prüfregeln. Grundschaden 4.260.000 €, modellierte Erstattung 1.400.000 € (Modellannahme), Spanne beim Unternehmen 2.860.000 € bis 5.960.000 €.

### Zeitbudget und Kartenlast je Dauer und Schwerpunkt

Mit den vom Werkzeug vorgeschlagenen Rollen, Schwierigkeit „mittel“. „Max. je Rolle“ = höchste Zahl vertraulicher Karten bei einer Rolle.

| Dauer | Schwerpunkt | Rollen | Lagen | Vertraulich | Max. je Rolle | Krisenzeit + Abschluss | Entscheidung je Lage | Doppelt | Abhängigkeit verletzt | Zeitbindung verletzt |
|---:|---|---:|---:|---:|---:|---|---:|---|---|---|
| 45 | Ausgewogen | 5 | 9 | 6 | 2 | 40 + 5 Min. | 1,25 Min. | – | – | – |
| 45 | Krisenführung und BCM | 5 | 9 | 6 | 2 | 40 + 5 Min. | 1,25 Min. | – | – | – |
| 45 | IT-Sicherheit und Wiederanlauf | 5 | 9 | 7 | 2 | 40 + 5 Min. | 1,25 Min. | – | – | – |
| 45 | Produktion und Qualitätsmanagement | 5 | 9 | 7 | 2 | 40 + 5 Min. | 1,25 Min. | – | – | – |
| 45 | Kunden und Krisenkommunikation | 5 | 9 | 6 | 2 | 40 + 5 Min. | 1,25 Min. | – | – | – |
| 60 | Ausgewogen | 6 | 9 | 10 | 3 | 54 + 6 Min. | 3 Min. | – | – | – |
| 60 | Krisenführung und BCM | 6 | 9 | 10 | 3 | 54 + 6 Min. | 3 Min. | – | – | – |
| 60 | IT-Sicherheit und Wiederanlauf | 6 | 9 | 10 | 3 | 54 + 6 Min. | 3 Min. | – | – | – |
| 60 | Produktion und Qualitätsmanagement | 6 | 9 | 10 | 3 | 54 + 6 Min. | 3 Min. | – | – | – |
| 60 | Kunden und Krisenkommunikation | 6 | 9 | 10 | 3 | 54 + 6 Min. | 3 Min. | – | – | – |
| 90 | Ausgewogen | 9 | 12 | 13 | 2 | 81 + 9 Min. | 2,5 Min. | – | – | – |
| 90 | Krisenführung und BCM | 9 | 12 | 13 | 2 | 81 + 9 Min. | 2,5 Min. | – | – | – |
| 90 | IT-Sicherheit und Wiederanlauf | 9 | 12 | 13 | 3 | 81 + 9 Min. | 2,5 Min. | – | – | – |
| 90 | Produktion und Qualitätsmanagement | 9 | 12 | 13 | 3 | 81 + 9 Min. | 2,5 Min. | – | – | – |
| 90 | Kunden und Krisenkommunikation | 9 | 12 | 13 | 3 | 81 + 9 Min. | 2,5 Min. | – | – | – |
| 120 | Ausgewogen | 12 | 14 | 16 | 2 | 108 + 12 Min. | 2,5 Min. | – | – | – |
| 120 | Krisenführung und BCM | 12 | 14 | 16 | 2 | 108 + 12 Min. | 2,5 Min. | – | – | – |
| 120 | IT-Sicherheit und Wiederanlauf | 12 | 14 | 16 | 3 | 108 + 12 Min. | 2,5 Min. | – | – | – |
| 120 | Produktion und Qualitätsmanagement | 12 | 14 | 16 | 2 | 108 + 12 Min. | 2,5 Min. | – | – | – |
| 120 | Kunden und Krisenkommunikation | 12 | 14 | 16 | 2 | 108 + 12 Min. | 2,5 Min. | – | – | – |
| 180 | Ausgewogen | 21 | 20 | 22 | 2 | 165 + 15 Min. | 2,68 Min. | – | – | – |
| 180 | Krisenführung und BCM | 21 | 20 | 22 | 2 | 165 + 15 Min. | 2,68 Min. | – | – | – |
| 180 | IT-Sicherheit und Wiederanlauf | 21 | 20 | 23 | 2 | 165 + 15 Min. | 2,68 Min. | – | – | – |
| 180 | Produktion und Qualitätsmanagement | 21 | 20 | 22 | 2 | 165 + 15 Min. | 2,68 Min. | – | – | – |
| 180 | Kunden und Krisenkommunikation | 21 | 20 | 22 | 2 | 165 + 15 Min. | 2,68 Min. | – | – | – |

**Ergebnis:** In allen 25 Kombinationen: keine doppelte Karte, keine verletzte Abhängigkeit, keine vorgezogene vertrauliche Karte, Krisenzeit plus Abschluss innerhalb der Zieldauer.

### Überraschungen je Dauer und Schwerpunkt

Erreichbar = alle Voraussetzungs-Lagen sind im Ablauf und die Mindestdauer ist erfüllt (bei den vom Werkzeug vorgeschlagenen Rollen; mit weniger Rollen passen mehr Lagen in die Zeit, dann ist oft auch LK14 dabei). B1–B5 haben keine Voraussetzung und gehen privat an eine Rolle; B6–B8 sind öffentlich.

| Dauer | Schwerpunkt | B6 Widersprüchliche Anweisungen | B7 Krisenstabsleitung weg | B8 Vermeintlicher Erfolg | zum Schwerpunkt passend, aber nicht erreichbar |
|---:|---|---|---|---|---|
| 45 | Ausgewogen | ja | – (ab 90 Min.) | – (LK14 nicht im Ablauf) | – |
| 45 | Krisenführung und BCM | ja | – (ab 90 Min.) | – (LK14 nicht im Ablauf) | B7 |
| 45 | IT-Sicherheit und Wiederanlauf | ja | – (ab 90 Min.) | – (LK14 nicht im Ablauf) | B8 |
| 45 | Produktion und Qualitätsmanagement | ja | – (ab 90 Min.) | – (LK14 nicht im Ablauf) | B8 |
| 45 | Kunden und Krisenkommunikation | ja | – (ab 90 Min.) | – (LK14 nicht im Ablauf) | – |
| 60 | Ausgewogen | ja | – (ab 90 Min.) | – (LK14 nicht im Ablauf) | – |
| 60 | Krisenführung und BCM | ja | – (ab 90 Min.) | – (LK14 nicht im Ablauf) | B7 |
| 60 | IT-Sicherheit und Wiederanlauf | ja | – (ab 90 Min.) | – (LK14 nicht im Ablauf) | B8 |
| 60 | Produktion und Qualitätsmanagement | ja | – (ab 90 Min.) | – (LK14 nicht im Ablauf) | B8 |
| 60 | Kunden und Krisenkommunikation | ja | – (ab 90 Min.) | – (LK14 nicht im Ablauf) | – |
| 90 | Ausgewogen | ja | ja | – (LK14 nicht im Ablauf) | – |
| 90 | Krisenführung und BCM | ja | ja | – (LK14 nicht im Ablauf) | – |
| 90 | IT-Sicherheit und Wiederanlauf | ja | ja | – (LK14 nicht im Ablauf) | B8 |
| 90 | Produktion und Qualitätsmanagement | ja | ja | – (LK14 nicht im Ablauf) | B8 |
| 90 | Kunden und Krisenkommunikation | ja | ja | – (LK14 nicht im Ablauf) | – |
| 120 | Ausgewogen | ja | ja | – (LK14 nicht im Ablauf) | – |
| 120 | Krisenführung und BCM | ja | ja | – (LK14 nicht im Ablauf) | – |
| 120 | IT-Sicherheit und Wiederanlauf | ja | ja | ja | – |
| 120 | Produktion und Qualitätsmanagement | ja | ja | ja | – |
| 120 | Kunden und Krisenkommunikation | ja | ja | – (LK14 nicht im Ablauf) | – |
| 180 | Ausgewogen | ja | ja | ja | – |
| 180 | Krisenführung und BCM | ja | ja | ja | – |
| 180 | IT-Sicherheit und Wiederanlauf | ja | ja | ja | – |
| 180 | Produktion und Qualitätsmanagement | ja | ja | ja | – |
| 180 | Kunden und Krisenkommunikation | ja | ja | – (LK14 nicht im Ablauf) | – |

**Ergebnis:** B6 ist in jeder Fassung erreichbar, B7 ab 90 Minuten, B8 nur, wo die Wiederanlaufphase mit dem ERP-Testbetrieb (LK14) gespielt wird. Zum Schwerpunkt passend, aber im Ablauf nicht erreichbar: 45/Krisenführung und BCM: B7; 45/IT-Sicherheit und Wiederanlauf: B8; 45/Produktion und Qualitätsmanagement: B8; 60/Krisenführung und BCM: B7; 60/IT-Sicherheit und Wiederanlauf: B8; 60/Produktion und Qualitätsmanagement: B8; 90/IT-Sicherheit und Wiederanlauf: B8; 90/Produktion und Qualitätsmanagement: B8. Die Moderation zeigt diese Karten mit dem Hinweis „In diesem Ablauf nicht eingeplant“ am Ende der Liste.

B6 ist zusätzlich den Schwerpunkten IT und Produktion zugeordnet. Damit hat jeder Schwerpunkt in jeder Dauer mindestens eine passende öffentliche Überraschung.

## 5. Medienabnahme

Die vollständige Liste mit Dateinamen, Pixelmaßen und Bildinhalten steht in `docs/nordtech-medienmatrix.md` (`.csv` zum Abhaken).

| Bereich | Befund | Beleg |
|---|---|---|
| LK01–LK26 und Ruhebild | 27 von 27 Bildern vorhanden, je Lage genau eine eigene Datei, keine fremden Marken, keine realen Firmen | Dateiprüfung und Sichtprüfung; Fotos 1536 × 1024 oder größer, Karten 1000 × 280 |
| Bild-Text-Widersprüche | sechs gefunden, sechs behoben (LK08, LK09, LK12, LK15, LK17, LK18) | Widerspruchstabelle Nr. 2–7 |
| LK03 | Social-Media-Beitrag ohne Plattformlogo | Sichtprüfung |
| SK (vertraulich) | nie auf der Bühne; per E-Mail an eine Rolle; Bühne zeigt nur gelbe Markierung im Spielbrett | Werkzeug |
| B1–B5 | wie SK, privat per E-Mail, kein Bühnenbild | Werkzeug |
| B6–B8 | öffentlich auf der Bühne: eigene Karte (Megafon / Tür / Bildschirm), Ton; B7 mit Countdown und „nicht erreichbar“ im Spielbrett | Generalprobe, Browser-Test |
| W1–W4 | bewusst kein Bühnenbild; nur in der Moderation | Werkzeug |
| Ton: Halle | `ambience-maschinenraum.mp3`, 24 s Schleife, synthetisch erzeugt, endet mit LK01 | Datei, Browser-Test |
| Ton: LK01 | `lk01-stille-gemurmel.mp3`, 7 s, einmalig, eigene Aufnahme | Datei |
| Ton: LK04, LK06 | `telefon-klingeln.mp3`, 5 s, einmalig; danach spricht die Moderation den Anrufer live (Sprechertext) | Datei, Browser-Test |
| Ton: LK23 | `funk-ruf.mp3`, 1 s, einmalig; danach Werkschutz live (Sprechertext) | Datei |
| Ton: LK10 | `lk10-nordkanal-nachrichten.mp3`, 56 s: Erkennungsmelodie, Nachricht (Piper „Thorsten“, CC0), Abschluss-Ton; endet spätestens mit der nächsten Lage | Datei, Generalprobe |
| Ton: B6, B8 | `b6-zwei-durchsagen.mp3` (27 s), `b8-erp-test-meldung.mp3` (21 s); Stimmen Piper „Kerstin“/„Thorsten“ (CC0) | Datei, Generalprobe |
| Ton: LK19, LK02, LK12 | Geräusche, synthetisch erzeugt: Fräslinie stottert und stoppt (über der Hallen-Atmosphäre), Linien fahren herunter (Halle deutlich leiser, nicht ganz still wegen W1), Anlage fährt hoch | Dateien, Browser-Test |
| Ton: LK05, LK22, LK26 | Sprachaufnahmen (Piper, CC0): IT-Bereitschaft am Telefon, abgebrochener Werkfunk, Sprachnachricht der Schichtleitung; Abschrift in der Moderation | Dateien, Browser-Test |
| Medienpaket des Auftraggebers | Übernommen: Klingel- und Funksignal, Signale für B8 (Pegel angehoben), Sprechertexte (an die Kartentexte angeglichen). Neu produziert statt der eSpeak-Demos: LK10, B6, B8 mit der freien Sprachsynthese Piper. Nicht übernommen: Audio zu SK17 (vertraulich), Bilder für W1–W4 (ein Bild würde verraten, wo eine Entscheidung Folgen hat), Briefings für LK01–LK26 (Bilder liegen geprüft vor) | Abgleich mit Drehbuch |
| Stumm | „Ton aus“ stoppt die Halle sofort, „Ton an“ startet sie wieder; „Ohne Ton anzeigen“ spielt nie etwas ab | Browser-Test ohne Fehler |
| Fallback ohne Ton | kein Ton trägt Information, die nicht auch auf der Bühne steht | Drehbuch |
| **nicht geprüft** | Beamer-Darstellung und Lesbarkeit im Raum; Lautstärke im Raum; Herkunft und Nutzungsrechte der Fotos sowie Ähnlichkeit abgebildeter Personen mit realen Menschen | – |

**Asset-Gap-Liste:**
- Es fehlen keine Bilder.
- Optional ließe sich das ältere Firmenzeichen auf den Fotos an das N-Logo angleichen (rein kosmetisch).
- Im Medienordner liegen 13 ältere Kartenvarianten, die das Drehbuch nicht mehr nutzt; sie werden nie angezeigt.

## 6. Handbuch-Abgleich

Umgesetzt in `docs/nordtech-moderationshandbuch.md`, Version 1.1:

| Stelle | Problem in 1.0 | Änderung in 1.1 |
|---|---|---|
| Status-Absatz | Buttonnamen unverifiziert | „mit der laufenden Oberfläche abgeglichen“, Liste der Änderungen |
| neu: 7.0 | keine Bedienübersicht | Tabelle aller Schaltflächen im Wortlaut (Übung vorbereiten, Bühne öffnen, Ton aktivieren & Übung anzeigen / Ohne Ton anzeigen, Jetzt beginnt die Krise …, Ton aus / Ton an, Pause / Fortsetzen / Zurücksetzen, Zeitsprung hierhin, Entscheidungen mit Folgen, Spielbrett, Auslösen / Noch nicht, Krise beenden – Abschluss zeigen, Protokoll herunterladen) |
| 7.2 Schritt 5 | Weichen „im Werkzeug anzeigen lassen“ | Frage offen stellen, Optionen nicht vorlesen; Bühne zeigt bewusst nichts; ohne Eintrag „nicht festgehalten“ |
| 7.3 Tabelle und Besonderheit | W4 bei LK09 rückblickend | W4 bei LK07; „Besonderheit LK07“ mit Regel für 45 Minuten |
| Ersatzrollen | Prüfhinweis unbestimmt | wörtlicher Hinweistext der Moderation |
| Trigger B6–B8 | serverseitige Sperre als Forderung | Verhalten beschrieben („Noch nicht“ mit Begründung, Server lehnt ab) plus Hinweis zu B8 unter 180 Minuten |
| 9 Überraschungskarten | Weg zur Rolle unklar | per E-Mail an eine Rolle, nie auf der Bühne; „passt zum Schwerpunkt“ |
| 10 Medien und Audio | Bildpflicht für B, Audio als Wunschliste | tatsächlicher Bestand, Stumm-Fallback |
| 11 Protokoll | Inhalt vermutet | tatsächlicher Inhalt inkl. Team-Einschätzung je Entscheidung und Raster |
| 13 / 14 No-Go und Checkliste | „Bonuskarte ohne Bild“ als No-Go | „Lagekarte ohne Bild oder mit widersprechendem Bild“; Stumm-Test als Checkpunkt |

Bewertungsproblem: keines offen. Das Raster bewertet das Team, nicht Personen, und die Summe hat ausdrücklich keinen Grenzwert.

## 7. Rechnerischer Check

| Größe | Betrag | Prüfung |
|---|---:|---|
| Grundschaden (9 Posten) | 4.260.000 € | 1.550.000 + 420.000 + 380.000 + 310.000 + 200.000 (4 Tage × 50.000) + 250.000 + 160.000 + 90.000 + 900.000 = 4.260.000 € ✓ |
| W1 „am Netz“ | + 350.000 € | nur bei dieser Option |
| W2 „abwarten“ | + 600.000 € | nur bei dieser Option; die Basis-Kundenabwanderung (900.000 €) ist davon getrennt begründet |
| W3 „abwarten“ | + 150.000 € | Prüf- und Beratungsaufwand, **fachliche Annahme**, kein Bußgeld |
| W4 „gezahlt“ | + 2.000.000 € | Lösegeld = Forderung LK01 ✓ |
| Erstattung Versicherung | − 1.400.000 € | **Modellannahme**, in allen Pfaden gleich; steigt bei Zahlung des Lösegelds nicht |
| Beim Unternehmen | 2.860.000 € bis 5.960.000 € | 31 % bis 64 % des Jahresgewinns (185 Mio. € Umsatz × 5 % = 9,25 Mio. €) ✓ |

Getrennt betrachtet:
- **Schaden:** alle Posten, also 4,26 bis 7,36 Mio. € brutto.
- **Erstattung:** modellhaft und unter Vorbehalt der Vertragsbedingungen.
- **Liquidität:** Lösegeld, Forensik und Sonderschichten fließen sofort ab, die Erstattung kommt erst später. Die 1.900 nicht gestellten Rechnungen sind bewusst kein Schaden, sondern ein Liquiditätsthema. Dazu gibt es eine eigene Debriefing-Frage.
- **Fachlich prüfen lassen:** ob eine reale Police Lösegeld, Vertragsstrafen und Folgeaufträge deckt. Das Drehbuch trifft dazu keine Aussage.

## 8. Priorisierte Korrekturliste für `main`

Alle Punkte sind mit diesem Stand umgesetzt und geprüft.

| Prio | Datei / ID | Änderung | Akzeptanzkriterium | Status |
|---:|---|---|---|---|
| 1 | `docs/nordtech-moderationshandbuch.md` | W4 bei LK07, Bedienübersicht 7.0, B-Karten privat, Stumm, Protokoll | keine Erwähnung von W4 bei LK09; jede Schaltfläche existiert in der Oberfläche | erledigt |
| 2 | `media/nordtech/lk09-…`, `lk12-…`, `lk15-…` | Bild an Text angleichen | Bild widerspricht dem Kartentext nicht | erledigt |
| 3 | `media/nordtech/lk17-…`, `v1-…`, `lk08-…` | Bild an Text angleichen | dto. | erledigt |
| 4 | `public/stage.*`, `public/moderator.*`, `server/index.js` | Stummschaltung | Browser-Test: Halle stoppt / startet; „Ohne Ton“ spielt nichts | erledigt |
| 5 | `server/index.js` (Protokoll) | Raster aus Handbuch Abschnitt 12 | Protokoll enthält 8 Kriterien und Summe; keine Namen | erledigt |
| 6 | `data/scenario.nordtech.json` | LK15-Bildunterschrift; Zuständigkeiten | Prüflauf 0 Fehler; jede Rolle bei 180 Min. in Lagen gefordert | erledigt |
| 7 | `docs/nordtech-medienmatrix.md/.csv` | echter Prüfstand je Datei | jede Zeile mit Datei, Pixeln, Befund | erledigt |
| – | Fotos LK01–LK17 | Firmenzeichen angleichen | – | optional, offen |

## 9. Abschlusscheckliste Go / No-Go

**Im Werkzeug nachgewiesen (Go):**
- [x] Prüflauf `npm run pruefen`: 0 Fehler, 0 Hinweise
- [x] 25 Ablaufpläne ohne doppelte Karte, verletzte Abhängigkeit oder vorgezogene vertrauliche Karte
- [x] 16 Weichenkombinationen regelkonform, Rechnung 2,86–5,96 Mio. € beim Unternehmen
- [x] 27 / 27 Bilder vorhanden und inhaltlich zum Text passend
- [x] Sperren B6 / B7 / B8 greifen auch serverseitig
- [x] „Ton aus / Ton an“ und „Ohne Ton anzeigen“ funktionieren im Browser
- [x] Protokoll-Export mit Entscheidungen, Überraschungen, Rechnung, Raster, Maßnahmenplan, ohne Namen
- [x] E-Mail Ende-zu-Ende über SMTP (lokaler Testempfänger): 9 von 9 Begrüßungen und Rollenbriefings, 14 von 14 vertraulichen Karten bei der richtigen Person, Folgekarte SK43 nach W2, B2 privat, B6 ohne Mail, kein vertraulicher Text auf der Bühne
- [x] B7-Beobachtungsbogen für die Stellvertretung in Moderation und Protokoll
- [x] Medien-Generalprobe: alle 26 Lagekarten und B6–B8 auf der Bühne angezeigt, alle Bilder geladen, jeder Ton an der richtigen Karte; ein Fehler gefunden und behoben (Ton lief über die nächste Lage weiter)

**Vor dem Pilot (No-Go, solange offen):**
- [ ] Offene fachliche Annahmen entschieden: bestätigt, bewusst als Szenarioannahme akzeptiert oder angepasst (Wiederanlauftempo, OT-Isolierung, Backup, Deckungsbeitrag, Pharma-Qualitätsrahmen, Versicherung)
- [ ] Medienrechte geklärt (Herkunft und Nutzung der Fotos für den vorgesehenen Teilnehmerkreis)
- [ ] Nur vor einem 180-Minuten-Einsatz: Durchlauf mit Stoppuhr und echter Rollenbesetzung
- [ ] Beamer: Ruhebild, LK01, eine Karte (z. B. LK15) und das Spielbrett aus der letzten Reihe lesbar
- [ ] Ton: Halle und LK01 in Raumlautstärke; einmal „Ton aus“ während der Halle
- [ ] E-Mail: Testmail aus dem Setup an zwei Testadressen; eine vertrauliche Karte kommt ca. 30 Sekunden nach der Lage an
- [ ] Moderation auf eigenem Bildschirm, Bühne nur am Beamer (nichts aus der Moderation geteilt)
- [ ] Protokoll nach der Generalprobe herunterladen und öffnen
- [ ] Nutzung der Fotos für den vorgesehenen Teilnehmerkreis freigegeben (fachlich klären)
- [ ] B7 vorher mit der Person absprechen, die die Krisenstabsleitung spielt (wird hinausgebeten)
- [ ] Live-Gespräche LK04/LK06/LK23 einmal mit einer zweiten Person durchspielen

**Minimaler Funktionstest je Zeitformat und Schwerpunkt:** im Setup Dauer und Schwerpunkt wählen. Danach in der Ablaufvorschau prüfen:
- LK07 und LK17 sind enthalten,
- beim Schwerpunkt steht die Pflichtkarte im Plan (SK47 / SK19 / SK45 / SK46).

Anschließend einmal mit „Zeitsprung hierhin“ zu LK07 springen, W4 festhalten und das Protokoll laden.
