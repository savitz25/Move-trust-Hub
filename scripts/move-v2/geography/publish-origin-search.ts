import { createHash } from "node:crypto";
import { Client } from "pg";
import { directDatabaseUrl, ssl } from "../db/connection";
const version = "MOVE_ORIGIN_SEARCH_2026_08_V1";
async function main() {
  const c = new Client({ connectionString: directDatabaseUrl(), ssl });
  await c.connect();
  try {
    await c.query("begin");
    const input = await c.query(
      `select jsonb_build_object('eligibility',coalesce((select jsonb_agg(x order by x.provider_id) from(select provider_id,state,eligibility,rule_version,evaluated_at from move_v2.provider_local_eligibility where superseded_at is null and state in('FL','WA'))x),'[]'),'explicit',coalesce((select jsonb_agg(x order by x.provider_id,x.normalized_geoid) from(select provider_id,geography_type,normalized_geoid,is_exclusion,rule_version from move_v2.provider_service_geography_observation)x),'[]'),'derived',coalesce((select jsonb_agg(x order by x.provider_id) from(select provider_id,model_version,input_snapshot,superseded_at from move_v2.provider_derived_area)x),'[]'),'zcta',coalesce((select jsonb_agg(x order by x.geography_source_release_id) from(select geography_source_release_id,sha256,vintage from move_v2.geography_source_release where source_name='US Census TIGERweb ZCTA')x),'[]')) payload`,
    );
    const fingerprint = createHash("sha256")
      .update(JSON.stringify(input.rows[0].payload))
      .digest("hex");
    const existing = await c.query(
      `select origin_search_release_id from move_v2.origin_search_release where input_fingerprint=$1`,
      [fingerprint],
    );
    if (existing.rowCount) {
      await c.query("rollback");
      console.log(
        JSON.stringify({
          idempotent: true,
          releaseId: existing.rows[0].origin_search_release_id,
        }),
      );
      return;
    }
    const release = await c.query(
      `insert into move_v2.origin_search_release(model_version,geography_vintage,input_fingerprint,status,created_at,published_at) values($1,'2020 ZCTA + 2025 counties',$2,'PILOT_MODEL_NOT_SUFFICIENTLY_VALIDATED',now(),now()) returning origin_search_release_id`,
      [version, fingerprint],
    );
    const rid = release.rows[0].origin_search_release_id;
    await c.query(
      `update move_v2.origin_search_placement set active=false,invalidated_at=now() where active=true and invalidated_at is null`,
    );
    await c.query(
      `insert into move_v2.origin_search_placement(origin_search_release_id,provider_id,state,county_geoid,zcta,evidence_tier,placement_reason,evidence_reference,distance_miles,created_at)
 select distinct $1::uuid,o.provider_id,e.state,o.normalized_geoid,null::text,1,'PROVIDER_EXPLICIT_COUNTY',jsonb_build_object('observationId',o.service_geography_observation_id,'sourceUrl',o.source_url,'rawClaim',o.raw_claim),null::numeric,now() from move_v2.provider_service_geography_observation o join move_v2.provider_local_eligibility e using(provider_id) where o.geography_type='COUNTY' and o.normalized_geoid is not null and not o.is_exclusion and e.superseded_at is null and e.eligibility='STATE_VERIFIED_LOCAL_MOVER' and e.state in('FL','WA') on conflict do nothing`,
      [rid],
    );
    await c.query(
      `insert into move_v2.origin_search_placement(origin_search_release_id,provider_id,state,county_geoid,zcta,evidence_tier,placement_reason,evidence_reference,distance_miles,created_at)
 select distinct $1::uuid,o.provider_id,e.state,r.primary_county_geoid,r.zcta,1,'PROVIDER_EXPLICIT_ZIP',jsonb_build_object('observationId',o.service_geography_observation_id,'sourceUrl',o.source_url,'rawClaim',o.raw_claim,'zctaCaveat',r.explanation),null::numeric,now() from move_v2.provider_service_geography_observation o join move_v2.provider_local_eligibility e using(provider_id) join move_v2.postal_zip_resolution r on r.postal_zip=o.normalized_geoid and r.status='GEOGRAPHIC_ZCTA' where o.geography_type='ZIP' and not o.is_exclusion and e.superseded_at is null and e.eligibility='STATE_VERIFIED_LOCAL_MOVER' and e.state in('FL','WA') on conflict do nothing`,
      [rid],
    );
    await c.query(
      `insert into move_v2.origin_search_placement(origin_search_release_id,provider_id,state,county_geoid,zcta,evidence_tier,placement_reason,evidence_reference,distance_miles,created_at)
 select $1::uuid,p.provider_id,p.state,p.county_geoid,null::text,case when p.placement_type='HOME_COUNTY' then 3 else 4 end,case when p.placement_type='HOME_COUNTY' then 'TRUSTHUB_DERIVED_HOME_COUNTY' else 'TRUSTHUB_DERIVED_MEANINGFUL_COVERAGE' end,jsonb_build_object('derivedAreaId',p.provider_derived_area_id,'reason',p.reason_code,'modelVersion',a.model_version),null::numeric,now() from move_v2.provider_county_placement p join move_v2.provider_derived_area a using(provider_derived_area_id) join move_v2.provider_local_eligibility e on e.provider_id=p.provider_id and e.state=p.state where p.active and p.superseded_at is null and a.superseded_at is null and p.placement_type in('HOME_COUNTY','DERIVED_MEANINGFUL_COVERAGE') and e.superseded_at is null and e.eligibility='STATE_VERIFIED_LOCAL_MOVER' and p.state in('FL','WA') and not exists(select 1 from move_v2.provider_service_geography_observation o where o.provider_id=p.provider_id and not o.is_exclusion and o.geography_type in('COUNTY','CITY','ZIP')) on conflict do nothing`,
      [rid],
    );
    await c.query(
      `insert into move_v2.origin_search_placement(origin_search_release_id,provider_id,state,county_geoid,zcta,evidence_tier,placement_reason,evidence_reference,distance_miles,created_at)
 select $1::uuid,c.provider_id,c.state,c.county_geoid,z.zcta,c.evidence_tier,case when c.placement_reason='PROVIDER_EXPLICIT_COUNTY' then 'PROVIDER_EXPLICIT_COUNTY' else c.placement_reason end,c.evidence_reference,c.distance_miles,now() from move_v2.origin_search_placement c join move_v2.zcta_county_relationship z on z.county_geoid=c.county_geoid and z.state=c.state where c.origin_search_release_id=$1::uuid and c.zcta is null and (z.relationship_type='PRIMARY' or c.placement_reason='PROVIDER_EXPLICIT_COUNTY') on conflict do nothing`,
      [rid],
    );
    const counts = await c.query(
      `select count(*)::int total,count(*) filter(where zcta is null)::int county_rows,count(*) filter(where zcta is not null)::int zip_rows from move_v2.origin_search_placement where origin_search_release_id=$1`,
      [rid],
    );
    await c.query("commit");
    console.log(
      JSON.stringify({ idempotent: false, releaseId: rid, ...counts.rows[0] }),
    );
  } catch (e) {
    await c.query("rollback");
    throw e;
  } finally {
    await c.end();
  }
}
void main();
