import { Client } from "pg";
import { GEOGRAPHY_RULE_VERSION } from "../../../lib/move-v2/enrichment/types";
import { databaseUrl, ssl } from "../db/connection";

async function main() {
  const c = new Client({ connectionString: databaseUrl(), ssl }); await c.connect();
  await c.query(`delete from move_v2.provider_geography_evidence g using move_v2.provider_local_eligibility e
    where g.provider_id=e.provider_id and e.superseded_at is null and e.eligibility='STATE_VERIFIED_MOVING_BROKER'
      and exists(select 1 from move_v2.enrichment_queue q where q.provider_id=e.provider_id and q.wave='STATE_004B')`);
  const result = await c.query(`insert into move_v2.provider_geography_evidence
    (provider_id,evidence_status,derived_service_area_required,explicit_observation_count,rule_version,evaluated_at)
    select e.provider_id,
      case when count(sa.provider_service_area_id)>=2 then 'SERVICE_AREA_EXPLICIT'
           when count(sa.provider_service_area_id)=1 then 'SERVICE_AREA_PARTIAL'
           when w.match_status='WEBSITE_REVIEW' then 'SERVICE_AREA_REVIEW'
           else 'SERVICE_AREA_NOT_FOUND' end,
      case when count(sa.provider_service_area_id)=0 and coalesce(w.match_status,'WEBSITE_NOT_PROVIDED')<>'WEBSITE_REVIEW' then true else false end,
      count(sa.provider_service_area_id)::int,$1,now()
    from move_v2.provider_local_eligibility e
    join move_v2.google_place_match g on g.provider_id=e.provider_id and g.match_status in ('GOOGLE_MATCH_HIGH_CONFIDENCE','GOOGLE_EXISTING_MATCH_REUSED')
    left join move_v2.google_place_cache gc on gc.provider_id=e.provider_id
    left join move_v2.provider_website_identity w on w.provider_id=e.provider_id
    left join move_v2.provider_service_area sa on sa.provider_id=e.provider_id and sa.authority_scope='PROVIDER_PUBLISHED_SERVICE_AREA'
    where e.superseded_at is null and e.eligibility='STATE_VERIFIED_LOCAL_MOVER'
      and (w.provider_id is not null or gc.website_uri is null)
    group by e.provider_id,w.match_status
    on conflict(provider_id) do update set evidence_status=excluded.evidence_status,
      derived_service_area_required=excluded.derived_service_area_required,
      explicit_observation_count=excluded.explicit_observation_count,rule_version=excluded.rule_version,evaluated_at=excluded.evaluated_at
    returning provider_id,evidence_status,derived_service_area_required` , [GEOGRAPHY_RULE_VERSION]);
  console.log(JSON.stringify({evaluated:result.rowCount,derivedRequired:result.rows.filter((r)=>r.derived_service_area_required).length,statuses:Object.groupBy(result.rows,(r)=>r.evidence_status)}));
  await c.end();
}
void main();
