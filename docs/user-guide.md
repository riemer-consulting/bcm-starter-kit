# User Guide

Complete reference for BCM Starter Kit. For a faster first pass, see the
[Quickstart](quickstart.md) instead.

## Contents

1. [Overview](#overview)
2. [Dashboard](#dashboard)
3. [Process records](#process-records)
4. [Dependency cluster view](#dependency-cluster-view)
5. [Review Center](#review-center) *(2.4.0-dev)*
6. [Measures catalog](#measures-catalog)
7. [Management (executive) view](#management-executive-view)
8. [Version history](#version-history)
9. [Settings & branding](#settings--branding)
10. [PDF reports](#pdf-reports)
11. [Import & export](#import--export)
12. [Release readiness](#release-readiness)
13. [Workshop mode](#workshop-mode)
14. [Working in more than one browser tab](#working-in-more-than-one-browser-tab)
15. [Keyboard and accessibility](#keyboard-and-accessibility)
16. [Self-tests (advanced)](#self-tests-advanced)

## Overview

BCM Starter Kit organizes your Business Continuity Management work around
**process records** — one per business process you want to protect. Each
record works through the standard BCM lifecycle: describe the process, assess
its impact if disrupted, define what it needs at minimum, identify critical
resources, plan emergency operations, check resilience, and track measures to
close gaps.

Everything else in the application — the dashboard, the executive view, the
PDF reports — is a different lens on the same underlying set of process
records, resources, and measures.

## Dashboard

The landing view. Shows overall counts (processes, critical processes, open
measures, high risks) and quick actions. Use it as a jumping-off point to any
process record or the sample-data loader.

## Process records

Each process record has eight tabs:

| Tab | Purpose |
|---|---|
| **Steckbrief** (fact sheet) | Name, owner, deputy, department, goal, benefit, upstream/downstream context, criticality, maximum tolerable downtime, recovery time/point objectives, structured dependencies to other processes. |
| **60-Sekunden-Vorstellung** (60-second pitch) | A short, plain-language summary suitable for reading aloud in a workshop: what this process does, why it matters, what happens if it fails. |
| **Business Impact** | Impact rating (1–5) across eight categories at five time horizons, each with a description. Produces a weighted score and an automatic criticality suggestion, which is shown alongside — never automatically overwriting — the manually set criticality. |
| **Mindestfähigkeit** (minimum viable capability) | What must keep working, what can run reduced, what can wait. Optionally quantified as a percentage or a concrete quantity + unit + period — never both at once, and never auto-converted between the two. |
| **Kritische Ressourcen** (critical resources) | Resources this process depends on, pulled from the shared, workbook-wide resource pool (see below). |
| **Notbetrieb** (emergency operations) | Trigger, decision authority, communication plan, step-by-step emergency procedure, required documents/contact lists, and return-to-normal plan. Includes a "last tested" date used by the management view's data-quality check. |
| **Resilienz-Check** (resilience check) | A twelve-point checklist (deputy arrangements, documented process, offline materials, alternate suppliers, etc.), each ratable red/yellow/green with a comment. Red items can generate a draft measure with one click. |
| **Maßnahmen** (measures) | Measures scoped to this specific process (see the workbook-wide [Measures catalog](#measures-catalog) for the full picture). |

### Structured dependencies

Rather than free-text descriptions, a process can declare a formal dependency
on another process by ID, tagged `vorgelagert` (upstream) or `nachgelagert`
(downstream). This is what powers cycle detection, contradiction detection,
and the critical-chain analysis in the management view — renaming a process
never breaks the relationship, since it's stored by ID, not by name.

### Critical resources (shared pool)

Resources (people, systems, data, facilities, equipment, suppliers, and more)
live in a single workbook-wide pool and are linked to whichever processes
depend on them. Each resource can record an owner, provider/contract
reference, a structured recovery requirement, an availability requirement, a
fallback test date and result, a single-point-of-failure flag, a data
classification, and whether it involves personal data (never mandatory).
Recommended fields vary by resource category but are never enforced.

## Dependency cluster view

A workbook-wide view of how resources and dependencies connect processes to
each other — useful for spotting resources used by many processes at once,
and potential duplicate resource entries (detected by name similarity).

## Review Center

*(Version 2.4.0-dev, under active development — not yet part of a stable release.)*

The Review Center answers one question: **what does the person responsible
for BCM need to do next?** It does not judge whether your BCM decisions are
correct, sufficient or effective — it only tracks planning and due dates.

A **review** is a concrete work/history record, not a template: it records a
process, a review type (process review, BIA review, emergency-operations
review, or resource review), planned/started/completed dates, an owner,
a status (`planned` / `in progress` / `completed`), a result, the next
review date, and links to measures that came out of it.

Due dates are always **computed**, never stored as a separate status: a
review becomes "overdue" purely because its planned date has passed and it
isn't completed yet; "upcoming" means it falls due within the next 30 days.
There is no fourth status value for this — it would duplicate information
already implied by the planned date.

The Review Center view shows:
- how many reviews are overdue and how many are upcoming;
- which **critical processes have no review planned at all** (of any type);
- a single, deterministically ordered "what's next" list — overdue reviews
  first (longest overdue first), then upcoming reviews (soonest first), then
  critical processes without any review planning. Every position in that
  list follows directly from its sort key; there is no hidden scoring.

From a review you can start it, complete it (recording a result and,
optionally, the next review date), or create a linked measure directly. Each
process record also shows a compact review history in its Measures tab, with
a link back to the full Review Center.

### Review cycles per review type

Each review type can have its own optional review-cycle policy, set per
process (in the process record's Measures tab, next to its review history):
3, 6, 12 or 24 months, a custom number of months, or "event-driven" (no
fixed interval at all — the emergency-operations review type typically uses
this). **If no policy is set for a review type, the application never
invents a due date.** Different review types on the same process can be on
entirely different cycles and can be open at the same time.

When you complete a review whose type has a policy, the completion dialog
suggests the next due date and offers to create the follow-up review
directly, already planned.

## Measures catalog

All measures across the whole workbook, filterable by status, priority,
effort, owner, and an "overdue only" toggle. Each measure can track effort
level, cost estimate, risk before/after, a decision requirement with an
approver, evidence of implementation, and an effectiveness review date.
Overdue measures and measures marked complete without an effectiveness
review are visually flagged throughout the application.

## Management (executive) view

Opened via **GF-Ansicht** in the sidebar. This is the decision-oriented
summary, in two parts:

1. **A compact overview** at the top: six clickable status figures
   (workbook status, data completeness, number of critical processes, time
   value conflicts, open high-priority measures, overdue measures),
   structured top risks, data-quality warnings, and open decision points.
   **Data-quality gaps are always shown separately from confirmed risks** —
   an unfilled field is never presented as if it were a validated finding.
2. **Full detail** below it: per-process status with reasons, dependency
   analysis (most-connected processes, possible single points of failure,
   multi-step critical chains), resource-dependency analysis, and a
   workbook-wide maturity indicator.

## Version history

Save a named version at any point (**Version speichern**). Every version is
checksummed and can be compared against any other version to see exactly
what changed — process additions/removals, criticality changes, time-value
changes, BIA changes, and measure changes. Versions can be restored, which
itself creates a new version first so the history is never lost.

## Settings & branding

- **Kunde & Branding:** your organization's name, processing status,
  confidentiality label (shown on every PDF page), logo, and accent color.
  A logo you upload here always takes priority over the default BCM Starter
  Kit branding wherever your organization's branding is shown.
- **Datei-Verknüpfung:** link/unlink a file on disk (Chromium browsers only —
  see [Data Storage & Privacy](data-storage-and-privacy.md)).
- **Wiederherstellung und Sicherungen:** recovery of corrupted data and
  access to the five most recent automatic backups.
- **Über & Lizenz:** version, schema version, and license information, and a
  link to the full license text and the About dialog.

## PDF reports

Four scopes are available: a short executive summary, the full detailed
report, a measures-only report, or a single process record. All generation
happens client-side via your browser's native print function — choose "Save
as PDF" in the print dialog.

Every section carries your organization's name, workbook version, processing
status, export date, and confidentiality label in a header, and BCM Starter
Kit's own attribution in a footer. The cover page shows the same details in
full instead.

Reports containing more than one section additionally get a **table of
contents**, and each section's footer is marked **"Abschnitt X von Y"**
(section X of Y). There are deliberately no page numbers: browsers do not
support the CSS features needed to render the printer's own page count, and the
number of sheets also depends on the paper size and the scaling factor you
choose in the print dialog — so any number printed into the document would
regularly be wrong. Section numbering gives you the thing page numbers are
usually wanted for here (noticing that a sheet is missing) and is always
correct. If you do want sheet numbers, enable **"Headers and footers"** in your
browser's print dialog; the browser adds them itself.

## Import & export

- **JSON export** — a complete, human-readable snapshot of your workbook.
  Available as **Export JSON** both in the top bar and in Settings.
- **Encrypted JSON export** — the same snapshot, password-protected with
  AES-GCM (Web Crypto API), under **Settings → Verschlüsselter Export**. The
  password is never stored anywhere; losing it makes the export unrecoverable.
  A minimum of 12 characters is required, and you get feedback on password
  quality as you type. Files exported by earlier versions can still be opened.
- **Import** — **Import JSON** in the top bar. (Settings offers only the
  *encrypted* import; the plain one lives in the top bar.) Reading a JSON file
  offers three strategies: replace everything, merge with your current
  workbook, or manually pick which processes/resources/measures to bring in.
  Imported data is validated, size-limited, and sanitized before anything is
  applied, and you get a summary of anything that was repaired or dropped.

  Structured dependencies are carried over on all three paths, including when
  an imported process has to be given a new ID — in which case the references
  are rewritten to match. A dependency pointing at a process that isn't part of
  the import is removed rather than guessed at, and reported. (In version 2.1.0
  dependencies were lost entirely on import without any message; if you
  exchanged workbooks using 2.1.0 or earlier, re-check the dependencies of the
  imported processes.)

## Release readiness

Changing the processing status to **"Zur Freigabe"** ("Ready for approval")
or **"Freigegeben"** ("Approved") triggers a readiness check against a
centrally defined set of criteria — some are hard blockers (missing required
fields, unresolved time-value conflicts, critical processes without an
emergency plan, and others), some are warnings that can be accepted with a
documented justification (reviewer name and reason). A successful approval
automatically creates a new, immutable version.

## Workshop mode

A guided, large-text question sequence for one process at a time, intended
for use on a shared screen or projector during a facilitated workshop
session — answers are saved as you move through the questions. Note that this
walks through **one process**, not the whole workbook: switch process using the
selector at the top left, and close the mode with **Escape** or the close
button.

## Working in more than one browser tab

The browser's storage belongs to the browser profile, not to a tab — so two
tabs showing the same workbook write to the same place. If another tab saves
while you have this one open, a notice appears offering two choices: load the
other tab's version, or keep yours and overwrite theirs. Whichever you pick,
the version being discarded is backed up automatically first (**Settings →
Wiederherstellung und Sicherungen**), so a wrong choice is recoverable. The
two versions are not merged automatically — the application has no way to know
which one is right. The simplest way to avoid the situation is to keep the
workbook open in a single tab.

## Keyboard and accessibility

The application is operable by keyboard: everything clickable is a real
control, so Tab moves between them and Enter or Space activates them. Dialogs
place the focus inside themselves when they open, keep Tab within the dialog,
close on **Escape**, and return the focus to wherever it was. The executive
view and workshop mode behave the same way. Form fields are associated with
their labels, so clicking a label focuses its field and screen readers announce
the field by name. Where a status is shown by colour (traffic lights,
criticality dots, progress bars), the same information is also available as
text.

Being straightforward about the limits: this covers labelling, keyboard
operability, dialog semantics and focus handling. It has **not** been tested
with real screen-reader software, and no formal WCAG conformance assessment has
been carried out — so this section describes what was implemented, not a
certified level. The interface is also built for desktop screen sizes and is
not adapted for small mobile screens. Reports of specific problems with
assistive technology are welcome (see [SUPPORT.md](../SUPPORT.md)).

## Self-tests (advanced)

BCM Starter Kit includes a hidden, integrated self-test suite of 88 tests
covering core logic (time-value parsing, plausibility checks, ID uniqueness,
import validation and field-completeness, structured dependencies and
multi-step chains, schema migration without data loss, import/export
round-tripping, the release readiness gate, XSS-safety of known payloads,
version comparison, reference integrity, encrypted export/import
round-tripping including files from earlier versions, PDF structure, basic
accessibility invariants, corrupted-data recovery, and permission-denied file
saves). It runs entirely against synthetic data and never touches your actual
workbook.

Each test is marked critical or non-critical. A failing critical test also
blocks setting the workbook status to "Approved".

To run it: press **Ctrl+Alt+T** anywhere in the application, or open
`bcm-starter-kit.html#selftest`. This is intended for contributors and
troubleshooting, not everyday use — see [CONTRIBUTING.md](../CONTRIBUTING.md).
