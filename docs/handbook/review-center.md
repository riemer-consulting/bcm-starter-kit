# Review Center

*Arbeitspaket AP1, Version 2.4.0-dev — in Entwicklung.*

## Zweck

Das Review Center beantwortet für BCM-Verantwortliche eine einzige, konkrete
Frage: **Was muss als Nächstes getan werden?** Es trifft dabei bewusst keine
fachliche Aussage darüber, ob ein Review "ausreichend" durchgeführt wurde
oder ob eine BCM-Entscheidung richtig war — das bleibt Sache des Anwenders.

## Datenmodell

Jeder Review ist eine eigenständige Arbeits-/Historieninstanz in
`STATE.reviews[]` (nicht nur eine Vorlage). Ein Review enthält:

| Feld | Bedeutung |
|---|---|
| `id` | Eindeutige ID |
| `prozessId` | Bezug zur Prozessakte |
| `reviewart` | `prozess` \| `bia` \| `notbetrieb` \| `ressourcen` |
| `geplantAm` | Geplantes Datum |
| `gestartetAm` | Tatsächlicher Start (gesetzt beim Start) |
| `abgeschlossenAm` | Abschlussdatum (gesetzt beim Abschluss) |
| `verantwortlich` | Verantwortliche Person/Rolle |
| `status` | Nur `geplant` \| `in_bearbeitung` \| `abgeschlossen` |
| `ergebnis` | Freitext-Ergebnis/Feststellungen |
| `naechsterReviewAm` | Nächster geplanter Termin (manuell, solange AP2 keine Policy liefert) |
| `massnahmenIds[]` | Aus diesem Review entstandene Maßnahmen |
| `erstelltAm` | Anlagezeitpunkt |

Reviewarten sind für Version 2.4 fest definiert (`REVIEW_ARTEN`):
Prozessreview, BIA-Review, Notbetriebsreview, Ressourcenreview. AP2 ergänzt
je Reviewart eine eigene Zykluspolicy (`process.reviewConfig`).

## Fälligkeit ist berechnet, nicht gespeichert

Es gibt **keinen** gespeicherten Status "überfällig". `reviewDueInfo(r)`
berechnet bei jedem Rendern aus `geplantAm`:

- `overdue` — geplantes Datum liegt in der Vergangenheit, Review nicht
  abgeschlossen
- `upcoming` — geplantes Datum liegt innerhalb der nächsten
  `REVIEW_UPCOMING_WINDOW_DAYS` (30) Tage
- `done` — Review ist abgeschlossen (unabhängig vom Datum nie überfällig)
- `ok` / `none` — weiter in der Zukunft bzw. kein Datum gesetzt

## Priorisierung ("Was ist als Nächstes zu tun?")

`reviewCenterPriorityList()` liefert eine deterministisch sortierte Liste,
ohne Score:

1. Überfällige Reviews, am längsten überfällig zuerst
2. Bald fällige Reviews, am nächsten fällig zuerst
3. Kritische Prozesse (`isProcessKritisch()`) ohne jeglichen Review-Eintrag

Jede Position in der Liste ist direkt aus dem Sortierkriterium erklärbar.

## Review → Maßnahme

Aus einem Review kann direkt eine Maßnahme erzeugt werden
(`App.reviewToMassnahme`/`App.confirmReviewToMassnahme`). Die neue Maßnahme
wird in `STATE.massnahmen` angelegt und ihre ID in `review.massnahmenIds[]`
verknüpft. AP3 (Maßnahmenmanagement 2.0) erweitert diese Verknüpfung um eine
vollständig bidirektionale Herkunftskennzeichnung auf der Maßnahme selbst
(`sourceType`/`sourceId`/`reviewId`).

## Reviewhistorie in der Prozessakte

Der Maßnahmen-Tab jeder Prozessakte zeigt zusätzlich eine kompakte
Reviewhistorie des jeweiligen Prozesses (`tabReviewHistoryCard()`) mit
Link zurück ins vollständige Review Center — die eigentliche Bearbeitung
bleibt bewusst zentral an einer Stelle.

## Migration

Additive Schema-Migration 12 → 13 (`migrateV12ToV13`): ergänzt
`STATE.reviews = []`, sofern nicht vorhanden. Bestehende 2.3.1-Dateien
bleiben vollständig importierbar; kein Feld wird umbenannt oder entfernt.
