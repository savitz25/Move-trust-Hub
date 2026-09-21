# V2-3 Move final readiness — 2026-09-21

Production STRICT HOLD. PR #157 remains draft, unmerged; no gate activation.
Starting Move revision: `c334a8f30e91a014eaf1226510647f00d4b3db79`.
The PR/coordination delivery receipt records the immutable updated head.
No Move main, PR #156, Ask code, or Insurance/Lender runtime changes.

## Current parent compatibility

Reviewed parent: `16252ef3a6d917bf3bbc0a73282780f750d88232`.
Immutable interface: `26c4e9ed5c2d6ed8fbf3b3712516b7bbfdee3cd2`.
All three interface/profile-save/profile-transfer contract files are byte-identical
between these revisions. The entire parent profile-save implementation directory
has no diff from previously tested `91ff29c5f01e62dd52536fac59d35e4508e56c07`.
Changes outside that directory include UI/gating and hosted SQL/ACL validation.

COMPATIBLE: envelope/version, six operations, selected projection, continuation,
grant/current-owner requirements, durable receipt/recovery, independent Project
outcome, exact return and acknowledgment mapping. The updated cross-repository
fixture asserts frozen contract equality before executing actual parent handlers.
No wire contract was changed or silently revended.

## Fresh publication and identity evidence

Read-only canonical Move query at **2026-09-21 20:20:19.686167 UTC**:

- Exact `Company.id`: `usdot-1002530`.
- Exact slug: `hindman-isaacs-moving-storage-inc`.
- Publication: `PUBLISHABLE`.
- FMCSA legal/display name: `HINDMAN & ISAACS MOVING & STORAGE, INC.`.
- `service_scope`: interstate; services/entity type: Carrier.

The stored legal name differs in punctuation from the approved canonical label
`HINDMAN & ISAACS MOVING & STORAGE INC`; the exact USDOT/native identity agrees.
Existing Move classification over those public fields yields HHG carrier. The
V2-3 class `mover` remains the Founder-reviewed contract class; it is not a guessed
parent binding or a raw Company class column. No parent binding was inferred,
looked up as proof of synchronization, or created.

## Ask #189 destination compatibility

Independently reviewed `16530b6442b5fb407e69ee07b13b19ae6e26368e` in a detached
read-only checkout. Six cross-repository source-level checks pass:

| Route/context | Move treatment |
|---|---|
| `/companies?search=...&state=...` | Existing search/state filters accepted |
| `/companies/hindman-isaacs-moving-storage-inc` | Exact profile path selects identity |
| `/local-movers/<state>[/<county>]` | Matching Move route files exist |
| `/moving-to/florida/fort-lauderdale` | Matching existing destination route |
| `src`, `journey`, `intent`, `from_q`, `geo` | Preserved in generated URL; non-authoritative metadata, not new persisted journey state |
| `id_type=usdot|mc`, `id` on profile | Attribution context; cannot override the profile/Save identity |
| Identifier fallback | Ask generates `/ask?q=Find USDOT ...` or `Find MC ...`; Move parser accepts exact digits |
| Arbitrary origin query values | Cannot change configured parent/BFF service origins |

No Move route defect was demonstrated; no directory/search behavior was changed.
Do not interpret passive metadata acceptance as a new query-driven journey-resume
feature. In particular `from_q` is not a replacement for directory `search` or
Ask `q`, and profile attribution `id` is not trusted identity.

Hosted preview attempt: the exact company URL plus attribution on
`https://move-trust-fe65g6tam-savitz25-s-projects.vercel.app` redirected the isolated
browser to Vercel login. No bypass, credentials, or access changes were attempted.
Thus **hosted destination rendering is BLOCKED by preview access**, not certified
by the source-level checks. Builder 4/Journey QA must test with authorized access.
This known READY preview is the starting revision, not the new runtime revision.

## Prepared transport composition and precise handshake

Move browser endpoint remains same-origin `POST /api/my-trusthub/profile-save`.
Parent fixed form target remains `POST /my/profile-save` on the approved parent
origin; initial form fields contain only the opaque continuation reference.
Return is the server-derived `/companies/hindman-isaacs-moving-storage-inc`, without
success flags. **Check My TrustHub save** reauthorizes/verifies the receipt.

New Move-owned callback endpoint:
`POST /api/my-trusthub/profile-save/source`.
This is a source transport wrapper, NOT a new parent operation or parent route.

```text
source request: { action: "source", continuationRef }
source response: { ok: true, result: SourceSnapshot }
ack request: { action: "acknowledge", continuationRef, receipts }
ack response: { ok: true }
```

The handler bounds input at 131072 bytes, rejects extra fields/query strings,
validates receipt projections, fixes its origin/path, sends no CORS grant, and uses
private/no-store responses. It passes unchanged bounded body bytes/headers to the
existing `verifySourceCaller` port; it does not decode/trust a raw JWT. Source reads
must verify `source:read`; acknowledgments must verify `source:ack`. The existing
source service checks browser binding, manifest/items/request keys and immutable
account context. Acknowledgment success alone NEVER confirms a browser Save.

Expected service assertion identity is the **approved isolated Ask deployment
acting as parent source-reader/acknowledger for the exact Move/Ask origin pair**,
not a consumer or browser principal. Mandatory verifier checks: approved issuer
and subject, exact Move callback audience, signature/body binding, freshness,
replay protection, exact scope and browser/session association. Concrete approved
issuer/subject/key identifiers and the assertion carrier are **still missing from
Builder 4's transport handoff**; no credential scheme was invented here.

Move-to-parent scopes remain `transfer:stage`, `saved:write`, `receipt:verify` as
required by the reviewed parent runtime. Current-parent grant and receipt recovery
must derive from freshly verified isolated parent owner/session and confirmation,
not legacy Move login, browser UUID, stored acknowledgment, or query parameters.
Only parent confirmation chooses/authorizes the optional Project reference.

**Remaining composition boundary:** `getMoveProfileSaveBindings()` still defaults
to no ports, so BOTH Move browser and callback routes return unavailable. Ask's
reviewed browser/HTTP deployment is also unbound. Builder 4 must deliver the
approved service/current-grant/source-callback transport; then the final composition
must bind it, the exact resolver and the narrow source pool. Environment flags alone
cannot do that. Do not substitute service_role, fixture SQLite, or legacy Auth.

Expected states:

- Local / identity not ready: `Saved on this device`.
- Attempted parent failure: `Saved on this device — My TrustHub sync unavailable`.
- Fresh verified saved/already-saved receipt: `Saved to My TrustHub`.
- Project failure: parent Save remains confirmed, separate Project failure detail.
- Local copy always retained; no Watch capability or mutation introduced.
- Unbound/production routes: 503; invalid callback: 400/405/413;
  unverified/mismatched source authority: 403; store/transport failure: 503.

## Configuration names only

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

Provider-specific service-verification/current-grant configuration names must come
from the approved transport handoff. None are guessed, populated, or activated.
The current parent preview supplied for coordination is
`https://conumers-trust-cc98d4fwp-savitz25-s-projects.vercel.app`.
Both origins must be re-pinned if either immutable preview revision changes.

## Source PostgreSQL evidence and apply boundary

Supabase branch metadata identifies `xkkiicsassizmakcvxml` as non-default,
nonpersistent `mth-v2-3-isolated-integration-qa`. Read-only queries explicitly
targeted that ref, never the production parent.

At **2026-09-21 20:14:10.586303 UTC**, source schema/table were absent.
A rollback-only rehearsal combined the existing forward schema and SQL assertions
inside one transaction with a final ROLLBACK. It stopped with SQLSTATE 42501:
`permission denied to set role "mth_move_profile_transfer"`.
No role membership or permissions were granted to bypass that boundary.
At **2026-09-21 20:16:36.992672 UTC**, a separate read confirmed both schema and
role absent. **No persistent database object/data change was made.**

SOURCE STORE LIVE PROOF = **PREPARED-BUT-NEEDS-APPLY**, not PASS.
Prepared files remain unchanged:

- `supabase/migrations/20260921154559_move_v23_source_stage.sql`
- `supabase/rollback/20260921154559_move_v23_source_stage.down.sql`
- `supabase/tests/move_v23_source_stage.sql`

Approval is still needed for persistent isolated source schema and the verified
narrow runtime login capability. SQL/RLS/concurrency certification must then run
under that role. The existing tests require permission to SET ROLE; the migration
intentionally does not grant runtime membership. This ticket does not apply it.

## Reproduction and verification

Node 22.18.0, committed lockfile unchanged. Run in Move:

```text
npm run test:v2-1
npm run test:v2-3-move
npm test
npm run typecheck -- --pretty false --incremental false
npm run build
npm run lint
git diff --check
```

Set local `PARENT_REVIEW_ROOT` to exact detached parent `16252ef3...` and run
`npm run test:v2-3-parent`. Set local `ASK_HANDOFF_REVIEW_ROOT` to exact #189
`16530b64...` and run `npm run test:v2-3-destinations`. No remote env is changed.

For conversion browser tests, start `node scripts/qa-v2-1-save.mjs --conversion`
and separately run `node scripts/test-v2-3-browser.mjs`. Stop that fixture; start
it without `--conversion` and run `node scripts/test-v2-1-browser.mjs`.
`AGENT_BROWSER_BIN` may select the existing browser executable.

Results: legacy unit **15/15**, specialist **30/30**, destination contracts **6/6**,
cross-repository handlers PASS, conversion browser PASS, legacy browser **12 groups
PASS**, full `npm test` PASS. Browser cases include reload, delayed loading, storage
failure, keyboard/focus and 1440/390/320 widths. Security cases include exact identity,
publication rejection, replay/expiry, CSRF/origin, changed digest, switched owner,
forged receipt, independent Project failure, zero Watch and retained local research.
New source callback tests use a MOCKED service verifier; SQL tests use a mock pool.
Cross-repository Auth/P13/P12/binding remain MOCKED. No live browser certification.

Typecheck baseline/current: **532/532**, no added/removed file/code/message
identities after normalizing line shifts. Guarded build stops for missing local
configuration; no guard bypass. Lint requires the existing interactive ESLint setup;
no setup/config change. Hosted new-head CI is reported separately in the PR receipt.

Next: Builder 4 transport contract + approved source schema/login + authorized
preview access + controlled users/binding readiness, then final isolated composition
and the live success/failure sequence in `V2-3A2-builder-4-handoff.md`.
No production configuration, public activation, Auth user creation or binding
creation was performed by Builder 3.
