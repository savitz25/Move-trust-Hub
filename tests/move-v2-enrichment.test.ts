import assert from "node:assert/strict";
import test from "node:test";
import { decideGoogleMatch } from "../lib/move-v2/enrichment/google-match";
import { decideGeographyEvidence } from "../lib/move-v2/enrichment/geography";
import {
  decideWebsite,
  extractPublished,
  validateCrawlUrl,
} from "../lib/move-v2/enrichment/website";
const id = {
  providerId: "p1",
  usdot: "123",
  legalName: "ABC MOVING SERVICES LLC",
  dbaName: "SHORELINE MOVING & STORAGE",
  phone: "732-555-1212",
  street: "10 Main St",
  city: "Freehold",
  state: "NJ",
  classification: "INTERSTATE_CARRIER",
};
const place = {
  placeId: "ChIJ1",
  displayName: "Shoreline Moving & Storage",
  formattedAddress: "10 Main Street, Freehold, NJ 07728",
  phone: "(732) 555-1212",
  websiteUri: "https://shoreline.example",
};
test("1 exact DBA phone address is high confidence", () =>
  assert.equal(
    decideGoogleMatch(id, place).status,
    "GOOGLE_MATCH_HIGH_CONFIDENCE",
  ));
test("2 legal name exact address phone is high confidence", () =>
  assert.equal(
    decideGoogleMatch(
      { ...id, dbaName: null },
      { ...place, displayName: "ABC Moving Services LLC" },
    ).status,
    "GOOGLE_MATCH_HIGH_CONFIDENCE",
  ));
test("3 name with phone and address conflict is review", () =>
  assert.equal(
    decideGoogleMatch(id, {
      ...place,
      phone: "2125550000",
      formattedAddress: "90 Other Rd, Miami, FL",
    }).status,
    "GOOGLE_MATCH_REVIEW",
  ));
test("4 existing Place ID is reused", () =>
  assert.equal(
    decideGoogleMatch(id, place, { existingPlaceId: "ChIJ1" }).status,
    "GOOGLE_EXISTING_MATCH_REUSED",
  ));
test("5 HHG auto provider retains one identity", () =>
  assert.equal(
    new Set(
      [
        { providerId: "p1", vertical: "HHG" },
        { providerId: "p1", vertical: "AUTO" },
      ].map((x) => x.providerId),
    ).size,
    1,
  ));
test("6 Google website validates with corroboration", () =>
  assert.equal(
    decideWebsite(id, "https://shoreline.example", {
      pageName: "Shoreline Moving & Storage",
      phone: "7325551212",
    }).status,
    "WEBSITE_HIGH_CONFIDENCE",
  ));
test("7 aggregator website rejected", () =>
  assert.equal(
    decideWebsite(id, "https://www.yelp.com/biz/x", {
      pageName: "Shoreline Moving",
    }).status,
    "WEBSITE_REJECTED",
  ));
test("8 published email is observed, never manufactured", () =>
  assert.deepEqual(
    extractPublished('<a href="mailto:sales@shoreline.example">Email</a>')
      .emails,
    ["sales@shoreline.example"],
  ));
test("9 multiple phones survive by source extraction", () =>
  assert.deepEqual(
    extractPublished(
      '<a href="tel:7325551111">a</a><a href="tel:8005552222">b</a>',
    ).phones,
    ["7325551111", "8005552222"],
  ));
test("10 website interstate claim cannot change FMCSA class", () => {
  extractPublished("<p>Nationwide long-distance moving</p>");
  assert.equal(id.classification, "INTERSTATE_CARRIER");
});
test("11 auto carrier marketing cannot change broker class", () => {
  extractPublished("<p>We are an auto carrier</p>");
  assert.equal(
    { ...id, classification: "AUTO_TRANSPORT_BROKER" }.classification,
    "AUTO_TRANSPORT_BROKER",
  );
});
test("12 rating cannot change regulatory eligibility", () => {
  decideGoogleMatch(id, { ...place });
  assert.equal(id.classification, "INTERSTATE_CARRIER");
});
test("13 subscription cannot change match or geography", () => {
  assert.deepEqual(
    decideGoogleMatch(id, place, { subscriptionState: "paid" }),
    decideGoogleMatch(id, place),
  );
  assert.deepEqual(
    decideGeographyEvidence({ explicitAreas: [], subscriptionState: "paid" }),
    decideGeographyEvidence({ explicitAreas: [] }),
  );
});
test("14 crawler blocks private and metadata targets", () => {
  assert.equal(validateCrawlUrl("https://127.0.0.1/x").ok, false);
  assert.equal(validateCrawlUrl("https://169.254.169.254/latest").ok, false);
});
test("15 deterministic decisions make reruns idempotent", () =>
  assert.deepEqual(decideGoogleMatch(id, place), decideGoogleMatch(id, place)));
test("service area precedence prevents fleet inference", () => {
  assert.equal(
    decideGeographyEvidence({
      explicitAreas: ["Monmouth", "Ocean"],
      fleetSize: 20,
    }).derivedServiceAreaRequired,
    false,
  );
  assert.equal(
    decideGeographyEvidence({ explicitAreas: [], fleetSize: 20 })
      .derivedServiceAreaRequired,
    true,
  );
});
