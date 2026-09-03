/**
 * Read-only production counts for ATH-METRICS-002A. Does not mutate data.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

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

const INTERNAL = "REVIEW_REQUIRED,INACTIVE,INGESTED,CLASSIFIED";
const VISIBLE = `publication_state.is.null,publication_state.not.in.(${INTERNAL})`;

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
    throw new Error(`${table} ${query} ${res.status} ${t.slice(0, 220)}`);
  }
  const tail = (res.headers.get("content-range") || "").split("/")[1];
  return tail && tail !== "*" ? Number(tail) : 0;
}

async function restOne(base, key, table, query) {
  const url = `${base}/rest/v1/${table}?${query}`;
  const res = await fetch(url, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!res.ok) return null;
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] ?? null : rows;
}

async function main() {
  const base = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!base || !key) throw new Error("missing supabase");
  const c = (table, q = "") => restCount(base, key, table, q);

  const out = {
    companies_all: await c("companies"),
    visible: await c("companies", `or=(${VISIBLE})`),
    publishable: await c("companies", "publication_state=eq.PUBLISHABLE"),
    indexable_state: await c("companies", "publication_state=eq.INDEXABLE"),
    verified_state: await c("companies", "publication_state=eq.VERIFIED"),
    publication_null: await c("companies", "publication_state=is.null"),
    visible_active: await c("companies", `or=(${VISIBLE})&authority_active=eq.true`),
    visible_not_current: await c("companies", `or=(${VISIBLE})&authority_active=eq.false`),
    visible_unknown_auth: await c("companies", `or=(${VISIBLE})&authority_active=is.null`),
    visible_carrier: await c("companies", `or=(${VISIBLE})&entity_type=in.(CARRIER,Carrier,carrier)`),
    visible_broker: await c("companies", `or=(${VISIBLE})&entity_type=in.(BROKER,Broker,broker)`),
    visible_dual: await c(
      "companies",
      `or=(${VISIBLE})&entity_type=in.(CARRIER/BROKER,BROKER/CARRIER,Carrier/Broker,Broker/Carrier,Carrier / Broker)`
    ),
    fl_hq_publishable: await c("companies", "publication_state=eq.PUBLISHABLE&headquarters=ilike.* FL*"),
    nj_hq_publishable: await c("companies", "publication_state=eq.PUBLISHABLE&headquarters=ilike.* NJ*"),
    ca_hq_publishable: await c("companies", "publication_state=eq.PUBLISHABLE&headquarters=ilike.* CA*"),
    fl_im_all: await c("provider_state_authority", "state_code=eq.FL&authority_type=eq.intrastate_mover_registration"),
    fl_im_active: await c(
      "provider_state_authority",
      "state_code=eq.FL&authority_type=eq.intrastate_mover_registration&status=eq.active"
    ),
    fl_mb_active: await c(
      "provider_state_authority",
      "state_code=eq.FL&authority_type=eq.intrastate_hhg_broker&status=eq.active"
    ),
    fl_im_verified: await c(
      "provider_state_authority",
      "state_code=eq.FL&authority_type=eq.intrastate_mover_registration&verification_state=eq.VERIFIED"
    ),
    contacts: await c("provider_contact_observation"),
  };

  const latest = await restOne(
    base,
    key,
    "companies",
    `select=fmcsa_last_checked&or=(${VISIBLE})&fmcsa_last_checked=not.is.null&order=fmcsa_last_checked.desc&limit=1`
  );
  const psaAsOf = await restOne(
    base,
    key,
    "provider_state_authority",
    "select=retrieved_at&state_code=eq.FL&order=retrieved_at.desc&limit=1"
  );
  out.latest_fmcsa_last_checked = latest?.fmcsa_last_checked ?? null;
  out.fl_psa_retrieved_at = psaAsOf?.retrieved_at ?? null;
  console.log(JSON.stringify(out, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
