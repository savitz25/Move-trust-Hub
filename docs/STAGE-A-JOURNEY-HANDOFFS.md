# Stage A′ — Move destination journey CTAs

## What shipped
Production destination surfaces emit Stage A′ crawlable handoffs to Lender + Insurance.

### Templates
| Surface | Component |
|---------|-----------|
| City / market hubs (`/moving-to/...`) | `CityHubTemplate` → `ContinueTrustJourney` |
| State mover hubs (`/local-movers/{state}`) | `StateResourceHub` → `ContinueTrustJourney` |
| Legacy `NetworkHandoff` resolve | Journey-param absolute URLs |

### Contract emission
```
src=move
journey=relocate
state=FL
county=miami-dade   # when primaryCounties[0] maps cleanly
intent=buy|rent     # optional; UI toggle defaults to unknown
```

### Intent routing (client toggle)
- **I may buy** → Lender primary, Insurance secondary  
- **I plan to rent** → Insurance primary only  
- **Not sure yet** → Insurance primary, Lender secondary  

### Example live URLs (after deploy)
```
https://www.movetrusthub.com/moving-to/miami-fl
https://www.movetrusthub.com/moving-to/austin-tx
https://www.movetrusthub.com/local-movers/florida
```

Handoff examples:
```
https://www.lendertrusthub.com/local-lenders/florida/miami-dade?src=move&journey=relocate&state=FL&county=miami-dade&intent=buy
https://www.insurancetrusthub.com/destinations/florida?src=move&journey=relocate&state=FL&intent=rent
```

## Files
- `lib/network/journey-context.ts`
- `components/network/continue-trust-journey.tsx`
- `components/destinations/city-hub-template.tsx`
- `components/local-movers/state-hub/state-resource-hub.tsx`
- `lib/network/network-handoff.ts` (URL builders)

## Product rules
- No quote funnels / GET QUOTES in journey block  
- Absolute crawlable URLs (not auth handoff)  
- Soft-fail: missing county → state-level Lender/Insurance paths  
