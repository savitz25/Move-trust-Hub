import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const {chromium}=createRequire(import.meta.url)('C:/Users/makei/th-search-r1-012-work/node_modules/playwright');
const base=process.env.QA_BASE||'http://localhost:3214',tag=process.env.QA_TAG||'candidate';
const root='docs/qa/th-search-r1-014',browser=await chromium.launch({headless:true}),page=await browser.newPage({viewport:{width:1280,height:900}});
const rows=[];
try{
 for(const width of [1280,390]){
 await page.setViewportSize({width,height:900});await page.goto(base+'/ask?'+new URLSearchParams({q:'moving from Boca Raton Florida to Austin Texas'}));
 await page.locator('#journey-heading').waitFor();await page.screenshot({path:root+'/'+tag+'-viewport-'+width+'.png'});
 await page.locator('#journey-heading').scrollIntoViewIfNeeded();await page.screenshot({path:root+'/'+tag+'-guidance-'+width+'.png'});
 rows.push({width,scope:'Boca Raton FL to Austin TX',url:page.url()});
 }
 const q='movers in Austin Texas',consent=createHash('sha256').update(q).digest('hex').slice(0,24);
 await page.goto(base+'/ask?'+new URLSearchParams({q,consent,research:'recorded_state'}));
 const card=page.locator('main ol.grid > li').first();await card.waitFor();await card.screenshot({path:root+'/'+tag+'-record.png'});rows.push({scope:'explicit TX recorded-state broadening',card:await card.innerText()});
 await writeFile(root+'/'+tag+'-viewport-proof.json',JSON.stringify({base,at:new Date().toISOString(),rows},null,2));
}finally{await browser.close()}
