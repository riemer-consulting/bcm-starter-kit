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
3. **Self-tests pass.** Open the file, press **Ctrl+Alt+T**, confirm all 29
   tests pass (or however many exist at release time — the count is reported
   in the result).
4. **If the schema version changed:** confirm `CURRENT_SCHEMA_VERSION` was
   bumped, a new step was added to `SCHEMA_MIGRATIONS`, and the migration is
   purely additive. Test opening an older-schema file (or a snapshot of one)
   to confirm it migrates cleanly.
5. **No literal `</script>` inside any JavaScript string or comment.** This
   has broken the file before (see `CHANGELOG.md`, v1.6.0) — search the file
   for `</script` and confirm the only match is the real closing tag at the
   end of the file.
6. **The example workbook still imports cleanly.** Import
   `examples/demo-workbook.json` into the new version and confirm it opens
   without errors or warnings.
7. **README and documentation reflect the current feature set.** Skim
   `README.md` and `docs/` for anything that describes removed or changed
   behavior.
8. **LICENSE.txt and NOTICE.txt are unmodified** unless the license itself is
   intentionally changing (which would be a major, deliberate decision, not
   a routine release step).

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
2. Tag the commit: `git tag -a v2.1.0 -m "v2.1.0"` (match the tag to
   `APP_VERSION`, prefixed with `v`).
3. Push the tag: `git push origin v2.1.0`.
4. Create a GitHub Release from the tag, using the corresponding
   `CHANGELOG.md` section as the release notes body, and attach:
   - `bcm-starter-kit.html`
   - the SHA-256 checksum (as text in the release notes, and/or as a
     `.sha256` file attachment)
   - `LICENSE.txt` and `NOTICE.txt` (for convenience; they're also in the
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
- **No automated self-test execution in CI**, as of this writing. The GitHub
  Actions workflow in this repository (`.github/workflows/validate.yml`)
  performs structural checks only (required files present, version markers
  present, no unresolved merge conflict markers) — it does not run the
  in-browser self-test suite, since that currently requires a real browser
  context. Running the self-tests manually before release remains a required
  step in the checklist above. Automating this is a reasonable future
  improvement (see [CONTRIBUTING.md](../CONTRIBUTING.md)) but does not exist
  today — this document describes the process as it actually is, not as it
  might become.
