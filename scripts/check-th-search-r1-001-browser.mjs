/** Operator-only bounded live QA. Attach to an authorized persistent browser.
 * Usage: PLAYWRIGHT_MODULE=<installed playwright-core> node this-file
 *   <cdp-local-url> <origin> <label> <sha> <deployment>
 * No writes, user state dumps, or live CI calls. */
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const [cdp,origin,label,sha,deployment]=process.argv.slice(2);
const browser=await chromium.connectOverCDP(cdp);
const page=browser.contexts()[0].pages().find(p=>p.url().startsWith(origin)) || await browser.contexts()[0].newPage();
const folder='docs/qa/th-search-r1-001';
const report={utc:new Date().toISOString(),surface:'Persistent Chrome, Playwright attached via local CDP',origin,sha,deployment,checks:[]};
async function hydrated(){await page.waitForFunction(()=>{const e=document.querySelector('input[name=q]');return e&&Object.keys(e).some(k=>k.startsWith('__reactProps'))});}
async function ui(){await page.waitForLoadState('networkidle');await hydrated();return page.evaluate(()=>({path:location.pathname,text:document.querySelector('main').innerText,width:innerWidth,scroll:document.documentElement.scrollWidth,robots:document.querySelector('meta[name=robots]')?.content}));}
async function api(q){return page.evaluate(async q=>{const r=await fetch('/api/ask?'+new URLSearchParams({q}));return{status:r.status,data:await r.json()}},q);}
async function snap(name){await page.screenshot({path:resolve(folder,`${label}-${name}.png`)});}
try {
  for(const [width,q] of [[1280,'USDOT 3244649'],[390,'usdot 3244 649 miama movers']]){
    await page.setViewportSize({width,height:900});await page.goto(origin+'/');await page.waitForLoadState('networkidle');await hydrated();
    const input=page.getByLabel('Mover research question, company, USDOT or MC number');await input.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await input.click();await input.fill(q);await input.press('Enter');await page.waitForURL('**/ask?*');
    let view=await ui();assert.equal(view.path,'/ask');assert.ok(view.text.includes('SHIFL INC'));assert.ok(view.text.includes('records USDOT 3244649.'));assert.ok(!view.text.includes('records USDOT 3244.'));assert.ok(view.scroll<=width);assert.match(view.robots,/noindex/);
    if(width===390){assert.match(view.text,/miama movers/);assert.match(view.text,/Not established/);}
    for(const name of ['Trace this result','Trace this query']){
      const summary=page.locator('summary').filter({hasText:name});await summary.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await page.waitForTimeout(300);const original=await summary.elementHandle();await summary.click();assert.ok(await original.evaluate(e=>e.isConnected));assert.ok(await summary.evaluate(e=>e.parentElement.open));
      await summary.press('Enter');assert.equal(await summary.evaluate(e=>e.parentElement.open),false);
      await summary.press('Enter');assert.ok(await summary.evaluate(e=>e.parentElement.open));
    }
    view=await ui();assert.match(view.text,/MC 1019808/);assert.ok(view.scroll<=width);
    const response=await api(q);assert.equal(response.status,200);assert.equal(response.data.results.length,1);const row=response.data.results[0];assert.equal(row.usdot,'3244649');assert.equal(row.mc,'1019808');assert.ok(view.text.includes(row.whyMatched));assert.equal(response.data.counts[0].value,1);
    await page.getByRole('heading',{name:'SHIFL INC',exact:true}).scrollIntoViewIfNeeded();await snap('identity-'+width);
    report.checks.push({name:'homepage-keyboard-native-api-trace',width,q,ui:view,api:response});
  }
  await page.setViewportSize({width:320,height:844});const narrow=await ui();assert.ok(narrow.scroll<=320);await snap('identity-320');report.checks.push({name:'320-overflow',width:320,scroll:narrow.scroll});
  const questions=['USDOT 3244 649','MC 1019 808','USDOT 3244','USDOT lookup','USDOT 3244 MC 649','mover in new jersey','How many current household-goods carriers are headquartered in New Jersey?','NJ PM/PW/PC licensed movers','movers in Miami','current interstate movers headquartered in Florida'];
  for(const [i,q] of questions.entries()){
    await page.setViewportSize({width:i%2?1280:390,height:900});await page.goto(origin+'/ask?'+new URLSearchParams({q}));const view=await ui();assert.equal(view.path,'/ask');assert.ok(view.scroll<=view.width);
    const response=await api(q),data=response.data;assert.equal(response.status,200);assert.notEqual(data.terminalState,'UNAVAILABLE');
    for(const row of data.results){assert.ok(view.text.includes(row.name));assert.ok(view.text.includes(row.whyMatched));}
    if(i<2){assert.equal(data.results.length,1);assert.equal(data.results[0].usdot,'3244649');}
    if(i===2)assert.ok(data.results.every(r=>r.usdot==='3244'));
    if(i===3)assert.equal(data.terminalState,'NEEDS_CLARIFICATION');
    if(i===4)assert.equal(data.results.length,0);
    if(i===5){assert.ok(data.results.length);assert.match(view.text,/recorded/i);assert.equal(data.query.executor,'directory');}
    if(i===6){assert.equal(data.query.mode,'count');assert.equal(data.query.role,'carrier');assert.equal(data.query.authorityCurrent,true);assert.equal(data.query.jurisdiction.state,'NJ');assert.ok(data.counts.length);assert.ok(view.text.includes(String(data.counts[0].value)));}
    if([7,8].includes(i)){assert.equal(data.results.length,0);assert.ok(['UNSUPPORTED','REQUEST_ONLY','NOT_ACQUIRED'].includes(data.coverageState));}
    if(i===9)assert.ok(data.results.length);
    if([3,5,6,7].includes(i))await snap('case-'+i);
    report.checks.push({name:q,ui:view,api:response});
  }
  report.status='PASS';
} finally {
  writeFileSync(`${folder}/${label}-browser.json`,JSON.stringify(report,null,2)+'\n');await browser.close();
}
console.log(JSON.stringify({status:report.status,checks:report.checks.length,artifact:`${folder}/${label}-browser.json`}));
