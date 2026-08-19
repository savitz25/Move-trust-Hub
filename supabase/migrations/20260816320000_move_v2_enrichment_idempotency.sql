create unique index if not exists provider_service_area_observation_unique
on move_v2.provider_service_area(provider_id,authority_scope,area_type,label,coalesce(source_url,''));
