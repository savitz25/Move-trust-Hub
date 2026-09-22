// REAL mounted Next component + real popup Windows. Move BFF and Ask popup
// responses are explicitly MOCKED. This is a client security/UX test, NOT E2E
// authenticated parent Save, preview composition, or final Journey QA.
import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
const origin='http://localhost:4343',ask='https://conumers-trust-hub-git-mth-v2-3-pare-3127df-savitz25-s-projects.vercel.app';
const slug='hindman-isaacs-moving-storage-inc',ticket='t'.repeat(43),proof='p'.repeat(43),csrf='c'.repeat(43);
const out='scripts/output/v23-rebuild';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}),results=[];
try{
  for(const scenario of ['success','blocked','closed','wrong_origin','wrong_source','extra_field','duplicate','concurrent','expired_proof','copied_proof','account_switch','same_owner','signout','expired_challenge','parent_unavailable','project_failed']){
    const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();let receiptCalls=0,challengeCalls=0;
    await page.addInitScript(({slug,ticket,blocked})=>{
      localStorage.setItem('mth-local-saved-movers',JSON.stringify([{companySlug:slug,companyName:'Hindman',notes:'LOCAL_PRIVATE_FIXTURE',savedAt:'2026-09-22T00:00:00.000Z'}]));
      localStorage.setItem('mth-v23-retry:'+slug,ticket);
      const open=window.open.bind(window);window.open=(...args)=>{if(blocked)return null;const p=open(...args);window.__testPopup=p;return p;};
    },{slug,ticket,blocked:scenario==='blocked'});
    await context.route(ask+'/**',route=>route.fulfill({contentType:'text/html',headers:{'Cross-Origin-Opener-Policy':'unsafe-none'},body:'<!doctype html><html lang="en"><title>MOCK current parent</title><p>Local popup fixture. No parent authentication.</p></html>'}));
    await page.route('**/api/my-trusthub/profile-save',async route=>{
      const body=route.request().postDataJSON();assert.equal(route.request().method(),'POST');
      if(body.action==='bootstrap')return route.fulfill({json:{csrf}});
      if(body.action==='challenge'){
        challengeCalls++;assert.equal(body.ticket,ticket);
        if(['expired_challenge','parent_unavailable'].includes(scenario))return route.fulfill({status:scenario==='expired_challenge'?410:503,json:{state:scenario==='expired_challenge'?'expired':'unavailable',localCopy:'keep'}});
        return route.fulfill({json:{target:ask+'/my/profile-save/current-grant',fields:{challengeRef:'q'.repeat(43)}}});
      }
      assert.equal(body.action,'receipt');receiptCalls++;assert.equal(body.proofRef,proof);assert.equal(body.ticket,ticket);
      assert.equal(JSON.stringify(body).includes('LOCAL_PRIVATE_FIXTURE'),false);
      const denied=['expired_proof','copied_proof','account_switch','signout'].includes(scenario);
      return route.fulfill({status:denied?403:200,json:denied?{state:scenario==='expired_proof'?'expired':'account_changed',localCopy:'keep'}:{state:'parent_saved',projectFailed:scenario==='project_failed',returnPath:'/companies/'+slug,localCopy:'keep'}});
    });
    await page.goto(origin+'/companies/'+slug,{waitUntil:'domcontentloaded'});
    const button=page.getByRole('button',{name:'Check My TrustHub save',exact:true});await button.waitFor();
    const before=await page.evaluate(()=>localStorage.getItem('mth-local-saved-movers'));
    await button.focus();
    const popupEvent=scenario==='blocked'?null:page.waitForEvent('popup');
    await button.press('Enter');
    let popup=popupEvent?await popupEvent:null;
    if(!['blocked','expired_challenge','parent_unavailable'].includes(scenario)){
      await popup.waitForURL(ask+'/**');
      await expect(page.getByRole('button',{name:'Checking My TrustHub…',exact:true})).toBeDisabled();
      if(scenario==='closed'){await popup.close();}
      else{
        if(['wrong_origin','wrong_source','extra_field'].includes(scenario)){
          await page.evaluate(({ask,proof,scenario})=>window.dispatchEvent(new MessageEvent('message',{origin:scenario==='wrong_origin'?'https://wrong.test':ask,source:scenario==='wrong_source'?window:window.__testPopup,data:{type:'v23-current-grant',proofRef:proof,...(scenario==='extra_field'?{accountId:'untrusted'}:{})}})),{ask,proof,scenario});
          await page.waitForTimeout(300);assert.equal(receiptCalls,0);await expect(page.getByRole('button',{name:'Checking My TrustHub…',exact:true})).toBeDisabled();
        }
        if(scenario==='concurrent'){
          await page.getByRole('button',{name:'Checking My TrustHub…',exact:true}).evaluate(el=>{el.click();el.click();});assert.equal(challengeCalls,1);
        }
        await popup.evaluate(({proof,origin,duplicate})=>{const m={type:'v23-current-grant',proofRef:proof};window.opener.postMessage(m,origin);if(duplicate)window.opener.postMessage(m,origin);},{proof,origin,duplicate:scenario==='duplicate'});
      }
    }
    const failure=['blocked','closed','expired_proof','copied_proof','account_switch','signout','expired_challenge','parent_unavailable'].includes(scenario);
    await expect(page.getByRole('status').filter({hasText:failure?'My TrustHub sync unavailable':'Saved to My TrustHub'})).toBeVisible({timeout:10000});
    await expect(button).toBeFocused();
    assert.equal(await page.evaluate(()=>localStorage.getItem('mth-local-saved-movers')),before);
    assert.ok(receiptCalls<=1);if(scenario==='project_failed')await expect(page.getByRole('status').filter({hasText:'Project assignment failed'})).toBeVisible();
    if(scenario==='success'){
      const axe=await new AxeBuilder({page}).include('[data-ph-no-capture="true"]').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations,[]);
    }
    results.push({scenario,pass:true,receiptCalls,challengeCalls,localRetained:true,focusRestored:true,mockedParent:true});console.log('PASS mounted client fixture '+scenario);
    await context.close();
  }
}finally{writeFileSync(out+'/popup-fixtures.json',JSON.stringify({realParentAuth:false,results},null,2));await browser.close();}
