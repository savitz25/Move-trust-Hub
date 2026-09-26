import test from 'node:test';
import assert from 'node:assert/strict';
import { saveMoverIntent } from './save-mover-intent';
const input = { companySlug: 'mover', companyName: 'Mover' };
test('local Save precedes Auth and remains when Auth fails', async () => {
  const events: string[] = [];
  const result = await saveMoverIntent(input, new AbortController().signal, { persistLocal: () => events.push('local'), onLocalSaved: () => events.push('visible'),
    resolveUser: async () => { events.push('auth'); throw Error('outage'); }, saveCloud: async () => { throw Error('must not call'); } });
  assert.deepEqual(events,['local','visible','auth']); assert.equal(result.destination,'device'); assert.equal(result.cloudFailed,true);
});
test('guest Save requires no account and never calls cloud', async () => {
  let local = false;
  assert.equal((await saveMoverIntent(input,new AbortController().signal,{persistLocal:()=>{local=true;},resolveUser:async()=>null,saveCloud:async()=>{throw Error('unexpected');}})).destination,'device');
  assert.equal(local,true);
});
test('storage failure never reports success or calls Auth', async () => {
  await assert.rejects(saveMoverIntent(input,new AbortController().signal,{persistLocal:()=>{throw Error('storage');},resolveUser:async()=>{assert.fail('Auth after failed local save');},saveCloud:async()=>({ok:true,cloud:true})}));
});
test('account owner is bound and cloud failure retains local Save', async () => {
  let local=0;
  const result=await saveMoverIntent(input,new AbortController().signal,{persistLocal:()=>local++,resolveUser:async()=>({id:'fixture-owner'}),saveCloud:async args=>{assert.equal(args.expectedUserId,'fixture-owner');return{ok:false};}});
  assert.equal(local,1); assert.equal(result.destination,'device');
});
test('navigation abort before activation does not write', async () => {
  const c=new AbortController();c.abort();
  await assert.rejects(saveMoverIntent(input,c.signal,{persistLocal:()=>assert.fail('write after cancellation'),resolveUser:async()=>null,saveCloud:async()=>({ok:true})}));
});
