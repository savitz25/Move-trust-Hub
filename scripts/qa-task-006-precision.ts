import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { existsSync } from 'fs';
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
    readFileSync(resolve(process.cwd(), 'docs/task-006-wave2-publish-selection.json'), 'utf8')
  ) as { usdots: string[] };
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
    [sel.usdots.map((d) => normalizeUsdot(d))]
  );
  const existing = await client.query(
    `SELECT regexp_replace(usdot_number, '\\D', '', 'g') AS dot FROM companies
      WHERE usdot_number IS NOT NULL AND usdot_number <> ''`
  );
  await client.end();
  const existingDots = new Set(
    (existing.rows as Array<{ dot: string }>).map((row) => row.dot.replace(/^0+/, ''))
  );
  const failures: string[] = [];
  const carriers = staged.rows.filter((r) => r.classification === 'HHG_CARRIER');
  const brokers = staged.rows.filter((r) => r.classification === 'HHG_BROKER');
  for (const row of staged.rows) {
    const usdot = normalizeUsdot(row.usdot);
    if (row.disposition !== 'NEW_CANONICAL_CANDIDATE') failures.push(`${usdot} disposition`);
    if (!row.legal_name?.trim() || !row.phy_city?.trim()) failures.push(`${usdot} identity`);
    if (existingDots.has(usdot)) failures.push(`${usdot} collision`);
    if (row.classification === 'HHG_CARRIER' && !row.hhg_carrier_verified) {
      failures.push(`${usdot} carrier unverified`);
    }
    if (row.classification === 'HHG_BROKER' && !row.hhg_broker_verified) {
      failures.push(`${usdot} broker unverified`);
    }
  }
  const report = {
    google_places_requests: 0,
    audited: staged.rows.length,
    carriers: carriers.length,
    brokers: brokers.length,
    failures,
    sampleCarrier: carriers.slice(0, 40).map((r) => ({
      usdot: r.usdot,
      legal: r.legal_name,
      dba: r.dba_name,
      mc: r.mc,
      hq: `${r.phy_city}, ${r.phy_state}`,
    })),
    sampleBroker: brokers.slice(0, 30).map((r) => ({
      usdot: r.usdot,
      legal: r.legal_name,
      dba: r.dba_name,
      mc: r.mc,
      hq: `${r.phy_city}, ${r.phy_state}`,
    })),
  };
  writeFileSync(resolve(process.cwd(), 'docs/task-006-precision-audit.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ audited: report.audited, carriers: report.carriers, brokers: report.brokers, failures: failures.length, google_places_requests: 0 }, null, 2));
  if (failures.length) process.exit(1);
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
