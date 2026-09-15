/**
 * TH-LEGACY-CONTAIN-001 regression guard.
 *
 * Move Trust Hub must not contain a functioning public Lender or Insurance
 * application, and must never reintroduce the legacy Trust Score / Government
 * Standing scoring machinery that lived inside those duplicate verticals.
 *
 * This check has two halves:
 *  1. Directory-tree assertions — the confirmed-dead duplicate application
 *     trees must not exist at all.
 *  2. A scoped content scan for banned scoring identifiers across all
 *     consumer-facing source (app/, components/, lib/, types/) — with a
 *     narrow, explicit allowlist for files that legitimately *describe*
 *     this history (this file, docs/, and test fixtures for it).
 *
 *   npx tsx scripts/check-vertical-separation.ts
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(__dirname, '..');
const errors: string[] = [];

function fail(msg: string) {
  errors.push(msg);
}

// --- 1. Confirmed-dead duplicate application trees must not exist ---
const BANNED_PATHS = [
  'app/lender',
  'app/insurance',
  'lib/lender',
  'lib/insurance',
  'components/lender',
  'components/insurance',
  'public/lender',
  'public/insurance',
  'types/lender',
  'types/insurance',
  'app/api/insurance-auth',
  'app/auth/insurance',
  'actions/my-insurance.ts',
  'app/api/refresh/lenders',
  'app/api/refresh/insurance-providers',
];

for (const p of BANNED_PATHS) {
  if (existsSync(join(ROOT, p))) {
    fail(`Banned duplicate-vertical path still exists: ${p}`);
  }
}

// --- 2. Scoped content scan for banned scoring identifiers ---
const BANNED_PATTERNS: { label: string; re: RegExp }[] = [
  { label: 'Trust Score (proprietary UI label)', re: /\bTrust Score\b/ },
  { label: 'Government Standing', re: /Government Standing/i },
  { label: 'computeGovernmentStandingScore', re: /computeGovernmentStandingScore/ },
  { label: 'governmentStandingToTrustBoost', re: /governmentStandingToTrustBoost/ },
  { label: 'GOVERNMENT_STANDING_WEIGHT', re: /GOVERNMENT_STANDING_WEIGHT/ },
  { label: 'resolveGovernmentStandingInput', re: /resolveGovernmentStandingInput/ },
  { label: 'County Experience Score', re: /County Experience Score/i },
  { label: 'countyExperienceScore', re: /countyExperienceScore/ },
  { label: 'local_market_experience', re: /local_market_experience/ },
  {
    label: 'legacy network doctrine sequence',
    re: /SOURCE\s*(?:→|->)\s*VERIFY\s*(?:→|->)\s*DISCLOSE\s*(?:→|->)\s*SCORE/,
  },
];

// Directories to scan (consumer-facing source only — never scripts/data/docs,
// which may legitimately discuss this history or contain unrelated matches).
const SCAN_ROOTS = ['app', 'components', 'lib', 'types', 'middleware.ts', 'next.config.ts'];

// Exact relative-path allowlist: files permitted to mention the banned terms
// because they document or regression-test this exact history.
const ALLOWLIST = new Set([relative(ROOT, __filename).replace(/\\/g, '/')]);

const SKIP_DIR_NAMES = new Set(['node_modules', '.next', '.git']);

function walk(dir: string, out: string[]) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIR_NAMES.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, out);
    } else if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(entry)) {
      out.push(full);
    }
  }
}

const filesToScan: string[] = [];
for (const root of SCAN_ROOTS) {
  const full = join(ROOT, root);
  if (!existsSync(full)) continue;
  if (statSync(full).isDirectory()) {
    walk(full, filesToScan);
  } else {
    filesToScan.push(full);
  }
}

for (const file of filesToScan) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  if (ALLOWLIST.has(rel)) continue;
  // Never scan a repo-relative test/check file's own describing comments.
  if (rel.endsWith('.test.ts') || rel.endsWith('.test.tsx')) continue;

  let content: string;
  try {
    content = readFileSync(file, 'utf8');
  } catch {
    continue;
  }

  const lines = content.split('\n');
  let offset = 0;
  const lineStartOffsets = lines.map((l) => {
    const start = offset;
    offset += l.length + 1;
    return start;
  });

  for (const { label, re } of BANNED_PATTERNS) {
    const globalRe = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    for (const match of content.matchAll(globalRe)) {
      const idx = match.index ?? 0;

      // Skip matches inside comment lines (Move's own code frequently discusses
      // its unrelated pre-existing `trust_score` concept in prose comments —
      // that is not a reintroduction of the banned proprietary scoring UI).
      const lineIdx = lineStartOffsets.findIndex((s, i) =>
        idx >= s && (i === lines.length - 1 || idx < lineStartOffsets[i + 1])
      );
      const line = lines[lineIdx]?.trim() ?? '';
      if (line.startsWith('*') || line.startsWith('//') || line.startsWith('/*')) {
        continue;
      }

      const start = Math.max(0, idx - 40);
      const context = content.slice(start, idx);
      // "No Trust Score.", "not a Trust Score", "without a Government Standing score", etc.
      // are the network's own compliant disclaimers, not a reintroduction of the pattern.
      if (/\b(no|not|without|never|isn'?t|doesn'?t|don'?t)\b[\s\S]{0,25}$/i.test(context)) {
        continue;
      }
      fail(`Banned pattern "${label}" found in ${rel} (near: "${content.slice(Math.max(0, idx - 15), idx + match[0].length + 15).replace(/\s+/g, ' ')}")`);
    }
  }
}

if (errors.length) {
  console.error('VERTICAL-SEPARATION CHECK FAIL');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}
console.log(
  `VERTICAL-SEPARATION CHECK PASS (${filesToScan.length} files scanned, ${BANNED_PATHS.length} paths confirmed absent)`
);
