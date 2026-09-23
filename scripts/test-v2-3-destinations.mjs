/** Cross-repository URL/receiver contract checks, NOT a hosted browser pass. */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync,readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { directoryFiltersFromSearchParams } from '../lib/directory/build-directory-api-query.ts';
import { parseMoveIdentifiers } from '../lib/move-ask/identifier.ts';
import { classifyProvider } from '../lib/provider/classification.ts';

const root=process.env.ASK_HANDOFF_REVIEW_ROOT;
assert.ok(root,'ASK_HANDOFF_REVIEW_ROOT required');
assert.equal(execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),'ada0c19337e07bdfae511fc2e3d62459b09efdcd');
const load=file=>import(pathToFileURL(resolve(root,file)).href);
const {buildMoveDeepLink}=await load('lib/orchestration/journey-links.ts');
const {resolveEntityDestination}=await load('lib/network/entity-destination.ts');
const {rewriteMoveSpecialistHref}=await load('lib/network/move-origin.ts');
const preview='https://move-trust-fe65g6tam-savitz25-s-projects.vercel.app';
const previous=process.env.NEXT_PUBLIC_MOVE_ORIGIN;
process.env.NEXT_PUBLIC_MOVE_ORIGIN=preview; // This process only; no Vercel mutation.
try {
  const slug='hindman-isaacs-moving-storage-inc';
  const entity={hubId:'move',name:'HINDMAN & ISAACS MOVING & STORAGE INC',entityType:'carrier',
    identifier:{type:'usdot',value:'1002530'},specialistHref:'/companies/'+slug};
  const profile=new URL(resolveEntityDestination(entity,{originalQuery:'USDOT 1002530',geography:'US'}).href);
  assert.equal(profile.origin,preview);assert.equal(profile.pathname,'/companies/'+slug);
  for(const [key,value] of Object.entries({src:'asktrusthub',from_q:'USDOT 1002530',geo:'US',entity:'carrier',id_type:'usdot',id:'1002530'}))
    assert.equal(profile.searchParams.get(key),value);
  assert.ok(existsSync('app/(move)/companies/[slug]/page.tsx'));
  assert.doesNotMatch(readFileSync('app/(move)/companies/[slug]/page.tsx','utf8'),/searchParams/,
    'Profile identity must stay path-derived, not chosen by attribution id');
  console.log('D01 PASS exact profile + src/from_q/geo/id_type/id; attribution does not select Save identity');

  for(const type of ['usdot','mc']) {
    const url=new URL(resolveEntityDestination({...entity,specialistHref:null,identifier:{type,value:'1002530'}},
      {originalQuery:'identity research',geography:'US'}).href);
    assert.equal(url.origin,preview);assert.equal(url.pathname,'/ask');
    const parsed=parseMoveIdentifiers(url.searchParams.get('q'));
    assert.equal(parsed.error,undefined);assert.equal(parsed.identifiers[0].type,type);assert.equal(parsed.identifiers[0].value,'1002530');
  }
  console.log('D02 PASS supported USDOT/MC fallback is Move /ask?q= labelled identifier');

  const list=new URL(rewriteMoveSpecialistHref('https://www.movetrusthub.com/companies?search=Hindman&src=ask&journey=relocate&state=KY&intent=buy&from_q=USDOT+1002530&geo=KY'));
  assert.equal(list.origin,preview);assert.equal(list.pathname,'/companies');
  const filters=directoryFiltersFromSearchParams(Object.fromEntries(list.searchParams));
  assert.equal(filters.search,'Hindman');assert.equal(filters.state,'KY');
  assert.ok(existsSync('app/(move)/companies/page.tsx'));
  for(const key of ['src','journey','intent','from_q','geo'])assert.ok(list.searchParams.has(key));
  console.log('D03 PASS list search/state accepted; other context is non-authoritative URL metadata');

  for(const [context,path,file] of [
    [{stateSlug:'florida',stateCode:'FL'},'/local-movers/florida','app/(move)/(marketing)/local-movers/[stateSlug]/page.tsx'],
    [{stateSlug:'florida',stateCode:'FL',county:'miami-dade'},'/local-movers/florida/miami-dade','app/(move)/(marketing)/local-movers/[stateSlug]/[countySlug]/page.tsx'],
    [{stateSlug:'florida',stateCode:'FL',citySlug:'fort-lauderdale'},'/moving-to/florida/fort-lauderdale','app/(move)/(marketing)/moving-to/florida/[slug]/page.tsx'],
  ]) {
    const link=new URL(buildMoveDeepLink({...context,src:'ask',journey:'relocate',intent:'buy'}));
    assert.equal(link.origin,preview);assert.equal(link.pathname,path);assert.ok(existsSync(file));
    assert.equal(link.searchParams.get('src'),'ask');assert.equal(link.searchParams.get('journey'),'relocate');
    assert.equal(link.searchParams.get('state'),'FL');assert.equal(link.searchParams.get('intent'),'buy');
  }
  console.log('D04 PASS journey path/query shapes match Move route files; no hosted rendering claim');

  const malicious=new URL(rewriteMoveSpecialistHref('https://www.movetrusthub.com/companies?src=https://evil.test&journey=https://evil.test&parentOrigin=https://evil.test&origin=https://evil.test'));
  assert.equal(malicious.origin,preview);
  assert.equal(directoryFiltersFromSearchParams(Object.fromEntries(malicious.searchParams)).search,'');
  assert.match(readFileSync('lib/my-trusthub/parent-facade.ts','utf8'),/config\.parentOrigin\+PROFILE_SAVE_ENDPOINT/);
  console.log('D05 PASS query context cannot choose trusted service origin');

  // Sanitized fields read from the exact public row, 2026-09-21T20:20:19.686167Z.
  const classified=classifyProvider({services:['Carrier'],entityType:'Carrier',serviceScope:'interstate'});
  assert.ok(classified.roles.includes('hhg_carrier'));
  console.log('D06 PASS public fields classify HHG carrier; reviewed V2-3 class mover remains governance-supplied, not inferred binding');
}finally{if(previous===undefined)delete process.env.NEXT_PUBLIC_MOVE_ORIGIN;else process.env.NEXT_PUBLIC_MOVE_ORIGIN=previous;}
