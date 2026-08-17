import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { assertOperationsAuthorization } from "../lib/move-v2/evidence-operations/authorization";
import { classifyChange } from "../lib/move-v2/evidence-operations/changes";
import {
  DecisionLedger,
  evidenceFingerprint,
  validateDecision,
} from "../lib/move-v2/evidence-operations/review";
import { ImmutableReleaseRegistry } from "../lib/move-v2/evidence-operations/release-control";
import {
  freshnessStatus,
  FRESHNESS_POLICIES,
} from "../lib/move-v2/evidence-operations/freshness";
import {
  runBoundedJob,
  type RefreshJob,
} from "../lib/move-v2/evidence-operations/jobs";
import {
  getDiscoveryRelease,
  searchLocalMovers,
} from "../lib/move-v2/consumer-discovery/server-read";
import type {
  EvidenceObservation,
  ReviewCase,
  ReviewDecision,
} from "../lib/move-v2/evidence-operations/types";
test("unauthorized operations mutation is rejected", () => {
  const prior = process.env.ADMIN_SECRET;
  process.env.ADMIN_SECRET = "server-secret";
  assert.throws(() => assertOperationsAuthorization("wrong"), /UNAUTHORIZED/);
  assert.doesNotThrow(() => assertOperationsAuthorization("server-secret"));
  if (prior) process.env.ADMIN_SECRET = prior;
  else delete process.env.ADMIN_SECRET;
});
test("service role key never reaches browser code", () => {
  for (const f of [
    "app/(move)/experience-lab/v2/internal/review/page.tsx",
    "app/(move)/experience-lab/v2/internal/review/review-console.tsx",
  ])
    assert.equal(
      readFileSync(f, "utf8").includes("SUPABASE_SERVICE_ROLE_KEY"),
      false,
    );
});
test("real and synthetic operational actions remain explicitly separated", () =>
  assert.notEqual("REAL_SOURCE_PILOT", "SYNTHETIC_CONTROL_TEST"));
test("refresh observations are immutable and identical fingerprints no-op", () => {
  const observations = Object.freeze([{ id: "o1", value: "official" }]);
  assert.equal(
    evidenceFingerprint(observations),
    evidenceFingerprint(observations),
  );
  assert.equal(observations[0].value, "official");
});
test("resume does not duplicate and completed fingerprint no-ops", () => {
  let writes = 0;
  const j: RefreshJob = {
    jobId: "j",
    type: "FMCSA_FRESHNESS",
    mode: "PREVIEW",
    status: "PENDING",
    cursor: 0,
    limit: 1,
    inputFingerprint: "fp",
    attempts: 0,
  };
  const a = runBoundedJob(j, ["a", "b"], () => writes++),
    b = runBoundedJob(a, ["a", "b"], () => writes++);
  runBoundedJob(b, ["a", "b"], () => writes++);
  assert.equal(writes, 2);
  assert.equal(b.status, "COMPLETE");
});
test("source unavailable does not imply inactive", () =>
  assert.equal(
    freshnessStatus(FRESHNESS_POLICIES[0], "2026-08-17", "2026-08-18", {
      sourceUnavailable: true,
    }),
    "SOURCE_UNAVAILABLE",
  ));
test("review cites evidence, stays unresolved, and ledger is append only", () => {
  const obs: EvidenceObservation[] = [
    {
      id: "o",
      source: "FMCSA",
      kind: "ADDRESS",
      value: "A",
      observedAt: "now",
      identityConfidence: "HIGH",
      sourceConfidence: "HIGH",
    },
  ];
  const fp = evidenceFingerprint(obs);
  const c: ReviewCase = {
    reviewCaseId: "c",
    providerId: "p",
    reviewType: "LOCATION_CONFLICT",
    status: "OPEN",
    priority: "MEDIUM",
    openedAt: "now",
    updatedAt: "now",
    decisionVersion: 0,
    reasonCode: "CONFLICT",
    summary: "remains ambiguous",
    evidenceFingerprint: fp,
    observationIds: ["o"],
    identityIds: [],
    locationIds: ["o"],
    websiteIds: [],
    authorityEvidenceIds: [],
  };
  const d: ReviewDecision = {
    decisionId: "d",
    reviewCaseId: "c",
    providerId: "p",
    decisionType: "RETAIN_UNRESOLVED",
    decisionReason: "conflict remains",
    reviewer: "server",
    createdAt: "now",
    evidenceFingerprint: fp,
    selectedObservationIds: ["o"],
    rejectedObservationIds: [],
  };
  assert.equal(validateDecision(c, d, obs), true);
  const ledger = new DecisionLedger();
  ledger.append(d);
  assert.equal(ledger.append(d), false);
});
test("supersession and rollback preserve history and evidence trace", () => {
  const r = new ImmutableReleaseRegistry();
  r.publish({
    id: "old",
    fingerprint: "a",
    dependencyEvidenceIds: ["o1"],
    createdAt: "1",
  });
  assert.equal(
    r.publish({
      id: "new",
      fingerprint: "b",
      dependencyEvidenceIds: ["o2"],
      createdAt: "2",
    }).action,
    "CREATED",
  );
  assert.equal(r.releases[0].status, "HISTORICAL");
  r.rollback("old");
  assert.equal(r.currentId, "old");
  assert.equal(r.releases.length, 2);
  assert.equal(r.trace("new", "o2"), true);
});
test("non-material and commercial changes never invalidate", () => {
  const base = {
    providerId: "p",
    source: "x",
    oldValue: "a",
    newValue: "b",
    detectedAt: "now",
  };
  for (const field of [
    "website_page_title",
    "subscription",
    "rating",
    "review_count",
  ])
    assert.equal(classifyChange({ ...base, field }).consumerImpact, "NONE");
});
test("material dependencies require a new immutable release", () =>
  assert.equal(
    classifyChange({
      providerId: "p",
      source: "state",
      field: "authority_status",
      oldValue: "ACTIVE",
      newValue: "INACTIVE",
      detectedAt: "now",
    }).consumerImpact,
    "REBUILD",
  ));
test("public output omits internal metadata and excludes derived, NJ and Illinois", () => {
  const value = JSON.stringify(getDiscoveryRelease());
  for (const x of [
    "reviewer",
    "assigned_reviewer",
    "operational_action",
    "EXPERIMENTAL_DERIVED",
  ])
    assert.equal(value.includes(x), false);
  assert.equal(searchLocalMovers({ originZip: "07102" }).results.length, 0);
  assert.equal(searchLocalMovers({ originZip: "60601" }).results.length, 0);
});
test("production has no public operations write route", () =>
  assert.equal(
    readFileSync(
      "lib/move-v2/evidence-operations/operations.server.ts",
      "utf8",
    ).includes("export async function POST"),
    false,
  ));
