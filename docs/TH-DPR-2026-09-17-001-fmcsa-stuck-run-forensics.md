# TH-DPR-2026-09-17-001 — FMCSA stuck-run forensics

**Audience:** CoS / founder  
**Classification:** READ-ONLY. No production mutation. Stuck run was **not** cleared. Refresh was **not** triggered.  
**Overall status: PARTIAL**  
**Vercel runtime logs: BLOCKED — TH-OBS-GAP-VERCEL**  
**Date of this packet:** 2026-09-17 (founder-update pass 2 same day)

---

## Founder update — link MoveTrustHub Vercel (obs only)

Correct project identity (from GitHub Vercel status on prod SHA `331699bd`, not from Vercel MCP):

| Field | Value |
|---|---|
| Team slug | `savitz25-s-projects` |
| Team id (MCP, first pass) | `team_1vxGqSSLGF4xmg7XRqpkLSKi` |
| Project slug | **`move-trust-hub`** |
| Dashboard | https://vercel.com/savitz25-s-projects/move-trust-hub |
| Deployment live at stuck cron | https://vercel.com/savitz25-s-projects/move-trust-hub/6mLqDvj9L4a3x2XwUyByKGTFjjQB (`331699bd`, GitHub deploy `6043922000`, 2026-08-23T03:21:18Z) |

This cloud environment **cannot** attach that project:

| Probe (pass 2) | Result |
|---|---|
| Vercel MCP | `namespaceStatus=needsAuth`. `mcp_auth` fails: interactive MCP login is **Cursor desktop only**, not Cloud Agent. |
| First pass (same run) | MCP was authed to the team; `list_projects` still returned **`[]`** — token/team visible, **project list empty**. `get_project('move-trust-hub')` 404. |
| `npx vercel whoami` | `loggedIn: false`, `login_required`. No `VERCEL_TOKEN` / `VERCEL_*` in env. No `.vercel/project.json`. |
| `request-environment-setup-actions` | Not used (this is not an `/env-setup` run). |

**How to link (so the next forensic pass can read logs):**

1. **Cursor Desktop MCP:** Settings → MCP → Vercel → Sign in as the founder account that owns `savitz25-s-projects` / `move-trust-hub`. Re-run `list_projects`; it must return `move-trust-hub`, not `[]`. Then `get_runtime_logs` with `teamId=team_1vxGqSSLGF4xmg7XRqpkLSKi`, `environment=production`, `query=/api/refresh/fmcsa`.
2. **Cloud Agent secret (required for this VM):** on the personal environment [6438ba01…](https://cursor.com/dashboard/cloud-agents/environments/e/6438ba01-b2e2-11f1-b1a4-22e19564fdc0) add `VERCEL_TOKEN` with **read** scope for that team (plus optional `VERCEL_ORG_ID=team_1vxGqSSLGF4xmg7XRqpkLSKi` and `VERCEL_PROJECT_ID=prj_…` from Project Settings → General). Then `npx vercel logs <deployment-url> --since 2026-08-23T04:50:00Z` works without `vercel login`.
3. Copy `prj_…` from the dashboard; do not guess slugs — MCP 404'd `move-trust-hub` even when the GitHub URL proves that slug.

Until (1) or (2) lands, invocation-level timeout/crash and post-Aug-23 Vercel cron GET proof stay **BLOCKED**. Aug 23 lines may still be outside Pro log retention; **recent** `/api/refresh/fmcsa` skip invocations would still answer question 3 going forward.

---

## Expanded CoS questions (pass 2)

| # | Question | Status | Answer |
|---|---|---|---|
| 1 | Execution for stuck run `0e5cd955-…` | **VERIFIED** | Vercel GET cron `mode=full` at 2026-08-23 05:00:58 UTC inserted the row, then sequentially fetched+wrote **222** live `companies` rows until 05:02:52 UTC. |
| 2 | Timeout / crash / kill / lost completion write | **PARTIAL** | **Orphaned mid-loop.** Lost-completion-only **ruled out**. Kill reason **BLOCKED** (TH-OBS-GAP-VERCEL). |
| 3 | Did Vercel cron keep invoking after Aug 23? | **BLOCKED** (Vercel) / **VERIFIED** (GitHub) | GitHub yes, 401. Vercel GET cron **not observable**. |
| 4 | Blocked by stale running row? | **VERIFIED** | Code skip-if-running + zero later run rows. GitHub never reached the lock. |
| 5 | Any invocation fetched FMCSA successfully? | **VERIFIED** | **Yes, this run:** 222/222 of the written companies have full `fmcsa_raw` (`legalName` present, ~1.5KB census snapshot). 0 name-search fallbacks. **After Aug 23: no.** |
| 6 | Rows staged / normalized / published before failure? | **VERIFIED** | This pipeline writes **directly to live `companies` + `fmcsa_change_log`**, not `federal_hhg_staging`. Before death: **222 companies published** (161 `authority_active=true`, 61 false, 1 OOS); **76** with change-log diffs (51 critical). Staging/wave/`move_v2` were **not** written by this invocation. |
| 7 | Defect layer? | **VERIFIED** | **Cron sizing + lock-without-TTL + completion bookkeeping.** Fetch/parse/company DB write **worked** until interrupt. Run-row counters/`finished_at` never flushed. |

---

## Status by CoS question

| # | Question | Status | One-line answer |
|---|---|---|---|
| 1 | What happened during the run that created this row? | **VERIFIED** | Vercel Sunday full cron at 05:00:58 UTC inserted `full-2026-08-23`, then wrote ~222 company FMCSA updates for ~114s, then stopped mid-loop. |
| 2 | Timed out / crashed / lost completion write / orphaned? | **PARTIAL** | **Orphaned running row after mid-loop interrupt.** Completion write never reached. Timeout vs crash vs hang-until-300s **not distinguishable** without Vercel invocation logs. Lost-completion-write-only is **ruled out**. |
| 3 | Did subsequent scheduled refreshes attempt (Aug 23 forward)? | **PARTIAL** | **GitHub Actions: YES, daily, 401 before runner.** **Vercel cron GET: not observable** (TH-OBS-GAP-VERCEL). DB shows **zero new run rows** after this one. |
| 4 | Did the stale running row block later refreshes? | **VERIFIED (code + DB effect)** | `force=false` skip-if-running returns the same UUID and inserts nothing. No later `fmcsa_refresh_runs` row exists. GitHub never reached this gate (401). |
| 5 | Did any later run acquire or publish FMCSA rows? | **VERIFIED** | **No.** `companies.fmcsa_last_checked` / `updated_at` freeze at 2026-08-23 05:02:52 UTC. HHG staging/wave and `move_v2` FMCSA releases also have **zero** post-stuck writes. |
| 6 | Clearing this row alone sufficient? | **VERIFIED** | **No as durable fix.** Clear unblocks the lock; next weekly `mode=full` against unlimited batch on a 300s function will re-orphan. Underlying refresh defect remains. |

---

## Hard stops honored

- Did not `UPDATE`/`DELETE` `fmcsa_refresh_runs`.
- Did not call `GET`/`POST /api/refresh/fmcsa`.
- Did not dispatch GitHub `FMCSA Refresh`.
- Remediation below is a **draft packet only**.

---

## TH-OBS-GAP-VERCEL (exact gap)

Vercel runtime/deployment logs for the stuck invocation **were not accessible from this agent**.

| Probe | Result |
|---|---|
| Vercel MCP `list_teams` | Team `savitz25's projects` / `team_1vxGqSSLGF4xmg7XRqpkLSKi` (Pro) visible |
| Vercel MCP `list_projects` (team id and slug) | Empty project list |
| Vercel MCP `get_project` (`move-trust`, `move-trust-hub`, `movetrusthub`, `Move-trust-Hub`, `move-trust-hub-mh69`) | 404 |
| Vercel MCP `get_deployment` (`move-trust-nz7h1qd6c-savitz25-s-projects.vercel.app`) | 404 `not_found` |
| Vercel CLI | Not installed in this environment |
| `.vercel/project.json` | Absent in repo |
| GitHub production deployment hostname (proxy only) | `https://move-trust-nz7h1qd6c-savitz25-s-projects.vercel.app` (deployment `6043922000`, SHA `331699bd`) |

Even with project access, Pro runtime-log retention is typically days, not 25 days. Aug 23 05:00 UTC invocation lines are almost certainly expired.

**What this gap blocks:** FUNCTION_INVOCATION_TIMEOUT vs unhandled exception vs OOM vs hang-until-kill for the stuck invocation; whether Vercel cron GETs after Aug 23 actually hit `/api/refresh/fmcsa`.

**What this gap does not block:** run-row provenance, mid-loop side effects, skip-if-running behavior, later acquisition freeze, GitHub Actions attempts.

---

## 1) What happened during the run that created this row

### Trigger (VERIFIED)

`public.fmcsa_refresh_runs` row:

| Field | Value |
|---|---|
| `id` | `0e5cd955-eb75-4f0b-9e9f-1dd65a6a4280` |
| `idempotency_key` | `full-2026-08-23` |
| `mode` | `full` |
| `status` | `running` |
| `triggered_by` | `cron` |
| `companies_total` | `1000` |
| `companies_processed/updated/failed` | `0 / 0 / 0` |
| `error_summary` | `null` |
| `started_at` | `2026-08-23 05:00:58.872719+00` |
| `finished_at` | `null` |
| `metadata` | `{"limit": 10000}` |

That timestamp is Sunday 05:00:58 UTC = 01:00:58 AM EDT, matching `vercel.json` cron:

```json
{ "path": "/api/refresh/fmcsa?mode=full", "schedule": "0 5 * * 0" }
```

Vercel Cron invokes **GET**. Route maps GET → `triggeredBy: 'cron'` when auth is the cron bearer (`app/api/refresh/fmcsa/route.ts`).

GitHub Actions weekly full is `15 5 * * 0` (~05:15+ UTC) and uses POST. It is **not** this row (`triggered_by` would be `github`). The GH full job that day ran at **05:40 UTC** and **401'd** (run `32620953081`).

### Production SHA at invocation (VERIFIED)

GitHub Production deployment immediately before the cron:

- Deployment id `6043922000`
- Created `2026-08-23T03:21:19Z`
- SHA **`331699bd4ef7769d6dbf19103ae0265db0f1856e`**
- Hostname `move-trust-nz7h1qd6c-savitz25-s-projects.vercel.app`

Runner skip / finish paths last changed in **`236c7f724656e290e939ee77f3c7f4a8c8fe15c6`** (2026-07-20). Route `maxDuration = 300` since **`97a1aef40755b6167437c8136e380e51e2b06a36`** (2026-07-02). Current `main` (`560a3ac5…`) still has the same skip + no-`try/finally` finish write.

### Work the process actually did (VERIFIED)

The run row counters stay at 0 because they are written only **after** the company loop (`lib/fmcsa/refresh/runner.ts` completion `update`). Side tables prove the loop started:

- `fmcsa_change_log` for this `run_id`: **127 rows**, 76 distinct companies
- Window: `2026-08-23 05:00:59.583` → `05:02:52.891` UTC
- Fields: `fmcsa_legal_name` 76 info, `authority_active` 50 critical, `out_of_service` 1 critical
- `companies.fmcsa_last_checked` in `05:00:58`–`05:02:53` UTC: **222 companies**
- Writes were continuous at ~1–3/sec, then **hard stop** at 05:02:52

`companies_total = 1000` with `metadata.limit = 10000` is the PostgREST default **max_rows=1000** cap, not the true USDOT universe (4768 companies with USDOT at forensic time). `fullBatchSize` is `0` → runner uses `10000` (`lib/fmcsa/refresh/rate-limit.ts`).

### Prior successful Vercel incrementals (context)

Only four `fmcsa_refresh_runs` rows exist in production, all `triggered_by=cron`:

| started_at UTC | key | mode | status | processed |
|---|---|---|---|---|
| 2026-08-19 06:02:57 | incremental-2026-08-19-06 | incremental | completed | 80 |
| 2026-08-20 06:00:27 | incremental-2026-08-20-06 | incremental | completed | 72 |
| 2026-08-22 06:00:29 | incremental-2026-08-22-06 | incremental | completed | 80 |
| 2026-08-23 05:00:58 | **full-2026-08-23** | **full** | **running** | **0 (counters never flushed)** |

No `incremental-2026-08-21-06` row (cron miss or fail-before-insert **before** this incident).

---

## 2) Timed out / crashed / lost completion write / orphaned?

### Orphaned: YES (VERIFIED)

Code path:

1. Insert `status='running'`, `finished_at=null`.
2. Loop companies (FMCSA HTTP + DB updates). No heartbeat of `companies_processed`.
3. Only after the loop: `update` status/`finished_at`.
4. **No `try/finally`.** Timeout, crash, OOM, or thrown error leaves the row `running` forever.
5. Skip-if-running (`force=false`) then treats that row as a live lock.

`app/api/refresh/fmcsa/route.ts` sets `maxDuration = 300` on nodejs runtime. Full mode asks for 1000 (effectively) carriers with 250ms inter-request delay plus API latency — not completable in 300s. Incremental 80-company runs finished in ~32–45s, which is why they completed.

### Lost completion write only: NO (VERIFIED)

If the loop had finished and only the final `update` failed, we would expect ~1000 `fmcsa_last_checked` stamps in the window (or far more than 222). We have **222** then silence. The completion `update` was never reached.

### Timeout vs crash vs hang: PARTIAL (BLOCKED on Vercel logs)

Facts that survive without logs:

- Last side-effect write **~114s** after start (`05:02:52`), not at 300s.
- Remaining ~186s of `maxDuration` could be a **hang on company 223** (name-search / retries) until platform kill, **or** a crash/OOM at 114s. Both orphan the row the same way.
- Process is **not still running**: no company/`change_log` writes after 05:02:52 through 2026-09-17.

Cannot confirm `FUNCTION_INVOCATION_TIMEOUT` vs exception without TH-OBS-GAP-VERCEL.

---

## 3) Did subsequent scheduled refreshes attempt to run (Aug 23 forward)?

### GitHub Actions fallback: YES, failed at auth (VERIFIED)

Workflow `.github/workflows/fmcsa-refresh.yml` (`15 6 * * *` incremental, `15 5 * * 0` full) kept firing. Sample:

| Run | When UTC | Job | Result |
|---|---|---|---|
| `32620953081` | 2026-08-23 05:40 | full | **401** `curl: (22)` |
| `32624494792` | 2026-08-23 07:02 | incremental | **401** |
| `32701721546` | 2026-08-24 07:29 | incremental | **401** |
| `35217340272` | 2026-09-17 11:45 | incremental | **401** |

Every inspected log shows `CRON_SECRET:` **empty** and `SITE_URL: https://www.movetrusthub.com`. Auth never reached `runFmcsaRefresh`, so GitHub could not skip-or-insert a run row.

This 401 stream also exists **before** the stuck row (e.g. Aug 22 07:00 run `32558443225`). GitHub was already a dead fallback; Vercel GET cron was the only working scheduler.

### Vercel GET cron after Aug 23: NOT OBSERVABLE (PARTIAL / TH-OBS-GAP-VERCEL)

Expected invocations if crons still fire:

- Daily `GET /api/refresh/fmcsa?mode=incremental` at 06:00 UTC (`0 6 * * *`)
- Weekly `GET …?mode=full` Sundays 05:00 UTC (Aug 30, Sep 6, Sep 13)

`force` is false on cron GET. Skip-if-running **returns 200 with `skipped: true` and does not insert**. Therefore **absence of new run rows does not prove cron did not fire**.

Supabase `postgres_logs` (last 24h only) did not contain `fmcsa_refresh_runs` SQL around 2026-09-17 06:00 UTC. Default Postgres logging is errors, not successful SELECTs, so that is **not** a negative proof.

---

## 4) Did the stale running row block later refreshes?

**If a caller reached `runFmcsaRefresh` with `force=false`: YES (VERIFIED in code at SHA `331699bd` / `236c7f72`).**

```ts
const { data: running } = await supabase
  .from('fmcsa_refresh_runs')
  .select('id, status')
  .eq('status', 'running')
  .maybeSingle();

if (running) {
  return { runId: running.id, status: 'running', skipped: true,
           skipReason: 'Another refresh run is in progress' };
}
```

Empirical:

- `count(*)` of `status='running'` = **1** (this UUID only)
- Runs after this `started_at` = **0**
- Admin path defaults `force: true` (`actions/fmcsa-refresh.ts`) and **could** bypass; no `triggered_by='admin'` row exists after Aug 23, so nobody used that bypass.

GitHub POSTs never hit this gate (401). Vercel GETs would have been blocked **if they ran**.

---

## 5) Did any later run acquire or publish FMCSA rows?

**No (VERIFIED).**

| Surface | Last write | After stuck run? |
|---|---|---|
| `companies.fmcsa_last_checked` | 2026-08-23 05:02:52.712+00 (222 that day; 80 on Aug 22; 4466 on Aug 20) | **0** |
| `companies.updated_at` | 2026-08-23 05:02:52.780+00 | **0** |
| `fmcsa_change_log` | 2026-08-23 05:02:52.891+00 | **0** |
| `federal_hhg_staging` | retrieved/updated 2026-08-20 13:52–13:53 | **0** of 52563 |
| `federal_hhg_staging_run` | last start 2026-08-20 13:53:39 | **0** of 2 |
| `federal_hhg_wave_publication` | last published 2026-08-21 02:23:54 | **0** of 4473 |
| `move_v2.fmcsa_source_release` | last retrieved 2026-08-16 20:56:48 | **0** of 7 (all already `PUBLISHED`) |
| `move_v2.pipeline_run` | last 2026-08-17 12:56:27 | **0** of 26 |
| `move_v2_refresh_job` | `FMCSA_FRESHNESS` PREVIEW COMPLETE 2026-08-17 18:41:57 | none later |

Directory USDOT freshness is frozen: 4768 with USDOT, 4769 with `fmcsa_last_checked`, newest check = stuck-run stop time.

Opening DPR `n_live_tup=0` vs later exact counts (companies 5957, staging 52563, wave 4473) is a stats-visibility issue, **not** “never populated.” Population happened **before and during** this run; the gap is **refresh stall after orphan lock**, not acquisition-never-ran.

---

## 6) Is clearing this row alone sufficient?

**Clearing is necessary to unblock cron `force=false`. It is not sufficient as the fix.**

Why the next full cron will re-orphan without a code change:

1. `fullBatchSize: 0` → attempt thousands of FMCSA HTTP calls in one serverless invocation.
2. PostgREST still caps the select at 1000 unless paginated / `max_rows` raised.
3. `maxDuration = 300` cannot finish that work (incremental 80 ≈ 45s; 1000 ≈ 10×+).
4. No `try/finally`, no stale-lock TTL, no processed heartbeat.
5. Skip-if-running has **no age cutoff**, so the next orphan locks the pipeline again.
6. `lib/fmcsa/refresh/batch-runner.ts` exists and is used by **scripts**, not by `/api/refresh/fmcsa`.
7. Independent: GitHub fallback `CRON_SECRET` is empty → 401, so it cannot recover you.

Clear-only is a **lock release**, not a **refresh repair**.

---

## Pass 2 addendum — fetch / publish / defect layer

### Successful FMCSA fetches (this invocation only)

All **222** companies with `fmcsa_last_checked` in `05:00:58`–`05:02:53` UTC have:

- `fmcsa_raw` present (min 1423 / avg 1549 / max 1650 chars)
- `legalName` on the snapshot (DOT census shape: `dotNumber`, `phyCity`, `commonAuthorityStatus`, `_supplemental`, …)
- **0** `_lookupMeta` name-search recoveries — these were primary DOT lookups

First writes: `san-juan-moving-company` DOT 4030647 at 05:00:59.305, then `hylan-moving`, `teamworx-moving-llc` at ~0.5s cadence.

`fmcsa_change_log` for this `run_id`: 76 companies, 51 critical (`authority_active` 50 + `out_of_service` 1), 76 info (`fmcsa_legal_name`).

No later invocation (Vercel or GitHub) produced another fetch: newest `fmcsa_last_checked` remains 05:02:52.712.

### Staged vs published

`runFmcsaRefresh` does **not** write `federal_hhg_staging` / wave / `move_v2`. It normalizes the QCMobile snapshot in-process and **publishes onto live `public.companies`**. Those 222 rows are live directory updates, not a rolled-back staging batch. HHG staging (52563) and wave (4473) last moved Aug 20–21, before this run.

### Defect layer (not fetch/parse)

| Layer | This incident |
|---|---|
| Fetching | Worked for 222 sequential DOT lookups |
| Parsing | Worked (typed snapshot + raw jsonb) |
| Company DB write | Worked (companies + change_log) |
| Cron | **Defect:** weekly full, `fullBatchSize=0`, 300s GET |
| Locking | **Defect:** skip-if-running, no TTL, no heartbeat |
| Completion bookkeeping | **Defect:** no `try/finally`; counters/`finished_at` never written |

---

## Recommended remediation packet (DRAFT ONLY — do not execute)

**Packet id:** TH-REM-2026-09-17-001  
**Depends on:** founder/CoS authorization after this forensic hold.  
**Must not:** fire production `mode=full` on the current 300s route.

### A. Code (land before or with lock clear)

1. **`try/finally` in `runFmcsaRefresh`** — on any exit, write `status` (`failed`/`partial`/`completed`), `finished_at`, counters, `error_summary`. Treat Abort/timeout as `failed`.
2. **Stale-lock TTL** — skip-if-running ignores `status='running'` when `started_at` is older than `maxDuration + slack` (recommend 15 minutes). Optionally auto-mark those rows `failed` with `error_summary='stale lock TTL'`.
3. **Heartbeat** — update `companies_processed` every N companies so a future orphan is diagnosable from the run row.
4. **Fit work to 300s** — set `fullBatchSize` to a budgeted N (80 is proven) **or** point cron at `runFmcsaBatchRefresh` with offset checkpoint. Do not pass `limit: 10000` into one invocation.
5. **Paginate company select** — do not rely on a single `.limit(10000)` through PostgREST (this run’s `companies_total=1000` vs `metadata.limit=10000`).
6. **Skip telemetry** — when skipped, log/alert `skipReason` + blocking `runId` + row age (today this is silent).
7. **GitHub `CRON_SECRET`** — populate the Actions secret so the 401 fallback actually reaches the API. Still keep TTL; a 600s curl cannot finish a 1000-carrier full run either.

### B. Production data (only after A is on the deployment that serves cron)

```sql
-- DRAFT. Do not run until authorized and A is live.
update public.fmcsa_refresh_runs
set status = 'failed',
    finished_at = now(),
    error_summary = 'TH-DPR-2026-09-17-001 forensic orphan clear; mid-loop interrupt; counters never flushed'
where id = '0e5cd955-eb75-4f0b-9e9f-1dd65a6a4280'
  and status = 'running'
  and finished_at is null;
```

Do **not** delete the row (audit). Do **not** immediately trigger `mode=full`.

### C. Canary (authorized, small)

1. Confirm no `status='running'` remains.
2. Allow next **incremental** cron, or admin incremental with `limit` ≤ 80.
3. Expect a **new** run row that reaches `finished_at` and advances `fmcsa_last_checked`.
4. Only then schedule paced full coverage (batched), not one-shot full.

### D. Observability closeout

Grant this (or a follow-on) agent Vercel project scope (`prj_…` for Move Trust Hub) and confirm cron GET `/api/refresh/fmcsa` in runtime logs. Until then TH-OBS-GAP-VERCEL remains for invocation-level kill reason.

---

## Paths / SHAs cited

| Artifact | Path / SHA |
|---|---|
| Cron route | `app/api/refresh/fmcsa/route.ts` (`maxDuration=300`, GET+POST) |
| Runner skip + finish | `lib/fmcsa/refresh/runner.ts` |
| Batch size | `lib/fmcsa/refresh/rate-limit.ts` (`fullBatchSize: 0`) |
| Cron schedule | `vercel.json` `crons` |
| Auth | `lib/fmcsa/refresh/auth.ts` |
| Admin force default | `actions/fmcsa-refresh.ts` (`force ?? true`) |
| Unused-by-cron batcher | `lib/fmcsa/refresh/batch-runner.ts` |
| GH fallback | `.github/workflows/fmcsa-refresh.yml` |
| Run schema | `supabase/migrations/20260702120000_fmcsa_refresh_pipeline.sql` |
| Prod SHA at stuck cron | `331699bd4ef7769d6dbf19103ae0265db0f1856e` |
| Runner last functional change | `236c7f724656e290e939ee77f3c7f4a8c8fe15c6` |
| Pipeline introduction | `97a1aef40755b6167437c8136e380e51e2b06a36` |
| Supabase project | `arepfylnilkjmyduhwbz` (Move-Trust-Hub) |

---

## Reconcile with DPR opening baseline

First-pass `n_live_tup=0` was an opening record only. Exact counts at forensic time: `companies` 5957, `federal_hhg_staging` 52563, `federal_hhg_wave_publication` 4473, plus this stuck full run. Incident type: **acquisition-then-stall / stuck lock blocking refresh**, mixed with a pre-existing GitHub cron-auth failure. Not confirmed data loss; not “never populated.”
