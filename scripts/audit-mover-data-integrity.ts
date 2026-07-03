/**
 * Data integrity audit — counts excluded movers, placeholder licenses, and review coverage.
 * Run: npx tsx scripts/audit-mover-data-integrity.ts
 */
import { writeFileSync } from 'node:fs';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import { getAllCountyParams } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';
import {
  evaluateCuratedListing,
  isGeneratedTemplateMover,
} from '../lib/trust/curated-listing-policy';
import { assessLicense, isPlaceholderMoverId } from '../lib/trust/license-verification';
import { canShowVerifiedBadge } from '../lib/trust/company-display-policy';
import { seedCompanies } from '../data/seed-companies';
import { seedAutoTransportCompanies } from '../data/seed-auto-transport';
import {
  buildAttributableCountyReviews,
  countAttributableReviews,
  hasAttributableCountyReviews,
} from '../lib/trust/verified-reviews';

const allMovers = Object.values(fullMoversCatalog);
const exclusionReasons = new Map<string, number>();
let displayable = 0;

for (const mover of allMovers) {
  const verdict = evaluateCuratedListing(mover);
  if (verdict.isDisplayable) {
    displayable += 1;
  } else {
    exclusionReasons.set(verdict.reason, (exclusionReasons.get(verdict.reason) ?? 0) + 1);
  }
}

const placeholderIds = allMovers.filter((m) => isPlaceholderMoverId(m.id)).length;
const generatedIds = allMovers.filter((m) => isGeneratedTemplateMover(m.id)).length;

const suspiciousDirectory = seedCompanies.filter(
  (c) => !assessLicense(c.usdotNumber, c.mcNumber).isDisplayable
);

const suspiciousAutoTransport = seedAutoTransportCompanies.filter(
  (c) => !assessLicense(c.usdotNumber, c.mcNumber).isDisplayable
);

const verifiedWithBadLicense = seedAutoTransportCompanies.filter(
  (c) => c.isVerified && !canShowVerifiedBadge(c)
);

const params = getAllCountyParams();
let countiesWithReviews = 0;
let countiesZeroMovers = 0;
let totalDisplayedMovers = 0;
const priorityMetros = [
  'california/los-angeles',
  'california/san-diego',
  'florida/miami-dade',
  'florida/broward',
  'texas/harris',
  'texas/dallas',
  'new-york/kings',
  'new-york/new-york',
  'georgia/fulton',
  'illinois/cook',
];

const priorityReport: Array<{
  county: string;
  movers: number;
  attributableReviews: number;
}> = [];

for (const { stateSlug, countySlug } of params) {
  const result = getMoversForCounty(stateSlug, countySlug);
  const movers = result?.movers ?? [];
  totalDisplayedMovers += movers.length;
  if (movers.length === 0) countiesZeroMovers += 1;
  if (hasAttributableCountyReviews(movers)) countiesWithReviews += 1;

  const key = `${stateSlug}/${countySlug}`;
  if (priorityMetros.includes(key)) {
    priorityReport.push({
      county: key,
      movers: movers.length,
      attributableReviews: buildAttributableCountyReviews(movers, 3).length,
    });
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  catalog: {
    totalMoversInCatalog: allMovers.length,
    displayableAfterPolicy: displayable,
    excluded: allMovers.length - displayable,
    regionalPlaceholderIds: placeholderIds,
    generatedTemplateIds: generatedIds,
    exclusionReasons: Object.fromEntries(exclusionReasons),
  },
  directory: {
    totalCompanies: seedCompanies.length,
    suspiciousLicenseCompanies: suspiciousDirectory.map((c) => ({
      id: c.id,
      name: c.name,
      usdot: c.usdotNumber,
      issues: assessLicense(c.usdotNumber, c.mcNumber).issues,
    })),
  },
  autoTransport: {
    totalCompanies: seedAutoTransportCompanies.length,
    displayableLicenses: seedAutoTransportCompanies.filter((c) =>
      assessLicense(c.usdotNumber, c.mcNumber).isDisplayable
    ).length,
    suspiciousLicenseCompanies: suspiciousAutoTransport.map((c) => ({
      id: c.id,
      name: c.name,
      usdot: c.usdotNumber,
      mc: c.mcNumber,
      isVerified: c.isVerified,
      issues: assessLicense(c.usdotNumber, c.mcNumber).issues,
    })),
    verifiedBadgeViolations: verifiedWithBadLicense.map((c) => ({
      id: c.id,
      slug: c.slug,
      usdot: c.usdotNumber,
      mc: c.mcNumber,
    })),
  },
  reviews: {
    attributableGoogleReviews: countAttributableReviews(),
    countiesWithAttributableReviews: countiesWithReviews,
    countiesWithoutReviews: params.length - countiesWithReviews,
  },
  counties: {
    total: params.length,
    zeroMoversAfterFilter: countiesZeroMovers,
    totalDisplayedMoverSlots: totalDisplayedMovers,
  },
  priorityMetros: priorityReport,
  remediation: {
    fabricatedCountyTestimonialsSuppressed: true,
    genericHashTestimonialsRemoved: true,
    schemaReviewOnlyWhenAttributable: true,
    amerisafeUsdotCorrected: '3341650',
  },
};

writeFileSync('scripts/output/data-integrity-report.json', JSON.stringify(report, null, 2));

console.log('Move Trust Hub — Data Integrity Audit');
console.log('=====================================');
console.log(`Catalog movers: ${allMovers.length}`);
console.log(`Displayable (curated policy): ${displayable}`);
console.log(`Excluded: ${allMovers.length - displayable}`);
console.log(`  regional placeholders: ${placeholderIds}`);
console.log(`  generated templates: ${generatedIds}`);
console.log('');
console.log('Exclusion reasons:');
for (const [reason, count] of [...exclusionReasons.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${reason}: ${count}`);
}
console.log('');
console.log(`Directory companies with suspicious licenses: ${suspiciousDirectory.length}`);
console.log(`Auto transport with suspicious licenses: ${suspiciousAutoTransport.length}`);
console.log(`Auto transport verified-badge violations: ${verifiedWithBadLicense.length}`);
console.log(`Attributable Google reviews in seed: ${countAttributableReviews()}`);
console.log(`Counties with attributable reviews: ${countiesWithReviews} / ${params.length}`);
console.log(`Counties with zero movers after filter: ${countiesZeroMovers}`);
console.log('');
console.log('Priority metros:');
for (const row of priorityReport) {
  console.log(`  ${row.county}: ${row.movers} movers, ${row.attributableReviews} reviews`);
}
console.log('\nWrote scripts/output/data-integrity-report.json');