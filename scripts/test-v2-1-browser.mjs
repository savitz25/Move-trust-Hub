// Run with qa-v2-1-save.mjs serving localhost. Uses existing agent-browser tooling.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, openSync, closeSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const executable = process.env.AGENT_BROWSER_BIN || 'agent-browser';
const outputDir = mkdtempSync(join(tmpdir(), 'b3-browser-'));
let sequence = 0;
function command(args, input) {
  // A Windows browser daemon can retain stdout pipes. Use per-call evidence files.
  const path = join(outputDir, `${sequence++}.json`);
  const fd = openSync(path, 'w');
  const child = spawnSync(executable, ['--session', 'b3-save-tests', '--json', ...args],
    { input, encoding: 'utf8', stdio: ['pipe', fd, 'ignore'], timeout: 30000 });
  closeSync(fd);
  assert.ifError(child.error);
  return readFileSync(path, 'utf8');
}
function browser(...args) {
  const output = command(args);
  const result = JSON.parse(output);
  assert.equal(result.success, true, result.error);
  return result.data;
}
function evaluate(source) {
  const output = command(['eval', '--stdin'], source);
  const result = JSON.parse(output);
  assert.equal(result.success, true, result.error);
  return result.data.result;
}
const wait = ms => new Promise(done => setTimeout(done, ms));
async function until(source) {
  for (let i = 0; i < 100; i++) {
    if (evaluate(source)) return;
    await wait(100);
  }
  assert.fail(`Timed out: ${source}`);
}
async function reset() {
  browser('open', 'http://127.0.0.1:4311/');
  evaluate(`localStorage.removeItem('mth-local-saved-movers')`);
  browser('reload');
  await until('Boolean(window.b3 && document.querySelector("button"))');
}
const state = `({ disabled:document.querySelector('button').disabled, busy:document.querySelector('button').getAttribute('aria-busy'), message:document.querySelector('[role=status]')?.textContent, rows:JSON.parse(localStorage.getItem('mth-local-saved-movers') || '[]'), cloud:window.b3.cloud, analytics:window.b3.analytics })`;
const click = () => evaluate(`document.querySelector('button').click()`);
const results = [];
const record = results.push.bind(results);
results.push = value => { console.log(`${value.id}: ${value.result}`); return record(value); };
try {
  await reset();
  assert.equal(evaluate(state).disabled, false, 'B3-01: Save must be actionable while deferred provider is unresolved');
  const start = Date.now();
  browser('focus', 'button'); browser('press', 'Enter');
  await until(`document.querySelector('[role=status]')?.textContent.includes('saved on this device.')`);
  let s = evaluate(state);
  assert.equal(s.rows[0].companySlug, 'b3-test-mover');
  assert.equal(s.cloud.length, 0);
  results.push({ id: 'B3-01/B3-04/B3-09', result: 'PASS', elapsedMs: Date.now() - start, note: 'Keyboard Save while nonessential provider remains unresolved indefinitely' });
  browser('reload');
  await until(`document.querySelector('button')?.textContent === 'Saved'`);
  assert.equal(evaluate(state).rows.length, 1);
  results.push({ id: 'B3-02', result: 'PASS', note: 'Real browser localStorage survives reload' });

  await reset();
  evaluate(`window.b3.delayAuth = true; document.querySelector('button').click(); document.querySelector('button').click(); document.querySelector('button').click();`);
  await until('Boolean(window.b3.wait)');
  s = evaluate(state); assert.equal(s.rows.length, 0); assert.equal(s.busy, 'true');
  evaluate('window.b3.resolveAuth()');
  await until(`document.querySelector('button')?.textContent === 'Saved'`);
  s = evaluate(state); assert.equal(s.rows.length, 1); assert.equal(s.analytics.length, 1); assert.equal(s.cloud.length, 0);
  results.push({ id: 'B3-03/B3-05 guest', result: 'PASS', note: 'Three immediate activations; delayed guest auth; one write/analytics effect' });

  await reset();
  evaluate(`window.b3.delayAuth=true; window.b3.user={id:'b3-isolated-owner'}; document.querySelector('button').click()`);
  await until('Boolean(window.b3.wait)');
  assert.equal(evaluate(state).rows.length, 0);
  evaluate('window.b3.resolveAuth()');
  await until(`document.querySelector('button')?.textContent === 'Saved'`);
  s = evaluate(state); assert.deepEqual(s.cloud, [{companySlug:'b3-test-mover',expectedUserId:'b3-isolated-owner'}]);
  results.push({ id: 'B3-05 authenticated/B3-06', result: 'PASS (MOCKED auth/cloud)', note: 'Real component and runtime, exact existing slug destination plus owner check' });

  await reset();
  evaluate(`window.b3.delayAuth=true; document.querySelector('button').click()`);
  await until('Boolean(window.b3.wait)');
  evaluate(`window.b3.render('b3-other-profile')`);
  await until(`window.b3.pathname.endsWith('b3-other-profile') && document.querySelector('button')?.textContent === 'Save mover'`);
  evaluate('window.b3.resolveAuth()'); await wait(150);
  s = evaluate(state); assert.equal(s.rows.length, 0); assert.equal(s.cloud.length, 0);
  results.push({ id: 'B3-07 navigation', result: 'PASS', note: 'Pending old profile cancelled, no replay on replacement' });

  await reset();
  evaluate(`window.b3.delayAuth=true; document.querySelector('button').click()`);
  await until('Boolean(window.b3.wait)');
  evaluate(`window.b3.authEvent('owner-a'); window.b3.authEvent('owner-b'); window.b3.user={id:'owner-b'}; window.b3.resolveAuth()`);
  await until(`document.querySelector('button')?.textContent === 'Try Save again'`);
  s = evaluate(state); assert.equal(s.rows.length + s.cloud.length, 0);
  results.push({ id: 'B3-07 account change', result: 'PASS (MOCKED auth)', note: 'Account switch while resolving rejects without writing' });

  await reset();
  evaluate(`window.b3.originalSetItem=Storage.prototype.setItem; Storage.prototype.setItem=function(){throw new Error('QuotaExceededError')}`);
  click();
  await until(`document.querySelector('button')?.textContent === 'Try Save again'`);
  s=evaluate(state); assert.equal(s.rows.length, 0); assert.equal(s.disabled, false); assert.match(s.message,/Could not save/);
  evaluate('Storage.prototype.setItem=window.b3.originalSetItem'); click();
  await until(`document.querySelector('button')?.textContent === 'Saved'`);
  results.push({ id: 'B3-08 storage', result: 'PASS', note: 'Failure visible, no false success; retry succeeds after storage recovery' });

  await fetch('http://127.0.0.1:4311/control?fail=1');
  await reset(); click();
  await until(`document.querySelector('button')?.textContent === 'Try Save again'`);
  assert.equal(evaluate(state).rows.length, 0);
  results.push({ id: 'B3-08 module', result: 'PASS', note: 'Failed runtime import is visible and does not write; reload recovers module fetch' });
  await fetch('http://127.0.0.1:4311/control?delay=16000');
  await reset(); click();
  await until(`document.querySelector('[role=status]')?.textContent.includes('Saving')`);
  await wait(15500);
  s=evaluate(state); assert.equal(s.rows.length,0); assert.match(s.message,/too long/);
  await wait(1500); assert.equal(evaluate(state).rows.length,0);
  results.push({ id:'B3-04/B3-08 delayed module',result:'PASS',note:'16-second import exceeds bounded pending timeout; late resolution cannot write' });
  await fetch('http://127.0.0.1:4311/control');

  for (const width of [1440,390,320]) {
    await reset(); browser('set','viewport',String(width),'900');
    browser('focus','button');
    assert.equal(evaluate(`document.activeElement === document.querySelector('button')`),true);
    assert.equal(evaluate(`document.documentElement.scrollWidth <= innerWidth`),true);
  }
  results.push({id:'B3-09',result:'PASS (component fixture)',note:'Keyboard focus and no overflow at 1440/390/320; preview page inspection separate'});
  console.log(JSON.stringify(results,null,2));
} finally {
  await fetch('http://127.0.0.1:4311/control').catch(()=>{});
  browser('close');
}
