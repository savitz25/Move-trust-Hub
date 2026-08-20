/**
 * Publish Task 006 Wave 2 from the Task 005 candidate manifest only.
 * Never inserts IDENTITY_REVIEW_REQUIRED, INACTIVE, or non-manifest USDOTs.
 * Never calls Google Places. Rollback isolates Wave 2 from Wave 1.
 *
 * npm run publish:federal-hhg-wave2 -- --dry-run --limit 250
 * npm run publish:federal-hhg-wave2 -- --limit 250
 * npm run publish:federal-hhg-wave2 -- --limit 1274
 * npm run publish:federal-hhg-wave2 -- --indexable
 * npm run publish:federal-hhg-wave2 -- --rollback
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { TASK_002_PROTECTED_IDENTITIES } from '../lib/federal-hhg/protected-identities';
import {
  WAVE_ID,
  WAVE_2_PUBLICATION_ID,
  capabilitiesForClassification,
  entityTypeForClassification,
  publicDisplayName,
  servicesForClassification,
  waveCompanyId,
  waveSlug,
  type StagedPublicationRow,
} from '../lib/federal-hhg/wave-eligibility';
import { normalizeUsdot } from '../lib/federal-hhg/normalize';
import {
  loadManifestUsdots,
  revalidateWave2Candidate,
  selectWave2Canary,
  type Wave2Candidate,
} from '../lib/federal-hhg/wave2-manifest';
import { waveSelectionStats } from '../lib/federal-hhg/select-wave';

const SOURCE = 'FMCSA L&I carrier file (data.transportation.gov/6eyk-hxee)';
const COVERAGE =
  'Interstate household-goods authority — confirm origin and destination with this company';
const MANIFEST_PATH = resolve(process.cwd(), 'docs/task-005-wave2-selection.json');

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

type ManifestFile = {
  publish?: boolean;
  candidates: Array<
    Wave2Candidate & {
      mc?: string | null;
      legal_name?: string | null;
      dba_name?: string | null;
      city?: string | null;
      phone?: string | null;
    }
  >;
};

function loadManifest(): ManifestFile {
  const parsed = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as ManifestFile;
  if (!Array.isArray(parsed.candidates)) throw new Error('Wave 2 manifest missing candidates');
  return parsed;
}

async function main() {
  loadEnv();
  const dry = process.argv.includes('--dry-run');
  const makeIndexable = process.argv.includes('--indexable');
  const rollback = process.argv.includes('--rollback');
  const limit = Math.min(argNum('--limit', 250), 1274);
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const before = await client.query(`
    SELECT count(*)::int AS companies,
           count(*) FILTER (WHERE indexable)::int AS indexable
      FROM public.companies
  `);
  const wave1 = await client.query(
    `SELECT count(*)::int AS n FROM public.federal_hhg_wave_publication
      WHERE wave_id = $1 AND status <> 'unpublished'`,
    [WAVE_ID]
  );

  if (rollback) {
    if (!dry) {
      await client.query('BEGIN');
      await client.query(
        `UPDATE public.companies c
            SET indexable = false, publication_state = 'INACTIVE'
           FROM public.federal_hhg_wave_publication w
          WHERE w.wave_id = $1 AND w.company_id = c.id AND w.status <> 'unpublished'`,
        [WAVE_2_PUBLICATION_ID]
      );
      await client.query(
        `UPDATE public.federal_hhg_wave_publication
            SET status = 'unpublished', indexable_at = NULL
          WHERE wave_id = $1 AND status <> 'unpublished'`,
        [WAVE_2_PUBLICATION_ID]
      );
      await client.query('COMMIT');
    }
    const wave1After = await client.query(
      `SELECT count(*)::int AS n FROM public.federal_hhg_wave_publication
        WHERE wave_id = $1 AND status <> 'unpublished'`,
      [WAVE_ID]
    );
    console.log(
      JSON.stringify(
        {
          rollback: true,
          dry,
          wave2: WAVE_2_PUBLICATION_ID,
          wave1_before: wave1.rows[0],
          wave1_after: wave1After.rows[0],
          google_places_requests: 0,
        },
        null,
        2
      )
    );
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
        [WAVE_2_PUBLICATION_ID]
      );
      await client.query(
        `UPDATE public.federal_hhg_wave_publication
            SET indexable_at = now(), status = 'indexable'
          WHERE wave_id = $1 AND status = 'published'`,
        [WAVE_2_PUBLICATION_ID]
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

  const manifest = loadManifest();
  const manifestDots = loadManifestUsdots(manifest.candidates);
  const staged = await client.query(
    `SELECT usdot, mc, legal_name, dba_name, phy_city, phy_state, phone,
            classification, disposition, hhg_carrier_verified, hhg_broker_verified, retrieved_at
       FROM public.federal_hhg_staging
      WHERE disposition = 'NEW_CANONICAL_CANDIDATE'
        AND classification IN ('HHG_CARRIER','HHG_BROKER')`
  );
  const existing = await client.query(`SELECT id, slug, usdot_number FROM public.companies`);
  const existingDots = new Set(
    (existing.rows as Array<{ usdot_number: string | null }>)
      .map((row) => normalizeUsdot(row.usdot_number ?? ''))
      .filter(Boolean)
  );
  const takenSlugs = new Set((existing.rows as Array<{ slug: string }>).map((row) => row.slug));
  const existingIds = new Set((existing.rows as Array<{ id: string }>).map((row) => row.id));
  const alreadyWave = await client.query(
    `SELECT usdot FROM public.federal_hhg_wave_publication
      WHERE wave_id = $1 AND status <> 'unpublished'`,
    [WAVE_2_PUBLICATION_ID]
  );
  const alreadyUsdots = new Set(
    (alreadyWave.rows as Array<{ usdot: string }>).map((row) => normalizeUsdot(row.usdot))
  );

  const stagedByDot = new Map<string, StagedPublicationRow>();
  for (const row of staged.rows as StagedPublicationRow[]) {
    stagedByDot.set(normalizeUsdot(row.usdot), row);
  }

  const excluded: Record<string, number> = {};
  const eligible: StagedPublicationRow[] = [];
  const eligibleMeta: Wave2Candidate[] = [];
  for (const candidate of manifest.candidates) {
    const usdot = normalizeUsdot(candidate.usdot);
    const stagedRow = stagedByDot.get(usdot);
    if (!stagedRow) {
      excluded.missing_staging = (excluded.missing_staging ?? 0) + 1;
      continue;
    }
    const check = revalidateWave2Candidate(stagedRow, manifestDots, existingDots);
    if (!check.ok) {
      excluded[check.reason] = (excluded[check.reason] ?? 0) + 1;
      continue;
    }
    if (alreadyUsdots.has(usdot)) {
      excluded.already_published = (excluded.already_published ?? 0) + 1;
      continue;
    }
    eligible.push(stagedRow);
    eligibleMeta.push({
      usdot,
      classification: stagedRow.classification,
      selection_rank: candidate.selection_rank,
      state: (stagedRow.phy_state ?? candidate.state ?? '').trim().toUpperCase(),
    });
  }

  const remaining = Math.max(0, limit - alreadyUsdots.size);
  const selectedMeta =
    limit <= 250 && alreadyUsdots.size === 0
      ? selectWave2Canary(eligibleMeta, { limit: remaining, maxBrokers: 50 })
      : [...eligibleMeta].sort((a, b) => a.selection_rank - b.selection_rank).slice(0, remaining);
  const selectedDots = new Set(selectedMeta.map((row) => row.usdot));
  const selected = eligible.filter((row) => selectedDots.has(normalizeUsdot(row.usdot)));

  const docsDir = resolve(process.cwd(), 'docs');
  if (!existsSync(docsDir)) mkdirSync(docsDir);
  writeFileSync(
    resolve(docsDir, 'task-006-wave2-publish-selection.json'),
    JSON.stringify(
      {
        google_places_requests: 0,
        wave_id: WAVE_2_PUBLICATION_ID,
        excluded,
        selected: waveSelectionStats(selected),
        usdots: selected.map((row) => normalizeUsdot(row.usdot)),
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
          wave1: wave1.rows[0],
          excluded,
          selected: waveSelectionStats(selected),
        },
        null,
        2
      )
    );
    await client.end();
    return;
  }

  const prepared = [];
  let skipped = 0;
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
    const hq = [row.phy_city?.trim(), (row.phy_state ?? '').trim().toUpperCase()]
      .filter(Boolean)
      .join(', ');
    const roleLabel =
      row.classification === 'HHG_BROKER'
        ? 'household-goods broker'
        : 'household-goods motor carrier';
    prepared.push({
      id,
      slug,
      name,
      usdot,
      row,
      hq,
      short: `Federally authorized interstate ${roleLabel} (USDOT ${usdot}). Confirm the current FMCSA SAFER record before booking.`,
      description: `${name} is listed from FMCSA Licensing & Insurance evidence as an interstate ${roleLabel}. Legal name: ${row.legal_name}. Headquarters on the federal record: ${hq}. ${row.mc ? `MC-${row.mc}. ` : ''}This profile does not claim nationwide local coverage, auto-transport authority, or consumer ratings that are not yet on file.`,
      entity: entityTypeForClassification(row.classification),
      services: servicesForClassification(row.classification),
      retrieved: row.retrieved_at ?? new Date().toISOString(),
    });
  }

  await client.query('BEGIN');
  try {
    const chunk = 100;
    for (let i = 0; i < prepared.length; i += chunk) {
      const slice = prepared.slice(i, i + chunk);
      const values: unknown[] = [];
      const placeholders: string[] = [];
      let p = 1;
      for (const item of slice) {
        placeholders.push(
          `($${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},'Not Rated',0,0,true,false,$${p++},$${p++},'interstate',$${p++},$${p++}::jsonb,'[]'::jsonb,0,0,0,0,0,NULL,true,now(),'PUBLISHABLE',false,false)`
        );
        values.push(
          item.id,
          item.slug,
          item.name,
          item.short,
          item.description,
          item.hq,
          item.row.phone,
          item.usdot,
          item.row.mc,
          item.row.legal_name,
          item.retrieved,
          item.entity,
          COVERAGE,
          JSON.stringify(item.services)
        );
      }
      await client.query(
        `INSERT INTO public.companies (
           id, slug, name, short_description, description, headquarters, phone,
           usdot_number, mc_number, fmcsa_legal_name, fmcsa_safety_rating,
           fmcsa_complaints, fmcsa_shipments, authority_active, out_of_service,
           fmcsa_last_checked, entity_type, service_scope, coverage, services,
           specialties, overall_rating, review_count, reputation_score,
           years_in_business, avg_price_per_move, price_range, is_verified,
           last_updated, publication_state, indexable, legacy_directory_row
         ) VALUES ${placeholders.join(',')}
         ON CONFLICT (id) DO NOTHING`,
        values
      );
    }

    const capValues: unknown[] = [];
    const capPh: string[] = [];
    let cp = 1;
    const authValues: unknown[] = [];
    const authPh: string[] = [];
    let ap = 1;
    const waveValues: unknown[] = [];
    const wavePh: string[] = [];
    let wp = 1;
    for (const item of prepared) {
      for (const capability of capabilitiesForClassification(item.row.classification)) {
        capPh.push(`($${cp++},$${cp++},$${cp++},'VERIFIED',$${cp++}::timestamptz)`);
        capValues.push(item.id, capability, SOURCE, item.retrieved);
      }
      authPh.push(
        `($${ap++},'federal','usdot_registration',$${ap++},'FMCSA','active',$${ap++},$${ap++}::timestamptz)`
      );
      authValues.push(item.id, item.usdot, SOURCE, item.retrieved);
      if (item.row.mc) {
        authPh.push(
          `($${ap++},'federal','mc_docket',$${ap++},'FMCSA','active',$${ap++},$${ap++}::timestamptz)`
        );
        authValues.push(item.id, item.row.mc, SOURCE, item.retrieved);
        if (item.row.hhg_carrier_verified) {
          authPh.push(
            `($${ap++},'federal','hhg_carrier',$${ap++},'FMCSA','active',$${ap++},$${ap++}::timestamptz)`
          );
          authValues.push(item.id, item.row.mc, SOURCE, item.retrieved);
        }
        if (item.row.hhg_broker_verified) {
          authPh.push(
            `($${ap++},'federal','hhg_broker',$${ap++},'FMCSA','active',$${ap++},$${ap++}::timestamptz)`
          );
          authValues.push(item.id, item.row.mc, SOURCE, item.retrieved);
        }
      }
      wavePh.push(
        `($${wp++},$${wp++},$${wp++},$${wp++},$${wp++},now(),'published',$${wp++})`
      );
      waveValues.push(
        WAVE_2_PUBLICATION_ID,
        item.usdot,
        item.id,
        item.slug,
        item.row.classification,
        SOURCE
      );
    }
    if (capValues.length) {
      await client.query(
        `INSERT INTO public.provider_capability (company_id, capability, evidence_source, evidence_state, evidence_at)
         VALUES ${capPh.join(',')}
         ON CONFLICT (company_id, capability) DO UPDATE
           SET evidence_state = 'VERIFIED',
               evidence_source = EXCLUDED.evidence_source,
               evidence_at = EXCLUDED.evidence_at`,
        capValues
      );
    }
    if (authValues.length) {
      await client.query(
        `INSERT INTO public.provider_authority (
           company_id, jurisdiction, authority_type, authority_number, issuing_agency, status, source, retrieved_at
         ) VALUES ${authPh.join(',')}
         ON CONFLICT DO NOTHING`,
        authValues
      );
    }
    if (waveValues.length) {
      await client.query(
        `INSERT INTO public.federal_hhg_wave_publication (
           wave_id, usdot, company_id, slug, classification, published_at, status, source
         ) VALUES ${wavePh.join(',')}
         ON CONFLICT (wave_id, usdot) DO NOTHING`,
        waveValues
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
    [WAVE_2_PUBLICATION_ID]
  );
  const protectedNow = await client.query(
    `SELECT id, usdot_number FROM public.companies WHERE id = ANY($1::text[]) ORDER BY 1`,
    [Object.keys(TASK_002_PROTECTED_IDENTITIES)]
  );
  const wave1After = await client.query(
    `SELECT count(*)::int AS n FROM public.federal_hhg_wave_publication
      WHERE wave_id = $1 AND status <> 'unpublished'`,
    [WAVE_ID]
  );

  const report = {
    google_places_requests: 0,
    dry: false,
    wave_id: WAVE_2_PUBLICATION_ID,
    limit,
    inserted: prepared.length,
    skipped,
    excluded,
    before: before.rows[0],
    after: after.rows[0],
    wave: wave.rows,
    selected: waveSelectionStats(selected),
    wave1: wave1After.rows[0],
    protected: protectedNow.rows,
  };
  writeFileSync(resolve(docsDir, 'task-006-wave2-publish.json'), JSON.stringify(report, null, 2) + '\n');
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
