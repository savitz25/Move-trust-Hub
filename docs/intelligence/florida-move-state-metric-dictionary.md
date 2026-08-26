# Florida Move State Intelligence — metric dictionary

Payload version: `mth-fl-state-intel-v1`  
Route: `/florida`  
Coverage default: **Statewide Research**. No Florida county is Enhanced on this page.

Entity counted is named on every metric. Registrations are not companies. Headquarters is not service area. Complaint ≠ finding.

## READY (public)

| Key | Entity | Numerator | Limitation |
| --- | --- | --- | --- |
| `fl_fdacs_im_active_registrations` | registration | FL IM rows, status=active | Not all Florida movers; most are not public profiles |
| `fl_fdacs_mb_active_registrations` | registration | FL MB rows, status=active | Small population; no public broker chrome claim |
| `fl_fdacs_im_verified_links` | authority_link | IM rows VERIFIED | Link ≠ published profile |
| `fl_hq_publishable_profiles` | directory_profile | PUBLISHABLE companies with FL headquarters string | HQ ≠ operating authority |
| `fl_contact_observations` | contact_observation | FDACS phone/email/address observations | Not a complete phone book; secondaries not overwritten |

## INTERNAL_ONLY

Unresolved FDACS holds, ingested-but-unpublished companies, county credentials with `INTERNAL_ONLY`.

## NOT_READY

Inspections, OOS rates, crash census, FDACS complaints, FDACS enforcement, FDOT mover extracts, operating geography.

Do not expose INTERNAL_ONLY or NOT_READY as public facts.
