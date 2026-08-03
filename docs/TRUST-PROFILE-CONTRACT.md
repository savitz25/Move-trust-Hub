# Trust Profile contract (Step 5)

Shared **shell** for entity profiles across Move Trust Hub, Insurance Trust Hub, and Lender Trust Hub. Verification **engines stay vertical**. Ask Trust Hub does **not** host directories or render these profiles.

**Source of truth:** `lib/network/trust-profile.ts`  
**Parent methodology:** [The Ask Trust Hub Standard](https://www.asktrusthub.com/methodology)

---

## Principles

1. **Shell is shared; engines stay vertical** — same layout vocabulary; FMCSA / DOI / NMLS logic remains hub-specific.
2. **Honest empty states** — if a source isn’t verified, hide it or label limitations. Do not invent BBB, Google, NMLS, or FMCSA fields.
3. **No fake precision** — scores and metrics only when the hub actually computes them; estimates (e.g. avg close days) must be labeled and prefer **not** in the core shell score block.
4. **Ask does not host directories** — Ask may link out; listings stay on specialist hubs.
5. **Incremental** — types + UI shell + adapters on existing data. Cross-hub single global entity IDs are out of scope for this step.

---

## Core type: `TrustProfileShell`

| Field | Meaning | Must never invent |
|-------|---------|-------------------|
| `hub` | `move` \| `insurance` \| `lender` \| `ask` | — |
| `entityId` | Hub-local stable id (slug, UUID, USDOT, NMLS, etc.) | Fabricated IDs for ranking |
| `displayName` | Public name (DBA preferred when policy says so) | Marketing aliases without source |
| `legalName` | Legal entity if different | — |
| `profileUrl` | Canonical HTTPS profile URL on the hub | Wrong apex / residual `/lender` paths |
| `serviceScope` | interstate / intrastate / unknown (Move) | Claiming interstate without authority |
| `verification.primaryLabel` | Short verified statement | “FMCSA recommends” language |
| `verification.isVerified` | Hub-defined boolean | True without primary source match |
| `verification.sources[]` | Source chips | Status `verified` without data; `not_applicable` as scary “unverified” noise |
| `reputation.score` | Optional composite | Score when hub has none; unpaid “boost” |
| `reputation.summary` | One-line limitation | Omitting known estimate labels |
| `contact.*` | Phone, email, website, address | Fake phone/email for SEO |
| `updatedAt` | Last material refresh (ISO) | Fake freshness timestamps |
| `methodologyUrl` | Hub vertical methodology | — |
| `standardUrl` | Ask Standard URL | — |
| `extensions.move\|insurance\|lender` | Vertical bags only | Mixing NMLS into Move core |

### `TrustSourceRef`

| Field | Notes |
|-------|--------|
| `id` | Stable key: `fmcsa`, `nmls`, `doi`, `google`, `bbb`, … |
| `status` | `verified` \| `unverified` \| `not_applicable` \| `error` \| `stale` |
| `url` | Prefer regulator / official public page |
| `lastChecked` | ISO when known |
| `note` | Short limitation |

**UI rule:** show chips for `verified`, `stale`, and `error`. Do **not** render a wall of `not_applicable` / missing sources (same spirit as BBB-on-Move).

---

## Vertical extensions

### Move (`extensions.move`)
- `usdot`, `mcNumber`, `authorityStatus`, `fmcsaSafetyRating`, `outOfService`
- Mapped from existing company / FMCSA fields in `toMoveTrustProfile`

### Insurance (`extensions.insurance`)
- `licenseNumber`, `npn`, `state`, `city`, `linesOfAuthority`
- Mapped from provider records; license lookup URL via DOI helpers

### Lender (`extensions.lender`)
- `nmlsId`, `companyType`, `state`, `county`
- `avgCloseDaysEstimate` / `onTimeCloseRateEstimate` — **editorial/seed only**, never as NMLS/CFPB official fields; not required in shell reputation block

---

## Adapters

| Hub | Adapter | Input |
|-----|---------|--------|
| Move | `lib/network/adapters/to-move-trust-profile.ts` | `Company` |
| Insurance | `lib/network/adapters/to-insurance-trust-profile.ts` | `Provider` |
| Lender | `lib/network/adapters/to-lender-trust-profile.ts` | `EnrichedLender` / `Lender` |

Adapters must:
- Prefer primary regulator status over marketing claims
- Omit reputation when score is missing or zero-placeholder if product treats 0 as empty
- Set `methodologyUrl` / `standardUrl` from `HUB_METHODOLOGY_URLS` and `ASK_TRUST_HUB`

---

## UI: `TrustProfileShell`

Presentational component: `components/network/trust-profile-shell.tsx`

**Block order**
1. Identity (name, legal name, hub badge)
2. Verification strip (primary + source chips with optional outbound links)
3. Reputation (only if score present)
4. Contact card (omit empty fields)
5. Trust footer: research only · Ask network · Methodology · Ask Standard

Does **not** replace full vertical body content (reviews, maps, loan types, etc.).

---

## Out of scope (this step)

- Merging Move/Insurance/Lender databases into one warehouse
- Global cross-hub entity graph / single network UUID
- Recalculating all Trust Scores
- Ask-hosted provider listings
