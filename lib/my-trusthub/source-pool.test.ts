import test from 'node:test';
import assert from 'node:assert/strict';
import { sourceTarget, createIsolatedSourcePool } from './source-pool';
import { MOVE_ORIGIN, ASK_ORIGIN } from './config';
const env={VERCEL_ENV:'preview',MTH_MOVE_PARENT_SAVE_MODE:'isolated',NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED:'1',NEXT_PUBLIC_MOVE_V23_LOCAL_ONLY:'1',
  MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED:'true',MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN:MOVE_ORIGIN,MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN:ASK_ORIGIN,
  MTH_MOVE_SOURCE_PACKET_APPROVED:'true',MTH_MOVE_SOURCE_DATABASE_MODE:'DIRECT',MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND:'xxxxxxxxxxxxxxxxxxxx',MTH_MOVE_SOURCE_DATABASE_HOST:'db.xxxxxxxxxxxxxxxxxxxx.supabase.co'};
test('source target requires separately reviewed metadata and rejects production',()=>{
  assert.equal(sourceTarget({}),null);assert.equal(sourceTarget({...env,VERCEL_ENV:'production'}),null);
  for(const backend of ['arepfylnilkjmyduhwbz','qvvxvbcdmbjzrgvwjatw'])assert.equal(sourceTarget({...env,MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND:backend,MTH_MOVE_SOURCE_DATABASE_HOST:'db.'+backend+'.supabase.co'}),null);
  assert.equal(sourceTarget({...env,MTH_MOVE_SOURCE_PACKET_APPROVED:'false'}),null);
});
test('Supavisor requires a pinned session endpoint and separate Move parity approval',async()=>{
  const session={...env,MTH_MOVE_SOURCE_DATABASE_MODE:'SUPAVISOR_SESSION',MTH_MOVE_SOURCE_DATABASE_HOST:'aws-0-fixture.pooler.supabase.com'};
  assert.equal(sourceTarget(session),null);
  const approved={...session,MTH_MOVE_SOURCE_SESSION_PARITY_APPROVED:'true'};
  const target=sourceTarget(approved);assert.ok(target);
  assert.equal(target.connectionUser,'mth_move_profile_transfer_preview.xxxxxxxxxxxxxxxxxxxx');
  assert.equal(sourceTarget({...approved,MTH_MOVE_SOURCE_DATABASE_HOST:'evil.test'}),null);
  assert.equal(sourceTarget({...approved,MTH_MOVE_SOURCE_DATABASE_MODE:'TRANSACTION'}),null);
  for(const port of [6543,443])assert.equal(createIsolatedSourcePool({...approved,MTH_MOVE_PARENT_SAVE_DATABASE_CA:'TEST_ONLY',
    MTH_MOVE_PARENT_SAVE_DATABASE_URL:`postgres://${target.connectionUser}:fixture@${target.host}:${port}/postgres`},target),null);
  const pool=createIsolatedSourcePool({...approved,MTH_MOVE_PARENT_SAVE_DATABASE_CA:'TEST_ONLY',
    MTH_MOVE_PARENT_SAVE_DATABASE_URL:`postgres://${target.connectionUser}:fixture@${target.host}:5432/postgres`},target);
  assert.ok(pool);await pool.end(); // Constructor only, no hosted connection.
});
test('source pool cannot use parent/service-role login or transaction pooler',()=>{
  const target=sourceTarget(env);assert.ok(target);
  for(const databaseUrl of [
    'postgres://postgres:fixture@db.xxxxxxxxxxxxxxxxxxxx.supabase.co:5432/postgres',
    'postgres://myth_v23_parent_preview:fixture@db.xxxxxxxxxxxxxxxxxxxx.supabase.co:5432/postgres',
    'postgres://service_role:fixture@db.xxxxxxxxxxxxxxxxxxxx.supabase.co:5432/postgres',
    'postgres://mth_move_profile_transfer_preview:fixture@db.xxxxxxxxxxxxxxxxxxxx.supabase.co:6543/postgres',
    'postgres://mth_move_profile_transfer_preview:fixture@aws-0-fixture.pooler.supabase.com:5432/postgres',
  ])assert.equal(createIsolatedSourcePool({...env,MTH_MOVE_PARENT_SAVE_DATABASE_URL:databaseUrl,MTH_MOVE_PARENT_SAVE_DATABASE_CA:'TEST_ONLY'},target),null);
});
