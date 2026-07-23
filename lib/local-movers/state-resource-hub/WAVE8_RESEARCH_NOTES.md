# Wave 8 State Resource Hubs — Research Notes

Quality gate: region membership validated (0 orphans / 0 duplicates) for all packs.
Leakage check: `scripts/check-state-hub-no-leakage.mjs` passed.
SSR body: shared `StateResourceHub` Server Component (chrome via `stateName` prop).
Generator: `scripts/generate-wave8-state-hubs.mjs` + `scripts/tmp-wave8-regions.json`.

Region display (TEMPLATE_RULES): HI has 5 counties → `flat_county_list` at runtime; island regions retained for content. AK/WV use natural multi-region packs without empty filler modules.

## Nebraska
- **Regulator:** Nebraska Public Service Commission — Household Goods Mover License (annual, statewide service listings)
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (CO/TX/AZ + short IA/KS hops)
- **Regions:** Omaha Metro, Lincoln & Southeast, Central NE, Western NE, Panhandle (93 counties)
- **Sources:** psc.nebraska.gov household-goods-movers-licensees; transportation; FMCSA SAFER

## Idaho
- **Regulator:** Idaho Transportation Department registration expectations (not a CA-style dedicated HHG consumer board)
- **Mode:** `partial_state_regulation`
- **Migration:** `inbound_dominant` (strong CA/WA/OR inbound into Treasure Valley / North Idaho)
- **Regions:** Treasure Valley, Eastern ID, Magic Valley, North Idaho, Central Mountain (44 counties)
- **Sources:** itd.idaho.gov; FMCSA SAFER; Protect Your Move

## West Virginia
- **Regulator:** Public Service Commission of West Virginia Motor Carrier Section — Certificate of Convenience and Necessity for household goods common carriers
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (OH/VA/NC/FL + short border hops)
- **Regions:** Northern Panhandle, Eastern Panhandle, North-Central, Kanawha/Mid-Ohio Valley, Southern WV (55 counties)
- **Sources:** psc.state.wv.us; FMCSA SAFER

## Hawaii
- **Regulator:** Hawaii Public Utilities Commission — Motor Carrier CPCN for household goods classification (certification, ratemaking, business regulation)
- **Mode:** `strong_state_regulator`
- **Migration:** `inbound_dominant` (strong mainland CA/WA inbound; dense inter-island traffic)
- **Regions:** Oahu, Maui County, Hawaii Island, Kauai (5 counties → runtime flat_county_list)
- **Sources:** puc.hawaii.gov/motor_carriers; FMCSA SAFER
- **Note:** Inter-island moves are intrastate; mainland moves are interstate

## Alaska
- **Regulator:** No dedicated state HHG permit; Alaska business license + insurance/contracts; FMCSA for Outside/interstate; AG consumer protection for unfair practices
- **Mode:** `limited_or_none`
- **Migration:** `inbound_dominant` (strong Outside inbound via WA corridor)
- **Regions:** Anchorage & Southcentral, Interior, Southeast, Southwest & Bush (29 boroughs/census areas)
- **Sources:** FMCSA SAFER; Protect Your Move; commerce.alaska.gov business licensing
- **Note:** Deliberately not inventing an Alaska HHG board — ferry/air logistics emphasized in challenges/costs
