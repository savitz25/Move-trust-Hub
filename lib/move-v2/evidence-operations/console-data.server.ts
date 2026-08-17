import "server-only";
import { Client } from "pg";
import { databaseUrl, ssl } from "../../../scripts/move-v2/db/connection";
import type { ReviewFixture } from "./fixtures";
import type { EvidenceObservation, ReviewType, ReviewStatus } from "./types";
type SourceObservation = {
  source?: string;
  address?: string;
  phone?: string;
  observedAt?: string;
  state?: string;
};
export async function loadOperationalReviewFixtures(): Promise<
  ReviewFixture[]
> {
  const c = new Client({ connectionString: databaseUrl(), ssl });
  await c.connect();
  try {
    const q = await c.query(
      `select c.*,coalesce(f.display_name,'Move V2 provider') provider_name,coalesce(json_agg(d order by d.created_at) filter(where d.id is not null),'[]') decisions from public.move_v2_review_case c left join move_v2.fmcsa_provider_fact f on f.provider_id=c.provider_id left join public.move_v2_review_decision d on d.review_case_id=c.id group by c.id,f.display_name order by c.opened_at`,
    );
    return q.rows.map((row) => {
      const source = (row.related_ids?.sourceObservations ??
        []) as SourceObservation[];
      const observations: EvidenceObservation[] = source.map((o, i) => ({
        id: `${row.id}-source-${i}`,
        source: o.source ?? "OTHER_TRUSTHUB",
        kind: "ADDRESS",
        value:
          [o.address, o.phone].filter(Boolean).join(" · ") ||
          "Source observation retained",
        observedAt: o.observedAt ?? row.opened_at,
        identityConfidence: "HIGH",
        sourceConfidence: o.source === "GOOGLE" ? "MEDIUM" : "HIGH",
      }));
      return {
        case: {
          reviewCaseId: row.id,
          providerId: row.provider_id,
          reviewType: row.review_type as ReviewType,
          status: row.status as ReviewStatus,
          priority: row.priority,
          openedAt: row.opened_at,
          updatedAt: row.updated_at,
          decisionVersion: row.decision_version,
          reasonCode: row.reason_code,
          summary: row.summary,
          evidenceFingerprint: row.evidence_fingerprint,
          observationIds: observations.map((o) => o.id),
          identityIds: [],
          locationIds: observations.map((o) => o.id),
          websiteIds: [],
          authorityEvidenceIds: [],
          assignedReviewer: row.assigned_reviewer ?? undefined,
        },
        providerName: row.provider_name,
        state: (source.find((o) => o.state)?.state === "WA" ? "WA" : "FL") as
          "FL" | "WA",
        observations: observations.length
          ? observations
          : [
              {
                id: `${row.id}-fingerprint`,
                source: "EVIDENCE_SNAPSHOT",
                kind: "FINGERPRINT",
                value: row.evidence_fingerprint,
                observedAt: row.opened_at,
                identityConfidence: "HIGH",
                sourceConfidence: "HIGH",
              },
            ],
        currentValue:
          row.status === "RESOLVED_ACCEPTED"
            ? "Normalized control selection corrected"
            : "Location remains withheld pending sufficient corroboration",
        decisions: (row.decisions as Array<Record<string, string>>).map(
          (d) => ({
            id: d.id,
            caseId: row.id,
            action: d.decision_type,
            at: d.created_at,
          }),
        ),
      };
    });
  } finally {
    await c.end();
  }
}
