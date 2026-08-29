/**
 * MOVE-SEARCH-001 hard-start audit against Production. Read-only.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pg from 'pg';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env.production.local', '.env']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

loadEnvFiles();

const VISIBLE = `
  publication_state IS NULL
  OR publication_state IN ('PUBLISHABLE', 'INDEXABLE', 'VERIFIED')
`;

async function main() {
  const url = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  if (!url) throw new Error('DATABASE_URL missing');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    const ext = await client.query(
      `SELECT extname, extversion FROM pg_extension WHERE extname IN ('pg_trgm', 'fuzzystrmatch')`
    );
    const cohort = await client.query(`SELECT count(*)::int AS n FROM companies WHERE ${VISIBLE}`);
    const coverage = await client.query(`
      SELECT
        count(*) FILTER (WHERE btrim(coalesce(name, '')) <> '')::int AS public_name,
        count(*) FILTER (WHERE btrim(coalesce(fmcsa_legal_name, '')) <> '')::int AS legal_name,
        count(*) FILTER (WHERE btrim(coalesce(usdot_number, '')) <> '')::int AS usdot,
        count(*) FILTER (WHERE btrim(coalesce(mc_number, '')) <> '')::int AS mc,
        count(*) FILTER (WHERE btrim(coalesce(headquarters, '')) <> '')::int AS hq,
        count(*) FILTER (
          WHERE btrim(coalesce(fmcsa_legal_name, '')) <> ''
            AND lower(btrim(name)) <> lower(btrim(fmcsa_legal_name))
        )::int AS display_ne_legal
      FROM companies
      WHERE ${VISIBLE}
    `);
    const dupKeys = await client.query(`
      SELECT count(*)::int AS n FROM (
        SELECT lower(btrim(name)) AS k
          FROM companies
         WHERE ${VISIBLE}
         GROUP BY 1
        HAVING count(*) > 1
      ) s
    `);
    const dupProfiles = await client.query(`
      SELECT coalesce(sum(c), 0)::int AS n FROM (
        SELECT count(*) AS c
          FROM companies
         WHERE ${VISIBLE}
         GROUP BY lower(btrim(name))
        HAVING count(*) > 1
      ) s
    `);
    const twoMen = await client.query(`
      SELECT count(*)::int AS n
        FROM companies
       WHERE (${VISIBLE})
         AND lower(btrim(name)) = 'two men and a truck'
    `);
    const shifl = await client.query(`
      SELECT id, slug, name, fmcsa_legal_name, usdot_number, mc_number, headquarters, publication_state
        FROM companies
       WHERE (${VISIBLE})
         AND (
           lower(name) LIKE '%shifl%'
           OR regexp_replace(coalesce(usdot_number, ''), '\\D', '', 'g') = '3244649'
           OR regexp_replace(coalesce(mc_number, ''), '\\D', '', 'g') = '1019808'
         )
       ORDER BY name
       LIMIT 10
    `);
    const colleg = await client.query(`
      SELECT count(*)::int AS n
        FROM companies
       WHERE (${VISIBLE})
         AND (
           lower(name) LIKE '%college hunks%'
           OR lower(coalesce(fmcsa_legal_name, '')) LIKE '%college hunks%'
         )
    `);
    const indexes = await client.query(`
      SELECT indexname FROM pg_indexes
       WHERE tablename = 'companies'
         AND (indexname LIKE '%name%' OR indexname LIKE '%usdot%' OR indexname LIKE '%mc_%' OR indexname LIKE '%trgm%')
       ORDER BY 1
    `);
    const rpcs = await client.query(`
      SELECT p.proname
        FROM pg_proc p
        JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public'
         AND p.proname LIKE 'directory%'
       ORDER BY 1
    `);

    const out = {
      extensions: ext.rows,
      cohort: cohort.rows[0],
      coverage: coverage.rows[0],
      duplicateNameKeys: dupKeys.rows[0],
      duplicateNameProfiles: dupProfiles.rows[0],
      twoMenAndATruck: twoMen.rows[0],
      shifl: shifl.rows,
      collegeHunks: colleg.rows[0],
      indexes: indexes.rows.map((r) => r.indexname),
      rpcs: rpcs.rows.map((r) => r.proname),
    };
    console.log(JSON.stringify(out, null, 2));
    writeFileSync(resolve('docs/move-search-001-baseline.json'), JSON.stringify(out, null, 2));
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(String(err instanceof Error ? err.message : err).replace(/postgres(?:ql)?:\/\/[^@\s]+@/gi, 'postgresql://***@'));
  process.exit(1);
});
