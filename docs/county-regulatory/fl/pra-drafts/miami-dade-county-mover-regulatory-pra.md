# DRAFT — Public Records Request (NOT SENT)

**County:** Miami-Dade County  
**Agency:** Department of Regulatory and Economic Resources (RER) — Consumer and Neighborhood Protection Division  
**Licensing / Moving Business Registration:** license@miamidade.gov · 786-469-2300  
**Address:** 11805 SW 26th Street, Suite 230, Miami, FL 33175  
**Complaints / Consumer Mediation Center:** consumer@miamidade.gov · 786-469-2333  
**Program:** Moving Business Registration / Moving Business License (MR-#####) under Article XVI, Chapter 8A (Moving Ordinance), Miami-Dade County Code  
**Portal (public search already used):** https://energov.miamidade.gov/EnerGov_Prod/SelfService (tenant MiamiDadeProd)

**Purpose:** MoveTrustHub FL-C005/FL-C006 research. Business-level regulatory intelligence only.  
**Submitted:** NO (draft only)

## FL-C005 / FL-C006 findings informing this request

Public EnerGov License search already yields a **NEAR_FULL** Moving-type roster (409 MR records including historical statuses; 117 Issued). FL-C006 qualified Issued↔FDACS reconciliation under fail-closed rules (VERIFIED with ≥98% precision QA) using name+address only.

Public detail responses expose identity, status, and dates but **do not** expose phones, emails, owners/officers, branch lists, vehicle/VIN inventories, insurance certificates, or complaint/citation histories — and **do not** expose an official FDACS IM crosswalk field.

Local Business Tax (LBT) open data separately provides mover-category accounts (MOV-MNS / MOV-MWS) as **secondary** tax evidence (not a substitute MR credential).

This PRA therefore targets **structured fields and histories not available via the public SelfService search/detail APIs**, not a re-request of the public MR number/name/address/status list already acquired.

Preferred formats: **CSV, XLSX, JSON, or delimited text**.

---

## Requested records (electronic / machine-readable preferred)

### A. Moving Business Registration / License enrichment (current + historical)

For each Moving Business Registration (MR-#####), where maintained:

- credential / license number (MR-#####)  
- legal name / DBA  
- status (Issued, Expired, Out of Business, Abandoned, Archived, On Hold, Void, In Review, etc.)  
- application / issue / period-start / expiration / closed dates  
- physical and mailing addresses  
- phone / mobile / fax / email / website if maintained  
- owners / officers / managers / directors (business identity fields only)  
- registered agent if maintained  
- **FDACS Intrastate Moving (IM) / state Movers License number if stored**  
- Local Business Tax receipt / account linkage if stored  
- branch / additional office locations tied to the license  
- prior business names / prior MR numbers / ownership-change notes  

Include historical records for the last 5–10 years where available (including Expired / Out of Business / Abandoned / Archived).

### B. Vehicles / fleet

- parent MR license number and/or business id  
- branch relationship if any  
- vehicle identifier / decal / permit id if used  
- year / make / model  
- VIN  
- license plate / tag  
- GVW  
- vehicle status / inspection dates if maintained  

### C. Consumer cases / mediation (business-level only)

- respondent / business name  
- mover license (MR-#####) if linked  
- case / complaint ID  
- filing date / closed date  
- category / allegation type  
- status  
- mediation outcome  
- disposition / resolution (exact official terminology)  
- referral / escalation to citation or enforcement  

**Explicitly exclude:** complainant/consumer names, home addresses, phones, emails, financial account numbers, and free-form narrative that identifies consumers.

### D. Civil citations / enforcement / final actions

- citation / case / notice identifiers  
- respondent / business  
- ordinance / violation cite  
- date  
- fine amount  
- status / disposition  
- suspension / revocation / cease-and-desist / final order indicators  
- finality labeling where the county distinguishes notices from final actions  

Please preserve distinction among **complaint observation**, **civil citation**, and **final enforcement action**.

### E. Historical identities

- legal name / DBA changes  
- ownership / officer changes  
- branch open/close changes  
- successor MR numbers when businesses are sold (e.g., notes like “Refer to MR-#####”)

---

## Already acquired publicly (do not need to re-produce unless easier as one extract)

- EnerGov public Moving/MR search identity fields (license number, company, DBA, address, status, dates, business id)  
- Application form schema (Moving Business Registration PDF)  
- Local Business Tax FeatureServer mover-category subset (MOV-MNS / MOV-MWS)

## Notes

- Request is for **business-level** regulatory records only.  
- **Consumer PII must be excluded** from any complaint/mediation export.  
- Draft only — **not submitted**.
