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
    "e543a04d657dff725a9c3feb40cf439575b0644d78a0481021c4d53b2142f479",
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
