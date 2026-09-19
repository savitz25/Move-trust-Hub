/** Cross-repository actual Move adapter + actual Ask HTTP/runtime, disk SQLite.
 * PARENT_REVIEW_ROOT must be exact immutable Ask checkout. Auth/P13/P12 and
 * accepted network binding are MOCKED. No real account, hosted DB or credentials.
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { resolve, join } from 'node:path';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { MoveProfileSaveAdapter } from '../lib/my-trusthub/profile-save-adapter.ts';
import { parentFacade } from '../lib/my-trusthub/parent-facade.ts';
import { projection } from '../lib/my-trusthub/selection.ts';
const root=process.env.PARENT_REVIEW_ROOT;
if(!root)throw Error('PARENT_REVIEW_ROOT required');
const head=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
assert.equal(head,'2e7a467ec8b0f959a7a77dfbde64956b23fc2322');
const load=path=>import(pathToFileURL(resolve(root,path)).href);
const {ParentProfileSaveRuntime}=await load('lib/my-trusthub/profile-save/runtime.ts');
const {handleProfileSave}=await load('lib/my-trusthub/profile-save/http.ts');
const {SqliteHarnessBackend}=await load('scripts/qa/v23-sqlite-backend.ts');
const {profileKey}=await load('lib/my-trusthub/contracts/v2-3-profile-transfer.ts');
const temp=mkdtempSync(join(tmpdir(),'move-v23-crossrepo-'));
const parentBackend=new SqliteHarnessBackend(join(temp,'parent.sqlite'));
const source=new DatabaseSync(join(temp,'source.sqlite'));
source.exec('CREATE TABLE stages(key TEXT PRIMARY KEY,value TEXT NOT NULL)');
const slug='hindman-isaacs-moving-storage-inc', profile={hub:'move',nativeId:'usdot-1002530',profileClass:'mover'};
const trusted={...profile,published:true,supportedClass:true,binding:{id:'synthetic-binding',networkEntityId:'synthetic-network',status:'accepted'}};
parentBackend.profiles.set(profileKey(profile),trusted);
const backend={rateLimit:(...args)=>parentBackend.rateLimit(...args),transaction:work=>parentBackend.transaction(tx=>work({
  ...tx,resolveReturnTask:async p=>profileKey(p)===profileKey(profile)?{kind:'profile',hub:'move',canonicalSlug:slug,profile}:null}))};
const config={enabled:true,environment:'isolated',verifiedIsolatedPair:true,moveOrigin:'http://127.0.0.1:4321',parentOrigin:'http://127.0.0.1:4322',parentFormPath:'/fixture-only-confirm'};
const browser={binding:'b'.repeat(43),csrfVerified:true,origin:config.moveOrigin,environment:'isolated'};
let subject=null,confirmedTransferRef,grant=null,loseResponse=true;
const caller=()=>({hub:'move',environment:'isolated',browserBinding:browser.binding,scopes:['transfer:stage','saved:write','receipt:verify'],
  ...(subject?{parent:{subject,sessionBinding:'fixture-session-'+subject,admitted:true},exchange:'fixture-once',selectionConfirmed:true,confirmedTransferRef}:{})});
const parentRuntime=new ParentProfileSaveRuntime({enabled:true,backend,registry:{environment:'isolated',isolatedBackendVerified:true,
  origins:{move:config.moveOrigin,insurance:'https://insurance.test',lender:'https://lender.test'}},authenticate:async()=>caller()});
const parent=parentFacade(config,{async post(url,envelope,binding){
  assert.equal(binding,browser);assert.equal(url,config.parentOrigin+'/api/my-trusthub/profile-save');
  const result=await handleProfileSave(new Request(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(envelope)}),
    {enabled:true,runtimeForRequest:async()=>parentRuntime});
  if(envelope.operation==='commitProfileSave' && loseResponse){loseResponse=false;throw Error('synthetic lost response after durable commit');}
  return result;
}});
const store={async putIfAbsent(key,record){source.prepare('INSERT INTO stages VALUES(?,?)').run(key,JSON.stringify(record));},
  async withRecord(key,work){source.exec('BEGIN IMMEDIATE');try{
    const row=source.prepare('SELECT value FROM stages WHERE key=?').get(key);const record=row?JSON.parse(row.value):null;
    const result=await work(record);if(record)source.prepare('UPDATE stages SET value=? WHERE key=?').run(JSON.stringify(record),key);
    source.exec('COMMIT');return result;
  }catch(e){source.exec('ROLLBACK');throw e;}}};
const adapter=new MoveProfileSaveAdapter({config,store,parent,now:Date.now,
  resolveExactPublished:async s=>s===slug?{id:profile.nativeId,slug,publicationState:'PUBLISHABLE',reviewedClass:'mover',binding:trusted.binding}:null,
  currentGrant:async()=>subject==='fixture-consumer-a'?grant:null});
const digest=createHash('sha256').update(projection(slug,'2026-09-19T00:00:00Z')).digest('hex');
const selected=[{companySlug:slug,savedAt:'2026-09-19T00:00:00Z',digest,revision:digest}];
const local=[{companySlug:slug,companyName:'Public fixture',savedAt:selected[0].savedAt,notes:'private local note'}];
const before=JSON.stringify(local);
try{
  const start=await adapter.prepare(selected,browser);assert.equal(start.state,'continue');
  assert.equal((await adapter.finish(start.ticket,selected,browser)).state,'unavailable','no fixture admission yet');
  const stage=JSON.parse(source.prepare('SELECT value FROM stages').get().value);
  subject='fixture-consumer-a';confirmedTransferRef=stage.parentStage.transferRef;
  for(const patch of [{issuer:'lender'},{audience:'other'},{browserProof:'x'.repeat(43)}]){
    assert.equal((await parent('consumeProfileSaveContinuation',{continuationRef:stage.continuationRef,issuer:'move',audience:'ask',browserProof:browser.binding,...patch},browser)).ok,false);
  }
  const consumed=await parent('consumeProfileSaveContinuation',{continuationRef:stage.continuationRef,issuer:'move',audience:'ask',browserProof:browser.binding},browser);
  assert.equal(consumed.ok,true);grant={accountContextRef:consumed.result.accountContextRef,selectionConfirmed:true};
  const replay=await parent('consumeProfileSaveContinuation',{continuationRef:stage.continuationRef,issuer:'move',audience:'ask',browserProof:browser.binding},browser);
  assert.equal(replay.ok,false);
  assert.equal((await adapter.finish(start.ticket,selected,browser)).state,'unavailable');assert.equal(parentBackend.count('saves'),1);
  assert.equal((await adapter.finish(start.ticket,selected,browser)).state,'parent_saved');assert.equal(parentBackend.count('saves'),1);
  assert.equal((await adapter.finish(start.ticket,selected,browser)).state,'parent_saved');
  subject='fixture-consumer-b';assert.notEqual((await adapter.finish(start.ticket,selected,browser)).state,'parent_saved');
  assert.equal(parentBackend.count('saves'),1);assert.equal(parentBackend.count('memberships'),0);assert.equal(JSON.stringify(local),before);
  console.log('PASS cross-repository adapter -> actual parent HTTP/runtime -> durable SQLite receipt -> lost-response lookup -> duplicate retry -> owner-switch denial. Auth/P13/P12/binding MOCKED; NOT real provider or live parent sync. Parent '+head);
}finally{source.close();parentBackend.close();}
