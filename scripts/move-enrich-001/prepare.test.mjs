import assert from "node:assert/strict";
import test from "node:test";
import {
  BATCH,
  BLOCKED_USDOT,
  GO_PHRASE,
  SOURCE,
  buildObservations,
  buildRollbackSql,
  classifyRow,
  commitAuthorized,
  evidenceRows,
  identityGate,
  maskSample,
  parseCsv,
  selectCandidates,
  summarize,
} from "./prepare.mjs";

const header = "company_id,usdot,publish_tier,entity_type,decision_applied,website_url,phone_primary,email,address,coverage_source_url";

function row(cells) {
  return parseCsv(`${header}\n${cells}\n`)[0];
}

test("parses quoted commas and classifies exclusions", () => {
  const parsed = parseCsv(
    `${header}\n` +
      `co-1,1000001,strict,carrier,,https://example.com,555-0100,lab@example.com,"1 Example St, Austin, TX",https://example.com/a\n` +
      `co-2,${BLOCKED_USDOT},strict,carrier,,https://example.com,555-0101,a@example.com,2 Example St,\n` +
      `co-3,1000003,excluded,carrier,,https://example.com,,,,\n` +
      `co-4,1000004,partial,non_mover,,https://example.com,,,,\n` +
      `co-5,1000005,partial,carrier,NEW non-mover candidate (flag only, not excluded),https://example.com,555-0102,b@example.com,3 Example St,\n`,
  );
  assert.equal(parsed.length, 5);
  assert.equal(parsed[0].address, "1 Example St, Austin, TX");
  const selected = selectCandidates(parsed);
  assert.equal(selected.input, 5);
  assert.equal(selected.excluded, 1);
  assert.equal(selected.non_mover, 1);
  assert.equal(selected.usdot_1398726, 1);
  assert.equal(selected.candidates.length, 2);
  assert.equal(classifyRow(parsed[4]), "candidate");
});

test("identity gate is exact and fail-closed above 0.5 percent", () => {
  const rows = parseCsv(
    `${header}\n` +
      `ok,111,strict,carrier,,https://example.com,555-0100,a@example.com,1 St,\n` +
      `missing,222,strict,carrier,,https://example.com,,,,\n` +
      `bad,333,partial,carrier,,https://example.com,,,,\n`,
  );
  const candidates = selectCandidates(rows).candidates;
  const gate = identityGate(candidates, new Map([
    ["ok", { usdot: "111" }],
    ["bad", { usdot: "999" }],
  ]));
  assert.equal(gate.notFound, 1);
  assert.equal(gate.mismatches, 1);
  assert.equal(gate.eligible.length, 1);
  assert.equal(gate.pass, false);
  const blank = identityGate(
    selectCandidates(parseCsv(`${header}\nok,,strict,carrier,,https://example.com,,,,\n`)).candidates,
    new Map([["ok", { usdot: "" }]]),
  );
  assert.equal(blank.pass, true);
  assert.equal(blank.mismatches, 0);
});

test("observations preserve tier and skip blank fields", () => {
  const rows = selectCandidates(parseCsv(
    `${header}\n` +
      `ok,111,strict,carrier,,https://example.com,555-0100,,1 St,\n` +
      `part,222,partial,carrier,,https://example.net,,c@example.net,,\n`,
  )).candidates;
  const observations = buildObservations(rows);
  const summary = summarize(observations);
  assert.equal(summary.profiles, 2);
  assert.equal(summary.website, 2);
  assert.equal(summary.phone, 1);
  assert.equal(summary.email, 1);
  assert.equal(summary.address, 1);
  assert.equal(summary.total, 5);
  assert.equal(summary.strictProfiles, 1);
  assert.equal(summary.strictObservations, 3);
  assert.equal(summary.partialProfiles, 1);
  assert.equal(summary.partialObservations, 2);
  assert.equal(observations[1].normalizedValue, "5550100");
  const evidence = evidenceRows(observations);
  assert.equal(evidence[0].source, SOURCE);
  assert.equal(evidence[0].batch, BATCH);
  assert.equal(evidence[0].prior_existed, "false");
  assert.equal(JSON.stringify(evidence).includes("@"), false);
});

test("mask keeps only the first email domain", () => {
  const masked = maskSample({
    kind: "email",
    rawValue: "one@example.com | two@example.com",
    normalizedValue: "one@example.com | two@example.com",
  });
  assert.equal(masked, "email:o***@example.com");
  assert.equal(masked.includes("two@"), false);
});

test("rollback script cannot commit and requires the exact go phrase", () => {
  const rows = parseCsv(`${header}\nok,111,strict,carrier,,https://example.com,555-0100,a@example.com,1 St,\n`);
  const sql = buildRollbackSql(rows);
  assert.match(sql, /\nROLLBACK;\s*$/);
  assert.equal(/(^|\n)\s*COMMIT\b/.test(sql), false);
  assert.equal(sql.includes(SOURCE), true);
  assert.equal(sql.includes(BATCH), true);
  assert.equal(sql.includes("public.companies"), true);
  assert.equal(/\bUPDATE\s+public\.companies\b/i.test(sql), false);
  assert.equal(commitAuthorized(GO_PHRASE), true);
  assert.equal(commitAuthorized("go move enrich load"), false);
  assert.equal(commitAuthorized("GO MOVE ENRICH LOAD "), false);
});
