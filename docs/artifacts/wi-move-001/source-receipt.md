# WI-MOVE-001 source receipt

Retrieved 2026-09-29. This release adds Wisconsin authority context and contact-based verification. It does not ingest a state provider roster.

- [WisDOT motor carrier operating authority](https://www.wisconsindot.gov/Pages/dmv/com-drv-vehs/mtr-car-trkr/mc-authority.aspx): intrastate for-hire property certificate uses LC plus a number; interstate authority is federal. The page provides Motor Carrier Services contact details but no statewide carrier roster.
- [WisDOT MV2843 application](https://wisconsindot.gov/Documents/formdocs/mv2843.pdf), form revision 6/2021: Wisconsin Intrastate Local Cartage application asks for commodities, legal name, USDOT and LC number. This is an application form, not a provider record or household-goods census.
- [WisDOT insurance](https://wisconsindot.gov/Pages/dmv/com-drv-vehs/mtr-car-trkr/mc-ins.aspx): intrastate for-hire insurance filing, insurer-filed Form E and authority/insurance name match. No public provider-level insurance statuses acquired.
- [Wisconsin DATCP complaints](https://datcp.wi.gov/Pages/Programs_Services/Complaints.aspx): general consumer complaint intake. No mover-specific public provider complaint rows or outcomes acquired.
- [FMCSA moving fraud complaints](https://www.fmcsa.dot.gov/protect-your-move/file-a-complaint): separate federal mover complaint path. Not Wisconsin LC evidence.

LC_AUTHORITY_VERIFICATION = KNOWN (contact WisDOT Motor Carrier Services). LC_ROSTER = NOT_ACQUIRED. HHG_SPECIFIC_ROSTER = NOT_ACQUIRED. LC_ROWS = null. DISTINCT_LC = null. HHG_ROWS = null. Exact USDOT/MC bridges and unmatched state rows = NOT_ACQUIRED because no state rows were captured. No LC number enumeration or name-only linking occurred.

2022–2026 LC/provider enforcement corpus = NOT_ACQUIRED; capability PARTIAL. New canonical organizations = 0, graph writes = 0, claim eligibility changes = 0. No universal Wisconsin as-of date or combined state/federal count.
