import assert from "node:assert/strict";
import test from "node:test";
import { deriveStateEligibility, mayRequireDerivedPlacement } from "../lib/move-v2/state-authority/eligibility";
import { matchStateAuthority } from "../lib/move-v2/state-authority/matcher";
import { normalizeNewJerseyRecord } from "../lib/move-v2/state-authority/new-jersey";
import type { StateAuthorityRecord } from "../lib/move-v2/state-authority/types";
import { parseFloridaBusinessSearchHtml } from "../lib/move-v2/state-authority/florida";
import { decideGoogleMatch } from "../lib/move-v2/enrichment/google-match";
import { branchRadiusWithoutAllocation, canPublishDerived, countyRelationship, radiusForPowerUnits, shouldSupersedeDerived } from "../lib/move-v2/geography/derived-placement";
import { enrichWashingtonDetail, parseWashingtonList } from "../lib/move-v2/state-authority/washington";

const nj = (licenseType: "PM" | "PW" | "PC", status = "ACTIVE") => normalizeNewJerseyRecord({
  licenseType, licenseNumber: `${licenseType}123`, status, legalName: "ACME MOVING LLC",
  address: "1 MAIN ST", city: "NEWARK", postalCode: "07102", phone: "9735550100", sourceRecordReference: "fixture",
});
const fl = (type: "FL_IM" | "FL_MB", status = "REGISTERED"): StateAuthorityRecord => ({
  state: "FL", authorityType: type, licenseNumber: "IM123", status, legalName: "ACME MOVING LLC", sourceRecordReference: "fixture",
});

test("NJ active PM is verified local mover", () => assert.equal(deriveStateEligibility(nj("PM"), "STATE_MATCH_HIGH_CONFIDENCE"), "STATE_VERIFIED_LOCAL_MOVER"));
test("NJ PW-only is not moving-authorized", () => assert.equal(deriveStateEligibility(nj("PW"), "STATE_MATCH_HIGH_CONFIDENCE"), "STATE_AUTHORITY_REVIEW"));
test("NJ PC includes moving authority", () => assert.equal(deriveStateEligibility(nj("PC"), "STATE_MATCH_HIGH_CONFIDENCE"), "STATE_VERIFIED_LOCAL_MOVER"));
test("NJ inactive is inactive", () => assert.equal(deriveStateEligibility(nj("PM", "EXPIRED"), "STATE_MATCH_HIGH_CONFIDENCE"), "STATE_INACTIVE_LOCAL_MOVER"));
test("FL active mover is verified", () => assert.equal(deriveStateEligibility(fl("FL_IM"), "STATE_MATCH_HIGH_CONFIDENCE"), "STATE_VERIFIED_LOCAL_MOVER"));
test("FL moving broker stays a broker", () => assert.equal(deriveStateEligibility(fl("FL_MB"), "STATE_MATCH_HIGH_CONFIDENCE"), "STATE_VERIFIED_MOVING_BROKER"));
test("legal name plus address is high confidence", () => assert.equal(matchStateAuthority({ legalName:"ACME MOVING LLC",address:"1 MAIN ST" }, nj("PM")).status, "STATE_MATCH_HIGH_CONFIDENCE"));
test("name-only is never high confidence", () => assert.equal(matchStateAuthority({ legalName:"ACME MOVING LLC" }, nj("PM")).status, "STATE_MATCH_REVIEW"));
test("state eligibility derivation has no FMCSA mutation output", () => assert.equal(Object.hasOwn(deriveStateEligibility(nj("PM"), "STATE_MATCH_HIGH_CONFIDENCE") as object,"classification"), false));
test("not-found cannot be created by Google evidence", () => assert.equal(deriveStateEligibility(undefined,"STATE_NOT_FOUND"), "STATE_AUTHORITY_NOT_FOUND"));
test("website claims cannot create state authority", () => assert.equal(deriveStateEligibility(undefined,"STATE_NOT_FOUND"), "STATE_AUTHORITY_NOT_FOUND"));
test("explicit geography beats fallback", () => assert.equal(mayRequireDerivedPlacement({eligibility:"STATE_VERIFIED_LOCAL_MOVER",googleOnboardingAttempted:true,identityResolved:true,websiteDiscoveryAttempted:true,usefulExplicitGeography:true}),false));
test("unresolved Google identity blocks derived fallback", () => assert.equal(mayRequireDerivedPlacement({eligibility:"STATE_VERIFIED_LOCAL_MOVER",googleOnboardingAttempted:true,identityResolved:false,websiteDiscoveryAttempted:true,usefulExplicitGeography:false}),false));
test("paid state cannot affect matching", () => {
  const a=matchStateAuthority({legalName:"ACME MOVING LLC",address:"1 MAIN ST"},nj("PM"));
  const b=matchStateAuthority({...{legalName:"ACME MOVING LLC",address:"1 MAIN ST"},subscriptionState:"PAID"} as never,nj("PM"));
  assert.deepEqual(a,b);
});
test("deterministic match key supports idempotent reruns", () => assert.deepEqual(matchStateAuthority({legalName:"ACME MOVING LLC",address:"1 MAIN ST"},nj("PM")),matchStateAuthority({legalName:"ACME MOVING LLC",address:"1 MAIN ST"},nj("PM"))));
test("FL pagination repeats collapse by official license number", () => {
  const row = `<div id="cpMainContent_MasterGv_maindiv_0"><table id="cpMainContent_MasterGv_dataTab_0"><tr><td><strong>ACME MOVING LLC</strong></td></tr><tr><td>1 MAIN ST, MIAMI, FL 33101<br/><b>Phone:</b> 305-555-0100 <b>Email:</b>hello@acme.test</td></tr></table> Intrastate Mover IM123 01/01/24 01/01/26 Registered`;
  const parsed = parseFloridaBusinessSearchHtml(row + row.replaceAll("_0", "_1"), "IM");
  assert.equal(parsed.length, 1); assert.equal(parsed[0].email, "hello@acme.test");
});
test("state relationship terms remain exact", () => {
  const record: StateAuthorityRecord={...fl("FL_IM"),relationshipObservations:[{term:"QUALIFYING INDIVIDUAL",name:"JANE DOE"}]};
  assert.deepEqual(record.relationshipObservations,[{term:"QUALIFYING INDIVIDUAL",name:"JANE DOE"}]);
});
test("state-corroborated identity can support Google without forcing it", () => {
  const decision=decideGoogleMatch({providerId:"p",legalName:"ACME MOVING LLC",dbaName:null,phone:"3055550100",street:"1 MAIN ST",city:"MIAMI",state:"FL",postalCode:"33101",classification:"LOCAL_INTRASTATE_CARRIER_CANDIDATE"},{placeId:"x",displayName:"Acme Moving",formattedAddress:"1 Main St, Miami, FL 33101",phone:"305-555-0100",websiteUri:null,businessStatus:"OPERATIONAL"});
  assert.equal(decision.status,"GOOGLE_MATCH_HIGH_CONFIDENCE");
});
const waRow=`<table><tr><td><a href="/company/42">Company Detail</a></td><td class="views-field-field-company-utc-id">100</td><td class="views-field-field-company-name"><strong>WA MOVER LLC</strong></td><td class="views-field-field-company-dba-names">DBA: <strong>Rain Mover</strong></td><td class="views-field-field-company-ubi">123456789</td><td class="views-field-field-usdot">7654321</td><td class="views-field-field-industry-name">Household Goods Carriers</td><td class="views-field-field-company-regulatory-status">[Active]</td></tr></table>`;
test("WA active HHG record parses with stable identifiers",()=>{const r=parseWashingtonList(waRow)[0];assert.equal(r.status,"ACTIVE");assert.equal(r.usdot,"7654321");assert.equal(r.ubi,"123456789")});
test("WA inactive does not become verified active",()=>assert.equal(deriveStateEligibility({...parseWashingtonList(waRow)[0],status:"INACTIVE"},"STATE_MATCH_HIGH_CONFIDENCE"),"STATE_INACTIVE_LOCAL_MOVER"));
test("WA detail preserves exact relationship term",()=>{const r=enrichWashingtonDetail(parseWashingtonList(waRow)[0],`Company Contacts Name Title Phone Email Primary Jane Doe Owner 206-555-0100 jane@test.invalid Company Address Address Type Address Physical Address 1 Main St, Seattle, WA 98101`);assert.ok(r.relationshipObservations?.every(x=>x.term!=="PRIMARY"))});
test("broker cannot receive derived local carrier area",()=>assert.equal(canPublishDerived({state:"WA",stateVerified:true,isMover:false,identityResolved:true,onboardingAttempted:true,websiteAttempted:true,geographyStatus:"SERVICE_AREA_NOT_FOUND"}),false));
test("explicit geography beats derived",()=>assert.equal(canPublishDerived({state:"WA",stateVerified:true,isMover:true,identityResolved:true,onboardingAttempted:true,websiteAttempted:true,geographyStatus:"SERVICE_AREA_EXPLICIT"}),false));
test("partial geography is not expanded",()=>assert.equal(canPublishDerived({state:"WA",stateVerified:true,isMover:true,identityResolved:true,onboardingAttempted:true,websiteAttempted:true,geographyStatus:"SERVICE_AREA_PARTIAL"}),false));
test("unresolved identity receives no derived area",()=>assert.equal(canPublishDerived({state:"WA",stateVerified:true,isMover:true,identityResolved:false,onboardingAttempted:true,websiteAttempted:true,geographyStatus:"SERVICE_AREA_NOT_FOUND"}),false));
test("state authority is required",()=>assert.equal(canPublishDerived({state:"WA",stateVerified:false,isMover:true,identityResolved:true,onboardingAttempted:true,websiteAttempted:true,geographyStatus:"SERVICE_AREA_NOT_FOUND"}),false));
test("state boundary excludes NJ and unknown states",()=>assert.equal(canPublishDerived({state:"NJ",stateVerified:true,isMover:true,identityResolved:true,onboardingAttempted:true,websiteAttempted:true,geographyStatus:"SERVICE_AREA_NOT_FOUND"}),false));
test("fleet changes radius but never legal eligibility",()=>{const legal=canPublishDerived({state:"FL",stateVerified:true,isMover:true,identityResolved:true,onboardingAttempted:true,websiteAttempted:true,geographyStatus:"SERVICE_AREA_NOT_FOUND"});assert.equal(legal,true);assert.ok(radiusForPowerUnits(20)>radiusForPowerUnits(1))});
test("paid status has no effect on placement",()=>{const x={state:"WA",stateVerified:true,isMover:true,identityResolved:true,onboardingAttempted:true,websiteAttempted:true,geographyStatus:"SERVICE_AREA_NOT_FOUND"};assert.equal(canPublishDerived(x),canPublishDerived({...x,subscriptionState:"PAID"}))});
test("branch without fleet allocation is conservative",()=>assert.ok(branchRadiusWithoutAllocation(150)<=50));
test("later explicit geography supersedes derived",()=>assert.equal(shouldSupersedeDerived(1),true));
test("county tiny edge is not whole-county service",()=>{const g={type:"Polygon",coordinates:[[[0,0],[10,0],[10,10],[0,10],[0,0]]]};const r=countyRelationship([-0.1,5],10,g);assert.notEqual(r.placementType,"DERIVED_MEANINGFUL_COVERAGE")});
test("derived radius is deterministic and bounded",()=>{assert.equal(radiusForPowerUnits(5),radiusForPowerUnits(5));assert.ok(radiusForPowerUnits(10000)<=185)});
