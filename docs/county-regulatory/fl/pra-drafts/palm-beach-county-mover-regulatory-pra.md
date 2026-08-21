# DRAFT — Public Records Request (NOT SENT)

**County:** Palm Beach County  
**Agency:** Public Safety Department — Consumer Affairs Division  
**Address:** 50 South Military Trail, Suite 201, West Palm Beach, FL 33415  
**Phone:** 561-712-6600  
**Program:** Moving & Storage Business Permit (Ordinance 2005-007 / PBC Code Ch. 17 Art. VIII)  
**Related public systems:**  
- Licensed Moving Companies lookup: https://discover.pbc.gov/publicsafety/consumeraffairs/Pages/Moving_App.aspx  
- API host (public read used in FL-C002 research): https://secure.pbc.gov/ConsumerAffairs/  
- Business Information Reports: https://discover.pbc.gov/publicsafety/consumeraffairs/Pages/Lookup.aspx  

**Purpose:** MoveTrustHub FL-C002 research follow-on. Business-level regulatory intelligence only.  
**Submitted:** NO (draft only)

## FL-C002 findings informing this request

Palm Beach County already exposes a rich **public searchable** licensed-mover API (`Companies/GetCompanies`, BusinessType `58` Moving & Storage). FL-C002 acquired a near-complete **active LICENSED** roster (142 Moving Business Permit records) plus a 22-business BIR sample with complaint dispositions and administrative actions.

This PRA is therefore focused on what public search does **not** practically provide as a complete bulk export:

1. Historical / inactive / expired / suspended / revoked permit universe  
2. Complete multi-year complaint extract for all movers (not one-business-at-a-time BIR)  
3. Complete enforcement/citation extract with final dispositions  
4. Any FDACS IM crosswalk field if maintained internally  
5. Vehicle-level / decal detail beyond fleet totals  

Preferred label for residual gap: `PRA_REQUIRED_FOR_COMPLETE_BULK_DATA` (not a blocker for FL-C002 completion).

## Requested records (electronic / machine-readable preferred)

Preferred formats: **CSV, XLSX, JSON, or delimited text**. If only PDF/paper exists, please advise and provide the most structured available extract.

### A. Current + historical mover permits / Moving Business Permits

Please provide structured extracts of businesses licensed/permitted under the Palm Beach County Moving Ordinance / Moving Business Permit program, including:

1. Current roster (all statuses, not only currently LICENSED public-search results).  
2. Historical roster(s) for the last 5–10 years if available (expired, inactive, suspended, revoked, denied, withdrawn, out-of-business, etc.).  

Fields where maintained:

- permit / license number (e.g., MV####)  
- business legal name  
- DBA / aliases  
- status (and status-effective dates if tracked)  
- issue / renewal / expiration dates  
- physical address  
- mailing address  
- phone  
- email  
- website  
- owner / officer / manager / dispute contact name and title  
- fleet information / vehicle count  
- vehicle / permit decal identifiers if tracked  
- insurance/bond indicators if tracked  
- local business tax identifier if linked  
- **FDACS / state registration number if stored**  

### B. Consumer complaints (business-level only)

Structured extract of consumer disputes/complaints involving moving & storage companies for the last 3–10 years (aligned with the public Business Information Report window and any longer retained history).

Business-level fields only:

- respondent / business name  
- business permit / license ID / business sequence if used internally  
- case / complaint number  
- filing date  
- closed date  
- category / alleged violation  
- status  
- disposition / resolution code and short description  
- resolution / outcome  

**Explicitly request: exclude consumer names, home addresses, phone numbers, emails, financial account numbers, and free-form narrative PII.**

If narratives cannot be severed from the case file, please provide a business-level disposition table without narrative text.

### C. Enforcement

Structured extract of mover-related:

- administrative actions  
- notices of violation / warnings  
- civil citations  
- fines / amounts  
- cease-and-desist / assurance of voluntary compliance  
- suspensions / revocations / denials  
- final orders  
- final disposition  

Please preserve distinction among investigation, allegation, citation, and final disposition when both exist.

### D. Historical business identity (where available)

- prior names  
- prior DBAs  
- ownership / officer changes  
- prior addresses / phones if retained as identity history  

## Machine-readable request scope (summary)

| Dataset | Scope | Format preference |
|---|---|---|
| A Permits | current + historical, all statuses | CSV/XLSX/JSON |
| B Complaints | business-level, 3–10 years, no consumer PII | CSV/XLSX/JSON |
| C Enforcement | citations/NOV/admin/final orders | CSV/XLSX/JSON |
| D Identity history | prior names/DBA/ownership if held | CSV/XLSX/JSON |

## Consumer PII exclusion

**Please exclude** complainant/consumer:

- names  
- addresses  
- phone numbers  
- emails  
- SSN / government IDs  
- financial account numbers  
- free-form narrative containing identifying information  

Business contact/officer information may be included.

## Notes

- This is a **draft only**. **Not submitted.**  
- FL-C002 already completed acquisition/staging from publicly available official sources.  
- Public API endpoints observed in research (for agency reference only):  
  - `GET /api/Companies/GetCompanies?BusinessType=58&SearchBy=...&SearchFor=...`  
  - `GET /api/BIR/GetComplaintDetails_SQL`  
  - `GET /api/BIR/GetAdministrativeActions`  
  - `GET /api/Companies/GetCompaniesActionDetails`  
  - `GET /api/Complaint/GetResolutions`  
- Credential terminology observed: **Moving Business Permit** (License_Type_Seq 8; Ordinance 2005-007).  
- Complaint disposition codes are already published via official `GetResolutions` (e.g., A01–A17, B01–B19, C01–C02, D01–D04, E01).
