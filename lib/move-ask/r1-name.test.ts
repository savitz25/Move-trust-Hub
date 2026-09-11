import test from 'node:test';
import assert from 'node:assert/strict';
import { planMoveRequest } from './plan';
test('R1-005 original named licensing question retains its subject rather than a carrier directory', () => {
 const p=planMoveRequest({q:'JK Moving Services licensed?'});
 assert.equal(p.query.nameQuery,'JK Moving Services');
 assert.equal(p.query.role,undefined);
 assert.equal(p.query.executor,'records');
});
import { executeMoveRequest, publicAskPayload } from './execute';
import { matchSourceName } from './name';
import { fixtureFetch, publishedIdentity } from './r1-fixtures';
import { CANONICAL_SUPABASE_URL } from '../supabase/canonical-project';
import { GET } from '../../app/api/ask/route';
import AskPage from '../../app/(move)/ask/page';
import { AskMoveResultView } from '../../components/ask-move-result';
import { SpecialistSearchShell } from '../../components/specialist-search/SpecialistSearchShell';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
Object.assign(globalThis,{React});
const record=(id:string,name:string,extra:Record<string,unknown>={})=>({...publishedIdentity,id,name,slug:id,fmcsa_legal_name:name,sourceDba:null,...extra});
const fixtures=[
 record('legal','Zephyr 7 Moving & Storage LLC'),
 record('dba','Beacon Moving',{fmcsa_legal_name:'Beacon Holdings Incorporated',sourceDba:'Beacon Moving'}),
 record('display','Harbor Moving Services',{fmcsa_legal_name:'Harbor Transport Inc'}),
 record('jk-a','JK Moving Services',{fmcsa_legal_name:'JK Storage A',sourceDba:'JK Moving Services'}),
 record('jk-b','JK Moving Services',{fmcsa_legal_name:'JK Storage B',usdot_number:'1300300'}),
 record('generic','Unrelated Moving Services LLC'),
 record('words','Florida Active Carrier 7'),
 record('held','Zephyr 7 Moving & Storage LLC',{publication_state:'REVIEW_REQUIRED'}),
 ...Array.from({length:45},(_,i)=>record(`a-${i}`,`Alphabetic ${i} Moving LLC`)),
 record('beyond','Zyphora Moving Services'),
];
// Independent HTTP source oracle: models the existing permissive suggestion RPC,
// followed by real PostgREST publication/key filtering. Production relevance is not reused here.
async function source(run:(calls:URL[],rpc:string[])=>Promise<void>,rows:Record<string,unknown>[]=fixtures){
 const old={fetch:globalThis.fetch,url:process.env.NEXT_PUBLIC_SUPABASE_URL,key:process.env.SUPABASE_SERVICE_ROLE_KEY};
 const f=fixtureFetch(rows), rpc:string[]=[];
 globalThis.fetch=async(input,init)=>{
  const u=new URL(typeof input==='string'?input:input instanceof URL?input:input.url);
  if(u.pathname.endsWith('/rpc/directory_search_suggestions')){
   assert.equal(init?.method,'POST');const body=JSON.parse(String(init?.body));rpc.push(body.p_query);
   assert.equal(body.p_limit,100);assert.ok(body.p_query.length<=80);
   // Deliberately over-recall generic distractors: production must reject unsupported matches.
   const phrase=body.p_query.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
   const visible=rows.filter(r=>r.publication_state!=='REVIEW_REQUIRED');
   const selected=visible.filter(r=>[r.name,r.fmcsa_legal_name].some(v=>String(v).toLowerCase().replace(/[^a-z0-9]+/g,' ').includes(phrase)));
   const others=visible.filter(r=>!selected.includes(r));
   return new Response(JSON.stringify([...selected,...others].slice(0,100).map(r=>({company_id:r.id}))),{headers:{'content-type':'application/json'}});
  }
  return f.fetcher(input,init);
 };
 process.env.NEXT_PUBLIC_SUPABASE_URL=CANONICAL_SUPABASE_URL;process.env.SUPABASE_SERVICE_ROLE_KEY='fixture-only-noncredential';
 try{await run(f.calls,rpc)}finally{globalThis.fetch=old.fetch;for(const [k,v] of Object.entries({NEXT_PUBLIC_SUPABASE_URL:old.url,SUPABASE_SERVICE_ROLE_KEY:old.key})){if(v===undefined)delete process.env[k];else process.env[k]=v}}
}
test('bare/find/check/research/licensed and role questions retrieve actual named positives',async()=>source(async()=>{
 for(const q of ['Zyphora Moving Services','Find Zyphora Moving Services','Check Zyphora Moving Services','Verify Zyphora Moving Services','Zyphora Moving Services licensed?','Is Zyphora Moving Services a carrier or broker?','Check the authority for Zyphora Moving Services','Research "Zyphora Moving Services"','Company named Zyphora Moving Services']){
  const r=await executeMoveRequest({q});assert.deepEqual(r.results.map(x=>x.entityId),['beyond'],q);assert.equal(r.parsed.query.role,undefined,q);assert.equal(r.results[0]?.nameMatchEvidence?.returned,'Zyphora Moving Services');
 }
}));
test('legal, documented DBA and display-only provenance stay separate',async()=>source(async()=>{
 const legal=await executeMoveRequest({q:'Zephyr 7 Moving & Storage LLC'});assert.equal(legal.results[0]?.nameMatchEvidence?.field,'fmcsa_legal_name');
 const dba=await executeMoveRequest({q:'Beacon Moving'});assert.equal(dba.results[0]?.nameMatchEvidence?.field,'fmcsa_raw.dbaName');assert.equal(dba.results[0]?.dba,'Beacon Moving');
 const display=await executeMoveRequest({q:'Harbor Moving Services'});assert.equal(display.results[0]?.dba,null);assert.equal(display.results[0]?.nameMatchEvidence?.field,'name');assert.doesNotMatch(display.results[0]?.whyMatched??'',/DBA/);
 for(const r of [legal,dba,display])for(const card of r.results){assert.equal(card.nameMatchEvidence?.entityId,card.entityId);assert.ok(card.whyMatched.includes(card.nameMatchEvidence!.returned));assert.equal(card.matchEvidence,undefined)}
}));
test('generic overlap, punctuation safety, normalization, meaningful words and numbers',async()=>source(async(calls,rpc)=>{
 for(const q of ['Find Impossiblequokka Moving Services','Find % _ , " Moving Services']){const r=await executeMoveRequest({q});assert.equal(r.results.length,0,q)}
 const normalized=await executeMoveRequest({q:'zephyr  7 moving and storage llc'});assert.equal(normalized.results[0]?.entityId,'legal');
 const words=await executeMoveRequest({q:'Florida Active Carrier 7'});assert.equal(words.results[0]?.entityId,'words');assert.equal(words.parsed.query.jurisdiction,undefined);
 assert.equal((await executeMoveRequest({q:'Zephyr 8 Moving Storage'})).results.length,0);
 for(const c of calls){assert.equal(c.searchParams.get('or'),'(publication_state.is.null,publication_state.not.in.(REVIEW_REQUIRED,INACTIVE,INGESTED,CLASSIFIED))');assert.ok(c.searchParams.get('id')?.startsWith('in.'));assert.equal(c.searchParams.has('name'),false)}
 assert.ok(rpc.length>0);
}));
test('JK ambiguity is not auto-selected and selection revalidates the original name/task',async()=>source(async()=>{
 const r=await executeMoveRequest({q:'JK Moving Services licensed?'});assert.equal(r.terminalState,'NEEDS_CLARIFICATION');assert.deepEqual(r.results.map(x=>x.entityId),['jk-a','jk-b']);assert.equal(r.pagination.total,2);
 const link=new URL(r.results[1]!.selectionHref!,'https://www.movetrusthub.com');assert.equal(link.searchParams.get('q'),'JK Moving Services licensed?');
 const selected=await executeMoveRequest({q:link.searchParams.get('q'),company:link.searchParams.get('company')});assert.deepEqual(selected.results.map(x=>x.entityId),['jk-b']);assert.equal(selected.parsed.query.nameRequest?.task,'authority');
 for(const company of ['held','generic','missing']){const invalid=await executeMoveRequest({q:'JK Moving Services licensed?',company});assert.equal(invalid.results.length,0);assert.equal(invalid.terminalState,'NEEDS_CLARIFICATION')}
 assert.equal((await executeMoveRequest({q:'USDOT 3244649',company:'jk-a'})).terminalState,'INVALID_INPUT');
}));
test('bounds disclose incomplete candidates; positive beyond old alphabetic page remains discoverable',async()=>source(async()=>{
 const r=await executeMoveRequest({q:'Brandname Moving'});assert.equal(r.results.length,10);assert.equal(r.nameSearch?.truncated,true);assert.equal(r.terminalState,'NEEDS_CLARIFICATION');assert.equal(r.counts[0]?.label,'Displayed name candidates');assert.equal(r.pagination.total,10);
},Array.from({length:110},(_,i)=>record(`brand-${i}`,`Brandname Moving ${i}`))));
test('name conditions and overrides preserve identity; IDs cannot be replaced by name matching',async()=>source(async()=>{
 for(const q of ['Zyphora Moving Services licensed in New Jersey?','Zyphora Moving Services licensed in New York?','Zyphora Moving Services in Miami','Zyphora Moving Services with current authority']){
  const r=await executeMoveRequest({q,state:'NJ',role:'carrier',authority:'current'});assert.equal(r.results[0]?.entityId,'beyond',q);assert.ok(r.parsed.query.constraints?.some(c=>c.field==='additional condition'));assert.equal(r.parsed.query.nameQuery,'Zyphora Moving Services');
 }
 const id=await executeMoveRequest({q:'USDOT 3244649 Conflicting Name'});assert.equal(id.parsed.query.mode,'identifier');assert.equal(id.parsed.query.nameQuery,undefined);assert.ok(id.parsed.query.constraints?.some(c=>c.field==='additional context'));
}));
test('definitions/discovery/guidance/journey and missing identity are not company-name research',()=>{
 for(const q of ['movers in New Jersey','carrier vs broker','how do I check whether a mover is licensed?','who owns this moving company?','moving from California to Florida','Show carriers, not brokers','NY intrastate movers','Florida intrastate movers','USDOT lookup','MC lookup','3244649'])assert.equal(planMoveRequest({q}).query.nameQuery,undefined,q);
 for(const q of ['Find moving services company LLC','Is this moving company licensed?'])assert.equal(planMoveRequest({q}).query.mode,'fail_closed',q);
});
test('invalid input and source errors never become a name miss or broad directory',async()=>source(async(calls,rpc)=>{
 for(const q of ['Find '+ 'z'.repeat(81),'x'.repeat(181),'Find <script>bad</script>','Find qwerty\u0000Company']){assert.notEqual((await executeMoveRequest({q})).terminalState,'FOUND')}
 assert.equal(calls.length,0);assert.equal(rpc.length,0);
 globalThis.fetch=async()=>new Response('{}',{status:503});const r=await executeMoveRequest({q:'Zyphora Moving Services'});assert.equal(r.terminalState,'UNAVAILABLE');assert.equal(r.counts.length,0);
}));
test('duplicate identity observation deduplication and unrelated source records cannot assert a match',async()=>source(async()=>{
 const r=await executeMoveRequest({q:'Beacon Moving'});assert.equal(r.results.length,1);assert.equal(r.pagination.total,1);
 assert.equal(matchSourceName('Imaginary Moving',record('unrelated','Unrelated Moving Services')),null);
},[fixtures[1]!,fixtures[1]!]));
function resultInTree(v:unknown):any {if(Array.isArray(v)){for(const x of v){const r=resultInTree(x);if(r)return r}}if(React.isValidElement<{result?:unknown;children?:unknown}>(v))return v.props.result??resultInTree(v.props.children);return null}
test('homepage/native/API share candidate meaning; miss and selected panels finish truthfully',async()=>source(async()=>{
 for(const q of ['JK Moving Services licensed?','Zyphora Moving Services','Impossiblequokka Moving']){
  const page=resultInTree(await AskPage({searchParams:Promise.resolve({q})}));assert.ok(page);
  const api=await(await GET(new Request('https://www.movetrusthub.com/api/ask?'+new URLSearchParams({q})))).json();
  assert.deepEqual(JSON.parse(JSON.stringify(publicAskPayload(page).results)),api.results);assert.deepEqual(publicAskPayload(page).nameSearch,api.nameSearch);
  const html=renderToStaticMarkup(React.createElement(AskMoveResultView,{result:page}));assert.ok(html.includes(q.split(' licensed')[0]));assert.doesNotMatch(html,/Matching research identities/);
  const home=renderToStaticMarkup(React.createElement(SpecialistSearchShell,{query:q}));assert.match(home,/action="\/ask"/);assert.ok(home.includes(q));
 }
}));

test('source normalization preserves apostrophes, Unicode letters, names with role words and safe punctuation',()=>{
 for(const name of ["O'Neil & Sons 7 Moving",'O\u2019Neil & Sons 7 Moving','Active Carrier Moving 7','Florida Active Carrier 7','Jos\u00e9 Moving 7']) { const p=planMoveRequest({q:name});assert.equal(p.query.nameQuery,name);assert.equal(p.query.role,undefined);assert.ok(matchSourceName(name,record('same',name))); }
 assert.equal(matchSourceName('Jos Moving 7',record('different','Jos\u00e9 Moving 7')),null);
});

test('source dual-role casing and spaced slash preserve supported role overrides',async()=>{
 for(const entity_type of ['Carrier / Broker','CARRIER/BROKER','Carrier/Broker'])await source(async()=>{
  for(const role of ['carrier','broker','carrier_broker']){const r=await executeMoveRequest({q:'Dualexample Moving',role});assert.equal(r.parsed.query.constraints?.find(c=>c.field==='role')?.outcome,'APPLIED',entity_type+role)}
 },[record('dual','Dualexample Moving',{entity_type})]);
});

test('unknown source role remains unestablished and malformed name syntax cannot become a directory',async()=>source(async()=>{
 const r=await executeMoveRequest({q:'Unknownexample Moving',role:'carrier'});assert.equal(r.parsed.query.constraints?.find(c=>c.field==='role')?.outcome,'NEEDS_CLARIFICATION');
 for(const q of ['Oddname / Anothername Moving','"Unclosedname Moving']){const p=planMoveRequest({q});assert.equal(p.query.mode,'fail_closed');assert.notEqual(p.query.executor,'directory')}
},[record('unknown','Unknownexample Moving',{entity_type:'UNKNOWN'})]));
