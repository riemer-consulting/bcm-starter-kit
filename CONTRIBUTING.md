# Contributing to BCM Starter Kit

Thank you for considering a contribution. This document explains how the project is structured, what kinds of changes are welcome, and how to submit them.

## Before you start: read this carefully

BCM Starter Kit is considered **functionally complete**. This is a deliberate project decision, not an oversight. The application went through a structured, staged development process, and its data model, schema migration chain, and self-test suite are treated as a stable contract that existing users' workbooks depend on.

As a result:

- **Business-logic (fachlich) changes are the exception, not the norm.** Do not open a pull request that adds a new BCM feature, field, or workflow without first opening an issue to discuss it. Most such proposals will be declined — not because they are bad ideas, but because expanding scope indefinitely is exactly what this project has chosen not to do.
- **Bug fixes, documentation, accessibility, and translation contributions are very welcome.**
- **Changes to the data model or schema version are a big deal.** If your change touches `STATE`, adds or removes a field read/written by `persistableSnapshot()`, or requires a new schema migration step, expect a thorough review and possibly a request to reconsider the approach.

## Project structure

The entire application lives in a single file: [`bcm-starter-kit.html`](bcm-starter-kit.html). There is no build step — you edit the file directly and open it in a browser to test. See [`docs/architecture.md`](docs/architecture.md) for how the application is organized internally (state management, rendering, persistence, schema migrations).

## Coding style

- Match the existing style: plain JavaScript (no framework, no transpilation), HTML built via string concatenation, and CSS using the existing design tokens (CSS custom properties defined near the top of the `<style>` block).
- Every top-level function and every `App.*` method must carry a JSDoc comment (`/** ... */`) with a description, `@param` for every parameter, and `@returns` (use `@returns {void}` if nothing is returned). This is enforced by convention, not tooling — please check manually before submitting.
- User-facing text in the application itself is in German, matching the existing UI. Documentation in this repository is in English.
- Any value derived from user input or an imported file that is inserted into HTML **must** go through the existing escaping helpers (`escapeHtml`, `safeAttribute`, `safeUrl`, `safeJsString` as appropriate). See the Security Rules section below.

## Security rules

- Never introduce a code path that inserts unescaped user- or import-controlled data into HTML, an inline event handler, or a URL attribute.
- Never widen `IMPORT_LIMITS` or remove a validation step in `validateImportData()` without understanding why it exists first — most of them were added in response to a specific hardening pass (see the in-file changelog for `v1.4.0`).
- A literal `</script>` sequence must never appear inside a JavaScript string or comment in this file — even split across concatenated strings, browsers' HTML tokenizers treat it as the real end of the script block regardless of JavaScript context. If you need to represent that sequence (e.g. in a test fixture), escape the slash: `<\/script>`. This has broken the file before; it is very easy to reintroduce by accident.

## Tests and migrations

- If your change affects any function covered by the built-in self-test suite, run it before submitting: open the file in a browser and press **Ctrl+Alt+T** (or navigate to `bcm-starter-kit.html#selftest`). All 57 tests must still pass.
- If your change requires a schema migration, add a new step to `SCHEMA_MIGRATIONS`, bump `CURRENT_SCHEMA_VERSION`, and make sure the migration is purely additive (never destructive) and covered by at least one test case in your pull request description.
- There is no CI at all in this repository — no workflows, no automated checks (see [`docs/release-process.md`](docs/release-process.md)). Running the self-tests manually and reporting the result in your pull request is therefore required, not optional.
- **If you add a field to the data model, do not add it to any import field list by hand.** `validateImportData()` derives the fields it carries over from `newProcess()`. A field enumerated separately somewhere is a field that will eventually be dropped on import without any error message — that is exactly how the dependency loss fixed in 2.2.0 happened. The self-test "Import erhält ALLE in newProcess() definierten Prozessfelder" compares against `newProcess()` for this reason; please keep it generic rather than listing field names in it.

## Pull requests

1. Open an issue first for anything beyond a small, obvious fix.
2. Keep pull requests focused — one logical change per PR.
3. Update [`CHANGELOG.md`](CHANGELOG.md) under an "Unreleased" heading.
4. There is no pull request template in this repository, so please state the following in the description yourself: what the change does, whether a schema migration is needed, and the result of the self-test run (total / passed / failed).
5. Be patient — this is a community-maintained project without guaranteed response times (see [SUPPORT.md](SUPPORT.md)).

## License of contributions

By submitting a contribution, you agree that it will be licensed under the [Apache License, Version 2.0](LICENSE), the same license as the rest of the project, without any additional terms or conditions (see License §5, "Submission of Contributions").
