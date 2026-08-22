/**
 * Zero-exposure / post-apply profile smoke for MDC-PROD-003.
 *
 * Usage:
 *   node scripts/smoke-mdc-prod-003-zero-exposure.mjs --expect-hidden
 *   node scripts/smoke-mdc-prod-003-zero-exposure.mjs --expect-visible
 *
 * Hits production company profiles for the final 9 canary members.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const FINAL = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-003/publication-canary-v1.json'
);
const OUT = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-003'
);
const SITE = process.env.MDC_SMOKE_BASE || 'https://www.movetrusthub.com';

const MARKERS = [
  'Miami-Dade Moving Business Registration',
  'Issued county moving-business registration',
  'mdc-moving-business-registration',
  'Consumer and Neighborhood Protection Division',
];

function has(f) {
  return process.argv.includes(f);
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'MoveTrustHub-MDC-PROD-003-smoke/1.0',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
    },
    redirect: 'follow',
  });
  const text = await res.text();
  const cache =
    res.headers.get('cdn-cache-control') ||
    res.headers.get('cache-control') ||
    '';
  return { status: res.status, text, cache };
}

function mrVisible(html, mr) {
  if (!html.includes(mr)) return false;
  // Require at least one Miami marker near canary presentation
  return MARKERS.some((m) => html.includes(m));
}

async function main() {
  if (!existsSync(FINAL)) throw new Error('Missing final canary manifest');
  const final = JSON.parse(readFileSync(FINAL, 'utf8'));
  const expectHidden = has('--expect-hidden');
  const expectVisible = has('--expect-visible');
  if (!expectHidden && !expectVisible) {
    console.error('Usage: --expect-hidden | --expect-visible');
    process.exit(1);
  }

  const rows = [];
  let httpOk = 0;
  let blocks = 0;
  let mrText = 0;
  let regulatorAttr = 0;

  for (const m of final.members) {
    const url = `${SITE}/companies/${m.slug}`;
    const { status, text, cache } = await fetchText(url);
    const hasMr = text.includes(m.miami_dade_mr);
    const hasHeading = text.includes('Miami-Dade Moving Business Registration');
    const hasRegulator = text.includes(
      'Consumer and Neighborhood Protection Division'
    );
    const hasStatus = text.includes(
      'Issued county moving-business registration'
    );
    const visible = mrVisible(text, m.miami_dade_mr) && hasHeading;
    if (status === 200) httpOk++;
    if (visible) blocks++;
    if (hasMr && hasHeading) mrText++;
    if (hasRegulator && hasHeading) regulatorAttr++;
    rows.push({
      slug: m.slug,
      mr: m.miami_dade_mr,
      status,
      visible,
      hasMr,
      hasHeading,
      hasRegulator,
      hasStatus,
      cache,
    });
  }

  const out = {
    mode: expectHidden ? 'zero-exposure-preapply' : 'post-apply-sweep',
    checked_at: new Date().toISOString(),
    base: SITE,
    http_200: `${httpOk}/9`,
    miami_dade_mr_block: `${blocks}/9`,
    mr_text_visible: `${mrText}/9`,
    regulator_text_attributable: `${regulatorAttr}/9`,
    rows,
    pass: expectHidden
      ? httpOk === 9 && blocks === 0 && mrText === 0
      : httpOk === 9 &&
        blocks === 9 &&
        mrText === 9 &&
        regulatorAttr === 9 &&
        rows.every((r) => r.hasStatus),
  };

  mkdirSync(OUT, { recursive: true });
  const file = expectHidden
    ? 'zero-exposure-preapply.json'
    : 'full-canary-profile-sweep.json';
  writeFileSync(resolve(OUT, file), JSON.stringify(out, null, 2) + '\n');
  console.log(JSON.stringify(out, null, 2));
  if (!out.pass) {
    console.error(
      expectHidden
        ? 'BLOCKED — MDC PUBLICATION PRECONDITION FAILED'
        : 'BLOCKED — post-apply profile sweep failed'
    );
    process.exit(3);
  }
}

main().catch((e) => {
  console.error(String(e?.message || e));
  process.exit(1);
});
