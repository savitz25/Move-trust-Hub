import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { Client } from "pg";
import { parseFloridaBusinessSearchHtml } from "../../../lib/move-v2/state-authority/florida";
import { deriveStateEligibility } from "../../../lib/move-v2/state-authority/eligibility";
import { matchStateAuthority } from "../../../lib/move-v2/state-authority/matcher";
import { STATE_ELIGIBILITY_RULE_VERSION } from "../../../lib/move-v2/state-authority/types";
import { databaseUrl, ssl } from "../db/connection";

const FDACS_URL = "https://csapp.fdacs.gov/CSPublicApp/BusinessSearch/BusinessSearch.aspx";
const NJ_URL = "https://rgbportal.dca.njoag.gov/public-view/";
const isoDate = (value?: string) => {
  if (!value) return null;
  const [month, day, year] = value.split("/");
  return `${Number(year) < 100 ? `20${year}` : year}-${month}-${day}`;
};

async function main() {
  const client = new Client({ connectionString: databaseUrl(), ssl });
  await client.connect();
  try {
    await client.query("begin");
    const njRelease = await client.query(`insert into move_v2.state_source_release
      (state,regulator,source_name,source_url,source_class,retrieved_at,record_count,adapter_version,retrieval_method,ingestion_status)
      values('NJ','NJ Division of Consumer Affairs','Public Movers and Warehousemen public portal',$1,'STATE_REGULATOR_CURRENT','2026-08-16T00:00:00Z',null,'NJ_RGB_2026_08_V1','BOUNDED_PORTAL_CONTRACT','BOUNDED_PILOT')
      on conflict(state,source_url,retrieved_at) do update set adapter_version=excluded.adapter_version returning state_source_release_id`, [NJ_URL]);

    let recordsPublished = 0;
    let highConfidence = 0;
    for (const program of ["IM", "MB"] as const) {
      const path = `artifacts/move-v2/state/fdacs-${program.toLowerCase()}-pilot.html`;
      const html = readFileSync(path, "utf8");
      const records = parseFloridaBusinessSearchHtml(html, program);
      const retrievedAt = statSync(path).mtime.toISOString();
      const release = await client.query(`insert into move_v2.state_source_release
        (state,regulator,source_name,source_url,source_class,retrieved_at,record_count,sha256,adapter_version,retrieval_method,ingestion_status)
        values('FL','Florida Department of Agriculture and Consumer Services',$1,$2,'STATE_REGULATOR_CURRENT',$3,$4,$5,'FL_FDACS_2026_08_V1','BOUNDED_WEBFORMS_PILOT','PUBLISHED')
        on conflict(state,source_url,retrieved_at) do update set record_count=excluded.record_count returning state_source_release_id`,
        [`FDACS ${program === "IM" ? "Intrastate Mover" : "Moving Broker"} pilot`, `${FDACS_URL}?program=${program}`, retrievedAt, records.length, createHash("sha256").update(html).digest("hex")]);
      const releaseId = release.rows[0].state_source_release_id;
      for (const record of records) {
        const hash = createHash("sha256").update(JSON.stringify(record)).digest("hex");
        const source = await client.query(`insert into move_v2.state_authority_source_record
          (state_source_release_id,state,authority_type,license_registration_number,status,effective_date,expiration_date,legal_name,dba_name,address,phone,source_record_reference,source_record_hash,raw_record)
          values($1,'FL',$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
          on conflict(state_source_release_id,source_record_reference) do update set source_record_hash=excluded.source_record_hash returning state_authority_source_record_id`,
          [releaseId,record.authorityType,record.licenseNumber,record.status,isoDate(record.effectiveDate),isoDate(record.expirationDate),record.legalName,record.dbaName ?? null,
            JSON.stringify({address:record.address,city:record.city,state:"FL",postalCode:record.postalCode}),record.phone ?? null,record.sourceRecordReference,hash,JSON.stringify(record)]);
        recordsPublished++;
        const candidates = await client.query(`select f.provider_id,f.legal_name,f.dba_name,f.phone,
          f.physical_address->>'address_line_1' address,f.physical_address->>'city' city,f.physical_address->>'zip' postal_code
          from move_v2.fmcsa_provider_fact f join move_v2.fmcsa_classification_result cr using(provider_id)
          where cr.superseded_at is null and cr.classification='LOCAL_INTRASTATE_CARRIER_CANDIDATE'
            and f.physical_address->>'state'='FL' and
            (regexp_replace(upper(f.legal_name),'[^A-Z0-9]','','g')=regexp_replace(upper($1),'[^A-Z0-9]','','g')
             or regexp_replace(upper(coalesce(f.dba_name,'')),'[^A-Z0-9]','','g')=regexp_replace(upper($1),'[^A-Z0-9]','','g'))`, [record.legalName]);
        for (const provider of candidates.rows) {
          const match = matchStateAuthority({legalName:provider.legal_name,dbaName:provider.dba_name,address:provider.address,city:provider.city,postalCode:provider.postal_code,phone:provider.phone},record);
          if (match.status !== "STATE_MATCH_HIGH_CONFIDENCE") continue;
          highConfidence++;
          await client.query(`insert into move_v2.provider_state_authority_match
            (provider_id,state_authority_source_record_id,state,match_status,match_score,reason_codes,match_rule_version,matched_at)
            values($1,$2,'FL',$3,$4,$5,$6,now()) on conflict do nothing`, [provider.provider_id,source.rows[0].state_authority_source_record_id,match.status,match.score,match.reasonCodes,match.ruleVersion]);
          const eligibility = deriveStateEligibility(record, match.status);
          await client.query(`insert into move_v2.provider_state_authority
            (provider_id,state,license_or_registration_number,authority_type,status,effective_date,expiration_date,source,source_url,source_record_id,last_checked_at)
            values($1,'FL',$2,$3,$4,$5,$6,'FDACS',$7,$8,now()) on conflict(state,license_or_registration_number,authority_type) do nothing`,
            [provider.provider_id,record.licenseNumber,record.authorityType,record.status,isoDate(record.effectiveDate),isoDate(record.expirationDate),FDACS_URL,record.sourceRecordReference]);
          await client.query(`insert into move_v2.provider_local_eligibility
            (provider_id,state,eligibility,rule_version,reason_codes,state_authority_source_record_ids,evaluated_at)
            values($1,'FL',$2,$3,$4,$5,now()) on conflict(provider_id,state) where superseded_at is null do update
            set eligibility=excluded.eligibility,reason_codes=excluded.reason_codes,state_authority_source_record_ids=excluded.state_authority_source_record_ids,evaluated_at=excluded.evaluated_at`,
            [provider.provider_id,eligibility,STATE_ELIGIBILITY_RULE_VERSION,[...match.reasonCodes,record.authorityType], [source.rows[0].state_authority_source_record_id]]);
        }
      }
    }
    await client.query("commit");
    console.log(JSON.stringify({ njRelease: Boolean(njRelease.rowCount), recordsPublished, highConfidence }));
  } catch (error) { await client.query("rollback"); throw error; }
  finally { await client.end(); }
}
void main();
