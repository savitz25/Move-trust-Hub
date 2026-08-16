# FMCSA field contract

The contract is derived from the official Company Census and Motus dictionaries, not column-name guesses.

- Identity: `dot_number`, `legal_name`, `dba_name`, entity type, physical/mailing address, public business telephone. Legal and DBA observations remain distinct; display selects a nonblank official DBA, otherwise legal name.
- Operations: Census status (`A` active, `I` inactive, `P` pending), carrier operation (`A` interstate, `B` intrastate hazardous material, `C` intrastate non-hazardous material), `crgo_household = X`, power/truck units, drivers, MCS-150 date.
- Dockets: exact source value plus normalized prefix/value; MC, MX, and FF remain distinct and multiple dockets per USDOT remain separate.
- Authority: Motus authority type/status, docket, USDOT, required/on-file cargo, bond and BIPD amounts. Null remains unknown.
- History: every authority status, reason and change date. Revoke/suspend events are chronology, not destructive current-state replacements.
- Financial responsibility: separate Motus filings. Form 34/83 represent cargo; 82/91/91X BI&PD; 84 surety bond; 85 trust fund. Presence is evidence, not a blanket consumer claim of “insured.”
- BOC-3: retained as process-agent evidence, never the center of eligibility.

Policy references are evidence-layer fields and are not exposed by the bounded QA read model. Source record keys are SHA-256 hashes of the projected official row and point back to the immutable release artifact.
