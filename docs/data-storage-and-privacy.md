# Data Storage & Privacy

BCM Starter Kit is designed to keep your data on your own device, under your
own control, at all times. This document explains exactly how that works,
and what remains your responsibility.

## No cloud, no server, no accounts

There is no backend. The application makes no network requests of its own
once the page has loaded, embeds no analytics or telemetry, and requires no
account, sign-in, or registration of any kind. Everything happens inside
your browser.

## Where your workbook lives

### 1. Browser local storage (always on)

By default, your workbook is saved automatically to the browser's
`localStorage` on the device and browser profile you're using, via a
debounced autosave. This is private to that browser profile on that device —
it is not synced anywhere by the application itself (though your browser's
own sync feature, if you have one enabled, may behave differently; that is
outside this application's control).

**Local storage is not encrypted at rest.** Anyone with access to your
device and browser profile can potentially read it. If that's a concern —
a shared or unmanaged device, for instance — prefer the encrypted export
feature described below, and avoid leaving sensitive data sitting only in
local storage on such a device.

Because this storage belongs to the browser profile rather than to a tab, two
tabs with the same workbook open write to the same place. Since version 2.2.0
the application notices when another tab has saved and asks which version you
want to keep, backing up the other one automatically either way. Keeping the
workbook open in a single tab avoids the question entirely.

### 2. A linked file on disk (optional, Chromium browsers only)

On Chrome, Edge, Opera, and other Chromium-based browsers, you can link the
application to a real file on your file system via the File System Access
API (**Settings → Datei-Verknüpfung**). Once linked, every change is written
directly to that file — similar to how a desktop word processor behaves.
This file is exactly as secure as any other file on your device: protected
by your operating system's file permissions, not by the application.

Firefox and Safari do not support this API; use JSON export/import instead.

### 3. JSON export (any browser)

**Export JSON** — available both in the top bar and under **Settings → Daten &
Bedienbarkeit** — downloads a complete snapshot as a plain, human-readable JSON
file. This file contains your full workbook content in clear text — treat it
like any other sensitive document you're responsible for. It also carries no
protection against modification: anyone who can write to the file can change
its contents, and while the application will refuse structurally invalid data
on import, it cannot tell you that a plausible value was altered.

### 4. Encrypted JSON export (any browser)

**Settings → Verschlüsselter Export** produces the same snapshot, encrypted
with a password you choose (AES-GCM, key derived via PBKDF2 with SHA-256 and
600,000 iterations, a fresh random salt and initialisation vector per export,
entirely through the browser's native Web Crypto API). The password itself is
never stored, transmitted, or included in the file — if you lose it, the export
cannot be recovered by the application, the maintainer, or anyone else. A
minimum length of 12 characters is required.

Unlike the plain export, this format is also tamper-evident: AES-GCM is
authenticated, so a modified file fails to decrypt rather than opening with
altered content. (A wrong password and a modified file are indistinguishable
from the outside, so both produce the same message.)

Files encrypted by earlier versions of the application still open — the key
derivation parameters were strengthened in 2.2.0 without breaking existing
files, and this is covered by an automated test.

Use this whenever you need to send a workbook over a channel you don't fully
trust (email, a shared drive, etc.).

## What's in a JSON export

Alongside your workbook data, every new export additionally includes a small
set of provenance fields identifying the tool that created it:

```json
{
  "createdWith": "BCM Starter Kit",
  "edition": "Open Source Edition",
  "originalAuthor": "Marco Riemer",
  "projectWebsite": "https://www.riemer-consulting.de",
  "license": "Apache-2.0"
}
```

These fields carry no personal or organizational data of yours — they only
identify the software itself. They are purely additive: they don't affect
how the file is read or migrated, older files without them import exactly as
before, and stripping them out (or importing a file that never had them) has
no effect on functionality.

## Your responsibilities

- **Exported files are your responsibility.** Once you've exported a JSON
  file, a PDF, or linked a file on disk, its security depends on how and
  where you store or send it — the application can no longer help protect it.
- **Personal data.** If your workbook includes personal data (e.g. named
  contacts in resource records), you are responsible for handling it in line
  with whatever data protection obligations apply to you. The application
  never marks any field as mandatory for personal data, and a "personal
  data" flag on resources exists to help you keep track of where such data
  appears in your own workbook.
- **Sharing a workbook file.** If you send an unencrypted export or a linked
  file to someone else, they receive everything in it, in clear text. Use
  the encrypted export feature, or the **"Für Weitergabe bereinigen"**
  ("Clean for handoff") option in Settings, when that's not appropriate.

## Further reading

- [SECURITY.md](../SECURITY.md) — the application's security model and its
  explicit boundaries
- [Architecture](architecture.md) — how persistence is implemented
  internally
