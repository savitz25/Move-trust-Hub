import { createHash } from "node:crypto";
import { Client } from "pg";
import { directDatabaseUrl, ssl } from "../db/connection";
import { decideGeographyEvidence } from "../../../lib/move-v2/enrichment/geography";
import { safeFetchHtml } from "../../../lib/move-v2/enrichment/safe-fetch";
import {
  decideWebsite,
  extractPublished,
  validateCrawlUrl,
} from "../../../lib/move-v2/enrichment/website";
import type { RegulatoryIdentity } from "../../../lib/move-v2/enrichment/types";
const paths = ["/", "/contact", "/about", "/services", "/service-area"];
const norm = (v: string) => v.trim().toLowerCase().replace(/\s+/g, " ");
const digits = (v: string) => (v ?? "").replace(/\D/g, "").slice(-10);
const hash = (v: string) => createHash("sha256").update(v).digest("hex");
async function main() {
  const c = new Client({ connectionString: directDatabaseUrl(), ssl });
  await c.connect();
  const stats: Record<string, number> = {
    attempted: 0,
    high: 0,
    review: 0,
    rejected: 0,
    crawlSuccess: 0,
    emails: 0,
    phones: 0,
    services: 0,
    serviceAreas: 0,
    branches: 0,
  };
  try {
    const rows = await c.query(
      `select m.provider_id,g.website_uri,g.place_id,coalesce(h.usdot,a.usdot) usdot,coalesce(h.legal_name,a.legal_name) legal_name,coalesce(h.dba_name,a.dba_name) dba_name,coalesce(h.phone,a.phone) phone,coalesce(h.physical_address->>'city',a.city) city,coalesce(h.physical_address->>'state',a.state) state,coalesce(hc.classification,ar.classification) classification from move_v2.google_place_match m join move_v2.google_place_cache g on g.provider_id=m.provider_id left join move_v2.fmcsa_provider_fact h on h.provider_id=m.provider_id left join move_v2.fmcsa_classification_result hc on hc.provider_id=m.provider_id and hc.superseded_at is null left join move_v2.fmcsa_auto_provider_fact a on a.provider_id=m.provider_id left join move_v2.provider_service_role ar on ar.provider_id=m.provider_id and ar.vertical='AUTO_TRANSPORT' and ar.superseded_at is null where m.match_status in ('GOOGLE_MATCH_HIGH_CONFIDENCE','GOOGLE_EXISTING_MATCH_REUSED') and g.website_uri is not null and not exists(select 1 from move_v2.provider_website_identity w where w.provider_id=m.provider_id)`,
    );
    for (const row of rows.rows) {
      stats.attempted++;
      const candidateUrl = String(row.website_uri).replace(/^http:/i, "https:");
      const checked = validateCrawlUrl(candidateUrl);
      if (!checked.ok) {
        stats.rejected++;
        await c.query(
          `insert into move_v2.provider_website_identity(provider_id,website_url,normalized_domain,match_status,match_confidence,reason_codes,source_type,source_reference,verified_at) values($1,$2,$3,'WEBSITE_REJECTED',0,$4,'GOOGLE_PLACES',$5,now()) on conflict(provider_id) do update set match_status=excluded.match_status,reason_codes=excluded.reason_codes,verified_at=excluded.verified_at`,
          [
            row.provider_id,
            row.website_uri,
            "",
            [checked.reason],
            row.place_id,
          ],
        );
        continue;
      }
      const domain = checked.url.hostname.replace(/^www\./, "");
      let home;
      try {
        home = await safeFetchHtml(checked.url.toString(), domain);
      } catch (e) {
        stats.review++;
        await c.query(
          `insert into move_v2.provider_website_identity(provider_id,website_url,normalized_domain,match_status,match_confidence,reason_codes,source_type,source_reference,verified_at) values($1,$2,$3,'WEBSITE_REVIEW',0,$4,'GOOGLE_PLACES',$5,now()) on conflict(provider_id) do update set match_status=excluded.match_status,reason_codes=excluded.reason_codes,verified_at=excluded.verified_at`,
          [
            row.provider_id,
            row.website_uri,
            domain,
            [e instanceof Error ? e.message : "FETCH_FAILED"],
            row.place_id,
          ],
        );
        continue;
      }
      const title = home.html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? "";
      const initial = extractPublished(home.html);
      const identity: RegulatoryIdentity = {
        providerId: row.provider_id,
        usdot: row.usdot,
        legalName: row.legal_name,
        dbaName: row.dba_name,
        phone: row.phone,
        city: row.city,
        state: row.state,
        classification: row.classification,
      };
      const website = decideWebsite(identity, home.url, {
        pageName: title,
        phone: initial.phones[0],
        usdot: home.html.match(/USDOT\s*#?\s*(\d{5,8})/i)?.[1],
        address: home.html,
      });
      stats[
        website.status === "WEBSITE_HIGH_CONFIDENCE"
          ? "high"
          : website.status === "WEBSITE_REVIEW"
            ? "review"
            : "rejected"
      ]++;
      await c.query(
        `insert into move_v2.provider_website_identity(provider_id,website_url,normalized_domain,match_status,match_confidence,reason_codes,source_type,source_reference,verified_at) values($1,$2,$3,$4,$5,$6,'GOOGLE_PLACES',$7,now()) on conflict(provider_id) do update set website_url=excluded.website_url,normalized_domain=excluded.normalized_domain,match_status=excluded.match_status,match_confidence=excluded.match_confidence,reason_codes=excluded.reason_codes,verified_at=excluded.verified_at`,
        [
          row.provider_id,
          home.url,
          domain,
          website.status,
          website.score / 100,
          website.reasons,
          row.place_id,
        ],
      );
      if (website.status !== "WEBSITE_HIGH_CONFIDENCE") continue;
      const all = [{ ...home }];
      for (const path of paths.slice(1)) {
        try {
          const page = await safeFetchHtml(
            new URL(path, home.url).toString(),
            domain,
          );
          all.push(page);
        } catch {
          /* bounded optional page */
        }
      }
      stats.crawlSuccess++;
      const combined = {
        emails: new Set<string>(),
        phones: new Set<string>(),
        services: new Set<string>(),
        areas: new Set<string>(),
      };
      for (const page of all) {
        const x = extractPublished(page.html);
        x.emails.forEach((v) => combined.emails.add(v));
        x.phones.forEach((v) => combined.phones.add(v));
        x.services.forEach((v) => combined.services.add(v));
        x.serviceAreas.forEach((v) => combined.areas.add(v));
        for (const [type, values] of [
          ["EMAIL", x.emails],
          ["PHONE", x.phones],
          ["SERVICE", x.services],
          ["SERVICE_AREA", x.serviceAreas],
        ] as const)
          for (const value of values)
            await c.query(
              `insert into move_v2.provider_published_observation(provider_id,observation_type,observation_value,normalized_value,source_url,retrieved_at,confidence,evidence_excerpt) values($1,$2,$3,$4,$5,now(),0.9,$6) on conflict do nothing`,
              [
                row.provider_id,
                type,
                value,
                norm(value),
                page.url,
                value.slice(0, 240),
              ],
            );
      }
      for (const email of combined.emails)
        await c.query(
          `insert into move_v2.provider_contact(provider_id,contact_type,value,normalized_value,label,source_type,source_record_id,source_url,first_seen_at,last_seen_at,last_verified_at,is_primary,status,confidence) values($1,'EMAIL',$2,$3,'Website-published','OFFICIAL_WEBSITE',$4,$5,now(),now(),now(),false,'ACTIVE',0.9) on conflict do nothing`,
          [
            row.provider_id,
            email,
            email.toLowerCase(),
            hash(`${row.provider_id}:EMAIL:${email}`),
            home.url,
          ],
        );
      for (const phone of combined.phones)
        await c.query(
          `insert into move_v2.provider_contact(provider_id,contact_type,value,normalized_value,label,source_type,source_record_id,source_url,first_seen_at,last_seen_at,last_verified_at,is_primary,status,confidence) values($1,'PHONE',$2,$3,'Website-published','OFFICIAL_WEBSITE',$4,$5,now(),now(),now(),false,'ACTIVE',0.9) on conflict do nothing`,
          [
            row.provider_id,
            phone,
            digits(phone),
            hash(`${row.provider_id}:PHONE:${phone}`),
            home.url,
          ],
        );
      for (const area of combined.areas)
        await c.query(
          `insert into move_v2.provider_service_area(provider_id,area_type,authority_scope,label,source_type,source_url,source_record_id,confidence,first_seen_at,last_verified_at) values($1,'OTHER','PROVIDER_PUBLISHED_SERVICE_AREA',$2,'OFFICIAL_WEBSITE',$3,$4,0.8,now(),now()) on conflict do nothing`,
          [
            row.provider_id,
            area,
            home.url,
            hash(`${row.provider_id}:AREA:${area}`),
          ],
        );
      const geo = decideGeographyEvidence({
        explicitAreas: [...combined.areas],
      });
      await c.query(
        `insert into move_v2.provider_geography_evidence(provider_id,evidence_status,derived_service_area_required,explicit_observation_count,rule_version,evaluated_at) values($1,$2,$3,$4,$5,now()) on conflict(provider_id) do update set evidence_status=excluded.evidence_status,derived_service_area_required=excluded.derived_service_area_required,explicit_observation_count=excluded.explicit_observation_count,rule_version=excluded.rule_version,evaluated_at=excluded.evaluated_at`,
        [
          row.provider_id,
          geo.status,
          geo.derivedServiceAreaRequired,
          combined.areas.size,
          geo.ruleVersion,
        ],
      );
      stats.emails += combined.emails.size;
      stats.phones += combined.phones.size;
      stats.services += combined.services.size;
      stats.serviceAreas += combined.areas.size;
    }
    await c.query(
      `insert into move_v2.provider_geography_evidence(provider_id,evidence_status,derived_service_area_required,explicit_observation_count,rule_version,evaluated_at) select m.provider_id,'SERVICE_AREA_NOT_FOUND',true,0,'MOVE_SERVICE_AREA_PRECEDENCE_2026_08_V1',now() from move_v2.google_place_match m where m.match_status in ('GOOGLE_MATCH_HIGH_CONFIDENCE','GOOGLE_EXISTING_MATCH_REUSED') and not exists(select 1 from move_v2.provider_geography_evidence g where g.provider_id=m.provider_id) on conflict do nothing`,
    );
    console.log(JSON.stringify(stats, null, 2));
  } finally {
    await c.end();
  }
}
void main();
