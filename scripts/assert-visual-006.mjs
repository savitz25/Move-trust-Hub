/**
 * VISUAL-006 Move network shell — source contract.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(join(root, rel), 'utf8');
const failures = [];
const assert = (cond, msg) => {
  if (!cond) failures.push(msg);
};

const tokens = read('lib/design/trusthub-visual-standard.ts');
const mark = read('components/move-network-mark.tsx');
const css = read('app/globals.css');
const chrome = read('components/hub/hub-chrome.tsx');
const header = read('components/move-network-header.tsx');
const switcher = read('components/switch-hub-menu.tsx');
const registry = read('lib/network/registry.ts');
const layout = read('app/layout.tsx');
const fonts = read('app/fonts.ts');
const coach = read('components/ux/move-coach-tip.tsx');
const journey = read('components/ux/journey-tracker.tsx');

assert(tokens.includes('2026.08.21-visual-v1'), 'chassis version');
assert(tokens.includes("move: '#FF5A1F'"), 'Move orange accent');
assert(mark.includes('strokeWidth="2.4"'), 'canonical stroke 2.4');
assert(mark.includes('viewBox="0 0 36 36"'), 'canonical viewBox');
assert(mark.includes('#FF5A1F'), 'Move orange brackets');
assert(css.includes('--th-header-desktop: 69px'), '69px desktop');
assert(css.includes('--th-header-mobile: 57px'), '57px mobile');
assert(css.includes('--th-logo-desktop: 36px'), '36px logo');
assert(css.includes('--th-shell-max: 1200px'), '1200 shell');
assert(chrome.includes('isMove ? null : <AskNetworkBar'), 'Ask network strip skipped for Move');
assert(chrome.includes('DeferredMoveCoachTip'), 'Coach preserved');
assert(chrome.includes('DeferredJourneyTracker'), 'Journey preserved');
assert(header.includes('th-header'), 'Move global header class');
assert(header.includes('variant="embedded"'), 'Switch Hub in drawer');
assert(header.includes('MOVE_MEGA_NAV'), 'Move mega nav preserved');
assert(switcher.includes('ASK TRUST HUB NETWORK'), 'network panel title');
assert(switcher.includes('aria-current'), 'aria-current');
assert(registry.includes("CURRENT_NETWORK_HUB_ID: NetworkHubId = 'move'"), 'current hub is move');
assert(layout.includes('data-th-chassis'), 'chassis stamp');
assert(layout.includes('geist-latin-600.woff2'), 'Geist LCP preload kept');
assert(fonts.includes('interUi'), 'Inter chrome font');
assert(fonts.includes('preload: false'), 'Inter not preloaded against LCP');
assert(coach.includes('Coach says'), 'Coach copy intact');
assert(journey.includes('Move journey'), 'Journey copy intact');

const order = ["'ask'", "'move'", "'lender'", "'insurance'", "'contractor'", "'senior'", "'investor'"];
let last = -1;
for (const id of order) {
  const i = registry.indexOf(`id: ${id}`);
  assert(i > last, `registry order ${id}`);
  last = i;
}

if (failures.length) {
  console.error('VISUAL-006 assertions failed:');
  for (const f of failures) console.error(' -', f);
  process.exit(1);
}
console.log('VISUAL-006 Move network-shell assertions passed.');
