import test from "node:test";
import assert from "node:assert/strict";
import { planMoveRequest } from "./plan";
import { executeMoveRequest, publicAskPayload } from "./execute";
import { inputFromSearchParams } from "./plan";
import { journeyConsent, journeyHref, resolveMovePlace } from "./journey";
import { fixtureFetch, publishedIdentity } from "./r1-fixtures";
import { CANONICAL_SUPABASE_URL } from "../supabase/canonical-project";
import { GET } from "../../app/api/ask/route";
import { executeMoveSpecialist } from '../specialist-execution/execute';
import { MOVE_SPECIALIST_EXECUTION_CONTRACT } from '../specialist-execution/contract';
import { AskMoveResultView } from "../../components/ask-move-result";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
Object.assign(globalThis, { React });

test('structured city/ZIP requests cannot bypass the locality consent boundary', async()=>{
  for(const geography of [{intent:'RECORDED_HQ' as const,city:'Austin',stateCode:'TX'},{intent:'RECORDED_HQ' as const,zip:'33441',stateCode:'FL'}]){
    const r=await executeMoveSpecialist({contract:MOVE_SPECIALIST_EXECUTION_CONTRACT,queryType:'cohort',entityClass:'mover',role:'Broker',geography});
    assert.equal(r.resultType,'UNSUPPORTED_CAPABILITY');assert.equal(r.rows.length,0);assert.deepEqual(r.queryInterpretation.appliedFilters,[]);assert.deepEqual(r.queryInterpretation.geography?.stateCode,geography.stateCode);assert.match(r.limitations[0]!,/No state cohort was executed/);
    const next=new URL(r.destinations.research);assert.equal(next.pathname,'/ask');assert.equal(next.searchParams.get('role'),'broker');assert.ok(next.searchParams.get('q')?.includes(geography.city??geography.zip!));
  }
});

test("R1-014 endpoints survive the production planner", () => {
  const p = planMoveRequest({
    q: "moving from Boca Raton Florida to Austin Texas",
  });
  const j = p.query.journey;
  assert.ok(j, "Journey must not become a refusal without endpoints");
  assert.ok(j.origin);
  assert.ok(j.destination);
  assert.equal(j.origin.city, "Boca Raton");
  assert.equal(j.origin.state, "FL");
  assert.equal(j.destination.city, "Austin");
  assert.equal(j.destination.state, "TX");
  assert.equal(p.query.nameQuery, undefined);
});

test("independent endpoints, abbreviations, multiple states and city ambiguity", () => {
  for (const [q, city, state] of [
    ["movers from Miami Florida to New York City", "New York City", "NY"],
    ["moving from Boca Raton, FL to Austin, TX", "Austin", "TX"],
    ["moving from Trenton NJ to Springfield IL", "Springfield", "IL"],
  ]) {
    const j = planMoveRequest({ q }).query.journey!;
    assert.equal(j.destination?.city, city);
    assert.equal(j.destination?.state, state);
    assert.notEqual(j.origin?.state, j.destination?.state);
    assert.equal(j.moveScope, "interstate");
  }
  const q = "moving from Springfield to Dallas Texas";
  const p = planMoveRequest({ q });
  assert.equal(p.query.journey?.origin?.resolution, "NEEDS_CLARIFICATION");
  assert.equal(p.query.journey?.destination?.state, "TX");
  const selected = planMoveRequest({ q, originState: "IL" });
  assert.equal(selected.query.journey?.origin?.city, "Springfield");
  assert.equal(selected.query.journey?.destination?.city, "Dallas");
  assert.throws(() => planMoveRequest({ q, destinationState: "CA" }));
  assert.equal(
    resolveMovePlace("Florida and New York").resolution,
    "NEEDS_CLARIFICATION",
  );
});

test("journeys and bookings never dispatch unrelated cohorts or names", async () => {
  for (const q of [
    "movers from Miami Florida to New York City",
    "auto transport from Florida to Texas",
    "moving my mother's belongings into assisted living",
    "book a mover for tomorrow",
    "hire movers this weekend",
    "schedule a move from Florida to Texas",
    "local mover in New Jersey",
  ]) {
    let calls = 0;
    const r = await executeMoveRequest(
      { q },
      {
        directory: async () => {
          calls++;
          throw Error("Unintended retrieval");
        },
      },
    );
    assert.equal(calls, 0, q);
    assert.equal(r.results.length, 0, q);
    assert.equal(r.parsed.query.nameQuery, undefined, q);
    assert.ok(r.parsed.query.journey, q);
    assert.notEqual(r.terminalState, "NO_MATCH", q);
    if (/book|hire|schedule/.test(q)) {
      assert.equal(r.parsed.query.journey!.booking, true);
      assert.match(
        r.parsed.query.journey!.summary,
        /does not book, dispatch, or confirm/,
      );
    }
  }
});

test("capability grains are source-native, never FMCSA-as-intrastate authority", () => {
  for (const [q, state, status] of [
    ["local mover in New Jersey", "NJ", "REQUEST_ONLY"],
    ["local mover in California", "CA", "SEARCH_ONLY"],
    ["moving from Austin TX to Dallas TX", "TX", "SEARCH_ONLY"],
    ["local mover in Florida", "FL", "STATE_SOURCE_LIVE"],
  ]) {
    const p = planMoveRequest({ q });
    const j = p.query.journey!;
    assert.equal(j.authorityGrain, "state_intrastate_research");
    assert.equal(
      j.capabilities.find((c) => c.state === state)?.authority[0]?.status,
      status,
    );
    assert.match(j.summary, /Federal FMCSA presence is not a substitute/);
    assert.equal(p.query.executor, "records");
    assert.equal(p.query.floridaIm, undefined);
  }
});

test("locality and near me retain conditions and require explicit query-bound broadening", async () => {
  for (const q of [
    "movers near me",
    "movers in Broward County",
    "movers in Austin Texas",
    "mover serving Miami",
  ]) {
    const r = await executeMoveRequest({ q });
    assert.equal(r.results.length, 0);
    assert.ok(r.parsed.query.journey?.locality);
    assert.notEqual(r.terminalState, "NO_MATCH");
    assert.equal(r.parsed.query.jurisdiction, undefined);
  }
  const q = "movers in Austin Texas",
    consent = journeyConsent(q);
  const p = planMoveRequest({ q, research: "recorded_state", consent });
  assert.equal(p.query.journey!.outcome, "USER_APPROVED_RELAXATION");
  assert.equal(p.query.journey!.locality?.city, "Austin");
  assert.equal(p.query.directoryRequest?.geography?.stateCode, "TX");
  assert.equal(p.query.directoryRequest?.geography?.intent, "RECORDED_HQ");
  assert.throws(() =>
    planMoveRequest({
      q: "movers in Dallas Texas",
      research: "recorded_state",
      consent,
    }),
  );
  assert.equal(
    planMoveRequest({ q }).query.journey!.executionGeography,
    undefined,
  );
  assert.equal(
    planMoveRequest({ q: "movers near me", location: "Austin TX" }).query
      .journey!.locality?.city,
    "Austin",
  );
});

test("role, auto transport, filters and pagination cannot lose scope", async () => {
  const b = planMoveRequest({
    q: "broker for a move from Florida to New York",
  });
  assert.equal(b.query.journey!.role, "broker");
  assert.equal(b.query.role, "broker");
  assert.equal(
    planMoveRequest({ q: "movers from Florida to Texas" }).query.role,
    undefined,
  );
  const a = planMoveRequest({ q: "auto transport from Florida to Texas" });
  assert.equal(a.query.journey!.moveType, "auto_transport");
  assert.match(a.query.journey!.checklist[1]!, /vehicle/);
  const q = "brokers in Austin Texas";
  const p = planMoveRequest({
    q,
    page: 2,
    authority: "current",
    research: "recorded_state",
    consent: journeyConsent(q),
  });
  assert.equal(p.query.role, "broker");
  assert.equal(p.query.authorityCurrent, true);
  assert.equal(p.query.journey!.locality?.city, "Austin");
  assert.equal(p.query.jurisdiction?.state, "TX");
  assert.throws(() =>
    planMoveRequest({ q: "broker from Florida to Texas", role: "carrier" }),
  );
  const failed = await executeMoveRequest(
    {
      q: "movers in Austin Texas",
      research: "recorded_state",
      consent: journeyConsent("movers in Austin Texas"),
    },
    {
      directory: async (req) => {
        assert.equal(req.geography?.stateCode, "TX");
        throw Error("fixture outage");
      },
    },
  );
  assert.equal(failed.terminalState, "UNAVAILABLE");
});

test("name plus journey and server selection retain the protected exact identity path", async () => {
  const prev = globalThis.fetch,
    oldKey = process.env.SUPABASE_SERVICE_ROLE_KEY,
    oldUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  process.env.NEXT_PUBLIC_SUPABASE_URL = CANONICAL_SUPABASE_URL;
  process.env.SUPABASE_SERVICE_ROLE_KEY = "fixture-only";
  const rows = [
    {
      ...publishedIdentity,
      id: "journey-company",
      name: "Zephyr Moving",
      fmcsa_legal_name: "Zephyr Moving",
      slug: "zephyr-moving",
    },
  ];
  rows.push({...publishedIdentity,id:'jk-moving',slug:'jk-moving-services',name:'JK Moving Services',fmcsa_legal_name:'JK MOVING & STORAGE INC',usdot_number:'1065394',mc_number:'225850'});
  const fixture = fixtureFetch(rows);
  globalThis.fetch = async (input, init) =>
    String(input).includes("/rpc/directory_search_suggestions")
      ? new Response(JSON.stringify([{ company_id: "journey-company" }]), {
          headers: { "content-type": "application/json" },
        })
      : fixture.fetcher(input, init);
  try {
    const q = "Can Zephyr Moving handle my move from Virginia to Florida?";
    const r = await executeMoveRequest({ q });
    assert.equal(r.results[0]?.entityId, "journey-company");
    assert.equal(r.parsed.query.journey?.destination?.state, "FL");
    assert.equal(r.parsed.query.journey?.availability, "NOT_ESTABLISHED");
    assert.equal(r.results[0]?.mc, publishedIdentity.mc_number);
    const selected = await executeMoveRequest(
      inputFromSearchParams(
        new URL(r.results[0]!.selectionHref!, "https://www.movetrusthub.com")
          .searchParams,
      ),
    );
    assert.equal(selected.results[0]?.entityId, "journey-company");
    assert.equal(selected.parsed.raw, q);
    const id = await executeMoveRequest({
      q: "USDOT 3244649 moving from Virginia to Florida",
    });
    assert.equal(id.parsed.query.identifier?.value, "3244649");
    assert.equal(id.results[0]?.usdot, "3244649");
    assert.equal(id.parsed.query.journey?.origin?.state, "VA");
    const conflict = await executeMoveRequest({q:'MC 225850 moving from Virginia to Florida'});
    assert.equal(conflict.terminalState,'SOURCE_CONFLICT');
    assert.equal(publicAskPayload(conflict).results.length,0);
    assert.equal(conflict.results[0]?.mc,null);
    assert.equal(conflict.parsed.query.journey?.destination?.state,'FL');
    const miss = await executeMoveRequest({
      q: "USDOT 9999999 moving from Virginia to Florida",
    });
    assert.equal(miss.terminalState, "NO_MATCH");
    assert.equal(miss.results.length, 0);
  } finally {
    globalThis.fetch = prev;
    if (oldKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = oldKey;
    if (oldUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = oldUrl;
  }
});

test("API/native transport, rendered guidance and actions share the same meaning", async () => {
  for (const q of [
    "moving from Boca Raton FL to Austin TX",
    "book a mover tomorrow",
    "movers near me",
    "local mover in New Jersey",
  ]) {
    const r = await executeMoveRequest({ q });
    const payload = publicAskPayload(r);
    const api = await (
      await GET(
        new Request(
          "https://www.movetrusthub.com" +
            journeyHref(q).replace("/ask?", "/api/ask?"),
        ),
      )
    ).json();
    assert.deepEqual(
      api.query.journey,
      JSON.parse(JSON.stringify(payload.query.journey)),
    );
    const html = renderToStaticMarkup(
      React.createElement(AskMoveResultView, { result: r }),
    );
    assert.match(html, /Trace this journey/);
    assert.doesNotMatch(html, /No matching research identities/);
    assert.match(html, /name="q"/);
    assert.match(html, /does not establish service territory/);
    if (/book/.test(q))
      assert.match(html, /does not book, dispatch, or confirm/);
  }
  for (const q of [
    "JK Moving Services licensed?",
    "USDOT 3244649",
    "MC 225850",
    "Florida Active Carrier 7",
    "carrier vs broker",
  ])
    assert.equal(planMoveRequest({ q }).query.journey, undefined, q);
  const bad = await executeMoveRequest({
    q: "movers near me",
    location: ["TX", "CA"],
  });
  assert.equal(bad.terminalState, "INVALID_INPUT");
});

test('legal-name signals are not converted to locality requests',()=>{
 for(const q of ['Movers in Motion LLC','Research Movers in Motion LLC','Movers in Motion LLC licensed?']){const p=planMoveRequest({q});assert.equal(p.query.journey,undefined);}
 const quoted=planMoveRequest({q:'Research "Movers in Motion LLC"'});assert.equal(quoted.query.nameQuery,'Movers in Motion LLC');assert.equal(quoted.query.journey,undefined);
});

test('natural-language authority and unsupported route counts stay visible through broadening',()=>{
 const q='current carriers in Austin Texas';const p=planMoveRequest({q,research:'recorded_state',consent:journeyConsent(q)});assert.equal(p.query.authorityCurrent,true);assert.equal(p.query.role,'carrier');assert.equal(p.query.jurisdiction?.state,'TX');
 assert.throws(()=>planMoveRequest({q,authority:'not_current'}));
 const count=planMoveRequest({q:'how many movers from Florida to Texas'});assert.ok(count.query.constraints?.some(c=>c.field==='Requested route count, ranking or price'&&c.outcome==='UNSUPPORTED'));
});
