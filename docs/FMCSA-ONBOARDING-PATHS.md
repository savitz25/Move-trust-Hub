# FMCSA onboarding path rules

Classifier: `lib/fmcsa/authority-routing.ts` (`shouldForceIntrastateFromAuthority`).

Evaluate in this order:

1. **USDOT not ACTIVE** (Inactive, Out-of-Service, etc.)  
   Existing reject/pending behavior elsewhere. Do not force local from OA alone.

2. **Entity type is BROKER** (Broker / HHG Broker / Property Broker / broker-equivalent that includes `BROKER` but not `CARRIER`)  
   **AND USDOT Status is ACTIVE**  
   → **ALWAYS INTERSTATE** onboarding (main `/companies` directory).  
   → **Ignore** Operating Authority “NOT AUTHORIZED” / None for path selection.  
   → UI: do **not** show the “no interstate authority → county only” blocker.  
   → Profile/badge: **Broker** / active-broker language; do not claim authorized **carrier** authority when OA is not authorized.

3. **Entity type is CARRIER** (or not a pure broker)  
   **AND USDOT ACTIVE**  
   **AND** no active interstate common/contract/broker operating authority  
   → **ALWAYS LOCAL / INTRASTATE** (county pages only).

4. **ACTIVE + authorized interstate operating authority**  
   → INTERSTATE (unchanged).

## Test anchors

| Case | Path |
|------|------|
| USDOT 3583108 American Moving Solutions — BROKER + ACTIVE + OA Not Authorized | Interstate |
| Active carrier with common/contract OA | Interstate |
| Active carrier, not broker, OA Not Authorized | Local / county only |
| Inactive USDOT | Reject / pending (existing) |

## Related UI

- Verify DOT results: `components/verify-dot/dot-verifier-results.tsx`
- Suggest modal handoff: `components/suggestions/suggest-company-modal.tsx`
- Server submit / approve guards: `actions/suggest-company.ts`, `lib/suggestions/approve.ts`

Unit checks: `scripts/check-authority-routing.ts`.
