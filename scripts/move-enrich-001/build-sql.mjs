import { readFileSync, writeFileSync } from "node:fs";
import { buildObservations, buildRollbackSql, evidenceRows, parseCsv, selectCandidates, summarize, toCsv } from "./prepare.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1 || !process.argv[index + 1]) {
    throw new Error(`Missing ${name}`);
  }
  return process.argv[index + 1];
}

const rows = parseCsv(readFileSync(arg("--csv"), "utf8"));
const selected = selectCandidates(rows);
const observations = buildObservations(selected.candidates);
const summary = summarize(observations);
const evidence = evidenceRows(observations);
writeFileSync(arg("--sql-out"), buildRollbackSql(rows), "utf8");
writeFileSync(arg("--rollback-out"), toCsv(evidence), "utf8");
writeFileSync(arg("--prestate-out"), toCsv(evidence), "utf8");
process.stdout.write(`${JSON.stringify({
  input: selected.input,
  excluded: selected.excluded,
  nonMover: selected.non_mover,
  blockedUsdot: selected.usdot_1398726,
  candidates: selected.candidates.length,
  ...summary,
})}\n`);
