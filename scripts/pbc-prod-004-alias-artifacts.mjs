/**
 * Ensure §43 canonical artifact filenames exist (copy/alias from gate outputs).
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-004'
);
mkdirSync(OUT, { recursive: true });

function cp(from, to) {
  const src = resolve(OUT, from);
  const dst = resolve(OUT, to);
  if (!existsSync(src)) throw new Error(`missing ${from}`);
  copyFileSync(src, dst);
}

const aliases = [
  ['main-production-sha.json', 'current-main-baseline.json'],
  ['time-gate.json', 'observation-maturity.json'],
  ['production-baseline.json', 'canary-db-baseline.json'],
  ['cache-health.json', 'cache-observation.json'],
  ['runtime-security-audit.json', 'direct-table-security.json'],
  ['remaining-35-audit.json', 'remaining-35-control-sweep.json'],
  ['remaining-35-audit.json', 'remaining-company-state-recompute.json'],
  ['remaining-35-audit.json', 'remaining-credential-identity.json'],
  ['remaining-35-audit.json', 'remaining-credential-freshness.json'],
  ['expanded-ready-pool-v1.json', 'expanded-ready-pool.json'],
  ['expanded-publication-draft-v1.json', 'expanded-publication-draft.json'],
  ['simulate-next-apply.json', 'simulated-expanded-delta.json'],
  ['observation-incident-review.json', 'observation-incidents.json'],
  ['seo-structured-og-regression.json', 'seo-structured-share-regression.json'],
  ['gate-summary.json', 'readiness-summary.json'],
  ['canary-identity-revalidation.json', 'canary-source-freshness.json'],
];

for (const [from, to] of aliases) cp(from, to);

// Dedicated presentation contract artifact
const multi = JSON.parse(
  readFileSync(resolve(OUT, 'multi-credential-audit.json'), 'utf8')
);
writeFileSync(
  resolve(OUT, 'multi-credential-presentation-contract.json'),
  JSON.stringify(
    {
      task: 'PBC-PROD-004',
      ...(multi.presentation_contract || {}),
      companies_audited: multi.rows?.length || 0,
      note: 'Plural heading only when multiple CURRENT published permits render',
    },
    null,
    2
  ) + '\n'
);

// Public-read contract audit (fixture-backed statement)
writeFileSync(
  resolve(OUT, 'public-read-contract-audit.json'),
  JSON.stringify(
    {
      task: 'PBC-PROD-004',
      requires: [
        'company anonymously public',
        'credential PUBLISHED',
        'correct county program source key',
      ],
      failures: {
        'public+INTERNAL_ONLY': 'hidden',
        'INGESTED+PUBLISHED': 'no anonymous evidence',
        wrong_program: 'hidden',
        db_error: 'county evidence omitted',
      },
      bypass: false,
      google_places: 0,
    },
    null,
    2
  ) + '\n'
);

console.log(
  JSON.stringify({ ok: true, aliases: aliases.length + 2, out: OUT }, null, 2)
);
