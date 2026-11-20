# Anhang zu 09 – Delta-Regeln Waterkant

**Geprüfter Commit:** `52f7c8fbe8465eb928d28b17873374bd051d41f5` · **Lauf:** 2026-11-20T08:27:50.312Z bis 2026-11-20T09:10:16.032Z · erzeugt mit `tools/qa/berichte.js` aus dem Nachweisordner (Pfadangaben relativ zum Nachweispaket).

Je Befund der Fremdprüfung die Text- und Strukturregeln, die die beschlossene Korrektur im Drehbuch bzw. in den Begleitdateien belegen (`tools/qa/delta-waterkant.js`). Stufe: Regelprüfung am Drehbuch; F07 zusätzlich über die Integrationsläufe. Fachliche Richtigkeit: Gate D.

## F01 – Vertragslage Ausweich-Rack (LK13/SK22): Regeln erfüllt

| Regel | Beleg | erfüllt |
|---|---|---|
| LK13: Rack vertraglich für den Produktivbetrieb vereinbart | LK13 enthält „vertraglich vereinbart“, „Produktivbetrieb“ | ja |
| SK22 bestätigt den Produktivbetrieb (kein Widerspruch zu LK13) | SK22 enthält „regelt den Produktivbetrieb“ | ja |
| alte Gegenaussage „nur die Lagerung von Sicherungskopien“ entfernt | „nur die Lagerung von Sicherungskopien“ in keiner Karte | ja |
| offener Punkt (Verarbeitung von Partner- und Kundendaten) als Prüfauftrag, nicht als Tatsache | SK22 enthält „fachlich zu prüfen“ | ja |
| W4-Hinweis: Prüfung der Datenverarbeitung gehört zur Entscheidung | stimmungsweg kommt ins Debriefing. Die fachliche Prüfung der Datenverarbeitung im Ausweich-Rack gehört zur Entscheidung. | ja |

## F02 – Wiederanlaufabhängigkeiten (LK13, LK19): Regeln erfüllt

| Regel | Beleg | erfüllt |
|---|---|---|
| LK13 nennt die Basisdienste vor jedem Betrieb | LK13 enthält „Netzanbindung“, „Anmeldedienste“, „Namensauflösung“, „Firewall“, „Katalog der Sicherungssoftware“ | ja |
| LK13: „sofort“ nur physisch | LK13 enthält „Physisch steht es sofort bereit“ | ja |
| „sofort nutzbar“ in keiner Karte | „sofort nutzbar“ in keiner Karte | ja |
| LK19: Basisdienste inkl. gesichertem Administrationszugang vor der Rücksicherung | LK19 enthält „Basisdienste“, „gesicherten Administrationszugang“, „Firewall-Regeln“ | ja |
| LK19 (Moderation): getrennte Freigaben technisch / Firewall / fachlich | LK19 enthält „Vier-Augen-Prinzip“, „fachliche Prüfung“ | ja |
| Reihenfolge LK13 < LK19 < LK20 (Rack → Rücksicherung → Umstellung der Märkte) | 45 < 69 < 73 | ja |

## F03 – Meilensteine Serverraum (Zugang, Reinigung, Freigabe, Produktivbetrieb): Regeln erfüllt

| Regel | Beleg | erfüllt |
|---|---|---|
| Faktenblatt hat eine Meilenstein-Zeile | Besichtigung durch den Gutachter Freitag → Reinigung ab dem Wochenende (nach Bergung einen Tag später), 5–8 Arbeitstage → Freimessung und Raumfreigabe frühestens ca. zehn Tage nach Mittwoch → neue USV | ja |
| Meilenstein „Reinigung“ benannt | Reinigung | ja |
| Meilenstein „Freimessung“ benannt | Freimessung | ja |
| Meilenstein „Raumfreigabe“ benannt | Raumfreigabe | ja |
| Meilenstein „produktiv“ benannt | produktiv | ja |
| LK14: Betreten erst nach Reinigung und Freimessung (≈ 10 Tage) | LK14 enthält „frühestens in etwa zehn Tagen“ | ja |
| LK15: Produktivbetrieb eigenes RZ ≈ 3 Wochen | LK15 enthält „produktiv frühestens rund drei Wochen“ | ja |

## F04 – Sichere Brandfreigabe nach Lithium-Ionen-Brand: Regeln erfüllt

| Regel | Beleg | erfüllt |
|---|---|---|
| LK06: Brandwache, Wiederentzündung, Ausbau nur durch Fachfirma | LK06 enthält „Brandwache“, „wieder entzünden“, „Fachfirma“ | ja |
| LK10 (Moderation): Freigabekette, „Gelöscht“ ist keine Freigabe | LK10 enthält „Freigabekette“, „„Gelöscht“ ist keine Freigabe“ | ja |
| LK14: Bergung nur mit Arbeitsfreigabe, keine Raumfreigabe | LK14 enthält „Arbeitsfreigabe“, „keine Freigabe des Raums“ | ja |
| Reihenfolge LK06 < LK10 < LK14 | 17 < 33 < 49 | ja |
| keine Bergung durch Freiwillige | „Freiwillige“ in keiner Karte | ja |

## F05 – Zustimmungspfad bei zwölf Monaten Bindung (W4, SK46): Regeln erfüllt

| Regel | Beleg | erfüllt |
|---|---|---|
| Option „ausbauen“ nennt die Zustimmung der Gesellschafter | Ausweich-Rack binnen 48 Stunden erweitern und auch Lager, Gewerbeportal und Online-Bestände verlagern – nach eingeholter Zustimmung der Gesellschafter (zwölf Monate Mindestlaufzeit) | ja |
| W4-Hinweis: Folge einer fehlenden Zustimmung ausdrücklich geregelt | Klein: günstiger, weniger Fehlerrisiko, aber drei Wochen ohne Lagerverwaltung, Gewerbeportal und Online-Bestände. Groß: zwölf Monate Vertrag, mehr Arbeit für ein erschöpftes Team, schneller zurück. Keine Option ist koste | ja |
| SK46 kommt in der Lage der Entscheidung W4 (LK15) an | SK46 Minute 53.5, Heimatlage LK15; W4 bei LK15 | ja |
| SK46 an die Geschäftsführung | geschaeftsfuehrer-ceo | ja |
| SK46: „zwölf Monaten oder länger“ | Der Vorsitzende der Gesellschafterversammlung hat von der möglichen Erweiterung des Ausweich-Racks gehört und ruft dich an. Nach eurer Geschäftsordnung brauchen | ja |

## F07 – Brandursache und Rückkehrentscheidung in langen Formaten (LK24, LK26, LK28): Regeln erfüllt

| Regel | Beleg | erfüllt |
|---|---|---|
| LK24 in mindestens einer der 25 Kombinationen gespielt (über den Server) | D90-fuehrung, D120-fuehrung, D180-fuehrung | ja |
| LK26 in mindestens einer der 25 Kombinationen gespielt (über den Server) | D120-fuehrung, D180-fuehrung, D180-it | ja |
| LK28 in mindestens einer der 25 Kombinationen gespielt (über den Server) | D120-fuehrung, D180-fuehrung, D180-it | ja |
| Brandursache im Drehbuch (Einleitung/Abschluss) unabhängig von der Variante | Einleitung oder Abschluss nennt die Ursache | ja |

## F12 – Szenariospezifisches Bewertungsraster: Regeln erfüllt

| Regel | Beleg | erfüllt |
|---|---|---|
| 10 Kriterien im Drehbuch | 10 Kriterien | ja |
| Thema „Personenschutz“ als eigenes Kriterium | Personenschutz: Räumung, Sammelplatz, vermisste Person, Angehörige, zweiter Alarm (LK04, L | ja |
| Thema „Brand- und Raumfreigabe“ als eigenes Kriterium | Sichere Brand- und Raumfreigabe: Brandwache, Freigabekette, Betreten nur nach Messung und  | ja |
| Thema „Kunden- und Partnerpriorisierung“ als eigenes Kriterium | Kunden- und Partnerpriorisierung: Wiederherstellungsziel, ehrliche Prognose, offengelegtes | ja |
| Thema „Wiederanlaufabhängigkeiten“ als eigenes Kriterium | Wiederanlaufabhängigkeiten und technische Freigaben: Basisdienste, Firewall-Regeln, Vier-A | ja |
| Thema „Krisenkommunikation“ als eigenes Kriterium | Krisenkommunikation: Beschäftigte, Kundschaft, Medien und Partner – einheitliche Sprachreg | ja |
| jeder Kartenbezug im Raster existiert | 39 Bezüge geprüft | ja |
| kein NordTech-Kriterium „IT-/OT-Sicherheit“ | geprüft | ja |

## F13 – Kostenklassifizierung je Posten: Regeln erfüllt

| Regel | Beleg | erfüllt |
|---|---|---|
| jeder Rechnungs- und Zusatzposten klassifiziert | 19 Posten | ja |
| nur zulässige Klassen (A, E, I, V, R, L) | alle zulässig | ja |
| jeder Zusatzposten mit Rechenweg (herleitung) | alle mit Rechenweg | ja |
| Hinweis: Vorschlag, von Finanzen/Controlling zu bestätigen | im _hinweis der Datei | ja |

## F15 – Waterkant-Moderationshandbuch: Regeln erfüllt

| Regel | Beleg | erfüllt |
|---|---|---|
| Handbuch vorhanden | docs/waterkant-moderationshandbuch.md | ja |
| Handbuch entspricht dem aktuellen Drehbuch (neu erzeugt = eingecheckt) | Vergleich ohne Datumszeilen | ja |
| Entscheidung W1 im Handbuch | Fährt die IT die Systeme im Serverraum jetzt kontrolliert herunter – oder laufen | ja |
| Entscheidung W2 im Handbuch | Informiert Waterkant heute alle Partnermärkte mit einer ehrlichen, aber unsicher | ja |
| Entscheidung W3 im Handbuch | Lässt Waterkant den Backup-Server mit der Dienstagssicherung heute von einer Fac | ja |
| Entscheidung W4 im Handbuch | Bringt Waterkant nur das Nötigste ins Ausweich-Rack – oder erweitert es den Ausw | ja |
| Entscheidung W5 im Handbuch | Stellt Waterkant eigene Filialen und Partnermärkte nach einem gemeinsamen Kriter | ja |
| Abschnitt/Begriff „B7“ | B7 | ja |
| Abschnitt/Begriff „echter Alarm“ | echter Alarm | ja |
| Abschnitt/Begriff „Abbruch“ | Abbruch | ja |
| Abschnitt/Begriff „Debriefing“ | Debriefing | ja |

## O-11 – Zeitliche Plausibilität vertraulicher Karten (SK31, SK28; Entscheidung der Spielleitung): Regeln erfüllt

| Regel | Beleg | erfüllt |
|---|---|---|
| SK31 nur zu Beginn von LK23 (Heimatlage Freitag 09:00) | zuBeginnVon: LK23 | ja |
| SK28 Pflichtkarte im Schwerpunkt „Filialen, Lager und Saisonstart“ | SK08, SK28 | ja |
| SK36 unverändert (nicht als Pflichtkarte eingeplant; gesonderte Entscheidung) | in keinem Schwerpunkt Pflicht | ja |
| keine Waterkant-Karte zwei oder mehr Tage nach ihrer Heimatlage (50 Kombinationen) | 0 Fälle | ja |
| SK31 nur unmittelbar nach LK23 | 180/it/empfohlen@LK23 180/ausgewogen/alle@LK23 180/it/alle@LK23 | ja |
| SK28 im Schwerpunkt „betrieb“ in jeder Kombination, jeweils mit LK22 | 10 Kombinationen: 10 davon „betrieb“ | ja |

