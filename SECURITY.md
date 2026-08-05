# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 2.x | ✅ |
| < 2.0 | ❌ |

Only the latest 2.x release is actively maintained. If you are running an
older version, please upgrade before reporting an issue — it may already be
fixed.

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

If you believe you have found a security issue in BCM Starter Kit, please
report it privately by emailing the maintainer through
[www.riemer-consulting.de](https://www.riemer-consulting.de), or by using
GitHub's private vulnerability reporting feature on this repository
(**Security** tab → **Report a vulnerability**), if enabled.

Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce it (a minimal example workbook or import file, if
  relevant)
- The browser and version you tested in
- Whether you believe user data could be exposed, and how

This is a community-maintained open source project without a dedicated
security team or a service-level agreement. There is no bug bounty program.
Reasonable effort will be made to acknowledge reports and investigate
promptly, but response times are not guaranteed. Responsible disclosure is
appreciated: please give a reasonable amount of time for a fix to be released
before disclosing publicly.

## Known Security Boundaries

BCM Starter Kit is a single-page, client-side application with no backend.
Understanding its security model requires understanding what it does and does
not protect against:

### What the application does

- **Output escaping.** All user-entered and imported text that is rendered as
  HTML is passed through escaping helpers (`escapeHtml`, `safeAttribute`,
  `safeUrl`, `safeJsString`) before being inserted into the page, specifically
  to prevent cross-site scripting (XSS) via workbook content or imported
  files.
- **Import hardening.** Imported JSON is size-limited, recursively stripped
  of dangerous object keys (such as `__proto__`), checked for ID uniqueness,
  validated against expected value ranges, and schema-migrated in a
  registered, auditable chain — see `validateImportData()` and
  `migrateWorkbook()` in the source. Since 2.2.0 this also covers workbook
  metadata (`meta.version`, `meta.accent`), version numbers rendered into
  inline event handlers, entity IDs rendered into attributes, and list fields
  that arrive as something other than a list — the last of which could
  previously make the interface abort while rendering.
- **URL scheme restriction.** Logo URLs and similar user-supplied links are
  restricted to safe schemes (`https:`, `http:`, `data:image/*`); dangerous
  schemes such as `javascript:` are rejected.
- **Local-only cryptography.** The optional encrypted export feature uses
  AES-GCM with a PBKDF2-derived key (SHA-256, 600,000 iterations, a fresh
  random salt and IV for every export) via the browser's native Web Crypto
  API. The password is never transmitted or stored — losing it means the
  export is unrecoverable by design. A minimum password length of 12
  characters is enforced.
- **Forward-compatible key derivation.** Since 2.2.0 the encrypted file
  declares its own KDF parameters, so the iteration count can be raised
  again later without making existing files unreadable. Files written by
  earlier versions (250,000 iterations) still open; a self-test guards this.
  An iteration count outside a plausible range is rejected rather than
  honoured, so a tampered file can neither weaken key derivation nor hang the
  browser.

### What is explicitly out of scope

- **The browser's local storage is not encrypted at rest.** Anyone with
  access to the device and browser profile can potentially read an
  unencrypted workbook. If that is a concern for your environment, use the
  encrypted export feature and avoid leaving sensitive data in an
  unencrypted, linked file on a shared or unmanaged device.
- **Local storage is shared by every tab and by any other page on the same
  origin.** The application detects when another tab overwrites the workbook
  and lets you choose which version to keep (2.2.0), but this is a
  data-integrity aid, not a security boundary: it does not and cannot protect
  against other code running in the same browser profile. Opening the file
  from a location where untrusted scripts share the origin is outside the
  threat model.
- **No integrity protection for unencrypted files.** An unencrypted JSON
  export or a linked file on disk can be modified by anyone who can write to
  it. Import validation is built to keep a tampered file from harming the
  application, and it will reject or repair structurally invalid data — but it
  cannot tell you that a plausible-looking value was altered. The encrypted
  export does provide integrity (AES-GCM is authenticated: a modified file
  fails to decrypt rather than opening with altered content).
- **Imported files are trusted once validated.** Import validation defends
  against malformed and maliciously crafted *data* (XSS payloads, oversized
  files, prototype pollution attempts). It does not and cannot verify the
  *business accuracy* of an imported workbook's content — that remains the
  responsibility of whoever prepared it.
- **No transport security is applicable.** The application makes no network
  requests of its own, so there is no server-side attack surface, session
  handling, or authentication to secure — and correspondingly no protection
  against risks that only arise from network transmission, such as how you
  choose to send an exported file to someone else. Use the encrypted export
  option for that.
- **Browser and OS security are assumed.** The application relies on the
  browser's sandboxing and the operating system's file permissions; it does
  not attempt to compensate for a compromised browser or device.

If you are evaluating this application for use with genuinely sensitive or
regulated data, review [`docs/data-storage-and-privacy.md`](docs/data-storage-and-privacy.md)
and the source code directly before relying on it.
