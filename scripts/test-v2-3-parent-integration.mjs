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
assert.equal(head,'16252ef3a6d917bf3bbc0a73282780f750d88232');
// The reviewed parent implementation may advance; the immutable wire may not.
for(const file of ['lib/my-trusthub/profile-save/interface.ts','lib/my-trusthub/contracts/v2-3-profile-transfer.ts',
  'lib/my-trusthub/contracts/v2-3-profile-save.ts']) {
  const frozen=execFileSync('git',['show','26c4e9ed5c2d6ed8fbf3b3712516b7bbfdee3cd2:'+file],{cwd:root,encoding:'utf8'});
  const current=execFileSync('git',['show',head+':'+file],{cwd:root,encoding:'utf8'});
  assert.equal(current,frozen,'Immutable specialist contract drift: '+file);
}
const load=path=>import(pathToFileURL(resolve(root,path)).href);
const {ParentProfileSaveRuntime}=await load('lib/my-trusthub/profile-save/runtime.ts');
const {handleProfileSave}=await load('lib/my-trusthub/profile-save/http.ts');
const {handleProfileConfirmation,PROFILE_CONFIRM_PATH}=await load('lib/my-trusthub/profile-save/browser.ts');
const {SqliteHarnessBackend}=await load('scripts/qa/v23-sqlite-backend.ts');
const {profileKey}=await load('lib/my-trusthub/contracts/v2-3-profile-transfer.ts');
const temp=mkdtempSync(join(tmpdir(),'move-v23-crossrepo-'));
const parentBackend=new SqliteHarnessBackend(join(temp,'parent.sqlite'));
const source=new DatabaseSync(join(temp,'source.sqlite'));
source.exec('CREATE TABLE stages(key TEXT PRIMARY KEY,value TEXT NOT NULL)');
source.exec('CREATE TABLE confirmations(key TEXT PRIMARY KEY,value TEXT NOT NULL)');
const slug='hindman-isaacs-moving-storage-inc', profile={hub:'move',nativeId:'usdot-1002530',profileClass:'mover'};
const trusted={...profile,published:true,supportedClass:true,binding:{id:'synthetic-binding',networkEntityId:'synthetic-network',status:'accepted'}};
parentBackend.profiles.set(profileKey(profile),trusted);
const backend={rateLimit:(...args)=>parentBackend.rateLimit(...args),transaction:work=>parentBackend.transaction(tx=>work({
  ...tx,resolveReturnTask:async p=>profileKey(p)===profileKey(profile)?{kind:'profile',hub:'move',canonicalSlug:slug,profile}:null}))};
const config={enabled:true,environment:'isolated',verifiedIsolatedPair:true,moveOrigin:'http://127.0.0.1:4321',parentOrigin:'http://127.0.0.1:4322',parentFormPath:'/my/profile-save'};
const browser={binding:'b'.repeat(43),csrfVerified:true,origin:config.moveOrigin,environment:'isolated'};
let subject=null,confirmedTransferRef,confirmedAccountContextRef,grant=null,loseResponse=true,exchange='fixture-once',clock=Date.now(),recovery;
const caller=()=>({hub:'move',environment:'isolated',browserBinding:browser.binding,scopes:['transfer:stage','saved:write','receipt:verify'],
  ...(subject?{parent:{subject,sessionBinding:'fixture-session-'+subject,admitted:true},exchange,selectionConfirmed:true,confirmedTransferRef,confirmedAccountContextRef,receiptRecovery:recovery}:{})});
const parentRuntime=new ParentProfileSaveRuntime({enabled:true,backend,registry:{environment:'isolated',isolatedBackendVerified:true,
  origins:{move:config.moveOrigin,insurance:'https://insurance.test',lender:'https://lender.test'}},authenticate:async()=>caller(),now:()=>clock});
const parent=parentFacade(config,{async post(url,envelope,binding){
  recovery = recovery ? {accountContextRef:envelope.input.accountContextRef,requestKey:envelope.input.requestKey,verifiedAt:clock} : undefined;
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
const adapter=new MoveProfileSaveAdapter({config,store,parent,now:()=>clock,
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
  // Current parent browser POST + explicit confirmation; same source request prefix.
  subject=null;grant=null;exchange='fixture-form-once';
  const formStart=await adapter.prepare(selected,browser);assert.equal(formStart.state,'continue');
  const formStage=JSON.parse(source.prepare('SELECT value FROM stages WHERE key=?').get(createHash('sha256').update(formStart.ticket).digest('hex')).value);
  const browserBindings={origin:config.parentOrigin,registry:parentRuntime.options.registry,now:()=>clock,
    source:async(request,ref)=>ref===formStage.continuationRef?{
      continuationRef:ref,transferRef:formStage.parentStage.transferRef,manifest:formStage.manifest,
      manifestDigest:formStage.parentStage.manifestDigest,browserProof:browser.binding,expiresAt:formStage.expiresAt,requestPrefix:formStage.requestPrefix}:null,
    parent:async()=>subject?{subject,session:'fixture-session-'+subject,label:'Isolated fixture account'}:null,
    projects:async()=>[],
    store:{put:async(key,value)=>{source.prepare('INSERT INTO confirmations VALUES(?,?)').run(key,JSON.stringify(value));},
      withRecord:async(key,work)=>{const row=source.prepare('SELECT value FROM confirmations WHERE key=?').get(key);
        const value=row?JSON.parse(row.value):null;
        const checkpoint=async()=>{if(value)source.prepare('UPDATE confirmations SET value=? WHERE key=?').run(JSON.stringify(value),key);};
        const result=await work(value,checkpoint);await checkpoint();return result;}},
    runtime:async(request,c)=>{confirmedTransferRef=c.source.transferRef;confirmedAccountContextRef=c.contextCandidateRef;return parentRuntime;},
    acknowledge:async(snapshot,receipts)=>{
      assert.equal(snapshot.requestPrefix,formStage.requestPrefix);
      assert.equal(receipts[0].requestKey,formStage.requestPrefix+':0');
      grant={accountContextRef:receipts[0].accountContextRef,selectionConfirmed:true};
      formStage.accountContextRef=grant.accountContextRef;
      source.prepare('UPDATE stages SET value=? WHERE key=?').run(JSON.stringify(formStage),createHash('sha256').update(formStart.ticket).digest('hex'));
    }};
  const initial=await handleProfileConfirmation(new Request(formStart.target,{method:'POST',headers:{origin:config.moveOrigin,
    'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams(formStart.fields)}),browserBindings);
  assert.equal(initial.status,303);assert.equal(initial.headers.get('location'),PROFILE_CONFIRM_PATH);
  const cookie=initial.headers.get('set-cookie').split(';')[0];
  const get=()=>handleProfileConfirmation(new Request(formStart.target,{headers:{cookie}}),browserBindings);
  assert.match(await (await get()).text(),/Sign in to continue/);
  assert.equal(parentBackend.count('saves'),1);
  subject='fixture-consumer-a';const confirmation=await (await get()).text();
  assert.match(confirmation,/Save these selected profiles/);
  const csrf=confirmation.match(/name="csrf" value="([^"]+)"/)[1];
  const confirmed=await handleProfileConfirmation(new Request(formStart.target,{method:'POST',headers:{cookie,origin:config.parentOrigin,
    'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({csrf,confirm:'yes'})}),browserBindings);
  assert.match(await confirmed.text(),/Saved to My TrustHub/);
  assert.equal((await adapter.finish(formStart.ticket,selected,browser)).state,'parent_saved');
  clock+=20*60000;
  assert.notEqual((await adapter.finish(formStart.ticket,selected,browser)).state,'parent_saved','expired grant is not success');
  recovery={}; // MOCKED fresh verified owner reauthentication, attached outside wire JSON.
  assert.equal((await adapter.finish(formStart.ticket,selected,browser)).state,'parent_saved','receipt-only recovery after grant expiry');
  subject='fixture-consumer-b';assert.notEqual((await adapter.finish(formStart.ticket,selected,browser)).state,'parent_saved');
  assert.equal(parentBackend.count('saves'),1);assert.equal(JSON.stringify(local),before);
  console.log('PASS current /my/profile-save form -> sign-in gate -> explicit confirmation -> source request mapping -> receipt verify -> expired-grant deny -> fresh same-owner receipt recovery. Actual parent handlers; Auth/source channel MOCKED.');
  console.log('PASS cross-repository adapter -> actual parent HTTP/runtime -> durable SQLite receipt -> lost-response lookup -> duplicate retry -> owner-switch denial. Auth/P13/P12/binding MOCKED; NOT real provider or live parent sync. Parent '+head);
}finally{source.close();parentBackend.close();}
