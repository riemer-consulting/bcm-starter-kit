# 11 – Finaler unabhängiger Review

Stand: siehe `manifest.json`.

## 1. Wer was geprüft hat

| Szenario | Prüfung | Ergebnis | Umgang |
|---|---|---|---|
| NordTech | Red-Team-Test durch einen separaten fachlichen Prüfer (Befunde R01–R12) und Nachprüfung in einer früheren Runde | 12 Befunde, alle bearbeitet; Freigabeaussage präzisiert; Wiederanlauf als Szenarioannahme gekennzeichnet | `docs/nordtech-abnahmebericht.md`, Abschnitt 0; in dieser Runde unverändert (eingefroren) |
| Waterkant | Unabhängige fachliche Prüfung (BCM, Krisenstab, IT-Notfallmanagement, Arbeitsschutz) durch eine **gesondert beauftragte KI-Prüfinstanz**, die nur die exportierten Unterlagen kannte, nicht die Einschätzung des Autors | 39 Befunde: 11 hoch, 18 mittel, 10 niedrig | dieses Dokument; Originalbericht in `11-anlage-pruefbericht-waterkant.md` |

**Einordnung:** Die Waterkant-Prüfung ist unabhängig von der Erstellung, aber **keine menschliche Fachprüfung**. Sie ersetzt nicht die Durchsicht durch BCM-Verantwortliche und die zuständigen Fachabteilungen (Arbeitsschutz, Versicherung, Recht/Datenschutz, IT), die vor einem Pilot erfolgen muss (Dokument 12).

## 2. Gesamturteil des Prüfers (Erstfassung)

Starkes Grundgerüst: Der Brand ist nur Auslöser, die Prüfsteine sind Freigaben, Ausweichbetrieb, Datenlücke und die Rolle als IT-Dienstleister der Partner; keine Rechtsberatung in den Karten. Aber **nicht pilotreif**: Mehrere Folgen von Entscheidungen waren technisch oder rechnerisch nicht schlüssig, die Rechnung belohnte durchgehend die Lehrbuch-Antwort, und Brandursache, Wartung und Versicherung erreichten den Tisch in keiner Zieldauer. Die automatische Variantenprüfung hatte diese Fehlerklassen nicht erkannt.

## 3. Umgang mit den Befunden hoher Dringlichkeit (alle umgesetzt)

| Nr. | Befund | Umsetzung |
|---|---|---|
| W-R01 | Folge von W1 technisch falsch (Datenbankreparatur, die nichts ändert) | Mechanismus ersetzt: Laufende Server saugen Rauch und Ruß an → mehr Hardware nicht reinigungsfähig, Backup-Server stärker verschmutzt (SK41 neu, jetzt bei LK14 vor der Bergungsentscheidung); Herunterfahren schont die Hardware, bricht aber Preisübertragung und Partner-Tagesabschlüsse ab |
| W-R02 | Zahlen von W5 gehen nicht auf; 72-Stunden-Grenze wirkt nachts nicht | LK20 neu („Wer wird zuerst umgestellt?“): Start ca. 17:00 Uhr, bis 03:00 Uhr ca. 20 von 23 Märkten; nicht umgestellte Kassen sperren sich und brauchen morgens einen Techniker. W5: Bei „gleichrangig“ reißen drei eigene Filialen die Grenze, bei „eigene zuerst“ drei Partnermärkte; SK44 kommt jetzt erst am Sonntag (nach dem Ereignis) |
| W-R03 | Lehrbuch-Option ist immer die billigere (Scheinentscheidungen) | Jede Option hat einen eigenen Preis mit Rechenweg; die Beträge je Entscheidung liegen nah beieinander und zeigen nicht mehr in dieselbe Richtung (W1 100 / 95 T€, W2 25 / 40 T€, W3 95 / 110 T€, W4 180 / 210 T€, W5 75 / 90 T€). Abschluss sagt: „Die Rechnung bewertet nicht, ob richtig entschieden wurde.“ |
| W-R04 | W3 „Personenschutz gegen Datenlücke“ trägt fachlich nicht | Echte Gegenpreise: Gutachter des Versicherers bittet, bis Freitag nichts ohne Abstimmung zu verändern; Fachfirma hat nur ein Team, Bergung verschiebt die Reinigung um einen Tag. Moderation: „Arbeitsschutz und Schadenregulierung gegen Datenverlust“, bewertet wird der Weg zur Entscheidung |
| W-R05 | Datenlücke widerspricht W3 „bergen“ | LK23 neutral; Datenlücke als Zusatz je Option; LK19-Zusatz erklärt, warum die Kassen trotzdem aus der Montagskopie starten; SK30 und SK31 bekommen bei „bergen“ andere Texte; Abschluss ohne feste „38 Lkw“ |
| W-R06 | LK27, Abschluss und Fazit widersprechen sich | LK27 „Warenwirtschaft läuft wieder“, Zusatz bei W4 „minimal“ (Papierlisten); Abschluss und Fazit neu („Seit Freitag sind alle Märkte wieder an die Zentrale angebunden …“) |
| W-R07 | Zustimmungsvorbehalt „ab“ vs. „mehr als“ zwölf Monate | SK46 und Faktenblatt einheitlich: „zwölf Monate oder länger“ |
| W-R08 | Person am Tisch (Rufbereitschaft) ist laut LK05 selbst vermisst | Vermisst ist jetzt ein Kollege aus dem Rechenzentrumsteam, den die Rufbereitschaft gerufen hatte (LK05, SK04, SK05, Faktenblatt) |
| W-R09 | Alarm-Einspielungen können außerhalb des Raums für echt gehalten werden | LK04 und B5 neu erzeugt mit gesprochener Rahmung „Übung, Übung, Übung. Dies ist eine Einspielung für den Krisenstab, kein echter Alarm.“ … „Ende der Übungseinspielung.“; Abschrift in der Moderation; Moderationshinweis LK04 mit Vorkehrungen (Empfang, Sicherheitsdienst, Brandschutzbeauftragte informieren, Türschild, Lautstärke, nie über Hausanlagen) |
| W-R10 | Brandursache, Wartung, Versicherer erreichen den Tisch nie; „kommt immer direkt mit“ irreführend | Brandursache, verschobene Wartung, ungeklärte Zuständigkeit und Vorbehalt des Versicherers stehen jetzt in **jedem** Abschluss. Die Variantenprüfung listet nie gespielte Karten (Hinweis; im Modus „Erprobte Zeiten“ wird jede Lage gespielt). Exportbeschriftung präzisiert („entfällt, wenn nicht eingeplant oder das Kartenbudget ausgeschöpft ist“) |
| W-R11 | Nordkanal-Einspielung widerspricht W2 „früh“; Sendezeiten widersprüchlich | Einspielung neu und unabhängig von W2 („auf seine Bestellungen warte er bis heute“); LK11: „erste Meldung um 13 Uhr, längerer Beitrag in Arbeit“; LK21 „Nordkanal berichtet ausführlich“; Faktenblatt angepasst |

Zusätzlich umgesetzt aus den mittleren und niedrigen Befunden: **W-R22** B7 (Karte nimmt die Vertretung nicht mehr vorweg, nennt eine fällige Entscheidung des Colocation-Anbieters und fragt „Wer übernimmt?“; Betriebsarzt rät statt anzuordnen; „Getestet wird die Organisation, nicht die Person“), **W-R12** zeitneutrale Texte für SK10, SK24, SK25, **W-R29** Variantenprüfung um nie gespielte und über Tagesgrenzen verschobene Karten erweitert, **W-R31** SK32 (über 70 Stunden, Doppelschichten), **W-R32** SK29, **W-R33** Frage und Moderation LK14, **W-R35** B5 (Rauchreste über die gemeinsame Lüftung statt Reinigungsstaub), **W-R37** SK27 ohne verbindlich klingende Versicherungsaussage, **W-R38** Hinweis LK05, **W-R39** Krisen-Info LK25 ohne Regieanweisung. Kartenbanner LK14, LK20, LK21, LK23, LK27 und B7 neu erzeugt.

## 4. Offen gebliebene Befunde (mittel / niedrig) und Begründung

| Nr. | Befund (kurz) | Stand | Begründung / nächster Schritt |
|---|---|---|---|
| W-R13 | LK06 nennt die 72-Stunden-Grenze öffentlich, SK08 verliert den Informationsvorsprung | offen | SK08 ist Pflichtkarte eines Schwerpunkts und hält die Rolle IT-Support in kurzen Übungen beschäftigt; Umbau nach dem Probelauf entscheiden |
| W-R14 | SK22 (Vertrag nur Lagerung) widerspricht LK13 (Ausweich-Rack vertraglich vereinbart) | offen | vor dem Pilot angleichen (Formulierung: Produktivbetrieb vereinbart, Auftragsverarbeitung für Partnerdaten ungeklärt) |
| W-R15 | Ausweich-Rack „sofort nutzbar“ (Di 17 Uhr), Rücksicherung erst Do 08 Uhr | offen | Zwischenschritt (Netz, Basisdienste) in LK15/LK19 ergänzen; gemeinsam mit W-R16 |
| W-R16 | Basisdienste (Anmeldung, Namensauflösung, Backup-Katalog) fehlen in der Wiederanlaufreihenfolge | offen | fachlich durch die IT bestätigen lassen, dann in LK19 aufnehmen |
| W-R17 | Sanierungszeiten (eine Woche / 5–8 Arbeitstage / drei Wochen) passen nicht zusammen | offen | mit Sanierungsfachleuten eine Zeitleiste festlegen |
| W-R18 | Lithium-Ionen-Spezifika (Rückzündung, Restenergie, Brandwache) fehlen | offen | durch Brandschutz bestätigen lassen und in LK06/LK10 ergänzen |
| W-R19 | W4 „ausbauen“ ohne Zustimmung der Gesellschafter und ohne Prüfung der Auftragsverarbeitung als Teil der Option | teilweise | SK46 kommt mit LK15 und fordert die Zustimmung; die Option selbst nennt die Freigabe noch nicht |
| W-R20 | Neuwert-Hardware und Zwölfmonatsvertrag sind teils Investition/Liquidität, nicht reiner Schaden | offen | Controlling: Zeitwert statt Neuwert, Vertragsanteil außerhalb der Übungswoche; bis dahin als Modellannahme gekennzeichnet (Dokument 10) |
| W-R21 | Bezugsbasis der Kulanz für Prospektpreise unklar (mögliche Doppelzählung mit W1) | offen | Rechenweg von W1 enthält die Kulanz für 5 Filialen; Grundposten auf 9 Filialen präzisieren |
| W-R23 | Arbeitsschutzbegriffe teils schief („Freiwilligkeit“, Zuständigkeit für die Gefährdungsbeurteilung der Fremdfirma) | offen | Arbeitsschutz einbeziehen; die Karten bleiben ohne rechtliche Bewertung |
| W-R24 | Titel und Vorboten nehmen die Antwort auf W1 vorweg | offen | bewusst: Die Übung beginnt mit dem Wissen „es wird brennen“; im Debriefing thematisieren (Rückschaufehler) |
| W-R25 | Lernziele nicht als Liste mit Kartenbezug | erledigt im Paket | Lernziele mit Kartenbezug in Dokument 05, Abschnitt 4 |
| W-R26 | Versicherer früh einbinden fehlt als Lernthema | teilweise | LK14 bringt den Gutachter jetzt früh ins Spiel (Abstimmung vor Veränderungen) |
| W-R27 | Pflichten als IT-Dienstleister, Dokumentation des Kassen-Notbetriebs, Partnerdaten | offen | als Prüfauftrag an Recht/Datenschutz; keine Bewertung in den Karten |
| W-R28 | 45 und 60 Minuten sehr dicht (5 Entscheidungen, wenig Debriefing-Zeit) | offen | Empfehlung im Handbuch: Waterkant ab 90 Minuten; Engine-Verhalten unverändert |
| W-R30 | SK04 wiederholt LK05 | offen | niedrig |
| W-R34 | Komma im Rollennamen „Geschäftsführung (CEO), Krisenstabsleitung“ | offen | gleiche Schreibweise wie NordTech (eingefroren); nur Darstellung |
| W-R36 | „Rahmen“ unklar; Aufstellort der Eil-Hardware fehlt | offen | niedrig |

## 5. Nach den Korrekturen erneut geprüft

Drehbuchprüfung, Variantenprüfung (25 Dauer-/Schwerpunkt-Kombinationen, 32 Entscheidungskombinationen), Lauftest und Browsertest wurden mit der korrigierten Fassung wiederholt; Ergebnisse in `testberichte/`. Eine **zweite unabhängige Prüfung** der korrigierten Fassung hat in dieser Runde nicht stattgefunden; sie ist Teil der offenen Schritte vor dem Pilot.

## 6. Zweite unabhängige Prüfrunde (korrigierte Fassung)

Nach den Korrekturen der ersten Runde und des Zweitreviews (F01–F05, F07) hat eine erneut gesondert beauftragte KI-Prüfinstanz die korrigierte Fassung gegen die Originalbefunde geprüft und ausdrücklich nach **neuen Widersprüchen durch die Korrekturen** gesucht. Bericht: `11-anlage-pruefbericht-waterkant-runde2.md`.

**Nachprüfung:** 27 Befunde geprüft – 20 erledigt, 7 teilweise (W-R10, W-R12, W-R22, W-R29, F03, F04, F05), 0 nicht erledigt. Alle Zahlen auf den Karten stimmen; Grundschaden und alle 32 Summen nachgerechnet.

**Neue Befunde: 26** (7 hoch, 8 mittel, 11 niedrig) – überwiegend Widersprüche, die durch die Korrekturen selbst entstanden sind. Umgang:

| Nr. | Befund (kurz) | Dringlichkeit | Umsetzung |
|---|---|---|---|
| W2-R01 | LK22 meldet Partner-Tagesabschlüsse schon um 18 Uhr als nachgeholt; Widerspruch zu LK23 | hoch | umgesetzt: werden je Markt nach der Umstellung aus den Kassen neu eingelesen (LK22, LK23) |
| W2-R02 | Faktenblatt „ca. eine Woche“; Abschluss „3 Wochen bis zur Entscheidung“ | hoch | umgesetzt: Faktenblatt mit Meilensteinzeile Serverraum; Abschluss „2 Wochen … Empfehlung bis Mittwoch“ |
| W2-R03 | Ausbau der Module und Ende der Brandwache nur in selten gespielter LK10 | hoch | umgesetzt: in LK14 (Priorität 1) aufgenommen, Freigabekette in der Moderation von LK14 |
| W2-R04 | Drehbuch-Export ohne Moderationshinweise der Entscheidungen (Zustimmungspfad W4) | hoch | umgesetzt: Export gibt den Hinweis jeder Entscheidung aus |
| W2-R05 | Folgen von W4 „erweitern“ kommen fast nie an | hoch | umgesetzt: LK27-Zusatz (in allen Kombinationen) mit Preisabgleich, Zustimmung und Prüfauftrag |
| W2-R06 | 9 Minuten für Abschluss und Debriefing bei 90 Min. | hoch | umgesetzt: Pilotfestlegung im Handbuch (90-Min.-Konfiguration in mindestens 120 Min. Termin, Debriefing separat ≥ 20 Min.) |
| W2-R07 | Gegenpreis „Reinigung einen Tag später“ trägt nicht (Reinigung erst nach Gutachter) | hoch | umgesetzt: zusätzliche Dokumentation durch den Sachverständigen des Gutachters verschiebt die Reinigung |
| W2-R08 | Dienstagssicherung kann nicht über laufende Warenwirtschaft „eingespielt“ werden | mittel | umgesetzt: Montagsbuchungen werden kontrolliert nachgeladen |
| W2-R09 | W1-Option „nicht zwingend benötigte Systeme“ passt nicht zur Folge | mittel | umgesetzt |
| W2-R10 | W5-Folge am Tisch aushebelbar (Techniker) | mittel | umgesetzt: Herstellertechniker ab 07:00 Uhr, ca. ein Markt pro Stunde |
| W2-R11 | SK31 kommt bei 180 Min. erst nach LK27 | mittel | offen: Bindung an die Heimatlage nimmt der Logistik in kurzen Formaten die einzige Karte (Rollenabdeckung); vor dem Pilot entscheiden |
| W2-R12 | B7: Sprechertext, Einsatzzeitpunkt, Umleitung vertraulicher Karten, Checkpunkt | mittel | umgesetzt |
| W2-R13 | „Freiwilligkeit“ als Kriterium schief | mittel | umgesetzt: Gefährdungsbeurteilung der Fachfirma, Arbeitsfreigabe durch Waterkant (fachlich bestätigen lassen) |
| W2-R14 | SK34 (Dokumentation) erreicht den Tisch nie | mittel | umgesetzt: Priorität 1; SK28/SK36 offen |
| W2-R15 | Variantenprüfung meldet „keine Befunde“, prüft aber keine Textwidersprüche und keine Reichweite | mittel | umgesetzt: Reichweite der Entscheidungsfolgen ergänzt; Ergebniszeile nennt, was nicht automatisch geprüft wird |
| W2-R16 | SK41 „Daten schwerer zu retten“ ohne Wirkung | niedrig | umgesetzt (Satz gestrichen) |
| W2-R17 | SK08 vs. Freischaltung vor Ort | niedrig | umgesetzt |
| W2-R18 | Regiehinweis in Krisen-Info LK23 | niedrig | umgesetzt |
| W2-R19 | B1 widerspricht LK19 | niedrig | umgesetzt (Firewall-Regeln der Märkte statt Zugang) |
| W2-R20 | B3 „vor der Aktivierung“ passt nicht | niedrig | umgesetzt |
| W2-R21 | LK05 Zeitangabe 03:05 Uhr | niedrig | umgesetzt (nach der Geruchsmeldung) |
| W2-R22 | B5 „Rauchreste über die Lüftung“ als eigener Brandschutzbefund | niedrig | umgesetzt (Ursache unklar, vermutlich Fehlalarm) |
| W2-R23 | LK28 Sanierer meldet Dinge außerhalb seines Auftrags | niedrig | umgesetzt (IT-Leitung und Gebäudetechnik melden) |
| W2-R24 | Faktenblatt spiegelt F01/F02 nicht | niedrig | umgesetzt |
| W2-R25 | W5-Folge setzt Umsatzkriterium voraus | niedrig | umgesetzt (Moderationshinweis) |
| W2-R26 | Export ohne Rechenweg der Zusatzposten | niedrig | umgesetzt |

**Stand nach der zweiten Runde:** keine offenen hohen Befunde; offen sind W2-R11 und SK28/SK36 (mittel) sowie die fachlichen Annahmen des Berichts (Abschnitt 4), die nur Fachabteilungen bestätigen können. Eine dritte Prüfrunde der jetzt korrigierten Fassung hat nicht stattgefunden; die Korrekturen der zweiten Runde sind durch die Tests der finalen QA (`docs/final-qa/`) technisch, aber nicht erneut unabhängig fachlich geprüft.
