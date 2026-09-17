# Release Process

BCM Starter Kit has no build step, so "release" mostly means: verify, version,
tag, and publish a single file. This document describes the full process, for
maintainers and for anyone who wants to understand how a release is put
together.

## Versioning

The project follows [Semantic Versioning](https://semver.org/):

- **Major** (`X.0.0`) — a breaking change to the data model that cannot be
  migrated automatically, or a fundamental change in how the application is
  distributed or licensed. Expected to be extremely rare.
- **Minor** (`x.Y.0`) — new, backward-compatible functionality, including new
  additive schema migration steps.
- **Patch** (`x.y.Z`) — bug fixes, documentation, and packaging changes with
  no functional impact.

The authoritative version number lives in exactly one place: the
`APP_VERSION` constant inside `bcm-starter-kit.html`. The top-of-file HTML
comment intentionally does not duplicate it — see the comment there for why.
`CHANGELOG.md` must always be updated in the same commit that bumps
`APP_VERSION`.

## Pre-release checklist

Before tagging a release, verify all of the following:

1. **`APP_VERSION`** in `bcm-starter-kit.html` matches the version being
   released.
2. **`CHANGELOG.md`** has an entry for the new version, dated, with the
   correct category (Added / Changed / Fixed / Removed / Security).
3. **Self-tests pass.** Open the file, press **Ctrl+Alt+T**, and confirm all
   integrated self-tests pass. The suite reports its own current total in the
   result — this document deliberately does not hard-code that number, since
   it grows with every release and a fixed count here would just go stale
   again. No critical test may fail; the release readiness check in the
   application itself also blocks approval if one does.
4. **If the schema version changed:** confirm `CURRENT_SCHEMA_VERSION` was
   bumped, a new step was added to `SCHEMA_MIGRATIONS`, and the migration is
   purely additive. Test opening an older-schema file (or a snapshot of one)
   to confirm it migrates cleanly.
5. **No literal `</script>` inside any JavaScript string or comment.** This
   has broken the file before (see `CHANGELOG.md`, v1.6.0) — search the file
   for `</script` and confirm the only match is the real closing tag at the
   end of the file.
6. **The example workbook still imports cleanly and completely.** Import
   `examples/demo-workbook.json` into the new version and confirm the import
   reports no errors and no warnings. Then confirm the *content* actually
   arrived: 6 processes, 11 resources, 5 measures, and **9 structured
   dependencies** spread over 5 processes. Counting the dependencies matters —
   they were silently dropped on import in 2.1.0 and nothing in the import
   feedback revealed it (see `CHANGELOG.md`, 2.2.0). The dependency cluster
   view should show one critical chain (IT-Betrieb → Auftragserfassung →
   Lager & Kommissionierung).
   Note that the demo workbook deliberately produces 5 *data-quality* hints
   and 1 release blocker (an unjustified criticality deviation) — those are
   business findings about the fictional company, not import problems, and
   are expected. (Corrected in 2.4.0-dev/AP6 — this count had drifted out of
   sync with the actual demo data; re-verify it by hand if the demo workbook
   itself changes, since unlike the self-test count above, this one is not
   self-reporting.)
7. **README and documentation reflect the current feature set.** Skim
   `README.md` and `docs/` for anything that describes removed or changed
   behavior.
8. **`LICENSE` and `NOTICE` are unmodified** unless the license itself is
   intentionally changing (which would be a major, deliberate decision, not
   a routine release step). Note the filenames have no extension — links
   written as `LICENSE.txt`/`NOTICE.txt` are broken and were corrected in
   2.2.0.
9. **Encrypted files from the previous release still open.** Export an
   encrypted workbook with the *previous* release, then open it with the new
   one. This is covered by a self-test for the v1 payload format, but the
   guarantee is important enough to confirm by hand whenever anything in
   `deriveAesKey()`, `encryptWorkbookJson()`, `decryptWorkbookJson()` or
   `kdfIterationsForPayload()` changes: a lost password is unrecoverable by
   design, so an unreadable file is unrecoverable data.

## Producing the release artifact

There is nothing to build. The release artifact **is**
`bcm-starter-kit.html`, taken as-is from the repository at the tagged commit.

Generate a checksum so downstream users can verify integrity:

```sh
sha256sum bcm-starter-kit.html
```

Include this checksum in the GitHub release notes.

## Tagging and publishing

1. Commit the version bump and changelog entry.
2. Tag the commit: `git tag -a vX.Y.Z -m "vX.Y.Z"` (match the tag to
   `APP_VERSION`, prefixed with `v`).
3. Push the tag: `git push origin vX.Y.Z`.
4. Create a GitHub Release from the tag, using the corresponding
   `CHANGELOG.md` section as the release notes body, and attach:
   - `bcm-starter-kit.html`
   - the SHA-256 checksum (as text in the release notes, and/or as a
     `.sha256` file attachment)
   - `LICENSE` and `NOTICE` (for convenience; they're also in the
     repository)

## Post-release

- Confirm the GitHub social preview image (`assets/social-preview.png`) is
  set under **Settings → General → Social preview** if it hasn't been
  already — this only needs to be done once, not per release, unless the
  image itself changes.
- Announce the release wherever relevant (repository Discussions, if
  enabled; the project website).

## What this process deliberately does not include

- **No automated build or bundling** — there is nothing to bundle.
- **No automated deployment** — there is no server to deploy to; the "release"
  is the file itself.
- **No CI of any kind.** There is no `.github/` directory in this repository:
  no GitHub Actions workflow, no structural validation, no automated
  self-test execution, and no issue or pull request templates. Earlier
  versions of this document and of `CHANGELOG.md` described a
  `.github/workflows/validate.yml` performing structural checks — **that file
  has never existed here.** The claim was corrected in 2.2.0.

  Everything in the pre-release checklist above is therefore a manual step.
  Running the in-browser self-test suite automatically would need a real
  browser context (headless Chrome or similar), which is entirely feasible and
  is a reasonable future improvement, but nothing of the sort is in place
  today. This document describes the process as it actually is, not as it
  might become.
