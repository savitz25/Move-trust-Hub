// Real Ask #185 signer/verifier/current-grant implementation; fixture session and
// persistence ports below are explicitly MOCKED. Not browser Auth or E2E/JQA.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readFileSync } from 'node:fs';
import { generateKeyPairSync, randomBytes } from 'node:crypto';
import { signAssertion, verifyAssertion, ASSERTION_HEADER } from '../lib/my-trusthub/service-assertion.ts';
import { MOVE_ORIGIN, ASK_ORIGIN, API_PATH, SOURCE_PATH } from '../lib/my-trusthub/config.ts';

const PIN='7184f53706f6ab8b94d6151794a3b54f090a6662';
const root=process.env.ASK_CONTRACT_ROOT;
if(!root)throw Error('Set ASK_CONTRACT_ROOT to exact read-only Ask #185 checkout');
assert.equal(execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),PIN);
const parent=await import(pathToFileURL(resolve(root,'lib/my-trusthub/profile-save/service-assertion.ts')).href);
const {CurrentGrants}=await import(pathToFileURL(resolve(root,'lib/my-trusthub/profile-save/current-grant.ts')).href);
for(const name of ['v2-3-profile-save','v2-3-profile-transfer']){
  const expected=readFileSync(resolve(root,'lib/my-trusthub/contracts/'+name+'.ts'),'utf8').replaceAll(".ts'","'").replaceAll('\r\n','\n');
  const actual=readFileSync('lib/my-trusthub/vendor/'+name+'.ts','utf8').split('\n').slice(1).join('\n').replaceAll('\r\n','\n');
  assert.equal(actual,expected);
}
let cases=2;
const ref=()=>randomBytes(32).toString('base64url');
function keys(kid){const p=generateKeyPairSync('ed25519');return{private:{kid,pem:p.privateKey.export({type:'pkcs8',format:'pem'}).toString()},public:{kid,pem:p.publicKey.export({type:'spki',format:'pem'}).toString()}};}
const move=keys('move-contract-test'),ask=keys('ask-contract-test'),browser=ref(),body=Buffer.from('{ "contract": "exact bytes" }');
const nonce=()=>{const used=new Set();return{async claim(k){if(used.has(k))return false;used.add(k);return true;}}};
for(const [service,key,target,signer,verifier,scope] of [
  ['move',move,ASK_ORIGIN+API_PATH,signAssertion,parent.verifyAssertion,'transfer:stage'],
  ['ask',ask,MOVE_ORIGIN+SOURCE_PATH,parent.signAssertion,verifyAssertion,'source:read']]){
  const token=signer(key.private,service,target,scope,body,browser);
  const request=new Request(target,{method:'POST',headers:{[ASSERTION_HEADER]:token}});
  assert.equal((await verifier(request,body,key.public,service,scope,nonce())).browser,browser);cases++;
  await assert.rejects(verifier(request,Buffer.from('{}'),key.public,service,scope,nonce()));cases++;
}
// This fixture exercises current-parent rules without pretending to authenticate
// a human. The Move adapter never receives these fixture canonical subjects.
const records=new Map(),claimed=new Set();let live=true;
const store={async read(k){return records.get(k)??null;},async put(k,v){records.set(k,v);},async claim(k){if(claimed.has(k))return false;claimed.add(k);return true;},async live(){return live;},
  async record(k,fn){const r=await fn(records.get(k)??null);records.set(k,r.value);return r.result;}};
const grants=new CurrentGrants(store,async()=>null);
const A={subject:'fixture-A',session:'session-A',label:'A'},B={subject:'fixture-B',session:'session-B',label:'B'};
const continuation=ref(),context=ref(),confirmation={accountContextRef:context,receipts:[{accountContextRef:context}],parent:A,source:{browserProof:browser,continuationRef:continuation},requestPrefix:ref()};
await grants.remember(confirmation,A);
const challenge=await grants.challenge(continuation,browser);const proof=await grants.authorize(challenge.fields.challengeRef,A);
assert.equal((await grants.resolve(proof,browser,continuation)).grant.accountContextRef,context);cases++;
await assert.rejects(grants.resolve(proof,ref(),continuation));cases++;
await assert.rejects(grants.resolve(proof,browser,ref()));cases++;
await assert.rejects(grants.authorize(challenge.fields.challengeRef,A));cases++;
const switched=await grants.challenge(continuation,browser);await assert.rejects(grants.authorize(switched.fields.challengeRef,B));await assert.rejects(grants.resolve(proof,browser,continuation));cases++;
const sameOwner=await grants.challenge(continuation,browser);const recovered=await grants.authorize(sameOwner.fields.challengeRef,{...A,session:'session-A-new'});
assert.equal((await grants.resolve(recovered,browser,continuation)).proof.session,'session-A-new');cases++;
live=false;await assert.rejects(grants.resolve(recovered,browser,continuation));cases++;live=true;
const expired=await grants.challenge(continuation,browser);records.get('challenge:'+expired.fields.challengeRef).expiresAt=Date.now()-1;await assert.rejects(grants.authorize(expired.fields.challengeRef,A));cases++;
records.get('proof:'+recovered).expiresAt=Date.now()-1;await assert.rejects(grants.resolve(recovered,browser,continuation));cases++;
console.log(JSON.stringify({suite:'PINNED_ASK_SIGNED_CONTRACT_AND_MOCK_SESSION_RULES',pin:PIN,cases,pass:true,realParentAuth:false}));
