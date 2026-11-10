#!/usr/bin/env bash
# Branch proof for MOVE-SEC-P1-001 on throwaway local Postgres. No production connection.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DB="move_sec_p1_001"
OUT="${ROOT}/scripts/move-sec-p1-001/out"
mkdir -p "$OUT"

psql_db() {
  sudo -u postgres psql -d "$DB" -v ON_ERROR_STOP=1 -X "$@"
}

psql_file() {
  sudo -u postgres psql -d "$DB" -v ON_ERROR_STOP=1 -X < "$1"
}

expect_fail() {
  local name="$1"
  local sql="$2"
  local log="$OUT/${name}.log"
  set +e
  sudo -u postgres psql -d "$DB" -v ON_ERROR_STOP=1 -X -c "$sql" >"$log" 2>&1
  local ec=$?
  set -e
  if [[ $ec -eq 0 ]]; then
    echo "FAIL $name (command succeeded)"
    cat "$log"
    exit 1
  fi
  if ! grep -Eqi 'permission denied|42501' "$log"; then
    echo "FAIL $name (expected permission denied)"
    cat "$log"
    exit 1
  fi
  echo "PASS $name"
}

echo "=== recreate $DB ==="
sudo -u postgres psql -d postgres -v ON_ERROR_STOP=1 -X -c "drop database if exists ${DB};"
sudo -u postgres psql -d postgres -v ON_ERROR_STOP=1 -X -c "drop role if exists anon; drop role if exists authenticated; drop role if exists service_role;"
sudo -u postgres psql -d postgres -v ON_ERROR_STOP=1 -X -c "create database ${DB};"
psql_file "$ROOT/scripts/move-sec-p1-001/fixture.sql" >"$OUT/fixture.log"

echo "=== privileges before ==="
psql_file "$ROOT/scripts/move-sec-p1-001/snapshot.sql" >"$OUT/before.txt"

echo "=== pre-fix anon can read reviewer_email ==="
psql_db -c "set role anon; select reviewer_email from public.company_reviews where status = 'approved';" >"$OUT/pre-anon-email.log"
grep -q 'secret-reviewer@example.com' "$OUT/pre-anon-email.log"

echo "=== apply forward ==="
psql_file "$ROOT/supabase/migrations/20261110160000_move_sec_p1_001.sql" >"$OUT/forward.log"

echo "=== privileges after forward ==="
psql_file "$ROOT/scripts/move-sec-p1-001/snapshot.sql" >"$OUT/after-forward.txt"

expect_fail anon-publish "set role anon; select public.mth_publish_directory_company('{\"id\":\"x\",\"slug\":\"x\",\"name\":\"X\"}'::jsonb);"
expect_fail anon-health "set role anon; select public.mth_directory_health();"
expect_fail anon-refresh "set role anon; select public.refresh_moving_company_review_stats('11111111-1111-1111-1111-111111111111'::uuid);"
expect_fail anon-consume "set role anon; select * from public.consume_network_auth_handoff('nope', 'move');"
expect_fail anon-canary "set role anon; select * from public.local_canary_movers_for_county('FL', '12086', 24);"
expect_fail anon-email "set role anon; select reviewer_email from public.company_reviews;"
expect_fail anon-hash "set role anon; select email_hash from public.company_reviews;"
expect_fail anon-ip "set role anon; select submitter_ip from public.company_reviews;"
expect_fail anon-user "set role anon; select user_id from public.company_reviews;"
expect_fail authenticated-email "set role authenticated; select reviewer_email from public.company_reviews;"

echo "=== service_role publish ==="
psql_db -c "select set_config('request.jwt.claim.role', 'service_role', false); set role service_role; select public.mth_publish_directory_company('{\"id\":\"sec-p1-proof\",\"slug\":\"sec-p1-proof\",\"name\":\"SEC P1 Proof Movers\",\"usdot_number\":\"9990001\",\"is_verified\":true,\"overall_rating\":4.5}'::jsonb);" >"$OUT/service-publish.log"
grep -q 'sec-p1-proof' "$OUT/service-publish.log"
grep -q '"existing"[[:space:]]*:[[:space:]]*false' "$OUT/service-publish.log" || grep -q 'existing.: false\|"existing": false' "$OUT/service-publish.log"
echo "PASS service_role publish"

echo "=== service_role health, consume, canary, get ==="
psql_db -c "set role service_role; select public.mth_directory_health();" >"$OUT/service-health.log"
grep -q 'companies_table_exists' "$OUT/service-health.log"
psql_db -c "set role service_role; select count(*) from public.consume_network_auth_handoff('missing', 'move');" >"$OUT/service-consume.log"
grep -q '0' "$OUT/service-consume.log"
psql_db -c "set role service_role; select count(*) from public.local_canary_movers_for_county('FL', '12086', 24);" >"$OUT/service-canary.log"
grep -q '0' "$OUT/service-canary.log"
psql_db -c "select set_config('request.jwt.claim.role', 'service_role', false); set role service_role; select public.mth_get_directory_company('seed-co') ->> 'name';" >"$OUT/service-get.log"
grep -q 'Seed Co' "$OUT/service-get.log"
echo "PASS service_role reads"

echo "=== anon public get still works ==="
psql_db -c "select set_config('request.jwt.claim.role', 'anon', false); set role anon; select public.mth_get_directory_company('seed-co') ->> 'name';" >"$OUT/anon-get.log"
grep -q 'Seed Co' "$OUT/anon-get.log"
echo "PASS anon mth_get_directory_company"

echo "=== in-function publish role check (temporary execute grant, rolled back) ==="
set +e
sudo -u postgres psql -d "$DB" -X >"$OUT/role-check.log" 2>&1 <<'SQL'
begin;
grant execute on function public.mth_publish_directory_company(jsonb) to anon;
select set_config('request.jwt.claim.role', 'anon', true);
set role anon;
select public.mth_publish_directory_company('{"id":"blocked","slug":"blocked","name":"Blocked"}'::jsonb);
rollback;
SQL
set -e
grep -Eqi 'permission denied|42501' "$OUT/role-check.log"
psql_db -c "select count(*) from public.companies where id = 'blocked';" >"$OUT/blocked-absent.log"
grep -q '0' "$OUT/blocked-absent.log"
echo "PASS publish role check blocks anon even with EXECUTE"

echo "=== public review query ==="
psql_db -c "set role anon; select id, company_id, reviewer_name, rating, title, content, photo_urls, move_date, created_at, owner_response, owner_response_at, dispute_status from public.company_reviews where company_id = '11111111-1111-1111-1111-111111111111' and status = 'approved' order by created_at desc;" >"$OUT/public-review.log"
grep -q 'Public Reviewer' "$OUT/public-review.log"
if grep -q 'secret-reviewer@example.com' "$OUT/public-review.log"; then
  echo "FAIL public review leaked email"
  exit 1
fi
echo "PASS public review fields"

echo "=== service_role still reads PII ==="
psql_db -c "set role service_role; select reviewer_email, email_hash, submitter_ip, user_id::text from public.company_reviews where status = 'approved';" >"$OUT/service-pii.log"
grep -q 'secret-reviewer@example.com' "$OUT/service-pii.log"
grep -q 'hash-secret' "$OUT/service-pii.log"
echo "PASS service_role PII"

echo "=== trigger still refreshes stats without anon EXECUTE ==="
psql_db -c "set role service_role; insert into public.company_reviews (company_id, reviewer_name, reviewer_email, rating, content, status, email_hash) values ('11111111-1111-1111-1111-111111111111', 'Another', 'a@example.com', 4, 'Long enough content for the local fixture row used to prove the stats trigger.', 'approved', 'hash-a');" >"$OUT/trigger-insert.log"
psql_db -c "select approved_review_count from public.moving_companies where id = '11111111-1111-1111-1111-111111111111';" >"$OUT/trigger-stats.log"
grep -q '2' "$OUT/trigger-stats.log"
echo "PASS review stats trigger"

echo "=== security_invoker row parity ==="
psql_db -c "select (select count(*) from public.companies) as companies, (select count(*) from public.companies_with_stats) as view_owner;" >"$OUT/view-owner.log"
psql_db -c "set role anon; select count(*) as view_anon from public.companies_with_stats;" >"$OUT/view-anon.log"
owner_n="$(psql_db -tA -c "select count(*) from public.companies_with_stats;" | tail -n 1 | tr -d '[:space:]')"
anon_n="$(psql_db -tA -c "set role anon; select count(*) from public.companies_with_stats;" | tail -n 1 | tr -d '[:space:]')"
if [[ "$owner_n" != "$anon_n" || "$owner_n" -lt 2 ]]; then
  echo "FAIL view counts owner=$owner_n anon=$anon_n"
  exit 1
fi
echo "PASS view counts owner=$owner_n anon=$anon_n"

echo "=== rollback ==="
psql_file "$ROOT/supabase/rollback/20261110160000_move_sec_p1_001_rollback.sql" >"$OUT/rollback.log"
psql_file "$ROOT/scripts/move-sec-p1-001/snapshot.sql" >"$OUT/after-rollback.txt"
if ! diff -u "$OUT/before.txt" "$OUT/after-rollback.txt" >"$OUT/privilege.diff"; then
  echo "FAIL privilege diff after rollback"
  cat "$OUT/privilege.diff"
  exit 1
fi
echo "PASS rollback restored privileges (empty diff)"

echo "=== anon email restored by rollback ==="
psql_db -c "set role anon; select reviewer_email from public.company_reviews where status = 'approved' order by created_at limit 1;" >"$OUT/rollback-email.log"
grep -q 'secret-reviewer@example.com' "$OUT/rollback-email.log"
echo "PASS rollback restored anon column select"

echo "=== reapply forward ==="
psql_file "$ROOT/supabase/migrations/20261110160000_move_sec_p1_001.sql" >"$OUT/reapply.log"
expect_fail reapply-anon-publish "set role anon; select public.mth_publish_directory_company('{\"id\":\"y\",\"slug\":\"y\",\"name\":\"Y\"}'::jsonb);"
expect_fail reapply-anon-email "set role anon; select reviewer_email from public.company_reviews;"
psql_db -c "select set_config('request.jwt.claim.role', 'service_role', false); set role service_role; select public.mth_publish_directory_company('{\"id\":\"sec-p1-proof\",\"slug\":\"sec-p1-proof\",\"name\":\"SEC P1 Proof Movers\"}'::jsonb) ->> 'existing';" >"$OUT/reapply-service.log"
grep -q 'true' "$OUT/reapply-service.log"
echo "PASS reapply"

echo "=== ALL PROOFS PASSED ==="
