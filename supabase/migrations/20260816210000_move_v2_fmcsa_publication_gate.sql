-- Only fully published FMCSA releases are visible through the engineering read model.
create or replace view move_v2.fmcsa_provider_read_model as
select f.provider_id, f.display_name, f.legal_name, f.dba_name, f.usdot,
       c.classification, c.reason_codes, c.conflicts,
       f.physical_address, f.phone, f.power_units, f.drivers,
       f.source_release_id, r.source_data_updated_at, r.retrieved_at
from move_v2.fmcsa_provider_fact f
join move_v2.fmcsa_classification_result c on c.provider_id=f.provider_id and c.superseded_at is null
join move_v2.fmcsa_source_release r on r.source_release_id=f.source_release_id
where r.ingestion_status='PUBLISHED';
revoke all on move_v2.fmcsa_provider_read_model from anon, authenticated;
