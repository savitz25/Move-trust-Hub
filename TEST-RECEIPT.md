# TEST-RECEIPT — MOVE-SEC-P1-001

Date: 2026-11-10. Production was not modified. No migration was applied to `arepfylnilkjmyduhwbz`. No env vars were changed.

## What was not a Supabase Preview Branch

`.github/workflows/` has no Supabase GitHub integration and no preview-branch job. A paid Supabase branch was not created.

No read-only Postgres URL or database password was available in this environment (only the Supabase MCP SQL API). A `pg_dump --schema-only` of production was not taken, and the repo migrations are not a clean empty-database replay. The proof below uses throwaway local **PostgreSQL 17.11** and a privilege replica (`scripts/move-sec-p1-001/fixture.sql`) whose EXECUTE grants, `company_reviews` column privileges, and `companies` public SELECT policy match the read-only catalog capture from Move prod on 2026-11-10.

Read-only production facts used to build that replica:

- Seven `SECURITY DEFINER` functions in `public` with `has_function_privilege('anon', ..., 'EXECUTE') = true`.
- `company_reviews` table ACL `arwdDxtm` for `anon` and `authenticated` (column ACLs null, so the four PII columns are readable).
- `companies_with_stats` `reloptions` null (security definer). `count(*)` on the view and on `companies` were both 5957. Public SELECT policy is `USING (true)`. `relforcerowsecurity` is false.

## Commands

```bash
sudo pg_ctlcluster 17 main start
bash scripts/move-sec-p1-001/prove.sh
```

`prove.sh` drops and recreates database `move_sec_p1_001`, loads the fixture, snapshots privileges, applies `supabase/migrations/20261110160000_move_sec_p1_001.sql`, runs the checks, applies `supabase/rollback/20261110160000_move_sec_p1_001_rollback.sql`, diffs the snapshots, then reapplies the forward migration.

Postgres: `PostgreSQL 17.11 (Ubuntu 17.11-1.pgdg24.04+2)`.

## Privilege snapshot before (fixture = captured prod grants)

```
consume_network_auth_handoff(text,text) anon=true authenticated=true service_role=true public=false search_path=public
local_canary_movers_for_county(text,text,integer) anon=true authenticated=true service_role=true public=false search_path=public
mth_directory_health() anon=true authenticated=true service_role=true public=true search_path=public
mth_get_directory_company(text) anon=true authenticated=true service_role=true public=true search_path=public
mth_publish_directory_company(jsonb) anon=true authenticated=true service_role=true public=true search_path=public
refresh_moving_company_review_stats(uuid) anon=true authenticated=true service_role=true public=true search_path=public
trg_refresh_company_review_stats() anon=true authenticated=true service_role=true public=true search_path=public
anon.content=true
anon.email_hash=true
anon.rating=true
anon.reviewer_email=true
anon.reviewer_name=true
anon.status=true
anon.submitter_ip=true
anon.user_id=true
authenticated.content=true
authenticated.email_hash=true
authenticated.rating=true
authenticated.reviewer_email=true
authenticated.reviewer_name=true
authenticated.status=true
authenticated.submitter_ip=true
authenticated.user_id=true
service_role.content=true
service_role.email_hash=true
service_role.rating=true
service_role.reviewer_email=true
service_role.reviewer_name=true
service_role.status=true
service_role.submitter_ip=true
service_role.user_id=true
companies_with_stats.reloptions=null
```

## Privilege snapshot after the forward migration

```
consume_network_auth_handoff(text,text) anon=false authenticated=false service_role=true public=false search_path=public, pg_temp
local_canary_movers_for_county(text,text,integer) anon=false authenticated=false service_role=true public=false search_path=public, pg_temp
mth_directory_health() anon=false authenticated=false service_role=true public=false search_path=public, pg_temp
mth_get_directory_company(text) anon=true authenticated=false service_role=true public=false search_path=public, pg_temp
mth_publish_directory_company(jsonb) anon=false authenticated=false service_role=true public=false search_path=public, pg_temp
refresh_moving_company_review_stats(uuid) anon=false authenticated=false service_role=true public=false search_path=public, pg_temp
trg_refresh_company_review_stats() anon=false authenticated=false service_role=true public=false search_path=public, pg_temp
anon.content=true
anon.email_hash=false
anon.rating=true
anon.reviewer_email=false
anon.reviewer_name=true
anon.status=true
anon.submitter_ip=false
anon.user_id=false
authenticated.content=true
authenticated.email_hash=false
authenticated.rating=true
authenticated.reviewer_email=false
authenticated.reviewer_name=true
authenticated.status=true
authenticated.submitter_ip=false
authenticated.user_id=false
service_role.content=true
service_role.email_hash=true
service_role.rating=true
service_role.reviewer_email=true
service_role.reviewer_name=true
service_role.status=true
service_role.submitter_ip=true
service_role.user_id=true
companies_with_stats.reloptions=security_invoker=true
```

`mth_get_directory_company` keeps `anon=true`. That is the one exception, explained below. `authenticated` EXECUTE was also removed on all seven functions because no caller uses that role.

## Rollback diff

`diff -u scripts/move-sec-p1-001/out/before.txt scripts/move-sec-p1-001/out/after-rollback.txt` exited 0 with an empty diff. `has_function_privilege` for anon, authenticated, service_role, and public, the `search_path` settings, the column SELECT privileges, and `companies_with_stats.reloptions` matched the pre-migration snapshot.

After rollback, anon `SELECT reviewer_email` returned `secret-reviewer@example.com` again.

Reapplying the forward migration then succeeded: anon publish and anon `reviewer_email` were denied again, and service_role publish of the existing proof row returned `existing = true`.

## Results

| Check | Result | Evidence |
| --- | --- | --- |
| anon EXECUTE `mth_publish_directory_company` | PASS | `ERROR: permission denied for function mth_publish_directory_company` |
| anon EXECUTE health, refresh, consume, canary | PASS | same permission-denied error for each |
| service_role publish | PASS | `{"slug": "sec-p1-proof", "existing": false, "company_id": "sec-p1-proof"}` |
| service_role health / consume / canary / get | PASS | health JSON includes `companies_table_exists`; consume and canary counts are 0; get returns `Seed Co` |
| in-function publish role check | PASS | after a temporary `GRANT EXECUTE` to anon, inside a rolled-back transaction: `ERROR: permission denied for function mth_publish_directory_company` with `CONTEXT: PL/pgSQL function mth_publish_directory_company(jsonb) line 18 at RAISE`. No `blocked` row remained. |
| anon SELECT of the four PII columns | PASS | `reviewer_email`, `email_hash`, `submitter_ip`, `user_id` each returned permission denied for anon. `authenticated` `reviewer_email` denied. |
| public review fields | PASS | anon query of `id, company_id, reviewer_name, rating, title, content, photo_urls, move_date, created_at, owner_response, owner_response_at, dispute_status` where `status = 'approved'` returned `Public Reviewer` / rating 5. The email was not in the result. |
| service_role PII | PASS | `secret-reviewer@example.com`, `hash-secret`, `203.0.113.10`, `33333333-3333-3333-3333-333333333333` |
| anon public get | PASS | `mth_get_directory_company('seed-co')` as anon with JWT role `anon` returned `Seed Co` |
| review stats trigger | PASS | service_role insert still ran the trigger. `approved_review_count` became 2. |
| `companies_with_stats` security invoker | PASS | owner count 3, anon count 3 |
| rollback privilege diff | PASS | empty diff |
| reapply | PASS | anon publish and anon email denied again; service_role publish returned `existing = true` |

Public review query (the column list from `getApprovedReviews` in `lib/reviews/queries.ts`):

```
22222222-2222-2222-2222-222222222222 | 11111111-1111-1111-1111-111111111111 | Public Reviewer | 5 | Careful crew | They wrapped every piece... | [] | 2026-04-01 | ... | Thanks for the note | 2026-04-02 | none
(1 row)
```

## App checks

- `npx tsx --require ./scripts/stub-server-only.cjs --test lib/supabase/browser-auth-security-followup.test.ts` — 9 passed, 0 failed, including `county canary RPC is server-only and uses the service role`.
- `npx tsc --noEmit` does **not** pass on this repo. With `--max-old-space-size=6144` it reported 542 existing errors. `next.config.ts` sets `typescript.ignoreBuildErrors: true`. None of the errors are in `lib/local-movers/canary-county-movers.ts` or the new test. `lib/reviews/queries.ts(176,53)` has a pre-existing `TS2352` on a cast this PR does not change. The public review column list still typechecks as part of that file's existing query.
- `npm run lint` (`next lint`) cannot complete: the repo has no ESLint config, and Next.js 15 prompts to create one. `next.config.ts` sets `eslint.ignoreDuringBuilds: true`. No ESLint config was added.
- Local production build passed. Command (URL is the public canonical project, used only so the build guard can run; it was not written to an env file):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://arepfylnilkjmyduhwbz.supabase.co \
NODE_OPTIONS=--max-old-space-size=6144 \
npm run build
```

Guard output: `OK: Supabase project guard passed local`. Next.js 15.5.19 finished with exit 0. The build log says `Skipping validation of types` and `Skipping linting` because `next.config.ts` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`.

## Apply order, when someone later applies this outside production-from-this-PR

Ship the canary service-role caller before or with the migration. `service_role` already has EXECUTE, so the new code works before the migration. Applying the migration first would make the old anon canary call fail until that code is deployed. Do not apply this migration to production as part of opening the PR.
