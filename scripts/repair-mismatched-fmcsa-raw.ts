/**
 * Task 005 — clear companies.fmcsa_raw when the census USDOT is not this company.
 * Does not call Google Places. Does not invent a replacement census payload.
 *
 * npm run repair:mismatched-fmcsa-raw -- --dry-run
 * npm run repair:mismatched-fmcsa-raw
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { extractUsdotFromFmcsaRaw } from '../lib/companies/public-display-name';
import { TASK_002_PROTECTED_IDENTITIES } from '../lib/federal-hhg/protected-identities';
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
  const dry = process.argv.includes('--dry-run');
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const rows = await client.query(
    `SELECT id, slug, name, usdot_number, fmcsa_raw
       FROM public.companies
      WHERE fmcsa_raw IS NOT NULL`
  );

  const mismatched: Array<{
    id: string;
    slug: string;
    name: string;
    usdot: string;
    rawDot: string | null;
  }> = [];

  for (const row of rows.rows as Array<{
    id: string;
    slug: string;
    name: string;
    usdot_number: string | null;
    fmcsa_raw: unknown;
  }>) {
    const canonical = normalizeUsdot(row.usdot_number ?? '');
    const rawDot = extractUsdotFromFmcsaRaw(row.fmcsa_raw);
    if (!rawDot || !canonical) continue;
    if (rawDot === canonical) continue;
    mismatched.push({
      id: row.id,
      slug: row.slug,
      name: row.name,
      usdot: canonical,
      rawDot,
    });
  }

  if (!dry && mismatched.length) {
    await client.query(
      `UPDATE public.companies
          SET fmcsa_raw = NULL
        WHERE id = ANY($1::text[])`,
      [mismatched.map((row) => row.id)]
    );
  }

  const protectedHits = mismatched.filter((row) =>
    Object.keys(TASK_002_PROTECTED_IDENTITIES).includes(row.id)
  );

  const report = {
    google_places_requests: 0,
    dry,
    scanned: rows.rowCount,
    mismatched: mismatched.length,
    cleared: dry ? 0 : mismatched.length,
    protected: protectedHits,
    sample: mismatched.slice(0, 20),
  };

  writeFileSync(
    resolve(process.cwd(), 'docs/task-005-mismatched-fmcsa-raw.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(JSON.stringify(report, null, 2));
  await client.end();
}

main().catch((error) => {
  console.error(
    String(error instanceof Error ? error.message : error).replace(
      /postgresql:\/\/[^@\s]+@/g,
      'postgresql://***@'
    )
  );
  process.exit(1);
});
