# V2-1 — Move profile Save repair (Builder 3)

## Scope and revision

- Repository: `savitz25/Move-trust-Hub`.
- Worktree: `C:/Users/Michael.Savitsky/mth-v2-1-move-save-b3`.
- Branch: `mth-v2-1-move-save-b3`.
- Base: `5018639dee0901bbc630cafdd633015421f86e00`.
- No overlapping repair PR was open at preflight. PR #151 is separate Sentry work.
- Existing worktrees and unrelated edits were preserved. No production merge/deploy is authorized.
- PR: https://github.com/savitz25/Move-trust-Hub/pull/156.
- Tested runtime commit: `de6f2181c68cc9ea7e4d1b9f8c693dc2dcdc9cef`.
- Preview for that commit: https://move-trust-2gxhk6z5w-savitz25-s-projects.vercel.app (deployment `dpl_C3tB1Xr3ZyQ353MsSZTy8nVXU6we`, successful Vercel check, preview target).
- This handoff's final documentation commit does not change runtime code. The final PR head/preview SHA pair is recorded in the PR validation receipt; use that pair for independent QA.

## Confirmed defect and correction

`CompanyResearchHero` → `SaveMoverButton` under Move's `DeferredSaveMyMove` → fallback context with `loading: true` → disabled button and early-return handler → guest storage never reached.

The wrapper config names 12/45-second delays, but `useDeferredLoad` currently uses `interactionOnly: true` outside account routes: idle/max timers are not armed there. The exact failure is dependence on the deferred provider and its authentication resolution, not a guaranteed fixed-duration timer. The baseline browser fixture reproduced a disabled Save indefinitely while that provider remained unresolved.

Save now imports only its essential runtime on activation and independently calls the existing browser client's `getUser()`. A successful null/no-session result uses guest storage; auth/network failure does not count as guest. The dashboard provider and its loading policy are unchanged. The button imports the lightweight context directly rather than importing through the provider.

One in-memory operation belongs to the current pathname/profile. A synchronous ref blocks repeated activation; unmount/profile navigation aborts unresolved intent. A 15-second bound gives a recoverable status and prevents late module/auth completion from writing. No durable replay queue is introduced. Authentication changes observed during resolution reject the attempt; the existing server action additionally checks the expected user before any mutation. The server remains the source of authorization and retains the `saved_movers` upsert destination and `user_id,company_slug` conflict key.

The local key remains `mth-local-saved-movers`; fields remain `companySlug`, `companyName`, `notes`, `savedAt`. The synchronous write must succeed before local success appears. Read/parse/write failures surface a retry message; corrupt existing data is not replaced. Repeated Saves preserve notes and saved time. Successful local storage plus failed account sync is described as device-only. No claim of parent My TrustHub synchronization is made.

## Evidence

Environment: Windows, Node 22.18.0, npm 10.9.3, TypeScript 5.9.3; existing committed lockfile, `npm ci`. Browser harness uses installed agent-browser 0.37.1 / Chrome, the actual component, wrapper, runtime and localStorage, with deliberately unresolved nonessential provider and mocked auth/cloud adapters. It is served only on `127.0.0.1`; it is not a deployed test route.

| ID | Evidence / outcome |
|---|---|
| B3-01 | Browser component and real local Next profile: first Save enabled; keyboard Enter completed guest write while provider remained unresolved in the fixture. Baseline browser assertion fails: disabled button, auth calls 0, storage empty. |
| B3-02 | Browser + unit: correct slug/key/shape, reload retains Saved and one entry, existing entries/notes preserved. |
| B3-03 | Browser: three immediate activations while auth delayed result in one record and one analytics effect. |
| B3-04 | Browser: unresolved provider does not block; 16-second essential import shows pending then timeout, late arrival writes nothing. |
| B3-05 | Unit + browser with mocked auth: delayed guest/user resolves once; no local write before resolution. |
| B3-06 | MOCKED: actual runtime and server action tested against isolated adapters; existing destination/owner/upsert contract preserved. Real authenticated preview test NOT RUN: no isolated authenticated backend has been established. |
| B3-07 | Unit + browser: navigation cancels old intent; auth switch rejects; mocked server rejects changed owner before creating client/profile/activity/row. |
| B3-08 | Unit + browser: storage errors, corrupt data, auth errors, module failure and timeout never display false success; storage recovery retries successfully; failed module fetch can require reload. |
| B3-09 | Browser component and real local Next profile: native Enter/Space activation/focus, accessible names, busy/pressed state and polite live status; visual inspection and no horizontal overflow at 1440/390/320, including device-success text at 320. Deployed preview inspection requires authorized Vercel browser access. |
| B3-10 | Diff review + mocked server: no signup/account creation in guest path; no parent-account, Watch/Alert, schema, ranking or public-evidence changes. |

Original storage regression run: 3 failures (swallowed write error, corrupt-data replacement, notes lost on repeat). Corrected focused suite: 13 passing tests. `npm test`: passed full existing suite including Ohio, metrics, privacy and vertical separation. `git diff --check`: passed.

`npm run lint` cannot complete because this checkout has no ESLint configuration and Next prompts for setup. No unrelated lint configuration was added. `npm run build` stops at the existing guard because local `NEXT_PUBLIC_SUPABASE_URL` is absent; guard unchanged, no production secrets obtained. Typecheck on isolated base and branch: **532 diagnostics each; zero added, removed or changed**, comparing normalized file/code/full message across all files, excluding harmless line shifts. Both checks fail on the same existing debt. The configured Vercel preview build and GitHub stale-manifest job (including the new focused suite) passed for the runtime commit.

Real local application evidence: `npm run dev -- --hostname 127.0.0.1 --port 4312`, then `/companies/allied-van-lines`, using the existing credential-free seed fallback. Enter and Space produced exactly one `allied-van-lines` record and `Allied Van Lines saved on this device.`; a same-browser reload retained `aria-pressed=true` and the entry. Actual-page screenshots were inspected at all three widths. Local profile rendering logs an existing `buildUnifiedDirectory` cache payload over 2 MB warning; it still rendered and the Save journey passed. This warning was not changed.

Preview guest journey: **NOT RUN**. The fresh browser is redirected to Vercel login. No sharing/bypass credential was generated and protection was not changed. Builder 4 needs existing authorized Vercel browser access to inspect the deployed revision. Real authenticated preview journey also remains **NOT RUN** until its backend is established as isolated. A successful build/HTTP response is not a Save journey pass.

Performance evidence: component fixture keyboard-to-device-save measurements 256 ms initially and 270 ms on the committed runtime with provider unresolved indefinitely. This is an isolated local measurement, not production latency or a claim of no performance regression. No dependencies were upgraded. Auth/Save code loads on explicit Save; no eager dashboard import was added. No representative production bundle-size or Core Web Vitals comparison has been performed.

## Independent reproduction for Builder 4

1. Check out the PR's exact head and run `npm ci`, then `npm run test:v2-1`.
2. Start `node scripts/qa-v2-1-save.mjs`. In another terminal run `node scripts/test-v2-1-browser.mjs` with `AGENT_BROWSER_BIN` pointing to the existing agent-browser executable if not on PATH. All authenticated results are mocked. To reproduce the old disabled control, start the harness with `--baseline`; the first B3-01 assertion must fail.
3. With existing authorized Vercel preview access, use a fresh application guest browser without Move auth cookies. Open `/companies/allied-van-lines` on the attested preview, focus Save promptly after interactivity, activate with Enter, and verify device-only status plus `allied-van-lines` in `mth-local-saved-movers`. Alternatively reproduce the actual local page using the credential-free dev command above; do not supply production secrets.
4. Reload the same browser/origin; verify the entry and Saved state survive. Repeat at 1440, 390 and 320 CSS pixels; inspect focus, text wrapping, control name and live feedback.
5. Use the local harness for delayed auth/module, duplicate, navigation and storage failure tests. Do not create accounts, send magic links or call authenticated preview mutation endpoints unless the backend is independently established as isolated and authorized.
6. If runtime code or preview commit changes after QA, rerun the focused suite, browser matrix and preview guest journey against the new SHA. Documentation-only changes still require matching the final preview to the final PR head.

## Release boundaries and residuals

This is a Move-local repair, not certification of V2/network integration. Ask admission policy and application, Supabase Auth/settings/schema, Vercel env, Watch/Alerts and other hubs are unchanged. A separate safe authenticated backend/test identity is required for real authenticated browser certification. Storage is browser-local and origin-specific. An already-dispatched server save cannot be undone by navigation; it carries the original slug and expected owner and is never replayed into the next profile. A failed runtime chunk may require reload after connectivity recovers.

Production mutations performed: **NONE**.
