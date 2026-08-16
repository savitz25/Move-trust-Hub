-- Task 002A: one provider identity may participate in multiple service verticals.
-- Existing HHG classification rows remain unchanged and authoritative for HHG.
create or replace view move_v2.provider_all_service_roles as
select provider_id,
       'HHG'::text as vertical,
       classification,
       rule_version,
       reason_codes,
       conflicts,
       classified_at,
       superseded_at
from move_v2.fmcsa_classification_result
union all
select provider_id,
       vertical,
       classification,
       rule_version,
       reason_codes,
       conflicts,
       classified_at,
       superseded_at
from move_v2.provider_service_role;

revoke all on move_v2.provider_all_service_roles from anon, authenticated;
