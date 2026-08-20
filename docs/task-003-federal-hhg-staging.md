# Task 003 — Federal HHG staging

Google Places API requests: **0**.

Starting main: `90a19b6c88efcb1924f024cb7cecd44baedabff1`.

## Sources inspected

No local census zip/CSV existed in the repo. Task 002 QC Mobile artifacts cover only the collision cohort. National staging uses the official FMCSA L&I carrier file on data.transportation.gov (`6eyk-hxee`), last updated 2026-08-18.

## Classifier semantics

`hhg_chk=Y` is Licensing & Insurance household-goods authorization, not MCS-150 cargo self-report.

- Active carrier: `hhg_chk=Y` and (`common_stat=A` or `contract_stat=A`)
- Active broker: `hhg_chk=Y` and `broker_stat=A`
- Carrier+Broker: both independently true
- `property_chk=Y` without `hhg_chk=Y` is NOT_HHG
- Status `I` with no Active flag is INACTIVE
- Multiple dockets per USDOT are aggregated; MC dockets win over FF

## Publication

Staging table `federal_hhg_staging` is revoked from `anon`/`authenticated`. No rows are inserted into `public.companies`. Sitemap and indexable production counts are unchanged by staged candidates.

Command: `npm run stage:federal-hhg` (cached download in `data/cache/`, not committed).
