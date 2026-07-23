# Wave 2 State Resource Hubs — Research Notes

Quality gate: region membership validated (0 orphans / 0 duplicates) for all packs.
Leakage check: `scripts/check-state-hub-no-leakage.mjs` passed.
SSR body: shared `StateResourceHub` Server Component (chrome via `stateName` prop).

## Illinois
- **Regulator:** Illinois Commerce Commission (ICC) Household Goods license for for-hire intrastate HHG
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (strong Chicago outbound to FL/TX/SW + short IN/WI hops)
- **Regions:** Chicago metro, Northern IL, Central IL, Metro East, Southern IL, Rest (102 counties)
- **Sources:** illinois.gov HHG movers service; ICC motor carrier search; FMCSA SAFER

## Pennsylvania
- **Regulator:** Pennsylvania Public Utility Commission (PUC) household goods certificates / insurance / rate frameworks
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (Philly/Pittsburgh outbound to FL/Carolinas + short NJ/NY)
- **Regions:** SE PA, Lehigh Valley, Central PA, NE PA, Pittsburgh/SW, Erie/NW/Highlands, Rest (67)
- **Sources:** puc.pa.gov motor carrier / movers; FMCSA SAFER

## North Carolina
- **Regulator:** North Carolina Utilities Commission (NCUC) certificate (C-number) + Maximum Rate Tariff; consumer booklet required
- **Mode:** `strong_state_regulator`
- **Migration:** `inbound_dominant` (strong Northeast inbound into Charlotte/Triangle)
- **Regions:** Charlotte, Triangle, Triad, Western NC, Coastal/East, Rest (100)
- **Sources:** ncuc.gov moving guide / transportation; ncdoj.gov moving tips; FMCSA SAFER

## Washington
- **Regulator:** Washington Utilities and Transportation Commission (UTC) household goods permit (illegal without permit)
- **Mode:** `strong_state_regulator`
- **Migration:** `inbound_dominant` (strong CA inbound into Puget Sound)
- **Regions:** Puget Sound, SW WA, Central WA, Eastern WA, Olympic Peninsula (39) → full_regions
- **Sources:** utc.wa.gov MovingCompanies + choosing licensed mover; FMCSA SAFER

## Ohio
- **Regulator:** Public Utilities Commission of Ohio (PUCO) household goods registration / certificate; HHG list + consumer rights
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (Midwest outbound to FL/Carolinas + short IN/KY)
- **Regions:** NE (Cleveland), Central (Columbus), SW (Cincinnati), West (Dayton), NW (Toledo), SE/Appalachia, Rest (88)
- **Sources:** puco.ohio.gov movers / HHG list / know-your-rights; FMCSA SAFER
