# Builder 3 current-main rebuild

Branch: `mth-v2-3-move-rebuild-b3`.
Base: `01aa71fc32981eecdd4934397ef12b3b3665bb86`.
Parent contract: Ask #185 `7184f53706f6ab8b94d6151794a3b54f090a6662`.
Old #156/#157 remain OPEN / HOLD at their supplied heads.

Rebuilt from current main after Fable audit; prior #156/#157 evidence retired for final V2-3 certification.

Implementation is ready for code review, **not hosted composition, final Journey
QA or production**. See [port mapping](PORT-AUDIT.md) and the exact prepared
[runtime/SQL/environment packet](RUNTIME-PACKET.md). No hosted mutation, production
configuration, final key generation, alias change, merge or deployment activation
was performed. The current source runtime intentionally returns unavailable
without the separately authorized infrastructure.

## Delivered

- Anonymous Save writes locally before Auth and survives reload. Local evidence
  is distinct from Move account confirmation. The secondary Keep control is
  mounted in the current #164 company hero only after an eligible local Save.
- Concrete `source`, `acknowledge`, and independent fresh `resolve` callback;
  exact PUBLISHABLE identity and reviewed mover mapping; separate current parent
  binding lookup and receipt-time binding recheck.
- Fixed Ed25519 transport in both directions, exact bytes/claims/request binding,
  30-second TTL and durable atomic nonce claims. No algorithm negotiation,
  browser credentials, redirects, arbitrary targets or parent commit capability.
- Durable PostgreSQL source stages/browser registration/replay/quota, immutable
  ownership checkpoint, session locking and bounded receipt recovery. Exact
  forward/login/assertions/rollback are prepared outside automatic migrations.
- User-initiated popup, exact origin/window/message/attempt checks, fresh grant
  resolution through the Move BFF and receipt-only success. Failure, switching,
  sign-out and Project failure are distinct from verified parent Save.
- Build-scoped preview fence disables legacy Auth, admin capability, server
  actions and production writes while allowing anonymous public research reads.
  New forms opt out of capture; isolated analytics are off; private protocol data
  is absent from GET URLs, logs and browser error responses. No Watch path exists.

## Test evidence

All below is newly generated from this current-main rebuild. Local browser tests
use real public Hindman/Advantage reads and anonymous browser contexts, never a
production write or legacy account login. Runtime success fixtures are labelled.

| Check | Result / limit |
| --- | --- |
| Existing `npm test` | PASS, exit 0 |
| `npm run test:v2-3-move` | 56/56 PASS: local storage/Auth ordering, strict publication/binding, assertions/tamper/claims, isolation, zero Watch, privacy |
| `npm run test:v2-3-postgres` | 32/32 PASS on actual local PostgreSQL 17.10; 20 concurrent nonce claims have one winner; separate connections, source locks, immutable rows, source read/ack/resolve, CSRF, callback purpose, receipt recovery and forward/rollback. Parent HTTP/Auth/publication are **fixtures** |
| `npm run test:v2-3-parent` | 15/15 PASS against exact Ask code: bidirectional real signing/verifying and current-grant rules. Session/persistence are **mocks**, not human Auth |
| `npm run test:v2-3-profile-compat` | 55/55 PASS; current #164 reputation/entity/schema rules preserved |
| `qa-v23-profile.mjs` | 6 actual Next cases: exact baseline and candidate at 1440/390/320; Save/reload retained, no horizontal overflow, only candidate eligible conversion |
| `qa-v23-actions.mjs` | 6 actual Next cases: Save/reload, Compare add/remove/re-add, My Move guest navigation, profile/back navigation, ineligible mount absent; zero external write attempts |
| `qa-v23-popup-fixtures.mjs` | 16/16 PASS on real mounted component and real popup Windows; **mocked BFF/Ask responses**. Blocked/closed/wrong origin/source/shape/duplicate/concurrent/expired/copied/switch/same-owner/sign-out/unavailable/Project failure cases, keyboard, busy state, local retention and focus restoration |
| Full `tsc --noEmit --incremental false` | FAIL on both trees: 528 baseline diagnostics and 528 candidate diagnostics; no added diagnostic after normalizing line positions |
| Diff/privacy audit | PASS; no production schema/config, ranking/Search R1/Watch change, automatic migration, credentials or final keys |

For contract reproduction, `ASK_CONTRACT_ROOT` must be an immutable checkout of
the exact parent head above. The new CI workflow performs that checkout and runs
unit, native PostgreSQL, signed-contract and current-profile compatibility suites.
Hosted parity/composition is deliberately absent from CI.

The profile currently has no guest unsave button; that is also baseline behavior.
The existing local removal function is tested to preserve other entries. Guest
My Move navigation is verified; cloud account mutation is not claimed. Cold Next
development compiles required bounded navigation waits and waiting for React
handlers before keyboard activation; no successful result is inferred from a
timed-out harness run. Final completed cases are in [evidence](QA-EVIDENCE.json).

## Accessibility and hydration

Whole-page accessibility remains **FAIL**: 30 color-contrast nodes at 1440 and
29 at 390/320, with identical violating element selectors on unchanged baseline
and candidate. No definition-list violation appeared in either tree. Historical
34-node/definition-list evidence was not reused as certification. New local Save
and Keep controls have zero scoped axe violations; focus outline, keyboard Enter,
busy/disabled behavior, status announcement, failure wrapping and popup focus
restoration pass. Existing navigation/footer colors were not redesigned.

No candidate-attributable hydration regression was found. On ordinary profile
Save/reload, candidate console/page errors are empty at all widths. Baseline
reproduces React's `Hydration failed because the server rendered text didn't
match the client` on Save reload (#166); the candidate uses a deterministic
server/client initial state before reading local storage. #165 remains separate.

Compare reproduces `Failed to set Next.js data cache for unstable_cache ...
items over 2MB can not be cached (10718153 bytes)` on **both** trees (#167).
Compare still completes add/remove/re-add and navigation. No Compare implementation
was changed. Baseline `net::ERR_FAILED` entries are blocked analytics requests.
Candidate interaction tests additionally observe the expected 503 from the
unconfigured V2-3 BFF, with honest sync-unavailable copy and local Save retained.
That expected gate denial is not a parent Save or a hydration error.

## Handoff state

| Item | State |
| --- | --- |
| Port audit; local Save/reload; eligible mount | COMPLETE / PASS |
| Source resolve; Ed25519 sign/verify; parent facade; exact resolver | READY (implemented and locally verified) |
| Durable nonce and source-stage store | NEEDS HOSTED APPLY |
| Popup client and current-grant BFF | READY (implemented; hosted composition unverified) |
| Production-backend preview risk | BLOCKED for activation; local write fence passes, hosted configuration not applied |
| Accessibility | FAIL whole page (identical baseline contrast); PASS new controls |
| Hydration regression | NONE ATTRIBUTABLE in bounded current-tree comparison |
| Save/Compare/My Move regression; zero Watch; new-path privacy | PASS |
| Ready for Ask ↔ Move composition | NO: parent Gate 1/connectivity, source packet/parity, separate keys and reviewed alias-to-SHA pair pending |
| Ready for real JQA | NO |
| Old #156 / #157; new PR; production | HOLD / HOLD; DRAFT / HOLD; HOLD |

This report is implementation and local evidence, not a production readiness or
real parent Auth claim. Do not activate hosted V2-3 from the ordinary automatic
branch preview. Follow the separately authorized packet only after both builders
can compose.

## Independent second pass (2026-09-23, same ticket)

A second Builder 3 session re-audited `f7da3b3a` against the ticket, the Fable
report and the Ask #185 `7184f53` handoff before changing anything, and re-ran
every local suite from a clean state: `test:v2-3-move` 56/56, `test:v2-3-postgres`
32/32 (native PostgreSQL 17, one winner of 20 concurrent nonce claims),
`test:v2-3-parent` 15/15 against a fresh read-only clone pinned to `7184f53`,
`test:v2-3-profile-compat` 55/55. All PASS.

Code verification confirmed: local Save precedes Auth and never calls the legacy
client under the fence; `KeepInMyTrustHub` mounts only from the server-rendered
`CompanyResearchHero` on `/companies/[slug]` for the exact PUBLISHABLE profile after
a local Save; `source`/`acknowledge`/`resolve` verify raw-body Ed25519 assertions
with the exact claim set and scope/session/grant purpose rules; the nonce claim is
one SQL insert; `finish` never calls `commitProfileSave`; the popup lifecycle is
attempt-scoped with exact origin/window/message checks and no blur abort; vendored
contracts are byte-equal to the pinned Ask head.

One correction was made. The first pass added `'/api/:path*'` to the middleware
matcher unconditionally, which would have routed every production `/api/*` request
through middleware (previously excluded by design) even though the fence is inert
there. The matcher entry is now host-scoped (`*.vercel.app`, `localhost`,
`127.0.0.1`) so production hosts are byte-for-byte unaffected while preview and
local QA hosts keep the method-aware fence. Verified on a fenced `next dev`:
`POST /api/reviews`, `/api/send-quote-email`, `/api/save-my-move/inventory/*`,
`GET /auth/callback` and page POSTs return 403; `GET /api/compare/companies` and
the V2-3 BFF pass; the same requests with a production `Host` never enter the
fence. A regression test asserts the matcher's host condition.

Residual observations recorded for the activation gate, not fixed here: the BFF
global quota (`global:bff`, 30/min) and per-request opportunistic cleanup are a
deliberate isolated-QA ceiling and an anonymous denial lever, acceptable only for
the QA window; the source login limit (4) versus pool max (2) per Vercel instance
can fail closed under multi-instance load; `lib/my-trusthub/config.ts` still pins
the historical Move alias, so this branch's own preview cannot compose until the
coordinated alias-to-SHA decision updates both peers; the new workflow runs on
every pull request in the repository.
