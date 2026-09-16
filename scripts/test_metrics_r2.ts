import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { count, exactCountHeader } from "../lib/metrics/accepted-contract";
import {
  buildMoveHomepageEvidenceInventory,
  MOVE_HOMEPAGE_STATE_CARDS,
} from "../lib/intelligence/move-home-evidence-inventory";
const m = JSON.parse(
  readFileSync(
    new URL("../data/home/move-network-metrics-v1.json", import.meta.url),
    "utf8",
  ),
);
const metric = (key: string) => m.metrics.find((r: any) => r.key === key);
test("State and federal identity systems remain separate", () => {
  assert.equal(m.federalDirectory.publishableProfiles, 5022);
  assert.equal(m.colorado.activeHhgPermitListings, 203);
  assert.equal(m.virginia.hhgAuthorityIdentities, 192);
  assert.equal(m.virginia.propertyAuthorityIdentities, 4914);
  assert.equal(m.virginia.propertyListingRows, 4916);
  assert.equal(m.newYork.bulletinIssues, 36);
  assert.equal(m.newYork.hhgBulletinObservations, 108);
  assert.equal(m.newYork.distinctCaseNumbers, 103);
  assert.equal(
    metric("federal_mc_identities_in_directory").grain,
    "directory_profile_with_mc_number",
  );
  assert.equal(
    metric("ny_dot_2026_hhg_bulletin_observations").presentation.family,
    "REGULATORY",
  );
  assert.equal(
    m.homeProjection.publishableProfiles,
    m.federalDirectory.publishableProfiles,
  );
});
test("Oregon authorized HHG list is a live state source and not a federal count", () => {
  const or = m.stateCapabilities.find((r: any) => r.state === "OR");
  assert.equal(or.status, "STATE_SOURCE_LIVE");
  assert.equal(or.capabilities[0].bulkCount, 113);
  assert.equal(metric("or_odot_authorized_hhg_list_rows").value, 113);
  assert.equal(m.oregon.authorizedHhgListRows, 113);
  assert.equal(m.oregon.sourceAsOf, null);
  assert.notEqual(metric("or_odot_authorized_hhg_list_rows").value, m.federalDirectory.publishableProfiles);
});
test("Illinois remains search-only with no bulk count and no completed specialist claim", () => {
  const il = m.stateCapabilities.find((r: any) => r.state === "IL");
  assert.equal(il.status, "SEARCH_ONLY");
  assert.equal(il.specialistComplete, false);
  assert.equal(il.completion, "PENDING");
  assert.equal(il.capabilities[0].bulkCount, null);
  assert.equal(metric("il_current_hhg_roster").value, null);
  assert.equal(metric("ny_current_hhg_roster").value, null);
  assert.equal(m.illinois.sourceAsOf, null);
});
test("All accepted expansion capabilities feed the homepage contract", () => {
  for (const state of ["CO", "VA", "NY", "IL", "OR"]) {
    const c = m.stateCapabilities.find((r: any) => r.state === state);
    assert.ok(c);
    for (const cap of c.capabilities)
      for (const key of cap.metricKeys) assert.ok(metric(key));
  }
  const home = buildMoveHomepageEvidenceInventory(m);
  assert.equal(home.length, m.metrics.length);
  for (const r of home) assert.equal(r.value, metric(r.key).value);
  assert.deepEqual(MOVE_HOMEPAGE_STATE_CARDS, m.homepageStateCards);
});
test("Clocks preserve retrieval versus source-effective time", () => {
  assert.equal(
    metric("federal_publishable_directory_profiles").sourceAsOf,
    null,
  );
  assert.equal(metric("ny_bulletin_issues").sourceAsOf, "2026-09-09");
  assert.equal(
    metric("co_puc_active_household_goods_permit_listings").sourceAsOf,
    "2025-06-27",
  );
  assert.ok(metric("va_hhg_authority_identities").retrievedAt);
});
test("Missing exact source count cannot be converted to zero", () => {
  for (const v of [null, undefined, -1, NaN, "0"])
    assert.throws(() => count(v, "missing"));
  assert.equal(count(0, "acquired"), 0);
  assert.equal(exactCountHeader("*/0"), 0);
  for (const h of [null, "0-0/*", ""]) assert.throws(() => exactCountHeader(h));
});
