// UI evidence ONLY: actual controls/localStorage; parent BFF/Auth/form destination MOCKED.
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,openSync,closeSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';import {join} from 'node:path';
const dir=mkdtempSync(join(tmpdir(),'move-v23-ui-'));let n=0;
function command(args,input){const path=join(dir,n+++'.json'),fd=openSync(path,'w');
  const child=spawnSync(process.env.AGENT_BROWSER_BIN||'agent-browser',['--session','b3-v23-ui','--json',...args],{input,encoding:'utf8',stdio:['pipe',fd,'ignore'],timeout:30000});
  closeSync(fd);assert.ifError(child.error);const result=JSON.parse(readFileSync(path,'utf8'));assert.equal(result.success,true,result.error);return result.data;}
const browser=(...args)=>command(args),evaluate=s=>command(['eval','--stdin'],s).result;
const sleep=ms=>new Promise(done=>setTimeout(done,ms));
async function until(s){for(let i=0;i<60;i++){if(evaluate(s))return;await sleep(100);}assert.fail(s);}
const click=s=>evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.textContent.includes(${JSON.stringify(s)})).click()`);
async function reset(){browser('open','http://127.0.0.1:4311');evaluate('localStorage.clear();sessionStorage.clear()');browser('reload');await until('Boolean(window.b3)');
  click('Save mover');await until("document.body.textContent.includes('Keep this in My TrustHub')");
  evaluate("const rows=JSON.parse(localStorage.getItem('mth-local-saved-movers'));rows[0].notes='Private note retained';localStorage.setItem('mth-local-saved-movers',JSON.stringify(rows));window.b3.before=localStorage.getItem('mth-local-saved-movers')");}
try{
  await reset();browser('reload');await until("document.body.textContent.includes('Keep this in My TrustHub')");
  assert.equal(evaluate("Array.from(document.querySelectorAll('[role=status]')).some(n=>n.textContent==='Saved on this device')"),true);
  assert.equal(evaluate("document.body.textContent.includes('Saved to My TrustHub')"),false);
  evaluate("window.b3.parentState='local_only'");click('Keep this');
  await until("window.b3.transferCalls.some(c=>c.action==='prepare')");await sleep(100);
  assert.equal(evaluate("Array.from(document.querySelectorAll('[role=status]')).some(n=>n.textContent==='Saved on this device')"),true);
  assert.equal(evaluate("document.body.textContent.includes('Saved to My TrustHub')"),false);
  console.log('PASS reload keeps accessible device-only disclosure; identity-not-ready remains local');
  await reset();click('Keep this');await until("document.body.textContent.includes('My TrustHub sync unavailable')");
  assert.equal(evaluate("Array.from(document.querySelectorAll('[role=status]')).some(n=>n.textContent==='Saved on this device — My TrustHub sync unavailable')"),true);
  assert.equal(evaluate("localStorage.getItem('mth-local-saved-movers')===window.b3.before"),true);
  const posted=evaluate('window.b3.transferCalls.find(c=>c.action===\'prepare\')');
  assert.deepEqual(Object.keys(posted.selected[0]).sort(),['companySlug','digest','revision','savedAt']);
  assert.equal(JSON.stringify(posted).includes('Private note'),false);
  assert.equal(evaluate('window.b3.cloud.length'),0);
  console.log('PASS local Save -> explicit selected conversion; unavailable retains exact notes/local row, zero legacy cloud calls');
  await reset();evaluate("window.b3.parentState='continue'");click('Keep this');await until('Boolean(window.b3.form)');
  const form=evaluate('window.b3.form');assert.equal(form.method,'post');assert.equal(new URL(form.target).search,'');
  assert.deepEqual(Object.keys(form.fields),['continuationRef']);
  evaluate("window.b3.parentState='parent_saved';window.b3.projectFailed=true");click('Check My');
  await until("Array.from(document.querySelectorAll('[role=status]')).some(n=>n.textContent==='Saved to My TrustHub')");
  assert.equal(evaluate("document.body.textContent.includes('Project assignment failed')"),true);
  assert.equal(evaluate("localStorage.getItem('mth-local-saved-movers')===window.b3.before"),true);
  evaluate("window.dispatchEvent(new Event('blur'))");await until("!document.body.textContent.includes('Saved to My TrustHub')");
  console.log('PASS MOCKED form POST + receipt UI + separate Project failure + retained copy + focus/session recheck');
  await reset();evaluate("window.b3.parentState='continue'");click('Keep this');await until('Boolean(window.b3.form)');
  evaluate("window.b3.parentState='parent_saved';window.b3.delayTransfer=true");click('Check My');
  await until('Boolean(window.b3.finishTransfer)');evaluate("(()=>{const rows=JSON.parse(localStorage.getItem('mth-local-saved-movers'));rows[0].savedAt='2026-09-20T00:00:00Z';localStorage.setItem('mth-local-saved-movers',JSON.stringify(rows));window.b3.finishTransfer()})()");
  await sleep(100);assert.equal(evaluate("document.body.textContent.includes('Saved to My TrustHub')"),false);
  browser('open','http://127.0.0.1:4311/?saved=1');await until('Boolean(window.b3)');
  assert.equal(evaluate("document.body.textContent.includes('Saved to My TrustHub')"),false);
  console.log('PASS edited projection and forged completion URL cannot confirm parent state');
  for(const width of [1440,390,320]){await reset();browser('set','viewport',String(width),'900');
    evaluate("Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Keep this in My TrustHub').focus()");browser('press','Enter');
    await until("document.body.textContent.includes('My TrustHub sync unavailable')");
    assert.equal(evaluate('document.documentElement.scrollWidth<=innerWidth'),true);
    assert.equal(evaluate("document.activeElement?.textContent==='Keep this in My TrustHub'"),true);
    browser('screenshot',join(dir,'width-'+width+'.png'));}
  console.log('PASS 1440/390/320 conversion keyboard/status/no overflow. Evidence '+dir);
}finally{browser('close');}
