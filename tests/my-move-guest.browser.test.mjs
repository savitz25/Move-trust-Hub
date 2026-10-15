// node --test tests/my-move-guest.browser.test.mjs
// Requires playwright (or PLAYWRIGHT_MODULE_PATH) and its Chromium installation
// (or CHROMIUM_EXECUTABLE_PATH). Real Save button, dashboard and local shortlist;
// auth, analytics, account operations and unrelated dashboard panels are isolated.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
const require = createRequire(import.meta.url);
const { build } = createRequire(require.resolve('tsx'))('esbuild');
const slug = 'hindman-isaacs-moving-storage-inc';
const name = 'Hindman Isaacs Moving & Storage Inc';
const deny = '() => { throw new Error("Forbidden account/network operation in guest fixture"); }';
const exportsFor = (names, value = deny) => names.split(' ').map(n => `export const ${n} = ${value};`).join('\n');
const stubs = {
  'next/link': `import React from 'react'; export default function Link({prefetch, children, ...props}) { return <a {...props}>{children}</a>; }`,
  'next/navigation': `export const usePathname = () => location.pathname; export const redirect = ${deny};`,
  '@/components/save-my-move/save-my-move-provider': `
    export const useSaveMyMove = () => ({ user: null, loading: false,
      isMoverSaved: () => false, markMoverSaved: () => {}, markMoverUnsaved: () => {},
      openSaveModal: () => { window.fixture.signInPrompts++; } });`,
  '@/components/my-trusthub/my-trusthub-origin': `
    export const ONE_ACCOUNT_ENABLED = new URL(location.href).searchParams.get('oneAccount') === '1';
    export const keepAllowedForSlug = () => false;
    export const useMyTrustHubHref = () => 'https://example.invalid/my';`,
  '@/actions/save-my-move': exportsFor('deleteInventoryAction deleteComparisonAction getMyMoveDashboardData removeSavedMoverAction saveInventoryAction updateMoverNotesAction removeSavedMoverBySlugAction saveMoverAction'),
  '@/actions/account': exportsFor('exportAccountDataAction deleteAccountAction'),
  '@/lib/supabase/client': exportsFor('createBrowserSupabaseClient'),
  '@/lib/save-my-move/auth': exportsFor('getAuthenticatedUser'),
  '@/lib/save-my-move/password': exportsFor('getMyMovePasswordStatus'),
  '@/lib/my-trusthub/direct-save': exportsFor('browserDirectPorts parentSync resumeDirect startDirect'),
  '@/components/ga-events': exportsFor('trackPdfDownloaded trackSaveMyMoveMover', '() => {}'),
  '@/components/analytics/posthog-beacons': exportsFor('captureMyTrustHubSaveConfirmed captureMyTrustHubSaveFailed captureMyTrustHubSaveIntent', '() => {}'),
  '@/lib/moving-calculator/pdf-export': exportsFor('generateInventoryPdf'),
  '@/components/my-move-plan/my-move-reports': `import React from 'react'; export const MyMoveReports = () => <p>No plans yet.</p>;`,
  'sonner': `const report = (message) => { document.getElementById('notice').textContent = message; }; export const toast = { success: report, error: report, message: report, warning: report };`,
};
for (const [file, exported] of Object.entries({
  'move-hq-hero': 'MoveHqHero', 'move-hq-quick-actions': 'MoveHqQuickActions',
  'inventory-card': 'InventoryCard', 'mover-card': 'MoverCard',
  'comparison-card': 'ComparisonCard', 'compare-bar': 'CompareBar', 'settings-drawer': 'SettingsDrawer',
})) stubs[`@/components/save-my-move/move-hq/${file}`] = exportsFor(exported, '() => null');
for (const [file, exported] of Object.entries({
  '@/components/save-my-move/auth-error-toast': 'AuthErrorToast',
  '@/components/save-my-move/handoff-status-banner': 'HandoffStatusBanner',
  '@/components/research/research-next-steps': 'ResearchNextSteps',
})) stubs[file] = exportsFor(exported, '() => null');
const plugin = { name: 'guest-isolation', setup(build) {
  build.onResolve({ filter: /.*/ }, args => stubs[args.path] ? { path: args.path, namespace: 'fixture' } : undefined);
  build.onLoad({ filter: /.*/, namespace: 'fixture' }, args => ({ contents: stubs[args.path], loader: 'jsx', resolveDir: process.cwd() }));
}};
async function bundle(contents, platform = 'browser') {
  return (await build({ stdin: { contents, resolveDir: process.cwd(), loader: 'tsx' },
    bundle: true, platform, format: platform === 'browser' ? 'iife' : 'cjs', write: false,
    jsx: 'automatic', plugins: [plugin], define: { 'process.env.NODE_ENV': '"test"' },
  })).outputFiles[0].text;
}

test('/my-move follows account-route noindex metadata convention', async () => {
  const code = await bundle(`export { metadata } from './app/(move)/my-move/page';`, 'node');
  const mod = { exports: {} };
  // Stub browser globals used only by the isolated presentation module.
  const oldLocation = globalThis.location;
  globalThis.location = new URL('http://localhost/my-move');
  try {
    new Function('require', 'module', 'exports', code)(require, mod, mod.exports);
    assert.deepEqual(mod.exports.metadata.robots, { index: false, follow: false });
    assert.match(mod.exports.metadata.alternates.canonical, /\/my-move$/);
  } finally { globalThis.location = oldLocation; }
});

test('Chromium: profile guest Save, reload, workspace, duplicate prevention and Unsave in both layouts', async () => {
  const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
  const script = await bundle(`
    import React from 'react'; import { createRoot } from 'react-dom/client';
    import { SaveMoverButton } from './components/save-my-move/save-mover-button';
    import { MyMoveDashboard } from './components/save-my-move/my-move-dashboard';
    import * as shortlist from './lib/save-my-move/local-shortlist';
    window.fixture = { signInPrompts: 0, shortlist };
    createRoot(document.getElementById('root')).render(location.pathname === '/my-move'
      ? <MyMoveDashboard initialData={null} />
      : <SaveMoverButton companySlug=${JSON.stringify(slug)} companyName=${JSON.stringify(name)} variant="button" />);
  `);
  const server = createServer((req, res) => {
    if (req.url === '/fixture.js') { res.setHeader('Content-Type', 'text/javascript'); res.end(script); }
    else { res.setHeader('Content-Type', 'text/html'); res.end('<!doctype html><div id="notice" role="status"></div><div id="root"></div><script src="/fixture.js"></script>'); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE_PATH });
    for (const mode of [0, 1]) {
      const context = await browser.newContext();
      const unexpected = [];
      await context.route('**/*', route => {
        const request = route.request();
        if (!request.url().startsWith(origin + '/') || request.method() !== 'GET') {
          unexpected.push(`${request.method()} ${request.url()}`); return route.abort();
        }
        return route.continue();
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const profile = `${origin}/companies/${slug}?oneAccount=${mode}`;
      const workspace = `${origin}/my-move?oneAccount=${mode}`;
      const moverLink = () => page.locator(`section[aria-labelledby="guest-movers-heading"] a[href="/companies/${slug}"]`);
      await page.goto(workspace);
      await page.getByText('No saved movers', { exact: true }).waitFor();
      await page.goto(profile);
      await page.getByRole('button', { name: `Save ${name}`, exact: true }).click();
      await page.getByRole('button', { name: `Saved: ${name}. Select to remove from your saved movers.`, exact: true }).waitFor();
      assert.match(await page.locator('#notice').innerText(), /saved on this device/i);
      assert.equal(await page.evaluate(() => window.fixture.shortlist.listLocalSavedMovers().length), 1);
      await page.reload();
      await page.locator('[data-save-state="saved"]').waitFor();
      assert.equal(await page.locator('[data-save-state="saved"]').count(), 1);
      await page.goto(workspace);
      await moverLink().waitFor();
      assert.equal(await moverLink().innerText(), name);
      await page.reload();
      await moverLink().waitFor();
      // A duplicate device write does not create another workspace row.
      await page.evaluate(({slug, name}) => { window.fixture.shortlist.addLocalSavedMover({companySlug: slug, companyName: name}); window.dispatchEvent(new Event('focus')); }, {slug, name});
      assert.equal(await moverLink().count(), 1);
      // Profile Unsave must disappear on a fresh workspace read.
      await page.goto(profile);
      await page.getByRole('button', { name: `Saved: ${name}. Select to remove from your saved movers.`, exact: true }).click();
      await page.goto(workspace);
      await page.getByText('No saved movers', { exact: true }).waitFor();
      assert.equal(await moverLink().count(), 0);
      // Page restoration refreshes the mounted workspace from device storage.
      await page.evaluate(({slug, name}) => { window.fixture.shortlist.addLocalSavedMover({companySlug: slug, companyName: name}); window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted:true})); }, {slug, name});
      await moverLink().waitFor();
      await page.getByRole('button', {name: `Remove ${name} from this device`, exact:true}).click();
      await page.getByText('No saved movers', { exact: true }).waitFor();
      await page.reload();
      await page.getByText('No saved movers', { exact: true }).waitFor();
      assert.equal(await page.evaluate(() => window.fixture.shortlist.listLocalSavedMovers().length), 0);
      assert.deepEqual(await context.cookies(), []);
      assert.deepEqual(unexpected, []);
      assert.deepEqual(errors, []);
      await context.close();
    }
  } finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); }
});
