# Wave 9 State Resource Hubs — Research Notes

Quality gate: region membership validated (0 orphans / 0 duplicates) for all packs.
Leakage check: `scripts/check-state-hub-no-leakage.mjs` passed.
SSR body: shared `StateResourceHub` Server Component (chrome via `stateName` prop).
Generator: `scripts/generate-wave9-state-hubs.mjs` + `scripts/tmp-wave9-regions.json`.

Lower-population states: compact natural regions; honest limited/partial modes where no dedicated HHG consumer board exists. No empty filler modules.

## Montana
- **Regulator:** Lighter / post-2023 HHG framework — no California-style dedicated consumer HHG permit directory for most local jobs; MDT MCS for commercial vehicle safety; FMCSA for interstate
- **Mode:** `limited_or_none`
- **Migration:** `outbound_dominant` (WA/CO/AZ/TX + internal west–east hauls)
- **Regions:** Western MT, Southwestern MT, North-Central MT, Eastern MT (56 counties)
- **Sources:** FMCSA SAFER; Protect Your Move; mdt.mt.gov/business/mcs; policy notes on 2023 motor-carrier changes
- **Note:** Deliberately not inventing a MT HHG board

## Wyoming
- **Regulator:** Wyoming Department of Transportation (WYDOT) Motor Carrier Services — Intrastate Operating Authority / Letter of Authority for for-hire carriers including household goods; insurance filings
- **Mode:** `partial_state_regulation` (operating authority, not a dedicated HHG consumer commission)
- **Migration:** `outbound_dominant` (CO/TX/AZ + short border hops)
- **Regions:** Southeast, Central, Northeast, Northwest (23 counties)
- **Sources:** dot.state.wy.us trucking_commercial_vehicles; FMCSA SAFER

## North Dakota
- **Regulator:** North Dakota Department of Transportation Motor Vehicle — Household Goods Carrier Permit (SFN 10539; statutory application fee frameworks under ND Century Code ch. 39-31)
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (MN short hops + Sun Belt long hauls)
- **Regions:** Fargo & Red River, Bismarck & Central/SW, Minot & Northwest, Northeast ND (53 counties)
- **Sources:** dot.nd.gov/forms/sfn10539.pdf; FMCSA SAFER

## South Dakota
- **Regulator:** No dedicated household-goods consumer permit board found comparable to ND/NE; FMCSA for interstate; insurance + written estimates for local
- **Mode:** `limited_or_none`
- **Migration:** `outbound_dominant` (MN/IA short hops + Sun Belt)
- **Regions:** Sioux Falls & East River, Pierre & Central, Rapid City & Black Hills (66 counties)
- **Sources:** FMCSA SAFER; Protect Your Move
- **Note:** Honest limited_or_none — do not invent SD HHG license numbers

## Maine
- **Regulator:** No separate intrastate household goods mover license per commonly cited BMV/industry guidance; FMCSA for interstate
- **Mode:** `limited_or_none`
- **Migration:** `outbound_dominant` (FL/Carolinas snowbird + short NH/MA hops)
- **Regions:** Southern ME, Midcoast & Central, Downeast & Northern (16 counties) → regions_as_anchors tier by count
- **Sources:** FMCSA SAFER; Protect Your Move; industry/BMV summaries on no separate HHG license
