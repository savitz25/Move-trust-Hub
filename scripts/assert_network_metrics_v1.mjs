/**
 * ATH-METRICS-002A grain / staleness gates.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { publicationMetricInputs } from "./publication_metric_inputs.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");
const failures = [];
const assert = (c, m) => {
  if (!c) failures.push(m);
};

const v1 = JSON.parse(read("data/home/move-network-metrics-v1.json"));
const byKey = Object.fromEntries(v1.metrics.map((m) => [m.key, m]));
const pub = publicationMetricInputs();
const hero = read("components/home/home-intel-hero.tsx");
const snap = read("lib/intelligence/home-snapshot.ts");
const national = read("components/intelligence/MoveNationalIntelligence.tsx");

assert(v1.schemaVersion === "move-network-metrics-v1", "schema");
assert(typeof v1.sourceFingerprint === "string" && v1.sourceFingerprint.length === 64, "fingerprint");
assert(JSON.stringify(v1.network.publishedStateIntelligencePaths) === JSON.stringify(pub.publishedStateIntelligencePaths), "state intel paths match catalogs");
assert(v1.network.floridaResearchCountyLandings === pub.floridaResearchCountyLandings.length, "FL county landings match coverage catalog");
assert(byKey.federal_publishable_directory_profiles.valueState === "KNOWN", "federal known");
assert(byKey.nj_pmw_authority_roster.value === null, "NJ roster is not a number");
assert(byKey.nj_pmw_authority_roster.valueState === "REQUEST_ONLY", "NJ request-only");
assert(byKey.ca_cal_t_household_mover_universe.value === null, "CA CAL-T is not a number");
assert(byKey.ca_cal_t_household_mover_universe.valueState === "NOT_ACQUIRED", "CA not acquired");
assert(byKey.ca_bhgs_19237_citation_rows.value === pub.caCitationRows19237, "CA citation rows");
assert(byKey.ca_bhgs_19237_unlicensed_rows.value === pub.caUnlicensedCitationRows, "CA unlicensed");
assert(byKey.ca_bhgs_19237_exact_cal_t_rows.value === pub.caExactCalTCitationRows, "CA exact CAL-T");
assert(byKey.ca_bhgs_19237_citation_rows.value !== byKey.federal_publishable_directory_profiles.value, "citations != federal directory");
assert(byKey.florida_fdacs_im_active_registrations.value !== byKey.federal_publishable_directory_profiles.value, "FDACS != federal");
assert(byKey.florida_fdacs_im_active_registrations.value !== v1.florida.hqPublishable, "FDACS IM != FL HQ federal");
assert(byKey.nj_operation_safe_move_novs_acquired.value === pub.njOsmAcquiredRows, "NJ OSM acquired rows");
assert(pub.njLicenseCountPublished === null, "NJ snapshot still unknown roster");
assert(v1.newJersey.statewideMoverUniverse === null, "NJ universe null");
assert(v1.california.licensedMoverUniverse === null, "CA universe null");
assert(byKey.federal_publishable_directory_profiles.sourceAsOf !== null, "federal sourceAsOf");
assert(byKey.florida_fdacs_im_active_registrations.sourceAsOf !== v1.generatedAt.slice(0, 10), "FL sourceAsOf != generatedAt");
assert(snap.includes("projectHomeIntelFromNetworkMetrics"), "homepage consumes v1");
assert(snap.includes("loadMoveNetworkMetrics"), "homepage loads v1");
assert(national.includes("Network rollup generated") || national.includes("newestDocumentedSourceAsOf") || national.includes("generatedAt"), "freshness clocks on homepage");
assert(!hero.includes("4,605"), "no historical 4605");
assert(v1.federalDirectory.publishableProfiles === v1.homeProjection.publishableProfiles, "homepage projection matches v1");
assert(
  v1.homeProjection.entityClasses.reduce((n, r) => n + r.count, 0) === v1.federalDirectory.publishableProfiles,
  "roles sum to directory"
);
assert(
  v1.homeProjection.authority.active + v1.homeProjection.authority.notCurrent + v1.homeProjection.authority.unknown ===
    v1.federalDirectory.publishableProfiles,
  "authority split sums"
);

if (failures.length) {
  console.error("ATH-METRICS-002A FAIL");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log("ATH-METRICS-002A PASS network metric grain and staleness gates");
