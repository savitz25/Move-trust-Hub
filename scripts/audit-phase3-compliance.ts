/**
 * Phase 3 compliance — deep research inventory, Tier 1 cap, live probes.
 * Run: npx tsx scripts/audit-phase3-compliance.ts
 */
import { writeFileSync } from 'node:fs';
import {
  DEEP_COUNTY_TOTAL,
  DEEP_COUNTY_UPGRADE_WAVE_3,
  hasDeepCountyResearch,
} from '../data/deep-county-research';
import { evaluateCountyIndexability } from '../lib/local-movers/county-indexability';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { hasCitedCountyResearchContent } from '../lib/local-movers/county-research-citations';
import { getCountyResearch } from '../lib/local-movers/county-research';
import {
  assertTier1CircuitBreakerOrExit,
  MAX_TIER1_COUNT,
} from './lib/tier1-circuit-breaker';
import {
  buildAllAuditProbes,
  fetchAllAuditProbes,
  PRODUCTION_ORIGIN,
  serializeProbeResults,
  type LiveCountyProbe,
} from './lib/live-county-audit';
import { auditRenderedMetadataProbes } from './lib/rendered-metadata-probe-audit';

/** Additional Florida verification counties (Phase 3). */
const FL_PHASE3_PROBES: LiveCountyProbe[] = [
  {
    stateSlug: 'florida',
    countySlug: 'lee',
    label: 'Lee FL',
    path: '/local-movers/florida/lee',
    probeGroup: 'named',
  },
  {
    stateSlug: 'florida',
    countySlug: 'brevard',
    label: 'Brevard FL',
    path: '/local-movers/florida/brevard',
    probeGroup: 'named',
  },
  {
    stateSlug: 'florida',
    countySlug: 'seminole',
    label: 'Seminole FL',
    path: '/local-movers/florida/seminole',
    probeGroup: 'named',
  },
];

async function main() {
  const phase = process.env.VERIFICATION_PHASE ?? 'production';
  const origin = process.env.AUDIT_ORIGIN ?? PRODUCTION_ORIGIN;
  const commitHash = process.env.DEPLOY_COMMIT_HASH;
  const circuitBreaker = assertTier1CircuitBreakerOrExit();

  let deepCount = 0;
  let tier1DeepCount = 0;
  let tier1CitedCount = 0;
  const wave3Keys: string[] = [];

  for (const { stateSlug, countySlug } of getAllCountyParams()) {
    if (hasDeepCountyResearch(stateSlug, countySlug)) {
      deepCount += 1;
      const decision = evaluateCountyIndexability(stateSlug, countySlug);
      if (decision.tier === 'index') tier1DeepCount += 1;
      const research = getCountyResearch(stateSlug, countySlug);
      if (decision.tier === 'index' && hasCitedCountyResearchContent(research)) {
        tier1CitedCount += 1;
      }
    }
  }

  for (const { stateSlug, countySlug } of DEEP_COUNTY_UPGRADE_WAVE_3) {
    wave3Keys.push(`${stateSlug}/${countySlug}`);
  }

  const probePlan = buildAllAuditProbes(commitHash);
  const allProbes = [...probePlan.all, ...FL_PHASE3_PROBES];
  const liveResults = await fetchAllAuditProbes(allProbes, origin);
  const liveSerialized = serializeProbeResults(origin, liveResults);
  const deploymentProtectionBlocked = liveResults.every((r) =>
    r.errors.includes('vercel_deployment_protection')
  );
  const renderedMetadataAudit =
    phase === 'preview' && deploymentProtectionBlocked
      ? auditRenderedMetadataProbes(allProbes)
      : undefined;
  const livePass = liveSerialized.failedProbeCount === 0;
  const previewMetadataFallbackPass = Boolean(renderedMetadataAudit?.pass);

  const report = {
    generatedAt: new Date().toISOString(),
    verificationPhase: phase,
    auditOrigin: origin,
    deployCommitHash: probePlan.commitHash,
    phase3Requirements: {
      deepCountyTarget: 150,
      deepCountyTotal: DEEP_COUNTY_TOTAL,
      deepCountyPass: DEEP_COUNTY_TOTAL >= 150,
      tier1Max: MAX_TIER1_COUNT,
      tier1Current: circuitBreaker.tier1,
      tier1Pass: circuitBreaker.pass,
    },
    enrichment: {
      deepCountiesInCatalog: deepCount,
      tier1WithDeepResearch: tier1DeepCount,
      tier1WithCitedContent: tier1CitedCount,
      wave3NewCounties: wave3Keys.length,
      wave3Sample: wave3Keys.slice(0, 25),
    },
    circuitBreaker,
    liveVerification: liveSerialized,
    vercelDeploymentProtection: deploymentProtectionBlocked
      ? {
          blocked: true,
          note:
            'Vercel preview requires VERCEL_AUTOMATION_BYPASS_SECRET for HTML fetch; rendered metadata audit used as fallback.',
        }
      : { blocked: false },
    renderedMetadataAudit,
    floridaProbes: FL_PHASE3_PROBES.map((p) => `${origin}${p.path}`),
    phase3Pass:
      DEEP_COUNTY_TOTAL >= 150 &&
      circuitBreaker.pass &&
      (livePass || (phase === 'preview' && previewMetadataFallbackPass)),
  };

  const outFile =
    phase === 'preview'
      ? 'scripts/output/phase3-preview-verification.json'
      : 'scripts/output/phase3-production-verification.json';

  writeFileSync(outFile, JSON.stringify(report, null, 2));
  writeFileSync('scripts/output/phase3-compliance-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));

  if (!report.phase3Pass) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});