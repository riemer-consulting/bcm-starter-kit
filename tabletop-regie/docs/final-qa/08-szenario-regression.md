# 08 – Szenario-Regression

**Geprüfter Commit:** `33154fdfaa660fb48cedf3d5823a795ce3200d56` · **Lauf:** 2026-11-19T12:07:29.913Z bis 2026-11-19T13:02:40.338Z · erzeugt mit `tools/qa/berichte.js` aus dem Nachweisordner (Pfadangaben relativ zum Nachweispaket).

NordTech ist eingefroren. Verglichen wird das beobachtbare Verhalten über die Server-Schnittstelle: Ausgangsstand (Commit der NordTech-Freigabe) gegen geprüften Stand, je Kombination mit derselben Besetzung, denselben Startwerten und denselben Entscheidungen.

**Ausgangsstand:** `79c9b89` · **Kombinationen:** 41 (25 × Dauer/Schwerpunkt ohne Entscheidungen, 16 × Entscheidungen bei 90 Min.) · **identisch in allen Aspekten:** 41/41 · Dauer 469 s · Prüfschritt `regression-nordtech`: Exit-Code 0, 469 s, Konsole `konsole/regression-nordtech.txt`

| Aspekt | Inhalt des Vergleichs | gleich |
|---|---|---|
| besetzung | empfohlene Rollen je Dauer | 41/41 |
| ablaufplan | Karten, Reihenfolge und Minute jeder Karte | 41/41 |
| buehne | je gezeigter Lage: ID, Titel, Simulationszeit, Text mit Zusätzen, Krisen-Info, Aufgabe, Bild, Ton | 41/41 |
| zustellungen | vertrauliche Karte → Empfängerrolle | 41/41 |
| kartentexte | Text jeder zugestellten Karte (inkl. ersetzter Texte) | 41/41 |
| rechnung | vollständige Rechnung inkl. Posten, Erstattung, Eigenanteil, Kennzahlen | 41/41 |
| kriterien | Kriterien des Bewertungsrasters im Protokoll (Soll: 8) | 41/41 |
| summenzeile | Summenzeile des Rasters | 41/41 |

Kriterien im Ausgangsstand: Aktivierung / Lagebild · Entscheidung / Verantwortung · Kommunikation · IT-/OT-Sicherheit · Geschäftsfortführung · Qualität / Datenintegrität · Fachliche Prüfpflichten · Wiederanlauf / Nachsorge

### Abweichungen

Keine.

### Je Kombination

| Kombination | Lagen | vertrauliche Karten | Brutto | identisch |
|---|---|---|---|---|
| 45-ausgewogen | 9 | 6 | 4.260.000 € | ja |
| 45-fuehrung | 9 | 6 | 4.260.000 € | ja |
| 45-it | 9 | 7 | 4.260.000 € | ja |
| 45-produktion | 9 | 7 | 4.260.000 € | ja |
| 45-kunden | 9 | 6 | 4.260.000 € | ja |
| 60-ausgewogen | 9 | 10 | 4.260.000 € | ja |
| 60-fuehrung | 9 | 10 | 4.260.000 € | ja |
| 60-it | 9 | 10 | 4.260.000 € | ja |
| 60-produktion | 9 | 10 | 4.260.000 € | ja |
| 60-kunden | 9 | 10 | 4.260.000 € | ja |
| 90-ausgewogen | 13 | 13 | 4.260.000 € | ja |
| 90-fuehrung | 13 | 13 | 4.260.000 € | ja |
| 90-it | 13 | 13 | 4.260.000 € | ja |
| 90-produktion | 13 | 13 | 4.260.000 € | ja |
| 90-kunden | 13 | 13 | 4.260.000 € | ja |
| 120-ausgewogen | 15 | 16 | 4.260.000 € | ja |
| 120-fuehrung | 15 | 16 | 4.260.000 € | ja |
| 120-it | 15 | 16 | 4.260.000 € | ja |
| 120-produktion | 15 | 16 | 4.260.000 € | ja |
| 120-kunden | 15 | 16 | 4.260.000 € | ja |
| 180-ausgewogen | 21 | 23 | 4.260.000 € | ja |
| 180-fuehrung | 21 | 23 | 4.260.000 € | ja |
| 180-it | 21 | 23 | 4.260.000 € | ja |
| 180-produktion | 21 | 23 | 4.260.000 € | ja |
| 180-kunden | 21 | 23 | 4.260.000 € | ja |
| 90-am-netz-proaktiv-melden-nicht-gezahlt | 13 | 13 | 4.610.000 € | ja |
| 90-trennen-proaktiv-melden-nicht-gezahlt | 13 | 13 | 4.260.000 € | ja |
| 90-am-netz-abwarten-melden-nicht-gezahlt | 13 | 14 | 5.210.000 € | ja |
| 90-trennen-abwarten-melden-nicht-gezahlt | 13 | 14 | 4.860.000 € | ja |
| 90-am-netz-proaktiv-abwarten-nicht-gezahlt | 13 | 14 | 4.760.000 € | ja |
| 90-trennen-proaktiv-abwarten-nicht-gezahlt | 13 | 14 | 4.410.000 € | ja |
| 90-am-netz-abwarten-abwarten-nicht-gezahlt | 13 | 15 | 5.360.000 € | ja |
| 90-trennen-abwarten-abwarten-nicht-gezahlt | 13 | 15 | 5.010.000 € | ja |
| 90-am-netz-proaktiv-melden-gezahlt | 13 | 14 | 6.610.000 € | ja |
| 90-trennen-proaktiv-melden-gezahlt | 13 | 14 | 6.260.000 € | ja |
| 90-am-netz-abwarten-melden-gezahlt | 13 | 15 | 7.210.000 € | ja |
| 90-trennen-abwarten-melden-gezahlt | 13 | 15 | 6.860.000 € | ja |
| 90-am-netz-proaktiv-abwarten-gezahlt | 13 | 15 | 6.760.000 € | ja |
| 90-trennen-proaktiv-abwarten-gezahlt | 13 | 15 | 6.410.000 € | ja |
| 90-am-netz-abwarten-abwarten-gezahlt | 13 | 16 | 7.360.000 € | ja |
| 90-trennen-abwarten-abwarten-gezahlt | 13 | 16 | 7.010.000 € | ja |

Nicht Gegenstand dieses Vergleichs (und bewusst geändert): Plattformfunktionen außerhalb des Drehbuchs – Prüfstand, Ereignisjournal, Gesamteinschätzung mit Werten, CSRF-Kopf, Zustellstatus in der Moderation. Das NordTech-Drehbuch selbst, `server/runEngine.js` und `server/finale.js` sind seit dem Ausgangsstand byteweise unverändert (siehe Prüfsummen in `umgebung.json` und `git diff` im README des Pakets).

## Replay aus dem Ereignisjournal

### NT-90-ausgewogen

Quelle: Journal des Browser-Durchlaufs (Sitzung `20261119124333-x6b7`), gleiches Drehbuch: ja, 59 Bedienaktionen wiederholt. Ergebnis: **identischer Verlauf**.

| Vergleich | gleich | Original | Replay |
|---|---|---|---|
| lagen | ja | LK18 LK19 LK20 LK01 LK02 LK22 LK04 LK07 LK09 LK17 LK12 LK21 LK15 | LK18 LK19 LK20 LK01 LK02 LK22 LK04 LK07 LK09 LK17 LK12 LK21 LK15 |
| zustellungen | ja | SK34→it-service-desk:zugestellt SK40→leitung-produktion:zugestellt SK21→notfallmanagement-bcm:zugestellt SK01→leiter-it:zugestellt SK05→geschaeftsfuehrerin-vertrieb:zugestellt SK41→leitung-qualitaet:zugestellt SK20→geschaeftsfuehrer-ceo:zugestellt SK19→leiter-it:zugestellt SK17→geschaeftsfuehrer-ce… | SK34→it-service-desk:zugestellt SK40→leitung-produktion:zugestellt SK21→notfallmanagement-bcm:zugestellt SK01→leiter-it:zugestellt SK05→geschaeftsfuehrerin-vertrieb:zugestellt SK41→leitung-qualitaet:zugestellt SK20→geschaeftsfuehrer-ceo:zugestellt SK19→leiter-it:zugestellt SK17→geschaeftsfuehrer-ce… |
| entscheidungen | ja | W1=trennen W2=proaktiv W3=melden W4=nicht-gezahlt | W1=trennen W2=proaktiv W3=melden W4=nicht-gezahlt |
| ueberraschungen | ja | B6:ok | B6:ok |

### WK-90-ausgewogen

Quelle: Journal des Browser-Durchlaufs (Sitzung `20261119125124-6k37`), gleiches Drehbuch: ja, 71 Bedienaktionen wiederholt. Ergebnis: **identischer Verlauf**.

| Vergleich | gleich | Original | Replay |
|---|---|---|---|
| lagen | ja | LK01 LK02 LK03 LK04 LK06 LK08 LK09 LK14 LK15 LK19 LK20 LK22 LK27 | LK01 LK02 LK03 LK04 LK06 LK08 LK09 LK14 LK15 LK19 LK20 LK22 LK27 |
| zustellungen | ja | SK03→leiter-it:zugestellt SK06→leiter-arbeitssicherheit:zugestellt SK34→geschaeftsfuehrer-ceo:zugestellt SK08→leiter-it:zugestellt SK35→leiter-it:zugestellt SK11→partnerbetreuung:zugestellt SK21→leiter-arbeitssicherheit:zugestellt SK13→facility-management:zugestellt SK14→rz-betrieb:zugestellt SK18→… | SK03→leiter-it:zugestellt SK06→leiter-arbeitssicherheit:zugestellt SK34→geschaeftsfuehrer-ceo:zugestellt SK08→leiter-it:zugestellt SK35→leiter-it:zugestellt SK11→partnerbetreuung:zugestellt SK21→leiter-arbeitssicherheit:zugestellt SK13→facility-management:zugestellt SK14→rz-betrieb:zugestellt SK18→… |
| entscheidungen | ja | W1=herunterfahren W2=frueh W3=bergen W4=minimal W5=gleichrangig | W1=herunterfahren W2=frueh W3=bergen W4=minimal W5=gleichrangig |
| ueberraschungen | ja | B6:ok B8:ok B1:ok | B6:ok B8:ok B1:ok |

Grenzen des Replays: Wartezeiten der echten Übung werden nicht nachgebildet (ein Zeitsprung löst fällige Ereignisse gesammelt aus); Mailfehler entstehen nur, wenn der Test-Mailempfänger im Replay ebenfalls gestört wird.
