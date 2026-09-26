import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AskMoveResultCard } from "../../components/ask-move-result-card";
import type { AskCard } from "./execute";

function card(overrides: Partial<AskCard> = {}): AskCard {
  return {
    entityId: "entity-1",
    displayName: "HINDMAN & ISAACS MOVING AND STORAGE INCORPORATED OF PALM BEACH",
    legalName: "HINDMAN & ISAACS MOVING AND STORAGE INCORPORATED OF PALM BEACH",
    dba: null,
    usdot: "1002530",
    mc: "355123",
    role: "carrier",
    fmcsaStatus: "Stored status",
    headquarters: "West Palm Beach, FL",
    floridaIm: null,
    operatingAuthority: null,
    href: "/companies/hindman-isaacs-moving-storage-inc",
    publicationNote: null,
    whyMatched: "Exact USDOT identifier match. USDOT is not an MC number.",
    complaintsNote: null,
    sourceLastChecked: "2026-01-01",
    officialAsOf: null,
    matchEvidence: {
      method: "exact_identifier",
      fields: [{ field: "usdot_number", requested: "1002530", returned: "1002530" }],
      normalization: ["digits"],
    },
    ...overrides,
  };
}

function render(row: AskCard) {
  return renderToStaticMarkup(React.createElement(AskMoveResultCard, { row, officialAsOf: "extract" }));
}

function profileAnchor(html: string) {
  const match = html.match(/<a [^>]*data-search-action="profile"[^>]*>[\s\S]*?<\/a>/);
  assert.ok(match, "profile anchor");
  return match[1] ? match[0] : match[0];
}

test("a published profile card is one link with a visible cue and a wrapping name", () => {
  const html = render(card());
  const anchor = profileAnchor(html);
  assert.match(anchor, /href="\/companies\/hindman-isaacs-moving-storage-inc"/);
  assert.match(anchor, /View profile →/);
  assert.match(anchor, /break-words/);
  assert.match(anchor, /flex-col/);
  assert.match(anchor, /sm:flex-row/);
  assert.match(anchor, /HINDMAN &amp; ISAACS MOVING AND STORAGE INCORPORATED OF PALM BEACH/);
  assert.doesNotMatch(anchor, /<summary|<button|Select this company/);
  assert.match(html, /data-card-surface="profile"/);
  assert.match(html, /<dt[^>]*>USDOT<\/dt>/);
  assert.match(html, /<dt[^>]*>MC<\/dt>/);
  assert.match(html, /Recorded location/);
  assert.match(html, /West Palm Beach, FL/);
  assert.equal(html.split('data-search-action="profile"').length - 1, 1);
});

test("why-matched and match method sit inside Trace, and Trace is not the profile link", () => {
  const html = render(card({ selectionHref: "/ask?q=isaacs&company=1" }));
  const face = html.split("<details")[0] ?? "";
  const trace = html.slice(html.indexOf("<details"));
  assert.doesNotMatch(face, /Why this matched|exact_identifier|Exact USDOT identifier match/);
  assert.match(trace, /Trace this result/);
  assert.match(trace, /Why this matched/);
  assert.match(trace, /Exact USDOT identifier match/);
  assert.match(trace, /Match method/);
  assert.match(trace, /exact identifier/);
  assert.match(trace, /Recorded headquarters is not service territory/);
  assert.match(face, /Select this company and continue/);
  assert.match(face, /href="\/ask\?q=isaacs&amp;company=1"/);
  assert.doesNotMatch(html, /best mover|recommended|hire this|Trust Score/i);
});

test("a row without a published profile has no profile link and stays inert", () => {
  const html = render(
    card({
      href: null,
      displayName: "UNPUBLISHED ISAACS REGISTRATION",
      usdot: null,
      mc: null,
      role: "Florida Intrastate Mover registration",
      floridaIm: "IM12345",
      headquarters: null,
      fmcsaStatus: "active",
      publicationNote:
        "Registration grain. Not a published FMCSA interstate profile. Unlinked rows are not federal identities.",
      whyMatched:
        "This row matches because FDACS stores it as an active Intrastate Mover registration. That is not federal interstate household-goods authority and not service territory.",
      matchEvidence: undefined,
    }),
  );
  assert.doesNotMatch(html, /View profile|data-card-surface|data-search-action="profile"|\/companies\//);
  assert.match(html, /Florida Intrastate Mover registration/);
  assert.match(html, /Florida IM registration/);
  assert.match(html, /Not a published FMCSA interstate profile/);
  assert.match(html, /Florida FDACS; FMCSA only when verified-linked/);
  const face = html.split("<details")[0] ?? "";
  assert.doesNotMatch(face, /Why this matched/);
  assert.match(html, /Trace this result/);
});

test("broker role stays a stored role label", () => {
  const html = render(card({ role: "broker", href: "/companies/example-broker" }));
  assert.match(html, />broker</);
  assert.doesNotMatch(html, /best broker|hire|recommended/i);
});
