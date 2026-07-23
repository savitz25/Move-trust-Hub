# Wave 3 State Resource Hubs — Research Notes

Quality gate: region membership validated (0 orphans / 0 duplicates) for all packs.
Leakage check: `scripts/check-state-hub-no-leakage.mjs` passed.
SSR body: shared `StateResourceHub` Server Component (chrome via `stateName` prop).
Generator: `scripts/generate-wave3-state-hubs.mjs` + `scripts/tmp-wave3-regions.json`.

## Colorado
- **Regulator:** Colorado Public Utilities Commission (PUC) household goods (HHG) permit — Title 40, Article 10.1, C.R.S.
- **Mode:** `strong_state_regulator`
- **Migration:** `inbound_dominant` (strong CA/TX/FL/IL inbound into Front Range)
- **Regions:** Denver Metro, Northern Front Range, Southern Front Range / Pikes Peak, Mountain & High Country, Western Slope, Southwest & San Luis Valley, Eastern Plains (64 counties)
- **Sources:** puc.colorado.gov/movers; household-goods-movers-consumer-info; DORA PUC_Permit.Search_Form; FMCSA SAFER

## Virginia
- **Regulator:** Virginia DMV Motor Carrier Services — Household Goods Carrier authority; Code of Virginia Title 46.2 Chapter 21 Article 4 (distance-sensitive; commonly discussed ~31 road miles)
- **Mode:** `partial_state_regulation` (not a single full-scope HHG regime for every local haul)
- **Migration:** `balanced` (NoVA–DC churn + outbound to Carolinas/FL + military PCS)
- **Regions:** Northern Virginia, Richmond & Central, Hampton Roads, Southwest VA, Shenandoah Valley, Eastern Shore, Northern Neck & Middle Peninsula (129 unique locality slugs)
- **Sources:** dmv.virginia.gov household goods carrier; law.lis.virginia.gov Article 4; FMCSA SAFER
- **Note:** Curated geography has 5 duplicate slug pairs (bedford, fairfax, franklin, richmond, roanoke) from county/city naming; unique slugs assigned once

## Michigan
- **Regulator:** Michigan State Police Commercial Vehicle Enforcement Division (MSP CVED) household goods authority; consumer tips + mspcapsearch carrier search
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/Sun Belt + short OH/IN/IL hops)
- **Regions:** Metro Detroit, West Michigan, Mid-Michigan, Thumb & Saginaw Bay, Southwest MI, Northern Lower Peninsula, Upper Peninsula (83 counties)
- **Sources:** michigan.gov/msp CVED key tips; mspcapsearch.state.mi.us; FMCSA SAFER

## New Jersey
- **Regulator:** New Jersey Division of Consumer Affairs — Public Movers and Warehousemen license
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/Carolinas + constant short NY/PA interstate hops)
- **Regions:** North Jersey, Central Jersey, South Jersey (21 counties) → full_regions justified by distinct sub-markets
- **Sources:** njconsumeraffairs.gov/pmw; newjersey.mylicense.com/verification; rgbportal.dca.njoag.gov; FMCSA SAFER

## Tennessee
- **Regulator:** Tennessee Department of Revenue Motor Carrier — Intrastate Authority for for-hire carriers (household goods under for-hire property framework; not a CA-style dedicated HHG consumer board)
- **Mode:** `partial_state_regulation`
- **Migration:** `inbound_dominant` (strong CA/IL/NY inbound into Nashville metro)
- **Regions:** Nashville & Middle TN, Memphis & West TN, Knoxville & East TN, Chattanooga & Southeast, Tri-Cities (95 counties)
- **Sources:** tn.gov/revenue motor-carrier/intrastate-authority; revenue.support.tn.gov MC-Intrastate-1; FMCSA SAFER
