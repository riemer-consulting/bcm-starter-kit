# BCM Starter Kit — Technische Referenz

Diese Seiten richten sich an **Entwickler und technisch interessierte
Leser**: Datenmodelle, interne Funktionsnamen, Schema-Migrationen und
Architekturentscheidungen der mit Version 2.4.0 hinzugekommenen Bereiche.

**Für Anwender ist das die falsche Stelle.** Wenn Sie wissen möchten, *wie
Sie das BCM Starter Kit benutzen*, lesen Sie stattdessen das
[Benutzerhandbuch](../handbook/README.md) — es erklärt jede Funktion in
normaler Sprache, ohne Funktionsnamen oder Datenstrukturen.

## Kapitel

1. [Review Center](review-center.md) — `STATE.reviews[]`, Fälligkeitsberechnung, Priorisierung
2. [Maßnahmenmanagement 2.0](massnahmenmanagement.md) — Herkunftsmodell, Statusmodell, Plausibilitätsprüfungen
3. [BCM Timeline](timeline.md) — Ableitung aus bestehenden Zeitstempeln, `compareVersions()`
4. [Governance Dashboard](governance-dashboard.md) — `computeGovernanceDashboard()`, 11-Stufen-Priorisierung

## Weitere technische Dokumentation

- [Architecture](../architecture.md) — Gesamtarchitektur, Datenmodell aller Bereiche (auch vor 2.4), Schema-Migrationen
- [Release Process](../release-process.md) — Versionierung, Release-Checkliste
- `roadmap/RELEASE_2_4.md`, `roadmap/DECISIONS.md` — Arbeitspaket-Historie und Architekturentscheidungen von Version 2.4.0

## Warum diese Trennung?

Bis einschließlich AP6 lag die einzige Handbuchquelle unter `docs/handbook/`
und vermischte beides: anwenderorientierte Erklärungen und interne
Implementierungsdetails (`STATE.reviews[]`, `sourceType`/`sourceId`,
`computeGovernanceDashboard()` usw.). Für ein echtes Benutzerhandbuch ist
das ungeeignet — ein Anwender braucht die Antwort auf "Wie mache ich das?",
nicht auf "Wie ist das intern gespeichert?". Diese Inhalte bleiben wertvoll,
gehören aber hierher; `docs/handbook/` ist seither ausschließlich
anwenderorientiert.
