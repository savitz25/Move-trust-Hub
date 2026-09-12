import test from 'node:test';import assert from 'node:assert/strict';
import { mapCompanyRow } from '../supabase/queries/companies';
test('R1-006 known disputed MC is not projected as a trusted public identifier',()=>{
 const c=mapCompanyRow({id:'jk-moving',slug:'jk-moving-services',name:'JK Moving Services',usdot_number:'1065394',mc_number:'225850',publication_state:'PUBLISHABLE',fmcsa_last_checked:'2026-08-23T05:02:18.368Z'});
 assert.equal(c.usdotNumber,'1065394');assert.equal(c.mcNumber,'');
});
import { associationIntegrity, projectCompanyAssociation, mcValue } from '../fmcsa/association-integrity';
import { executeMoveRequest, publicAskPayload } from './execute';
import { fixtureFetch, publishedIdentity } from './r1-fixtures';
import { CANONICAL_SUPABASE_URL } from '../supabase/canonical-project';
import { normalizeStoredIdentifier } from './identifier';
import { mergeEnrichmentOntoProfile } from '../directory/merge-directory';
import { finalizeCompanyEnrichmentForDisplay } from '../verification/company-display-enrichment';
import { prepareCompaniesForDirectoryClient } from '../directory/directory-client-payload';
import { seedCompanies } from '../../data/seed-companies';
import { activeDirectoryMovers } from '../../data/active-directory-movers';
import { CompanyResearchHero } from '../../components/company/company-research-hero';
import { CompanyProfileIdentity } from '../../components/company/company-profile-identity';
import { AssociationDisclosure } from '../../components/company/association-disclosure';
import { AskMoveResultView } from '../../components/ask-move-result';
import { DotVerifierResults } from '../../components/verify-dot/dot-verifier-results';
import { profileSeoDescription } from '../company/research-profile';
import { GET } from '../../app/api/ask/route';
import React from 'react';import { renderToStaticMarkup } from 'react-dom/server';
Object.assign(globalThis,{React});
const jk={...publishedIdentity,id:'jk-moving',slug:'jk-moving-services',name:'JK Moving Services',fmcsa_legal_name:'JK MOVING & STORAGE INC',sourceDba:'JK MOVING SERVICES',usdot_number:'1065394',mc_number:'225850',fmcsa_last_checked:'2026-08-23T05:02:18.368Z',data_hash:'5d0585c2184935aa52df9b33545883eab15d7eecd7e366ec6bed038184969a01'};
const maryland={...jk,id:'maryland',usdot_number:'1300300',mc_number:'504611'};
async function source(run:()=>Promise<void>,rows:Record<string,unknown>[]=[jk,publishedIdentity,maryland],fail=false){
 const old={fetch:globalThis.fetch,url:process.env.NEXT_PUBLIC_SUPABASE_URL,key:process.env.SUPABASE_SERVICE_ROLE_KEY};const f=fixtureFetch(rows);
 process.env.NEXT_PUBLIC_SUPABASE_URL=CANONICAL_SUPABASE_URL;process.env.SUPABASE_SERVICE_ROLE_KEY='fixture-only';
 globalThis.fetch=async(input,init)=>{if(fail)throw Error('fixture source unavailable');const u=new URL(typeof input==='string'?input:input instanceof URL?input:input.url);if(u.pathname.endsWith('/rpc/directory_search_suggestions'))return new Response(JSON.stringify(rows.filter(r=>r.publication_state!=='REVIEW_REQUIRED').map(r=>({company_id:r.id}))),{headers:{'content-type':'application/json'}});return f.fetcher(input,init)};
 try{await run()}finally{globalThis.fetch=old.fetch;if(old.url)process.env.NEXT_PUBLIC_SUPABASE_URL=old.url;else delete process.env.NEXT_PUBLIC_SUPABASE_URL;if(old.key)process.env.SUPABASE_SERVICE_ROLE_KEY=old.key;else delete process.env.SUPABASE_SERVICE_ROLE_KEY;}
}
test('disputed MC and pair are source conflicts; legacy consumers receive no confirmed JK association',async()=>source(async()=>{
 for(const q of ['MC 225850','MC 225 850','USDOT 1065394 MC 225850']){const r=await executeMoveRequest({q});assert.equal(r.terminalState,'SOURCE_CONFLICT');assert.ok(r.parsed.query.constraints?.filter(c=>c.field==='mc').every(c=>c.outcome==='NEEDS_CLARIFICATION'));assert.equal(r.results[0]?.mc,null);assert.equal(r.results[0]?.matchEvidence,undefined);assert.equal(r.results[0]?.operatingAuthority,null);assert.equal(r.results[0]?.complaintsNote,null);assert.equal(r.results[0]?.fmcsaStatus,null);const payload=publicAskPayload(r);assert.equal(payload.results.length,0);assert.equal(payload.sourceConflictCandidates.length,1);assert.equal(payload.query.mode,'fail_closed');assert.match(payload.query.failReason??'',/under review/);assert.match(r.results[0]?.whyMatched??'',/does not confirm/i);}
}));
test('corroborated USDOT survives with conflict disclosure and never a disputed company-verification link',async()=>source(async()=>{
 const r=await executeMoveRequest({q:'USDOT 1065 394'}),c=r.results[0]!;assert.equal(r.terminalState,'FOUND');assert.equal(c.usdot,'1065394');assert.equal(c.mc,null);assert.equal(c.matchEvidence?.fields[0]?.returned,'1065394');const u=new URL(c.officialVerificationUrl!);assert.equal(u.searchParams.get('query_param'),'USDOT');assert.equal(u.searchParams.get('query_string'),'1065394');const m=await executeMoveRequest({q:'MC 225850'});assert.equal(new URL(m.results[0]!.submittedIdentifierUrl!).searchParams.get('query_string'),'225850');assert.equal(new URL(m.results[0]!.officialVerificationUrl!).searchParams.get('query_string'),'1065394');
}));
test('observed replacement is not invented into the effective exact index; unrelated matches remain',async()=>source(async()=>{
 assert.equal((await executeMoveRequest({q:'MC 196957'})).terminalState,'NO_MATCH');assert.equal((await executeMoveRequest({q:'MC 9999999'})).terminalState,'NO_MATCH');for(const q of ['MC 1019808','MC 1019 808','USDOT 3244 649'])assert.equal((await executeMoveRequest({q})).results[0]?.usdot,'3244649');
}));
test('another permitted identity with the same MC is not suppressed by the JK review',async()=>source(async()=>{
 const p=publicAskPayload(await executeMoveRequest({q:'MC 225850'}));assert.deepEqual(p.results.map(r=>r.entityId),['other-holder']);assert.equal(p.results[0]?.mc,'225850');assert.equal(p.sourceConflictCandidates[0]?.entityId,'jk-moving');
},[jk,{...publishedIdentity,id:'other-holder',mc_number:'225850'}]));
test('name selection keeps separate JK identities and the original task',async()=>source(async()=>{
 const r=await executeMoveRequest({q:'JK Moving Services licensed?'});assert.deepEqual(new Set(r.results.map(c=>c.entityId)),new Set(['jk-moving','maryland']));const selected=await executeMoveRequest({q:'JK Moving Services licensed?',company:'jk-moving'});assert.equal(selected.results.length,1);assert.equal(selected.parsed.query.nameRequest?.task,'authority');assert.equal(selected.results[0]?.mc,null);assert.equal(selected.results[0]?.nameMatchEvidence?.returned,'JK MOVING SERVICES');
}));
test('publication hold and source failure do not clear or replace the reviewed association',async()=>{
 await source(async()=>assert.equal((await executeMoveRequest({q:'USDOT 1065394'})).results.length,0),[{...jk,publication_state:'REVIEW_REQUIRED'}]);await source(async()=>assert.equal((await executeMoveRequest({q:'MC 225850'})).terminalState,'UNAVAILABLE'),[jk],true);assert.equal(projectCompanyAssociation({id:'jk-moving',usdotNumber:'1065394',mcNumber:'225850'}).mcNumber,'');
});
test('changed source value/fingerprint requires review without mutating or substituting source values',()=>{
 const row={...jk,mc_number:'196957',data_hash:'new-source'};const c=mapCompanyRow(row);assert.equal(row.mc_number,'196957');assert.equal(c.mcNumber,'');assert.equal(c.identifierIntegrity?.observedMc,'196957');assert.equal(c.identifierIntegrity?.status,'source_changed_review_required');assert.equal(c.identifierIntegrity?.disputedMc,'225850');assert.equal(projectCompanyAssociation(c).identifierIntegrity?.observedMc,'196957');
});
test('source clocks remain separate; missing clocks never become today',()=>{
 const i=associationIntegrity({id:'jk-moving',usdot:'1065394',mc:'225850'})!;assert.equal(i.sourceAsOf,'2026-09-10');assert.equal(i.observedAt,null);assert.equal(i.officialObservedAt,'2026-09-12T00:04:29.566Z');assert.equal(associationIntegrity({id:'control',usdot:'123456',mc:'123456'}),undefined);
});
test('families and multiple/historical source observations are not concatenated or forced one-to-one',()=>{
 assert.equal(mcValue('MX-225850'),null);assert.equal(mcValue('FF-225850'),null);assert.equal(mcValue('MC-225850, MC-196957'),null);assert.equal(normalizeStoredIdentifier('MX225850','mc'),null);
 const observations=[{id:'fixture-source-a',usdotNumber:'777777',mcNumber:'123456',fmcsaLastChecked:'2020-01-01'},{id:'fixture-source-b',usdotNumber:'777777',mcNumber:'654321',fmcsaLastChecked:'2026-01-01'}];assert.deepEqual(observations.map(projectCompanyAssociation),observations);
});
test('DB, seed, catalog, merged profile and directory DTO cannot restore the disputed MC',()=>{
 const db=mapCompanyRow(jk),seed=seedCompanies.find(c=>c.id==='jk-moving')!;assert.equal(seed.usdotNumber,'1065394');assert.equal(seed.mcNumber,'');assert.equal(activeDirectoryMovers['directory-jk-moving-services']?.mcNumber,'');const merged=finalizeCompanyEnrichmentForDisplay(mergeEnrichmentOntoProfile({...seed,mcNumber:'225850'},db));for(const c of [db,seed,merged,...prepareCompaniesForDirectoryClient([db])]){assert.equal(c.mcNumber,'');assert.ok(c.identifierIntegrity);assert.doesNotMatch(profileSeoDescription(c),/225850/);}
});
test('profile, search, Verify and API render the same integrity-aware meaning',async()=>source(async()=>{
 const c=mapCompanyRow(jk);const hero=renderToStaticMarkup(React.createElement(CompanyResearchHero,{company:c}));assert.doesNotMatch(hero,/MC not recorded/);assert.match(hero,/MC association under review; see source details above/);const identity=renderToStaticMarkup(React.createElement(CompanyProfileIdentity,{company:c}));assert.doesNotMatch(identity,/>MC<|225850/);const disclosure=renderToStaticMarkup(React.createElement(AssociationDisclosure,{integrity:c.identifierIntegrity}));assert.match(disclosure,/under review/);assert.match(disclosure,/225850/);const r=await executeMoveRequest({q:'MC 225850'});const html=renderToStaticMarkup(React.createElement(AskMoveResultView,{result:r}));assert.match(html,/Identifier association needs review/);assert.doesNotMatch(html,/Exact identifier match:/);const api=await GET(new Request('https://www.movetrusthub.com/api/ask?q=MC+225850') as never);const payload=await api.json();assert.equal(payload.terminalState,r.terminalState);assert.equal(payload.sourceConflictCandidates[0].identifierIntegrity.observedMc,'225850');assert.equal(payload.results.length,0);
 const v=renderToStaticMarkup(React.createElement(DotVerifierResults,{result:{success:true,identifierIntegrity:c.identifierIntegrity,saferUrl:c.identifierIntegrity?.officialUrl??undefined,displayNumber:'MC 225850',numberType:'MC',directorySlug:c.slug}}));assert.match(v,/association needs review/);assert.doesNotMatch(v,/Verified match|Carrier found/);
}));

import { fmcsaPreviewFromVerifyResult } from '../suggestions/from-verify';
import Module from 'node:module';
test('real Verify action contains the stored MC before any external authority lookup (fixture-only dependencies)',async()=>{
 const loader=Module as unknown as {_load:(request:string,parent:unknown,isMain:boolean)=>unknown};const original=loader._load;let externalCalls=0;
 loader._load=function(request,parent,isMain){
  if(request==='next/headers' || /next[\\/]headers/.test(request))return {headers:async()=>new Headers()};
  if(request.includes('verify-dot/log'))return {logDotVerification:async()=>({logged:false})};
  if(request.includes('verify-dot/directory-lookup'))return {findCompanyByCarrierNumber:async()=>({slug:jk.slug,name:jk.name,preview:{legalName:jk.fmcsa_legal_name,usdot:jk.usdot_number,identifierIntegrity:mapCompanyRow(jk).identifierIntegrity}})};
  const result=original.call(this,request,parent,isMain);
  if(request.includes('verify-dot/fmcsa'))return {...result as object,resolveCarrierPreview:async()=>{externalCalls++;throw Error('Disputed MC must not drive an authority lookup')}};
  return result;
 };
 try{delete require.cache[require.resolve('../../actions/verify-dot')];const {verifyCarrierNumber}=require('../../actions/verify-dot');const r=await verifyCarrierNumber({query:'MC 225850'});assert.equal(r.success,true);assert.equal(r.identifierIntegrity?.status,'under_review');assert.equal(r.preview?.mcNumber,undefined);assert.equal(r.preview?.authorityStatus,undefined);assert.equal(new URL(r.saferUrl!).searchParams.get('query_string'),'1065394');assert.equal(externalCalls,0);assert.equal(fmcsaPreviewFromVerifyResult(r),null);}finally{loader._load=original;}
});
