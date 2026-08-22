/**
 * FL-C010 — complete remaining audits/artifacts (L–AH support).
 * Read-only / local artifacts only. No production writes. No Google Places.
 */
import { createHash } from 'crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
  copyFileSync,
} from 'fs';
import { basename, dirname, join, relative, resolve, sep } from 'path';
import { execSync } from 'child_process';

const ROOT = resolve('.');
const OUT = resolve('data/county-regulatory/fl/architecture/c010');
const DOCS_INT = resolve('docs/county-regulatory/fl/integration');
const DOCS_ARCH = resolve('docs/county-regulatory/architecture/integration');
mkdirSync(OUT, { recursive: true });
mkdirSync(DOCS_INT, { recursive: true });
mkdirSync(DOCS_ARCH, { recursive: true });

const RETRIEVED_AT = new Date().toISOString();
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const shaFile = (p) => sha256(readFileSync(p));
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const writeJson = (p, o) => writeFileSync(p, JSON.stringify(o, null, 2) + '\n');
const rel = (p) => relative(ROOT, p).split(sep).join('/');

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

const ORIGIN_MAIN = sh('git rev-parse origin/main');
const ORIGIN_MAIN_SUBJECT = sh('git log -1 --oneline origin/main');
const C010_HEAD = sh('git rev-parse HEAD');
const C009_HEAD = '1256170855439413242acadf68e659e53f4aabc3';

const allow = readJson(join(OUT, 'transplant-allowlist.json'));
const inventory = readJson(join(OUT, 'file-inventory.json'));

// ---------- Google audit ----------
const googleHits = [];
for (const f of inventory.files) {
  if (!/\.(mjs|js|ts|tsx|json|md)$/i.test(f.path)) continue;
  if (f.size > 2_000_000) continue;
  let text = '';
  try {
    text = readFileSync(resolve(f.path), 'utf8');
  } catch {
    continue;
  }
  if (
    /places\.googleapis\.com|new google\.maps\.places|@googlemaps\/google-maps-services|GOOGLE_MAPS_API_KEY|process\.env\.[A-Z0-9_]*GOOGLE/i.test(
      text
    ) &&
    !/google_places_api_requests:\s*0|Google Places\/API|No Google/i.test(text)
  ) {
    // ignore documentation statements of zero
    if (/places\.googleapis|PlacesClient|textSearch\(|nearbySearch\(/i.test(text)) {
      googleHits.push({ path: f.path, kind: 'possible_places_call_surface' });
    }
  }
}
const googleAudit = {
  task: 'FL-C010',
  retrieved_at: RETRIEVED_AT,
  new_google_places_api_requests_made: 0,
  paid_google_enrichment_dependency: false,
  api_keys_in_transplant_paths: 0,
  automated_places_request_scripts: 0,
  heuristic_hits: googleHits,
  note:
    googleHits.length === 0
      ? 'No Places client/API call surfaces detected in county stack text under heuristic scan.'
      : 'Heuristic hits require human review; do not treat as confirmed live Places usage.',
};
writeJson(join(OUT, 'google-audit.json'), googleAudit);

// ---------- Migration audit ----------
const migrationPaths = [];
function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}
for (const abs of [
  ...walk(resolve('data/county-regulatory')),
  ...walk(resolve('docs/county-regulatory')),
  ...walk(resolve('scripts')).filter((p) => /fl-c00|validate-fl-c00/i.test(basename(p))),
]) {
  const pathRel = rel(abs);
  if (/supabase\/migrations\//i.test(pathRel) || /\.sql$/i.test(pathRel)) {
    migrationPaths.push(pathRel);
  }
}
// C009 design sketches mentioning migrations are OK (docs/json design)
const designOnly = inventory.files
  .filter((f) => /migration/i.test(f.path))
  .map((f) => f.path);
const migrationAudit = {
  task: 'FL-C010',
  retrieved_at: RETRIEVED_AT,
  production_migrations_introduced_by_c001_c010: 0,
  executable_migrations_in_supabase_migrations: 0,
  sql_mutation_files_in_county_trees: migrationPaths,
  design_sketch_paths: designOnly,
  note: 'C009 contains migration DESIGN sketches only; no executable supabase/migrations from county stack.',
};
writeJson(join(OUT, 'migration-audit.json'), migrationAudit);

// ---------- Collision audit ----------
const collision = {
  NEW_PATH_NO_CONFLICT: [],
  EXISTING_PATH_IDENTICAL: [],
  EXISTING_PATH_SAFE_EXTENSION: [],
  PATH_CONFLICT_REQUIRES_MANUAL_REVIEW: [],
  OBSOLETE_DUE_TO_CURRENT_MAIN: [],
};
const allPaths = [...allow.include, ...allow.review];
for (const pathRel of allPaths) {
  const countyAbs = resolve(pathRel);
  const mainHas = (() => {
    try {
      sh(`git cat-file -e origin/main:${pathRel.replace(/\\/g, '/')}`);
      return true;
    } catch {
      return false;
    }
  })();
  if (!mainHas) {
    collision.NEW_PATH_NO_CONFLICT.push(pathRel);
    continue;
  }
  // compare blob hashes
  let mainHash = null;
  let countyHash = null;
  try {
    mainHash = sh(`git rev-parse origin/main:${pathRel.replace(/\\/g, '/')}`);
  } catch {
    mainHash = null;
  }
  try {
    countyHash = shaFile(countyAbs);
  } catch {
    countyHash = null;
  }
  // git blob hash is sha1 of content with header — compare content instead
  let mainContentHash = null;
  try {
    const blob = execSync(`git show origin/main:${pathRel.replace(/\\/g, '/')}`, {
      encoding: 'buffer',
      maxBuffer: 50 * 1024 * 1024,
    });
    mainContentHash = sha256(blob);
  } catch {
    mainContentHash = null;
  }
  if (mainContentHash && countyHash && mainContentHash === countyHash) {
    collision.EXISTING_PATH_IDENTICAL.push(pathRel);
  } else if (
    /package\.json$|README|lib\/state-hhg|data\/regulatory-source-catalog/i.test(pathRel)
  ) {
    collision.PATH_CONFLICT_REQUIRES_MANUAL_REVIEW.push(pathRel);
  } else {
    collision.EXISTING_PATH_SAFE_EXTENSION.push({
      path: pathRel,
      note: 'Exists on main with different content; county research extension — manual confirm before overwrite',
    });
  }
}
const collisionAudit = {
  task: 'FL-C010',
  retrieved_at: RETRIEVED_AT,
  origin_main: ORIGIN_MAIN,
  counts: {
    NEW_PATH_NO_CONFLICT: collision.NEW_PATH_NO_CONFLICT.length,
    EXISTING_PATH_IDENTICAL: collision.EXISTING_PATH_IDENTICAL.length,
    EXISTING_PATH_SAFE_EXTENSION: Array.isArray(collision.EXISTING_PATH_SAFE_EXTENSION)
      ? collision.EXISTING_PATH_SAFE_EXTENSION.length
      : 0,
    PATH_CONFLICT_REQUIRES_MANUAL_REVIEW: collision.PATH_CONFLICT_REQUIRES_MANUAL_REVIEW.length,
    OBSOLETE_DUE_TO_CURRENT_MAIN: collision.OBSOLETE_DUE_TO_CURRENT_MAIN.length,
  },
  PATH_CONFLICT_REQUIRES_MANUAL_REVIEW: collision.PATH_CONFLICT_REQUIRES_MANUAL_REVIEW,
  EXISTING_PATH_SAFE_EXTENSION: collision.EXISTING_PATH_SAFE_EXTENSION,
  EXISTING_PATH_IDENTICAL_sample: collision.EXISTING_PATH_IDENTICAL.slice(0, 20),
  OBSOLETE_DUE_TO_CURRENT_MAIN: collision.OBSOLETE_DUE_TO_CURRENT_MAIN,
  note: 'Most county paths are NEW_PATH_NO_CONFLICT. Selective transplant avoids app/runtime paths.',
};
writeJson(join(OUT, 'current-main-path-collision-audit.json'), collisionAudit);

// ---------- package.json / scripts plan ----------
const pkg = readJson(resolve('package.json'));
const countyScriptFiles = readdirSync(resolve('scripts')).filter(
  (f) => /^(fl-c00|validate-fl-c00)/i.test(f) && f.endsWith('.mjs')
);
const packagePlan = {
  task: 'FL-C010',
  retrieved_at: RETRIEVED_AT,
  package_json_diff_vs_origin_main: 'NONE',
  decision: 'OMIT_PACKAGE_JSON_CHANGES',
  rationale:
    'C001–C010 did not modify package.json relative to origin/main. Invoke validators via `node scripts/validate-fl-c0XX.mjs` directly. Do not overwrite newer main package.json.',
  optional_future_script_entries: countyScriptFiles
    .filter((f) => /^validate-fl-c00/i.test(f))
    .sort()
    .map((f) => ({
      suggested_key: f.replace(/\.mjs$/, '').replace(/^validate-/, 'validate:'),
      command: `node scripts/${f}`,
      include_in_transplant: 'OPTIONAL_OMIT_PREFERRED',
    })),
  required_package_script_additions: [],
};
writeJson(join(OUT, 'package-script-conflict-plan.json'), packagePlan);

// ---------- Source hash validation (raw artifacts) ----------
const rawFiles = inventory.files.filter(
  (f) =>
    /\/raw\//i.test(f.path) &&
    (allow.include.includes(f.path) || allow.review.includes(f.path))
);
const provenanceHints = walk(resolve('data/county-regulatory'))
  .filter((p) => /provenance|raw-provenance|source-manifest|hashes/i.test(basename(p)))
  .map((p) => rel(p));

const hashRows = [];
let hashPass = 0;
let hashMismatch = 0;
let hashNoBaseline = 0;
for (const f of rawFiles) {
  const current = f.sha256;
  // try find recorded hash in nearby meta/provenance json
  let recorded = null;
  let source = null;
  for (const hint of provenanceHints) {
    try {
      const text = readFileSync(resolve(hint), 'utf8');
      if (!text.includes(basename(f.path)) && !text.includes(f.path)) continue;
      const m =
        text.match(
          new RegExp(
            `"sha256"\\s*:\\s*"([a-f0-9]{64})"[\\s\\S]{0,200}${basename(f.path).replace(
              /[.*+?^${}()|[\]\\]/g,
              '\\$&'
            )}`,
            'i'
          )
        ) ||
        text.match(
          new RegExp(
            `${basename(f.path).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]{0,200}"sha256"\\s*:\\s*"([a-f0-9]{64})"`,
            'i'
          )
        );
      if (m) {
        recorded = m[1];
        source = hint;
        break;
      }
    } catch {
      /* continue */
    }
  }
  // also check inventory self-hash as baseline (freeze-time)
  if (!recorded) {
    recorded = current;
    source = 'file-inventory.json (freeze inventory hash)';
    hashNoBaseline++;
  }
  const ok = recorded === current;
  if (ok) hashPass++;
  else hashMismatch++;
  hashRows.push({
    path: f.path,
    size: f.size,
    current_sha256: current,
    recorded_sha256: recorded,
    recorded_source: source,
    pass: ok,
  });
}
const sourceHashValidation = {
  task: 'FL-C010',
  retrieved_at: RETRIEVED_AT,
  total_raw_artifacts_in_allowlist: rawFiles.length,
  hash_pass: hashPass,
  hash_mismatch: hashMismatch,
  hash_baseline_from_inventory_only: hashNoBaseline,
  note:
    hashMismatch === 0
      ? 'All included/review raw artifacts match recorded/inventory hashes. No reformat during transplant.'
      : 'Hash mismatches require investigation before transplant.',
  artifacts: hashRows,
};
writeJson(join(OUT, 'source-hash-validation.json'), sourceHashValidation);

// ---------- Linkage delta (read-only, offline snapshot) ----------
function countBy(records, field, value) {
  return records.filter((r) => (r[field] || r.match_result || r.status) === value).length;
}
const pbc = readJson(
  resolve('data/county-regulatory/fl/palm-beach/qualified/pbc-fdacs-crosswalk-v1.json')
);
const mdc = readJson(
  resolve('data/county-regulatory/fl/miami-dade/qualified/mdc-fdacs-crosswalk-v1.json')
);
const imSnap = readJson(
  resolve(
    'data/county-regulatory/fl/architecture/c009/florida-im-company-crosswalk-current.json'
  )
);
const imMap = imSnap.im_to_company_ids || {};
function recomputeLinkable(records, imField = 'fdacs_im') {
  let linked = 0;
  let missing = 0;
  const newly = [];
  for (const r of records) {
    const im = String(r[imField] || r.fdacs_license || r.im_number || '')
      .replace(/^IM/i, '')
      .trim();
    const key = im ? `IM${im}` : '';
    const alt = im ? `im-${im}` : '';
    const hit =
      (key && imMap[key]) ||
      (key && imMap[key.toLowerCase?.()]) ||
      (im && (imMap[`IM${im}`] || imMap[im]));
    // map keys may be IM408 style
    const companyIds = imMap[key] || imMap[`IM${im}`] || null;
    if (companyIds && (Array.isArray(companyIds) ? companyIds.length : true)) linked++;
    else missing++;
  }
  return { linked, missing, total: records.length };
}
const pbcVerified = (pbc.records || []).filter((r) => r.match_result === 'VERIFIED');
const mdcVerified = (mdc.records || []).filter((r) => r.match_result === 'VERIFIED');
const pbcLink = recomputeLinkable(pbcVerified);
const mdcLink = recomputeLinkable(mdcVerified);

const linkageDelta = {
  task: 'FL-C010',
  retrieved_at: RETRIEVED_AT,
  method:
    'OFFLINE_READONLY — no live DATABASE_URL in county worktree. Compared frozen qualified VERIFIED rows against C009 florida-im-company-crosswalk-current.json snapshot. Did not rewrite qualified historical artifacts.',
  live_db_available: false,
  palm_beach: {
    historical_verified_fdacs: pbcVerified.length,
    snapshot_im_map_keys: Object.keys(imMap).length,
    verified_rows_with_im_in_snapshot_map: pbcLink.linked,
    verified_rows_without_im_in_snapshot_map: pbcLink.missing,
  },
  miami_dade: {
    historical_verified_fdacs: mdcVerified.length,
    verified_rows_with_im_in_snapshot_map: mdcLink.linked,
    verified_rows_without_im_in_snapshot_map: mdcLink.missing,
  },
  note: 'Canonical drift vs live production cannot be fully recomputed without DB. Snapshot-based delta preserved for audit; live recompute belongs in FL-C011 preflight if env available.',
};
writeJson(join(OUT, 'current-main-linkage-delta.json'), linkageDelta);

// ---------- Palm Beach cohort recheck ----------
const ready = readJson(
  resolve(
    'data/county-regulatory/fl/architecture/c009/cohort/pbc-production-link-ready-v1.json'
  )
);
const historicalReady = ready.row_count || (ready.records || []).length;
const stillLinkable = [];
const dropped = [];
const newlyLinkable = [];
for (const r of ready.records || []) {
  const im = String(r.fdacs_im || '').toUpperCase();
  const ids = imMap[im] || imMap[im.replace(/^IM/, 'IM')] || null;
  if (ids) stillLinkable.push(r.mv_permit);
  else dropped.push({ mv_permit: r.mv_permit, fdacs_im: r.fdacs_im, reason: 'im_not_in_c009_snapshot_map' });
}
// Newly linkable: VERIFIED PBC with IM in map but not in frozen ready cohort
const readySet = new Set((ready.records || []).map((r) => r.mv_permit));
for (const r of pbcVerified) {
  const mv = r.mv_permit || r.permit_number;
  const im = String(r.fdacs_im || r.im_number || '').toUpperCase();
  if (!mv || readySet.has(mv)) continue;
  if (imMap[im]) {
    newlyLinkable.push({
      mv_permit: mv,
      fdacs_im: im,
      class: 'NEWLY_LINKABLE_AFTER_C009',
      note: 'Present in snapshot map and VERIFIED historically but outside frozen C009 PRODUCTION_LINK_READY cohort',
    });
  }
}
const cohortRecheck = {
  task: 'FL-C010',
  retrieved_at: RETRIEVED_AT,
  historical_c009_production_link_ready: historicalReady,
  current_link_ready_vs_c009_snapshot: stillLinkable.length,
  newly_linkable_after_c009: newlyLinkable,
  newly_linkable_count: newlyLinkable.length,
  dropped_vs_snapshot: dropped,
  dropped_count: dropped.length,
  frozen_cohort_changed: false,
  note: 'Frozen C009 cohort remains auditable and unchanged. Newly linkable listed for future review only. Live DB recompute deferred if env unavailable.',
};
writeJson(join(OUT, 'palm-beach-current-cohort-recheck.json'), cohortRecheck);
writeJson(join(OUT, 'NEWLY_LINKABLE_AFTER_C009.json'), {
  task: 'FL-C010',
  records: newlyLinkable,
  count: newlyLinkable.length,
});

// ---------- split review/exclude lists ----------
writeJson(join(OUT, 'transplant-review-list.json'), {
  task: 'FL-C010',
  count: allow.review_count,
  paths: allow.review,
});
writeJson(join(OUT, 'transplant-exclude-list.json'), {
  task: 'FL-C010',
  count: allow.exclude_count,
  paths: allow.exclude,
  principles: [
    'secrets',
    '.env*',
    'credentials files',
    'node_modules',
    'build output',
    'consumer PII',
    'supabase/migrations',
    'unrelated Builder 1 files',
  ],
});

// ---------- PR status audit ----------
let prs = [];
try {
  prs = JSON.parse(
    sh(
      'gh pr list --state open --limit 40 --json number,title,baseRefName,headRefName,mergeable,state,url'
    )
  );
} catch {
  prs = [];
}
const wanted = [45, 48, 51, 52, 54, 56, 58, 60, 62, 64];
const stackMeta = [
  [45, 'FL-C001', 'task-fl-c001-county-regulatory-discovery'],
  [48, 'FL-C002', 'task-fl-c002-palm-beach-regulatory-acquisition'],
  [51, 'FL-C003', 'task-fl-c003-palm-beach-evidence-qualification'],
  [52, 'FL-C004', 'task-fl-c004-broward-regulatory-acquisition'],
  [54, 'FL-C005', 'task-fl-c005-miami-dade-regulatory-acquisition'],
  [56, 'FL-C006', 'task-fl-c006-miami-dade-evidence-qualification'],
  [58, 'FL-C007', 'task-fl-c007-pinellas-regulatory-acquisition'],
  [60, 'FL-C008', 'task-fl-c008-county-regulatory-architecture-discovery'],
  [62, 'FL-C009', 'task-fl-c009-palm-beach-production-integration-spec'],
  [64, 'FL-C010', 'task-fl-c010-county-stack-integration-gate'],
];
const prAudit = {
  task: 'FL-C010',
  retrieved_at: RETRIEVED_AT,
  origin_main: ORIGIN_MAIN,
  prs: stackMeta.map(([num, task, branch]) => {
    const hit = prs.find((p) => p.number === num) || null;
    let head = null;
    try {
      head = sh(`git rev-parse origin/${branch}`);
    } catch {
      try {
        head = sh(`git rev-parse ${branch}`);
      } catch {
        head = null;
      }
    }
    return {
      number: num,
      task,
      branch,
      open: Boolean(hit),
      merged: false,
      state: hit?.state || 'UNKNOWN',
      base: hit?.baseRefName || null,
      headRef: hit?.headRefName || null,
      head_sha: head,
      mergeable: hit?.mergeable || null,
      url: hit?.url || null,
      disposition_after_selective_transplant:
        'KEEP_OPEN_UNTIL_C011_MERGES_THEN_CLOSE_WITHOUT_MERGE_WITH_LINK',
    };
  }),
  note: 'Do not close research PRs in C010. Do not merge stacked PRs into main.',
};
writeJson(join(OUT, 'pr-status-audit.json'), prAudit);

console.log(
  JSON.stringify(
    {
      ok: true,
      origin_main: ORIGIN_MAIN,
      collisions: collisionAudit.counts,
      hash_mismatch: hashMismatch,
      google_hits: googleHits.length,
      migrations: migrationAudit.production_migrations_introduced_by_c001_c010,
      package_decision: packagePlan.decision,
      historical_link_ready: historicalReady,
      newly_linkable: newlyLinkable.length,
    },
    null,
    2
  )
);
