import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { normalizeUsdot } from '../lib/federal-hhg/normalize';

function loadEnv() {
  for (const file of ['.env.local', '.env.production.local']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const match = raw.trim().match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
      if (!process.env.DATABASE_URL && /^postgres/.test(value)) process.env.DATABASE_URL = value;
    }
  }
}

async function main() {
  loadEnv();
  const sel = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-008a-wave3-publish-selection.json'), 'utf8')
  ) as { usdots: string[] };
  const sample = sel.usdots.slice(0, 60);
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  const staged = await client.query(
    `SELECT usdot, mc, legal_name, dba_name, phy_city, phy_state, classification,
            disposition, hhg_carrier_verified, hhg_broker_verified
       FROM federal_hhg_staging
      WHERE regexp_replace(usdot, '\\D', '', 'g') = ANY($1::text[])`,
    [sample.map((d) => normalizeUsdot(d))]
  );
  const existing = await client.query(
    `SELECT regexp_replace(coalesce(usdot_number,''), '\\D', '', 'g') AS dot FROM companies`
  );
  await client.end();
  const existingDots = new Set(
    (existing.rows as Array<{ dot: string }>).map((r) => r.dot.replace(/^0+/, '')).filter(Boolean)
  );
  const failures: string[] = [];
  for (const row of staged.rows) {
    const usdot = normalizeUsdot(row.usdot);
    if (row.disposition !== 'NEW_CANONICAL_CANDIDATE') failures.push(`${usdot} disposition`);
    if (row.classification !== 'HHG_CARRIER' || !row.hhg_carrier_verified) failures.push(`${usdot} role`);
    if (!row.legal_name?.trim() || !row.phy_city?.trim()) failures.push(`${usdot} identity`);
    if (existingDots.has(usdot)) failures.push(`${usdot} collision`);
  }
  const report = {
    google_places_requests: 0,
    requested: sample.length,
    audited: staged.rows.length,
    failures,
    sample: staged.rows.slice(0, 60).map((r) => ({
      usdot: r.usdot,
      legal: r.legal_name,
      dba: r.dba_name,
      mc: r.mc,
      hq: `${r.phy_city}, ${r.phy_state}`,
    })),
  };
  writeFileSync(resolve(process.cwd(), 'docs/task-008a-precision-audit.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ audited: report.audited, failures: failures.length, google_places_requests: 0 }, null, 2));
  if (failures.length || staged.rows.length !== sample.length) process.exit(1);
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
