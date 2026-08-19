import { Client } from "pg";
import { directDatabaseUrl, ssl } from "../db/connection";
import {
  digitsOnlyPhone,
  normalizeNameForMatch,
} from "../../../lib/verification/google-places-name-queries";
type Candidate = {
  provider_id: string;
  usdot: string;
  legal_name: string;
  dba_name: string | null;
  display_name: string;
  phone: string | null;
  state: string | null;
  city: string | null;
  power_units: number | null;
  classification: string;
  group_name: string;
};
const specs = [
  {
    group: "HHG_INTERSTATE",
    limit: 50,
    sql: `select f.provider_id,f.usdot,f.legal_name,f.dba_name,f.display_name,f.phone,f.physical_address->>'state' state,f.physical_address->>'city' city,f.power_units,c.classification from move_v2.fmcsa_provider_fact f join move_v2.fmcsa_classification_result c using(provider_id) where c.superseded_at is null and c.classification='INTERSTATE_CARRIER'`,
  },
  {
    group: "HHG_BROKER_DUAL",
    limit: 25,
    sql: `select f.provider_id,f.usdot,f.legal_name,f.dba_name,f.display_name,f.phone,f.physical_address->>'state' state,f.physical_address->>'city' city,f.power_units,c.classification from move_v2.fmcsa_provider_fact f join move_v2.fmcsa_classification_result c using(provider_id) where c.superseded_at is null and c.classification in ('AUTHORIZED_BROKER','DUAL_ROLE_CARRIER_BROKER')`,
  },
  {
    group: "AUTO_CARRIER",
    limit: 75,
    sql: `select f.*,r.classification from move_v2.fmcsa_auto_provider_fact f join move_v2.provider_service_role r using(provider_id) where r.vertical='AUTO_TRANSPORT' and r.superseded_at is null and r.classification='AUTO_TRANSPORT_CARRIER'`,
  },
  {
    group: "AUTO_BROKER_DUAL",
    limit: 25,
    sql: `select f.*,r.classification from move_v2.fmcsa_auto_provider_fact f join move_v2.provider_service_role r using(provider_id) where r.vertical='AUTO_TRANSPORT' and r.superseded_at is null and r.classification in ('AUTO_TRANSPORT_BROKER','AUTO_TRANSPORT_DUAL_ROLE')`,
  },
  {
    group: "LOCAL_NJ",
    limit: 38,
    sql: `select f.provider_id,f.usdot,f.legal_name,f.dba_name,f.display_name,f.phone,f.physical_address->>'state' state,f.physical_address->>'city' city,f.power_units,c.classification from move_v2.fmcsa_provider_fact f join move_v2.fmcsa_classification_result c using(provider_id) where c.superseded_at is null and c.classification='LOCAL_INTRASTATE_CARRIER_CANDIDATE' and f.physical_address->>'state'='NJ'`,
  },
  {
    group: "LOCAL_FL",
    limit: 37,
    sql: `select f.provider_id,f.usdot,f.legal_name,f.dba_name,f.display_name,f.phone,f.physical_address->>'state' state,f.physical_address->>'city' city,f.power_units,c.classification from move_v2.fmcsa_provider_fact f join move_v2.fmcsa_classification_result c using(provider_id) where c.superseded_at is null and c.classification='LOCAL_INTRASTATE_CARRIER_CANDIDATE' and f.physical_address->>'state'='FL'`,
  },
];
async function main() {
  const c = new Client({ connectionString: directDatabaseUrl(), ssl });
  await c.connect();
  try {
    const selected = new Map<string, Candidate & { groups: string[] }>();
    for (const spec of specs) {
      const q = await c.query(
        `select x.* from (${spec.sql}) x order by (case when x.power_units between 1 and 2 then 1 when x.power_units between 3 and 5 then 2 when x.power_units between 6 and 10 then 3 when x.power_units between 11 and 20 then 4 else 5 end),x.dba_name nulls last,x.provider_id limit $1`,
        [spec.limit],
      );
      for (const row of q.rows) {
        const current = selected.get(row.provider_id);
        if (current) current.groups.push(spec.group);
        else
          selected.set(row.provider_id, {
            ...row,
            group_name: spec.group,
            groups: [spec.group],
          });
      }
    }
    const v1 = await c.query(
      `select id,name,usdot_number,phone,website,coalesce(google_data,verification_sources->'google') google from public.companies where coalesce(google_data,verification_sources->'google')->>'place_id' is not null`,
    );
    const byDot = new Map<string, Record<string, unknown>>(),
      byPhone = new Map<string, Record<string, unknown>[]>();
    for (const row of v1.rows) {
      if (/^\d+$/.test(row.usdot_number ?? ""))
        byDot.set(row.usdot_number, row);
      const p = digitsOnlyPhone(row.phone);
      if (p) {
        const a = byPhone.get(p) ?? [];
        a.push(row);
        byPhone.set(p, a);
      }
    }
    await c.query("begin");
    for (const row of selected.values()) {
      let reuse = byDot.get(row.usdot);
      if (!reuse) {
        const candidates = byPhone.get(digitsOnlyPhone(row.phone)) ?? [];
        reuse = candidates.find((x) => {
          const a = normalizeNameForMatch(String(x.name ?? "")),
            b = normalizeNameForMatch(row.dba_name || row.legal_name);
          return a === b || a.includes(b) || b.includes(a);
        });
      }
      await c.query(
        `insert into move_v2.enrichment_queue(provider_id,wave,sample_groups,priority,status,reuse_candidate) values($1,'PILOT',$2,$3,'PENDING',$4) on conflict(provider_id) do update set sample_groups=excluded.sample_groups,priority=excluded.priority,reuse_candidate=coalesce(move_v2.enrichment_queue.reuse_candidate,excluded.reuse_candidate)`,
        [
          row.provider_id,
          row.groups,
          Math.min(
            ...row.groups.map((g) => specs.findIndex((s) => s.group === g) + 1),
          ),
          reuse
            ? JSON.stringify({
                v1_id: reuse.id,
                name: reuse.name,
                phone: reuse.phone,
                website: reuse.website,
                google: reuse.google,
              })
            : null,
        ],
      );
    }
    await c.query("commit");
    const stats = await c.query(
      `select count(*)::integer providers,count(*) filter(where reuse_candidate is not null)::integer reuse from move_v2.enrichment_queue where wave='PILOT'`,
    );
    console.log(
      `Pilot queue: ${stats.rows[0].providers}; reusable V1 candidates: ${stats.rows[0].reuse}`,
    );
  } catch (e) {
    await c.query("rollback").catch(() => {});
    throw e;
  } finally {
    await c.end();
  }
}
void main();
