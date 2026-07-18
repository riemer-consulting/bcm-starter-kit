# Quickstart

Get a first working business continuity workbook in under ten minutes.

## 1. Open the application (30 seconds)

Download `bcm-starter-kit.html` and open it in a desktop browser (Chrome,
Edge, Firefox, or Safari). There is nothing to install — double-clicking the
file, or dragging it into an open browser window, is enough.

On first launch you'll see a startup screen with a short license notice.
Click **"Verstanden – Software nutzen"** ("Understood – use the software")
to continue. You only see this once per browser.

## 2. Load the demo data — or start fresh (30 seconds)

You have two options:

- **Explore first:** click **Load sample data** on the dashboard. This adds
  two example processes so you can see every screen populated before
  touching your own data. (For a more complete, realistic example, see the
  fictional demo company in [`examples/`](../examples/README.md) instead —
  import it via **Settings → Import**.)
- **Start fresh:** click **+ Neue Prozessakte** ("+ New process record") in
  the sidebar to create your first real process record.

## 3. Fill in one process record (5 minutes)

Every process record has eight tabs. For a first pass, focus on these four:

1. **Steckbrief** (fact sheet) — name, owner, department, goal, and the
   criticality rating. This is the only tab with fields required for the
   completeness indicator to reach 100%.
2. **Business Impact** — rate how badly the organization is affected across
   eight categories (financial, customer, delivery, legal, reputation,
   internal operations, staff, safety) at increasing time horizons. This
   drives the automatic criticality suggestion you'll see on the fact sheet.
3. **Kritische Ressourcen** (critical resources) — link the people, systems,
   data, and suppliers this process cannot run without. Mark ones without a
   fallback alternative.
4. **Notbetrieb** (emergency operations) — what happens in the first hours
   of a disruption: who decides to invoke it, who is informed, and what the
   first steps are.

The remaining tabs (60-second pitch, minimum viable capability, resilience
check, measures) can be filled in over time — nothing blocks you from saving
an incomplete record.

## 4. Check the executive view (1 minute)

Click **GF-Ansicht** (executive view) in the sidebar. This is the
decision-oriented summary: overall status, the processes and resources most
at risk, data-quality gaps (kept separate from confirmed risks on purpose),
and anything that needs a management decision.

## 5. Save your work (1 minute)

By default, your workbook is saved automatically to the browser's local
storage as you work — there's nothing to click. For anything you want to
keep safe outside the browser:

- **Chrome/Edge/Opera/Brave:** use **"Datei verknüpfen"** ("Link file") in
  Settings to link a real file on disk. Every change is written there
  automatically from then on, like a word processor.
  the top bar (**Speichern unter…**) also works before linking.
- **Any browser:** use **Settings → Export JSON** to download a snapshot at
  any time.

See [`docs/data-storage-and-privacy.md`](data-storage-and-privacy.md) for
exactly what is stored where.

## 6. Generate a PDF (30 seconds)

From the top bar, click **PDF erzeugen** ("Generate PDF"), choose a scope
(short executive summary, full report, measures only, or a single process),
and confirm. This opens your browser's native print dialog — choose "Save as
PDF" as the destination.

## Where to go next

- [User Guide](user-guide.md) — every feature, explained in depth
- [Architecture](architecture.md) — how the application works internally
- [FAQ](faq.md) — quick answers to common questions
