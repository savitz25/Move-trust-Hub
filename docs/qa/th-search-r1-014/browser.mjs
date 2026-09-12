import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/makei/th-search-r1-012-work/node_modules/playwright');
const base=process.env.QA_BASE||'http://localhost:3214';
const tag=process.env.QA_TAG||'local';const root='docs/qa/th-search-r1-014';
const queries=['moving from Miami Florida to New York City','moving from Boca Raton Florida to Austin Texas','movers near me','movers in Austin Texas','local mover in New Jersey','interstate mover Florida to New Jersey','auto transport Florida to Texas','book a mover tomorrow','JK Moving from Virginia to Florida','USDOT 3244649','MC 225850'];
const browser=await chromium.launch({headless:true});const ctx=await browser.newContext({viewport:{width:390,height:844}});const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));const rows=[];
try{
 for(const [i,q]of queries.entries()){
  const t=Date.now();await page.goto(base+'/ask?'+new URLSearchParams({q}),{waitUntil:'domcontentloaded'});await page.getByRole('heading',{name:'MoveTrustHub specialist research',exact:true}).waitFor();await page.locator('#ask-edit').waitFor();
  const text=await page.locator('main').innerText();const settledMs=Date.now()-t;const apiStart=Date.now();const api=await(await page.request.get(base+'/api/ask?'+new URLSearchParams({q}))).json();const apiMs=Date.now()-apiStart;
  if(i<9&&!api.query.journey)throw Error('Missing journey '+q);
  for(const record of api.results)if(!text.includes(record.name))throw Error('API identity missing from rendered UI');
  if(i===0&&(api.query.journey.origin?.city!=='Miami'||api.query.journey.origin?.state!=='FL'||api.query.journey.destination?.city!=='New York City'||api.query.journey.destination?.state!=='NY'))throw Error('Miami/NYC scope mismatch');
  if(i===1&&(api.query.journey.origin?.city!=='Boca Raton'||api.query.journey.destination?.city!=='Austin'||api.query.journey.destination?.state!=='TX'))throw Error('Boca/Austin scope mismatch');
  if(i===6&&api.query.journey.capabilities.some(c=>c.authority.length))throw Error('HHG state authority leaked into auto transport');
  if(i===7&&!text.includes('does not book, dispatch, or confirm'))throw Error('Missing booking boundary');
  if(i===9&&api.results[0]?.usdot!=='3244649')throw Error('Exact ID mismatch');
  if(i===10&&(api.terminalState!=='SOURCE_CONFLICT'||api.results.length))throw Error('MC containment failed');
  if(i<8&&api.results.length)throw Error('Unintended cohort');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(overflow)throw Error('Overflow '+q);
  await page.screenshot({path:`${root}/${tag}-${i+1}.png`,fullPage:true});rows.push({q,at:new Date().toISOString(),ms:Date.now()-t,settledMs,apiMs,width:390,overflow,text,api});
 }
 await page.goto(base);await page.getByRole('textbox',{name:/Mover research question/}).first().fill(queries[1]);await page.getByRole('textbox',{name:/Mover research question/}).first().press('Enter');await page.waitForURL('**/ask?**',{waitUntil:'domcontentloaded'});await page.locator('#journey-heading').waitFor();
 rows.push({flow:'Homepage first Enter',url:page.url(),text:await page.locator('#journey-heading').innerText()});
 await page.goto(base+'/ask?'+new URLSearchParams({q:'movers in Austin Texas'}));await page.getByRole('link',{name:'Research Texas recorded identities instead'}).focus();await page.keyboard.press('Enter');await page.waitForURL(u=>u.searchParams.get('research')==='recorded_state',{waitUntil:'commit'});await page.getByText('You selected broader recorded-state identity research.',{exact:false}).waitFor();
 if(!(await page.locator('main').innerText()).includes('recorded headquarters'))throw Error('Missing executed scope');
 const broadApi=await(await page.request.get(base+'/api/ask?'+new URL(page.url()).searchParams)).json();if(broadApi.query.journey?.outcome!=='USER_APPROVED_RELAXATION'||!broadApi.results.length)throw Error('Broader corpus did not execute');for(const r of broadApi.results)if(!/\bTX(?:\s+\d{5}(?:-\d{4})?)?$/.test(r.headquarters??'')||!(await page.locator('main').innerText()).includes(r.name))throw Error('Broader row scope/UI mismatch');rows.push({flow:'Explicit broadening',url:page.url(),api:broadApi,text:await page.locator('main').innerText()});
 await page.reload({waitUntil:'domcontentloaded'});await page.locator('#journey-heading').waitFor();await page.goBack({waitUntil:'domcontentloaded'});await page.getByRole('link',{name:'Research Texas recorded identities instead'}).waitFor();await page.goForward({waitUntil:'domcontentloaded'});await page.getByText('You selected broader recorded-state identity research.',{exact:false}).waitFor();
 await page.goto(base+'/ask?'+new URLSearchParams({q:'moving from Springfield to Dallas Texas'}));await page.locator('select[name=originState]').selectOption('IL');await page.getByRole('button',{name:'Apply origin state'}).click();await page.waitForURL(u=>u.searchParams.get('originState')==='IL',{waitUntil:'commit'});await page.locator('#journey-heading').waitFor();
 rows.push({flow:'Endpoint state choice',url:page.url(),text:await page.locator('main').innerText()});
 await page.goto(base+'/ask?'+new URLSearchParams({q:'JK Moving from Virginia to Florida'}));const select=page.getByRole('link',{name:'Select this company and continue'}).first();await select.click();await page.waitForURL(u=>u.searchParams.has('company'),{waitUntil:'commit'});await page.locator('#journey-heading').waitFor();const selectedApi=await(await page.request.get(base+'/api/ask?'+new URL(page.url()).searchParams)).json();if(selectedApi.results.length!==1||selectedApi.query.journey?.origin?.state!=='VA'||selectedApi.query.journey?.destination?.state!=='FL')throw Error('Selection lost identity or journey');rows.push({flow:'Company selection',url:page.url(),api:selectedApi,text:await page.locator('main').innerText()});
 await page.locator('#ask-edit').fill('movers near me');await page.locator('#ask-edit').press('Enter');await page.waitForURL(u=>u.searchParams.get('q')==='movers near me',{waitUntil:'commit'});await page.locator('input[name=location]').waitFor();if((await page.locator('main').innerText()).includes('Stored legal name:'))throw Error('Stale company card');
 for(const width of [320,768,1280]){await page.setViewportSize({width,height:900});await page.goto(base+'/ask?'+new URLSearchParams({q:queries[1]}));await page.locator('#journey-heading').waitFor();await page.getByText('Trace this journey',{exact:true}).click();const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(overflow)throw Error('Overflow '+width);await page.screenshot({path:`${root}/${tag}-width-${width}.png`,fullPage:true});rows.push({flow:'Responsive and Trace',width,overflow});}
 await writeFile(`${root}/${tag}-browser.json`,JSON.stringify({base,at:new Date().toISOString(),rows,errors},null,2));
 console.log(JSON.stringify({tag,cases:rows.length,errors,maxCaseMs:Math.max(...rows.map(r=>r.ms||0))}));
}catch(e){await writeFile(`${root}/${tag}-browser.json`,JSON.stringify({base,rows,errors,failure:String(e)},null,2));await page.screenshot({path:`${root}/${tag}-failure.png`,fullPage:true});throw e;}finally{await browser.close();}
