import { evidenceFingerprint } from "./review";
import type { EvidenceObservation, ReviewCase } from "./types";
export type ReviewFixture = {
  case: ReviewCase;
  providerName: string;
  state: "FL" | "WA";
  observations: EvidenceObservation[];
  currentValue: string;
  decisions?: Array<{ id: string; caseId: string; action: string; at: string }>;
};
const reasons = [
  "STATE_VS_FMCSA_ADDRESS_CHANGE",
  "GOOGLE_WRONG_STATE",
  "MULTIPLE_BRANCH_AMBIGUITY",
  "LEGAL_NAME_COLLISION",
  "DBA_COLLISION",
  "OLD_ADDRESS",
  "VIRTUAL_OFFICE_REVIEW",
  "INSUFFICIENT_CORROBORATION",
];
export const REVIEW_FIXTURES: ReviewFixture[] = Array.from(
  { length: 34 },
  (_, i) => {
    const state = i % 2 ? "WA" : "FL";
    const observations: EvidenceObservation[] = [
      {
        id: `obs-${i}-state`,
        source: "STATE_REGULATOR",
        kind: "ADDRESS",
        value: `${100 + i} Main St, ${state === "FL" ? "Tampa, FL 33602" : "Seattle, WA 98101"}`,
        observedAt: "2026-08-15",
        identityConfidence: "HIGH",
        sourceConfidence: "HIGH",
      },
      {
        id: `obs-${i}-fmcsa`,
        source: "FMCSA",
        kind: "ADDRESS",
        value: `${200 + i} Market St, ${state === "FL" ? "Orlando, FL 32801" : "Tacoma, WA 98402"}`,
        observedAt: "2026-05-01",
        identityConfidence: "HIGH",
        sourceConfidence: "HIGH",
      },
    ];
    const fp = evidenceFingerprint(observations);
    return {
      providerName: `Review Provider ${String(i + 1).padStart(2, "0")}`,
      state,
      currentValue: "Location review — not shown in proximity results",
      observations,
      case: {
        reviewCaseId: `rc-${String(i + 1).padStart(3, "0")}`,
        providerId: `provider-review-${i + 1}`,
        reviewType:
          i < 22
            ? "LOCATION_CONFLICT"
            : i < 28
              ? "WEBSITE_IDENTITY"
              : "SERVICE_GEOGRAPHY",
        status: "OPEN",
        priority: i < 5 ? "HIGH" : i < 20 ? "MEDIUM" : "LOW",
        openedAt: `2026-07-${String((i % 25) + 1).padStart(2, "0")}T12:00:00Z`,
        updatedAt: "2026-08-17T12:00:00Z",
        decisionVersion: 0,
        reasonCode: reasons[i % reasons.length],
        summary:
          "Independent sources disagree; consumer selection remains withheld.",
        evidenceFingerprint: fp,
        observationIds: observations.map((o) => o.id),
        identityIds: [],
        locationIds: observations.map((o) => o.id),
        websiteIds: [],
        authorityEvidenceIds: [observations[0].id],
      },
    };
  },
);
export const WEBSITE_REVIEW_COUNT = 22;
export const SERVICE_REVIEW_COUNT = 6;
