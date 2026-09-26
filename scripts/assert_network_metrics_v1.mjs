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
assert(v1.network.publishedStateIntelligencePages === 18, "eighteen specialist state pages");
assert(v1.network.publishedStateIntelligencePaths.includes("/minnesota"), "Minnesota state intelligence represented");
assert(v1.minnesota.rosterCoverage === "NOT_ACQUIRED" && v1.minnesota.currentPermitUniverse === null, "Minnesota permit roster stays unknown, not zero");
assert(v1.minnesota.sourceAsOf === null && v1.minnesota.statutesEdition === "2025 Minnesota Statutes", "Minnesota clocks: no roster clock; 2025 statutes");
assert(v1.metrics.find((m) => m.key === "mn_hhg_permit_universe")?.value === null, "Minnesota permit universe metric is null");
assert(v1.network.publishedStateIntelligencePaths.includes("/nevada"), "Nevada state intelligence represented");
assert(v1.nevada.distinctCpcn === 46 && v1.nevada.hhgRows === 46, "Nevada 46 NTA household-goods CPCN identities");
assert(v1.nevada.activeMoverCertificates === 41, "Nevada 41 NTA Active Mover certificates");
assert(v1.nevada.exactUsdotJoins === 0 && v1.nevada.exactMcJoins === 0, "Nevada federal joins stay zero");
assert(v1.nevada.sourceAsOf === null, "Nevada: NTA prints no as-of date");
assert(v1.network.publishedStateIntelligencePaths.includes("/tennessee"), "Tennessee state intelligence represented");
assert(v1.tennessee.rosterCoverage === "NOT_ACQUIRED" && v1.tennessee.currentAuthorityUniverse === null, "Tennessee roster stays unknown, not zero");
assert(v1.tennessee.sourceAsOf === null && v1.tennessee.rulesEffective === "2026-03-09", "Tennessee clocks: no roster clock; rules effective 2026-03-09");
assert(v1.metrics.find((m) => m.key === "tn_intrastate_authority_universe")?.value === null, "Tennessee authority universe metric is null");
assert(v1.network.publishedStateIntelligencePaths.includes("/massachusetts"), "Massachusetts state intelligence represented");
assert(v1.massachusetts.distinctCertificates === 308, "Massachusetts 308 DPU certificate identities");
assert(v1.massachusetts.listingRows === 309, "Massachusetts 309 DPU company rows");
assert(v1.massachusetts.tariffPostedRows + v1.massachusetts.tariffPendingRows === v1.massachusetts.listingRows, "Massachusetts tariff rows partition the list");
assert(v1.massachusetts.exactUsdotJoins === 0 && v1.massachusetts.exactMcJoins === 0, "Massachusetts federal joins stay zero");
assert(v1.massachusetts.sourceAsOf === "2026-06-16", "Massachusetts list clock is the printed LAST UPDATED date");
assert(v1.network.publishedStateIntelligencePaths.includes("/georgia"), "Georgia state intelligence represented");
assert(v1.georgia.distinctMca === 380, "Georgia 380 MCA identities");
assert(v1.georgia.exactUsdotJoins === 0, "Georgia USDOT joins stay zero");
assert(v1.network.publishedStateIntelligencePaths.includes("/new-york"), "New York state intelligence represented");
assert(v1.network.publishedStateIntelligencePaths.includes("/illinois"), "Illinois state intelligence represented");
assert(v1.network.publishedStateIntelligencePaths.includes("/oregon"), "Oregon state intelligence represented");
assert(v1.network.publishedStateIntelligencePaths.includes("/pennsylvania"), "Pennsylvania state intelligence represented");
assert(v1.network.publishedStateIntelligencePaths.includes("/north-carolina"), "North Carolina state intelligence represented");
assert(v1.network.publishedStateIntelligencePaths.includes("/ohio"), "Ohio state intelligence represented");
assert(byKey.oh_puco_hhg_certificate_universe.value === null, "Ohio PUCO HHG roster is not a number");
assert(byKey.oh_puco_hhg_certificate_universe.valueState === "NOT_ACQUIRED", "Ohio not acquired");
assert(byKey.ny_dot_2026_hhg_bulletin_observations.value === 108, "NY 2026 HHG bulletin observations");
assert(v1.network.publishedStateIntelligencePaths.includes("/colorado"), "Colorado state intelligence represented");
assert(v1.network.publishedStateIntelligencePaths.includes("/virginia"), "Virginia state intelligence represented");
assert(v1.network.publishedStateIntelligencePaths.includes("/texas"), "Texas state intelligence represented");
assert(v1.network.publishedStateIntelligencePaths.includes("/washington"), "Washington state intelligence represented");
assert(!v1.network.publishedStateIntelligencePaths.includes("/arizona"), "no Arizona specialist state page");
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
assert(byKey.tx_txdmv_household_goods_mover_universe.value === null, "Texas denominator unknown");
assert(byKey.wa_utc_active_household_goods_directory_results.value === 284, "Washington active directory result count");
assert(byKey.wa_utc_household_goods_bulk_roster.value === null, "Washington bulk roster not acquired");
assert(byKey.co_puc_active_household_goods_permit_listings.value === 203, "Colorado active HHG listings");
assert(byKey.co_puc_active_household_goods_permit_listings.value !== byKey.federal_publishable_directory_profiles.value, "CO permits != federal directory");
assert(byKey.co_puc_revoked_household_goods_permit_listings.value === 207, "Colorado revoked listings");
assert(byKey.co_puc_suspended_household_goods_permit_listings.value === 5, "Colorado suspended listings");
assert(byKey.federal_publishable_directory_profiles.sourceAsOf === null && Boolean(byKey.federal_publishable_directory_profiles.retrievedAt), "federal refresh is retrieval, not sourceAsOf");
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
