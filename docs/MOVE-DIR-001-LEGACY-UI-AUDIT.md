# MOVE-DIR-001 legacy directory UI audit

## Scope and source-backed Auto Transport rule

The production directory previously treated `Auto Transport` as a curated value in `companies.services`. That field produced a small, incomplete cohort and the post-query filtering left the unfiltered denominator in the result header. MOVE-DIR-001 instead uses an exact USDOT join to the FMCSA Company Census File (`az4n-8mr2`) when either `CRGO_MOTOVEH` or `CRGO_DRIVETOW` is marked `X`. These are self-reported MCS-150 cargo classifications. They do not establish quality, specialization, geography, current availability, or a recommendation.

The dated snapshot contains 268 already-public Move identities with qualifying evidence. It creates no identities and changes no publication state.

## Read-only production census

The census was joined by exact normalized USDOT against the current public interstate cohort. Ten public directory rows have no usable USDOT and therefore cannot qualify through this rule.

| Measure | Count |
|---|---:|
| AT1 public Move identities with exact USDOT | 4,595 |
| AT2 source-native motor-vehicle evidence | 268 |
| AT3 Carrier | 223 |
| AT4 Broker | 28 |
| AT5 Carrier/Broker | 14 |
| AT6 Unknown role | 3 |
| AT7 current authority recorded | 268 |
| AT8 not-current authority | 0 |
| AT9 authority unknown | 0 |
| AT10 with source freshness | 268 |
| AT11 missing source freshness | 0 |
| AT12 qualifying and legacy tagged | 5 |
| AT13 qualifying but missing legacy tag | 263 |
| AT14 legacy tagged without qualifying current source evidence | 7 |

The official Census query matched 4,590 of the 4,595 exact public USDOT identifiers. Legacy-tag disagreement is treated as an evidence mismatch, not as permission to infer identity or activity from company names.

## Current controls

| Element | Classification | Current meaning / risk | Recommended disposition |
|---|---|---|---|
| Reputation Score sort | LEGACY_PROPRIETARY_SCORE | Internally composed score; conflicts with neutral evidence-first ordering when presented as the default measure of who is best. | MOVE-DIR-002: replace as default with neutral factual ordering and retain only with a transparent methodology, if justified. |
| Star ratings / minimum rating | THIRD_PARTY_FACT with legacy aggregation | Third-party review observations; source, grain, and freshness are not sufficiently clear in the dense directory UI. | MOVE-DIR-002: label each source and freshness; never use for Auto Transport membership or publication. |
| BBB rating filter | THIRD_PARTY_FACT | Useful only when tied to an observed BBB record and date. | Retain pending source/freshness labeling audit. |
| Show only verified listings | OUTDATED_PRODUCT_SEMANTIC | Current predicate is regulatory/authority readiness, not a quality verification. | MOVE-DIR-002: rename to the exact factual criterion or remove. |
| Directory Verified | MARKETING/CURATED / OUTDATED_PRODUCT_SEMANTIC | Internal `isVerified` presentation can imply endorsement or business quality. | MOVE-DIR-002: remove or replace with an exact source/identity label. |
| BBB Verified | THIRD_PARTY_FACT, mislabeled | When supported, the accurate external fact is BBB Accredited, not TrustHub verification. | Relabel to `BBB Accredited` with source and observation date. |
| `100 rep` | LEGACY_PROPRIETARY_SCORE | Abbreviated proprietary reputation score lacks adequate meaning in the result card. | MOVE-DIR-002: remove from primary results or provide transparent evidence methodology. |
| Max average price | LEGACY TAG / CURATED ESTIMATE | Provenance and comparability are unclear; it is not regulatory evidence. | MOVE-DIR-002: validate source/grain/freshness or remove. |

## Service taxonomy

| Current chip | Correct class | Notes |
|---|---|---|
| Full Service | LEGACY TAG | Curated service claim, not a federal role. |
| Carrier | ROLE | FMCSA operating role; not a service offering. |
| Broker | ROLE | Arranges transport and does not necessarily physically transport the vehicle. |
| Carrier/Broker | ROLE | Dual role; must remain distinct. |
| Local Mover | SOURCE-EVIDENCE CLASS | Derived from accepted authority/service-scope evidence; geography limitations must remain explicit. |
| Container / Portable | LEGACY TAG | Curated service classification. |
| Auto Transport | SOURCE-EVIDENCE CLASS | Exact FMCSA Motor Vehicles or Driveaway/Towaway cargo evidence under MOVE-DIR-001. |
| Storage | LEGACY TAG | Curated service classification. |

The future directory should separate regulatory roles, source-evidence classes, and business/curated services. MOVE-DIR-001 intentionally changes only Auto Transport to avoid reopening the accepted public-directory experience.

## SEO and publication

Filtered query URLs remain research controls on `/companies`; they do not create company profiles or sitemap inventory. The canonical directory URL remains `/companies`. The source snapshot is a read-only classification input and contains only USDOT identifiers and the minimum public evidence fields required for rendering.
