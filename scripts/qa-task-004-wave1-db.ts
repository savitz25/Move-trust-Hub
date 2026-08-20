/**
 * Production Wave 1 identity / count audit. Never prints connection strings.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

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
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const companies = await client.query(`
    SELECT count(*)::int AS n,
           count(*) FILTER (WHERE indexable)::int AS indexable,
           count(*) FILTER (WHERE publication_state = 'PUBLISHABLE')::int AS publishable,
           count(*) FILTER (WHERE publication_state = 'REVIEW_REQUIRED')::int AS review_required,
           count(*) FILTER (WHERE publication_state = 'INACTIVE')::int AS inactive
      FROM public.companies
  `);

  const wave = await client.query(`
    SELECT classification,
           count(*)::int AS n,
           count(*) FILTER (WHERE status = 'indexable')::int AS indexable,
           count(*) FILTER (WHERE status = 'published')::int AS published,
           count(*) FILTER (WHERE status = 'unpublished')::int AS unpublished
      FROM public.federal_hhg_wave_publication
     WHERE wave_id = 'FEDERAL_HHG_2026_08_WAVE_1'
     GROUP BY 1
     ORDER BY 1
  `);

  const waveTotals = await client.query(`
    SELECT count(*)::int AS n,
           count(*) FILTER (WHERE status <> 'unpublished')::int AS live,
           count(*) FILTER (WHERE status = 'indexable')::int AS indexable
      FROM public.federal_hhg_wave_publication
     WHERE wave_id = 'FEDERAL_HHG_2026_08_WAVE_1'
  `);

  const unsafe = await client.query(`
    SELECT
      (SELECT count(*)::int FROM federal_hhg_wave_publication w
         JOIN federal_hhg_staging s ON s.usdot = w.usdot
        WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1'
          AND w.status <> 'unpublished'
          AND s.disposition <> 'NEW_CANONICAL_CANDIDATE') AS review_or_other_disposition,
      (SELECT count(*)::int FROM federal_hhg_wave_publication w
         JOIN federal_hhg_staging s ON s.usdot = w.usdot
        WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1'
          AND w.status <> 'unpublished'
          AND s.classification = 'INACTIVE') AS inactive_published,
      (SELECT count(*)::int FROM companies
        WHERE id IN (SELECT company_id FROM federal_hhg_wave_publication
                      WHERE wave_id = 'FEDERAL_HHG_2026_08_WAVE_1' AND status <> 'unpublished')
          AND coverage ILIKE '%all 50%') AS false_national,
      (SELECT count(*)::int FROM provider_capability pc
         JOIN federal_hhg_wave_publication w ON w.company_id = pc.company_id
        WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1'
          AND w.status <> 'unpublished'
          AND pc.capability IN ('hhg_local','auto_carrier','auto_broker')) AS false_local_or_auto,
      (SELECT count(*)::int FROM companies c
         JOIN federal_hhg_wave_publication w ON w.company_id = c.id
        WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1' AND w.status <> 'unpublished'
          AND (c.google_data IS NOT NULL OR COALESCE(c.overall_rating,0) > 0)
      ) AS unexpected_ratings
  `);

  const caps = await client.query(`
    SELECT capability, evidence_state, count(*)::int AS n
      FROM provider_capability pc
      JOIN federal_hhg_wave_publication w ON w.company_id = pc.company_id
     WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1' AND w.status <> 'unpublished'
     GROUP BY 1, 2
     ORDER BY 1, 2
  `);

  const auths = await client.query(`
    SELECT authority_type, count(*)::int AS n
      FROM provider_authority pa
      JOIN federal_hhg_wave_publication w ON w.company_id = pa.company_id
     WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1' AND w.status <> 'unpublished'
     GROUP BY 1
     ORDER BY 1
  `);

  const states = await client.query(`
    SELECT upper(split_part(c.headquarters, ', ', 2)) AS state, count(*)::int AS n
      FROM companies c
      JOIN federal_hhg_wave_publication w ON w.company_id = c.id
     WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1' AND w.status <> 'unpublished'
     GROUP BY 1
     ORDER BY 1
  `);

  const remaining = await client.query(`
    SELECT classification, count(*)::int AS n
      FROM federal_hhg_staging
     WHERE disposition = 'NEW_CANONICAL_CANDIDATE'
       AND usdot NOT IN (
         SELECT usdot FROM federal_hhg_wave_publication
          WHERE wave_id = 'FEDERAL_HHG_2026_08_WAVE_1' AND status <> 'unpublished'
       )
     GROUP BY 1
     ORDER BY 1
  `);

  const samples = await client.query(`
    SELECT w.classification, c.slug, c.name, c.usdot_number, c.mc_number, c.entity_type,
           c.indexable, c.publication_state, c.phone IS NOT NULL AS has_phone,
           c.fmcsa_legal_name, c.headquarters
      FROM federal_hhg_wave_publication w
      JOIN companies c ON c.id = w.company_id
     WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1' AND w.status <> 'unpublished'
     ORDER BY w.classification, c.usdot_number
  `);

  const existing = await client.query(`
    SELECT id, slug, usdot_number FROM companies
     WHERE id IN ('allied','mayflower','atlas','wheaton','arpin','national','north-american','graebel')
     ORDER BY 1
  `);

  const slugCollisions = await client.query(`
    SELECT slug, count(*)::int AS n FROM companies GROUP BY 1 HAVING count(*) > 1
  `);
  const usdotCollisions = await client.query(`
    SELECT regexp_replace(usdot_number, '\\D', '', 'g') AS dot, count(*)::int AS n
      FROM companies
     WHERE usdot_number IS NOT NULL AND usdot_number <> ''
     GROUP BY 1 HAVING count(*) > 1
  `);

  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        companies: companies.rows[0],
        waveTotals: waveTotals.rows[0],
        wave,
        unsafe: unsafe.rows[0],
        caps: caps.rows,
        auths: auths.rows,
        states: states.rows.length,
        stateList: states.rows,
        remaining: remaining.rows,
        existing: existing.rows,
        slugCollisions: slugCollisions.rows,
        usdotCollisions: usdotCollisions.rows,
        sampleByRole: {
          carrier: samples.rows.filter((r) => r.classification === 'HHG_CARRIER').slice(0, 10),
          broker: samples.rows.filter((r) => r.classification === 'HHG_BROKER').slice(0, 5),
          dual: samples.rows.filter((r) => r.classification === 'HHG_CARRIER_BROKER').slice(0, 5),
        },
      },
      null,
      2
    )
  );
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
