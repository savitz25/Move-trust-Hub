# Wave 4 State Resource Hubs — Research Notes

Quality gate: region membership validated (0 orphans / 0 duplicates) for all packs.
Leakage check: `scripts/check-state-hub-no-leakage.mjs` passed.
SSR body: shared `StateResourceHub` Server Component (chrome via `stateName` prop).
Generator: `scripts/generate-wave4-state-hubs.mjs` + `scripts/tmp-wave4-regions.json`.

## Massachusetts
- **Regulator:** Massachusetts Department of Public Utilities (DPU) — household goods operating certificate (Transportation Oversight Division)
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/Carolinas + short NH/ME/NY hops; college-driven local churn)
- **Regions:** Greater Boston, Southeast & Cape Cod, Central MA, Western MA (14 counties)
- **Sources:** mass.gov moving-within-massachusetts; DPU-regulated movers info; apply-to-be household goods mover; FMCSA SAFER

## Maryland
- **Regulator:** Maryland Department of Labor — Division of Occupational and Professional Licensing, Household Goods Movers Registration (not MD PSC passenger Transportation Division)
- **Mode:** `strong_state_regulator`
- **Migration:** `balanced` (DC-metro churn + outbound FL/Carolinas + short VA/PA hops)
- **Regions:** Baltimore & Central, DC Suburbs & Southern MD, Western MD, Eastern Shore (23 unique county slugs)
- **Sources:** labor.maryland.gov/license/hgm; hhmreginfo; FMCSA SAFER
- **Note:** PSC Transportation covers passenger-for-hire; HHG registration is Labor/OPL under state HHG mover law

## Indiana
- **Regulator:** Indiana Department of Revenue Motor Carrier Services — Intrastate Operating Authority for passenger & household goods
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/TX + short IL/OH/KY/MI hops)
- **Regions:** Indianapolis & Central, Northwest, Northeast, West Central, East Central, Southwest & Southern (92 counties)
- **Sources:** in.gov/dor motor-carrier-services intrastate passenger and household good authority; MCS home; FMCSA SAFER

## Missouri
- **Regulator:** MoDOT Motor Carrier Services — household goods operating authority
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/TX + short IL/KS border hops; large STL–KC internal)
- **Regions:** St. Louis Metro, Kansas City Metro, Central MO, Southwest/Ozarks, Southeast MO, Northwest MO (115 counties)
- **Sources:** modot.org/HHGoods; modot.org/mcs; modot.org/MOPA; FMCSA SAFER

## South Carolina
- **Regulator:** Office of Regulatory Staff (ORS) / PSC framework — Class E Certificate of Public Convenience & Necessity for household goods
- **Mode:** `strong_state_regulator`
- **Migration:** `inbound_dominant` (strong Northeast inbound into Charleston/Upstate/Grand Strand)
- **Regions:** Upstate, Midlands, Lowcountry, Pee Dee & Grand Strand (46 counties)
- **Sources:** ors.sc.gov Class E; transportation FAQs; transportation hub; FMCSA SAFER
