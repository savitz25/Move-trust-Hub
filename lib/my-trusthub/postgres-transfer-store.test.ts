import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { PostgresTransferStore, validTransferRecord, type SourceConnection } from './postgres-transfer-store';
import { createIsolatedMoveRuntime, isolatedConfig, PARENT_FORM_PATH, type IsolatedMovePorts } from './isolated-runtime';
import { TRANSFER_VERSION, manifestDigest, type GuestStageInput } from './vendor/v2-3-profile-transfer';
import type { TransferRecord } from './profile-save-adapter';
import { handleSourceCallback, SOURCE_CALLBACK_PATH } from './source-callback-http';
const ref=(c:string)=>c.repeat(43), hash=(s:string)=>createHash('sha256').update(s).digest('hex');
const manifest:GuestStageInput={version:TRANSFER_VERSION,sourceHub:'move',audience:'ask',selected:[{
  localItemId:'hindman-isaacs-moving-storage-inc',revision:'a'.repeat(64),digest:'a'.repeat(64),
  profile:{hub:'move',nativeId:'usdot-1002530',profileClass:'mover'}}],returnTask:{kind:'profile',hub:'move',
  canonicalSlug:'hindman-isaacs-moving-storage-inc',profile:{hub:'move',nativeId:'usdot-1002530',profileClass:'mover'}}};
const record=():TransferRecord=>({browserHash:hash(ref('b')),manifest,parentStage:{transferRef:ref('t'),manifestDigest:manifestDigest(manifest),expiresAt:500000},
  continuationRef:ref('c'),requestPrefix:ref('r'),expiresAt:500000});
function sqlFixture(){
  let saved:TransferRecord|null=null,locked=false,released=0,unlockFail=false;
  const queries:string[]=[];
  const db:SourceConnection={async query<T>(sql:string,args:unknown[]=[]){
    queries.push(sql);let rows:unknown[]=[];
    if(sql.includes('pg_try_advisory_lock')){rows=[{locked:!locked}];locked=true;}
    else if(sql.includes('pg_advisory_unlock')){if(unlockFail)throw Error('lost connection');locked=false;}
    else if(sql.startsWith('insert into mth_profile_transfer.stages')){if(saved)throw Error('unique violation');saved=JSON.parse(args[3] as string);}
    else if(sql.startsWith('select record'))rows=saved?[{record:structuredClone(saved)}]:[];
    else if(sql.startsWith('update mth_profile_transfer.stages')){saved=JSON.parse(args[1] as string);rows=[{ticket_hash:args[0]}];}
    else if(sql.startsWith('select ticket_hash'))rows=saved?[{ticket_hash:hash(ref('x'))}]:[];
    else if(sql.includes('returning count'))rows=[{count:31}];
    return {rows:rows as T[]};
  },release(destroy){released++;if(unlockFail)assert.equal(destroy,true);}};
  const pool={connect:async()=>db},store=new PostgresTransferStore(pool,'dedicated',()=>1000);
  return {store,pool,queries,get saved(){return saved;},get released(){return released;},lock:()=>locked=true,failUnlock:()=>unlockFail=true};
}
test('S01 closed bounded source projection rejects identity, notes, tool data and malformed records',()=>{
  assert.equal(validTransferRecord(record()),true);
  for(const patch of [{consumerUUID:ref('a')},{notes:'private'},{accountContextRef:'raw-id'},{projectRef:ref('p')},
    {manifest:{...manifest,notes:'private'}},{parentStage:{...record().parentStage,manifestDigest:'b'.repeat(64)}}])
    assert.equal(validTransferRecord({...record(),...patch}),false);
});
test('S02 atomic insert, checkpoint survives lost response, retry sees same context (MOCKED PostgreSQL)',async()=>{
  const f=sqlFixture();await f.store.putIfAbsent(hash(ref('x')),record());
  await assert.rejects(f.store.putIfAbsent(hash(ref('x')),record()),/unique/);
  await assert.rejects(f.store.withRecord(hash(ref('x')),async(r,checkpoint)=>{
    r!.accountContextRef=ref('a');await checkpoint();throw Error('parent response lost');
  }),/response lost/);
  assert.equal(f.saved!.accountContextRef,ref('a'));
  assert.equal(await f.store.withRecord(hash(ref('x')),async r=>r!.accountContextRef),ref('a'));
  assert.equal(f.queries.some(q=>/begin|rollback/i.test(q)),false,'no SQL transaction held across remote calls');
});
test('S03 contended lock fails closed; release and poisoned connection handling (MOCKED PostgreSQL)',async()=>{
  const f=sqlFixture();f.lock();
  await assert.rejects(f.store.withRecord(hash(ref('x')),async()=>assert.fail('must not execute')),/busy/);
  assert.equal(f.released,1);
  const g=sqlFixture();g.failUnlock();await g.store.withRecord(hash(ref('x')),async()=>null);
  assert.equal(g.released,1);
});
test('S04 continuation lookup, quota, cleanup bounded/explicit (MOCKED PostgreSQL)',async()=>{
  const f=sqlFixture();await f.store.putIfAbsent(hash(ref('x')),record());
  assert.equal(await f.store.withContinuation(ref('c'),async r=>r?.browserHash),hash(ref('b')));
  assert.equal(await f.store.allowRate(ref('b')),false);
  await assert.rejects(f.store.cleanup(501),/limit/);
  await f.store.cleanup(10);assert.equal(f.queries.filter(q=>q.startsWith('delete')).length,2);
});
const env={VERCEL_ENV:'preview',NODE_ENV:'production',NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED:'1',MTH_MOVE_PARENT_SAVE_MODE:'isolated',
  MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED:'true',MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND:'fixture-isolated',MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN:'https://move.test',
  MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN:'https://ask.test',MTH_MOVE_PARENT_SAVE_FORM_PATH:PARENT_FORM_PATH};
function ports():IsolatedMovePorts{return {verifiedPair:{moveOrigin:'https://move.test',parentOrigin:'https://ask.test',sourceBackend:'fixture-isolated',isolated:true},
  sessionAffinity:'dedicated',pool:sqlFixture().pool,channel:{post:async()=>{throw Error('mock offline');}},
  resolveExactPublished:async()=>null,currentGrant:async()=>null,verifySourceCaller:async()=>null};}
test('S05 exact fixed parent route, approved source and origin pair; production always denied',()=>{
  assert.ok(isolatedConfig(env,ports()));assert.equal(isolatedConfig(env,null),null);
  for(const patch of [{VERCEL_ENV:'production'},{MTH_MOVE_PARENT_SAVE_MODE:'production'},{MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED:'false'},
    {MTH_MOVE_PARENT_SAVE_FORM_PATH:'/invented-route'},{MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN:'https://www.asktrusthub.com'},
    {MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND:'arepfylnilkjmyduhwbz'},
    {MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND:'qvvxvbcdmbjzrgvwjatw'},
    {MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND:'tzzcogaricohtezsugjr'},
    {NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED:'false'}])
    assert.equal(createIsolatedMoveRuntime({...env,...patch},ports()),null);
});
test('S06 source snapshot preserves request mapping and refuses unverified caller/browser (MOCKED service)',async()=>{
  const f=sqlFixture(),p=ports();p.pool=f.pool;
  // Insert uses real-clock expiry for the source service fixture.
  const live=new PostgresTransferStore(f.pool,'dedicated');
  await live.putIfAbsent(hash(ref('x')),{...record(),expiresAt:Date.now()+300000,parentStage:{...record().parentStage,expiresAt:Date.now()+300000}});
  const bound=createIsolatedMoveRuntime(env,p)!;
  assert.equal(await bound.source(ref('c'),{}),null);
  p.verifySourceCaller=async()=>({browserProof:ref('z')});assert.equal(await bound.source(ref('c'),{}),null);
  p.verifySourceCaller=async()=>({browserProof:ref('b')});
  const snapshot=await bound.source(ref('c'),{});assert.equal(snapshot?.requestPrefix,ref('r'));
  assert.equal(snapshot?.manifestDigest,manifestDigest(manifest));
  assert.equal(JSON.stringify(snapshot).includes('consumerUUID'),false);
});
test('S07 unapplied SQL has forced RLS, no login/membership, immutable context and guarded rollback',()=>{
  const up=readFileSync('supabase/migrations/20260921154559_move_v23_source_stage.sql','utf8');
  const down=readFileSync('supabase/rollback/20260921154559_move_v23_source_stage.down.sql','utf8');
  assert.equal((up.match(/force row level security/g)||[]).length,3);
  assert.match(up,/nologin noinherit nosuperuser/);assert.match(up,/continuation_hash text not null unique/);
  assert.match(up,/Immutable source transfer or account context changed/);
  assert.doesNotMatch(up,/grant\s+mth_move_profile_transfer\s+to/i);
  assert.match(up,/claim_assertion_nonce/);
  assert.match(up,/on conflict \(nonce_hash\) do nothing/);
  assert.doesNotMatch(up,/grant\s+[^\n]*service_role/i);
  assert.match(down,/Live source retry metadata remains/);
  assert.match(down,/Live assertion nonces remain/);
});

test('S08 acknowledgment binds once; rejects forged scope/browser/digest/replay into another owner (MOCKED service)',async()=>{
  const f=sqlFixture(),p=ports();p.pool=f.pool;
  const live=new PostgresTransferStore(f.pool,'dedicated');
  const expiresAt=Date.now()+300000;
  await live.putIfAbsent(hash(ref('x')),{...record(),expiresAt,parentStage:{...record().parentStage,expiresAt}});
  const bound=createIsolatedMoveRuntime(env,p)!;
  const receipt={receiptRef:ref('q'),requestKey:ref('r')+':0',accountContextRef:ref('a'),manifestDigest:manifestDigest(manifest),
    item:manifest.selected[0]!,parent:{outcome:'saved' as const,savedRef:'fixture-saved'},project:{outcome:'not_requested' as const},localCopy:'keep' as const};
  await assert.rejects(bound.acknowledge(ref('c'),[receipt],{}),/unauthorized/);
  p.verifySourceCaller=async(_proof,scope)=>scope==='source:ack'?{browserProof:ref('z')}:null;
  await assert.rejects(bound.acknowledge(ref('c'),[receipt],{}),/invalid_source_ack/);
  p.verifySourceCaller=async()=>({browserProof:ref('b')});
  await assert.rejects(bound.acknowledge(ref('c'),[{...receipt,manifestDigest:'f'.repeat(64)}],{}),/invalid_source_ack/);
  assert.equal(f.saved!.accountContextRef,undefined);
  await bound.acknowledge(ref('c'),[receipt],{});
  await bound.acknowledge(ref('c'),[receipt],{});
  assert.equal(f.saved!.accountContextRef,ref('a'));
  await assert.rejects(bound.acknowledge(ref('c'),[{...receipt,accountContextRef:ref('z')}],{}),/source_account_changed/);
  assert.equal(f.saved!.accountContextRef,ref('a'));
});

test('S10 source callback preserves signed bytes and requires independent scoped authority (MOCKED verifier)',async()=>{
  const f=sqlFixture(),p=ports();p.pool=f.pool;
  const expiresAt=Date.now()+300000;
  await new PostgresTransferStore(f.pool,'dedicated').putIfAbsent(hash(ref('x')),
    {...record(),expiresAt,parentStage:{...record().parentStage,expiresAt}});
  const bound=createIsolatedMoveRuntime(env,p)!;
  const body=JSON.stringify({action:'source',continuationRef:ref('c')});
  const request=()=>new Request(env.MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN+SOURCE_CALLBACK_PATH,
    {method:'POST',headers:{'content-type':'application/json'},body});
  assert.equal((await handleSourceCallback(request(),bound)).status,403);
  p.verifySourceCaller=async(proof,scope)=>{
    assert.equal(scope,'source:read');assert.ok(proof instanceof Request);
    assert.equal(await proof.text(),body);return {browserProof:ref('b')};
  };
  const response=await handleSourceCallback(request(),bound);assert.equal(response.status,200);
  assert.equal(response.headers.get('cache-control'),'private, no-store, max-age=0');
  assert.equal(response.headers.get('access-control-allow-origin'),null);
  const result=await response.json();assert.equal(result.result.requestPrefix,ref('r'));
  assert.equal(result.result.manifestDigest,manifestDigest(manifest));
});

test('S11 callback rejects extra identity/origin/query/oversize/method before source access',async()=>{
  const p=ports();let calls=0;p.verifySourceCaller=async()=>{calls++;return null;};
  const bound=createIsolatedMoveRuntime(env,p)!;
  const url=env.MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN+SOURCE_CALLBACK_PATH;
  const request=(body:unknown,target=url)=>new Request(target,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
  for(const key of ['consumerUUID','savedRef','projectRef','parentOrigin','returnUrl']) {
    const response=await handleSourceCallback(request({action:'source',continuationRef:ref('c'),[key]:'untrusted'}),bound);
    assert.equal(response.status,400);
  }
  assert.equal((await handleSourceCallback(request({action:'source',continuationRef:ref('c')},url+'?parentOrigin=https://evil.test'),bound)).status,400);
  assert.equal((await handleSourceCallback(request({},'https://evil.test'+SOURCE_CALLBACK_PATH),bound)).status,400);
  assert.equal((await handleSourceCallback(request({data:'x'.repeat(131073)}),bound)).status,413);
  assert.equal((await handleSourceCallback(new Request(url),bound)).status,405);
  assert.equal(calls,0);
  assert.equal((await handleSourceCallback(request({}),null)).status,503);
  assert.equal((await handleSourceCallback(request({}),createIsolatedMoveRuntime({...env,VERCEL_ENV:'production'},p))).status,503);
});

test('S12 callback acknowledgment never confirms browser Save; malformed/forged owner receipts refused',async()=>{
  const f=sqlFixture(),p=ports();p.pool=f.pool;
  const expiresAt=Date.now()+300000;
  await new PostgresTransferStore(f.pool,'dedicated').putIfAbsent(hash(ref('x')),
    {...record(),expiresAt,parentStage:{...record().parentStage,expiresAt}});
  const bound=createIsolatedMoveRuntime(env,p)!;
  const receipt={receiptRef:ref('q'),requestKey:ref('r')+':0',accountContextRef:ref('a'),manifestDigest:manifestDigest(manifest),
    item:manifest.selected[0]!,parent:{outcome:'already_saved',savedRef:'fixture-saved'},project:{outcome:'failed',projectRef:ref('p')},localCopy:'keep'};
  const request=(receipts:unknown[])=>new Request(env.MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN+SOURCE_CALLBACK_PATH,
    {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'acknowledge',continuationRef:ref('c'),receipts})});
  assert.equal((await handleSourceCallback(request([receipt]),bound)).status,403);
  p.verifySourceCaller=async(_proof,scope)=>{assert.equal(scope,'source:ack');return {browserProof:ref('b')};};
  assert.equal((await handleSourceCallback(request([{...receipt,consumerUUID:'not-allowed'}]),bound)).status,400);
  assert.equal((await handleSourceCallback(request([{...receipt,manifestDigest:'0'.repeat(64)}]),bound)).status,403);
  const response=await handleSourceCallback(request([receipt]),bound);
  assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true});
  assert.equal(f.saved!.accountContextRef,ref('a'));assert.equal(f.saved!.projectRef,ref('p'));
  assert.equal((await handleSourceCallback(request([{...receipt,accountContextRef:ref('z')}]),bound)).status,403);
});
