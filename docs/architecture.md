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
  uses AES-GCM with a PBKDF2-derived key, entirely through the browser's
  native Web Crypto API — no cryptography is implemented from scratch.

See [SECURITY.md](../SECURITY.md) for the full picture, including what is
explicitly out of scope.

## Self-tests

A hidden, integrated self-test suite (`runSelfTests()`, reachable via
**Ctrl+Alt+T** or the `#selftest` URL fragment) exercises core logic against
synthetic data only. It is designed so that running it **never mutates the
active workbook** — anywhere a function under test would normally touch
global, non-workbook state (such as the linked-file handle), that state is
saved before the test and restored immediately afterward, including on
failure.

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
