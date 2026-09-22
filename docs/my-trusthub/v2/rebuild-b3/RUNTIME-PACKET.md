# Move V2-3 runtime packet — PREPARED / UNAPPLIED

Base `01aa71fc32981eecdd4934397ef12b3b3665bb86`; Ask #185 interface
`7184f53706f6ab8b94d6151794a3b54f090a6662`. Production and hosted activation HOLD.
No target, credential, service key, alias or hosted environment was provisioned.
Local PostgreSQL fixtures and ephemeral test keys are not deployment material.

## Activation dependencies

1. Builder 4/Bot Team completes parent Gate 1 and connectivity, including the
   reviewed pg_net absence checks. Move must never use the parent runtime login.
2. Approve an isolated Move source target, dedicated credential and platform ACL
   packet. Reject production Move `arepfylnilkjmyduhwbz` and production Ask
   `qvvxvbcdmbjzrgvwjatw`. A new ref or operator GUC is not proof of isolation.
   If co-located on isolated parent `xkkiicsassizmakcvxml`, separately approve that
   arrangement and coordinate parent teardown/role assertions. There is no
   implicit shared-database authorization or cross-store access.
3. Resolve the alias-to-SHA decision with Builder 4. The current contract pins
   the historical Move alias in `lib/my-trusthub/config.ts`; it does not identify
   this new branch automatically. Do not enable the old implementation, change
   one peer's origin alone, or trust a new Vercel host by suffix/wildcard.
4. Apply only after separate authorization, independently pinning the hosted
   target outside SQL and using `ON_ERROR_STOP`: `source-forward.sql`, then
   `source-login-forward.sql`, then `source-assertions.sql`. Operator attestation
   `mth.v23_isolated=approved` is mandatory but is not host verification.
   SQL creates no password. Require `MOVE_V23_SOURCE_PACKET_ASSERTIONS_PASS` and
   reviewed platform effective privileges (including PUBLIC functions). No
   production migration or automatic migration directory is used.
5. Certify session affinity for the separate Move login before enabling it.
   Direct TLS is usable only with an approved Vercel-reachable network route.
   Supavisor must be port 5432 session mode, pinned host, project-qualified Move
   login, hostname-verified CA; port 6543/transaction pooling is rejected.
   The prepared `scripts/probe-v23-source-session.mjs` is not run by CI or this
   ticket. After authorization, invoke with `node --import tsx --require
   ./scripts/stub-server-only.cjs scripts/probe-v23-source-session.mjs` and require
   `MOVE_V23_SOURCE_SESSION_PARITY_PASS`. It checks separate backends, transaction
   rollback/savepoint, SET/RESET ROLE, session locks, timeouts and clean login.
   Neither local direct tests nor Ask's probe certifies Move hosted parity.
6. Only then provision separate Ask/Move Ed25519 keys through the reviewed secret
   channel, configure both peers, and perform new composed preview verification.
   Real Journey QA is explicitly **not ready**.

## Environment contract (names, never values of secrets)

All flags default off. `VERCEL_ENV=production` always denies V2-3 assembly.
The server requires `VERCEL_ENV=preview`, `MTH_MOVE_PARENT_SAVE_MODE=isolated`,
`MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED=true`,
`NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED=1`, `NEXT_PUBLIC_MOVE_V23_LOCAL_ONLY=1`,
and both `MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN` / `MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN`
equal the exact reviewed constants. Build the isolation flag into the client;
do not change only a server runtime value after a build.

Source metadata: `MTH_MOVE_SOURCE_PACKET_APPROVED=true`,
`MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND`, `MTH_MOVE_SOURCE_DATABASE_HOST`, and
`MTH_MOVE_SOURCE_DATABASE_MODE=DIRECT|SUPAVISOR_SESSION`. Session mode also needs
`MTH_MOVE_SOURCE_SESSION_PARITY_APPROVED=true` backed by the actual probe result.
The probe itself needs explicit `MTH_MOVE_SOURCE_PROBE_AUTHORIZED=true`.

Secrets: `MTH_MOVE_PARENT_SAVE_DATABASE_URL`, `MTH_MOVE_PARENT_SAVE_DATABASE_CA`,
`MY_TRUSTHUB_V23_MOVE_SIGNING_PRIVATE_KEY_PEM`; peer verification material:
`MY_TRUSTHUB_V23_ASK_VERIFY_PUBLIC_KEY_PEM`; reviewed key identifiers:
`MY_TRUSTHUB_V23_MOVE_KEY_ID` / `MY_TRUSTHUB_V23_ASK_KEY_ID`.
Optional fixed-peer protection secret:
`MTH_MOVE_PARENT_SAVE_PARENT_PROTECTION_BYPASS`.
No secret has a `NEXT_PUBLIC_` prefix. The source login must be
`mth_move_profile_transfer_preview`, with only non-inheriting, SET-capable,
non-admin membership in `mth_move_profile_transfer`. Pool max 2; login limit 4.
Connection reset failure destroys the connection. No in-memory fallback exists.

## Runtime and retention

Canonical mount is `CompanyResearchHero` on `/companies/[slug]`. Only exact
PUBLISHABLE Hindman (`usdot-1002530`, reviewed mover mapping) is admitted by this
packet. A stored local Save is additionally required. Directory cards, auto
transport and `/company/[slug]` do not acquire the conversion by inference.

Browser routes use same-origin POST, strict Origin/Fetch Metadata, server-minted
HttpOnly binding, CSRF and durable quotas. Callbacks verify exact raw-body
Ed25519 assertions and atomic receiver nonces. `resolve` reads current exact
public identity independently of any parent binding or source stage. Binding
metadata is then read through the signed parent service channel.

Source records contain selected profile identities/revision/digest, exact binding,
browser hash, continuation and opaque receipt context only. Stage lifetime is at
most 10 minutes; retained receipt mapping and browser registration are bounded
at 24 hours. Nonces retain through assertion expiry plus 2 seconds; one SQL insert
claims a nonce atomically across instances. Bounded opportunistic cleanup runs
on requests. There is no Watch, notes/tool import, raw user/session identity or
parent commit authority. Missing responses cannot produce a browser Save claim.

Every finish requires a fresh popup proof resolution; receipts and acknowledgments
cannot replace it. The popup checks exact origin, window source, message keys and
outstanding attempt. Account switching/sign-out fails closed. Same-owner recovery
may verify a retained receipt without authorizing a new commit. Local Save remains.

## Rollback — separately authorized only

Turn off the preview gate and drain requests/connections first. Run
`source-login-rollback.sql`, then `source-rollback.sql`, with the independently
verified isolated target and approval GUC. The scripts refuse unexpected role
membership/active login dependencies and remove only this private source packet.
Local forward/assertions/rollback were executed against disposable PostgreSQL;
no hosted schema or data was changed. Parent packet teardown is a separate task.

## Preview production-backend audit

The existing preview's public Move target is the production project. It is **not**
relabeled as an isolated database. The narrow local-only fence disables legacy
Auth and writes while retaining public research reads; it does not repoint general
production functionality. Hosted preview activation stays BLOCKED until that
fence is built, verified and the approved source/parent configuration is ready.

| Client/surface used by profile/research path | Classification under fence | Enforcement |
| --- | --- | --- |
| `lib/supabase/queries/companies.ts` anonymous directory reader | PRODUCTION READ-ONLY | Public key, GET/HEAD REST only; shared guarded fetch rejects writes/Auth/RPC |
| `exact-publication.ts` | PRODUCTION READ-ONLY | Fixed public Move target; exact ID+slug GET, no cache/redirect, public key only |
| `lib/supabase/server.ts`, public reviews queries | PRODUCTION READ-ONLY | Cookies ignored, no cookie writes, GET/HEAD REST only |
| `attributed-review-count.ts` total reader | PRODUCTION READ-ONLY | Anonymous select only; per-profile count uses stored data, no database mutation |
| Legacy browser client / Save SDK Auth | UNUSED | Browser factory returns null; local Save explicitly skips legacy Auth |
| Admin client, map assignments and review identity bridge | UNUSED | Admin configuration unavailable, factory denies; in particular opportunistic legacy review identity backfill cannot run |
| Legacy Auth middleware, login/callback, server actions | UNUSED | No Auth refresh; middleware denies auth routes and non-V2-3 POST writes |
| Compare API | PRODUCTION READ-ONLY | Only existing GET `/api/compare/companies` is allowed |
| New source PostgreSQL pool | PREVIEW (prepared, inactive) | Approved isolated target, dedicated login, TLS and capability/platform checks |
| Native PostgreSQL test runner | LOCAL | Loopback disposable PostgreSQL 17, ephemeral credentials, fixture public/parent ports |

The profile's customer-integration public reader is an existing fixed-service GET,
not a Move Supabase client. GA/PostHog/performance injection is disabled under the
fence; new controls/forms opt out of autocapture. Protocol refs travel only in
bounded POST bodies or designed HttpOnly storage, never GET URLs. Server errors
are generic and new runtime code has no private payload/assertion logging.
