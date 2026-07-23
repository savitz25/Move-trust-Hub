# Wave 1 State Resource Hubs — Research Notes

Quality gate: region membership validated (no orphans/duplicates) for all packs.
Section anchors use shared `#hub-*` IDs (SSR body in `StateResourceHub`).

## Texas
- **Regulator:** Texas Department of Motor Vehicles (TxDMV) household goods / motor carrier certificate; verify via Truck Stop.
- **Mode:** `strong_state_regulator`
- **Migration:** `inbound_dominant` (strong CA/NY/etc. inbound into DFW/Houston/Austin)
- **Regions:** DFW, Houston, Austin, San Antonio, RGV/South, El Paso, Permian/West, East Texas, Panhandle/Plains, Coastal Bend, Rest of Texas (254 counties, full_regions)
- **Sources:** txdmv.gov consumer protection; Truck Stop lookup; FMCSA SAFER

## Florida
- **Regulator:** Florida Department of Agriculture and Consumer Services (FDACS), Chapter 507 registration for intrastate movers/brokers
- **Mode:** `strong_state_regulator`
- **Migration:** `inbound_dominant` (Northeast/Midwest snowbird + lifestyle inbound)
- **Regions:** South FL, Tampa Bay, Central/Orlando, NE/Jax, Southwest, Panhandle, North/Interior (67 counties)
- **Sources:** fdacs.gov Moving Companies / Moving Within Florida; business search; FMCSA

## New York
- **Regulator:** New York State Department of Transportation (NYSDOT) household goods authority; Summary of Information booklet / Order for Service guidance
- **Mode:** `strong_state_regulator`
- **Migration:** `outbound_dominant` (strong NYC metro outbound to FL/NJ/PA/South)
- **Regions:** NYC, Long Island, Hudson Valley, Capital Region, Western NY, Finger Lakes, Central NY, North Country, Southern Tier+ (62 counties)
- **Sources:** dot.ny.gov moving + registration/licensing; FMCSA

## Georgia
- **Regulator:** Georgia Department of Public Safety Motor Carrier Compliance (household goods certification / CPCN framework); AG consumer guidance
- **Mode:** `strong_state_regulator`
- **Migration:** `balanced` (Atlanta hub both directions; FL/Carolinas corridors)
- **Regions:** Metro Atlanta, North GA, Coastal, Middle, Augusta/East, SW/South, Rest (159 counties)
- **Sources:** gamccd.net Household Goods; consumer.georgia.gov; FMCSA

## Arizona
- **Regulator:** Limited / no universal statewide HHG mover permit like CA/TX; AZDPS HHG info + ACC business entity checks; FMCSA critical for interstate
- **Mode:** `limited_or_none` (explicitly does not invent a permit system)
- **Migration:** `inbound_dominant` (strong CA and snowbird inbound)
- **Regions:** Phoenix metro, Tucson/South, Northern AZ, West/Rural (15 counties → regions_as_anchors)
- **Sources:** azdps.gov HHG; ecorp.azcc.gov; FMCSA Protect Your Move / SAFER

## Template note
Shared section IDs renamed from `ca-*` to `hub-*` so all state packs share the locked UI anchors without forking `StateResourceHub`.
