# Example: Demo Workbook

[`demo-workbook.json`](demo-workbook.json) is a complete, realistic — but
entirely **fictional** — Business Continuity Management workbook for a made-up
company, "Musterbau GmbH" (a fictional building-materials wholesaler). It
exists purely to demonstrate the application's features with plausible data;
it is not based on any real organization.

## What's in it

- **6 processes**, each fully worked through:
  Auftragserfassung (order intake), Wareneingang (goods receipt),
  Lager & Kommissionierung (warehouse & picking), Einkauf (procurement),
  Rechnungsstellung (invoicing), and IT-Betrieb (IT operations).
- **9 structured dependencies**, declared by five of the six processes
  (IT-Betrieb declares none of its own — it is the hub the others depend on).
  Together these form a multi-step critical chain
  (IT-Betrieb → Auftragserfassung → Lager & Kommissionierung) that the
  executive view detects and reports.
- **11 critical resources** across multiple categories (systems, people,
  suppliers, a service provider, data, a facility, and a communication
  channel), including deliberate single points of failure to demonstrate the
  management view's risk detection.
- **5 measures** in various states (open, in progress, completed with an
  effectiveness review) to populate the measures catalog and its filters.
- Every process has business impact ratings, criticality, recovery
  objectives, a 60-second pitch, and a resilience check filled in — the goal
  is to show every screen with realistic content, not an empty shell.

## How to use it

1. Open `bcm-starter-kit.html`.
2. Click **Import JSON** in the top bar. (Settings offers only the *encrypted*
   import — the plain one lives in the top bar.)
3. Select `demo-workbook.json` and choose **"Vollständig ersetzen"**
   (replace everything) if starting from an empty workbook.
4. Explore the dashboard, individual process records, the dependency cluster
   view, the measures catalog, and the executive view (**GF-Ansicht**) to see
   how they interact.

This file was generated using the application's own data-model functions
(not hand-written JSON) and validated with `validateImportData()` before
being committed, so it matches the current schema version (11).

> **If you are on version 2.1.0 or earlier:** the import will appear to succeed
> but will silently discard all 9 dependencies, so the critical chain above
> will not show up. This was a bug, fixed in 2.2.0 — see `CHANGELOG.md`.

The workbook deliberately contains unresolved findings (data-quality hints and
release blockers about the fictional company). Those are the point — they
demonstrate the management view and the release gate — and are not import
errors.

## A note on regenerating this file

If the data model changes in a future version, this file should be
regenerated (or migrated) rather than hand-edited, to guarantee it stays
schema-valid. See [`docs/architecture.md`](../docs/architecture.md) for how
schema migrations work.
