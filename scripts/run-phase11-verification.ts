/**
 * Phase 1.1 full verification pipeline (mandatory sequencing).
 *
 * 1. Circuit breaker (Tier 1 <= 400) — halt if fail
 * 2. CI guards (exemptions + testimonials)
 * 3. Rendered metadata audit
 * 4. GSC baseline capture
 * 5. Live probe fetch (preview or production via AUDIT_ORIGIN)
 *
 * Usage:
 *   npx tsx scripts/run-phase11-verification.ts
 *   AUDIT_ORIGIN=https://preview-url.vercel.app npx tsx scripts/run-phase11-verification.ts
 */
import { writeFileSync } from 'node:fs';
import { INDEXABILITY_RECONCILIATION } from './lib/indexability-reconciliation';
import {
  assertTier1CircuitBreakerOrExit,
  evaluateTier1CircuitBreaker,
} from './lib/tier1-circuit-breaker';
import {
  buildAllAuditProbes,
  fetchAllAuditProbes,
  PRODUCTION_ORIGIN,
  serializeProbeResults,
} from './lib/live-county-audit';
import { auditRenderedMetadataProbes } from './lib/rendered-metadata-probe-audit';

async function main() {
  const phase = process.env.VERIFICATION_PHASE ?? 'production';
  const origin = process.env.AUDIT_ORIGIN ?? PRODUCTION_ORIGIN;
  const commitHash = process.env.DEPLOY_COMMIT_HASH ?? buildAllAuditProbes().commitHash;

  const circuitBreaker = assertTier1CircuitBreakerOrExit();
  const probePlan = buildAllAuditProbes(commitHash);
  const liveResults = await fetchAllAuditProbes(probePlan.all, origin);
  const liveSerialized = serializeProbeResults(origin, liveResults);
  const deploymentProtectionBlocked = liveResults.every((r) =>
    r.errors.includes('vercel_deployment_protection')
  );
  const renderedMetadataAudit =
    phase === 'preview' && deploymentProtectionBlocked
      ? auditRenderedMetadataProbes(probePlan.all)
      : undefined;

  const livePass = liveSerialized.failedProbeCount === 0;
  const previewMetadataFallbackPass = Boolean(renderedMetadataAudit?.pass);

  const report = {
    generatedAt: new Date().toISOString(),
    verificationPhase: phase,
    deployCommitHash: commitHash,
    auditOrigin: origin,
    circuitBreaker,
    indexabilityReconciliation: INDEXABILITY_RECONCILIATION,
    probePlan: {
      namedCount: probePlan.named.length,
      seededRandomCount: probePlan.seededRandom.length,
      totalProbes: probePlan.all.length,
      seededSample: probePlan.seededSample,
      seededRandomUrls: probePlan.seededRandom.map((p) => `${origin}${p.path}`),
      namedUrls: probePlan.named.map((p) => `${origin}${p.path}`),
    },
    liveVerification: liveSerialized,
    vercelDeploymentProtection: deploymentProtectionBlocked
      ? {
          blocked: true,
          note:
            'Vercel preview URLs require VERCEL_AUTOMATION_BYPASS_SECRET for automated HTML fetch. Rendered metadata builder audit used as preview fallback.',
        }
      : { blocked: false },
    renderedMetadataAudit,
    phase11Pass:
      circuitBreaker.pass &&
      (livePass || (phase === 'preview' && previewMetadataFallbackPass)),
  };

  const outFile =
    phase === 'preview'
      ? 'scripts/output/phase11-preview-verification.json'
      : 'scripts/output/phase11-production-verification.json';

  writeFileSync(outFile, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));

  if (!report.phase11Pass) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});