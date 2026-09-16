import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const rawPath = 'C:/Users/makei/move-or-001-research/movers-items.json';
const rawBuf = fs.readFileSync(rawPath);
const rawText = rawBuf.toString('utf8').replace(/^\uFEFF/, '');
const rawSha = crypto.createHash('sha256').update(rawBuf).digest('hex');
const feed = JSON.parse(rawText);
const results = feed.d.results;

function stripHtml(html) {
  return String(html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h\d)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#58;/g, ':')
    .replace(/&#160;/g, ' ')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/\u00b4/g, "'")
    .replace(/[\u200b\u200c\u00a0]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function compact(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const CONSUMER_PIANO_TITLES = [
  "big al's specialty movers",
  'jj&c movers',
  'k and d piano moving',
  "michelle's piano moving",
  'west coast piano moving',
];

const rows = [];
for (const r of results) {
  const html = r.Mover_x0020_Information || '';
  const text = stripHtml(html);
  const certMatch = text.match(/certificate\s*(?:no\.?|number)?\s*[:#]?\s*(\d{4,8})/i);
  const cert = certMatch ? certMatch[1] : null;
  const folded = compact(text);
  const titleFolded = compact(r.Title);
  const hasLocal = /\blocal\s*c(?:artage|argo)\b/.test(folded) || /\blocal cartage\b|\blocal cargo\b/.test(folded);
  const hasOtl = /\bother than local\b/.test(folded);
  const unrestrictedOtl = hasOtl && /\bunrestricted\b/.test(folded);
  const pianoInText = /\bpiano\b/.test(folded) || /\bpiano\b/.test(titleFolded);
  const pianoNamed = CONSUMER_PIANO_TITLES.some((n) => titleFolded.includes(compact(n)));
  const specializedPiano = pianoInText || pianoNamed;
  const phone = (text.match(/Phone:\s*([0-9().\-\s]+)/i) || [])[1]?.trim() || null;
  rows.push({
    sharepointItemId: r.Id,
    title: r.Title,
    certificateNumber: cert,
    phone,
    hasLocalCartage: hasLocal,
    hasOtherThanLocal: hasOtl,
    otherThanLocalUnrestricted: unrestrictedOtl,
    specializedPiano,
    authorizedServiceText: text,
    modified: r.Modified,
    created: r.Created,
  });
}

const certs = new Map();
const blank = [];
for (const row of rows) {
  if (!row.certificateNumber) blank.push(row);
  else {
    const key = row.certificateNumber.replace(/^0+/, '') || '0';
    if (!certs.has(key)) certs.set(key, []);
    certs.get(key).push(row);
  }
}
const dups = [...certs.entries()].filter(([, v]) => v.length > 1);

const localCartage = rows.filter((r) => r.hasLocalCartage).length;
const otherThanLocal = rows.filter((r) => r.hasOtherThanLocal).length;
const specialized = rows.filter((r) => r.specializedPiano).length;
const unrestricted = rows.filter((r) => r.otherThanLocalUnrestricted).length;
const modified = rows.map((r) => r.Modified).sort();
const generatedAt = new Date().toISOString();
const retrievedAt = generatedAt;

const roster = {
  source: {
    pageUrl: 'https://www.oregon.gov/odot/mct/pages/household-goods-authorized-movers-list.aspx',
    listTitle: 'Household Goods Movers List',
    listUrl: '/odot/MCT/Lists/Revised Movers List',
    listGuid: 'cee52e55-c4c8-4df4-a679-54301fb8bf08',
    restUrl:
      "https://www.oregon.gov/odot/MCT/_api/web/GetList(@listUrl)/items?@listUrl='/odot/MCT/Lists/Revised Movers List'&$top=5000&$select=Id,Title,Mover_x0020_Information,h96y,Modified,Created",
    lastItemModifiedDate: '2026-09-09T19:21:37Z',
    listCreated: '2026-06-25T04:30:26Z',
    itemCountMeta: 113,
    rawSha256: rawSha,
    rawBytes: rawBuf.length,
    retrievedAt,
  },
  rows,
};

const outDir = path.join(root, 'lib', 'oregon-intelligence');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'accepted-roster.json'), JSON.stringify(roster, null, 2) + '\n');

const snapshot = {
  version: 'move-or-state-intel-v1',
  ticket: 'OR-MOVE-001',
  as_of: null,
  generated_at: generatedAt,
  snapshotAsOf: null,
  retrievedAt,
  retrievedAtPrecision: 'datetime',
  no_trust_score: true,
  no_paid_ranking: true,
  no_oregon_local_routes: true,
  no_portland_page: true,
  no_multnomah_page: true,
  publication: {
    canonical: 'https://www.movetrusthub.com/oregon',
    indexable: true,
    robots: 'index,follow',
    route: '/oregon',
    rankings: false,
    trustScore: false,
    h1: 'Oregon Household-Goods Mover Authority Research',
  },
  regulator: {
    agency: 'Oregon Department of Transportation — Commerce and Compliance Division',
    short: 'ODOT CCD',
    credential_term: 'certificate of authority',
    statute: 'ORS 825.100; ORS 825.202; ORS 825.240; ORS 825.950',
    rules: 'OAR chapter 740, including 740-035 (certificates) and 740-300 (penalties)',
    hhg_url: 'https://www.oregon.gov/odot/mct/pages/household-goods-moving.aspx',
    roster_url: 'https://www.oregon.gov/odot/mct/pages/household-goods-authorized-movers-list.aspx',
    application_url: 'https://www.oregon.gov/odot/mct/pages/household-goods-mover-application-process.aspx',
    complaint_form_url: 'https://www.oregon.gov/odot/Forms/Motcarr/9976fill.pdf',
    complaint_email: 'CCDHouseholdGoods@odot.oregon.gov',
    complaint_phone: '503-779-9083',
    complaint_fax: '503-378-2183',
    bulletin_url: 'https://www.oregon.gov/odot/Forms/Motcarr/9943.pdf',
    insurance_url: 'https://www.oregon.gov/odot/mct/pages/insurance-requirements.aspx',
    sb839_url: 'https://olis.oregonlegislature.gov/liz/2025R1/Downloads/MeasureDocument/SB839',
    rule_mctd_7_2025_url: 'https://www.oregon.gov/odot/Get-Involved/OAR%20folders/2025-AONs/MCTD_7-2025.pdf',
  },
  clocks: {
    generatedAt,
    snapshotAsOf: null,
    sourceAsOf: null,
    hhg_roster: {
      sourceAsOf: null,
      sourceUpdatedAt: '2026-09-09T19:21:37Z',
      sourceModifiedAt: '2026-09-09T19:21:37Z',
      rowsUpdatedAt: modified[modified.length - 1],
      retrievedAt,
      note: 'SharePoint list LastItemModifiedDate is a source-modified clock, not an official as-of date. Retrieval time is not used as sourceAsOf.',
    },
    do_not_use_ticket_date_as_source: true,
  },
  current_hhg_roster: {
    coverage: 'ACQUIRED_CURRENT_SNAPSHOT',
    CURRENT_OR_HHG_AUTHORIZED_ROSTER: 'ACQUIRED_CURRENT_SNAPSHOT',
    rows: rows.length,
    distinctAuthorityIds: certs.size,
    activeRows: rows.length,
    activeDistinctAuthorityIds: certs.size,
    blankIds: blank.length,
    duplicates: dups.length,
    native_id_field: 'Oregon household-goods certificate number',
    grain: 'Official ODOT CCD authorized household-goods mover list row (SharePoint Household Goods Movers List)',
    reason:
      'Official authorized-movers list is a SharePoint list (GUID cee52e55-c4c8-4df4-a679-54301fb8bf08) with ItemCount 113. Certificate numbers live in the Mover Information HTML field. No source-native status column exists; the public list is the current authorized set, not a historical dump. Being on the list is not statewide service territory.',
    license_row_ne_unique_company: true,
    certificate_ne_statewide_territory: true,
  },
  identity: {
    native_id_field: 'Oregon household-goods certificate number',
    namespace: 'OR-ODOT-HHG:{certificateNumber}',
    usdot_alone_is_not_or_intrastate_authority: true,
    mc_alone_is_not_or_intrastate_authority: true,
    oregon_certificate_ne_usdot: true,
    oregon_certificate_ne_mc: true,
    oregon_certificate_ne_general_motor_carrier_credential: true,
    tariff_ne_authority: true,
    insurance_filing_ne_current_authority: true,
  },
  authority_classes: {
    do_not_flatten: true,
    local_cartage_ne_other_than_local: true,
    certificate_ne_statewide_service: true,
    OR_LOCAL_CARTAGE_ROWS: localCartage,
    OR_OTHER_THAN_LOCAL_ROWS: otherThanLocal,
    OR_OTHER_THAN_LOCAL_UNRESTRICTED_ROWS: unrestricted,
    OR_SPECIALIZED_HHG_ROWS: specialized,
    specialized_note:
      'Piano/specialty is preserved from source-native title or authorized-service text, including consumer-page named piano movers that appear on the authorized list. Pack-and-loader labor-only businesses are exempt under Oregon HB 2817 when they do not provide the moving vehicle and are not merged into the HHG certificate denominator.',
    pack_and_loader_ne_hhg_certificate: true,
  },
  federal: {
    name_only: 'UNSAFE',
    name_plus_address: 'REVIEW_REQUIRED',
    exact_state_to_usdot_crosswalks: 0,
    exact_state_to_mc_crosswalks: 0,
    review_required_crosswalks: 0,
    rejected_name_only_crosswalks: 0,
    oregon_authority_ne_usdot: true,
    usdot_ne_active_interstate_authority: true,
    oregon_certificate_ne_fmcsa: true,
    hq_geography_ne_oregon_authority: true,
    overlay_note:
      'Existing MoveTrustHub FMCSA spine is reused. An Oregon-address USDOT carrier is not an ODOT-authorized intrastate household-goods mover. No USDOT or MC appears on the official authorized list. No national FMCSA redownload.',
  },
  complaints: {
    coverage: 'REQUEST_ONLY',
    OR_STATE_COMPLAINT_OBSERVATIONS: null,
    path: 'Intrastate Household Goods Complaint form 9976 to CCDHouseholdGoods@odot.oregon.gov / 503-779-9083. Interstate complaints go to FMCSA, not ODOT.',
    complaint_ne_violation: true,
    complaint_ne_disciplinary_action: true,
    complaint_ne_quality: true,
    missing_bulk_ne_zero: true,
    do_not_substitute_fmcsa_complaints: true,
    intake_form_ne_dataset: true,
  },
  enforcement: {
    coverage: 'NOT_ACQUIRED',
    OR_STATE_ENFORCEMENT_OBSERVATIONS: null,
    ENFORCEMENT_FRAMEWORK_PRESENT: true,
    framework_effective: '2026-01-01',
    framework_note:
      'SB 839 (2025) and OAR 740-300-0035 as amended by MCTD 7-2025, effective 2026-01-01, raise unauthorized household-goods penalties and cover advertising/offering/transporting without a valid certificate. Rules are not enforcement matters.',
    reason:
      'No bounded official Final Order / Notice of Proposed Penalty / CMP docket dump was published. Press and GovDelivery operations name companies without source-native matter IDs or Oregon certificate numbers. NAME_ONLY_UNSAFE is rejected. 2026 press-described citations are not acquired as a matter universe.',
    proposed_penalty_ne_final_order: true,
    suspension_ne_cancellation: true,
    state_enforcement_ne_fmcsa_oos: true,
    statute_ne_case: true,
    name_only: 'UNSAFE',
  },
  insurance: {
    CURRENT_INSURANCE_COMPLIANCE: 'OPEN_SEARCH_ONLY',
    path: 'Application requires Form E liability and Form H cargo (minimum $10,000 cargo). Oregon Trucking Online insurance lookup is CAPTCHA name/account search. Authorized list does not print current insurance status.',
    insurance_requirement_ne_current_coverage: true,
    insurance_filing_ne_active_authority: true,
    historical_filing_ne_current_coverage: true,
    fmcsa_insurance_ne_oregon_authority: true,
    insurance_ne_quality: true,
  },
  tariff: {
    coverage: 'OPEN_SEARCH_ONLY',
    note: 'ODOT regulates intrastate household-goods rates. A tariff must be approved or bureau participation established before certificate operations. The authorized list does not print tariff numbers. Tariff filing is not active HHG authority and is not a quality signal.',
    tariff_ne_authority: true,
  },
  claimEligibilityBroadened: false,
  noCombinedOregonMoversTotal: true,
  unknownIsNotZero: true,
  searchOnlyIsNotZero: true,
  expansion_ledger: {
    OR_HHG_AUTHORITY_ROWS: rows.length,
    OR_HHG_DISTINCT_AUTHORITY_IDS: certs.size,
    OR_HHG_ACTIVE_ROWS: rows.length,
    OR_HHG_ACTIVE_DISTINCT_AUTHORITY_IDS: certs.size,
    OR_LOCAL_CARTAGE_ROWS: localCartage,
    OR_OTHER_THAN_LOCAL_ROWS: otherThanLocal,
    OR_SPECIALIZED_HHG_ROWS: specialized,
    OR_STATE_COMPLAINT_OBSERVATIONS: null,
    OR_STATE_ENFORCEMENT_OBSERVATIONS: null,
    EXACT_STATE_TO_USDOT_CROSSWALKS: 0,
    EXACT_STATE_TO_MC_CROSSWALKS: 0,
    REVIEW_REQUIRED_CROSSWALKS: 0,
    REJECTED_NAME_ONLY_CROSSWALKS: 0,
    EXACT_PROFILE_ATTACHMENTS: 0,
    NET_NEW_STATE_RESEARCH_IDENTITIES: rows.length,
    NET_NEW_CANONICAL_ORGANIZATIONS: 0,
    NET_NEW_PUBLIC_MOVE_PROFILES: 0,
    EXISTING_ORGANIZATIONS_ENRICHED: 0,
    GRAPH_WRITES: 0,
    CLAIM_ELIGIBILITY_BROADENED: false,
  },
  adverse_ledger: {
    ADVERSE_SOURCES_FOUND: [
      'SB 839 / OAR 740-300-0035 2026 enforcement framework',
      'ODOT GovDelivery unlicensed-mover operations (2023, 2025, 2026 press)',
      'Intrastate complaint intake form 9976',
    ],
    ADVERSE_SOURCES_ACQUIRED: [],
    ADVERSE_ROWS_ACQUIRED: null,
    UNIQUE_REGULATORY_MATTERS: null,
    EXACT_PROFILE_ATTACHMENTS: 0,
    REVIEW_REQUIRED: 0,
    UNRESOLVED: 0,
    INTERNAL_ONLY: 0,
    PUBLICATION_PENDING: 0,
    PUBLIC_READY_PROFILES: 0,
    PUBLICLY_RENDERED_PROFILES: 0,
    BUSINESS_RESPONSE_READY: false,
    SEARCH_SUPPORTED: true,
    REMAINING_ADVERSE_GAPS: [
      'No public Final Order / CMP / suspension-cancellation table',
      'No mover-level complaint universe',
      '2026 press-named citations lack source-native matter IDs',
    ],
    WITHHELD_REASON_COUNTS: {
      NAME_ONLY_UNSAFE: 'rejected',
      FRAMEWORK_NOT_MATTER: 'not counted',
      PRESS_WITHOUT_MATTER_ID: 'not acquired',
    },
  },
  juiceSqueeze: [
    {
      decision: 'GRABBED — HIGH YIELD',
      source: 'ODOT CCD Household Goods Movers List via SharePoint REST (113 authorized rows; certificate + territory HTML)',
    },
    {
      decision: 'GRABBED — HIGH YIELD',
      source: 'Existing FMCSA federal overlay (not treated as Oregon authority; no national redownload)',
    },
    {
      decision: 'GRABBED — EASY SECONDARY',
      source: 'Consumer complaint path (form 9976), SB 839 / OAR 740-300-0035 framework, insurance/tariff requirement pages, piano/specialty naming, pack-and-loader exemption',
    },
    {
      decision: 'LEFT — SEARCH ONLY',
      source: 'Oregon Trucking Online insurance/account lookups (CAPTCHA)',
    },
    {
      decision: 'LEFT — SEARCH ONLY',
      source: 'Complaint intake without a public complaint-matter dataset',
    },
    {
      decision: 'LEFT — TOO MUCH WORK',
      source: 'Final Order / NPP / CMP archaeology; FOIA to CCD; name-only press citation attachment',
    },
    {
      decision: 'LEFT — FUTURE',
      source: 'Portland / Multnomah / Oregon local intelligence pages',
    },
  ],
  local_work_needed_now: 'NO',
  fingerprint: '',
};

const body = { ...snapshot };
delete body.fingerprint;
delete body.generated_at;
const fingerprint = crypto
  .createHash('sha256')
  .update(JSON.stringify(body, Object.keys(body).sort(), 2))
  .digest('hex');
snapshot.fingerprint = fingerprint;

fs.writeFileSync(path.join(outDir, 'accepted-snapshot.json'), JSON.stringify(snapshot, null, 2) + '\n');
fs.writeFileSync(
  path.join(root, 'data', 'reports', 'or-move-001-public-snapshot.json'),
  JSON.stringify(snapshot, null, 2) + '\n',
);

console.log(
  JSON.stringify(
    {
      rows: rows.length,
      distinct: certs.size,
      blank: blank.length,
      dups: dups.length,
      localCartage,
      otherThanLocal,
      unrestricted,
      specialized,
      fingerprint,
      rawSha,
    },
    null,
    2,
  ),
);
if (blank.length || dups.length) {
  console.error('blank', blank.map((b) => b.title));
  console.error('dups', dups.map(([k]) => k));
  process.exit(1);
}
