# TH-SEARCH-R1-006: source association containment

Builder: GPT-6 Astra / High, USER-CONFIRMED. Independent running-session metadata was unavailable. Baseline: `2ef25a62d2b0dee52172d8bda1981d5d3bef5016`. Fresh isolated branch `th-search-r1-006`; Move remote verified; no conflicting active assignment or R1-006 PR found. Other worktrees and old drafts were left untouched.

## Evidence and classification

Bounded independent source observations are in `source-oracle.json`, `official-browser.json`, and `motus-authority.json`. The canonical `jk-moving` row stores USDOT 1065394 / MC 225850, with check time 2026-08-23 and data hash recorded in the oracle. Its retained raw object identifies the same USDOT/legal name/DBA but does not supply a docket field or source snapshot date. The inspected identifier change log has no rows; this does not prove absence of historical associations.

The real SAFER browser lookup by USDOT 1065394 and independently by MC196957 both identified JK MOVING & STORAGE INC / JK MOVING SERVICES. SAFER source-as-of: 2026-09-10. Retrieval: 2026-09-12 UTC. MOTUS showed two operating-authority registrations (property except household goods, and household goods), each MC196957 Active. MOTUS did not display an official effective/as-of timestamp for that section. Its retrieval time is not an effective date.

Independent SAFER MC225850 lookup completed as Record Inactive without a holder or historical docket list. That does not establish invalidity, prior ownership, misconduct, or lack of authorization. Classification: **unsupported current stored association; history unresolved**. Current evidence corroborates USDOT1065394 / MC196957; it does not prove a complete historical docket set. No identity merge or canonical production write was performed.

## Proven mechanism and limits of causal attribution

The repository core seed paired JK with USDOT146576 and MC225850. The directory catalog paired USDOT1065394 with MC225850. Existing correction script commit `f9881c4768df1d631bb506be8a5b481ca9aa809e` corrected the DOT while passing the old MC into `fetchFmcsaCarrierSnapshot`. That function overwrites a fetched MC with its supplied MC hint. This is a demonstrated mechanism for carrying an old association across a DOT correction. No retained execution receipt establishes exactly which historic run produced the present row; a specific run is not claimed as proven.

R1-001 exact lookup correctly used stored equality, but equality was described as sufficient relationship evidence. R1-005 name retrieval correctly found JK and kept its separate Maryland identity. Neither field provenance nor official-link construction previously represented the known disagreement. Baseline browser/API evidence shows MC225850 FOUND and a JK result/link using that stored number; MC196957 remains a legitimate permitted-index miss.

## Minimal containment

A repository-owned discrepancy artifact is keyed by stable record IDs and the expected DOT/MC/source fingerprint, not company-name text. The shared projection removes the disputed MC from trusted public fields and retains it only as an explicitly reviewed source observation. It never substitutes MC196957 into the effective index. Changed source values/fingerprints require review; no clock expires the conflict. New raw values remain observations, never overwritten by the artifact.

The projection covers database mappings, seed/catalog projections, normalization, profile enrichment, directory DTOs, search cards, and Verify. The repository-owned erroneous seed DOT is corrected to the corroborated USDOT1065394; its raw historical MC remains in source history and is contained at projection. Company research and USDOT lookup stay available. MC lookup/pairs complete as SOURCE_CONFLICT, without authority/adverse claims through that relationship. Official company verification uses USDOT1065394; the submitted MC can be inspected separately with an explicit unconfirmed-association label.

Ask compatibility was reviewed read-only against current `lib/network/ask-plan.ts` (blob fb10c620dd7748fef3812ac6bbf79a2d6cb63a4f). Its legacy consumer reads `results` and the existing failReason but ignores new integrity metadata. Therefore unconfirmed candidates are excluded from legacy trusted `results`, retained additively in `sourceConflictCandidates`, and accompanied by the existing fail_closed/failReason contract. Other valid identities matching that MC remain in trusted results. Native UI shows the unconfirmed candidate with its source disclosure. No Ask code was changed; this does not certify parent Ask routing/completion generally.

## Review/removal and rollback

Do not remove containment merely because a scheduled refresh changes a value, fails, or becomes old. Re-review the exact new source record, approved canonical correction, clocks and public projections. A rollback must retain the discrepancy guard and safe USDOT-only public association; reverting to the baseline unqualified MC assertion is unsafe. Revert unrelated implementation regressions through a reviewed patch while retaining containment. No database rollback is needed for this release.
