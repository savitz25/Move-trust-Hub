# MoveTrustHub Sentry reference (ATH-REL-002A)

Error monitoring + tracing for `www.movetrusthub.com`. Wave 1 only. Do **not** rename Ask project `javascript-nextjs`.

Production deploy is **not** authorized by this packet. Stop at PR until a separate CoS/founder GO.

## Identities

- Org: `ask-trust-hub` (US, `https://us.sentry.io`)
- Move project slug: `movetrusthub-web` (founder-specified; team `ask-trust-hub`)
- Ask project slug: `javascript-nextjs` — **do not rename**
- Do **not** send Move events to leftover project `movetrusthub` (created during this ticket; archive later if unused)
- Site: `https://www.movetrusthub.com`

## Gates 1–5 (required — packet allowed-scope items 1–5)

1. **Sentry project** — `movetrusthub-web` in org `ask-trust-hub` (platform javascript-nextjs). Ask `javascript-nextjs` is not renamed.
2. **SDK** — current `@sentry/nextjs` for Next 15.
3. **Init surfaces** — client `instrumentation-client.ts`, server `sentry.server.config.ts`, edge `sentry.edge.config.ts`; merge into existing `instrumentation.ts` `register()` + `onRequestError`; App Router `global-error.tsx` / `error.tsx` capture.
4. **`next.config.ts`** — `withSentryConfig` around the existing bundle-analyzer wrap. Redirects, headers, `outputFileTracingExcludes`, and `experimental.optimizePackageImports` unchanged.
5. **Env names** — `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_DSN`, `SENTRY_ORG=ask-trust-hub`, `SENTRY_PROJECT=movetrusthub-web`, `SENTRY_AUTH_TOKEN` (build-only), `SENTRY_PROBE_ENABLED` default `false`, `SENTRY_PROBE_SECRET` (≥16 chars). Never commit values.

## Required Vercel env vars

Set on the Move Vercel project. Copy values from Sentry → Settings → Client Keys / Auth Tokens. **Do not paste DSN or tokens into git, PRs, or chat logs.**

| Name | Vercel type | Environments | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SENTRY_DSN` | Encrypted / non-sensitive config | Production + Preview | Browser ingest DSN from project `movetrusthub-web` |
| `SENTRY_DSN` | Encrypted / non-sensitive config | Production + Preview | Server/edge ingest DSN (same value as the public DSN is fine) |
| `SENTRY_ORG` | Config | Production + Preview | `ask-trust-hub` |
| `SENTRY_PROJECT` | Config | Production + Preview | `movetrusthub-web` |
| `SENTRY_AUTH_TOKEN` | Sensitive, **build-only** | Production (Preview optional) | Source map + release upload. Scopes: `project:releases`, `org:read`. Never `NEXT_PUBLIC_*`. |
| `SENTRY_PROBE_ENABLED` | Config | Production only when closeout is authorized | Must stay unset/`false` until CoS deploy GO. Then one POST, then back to `false`. |
| `SENTRY_PROBE_SECRET` | Sensitive | Production (after CoS GO) | Bearer for `/api/internal/sentry-probe`. ≥ 16 characters. Optional alias: `ATH_OPERATOR_SECRET`. |

Release is **not** a Vercel env var. The SDK uses `VERCEL_GIT_COMMIT_SHA` (Vercel injects it).

DSN/org/project are read from env only. The SDK does not hardcode them.

### Blocker: `SENTRY_AUTH_TOKEN`

This agent environment has no Sentry auth token. Until a token with `project:releases` + `org:read` is set on Vercel Production (Sensitive, available to Build), production source-map upload is skipped (`sourcemaps.disable` when the token/org/project are missing so CI still builds). Create the token in Sentry → Settings → Auth Tokens and add it to Vercel; do not paste the value into the PR.

## SDK layout

- Client: `instrumentation-client.ts`
- Node server: `sentry.server.config.ts` via `instrumentation.ts` (existing env sanity check preserved)
- Edge / `middleware.ts`: `sentry.edge.config.ts`
- Source maps: `withSentryConfig` in `next.config.ts` (upload skipped when `SENTRY_AUTH_TOKEN` is missing)
- Release: `VERCEL_GIT_COMMIT_SHA`
- Environment: `lib/analytics/posthog/environment.ts` → `production` \| `preview` \| `development`

## Privacy

Aligned with `lib/analytics/posthog/privacy.ts`:

- `sendDefaultPii: false` and explicit `dataCollection` opt-outs (no user info, no HTTP bodies)
- `beforeSend` strips Ask/search `q`, auth headers, cookies, claim/My TrustHub / Save My Move bodies, notes, and non-UUID user ids
- Private path prefixes include `/my-move`, `/auth`, `/portal`, `/claim`, `/admin`, and matching APIs
- Sentry Session Replay is **off** (no `replayIntegration`; replay worker tree-shaken)
- PostHog Replay and Vercel Analytics are unchanged and separate

## Tracing

- Production `tracesSampleRate` 0.1 (packet band 5–10%; not 100%)
- Preview 0.05 (lower than production)
- Development 1.0
- Tunnel, health, BBB/FMCSA refresh, and cron transactions are dropped (refresh **runners themselves are not edited**)

## Production closeout probe (after CoS deploy GO only)

Leave `SENTRY_PROBE_ENABLED` unset/`false` on production until CoS GO. Do not fire this probe before that.

1. Set `SENTRY_PROBE_ENABLED=true` on Production only.
2. `POST https://www.movetrusthub.com/api/internal/sentry-probe` with `Authorization: Bearer <SENTRY_PROBE_SECRET>`.
3. Confirm the issue in org `ask-trust-hub` / project `movetrusthub-web`, environment `production`, release = deploy SHA, mapped stack, runtime/route tags.
4. Set `SENTRY_PROBE_ENABLED=false` immediately.

Unauthenticated GET/POST without the flag returns 404.

## Alerts (ATH-REL-002A packet table — Ask thresholds as initial standard)

Do **not** edit Ask alerts on `javascript-nextjs`. Recreate these on **`movetrusthub-web`**, environment **production** on all four. No preview/dev. No alert-per-event.

Sentry MCP can create projects but **cannot** create issue-alert rules (no write tool; no org token in this environment). Create in the UI, or `POST https://us.sentry.io/api/0/projects/ask-trust-hub/movetrusthub-web/rules/` with `alerts:write`.

| Rule name | Trigger | Frequency | Destination |
| --- | --- | --- | --- |
| `ATH-REL-002A New Production Issue` | New issue | 30m | Issue Owners / Suggested Assignees / team `ask-trust-hub` (**not** founder-only) |
| `ATH-REL-002A Production Regression` | Resolved → unresolved | 30m | Same as above |
| `ATH-REL-002A Production Error Spike` | Events in issue >10 / 1h | 60m | Team `ask-trust-hub` routing |
| `ATH-REL-002A High-Impact Recurring` | High priority **OR** users >3 / 1h | 60m | Founder escalate only (`savitz25` / makeithappen1; Ask user id `4984460`) |

### UI steps (project `movetrusthub-web`)

1. Open https://ask-trust-hub.sentry.io/alerts/rules/ → project `movetrusthub-web` → Create Alert.
2. **New Production Issue:** Environment `production`. When `A new issue is created`. Email Issue Owners + Suggested Assignees, fallthrough team `ask-trust-hub`. Frequency 30 minutes. Not founder-only.
3. **Production Regression:** Environment `production`. When a resolved issue becomes unresolved. Same destination as #2. Frequency 30 minutes.
4. **Production Error Spike:** Environment `production`. When an event is seen **and** the issue is seen more than 10 times in 1 hour. Email team `ask-trust-hub`. Frequency 60 minutes.
5. **High-Impact Recurring:** Environment `production`. When the issue is high priority **OR** it affects more than 3 unique users in 1 hour. Email founder `savitz25` only. Frequency 60 minutes. Do not route this class to the team.

Leave the rules enabled in Sentry (production filter keeps preview quiet). They become operationally live after CoS deploy GO + verified probe.

## Hard exclusions (this packet)

Do not edit or invoke:

- `/api/refresh/fmcsa` and FMCSA refresh runner/cron
- stuck-run clear / regulatory ingestion / Supabase schema
- Profile Save / My TrustHub / auth UX journeys
- Journey QA remediation
- Ask project rename or Ask alert edits
- other hubs (Wave 2+)

## Builder completion report (this PR)

A. **STATUS:** PARTIAL — SDK + project + docs on PR; prod verify and live alerts require CoS deploy GO + Vercel secrets.
B. **Project:** `movetrusthub-web` (org `ask-trust-hub`, US). DSN **present** in Sentry Client Keys. Value not committed. Ask `javascript-nextjs` unchanged. Leftover `movetrusthub` must not receive Move events.
C. **Files:** `instrumentation.ts`, `instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, `next.config.ts`, `middleware.ts`, `app/error.tsx`, `app/global-error.tsx`, `app/api/internal/sentry-probe/route.ts`, `lib/sentry/*`, `.env.example`, `package.json`, `docs/analytics/sentry-move-reference.md`.
D. **Privacy:** `sendDefaultPii: false`; no HTTP bodies; Authorization/cookies/API keys/notes/claim/Save My Move bodies stripped; Session Replay off.
E. **Environment:** `analyticsEnvironment()` from `VERCEL_ENV` / `NEXT_PUBLIC_VERCEL_ENV`.
F. **Releases/maps:** `VERCEL_GIT_COMMIT_SHA`; upload skipped when `SENTRY_AUTH_TOKEN` missing so CI still builds. **Blocker:** token not in agent or Vercel yet.
G. **Test event:** not fired (probe disabled; production deploy not authorized).
H. **Alerts:** exact names/destinations in the table above — documented; **not created in Sentry** (no alerts:write API in this session).
I. **Gaps:** Vercel DSN + `SENTRY_AUTH_TOKEN`; four UI alerts; CoS GO; leftover `movetrusthub` archive.
J. **Production identities:** PR only this turn. Merge SHA / deploy id after founder merge + CoS GO.
