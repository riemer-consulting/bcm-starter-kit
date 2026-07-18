# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [2.1.0] — Repository & Open Source Finalization

### Added
- Complete GitHub repository structure: `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md`, documentation set under `docs/`, a fictional demo workbook under `examples/`, and GitHub issue/PR templates and a validation workflow under `.github/`.

### Changed
- No changes to application behavior. This release is documentation and repository packaging only.

## [2.0.2] — Branding & Open Source

### Added
- Official project branding: horizontal logo as the default for the sidebar, startup screen, About dialog, PDF cover page, and the default branding of new workbooks (`defaultMeta()` fallback). A customer's own uploaded logo continues to take precedence wherever one is set.
- Square icon mark as favicon and Apple touch icon.
- New **About dialog** showing logo, app version, data schema version, license, copyright, original author, and project website.
- Attribution surfaced consistently in the About dialog, the sidebar footer, Settings ("About & License"), the footer of every generated PDF page, the file header comment, and — as four additive metadata fields (`createdWith`, `edition`, `originalAuthor`, `projectWebsite`, `license`) — in every new JSON export. These fields do not affect the data model; older files and files without them import unchanged.

### Changed
- The project's previous custom terms of use were fully replaced by the unmodified **Apache License, Version 2.0**, including the standard "how to apply" boilerplate and a project-specific NOTICE section per License §4(d). The in-app acknowledgment version was bumped so existing users see and accept the new license once.

## [2.0.1] — Documentation Accuracy Correction

### Fixed
- A prior claim of "100% JSDoc coverage" (2.0.0) was based on an overly loose check (any comment counted). A stricter, automated audit against real `/** */` blocks with complete `@param`/`@returns` tags found only 91 of 220 top-level functions and 9 of 84 `App.*` methods were actually fully documented. All 220 functions and all 84 methods now carry complete JSDoc.

## [2.0.0] — Release Engineering Pass

Technical and editorial finalization pass. No new features.

### Added
- JSDoc documentation across the codebase (documentation completeness was later found incomplete and corrected in 2.0.1 — see above).

### Changed
- Consolidated six duplicated option-list generators, three duplicated time-unit generators, three duplicated dependency-graph builders, three duplicated filename helpers, three duplicated import-feedback call sites, and three duplicated percentage/quantity checks into shared helper functions.
- Renamed `App.removeResource` / `App.removeMassnahme` to `App.deleteResource` / `App.deleteMassnahme` for consistency with the project's existing naming convention (`delete` for confirmation-gated destructive actions, `remove` for simple list removal).
- Consolidated three hardcoded color values into an existing CSS design token.

### Removed
- Two functions that were never called anywhere in the application, and two unused CSS classes, identified through automated cross-reference analysis.

### Fixed
- Standardized the wording of an existing silent `catch` block to match the project's established convention of always explaining why an error is intentionally ignored.
- Closed a gap in the version history: v1.1.0 was missing from the in-file changelog (it previously existed only in a header comment that had since been removed).

## [1.6.0] — Measures, Management View, Release Gate, Self-Tests

### Added
- Measures extended with effort level, cost estimate, risk before/after, decision requirements, approver/approval date, evidence, and effectiveness review fields; a benefit/effort matrix; new catalog filters (effort, owner, overdue only); and visual flags for overdue or effectiveness-unverified measures.
- A compact, decision-oriented management overview at the top of the executive view: six clickable KPIs, structured top risks, data-quality warnings kept clearly separate from confirmed risks, and structured decision points. Existing detailed sections remain available below it.
- A genuinely compact PDF executive summary for the short report, replacing the full management summary that had grown too long for that purpose over time. Every PDF page now carries the workbook name, version, status, export date, and a configurable confidentiality label.
- `releaseReadinessCheck()` with centrally configurable blocking vs. warning criteria. Moving to "Ready for approval" / "Approved" now shows a readiness report; blockers prevent the transition entirely, warnings can only be accepted with a documented justification (reviewer, date, reason). A successful approval automatically creates a new, immutable version.
- A hidden, integrated self-test suite (29 tests, reachable only via a keyboard shortcut or URL fragment) covering time-value parsing, plausibility checks, ID uniqueness, import validation, schema migration, XSS test values, version comparison, resource/measure reference integrity, encrypted export/import, corrupted-data recovery, and permission-denied file saves — using only synthetic data, never touching the active workbook. Approval is additionally blocked if any critical self-test fails.

### Changed
- Data schema extended by three additive migration steps (now 11 steps total since schema version 1).

## [1.5.2] — Dependency Chain Direction Fix

### Fixed
- The arrow direction shown for critical dependency chains and direct critical dependencies was inverted relative to the actual flow of impact: a stored "A depends on B" reference was displayed as "A → B" even though the operational flow runs from B to A. Output now correctly reads "upstream process → dependent process". Redundant sub-chains that are already fully contained within a longer chain are no longer listed separately.

## [1.5.1] — Targeted Follow-ups to 1.5.0

### Fixed
- Recovery time/point objective parsing no longer guesses a unit for bare numbers (e.g. "4"); an explicit unit is now required, otherwise the value is kept for manual review instead of being silently interpreted as hours.
- Minimum viable capability now has an explicit `mode` (percentage / quantity / description) instead of allowing both a percentage and a quantity to be set ambiguously; legacy data with both values set is flagged for a clear, mandatory choice rather than having a value silently discarded.
- "Critical chains" previously meant simple two-process pairs, which is not a chain in any meaningful sense. Chain detection now performs genuine multi-step path analysis (three or more consecutive critical processes, cycle-safe); direct two-process relationships are now reported separately and honestly labeled.

## [1.5.0] — Business Continuity Data Model Package

### Added
- Structured recovery time/point objectives (numeric value + unit instead of free text), with automatic migration of unambiguous legacy values and manual-review flagging of ambiguous ones.
- A criticality-vs-impact-analysis comparison that surfaces disagreement between a process's manually assigned criticality and the criticality suggested by its impact scores, without ever overriding the manual value.
- Structured, ID-based process dependencies (replacing free text) with detection of self-references, duplicates, references to deleted processes, contradictory relationships, and cycles.
- Extended resource fields: owner, provider, structured recovery requirement, availability requirement, fallback test date/result, single-point-of-failure flag, data classification, and a personal-data flag (never mandatory).
- Optional, structured minimum viable capability (percentage, or quantity + unit + period), never mandatory and never auto-converted between the two.

## [1.4.1] — Post-Release Fixes for 1.4.0

### Fixed
- **Critical:** the schema migration function could incorrectly report success even when a migration step was missing; it now always reports failure unless every step ran and the result exactly matches the current schema version.
- Automatic backups now report structured success/failure instead of a silent boolean; every destructive action requires explicit confirmation if its pre-action backup failed.
- Legacy version snapshots that recursively embedded the entire version history (a since-fixed growth bug) are now cleaned up on load, with an automatic backup taken first.
- Import references to a process ID that appears more than once are no longer silently assigned to the first match; they are flagged as ambiguous and shown in a dedicated review list instead.

## [1.4.0] — Technical Hardening

### Added
- Independently tracked browser vs. linked-file save status.
- Schema versioning with stepwise, chainable migrations; unrecognized newer schemas are not opened blindly.
- Recovery flow for corrupted or unrecognized locally stored data: raw data is preserved (never overwritten), and a conservative recovery attempt only recovers fully parseable sub-structures.
- Five rotating automatic backup slots, taken before import, version restore, deletion/cleanup, and schema migration.
- Hardened import validation: size limits, recursive removal of dangerous object keys, ID uniqueness checks, reference validation, and enum value validation.
- Centralized safe-output helpers for DOM text and attributes; logo URLs restricted to safe protocols.
- IDs now generated with `crypto.randomUUID()` (with a `crypto.getRandomValues()` fallback) instead of `Math.random()`.
- Version entries extended with provenance, app/schema version, and a SHA-256 checksum; a version comparison view highlights what changed between two versions.

### Fixed
- Three real, previously unnoticed XSS vulnerabilities (unescaped process names in the resource view, the dependency cluster view, and PDF output).
- Version snapshots previously embedded the entire prior version history recursively, causing exponential data growth and crashes after a handful of saved versions.
- An infinite loop between checksum refresh and version-history re-render when all checksums were already cached.

## [1.3.1]

### Added
- Terms-of-use acknowledgment flow with a startup-screen summary that must be confirmed once; the full text remains available from Settings and the sidebar at any time. Acknowledgment resets when the workbook is cleaned for handoff or fully erased, so subsequent recipients see it too.

## [1.3.0]

### Added
- A two-level status indicator, at both the individual-process and whole-workbook level, visible in the executive view and dashboard.
- File-based storage via the File System Access API (Chromium-based browsers): open, save, and save-as write directly to a user-chosen file, with autosave keeping it in sync. A full `localStorage`-based fallback remains available for other browsers.

## [1.2.0]

### Added
- Weighted business impact analysis scoring.
- Recovery time objective / recovery point objective plausibility checks against maximum tolerable downtime.
- Measure quality checks, resource duplicate detection, and resilience-check recommendations per checklist item.
- An expanded management summary (decision points, maturity level, top risks) reused automatically in the executive view and PDF summary.
- XSS hardening for inline event handlers.
- Optional password-protected JSON export/import (PBKDF2 + AES-GCM via the Web Crypto API).
- More robust PDF output and import validation.

## [1.1.0]

### Fixed
- The "60-second pitch" process tab returned no content when navigated to directly (a missing return statement).

## [1.0.0] — Initial Release

### Added
- Process records, business impact analysis, minimum viable capability, critical resources, emergency operations, resilience check, measures, version history, JSON import/export, executive view, workshop mode, and PDF export.

[2.1.0]: #
[2.0.2]: #
[2.0.1]: #
[2.0.0]: #
[1.6.0]: #
[1.5.2]: #
[1.5.1]: #
[1.5.0]: #
[1.4.1]: #
[1.4.0]: #
[1.3.1]: #
[1.3.0]: #
[1.2.0]: #
[1.1.0]: #
[1.0.0]: #
