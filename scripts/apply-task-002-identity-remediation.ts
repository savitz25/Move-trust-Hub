/**
 * Apply Task 002 federal identity remediation for the three USDOT collision groups.
 * Never prints secrets. Does not call Google Places.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

const { Client } = pg;

function loadEnvFiles() {
  for (const file of ['.env.local', '.env.production.local']) {
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
      if (!process.env.DATABASE_URL && /^postgres(ql)?:\/\//i.test(value)) {
        process.env.DATABASE_URL = value;
      }
    }
  }
}

function sanitize(error: unknown): string {
  return String(error instanceof Error ? error.message : error)
    .replace(/postgres(?:ql)?:\/\/[^@\s]+@/gi, 'postgresql://***@')
    .replace(/webKey=[^&\s]+/gi, 'webKey=***');
}

const COHORT_IDS = [
  'allied',
  'mayflower',
  'atlas',
  'wheaton',
  'graebel',
  'arpin',
  'national',
  'north-american',
  'northern-michigan-moving',
  'northern-michigan-moving-2',
  'a-c-white-transfer-storage',
  'secure-moving-storage',
];

type AuthorityRow = {
  type: 'hhg_carrier' | 'hhg_broker' | 'usdot_registration' | 'mc_docket';
  number: string | null;
  status: 'active' | 'inactive';
};

type CompanyFix = {
  id: string;
  usdot: string | null;
  mc: string | null;
  legalName: string;
  entityType: string;
  serviceScope: 'interstate';
  publicationState: 'PUBLISHABLE' | 'REVIEW_REQUIRED' | 'INACTIVE';
  indexable: boolean;
  authorityActive: boolean;
  outcome: string;
  notes: string;
  sourceUrl: string;
  capabilities: Array<{ capability: 'hhg_interstate_carrier' | 'hhg_broker'; verified: boolean }>;
  authorities: AuthorityRow[];
  historical?: boolean;
};

const SOURCE = 'https://mobile.fmcsa.dot.gov/qc/services/carriers';
const RETRIEVED = '2026-08-20T03:21:56.879Z';

const FIXES: CompanyFix[] = [
  {
    id: 'allied',
    usdot: '76235',
    mc: '15735',
    legalName: 'ALLIED VAN LINES INC',
    entityType: 'Carrier/Broker',
    serviceScope: 'interstate',
    publicationState: 'PUBLISHABLE',
    indexable: true,
    authorityActive: true,
    outcome: 'NETWORK_OR_VAN_LINE',
    notes:
      'USDOT 125563 belongs to MAYFLOWER TRANSIT LLC, not Allied. FMCSA QC: ALLIED VAN LINES INC USDOT 76235 MC-15735, authorizedForHouseholdGoods=Y, common/contract/broker Active. Van-line network; agents have separate USDOTs.',
    sourceUrl: `${SOURCE}/76235/authority`,
    capabilities: [
      { capability: 'hhg_interstate_carrier', verified: true },
      { capability: 'hhg_broker', verified: true },
    ],
    authorities: [
      { type: 'hhg_carrier', number: '15735', status: 'active' },
      { type: 'hhg_broker', number: '15735', status: 'active' },
      { type: 'usdot_registration', number: '76235', status: 'active' },
      { type: 'mc_docket', number: '15735', status: 'active' },
    ],
  },
  {
    id: 'mayflower',
    usdot: '125563',
    mc: '2934',
    legalName: 'MAYFLOWER TRANSIT LLC',
    entityType: 'Carrier/Broker',
    serviceScope: 'interstate',
    publicationState: 'PUBLISHABLE',
    indexable: true,
    authorityActive: true,
    outcome: 'BRAND_WITH_OPERATING_ENTITY',
    notes:
      'USDOT 125563 is the authentic Mayflower registrant (MAYFLOWER TRANSIT LLC DBA AERO MAYFLOWER TRANSIT COMPANY), not a shared placeholder. Other brands must not reuse this number. HHG carrier+broker authority Active, MC-2934.',
    sourceUrl: `${SOURCE}/125563/authority`,
    capabilities: [
      { capability: 'hhg_interstate_carrier', verified: true },
      { capability: 'hhg_broker', verified: true },
    ],
    authorities: [
      { type: 'hhg_carrier', number: '2934', status: 'active' },
      { type: 'hhg_broker', number: '2934', status: 'active' },
      { type: 'usdot_registration', number: '125563', status: 'active' },
      { type: 'mc_docket', number: '2934', status: 'active' },
    ],
  },
  {
    id: 'atlas',
    usdot: '125550',
    mc: '79658',
    legalName: 'ATLAS VAN LINES INC',
    entityType: 'Carrier/Broker',
    serviceScope: 'interstate',
    publicationState: 'PUBLISHABLE',
    indexable: true,
    authorityActive: true,
    outcome: 'NETWORK_OR_VAN_LINE',
    notes:
      'USDOT 125563 is Mayflower. Atlas van-line registrant is ATLAS VAN LINES INC USDOT 125550 MC-79658 with authorizedForHouseholdGoods=Y and active common/contract/broker. Separate MC-130921 is broker-only and is not used as the network HHG identity.',
    sourceUrl: `${SOURCE}/125550/authority`,
    capabilities: [
      { capability: 'hhg_interstate_carrier', verified: true },
      { capability: 'hhg_broker', verified: true },
    ],
    authorities: [
      { type: 'hhg_carrier', number: '79658', status: 'active' },
      { type: 'hhg_broker', number: '79658', status: 'active' },
      { type: 'usdot_registration', number: '125550', status: 'active' },
      { type: 'mc_docket', number: '79658', status: 'active' },
    ],
  },
  {
    id: 'wheaton',
    usdot: '70719',
    mc: '87113',
    legalName: 'WHEATON VAN LINES INC',
    entityType: 'Carrier',
    serviceScope: 'interstate',
    publicationState: 'PUBLISHABLE',
    indexable: true,
    authorityActive: true,
    outcome: 'NETWORK_OR_VAN_LINE',
    notes:
      'USDOT 125563 is Mayflower. Wheaton is WHEATON VAN LINES INC DBA WHEATON WORLD WIDE MOVING, USDOT 70719 MC-87113, HHG common/contract Active, broker None. Do not claim broker authority.',
    sourceUrl: `${SOURCE}/70719/authority`,
    capabilities: [{ capability: 'hhg_interstate_carrier', verified: true }],
    authorities: [
      { type: 'hhg_carrier', number: '87113', status: 'active' },
      { type: 'usdot_registration', number: '70719', status: 'active' },
      { type: 'mc_docket', number: '87113', status: 'active' },
    ],
  },
  {
    id: 'arpin',
    usdot: '49922',
    mc: '621',
    legalName: 'ARPIN MOVING INC',
    entityType: 'Carrier/Broker',
    serviceScope: 'interstate',
    publicationState: 'PUBLISHABLE',
    indexable: true,
    authorityActive: true,
    outcome: 'NETWORK_OR_VAN_LINE',
    notes:
      'USDOT 125563 is Mayflower. Arpin registrant is ARPIN MOVING INC USDOT 49922 MC-621, authorizedForHouseholdGoods=Y, common/contract/broker Active.',
    sourceUrl: `${SOURCE}/49922/authority`,
    capabilities: [
      { capability: 'hhg_interstate_carrier', verified: true },
      { capability: 'hhg_broker', verified: true },
    ],
    authorities: [
      { type: 'hhg_carrier', number: '621', status: 'active' },
      { type: 'hhg_broker', number: '621', status: 'active' },
      { type: 'usdot_registration', number: '49922', status: 'active' },
      { type: 'mc_docket', number: '621', status: 'active' },
    ],
  },
  {
    id: 'graebel',
    usdot: null,
    mc: null,
    legalName: 'GRAEBEL VAN LINES LLC',
    entityType: 'Carrier',
    serviceScope: 'interstate',
    publicationState: 'REVIEW_REQUIRED',
    indexable: false,
    authorityActive: false,
    outcome: 'HISTORICAL_OR_INACTIVE_IDENTITY',
    notes:
      'USDOT 125563 is Mayflower and was incorrectly stored as Graebel USDOT/MC. GRAEBEL VAN LINES LLC USDOT 220843 has inactive common/contract/broker authority. Graebel Movers International USDOT 2972664 is a different legal entity and is not assigned to this brand profile. Collision resolved by removing the copied Mayflower identity; brand remains REVIEW_REQUIRED.',
    sourceUrl: `${SOURCE}/220843`,
    capabilities: [],
    authorities: [{ type: 'usdot_registration', number: '220843', status: 'inactive' }],
    historical: true,
  },
  {
    id: 'national',
    usdot: '76628',
    mc: '42866',
    legalName: 'NATIONAL VAN LINES INC',
    entityType: 'Carrier/Broker',
    serviceScope: 'interstate',
    publicationState: 'PUBLISHABLE',
    indexable: true,
    authorityActive: true,
    outcome: 'RESOLVED_UNIQUE_AUTHORITY',
    notes:
      'USDOT 70851 belongs to NORTH AMERICAN VAN LINES INC. National Van Lines is NATIONAL VAN LINES INC USDOT 76628 MC-42866, Broadview IL, authorizedForHouseholdGoods=Y, common/contract/broker Active. Distinct legal entity from North American.',
    sourceUrl: `${SOURCE}/76628/authority`,
    capabilities: [
      { capability: 'hhg_interstate_carrier', verified: true },
      { capability: 'hhg_broker', verified: true },
    ],
    authorities: [
      { type: 'hhg_carrier', number: '42866', status: 'active' },
      { type: 'hhg_broker', number: '42866', status: 'active' },
      { type: 'usdot_registration', number: '76628', status: 'active' },
      { type: 'mc_docket', number: '42866', status: 'active' },
    ],
  },
  {
    id: 'north-american',
    usdot: '70851',
    mc: '107012',
    legalName: 'NORTH AMERICAN VAN LINES INC',
    entityType: 'Carrier/Broker',
    serviceScope: 'interstate',
    publicationState: 'PUBLISHABLE',
    indexable: true,
    authorityActive: true,
    outcome: 'BRAND_WITH_OPERATING_ENTITY',
    notes:
      'USDOT 70851 is NORTH AMERICAN VAN LINES INC DBA NORTH AMERICAN MOVING & STORAGE (Fort Wayne IN), authorizedForHouseholdGoods=Y, common/contract/broker Active, MC-107012. Public brand/DBA may differ from legal name; keep as one canonical company.',
    sourceUrl: `${SOURCE}/70851/authority`,
    capabilities: [
      { capability: 'hhg_interstate_carrier', verified: true },
      { capability: 'hhg_broker', verified: true },
    ],
    authorities: [
      { type: 'hhg_carrier', number: '107012', status: 'active' },
      { type: 'hhg_broker', number: '107012', status: 'active' },
      { type: 'usdot_registration', number: '70851', status: 'active' },
      { type: 'mc_docket', number: '107012', status: 'active' },
    ],
  },
  {
    id: 'northern-michigan-moving',
    usdot: '1398726',
    mc: '884143',
    legalName: 'NORTHERN MICHIGAN MOVING AND STORAGE INC',
    entityType: 'Carrier',
    serviceScope: 'interstate',
    publicationState: 'REVIEW_REQUIRED',
    indexable: false,
    authorityActive: true,
    outcome: 'UNRESOLVED_REVIEW_REQUIRED',
    notes:
      'FMCSA USDOT 1398726 is NORTHERN MICHIGAN MOVING AND STORAGE INC DBA CENTRAL MICHIGAN MOVERS in Orion MI, HHG common Active, MC-531300. The MoveTrustHub rows use a Traverse City Two Men and a Truck website and MC-884143. Public brand, website, MC, and FMCSA registrant disagree. Duplicate sibling northern-michigan-moving-2 exists. No merge and no VERIFIED capability until identity is reconciled. Consumer URLs preserved.',
    sourceUrl: `${SOURCE}/1398726/authority`,
    capabilities: [],
    authorities: [
      { type: 'usdot_registration', number: '1398726', status: 'active' },
      { type: 'hhg_carrier', number: '531300', status: 'active' },
    ],
  },
  {
    id: 'northern-michigan-moving-2',
    usdot: '1398726',
    mc: null,
    legalName: 'NORTHERN MICHIGAN MOVING AND STORAGE INC',
    entityType: 'Carrier',
    serviceScope: 'interstate',
    publicationState: 'REVIEW_REQUIRED',
    indexable: false,
    authorityActive: true,
    outcome: 'TRUE_DUPLICATE',
    notes:
      'Same USDOT, same public name, and same Two Men and a Truck Northern Michigan URL as northern-michigan-moving. Treated as a duplicate ingest row. Merge deferred because FMCSA legal identity (Orion / Central Michigan Movers / MC-531300) does not match the consumer-facing listing; cannot guarantee review/claim preservation. Remain REVIEW_REQUIRED and non-indexable.',
    sourceUrl: `${SOURCE}/1398726/authority`,
    capabilities: [],
    authorities: [{ type: 'usdot_registration', number: '1398726', status: 'active' }],
  },
  {
    id: 'a-c-white-transfer-storage',
    usdot: '92851',
    mc: '120606',
    legalName: 'A C WHITE TRANSFER & STORAGE COMPANY INC',
    entityType: 'Carrier/Broker',
    serviceScope: 'interstate',
    publicationState: 'PUBLISHABLE',
    indexable: true,
    authorityActive: true,
    outcome: 'RESOLVED_UNIQUE_AUTHORITY',
    notes:
      'Had Atlas van-line USDOT 125550 copied. FMCSA name+city match: A C WHITE TRANSFER & STORAGE COMPANY INC USDOT 92851 Alpharetta GA MC-120606. authorizedForHouseholdGoods=N so HHG carrier capability is not VERIFIED; property/broker authority is active. Not merged with Atlas.',
    sourceUrl: `${SOURCE}/92851/authority`,
    capabilities: [],
    authorities: [
      { type: 'usdot_registration', number: '92851', status: 'active' },
      { type: 'mc_docket', number: '120606', status: 'active' },
    ],
  },
  {
    id: 'secure-moving-storage',
    usdot: '804775',
    mc: '358359',
    legalName: 'SECURE MOVING INC',
    entityType: 'Carrier',
    serviceScope: 'interstate',
    publicationState: 'PUBLISHABLE',
    indexable: true,
    authorityActive: true,
    outcome: 'RESOLVED_UNIQUE_AUTHORITY',
    notes:
      'Had Wheaton van-line USDOT 70719 copied. FMCSA name+city match: SECURE MOVING INC USDOT 804775 Pelham AL MC-358359, authorizedForHouseholdGoods=Y, common Active, broker None.',
    sourceUrl: `${SOURCE}/804775/authority`,
    capabilities: [{ capability: 'hhg_interstate_carrier', verified: true }],
    authorities: [
      { type: 'hhg_carrier', number: '358359', status: 'active' },
      { type: 'usdot_registration', number: '804775', status: 'active' },
      { type: 'mc_docket', number: '358359', status: 'active' },
    ],
  },
];

async function snapshot(client: pg.Client) {
  const totals = await client.query(`
    SELECT
      count(*)::int AS companies,
      count(*) FILTER (WHERE publication_state='REVIEW_REQUIRED')::int AS review_required,
      count(*) FILTER (WHERE publication_state='PUBLISHABLE')::int AS publishable,
      count(*) FILTER (WHERE indexable)::int AS indexable,
      (SELECT count(*) FILTER (WHERE evidence_state='VERIFIED')::int FROM public.provider_capability) AS verified_capabilities
    FROM public.companies
  `);
  const cohort = await client.query(
    `SELECT id, slug, usdot_number, mc_number, publication_state, indexable
       FROM public.companies WHERE id = ANY($1::text[]) ORDER BY id`,
    [COHORT_IDS]
  );
  const dups = await client.query(`
    SELECT regexp_replace(usdot_number, '\\D', '', 'g') AS usdot, count(*)::int AS n
      FROM public.companies
     WHERE usdot_number IS NOT NULL AND btrim(usdot_number) <> ''
     GROUP BY 1 HAVING count(*) > 1
     ORDER BY 1
  `);
  return { totals: totals.rows[0], cohort: cohort.rows, duplicate_usdot: dups.rows };
}

async function upsertCapability(
  client: pg.Client,
  companyId: string,
  capability: string,
  verified: boolean
) {
  await client.query(
    `INSERT INTO public.provider_capability (
       company_id, capability, evidence_source, evidence_state, evidence_at
     ) VALUES ($1, $2, $3, $4, $5::timestamptz)
     ON CONFLICT (company_id, capability) DO UPDATE
       SET evidence_source = EXCLUDED.evidence_source,
           evidence_state = EXCLUDED.evidence_state,
           evidence_at = EXCLUDED.evidence_at`,
    [
      companyId,
      capability,
      verified ? 'fmcsa.qc.authority.authorizedForHouseholdGoods' : 'companies.entity_type',
      verified ? 'VERIFIED' : 'INFERRED',
      verified ? RETRIEVED : new Date().toISOString(),
    ]
  );
}

async function main() {
  loadEnvFiles();
  const dry = process.argv.includes('--dry-run');
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    const before = await snapshot(client);
    if (dry) {
      writeFileSync(
        resolve(process.cwd(), 'docs/task-002-pre-remediation-snapshot.json'),
        JSON.stringify({ dry: true, google_places_requests: 0, before }, null, 2) + '\n'
      );
      console.log(JSON.stringify({ dry: true, before, google_places_requests: 0 }, null, 2));
      return;
    }

    await client.query('BEGIN');
    await client.query(`ALTER TABLE public.provider_identity_review ADD COLUMN IF NOT EXISTS resolved_at timestamptz`);
    await client.query(`ALTER TABLE public.provider_identity_review ADD COLUMN IF NOT EXISTS outcome text`);
    await client.query(`ALTER TABLE public.provider_identity_review ADD COLUMN IF NOT EXISTS evidence_json jsonb`);
    await client.query(`GRANT SELECT ON public.provider_capability TO anon, authenticated`);
    await client.query(`GRANT SELECT ON public.provider_authority TO anon, authenticated`);
    await client.query(`GRANT SELECT ON public.provider_identity_review TO anon, authenticated`);

    for (const fix of FIXES) {
      await client.query(
        `UPDATE public.companies
            SET usdot_number = $2,
                mc_number = $3,
                fmcsa_legal_name = $4,
                entity_type = $5,
                service_scope = $6,
                publication_state = $7,
                indexable = $8,
                authority_active = $9
          WHERE id = $1`,
        [
          fix.id,
          fix.usdot,
          fix.mc,
          fix.legalName,
          fix.entityType,
          fix.serviceScope,
          fix.publicationState,
          fix.indexable,
          fix.authorityActive,
        ]
      );

      for (const capability of fix.capabilities) {
        await upsertCapability(client, fix.id, capability.capability, capability.verified);
      }

      for (const authority of fix.authorities) {
        await client.query(
          `INSERT INTO public.provider_authority (
             company_id, jurisdiction, authority_type, authority_number,
             issuing_agency, status, source, retrieved_at
           ) VALUES ($1, 'federal', $2, $3, 'FMCSA', $4, $5, $6::timestamptz)
           ON CONFLICT DO NOTHING`,
          [fix.id, authority.type, authority.number, authority.status, fix.sourceUrl, RETRIEVED]
        );
      }

      const collisionKind = 'usdot';
      const collisionKeyById: Record<string, string> = {
        allied: '125563',
        mayflower: '125563',
        atlas: '125563',
        wheaton: '125563',
        graebel: '125563',
        arpin: '125563',
        national: '70851',
        'north-american': '70851',
        'northern-michigan-moving': '1398726',
        'northern-michigan-moving-2': '1398726',
        'a-c-white-transfer-storage': '125550',
        'secure-moving-storage': '70719',
      };
      const collisionKey = collisionKeyById[fix.id] ?? fix.id;

      await client.query(
        `INSERT INTO public.provider_identity_review (
           collision_kind, collision_key, company_ids, resolution, outcome, notes, evidence_json, resolved_at
         ) VALUES ($1, $2, $3::text[], $4, $5, $6, $7::jsonb, now())
         ON CONFLICT (collision_kind, collision_key) DO UPDATE
           SET notes = EXCLUDED.notes,
               outcome = EXCLUDED.outcome,
               evidence_json = EXCLUDED.evidence_json,
               resolved_at = EXCLUDED.resolved_at,
               resolution = EXCLUDED.resolution`,
        [
          collisionKind,
          `${collisionKey}:${fix.id}`,
          [fix.id],
          fix.publicationState === 'REVIEW_REQUIRED' ? 'REVIEW_REQUIRED' : 'RESOLVED',
          fix.outcome,
          fix.notes,
          JSON.stringify({
            source: 'FMCSA QC Mobile API',
            source_url: fix.sourceUrl,
            retrieved_at: RETRIEVED,
            google_places_requests: 0,
          }),
        ]
      );
    }

    await client.query(
      `INSERT INTO public.provider_identity_review (
         collision_kind, collision_key, company_ids, resolution, outcome, notes, evidence_json, resolved_at
       ) VALUES
       ('usdot', '125563', ARRAY['allied','mayflower','atlas','wheaton','graebel','arpin']::text[],
        'RESOLVED', 'NETWORK_OR_VAN_LINE',
        'Original shared-USDOT collision. 125563 is MAYFLOWER TRANSIT LLC only. Other brands assigned independent FMCSA identities or historical/inactive treatment. Review row preserved.',
        $1::jsonb, now()),
       ('usdot', '70851', ARRAY['national','north-american']::text[],
        'RESOLVED', 'RESOLVED_UNIQUE_AUTHORITY',
        'Original shared-USDOT collision. 70851 is NORTH AMERICAN VAN LINES INC. National Van Lines is USDOT 76628. Distinct legal entities. Review row preserved.',
        $1::jsonb, now()),
       ('usdot', '1398726', ARRAY['northern-michigan-moving','northern-michigan-moving-2']::text[],
        'REVIEW_REQUIRED', 'UNRESOLVED_REVIEW_REQUIRED',
        'Both rows still share USDOT 1398726. FMCSA registrant does not match the consumer-facing Two Men and a Truck Traverse City listing. Duplicate ingest suspected; merge deferred. Review row preserved.',
        $1::jsonb, now())
       ON CONFLICT (collision_kind, collision_key) DO UPDATE
         SET notes = EXCLUDED.notes,
             outcome = EXCLUDED.outcome,
             evidence_json = EXCLUDED.evidence_json,
             resolved_at = EXCLUDED.resolved_at,
             resolution = EXCLUDED.resolution,
             company_ids = EXCLUDED.company_ids`,
      [
        JSON.stringify({
          source: 'FMCSA QC Mobile API',
          retrieved_at: RETRIEVED,
          google_places_requests: 0,
        }),
      ]
    );

    await client.query(`NOTIFY pgrst, 'reload schema'`);
    await client.query('COMMIT');
    const after = await snapshot(client);
    writeFileSync(
      resolve(process.cwd(), 'docs/task-002-post-remediation-snapshot.json'),
      JSON.stringify({ applied: true, google_places_requests: 0, before, after }, null, 2) + '\n'
    );
    console.log(JSON.stringify({ applied: true, before, after, google_places_requests: 0 }, null, 2));
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(sanitize(error));
  process.exit(1);
});
