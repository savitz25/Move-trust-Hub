-- FL-006 rollback for fl-im-4099 only.
-- Optional (do not run blindly): detach FL IM3813 from wa-hg-064493:
-- UPDATE provider_state_authority SET company_id=NULL, matched_company_id=NULL, verification_state='UNRESOLVED'
--  WHERE state_code='FL' AND authority_number='IM3813' AND company_id='wa-hg-064493';
-- UPDATE provider_contact_observation SET company_id=NULL
--  WHERE regulatory_id='FL-FDACS-IM-3813' AND company_id='wa-hg-064493';
BEGIN;
UPDATE provider_contact_observation SET company_id=NULL WHERE regulatory_id='FL-FDACS-IM-4099' AND company_id='fl-im-4099';
DELETE FROM provider_capability WHERE company_id='fl-im-4099';
UPDATE provider_state_authority SET company_id=NULL, matched_company_id=NULL, verification_state='UNRESOLVED'
 WHERE state_code='FL' AND authority_number='IM4099' AND company_id='fl-im-4099';
DELETE FROM companies WHERE id='fl-im-4099' AND publication_state='INGESTED' AND indexable=false;
COMMIT;
