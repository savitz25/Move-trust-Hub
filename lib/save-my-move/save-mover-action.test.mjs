import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { runInNewContext } from 'node:vm';

// Exercise the actual server action against isolated in-memory adapters.
const mocks = {
  'next/cache': 'export function revalidatePath() {}',
  '@/lib/save-my-move/auth': 'export async function getAuthenticatedUser(){return state.user}; export const requireAuthenticatedUser=getAuthenticatedUser;',
  '@/lib/supabase/server': `export async function createClient(){state.clients++;return {from(table){state.table=table;return {
    upsert(row,options){state.rows.push({row,options});return {select(){return {async single(){return {data:{id:'fixture-save'},error:null}}}}}}
  }}}}`,
  '@/lib/save-my-move/ensure-user-profile': 'export async function ensureUserProfile(){state.profiles++}',
  '@/lib/save-my-move/activity-log': 'export async function logMyMoveActivity(){state.activities++}',
};
const result = await build({
  stdin: { contents: "export { saveMoverAction } from './actions/save-my-move';", resolveDir: process.cwd() },
  bundle: true, write: false, format: 'cjs', platform: 'node',
  plugins: [{name:'mocked-backend',setup(builder){
    builder.onResolve({filter:/.*/},args=>mocks[args.path]?{path:args.path,namespace:'mock'}:null);
    builder.onLoad({filter:/.*/,namespace:'mock'},args=>({contents:mocks[args.path],loader:'js'}));
  }}],
});
function fixture(id) {
  const state={user:id?{id}:null,clients:0,profiles:0,activities:0,rows:[],table:null};
  const module={exports:{}};
  runInNewContext(result.outputFiles[0].text,{module,exports:module.exports,state,console});
  return {state,save:module.exports.saveMoverAction};
}
test('B3-06 mocked: authenticated action retains saved_movers owner/slug/upsert contract',async()=>{
  const {state,save}=fixture('owner-a');
  const result=await save({companySlug:'b3-test-mover',expectedUserId:'owner-a'});
  assert.equal(result.cloud,true);
  assert.equal(state.table,'saved_movers');
  assert.equal(state.rows.length,1);
  assert.equal(state.rows[0].row.user_id,'owner-a');
  assert.equal(state.rows[0].row.company_slug,'b3-test-mover');
  assert.equal(state.rows[0].options.onConflict,'user_id,company_slug');
  assert.equal(state.activities,1);
});
test('B3-07/B3-10 mocked: changed server owner rejects before any mutation',async()=>{
  const {state,save}=fixture('owner-b');
  const result=await save({companySlug:'b3-test-mover',expectedUserId:'owner-a'});
  assert.equal(result.code,'SESSION_CHANGED');
  assert.equal(state.clients+state.profiles+state.activities+state.rows.length,0);
});
test('B3-06 mocked: existing callers without an owner hint retain server authorization',async()=>{
  const {state,save}=fixture('legacy-owner');
  assert.equal((await save({companySlug:'b3-test-mover'})).cloud,true);
  assert.equal(state.rows[0].row.user_id,'legacy-owner');
});
test('B3-10 mocked: no server session creates no profile or saved row',async()=>{
  const {state,save}=fixture(null);
  assert.equal((await save({companySlug:'b3-test-mover',expectedUserId:'old-owner'})).code,'NO_SESSION');
  assert.equal(state.clients+state.profiles+state.activities+state.rows.length,0);
});
