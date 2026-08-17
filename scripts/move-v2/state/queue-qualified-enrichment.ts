import { Client } from "pg";
import { databaseUrl, ssl } from "../db/connection";

async function main() {
  const c = new Client({ connectionString: databaseUrl(), ssl }); await c.connect();
  const result = await c.query(`insert into move_v2.enrichment_queue(provider_id,wave,sample_groups,priority,status)
    select provider_id,'STATE_004B',array[state,eligibility],10,
      case when exists(select 1 from move_v2.google_place_match g where g.provider_id=e.provider_id) then 'COMPLETED' else 'PENDING' end
    from move_v2.provider_local_eligibility e
    where e.superseded_at is null and e.state in ('NJ','FL') and e.eligibility in ('STATE_VERIFIED_LOCAL_MOVER','STATE_VERIFIED_MOVING_BROKER')
    on conflict(provider_id) do update set wave='STATE_004B',sample_groups=excluded.sample_groups,priority=excluded.priority,
      status=case when exists(select 1 from move_v2.google_place_match g where g.provider_id=excluded.provider_id) then 'COMPLETED' else 'PENDING' end
    returning provider_id,status`);
  console.log(JSON.stringify({queued:result.rowCount,pending:result.rows.filter((r)=>r.status==='PENDING').length,reusedOrExisting:result.rows.filter((r)=>r.status==='COMPLETED').length}));
  await c.end();
}
void main();
