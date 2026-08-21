-- FL-010 rollback for FL_STATE_WAVE_1 only. Hash a9165ec652ad7a27.
-- Does not touch KEEP_80 canary LOCAL_HHG_FL_WA_2026_08_CANARY_1.
BEGIN;
UPDATE public.companies
   SET publication_state = 'INGESTED',
       indexable = false,
       updated_at = now()
 WHERE id = ANY(ARRAY['fl-im-1025','fl-im-1103','fl-im-1296','fl-im-1948','fl-im-22','fl-im-2420','fl-im-2532','fl-im-2679','fl-im-27','fl-im-2726','fl-im-2739','fl-im-3030','fl-im-3063','fl-im-3064','fl-im-3075','fl-im-3138','fl-im-333','fl-im-334','fl-im-3433','fl-im-3485','fl-im-3538','fl-im-366','fl-im-3684','fl-im-3782','fl-im-3834','fl-im-3848','fl-im-3941','fl-im-3959','fl-im-3973','fl-im-3983','fl-im-4005','fl-im-4024','fl-im-4049','fl-im-410','fl-im-4100','fl-im-4102','fl-im-4144'])
   AND publication_state = 'PUBLISHABLE'
   AND indexable = false;
UPDATE public.local_hhg_canary_publication
   SET status = 'unpublished'
 WHERE wave_id = 'FL_STATE_WAVE_1'
   AND company_id = ANY(ARRAY['fl-im-1025','fl-im-1103','fl-im-1296','fl-im-1948','fl-im-22','fl-im-2420','fl-im-2532','fl-im-2679','fl-im-27','fl-im-2726','fl-im-2739','fl-im-3030','fl-im-3063','fl-im-3064','fl-im-3075','fl-im-3138','fl-im-333','fl-im-334','fl-im-3433','fl-im-3485','fl-im-3538','fl-im-366','fl-im-3684','fl-im-3782','fl-im-3834','fl-im-3848','fl-im-3941','fl-im-3959','fl-im-3973','fl-im-3983','fl-im-4005','fl-im-4024','fl-im-4049','fl-im-410','fl-im-4100','fl-im-4102','fl-im-4144']);
COMMIT;
