import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { legacyClientDisabled, previewRequestAllowed, previewReadOnlyFetch } from './preview-isolation';
import { serverGate } from './config';
import { sanitizeAnalyticsUrl } from '@/lib/analytics/posthog/privacy';
test('default/production gates deny V2-3 runtime', () => {
  assert.equal(serverGate({}),false);assert.equal(serverGate({VERCEL_ENV:'production',NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED:'1'}),false);
});
test('isolated preview blocks legacy writes/Auth and permits local research reads', async () => {
  const prior=process.env.NEXT_PUBLIC_MOVE_V23_LOCAL_ONLY;process.env.NEXT_PUBLIC_MOVE_V23_LOCAL_ONLY='1';
  try {
    assert.equal(legacyClientDisabled(),true);
    for(const [method,path] of [['POST','/my-move'],['GET','/auth/callback'],['POST','/api/quotes'],['GET','/api/analytics/identity']])assert.equal(previewRequestAllowed(method,path),false);
    for(const path of ['/companies/example','/my-move','/compare'])assert.equal(previewRequestAllowed('GET',path),true);
    assert.equal(previewRequestAllowed('GET','/api/compare/companies'),true);
    await assert.rejects(previewReadOnlyFetch('https://arepfylnilkjmyduhwbz.supabase.co/rest/v1/saved_movers',{method:'POST'}));
    await assert.rejects(previewReadOnlyFetch('https://arepfylnilkjmyduhwbz.supabase.co/auth/v1/user'));
    await assert.rejects(previewReadOnlyFetch('https://arepfylnilkjmyduhwbz.supabase.co/rest/v1/rpc/unsafe',{method:'GET'}));
  } finally {if(prior===undefined)delete process.env.NEXT_PUBLIC_MOVE_V23_LOCAL_ONLY;else process.env.NEXT_PUBLIC_MOVE_V23_LOCAL_ONLY=prior;}
});
test('query sanitizer removes Ask research and protocol references',()=>{
  const url=sanitizeAnalyticsUrl('/companies/example?from_q=PRIVATE&id=DOT&continuationRef=opaque&proofRef=opaque&src=ask');
  assert.ok(url);assert.doesNotMatch(url,/PRIVATE|DOT|opaque|from_q|proofRef|continuationRef/);
});
test('new runtime has no Watch/Alert/enrollment calls, private logs, or memory stores',()=>{
  const paths=readdirSync('lib/my-trusthub').filter(f=>f.endsWith('.ts')&&!f.endsWith('.test.ts')).map(f=>join('lib/my-trusthub',f));
  paths.push('components/save-my-move/keep-in-my-trusthub.tsx');
  const source=paths.map(p=>readFileSync(p,'utf8')).join('\n');
  assert.doesNotMatch(source,/\bconsole\.(log|info|warn|error)|new Map\(|sqlite|\.watch\(|\.subscribe\(|startWatch|createAlert|enrollCoverage/i);
  assert.doesNotMatch(source,/searchParams\.set\(['"](?:continuationRef|proofRef)|\?continuationRef=/);
  const channel=readFileSync('lib/my-trusthub/parent-channel.ts','utf8');
  assert.doesNotMatch(channel,/['"](?:Authorization|Cookie)['"]\s*:/);
  assert.match(readFileSync('components/save-my-move/keep-in-my-trusthub.tsx','utf8'),/data-ph-no-capture/);
});
