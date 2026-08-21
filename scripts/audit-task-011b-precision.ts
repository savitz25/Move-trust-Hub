/**
 * Task 011B precision audit for MATCHED_EXISTING + NEW_PROVIDER_CANDIDATE samples.
 * Fail closed: any false MATCHED_EXISTING → exit 1.
 * Google Places: 0
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import {
  normalizeLegalName,
  normalizePhone,
  normalizeUsdot,
  normalizeAddressLine,
  isFranchiseOrNetworkBrandName,
} from '@/lib/state-hhg/normalize';

type CohortRecord = {
  state: string;
  sourceAuthorityId: string;
  legalName: string;
  dba: string | null;
  canonicalCompanyId: string | null;
  usdot: string | null;
  location?: { physicalAddress?: string | null };
  phoneAvailable?: boolean;
  identityDisposition: string;
  matchMethod: string | null;
  verificationState: string;
  roleClass: string;
  reviewReason?: string | null;
};

function loadCohort(path: string): CohortRecord[] {
  const json = JSON.parse(readFileSync(path, 'utf8')) as { records: CohortRecord[] };
  return json.records ?? [];
}

function sample<T>(arr: T[], n: number, seed: number): T[] {
  if (arr.length <= n) return [...arr];
  const out: T[] = [];
  let x = seed || 1;
  const used = new Set<number>();
  while (out.length < n && used.size < arr.length) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    const i = x % arr.length;
    if (used.has(i)) continue;
    used.add(i);
    out.push(arr[i]);
  }
  return out;
}

function auditMatched(records: CohortRecord[]): {
  audited: number;
  falseMatches: number;
  issues: string[];
} {
  const issues: string[] = [];
  let falseMatches = 0;
  for (const r of records) {
    if (!r.canonicalCompanyId) {
      falseMatches++;
      issues.push(`${r.state}:${r.sourceAuthorityId} MATCHED without company id`);
      continue;
    }
    if (r.matchMethod === 'none' || !r.matchMethod) {
      falseMatches++;
      issues.push(`${r.state}:${r.sourceAuthorityId} MATCHED with method none`);
      continue;
    }
    // Franchise brand matched only allowed via exact USDOT / prior authority
    if (
      (isFranchiseOrNetworkBrandName(r.legalName) || isFranchiseOrNetworkBrandName(r.dba)) &&
      r.matchMethod !== 'exact_usdot' &&
      r.matchMethod !== 'exact_prior_state_authority'
    ) {
      falseMatches++;
      issues.push(
        `${r.state}:${r.sourceAuthorityId} franchise matched via ${r.matchMethod}`
      );
    }
  }
  return { audited: records.length, falseMatches, issues };
}

function auditNewCandidates(records: CohortRecord[]): {
  audited: number;
  likelyGenuinelyNew: number;
  suspicious: number;
  notes: string[];
} {
  let likelyGenuinelyNew = 0;
  let suspicious = 0;
  const notes: string[] = [];
  for (const r of records) {
    if (r.canonicalCompanyId) {
      suspicious++;
      notes.push(`${r.state}:${r.sourceAuthorityId} NEW but has company id`);
      continue;
    }
    if (isFranchiseOrNetworkBrandName(r.legalName) || isFranchiseOrNetworkBrandName(r.dba)) {
      // Franchise without match should have been REVIEW — flag if NEW
      suspicious++;
      notes.push(`${r.state}:${r.sourceAuthorityId} franchise marked NEW`);
      continue;
    }
    likelyGenuinelyNew++;
  }
  return {
    audited: records.length,
    likelyGenuinelyNew,
    suspicious,
    notes: notes.slice(0, 20),
  };
}

function main() {
  const flPath = resolve('docs/task-011b-fl-verified-authority-cohort.json');
  const waPath = resolve('docs/task-011b-wa-verified-authority-cohort.json');
  if (!existsSync(flPath) || !existsSync(waPath)) {
    throw new Error('cohort files missing — run ingest first');
  }
  const fl = loadCohort(flPath);
  const wa = loadCohort(waPath);

  const flMatched = fl.filter((r) => r.identityDisposition === 'MATCHED_EXISTING');
  const waMatched = wa.filter((r) => r.identityDisposition === 'MATCHED_EXISTING');
  const flNew = fl.filter((r) => r.identityDisposition === 'NEW_PROVIDER_CANDIDATE');
  const waNew = wa.filter((r) => r.identityDisposition === 'NEW_PROVIDER_CANDIDATE');

  const flMatchedAudit = auditMatched(sample(flMatched, Math.min(100, flMatched.length), 11));
  const waMatchedAudit = auditMatched(sample(waMatched, Math.min(100, waMatched.length), 22));
  // Also audit ALL matched for hard fail (precision must be 100%)
  const flAllMatched = auditMatched(flMatched);
  const waAllMatched = auditMatched(waMatched);

  const flNewAudit = auditNewCandidates(sample(flNew, Math.min(50, flNew.length), 33));
  const waNewAudit = auditNewCandidates(sample(waNew, Math.min(50, waNew.length), 44));

  const report = {
    google_places_requests: 0,
    task: '011B',
    matched_precision: {
      FL: {
        population: flMatched.length,
        sample: flMatchedAudit,
        full: flAllMatched,
        precision_pct:
          flAllMatched.audited === 0
            ? null
            : ((flAllMatched.audited - flAllMatched.falseMatches) / flAllMatched.audited) * 100,
      },
      WA: {
        population: waMatched.length,
        sample: waMatchedAudit,
        full: waAllMatched,
        precision_pct:
          waAllMatched.audited === 0
            ? null
            : ((waAllMatched.audited - waAllMatched.falseMatches) / waAllMatched.audited) * 100,
      },
    },
    new_provider_candidate_audit: {
      FL: { population: flNew.length, ...flNewAudit },
      WA: { population: waNew.length, ...waNewAudit },
    },
    contact_yield: {
      FL: {
        phone_pct: fl.length
          ? Math.round((fl.filter((r) => r.phoneAvailable).length / fl.length) * 1000) / 10
          : 0,
        email_pct: fl.length
          ? Math.round(
              (fl.filter((r) => (r as { emailAvailable?: boolean }).emailAvailable).length /
                fl.length) *
                1000
            ) / 10
          : 0,
      },
      WA: {
        phone_pct: wa.length
          ? Math.round((wa.filter((r) => r.phoneAvailable).length / wa.length) * 1000) / 10
          : 0,
      },
    },
    checks: {
      fl_matched_precision_100: flAllMatched.falseMatches === 0,
      wa_matched_precision_100: waAllMatched.falseMatches === 0,
      no_google: true,
    },
  };

  writeFileSync(
    resolve('docs/task-011b-precision-audit.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(JSON.stringify(report, null, 2));
  if (!report.checks.fl_matched_precision_100 || !report.checks.wa_matched_precision_100) {
    process.exit(1);
  }
}

main();
