import {createRequire} from 'node:module';
import {writeFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.R1_PLAYWRIGHT_PATH || 'playwright-core');
const base=process.argv[2], label=process.argv[3]??'candidate',sha=process.argv[4]??'unrecorded';
if(!base)throw Error('Provide authorized base URL');
const dir=`docs/qa/th-search-r1-005/${label}`;mkdirSync(dir,{recursive:true});
const output={time:new Date().toISOString(),base,sha,budgetMs:25000,observations:[],screenshots:[],failures:[]};
const browser=await chromium.connectOverCDP(process.env.R1_CDP_URL || 'http://127.0.0.1:9222');
const page=await browser.contexts()[0].newPage();page.setDefaultTimeout(25000);
const api=async(params)=>{const r=await fetch(`${base}/api/ask?${params}`,{signal:AbortSignal.timeout(25000)});return r.json()};
const url=(q)=>`${base}/ask?${new URLSearchParams({q})}`;
async function check(q,{home=false,width=1280}={}){
 await page.setViewportSize({width,height:900});const t=Date.now();
 if(home){await page.goto(base,{waitUntil:'domcontentloaded'});const input=page.locator('#home-move-research');await input.fill(q);await input.press('Enter');await page.waitForURL(u=>u.pathname==='/ask'&&u.searchParams.get('q')===q);}
 else await page.goto(url(q),{waitUntil:'domcontentloaded'});
 await page.locator('#ask-edit').waitFor();assert.equal(await page.locator('#ask-edit').inputValue(),q);
 const params=new URL(page.url()).searchParams;const data=await api(params);
 const actual=await page.locator('ol > li h3').allTextContents();assert.deepEqual(actual,data.results.map(r=>r.name));
 const body=await page.locator('body').innerText();for(const r of data.results){assert.ok(body.includes(r.whyMatched));if(r.usdot)assert.ok(body.includes(r.usdot));if(r.officialVerificationUrl){const official=new URL(r.officialVerificationUrl);assert.equal(official.hostname,'safer.fmcsa.dot.gov');assert.equal(official.searchParams.get('query_string'),r.usdot||r.mc);assert.ok(await page.locator('a').evaluateAll((xs,href)=>xs.some(a=>a.href===href),r.officialVerificationUrl));}}
 if(q.includes('JK Moving')){assert.ok(data.results.some(r=>r.usdot==='1065394'));assert.ok(data.results.some(r=>r.usdot==='1300300'));assert.equal(data.query.nameQuery,'JK Moving Services');assert.equal(data.terminalState,'NEEDS_CLARIFICATION');assert.ok(data.results.every(r=>r.nameMatchEvidence));}
 if(q==='SHIFL INC'||q==='Is SHIFL INC a carrier or broker?'){assert.equal(data.results[0]?.usdot,'3244649');assert.equal(data.results[0]?.role,'Broker');}
 if(q==='BKQ LOGISTICS, LLC'){assert.equal(data.results[0]?.entityId,'fl-im-3743');assert.equal(data.results[0]?.usdot,null);assert.equal(data.results[0]?.mc,null);assert.equal(data.results[0]?.operatingAuthority,null);assert.match(data.results[0]?.fmcsaStatus??'',/not established/);assert.match(body,/No stored USDOT\/MC identifier/);assert.doesNotMatch(body,/stored FMCSA legal name|State registration row/);}
 if(q==='ALLIED VAN LINES INC')assert.equal(data.results[0]?.usdot,'76235');
 if(q.includes('Impossiblequokka')){assert.equal(data.terminalState,'NO_MATCH');assert.equal(actual.length,0);assert.match(body,/Refine the name/);}
 if(q==='USDOT 3244'){assert.equal(data.results.length,0);assert.equal(data.terminalState,'NO_MATCH');}
 if(q==='USDOT 3244649'||q==='usdot 3244 649 miama movers'){assert.equal(data.results[0]?.usdot,'3244649');assert.equal(data.results[0]?.matchEvidence?.fields[0]?.returned,'3244649');}
 if(q.startsWith('How many current household-goods')){assert.equal(data.query.mode,'count');assert.equal(data.query.role,'carrier');assert.equal(data.query.authorityCurrent,true);assert.equal(data.query.jurisdiction.state,'NJ');for(const c of data.counts)assert.ok(body.includes(c.value.toLocaleString('en-US')));}
 if(q==='Show intrastate movers in New York'){assert.equal(data.coverageState,'NOT_ACQUIRED');assert.equal(data.results.length,0);}
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);
 const ms=Date.now()-t;assert.ok(ms<25000,`${q}: ${ms}ms`);
 output.observations.push({q,width,home,ms,url:page.url(),terminal:data.terminalState,name:data.query.nameQuery,task:data.query.nameRequest?.task,conditions:data.query.constraints,candidates:data.results.map(r=>({id:r.entityId,name:r.name,usdot:r.usdot,field:r.nameMatchEvidence?.field,value:r.nameMatchEvidence?.returned,match:r.nameMatchEvidence?.matchType})),counts:data.counts,pagination:data.pagination,overflow});
 return data;
}
try{
 await check('JK Moving Services',{home:true});
 for(const q of ['JK Moving Services licensed?','SHIFL INC','ALLIED VAN LINES INC','BKQ LOGISTICS, LLC','JK','Impossiblequokka Moving Services','Is SHIFL INC a carrier or broker?','JK Moving Services licensed in New Jersey?','USDOT 3244649','usdot 3244 649 miama movers','USDOT 3244','movers in New Jersey','How many current household-goods carriers are headquartered in New Jersey?','carrier vs broker','Show intrastate movers in New York'])await check(q);
 for(const width of [390,320]){
  await check('JK Moving Services licensed?',{home:width===390,width});
  await page.getByText('Trace this query',{exact:true}).click();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${dir}/jk-${width}.png`,fullPage:true});output.screenshots.push(`jk-${width}.png`);
  const link=page.getByRole('link',{name:'Select this company and continue'}).first();await link.focus();assert.equal(await link.evaluate(e=>e===document.activeElement),true);await link.press('Enter');await page.waitForURL(u=>u.searchParams.has('company'));await page.locator('#ask-edit').waitFor();
  const selected=await api(new URL(page.url()).searchParams);assert.equal(selected.results.length,1);assert.equal(selected.results[0].usdot,'1065394');assert.equal(selected.query.nameRequest.task,'authority');assert.equal((await page.locator('ol > li h3').allTextContents()).length,1);
  await page.reload({waitUntil:'domcontentloaded'});assert.equal(new URL(page.url()).searchParams.get('q'),'JK Moving Services licensed?');await page.goBack({waitUntil:'domcontentloaded'});assert.equal(new URL(page.url()).searchParams.has('company'),false);await page.goForward({waitUntil:'domcontentloaded'});assert.equal(new URL(page.url()).searchParams.has('company'),true);
  output.observations.push({flow:'keyboard selection/reload/back/forward',width,selected:selected.results[0].entityId,originalTask:selected.query.nameRequest.task});
  const edit=page.locator('#ask-edit');await edit.fill('Impossiblequokka Moving Services');await edit.press('Enter');await page.waitForURL(u=>u.searchParams.get('q')==='Impossiblequokka Moving Services');await page.getByRole('heading',{name:'No matching research identities in this extract'}).waitFor();assert.equal(await page.locator('ol > li h3').count(),0);assert.equal(new URL(page.url()).searchParams.has('company'),false);await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${dir}/miss-${width}.png`,fullPage:true});
  output.observations.push({flow:'success to miss via edit; no stale cards/selection',width,pass:true});
 }
 await check('ALLIED VAN LINES INC',{home:true,width:1280});await page.getByText('Trace this result',{exact:true}).click();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${dir}/positive-1280.png`,fullPage:true});
 await page.getByText('Advanced filters',{exact:true}).click();await page.locator('select[name=state]').selectOption('NJ');await page.locator('#move-research').press('Enter');await page.waitForURL(u=>u.searchParams.get('state')==='NJ');await page.locator('#ask-edit').waitFor();assert.equal(await page.locator('select[name=state]').inputValue(),'NJ');const filtered=await api(new URL(page.url()).searchParams);assert.equal(filtered.query.nameQuery,'ALLIED VAN LINES INC');assert.equal(filtered.results[0].usdot,'76235');assert.ok(filtered.query.constraints.some(c=>c.field==='state'&&c.outcome==='CONFLICT'));await page.reload({waitUntil:'domcontentloaded'});assert.equal(await page.locator('select[name=state]').inputValue(),'NJ');output.observations.push({flow:'typed state override retains name; conflict shown; refresh',pass:true});
}catch(e){output.failures.push(String(e));throw e}finally{writeFileSync(`${dir}/browser.json`,JSON.stringify(output,null,2));await page.close();await browser.close();console.log(JSON.stringify({label,observations:output.observations.length,failures:output.failures}));}
