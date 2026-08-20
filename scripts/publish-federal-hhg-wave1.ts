/**
 * Publish Task 004 Wave 1 from federal_hhg_staging.
 * Never inserts IDENTITY_REVIEW_REQUIRED or INACTIVE rows.
 * Never calls Google Places.
 *
 * npm run publish:federal-hhg-wave1 -- --dry-run --limit 250
 * npm run publish:federal-hhg-wave1 -- --limit 250
 * npm run publish:federal-hhg-wave1 -- --limit 1000
 * npm run publish:federal-hhg-wave1 -- --indexable
 * npm run publish:federal-hhg-wave1 -- --rollback
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { selectWaveCandidates, waveSelectionStats } from '../lib/federal-hhg/select-wave';
import { TASK_002_PROTECTED_IDENTITIES } from '../lib/federal-hhg/protected-identities';
import {
  WAVE_ID,
  capabilitiesForClassification,
  entityTypeForClassification,
  isWave1Eligible,
  publicDisplayName,
  servicesForClassification,
  waveCompanyId,
  waveSlug,
  type StagedPublicationRow,
} from '../lib/federal-hhg/wave-eligibility';
import { normalizeUsdot } from '../lib/federal-hhg/normalize';

const SOURCE = 'FMCSA L&I carrier file (data.transportation.gov/6eyk-hxee)';
const COVERAGE =
  'Interstate household-goods authority — confirm origin and destination with this company';

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

function argNum(flag: string, fallback: number): number {
  const idx = process.argv.indexOf(flag);
  if (idx >= 0 && process.argv[idx + 1]) return Number(process.argv[idx + 1]);
  return fallback;
}

async function main() {
  loadEnv();
  const dry = process.argv.includes('--dry-run');
  const makeIndexable = process.argv.includes('--indexable');
  const rollback = process.argv.includes('--rollback');
  const limit = argNum('--limit', 250);
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const before = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable
      FROM public.companies
  `);

  if (rollback) {
    if (!dry) {
      await client.query('BEGIN');
      await client.query(
        `UPDATE public.companies c
            SET indexable = false, publication_state = 'INACTIVE'
           FROM public.federal_hhg_wave_publication w
          WHERE w.wave_id = $1 AND w.company_id = c.id AND w.status <> 'unpublished'`,
        [WAVE_ID]
      );
      await client.query(
        `UPDATE public.federal_hhg_wave_publication
            SET status = 'unpublished', indexable_at = NULL
          WHERE wave_id = $1 AND status <> 'unpublished'`,
        [WAVE_ID]
      );
      await client.query('COMMIT');
    }
    console.log(JSON.stringify({ rollback: true, dry, google_places_requests: 0 }, null, 2));
    await client.end();
    return;
  }

  if (makeIndexable) {
    if (!dry) {
      await client.query(
        `UPDATE public.companies c
            SET indexable = true
           FROM public.federal_hhg_wave_publication w
          WHERE w.wave_id = $1
            AND w.company_id = c.id
            AND w.status = 'published'
            AND c.publication_state = 'PUBLISHABLE'`,
        [WAVE_ID]
      );
      await client.query(
        `UPDATE public.federal_hhg_wave_publication
            SET indexable_at = now(), status = 'indexable'
          WHERE wave_id = $1 AND status = 'published'`,
        [WAVE_ID]
      );
    }
    const after = await client.query(`
      SELECT count(*)::int AS companies,
             count(*) FILTER (WHERE indexable)::int AS indexable
        FROM public.companies
    `);
    console.log(
      JSON.stringify(
        {
          indexable: true,
          dry,
          before: before.rows[0],
          after: after.rows[0],
          google_places_requests: 0,
        },
        null,
        2
      )
    );
    await client.end();
    return;
  }

  await client.query(`
    CREATE TABLE IF NOT EXISTS public.federal_hhg_wave_publication (
      wave_id text NOT NULL,
      usdot text NOT NULL,
      company_id text NOT NULL,
      slug text NOT NULL,
      classification text NOT NULL,
      selected_at timestamptz NOT NULL DEFAULT now(),
      published_at timestamptz,
      indexable_at timestamptz,
      status text NOT NULL DEFAULT 'published',
      source text,
      PRIMARY KEY (wave_id, usdot)
    )
  `);

  const staged = await client.query(`
    SELECT usdot, mc, legal_name, dba_name, phy_city, phy_state, phone,
           classification, disposition, hhg_carrier_verified, hhg_broker_verified, retrieved_at
      FROM public.federal_hhg_staging
  `);
  const rows = staged.rows as StagedPublicationRow[];
  const gateCounts: Record<string, number> = {};
  for (const row of rows) {
    const result = isWave1Eligible(row);
    gateCounts[result.reason] = (gateCounts[result.reason] ?? 0) + 1;
  }
  const eligible = rows.filter((row) => isWave1Eligible(row).eligible);
  const existing = await client.query(`SELECT id, slug, usdot_number FROM public.companies`);
  const existingDots = new Set(
    (existing.rows as Array<{ usdot_number: string | null }>)
      .map((row) => (row.usdot_number ?? '').replace(/\D/g, '').replace(/^0+/, ''))
      .filter(Boolean)
  );
  const takenSlugs = new Set(
    (existing.rows as Array<{ slug: string }>).map((row) => row.slug)
  );
  const existingIds = new Set((existing.rows as Array<{ id: string }>).map((row) => row.id));

  const publishable = eligible.filter((row) => !existingDots.has(normalizeUsdot(row.usdot)));
  const perStateCap = limit <= 250 ? 8 : 22;
  const selected = selectWaveCandidates(publishable, {
    limit,
    perStateCap,
    maxBrokers: limit <= 250 ? 40 : 200,
    maxDuals: limit <= 250 ? 25 : 80,
  });

  const audit = {
    carrier: selected.filter((r) => r.classification === 'HHG_CARRIER').slice(0, 25),
    broker: selected.filter((r) => r.classification === 'HHG_BROKER').slice(0, 15),
    dual: selected.filter((r) => r.classification === 'HHG_CARRIER_BROKER').slice(0, 10),
  };

  const docsDir = resolve(process.cwd(), 'docs');
  if (!existsSync(docsDir)) mkdirSync(docsDir);
  writeFileSync(
    resolve(docsDir, 'task-004-wave1-selection.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        gateCounts,
        eligible: eligible.length,
        publishable: publishable.length,
        selected: waveSelectionStats(selected),
        usdots: selected.map((row) => row.usdot),
        audit,
      },
      null,
      2
    ) + '\n'
  );

  if (dry) {
    console.log(
      JSON.stringify(
        {
          dry: true,
          google_places_requests: 0,
          before: before.rows[0],
          gateCounts,
          eligible: eligible.length,
          publishable: publishable.length,
          selected: waveSelectionStats(selected),
        },
        null,
        2
      )
    );
    await client.end();
    return;
  }

  let inserted = 0;
  let skipped = 0;
  await client.query('BEGIN');
  try {
    for (const row of selected) {
      const usdot = normalizeUsdot(row.usdot);
      const id = waveCompanyId(usdot);
      if (existingIds.has(id) || existingDots.has(usdot)) {
        skipped += 1;
        continue;
      }
      const name = publicDisplayName(row);
      const slug = waveSlug(name, usdot, takenSlugs);
      takenSlugs.add(slug);
      existingIds.add(id);
      existingDots.add(usdot);
      const entity = entityTypeForClassification(row.classification);
      const services = servicesForClassification(row.classification);
      const retrieved = row.retrieved_at ?? new Date().toISOString();
      const hq = [row.phy_city?.trim(), (row.phy_state ?? '').trim().toUpperCase()]
        .filter(Boolean)
        .join(', ');
      const roleLabel =
        row.classification === 'HHG_BROKER'
          ? 'household-goods broker'
          : row.classification === 'HHG_CARRIER_BROKER'
            ? 'household-goods carrier and broker'
            : 'household-goods motor carrier';
      const short = `Federally authorized interstate ${roleLabel} (USDOT ${usdot}). Confirm the current FMCSA SAFER record before booking.`;
      const description = `${name} is listed from FMCSA Licensing & Insurance evidence as an interstate ${roleLabel}. Legal name: ${row.legal_name}. Headquarters on the federal record: ${hq}. ${row.mc ? `MC-${row.mc}. ` : ''}This profile does not claim nationwide local coverage, auto-transport authority, or consumer ratings that are not yet on file.`;

      await client.query(
        `INSERT INTO public.companies (
           id, slug, name, short_description, description, headquarters, phone,
           usdot_number, mc_number, fmcsa_legal_name, fmcsa_safety_rating,
           fmcsa_complaints, fmcsa_shipments, authority_active, out_of_service,
           fmcsa_last_checked, entity_type, service_scope, coverage, services,
           specialties, overall_rating, review_count, reputation_score,
           years_in_business, avg_price_per_move, price_range, is_verified,
           last_updated, publication_state, indexable, legacy_directory_row
         ) VALUES (
           $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'Not Rated',0,0,true,false,
           $11,$12,'interstate',$13,$14::jsonb,'[]'::jsonb,0,0,0,0,0,NULL,true,
           now(),'PUBLISHABLE',false,false
         )
         ON CONFLICT (id) DO NOTHING`,
        [
          id,
          slug,
          name,
          short,
          description,
          hq,
          row.phone,
          usdot,
          row.mc,
          row.legal_name,
          retrieved,
          entity,
          COVERAGE,
          JSON.stringify(services),
        ]
      );
      const wrote = await client.query(`SELECT 1 FROM public.companies WHERE id = $1`, [id]);
      if (!wrote.rowCount) {
        skipped += 1;
        continue;
      }
      inserted += 1;
      for (const capability of capabilitiesForClassification(row.classification)) {
        await client.query(
          `INSERT INTO public.provider_capability (
             company_id, capability, evidence_source, evidence_state, evidence_at
           ) VALUES ($1,$2,$3,'VERIFIED',$4::timestamptz)
           ON CONFLICT (company_id, capability) DO UPDATE
             SET evidence_state = 'VERIFIED',
                 evidence_source = EXCLUDED.evidence_source,
                 evidence_at = EXCLUDED.evidence_at`,
          [id, capability, SOURCE, retrieved]
        );
      }
      await client.query(
        `INSERT INTO public.provider_authority (
           company_id, jurisdiction, authority_type, authority_number, issuing_agency, status, source, retrieved_at
         ) VALUES ($1,'federal','usdot_registration',$2,'FMCSA','active',$3,$4::timestamptz)
         ON CONFLICT DO NOTHING`,
        [id, usdot, SOURCE, retrieved]
      );
      if (row.mc) {
        await client.query(
          `INSERT INTO public.provider_authority (
             company_id, jurisdiction, authority_type, authority_number, issuing_agency, status, source, retrieved_at
           ) VALUES ($1,'federal','mc_docket',$2,'FMCSA','active',$3,$4::timestamptz)
           ON CONFLICT DO NOTHING`,
          [id, row.mc, SOURCE, retrieved]
        );
        if (row.hhg_carrier_verified) {
          await client.query(
            `INSERT INTO public.provider_authority (
               company_id, jurisdiction, authority_type, authority_number, issuing_agency, status, source, retrieved_at
             ) VALUES ($1,'federal','hhg_carrier',$2,'FMCSA','active',$3,$4::timestamptz)
             ON CONFLICT DO NOTHING`,
            [id, row.mc, SOURCE, retrieved]
          );
        }
        if (row.hhg_broker_verified) {
          await client.query(
            `INSERT INTO public.provider_authority (
               company_id, jurisdiction, authority_type, authority_number, issuing_agency, status, source, retrieved_at
             ) VALUES ($1,'federal','hhg_broker',$2,'FMCSA','active',$3,$4::timestamptz)
             ON CONFLICT DO NOTHING`,
            [id, row.mc, SOURCE, retrieved]
          );
        }
      }
      await client.query(
        `INSERT INTO public.federal_hhg_wave_publication (
           wave_id, usdot, company_id, slug, classification, published_at, status, source
         ) VALUES ($1,$2,$3,$4,$5,now(),'published',$6)
         ON CONFLICT (wave_id, usdot) DO NOTHING`,
        [WAVE_ID, usdot, id, slug, row.classification, SOURCE]
      );
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }

  const after = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable
      FROM public.companies
  `);
  const wave = await client.query(
    `SELECT classification, count(*)::int AS n
       FROM public.federal_hhg_wave_publication
      WHERE wave_id = $1 AND status <> 'unpublished'
      GROUP BY 1`,
    [WAVE_ID]
  );
  const protectedNow = await client.query(
    `SELECT id, usdot_number FROM public.companies WHERE id = ANY($1::text[]) ORDER BY 1`,
    [Object.keys(TASK_002_PROTECTED_IDENTITIES)]
  );

  const report = {
    google_places_requests: 0,
    dry: false,
    limit,
    inserted,
    skipped,
    before: before.rows[0],
    after: after.rows[0],
    wave: wave.rows,
    selected: waveSelectionStats(selected),
    gateCounts,
    protected: protectedNow.rows,
  };
  writeFileSync(resolve(docsDir, 'task-004-wave1-publish.json'), JSON.stringify(report, null, 2) + '\n');
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
