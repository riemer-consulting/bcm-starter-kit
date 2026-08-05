# Architecture

This document describes how BCM Starter Kit is built internally. It is aimed
at contributors and anyone evaluating the codebase, not end users — see the
[User Guide](user-guide.md) for that.

Everything described here reflects the actual, current implementation in
`bcm-starter-kit.html`. Where useful, function names are given so you can
find the relevant code directly.

## Single-file concept

The entire application — markup, styles, and logic — lives in one HTML file
with no external dependencies, no build step, and no server component. This
is a deliberate design choice: the deployment artifact *is* the file. Copying
it, emailing it, or checking it into a private repository is the entire
distribution mechanism.

The trade-off is that the file is large and everything lives in one global
scope. This is considered acceptable given the goal (maximum portability,
zero installation) and is not expected to change.

## State (`STATE`)

A single, centrally defined JavaScript object holds the entire workbook:

```
STATE = {
  schemaVersion: number,
  meta: { kundenname, logo*, accent, bearbeitungsstand, version,
          vertraulichkeit, releaseWarningAcceptances[] },
  processes: [ { id, steckbrief, sixty, bia, minfaehigkeit, notbetrieb,
                 resilienz[], dependencies[], createdAt } ],
  resources: [ { id, name, kategorie, kritikalitaet, prozesse[],
                 alternative, recoveryRequirement, singlePointOfFailure, ... } ],
  massnahmen: [ { id, titel, prozessId, kategorie, prioritaet, aufwand,
                  status, entscheidungsbedarf, wirksamkeitGeprueftAm, ... } ],
  versions: [ { nr, datum, bearbeiter, notiz, snapshot, source,
                appVersion, schemaVersion, checksum } ],
  ui: { route, processId, processTab }   // not persisted
}
```

Factory functions (`newProcess()`, `newResource()`, `newMassnahme()`,
`defaultMeta()`, `defaultState()`) define the canonical shape of each record
type and are the single source of truth for what fields exist.

## Rendering

Rendering is plain HTML string generation — there is no virtual DOM and no
diffing. `render()` rebuilds the `#app` container's `innerHTML` from
`STATE.ui` on essentially every state-changing action. This is simple and
predictable at the cost of not being the most performance-optimal approach
possible; given the data volumes involved (a BCM workbook, not a
high-frequency data stream), this has not been a practical problem.

Routing is a plain object (`STATE.ui.route` / `processId` / `processTab`)
rather than URL-based, since the whole application is a single file with no
server to route against.

## Persistence

Two independent persistence targets are tracked and reported separately via
`SAVE_STATUS`:

1. **Browser local storage**, always active, written via a debounced
   `autosave()` (500ms).
2. **A linked file on disk**, optional, available in Chromium-based browsers
   via the File System Access API. When linked, every change is written to
   the same file automatically. See
   [Data Storage & Privacy](data-storage-and-privacy.md) for what this means
   in practice.

Neither path involves a server or any network request.

Browser storage is shared per origin, which means two tabs with the same
workbook write to the same place. Until 2.2.0 that meant "last writer wins"
with no indication anything had been lost. `watchForeignTabWrites()` now
listens for the `storage` event — which fires only in *other* tabs — and
surfaces the conflict when another tab has actually written. Detection is
deliberately event-based rather than a heartbeat: it reports a real conflict
instead of warning pre-emptively about any second open tab, which would produce
false alarms and train people to ignore the warning. Resolution is left to the
user (both options back up the discarded version first); the application does
not attempt an automatic merge, because it has no basis for deciding which
version is correct.

## Schema versioning and migration

`STATE.schemaVersion` is versioned independently of `APP_VERSION` (the
human-readable release number). Every structural change to the data model
that has ever shipped is captured as one function in the `SCHEMA_MIGRATIONS`
registry, mapping schema version *N* to a migration function that produces
version *N+1*. `migrateWorkbook()` chains these automatically when an older
file is opened, and — critically — **never reports success unless every
required step ran and the result exactly matches `CURRENT_SCHEMA_VERSION`**.
A file with a newer, unrecognized schema version is refused rather than
opened blindly.

Every migration step is designed to be strictly additive: existing data is
preserved, ambiguous legacy values are preserved for manual review rather
than guessed at, and no migration step silently discards information.

## Security model

- **Output escaping.** All values that could originate from user input or an
  imported file and end up in HTML go through `escapeHtml()`,
  `safeAttribute()`, `safeUrl()`, or `safeJsString()` depending on context.
- **Import hardening.** `validateImportData()` enforces size limits, strips
  dangerous object keys recursively (prototype pollution defense), checks ID
  uniqueness, validates enum fields against allowed values, and repairs or
  rejects structurally invalid data before anything reaches `STATE`.
- **Safe URL schemes.** Logo URLs and similar user-supplied links are
  restricted to `https:`, `http:`, and `data:image/*`.
- **Cryptography.** ID generation uses `crypto.randomUUID()` with a
  `crypto.getRandomValues()`-based fallback. The optional encrypted export
  uses AES-GCM with a PBKDF2-derived key (SHA-256, 600,000 iterations, fresh
  salt and IV per export), entirely through the browser's native Web Crypto
  API — no cryptography is implemented from scratch.

  Since 2.2.0 the encrypted payload **declares its own KDF parameters**
  (`version: 2` plus a `kdf` block). This exists so that the iteration count
  can be raised again in future without making previously exported files
  unreadable: `kdfIterationsForPayload()` reads the parameters from the file,
  falling back to the historical 250,000 for payloads in the v1 format that
  predate the block. Declared values outside a plausible range are rejected,
  so a manipulated file can neither weaken key derivation nor stall the
  browser with an absurd iteration count. Changing the parameters is
  intentionally a one-constant change (`PBKDF2_ITERATIONS`) — that is the
  designated extension point.

See [SECURITY.md](../SECURITY.md) for the full picture, including what is
explicitly out of scope.

## Import fidelity

`validateImportData()` derives the set of process fields it carries over from
`newProcess()` rather than enumerating them. This is deliberate and load-
bearing: until 2.2.0 the fields *were* enumerated separately, `dependencies`
was missing from that list, and every import silently discarded all structured
process dependencies. Nothing failed — the import reported success, and every
analysis built on dependencies simply found none.

The lesson generalises beyond that one field: **a list of field names kept in
parallel to the factory function will drift, and when it drifts the failure
mode is silent data loss rather than an error.** If you add a field to the data
model, do not add it to an import list; make sure it comes from the factory
function. The self-test *"Import erhält ALLE in newProcess() definierten
Prozessfelder"* compares the imported record's key set against `newProcess()`
precisely so that a future field is covered without anyone remembering to
extend a test.

## PDF output

Reports are assembled by `pdfSections()` into a list of `{title, render}`
descriptors, which `buildPrintRoot()` then renders into `#print-root` for the
browser's own print function. Splitting the outline from the rendering means
the table of contents and the section numbering come from one source and
cannot disagree.

There are deliberately **no page numbers**. Real ones would have to come from
the printer's pagination: the CSS margin boxes needed for that
(`@page { @bottom-center { content: counter(page) } }`) are not supported by any
mainstream browser, and the page count also depends on paper size, margins and
the scaling factor the user only picks *in* the print dialog. A number rendered
into the document would therefore be wrong routinely, and a wrong page number
in an audit record is worse than none. What the application does control is its
own sections, so those are numbered ("Abschnitt X von Y") and listed in a table
of contents — which is what page numbers are actually wanted for in this
context. See the comment block at `pdfSectionLabel()`.

## Accessibility

Because the UI is built by string concatenation, accessibility is handled at
the few places that generate markup rather than at each call site:

- `fieldInput()` and `structuredTimeFieldHtml()` emit `label for=`,
  `aria-describedby` for hints and `aria-required` themselves.
- `associateOrphanLabels()` runs after every `render()` (and on every modal)
  as a safety net: it links any `<label>` that still lacks a `for=` to the
  single form control in its `.field` container. It deliberately does nothing
  when a container holds more than one control — a guessed association is
  worse than none, so those groups are named via `role="group"` +
  `aria-label` at their call site instead.
- `openModal()`/`closeModal()` and `mountOverlay()`/`App.closeOverlay()`
  implement dialog semantics: role, accessible name from the dialog's heading,
  focus moved in, focus returned to the triggering element, Escape to close,
  and (for modals) a Tab/Shift+Tab focus cycle.
- Anything clickable is a `<button>`, not a `div` with an `onclick`. The CSS
  resets restore the previous appearance, so this is not a visual change.

`aria-current` is used for the sidebar navigation and the process tabs rather
than a `role="tab"` pattern, because arrow-key navigation between them does not
exist — announcing a role whose expected keyboard behaviour is absent misleads
more than saying nothing.

What has **not** been done: testing with real screen readers, and any formal
WCAG conformance assessment. The self-tests cover the two invariants that are
machine-decidable (every field has an associated label; no clickable element
lacks keyboard access) — they do not establish conformance.

## Self-tests

A hidden, integrated self-test suite (`runSelfTests()`, 57 tests, reachable via
**Ctrl+Alt+T** or the `#selftest` URL fragment) exercises core logic against
synthetic data only. It is designed so that running it **never mutates the
active workbook** — anywhere a function under test would normally touch
global, non-workbook state (such as the linked-file handle, or `STATE` itself
via the `withSyntheticState()` helper), that state is saved before the test and
restored immediately afterward, including on failure.

Tests are marked critical or non-critical; a failing critical test also blocks
approval in `releaseReadinessCheck()`. There is no CI runner — see
[Release Process](release-process.md).

## Release readiness check

`releaseReadinessCheck()` evaluates the current workbook against a centrally
defined table of criteria (`RELEASE_CHECK_CONFIG`), each marked as either a
hard blocker or an acceptable-with-justification warning. This gates the
transition to the "Ready for approval" / "Approved" processing status in the
UI (see the User Guide's [Release readiness](user-guide.md#release-readiness)
section). A successful approval automatically creates a new, checksummed,
immutable version — approval is not merely a label change.

## Why "functionally complete"

The application went through a long, staged development process (see
[CHANGELOG.md](../CHANGELOG.md) for the full history) that deliberately
worked through hardening, data-model, management-reporting, and release-
governance concerns in sequence, each verified against a behavioral baseline
before moving on. The result is treated as a complete, coherent whole rather
than a base to keep extending indefinitely — see the Roadmap section of the
[README](../README.md) and [CONTRIBUTING.md](../CONTRIBUTING.md) for what
that means for future contributions.
