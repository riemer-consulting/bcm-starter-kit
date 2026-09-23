#!/usr/bin/env node
/**
 * Regressionstest: realer Startup-Pfad von bcm-starter-kit.html über file://
 * in einem echten Chromium.
 *
 * Hintergrund (v2.4.1-Hotfix): v2.4.0 enthielt eine falsche Deklarations-
 * reihenfolge (`let STATE = loadState();` vor den von loadState() beschriebenen
 * `let PENDING_*`-Variablen). Das führte in Chrome beim Öffnen migrations-
 * pflichtiger Altdaten zu "ReferenceError: Cannot access '...' before
 * initialization" (Temporal Dead Zone) — die Seite blieb dabei leer, noch
 * bevor App.render() je aufgerufen wurde. Die integrierte Selbstprüfung
 * (Strg+Alt+T) kann diesen konkreten Fehler NICHT erkennen, weil sie erst
 * NACH einem erfolgreichen Boot überhaupt laufen kann. Dieses Skript prüft
 * deshalb stattdessen den echten Seitenaufbau selbst, in einem frischen,
 * isolierten Browserprofil (kein Zugriff auf reale Nutzerdaten), für drei
 * Storage-Zustände: leer, migrationspflichtiger Altbestand, aktueller Stand.
 *
 * Nutzung:
 *   node test/regression-chrome-startup.mjs [Pfad-zur-html]
 *
 * Voraussetzung: Playwright ist NICHT Teil dieses Repos (das Starter Kit
 * selbst hat bewusst keinen Build-Schritt und keine Abhängigkeiten). Für
 * dieses reine Maintainer-Testwerkzeug einmalig lokal installieren:
 *   npm init -y --silent && npm install --no-save playwright
 * und einen Chromium bereitstellen (z. B. `npx playwright install chromium`,
 * oder PLAYWRIGHT_BROWSERS_PATH auf eine vorhandene Installation zeigen).
 */
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const target = path.resolve(process.argv[2] || path.join(here, '..', 'bcm-starter-kit.html'));
if(!fs.existsSync(target)){
  console.error('Datei nicht gefunden:', target);
  process.exit(2);
}
const fileUrl = pathToFileURL(target).href;
const STORAGE_KEY = 'bcm_workbook_v1';

// Live aus der Zieldatei gelesen statt hier hartkodiert, damit dieser Test
// nicht bei jeder künftigen Schema-Erhöhung von Hand nachgezogen werden muss.
const targetSource = fs.readFileSync(target, 'utf8');
const schemaMatch = targetSource.match(/const CURRENT_SCHEMA_VERSION = (\d+);/);
if(!schemaMatch){
  console.error('CURRENT_SCHEMA_VERSION konnte nicht aus der Zieldatei gelesen werden.');
  process.exit(2);
}
const CURRENT_SCHEMA_VERSION = Number(schemaMatch[1]);

// Minimaler, gültiger Schema-1-Datensatz -> erzwingt beim Laden eine volle
// Migrationskette bis CURRENT_SCHEMA_VERSION (genau der Pfad, der v2.4.0 zum
// Absturz brachte).
const OLD_SCHEMA_PAYLOAD_EMPTY = JSON.stringify({
  schemaVersion: 1,
  processes: [],
  resources: [],
  massnahmen: [],
  versions: []
});

// Realistischer Altbestand (echtes Beispiel-Workbook, künstlich auf Schema 1
// zurückdatiert) -> durchläuft mit echten Prozessen/Ressourcen/Maßnahmen ALLE
// Migrationsschritte 1->CURRENT_SCHEMA_VERSION, nicht nur leere Arrays.
const demoWorkbookPath = path.join(here, '..', 'examples', 'demo-workbook.json');
const demoWorkbook = JSON.parse(fs.readFileSync(demoWorkbookPath, 'utf8'));
const OLD_SCHEMA_PAYLOAD_REALISTIC = JSON.stringify(Object.assign({}, demoWorkbook, { schemaVersion: 1 }));

// Zu neues, unbekanntes Schema -> stashRecoverySnapshot()-Pfad (P3-Recovery).
const FUTURE_SCHEMA_PAYLOAD = JSON.stringify({
  schemaVersion: 999,
  processes: [],
  resources: [],
  massnahmen: [],
  versions: []
});

// Kaputtes JSON -> ebenfalls stashRecoverySnapshot()-Pfad (parse-error).
const CORRUPT_PAYLOAD = '{"schemaVersion":1,"processes":[';

// Bereits aktueller Stand -> KEIN Migrationspfad (der historische Bug trat
// hier nie auf; als Gegenprobe trotzdem mitgetestet).
const CURRENT_SCHEMA_PAYLOAD = JSON.stringify({
  schemaVersion: CURRENT_SCHEMA_VERSION,
  processes: [],
  resources: [],
  massnahmen: [],
  versions: []
});

const scenarios = [
  { name: 'leerer Storage (frisches Profil)', seed: null },
  { name: 'migrationspflichtiger Altbestand, minimal (Schema 1, leere Listen)', seed: OLD_SCHEMA_PAYLOAD_EMPTY },
  { name: 'migrationspflichtiger Altbestand, realistisch (Schema 1, echtes Demo-Workbook)', seed: OLD_SCHEMA_PAYLOAD_REALISTIC },
  { name: 'zu neues/unbekanntes Schema (P3-Recovery-Pfad)', seed: FUTURE_SCHEMA_PAYLOAD },
  { name: 'beschädigtes JSON (P3-Recovery-Pfad, parse-error)', seed: CORRUPT_PAYLOAD },
  { name: 'aktueller Stand (kein Migrationspfad, gültiges Schema '+CURRENT_SCHEMA_VERSION+')', seed: CURRENT_SCHEMA_PAYLOAD },
];

async function runScenario(browser, scenario){
  const context = await browser.newContext();
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', msg=>{ if(msg.type()==='error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err=>{ pageErrors.push(err.message || String(err)); });

  // Erstnavigation, um denselben file://-Origin-Storage befuellen zu koennen.
  await page.goto(fileUrl);
  if(scenario.seed !== null){
    await page.evaluate(({key, value})=>{ localStorage.setItem(key, value); }, {key: STORAGE_KEY, value: scenario.seed});
    consoleErrors.length = 0;
    pageErrors.length = 0;
    await page.reload();
  }
  await page.waitForTimeout(700); // DOMContentLoaded-Handler + render() abwarten

  const appChildCount = await page.evaluate(()=>{
    const el = document.getElementById('app');
    return el ? el.children.length : -1;
  });
  const hasToastRoot = await page.evaluate(()=> !!document.getElementById('toast'));

  await context.close();

  const ok = appChildCount > 0 && hasToastRoot && pageErrors.length === 0;
  return { scenario: scenario.name, ok, appChildCount, hasToastRoot, pageErrors, consoleErrors };
}

const browser = await chromium.launch();
let allOk = true;
for(const scenario of scenarios){
  const result = await runScenario(browser, scenario);
  allOk = allOk && result.ok;
  console.log((result.ok ? 'PASS' : 'FAIL') + ' — ' + result.scenario);
  console.log('  #app Kindelemente:', result.appChildCount, '| #toast vorhanden:', result.hasToastRoot);
  if(result.pageErrors.length){
    console.log('  Uncaught page errors:');
    result.pageErrors.forEach(e=>console.log('    -', e));
  }
  if(result.consoleErrors.length){
    console.log('  Console errors:');
    result.consoleErrors.forEach(e=>console.log('    -', e));
  }
}
await browser.close();

if(!allOk){
  console.error('\nRegressionstest FEHLGESCHLAGEN: mindestens ein Szenario konnte die App nicht vollständig initialisieren.');
  process.exit(1);
}
console.log('\nAlle Szenarien PASS: Startup initialisiert #app ohne uncaught JavaScript-Exceptions.');
