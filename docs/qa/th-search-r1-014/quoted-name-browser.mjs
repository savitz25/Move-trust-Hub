import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)('C:/Users/makei/th-search-r1-012-work/node_modules/playwright');
const base=process.env.QA_BASE||'http://localhost:3214',tag=process.env.QA_TAG||'name-guard-local',browser=await chromium.launch({headless:true}),page=await browser.newPage({viewport:{width:390,height:844}}),rows=[];
try{
 for(const q of ['Research "From Here To There Moving LLC"','Can "JK Moving" handle my move from Virginia to Florida?']){
 const t=Date.now();await page.goto(base+'/ask?'+new URLSearchParams({q}),{waitUntil:'domcontentloaded'});await page.locator('#ask-edit').waitFor();const text=await page.locator('main').innerText(),api=await(await page.request.get(base+'/api/ask?'+new URLSearchParams({q}))).json();
 if(q.startsWith('Research')&&(api.query.journey||api.query.nameQuery!=='From Here To There Moving LLC'))throw Error('Quoted source name misclassified');
 if(q.startsWith('Can')&&(!api.results.length||api.query.nameQuery!=='JK Moving'||api.query.journey?.origin?.state!=='VA'||api.query.journey?.destination?.state!=='FL'))throw Error('Quoted company plus journey failed');
 for(const r of api.results)if(!text.includes(r.name))throw Error('Missing rendered identity');
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Overflow');
 rows.push({q,at:new Date().toISOString(),ms:Date.now()-t,api,text});
 }
 await page.getByRole('link',{name:'Select this company and continue'}).first().click();await page.waitForURL(u=>u.searchParams.has('company'),{waitUntil:'commit'});await page.locator('#journey-heading').waitFor();
 const api=await(await page.request.get(base+'/api/ask?'+new URL(page.url()).searchParams)).json();if(api.results.length!==1||api.query.journey?.destination?.state!=='FL')throw Error('Quoted candidate selection lost scope');
 rows.push({flow:'quoted company selection',api,text:await page.locator('main').innerText()});
 await writeFile('docs/qa/th-search-r1-014/'+tag+'.json',JSON.stringify({base,at:new Date().toISOString(),rows},null,2));
 console.log(JSON.stringify({tag,cases:rows.length,pass:true}));
}finally{await browser.close()}
