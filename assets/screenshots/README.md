# Screenshots (manual capture required)

This directory needs the following screenshots, captured manually from a
running instance of `bcm-starter-kit.html` in a desktop browser (Chrome or
Edge recommended, window width ≈ 1440px). Automated capture was not possible
in the environment this repository was prepared in (no headless browser with
network access to fetch a browser binary was available) — see the final
report from repository preparation for details.

Loading `examples/demo-workbook.json` first (via **Settings → Import**) is
recommended so screenshots show realistic, populated data rather than an
empty workbook.

| Filename | Capture |
|---|---|
| `dashboard.png` | The dashboard view after loading the demo workbook. |
| `process-record.png` | A process record's **Steckbrief** (fact sheet) tab — e.g. "Auftragserfassung". |
| `measures.png` | The measures catalog (`Maßnahmenkatalog`), ideally with the "overdue only" filter cleared so multiple statuses are visible. |
| `executive-view.png` | The executive view (**GF-Ansicht**), scrolled to show the compact management overview at the top. |
| `pdf-report.png` | A rendered PDF page (e.g. the executive summary or a process detail page) opened from the generated print output. |
| `settings.png` | The Settings view, showing the "Kunde & Branding" and "Über & Lizenz" cards. |
| `startup-screen.png` | The startup/license screen shown on first launch (clear local storage or use a private/incognito window to trigger it again). |

Recommended format: PNG, browser window cropped (no OS chrome), 1200–1600px
wide. Keep file sizes reasonable (optimize with a tool such as `pngquant` or
`oxipng` if a screenshot exceeds ~500KB).

Once captured, these are referenced directly by `README.md` and
`docs/user-guide.md` — no other changes are needed after adding the files.
