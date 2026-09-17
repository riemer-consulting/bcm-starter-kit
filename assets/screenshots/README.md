# Screenshots (manual capture required)

This directory needs the following screenshots, captured manually from a
running instance of `bcm-starter-kit.html` in a desktop browser (Chrome or
Edge recommended, window width ≈ 1440px).

**Update (2.4.0-dev/AP6):** a headless Chromium (via Playwright) with a
pre-installed browser binary became available in the environment this branch
was prepared in, so the three 2.4.0-dev views below could be captured
automatically after all. The remaining ones still need manual capture — they
either depend on OS-level browser chrome this environment cannot drive (the
native print dialog for `pdf-report.png`) or simply have not been done yet.

Loading `examples/demo-workbook.json` first (via **Import JSON** in the top
bar — note that Settings offers only the *encrypted* import), or clicking
**Beispieldaten laden** in the app, is recommended so screenshots show
realistic, populated data rather than an empty workbook.

| Filename | Capture |
|---|---|
| `dashboard.png` | **Present, but mislabelled:** the file currently in this directory shows the *executive view* (GF-Ansicht), not the dashboard. It is used as the header image in `README.md` and described there accurately. |
| `governance-dashboard.png` | **Present (2.4.0-dev).** The Dashboard route's Governance Dashboard section ("Was ist als Nächstes zu tun?"), captured against the demo workbook. |
| `review-center.png` | **Present (2.4.0-dev).** The Review Center view, captured against the demo workbook. |
| `timeline.png` | **Present (2.4.0-dev).** The BCM Timeline view, captured against the demo workbook. |
| `process-record.png` | A process record's **Steckbrief** (fact sheet) tab — e.g. "Auftragserfassung". |
| `measures.png` | The measures catalog (`Maßnahmenkatalog`), ideally with the "overdue only" filter cleared so multiple statuses are visible. |
| `executive-view.png` | The executive view (**GF-Ansicht**), scrolled to show the compact management overview at the top. (Not currently referenced by `README.md`, which uses `dashboard.png` for this — see above.) |
| `pdf-report.png` | A rendered PDF page (e.g. the executive summary or a process detail page) opened from the generated print output. |
| `settings.png` | The Settings view, showing the "Kunde & Branding" and "Über & Lizenz" cards. |
| `startup-screen.png` | The startup/license screen shown on first launch (clear local storage or use a private/incognito window to trigger it again). |

Recommended format: PNG, browser window cropped (no OS chrome), 1200–1600px
wide. Keep file sizes reasonable (optimize with a tool such as `pngquant` or
`oxipng` if a screenshot exceeds ~500KB).

Once captured, these are referenced directly by `README.md` and
`docs/user-guide.md` — no other changes are needed after adding the files.
