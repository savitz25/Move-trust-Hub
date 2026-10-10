-- =============================================================================
-- ROLLBACK for 20261010170000_move_rls_fail_closed.sql
-- Restores the exact pre-fix state captured read-only on 2026-10-10 ~12:16 EDT from arepfylnilkjmyduhwbz
-- (raw/q003_rls_off_tables.tsv): RLS DISABLED on all 32 tables; anon+authenticated arwdDxtm on 23 tables;
-- the other 9 had no anon/authenticated grants and get none back.
--
-- WARNING: this RE-OPENS the exposure (anon read/write/TRUNCATE on 23 tables). Use only to recover from an
-- outage caused by the fix, rehearse on a branch first, and prefer a targeted GRANT/policy fix-forward.
-- Lives in supabase/rollback/ so no tooling auto-applies it.  Requires the same session setting:
--   SET mth.rls_fail_closed_target = 'branch' | 'arepfylnilkjmyduhwbz';
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 0. Identity + state guard (fails closed; nothing below runs unless it passes)
-- ---------------------------------------------------------------------------
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '120s';

CREATE TEMP TABLE _mth_rls_capture (relname text PRIMARY KEY, pre_acl text NOT NULL) ON COMMIT DROP;
INSERT INTO _mth_rls_capture (relname, pre_acl) VALUES
    ('depository_fdic_institutions', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('depository_ncua_credit_unions', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('federal_hhg_identity_resolution', '{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('federal_hhg_staging', '{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('federal_hhg_staging_run', '{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('federal_hhg_wave_publication', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_cfpb_company_entity_bridges', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_cfpb_complaint_classifications', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_cfpb_complaints', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_cfpb_identity_conflicts', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_cfpb_source_companies', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_federal_enforcement_amounts', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_federal_enforcement_classifications', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_federal_enforcement_conflicts', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_federal_enforcement_documents', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_federal_enforcement_event_respondents', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_federal_enforcement_events', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_federal_enforcement_respondents', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_federal_enforcement_source_freshness', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_servicer_identity_conflicts', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('lender_servicer_role_evidence', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('local_hhg_canary_publication', '{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('provider_authority', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('provider_capability', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('provider_contact_observation', '{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('provider_identity_review', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('provider_local_discovery_evidence', '{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('provider_location', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('provider_service_area', '{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('provider_state_authority', '{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('state_hhg_ingest_run', '{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}'),
    ('state_hhg_registry_staging', '{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}');

CREATE FUNCTION pg_temp.mth_acl_norm(a aclitem[]) RETURNS text[] LANGUAGE sql IMMUTABLE AS $f$
  SELECT coalesce(array_agg(x ORDER BY x), '{}')
  FROM (SELECT format('%s>%s:%s:%s', x.grantor::regrole,
                      CASE x.grantee WHEN 0 THEN 'PUBLIC' ELSE x.grantee::regrole::text END,
                      x.privilege_type, x.is_grantable) AS x
        FROM aclexplode(a) x) s
$f$;  -- order-insensitive ACL comparison (GRANT re-appends entries at the end)

DO $guard$
DECLARE
  v_target text := current_setting('mth.rls_fail_closed_target', true);
  v_sysid  bigint;
  v_prod_sysid constant bigint := 7642734024280108049;  -- arepfylnilkjmyduhwbz, captured 2026-10-10 (pg_control_system)
  v_missing int;
  v_bad text;
BEGIN
  IF current_user <> 'postgres' THEN
    RAISE EXCEPTION 'guard: must run as postgres (got %)', current_user;
  END IF;
  IF current_database() <> 'postgres' THEN
    RAISE EXCEPTION 'guard: unexpected database %', current_database();
  END IF;
  IF to_regnamespace('move_v2') IS NULL THEN
    RAISE EXCEPTION 'guard: schema move_v2 not found - this is not the Move Trust Hub database';
  END IF;
  IF current_setting('server_version_num')::int < 170000 THEN
    RAISE EXCEPTION 'guard: expected PostgreSQL 17+ (MAINTAIN privilege)';
  END IF;

  SELECT system_identifier INTO v_sysid FROM pg_control_system();
  IF v_target IS NULL OR v_target = '' THEN
    RAISE EXCEPTION 'guard: set mth.rls_fail_closed_target first (''arepfylnilkjmyduhwbz'' for prod or ''branch'' for a preview branch)';
  ELSIF v_target = 'arepfylnilkjmyduhwbz' THEN
    IF v_sysid <> v_prod_sysid THEN
      RAISE EXCEPTION 'guard: target says prod but system_identifier % <> %', v_sysid, v_prod_sysid;
    END IF;
  ELSIF v_target = 'branch' THEN
    IF v_sysid = v_prod_sysid THEN
      RAISE EXCEPTION 'guard: target says branch but this IS the production cluster';
    END IF;
  ELSE
    RAISE EXCEPTION 'guard: unknown mth.rls_fail_closed_target %', v_target;
  END IF;

  -- every captured table must exist as an ordinary, non-partition table owned by postgres, without FORCE RLS
  SELECT count(*) INTO v_missing
  FROM _mth_rls_capture c
  LEFT JOIN pg_class k ON k.relname = c.relname AND k.relnamespace = 'public'::regnamespace
  WHERE k.oid IS NULL OR k.relkind <> 'r' OR k.relispartition
     OR pg_get_userbyid(k.relowner) <> 'postgres' OR k.relforcerowsecurity;
  IF v_missing > 0 THEN
    RAISE EXCEPTION 'guard: % of 32 tables missing / not owned by postgres / unexpected kind or FORCE RLS', v_missing;
  END IF;

  -- rollback only from the post-state (or already-restored pre-state -> no-op re-run)
  SELECT string_agg(c.relname, ', ') INTO v_bad
  FROM _mth_rls_capture c
  JOIN pg_class k ON k.relname = c.relname AND k.relnamespace = 'public'::regnamespace
  WHERE NOT (
        (NOT k.relrowsecurity AND pg_temp.mth_acl_norm(k.relacl) = pg_temp.mth_acl_norm(c.pre_acl::aclitem[]))
     OR (k.relrowsecurity AND NOT EXISTS (
           SELECT 1 FROM aclexplode(k.relacl) a
           WHERE a.grantee = 0 OR a.grantee IN ('anon'::regrole, 'authenticated'::regrole)))
  );
  IF v_bad IS NOT NULL THEN
    RAISE EXCEPTION 'rollback guard: tables not in known pre/post state: % - inspect manually', v_bad;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies p JOIN _mth_rls_capture c ON c.relname = p.tablename
             WHERE p.schemaname = 'public' AND p.policyname <> 'move_public_read_provider_capability') THEN
    RAISE EXCEPTION 'rollback guard: policies other than move_public_read_provider_capability exist on these tables - someone added policies after the fix; do not blindly roll back';
  END IF;
END
$guard$;

-- 1. Remove the public-read path added by the fix
DROP POLICY IF EXISTS move_public_read_provider_capability ON public.provider_capability;
REVOKE SELECT (company_id, capability, evidence_state) ON TABLE public.provider_capability FROM anon, authenticated;

-- 2. Restore table ACLs exactly as captured (grantor = postgres because we run as postgres)
GRANT ALL ON TABLE public.depository_fdic_institutions TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.depository_ncua_credit_unions TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.federal_hhg_wave_publication TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_cfpb_company_entity_bridges TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_cfpb_complaint_classifications TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_cfpb_complaints TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_cfpb_identity_conflicts TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_cfpb_source_companies TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_federal_enforcement_amounts TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_federal_enforcement_classifications TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_federal_enforcement_conflicts TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_federal_enforcement_documents TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_federal_enforcement_event_respondents TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_federal_enforcement_events TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_federal_enforcement_respondents TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_federal_enforcement_source_freshness TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_servicer_identity_conflicts TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.lender_servicer_role_evidence TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.provider_authority TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.provider_capability TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.provider_identity_review TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.provider_location TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres
GRANT ALL ON TABLE public.provider_service_area TO anon, authenticated;  -- restores anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres

-- 3. Disable RLS on all 32 (captured state: relrowsecurity = false, relforcerowsecurity = false)
DO $rls$
DECLARE r record;
BEGIN
  FOR r IN SELECT relname FROM _mth_rls_capture ORDER BY relname LOOP
    EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY', r.relname);
  END LOOP;
END
$rls$;

-- 4. Assert ACLs (same grantor/grantee/privilege set; entry order may differ) and flags vs capture
DO $post$
DECLARE v_bad text;
BEGIN
  SELECT string_agg(c.relname || ' [' || coalesce(k.relacl::text,'NULL') || ']', '; ') INTO v_bad
  FROM _mth_rls_capture c
  JOIN pg_class k ON k.relname = c.relname AND k.relnamespace = 'public'::regnamespace
  WHERE k.relrowsecurity OR k.relforcerowsecurity OR pg_temp.mth_acl_norm(k.relacl) IS DISTINCT FROM pg_temp.mth_acl_norm(c.pre_acl::aclitem[]);
  IF v_bad IS NOT NULL THEN RAISE EXCEPTION 'rollback post: mismatch vs capture: %', v_bad; END IF;

  IF EXISTS (SELECT 1 FROM pg_attribute a JOIN _mth_rls_capture c
               ON a.attrelid = ('public.' || quote_ident(c.relname))::regclass
             WHERE a.attnum > 0 AND a.attacl IS NOT NULL) THEN
    RAISE EXCEPTION 'rollback post: column ACLs remain (capture had none)';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies p JOIN _mth_rls_capture c ON c.relname = p.tablename WHERE p.schemaname='public') THEN
    RAISE EXCEPTION 'rollback post: policies remain (capture had 0)';
  END IF;
  RAISE NOTICE 'rollback: 32 tables restored to captured pre-fix ACL/RLS state';
END
$post$;

COMMIT;
