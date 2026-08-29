/**
 * MOVE-PROFILE-001 read-only Production census (P1–P14). db_writes = 0.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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
  OR publication_state NOT IN ('REVIEW_REQUIRED', 'INACTIVE', 'INGESTED', 'CLASSIFIED')
`;

const SAMPLE_COLS = `
  id, slug, name, fmcsa_legal_name, usdot_number, mc_number, headquarters,
  entity_type, publication_state, authority_active, fmcsa_last_checked, review_count
`;

async function main() {
  const url = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  if (!url) throw new Error('DATABASE_URL missing');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    const p1 = await client.query(`SELECT count(*)::int AS n FROM companies WHERE ${VISIBLE}`);
    const p2 = await client.query(`
      SELECT coalesce(publication_state, 'NULL') AS publication_state, count(*)::int AS n
        FROM companies WHERE ${VISIBLE}
       GROUP BY 1 ORDER BY n DESC
    `);
    const p3 = await client.query(`
      SELECT
        count(*) FILTER (WHERE btrim(coalesce(name, '')) <> '')::int AS public_name,
        count(*) FILTER (WHERE btrim(coalesce(fmcsa_legal_name, '')) <> '')::int AS legal_name,
        count(*) FILTER (WHERE btrim(coalesce(usdot_number, '')) <> '')::int AS usdot,
        count(*) FILTER (WHERE btrim(coalesce(mc_number, '')) <> '')::int AS mc,
        count(*) FILTER (WHERE btrim(coalesce(headquarters, '')) <> '')::int AS hq
      FROM companies WHERE ${VISIBLE}
    `);
    const p4 = await client.query(`
      SELECT count(*)::int AS n
        FROM companies
       WHERE (${VISIBLE})
         AND btrim(coalesce(fmcsa_legal_name, '')) <> ''
         AND lower(btrim(name)) <> lower(btrim(fmcsa_legal_name))
    `);
    const p5 = await client.query(`
      SELECT count(*)::int AS keys FROM (
        SELECT lower(btrim(name)) FROM companies WHERE ${VISIBLE} GROUP BY 1 HAVING count(*) > 1
      ) s
    `);
    const p5b = await client.query(`
      SELECT coalesce(sum(c), 0)::int AS profiles FROM (
        SELECT count(*) AS c FROM companies WHERE ${VISIBLE} GROUP BY lower(btrim(name)) HAVING count(*) > 1
      ) s
    `);
    const p6 = await client.query(`
      SELECT count(*)::int AS n FROM companies
       WHERE (${VISIBLE}) AND lower(btrim(name)) = 'two men and a truck'
    `);
    const p7 = await client.query(`
      SELECT
        count(*) FILTER (WHERE lower(btrim(coalesce(entity_type, ''))) IN ('carrier'))::int AS carrier_entity,
        count(*) FILTER (WHERE lower(btrim(coalesce(entity_type, ''))) IN ('broker'))::int AS broker_entity,
        count(*) FILTER (
          WHERE lower(btrim(coalesce(entity_type, ''))) IN ('carrier/broker', 'carrier / broker')
        )::int AS dual_entity,
        count(*) FILTER (WHERE btrim(coalesce(entity_type, '')) = '')::int AS blank_entity
      FROM companies WHERE ${VISIBLE}
    `);
    const p8 = await client.query(`
      SELECT
        count(*) FILTER (WHERE authority_active IS TRUE)::int AS authority_true,
        count(*) FILTER (WHERE authority_active IS FALSE)::int AS authority_false,
        count(*) FILTER (WHERE authority_active IS NULL)::int AS authority_null
      FROM companies WHERE ${VISIBLE}
    `);
    const p9 = await client.query(`
      SELECT
        count(*) FILTER (WHERE fmcsa_last_checked IS NOT NULL)::int AS has_refresh,
        count(*) FILTER (WHERE fmcsa_last_checked IS NULL)::int AS missing_refresh
      FROM companies WHERE ${VISIBLE}
    `);
    const p10 = await client.query(`
      SELECT
        count(*) FILTER (
          WHERE btrim(coalesce(usdot_number, '')) <> '' AND btrim(coalesce(mc_number, '')) <> ''
        )::int AS usdot_and_mc,
        count(*) FILTER (
          WHERE btrim(coalesce(usdot_number, '')) <> '' AND btrim(coalesce(mc_number, '')) = ''
        )::int AS usdot_no_mc,
        count(*) FILTER (
          WHERE btrim(coalesce(usdot_number, '')) = '' AND btrim(coalesce(mc_number, '')) <> ''
        )::int AS mc_no_usdot,
        count(*) FILTER (
          WHERE btrim(coalesce(usdot_number, '')) = '' AND btrim(coalesce(mc_number, '')) = ''
        )::int AS neither
      FROM companies WHERE ${VISIBLE}
    `);
    const p11 = await client.query(`
      SELECT
        count(*) FILTER (WHERE coalesce(review_count, 0) > 0)::int AS has_reviews,
        count(*) FILTER (WHERE coalesce(reputation_score, 0) > 0)::int AS has_reputation_score
      FROM companies WHERE ${VISIBLE}
    `);
    const p12 = await client.query(`
      SELECT count(*)::int AS n FROM companies
       WHERE (${VISIBLE})
         AND (
           lower(coalesce(headquarters, '')) LIKE '%, fl'
           OR lower(coalesce(headquarters, '')) LIKE '%, fl %'
           OR lower(coalesce(headquarters, '')) LIKE '%florida%'
         )
    `);
    const p13 = await client.query(`
      SELECT count(*)::int AS n FROM companies
       WHERE publication_state IN ('REVIEW_REQUIRED', 'INACTIVE', 'INGESTED', 'CLASSIFIED')
    `);
    const p14 = await client.query(`
      SELECT count(*)::int AS n FROM companies
    `);

    const samples = {
      uniqueCarrier: (
        await client.query(`
          SELECT ${SAMPLE_COLS} FROM companies c
           WHERE (${VISIBLE})
             AND lower(btrim(coalesce(c.entity_type, ''))) = 'carrier'
             AND btrim(coalesce(c.usdot_number, '')) <> ''
             AND btrim(coalesce(c.mc_number, '')) <> ''
             AND (
               btrim(coalesce(c.fmcsa_legal_name, '')) = ''
               OR lower(btrim(c.name)) = lower(btrim(c.fmcsa_legal_name))
             )
             AND NOT EXISTS (
               SELECT 1 FROM companies x
                WHERE (x.publication_state IS NULL
                       OR x.publication_state NOT IN ('REVIEW_REQUIRED', 'INACTIVE', 'INGESTED', 'CLASSIFIED'))
                  AND lower(btrim(x.name)) = lower(btrim(c.name))
                  AND x.id <> c.id
             )
           ORDER BY c.slug
           LIMIT 3
        `)
      ).rows,
      broker: (
        await client.query(`
          SELECT ${SAMPLE_COLS} FROM companies
           WHERE (${VISIBLE}) AND lower(btrim(coalesce(entity_type, ''))) = 'broker'
             AND (lower(name) LIKE '%shifl%'
               OR regexp_replace(coalesce(usdot_number, ''), '\\D', '', 'g') = '3244649')
           LIMIT 3
        `)
      ).rows,
      mismatch: (
        await client.query(`
          SELECT ${SAMPLE_COLS} FROM companies
           WHERE (${VISIBLE})
             AND btrim(coalesce(fmcsa_legal_name, '')) <> ''
             AND lower(btrim(name)) <> lower(btrim(fmcsa_legal_name))
             AND slug = 'two-men-and-a-truck-usdot-1199826'
           LIMIT 1
        `)
      ).rows,
      duplicateBrand: (
        await client.query(`
          SELECT ${SAMPLE_COLS} FROM companies
           WHERE (${VISIBLE}) AND lower(btrim(name)) = 'two men and a truck'
           ORDER BY usdot_number NULLS LAST
           LIMIT 3
        `)
      ).rows,
      sparse: (
        await client.query(`
          SELECT ${SAMPLE_COLS} FROM companies
           WHERE (${VISIBLE}) AND slug IN ('gentletouch-moving-company')
           LIMIT 1
        `)
      ).rows,
      dual: (
        await client.query(`
          SELECT ${SAMPLE_COLS} FROM companies
           WHERE (${VISIBLE})
             AND lower(btrim(coalesce(entity_type, ''))) IN ('carrier/broker', 'carrier / broker')
             AND btrim(coalesce(usdot_number, '')) <> ''
           ORDER BY slug LIMIT 2
        `)
      ).rows,
      usdotNoMc: (
        await client.query(`
          SELECT ${SAMPLE_COLS} FROM companies
           WHERE (${VISIBLE})
             AND btrim(coalesce(usdot_number, '')) <> ''
             AND btrim(coalesce(mc_number, '')) = ''
           ORDER BY slug LIMIT 2
        `)
      ).rows,
      missingFreshness: (
        await client.query(`
          SELECT ${SAMPLE_COLS} FROM companies
           WHERE (${VISIBLE}) AND fmcsa_last_checked IS NULL
             AND btrim(coalesce(usdot_number, '')) <> ''
           ORDER BY slug LIMIT 2
        `)
      ).rows,
    };

    const out = {
      asOf: new Date().toISOString(),
      db_writes: 0,
      p1_public_cohort: p1.rows[0].n,
      p2_publication_states: p2.rows,
      p3_identity_coverage: p3.rows[0],
      p4_display_ne_legal: p4.rows[0].n,
      p5_duplicate_name_keys: p5.rows[0].keys,
      p5b_duplicate_name_profiles: p5b.rows[0].profiles,
      p6_two_men_and_a_truck: p6.rows[0].n,
      p7_entity_type: p7.rows[0],
      p8_authority: p8.rows[0],
      p9_freshness: p9.rows[0],
      p10_identifiers: p10.rows[0],
      p11_reviews_and_score: p11.rows[0],
      p12_florida_hq_like: p12.rows[0].n,
      p13_non_public_states: p13.rows[0].n,
      p14_companies_table_total: p14.rows[0].n,
      samples,
    };

    const dir = resolve('artifacts/move-profile-001');
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, 'census.json'), JSON.stringify(out, null, 2));
    console.log(JSON.stringify(out, null, 2));
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(
    String(err instanceof Error ? err.message : err).replace(
      /postgres(?:ql)?:\/\/[^@\s]+@/gi,
      'postgresql://***@',
    ),
  );
  process.exit(1);
});
