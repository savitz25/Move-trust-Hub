import { createHash } from "node:crypto";
import { Client } from "pg";
import {
  extractServiceClaims,
  geographyConflict,
  normalizeServiceClaim,
  SERVICE_GEOGRAPHY_RULE_VERSION,
} from "../../../lib/move-v2/geography/service-area-normalization";
import { safeFetchHtml } from "../../../lib/move-v2/enrichment/safe-fetch";
import {
  decideWebsite,
  extractPublished,
  validateCrawlUrl,
} from "../../../lib/move-v2/enrichment/website";
import { directDatabaseUrl, ssl } from "../db/connection";
const paths = [
  "/",
  "/service-area",
  "/service-areas",
  "/areas-we-serve",
  "/locations",
  "/local-moving",
  "/moving-services",
  "/about",
  "/contact",
  "/services",
  "/locations/seattle",
];
const RUN = "TASK006_LOCAL_SERVICE_AREA_CRAWL_V1";
const hash = (v: string) => createHash("sha256").update(v).digest("hex");
async function main() {
  const c = new Client({ connectionString: directDatabaseUrl(), ssl });
  await c.connect();
  const stats: Record<string, number> = {
    eligible: 0,
    reserved: 0,
    websiteHigh: 0,
    websiteReview: 0,
    crawlSuccess: 0,
    pages: 0,
    rawClaims: 0,
    structuredProviders: 0,
    counties: 0,
    cities: 0,
    zips: 0,
    regions: 0,
    exclusions: 0,
    conflicts: 0,
  };
  try {
    const counties = (
      await c.query(
        `select state,county_name name,county_geoid geoid from move_v2.county_geometry where state in('FL','WA')`,
      )
    ).rows;
    const rows = await c.query(
      `select e.provider_id,e.state,g.website_uri,g.place_id,f.usdot,f.legal_name,f.dba_name,coalesce(sr.phone,f.phone) phone,coalesce(sr.address->>'city',f.physical_address->>'city') city,fc.classification from move_v2.provider_local_eligibility e join move_v2.google_place_match m using(provider_id) join move_v2.google_place_cache g using(provider_id) join move_v2.fmcsa_provider_fact f using(provider_id) left join move_v2.fmcsa_classification_result fc on fc.provider_id=e.provider_id and fc.superseded_at is null left join lateral(select s.* from move_v2.provider_state_authority_match pm join move_v2.state_authority_source_record s using(state_authority_source_record_id) where pm.provider_id=e.provider_id and pm.match_status='STATE_MATCH_HIGH_CONFIDENCE' order by s.created_at desc limit 1)sr on true where e.superseded_at is null and e.state in('FL','WA') and e.eligibility='STATE_VERIFIED_LOCAL_MOVER' and m.match_status='GOOGLE_MATCH_HIGH_CONFIDENCE' and g.website_uri is not null`,
    );
    for (const row of rows.rows) {
      stats.eligible++;
      const reserved = await c.query(
        `insert into move_v2.pipeline_run(provider_id,step,idempotency_key,status,rule_version,started_at) values($1,'TASK006_SERVICE_AREA_CRAWL',$2,'STARTED',$3,now()) on conflict(idempotency_key) do nothing returning pipeline_run_id`,
        [
          row.provider_id,
          `${RUN}:${row.provider_id}`,
          SERVICE_GEOGRAPHY_RULE_VERSION,
        ],
      );
      if (!reserved.rowCount) continue;
      stats.reserved++;
      const checked = validateCrawlUrl(
        String(row.website_uri).replace(/^http:/i, "https:"),
      );
      if (!checked.ok) {
        await c.query(
          `update move_v2.pipeline_run set status='FAILED',completed_at=now(),error_code=$2 where pipeline_run_id=$1`,
          [reserved.rows[0].pipeline_run_id, checked.reason],
        );
        continue;
      }
      const domain = checked.url.hostname.replace(/^www\./, "");
      let home;
      try {
        home = await safeFetchHtml(checked.url.toString(), domain);
      } catch (e) {
        stats.websiteReview++;
        await c.query(
          `update move_v2.pipeline_run set status='FAILED',completed_at=now(),error_code=$2 where pipeline_run_id=$1`,
          [
            reserved.rows[0].pipeline_run_id,
            e instanceof Error ? e.message : "FETCH_FAILED",
          ],
        );
        continue;
      }
      const first = extractPublished(home.html);
      const decision = decideWebsite(
        {
          providerId: row.provider_id,
          usdot: row.usdot,
          legalName: row.legal_name,
          dbaName: row.dba_name,
          phone: row.phone,
          city: row.city,
          state: row.state,
          classification: row.classification,
        },
        home.url,
        {
          pageName: home.html.match(/<title[^>]*>([^<]+)/i)?.[1],
          phone: first.phones[0],
          usdot: home.html.match(/USDOT\s*#?\s*(\d{5,8})/i)?.[1],
          address: home.html,
        },
      );
      await c.query(
        `insert into move_v2.provider_website_identity(provider_id,website_url,normalized_domain,match_status,match_confidence,reason_codes,source_type,source_reference,verified_at) values($1,$2,$3,$4,$5,$6,'GOOGLE_PLACES',$7,now()) on conflict(provider_id) do update set website_url=excluded.website_url,normalized_domain=excluded.normalized_domain,match_status=excluded.match_status,match_confidence=excluded.match_confidence,reason_codes=excluded.reason_codes,verified_at=excluded.verified_at`,
        [
          row.provider_id,
          home.url,
          domain,
          decision.status,
          decision.score / 100,
          decision.reasons,
          row.place_id,
        ],
      );
      if (decision.status !== "WEBSITE_HIGH_CONFIDENCE") {
        stats.websiteReview++;
        await c.query(
          `update move_v2.pipeline_run set status='COMPLETED',completed_at=now(),error_code='WEBSITE_NOT_HIGH_CONFIDENCE' where pipeline_run_id=$1`,
          [reserved.rows[0].pipeline_run_id],
        );
        continue;
      }
      stats.websiteHigh++;
      const pages = [home];
      for (const path of paths.slice(1)) {
        try {
          pages.push(
            await safeFetchHtml(new URL(path, home.url).toString(), domain),
          );
        } catch {
          /* optional bounded path */
        }
      }
      stats.crawlSuccess++;
      stats.pages += pages.length;
      const observations = [];
      for (const page of pages) {
        for (const claim of extractServiceClaims(page.html)) {
          stats.rawClaims++;
          for (const o of normalizeServiceClaim(
            claim,
            counties.filter((x) => x.state === row.state),
            [],
          )) {
            observations.push(o);
            await c.query(
              `insert into move_v2.provider_service_geography_observation(provider_id,raw_claim,geography_type,normalized_label,normalized_geoid,normalization_reason,is_exclusion,source_url,source_observed_at,confidence,rule_version) values($1,$2,$3,$4,$5,$6,$7,$8,now(),$9,$10) on conflict do nothing`,
              [
                row.provider_id,
                o.rawClaim,
                o.geographyType,
                o.normalizedLabel,
                o.normalizedGeoid,
                o.normalizationReason,
                o.isExclusion,
                page.url,
                o.confidence,
                SERVICE_GEOGRAPHY_RULE_VERSION,
              ],
            );
            if (o.normalizedLabel && !o.isExclusion) {
              const areaType =
                o.geographyType === "ZIP"
                  ? "POSTAL_CODE"
                  : o.geographyType === "REGION"
                    ? "METRO"
                    : o.geographyType === "NAMED_SERVICE_AREA"
                      ? "OTHER"
                      : o.geographyType;
              await c.query(
                `insert into move_v2.provider_service_area(provider_id,area_type,authority_scope,state,county,city,postal_code,label,source_type,source_url,source_record_id,confidence,first_seen_at,last_verified_at) values($1,$2,'PROVIDER_PUBLISHED_SERVICE_AREA',$3,$4,$5,$6,$7,'OFFICIAL_WEBSITE',$8,$9,$10,now(),now()) on conflict do nothing`,
                [
                  row.provider_id,
                  areaType,
                  row.state,
                  o.geographyType === "COUNTY" ? o.normalizedLabel : null,
                  o.geographyType === "CITY" ? o.normalizedLabel : null,
                  o.geographyType === "ZIP" ? o.normalizedLabel : null,
                  o.normalizedLabel,
                  page.url,
                  hash(
                    `${row.provider_id}:${page.url}:${o.geographyType}:${o.normalizedLabel}`,
                  ),
                  o.confidence,
                ],
              );
            }
          }
        }
      }
      const positive = observations.filter(
          (o) => !o.isExclusion && o.normalizedLabel,
        ),
        structured = new Set(
          positive.map(
            (o) =>
              `${o.geographyType}:${o.normalizedGeoid ?? o.normalizedLabel}`,
          ),
        );
      if (structured.size) stats.structuredProviders++;
      for (const o of positive)
        stats[
          o.geographyType === "COUNTY"
            ? "counties"
            : o.geographyType === "CITY"
              ? "cities"
              : o.geographyType === "ZIP"
                ? "zips"
                : "regions"
        ]++;
      const conflict = geographyConflict(observations);
      if (conflict) stats.conflicts++;
      stats.exclusions += observations.filter((o) => o.isExclusion).length;
      const status = conflict
        ? "SERVICE_AREA_REVIEW"
        : structured.size >= 2
          ? "SERVICE_AREA_EXPLICIT"
          : structured.size === 1
            ? "SERVICE_AREA_PARTIAL"
            : "SERVICE_AREA_NOT_FOUND";
      await c.query(
        `insert into move_v2.provider_geography_evidence(provider_id,evidence_status,derived_service_area_required,explicit_observation_count,rule_version,evaluated_at) values($1,$2,$3,$4,$5,now()) on conflict(provider_id) do update set evidence_status=excluded.evidence_status,derived_service_area_required=excluded.derived_service_area_required,explicit_observation_count=excluded.explicit_observation_count,rule_version=excluded.rule_version,evaluated_at=excluded.evaluated_at`,
        [
          row.provider_id,
          status,
          status === "SERVICE_AREA_NOT_FOUND",
          structured.size,
          SERVICE_GEOGRAPHY_RULE_VERSION,
        ],
      );
      await c.query(
        `update move_v2.pipeline_run set status='COMPLETED',completed_at=now() where pipeline_run_id=$1`,
        [reserved.rows[0].pipeline_run_id],
      );
    }
    console.log(JSON.stringify(stats));
  } finally {
    await c.end();
  }
}
void main();
