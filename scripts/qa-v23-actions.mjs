// Actual current-main/candidate pages and local storage. No parent Auth mocks,
// legacy login or hosted writes. This is consumer regression QA, not final JQA.
import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const out='scripts/output/v23-rebuild';mkdirSync(out,{recursive:true});
const onlyCandidate=process.argv.includes('--candidate');
const browser=await chromium.launch({headless:true}),results=onlyCandidate?JSON.parse(readFileSync(out+'/actions-browser.json','utf8')).filter(r=>r.label==='baseline'):[];
const slug='hindman-isaacs-moving-storage-inc';
try {
  for(const [label,origin] of [['baseline','http://localhost:4344'],['candidate','http://localhost:4343']]) {
    if(onlyCandidate&&label==='baseline')continue;
    for(const width of [1440,390,320]) {
      const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[],writes=[];
      page.setDefaultNavigationTimeout(120000);page.setDefaultTimeout(45000);
      page.on('pageerror',e=>errors.push(e.message));
      page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
      await context.route('**/*',route=>{
        const r=route.request(),u=new URL(r.url());
        if(u.hostname!=='localhost'&&!['GET','HEAD'].includes(r.method())){writes.push(u.hostname+u.pathname);return route.abort();}
        if(/google-analytics|googletagmanager|posthog/.test(u.hostname))return route.abort();
        return route.continue();
      });
      await page.goto(origin+'/companies/'+slug,{waitUntil:'domcontentloaded',timeout:120000});
      await page.getByRole('heading',{name:'Hindman & Isaacs Moving & Storage, INC.',exact:true}).waitFor();
      await page.waitForTimeout(1000);
      await page.mouse.move(50,100);await page.keyboard.press('Tab');
      assert.equal(await page.getByRole('button',{name:'Keep this in My TrustHub',exact:true}).count(),0);
      await page.waitForFunction(()=>[...document.querySelectorAll('button')].some(b=>b.textContent.trim()==='Save mover'&&Object.keys(b).some(k=>k.startsWith('__reactProps$')&&typeof b[k]?.onClick==='function')));
      const save=page.getByRole('button',{name:'Save mover',exact:true});await save.waitFor();await expect(save).toBeEnabled({timeout:45000});await save.focus();await save.press('Enter');
      await page.getByRole('button',{name:'Saved',exact:true}).waitFor();
      const local=await page.evaluate(()=>localStorage.getItem('mth-local-saved-movers'));assert.ok(local);
      await page.reload({waitUntil:'domcontentloaded'});await page.getByRole('button',{name:'Saved',exact:true}).waitFor();
      assert.equal(await page.evaluate(()=>localStorage.getItem('mth-local-saved-movers')),local);
      let scopedA11y=null;
      if(label==='candidate') {
        const keep=page.getByRole('button',{name:'Keep this in My TrustHub',exact:true});await keep.waitFor();await keep.focus();
        const focus=await keep.evaluate(el=>({style:getComputedStyle(el).outlineStyle,width:getComputedStyle(el).outlineWidth}));
        assert.notEqual(focus.style,'none');assert.notEqual(focus.width,'0px');
        // Real unconfigured runtime fails closed; no mocked parent success.
        await keep.press('Enter');await expect(page.getByRole('status').filter({hasText:'My TrustHub sync unavailable'})).toBeVisible({timeout:30000});
        await expect(keep).toBeFocused();
        const axe=await new AxeBuilder({page}).include('[data-ph-no-capture="true"]').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
        assert.deepEqual(axe.violations,[]);scopedA11y={violations:0,keyboardFocusVisible:true,errorAnnounced:true};
      }
      await page.getByRole('link',{name:'Compare',exact:true}).click();
      await page.waitForURL('**/compare?add='+slug,{timeout:120000,waitUntil:'domcontentloaded'});
      const remove=page.getByRole('button',{name:/Remove .* from compare/}).first();await remove.waitFor({timeout:45000});
      assert.ok(await page.evaluate(slug=>JSON.parse(localStorage.getItem('im-compare-storage')).state.selectedSlugs.includes(slug),slug));
      await remove.click();
      await expect.poll(()=>page.evaluate(slug=>JSON.parse(localStorage.getItem('im-compare-storage')).state.selectedSlugs.includes(slug),slug)).toBe(false);
      await page.goBack({waitUntil:'domcontentloaded'});await page.getByRole('button',{name:'Saved',exact:true}).waitFor();
      await page.getByRole('link',{name:'Compare',exact:true}).click();await page.waitForURL('**/compare?add='+slug,{timeout:120000,waitUntil:'domcontentloaded'});
      await page.getByRole('button',{name:/Remove .* from compare/}).first().waitFor();
      await page.goto(origin+'/my-move',{waitUntil:'domcontentloaded',timeout:120000});
      await expect(page.getByText('Sign in (optional)',{exact:true})).toBeVisible({timeout:45000});
      assert.equal(await page.evaluate(()=>localStorage.getItem('mth-local-saved-movers')),local);
      await page.goto(origin+'/companies/advantage-van-lines-llc',{waitUntil:'domcontentloaded'});
      await page.getByRole('heading',{level:1}).waitFor();await page.waitForTimeout(1000);await page.keyboard.press('Tab');
      await page.getByRole('button',{name:'Save mover',exact:true}).click();await page.getByRole('button',{name:'Saved',exact:true}).waitFor();
      assert.equal(await page.getByRole('button',{name:'Keep this in My TrustHub',exact:true}).count(),0);
      await page.goBack({waitUntil:'domcontentloaded'});await expect(page.getByText('Sign in (optional)',{exact:true})).toBeVisible();
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);
      assert.deepEqual(writes,[]);
      results.push({label,width,localSave:true,localReload:true,compareAddRemove:true,myMoveGuestNavigation:true,backNavigation:true,ineligibleMountAbsent:true,scopedA11y,errors:[...new Set(errors)],externalWrites:writes});
      console.log(JSON.stringify({label,width,pass:true,errors:errors.length}));await context.close();
    }
  }
} finally {writeFileSync(out+'/actions-browser.json',JSON.stringify(results,null,2));await browser.close();}
