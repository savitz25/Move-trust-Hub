# Wave 6 State Resource Hubs — Research Notes

Quality gate: region membership validated (0 orphans / 0 duplicates) for all packs.
Leakage check: `scripts/check-state-hub-no-leakage.mjs` passed.
SSR body: shared `StateResourceHub` Server Component (chrome via `stateName` prop).
Generator: `scripts/generate-wave6-state-hubs.mjs` + `scripts/tmp-wave6-regions.json`.

## Oregon
- **Regulator:** Oregon Department of Transportation (ODOT) Commerce and Compliance Division — household goods certification for point-to-point in-state moves; approved tariffs; consumer bulletin requirement
- **Mode:** `strong_state_regulator`
- **Migration:** `inbound_dominant` (strong CA/WA inbound into Portland)
- **Regions:** Portland Metro, Willamette Valley, Oregon Coast, Southern OR, Central OR, Eastern OR (36 counties)
- **Sources:** oregon.gov/odot household-goods-moving; mover application process; FMCSA SAFER

## Oklahoma
- **Regulator:** Oklahoma Corporation Commission (OCC) — Intrastate Household Goods Certificate (required even for moves wholly within city limits); statewide certificate; renewals
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (TX/FL + short AR/KS hops)
- **Regions:** OKC Metro, Tulsa Metro, Southwest OK, Northwest/Panhandle, Eastern OK (77 counties)
- **Sources:** oklahoma.gov/occ household-goods-movers; FMCSA SAFER

## Connecticut
- **Regulator:** Connecticut Household Goods Carrier Certificate (CTDOT certificate frameworks / consumer DCP guidance)
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/Carolinas + short NY/MA/RI hops)
- **Regions:** Southwest CT, Central CT, Eastern CT, Northwest CT (8 counties) → regions_as_anchors tier by count, natural metro groups retained
- **Sources:** portal.ct.gov DCP movers-and-moving; CTDOT household goods movers with certificate; FMCSA SAFER

## Iowa
- **Regulator:** Iowa DOT Office of Motor Carrier Services — Intrastate Motor Carrier Permit for household goods; tariff filing required before permit issuance
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (FL/TX + short IL/NE/MN hops)
- **Regions:** Des Moines & Central, Eastern IA, Western IA, Northern IA, Southern IA (99 counties)
- **Sources:** iowadot.gov/motor-carriers; Intrastate for-hire authority guide; FMCSA SAFER

## Arkansas
- **Regulator:** Arkansas Department of Transportation (ARDOT) — Intrastate Operating Authority for household goods movers (permit/registration frameworks)
- **Mode:** `strong_state_regulator`
- **Migration:** `balanced` (NWA inbound growth + TX/FL outbound + border hops)
- **Regions:** Central AR, Northwest AR, Northeast AR, South AR, North-Central/Ozarks (75 counties)
- **Sources:** ardot.gov/permits; ARDOT intrastate authority; FMCSA SAFER
