-- MOVE-PR227-WRITE-SAFETY-003 place-claim dependency.
-- DO NOT APPLY. This file is not a migration, not a grant, and not authorized
-- for Production. Do not run it with supabase db push. Application code does
-- not call these functions.
--
-- What this guarantees, only for writers that call it inside one transaction:
--   * pg_advisory_xact_lock serializes claims for one place_id.
--   * The holder read has no 25-row cap.
--   * A company that already stores the place_id can refresh it.
--   * Auditable shared-location evidence on the incoming snapshot, or on an
--     existing holder, may add another row. Other holders are not deleted.
--   * A second exclusive claim sees the first and is returned as review.
--
-- What this does not guarantee:
--   * A writer that updates companies directly can still race.
--   * hashtext can collide. A collision waits; it does not admit a second
--     exclusive claim.
--   * Name and USDOT adjudication stay in the application. This function
--     enforces reservation, completeness, and the shared-location exception.
--
-- BEGIN APPLY

CREATE OR REPLACE FUNCTION public.google_place_share_evidence_ok(p_google jsonb)
RETURNS boolean
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  v_observed text;
  v_record text;
BEGIN
  IF p_google IS NULL OR p_google->>'association_scope' IS DISTINCT FROM 'shared_location' THEN
    RETURN false;
  END IF;
  IF COALESCE(p_google->'shared_location_evidence'->>'relationship', '')
     NOT IN ('same_premise', 'co_located_office', 'shared_terminal') THEN
    RETURN false;
  END IF;
  IF COALESCE(p_google->'shared_location_evidence'->'source'->>'system', '')
     !~ '^[a-z][a-z0-9_]{1,40}$' THEN
    RETURN false;
  END IF;
  v_record := btrim(COALESCE(p_google->'shared_location_evidence'->'source'->>'record_id', ''));
  IF v_record !~ '^[A-Za-z0-9][A-Za-z0-9._:-]{0,80}$' THEN
    RETURN false;
  END IF;
  IF length(btrim(COALESCE(p_google->'shared_location_evidence'->>'premise', ''))) = 0 THEN
    RETURN false;
  END IF;
  v_observed := p_google->'shared_location_evidence'->>'observed_at';
  IF v_observed IS NULL OR v_observed !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN
    RETURN false;
  END IF;
  -- Assignment, not PERFORM: an invalid timestamp must return false.
  PERFORM 1 FROM (SELECT v_observed::timestamptz AS observed_at) AS parsed;
  RETURN true;
EXCEPTION
  WHEN invalid_datetime_format OR datetime_field_overflow THEN
    RETURN false;
END;
$$;

CREATE OR REPLACE FUNCTION public.claim_google_place_association(
  p_company_id text,
  p_google jsonb
) RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_place_id text;
  v_others integer;
  v_self_holds boolean;
  v_incoming_shared boolean;
  v_holder_shared boolean;
BEGIN
  v_place_id := btrim(COALESCE(p_google->>'place_id', ''));
  IF v_place_id = '' OR COALESCE(p_google->>'status', '') <> 'ok' THEN
    RETURN jsonb_build_object('applied', false, 'action', 'review', 'reason', 'no_place_listing');
  END IF;

  -- Single-key lock. The cast can collide across place ids; collision waits.
  PERFORM pg_advisory_xact_lock(hashtext(v_place_id)::bigint);

  v_incoming_shared := public.google_place_share_evidence_ok(p_google);

  SELECT
    COUNT(*) FILTER (WHERE c.id <> p_company_id),
    COALESCE(BOOL_OR(c.id = p_company_id), false),
    COALESCE(BOOL_OR(
      c.id <> p_company_id
      AND (
        public.google_place_share_evidence_ok(c.verification_sources->'google')
        OR public.google_place_share_evidence_ok(c.google_data)
      )
    ), false)
  INTO v_others, v_self_holds, v_holder_shared
  FROM public.companies c
  WHERE c.verification_sources->'google'->>'place_id' = v_place_id
     OR c.google_data->>'place_id' = v_place_id;

  IF COALESCE(v_others, 0) > 0
     AND NOT v_incoming_shared
     AND NOT COALESCE(v_holder_shared, false)
     AND NOT COALESCE(v_self_holds, false) THEN
    RETURN jsonb_build_object(
      'applied', false,
      'action', 'review',
      'reason', 'place_already_held',
      'other_holders', v_others
    );
  END IF;

  UPDATE public.companies
     SET verification_sources = jsonb_set(
           COALESCE(verification_sources, '{}'::jsonb),
           '{google}',
           p_google,
           true
         ),
         google_data = p_google,
         verification_last_synced_at = now(),
         updated_at = now()
   WHERE id = p_company_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('applied', false, 'action', 'review', 'reason', 'company_not_found');
  END IF;

  RETURN jsonb_build_object(
    'applied', true,
    'action', 'attach',
    'other_holders', COALESCE(v_others, 0),
    'preserved_existing', COALESCE(v_self_holds, false),
    'shared', v_incoming_shared OR COALESCE(v_holder_shared, false)
  );
END;
$$;

-- Remove the default PUBLIC execute grant. This is not a privilege grant.
REVOKE ALL ON FUNCTION public.google_place_share_evidence_ok(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.claim_google_place_association(text, jsonb) FROM PUBLIC;

-- END APPLY

-- BEGIN ROLLBACK
-- Run this block instead of APPLY to remove the dependency.
-- It does not update, delete, or lock company rows.
DROP FUNCTION IF EXISTS public.claim_google_place_association(text, jsonb);
DROP FUNCTION IF EXISTS public.google_place_share_evidence_ok(jsonb);
-- END ROLLBACK
