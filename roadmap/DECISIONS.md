# Architecture & Product Decisions

Hier werden dauerhaft alle wichtigen Entscheidungen dokumentiert.

Beispiel:

## Workshopmodus

Entscheidung:
Evolution statt Neubau.

Begründung:
Bestehende Kundenworkshops nutzen den vorhandenen Workflow.

## AP1 — Reviews als eigenständige Liste statt Einbettung in den Prozess

Entscheidung:
Reviews werden als eigenständiges `STATE.reviews[]` mit Prozessreferenz
(`prozessId`) modelliert, nicht als verschachteltes Array innerhalb von
`process`.

Begründung:
Ein Review ist eine Arbeits-/Historieninstanz mit eigenem Lebenszyklus
(geplant → in Bearbeitung → abgeschlossen → Folgereview), die AP2
(Reviewzyklen) und AP4 (Timeline) direkt referenzieren müssen. Eine flache,
global filter-/sortierbare Liste folgt demselben Muster wie `massnahmen[]`
und `parkplatz[]` und lässt sich ohne Sonderfall in Import/Export/Merge/
Versionierung einhängen (`versionableSnapshot()` erfasst sie automatisch
über den Rest-Spread, ohne Codeänderung).

## AP1 — Fälligkeit wird berechnet, nicht gespeichert

Entscheidung:
Es gibt keinen gespeicherten Review-Status "überfällig". Der gespeicherte
Status ist auf `geplant`/`in_bearbeitung`/`abgeschlossen` beschränkt;
Überfälligkeit/baldige Fälligkeit wird bei jedem Rendern aus `geplantAm`
berechnet (`reviewDueInfo()`).

Begründung:
Ein aus einem vorhandenen Datum ableitbarer Fakt darf nicht zusätzlich als
Status persistiert werden — sonst könnten beide auseinanderlaufen (z. B.
wenn die Anwendung nicht geöffnet wird, während ein Termin verstreicht).
Dasselbe Prinzip gilt bereits für `massnahmeIsOverdue()` bei Maßnahmen.

## AP2 — Keine Policy bedeutet keinen erfundenen Termin

Entscheidung:
`process.reviewConfig[reviewart]` ist standardmäßig `null` (auch nach
Migration bestehender Prozesse). `computeNextReviewDate()` liefert in
diesem Fall, bei `ereignisbezogen` und bei ungültigem `individuell`-Wert
konsequent `null` statt eines geschätzten Datums.

Begründung:
Ausdrückliche Vorgabe der Aufgabenstellung. Ein erfundener Termin würde als
scheinbar verlässliche Systemaussage wahrgenommen, obwohl er keine fachliche
Grundlage hat — das wäre irreführender als gar kein Vorschlag.

## AP2 — Policy wird beim Zusammenführen nie automatisch überschrieben

Entscheidung:
`mergeProcessInto()` übernimmt eine importierte Reviewzyklen-Policy je
Reviewart nur, wenn im Ziel noch keine gesetzt ist.

Begründung:
Dieselbe Regel gilt bereits für `minimumCapability.mode` — eine bewusst
getroffene fachliche Entscheidung darf ein additiver Import nie stillschweigend ändern.

## AP1 — Kein Score, keine fachliche Bewertung

Entscheidung:
Die Priorisierung im Review Center (`reviewCenterPriorityList()`) ist eine
reine, nachvollziehbare Sortierung (Überfälligkeitsdauer, dann
Resttage bis fällig, dann Prozessname) — kein gewichteter Score.

Begründung:
Vorgabe der Architekturprinzipien für Version 2.4: keine Blackbox-Scores,
keine fachliche Bewertung von BCM-Entscheidungen des Anwenders. Jede
Position in der Liste muss aus dem Sortierkriterium erklärbar sein.
