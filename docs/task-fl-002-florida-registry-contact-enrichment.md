# Task FL-002 — Florida FDACS Registry & Contact Enrichment

**Status:** Internal enrichment only. **No public publication.**

**Google Places / Maps / Geocoding API requests: 0.**

**Canonical company contacts overwritten: NO.**  
**Trust Score changed: NO.**  
**Companies / indexable freeze: 4,941 / 4,905 unchanged.**

---

## 1. Executive summary

FL-001’s official snapshots were fully normalized into durable Florida regulatory identities (`FL-FDACS-IM-*` / `FL-FDACS-MB-*`). Fail-closed matching ran against the entire MoveTrustHub company table. FDACS phones, emails, and addresses were stored as `provider_contact_observation` rows and **not** copied onto `companies.*`.

| Result | Count |
|--------|------:|
| Combined raw snapshot rows | 1,359 |
| Normalized unique registrations | **1,332** |
| IM / MB | 1,303 / 29 |
| Dual-license entity groups | 3 |
| Estimated unique businesses | **1,328** |
| VERIFIED links to existing providers | **88 (6.6%)** |
| REVIEW_REQUIRED | 170 (12.8%) |
| NOT_FOUND (state-only / unmatched) | 960 (72.1%) |
| NOT_APPLICABLE (expired historical) | 114 (8.6%) |
| Active state-only mover candidates | **1,001** |
| Active state-only brokers | 25 |
| Contact observations written | **3,875** |

---

## 2. Git / worktree

- Worktree: `C:\Users\makei\move-trust-hub-fl001`
- FL-001 PR #30 rebased onto current main, Vercel green, **merged** as `1f6799ff`
- FL-002 branch: `task-fl-002-florida-registry-contact-enrichment`
- Main was current after 011C.1A (`0343db7b`) then FL-001 (`1f6799ff`)

---

## 3–5. FDACS source snapshots / raw / normalized

| Source | Count |
|--------|------:|
| Legacy IM XLS | 1,286 |
| Legacy MB XLS | 31 |
| New portal movers CSV | 45 |
| New portal brokers CSV | 2 |
| Combined adapter raw | **1,359** |
| Duplicate regulatory IDs dropped | 11 |
| Malformed / unparseable IDs | 16 |
| Normalized unique registrations | **1,332** |

Discrepancy: new portal remains a partial 2026 migration set (45+2). Legacy lookup is the complete registered universe. Combined adapter prefers legacy, then fills gaps from CSV.

No missing registration numbers after drop of 16 malformed.

---

## 6–8. Unique businesses / IM-MB / status

Registrations ≠ companies.

- Unique businesses (legal-name + phone cluster, else legal-name + id): **1,328**
- Multi-registration groups: 4
- Apparent IM+MB dual entities: **3**
- IM and MB authorities kept as **separate** regulatory rows

Status (normalized, raw preserved in staging):

| Status | Count |
|--------|------:|
| active / registered | 1,114 |
| expired | 114 |
| unknown | 104 |
| revoked | 0 in this unique set |

Unknown is **not** treated as active.

---

## 9–10. Complete matching / evidence

Matcher: `matchStateRegistryIdentity` (fail-closed) plus prior exact FDACS authority attachment from 011B.

| Link status | Count | % |
|-------------|------:|--:|
| VERIFIED | 88 | 6.6% |
| REVIEW_REQUIRED | 170 | 12.8% |
| NOT_FOUND | 960 | 72.1% |
| NOT_APPLICABLE | 114 | 8.6% |

Evidence methods:

| Method | Count |
|--------|------:|
| `exact_prior_state_authority` | 88 |
| `none` | 1,244 |

The 88 VERIFIED rows are the durable 011B exact-identity cohort (legal+phone / DBA+corroboration originally; re-attached by exact IM/MB number). Name-only never VERIFIED. Franchise brands remain REVIEW_REQUIRED.

---

## 11. Existing provider enrichment

Florida HQ baseline remains **399** public companies.

- Existing providers with VERIFIED FDACS link: **88**
- New email observations (canonical MTH email still 0 → no overwrite): 1,243 source emails stored as observations
- Phone observations: 1,300
- Address observations: 1,332
- Phone vs canonical: **88 agree, 0 conflict** (matched set)
- Email vs canonical: 0 agree / 0 conflict (canonical emails empty)
- Address vs canonical: 0 agree / 1 conflict

Net enrichment potential: **1,243 FDACS emails** and **1,331 complete streets** available for a later controlled promotion task. Canonical coverage did **not** change.

---

## 12. State-only candidate population

| Class | Count |
|-------|------:|
| ACTIVE_STATE_ONLY_CANDIDATE movers (IM) | **1,001** |
| ACTIVE_STATE_ONLY_CANDIDATE brokers (MB) | **25** |
| EXPIRED_STATE_RECORD | 114 |
| REVOKED_STATE_RECORD | 0 |
| UNKNOWN_STATE_RECORD | 104 |
| MATCHED_EXISTING | 88 |

Unmatched records were **not** discarded.

---

## 13–16. Email / phone / address quality / conflicts

**Email** (n=1,332 registrations): raw 1,243, unique normalized 1,209, usable 1,240, named 897, role 137, generic 206, malformed 3, empty 89, shared across registrations 23.

**Phone:** total 1,300, unique 1,279, malformed 0, shared 16, canonical agree 88, conflict 0.

**Address:** total 1,332, complete street 1,331, PO Box 6, shared 28, canonical agree 0, conflict 1.

Review queue: 170 REVIEW_REQUIRED (franchise / name without corroboration / collisions) plus 1 address conflict.

---

## 17. Florida coverage potential (internal, unpublished)

| Question | Answer |
|----------|--------|
| Current MTH Florida companies | 399 |
| Existing companies with VERIFIED FDACS linkage | **88** (can later show Florida Intrastate Authority: VERIFIED) |
| Active state-only FDACS IM candidates | **1,001** |
| FDACS brokers (normalized MB) | 29 (25 unmatched active) |
| Estimated unique FL businesses in FDACS snapshot | **1,328** |
| Future unique Florida universe if state-only IMs are later published after QA | ~399 existing + ~1,001 new ≲ **1,400** before dedup against the 88 already linked |

Do not publish in FL-002.

---

## 18. Deferred PRA datasets

Unchanged from FL-001 draft `docs/regulatory/florida/public-records-request-draft.md`:

- Broker ↔ mover contracted lists (s. 507.03(11); CSV column still empty)
- Enforcement / final orders
- Complaint dispositions (no consumer PII)
- Owner/officer/registered agent/charter
- Insurance/bond lapse history
- Mailing-address history if not in lookup export

Sunbiz is **not** used as Chapter 507 authority.

---

## 19. Files changed

- `lib/state-hhg/fl/regulatory-id.ts`
- `lib/state-hhg/fl/fl-002-enrichment.test.ts`
- `lib/state-hhg/contact-quality.ts`
- `lib/state-hhg/identity.ts` (legal+email match)
- `scripts/ingest-task-fl-002.ts`
- `supabase/migrations/20260821160000_task_fl_002_contact_observations.sql`
- `docs/task-fl-002-rollback.sql`
- `docs/task-fl-002-ingest.json`
- `docs/task-fl-002-match-rows.json`
- `docs/task-fl-002-florida-registry-contact-enrichment.md`
- `package.json`

---

## 20. Tests

```
npm run test:state-hhg
npx tsx scripts/ingest-task-fl-002.ts --dry-run
npx tsx scripts/ingest-task-fl-002.ts
```

`test:state-hhg`: 48/48 pass (8 new FL-002 tests). Freeze: companies 4941, indexable 4905.

---

## 21. Recommended FL-003

**FL-003 — Florida state-only candidate QA and local-profile publication design (still no live publish unless explicitly approved).**

QA the 1,001 active IM state-only candidates, design public profile rules for FDACS-only movers, and a controlled observation→canonical contact promotion for the 88 VERIFIED existing providers. Do not start automatically.
