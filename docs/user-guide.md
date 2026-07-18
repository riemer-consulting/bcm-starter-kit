# User Guide

Complete reference for BCM Starter Kit. For a faster first pass, see the
[Quickstart](quickstart.md) instead.

## Contents

1. [Overview](#overview)
2. [Dashboard](#dashboard)
3. [Process records](#process-records)
4. [Dependency cluster view](#dependency-cluster-view)
5. [Measures catalog](#measures-catalog)
6. [Management (executive) view](#management-executive-view)
7. [Version history](#version-history)
8. [Settings & branding](#settings--branding)
9. [PDF reports](#pdf-reports)
10. [Import & export](#import--export)
11. [Release readiness](#release-readiness)
12. [Workshop mode](#workshop-mode)
13. [Self-tests (advanced)](#self-tests-advanced)

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
as PDF" in the print dialog. Every page carries your organization's name,
workbook version, processing status, export date, and confidentiality label
in a running header, and BCM Starter Kit's own attribution in a running
footer.

## Import & export

- **JSON export** — a complete, human-readable snapshot of your workbook.
- **Encrypted JSON export** — the same snapshot, password-protected with
  AES-GCM (Web Crypto API). The password is never stored anywhere; losing it
  makes the export unrecoverable.
- **Import** — reading a JSON file offers three strategies: replace
  everything, merge with your current workbook, or manually pick which
  processes/resources/measures to bring in. Imported data is validated,
  size-limited, and sanitized before anything is applied.

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
session — answers are saved as you move through the questions.

## Self-tests (advanced)

BCM Starter Kit includes a hidden, integrated self-test suite covering core
logic (time-value parsing, plausibility checks, ID uniqueness, import
validation, schema migration, XSS-safety of known payloads, version
comparison, reference integrity, encrypted export/import round-tripping,
corrupted-data recovery, and permission-denied file saves). It runs entirely
against synthetic data and never touches your actual workbook.

To run it: press **Ctrl+Alt+T** anywhere in the application, or open
`bcm-starter-kit.html#selftest`. This is intended for contributors and
troubleshooting, not everyday use — see [CONTRIBUTING.md](../CONTRIBUTING.md).
