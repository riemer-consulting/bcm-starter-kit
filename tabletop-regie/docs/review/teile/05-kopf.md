# 05 – Waterkant: vollständiges Szenario mit Bestandsanalyse

{{STAND}}

## 1. Ausgangslage und Entscheidung

Vorgefunden wurde die Fassung „72 Stunden in Flammen“ (Großbrand im Zentrallager). Auf Rückfrage wurde entschieden: **Das Unternehmen bleibt die Waterkant Baumärkte GmbH, der Brand entsteht neu im eigenen Rechenzentrum.** Die alte Fassung ist unverändert archiviert (`data/archiv/scenario.waterkant-lagerbrand-v1.json`, im Paket unter `exportierte-szenariodaten/archiv-…`) und wird vom Werkzeug nicht geladen.

## 2. Bestandsanalyse der alten Fassung (Gap-Analyse)

| Kriterium (Maßstab: NordTech nach Vorabnahme) | alte Fassung v1 | neue Fassung | Bewertung der alten Fassung |
|---|---|---|---|
| Lagekarten / Akte | 18 / alle sechs, aber Vorboten als LK16–LK18 nachgereicht (IDs nicht chronologisch) | 28 / alle sechs, IDs chronologisch | Lücke: Wiederanlauf nur eine Karte (LK12); Folgen dünn |
| Vertrauliche Karten | 26 | 46 (davon 5 Folgekarten) | Lücke: kaum Rollenkonflikte |
| Entscheidungen mit Folgen | **keine** | W1–W5 | Kritisch: keine echten Entscheidungen, der Verlauf war unabhängig vom Tisch |
| Überraschungen | 4, alle privat | 8, davon 4 öffentlich (B5–B8), B7 testet die Stellvertretung | Lücke: keine öffentliche Überraschung, kein Stellvertretungstest |
| Schwerpunkte | keine | 4 mit Leitfrage, Zusatzfragen, Debriefing, Pflichtkarte | Lücke |
| Töne / Sprechertexte / Gesprächssimulation | 1 / 0 / 0 | 8 Lagen + 1 Überraschung / 7 / 4 | Lücke |
| Rechnung | 24,14 Mio. € Schaden, Versicherung 17,75 Mio. €, kein Rechenweg | 3,176 Mio. € Grundschaden + 9 entscheidungsabhängige Posten, Rechenweg je Posten, Erstattung 1,6 Mio. € als unbestätigte Modellannahme | Kritisch: Versicherung als Gewissheit, Größenordnung ohne Herleitung |
| Kunden, SLA, RTO/RPO | nicht modelliert | 9 Partnermärkte mit IT-Servicevertrag (Wiederherstellungsziel 24 h), Datenlücke 26 h, Kassen-Offline-Grenze 72 h | Lücke |
| Beobachtungsbögen | keine | B5–B8 mit Beobachtungspunkten | Lücke |
| Medien | 18 Bilder, teils mit Bezug auf Lagerbrand | 28 Lagen- und 4 Überraschungsbilder neu erzeugt (Karten-Banner), 6 eigene Töne | alte Bilder passen nicht zum neuen Ereignis; bleiben ungenutzt im Ordner |

**Übernommen** wurden: Unternehmensdaten (14 Filialen, ca. 850 Beschäftigte, ca. 240 Mio. € Umsatz, 5 % Rendite), die 16 bisherigen Rollen (Beschreibungen an das neue Ereignis angepasst), Firmenzeichen, Ruhebild vor dem Start, Grundstruktur der Begrüßung. **Neu** sind vier Rollen (RZ-Betrieb, Facility Management, Informationssicherheit, Partnerbetreuung), alle Karten, Entscheidungen, Überraschungen, Schwerpunkte, Rechnung und Töne.

## 3. Dramaturgie in einem Satz je Station

- **Vorboten (Mo 22:40 – Di 03:02):** USV-Batteriewarnung, Geruch im Technikflur, Serverraum wird warm – W1: herunterfahren oder weiterlaufen.
- **Ausbruch (Di 03:10 – 06:30):** Brandalarm und Gaslöschung, vermisste Person, Lagebild nach dem Löschen, was noch läuft.
- **Eskalation (Di 07:00 – 17:00):** Filialöffnung ohne Aktionspreise, Partnermärkte (W2), Sperrung des Serverraums, Medienanfrage, Lager ohne Lagerverwaltung, Ersatz-Optionen.
- **Höhepunkt (Mi 07:30 – 19:00):** Backup-Server bergen? (W3, Personenschutz gegen Datenlücke), Umfang des Ausweichbetriebs (W4, 12 Monate Bindung), Gewerbekunde, Kundschaft, Verbundbeirat.
- **Folgen (Do 08:00 – 13:00):** Rücksicherung, Reihenfolge der Märkte (W5, eigene Filialen zuerst?), Medienbericht.
- **Wiederanlauf (Do 18:00 – Mo 09:00):** Kassen laufen, Datenlücke nachbuchen, Versicherer, Samstag, vorläufige Ursache, stabiler Notbetrieb mit erschöpftem Team, Rückkehr-Entscheidung.

## 4. Lernziele

1. Personenschutz vor Sachwerten und Daten – auch unter Zeitdruck (LK05, W3, SK21).
2. Entscheidungsbefugnis in der Nacht und bei Ausfall von Schlüsselpersonen (W1, B7, SK46).
3. Ehrliche Kommunikation mit unsicherer Prognose gegenüber Partnern mit Vertragsziel (W2, LK09, LK18).
4. Notbetrieb so gestalten, dass er nachvollziehbar bleibt (Preise, Bons, Datenlücke; LK08, LK19, LK23).
5. Kriterien statt Bauchgefühl bei Priorisierung (W5) und bei Verträgen im Krisenmodus (W4, SK46).
6. Wiederanlauf nur mit Freigaben (Raumfreigabe, Messung, Sicherheitsprüfung der Firewall-Regeln SK40).
7. Kosten früh und getrennt erfassen: Schaden, Liquidität, mögliche Erstattung (LK24, Abschluss).

## 5. Korrekturen in dieser Runde (nach der Erstfassung)

| Befund (aus eigener Prüfung) | Korrektur |
|---|---|
| 45 Minuten wurden um 2,5 Minuten überschritten (zu viele Lagen mit Priorität 1) | LK18 Priorität 2 |
| Pflichtkarte des Schwerpunkts „Filialen, Lager und Saisonstart“ (SK16) hing an LK12 und fiel bei 45/60 Min. aus | Pflichtkarte SK08 (Kassen-Offline-Grenze, ohne Abhängigkeit) |
| Danach bekam die Krisenstabsleitung bei 60 Min. keine eigene Karte | neue Karte SK46 (Zustimmungsvorbehalt der Gesellschafter zur 12-Monats-Bindung bei LK15) |
| Überraschungen hingen an Lagen mit Priorität 2/3 – bei 45–120 Min. waren nur 1–3 von 8 einsetzbar | Voraussetzungen auf passende Kernlagen gelegt: B1/B3/B7/B8 → LK15, B2/B5 → LK14, B4 → LK22, B6 → LK09; jetzt ab 90 Min. alle 8, bei 45/60 Min. 7 von 8 (B7 bewusst erst ab 90 Min.) |

Befunde aus der unabhängigen Prüfung und ihr Umgang stehen in `11-finaler-unabhaengiger-review.md`.
