-- =============================================================================
-- 20261010170000_move_rls_fail_closed.sql
-- P1 MOVE RLS GAP - fail-closed fix for 32 public tables with RLS disabled
-- Project: Move-Trust-Hub (ref arepfylnilkjmyduhwbz).  Drafted 2026-10-10 by Grok Bot (TrustHub Supabase Security).
-- Audit: move-rls-gap-20261010/audit.md ; repo HEAD audited: c037eb49eb69b66e32551c2119ba4b10e82de8df
--
-- DRAFT - NOT APPLIED.  Requires Founder GO.  Do NOT use `supabase db push`
-- (supabase_migrations.schema_migrations has only 1 row; repo migrations are applied out-of-band).
--
-- How to run (as postgres, single session, e.g. psql -v ON_ERROR_STOP=1):
--   SET mth.rls_fail_closed_target = 'branch';               -- on a preview branch
--   SET mth.rls_fail_closed_target = 'arepfylnilkjmyduhwbz'; -- on production (after branch rehearsal)
--   \i supabase/migrations/20261010170000_move_rls_fail_closed.sql
--
-- What it does (all-or-nothing, idempotent):
--   * ENABLE ROW LEVEL SECURITY on all 32 tables (no FORCE: owner `postgres` ETL over DATABASE_URL and the
--     SECURITY DEFINER RPC local_canary_movers_for_county must keep owner bypass).
--   * REVOKE ALL (arwdDxtm, incl. TRUNCATE/REFERENCES/TRIGGER/MAINTAIN which RLS does not cover) FROM anon,
--     authenticated, PUBLIC.  service_role grants are untouched (BYPASSRLS).
--   * provider_capability is the ONLY table the anon client genuinely reads
--     (lib/provider/capability-evidence.ts:22-29 and RPC directory_query_page, SECURITY INVOKER):
--     column-level GRANT SELECT (company_id, capability, evidence_state) + one permissive SELECT policy.
--   * Post-check assertions; any failure rolls back the whole transaction.
-- Default privileges (pg_default_acl) are NOT changed here - see supabase/proposals/20261010170100_move_default_privileges_proposal.sql
-- Rollback: supabase/rollback/20261010170000_move_rls_fail_closed_rollback.sql (restores the captured ACLs exactly).
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

  -- each table must be EITHER in the captured pre-state (RLS off, ACL identical to capture)
  -- OR already in the post-state (RLS on, no anon/authenticated/PUBLIC entry in relacl) -> idempotent re-run
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
    RAISE EXCEPTION 'guard: state drift since 2026-10-10 capture on: % - re-audit before applying', v_bad;
  END IF;
END
$guard$;

-- ---------------------------------------------------------------------------
-- 1. Enable RLS (idempotent) and revoke every anon / authenticated / PUBLIC privilege
-- ---------------------------------------------------------------------------
DO $fix$
DECLARE r record;
BEGIN
  FOR r IN SELECT relname FROM _mth_rls_capture ORDER BY relname LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.relname);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM anon, authenticated, PUBLIC', r.relname);
  END LOOP;
END
$fix$;

-- ---------------------------------------------------------------------------
-- 2. Minimal public read: provider_capability (non-PII evidence flags per company)
--    Columns = exactly those used by capability-evidence.ts (select + eq filter) and directory_query_page.
--    If PostgREST callers ever need select=* , replace with table-level GRANT SELECT (see test-plan.md).
-- ---------------------------------------------------------------------------
GRANT SELECT (company_id, capability, evidence_state) ON TABLE public.provider_capability TO anon, authenticated;

DO $pol$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies
                 WHERE schemaname = 'public' AND tablename = 'provider_capability'
                   AND policyname = 'move_public_read_provider_capability') THEN
    CREATE POLICY move_public_read_provider_capability
      ON public.provider_capability
      AS PERMISSIVE FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END
$pol$;

COMMENT ON POLICY move_public_read_provider_capability ON public.provider_capability IS
  'P1 MOVE RLS GAP 2026-10-10: public read of capability evidence flags (company pages + directory_query_page). Column-limited by GRANT.';

-- ---------------------------------------------------------------------------
-- 3. Post-check assertions (inside the transaction - any failure aborts everything)
-- ---------------------------------------------------------------------------
DO $post$
DECLARE
  r record; p text; col record;
  privs constant text[] := ARRAY['SELECT','INSERT','UPDATE','DELETE','TRUNCATE','REFERENCES','TRIGGER','MAINTAIN'];
  v_cols int;
BEGIN
  FOR r IN SELECT k.oid, k.relname, k.relrowsecurity, k.relforcerowsecurity, k.relacl
           FROM _mth_rls_capture cap JOIN pg_class k
             ON k.relname = cap.relname AND k.relnamespace = 'public'::regnamespace LOOP
    IF NOT r.relrowsecurity THEN RAISE EXCEPTION 'post: RLS not enabled on %', r.relname; END IF;
    IF r.relforcerowsecurity THEN RAISE EXCEPTION 'post: unexpected FORCE RLS on %', r.relname; END IF;
    IF EXISTS (SELECT 1 FROM aclexplode(r.relacl) a
               WHERE a.grantee = 0 OR a.grantee IN ('anon'::regrole, 'authenticated'::regrole)) THEN
      RAISE EXCEPTION 'post: anon/authenticated/PUBLIC still in relacl of %', r.relname;
    END IF;
    FOREACH p IN ARRAY privs LOOP
      IF has_table_privilege('anon', r.oid, p) OR has_table_privilege('authenticated', r.oid, p) THEN
        RAISE EXCEPTION 'post: anon/authenticated still has table-level % on %', p, r.relname;
      END IF;
      IF NOT has_table_privilege('service_role', r.oid, p) THEN
        RAISE EXCEPTION 'post: service_role lost % on %', p, r.relname;
      END IF;
      IF NOT has_table_privilege('postgres', r.oid, p) THEN
        RAISE EXCEPTION 'post: owner postgres lost % on %', p, r.relname;
      END IF;
    END LOOP;
    -- no column grants anywhere except the 3 SELECT columns of provider_capability
    FOR col IN SELECT attname FROM pg_attribute
             WHERE attrelid = r.oid AND attnum > 0 AND NOT attisdropped LOOP
      IF has_column_privilege('anon', r.oid, col.attname, 'INSERT') OR has_column_privilege('anon', r.oid, col.attname, 'UPDATE')
         OR has_column_privilege('anon', r.oid, col.attname, 'REFERENCES')
         OR has_column_privilege('authenticated', r.oid, col.attname, 'INSERT') OR has_column_privilege('authenticated', r.oid, col.attname, 'UPDATE')
         OR has_column_privilege('authenticated', r.oid, col.attname, 'REFERENCES') THEN
        RAISE EXCEPTION 'post: column write/ref privilege remains on %.%', r.relname, col.attname;
      END IF;
      IF (has_column_privilege('anon', r.oid, col.attname, 'SELECT') OR has_column_privilege('authenticated', r.oid, col.attname, 'SELECT'))
         AND NOT (r.relname = 'provider_capability' AND col.attname IN ('company_id','capability','evidence_state')) THEN
        RAISE EXCEPTION 'post: unexpected column SELECT on %.%', r.relname, col.attname;
      END IF;
    END LOOP;
  END LOOP;

  SELECT count(*) INTO v_cols FROM pg_attribute
  WHERE attrelid = 'public.provider_capability'::regclass AND attnum > 0 AND NOT attisdropped
    AND attname IN ('company_id','capability','evidence_state')
    AND has_column_privilege('anon', attrelid, attname, 'SELECT')
    AND has_column_privilege('authenticated', attrelid, attname, 'SELECT');
  IF v_cols <> 3 THEN RAISE EXCEPTION 'post: provider_capability public column SELECT count = % (expected 3)', v_cols; END IF;

  IF (SELECT count(*) FROM pg_policies WHERE schemaname='public' AND tablename='provider_capability'
        AND policyname='move_public_read_provider_capability' AND cmd='SELECT'
        AND roles @> ARRAY['anon','authenticated']::name[]) <> 1 THEN
    RAISE EXCEPTION 'post: policy move_public_read_provider_capability missing or wrong';
  END IF;
  IF (SELECT count(*) FROM pg_policies pp JOIN _mth_rls_capture cap ON cap.relname = pp.tablename
       WHERE pp.schemaname='public') <> 1 THEN
    RAISE EXCEPTION 'post: unexpected extra policies on the 32 tables';
  END IF;

  -- SECURITY DEFINER RPC keeps working (owner bypass): its owner must still be a BYPASSRLS/owner role
  IF (SELECT pg_get_userbyid(proowner) FROM pg_proc
       WHERE oid = 'public.local_canary_movers_for_county(text,text,integer)'::regprocedure) <> 'postgres' THEN
    RAISE EXCEPTION 'post: local_canary_movers_for_county owner changed';
  END IF;

  RAISE NOTICE 'move_rls_fail_closed: post-checks passed for 32 tables (23 previously anon-exposed)';
END
$post$;

COMMIT;
