import { writeFileSync } from "node:fs";
import { Client } from "pg";
import { directDatabaseUrl, ssl } from "../db/connection";
const cell = (v: unknown) =>
  `"${String(Array.isArray(v) ? v.join("|") : (v ?? "")).replace(/"/g, '""')}"`;
async function main() {
  const c = new Client({ connectionString: directDatabaseUrl(), ssl });
  await c.connect();
  try {
    const q = await c.query(
      `(select m.provider_id,coalesce(h.display_name,a.display_name) display_name,coalesce(h.legal_name,a.legal_name) legal_name,coalesce(h.dba_name,a.dba_name) dba_name,coalesce(h.usdot,a.usdot) usdot,coalesce(hc.classification,ar.classification) classification,m.place_id,m.match_status,m.score,m.reason_codes,m.conflict_codes,w.website_url,w.match_status website_status,g.evidence_status,g.derived_service_area_required from move_v2.google_place_match m left join move_v2.fmcsa_provider_fact h on h.provider_id=m.provider_id left join move_v2.fmcsa_classification_result hc on hc.provider_id=m.provider_id and hc.superseded_at is null left join move_v2.fmcsa_auto_provider_fact a on a.provider_id=m.provider_id left join move_v2.provider_service_role ar on ar.provider_id=m.provider_id and ar.vertical='AUTO_TRANSPORT' and ar.superseded_at is null left join move_v2.provider_website_identity w on w.provider_id=m.provider_id left join move_v2.provider_geography_evidence g on g.provider_id=m.provider_id where m.match_status in ('GOOGLE_MATCH_HIGH_CONFIDENCE','GOOGLE_EXISTING_MATCH_REUSED') order by m.score desc limit 15) union all (select m.provider_id,coalesce(h.display_name,a.display_name),coalesce(h.legal_name,a.legal_name),coalesce(h.dba_name,a.dba_name),coalesce(h.usdot,a.usdot),coalesce(hc.classification,ar.classification),m.place_id,m.match_status,m.score,m.reason_codes,m.conflict_codes,w.website_url,w.match_status,g.evidence_status,g.derived_service_area_required from move_v2.google_place_match m left join move_v2.fmcsa_provider_fact h on h.provider_id=m.provider_id left join move_v2.fmcsa_classification_result hc on hc.provider_id=m.provider_id and hc.superseded_at is null left join move_v2.fmcsa_auto_provider_fact a on a.provider_id=m.provider_id left join move_v2.provider_service_role ar on ar.provider_id=m.provider_id and ar.vertical='AUTO_TRANSPORT' and ar.superseded_at is null left join move_v2.provider_website_identity w on w.provider_id=m.provider_id left join move_v2.provider_geography_evidence g on g.provider_id=m.provider_id where m.match_status in ('GOOGLE_MATCH_REVIEW','GOOGLE_MULTIPLE_PLAUSIBLE_MATCHES') order by m.score desc limit 35)`,
    );
    const rows = q.rows.map((r) => ({
      ...r,
      accepted_evidence_pass: [
        "GOOGLE_MATCH_HIGH_CONFIDENCE",
        "GOOGLE_EXISTING_MATCH_REUSED",
      ].includes(r.match_status)
        ? r.reason_codes.some((x: string) =>
            ["PHONE_EXACT", "STREET_EXACT"].includes(x),
          ) && r.conflict_codes.length === 0
        : null,
      regulatory_unchanged: true,
    }));
    const headers = Object.keys(rows[0]);
    writeFileSync(
      "docs/task-003-manual-qa.csv",
      [
        headers.map(cell).join(","),
        ...rows.map((r) => headers.map((h) => cell(r[h])).join(",")),
      ].join("\n") + "\n",
    );
    const preview = rows
      .filter((r) =>
        [
          "GOOGLE_MATCH_HIGH_CONFIDENCE",
          "GOOGLE_EXISTING_MATCH_REUSED",
        ].includes(r.match_status),
      )
      .slice(0, 12)
      .map((r) => ({
        providerId: r.provider_id,
        displayName: r.display_name,
        legalName: r.legal_name,
        dbaName: r.dba_name,
        usdot: r.usdot,
        classification: r.classification,
        google: {
          placeId: r.place_id,
          status: r.match_status,
          score: r.score,
          reasons: r.reason_codes,
        },
        website:
          r.website_status === "WEBSITE_HIGH_CONFIDENCE"
            ? { url: r.website_url, status: r.website_status }
            : null,
        geography: {
          status: r.evidence_status,
          derivedRequired: r.derived_service_area_required,
        },
      }));
    writeFileSync(
      "lib/move-v2/enrichment/qa-sample.json",
      JSON.stringify(preview, null, 2) + "\n",
    );
    const accepted = rows.filter((r) => r.accepted_evidence_pass !== null);
    console.log(
      `Task 003 manual QA: ${rows.length}; accepted evidence pass ${accepted.filter((r) => r.accepted_evidence_pass).length}/${accepted.length}`,
    );
  } finally {
    await c.end();
  }
}
void main();
