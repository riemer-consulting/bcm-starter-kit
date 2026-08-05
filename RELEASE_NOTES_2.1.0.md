# BCM Starter Kit v2.1.0 — First Public Open Source Release

This is the first public release of BCM Starter Kit as an open source
project under the Apache License 2.0.

## What's in this release

This release is entirely about publication readiness — **no application
behavior has changed.** `bcm-starter-kit.html` itself is functionally
identical to the previous internal version (2.0.2), aside from the version
number and changelog entry. See [`CHANGELOG.md`](CHANGELOG.md) for the
complete history, including the branding and licensing work done in 2.0.2
that made this release possible.

New in this release:

- A complete, professional GitHub repository: `README.md`, `CONTRIBUTING.md`,
  `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1), `SECURITY.md`,
  `SUPPORT.md`.
- Full documentation set in [`docs/`](docs/): a ten-minute
  [Quickstart](docs/quickstart.md), a complete
  [User Guide](docs/user-guide.md), an
  [Architecture](docs/architecture.md) reference for contributors, a
  [Data Storage & Privacy](docs/data-storage-and-privacy.md) explainer, the
  project's [Release Process](docs/release-process.md), and an
  [FAQ](docs/faq.md).
- A fully worked, entirely fictional demo workbook
  ([`examples/demo-workbook.json`](examples/demo-workbook.json)) — six
  processes, eleven resources, and five measures for a fictional company,
  generated through the application's own data-model functions and
  validated against the current schema.
> **Correction added in 2.2.0:** these release notes originally also announced
> "GitHub issue and pull request templates, and a structural validation
> workflow (`.github/workflows/validate.yml`)". No `.github/` directory has ever
> existed in this repository, so that item was inaccurate and has been removed.
> There is no CI in this project — see
> [`docs/release-process.md`](docs/release-process.md). This file is kept as the
> historical record of the 2.1.0 release; the checksum below refers to the
> 2.1.0 artifact and is unchanged.

## Getting started

Download `bcm-starter-kit.html` below, open it in a desktop browser, and
you're running. No installation, no account, no server. See the
[Quickstart](docs/quickstart.md) for a ten-minute walkthrough.

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).

```
Copyright © 2026 Marco Riemer
Originally developed by Marco Riemer — https://www.riemer-consulting.de
Licensed under the Apache License, Version 2.0.
```

## Verifying your download

SHA-256 checksum of `bcm-starter-kit.html` in this release:

```
1eb9ee64becce5429f8b74d147e149776f2da5c6e2f0d61fcc0efafd706e9f80  bcm-starter-kit.html
```

Verify with:

```sh
sha256sum bcm-starter-kit.html
```

## Full changelog

See [CHANGELOG.md](CHANGELOG.md) for the complete version history back to
v1.0.0.
