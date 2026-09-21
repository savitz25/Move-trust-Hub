import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { MoveProfileSaveAdapter, mapMoveProfile, type Dependencies, type TransferRecord, type BrowserBinding, type CurrentGrant } from './profile-save-adapter';
import { projection } from './selection';
import { manifestDigest, validateProfileReturn, type ItemReceipt, type GuestStageInput, type CommitInput } from './vendor/v2-3-profile-transfer';
import type { Operation, RequestFor, ResponseFor } from './vendor/interface';
import { PROFILE_SAVE_ENDPOINT, PROFILE_SAVE_RUNTIME_VERSION } from './vendor/interface';
import { handleMoveProfileSave } from './profile-save-http';
import { parentFacade } from './parent-facade';
const ref=(c:string)=>c.repeat(43), slug='hindman-isaacs-moving-storage-inc';
const hash=(value:string)=>createHash('sha256').update(value).digest('hex');
function selection(s=slug,time='2026-09-19T00:00:00.000Z') {const digest=hash(projection(s,time));return [{companySlug:s,savedAt:time,revision:digest,digest}];}
const browser:BrowserBinding={binding:ref('b'),csrfVerified:true,origin:'http://127.0.0.1:4321',environment:'isolated'};
function fixture() {
  const records=new Map<string,TransferRecord>(),receipts=new Map<string,ItemReceipt>(),calls:Operation[]=[];
  let now=1000,grant:CurrentGrant|null={accountContextRef:ref('a'),selectionConfirmed:true};
  let projectFail=false,loseCommit=false,forge=false,switchOnVerify=false,failSecond=false;
  const deps:Dependencies={
    config:{enabled:true,environment:'isolated',verifiedIsolatedPair:true,moveOrigin:browser.origin,parentOrigin:'http://127.0.0.1:4322',parentFormPath:'/mock-parent-confirm'},
    store:{async putIfAbsent(k,r){assert.equal(records.has(k),false);records.set(k,structuredClone(r));},async withRecord(k,fn){return fn(records.get(k)??null);}},
    // Public ID/slug observed read-only; accepted binding BELOW IS SYNTHETIC, not live.
    resolveExactPublished:async s=>({id:s===slug?'usdot-1002530':'fixture-native-2',slug:s,publicationState:'PUBLISHABLE',reviewedClass:'mover',binding:{id:'fixture-binding',networkEntityId:'fixture-network',status:'accepted'}}),
    currentGrant:async()=>grant,now:()=>now,
    parent:async <K extends Operation>(operation:K,input:RequestFor<K>['input']):Promise<ResponseFor<K>>=>{
      calls.push(operation);let result:unknown;
      if(operation==='prepareGuestProfileTransfer') result={transferRef:ref('t'),manifestDigest:manifestDigest(input as GuestStageInput),expiresAt:now+600_000};
      else if(operation==='prepareProfileSaveContinuation')result={continuationRef:ref('c'),expiresAt:now+600_000};
      else if(operation==='getProfileSaveReceipt')result=receipts.get((input as CommitInput).requestKey)??null;
      else if(operation==='commitProfileSave'){
        const value=input as CommitInput;
        if(failSecond && value.item.localItemId==='second')throw Error('mock partial failure');
        const receipt:ItemReceipt={receiptRef:ref('r'),requestKey:value.requestKey,accountContextRef:value.accountContextRef,
          manifestDigest:value.manifestDigest,item:value.item,parent:{outcome:receipts.size?'already_saved':'saved',savedRef:ref('s')},
          project:value.projectRef?{outcome:projectFail?'failed':'added',projectRef:value.projectRef}:{outcome:'not_requested'},localCopy:'keep'};
        receipts.set(value.requestKey,structuredClone(receipt));if(loseCommit){loseCommit=false;throw Error('lost response');}result=receipt;
      }else if(operation==='verifyProfileSaveReceipt'){
        result=forge?{...receipts.get((input as CommitInput).requestKey),manifestDigest:'f'.repeat(64)}:receipts.get((input as CommitInput).requestKey)??null;
        if(switchOnVerify)grant={accountContextRef:ref('z'),selectionConfirmed:true};
      } else throw Error('Parent owns authentication consumption, not specialist');
      return {ok:true,operation,result} as ResponseFor<K>;
    },
  };
  const adapter=new MoveProfileSaveAdapter(deps);
  const start=async(selected=selection())=>{const r=await adapter.prepare(selected,browser);assert.equal(r.state,'continue');if(r.state!=='continue')throw Error('stage');return r;};
  return {adapter,deps,records,receipts,calls,start,setNow:(n:number)=>now=n,
    setGrant:(v:CurrentGrant|null)=>grant=v,projectFail:()=>projectFail=true,lose:()=>loseCommit=true,forge:()=>forge=true,
    switchOnVerify:()=>switchOnVerify=true,failSecond:(v:boolean)=>failSecond=v};
}
test('exact native identity and published profile; slug is not the binding',async()=>{
  const f=fixture(),r=await f.start();const record=[...f.records.values()][0]!;
  assert.equal(record.manifest.selected[0]!.profile.nativeId,'usdot-1002530');
  assert.equal(record.manifest.selected[0]!.localItemId,slug);
  assert.equal(record.manifest.selected[0]!.profile.profileClass,'mover');
  assert.equal(record.browserHash,hash(browser.binding));assert.equal(f.records.has(hash(r.ticket)),true);
  assert.equal(r.target,'http://127.0.0.1:4322/mock-parent-confirm');
  assert.equal(r.target.includes(r.fields.continuationRef),false);
  assert.equal(JSON.stringify(record).includes('notes'),false);
  assert.equal(mapMoveProfile('fuzzy-alias',await f.deps.resolveExactPublished(slug)),null);
});
test('unbound, unsupported and unpublished profiles fail closed without parent mutation',async()=>{
  for(const [patch,capability] of [
    [{binding:null},'SAVE_LOCAL_ONLY'],[{binding:{id:'r',networkEntityId:'n',status:'review_required'}},'IDENTITY_REVIEW_REQUIRED'],
    [{reviewedClass:'auto_carrier'},'UNSUPPORTED_CLASS'],[{publicationState:'INGESTED'},'PROFILE_NOT_PUBLISHED'],
  ] as const){const f=fixture(),row=await f.deps.resolveExactPublished(slug);f.deps.resolveExactPublished=async()=>({...row!,...patch});
    assert.deepEqual(await f.adapter.prepare(selection(),browser),{state:'local_only',capability,localCopy:'keep'});assert.equal(f.calls.length,0);}
});
test('strict selections reject extra/forged identity/notes, missing fields, oversize and digest tamper',async()=>{
  for(const bad of [[{...selection()[0],consumerId:'attacker'}],[{...selection()[0],notes:'private'}],
    [{companySlug:slug}],Array.from({length:51},(_,i)=>selection('x'+i)[0]),[{...selection()[0],digest:'f'.repeat(64),revision:'f'.repeat(64)}]]){
    const f=fixture();assert.equal((await f.adapter.prepare(bad,browser)).state,'invalid');assert.equal(f.calls.length,0);}
});
test('production/unknown pair/absent parent browser route remain unavailable',async()=>{
  for(const patch of [{enabled:false},{environment:'production' as const},{verifiedIsolatedPair:false},
    {parentOrigin:'https://www.asktrusthub.com'},{parentOrigin:'https://asktrusthub.com.'},{parentFormPath:null},{parentFormPath:'//evil.test'}]){
    const f=fixture();Object.assign(f.deps.config,patch);assert.equal((await f.adapter.prepare(selection(),browser)).state,'unavailable');assert.equal(f.calls.length,0);}
});
test('expired stage, wrong browser, stale item and forged completion cannot save',async()=>{
  const f=fixture(),r=await f.start();
  assert.equal((await f.adapter.finish(r.ticket,selection(),{...browser,binding:ref('x')})).state,'invalid');
  assert.equal((await f.adapter.finish(r.ticket,selection(slug,'2026-09-20'),browser)).state,'invalid');
  assert.equal((await f.adapter.finish('saved=1',selection(),browser)).state,'invalid');
  f.setNow(700_000);assert.equal((await f.adapter.finish(r.ticket,selection(),browser)).state,'expired');assert.equal(f.receipts.size,0);
});
test('exact durable Save, duplicate retry and bounded safe return; zero Watch surface',async()=>{
  const f=fixture(),r=await f.start();
  assert.deepEqual(await f.adapter.finish(r.ticket,selection(),browser),{state:'parent_saved',projectFailed:false,returnPath:'/companies/'+slug,localCopy:'keep'});
  assert.equal((await f.adapter.finish(r.ticket,selection(),browser)).state,'parent_saved');
  assert.equal(f.calls.filter(v=>v==='commitProfileSave').length,1);
  assert.equal(f.calls.some(v=>/watch|alert|signup|project/i.test(v)),false);assert.equal(f.records.size,1);
});
test('Save + Project failure retains Save/local copy; optional Project is bound separately',async()=>{
  const f=fixture();f.setGrant({accountContextRef:ref('a'),selectionConfirmed:true,projectRef:ref('p')});f.projectFail();const r=await f.start();
  assert.equal((await f.adapter.finish(r.ticket,selection(),browser) as {projectFailed:boolean}).projectFailed,true);
  assert.equal(f.receipts.size,1);f.setGrant({accountContextRef:ref('a'),selectionConfirmed:true,projectRef:ref('q')});
  assert.equal((await f.adapter.finish(r.ticket,selection(),browser)).state,'account_changed');
});
test('already Saved with new Project gets one bounded membership result',async()=>{
  const f=fixture(),first=await f.start();await f.adapter.finish(first.ticket,selection(),browser);
  f.setGrant({accountContextRef:ref('a'),selectionConfirmed:true,projectRef:ref('p')});const next=await f.start();
  assert.equal((await f.adapter.finish(next.ticket,selection(),browser)).state,'parent_saved');
  const receipt=[...f.receipts.values()][1]!;assert.equal(receipt.parent.outcome,'already_saved');assert.equal(receipt.project.outcome,'added');
});
test('lost response lookup succeeds after expiry without duplicate parent mutation',async()=>{
  const f=fixture(),r=await f.start();f.lose();assert.equal((await f.adapter.finish(r.ticket,selection(),browser)).state,'unavailable');
  f.setNow(900_000);assert.equal((await f.adapter.finish(r.ticket,selection(),browser)).state,'parent_saved');
  assert.equal(f.calls.filter(v=>v==='commitProfileSave').length,1);
});
test('account switch before retry or during receipt verification never confirms',async()=>{
  const f=fixture(),r=await f.start();f.lose();await f.adapter.finish(r.ticket,selection(),browser);
  f.setGrant({accountContextRef:ref('z'),selectionConfirmed:true});assert.equal((await f.adapter.finish(r.ticket,selection(),browser)).state,'account_changed');
  const g=fixture(),s=await g.start();g.switchOnVerify();assert.equal((await g.adapter.finish(s.ticket,selection(),browser)).state,'account_changed');
});
test('forged receipt, no parent approval and changed publication cannot produce success',async()=>{
  const f=fixture(),r=await f.start();f.forge();assert.equal((await f.adapter.finish(r.ticket,selection(),browser)).state,'unavailable');
  const g=fixture(),s=await g.start();g.setGrant(null);assert.equal((await g.adapter.finish(s.ticket,selection(),browser)).state,'unavailable');assert.equal(g.receipts.size,0);
  const h=fixture(),t=await h.start(),row=await h.deps.resolveExactPublished(slug);h.deps.resolveExactPublished=async()=>({...row!,publicationState:'INACTIVE'});
  assert.equal((await h.adapter.finish(t.ticket,selection(),browser)).state,'local_only');assert.equal(h.receipts.size,0);
});
test('partial batch failure retains successful receipt and retries only missing item',async()=>{
  const f=fixture(),selected=[...selection(),...selection('second')],r=await f.start(selected);f.failSecond(true);
  assert.equal((await f.adapter.finish(r.ticket,selected,browser)).state,'unavailable');assert.equal(f.receipts.size,1);
  f.failSecond(false);assert.equal((await f.adapter.finish(r.ticket,selected,browser)).state,'parent_saved');assert.equal(f.receipts.size,2);
});
test('BFF enforces Origin, CSRF, body limit and rejects client context/extra fields',async()=>{
  const f=fixture(),deps={config:f.deps.config,adapter:f.adapter,allowRequest:async()=>true};
  const request=(body:unknown,extra:Record<string,string>={})=>new Request(browser.origin+'/api/my-trusthub/profile-save',{
    method:'POST',headers:{origin:browser.origin,'sec-fetch-site':'same-origin','content-type':'application/json',...extra},body:JSON.stringify(body)});
  const boot=await handleMoveProfileSave(request({action:'bootstrap'}),deps),{csrf}=await boot.json();
  const auth={'cookie':'mth_move_profile_transfer='+csrf,'x-mth-csrf':csrf};
  assert.match(boot.headers.get('set-cookie')!,/HttpOnly; SameSite=Strict/);
  assert.equal((await handleMoveProfileSave(request({action:'prepare',selected:selection()}),deps)).status,403);
  assert.equal((await handleMoveProfileSave(request({action:'prepare',selected:selection()},{...auth,origin:'https://evil.test'}),deps)).status,403);
  assert.equal((await handleMoveProfileSave(request({action:'prepare',selected:selection(),consumerId:'x'},auth),deps)).status,400);
  assert.equal((await handleMoveProfileSave(request({action:'prepare',selected:['x'.repeat(70_000)]},auth),deps)).status,503);
  assert.equal((await (await handleMoveProfileSave(request({action:'prepare',selected:selection()},auth),deps)).json()).state,'continue');
  assert.equal((await handleMoveProfileSave(request({action:'bootstrap'}),null)).status,503);
});
test('parent facade uses frozen route/envelope, no raw principal or URL payload',async()=>{
  const f=fixture();let count=0;
  const call=parentFacade(f.deps.config,{async post(url,envelope,bound){count++;
    assert.equal(url,f.deps.config.parentOrigin+PROFILE_SAVE_ENDPOINT);assert.equal(bound,browser);
    const value=envelope as {version:string;operation:string;input:unknown};assert.equal(value.version,PROFILE_SAVE_RUNTIME_VERSION);
    assert.deepEqual(Object.keys(value),['version','operation','input']);
    return Response.json({ok:true,operation:value.operation,result:null});}});
  assert.equal((await call('getProfileSaveReceipt',{requestKey:'fixture',accountContextRef:ref('a')},browser)).ok,true);assert.equal(count,1);
});
test('return is exact server profile and rejects traversal/external/encoded paths',()=>{
  const task={kind:'profile' as const,hub:'move' as const,canonicalSlug:slug,profile:{hub:'move' as const,nativeId:'usdot-1002530',profileClass:'mover'}};
  const registry={environment:'isolated' as const,isolatedBackendVerified:true,origins:{move:browser.origin,insurance:'https://insurance.test',lender:'https://lender.test'}};
  assert.equal(validateProfileReturn('/companies/'+slug,task,registry),browser.origin+'/companies/'+slug);
  for(const value of ['//evil.test','https://evil.test','/companies/../my','/companies/%2e%2e/my','/companies/%252e%252e/my','/companies/\\evil','/companies/other','/companies/'+slug+'?saved=1'])
    assert.equal(validateProfileReturn(value,task,registry),null);
});
test('missing class review is unresolved rather than guessed; saved UUID is allowed',async()=>{
  const f=fixture(),row=await f.deps.resolveExactPublished(slug);
  assert.equal(mapMoveProfile(slug,{...row!,reviewedClass:null}),null);
  const r=await f.start();await f.adapter.finish(r.ticket,selection(),browser);
  [...f.receipts.values()][0]!.parent.savedRef='12345678-1234-4234-8234-123456789abc';
  assert.equal((await f.adapter.finish(r.ticket,selection(),browser)).state,'parent_saved');
});

test('source checkpoint precedes any parent receipt/commit; persistence failure cannot write parent',async()=>{
  const f=fixture(),start=await f.start();let checkpointed=false;
  f.deps.store.withRecord=async(k,work)=>work(f.records.get(k)??null,async()=>{checkpointed=true;});
  const parent=f.deps.parent;
  f.deps.parent=async(op,input,bound)=>{assert.equal(checkpointed,true);return parent(op,input,bound);};
  assert.equal((await f.adapter.finish(start.ticket,selection(),browser)).state,'parent_saved');
  const g=fixture(),other=await g.start();
  g.deps.store.withRecord=async(k,work)=>work(g.records.get(k)??null,async()=>{throw Error('source checkpoint failed');});
  assert.equal((await g.adapter.finish(other.ticket,selection(),browser)).state,'unavailable');
  assert.equal(g.calls.includes('commitProfileSave'),false);
});

test('browser cannot submit parent consumer UUID, Saved reference, Project or return destination',async()=>{
  const f=fixture();const deps={config:f.deps.config,adapter:f.adapter,allowRequest:async()=>true};
  for(const extra of [{consumerUUID:'12345678-1234-4234-8234-123456789abc'},{savedRef:ref('s')},{projectRef:ref('p')},{returnUrl:'https://evil.test'}]){
    const response=await handleMoveProfileSave(new Request(browser.origin+'/api/my-trusthub/profile-save',{
      method:'POST',headers:{origin:browser.origin,'sec-fetch-site':'same-origin','content-type':'application/json',
      cookie:'mth_move_profile_transfer='+browser.binding,'x-mth-csrf':browser.binding},
      body:JSON.stringify({action:'prepare',selected:selection(),...extra})}),deps);
    assert.equal(response.status,400);
  }
  assert.equal(f.calls.length,0);
});
