import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { publicationMetricInputs } from "./publication_metric_inputs.mjs";
import { stateInputs } from "./network_state_inputs.mjs";
const require = createRequire(import.meta.url);
const {
  computeMoveNetworkMetrics,
} = require("../lib/metrics/compute-move-network-metrics.ts");
const { count, fingerprint } = require("../lib/metrics/accepted-contract.ts");
const {
  MOVE_HOMEPAGE_STATE_CARDS,
  MOVE_CONSUMER_RULES,
} = require("../lib/metrics/accepted-homepage-evidence.ts");
const { localStates } = require("../lib/local-movers/states.ts");
const root = join(dirname(fileURLToPath(import.meta.url)), ".."),
  read = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));
const out = "data/home/move-network-metrics-v1.json",
  check = process.argv.includes("--check"),
  generatedAt = check ? read(out).generatedAt : new Date().toISOString();
const census = read("data/metrics/accepted-network-census-v1.json"),
  pub = publicationMetricInputs();
const input = {
  ...census.input,
  ...stateInputs(pub, localStates),
  generatedAt,
};
for (const [key, value] of Object.entries(input))
  if (typeof value === "number") count(value, key);
if (
  input.withRefreshDate + input.withoutRefreshDate !==
  input.publishableProfiles
)
  throw Error("Refresh denominator mismatch");
if (
  input.freshnessBuckets.reduce(
    (n, r) => n + count(r.count, "refresh bucket"),
    0,
  ) !== input.publishableProfiles
)
  throw Error("Freshness partition mismatch");
const m = computeMoveNetworkMetrics(input);
m.contractRevision = "ATH-METRICS-R2-02";
m.acceptedStateDatasets = {};
const files = [
  "data/metrics/accepted-network-census-v1.json",
  "data/reports/nj-move-002-public-snapshot.json",
  ...readdirSync(join(root, "lib"))
    .sort()
    .filter((n) => n.endsWith("-intelligence"))
    .map((n) => "lib/" + n + "/accepted-snapshot.json"),
];
m.acceptedSources = files.map((path) => {
  const d = read(path);
  m.acceptedStateDatasets[path] = { path, snapshot: d };
  return {
    path,
    sha256: fingerprint(d),
    sourceAsOf: d.sourceAsOf ?? d.clocks?.sourceAsOf ?? null,
    retrievedAt:
      d.retrievedAt ??
      d.source?.retrieved_at ??
      d.clocks?.authorized_carriers_retrievedAt ??
      null,
    snapshotAsOf: d.snapshotAsOf ?? d.as_of ?? null,
  };
});
const va = pub.vaSnapshot,
  ny = pub.nySnapshot,
  il = read("lib/illinois-intelligence/accepted-snapshot.json");
if (
  il.current_hhg_roster.coverage !== "OPEN_SEARCH_ONLY" ||
  il.current_hhg_roster.rows !== null
)
  throw Error(
    "Illinois acceptance changed: inspect formal closure before updating contract",
  );
m.illinois = {
  currentHhgRosterCoverage: il.current_hhg_roster.coverage,
  bulkCount: null,
  specialistComplete: false,
  completion: "PENDING",
  sourceAsOf: il.sourceAsOf ?? null,
  retrievedAt: il.retrievedAt,
  snapshotAsOf: il.snapshotAsOf,
};
m.virginia.hhgAuthorityIdentities = count(
  va.hhg_roster.distinct_non_null_authority_numbers,
  "VA HHG IDs",
);
m.virginia.propertyAuthorityIdentities = count(
  va.property_roster.distinct_non_null_authority_numbers,
  "VA Property IDs",
);
m.newYork.distinctCaseNumbers = count(
  ny.bulletin_2026.distinctCaseNumbers,
  "NY cases",
);
m.newYork.currentHhgRosterCount = null;
const additions = [
  [
    "va_hhg_authority_identities",
    "Virginia HHG authority identities",
    m.virginia.hhgAuthorityIdentities,
    "va_hhg_authority_id",
    "Virginia",
    "/virginia",
    "STATE_AUTHORITY",
    null,
    va.clocks.authorized_carriers_retrievedAt,
  ],
  [
    "va_property_authority_identities",
    "Virginia Property Carrier authority identities",
    m.virginia.propertyAuthorityIdentities,
    "va_property_authority_id",
    "Virginia",
    "/virginia",
    "BUSINESS_EVIDENCE",
    null,
    va.clocks.authorized_carriers_retrievedAt,
  ],
  [
    "ny_bulletin_issues",
    "New York bulletin issues",
    ny.bulletin_2026.issues,
    "bulletin_issue",
    "New York",
    "/new-york",
    "REGULATORY",
    ny.bulletin_2026.sourceAsOf,
    ny.bulletin_2026.retrievedAt,
  ],
  [
    "ny_bulletin_case_numbers",
    "New York bulletin case numbers",
    ny.bulletin_2026.distinctCaseNumbers,
    "application_case_number",
    "New York",
    "/new-york",
    "REGULATORY",
    ny.bulletin_2026.sourceAsOf,
    ny.bulletin_2026.retrievedAt,
  ],
  [
    "ny_current_hhg_roster",
    "New York current HHG roster",
    null,
    "ny_hhg_authority_roster",
    "New York",
    "/new-york",
    "STATE_AUTHORITY",
    null,
    ny.bulletin_2026.retrievedAt,
  ],
  [
    "il_current_hhg_roster",
    "Illinois current HHG roster (search-only; closure pending)",
    null,
    "il_hhg_authority_roster",
    "Illinois",
    "/illinois",
    "STATE_AUTHORITY",
    null,
    il.retrievedAt,
  ],
];
for (const [
  key,
  label,
  value,
  grain,
  coverage,
  destination,
  family,
  sourceAsOf,
  retrievedAt,
] of additions) {
  if (value !== null) count(value, key);
  const path =
    "lib/" + destination.slice(1) + "-intelligence/accepted-snapshot.json";
  m.metrics.push({
    key,
    label,
    value,
    valueState: value === null ? "UNKNOWN" : "KNOWN",
    unit: "count",
    grain,
    coverage,
    denominator: "Accepted " + grain + " only",
    description:
      "Separate state source grain. Not federal profiles or a combined mover denominator.",
    contributingSourceSystems: [path],
    sourceAsOf,
    retrievedAt,
    snapshotAsOf: read(path).snapshotAsOf ?? read(path).as_of ?? null,
    generatedAt,
    publicationStatus: value === null ? "PUBLIC_UNKNOWN" : "PUBLIC",
    trace: {
      counts: grain,
      doesNotCount:
        "Federal identities, other authority classes, or unique companies.",
      contributingSourceSystems: [path],
      geographicCoverage: coverage,
      sourceDates: sourceAsOf ?? "Official effective date unknown",
      generationDate: generatedAt.slice(0, 10),
      ...(value === null
        ? { whyUnknown: "Search-only capability; no accepted bulk roster." }
        : {}),
    },
    presentation: {
      family,
      entityClass: grain,
      destination,
      acceptedArtifact: path,
    },
  });
}
for (const metric of m.metrics) {
  metric.snapshotAsOf ??= census.snapshotAsOf;
  if (
    metric.key.startsWith("federal_") ||
    metric.key.includes("_hq_publishable")
  ) {
    metric.sourceAsOf = null;
    metric.retrievedAt = input.latestObservedRefresh;
  }
  if (metric.key.startsWith("florida_")) {
    metric.sourceAsOf = null;
    metric.retrievedAt = input.flSourceAsOf;
  }
  if (metric.key.startsWith("co_"))
    metric.retrievedAt =
      pub.coSnapshot.source.retrieved_at ?? pub.coSnapshot.as_of;
  if (metric.key.startsWith("va_")) {
    metric.sourceAsOf = null;
    metric.retrievedAt = va.clocks.authorized_carriers_retrievedAt;
  }
  if (metric.key === "ny_dot_2026_hhg_bulletin_observations") {
    metric.sourceAsOf = ny.bulletin_2026.sourceAsOf;
    metric.retrievedAt = ny.bulletin_2026.retrievedAt;
    metric.presentation = {
      family: "REGULATORY",
      entityClass: "HHG application observation",
      destination: "/new-york",
      acceptedArtifact: "lib/new-york-intelligence/accepted-snapshot.json",
    };
  }
  if (metric.key === "federal_mc_identities_in_directory") {
    metric.label = "Directory profiles with an MC number";
    metric.grain = "directory_profile_with_mc_number";
    metric.denominator =
      "PUBLISHABLE companies rows with non-null mc_number; no distinct MC aggregation";
    metric.description =
      "Profile rows carrying an MC field; not distinct MC identities.";
    metric.trace.counts = metric.description;
    metric.trace.doesNotCount =
      "Distinct MC identities, state permits or a complete FMCSA universe.";
    metric.presentation = {
      family: "FEDERAL_AUTHORITY",
      entityClass: "Profile with an MC field",
      destination: "/verify-dot",
      acceptedArtifact: "data/metrics/accepted-network-census-v1.json",
    };
  }
}
const spec = [
  [
    "FL",
    "/florida",
    "STATE_SOURCE_LIVE",
    [
      [
        "hhg-registration",
        "STATE_SOURCE_LIVE",
        "florida_fdacs_im_registrations",
        input.flImRegistrations,
      ],
    ],
  ],
  [
    "NJ",
    "/new-jersey",
    "STATE_SOURCE_LIVE",
    [
      ["hhg-roster", "REQUEST_ONLY", "nj_pmw_authority_roster", null],
      [
        "regulatory-evidence",
        "STATE_SOURCE_LIVE",
        "nj_operation_safe_move_novs_acquired",
        input.njOsmNovsAcquired,
      ],
    ],
  ],
  [
    "CA",
    "/california",
    "STATE_SOURCE_LIVE",
    [
      ["hhg-roster", "SEARCH_ONLY", "ca_cal_t_household_mover_universe", null],
      [
        "citations",
        "STATE_SOURCE_LIVE",
        "ca_bhgs_19237_citation_rows",
        input.caCitationRows19237,
      ],
    ],
  ],
  [
    "TX",
    "/texas",
    "SEARCH_ONLY",
    [
      [
        "hhg-roster",
        "SEARCH_ONLY",
        "tx_txdmv_household_goods_mover_universe",
        null,
      ],
    ],
  ],
  [
    "WA",
    "/washington",
    "STATE_SOURCE_LIVE",
    [
      [
        "directory-results",
        "STATE_SOURCE_LIVE",
        "wa_utc_active_household_goods_directory_results",
        input.waActiveDirectoryResults,
      ],
      [
        "bulk-roster",
        "NOT_ACQUIRED",
        "wa_utc_household_goods_bulk_roster",
        null,
      ],
    ],
  ],
  [
    "CO",
    "/colorado",
    "STATE_SOURCE_LIVE",
    [
      [
        "hhg-permits",
        "STATE_SOURCE_LIVE",
        "co_puc_active_household_goods_permit_listings",
        input.coActiveHhgPermitListings,
      ],
    ],
  ],
  [
    "VA",
    "/virginia",
    "STATE_SOURCE_LIVE",
    [
      [
        "hhg-authority",
        "STATE_SOURCE_LIVE",
        "va_hhg_authority_identities",
        m.virginia.hhgAuthorityIdentities,
      ],
      [
        "property-authority",
        "STATE_SOURCE_LIVE",
        "va_property_authority_identities",
        m.virginia.propertyAuthorityIdentities,
      ],
    ],
  ],
  [
    "NY",
    "/new-york",
    "STATE_SOURCE_LIVE",
    [
      ["hhg-roster", "SEARCH_ONLY", "ny_current_hhg_roster", null],
      [
        "applications",
        "STATE_SOURCE_LIVE",
        "ny_dot_2026_hhg_bulletin_observations",
        input.nyHhgBulletinObservations,
      ],
    ],
  ],
  [
    "IL",
    "/illinois",
    "SEARCH_ONLY",
    [["hhg-roster", "SEARCH_ONLY", "il_current_hhg_roster", null]],
  ],
];
m.stateCapabilities = spec.map(([state, route, status, rows]) => ({
  state,
  route,
  status,
  specialistComplete: false,
  completion: state === "IL" ? "PENDING" : "NOT_ASSERTED",
  capabilities: rows.map(([id, status, key, bulkCount]) => ({
    id,
    status,
    metricKeys: [key],
    bulkCount,
  })),
}));
for (const metric of m.metrics) {
  if (
    /^(nj_|ca_|tx_|wa_)/.test(metric.key) &&
    !metric.key.includes("_hq_publishable")
  ) {
    const code = metric.key.slice(0, 2),
      d =
        code === "nj"
          ? read("data/reports/nj-move-002-public-snapshot.json")
          : (pub[
              { ca: "caSnapshot", tx: "txSnapshot", wa: "waSnapshot" }[code]
            ] ?? read("lib/california-intelligence/accepted-snapshot.json"));
    metric.snapshotAsOf = d.snapshotAsOf ?? d.as_of ?? d.asOf ?? null;
    metric.sourceAsOf = null;
    metric.retrievedAt =
      code === "wa" ? pub.waSnapshot.directory.retrieved_at : null;
  }
  if (metric.key.startsWith("co_")) metric.snapshotAsOf = pub.coSnapshot.as_of;
  if (metric.key.startsWith("va_"))
    metric.snapshotAsOf = va.clocks.snapshotAsOf;
  if (metric.key.startsWith("ny_"))
    metric.snapshotAsOf = ny.snapshotAsOf ?? ny.as_of;
  if (metric.key.startsWith("published_")) {
    metric.sourceAsOf = null;
    metric.snapshotAsOf = null;
    metric.retrievedAt = null;
  }
}
m.coverageDefinition =
  "STATE_SOURCE_LIVE counts acquired evidence capabilities, not route existence, complete rosters, or specialist completion. National federal baseline is separate.";
m.federalBaseline = {
  status: "FEDERAL_BASELINE",
  geography: "United States",
  count: null,
  scope:
    "Selected publishable profiles; no asserted full state or federal census",
};
for (const state of localStates.filter(
  (s) => !m.stateCapabilities.some((c) => c.state === s.code),
))
  m.stateCapabilities.push({
    state: state.code,
    route: null,
    status: "FEDERAL_BASELINE",
    specialistComplete: false,
    completion: "NOT_ASSERTED",
    capabilities: [
      {
        id: "state-source",
        status: "NOT_ACQUIRED",
        metricKeys: [],
        bulkCount: null,
      },
    ],
  });
m.homepageStateCards = MOVE_HOMEPAGE_STATE_CARDS;
m.consumerRules = MOVE_CONSUMER_RULES;
m.homeProjection.fmcsaClock.ageReferenceAt = census.snapshotAsOf;
m.newestDocumentedSourceAsOf =
  m.metrics
    .map((r) => r.sourceAsOf)
    .filter(Boolean)
    .sort()
    .at(-1) ?? null;
m.sourceFingerprint = fingerprint({
  sources: m.acceptedSources,
  input: { ...input, generatedAt: null },
  capabilities: m.stateCapabilities,
  metrics: m.metrics.map(({ generatedAt, trace, ...r }) => r),
  cards: m.homepageStateCards,
});
m.sourceFingerprint = fingerprint({
  inputFingerprint: m.sourceFingerprint,
  generator: [
    "scripts/build_network_metrics_v1.mjs",
    "scripts/network_state_inputs.mjs",
    "lib/metrics/compute-move-network-metrics.ts",
    "lib/metrics/accepted-homepage-evidence.ts",
  ].map((p) => readFileSync(join(root, p), "utf8").replaceAll("\r\n", "\n")),
});
const bytes = JSON.stringify(m, null, 2) + "\n";
if (check) {
  if (readFileSync(join(root, out), "utf8") !== bytes)
    throw Error("Stale Move metrics");
} else writeFileSync(join(root, out), bytes);
console.log(
  JSON.stringify({
    check,
    generatedAt,
    fingerprint: m.sourceFingerprint,
    federal: m.federalDirectory,
    illinois: m.illinois,
  }),
);
