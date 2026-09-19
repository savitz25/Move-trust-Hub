# V2-3 isolated Move → parent QA: recovery-first specification

2026-09-19. Founder clarification controls this document. No currently active,
approved isolated parent/BFF/database environment has been identified on this
computer. This does **not** establish that none exists elsewhere. Laptop
configuration/environment suitability is **NEEDS FOUNDER/LAPTOP VERIFICATION**.
Prior ephemeral branches described by the founder were deleted; their records
are historical evidence, not active endpoints or reusable credentials.

No production Supabase connection, environment pull, provisioning, credential
creation, migration application or paid service is authorized or performed here.
Recover and validate an existing environment first; do not create a duplicate.

## Evidence and ownership

- Move PR157 implementation `9f0b7563235b5130d59408c3a0237f025d7f5095`.
- Ask PR185 frozen interface `26c4e9ed5c2d6ed8fbf3b3712516b7bbfdee3cd2`;
  runtime inspected/tested `2e7a467ec8b0f959a7a77dfbde64956b23fc2322`.
- Ask files below are relative to that immutable revision, not claims about a
  later head. Reconcile later Builder 4 changes before wiring an environment.
- Builder 4 owns parent bindings/browser confirmation/transaction authority;
  Builder 3 owns Move bindings/store/identity mapper. Neither substitutes a
  fixture caller for real Auth. Both deployed dependency factories remain null.

## Minimum dependency inventory

| Classification | Requirement / repository evidence | Acceptance gate |
| --- | --- | --- |
| REQUIRED; ALREADY PRESENT IN REPOSITORY | Ask `supabase/migrations/20260907160000_my_trusthub_identity_foundation.sql` (P11/P11B); schemas `extensions`, `network`, `consumer`, `ops`, extension `btree_gist`, Supabase-managed `auth` | Actual schema, constraints, roles and owner isolation match migration; not merely a migration-history row |
| REQUIRED; ALREADY PRESENT IN REPOSITORY | `20260907190000_my_trusthub_saved_projects_guest_import.sql` (P12) | `consumer.require_user`, `save_entity`, saved entities and optional Project membership; Save uniqueness and owner checks under real authenticated roles |
| REQUIRED; ALREADY PRESENT IN REPOSITORY | `20260907220000_my_trusthub_cross_hub_handoffs.sql` (P13), `pgcrypto` | Browser intent/state/nonce, atomic consume, current subject, issuer/audience, quota and hub registry verified |
| REQUIRED; ALREADY PRESENT AS PROPOSAL ONLY | Ask `docs/my-trusthub/v2/V2-3-parent-storage-proposal.sql`: `ops.v23_profile_runtime_records`, `ops.v23_profile_runtime_quota` | Reviewed isolated migration, explicit narrowly scoped permissions/RLS, transactional Save + receipt, concurrency/rollback tests; proposal currently grants no usable access |
| REQUIRED; ALREADY PRESENT AS PROPOSAL ONLY | Move `V2-3A-source-storage-proposal.md`: private `mth_profile_transfer.stages` | Durable insert/lock semantics, hashed ticket/browser binding, expiry, retry retention, quota and audited runtime role; no public table access |
| REQUIRED | Exact published Move profile read model and reviewed parent network binding | Native Company.id + class `mover`, publication and exact network binding checked at commit; no slug-as-parent-ID or fuzzy matching |
| REQUIRED | Isolated Ask Auth + application DB + P13 broker + Move BFF/storage | Every connection independently classified; no production fallback, including legacy Move provider reads/pulls |
| OPTIONAL | Project creation/assignment | Not needed for first Save; required for the subsequent Project-success/failure matrix |
| OPTIONAL | Separate hosted Move database branch | Not inherently required: a reviewed local isolated Move data service/store may suffice; full real profile-page QA needs its actual read-model dependencies |
| NEEDS FOUNDER/LAPTOP VERIFICATION | Existing approved project/local stack, service identities, email sink, CAPTCHA domain configuration and prior approval | Record sanitized provenance, owner, expiry, deployed revisions and isolation proof before any login/write |

Apply order in a **future separately authorized isolated run**: managed Supabase
Auth prerequisites → P11 → P12 → P13 → reviewed isolated registry/identity seed
→ reviewed V2-3 parent/source migrations and least-privilege policies → adapters.
Do not blindly replay all migrations: later repository migrations include Watch,
Alerts, notification and export work outside this minimum. Compare recovered
schema with required definitions and retain compatible hardening. Ask foundation
tests: `supabase/tests/p11_identity_foundation.sql`,
`p12_saved_projects_guest_import.sql`, `p13_cross_hub_handoffs.sql`.
These SQL tests may write fixtures and must only run after isolated authorization.

A Move fixture containing only the public Company row is enough for mapper tests,
not proof that a complete Next profile route's views/RPCs exist. Before full-page
QA, capture its read dependency closure on the selected immutable code and supply
only isolated public fixture data. Never clone private production research/users.
Observed historical candidate `usdot-1002530` /
`hindman-isaacs-moving-storage-inc` is not an approved network binding. A synthetic
binding proves protocol behavior only; the real published-profile acceptance gate
requires reviewed binding provenance, even if reproduced in an isolated DB.

## Auth, ordinary users and browser boundary — REQUIRED

Use two ordinary parent consumers A/B with distinct isolated Auth subjects and
approved test inboxes/mail sink; neither needs the founder canary claim. Use
isolated invitation admission with trusted server eligibility, not user_metadata.
Include an unverified/denied identity and a business-role negative fixture.
No new test users are created by this specification. Existing test users must be
verified as isolated before reuse; otherwise creation needs separate approval.

Enable email confirmation, match application password policy (12–128 characters),
verify provider security/leaked-password protection and rate limits, recovery and
PKCE callback behavior. Do not set the security-ready flag as a substitute for
checking settings. Auth Site URL and exact redirect allowlist must target only the
approved Ask origin/callback. Verify actual email sink/approved inbox delivery;
no production mail, no pasted passwords/tokens/links. Existing approved CAPTCHA
configuration must cover the isolated origin; required-but-missing tokens deny.
Mocked/test CAPTCHA is not a passed real-provider CAPTCHA journey.

Verify persistent/refresh cookies, cross-site form POST and browser state binding,
CSRF/Origin/Fetch-Metadata, sign-out/account switch and expiration. HTTPS previews
must be exact allowlisted origins, not wildcard trust in all Vercel deployments.
Two distinct local origins are also possible if approved and cookie behavior is
tested; test every auth/database target before permitting browser form submission.

## Service and runtime bindings — REQUIRED, not yet deployable

Ask JSON facade: POST `/api/my-trusthub/profile-save`, version
`v2-3/parent-runtime/1`; no invented replacement endpoint. The separate browser
form confirmation/return route must be supplied by Builder 4 before live QA.
Move source POST uses the same path on the **Move** origin, never a shared cookie.

P13 registry contains `urn:trusthub:move`, `urn:trusthub:ask:bff`,
`svc:trusthub:move:bff:v1` and `myth_bff_move`; broker stays parent-only.
Validate actual issuer/audience mapping against the runtime, source hub `move`,
target `ask`, matching exact origins and current verified parent session.
V2-3 BFF capabilities include `transfer:stage` and `receipt:verify`; parent commit
requires `saved:write`. The P13 seed's scope list does **not** already include the
two new V2-3 scopes. Their narrow channel/registry mapping requires review; do not
blindly broaden every hub's scopes or distribute broker credentials.

P12 transaction identity must resolve through `consumer.require_user()` to the
verified parent subject. Separate broker authorization from consumer write
authority; no shared broad service-role bypass or browser-selected subject.
Source stages and parent confirmation snapshot must bind the exact selected
manifest through an authenticated server channel. Atomic Save+receipt and source
retry locking need real PostgreSQL tests, not only the existing SQLite harness.

Registry staging/development origins and bounded Move `/companies/{slug}` return
constructor must match the chosen pair. Existing Ask `p13-runtime.ts` is a
production-only Contractor flow with fixed origins; do not reuse/enable it for
Move preview or alter Contractor. Move's canonical Supabase build guard can also
reject an isolated target under CI/production-build conditions. A narrowly tested
isolated allowlist path is needed before a full preview build; do not bypass the
guard, spoof CI or supply a production URL merely to build.

## Environment-variable inventory — NAMES ONLY

No values, credentials or allowlist contents are recorded. Presence in code is
not verification of any deployed setting. Configure nothing in this run.

| Classification | Component | Names / binding status |
| --- | --- | --- |
| REQUIRED; ALREADY PRESENT | Ask origin/backend pair | `VERCEL_ENV`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_MY_TRUSTHUB_SUPABASE_URL`, `NEXT_PUBLIC_MY_TRUSTHUB_SUPABASE_PUBLISHABLE_KEY`, `MY_TRUSTHUB_NONPRODUCTION_APPROVED`, `MY_TRUSTHUB_TEST_ORIGIN`, `MY_TRUSTHUB_TEST_SUPABASE_URL` |
| REQUIRED; ALREADY PRESENT | Ask admission/registration | `MY_TRUSTHUB_ENABLED`, `MY_TRUSTHUB_ACCESS_MODE`, `MY_TRUSTHUB_SIGNUP_ENABLED`, `MY_TRUSTHUB_AUTH_SECURITY_READY`, `MY_TRUSTHUB_INVITED_EMAILS`, `MY_TRUSTHUB_INVITED_USER_IDS` |
| REQUIRED; ALREADY PRESENT | Auth CAPTCHA | `NEXT_PUBLIC_MY_TRUSTHUB_TURNSTILE_SITE_KEY`; provider-side secret is an Auth setting, not a new frontend variable |
| REQUIRED; ALREADY PRESENT | Ask V2-3 gates | `MY_TRUSTHUB_V23_PROFILE_SAVE_ENABLED`, `MY_TRUSTHUB_SAVED_ENABLED`, `MY_TRUSTHUB_SPECIALIST_HANDOFF_ENABLED` |
| OPTIONAL; ALREADY PRESENT | Project matrix | `MY_TRUSTHUB_PROJECTS_ENABLED` |
| REQUIRED to inspect, not change here | Safety gates | `MY_TRUSTHUB_WATCH_ENABLED`, `MY_TRUSTHUB_ALERTS_ENABLED`, `MY_TRUSTHUB_SOURCE_MONITORING_ENABLED`, `MY_TRUSTHUB_EMAIL_ENABLED` |
| REQUIRED; ALREADY PRESENT | Move gates | `NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED`, `MTH_MOVE_PARENT_SAVE_MODE` |
| REQUIRED for full Move app; ALREADY PRESENT | Move legacy public client/build | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ENFORCE_CANONICAL_SUPABASE`, `CI`, `NODE_ENV`; all database clients must target isolated resources |
| NEEDS FOUNDER/LAPTOP VERIFICATION | Existing parent connection convention | `MY_TRUSTHUB_P13_DATABASE_URL`, `MY_TRUSTHUB_DATABASE_CA`; existence is not permission to reuse, and the old production pool is not the V2-3 binding |
| REQUIRED interface work | V2-3 scoped channel, source store, current-parent grant, canonical pair and parent form target | Dependency-injection ports exist; final deployment variable names are NOT DEFINED by the frozen interface. Builder 4/3 must publish reviewed names before configuration; do not invent credentials/env keys |

## Recovery suitability checklist — NEEDS FOUNDER/LAPTOP VERIFICATION

Record only sanitized evidence: approval reference, environment owner/lifetime,
exact Ask/Move commits, origin→callback→Auth→DB→BFF target map, schema versions,
role/capability names, mail sink classification, ordinary-user availability and
retention policy. Compare identifiers privately against production deny lists;
do not copy secrets or laptop .env files into commits/chat. Deleted branch URLs,
expired credentials, a green preview or a historical PASS are not suitability
proof. If recovered configuration is incomplete, keep gates closed and list the
specific gap; do not start a credential hunt or provision a second environment.

## Expected execution sequence after separate environment/test approval

1. Pin both commits; classify every outbound client without sending Auth forms.
   Prove no production destination, redirect, fallback or shared production pool.
2. Review schema/roles/migrations and tested rollback in the isolated target;
   run P11/P12/P13 ownership/RLS assertions plus V2-3 PostgreSQL concurrency tests.
3. Verify ordinary A/B admission, signup-paused returning login, CAPTCHA/email,
   session persistence, recovery and account switch. No founder-entitlement proxy.
4. Guest Save a reviewed published Move profile; reload local disclosure. Select
   only that profile; stage bounded manifest via CSRF-protected source BFF.
5. Form POST continuation → verify parent session/P13 → explicit destination and
   selection confirmation → exact binding/publication recheck → durable Save and
   receipt → server-verified Move return. Local notes/tools/copy remain unchanged.
6. Retry after lost response/restart, duplicate/replayed handoff, expiry, forged
   receipt, wrong issuer/audience/browser/digest, A→B/signout, unsupported/unbound
   profile, unpublished profile and storage failure. No new-owner success.
7. Optional Project success, already-member and Project failure: one parent Save,
   separate Project acknowledgment, unchanged local research, zero Watch/Alert.
8. Browser 1440/390/320, keyboard/status/focus, exact deployed revision and safe
   logs. Independently verify A cannot read B, business roles cannot read either.
   Record MOCKED versus real provider/PostgreSQL/browser evidence separately.

## Teardown — future approved isolated scope only

Close new staging first; retain legitimate receipts/retry metadata until reviewed
expiry. Revoke isolated test sessions/service access before deleting test users;
user deletion alone is not token invalidation. Stop only this QA's helpers and
capture sanitized results. For a recovered/shared laptop environment, preserve
it and other owners' data: remove only approved test fixtures after dependency
checks. For a separately approved disposable branch, confirm exact nonproduction
branch/project and owner before deletion, remove only its preview bindings and
verify billing stopped. Never merge the branch into production, toggle production
notifications, delete founder research or restore a stale production snapshot.

## Optional new ephemeral branch: estimate, NOT authorization

Official pricing checked 2026-09-19: default Micro preview compute starts at
$0.01344/hour; no fixed branch fee. One branch: 8h ≈ $0.11, 24h ≈ $0.32, 72h ≈
$0.97 compute. If two hosted isolated databases are ultimately necessary, double
those compute amounts (24h ≈ $0.65). Disk/egress/storage/other usage and any plan
eligibility costs are additional and unverified. Compute credits do not cover
branch compute, and branch usage is not protected by Spend Cap. This is not a
total-cost quote or purchase approval. Recheck before any future authorization.
[Supabase branching usage and pricing](https://supabase.com/docs/guides/platform/manage-your-usage/branching).
Existing recovered local infrastructure avoids new hosted branch compute but may
have its own existing costs; do not assert it is free or currently available.

## Work that continues now

Continue deterministic identity/staging/receipt/UI tests, typed interface review,
unapplied storage/permission design and failure handling. Do not use missing live
infrastructure to block that work or to label mocked sync integrated. Supabase
skill guidance informed ownership, privilege and teardown requirements; no DB
verification query is run because live access is outside this authorization.

V2-3 CODE WORK = CONTINUE  
ISOLATED BACKEND = PENDING FOUNDER/LAPTOP VERIFICATION  
NEW ENVIRONMENT PROVISIONING = NOT AUTHORIZED  
PRODUCTION = HOLD
