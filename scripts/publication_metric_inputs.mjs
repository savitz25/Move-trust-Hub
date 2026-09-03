/**
 * Parse publication/config sources the Move network rollup must track.
 * A new live state intelligence page or county landing fails CI until
 * move-network-metrics-v1 is regenerated.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");

export function publicationMetricInputs() {
  const caPub = read("lib/california-intelligence/publication.ts");
  const njPub = read("lib/state-hhg/nj/publication.ts");
  const flSnap = read("lib/intelligence/florida-snapshot.ts");
  const coverage = read("lib/intelligence/coverage.ts");
  const site = read("lib/intelligence/home-site-coverage.ts");
  const caSnap = JSON.parse(read("lib/california-intelligence/accepted-snapshot.json"));
  const njSnap = JSON.parse(read("data/reports/nj-move-002-public-snapshot.json"));

  const paths = [];
  const caPath = caPub.match(/CA_MOVE_PUBLIC_PATH = '(\/[^']+)'/)?.[1];
  const njPath = njPub.match(/NJ_MOVE_PUBLIC_PATH = '(\/[^']+)'/)?.[1];
  if (flSnap.includes("/florida") && existsSync(join(root, "app/(move)/florida/page.tsx"))) paths.push("/florida");
  if (njPath) paths.push(njPath);
  if (caPath) paths.push(caPath);

  const floridaResearchCountyLandings = [
    ...coverage.match(/export const FLORIDA_RESEARCH_COUNTIES = \[([\s\S]*?)\] as const/)[1].matchAll(/slug: '([^']+)'/g),
  ].map((m) => m[1]);

  return {
    publishedStateIntelligencePaths: paths,
    floridaResearchCountyLandings,
    localMoverStateLandingsFile: "lib/intelligence/home-site-coverage.ts",
    usesLocalStatesInventory: site.includes("localStates"),
    caCalTRosterCoverage: caSnap.authority.roster_coverage,
    caCitationRows19237: caSnap.enforcement.rows,
    caUnlicensedCitationRows: caSnap.enforcement.unlicensed_rows,
    caExactCalTCitationRows: caSnap.enforcement.exact_cal_t_rows,
    caTariffEffective: caSnap.insurance ? "2026-01-01" : "2026-01-01",
    njRosterCoverage: njSnap.authority.rosterCoverage,
    njLicenseCountPublished: njSnap.authority.licenseCountPublished,
    njOsmNovs2025: njSnap.osm.years["2025"].novs,
    njOsmNovs2024: njSnap.osm.years["2024"].novs,
    njOsmAcquiredRows: njSnap.osm.rows.length,
  };
}
