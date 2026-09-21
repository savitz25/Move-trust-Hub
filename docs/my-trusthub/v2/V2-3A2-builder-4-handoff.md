# V2-3A2 — Move isolated integration handoff

2026-09-21. Production HOLD. No migration applied, environment provisioned,
credential created, binding created, or production mutation performed.
Move PR #157; starting head `f317fd87847e4ba27e7d0d74ca9eb99207ea11b5`.
The immutable delivery head and preview checks are recorded in the PR delivery comment.
Move #156 and Insurance/Lender runtime are unchanged.

## Compatibility and remaining composition boundary

Ask #185 `91ff29c5f01e62dd52536fac59d35e4508e56c07` is WIRE COMPATIBLE with
interface `26c4e9ed5c2d6ed8fbf3b3712516b7bbfdee3cd2`: the interface and transfer
contract files have no diff. Six operations still use `v2-3/parent-runtime/1`
at `/api/my-trusthub/profile-save`. The reviewed additive browser form route is
`/my/profile-save`; initial POST has only `continuationRef`, never research,
consumer identity, receipt, Project ID, or a caller-selected return URL.

The new `createIsolatedMoveRuntime(env, ports)` composes the PostgreSQL source
store, existing parent facade, bounded browser HTTP handler, authenticated source
lookup, and acknowledgment. `createIsolatedSourcePool` prepares a lazy,
TLS-verified, bounded dedicated pool; it does not connect during construction.

**NOT deploy-wired:** Move's Next route calls `getMoveProfileSaveRuntime()` without
ports and intentionally returns unavailable. Ask's reviewed browser route also
passes null bindings, and its HTTP deployment returns a null runtime. Flags alone
do not activate either application. Builder 4 must hand off the reviewed isolated
Auth/P13 channel/current-grant transport and source callback transport before the
final Move composition can be wired and tested. No undocumented grant or receipt
route, credential format, legacy-account fallback, or deployed fixture was invented.
This is a remaining code-composition dependency, not merely a missing secret.
Do not certify “no specialist-side code blocker” until that composition is present.

## Concrete source interface for Builder 4

`lib/my-trusthub/isolated-runtime.ts` exports `IsolatedMovePorts`:

- Approved exact Move/parent origins, source backend identity, and an explicit
  isolated attestation. A preview hostname alone is not backend isolation proof.
- Dedicated/session-affine `SourcePool` (never transaction-mode pooling).
- Existing `ScopedChannel.post` to the fixed parent API, independently authorized
  for the six profile-save operations. No browser-provided subject or Saved ID.
- `resolveExactPublished(slug)`: exact native ID, publication, reviewed class and
  accepted binding; no fuzzy alias/name match or guessed binding.
- `currentGrant(browser, ticketHash)`: fresh verified parent approval/current owner
  and optional approved Project reference. Neither a stored acknowledgment nor
  legacy Move Auth can serve as this authority.
- `verifySourceCaller(proof, scope)`: independently verified, browser-bound service
  capability for `source:read` or `source:ack`. Origin alone is not authentication.

Assembly exposes `http`, `source(continuationRef, proof)`,
`acknowledge(continuationRef, receipts, proof)`, and `store`.
Connect these to the corresponding reviewed parent source/acknowledge ports.
Source snapshots preserve the original `requestPrefix`; parent commits must use
`requestPrefix:index`. Acknowledgment checkpoints only opaque account context and
optional Project reference; it never sets browser success. Browser receipt checks
still require current authorization plus parent lookup AND verification.

Parent receipt-only recovery must be freshly authorized for the exact current
owner/session, hub, `accountContextRef`, and `requestKey`; the parent checks the
five-minute verification age and its receipt retention. It is an internal verified
capability, not an extra field in the browser or frozen operation envelope. It
cannot renew a commit, P13 consumption, expired continuation, or confirmation.

## Configuration names only

No values or secrets are included here:

```text
NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED
MTH_MOVE_PARENT_SAVE_MODE
MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED
MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND
MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN
MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN
MTH_MOVE_PARENT_SAVE_FORM_PATH
MTH_MOVE_PARENT_SAVE_DATABASE_URL
MTH_MOVE_PARENT_SAVE_DATABASE_CA
VERCEL_ENV
NODE_ENV
```

The reviewed port implementation, not browser configuration, must supply the narrow
BFF identity, current-grant authorization and receipt-recovery authority. Names for
its provider-specific credentials remain part of Builder 4's transport handoff;
none are guessed here. Verify both previews and their actual DB/Auth targets are
isolated before enabling anything. Production is denied even when flags are set.
The exact origin pair and source host/database/login must match approved metadata.
The source login must have only the source role capability; it must not be an admin,
service-role fallback, or account owner with broad public-table access.

## Source storage and unapplied migration

Prepared, **NOT APPLIED / real PostgreSQL assertions NOT RUN**:

- Forward: `supabase/migrations/20260921154559_move_v23_source_stage.sql`
- Rollback: `supabase/rollback/20260921154559_move_v23_source_stage.down.sql`
- SQL checks: `supabase/tests/move_v23_source_stage.sql`

These require a separately approved isolated source backend and explicit session
attestation. They are not part of a production rollout. The schema is private,
RLS is forced, and the capability role is NOLOGIN/NOBYPASSRLS. No login membership,
password or scheduler is created. Builder 4 must separately verify the approved
runtime login's permissions and dedicated connection affinity. Do not apply every
Move migration to an arbitrary parent database.

Ticket and browser proof are hashed; continuation lookup is hashed/unique. Records
are closed, bounded selected-profile manifests without notes, tools, raw consumer
identity or parent Saved IDs. Atomic insert prevents overwrite. A nonblocking
session advisory lock serializes each ticket; owner context is committed BEFORE
remote operations, without keeping a DB transaction open across HTTP. Retry uses
the same request keys, cannot switch context, and verifies existing parent receipts.
No automatic retry of potentially committed remote work is introduced.

Stage admission expires within ten minutes. Source receipt retry metadata is kept
for at most one day, not the parent's longer receipt retention. `store.cleanup(100)`
is an explicit bounded operator capability (maximum 500), not an enabled cron.
After that source retention expires, no success is inferred; local research remains.
Rollback refuses live retry metadata and uses no CASCADE. Stop new staging, drain
retention, review grants/dependencies, then separately authorize isolated teardown.
No reset, force push or production rollback is required by this handoff.

## Exact test profile and current read-only evidence

At **2026-09-21 15:44:50.627524 UTC**, a bounded read-only query of the canonical
Move companies table returned exactly one matching row:

- `id = usdot-1002530`
- `slug = hindman-isaacs-moving-storage-inc`
- `publication_state = PUBLISHABLE`
- `usdot_number = 1002530`

At **2026-09-21 15:45:28.0870429 UTC**, the public URL returned HTTP 200 without
changing its final URL: `/companies/hindman-isaacs-moving-storage-inc` on Move.
This verifies publication, not parent binding existence or parent synchronization.

Builder 4 owns isolated creation of the Founder-approved organization
HINDMAN & ISAACS MOVING & STORAGE INC and accepted `move / mover / usdot-1002530`
binding, namespace `fmcsa.usdot`, identifier `1002530`, jurisdiction US. Do not
create a production binding or derive one from name similarity. The isolated
creation transaction supplies `valid_from`; confidence stays null.

## Repeatable local evidence

Node 22.18.0, existing lockfile/dependencies. Commands run from the Move worktree:

```text
npm run test:v2-3-move
npm run test:v2-1
npm test
npm run typecheck -- --pretty false --incremental false
npm run lint
npm run build
git diff --check
```

For cross-repository fixtures, set `PARENT_REVIEW_ROOT` to a local exact checkout of
Ask `91ff29c5f01e62dd52536fac59d35e4508e56c07`, then:

```text
npm run test:v2-3-parent
node scripts/qa-v2-1-save.mjs --conversion
node scripts/test-v2-3-browser.mjs
```

The last two run in separate terminals. Stop the fixture server before starting
`node scripts/qa-v2-1-save.mjs` without conversion, then run
`node scripts/test-v2-1-browser.mjs`. `AGENT_BROWSER_BIN` may point to the existing
authorized agent-browser executable. No fixture server is a deployed Next app.

Evidence: specialist 27/27; legacy unit 15/15; full `npm test` PASS. Cross-repository
actual Move/parent handlers PASS with disk SQLite and MOCKED Auth/P13/P12/binding.
Conversion browser checks PASS including reload, local-only identity, retained
notes, Project failure, altered selection, forged completion URL and 1440/390/320
keyboard/status checks. Real PostgreSQL concurrency/RLS and live authenticated
sync are NOT RUN. SQL-shaped unit fixtures are not database certification.

All-file typecheck baseline and candidate: 532 diagnostics each, zero added,
removed or materially changed file/code/message identities after ignoring shifted
line numbers. Build stopped at its existing guard because local configuration was
missing; guard unchanged, no direct-build bypass. Lint stopped at Next's existing
ESLint setup prompt; no configuration was installed or changed.

## Builder 4 live isolated sequence — NOT RUN

1. Record immutable parent/Move heads, both preview origins, and independent proof
   that Auth, DB and BFF authority are isolated. Install reviewed bindings first;
   a green deployment/HTTP 200 is not a Save journey pass.
2. In one fresh browser, open the exact eligible Move profile; Save promptly.
   Verify the existing local shortlist key and exact slug, reload, and verify
   accessible **Saved on this device**, with no account-confirmed claim.
3. Activate **Keep this in My TrustHub**. Verify durable source row, bounded
   profile-only manifest, hashed ticket/browser key, and form POST to the fixed
   parent path containing only the continuation reference.
4. Authenticate as isolated ordinary user A. Confirm the selected profile
   explicitly. Test no Project first, then an owned optional Project. Verify one
   parent Saved row, durable receipt and the exact approved entity/binding.
5. Return to the bounded Move profile route. Activate **Check My TrustHub save**
   (current explicit reauthorization UI). Only successful fresh receipt verification
   may show **Saved to My TrustHub**. A return URL flag alone cannot confirm. Local
   record/notes must remain byte-for-byte intact. Repeat check: same parent Save.
6. Repeat with already-saved result and simulated optional Project failure:
   parent Save remains confirmed; Project failure is separate; no Watch is created.
7. Test parent unavailable, local-only identity, expired continuation and stale/
   forged receipt. Local-only identity stays **Saved on this device**; attempted
   parent failure shows **Saved on this device — My TrustHub sync unavailable**.
8. Switch to isolated ordinary user B before lookup, during verification and on
   retry: never acknowledge A's Save to B. Change selected digest, tamper/reuse
   transfer, omit CSRF, change Origin, submit consumer/Saved/Project identifiers or
   arbitrary return paths: reject without new unauthorized mutation. Replay under
   the original owner may retrieve the same receipt, not create another Save.
9. Test lost acknowledgment/response and same-owner receipt-only recovery after
   grant expiry; preserve source context and request keys, refuse new expired commit.
10. Capture sanitized assertions/counts only: no cookies, secrets, auth links or raw
    account rows. Verify zero Watch/Alert side effects and zero production writes.

Security negatives above pass at unit/mocked-handler level. Their live counterparts,
DB assertions, route composition and authenticated browser journey remain required.
Any runtime revision after QA must rerun relevant tests against the new exact head.
