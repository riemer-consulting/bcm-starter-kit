# 09 – Waterkant-Delta-Abnahme

**Geprüfter Stand:** Commit `5a61845`. Grundlage: Befunde der Fremdprüfung „Finales Review – NordTech & Waterkant“ vom 19.11.2026 (F01–F15). Hier die neun Punkte, deren Abnahme verlangt war. Die Regeln je Punkt mit Beleg stehen im **Anhang zu 09** (`09-anhang-delta-regeln.md`, erzeugt aus `nachweis/delta/waterkant.json`).

**Was dieser Nachweis leistet und was nicht:** Die Delta-Prüfung belegt, dass die beschlossene Korrektur im Drehbuch steht, dass die beanstandete Formulierung nicht mehr vorkommt und dass Reihenfolge und Zustellung über den echten Server stimmen. Sie belegt **nicht**, dass die Korrektur fachlich richtig ist. Brandverhalten, Elektroversorgung, Vertragspflichten, Datenschutz, Evakuierung und Kostenbewertung bleiben Gegenstand der fachlichen Prüfung (Gate D). Ergebnis der automatischen Prüfung in Zyklus 1: **9/9 Befunde mit erfüllten Regeln**.

## F01 – Vertragslage des Ausweich-Racks (ursprünglich Hoch)

| Schritt | Inhalt |
|---|---|
| Ursprünglicher Fehler | LK13 nannte das Ausweich-Rack „vertraglich vereinbart“, SK22 sagte, der Vertrag beschreibe „nur die Lagerung von Sicherungskopien, nicht den Produktivbetrieb“ – nachweisbare Sachverhaltskollision. |
| Geänderte Regel | Festgelegt: Das Rack ist für den Produktivbetrieb der eigenen Systeme vertraglich vereinbart. Offen und als Prüfauftrag formuliert ist nur, ob dort auch Daten verarbeitet werden dürfen, die Waterkant im Auftrag von Gewerbekunden und Partnermärkten verarbeitet. Diese Prüfung gehört zur Entscheidung W4. |
| Betroffene Karten | LK13, SK22, W4 (Hinweis), LK25/LK27 (Zusatz bei „ausbauen“) |
| Testfälle | DELTA-F01 (5 Regeln); Integration INT-WK (Zustellung SK22 an die richtige Rolle in allen Läufen, in denen sie geplant ist); E2E WK-120-it, WK-180-alle-rollen, WK-180-betrieb-zusatz (W4 = ausbauen) |
| Beobachtetes Ergebnis | Alle Delta-Regeln erfüllt (Zyklus 1 und 2); Einzelheiten im Anhang zu 09. |
| Verbleibendes Risiko | Ob die Auftragsverarbeitung im Notfallvertrag so geregelt sein kann, ist eine rechtliche Frage (Recht/Datenschutz). O-01. |

## F02 – Wiederanlauf-Abhängigkeiten (Hoch)

| Schritt | Inhalt |
|---|---|
| Ursprünglicher Fehler | „Sofort nutzbar“ am Dienstag und Rücksicherung erst Donnerstag ohne erkennbare Zwischenschritte (Netz, Identitäten, Namensauflösung, Backup-Katalog, sichere Administration). |
| Geänderte Regel | „Sofort“ nur physisch. Vor jedem Betrieb: Netzanbindung, Anmeldedienste, Namensauflösung, Firewall, Katalog der Sicherungssoftware (LK13); Aufbau der Basisdienste einschließlich gesichertem Administrationszugang vor der Rücksicherung (LK19); getrennte Freigaben: technisch (IT-Leitung mit RZ-Betrieb), Firewall-Regeln je Markt (Informationssicherheit, Vier-Augen-Prinzip), fachliche Datenprüfung (Fachbereiche). Reihenfolge Rack → Rücksicherung → Umstellung der Märkte (LK13 < LK19 < LK20); Herstellertechniker ab 07:00 Uhr, etwa ein Markt je Stunde. |
| Betroffene Karten | LK13, LK19, LK20, Faktenblatt (Ausweichbetrieb, Kassen) |
| Testfälle | DELTA-F02 (6 Regeln); Integration (Chronologie in allen 57 Läufen); E2E Waterkant (Reihenfolge der gezeigten Lagen) |
| Beobachtetes Ergebnis | Alle Delta-Regeln erfüllt (Zyklus 1 und 2); Einzelheiten im Anhang zu 09. |
| Verbleibendes Risiko | Vollständigkeit und Realismus der Basisdienste und der Freigabekette sind durch die IT-Architektur zu bestätigen. O-01. |

## F03 – Meilenstein-Zeitleiste (Hoch)

| Schritt | Inhalt |
|---|---|
| Ursprünglicher Fehler | „Raumfreigabe ca. eine Woche“, „Sanierung 5–8 Arbeitstage“ und „RZ-Nutzung frühestens drei Wochen“ nicht entlang Zugang, Reinigung, Wiederbezug, Produktivbetrieb unterschieden. |
| Geänderte Regel | Eine verbindliche Zeitleiste im Faktenblatt („Meilensteine Serverraum“): Besichtigung durch den Gutachter Freitag → Reinigung ab dem Wochenende (nach einer Bergung einen Tag später), 5–8 Arbeitstage → Freimessung und Raumfreigabe frühestens ca. zehn Tage nach Mittwoch → neue USV, Brandschutzabnahme, Prüfung und Ersatz der Hardware → eigenes Rechenzentrum produktiv frühestens rund drei Wochen nach dem Brand. Karten verwenden die Begriffe entsprechend (LK14: Betreten nach etwa zehn Tagen; LK15: produktiv nach rund drei Wochen; LK28: etwa zwei Wochen bis zur Rückkehrentscheidung). |
| Betroffene Karten | Faktenblatt, LK10, LK14, LK15, LK28, Abschluss |
| Testfälle | DELTA-F03 (6 Regeln) |
| Beobachtetes Ergebnis | Alle Delta-Regeln erfüllt (Zyklus 1 und 2); Einzelheiten im Anhang zu 09. |
| Verbleibendes Risiko | Realistische Dauer von Reinigung und Freimessung nach einem Lithium-Ionen-Brand durch Sanierungsfachleute bestätigen. In der zweiten Prüfrunde als „teilweise“ bewertet. O-01. |

## F04 – Brand- und Wiederbetretungsfreigabe (Hoch)

| Schritt | Inhalt |
|---|---|
| Ursprünglicher Fehler | Brand eines USV-Batteriemoduls mit thermischem Durchgehen ohne Konsequenzen (Rückzündung, Bereichssicherung, fachliche Freigabe); Gefahr, Freigabe aus „gelöscht“ abzuleiten. |
| Geänderte Regel | Brandwache der Feuerwehr, Wiederentzündung und Restspannung der Module, Ausbau nur durch Fachfirma (LK06); Freigabekette Brandbereich (Feuerwehr, erst nach Ausbau) → Büros (Sachverständiger) → Serverraum (Messung, Reinigung, Freimessung) → Wiederinbetriebnahme (Technik); „Gelöscht“ ist keine Freigabe (LK10). Eine Bergung vor der Freigabe ist eine Ausnahme mit eigener Arbeitsfreigabe durch Waterkant, Gefährdungsbeurteilung und Messwerten der Fachfirma, keine Freigabe des Raums; die eigene IT geht nicht hinein (LK14). Keine Freiwilligen. |
| Betroffene Karten | LK06, LK10, LK14, SK21, Bewertungskriterium 3 |
| Testfälle | DELTA-F04 (5 Regeln); E2E: Bühne zeigt LK06/LK14 mit Text (alle Waterkant-Fälle mit diesen Lagen); Protokoll-Kriterium „Sichere Brand- und Raumfreigabe“ |
| Beobachtetes Ergebnis | Alle Delta-Regeln erfüllt (Zyklus 1 und 2); Einzelheiten im Anhang zu 09. |
| Verbleibendes Risiko | Fachliche Prüfung durch Brandschutz/Facility und Arbeitsschutz steht aus; in der zweiten Prüfrunde „teilweise“. O-01. |

## F05 – Zustimmungspfad (Hoch)

| Schritt | Inhalt |
|---|---|
| Ursprünglicher Fehler | „Ausweich-Rack zwölf Monate erweitern“ wirkte unmittelbar entscheidbar; die nötige Gesellschafterzustimmung stand nur vertraulich, ohne Folge einer nicht erteilten Freigabe. |
| Geänderte Regel | Option „ausbauen“ nennt die eingeholte Zustimmung der Gesellschafter; Hinweis W4: „Erweitern“ erst festhalten, wenn der Zustimmungsweg geklärt ist; will der Tisch ohne Zustimmung unterschreiben, bleibt der Vertrag ungezeichnet, es gilt „nur das Nötigste“, der offene Zustimmungsweg kommt ins Debriefing. SK46 an die Geschäftsführung in der Lage der Entscheidung (LK15). |
| Betroffene Karten | W4, LK15, SK46, LK25, LK27 |
| Testfälle | DELTA-F05 (5 Regeln); Integration: SK46 an `geschaeftsfuehrer-ceo` bzw. Ersatzrolle; E2E mit W4 = ausbauen und = minimal |
| Beobachtetes Ergebnis | Alle Delta-Regeln erfüllt (Zyklus 1 und 2); Einzelheiten im Anhang zu 09. |
| Verbleibendes Risiko | Ob die Moderation die Regel „nicht festhalten ohne Zustimmung“ im Spiel durchhält, prüft nur ein Probelauf (Software erzwingt sie nicht). O-02. |

## F07 – Lange Übungsformate (Mittel)

| Schritt | Inhalt |
|---|---|
| Ursprünglicher Fehler | LK24, LK26 und LK28 (Brandursache, Nachsorge, Rückkehrentscheidung) erschienen in keiner der 25 Kombinationen. |
| Geänderte Regel | Der Schwerpunkt „Krisenführung und Personenschutz“ führt LK24, LK26 und LK28, der Schwerpunkt „IT-Wiederanlauf und Infrastruktur“ LK26 und LK28 als bevorzugte Karten; in langen Formaten werden sie damit gespielt. Die Brandursache steht zusätzlich in Einleitung und Abschluss. |
| Betroffene Karten | LK24, LK26, LK28, Schwerpunkte `fuehrung`, `it` |
| Testfälle | DELTA-F07 (Nachweis über die 25 Integrationsläufe, nicht über die Engine-Funktion selbst); Variantenbericht Abschnitt „in keiner der Kombinationen gespielt“ |
| Beobachtetes Ergebnis | Alle Delta-Regeln erfüllt (Zyklus 1 und 2); Einzelheiten im Anhang zu 09. |
| Verbleibendes Risiko | In 45–90 Minuten bleiben diese Lagen ausgeblendet; ob das didaktisch trägt, entscheidet die Spielleitung (Handbuch: Pilot 90 Minuten). |

## F12 – Zehn szenariospezifische Bewertungskriterien (Mittel)

| Schritt | Inhalt |
|---|---|
| Ursprünglicher Fehler | Acht fest verdrahtete, auf NordTech zugeschnittene Kriterien (u. a. „IT-/OT-Sicherheit“) auch für Waterkant. |
| Geänderte Regel | Drehbuchfeld `protokollKriterien`: Waterkant 10 eigene Kriterien mit Kartenbezug (Aktivierung/Lagebild; Personenschutz; sichere Brand- und Raumfreigabe; Entscheidung und Verantwortung; Kunden- und Partnerpriorisierung; Wiederanlaufabhängigkeiten und technische Freigaben; Datenlücke und Datenintegrität; Krisenkommunikation; fachliche Prüfaufträge und Dokumentation; Nachsorge und Rückkehrentscheidung). NordTech behält die 8 allgemeinen Kriterien. In der Moderation bewertbar (0/1/2, Notiz), gespeichert, nach Neuladen sichtbar, im Protokoll mit Summe. |
| Betroffene Karten | Drehbuch (Kopf), Protokoll, Moderation |
| Testfälle | DELTA-F12 (9 Regeln); REF WK-K und NT-K; PRO-WK (25 Varianten: 10 Kriterien, max. 20 Punkte); E2E E1/E2/P6 (Bewertung über die Oberfläche, Neuladen, Protokoll); Regression „kriterien“ (NordTech 8 unverändert) |
| Beobachtetes Ergebnis | Alle Delta-Regeln erfüllt (Zyklus 1 und 2); Einzelheiten im Anhang zu 09. |
| Verbleibendes Risiko | Ob die Kriterien trennscharf und in der Übung beobachtbar sind, ist nur im Probelauf zu klären. O-02. |

## F13 – Kostenklassifizierung (Mittel)

| Schritt | Inhalt |
|---|---|
| Ursprünglicher Fehler | Modellschaden mischt Zeitwert, Investition, Vertragsbindung und Liquidität. |
| Geänderte Regel | Jeder Grund- und Zusatzposten ist in `docs/review/teile/kostenklassen.json` klassifiziert (A Aufwand, E Ertragsausfall, I Investition/Neuwert, V künftige Verpflichtung, R Risiko/Erwartungswert, L Liquidität) und im Dokument 10 des Review-Pakets erläutert; jeder Zusatzposten trägt einen Rechenweg. Ausdrücklich ein Vorschlag, von Finanzen/Controlling zu bestätigen. |
| Betroffene Karten | Abschluss (Rechnung), alle Optionen mit Posten |
| Testfälle | DELTA-F13 (4 Regeln); REF WK-R1…R3 (handgerechnet); Integration (32 Entscheidungskombinationen gegen unabhängige Summierung); E2E P7 |
| Beobachtetes Ergebnis | Alle Delta-Regeln erfüllt (Zyklus 1 und 2); Einzelheiten im Anhang zu 09. |
| Verbleibendes Risiko | Klassifizierung und Beträge sind Modellannahmen; Controlling/Versicherung muss sie bestätigen. O-01. |

## F15 – Waterkant-Moderationshandbuch (Mittel)

| Schritt | Inhalt |
|---|---|
| Ursprünglicher Fehler | Kein eigenes Moderationshandbuch für Waterkant. |
| Geänderte Regel | `docs/waterkant-moderationshandbuch.md`, aus dem Drehbuch erzeugt (`tools/handbuch-waterkant.js`): Pilotfestlegung, Checklisten, Rollenvorschläge, 90-Minuten-Ablauf, Entscheidungen, Überraschungen, B7-Ablauf, Live-Gespräche, Störungen und Abbruch (echter Alarm), Debriefing und Raster. |
| Betroffene Karten | – (Begleitdokument) |
| Testfälle | DELTA-F15: neu erzeugtes Handbuch = eingechecktes (ohne Datumszeilen), jede Entscheidungsfrage und die Abschnitte B7/echter Alarm/Abbruch/Debriefing enthalten |
| Beobachtetes Ergebnis | Alle Delta-Regeln erfüllt (Zyklus 1 und 2); Einzelheiten im Anhang zu 09. |
| Verbleibendes Risiko | Brauchbarkeit für eine fremde Moderation ist nur im Probelauf zu prüfen. O-02. |

## Neue Widersprüche durch die Korrekturen

Die zweite unabhängige Prüfrunde (Review-Paket, Dokument 11, Abschnitt 6 und Anlage Runde 2) hat F01–F05 und F07 ausdrücklich gegen die Originalbefunde geprüft: 20 von 27 Befunden erledigt, 7 teilweise (darunter F03, F04, F05), keiner unerledigt; sieben neue hohe Befunde (W2-R01…R07), alle umgesetzt; offen geblieben W2-R11 (SK31 bei 180 Min. nach LK27) und SK28/SK36 (O-11). In diesem Zyklus zusätzlich geprüft und ohne neuen Widerspruch:

- Textregeln: Die beanstandeten Formulierungen („nur die Lagerung von Sicherungskopien“, „sofort nutzbar“, Bergung durch Freiwillige) kommen in **keiner** Karte mehr vor (DELTA-F01, F02, F04).
- Chronologie und Zustellung: in allen 57 Waterkant-Integrationsläufen und 8 Browser-Durchläufen keine Karte vor ihrer Voraussetzung, keine Folgekarte einer nicht gewählten Option, kein Zusatz einer nicht gewählten Option auf der Bühne (Dokumente 04, 05).
- Rechnung: alle 32 Entscheidungskombinationen gegen unabhängige Summierung, drei davon zusätzlich von Hand (WK-R1…R3).

Eine dritte fachliche Prüfung der jetzt korrigierten Fassung durch Fachleute (nicht durch ein Werkzeug) steht aus und ist Voraussetzung für Gate D.
