\pset tuples_only on
\pset format unaligned
\pset pager off

select p.oid::regprocedure::text
  || ' anon=' || has_function_privilege('anon', p.oid, 'EXECUTE')
  || ' authenticated=' || has_function_privilege('authenticated', p.oid, 'EXECUTE')
  || ' service_role=' || has_function_privilege('service_role', p.oid, 'EXECUTE')
  || ' public=' || has_function_privilege('public', p.oid, 'EXECUTE')
  || ' search_path=' || coalesce((
       select split_part(cfg, '=', 2)
       from unnest(coalesce(p.proconfig, array[]::text[])) cfg
       where cfg like 'search_path=%'
     ), '')
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in (
    'mth_directory_health',
    'mth_publish_directory_company',
    'mth_get_directory_company',
    'refresh_moving_company_review_stats',
    'trg_refresh_company_review_stats',
    'consume_network_auth_handoff',
    'local_canary_movers_for_county'
  )
order by 1;

select r.rolname || '.' || c.attname || '=' || has_column_privilege(r.rolname, 'public.company_reviews', c.attname, 'SELECT')
from pg_roles r
cross join (
  values
    ('reviewer_email'),
    ('email_hash'),
    ('submitter_ip'),
    ('user_id'),
    ('reviewer_name'),
    ('content'),
    ('status'),
    ('rating')
) as c(attname)
where r.rolname in ('anon', 'authenticated', 'service_role')
order by 1;

select 'companies_with_stats.reloptions=' || coalesce(array_to_string(c.reloptions, ','), 'null')
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname = 'companies_with_stats';
