# Wave 10 (Final) State Resource Hubs — Research Notes

Quality gate: region membership validated (0 orphans / 0 duplicates) for all packs.
Leakage check: `scripts/check-state-hub-no-leakage.mjs` passed.
SSR body: shared `StateResourceHub` Server Component (chrome via `stateName` prop).
Generator: `scripts/generate-wave10-state-hubs.mjs` + `scripts/tmp-wave10-regions.json`.

**This wave completes all 50 U.S. states** (California master + Waves 1–10).

Small states: RI (5) and DE (3) use compact natural groups; runtime `flat_county_list` under TEMPLATE_RULES (< ~8 counties). NH (10) and VT (14) use `regions_as_anchors`. No empty filler modules.

## New Hampshire
- **Regulator:** Household Goods Carrier authority under NH Department of Safety Bureau frameworks (RSA 359-T); written estimates on request; annual HHG vehicle registration with DMV; NHPC-style identifiers in consumer guidance
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/Carolinas + short MA/ME hops)
- **Regions:** Seacoast & South, Central NH, Lakes & North Country, Southwest (10 counties)
- **Sources:** nh.gov/dot; regulatory summaries of RSA 359-T rule updates; FMCSA SAFER

## Vermont
- **Regulator:** No dedicated local household-goods mover license in commonly cited consumer guidance; FMCSA for interstate
- **Mode:** `limited_or_none`
- **Migration:** `outbound_dominant` (FL/Carolinas + short NY/NH/MA hops)
- **Regions:** Northwest, Central, Southern, Northeast Kingdom (14 counties)
- **Sources:** FMCSA SAFER; Protect Your Move; industry/state summaries on no local HHG license
- **Note:** Honest limited_or_none — do not invent VT HHG permit numbers

## Rhode Island
- **Regulator:** Rhode Island Division of Public Utilities and Carriers (DPUC) — household goods certificate; fitness/willingness/ability standard; licensed mover lists; Bill of Lading requirement
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/Carolinas + constant short MA/CT hops)
- **Regions:** Providence Metro, South County & Newport (5 counties → flat_county_list)
- **Sources:** ripuc.ri.gov moving-information; Motor Carriers Division jurisdiction; FMCSA SAFER

## Delaware
- **Regulator:** No special state household-goods certificate for pure intrastate movers per commonly cited consumer guidance; business registration + insurance; FMCSA for interstate
- **Mode:** `limited_or_none`
- **Migration:** `outbound_dominant` (FL/Carolinas + constant short PA/MD/NJ hops)
- **Regions:** New Castle, Kent, Sussex (3 counties → one region per county; flat_county_list)
- **Sources:** FMCSA SAFER; Protect Your Move; industry/consumer summaries on no special DE HHG license
- **Note:** Honest limited_or_none — most DE hauls quickly become interstate

## Final coverage
| Wave | States | Cumulative |
|------|--------|------------|
| Master | CA | 1 |
| 1–9 | 45 | 46 |
| **10** | **NH, VT, RI, DE** | **50** |
