# Wave 7 State Resource Hubs — Research Notes

Quality gate: region membership validated (0 orphans / 0 duplicates) for all packs.
Leakage check: `scripts/check-state-hub-no-leakage.mjs` passed.
SSR body: shared `StateResourceHub` Server Component (chrome via `stateName` prop).
Generator: `scripts/generate-wave7-state-hubs.mjs` + `scripts/tmp-wave7-regions.json`.

## Utah
- **Regulator:** No dedicated state household-goods carrier license for pure intrastate moves; commercial vehicle registration, insurance, and consumer-protection expectations still apply; FMCSA for interstate
- **Mode:** `limited_or_none`
- **Migration:** `inbound_dominant` (strong CA/TX/AZ inbound into Wasatch Front)
- **Regions:** Wasatch Front, Northern UT, Central UT, Southern UT, Eastern UT (29 counties)
- **Sources:** FMCSA SAFER; FMCSA Protect Your Move; UDOT motor carriers; industry notes on Utah’s license-light HHG environment
- **Note:** Deliberately not inventing a Utah HHG board — template allows limited_or_none

## Kansas
- **Regulator:** Kansas Corporation Commission (KCC) Transportation Division — Certificate of Public Convenience and Necessity for household goods; household goods tariff frameworks
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (TX/MO/CO + short border hops)
- **Regions:** KC Metro KS, Wichita & South Central, Topeka/Northeast, Western KS, Northwest KS (105 counties)
- **Sources:** kcc.ks.gov/transportation; household-goods-tariffs; FMCSA SAFER

## Mississippi
- **Regulator:** Mississippi Department of Transportation (MDOT) — household goods and passenger carriers application / Certificate of Public Convenience and Necessity pathways; insurance documentation required
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (TX/FL + short TN/AL/LA hops)
- **Regions:** Jackson Metro, Gulf Coast, Pine Belt & South, Delta, North MS (82 counties)
- **Sources:** mdot.ms.gov HHG guidelines PDF; HHG application PDF; FMCSA SAFER

## Nevada
- **Regulator:** Nevada Transportation Authority (NTA) — Certificate of Public Convenience and Necessity (CPCN) for intrastate household goods movers under NRS/NAC 706; active certificates database; enforcement against unlicensed movers
- **Mode:** `strong_state_regulator`
- **Migration:** `inbound_dominant` (strong CA inbound into Las Vegas/Reno)
- **Regions:** Las Vegas & Southern NV, Reno/Carson & Northern NV, Rural & Eastern NV (17 counties)
- **Sources:** nta.nv.gov; Tariffs-Certificates; FMCSA SAFER

## New Mexico
- **Regulator:** Certificate of Public Convenience and Necessity for intrastate household goods motor carriers (historically PRC Transportation; applications processing coordinating with NMDOT transition)
- **Mode:** `strong_state_regulator`
- **Migration:** `balanced` (TX corridor both ways + CA/AZ/CO)
- **Regions:** Albuquerque Metro, Santa Fe & North, Southern NM, Southeast NM, Northwest NM (33 counties)
- **Sources:** NMDOT PRC transportation transition post; MVD CPCN guidance; FMCSA SAFER
- **Note:** Pack disclaimer flags administrative channel transitions; consumers should verify current authority channel
