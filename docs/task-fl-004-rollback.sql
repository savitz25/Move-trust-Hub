-- FL-004 rollback. Affects only FL-004 manifest company IDs.
-- Does NOT delete pre-existing fl-im-*, canary, federal, or unrelated PSA.
BEGIN;
UPDATE public.provider_contact_observation
   SET company_id = NULL
 WHERE company_id = ANY(ARRAY['fl-im-1025','fl-im-1103','fl-im-1296','fl-im-1948','fl-im-22','fl-im-2420','fl-im-2532','fl-im-2679','fl-im-27','fl-im-2726','fl-im-2739','fl-im-3030','fl-im-3063','fl-im-3064','fl-im-3075','fl-im-3138','fl-im-333','fl-im-334','fl-im-3433','fl-im-3485','fl-im-3538','fl-im-366','fl-im-3684','fl-im-3782','fl-im-3834','fl-im-3848','fl-im-3941','fl-im-3959','fl-im-3973','fl-im-3983','fl-im-4005','fl-im-4024','fl-im-4049','fl-im-410','fl-im-4100','fl-im-4102','fl-im-4144']::text[])
   AND regulator = 'FDACS';
DELETE FROM public.provider_local_discovery_evidence
 WHERE task_tag = 'FL-004'
   AND company_id = ANY(ARRAY['fl-im-1025','fl-im-1103','fl-im-1296','fl-im-1948','fl-im-22','fl-im-2420','fl-im-2532','fl-im-2679','fl-im-27','fl-im-2726','fl-im-2739','fl-im-3030','fl-im-3063','fl-im-3064','fl-im-3075','fl-im-3138','fl-im-333','fl-im-334','fl-im-3433','fl-im-3485','fl-im-3538','fl-im-366','fl-im-3684','fl-im-3782','fl-im-3834','fl-im-3848','fl-im-3941','fl-im-3959','fl-im-3973','fl-im-3983','fl-im-4005','fl-im-4024','fl-im-4049','fl-im-410','fl-im-4100','fl-im-4102','fl-im-4144']::text[]);
DELETE FROM public.provider_capability
 WHERE company_id = ANY(ARRAY['fl-im-1025','fl-im-1103','fl-im-1296','fl-im-1948','fl-im-22','fl-im-2420','fl-im-2532','fl-im-2679','fl-im-27','fl-im-2726','fl-im-2739','fl-im-3030','fl-im-3063','fl-im-3064','fl-im-3075','fl-im-3138','fl-im-333','fl-im-334','fl-im-3433','fl-im-3485','fl-im-3538','fl-im-366','fl-im-3684','fl-im-3782','fl-im-3834','fl-im-3848','fl-im-3941','fl-im-3959','fl-im-3973','fl-im-3983','fl-im-4005','fl-im-4024','fl-im-4049','fl-im-410','fl-im-4100','fl-im-4102','fl-im-4144']::text[])
   AND evidence_source LIKE 'FL-004:%';
UPDATE public.provider_state_authority
   SET company_id = NULL, matched_company_id = NULL, verification_state = 'UNRESOLVED', updated_at = now()
 WHERE company_id = ANY(ARRAY['fl-im-1025','fl-im-1103','fl-im-1296','fl-im-1948','fl-im-22','fl-im-2420','fl-im-2532','fl-im-2679','fl-im-27','fl-im-2726','fl-im-2739','fl-im-3030','fl-im-3063','fl-im-3064','fl-im-3075','fl-im-3138','fl-im-333','fl-im-334','fl-im-3433','fl-im-3485','fl-im-3538','fl-im-366','fl-im-3684','fl-im-3782','fl-im-3834','fl-im-3848','fl-im-3941','fl-im-3959','fl-im-3973','fl-im-3983','fl-im-4005','fl-im-4024','fl-im-4049','fl-im-410','fl-im-4100','fl-im-4102','fl-im-4144']::text[])
   AND state_code = 'FL'
   AND match_method = 'new_state_authority_identity';
DELETE FROM public.companies
 WHERE id = ANY(ARRAY['fl-im-1025','fl-im-1103','fl-im-1296','fl-im-1948','fl-im-22','fl-im-2420','fl-im-2532','fl-im-2679','fl-im-27','fl-im-2726','fl-im-2739','fl-im-3030','fl-im-3063','fl-im-3064','fl-im-3075','fl-im-3138','fl-im-333','fl-im-334','fl-im-3433','fl-im-3485','fl-im-3538','fl-im-366','fl-im-3684','fl-im-3782','fl-im-3834','fl-im-3848','fl-im-3941','fl-im-3959','fl-im-3973','fl-im-3983','fl-im-4005','fl-im-4024','fl-im-4049','fl-im-410','fl-im-4100','fl-im-4102','fl-im-4144']::text[])
   AND publication_state = 'INGESTED'
   AND indexable = false
   AND id LIKE 'fl-im-%';
COMMIT;
