# BCM Timeline — technische Referenz

*Arbeitspaket AP4, Version 2.4.0.*

> **Diese Seite ist technische Dokumentation** (Datenmodell, Funktionsnamen,
> Ableitungslogik) — für die anwenderorientierte Erklärung siehe
> [BCM Timeline im Benutzerhandbuch](../handbook/20-timeline.md).

## Zweck

Eine chronologische, filterbare Übersicht fachlich relevanter BCM-
Ereignisse. Kein Audit-Log, kein Event-Sourcing, keine Aufzeichnung jeder
Feldänderung — nur die tatsächlich fachlich bedeutsamen Vorgänge.

## Kein STATE.timeline[]

Die Timeline führt bewusst **keine eigene Ereignisliste**. Bevor
irgendetwas neu gespeichert wurde, wurde zuerst geprüft, welche Ereignisse
bereits aus vorhandenen Daten ableitbar sind — und das waren fast alle:

| Ereignis | Quelle |
|---|---|
| Prozess angelegt | `process.createdAt` |
| Review geplant | `review.erstelltAm` |
| Review gestartet | `review.gestartetAm` |
| Review abgeschlossen | `review.abgeschlossenAm` |
| Maßnahme erstellt | `massnahme.erstelltAm` (AP3) |
| Maßnahme abgeschlossen | `massnahme.abgeschlossenAm` (AP3) |
| Wirksamkeit geprüft | `massnahme.wirksamkeitGeprueftAm` |
| Kritikalität geändert | Versionsdiff (`compareVersions()`) |
| MTA/RTO/RPO geändert | Versionsdiff |
| Notbetrieb wesentlich geändert | Versionsdiff (neu in AP4, siehe unten) |
| Kritische Ressourcen geändert | Versionsdiff |
| Version gespeichert | `STATE.versions[]` |
| Freigabe erzeugt | `STATE.versions[]` mit `source==='release'` |

`buildTimelineEvents()` ist eine reine Funktion: liest `STATE`, gibt ein
Array zurück, verändert nichts und speichert nichts. Ein Ereignis entsteht
ausschließlich, wenn ein echter Zeitstempel vorhanden ist — ein nur
geplanter Review (ohne `gestartetAm`/`abgeschlossenAm`) erzeugt genau ein
Ereignis, nicht drei mit zwei erfundenen Daten.

## Versionsdiffs statt Doppelpflege

Für "Kritikalität geändert", "MTA/RTO/RPO geändert" und "Kritische
Ressourcen geändert" wird die bereits vorhandene `compareVersions()`-Logik
wiederverwendet — angewendet auf jedes Paar **unmittelbar
aufeinanderfolgender** Versionen (nie alle Paare, das würde Änderungen
verzerrt vervielfachen oder Zwischenschritte verschlucken).

Für "Notbetrieb wesentlich geändert" wurde `compareVersions()` um einen
Vergleich der operativen Kernfelder ergänzt (Auslöser, Entscheidung, die
vier Reaktionsschritte, Rückkehr in den Normalbetrieb) — bewusst nicht
jedes Freitextfeld, damit kleine Formulierungsänderungen die Timeline
nicht überfluten. `compareVersions()` liefert außerdem seit AP4 je
Prozessänderung dessen ID mit (vorher nur der Name) — für Drill-down und
Prozessfilter benötigt, an der bestehenden Versionsvergleich-Ansicht
ändert das nichts (die liest weiterhin nur `.name`/`.changes`).

## Bewusst nicht umgesetzt: "Maßnahme gestartet" / "Maßnahme blockiert"

Für den Wechsel einer Maßnahme auf `in_arbeit` oder `blockiert` speichert
das Datenmodell keinen eigenen Zeitpunkt. Ein Timeline-Ereignis dafür hätte
einen Zeitpunkt erfinden müssen — das widerspricht "Ableitung vor
Persistenz" und "keine Ereignisse für Funktionen erfinden, die im Produkt
nicht existieren". Es wurde bewusst KEIN neues Zeitstempelfeld ergänzt, nur
um dieses eine Ereignispaar zu ermöglichen (siehe
`roadmap/DECISIONS.md`).

## Filter und Drill-down

`timelineEvents({prozessId, type, from, to})` filtert und sortiert absteigend
nach Zeitpunkt. Jeder Eintrag verlinkt (`timelineDrilldownHtml()`) in die
passende bestehende Ansicht — Prozessakte, Review Center, Maßnahmenkatalog
oder Versionshistorie — nie eine eigene Detailansicht.

Die Prozessakte (Maßnahmen-Tab) bietet zusätzlich einen kompakten
"Timeline anzeigen"-Link, der direkt auf den jeweiligen Prozess filtert.
