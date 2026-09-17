# TRUST-SEC-001 — Move app/BFF compatibility probe (post Wave 0)

**Hub:** MoveTrustHub (`savitz25/Move-trust-Hub`) only  
**Date:** 2026-09-17  
**Production:** HOLD — no `merge_branch`, no prod DDL, no production deploy  
**M1 compatibility readiness:** **VERIFIED** (live Wave 0 branch `tzzcogaricohtezsugjr`)

Wave 0 DB remediations on ephemeral branches revoked `anon`/`authenticated` EXECUTE on privileged SECURITY DEFINER RPCs (`consume_network_auth_handoff`, `mth_publish_directory_company`) and related `network_auth_handoffs` grants. Role matrices passed. This document is the **app/BFF caller map** plus live probe evidence.

**Do not** restore `anon`/`auth` EXECUTE or weaken RLS to make a probe pass.

## Status

| Gate | Result |
|------|--------|
| Code-trace of production callers | **VERIFIED** — D1/D2 privileged RPCs already go through Next BFF + `service_role` |
| Runtime BFF rewrite required | **No** — no browser or user-JWT path calls revoked RPCs; no grant restored |
| Live probe vs Wave 0 branch | **PASS** 2026-09-17 against `https://tzzcogaricohtezsugjr.supabase.co` (`sec001-p2-probe`, parent `arepfylnilkjmyduhwbz`, migration `sec001_p2_m1_move_revoke_privileged_rpcs`) |
| Move M1 overall | **VERIFIED** — critical D1/D2/D3 + handoff table probes passed; CoS may upgrade M1 PARTIAL → VERIFIED |
| Production | **HOLD** |

Live method: PostgREST with the **branch anon** key (public API the Next server uses for D3). Privileged BFF paths exercised as PostgreSQL role `service_role` (the role the BFF `SUPABASE_SERVICE_ROLE_KEY` maps to) — insert/consume handoff, publish company, table SELECT. Branch `service_role` JWT was not present in this agent env, so PostgREST was not separately called with that JWT; SQL `SET ROLE service_role` is the same database role. Next preview was **not** retargeted at the branch (canonical-URL guard). Production `www.movetrusthub.com` was **not** used as branch proof.

Ephemeral probe user / handoff / `sec001-probe-company` rows were deleted after the run.

## Founder contract (D1–D3)

| ID | Object | Contract |
|----|--------|----------|
| D1 | `consume_network_auth_handoff` | `SERVICE_ROLE_ONLY`. Browser via BFF only. |
| D2 | `mth_publish_directory_company` | `SERVICE_ROLE_ONLY`. No anon/auth publishing. |
| D3 | `mth_get_directory_company`, `local_canary_movers_for_county` | `PUBLIC_READ` (Wave 0 **did not** revoke these; remaining Advisor WARN pair is M2). |

## Call-site map

### (a) Network auth handoff consume — D1 `SERVICE_ROLE_ONLY`

Browser never calls the RPC. Signed-in cross-hub clicks POST a session JWT to Move’s BFF; the BFF uses `SUPABASE_SERVICE_ROLE_KEY`.

| Step | Surface | Role | Notes |
|------|---------|------|--------|
| Start (signed-in) | Browser `NetworkHandoffLink` → `POST /api/auth/network-handoff/start` | Browser uses **anon only** for `auth.getSession()`. BFF uses **service_role** to `INSERT network_auth_handoffs` | `components/network/network-handoff-link.tsx` → `lib/network/handoff-start-core.ts` → `createNetworkHandoff` |
| Start (guest) | `GET /api/auth/network-handoff/start?to=…` | No RPC. 307 without `code=` | Expected skip: `skip:no_session` |
| Consume | `GET /auth/network-handoff?code=…` (Route Handler, not a Client Component) | **service_role** `rpc('consume_network_auth_handoff')` then admin `generateLink` + cookie `verifyOtp` | `app/auth/network-handoff/route.ts` → `consumeNetworkHandoff` in `lib/network/sso-handoff.ts` (`import 'server-only'`, `createAdminClient()`) |
| Health | `GET /api/auth/network-handoff/health` | **service_role** table head + RPC with impossible hash | Ops probe; no secrets returned |
| Table consumers | `countRecentHandoffs`, create insert, health select | **service_role** only | No `'use client'` file references `network_auth_handoffs` |

`lib/customer-integration/handoff.ts` is an HMAC claim token for Ask Trust Hub, **not** `network_auth_handoffs`.

### (b) Directory publish — D2 `SERVICE_ROLE_ONLY`

| Caller | Surface | Role |
|--------|---------|------|
| `publishCompanyViaRpc` | `lib/suggestions/publish-company-rpc.ts` (`server-only`) | Caller **must** pass admin/`service_role` |
| `insertCompanyWithFallback` | `lib/suggestions/insert-company.ts` | Admin client from approve / local publish / restore scripts |
| `approveSuggestionToCompany` | Admin dashboard / server approve path | `createAdminClient()` |
| `publishLocalDirect` | Server onboarding publish | `createAdminClient()` |
| `scripts/restore-authorized-companies.ts` | Operator script | `SUPABASE_SERVICE_ROLE_KEY` |

No Client Component and no browser `createBrowserSupabaseClient()` path calls `mth_publish_directory_company`.

Companion RPC `mth_directory_health` is also invoked only via that admin helper (migration grants `service_role` only).

### (c) Directory read RPCs — D3 `PUBLIC_READ` (M2, not revoked in Wave 0)

| RPC | Production caller | HTTP | Role |
|-----|-------------------|------|------|
| `mth_get_directory_company` | `getCompanyBySlugOrUsdotFromDb` → `getDirectoryCompanyViaRpc` | Next **RSC/server** (profiles, compare API, enrichment-health, claim handoff, email-mover) — **not** the browser | **anon** PostgREST key from the Node process |
| `mth_get_directory_company` | Approve/repair after publish | Server | **service_role** (also valid) |
| `local_canary_movers_for_county` | `getCanaryMoversForCounty` → county local-movers pages | Next **RSC/server** (`server-only`) | **anon** |

These are **not** “browser calls Supabase”. They are Next server reads with the public key, which matches D3. Wave 0 left anon EXECUTE in place. If a live branch returns permission denied here, that is a Wave 0 regression against D3 — do **not** “fix” by re-granting privileged RPCs; report it.

Primary directory browse (`GET /api/directory/companies`, `queryDirectoryPage`) uses PostgREST `companies` SELECT with anon, not these RPCs.

### (d) Consumer lookups on `network_auth_handoffs`

Only three production TypeScript call sites, all admin:

1. `lib/network/sso-handoff.ts` — rate-limit `select` + create `insert`
2. `app/api/auth/network-handoff/health/route.ts` — existence `select`
3. Consume path uses the RPC, not a table `update` from the app

No save-my-move, quote, directory, or portal feature reads this table.

## Probe matrix

Live 2026-09-17 against branch `tzzcogaricohtezsugjr`. Production `www.movetrusthub.com` is **not** branch proof (prod has **not** been migrated).

| route/action | expected | actual | HTTP/API | role used | branch/project | regression Y/N | security contract preserved Y/N |
|--------------|----------|--------|----------|-----------|----------------|----------------|----------------------------------|
| Browser `NetworkHandoffLink` click | POST BFF; never `rpc(consume_…)` | PASS (code-trace: BFF only; static lock green) | `POST /api/auth/network-handoff/start` | Browser: anon session. RPC: service_role | tzzcogaricohtezsugjr | N | Y |
| Guest start (Next preview) | 307, no `code=` | NOT RUN (no branch-wired preview; not production) | `GET /api/auth/network-handoff/start` | none | n/a | n/a | n/a |
| BFF insert `network_auth_handoffs` | service_role insert succeeds | PASS (row inserted) | SQL `SET ROLE service_role` INSERT (BFF equivalent) | service_role | tzzcogaricohtezsugjr | N | Y |
| BFF consume minted hash | returns user; replay empty | PASS (`out_user_id` match; replay 0 rows) | SQL `consume_network_auth_handoff` | service_role | tzzcogaricohtezsugjr | N | Y |
| Anon consume real minted hash | permission denied (D1) | PASS `42501` | SQL `SET ROLE anon` | anon | tzzcogaricohtezsugjr | N | Y |
| Auth consume | permission denied (D1) | PASS `42501` | SQL `SET ROLE authenticated` | authenticated | tzzcogaricohtezsugjr | N | Y |
| Anon `POST /rest/v1/rpc/consume_network_auth_handoff` | permission denied (D1) | PASS HTTP 401 | PostgREST | anon | tzzcogaricohtezsugjr | N | Y |
| Service role consume impossible hash | executable; empty | PASS `[]` | SQL `SET ROLE service_role` | service_role | tzzcogaricohtezsugjr | N | Y |
| Anon `SELECT network_auth_handoffs` | denied | PASS `42501` SQL; HTTP 401 PostgREST | SQL + `GET /rest/v1/network_auth_handoffs` | anon | tzzcogaricohtezsugjr | N | Y |
| Auth `SELECT/INSERT network_auth_handoffs` | denied | PASS `42501` | SQL `SET ROLE authenticated` | authenticated | tzzcogaricohtezsugjr | N | Y |
| Anon `INSERT network_auth_handoffs` | denied | PASS `42501` | SQL `SET ROLE anon` | anon | tzzcogaricohtezsugjr | N | Y |
| Service role table head | readable | PASS count=0 then probe row | SQL `SET ROLE service_role` | service_role | tzzcogaricohtezsugjr | N | Y |
| Anon `mth_publish_directory_company` | permission denied (D2) | PASS `42501` SQL; HTTP 401 PostgREST | SQL + `POST /rest/v1/rpc/mth_publish_directory_company` | anon | tzzcogaricohtezsugjr | N | Y |
| Auth publish | permission denied (D2) | PASS `42501` | SQL `SET ROLE authenticated` | authenticated | tzzcogaricohtezsugjr | N | Y |
| Service role publish invalid `{}` | validation error, no insert | PASS `P0001 payload requires id, slug, and name` | SQL `SET ROLE service_role` | service_role | tzzcogaricohtezsugjr | N | Y |
| Service role publish real payload | publisher path writes | PASS `{existing:false, slug:sec001-probe-company}` then deleted | SQL `mth_publish_directory_company` | service_role | tzzcogaricohtezsugjr | N | Y |
| Anon `mth_get_directory_company` | PUBLIC_READ (D3) | PASS SQL slug + PostgREST HTTP 200 | SQL + `POST /rest/v1/rpc/mth_get_directory_company` | anon | tzzcogaricohtezsugjr | N | Y |
| Anon `local_canary_movers_for_county` | PUBLIC_READ (D3) | PASS SQL count 0; PostgREST HTTP 200 `[]` | SQL + `POST /rest/v1/rpc/local_canary_movers_for_county` | anon | tzzcogaricohtezsugjr | N | Y |
| `GET /api/directory/companies` | Next server anon SELECT | NOT RUN (no branch-wired preview) | App HTTP | Next server anon | n/a | n/a | n/a |
| `GET /api/auth/network-handoff/health` | service_role health | NOT RUN (no branch-wired preview; not production) | App HTTP | service_role | n/a | n/a | n/a |

EXECUTE grants on branch (SQL `has_function_privilege`): consume/publish/health **anon=false auth=false sro=true**; get_directory/canary **anon=true auth=true sro=true**. Table `network_auth_handoffs`: anon/auth SELECT+INSERT **false**; service_role SELECT+INSERT **true**.

## How to run live probes (when branch env exists)

### 1. Env vars

Use the **ephemeral Wave 0 branch** API URL and keys from Supabase branching. Never point this script at production `arepfylnilkjmyduhwbz`.

| Variable | Required | Purpose |
|----------|----------|---------|
| `SUPABASE_BRANCH_URL` | yes (or `MOVE_SEC001_SUPABASE_URL`) | `https://<branch_ref>.supabase.co` |
| `SUPABASE_BRANCH_ANON_KEY` | yes (or `MOVE_SEC001_ANON_KEY`) | Branch **anon** `public` key |
| `SUPABASE_BRANCH_SERVICE_ROLE_KEY` | yes (or `MOVE_SEC001_SERVICE_ROLE_KEY`) | Branch **service_role** secret |
| `MOVE_APP_BASE_URL` | optional | Preview/app origin for HTTP probes (not `https://www.movetrusthub.com` for M1 VERIFIED) |
| `PROBE_ALLOW_PRODUCTION` | must stay unset | Script refuses canonical/forbidden production project refs |

Do **not** set `NEXT_PUBLIC_SUPABASE_URL` to a branch inside CI/production builds: `lib/supabase/canonical-project.ts` rejects non-`are` hosts when `CI=true`. The probe script talks to PostgREST directly and does not import that guard.

If you temporarily run Next against a branch locally:

```bash
ALLOW_NON_CANONICAL_SUPABASE=1
NEXT_PUBLIC_SUPABASE_URL=https://<branch_ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 2. Static call-site lock (no secrets)

```bash
npm run assert:trust-sec-001-app-bff
```

### 3. Live PostgREST (+ optional app HTTP)

```bash
export SUPABASE_BRANCH_URL='https://<branch_ref>.supabase.co'
export SUPABASE_BRANCH_ANON_KEY='...'
export SUPABASE_BRANCH_SERVICE_ROLE_KEY='...'
# optional:
# export MOVE_APP_BASE_URL='https://<vercel-preview>'

npm run probe:trust-sec-001-app-bff
```

Equivalent curl (consume, anon — expect deny after Wave 0):

```bash
curl -sS -o /tmp/sec001-anon-consume.json -w '%{http_code}\n' \
  -X POST "$SUPABASE_BRANCH_URL/rest/v1/rpc/consume_network_auth_handoff" \
  -H "apikey: $SUPABASE_BRANCH_ANON_KEY" \
  -H "Authorization: Bearer $SUPABASE_BRANCH_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"p_code_hash":"0000000000000000000000000000000000000000000000000000000000000000","p_to_hub":"move"}'
```

Equivalent curl (consume, service_role — expect executable, empty result):

```bash
curl -sS -X POST "$SUPABASE_BRANCH_URL/rest/v1/rpc/consume_network_auth_handoff" \
  -H "apikey: $SUPABASE_BRANCH_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_BRANCH_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"p_code_hash":"0000000000000000000000000000000000000000000000000000000000000000","p_to_hub":"move"}'
```

Publish probe uses an **invalid** payload (`{}`) so service_role must not insert a directory row.

Without branch env the live script prints `SKIPPED` and exits 0. That is **not** a pass.

### 4. Promoting M1 PARTIAL → VERIFIED

Completed 2026-09-17 on `tzzcogaricohtezsugjr` (not production):

1. Anon + authenticated consume/publish/table = denied  
2. Service role consume (minted + fake hash) + publish (validation and real disposable row) = executable  
3. Anon directory read RPCs = allowed  
4. Preview app HTTP still optional / not required for D1–D3 grant compatibility  
5. Matrix `actual` filled above  
6. Still no production DDL — **HOLD**

## Out of scope (this probe)

- Lender/Care/Investor hubs  
- D5 `quote_requests` (`lib/quotes/persist.ts` still has an `anon_no_return` fallback — separate ticket)  
- M2 conversion of D3 RPCs to SECURITY INVOKER  
- Search RPCs `directory_search_suggestions` / `directory_exact_display_name_count` (PUBLIC_READ, not in Wave 0 revoke list)
