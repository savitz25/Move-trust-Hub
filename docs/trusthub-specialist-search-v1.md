# Trust Hub Specialist Search V1 — Move implementation

Status: Move reference port. Contractor contract reviewed at `697052a4fd2d1ba2ced985c5373315fd16517ed8` on 2026-09-08.

## Shared network behavior

Move implements the Contractor reference interaction contract locally: a question-first search region, one bounded input and Research action, examples, domain-valid advanced filters, visible/removable interpretation, standard identity/result anatomy, structure-derived match reasons, evidence availability, result-level trace, explicit capability states, accessible touch/keyboard behavior, and privacy-safe normalized analytics. `/ask` remains `noindex,follow`.

Natural language interprets. Parameterized specialist execution establishes facts. Ordering resolves exact identifiers before company-name candidates and structured cohorts; it is never a quality, safety, price, or recommendation rank.

## Move domain adapter

The existing `lib/move-ask` interpreter/executor remains Move's specialist brain. It owns USDOT and MC parsing, carrier/broker/dual roles, source-native FMCSA authority, verified-only FMCSA/FDACS joins, definitions, compatible counts/comparisons, evidence limitations, and published company queries. `lib/specialist-search` defines only the portable contract, capability vocabulary, and analytics dimensions. There is no Contractor runtime dependency.

Deliberate Move extensions to the reference are definitions, source-grain counts, and compatible comparisons. They remain within the standard result/interpretation shell because they are valuable mover-specific capabilities.

## Capability contract

| Capability | State | Meaning |
|---|---|---|
| FMCSA identity/authority | KNOWN | Published federal records; current is not recommended |
| Florida FDACS IM | KNOWN | State registration grain; separate from interstate authority |
| Complaint observations | PARTIAL | Attributable observations only; missing is not zero |
| New Jersey PM/PW/PC roster | REQUEST_ONLY | No acquired complete statewide bulk universe; NOV rows are evidence only |
| California CAL-T roster | NOT_ACQUIRED | Citation grains are not mover population counts |
| Service territory | UNSUPPORTED | Headquarters and registration cannot prove where a mover serves |

USDOT is not MC. Carrier is not broker. Dual role is not quality. FMCSA interstate authority is not FDACS intrastate registration. Headquarters is not service territory. Citation, NOV, and complaint observations are not findings of wrongdoing or population counts. Missing authority is not inactive. Federal profiles and state registrations are never summed into a synthetic mover population.

## Current and standardized architecture

Before this port, homepage identity autocomplete and `/ask` were separate entry experiences; `/ask` already used `interpretMoveAskQuery → executeMoveAsk → source-backed result`. The homepage now submits directly to `/ask` through the same Specialist Search shell. The executor adds only bounded published company-name candidate search; exact identity still requires USDOT/MC evidence.

Advanced values are allowlisted server-side, query length is 180 characters, pages are bounded to 1–200, execution is explicit-submit only, queries use the existing Supabase builder, and public cards contain only published identity fields. Raw questions and exact identifiers are absent from analytics dimensions.

## Portability checklist

The next hub can copy the contract/anatomy and implement a local adapter for its own identifiers, ontology, regulator sources, filters, evidence families, geography, coverage, and profile fields. It must not import Move or Contractor runtime code or coerce missing datasets to zero.
