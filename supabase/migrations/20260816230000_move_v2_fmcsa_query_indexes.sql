create index if not exists fmcsa_classification_value_provider_idx
  on move_v2.fmcsa_classification_result(classification,provider_id) where superseded_at is null;
create index if not exists fmcsa_fact_state_provider_idx
  on move_v2.fmcsa_provider_fact((physical_address->>'state'),provider_id);
