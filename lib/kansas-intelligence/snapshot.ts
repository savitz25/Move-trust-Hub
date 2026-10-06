import accepted from "./accepted-snapshot.json";

export const KANSAS_MOVE_SNAPSHOT = {
  route: "/kansas",
  retrievedAt: accepted.retrieved_at,
  sourceClock:
    "The KCC tariff/carrier webpage exposes no dataset-wide update date; retrieved 2026-10-06.",
  rows: accepted.rows,
  sourceRowCount: accepted.row_count,
  sourceSha256: accepted.raw_sha256,
  acceptedSnapshotSha256:
    "8d29f86956d61ecfdcdcf9bc6a412cb834c4c1bb531fd66d00e9bded95a51d78",
  sourceUrl: accepted.source,
  authorityStatute:
    "https://ksrevisor.gov/statutes/chapters/ch66/066_001_0114.html",
  insuranceStatute:
    "https://www.kslegislature.gov/b2025_26/laws/066_000_0000_chapter/066_001_0128_section/066_001_0128_k/",
  motorCarrierSearch: "https://www.kcc.ks.gov/motor-carrier-search",
  existingKansasMoverDirectoryRecords: "NOT_RECONCILED",
  stateAuthorityRoster: "NOT_ACQUIRED",
  insuranceObservations: "NOT_ACQUIRED",
  commissionActions: "NOT_ACQUIRED",
  existingEntityMatches: "NOT_ACQUIRED",
  netNewEntities: 0,
  evidenceAttachments: 0,
  graphWrites: 0,
} as const;
