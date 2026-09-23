import assert from 'node:assert/strict';
import test from 'node:test';
import { createIsolatedSourcePool } from './source-pool';

const approved={sourceBackend:'fixture-isolated',databaseHost:'isolated.invalid',databaseName:'fixture',databaseUser:'source_login',sessionAffinity:'dedicated' as const};
const env={VERCEL_ENV:'preview',NODE_ENV:'production',MTH_MOVE_PARENT_SAVE_MODE:'isolated',MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED:'true',
  MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND:'fixture-isolated',MTH_MOVE_PARENT_SAVE_DATABASE_URL:'postgresql://source_login@isolated.invalid/fixture',
  MTH_MOVE_PARENT_SAVE_DATABASE_CA:'FIXTURE NOT A CERTIFICATE'};

test('S09 lazy source pool requires exact approved isolated target; no connection attempted',async()=>{
  const pool=createIsolatedSourcePool(env,approved);assert.ok(pool);await pool.end();
  for(const patch of [{VERCEL_ENV:'production'},{VERCEL_ENV:undefined},{MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED:'false'},
    {MTH_MOVE_PARENT_SAVE_DATABASE_CA:undefined},{MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND:'other'},
    {MTH_MOVE_PARENT_SAVE_DATABASE_URL:env.MTH_MOVE_PARENT_SAVE_DATABASE_URL+'?sslmode=disable'},
    {MTH_MOVE_PARENT_SAVE_DATABASE_URL:'postgresql://source_login@other.invalid/fixture'},
    {MTH_MOVE_PARENT_SAVE_DATABASE_URL:'postgresql://source_login@isolated.invalid/other'},
    {MTH_MOVE_PARENT_SAVE_DATABASE_URL:'postgresql://source_login:tzzcogaricohtezsugjr@isolated.invalid/fixture'},
    {MTH_MOVE_PARENT_SAVE_DATABASE_URL:'postgresql://source_login:qvvxvbcdmbjzrgvwjatw@isolated.invalid/fixture'},
    {MTH_MOVE_PARENT_SAVE_DATABASE_URL:'postgresql://source_login:arepfylnilkjmyduhwbz@isolated.invalid/fixture'}])
    assert.equal(createIsolatedSourcePool({...env,...patch},approved),null);
  for(const databaseUser of ['postgres','service_role','supabase_admin'])
    assert.equal(createIsolatedSourcePool({...env,MTH_MOVE_PARENT_SAVE_DATABASE_URL:`postgresql://${databaseUser}@isolated.invalid/fixture`},
      {...approved,databaseUser}),null);
});
