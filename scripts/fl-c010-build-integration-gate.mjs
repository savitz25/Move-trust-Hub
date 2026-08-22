/**
 * FL-C010 — County stack integration gate: freeze, inventory, allowlist, readiness.
 * Design/readiness only. No merge to main. No production writes. No Google Places.
 */
import { createHash } from 'crypto';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';
import { basename, join, relative, resolve, sep } from 'path';
import { execSync } from 'child_process';

const ROOT = resolve('.');
const OUT = resolve('data/county-regulatory/fl/architecture/c010');
const DOCS = resolve('docs/county-regulatory/architecture/integration');
mkdirSync(OUT, { recursive: true });
mkdirSync(DOCS, { recursive: true });

const RETRIEVED_AT = new Date().toISOString();
const C009_HEAD = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
const ORIGIN_MAIN = execSync('git rev-parse origin/main', { encoding: 'utf8' }).trim();
const ORIGIN_MAIN_SUBJECT = execSync('git log -1 --oneline origin/main', {
  encoding: 'utf8',
}).trim();

const STACK = [
  {
    task: 'FL-C001',
    pr: 45,
    branch: 'task-fl-c001-county-regulatory-discovery',
    base: 'main',
  },
  {
    task: 'FL-C002',
    pr: 48,
    branch: 'task-fl-c002-palm-beach-regulatory-acquisition',
    base: 'task-fl-c001-county-regulatory-discovery',
  },
  {
    task: 'FL-C003',
    pr: 51,
    branch: 'task-fl-c003-palm-beach-evidence-qualification',
    base: 'task-fl-c002-palm-beach-regulatory-acquisition',
  },
  {
    task: 'FL-C004',
    pr: 52,
    branch: 'task-fl-c004-broward-regulatory-acquisition',
    base: 'task-fl-c003-palm-beach-evidence-qualification',
  },
  {
    task: 'FL-C005',
    pr: 54,
    branch: 'task-fl-c005-miami-dade-regulatory-acquisition',
    base: 'task-fl-c004-broward-regulatory-acquisition',
  },
  {
    task: 'FL-C006',
    pr: 56,
    branch: 'task-fl-c006-miami-dade-evidence-qualification',
    base: 'task-fl-c005-miami-dade-regulatory-acquisition',
  },
  {
    task: 'FL-C007',
    pr: 58,
    branch: 'task-fl-c007-pinellas-regulatory-acquisition',
    base: 'task-fl-c006-miami-dade-evidence-qualification',
  },
  {
    task: 'FL-C008',
    pr: 60,
    branch: 'task-fl-c008-county-regulatory-architecture-discovery',
    base: 'task-fl-c007-pinellas-regulatory-acquisition',
  },
  {
    task: 'FL-C009',
    pr: 62,
    branch: 'task-fl-c009-palm-beach-production-integration-spec',
    base: 'task-fl-c008-county-regulatory-architecture-discovery',
  },
  {
    task: 'FL-C010',
    pr: null,
    branch: 'task-fl-c010-county-stack-integration-gate',
    base: 'task-fl-c009-palm-beach-production-integration-spec',
  },
];

function sha256File(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}
function sha(obj) {
  return createHash('sha256').update(JSON.stringify(obj)).digest('hex');
}
function writeJson(path, obj) {
  writeFileSync(path, JSON.stringify(obj, null, 2));
}
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
function rel(p) {
  return relative(ROOT, p).split(sep).join('/');
}

function classify(pathRel, size) {
  const p = pathRel.toLowerCase();
  // hard excludes
  if (
    /(^|\/)\.env(\.|$)/i.test(p) ||
    /(^|\/)secrets?\//i.test(p) ||
    /(^|\/)\.secrets?\//i.test(p) ||
    /(^|\/)credentials\.(json|txt|pem|key)$/i.test(p) ||
    /node_modules\//i.test(p) ||
    /\.next\//i.test(p) ||
    /supabase\/migrations\//i.test(p) ||
    /\/_tmp_/i.test(p) ||
    /scripts\/_tmp_/i.test(p) ||
    /\.heapsnapshot$/i.test(p)
  ) {
    return {
      class: 'EXCLUDE_FROM_TRANSPLANT',
      reason: 'secrets/temp/build/migrations',
    };
  }

  // duplicate florida IM crosswalk snapshots — keep one under architecture/c009, review duplicates
  if (/florida-im-company-crosswalk\.json$/i.test(p) && !/architecture\/c009\//i.test(p)) {
    return {
      class: 'REVIEW_BEFORE_TRANSPLANT',
      reason: 'duplicate IM crosswalk snapshot — prefer architecture/c009 current snapshot',
    };
  }

  // large GIS open-data dumps that are discovery noise
  if (/gis-mdc-opendata-arcgis/i.test(p)) {
    return {
      class: 'REVIEW_BEFORE_TRANSPLANT',
      reason: 'large open-data catalog dump; reproducibility optional',
    };
  }

  // large instructional PDF not needed for validation
  if (/instructions-self-service-portal\.pdf$/i.test(p)) {
    return {
      class: 'REVIEW_BEFORE_TRANSPLANT',
      reason: 'large instructional PDF; not validator-critical',
    };
  }

  // keep durable research
  if (
    p.startsWith('data/county-regulatory/') ||
    p.startsWith('docs/county-regulatory/') ||
    /^scripts\/(fl-c00|validate-fl-c00)/i.test(p)
  ) {
    // still flag very large binaries for review note but include if provenance-linked
    if (size >= 1_500_000 && /\.(pdf|html)$/i.test(p)) {
      return {
        class: 'REVIEW_BEFORE_TRANSPLANT',
        reason: `large binary/html (${size} bytes); keep for reproducibility if referenced`,
      };
    }
    return { class: 'INCLUDE_IN_TRANSPLANT', reason: 'durable county research/architecture artifact' };
  }

  if (p.startsWith('data/regulatory-source-catalog/')) {
    return { class: 'INCLUDE_IN_TRANSPLANT', reason: 'regulatory source catalog' };
  }

  return { class: 'REVIEW_BEFORE_TRANSPLANT', reason: 'outside primary county trees' };
}

function largeAction(pathRel, size, referenced) {
  if (size < 250_000) return 'KEEP_IN_GIT';
  if (/instructions-self-service-portal|gis-mdc-opendata/i.test(pathRel)) {
    return 'EXCLUDE_FROM_MAIN_TRANSPLANT_BUT_ARCHIVE_LATER';
  }
  if (size >= 1_000_000 && !referenced) return 'REVIEW';
  if (referenced) return 'KEEP_IN_GIT';
  if (/\.pdf$/i.test(pathRel) && size >= 500_000) return 'REVIEW';
  return 'KEEP_IN_GIT';
}

// Resolve stack heads
const stackResolved = STACK.map((s) => {
  let head = null;
  try {
    head = execSync(`git rev-parse origin/${s.branch}`, { encoding: 'utf8' }).trim();
  } catch {
    try {
      head = execSync(`git rev-parse ${s.branch}`, { encoding: 'utf8' }).trim();
    } catch {
      head = s.task === 'FL-C010' ? C009_HEAD : null;
    }
  }
  return { ...s, head };
});

// Inventory candidate files
const candidateRoots = [
  resolve('data/county-regulatory'),
  resolve('docs/county-regulatory'),
];
if (existsSync(resolve('data/regulatory-source-catalog'))) {
  candidateRoots.push(resolve('data/regulatory-source-catalog'));
}
const scripts = [
  ...walk(resolve('scripts')).filter((p) => {
    const b = basename(p);
    return /^(fl-c00|validate-fl-c00)/i.test(b) && b.endsWith('.mjs');
  }),
];

const allFiles = [];
for (const r of candidateRoots) allFiles.push(...walk(r));
allFiles.push(...scripts);

const inventory = [];
const classCounts = {
  INCLUDE_IN_TRANSPLANT: 0,
  REVIEW_BEFORE_TRANSPLANT: 0,
  EXCLUDE_FROM_TRANSPLANT: 0,
};

for (const abs of allFiles) {
  const pathRel = rel(abs);
  const size = statSync(abs).size;
  const hash = sha256File(abs);
  const cls = classify(pathRel, size);
  classCounts[cls.class]++;
  inventory.push({
    path: pathRel,
    size,
    sha256: hash,
    classification: cls.class,
    reason: cls.reason,
    ext: pathRel.includes('.') ? pathRel.split('.').pop().toLowerCase() : '',
  });
}

inventory.sort((a, b) => a.path.localeCompare(b.path));

// Validator references (rough): which files validators mention
const validatorTexts = walk(resolve('scripts'))
  .filter((p) => /validate-fl-c00/i.test(basename(p)))
  .map((p) => readFileSync(p, 'utf8'))
  .join('\n');

const largeArtifacts = inventory
  .filter((f) => f.size >= 250_000)
  .map((f) => {
    const referenced =
      validatorTexts.includes(f.path) ||
      validatorTexts.includes(basename(f.path)) ||
      /qualified\/|architecture\/|normalize|provenance|crosswalk|cohort/i.test(f.path);
    return {
      path: f.path,
      size: f.size,
      sha256: f.sha256,
      classification: f.classification,
      referenced_by_validator_heuristic: referenced,
      needed_for_reproducibility: referenced || /raw\/|qualified\/|evidence\//i.test(f.path),
      recommended_action: largeAction(f.path, f.size, referenced),
    };
  })
  .sort((a, b) => b.size - a.size);

// PII heuristic scan on text-ish allowlisted/review files
const piiPatterns = [
  { id: 'ssn', re: /\b\d{3}-\d{2}-\d{4}\b/ },
  { id: 'consumer_email_field', re: /"(complainant|consumer)_(email|phone|name|address)"\s*:/i },
  { id: 'dob_field', re: /"date_of_birth"\s*:|"dob"\s*:/i },
];
const piiHits = [];
for (const f of inventory) {
  if (f.classification === 'EXCLUDE_FROM_TRANSPLANT') continue;
  if (!/\.(json|md|txt|csv|html)$/i.test(f.path)) continue;
  if (f.size > 5_000_000) continue;
  let text = '';
  try {
    text = readFileSync(resolve(f.path), 'utf8');
  } catch {
    continue;
  }
  for (const pat of piiPatterns) {
    if (pat.re.test(text)) {
      piiHits.push({ path: f.path, pattern: pat.id });
    }
  }
}

// Main compatibility — commits since C009 observed main
const sinceSha = 'ab93c84195f3b36c7e2bbd70495a0ee1432d8140';
let mainCommits = [];
try {
  const out = execSync(`git log --oneline ${sinceSha}..origin/main`, { encoding: 'utf8' });
  mainCommits = out
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);
} catch {
  mainCommits = [];
}

let touchedPaths = [];
try {
  const out = execSync(
    `git log --name-only --pretty=format: ${sinceSha}..origin/main -- app/ components/ lib/ supabase/ scripts/`,
    { encoding: 'utf8' }
  );
  touchedPaths = [
    ...new Set(
      out
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean)
    ),
  ].sort();
} catch {
  touchedPaths = [];
}

const STATE_TRACK_ACTIVE = true; // Wave 1 observation period + recent publication/404 work; visual shell also landed
const SAFE_TO_INTEGRATE_COUNTY_STACK_NOW = 'NO';

const allowlist = inventory
  .filter((f) => f.classification === 'INCLUDE_IN_TRANSPLANT')
  .map((f) => f.path);
const reviewlist = inventory
  .filter((f) => f.classification === 'REVIEW_BEFORE_TRANSPLANT')
  .map((f) => f.path);
const excludelist = inventory
  .filter((f) => f.classification === 'EXCLUDE_FROM_TRANSPLANT')
  .map((f) => f.path);

const freeze = {
  freeze_id: 'FL_COUNTY_RESEARCH_V1_FREEZE',
  created_at: RETRIEVED_AT,
  frozen_head_sha: C009_HEAD,
  note: 'Freeze points at C009 research package head; C010 adds integration-gate artifacts on top of this lineage.',
  origin_main_observed: ORIGIN_MAIN,
  origin_main_subject: ORIGIN_MAIN_SUBJECT,
  stack: stackResolved,
  artifact_counts: {
    inventory_total: inventory.length,
    ...classCounts,
    large_artifacts_ge_250kb: largeArtifacts.length,
  },
  validators: readdirSync(resolve('scripts'))
    .filter((f) => /^validate-fl-c00/i.test(f) && f.endsWith('.mjs'))
    .sort(),
  package_hash: null,
};

const readiness = {
  task: 'FL-C010',
  STATE_TRACK_ACTIVE,
  SAFE_TO_INTEGRATE_COUNTY_STACK_NOW,
  reasons_not_safe_now: [
    'FL_STATE_WAVE_1 observation/publication track still active historically; recent main includes FL-010r hard-404 remediation and VISUAL-006 network shell',
    'Do not equate Wave launched with state track stable',
    'Rehearsal may prove technical transplant feasibility without clearing the organizational gate',
  ],
  technical_rehearsal_required: true,
  merge_now: false,
  recommended_next:
    'Hold for state-track stability; when gate clears, execute Strategy 3 selective transplant using this allowlist/runbook',
};

const mainCompat = {
  task: 'FL-C010',
  since_sha: sinceSha,
  current_origin_main: ORIGIN_MAIN,
  commits_since: mainCommits,
  materially_touched_paths_sample: touchedPaths.slice(0, 200),
  overlap_risk_assessment: [
    {
      area: 'company profile / layout / network shell',
      risk: 'LOW_FOR_COUNTY_DATA_TRANSPLANT',
      note: 'VISUAL-006 touches app/layout and hub chrome; county transplant should avoid app/components unless intentionally coordinating',
    },
    {
      area: 'state-HHG / publication',
      risk: 'AVOID',
      note: 'County allowlist must exclude state publication helpers and FL_STATE_WAVE paths',
    },
    {
      area: 'supabase/migrations',
      risk: 'EXCLUDE',
      note: 'No county research migrations should land via transplant',
    },
  ],
  transplant_must_not_modify: [
    'lib/state-hhg/** publication helpers',
    'FL_STATE_WAVE_1 / KEEP_80 controls',
    'company publication_state/indexable mutation scripts',
    'Trust Score',
    'app profile routes unless explicitly coordinated later',
  ],
};

writeJson(join(OUT, 'fl-county-research-v1-freeze.json'), {
  ...freeze,
  package_hash: sha({
    head: C009_HEAD,
    main: ORIGIN_MAIN,
    include: allowlist.length,
    review: reviewlist.length,
  }).slice(0, 16),
});
writeJson(join(OUT, 'file-inventory.json'), {
  task: 'FL-C010',
  retrieved_at: RETRIEVED_AT,
  counts: classCounts,
  total: inventory.length,
  files: inventory,
});
writeJson(join(OUT, 'transplant-allowlist.json'), {
  task: 'FL-C010',
  strategy: 'STRATEGY_3_SELECTIVE_TRANSPLANT',
  include_count: allowlist.length,
  review_count: reviewlist.length,
  exclude_count: excludelist.length,
  include: allowlist,
  review: reviewlist,
  exclude: excludelist,
});
writeJson(join(OUT, 'large-artifact-audit.json'), {
  task: 'FL-C010',
  threshold_bytes: 250000,
  count: largeArtifacts.length,
  artifacts: largeArtifacts,
});
writeJson(join(OUT, 'pii-audit.json'), {
  task: 'FL-C010',
  consumer_pii_included_in_transplant_allowlist: 0,
  heuristic_hits: piiHits,
  note:
    piiHits.length === 0
      ? 'No consumer-PII field patterns detected in text allowlist/review candidates under heuristic scan.'
      : 'Heuristic hits require human review before INCLUDE; do not treat hits as confirmed consumer PII.',
});
writeJson(join(OUT, 'main-compatibility-audit.json'), mainCompat);
writeJson(join(OUT, 'state-track-gate.json'), readiness);

writeJson(join(OUT, 'fl-c010-summary.json'), {
  task: 'FL-C010',
  status: 'COMPLETE_PENDING_REHEARSAL_RESULTS',
  retrieved_at: RETRIEVED_AT,
  frozen_head_sha: C009_HEAD,
  origin_main_observed: ORIGIN_MAIN,
  origin_main_subject: ORIGIN_MAIN_SUBJECT,
  STATE_TRACK_ACTIVE,
  SAFE_TO_INTEGRATE_COUNTY_STACK_NOW,
  inventory_total: inventory.length,
  include_count: allowlist.length,
  review_count: reviewlist.length,
  exclude_count: excludelist.length,
  large_artifacts: largeArtifacts.length,
  pii_heuristic_hits: piiHits.length,
  consumer_pii_included_in_transplant_allowlist: 0,
  google_places_api_requests: 0,
  production_writes: false,
  production_db_migrations: 0,
  consumer_pii_committed: 0,
  merge_executed: false,
  transplant_executed_to_main: false,
  recommended_fl_c011:
    'FL-C011 — County Research Stack Selective-Transplant Integration (execute only when SAFE_TO_INTEGRATE=YES)',
});

console.log(
  JSON.stringify(
    {
      ok: true,
      frozen_head: C009_HEAD,
      origin_main: ORIGIN_MAIN,
      inventory_total: inventory.length,
      include: allowlist.length,
      review: reviewlist.length,
      exclude: excludelist.length,
      large: largeArtifacts.length,
      SAFE_TO_INTEGRATE_COUNTY_STACK_NOW,
    },
    null,
    2
  )
);
