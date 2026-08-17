import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { Client } from "pg";
import { loadEnvLocal } from "../../../lib/verification/load-env-local";
import { assertOperationsAuthorization } from "../../../lib/move-v2/evidence-operations/authorization";
import { databaseUrl, ssl } from "../db/connection";
const providerId = "72ce5037-b67d-5e2e-9c69-79b15685ecea";
const sha = (x: string) => createHash("sha256").update(x).digest("hex");
const uuid = (x: string) => {
  const h = sha(x);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
};
async function main() {
  loadEnvLocal();
  assertOperationsAuthorization(process.env.ADMIN_SECRET);
  const c = new Client({ connectionString: databaseUrl(), ssl });
  await c.connect();
  try {
    const before = await c.query(
      `select count(*)::int n from move_v2.refresh_observation where provider_id=$1`,
      [providerId],
    );
    const pointer = await c.query(
      `select * from move_v2.discovery_release_pointer where pointer_name='CONSUMER_CURRENT'`,
    );
    if (!pointer.rowCount) throw new Error("Current release pointer missing");
    const current = pointer.rows[0].current_release_id;
    const baseline = (
      await c.query(
        `select consumer_discovery_release_id from move_v2.consumer_discovery_release where version='MOVE_CONSUMER_DISCOVERY_2026_08_V2_DB_CHECKPOINT'`,
      )
    ).rows[0].consumer_discovery_release_id;
    const caseId = uuid("task011-synthetic-supersession-control"),
      fp = sha("task011-synthetic-control-evidence");
    await c.query(
      `insert into public.move_v2_review_case(id,provider_id,review_type,status,priority,reason_code,summary,evidence_fingerprint,related_ids)values($1,$2,'OTHER_RESEARCH_REVIEW','IN_REVIEW','LOW','SYNTHETIC_CONTROL','Transaction-isolated control for decision supersession; not a source fact.',$3,$4)on conflict(id)do nothing`,
      [caseId, providerId, fp, { control: true }],
    );
    const obs = await c.query(
      `select refresh_observation_id from move_v2.refresh_observation where provider_id=$1 order by created_at limit 1`,
      [providerId],
    );
    let first = await c.query(
      `select id from public.move_v2_review_decision where review_case_id=$1 and decision_type='SYNTHETIC_BAD_SELECTION'`,
      [caseId],
    );
    if (!first.rowCount)
      first = await c.query(
        `insert into public.move_v2_review_decision(review_case_id,provider_id,decision_type,decision_reason,reviewer,evidence_fingerprint,selected_observation_ids,rejected_observation_ids)values($1,$2,'SYNTHETIC_BAD_SELECTION','Synthetic control only; deliberately superseded, never consumed.','task-011-control',$3,$4,'{}')returning id`,
        [caseId, providerId, fp, obs.rows.map((r) => r.refresh_observation_id)],
      );
    let corrected = await c.query(
      `select id,supersedes_decision_id from public.move_v2_review_decision where review_case_id=$1 and decision_type='SYNTHETIC_CORRECTED_SELECTION'`,
      [caseId],
    );
    if (!corrected.rowCount)
      corrected = await c.query(
        `insert into public.move_v2_review_decision(review_case_id,provider_id,decision_type,decision_reason,reviewer,evidence_fingerprint,selected_observation_ids,rejected_observation_ids,supersedes_decision_id)values($1,$2,'SYNTHETIC_CORRECTED_SELECTION','Corrected synthetic control; official evidence remains unchanged.','task-011-control',$3,$4,'{}',$5)returning id,supersedes_decision_id`,
        [
          caseId,
          providerId,
          fp,
          obs.rows.map((r) => r.refresh_observation_id),
          first.rows[0].id,
        ],
      );
    await c.query(
      `update public.move_v2_review_case set status='RESOLVED_ACCEPTED',decision_version=2,updated_at=now() where id=$1`,
      [caseId],
    );
    await c.query(
      `update move_v2.discovery_release_pointer set prior_release_id=current_release_id,current_release_id=$1,updated_at=now() where pointer_name='CONSUMER_CURRENT'`,
      [baseline],
    );
    await c.query(
      `insert into move_v2.operational_action_log(actor,command,provider_id,prior_fingerprint,new_fingerprint,release_id,details)values('task-011-control','rollbackReleasePointer',$1,$2,$3,$4,$5)`,
      [
        providerId,
        String(current),
        String(baseline),
        baseline,
        { syntheticControl: true },
      ],
    );
    await c.query(
      `update move_v2.discovery_release_pointer set prior_release_id=current_release_id,current_release_id=$1,updated_at=now() where pointer_name='CONSUMER_CURRENT'`,
      [current],
    );
    await c.query(
      `insert into move_v2.operational_action_log(actor,command,provider_id,prior_fingerprint,new_fingerprint,release_id,details)values('task-011-control','correctReleasePointer',$1,$2,$3,$4,$5)`,
      [
        providerId,
        String(baseline),
        String(current),
        current,
        { syntheticControl: true },
      ],
    );
    const history = await c.query(
      `select id,decision_type,supersedes_decision_id from public.move_v2_review_decision where review_case_id=$1 order by created_at`,
      [caseId],
    );
    const after = await c.query(
      `select count(*)::int n from move_v2.refresh_observation where provider_id=$1`,
      [providerId],
    );
    const finalPointer = await c.query(
      `select current_release_id,prior_release_id from move_v2.discovery_release_pointer where pointer_name='CONSUMER_CURRENT'`,
    );
    const out = {
      classification: "SYNTHETIC CONTROL TEST",
      caseId,
      firstDecisionId: first.rows[0].id,
      correctedDecisionId: corrected.rows[0].id,
      supersedesCorrect:
        corrected.rows[0].supersedes_decision_id === first.rows[0].id,
      history: history.rows,
      officialObservationCountBefore: before.rows[0].n,
      officialObservationCountAfter: after.rows[0].n,
      officialEvidenceUnchanged: before.rows[0].n === after.rows[0].n,
      rollbackPointer: baseline,
      correctedPointer: current,
      finalPointer: finalPointer.rows[0],
      auditHistoryIntact: history.rowCount === 2,
    };
    writeFileSync(
      "docs/task-011-recovery-control-audit.json",
      JSON.stringify(out, null, 2) + "\n",
    );
    console.log(
      JSON.stringify(
        {
          supersedesCorrect: out.supersedesCorrect,
          officialEvidenceUnchanged: out.officialEvidenceUnchanged,
          auditHistoryIntact: out.auditHistoryIntact,
          finalPointerCorrect: out.finalPointer.current_release_id === current,
        },
        null,
        2,
      ),
    );
  } finally {
    await c.end();
  }
}
void main();
