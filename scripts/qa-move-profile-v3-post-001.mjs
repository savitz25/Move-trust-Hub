import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

// Connect to an agent-browser session. No database mutations or mocked evidence.
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const base = process.env.PROFILE_QA_BASE || 'http://localhost:4325';
const out = path.resolve(process.env.PROFILE_QA_OUT || 'scripts/output/move-profile-v3-post-001');
mkdirSync(out, { recursive: true });
const cases = [
  { slug: 'advantage-van-lines-llc', family: 'companies', google: false, refs: false, bbb: false },
  { slug: '2-fellas-a-big-vehicle-moving-company', family: 'companies', google: true, refs: false, bbb: false },
  { slug: 'allied-van-lines', family: 'companies', google: true, refs: true },
  { slug: 'movesafe-relocation', family: 'companies', google: false, refs: false, bbb: true },
  { slug: 'reliable-carriers', family: 'auto-transport', google: true, refs: false },
  { slug: 'montway-auto-transport', family: 'auto-transport', google: false, refs: false },
];
const browser = await chromium.connectOverCDP(process.env.PROFILE_QA_CDP);
const results = [];
const actionResults = [];
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    for (const entry of cases) {
      const errors = [];
      const onError = error => errors.push(String(error));
      const onConsole = message => { if (message.type() === 'error') errors.push(message.text()); };
      page.on('pageerror', onError);
      page.on('console', onConsole);
      const url = `${base}/${entry.family}/${entry.slug}`;
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
      assert.equal(response.status(), 200, url);
      const state = await page.evaluate(() => {
        const text = document.body.innerText;
        const headings = [...document.querySelectorAll('h1,h2,h3')].map(el => el.textContent.trim());
        const services = [...document.querySelectorAll('h3')].find(el => el.textContent === 'Services & Specialties')?.parentElement?.parentElement;
        const next = services?.nextElementSibling;
        const schemaTypes = [];
        const visit = value => {
          if (!value || typeof value !== 'object') return;
          if (value['@type']) schemaTypes.push(...[value['@type']].flat());
          Object.values(value).forEach(visit);
        };
        for (const node of document.querySelectorAll('script[type="application/ld+json"]')) visit(JSON.parse(node.textContent));
        return {
          title: document.querySelector('h1')?.textContent,
          google: text.includes('Google rating (external)'),
          refs: !!document.querySelector('#attributed-reviews'),
          bbb: [...document.querySelectorAll('a')].some(a => a.textContent.includes('View BBB profile')),
          headingCount: headings.filter(h => h === 'External Reputation Snapshots').length,
          refsHeadingCount: headings.filter(h => h === 'External review references').length,
          placeholders: /live Google rating|Search Google for|No external review references on file|No attributed external review references/.test(text),
          checked: text.match(/Snapshot checked[^\n]+/)?.[0] ?? null,
          community: /Move Trust Hub Community/i.test(text),
          communityInsideReferences: !!document.querySelector('#attributed-reviews #community-reviews'),
          nextAfterServices: next?.innerText.slice(0, 100),
          gapAfterServices: services && next ? Math.round(next.getBoundingClientRect().top - services.getBoundingClientRect().bottom) : null,
          overflow: document.documentElement.scrollWidth > innerWidth,
          errorOverlay: !!document.querySelector('[data-nextjs-dialog]'),
          schemaTypes,
        };
      });
      const failures = [];
      const check = (condition, message) => { if (!condition) failures.push(message); };
      check(state.google === entry.google, 'Google presence');
      check(state.refs === entry.refs, 'references presence');
      if (entry.bbb !== undefined) check(state.bbb === entry.bbb, 'BBB presence');
      check(state.headingCount === (entry.google || entry.refs ? 1 : 0), 'section heading presence/count');
      check(state.refsHeadingCount === (entry.refs ? 1 : 0), 'references heading count');
      check(!state.placeholders, 'no empty placeholders');
      check(!state.overflow, 'no horizontal overflow');
      check(!state.errorOverlay && !errors.length, 'no browser errors');
      check(!state.schemaTypes.some(type => ['AggregateRating', 'Review'].includes(type)), 'no external review schema');
      if (entry.google) check(!!state.checked, 'snapshot date');
      if (entry.family === 'companies') {
        check(state.community && !state.communityInsideReferences, 'separate community section');
        if (!entry.google && !entry.refs) {
          check(/Move Trust Hub Community/i.test(state.nextAfterServices), 'community follows services directly');
          check(state.gapAfterServices >= 0 && state.gapAfterServices <= 32, 'natural section gap');
        }
      }
      const screenshot = `${entry.family}-${entry.slug}-${width}.png`;
      await page.screenshot({ path: path.join(out, screenshot), fullPage: true });
      const focus = page.getByRole('heading', { name: entry.google || entry.refs ? 'External Reputation Snapshots' : entry.family === 'companies' ? 'Services & Specialties' : `About ${state.title}`, exact: true });
      if (await focus.count()) {
        await focus.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await page.screenshot({ path: path.join(out, screenshot.replace('.png', '-section.png')) });
      }
      results.push({ url, width, ...state, errors, failures, screenshot });
      console.log(JSON.stringify({ slug: entry.slug, width, google: state.google, refs: state.refs, bbb: state.bbb, failures }));
      page.off('pageerror', onError);
      page.off('console', onConsole);
      writeFileSync(path.join(out, 'browser-results.json'), JSON.stringify(results, null, 2));
    }
    const actions = { width, save: false, compare: false, myMove: false, errors: [] };
    const onActionError = error => actions.errors.push(String(error));
    const onActionConsole = message => { if (message.type() === 'error') actions.errors.push(message.text()); };
    page.on('pageerror', onActionError);
    page.on('console', onActionConsole);
    try {
      await page.goto(`${base}/companies/advantage-van-lines-llc`, { waitUntil: 'networkidle' });
      // A real interaction initializes the existing deferred save/auth provider.
      await page.getByRole('heading', { name: 'Advantage Van Lines LLC', exact: true }).click();
      await page.waitForFunction(() => [...document.querySelectorAll('button')].some(b => b.textContent.trim() === 'Save mover' && !b.disabled));
      await page.getByRole('button', { name: 'Save mover', exact: true }).click();
      actions.save = await page.evaluate(() => JSON.parse(localStorage.getItem('mth-local-saved-movers') || '[]').some(m => m.companySlug === 'advantage-van-lines-llc'));
      await page.getByRole('link', { name: 'Compare', exact: true }).click();
      await page.waitForURL('**/compare**');
      await page.waitForLoadState('networkidle');
      actions.compare = (await page.locator('body').innerText()).includes('Advantage');
      await page.goto(`${base}/companies/advantage-van-lines-llc`, { waitUntil: 'networkidle' });
      await page.getByRole('link', { name: /Save research in My Move/ }).click();
      await page.waitForURL('**/my-move**');
      await page.waitForLoadState('networkidle');
      actions.myMove = (await page.locator('body').innerText()).includes('My Move');
    } catch (error) {
      actions.errors.push(String(error));
    }
    page.off('pageerror', onActionError);
    page.off('console', onActionConsole);
    writeFileSync(path.join(out, `actions-${width}.json`), JSON.stringify(actions, null, 2));
    actionResults.push(actions);
    console.log(JSON.stringify({ actions }));
    await context.close();
  }
  assert.ok(results.every(result => result.failures.length === 0), 'See browser-results.json for failures');
  assert.ok(actionResults.every(result => result.save && result.compare && result.myMove && !result.errors.length), 'See actions JSON for failures');
} finally {
  await browser.close();
}
