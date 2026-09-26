// Current Next profile, real public read data, anonymous browser. No parent Auth
// simulation or hosted V2-3 activation. Run both exact-base and rebuilt servers.
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const out='scripts/output/v23-rebuild';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const onlyCandidate=process.argv.includes('--candidate');
const results=onlyCandidate?JSON.parse(readFileSync(out+'/profile-browser.json','utf8')).filter(r=>r.label==='baseline'):[];
try {
  for(const [label,origin] of [['baseline','http://localhost:4344'],['candidate','http://localhost:4343']]){
    if(onlyCandidate&&label==='baseline')continue;
    for(const width of [1440,390,320]){
      const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage();
      const errors=[],blocked=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
      await context.route('**/*',async route=>{
        const req=route.request(),url=new URL(req.url());
        if(!['localhost','127.0.0.1'].includes(url.hostname)&&!['GET','HEAD'].includes(req.method())){blocked.push({host:url.hostname,path:url.pathname,method:req.method()});return route.abort();}
        if(/google-analytics|googletagmanager|posthog/.test(url.hostname))return route.abort();
        return route.continue();
      });
      await page.goto(origin+'/companies/hindman-isaacs-moving-storage-inc',{waitUntil:'domcontentloaded',timeout:120000});
      await page.getByRole('heading',{name:'Hindman & Isaacs Moving & Storage, INC.',exact:true}).waitFor();
      await page.waitForTimeout(1000);
      if(label==='baseline'){await page.mouse.move(50,100);await page.keyboard.press('Tab');}
      const save=page.getByRole('button',{name:'Save mover',exact:true});
      await save.waitFor();await page.waitForFunction(()=>[...document.querySelectorAll('button')].some(b=>b.textContent.trim()==='Save mover'&&!b.disabled&&Object.keys(b).some(k=>k.startsWith('__reactProps$')&&typeof b[k]?.onClick==='function')));await save.focus();await save.press('Enter');
      await page.getByRole('button',{name:'Saved',exact:true}).waitFor({timeout:25000});
      const local=await page.evaluate(()=>localStorage.getItem('mth-local-saved-movers'));
      const conversion=await page.getByRole('button',{name:'Keep this in My TrustHub',exact:true}).count();
      await page.reload({waitUntil:'domcontentloaded'});
      await page.getByRole('button',{name:'Saved',exact:true}).waitFor();
      const retained=await page.evaluate(()=>localStorage.getItem('mth-local-saved-movers'))===local;
      await page.waitForTimeout(1000);
      const axe=await new AxeBuilder({page}).exclude('nextjs-portal').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      const overflow=await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth}));
      await page.screenshot({path:`${out}/${label}-${width}.png`,fullPage:true});
      results.push({label,width,localSave:!!local,localReload:retained,conversionCount:conversion,overflow,
        violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))})),errors:[...new Set(errors)],blockedExternalWrites:blocked});
      console.log(JSON.stringify({label,width,localReload:retained,conversion,overflow,violations:axe.violations.map(v=>[v.id,v.nodes.length]),errors:errors.length}));
      await context.close();
    }
  }
}finally{writeFileSync(out+'/profile-browser.json',JSON.stringify(results,null,2));await browser.close();}
