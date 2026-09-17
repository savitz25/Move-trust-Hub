# MoveTrustHub Sentry reference (ATH-REL-002A)

Error monitoring + tracing for `www.movetrusthub.com`. Wave 1 only. Do **not** rename Ask project `javascript-nextjs`.

Production deploy is **not** authorized by this packet. Stop at PR until a separate CoS/founder GO.

## Identities

- Org: `ask-trust-hub` (US, `https://us.sentry.io`)
- Move project slug: `movetrusthub` (created 2026-09-17; team `ask-trust-hub`; repo `savitz25/Move-trust-Hub` linked)
- Ask project slug: `javascript-nextjs` — **do not rename**
- Site: `https://www.movetrusthub.com`

## Required Vercel env vars

Set on the Move Vercel project. Copy values from Sentry → Settings → Client Keys / Auth Tokens. **Do not paste DSN or tokens into git, PRs, or chat logs.**

| Name | Vercel type | Environments | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SENTRY_DSN` | Encrypted / non-sensitive config | Production + Preview | Browser ingest DSN from project `movetrusthub` |
| `SENTRY_DSN` | Encrypted / non-sensitive config | Production + Preview | Server/edge ingest DSN (same value as the public DSN is fine) |
| `SENTRY_ORG` | Config | Production + Preview | `ask-trust-hub` |
| `SENTRY_PROJECT` | Config | Production + Preview | `movetrusthub` |
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

- Production `tracesSampleRate` 0.1, preview 0.25, development 1.0
- Tunnel, health, BBB/FMCSA refresh, and cron transactions are dropped (refresh **runners themselves are not edited**)

## Production closeout probe (after CoS deploy GO only)

Leave `SENTRY_PROBE_ENABLED` unset/`false` on production until CoS GO. Do not fire this probe before that.

1. Set `SENTRY_PROBE_ENABLED=true` on Production only.
2. `POST https://www.movetrusthub.com/api/internal/sentry-probe` with `Authorization: Bearer <SENTRY_PROBE_SECRET>`.
3. Confirm the issue in org `ask-trust-hub` / project `movetrusthub`, environment `production`, release = deploy SHA, mapped stack, runtime/route tags.
4. Set `SENTRY_PROBE_ENABLED=false` immediately.

Unauthenticated GET/POST without the flag returns 404.

## Alerts (clone of Ask ATH-REL-001B)

Exact Ask rules live on project `javascript-nextjs` (do not change them). Recreate the same four classes on **Move project `movetrusthub`**, **environment = production only**.

Sentry MCP in this session can create projects but **cannot create issue-alert rules** (no `create_alert_rule` / workflow-write tool, and no `SENTRY_AUTH_TOKEN` in the agent environment). Create these in the UI after the project exists, or via `POST https://us.sentry.io/api/0/projects/ask-trust-hub/movetrusthub/rules/` with an org token that has `alerts:write`.

Ask source-of-truth (verified 2026-09-17):

| Move name | Ask source | Frequency | Environment | Trigger | Filter | Action / ownership |
| --- | --- | --- | --- | --- | --- | --- |
| ATH-REL-002A New Production Issue | ATH-REL-001B New Production Issue (`4717893`) | 30 min | production | First seen event | none | Email **issue owners**, fallthrough **ActiveMembers**. Reliability / owners. |
| ATH-REL-002A Production Regression | ATH-REL-001B Production Regression (`4722227`) | 30 min | production | Regression event | none | Email **issue owners**, fallthrough **ActiveMembers**. Reliability / owners. |
| ATH-REL-002A Production Error Spike | ATH-REL-001B Production Error Spike (`4731116`) | 60 min | production | Every event | Event frequency count **≥ 10 / 1 hour** | Email **team `ask-trust-hub`**. Reliability / owners. |
| ATH-REL-002A High-Impact Recurring | ATH-REL-001B High-Impact Recurring (`4285295`) | 60 min | production | Existing high-priority issue **AND** every event | Unique users **≥ 3 / 1 hour** (filter logic any-short) | Email **founder** (Ask target user id `4984460`). High-Impact → founder escalate **only**. |

### UI steps (Sentry Alerts → Issue Alerts → Create Alert, project `movetrusthub`)

1. Open https://ask-trust-hub.sentry.io/alerts/rules/ and switch project to `movetrusthub`.
2. **New Production Issue:** Environment `production`. When `A new issue is created`. Then `Send a notification via email` to Issue Owners (fallthrough Active Members). Frequency 30 minutes.
3. **Production Regression:** Environment `production`. When `A resolved issue becomes unresolved` (regression). Email Issue Owners / Active Members. Frequency 30 minutes.
4. **Production Error Spike:** Environment `production`. When `An event is seen`. Filter `The issue is seen more than 10 times in 1 hour`. Email team `ask-trust-hub`. Frequency 60 minutes.
5. **High-Impact Recurring:** Environment `production`. When `An event is seen` **and** `The issue is high priority` (existing high-priority issue). Filter `The issue affects more than 3 unique users in 1 hour`. Email the founder member only (same person as Ask rule 4285295). Frequency 60 minutes. Do **not** route this class to the general team.

Leave alerts enabled in Sentry; they only fire on `production`. They become operationally live after CoS deploy GO + verified probe.

## Hard exclusions (this packet)

Do not edit or invoke:

- `/api/refresh/fmcsa` and FMCSA refresh runner/cron
- stuck-run clear / regulatory ingestion / Supabase schema
- Profile Save / My TrustHub / auth UX journeys
- other hubs (Wave 2+)
