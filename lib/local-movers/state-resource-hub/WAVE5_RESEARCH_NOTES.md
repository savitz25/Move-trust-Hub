# Wave 5 State Resource Hubs — Research Notes

Quality gate: region membership validated (0 orphans / 0 duplicates) for all packs.
Leakage check: `scripts/check-state-hub-no-leakage.mjs` passed.
SSR body: shared `StateResourceHub` Server Component (chrome via `stateName` prop).
Generator: `scripts/generate-wave5-state-hubs.mjs` + `scripts/tmp-wave5-regions.json`.

## Minnesota
- **Regulator:** Minnesota Department of Transportation (MnDOT) Office of Freight and Commercial Vehicle Operations — Household Goods Mover Permit (Minn. Stat. §221.121 framework)
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/AZ/TX + short WI/IL hops)
- **Regions:** Twin Cities Metro, Southeast MN, Southwest MN, Central MN, Northwest MN, Northeast / North Shore (87 counties)
- **Sources:** dot.state.mn.us/cvo/household-goods.html; mn.gov eLicense HHG permit; FMCSA SAFER

## Wisconsin
- **Regulator:** No dedicated state household-goods permit regime comparable to MN/IL; consumer protection relies on insurance, contracts, municipal rules, and FMCSA for interstate
- **Mode:** `limited_or_none`
- **Migration:** `outbound_dominant` (FL/AZ + short IL/MN hops)
- **Regions:** Milwaukee & SE WI, Madison & South Central, Fox Valley & Northeast, Northwoods & Western WI (72 counties)
- **Sources:** FMCSA SAFER; FMCSA Protect Your Move; municipal access rules guidance
- **Note:** Deliberately not inventing a WI HHG regulator — template allows limited_or_none

## Alabama
- **Regulator:** Alabama Public Service Commission (APSC) — household goods motor carrier certificate/permit (Form 14H), cargo insurance, approved tariffs, annual reports
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/TX/GA/TN)
- **Regions:** Birmingham & Central, Huntsville & North, Montgomery & River, Mobile/Gulf/Southeast, Tuscaloosa & West (67 counties)
- **Sources:** psc.alabama.gov motor-carrier-applications-forms; motor-carrier-section; FMCSA SAFER

## Louisiana
- **Regulator:** Louisiana Public Service Commission (LPSC) — common carrier certificate for household goods; permanent establishment rules; certificate numbers on estimates; written estimate or waiver requirement
- **Mode:** `strong_state_regulator`
- **Migration:** `balanced` (strong TX corridor both ways + FL/MS)
- **Regions:** New Orleans Metro, Baton Rouge & Capital, Acadiana & Southwest, Cenla, North Louisiana (64 parishes)
- **Sources:** lpsc.louisiana.gov Carrier_HGM; Carrier_Regs; FMCSA SAFER

## Kentucky
- **Regulator:** Kentucky Transportation Cabinet, Department of Vehicle Regulation, Division of Motor Carriers — household goods certificate (DMT/DVR license number)
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/TN + short OH/IN hops)
- **Regions:** Louisville Metro, Northern KY, Lexington & Bluegrass, Western KY, Eastern KY (120 counties)
- **Sources:** drive.ky.gov Motor-Carriers Household-Goods; transportation.ky.gov; FMCSA SAFER
