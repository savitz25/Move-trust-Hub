/**
 * PBC-PROD-003 pre-apply zero-exposure gate.
 * With code live and credentials still INTERNAL_ONLY:
 *   HTTP 200: 11/11
 *   Palm Beach county blocks visible: 0/11
 *   MV exposed: 0/11
 *
 * Usage:
 *   node scripts/smoke-pbc-prod-003-zero-exposure.mjs [--base https://www.movetrusthub.com]
 *   node scripts/smoke-pbc-prod-003-zero-exposure.mjs --expect-visible   # post-apply
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const FINAL = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-003/publication-canary-v1.json'
);
const OUT = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-003'
);

function arg(n) {
  const i = process.argv.indexOf(n);
  return i >= 0 ? process.argv[i + 1] : null;
}

function loadEnv() {
  for (const f of ['.env.local', '.env']) {
    if (!existsSync(f)) continue;
    for (const line of readFileSync(f, 'utf8').split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i < 0) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      )
        v = v.slice(1, -1);
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

async function main() {
  loadEnv();
  const expectVisible = process.argv.includes('--expect-visible');
  const base = (
    arg('--base') ||
    process.env.PBC_SMOKE_BASE ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://www.movetrusthub.com'
  ).replace(/\/$/, '');
  const final = JSON.parse(readFileSync(FINAL, 'utf8'));
  const results = [];
  let http200 = 0;
  let blocksVisible = 0;
  let mvExposed = 0;

  for (const m of final.members) {
    const url = `${base}/companies/${m.slug}`;
    let status = 0;
    let html = '';
    try {
      const res = await fetch(url, {
        headers: { 'user-agent': 'pbc-prod-003-zero-exposure/1.0' },
        redirect: 'follow',
      });
      status = res.status;
      html = await res.text();
    } catch (e) {
      results.push({
        slug: m.slug,
        mv: m.palm_beach_mv,
        status: 0,
        error: String(e?.message || e),
        block: false,
        mv_exposed: false,
      });
      continue;
    }
    if (status === 200) http200++;
    const block =
      /Palm Beach County Moving Permit/i.test(html) ||
      /County moving-business permit/i.test(html);
    const mv = new RegExp(`\\b${m.palm_beach_mv}\\b`, 'i').test(html);
    if (block) blocksVisible++;
    if (mv) mvExposed++;
    results.push({
      slug: m.slug,
      mv: m.palm_beach_mv,
      status,
      block,
      mv_exposed: mv,
    });
  }

  const pass = expectVisible
    ? http200 === 11 && blocksVisible === 11 && mvExposed === 11
    : http200 === 11 && blocksVisible === 0 && mvExposed === 0;

  const out = {
    ok: pass,
    mode: expectVisible ? 'post-apply-visible' : 'zero-exposure',
    base,
    http_200: `${http200}/11`,
    palm_beach_blocks_visible: `${blocksVisible}/11`,
    mv_exposed: `${mvExposed}/11`,
    gate: pass
      ? expectVisible
        ? 'PASS — CANARY VISIBLE'
        : 'PASS — ZERO EXPOSURE'
      : 'FAIL',
    results,
  };
  mkdirSync(OUT, { recursive: true });
  const name = expectVisible
    ? 'post-apply-smoke.json'
    : 'zero-exposure-smoke.json';
  writeFileSync(resolve(OUT, name), JSON.stringify(out, null, 2) + '\n');
  console.log(JSON.stringify(out, null, 2));
  if (!pass) process.exit(3);
}

main().catch((e) => {
  console.error(String(e?.message || e));
  process.exit(1);
});
