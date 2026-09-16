# Frequently Asked Questions

**Do I need to install anything?**
No. `bcm-starter-kit.html` is the entire application. Open it in a browser.

**Does this require an internet connection?**
No, once the file is on your device. Nothing about the application's core
functionality requires network access.

**Where is my data stored?**
By default, in your browser's local storage on the device you're using.
Optionally, you can link it to a real file on disk (Chromium browsers) or
export/import JSON manually (any browser). See
[Data Storage & Privacy](data-storage-and-privacy.md).

**Is my data sent anywhere?**
No. The application makes no network requests of its own and has no server
component.

**Can I use this for a real company?**
Yes — that's what it's built for. Just be aware of the boundaries described
in [SECURITY.md](../SECURITY.md): local storage isn't encrypted at rest, and
you're responsible for how you store or share exported files. For genuinely
sensitive data, use the encrypted export feature and review the source code
yourself before relying on it.

**Can I use this commercially?**
Yes. The Apache License 2.0 explicitly permits commercial use, without
royalties. See [LICENSE](../LICENSE).

**Can I modify it for my own organization?**
Yes, that's expressly permitted — you just need to keep the copyright and
license notices intact and mark any files you change as changed (License
§4(b)). See [NOTICE](../NOTICE) for the required attribution.

**Does it work on my browser?**
Chrome, Edge, Firefox, and Safari are all supported for the core
application. Direct file linking is Chromium-only (Chrome, Edge, Opera,
Brave); other browsers use JSON export/import instead. See the browser
compatibility table in the [README](../README.md#browser-compatibility).

**Does it work on my phone?**
The interface is built for desktop use and is not optimized for small
screens. It may function, but this isn't a supported use case.

**I lost the password to my encrypted export. Can it be recovered?**
No. The password is never stored anywhere, by design — that's what makes the
encryption meaningful. There is no recovery mechanism.

**Why doesn't file linking work in Firefox/Safari?**
Direct file linking uses the File System Access API, which as of this
writing is only implemented by Chromium-based browsers. Use JSON
export/import instead — it works identically everywhere and is fully
supported.

**I found a bug. What do I do?**
Open a [GitHub Issue](../../issues) describing your browser, the application
version (see the in-app **About** dialog), and the steps to reproduce it. There
are no issue templates in this repository, so please include that information
yourself. See [SUPPORT.md](../SUPPORT.md).

**Can I request a new feature?**
You can open an issue to discuss it, but be aware this project is
intentionally considered feature-complete — most business-logic feature
requests will be declined rather than added. See
[CONTRIBUTING.md](../CONTRIBUTING.md) for why, and what kinds of
contributions are welcome instead.

**Why isn't this a "real" web app with a database and a login?**
Because that isn't the point. The single-file, no-installation, no-account
design is a deliberate choice to make the tool as portable and low-friction
as possible for organizations that don't want to run infrastructure just to
do BCM planning. See [`docs/architecture.md`](architecture.md).

**What does the hidden "self-test" mode do?**
It runs an internal suite of 107 tests against synthetic data to verify core
logic still behaves correctly — useful for contributors, not needed for
everyday use. Press **Ctrl+Alt+T** to open it. See the User Guide's
[Self-tests](user-guide.md#self-tests-advanced) section.

**Who built this?**
Marco Riemer ([riemer-consulting.de](https://www.riemer-consulting.de)).
See the in-app **About** dialog (accessible from the sidebar or Settings)
for version and license details.
