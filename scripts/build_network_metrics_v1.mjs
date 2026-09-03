/**
 * Build move-network-metrics-v1 from production + specialist publication snapshots.
 * Does not invent statewide NJ or CAL-T universes. Does not mutate production data.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { publicationMetricInputs } from "./publication_metric_inputs.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv(p) {
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const i = t.indexOf("=");
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!process.env[k]) process.env[k] = v;
  }
}
loadEnv(join(root, ".env.local"));
loadEnv("C:\\Users\\makei\\move-trust-hub\\.env.local");

async function restCount(base, key, table, query = "") {
  const url = `${base}/rest/v1/${table}?select=*${query ? `&${query}` : ""}`;
  const res = await fetch(url, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "count=exact",
      Range: "0-0",
      "Range-Unit": "items",
    },
  });
  const t = await res.text();
  if (!res.ok && res.status !== 206 && res.status !== 416) {
    throw new Error(`${table} ${query} ${res.status} ${t.slice(0, 180)}`);
  }
  const tail = (res.headers.get("content-range") || "").split("/")[1];
  return tail && tail !== "*" ? Number(tail) : 0;
}

async function restOne(base, key, table, query) {
  const res = await fetch(`${base}/rest/v1/${table}?${query}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!res.ok) return null;
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] ?? null : rows;
}

async function main() {
  const { computeMoveNetworkMetrics } = await import(
    pathToFileURL(join(root, "lib/metrics/compute-move-network-metrics.ts")).href
  );
  const pub = publicationMetricInputs();
  const base = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!base || !key) throw new Error("Supabase URL/key missing — cannot generate from production");

  const c = (table, q = "") => restCount(base, key, table, q);
  const nowMs = Date.now();
  const daysAgo = (d) => new Date(nowMs - d * 86400000).toISOString();
  const d30 = daysAgo(30);
  const d60 = daysAgo(60);
  const d90 = daysAgo(90);
  const d365 = daysAgo(365);
  const pubState = "publication_state=eq.PUBLISHABLE";

  const publishableProfiles = await c("companies", pubState);
  const indexableProfiles = await c("companies", `${pubState}&indexable=eq.true`);
  const authorityActive = await c("companies", `${pubState}&authority_active=eq.true`);
  const authorityNotCurrent = await c("companies", `${pubState}&authority_active=eq.false`);
  const authorityUnknown = await c("companies", `${pubState}&authority_active=is.null`);
  const carriers = await c("companies", `${pubState}&entity_type=in.(CARRIER,Carrier,carrier)`);
  const brokers = await c("companies", `${pubState}&entity_type=in.(BROKER,Broker,broker)`);
  const dual = await c(
    "companies",
    `${pubState}&entity_type=in.(CARRIER/BROKER,BROKER/CARRIER,Carrier/Broker,Broker/Carrier,Carrier / Broker)`
  );
  const withMcNumber = await c("companies", `${pubState}&mc_number=not.is.null`);
  const withRefreshDate = await c("companies", `${pubState}&fmcsa_last_checked=not.is.null`);
  const withoutRefreshDate = await c("companies", `${pubState}&fmcsa_last_checked=is.null`);
  const b0_30 = await c("companies", `${pubState}&fmcsa_last_checked=gte.${d30}`);
  const b31_60 = await c("companies", `${pubState}&fmcsa_last_checked=gte.${d60}&fmcsa_last_checked=lt.${d30}`);
  const b61_90 = await c("companies", `${pubState}&fmcsa_last_checked=gte.${d90}&fmcsa_last_checked=lt.${d60}`);
  const b91_365 = await c("companies", `${pubState}&fmcsa_last_checked=gte.${d365}&fmcsa_last_checked=lt.${d90}`);
  const b365plus = await c("companies", `${pubState}&fmcsa_last_checked=lt.${d365}`);
  const latest = await restOne(
    base,
    key,
    "companies",
    `select=fmcsa_last_checked&${pubState}&fmcsa_last_checked=not.is.null&order=fmcsa_last_checked.desc&limit=1`
  );
  const oldest = await restOne(
    base,
    key,
    "companies",
    `select=fmcsa_last_checked&${pubState}&fmcsa_last_checked=not.is.null&order=fmcsa_last_checked.asc&limit=1`
  );
  const flImRegistrations = await c(
    "provider_state_authority",
    "state_code=eq.FL&authority_type=eq.intrastate_mover_registration"
  );
  const flImActive = await c(
    "provider_state_authority",
    "state_code=eq.FL&authority_type=eq.intrastate_mover_registration&status=eq.active"
  );
  const flMbActive = await c(
    "provider_state_authority",
    "state_code=eq.FL&authority_type=eq.intrastate_hhg_broker&status=eq.active"
  );
  const flImVerifiedLinks = await c(
    "provider_state_authority",
    "state_code=eq.FL&authority_type=eq.intrastate_mover_registration&verification_state=eq.VERIFIED"
  );
  const flHqPublishable = await c("companies", `${pubState}&headquarters=ilike.* FL*`);
  const flContactObservations = await c("provider_contact_observation", "state_code=eq.FL");
  const flAsOfRow = await restOne(
    base,
    key,
    "provider_state_authority",
    "select=retrieved_at&state_code=eq.FL&order=retrieved_at.desc&limit=1"
  );
  const njHqPublishable = await c("companies", `${pubState}&headquarters=ilike.* NJ*`);
  const caHqPublishable = await c("companies", `${pubState}&headquarters=ilike.* CA*`);

  const { localStates } = await import(pathToFileURL(join(root, "lib/local-movers/states.ts")).href);

  const input = {
    generatedAt: new Date().toISOString(),
    publishableProfiles,
    indexableProfiles,
    authorityActive,
    authorityNotCurrent,
    authorityUnknown,
    carriers,
    brokers,
    dual,
    withMcNumber,
    withRefreshDate,
    withoutRefreshDate,
    latestObservedRefresh: latest?.fmcsa_last_checked,
    oldestObservedRefresh: oldest?.fmcsa_last_checked,
    freshnessBuckets: [
      { id: "0-30", label: "0–30 days since last recorded refresh", count: b0_30 },
      { id: "31-60", label: "31–60 days", count: b31_60 },
      { id: "61-90", label: "61–90 days", count: b61_90 },
      { id: "91-365", label: "91–365 days", count: b91_365 },
      { id: ">365", label: "More than 365 days", count: b365plus },
      { id: "unknown", label: "No refresh date recorded", count: withoutRefreshDate },
    ],
    flImRegistrations,
    flImActive,
    flMbActive,
    flImVerifiedLinks,
    flHqPublishable,
    flContactObservations,
    flSourceAsOf: flAsOfRow?.retrieved_at,
    njRosterCoverage: pub.njRosterCoverage,
    njOsmNovsAcquired: pub.njOsmAcquiredRows,
    njHqPublishable,
    njSourceAsOf: "2026-09-03",
    caCalTRosterCoverage: pub.caCalTRosterCoverage,
    caCitationRows19237: pub.caCitationRows19237,
    caUnlicensedCitationRows: pub.caUnlicensedCitationRows,
    caExactCalTCitationRows: pub.caExactCalTCitationRows,
    caHqPublishable,
    caSourceAsOf: "2026-09-03",
    caTariffEffective: "2026-01-01",
    publishedStateIntelligencePaths: pub.publishedStateIntelligencePaths,
    floridaResearchCountyLandings: pub.floridaResearchCountyLandings.length,
    localMoverStateLandings: localStates.length,
  };

  if (!input.latestObservedRefresh || !input.oldestObservedRefresh || !input.flSourceAsOf) {
    throw new Error("missing required source clocks");
  }

  const manifest = computeMoveNetworkMetrics(input);
  writeFileSync(
    join(root, "data/home/move-network-metrics-v1.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8"
  );
  console.log(
    JSON.stringify(
      {
        wrote: "data/home/move-network-metrics-v1.json",
        fingerprint: manifest.sourceFingerprint,
        generatedAt: manifest.generatedAt,
        newestDocumentedSourceAsOf: manifest.newestDocumentedSourceAsOf,
        federal: manifest.federalDirectory,
        florida: manifest.florida,
        newJersey: manifest.newJersey,
        california: manifest.california,
        network: manifest.network,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
