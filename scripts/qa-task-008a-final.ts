import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const PROTECTED = ['76235', '125563', '125550', '70719', '49922', '76628', '70851', '1398726'];

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
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  const unsafe = await client.query(`
    SELECT
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id='FEDERAL_HHG_2026_08_WAVE_1' AND status<>'unpublished') AS wave1,
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id='FEDERAL_HHG_2026_08_WAVE_2' AND status<>'unpublished') AS wave2,
      (SELECT count(*)::int FROM federal_hhg_wave_publication WHERE wave_id='FEDERAL_HHG_2026_08_WAVE_3' AND status<>'unpublished') AS wave3,
      (SELECT count(*) FILTER (WHERE status='indexable')::int FROM federal_hhg_wave_publication WHERE wave_id='FEDERAL_HHG_2026_08_WAVE_3') AS wave3_indexable_rows,
      (SELECT count(*)::int FROM companies) AS companies,
      (SELECT count(*) FILTER (WHERE indexable)::int FROM companies) AS indexable,
      (SELECT count(*)::int FROM provider_capability pc
        JOIN federal_hhg_wave_publication w ON w.company_id=pc.company_id
       WHERE w.wave_id='FEDERAL_HHG_2026_08_WAVE_3' AND w.status<>'unpublished'
         AND pc.capability IN ('hhg_local','hhg_intrastate','auto_carrier','auto_broker','hhg_broker')) AS false_caps,
      (SELECT count(*)::int FROM provider_capability pc
        JOIN federal_hhg_wave_publication w ON w.company_id=pc.company_id
       WHERE w.wave_id='FEDERAL_HHG_2026_08_WAVE_3' AND w.status<>'unpublished'
         AND pc.capability='hhg_interstate_carrier') AS carrier_caps,
      (SELECT count(*)::int FROM provider_authority pa
        JOIN federal_hhg_wave_publication w ON w.company_id=pa.company_id
       WHERE w.wave_id='FEDERAL_HHG_2026_08_WAVE_3' AND w.status<>'unpublished') AS authority_rows,
      (SELECT count(*)::int FROM federal_hhg_wave_publication w
        JOIN federal_hhg_staging s ON regexp_replace(s.usdot,'\\D','','g')=regexp_replace(w.usdot,'\\D','','g')
       WHERE w.wave_id='FEDERAL_HHG_2026_08_WAVE_3' AND w.status<>'unpublished'
         AND s.disposition<>'NEW_CANONICAL_CANDIDATE') AS review_pub,
      (SELECT count(*)::int FROM federal_hhg_wave_publication w
        JOIN federal_hhg_staging s ON regexp_replace(s.usdot,'\\D','','g')=regexp_replace(w.usdot,'\\D','','g')
       WHERE w.wave_id='FEDERAL_HHG_2026_08_WAVE_3' AND w.status<>'unpublished'
         AND s.classification<>'HHG_CARRIER') AS non_carrier_pub,
      (SELECT count(DISTINCT phy_state)::int FROM federal_hhg_wave_publication w
        JOIN federal_hhg_staging s ON regexp_replace(s.usdot,'\\D','','g')=regexp_replace(w.usdot,'\\D','','g')
       WHERE w.wave_id='FEDERAL_HHG_2026_08_WAVE_3' AND w.status<>'unpublished') AS wave3_states
  `);
  const remaining = await client.query(`
    SELECT count(*)::int AS remaining_us_dc
      FROM federal_hhg_staging s
     WHERE s.disposition='NEW_CANONICAL_CANDIDATE'
       AND s.classification='HHG_CARRIER'
       AND s.hhg_carrier_verified=true
       AND upper(coalesce(s.phy_state,'')) IN (
         'AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY'
       )
       AND NOT EXISTS (
         SELECT 1 FROM companies c
          WHERE regexp_replace(coalesce(c.usdot_number,''),'\\D','','g') = regexp_replace(s.usdot,'\\D','','g')
       )
  `);
  const protectedRows = await client.query(
    `SELECT id, slug, usdot_number, publication_state FROM companies
      WHERE regexp_replace(coalesce(usdot_number,''),'\\D','','g') = ANY($1::text[])
      ORDER BY usdot_number, id`,
    [PROTECTED]
  );
  const samples = await client.query(`
    SELECT c.slug, c.usdot_number, c.entity_type, c.indexable, s.legal_name, s.dba_name, s.phy_state
      FROM federal_hhg_wave_publication w
      JOIN companies c ON c.id=w.company_id
      JOIN federal_hhg_staging s ON regexp_replace(s.usdot,'\\D','','g')=regexp_replace(w.usdot,'\\D','','g')
     WHERE w.wave_id='FEDERAL_HHG_2026_08_WAVE_3' AND w.status<>'unpublished'
     ORDER BY c.usdot_number
     LIMIT 40
  `);
  await client.end();

  let failed = 0;
  const results = [];
  for (const row of samples.rows) {
    const res = await fetch(`https://www.movetrusthub.com/companies/${row.slug}`, { redirect: 'manual' });
    const html = await res.text();
    const failures: string[] = [];
    if (res.status !== 200) failures.push(`status ${res.status}`);
    if (!html.includes(String(row.usdot_number))) failures.push('missing USDOT');
    if (row.entity_type !== 'Carrier') failures.push('role');
    if (!/Carrier/.test(html)) failures.push('carrier badge');
    if (/All 50 States/.test(html)) failures.push('false national');
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((m) => m[1] ?? '')
      .join('\n');
    if (/aggregateRating/.test(ld)) failures.push('aggregateRating');
    if (/"Review"/.test(ld) && /reviewRating/.test(ld)) failures.push('review schema');
    if (!html.includes(`https://www.movetrusthub.com/companies/${row.slug}`)) failures.push('canonical');
    if (!/Claim this profile/i.test(html) && !/claim/i.test(html)) failures.push('claim');
    const robots = html.match(/name="robots" content="([^"]+)"/)?.[1] ?? '';
    if (row.indexable && /noindex/i.test(robots)) failures.push(`robots ${robots}`);
    if (!row.indexable && !/noindex/i.test(robots)) failures.push(`robots ${robots}`);
    if (failures.length) failed += 1;
    results.push({
      slug: row.slug,
      usdot: row.usdot_number,
      state: row.phy_state,
      status: res.status,
      robots,
      ok: failures.length === 0,
      failures,
    });
  }

  const report = {
    google_places_requests: 0,
    unsafe: unsafe.rows[0],
    remaining: remaining.rows[0],
    protected: protectedRows.rows,
    sampled: results.length,
    failed,
    results,
  };
  writeFileSync(resolve(process.cwd(), 'docs/task-008a-final-qa.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        unsafe: report.unsafe,
        remaining: report.remaining,
        sampled: report.sampled,
        failed: report.failed,
      },
      null,
      2
    )
  );
  const u = unsafe.rows[0];
  if (
    failed ||
    u.wave1 !== 1000 ||
    u.wave2 !== 1274 ||
    u.wave3 !== 1279 ||
    u.false_caps ||
    u.review_pub ||
    u.non_carrier_pub
  ) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
