import assert from "node:assert/strict";
import test from "node:test";
import { createHmac } from "node:crypto";
import { mintMoveHandoff, HANDOFF_TTL_SECONDS } from "./handoff";
import { claimCtaEnabledFor, moveClaimProfile } from "./eligibility";
import {
  fetchBusinessProfile,
  fetchBusinessReplies,
  parseBusinessProfile,
  parseReplies,
} from "./public";
import {
  createClaimHandoffRedirect,
  safeBusinessWebsite,
} from "./security";
const ID = "usdot-3244649",
  SECRET = "test-secret-that-is-at-least-32-characters";
test("exact published USDOT profile is eligible and flags default off", () => {
  const c = {
    id: ID,
    slug: "example-mover",
    name: "Example Mover",
    usdotNumber: "3244649",
    publicationState: "PUBLISHABLE",
  } as const;
  assert.equal(moveClaimProfile(c as never)?.usdot, "3244649");
  assert.equal(claimCtaEnabledFor(ID, { ATH_HANDOFF_SECRET: SECRET }), false);
  assert.equal(
    claimCtaEnabledFor(ID, {
      ATH_HANDOFF_SECRET: SECRET,
      ATH_CLAIM_CTA_MODE: "canary",
      ATH_CLAIM_CANARY_PROFILE_IDS: ID,
    }),
    true,
  );
  for (const x of [
    { ...c, id: "fuzzy" },
    { ...c, usdotNumber: "" },
    { ...c, publicationState: "REVIEW_REQUIRED" },
  ])
    assert.equal(moveClaimProfile(x as never), null);
});
test("v2 token binds exact profile, expires, and tampering changes signature", () => {
  const now = new Date("2026-09-02T00:00:00Z"),
    m = mintMoveHandoff(
      SECRET,
      {
        id: ID,
        slug: "example-mover",
        usdot: "3244649",
        displayName: "Example Mover",
      },
      { now, nonce: "nonce" },
    );
  assert.equal(m.payload.entity_class, "mover");
  assert.equal(m.payload.identifier_namespace, "USDOT");
  assert.equal(m.payload.exp - m.payload.iat, HANDOFF_TTL_SECONDS);
  const [b, s] = m.token.split(".");
  assert.equal(createHmac("sha256", SECRET).update(b!).digest("base64url"), s);
  assert.notEqual(
    createHmac("sha256", SECRET).update(`${b}x`).digest("base64url"),
    s,
  );
});
test("Layer C and replies require exact hub/id and approved public shape", () => {
  const fresh = {
      state: "CURRENT",
      lastConfirmedAt: "2026-09-01T00:00:00Z",
      label: "Current",
      mayBeOutdated: false,
    },
    dto = {
      contractVersion: 2,
      hub: "move",
      nativeProfileId: ID,
      managed: true,
      source: "BUSINESS_SUPPLIED",
      freshness: fresh,
      fields: { description: "Business supplied" },
      services: [],
      serviceAreas: [],
      languages: [],
      hours: [],
    };
  assert.ok(parseBusinessProfile(dto, ID));
  assert.equal(parseBusinessProfile({ ...dto, hub: "lender" }, ID), null);
  const reply = {
    contractVersion: 2,
    hub: "move",
    nativeProfileId: ID,
    replies: [
      {
        id: ID,
        replyType: "GENERAL_RESPONSE",
        targetType: "PROFILE_GENERAL",
        targetRecordId: null,
        body: "This approved business response provides additional context without changing official evidence.",
        source: "BUSINESS_RESPONSE",
        publishedAt: "2026-09-01T00:00:00Z",
        updatedAt: null,
      },
    ],
  };
  assert.ok(parseReplies(reply, ID));
  assert.equal(
    parseReplies(
      { ...reply, nativeProfileId: "22222222-2222-4222-8222-222222222222" },
      ID,
    ),
    null,
  );
});

test("Ask outage omits overlays without failing the mover profile", async () => {
  const unavailable = (async () => {
    throw new Error("Ask unavailable");
  }) as typeof fetch;
  assert.equal(await fetchBusinessProfile(ID, unavailable), null);
  assert.equal(await fetchBusinessReplies(ID, unavailable), null);
});

test("business website permits only absolute HTTP(S) URLs", () => {
  assert.equal(safeBusinessWebsite("https://example.com"), "https://example.com/");
  assert.equal(safeBusinessWebsite("http://example.com"), "http://example.com/");
  for (const unsafe of [
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "data:text/html,<h1>unsafe</h1>",
    "vbscript:msgbox(1)",
    "//evil.example",
    "not a URL",
    "",
    "   ",
  ])
    assert.equal(safeBusinessWebsite(unsafe), null);
});

test("successful handoff redirect is private and non-indexable", async () => {
  const response = createClaimHandoffRedirect("signed.token");
  assert.equal(response.status, 302);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.match(response.headers.get("x-robots-tag") || "", /noindex/);
  assert.equal(
    response.headers.get("location"),
    "https://www.asktrusthub.com/claim/continue?handoff=signed.token",
  );
  assert.equal(await response.text(), "");
});
