// Native LOCAL PostgreSQL 17, separate connections and ephemeral TEST keys.
// Parent responses and public publication are explicit fixtures. NO real Auth,
// hosted SQL, runtime configuration or final Journey QA is performed here.
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash, generateKeyPairSync, randomBytes } from 'node:crypto';
import EmbeddedPostgres from 'embedded-postgres';
import pg from 'pg';
import { PostgresTransferStore } from '../lib/my-trusthub/postgres-transfer-store.ts';
import { createMoveRuntime } from '../lib/my-trusthub/runtime.ts';
import { handleMoveProfileSave, COOKIE_NAME } from '../lib/my-trusthub/profile-save-http.ts';
import { handleSource } from '../lib/my-trusthub/source-callback-http.ts';
import { ParentChannel } from '../lib/my-trusthub/parent-channel.ts';
import { signAssertion, verifyAssertion, ASSERTION_HEADER } from '../lib/my-trusthub/service-assertion.ts';
import { MOVE_ORIGIN, ASK_ORIGIN, API_PATH, SOURCE_PATH, GRANT_API_PATH, GRANT_FORM_PATH, PROFILE, PROFILE_SLUG } from '../lib/my-trusthub/config.ts';
import { manifestDigest } from '../lib/my-trusthub/vendor/v2-3-profile-transfer.ts';
import { projection } from '../lib/my-trusthub/selection.ts';

const root = resolve('scripts/output/v23-rebuild/postgres'); mkdirSync(root,{recursive:true});
const databaseDir = resolve(root,'run-'+Date.now());
if (!databaseDir.startsWith(root + '\\') && !databaseDir.startsWith(root + '/')) throw Error('Invalid local data path');
const port = 55439, password = randomBytes(24).toString('hex');
const server = new EmbeddedPostgres({ databaseDir, port, user:'postgres', password, persistent:true,
  postgresFlags:['-c','listen_addresses=127.0.0.1'], onLog:()=>{}, onError:()=>{} });
let pool, admin, cases=0;
const hash = s=>createHash('sha256').update(s).digest('hex');
const ref = ()=>randomBytes(32).toString('base64url');
const check = name=>{cases++;console.log('PASS '+name);};
function key(kid) { const k=generateKeyPairSync('ed25519');return{private:{kid,pem:k.privateKey.export({type:'pkcs8',format:'pem'}).toString()},public:{kid,pem:k.publicKey.export({type:'spki',format:'pem'}).toString()}}; }
try {
  await server.initialise(); await server.start();
  admin=server.getPgClient('postgres','127.0.0.1'); await admin.connect();
  console.log((await admin.query('select version()')).rows[0].version);
  await admin.query("create role anon nologin; create role authenticated nologin; set mth.v23_isolated='approved'");
  await admin.query(readFileSync('docs/my-trusthub/v2/rebuild-b3/source-forward.sql','utf8'));
  await admin.query(readFileSync('docs/my-trusthub/v2/rebuild-b3/source-login-forward.sql','utf8'));
  await admin.query(readFileSync('docs/my-trusthub/v2/rebuild-b3/source-assertions.sql','utf8')); check('forward SQL and forced-RLS capability assertions');
  const membership=await admin.query("select inherit_option,set_option,admin_option from pg_auth_members where member='mth_move_profile_transfer_preview'::regrole");
  assert.deepEqual(membership.rows,[{inherit_option:false,set_option:true,admin_option:false}]);check('dedicated source login has one non-inheriting, non-admin SET capability');
  pool=new pg.Pool({host:'127.0.0.1',port,user:'postgres',password,database:'postgres',max:10});
  const capabilityPool={async connect(){const db=await pool.connect();await db.query('set role mth_move_profile_transfer');return db;}};
  const store=new PostgresTransferStore(capabilityPool,'dedicated');
  const store2=new PostgresTransferStore(capabilityPool,'dedicated');
  const keyHash=hash(ref());
  const claims=await Promise.all(Array.from({length:20},(_,i)=>(i%2?store:store2).claim(keyHash,Date.now()+30000)));
  assert.equal(claims.filter(Boolean).length,1); check('20 concurrent nonce claims across separate native connections: one winner');
  assert.equal(await new PostgresTransferStore(capabilityPool,'dedicated').claim(keyHash,Date.now()+30000),false); check('nonce survives receiver instance replacement');
  const arbitrary=ref();assert.equal(await store.knownBrowser(arbitrary),false);await store.registerBrowser(arbitrary);assert.equal(await store.knownBrowser(arbitrary),true);check('durable minted browser registration');
  await assert.rejects(admin.query("set role anon; select * from mth_profile_transfer.stages")); await admin.query('reset role');check('anonymous source access denied');

  const ask=key('ask-local-test'),move=key('move-local-test');
  let stage,continuation,manifest,record,receipt,grantAllowed=true,publication='PUBLISHABLE',bindingVersion=1,parentDown=false,lostReceiptResponse=false;
  const account=ref(),proof=ref(),session=hash('local fixture parent session'),projectRef=ref();
  const calls=[];
  const mockSend=async(url,init)=>{
    if(parentDown)throw Error('fixture parent offline');
    assert.equal(init.redirect,'error');assert.equal(init.cache,'no-store');assert.equal(new Headers(init.headers).has('authorization'),false);assert.equal(new Headers(init.headers).has('cookie'),false);
    const request=new Request(url,init),bytes=Buffer.from(await request.arrayBuffer()),body=JSON.parse(bytes.toString());
    const op=body.operation??body.action;calls.push(op);
    const scope=['prepareGuestProfileTransfer','prepareProfileSaveContinuation','binding'].includes(op)?'transfer:stage':'receipt:verify';
    const c=await verifyAssertion(request,bytes,move.public,'move',scope,store);
    if(url===ASK_ORIGIN+GRANT_API_PATH){
      assert.equal(c.session,null);assert.equal(c.grant,null);
      if(op==='binding')return Response.json({ok:true,result:{profile:PROFILE,binding:{id:'11111111-1111-4111-8111-111111111111',networkEntityId:bindingVersion===1?'22222222-2222-4222-8222-222222222222':'33333333-3333-4333-8333-333333333333',status:'accepted'}}});
      assert.equal(body.continuationRef,continuation);
      if(op==='challenge')return Response.json({ok:true,result:{target:ASK_ORIGIN+GRANT_FORM_PATH,fields:{challengeRef:ref()}}});
      if(op==='resolve')return grantAllowed&&body.proofRef===proof?Response.json({ok:true,result:{accountContextRef:account,selectionConfirmed:true,sessionBinding:session,expiresAt:Date.now()+29000,projectRef}}):Response.json({ok:false,error:'unauthorized'},{status:403});
    }
    assert.equal(url,ASK_ORIGIN+API_PATH);
    let result;
    if(op==='prepareGuestProfileTransfer'){manifest=body.input;stage={transferRef:ref(),manifestDigest:manifestDigest(manifest),expiresAt:Date.now()+590000};result=stage;}
    else if(op==='prepareProfileSaveContinuation'){continuation=ref();result={continuationRef:continuation,expiresAt:stage.expiresAt};}
    else {assert.equal(c.grant,proof);assert.equal(c.session,session);if(lostReceiptResponse){lostReceiptResponse=false;throw Error('fixture lost response');}result=receipt;}
    return Response.json({ok:true,operation:op,result});
  };
  const runtime=createMoveRuntime({pool:capabilityPool,askKey:ask.public,parent:new ParentChannel(move.private,mockSend),readPublication:async()=>[{id:PROFILE.nativeId,slug:PROFILE_SLUG,publication_state:publication}]});
  let browser;
  const bff=async body=>handleMoveProfileSave(new Request(MOVE_ORIGIN+API_PATH,{method:'POST',headers:{origin:MOVE_ORIGIN,'sec-fetch-site':'same-origin','content-type':'application/json',...(browser?{cookie:COOKIE_NAME+'='+browser,'x-mth-csrf':browser}:{})},body:JSON.stringify(body)}),runtime);
  const bootstrap=await bff({action:'bootstrap'});assert.match(bootstrap.headers.get('set-cookie'),/HttpOnly; Secure; SameSite=Strict/);browser=(await bootstrap.json()).csrf;check('BFF bootstrap registers HttpOnly browser binding');
  const minted=browser;browser=ref();assert.equal((await bff({action:'prepare',selected:[]})).status,403);browser=minted;check('unminted cookie cannot prepare');
  for(const headers of [{origin:'https://wrong.test'},{'sec-fetch-site':'cross-site'},{'x-mth-csrf':ref()}]) {
    const r=await handleMoveProfileSave(new Request(MOVE_ORIGIN+API_PATH,{method:'POST',body:JSON.stringify({action:'challenge',ticket:ref()}),
      headers:{origin:MOVE_ORIGIN,'sec-fetch-site':'same-origin','content-type':'application/json',cookie:COOKIE_NAME+'='+browser,'x-mth-csrf':browser,...headers}}),runtime);
    assert.equal(r.status,403);
  }check('BFF rejects wrong origin, fetch metadata and CSRF');
  assert.equal((await bff({action:'prepare',selected:[],accountId:'browser-forgery'})).status,400);check('BFF rejects unexpected authority fields');
  const savedAt='2026-09-22T00:00:00.000Z',digest=hash(projection(PROFILE_SLUG,savedAt)),selected=[{companySlug:PROFILE_SLUG,savedAt,revision:digest,digest}];
  const prepared=await (await bff({action:'prepare',selected})).json();assert.equal(prepared.state,'continue');
  await store.withRecord(hash(prepared.ticket),async r=>{record=structuredClone(r);});check('BFF prepare persists exact selected source stage');
  const signed=async(body,scope='source:read',sessionClaim=null,token)=>{const bytes=Buffer.from(JSON.stringify(body));return handleSource(new Request(MOVE_ORIGIN+SOURCE_PATH,{method:'POST',body:bytes,headers:{'content-type':'application/json',[ASSERTION_HEADER]:token??signAssertion(ask.private,'ask',MOVE_ORIGIN+SOURCE_PATH,scope,bytes,browser,sessionClaim)}}),runtime)};
  const resolved=await signed({action:'resolve',profile:PROFILE});assert.equal(resolved.status,200);assert.equal((await resolved.json()).result.publicationState,'PUBLISHABLE');check('signed independent source resolve');
  publication='INDEXABLE';assert.equal((await signed({action:'resolve',profile:PROFILE})).status,503);publication='PUBLISHABLE';check('source publication change fails closed');
  const source=await (await signed({action:'source',continuationRef:continuation})).json();assert.equal(source.result.browserProof,browser);assert.equal(source.result.requestPrefix,record.requestPrefix);check('signed source read matches durable browser/continuation');
  const right=browser;browser=ref();assert.equal((await signed({action:'source',continuationRef:continuation})).status,403);browser=right;check('copied continuation with wrong browser rejected');
  receipt={receiptRef:ref(),requestKey:record.requestPrefix+':0',accountContextRef:account,manifestDigest:stage.manifestDigest,item:manifest.selected[0],parent:{outcome:'saved',savedRef:ref()},project:{outcome:'failed',projectRef},localCopy:'keep'};
  const ack=await signed({action:'acknowledge',continuationRef:continuation,receipts:[receipt]},'source:ack',session);assert.equal(ack.status,200);check('signed acknowledgment binds owner without browser success');
  assert.equal((await signed({action:'acknowledge',continuationRef:continuation,receipts:[receipt]},'source:ack')).status,403);
  assert.equal((await signed({action:'source',continuationRef:continuation},'source:read',session)).status,403);check('source read/ack enforce exact session claim purpose');
  const challenge=await (await bff({action:'challenge',ticket:prepared.ticket})).json();assert.equal(challenge.target,ASK_ORIGIN+GRANT_FORM_PATH);check('challenge uses server-held continuation');
  const result=await (await bff({action:'receipt',ticket:prepared.ticket,selected,proofRef:proof})).json();assert.equal(result.state,'parent_saved');check('fixture receipt lookup AND verification required for success');
  assert.equal(result.projectFailed,true);check('Project failure preserves verified profile Save with separate outcome');
  assert.equal((await bff({action:'receipt',ticket:prepared.ticket,selected,proofRef:proof})).status,403);check('duplicate BFF proof rejected');
  const trustedBrowser={binding:browser,csrfVerified:true,origin:MOVE_ORIGIN,environment:'isolated'};
  assert.equal((await runtime.adapter.finish(prepared.ticket,selected,trustedBrowser,proof)).state,'parent_saved');check('retained receipt retry (fresh authority resolver invoked again)');
  lostReceiptResponse=true;assert.equal((await runtime.adapter.finish(prepared.ticket,selected,trustedBrowser,proof)).state,'unavailable');
  assert.equal((await runtime.adapter.finish(prepared.ticket,selected,trustedBrowser,proof)).state,'parent_saved');check('lost receipt response can recover retained verified result');
  assert.equal((await runtime.adapter.finish(prepared.ticket,[{...selected[0],digest:'0'.repeat(64)}],trustedBrowser,proof)).state,'invalid');check('changed local digest rejected');
  bindingVersion=2;assert.equal((await runtime.adapter.finish(prepared.ticket,selected,trustedBrowser,proof)).state,'invalid');bindingVersion=1;check('changed current binding rejected');
  grantAllowed=false;assert.notEqual((await runtime.adapter.finish(prepared.ticket,selected,trustedBrowser,proof)).state,'parent_saved');grantAllowed=true;check('fixture account switch/sign-out proof denial retains local state');
  parentDown=true;assert.equal((await runtime.adapter.finish(prepared.ticket,selected,trustedBrowser,proof)).state,'unavailable');parentDown=false;check('parent unavailable is not success');
  const heldReceipt=receipt;receipt=null;assert.equal((await runtime.adapter.finish(prepared.ticket,selected,trustedBrowser,proof)).state,'unavailable');receipt=heldReceipt;assert.equal(calls.includes('commitProfileSave'),false);check('missing receipt never calls parent commit');
  assert.equal(calls.some(c=>/watch|alert|monitor|enrol/i.test(c)),false);check('zero Watch/Alert/monitoring operations');
  let release;const held=new Promise(r=>{release=r;});let locked;
  const ready=new Promise(r=>{locked=r;});const work=store.withRecord(hash(prepared.ticket),async()=>{locked();await held;});await ready;
  await assert.rejects(store2.withRecord(hash(prepared.ticket),async()=>{}));release();await work;check('second native session cannot take held source ticket');
  await assert.rejects(store.withRecord(hash(prepared.ticket),async(r,checkpoint)=>{r.requestPrefix=ref();await checkpoint();}));check('SQL rejects mutation of immutable manifest/request mapping');
  await pool.end();pool=null;
  await admin.query(readFileSync('docs/my-trusthub/v2/rebuild-b3/source-login-rollback.sql','utf8'));
  await admin.query(readFileSync('docs/my-trusthub/v2/rebuild-b3/source-rollback.sql','utf8'));
  assert.equal((await admin.query("select count(*)::int n from pg_namespace where nspname='mth_profile_transfer'")).rows[0].n,0);check('prepared rollback removes local packet');
  console.log(JSON.stringify({suite:'LOCAL_NATIVE_POSTGRES_AND_MOCK_PARENT',cases,pass:true,realParentAuth:false,hosted:false}));
} finally {
  await pool?.end();await admin?.end();await server.stop();
}
