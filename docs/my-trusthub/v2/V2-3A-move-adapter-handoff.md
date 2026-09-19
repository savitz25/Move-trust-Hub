# V2-3A Move specialist adapter — PARTIAL / production HOLD

Branch `mth-v2-3-move-parent-save-b3`, stacked on Move #156 exact corrected head
`35a83ca97f98fb5ee46bb849569808fd5e962a90`. PR #156 itself is unchanged.

## Parent interface consumed

Ask PR #185 immutable interface `26c4e9ed5c2d6ed8fbf3b3712516b7bbfdee3cd2`:
POST `/api/my-trusthub/profile-save`, envelope `v2-3/parent-runtime/1`, six exact
operations. Approved shared types/validators are vendored from Ask #184
`b194642d56d31d90eeacd9458cf29266cfc6fc07` (only relative import extensions adapted).
No parent runtime files were edited. Parent runtime integration tested exact
`2e7a467ec8b0f959a7a77dfbde64956b23fc2322` in a separate detached review worktree.

## Implemented specialist code

- Existing guest Save unchanged by default; separate, optional `Keep this in My
  TrustHub` control after confirmed local Save. Selected projection contains only
  companySlug/savedAt/revision/SHA-256 digest. No name, notes, inventory, calculator,
  comparison or plan data leaves the device in basic profile conversion.
- Server mapper requires exact canonical slug -> trusted Company.id and reviewed
  class/binding. It rejects fuzzy directory aliases, guesses and client identities.
  Current public gate is reused; no Florida, USDOT or Watch-capability requirement.
- Bounded source BFF: POST-only, same-origin/Fetch-Metadata/CSRF, HttpOnly Strict
  browser cookie, 64-KiB stream bound, explicit per-browser quota port, no CORS,
  no-store/no-referrer, no query flags/consumer IDs accepted. Missing dependencies
  fail unavailable. Bootstrap creates only a random local browser binding.
- Adapter prepares selected manifests/continuations using the frozen parent
  facade; source stage keys use high-entropy opaque tickets, hashed at rest.
  Store interface requires durable atomic uniqueness/serialization; no deployed
  memory fallback. Fixed-target form POST contains only continuationRef.
- Parent owns admission, selection/Project confirmation and atomic continuation
  consumption. `currentGrant` is an approved P13/current-parent-session adapter,
  NOT a legacy Move SDK session, browser claim or query parameter.
- Receipt lookup recovers lost responses; commits are idempotent and recheck exact
  publication/binding. Receipt verification binds manifest, exact item/revision,
  request, context and optional Project. Parent Save/Project outcomes remain
  distinct. Account switch never rebinds the old ticket. Keep local copy always.
- Conversion UI retains honest local/unavailable copy, preserves keyboard focus
  while busy, and rechecks after blur/return. Parent acknowledgment is not stored
  in localStorage. Session storage contains only opaque retry ticket. Forged URL
  flags and changed item snapshots cannot show confirmation.

## Gates: not a live-sync claim

`NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED` defaults absent/off. Server
`MTH_MOVE_PARENT_SAVE_MODE` requires `isolated`; production is denied.
`getMoveProfileSaveRuntime()` deliberately returns null even with that mode until
the following audited runtime bindings exist. Flag toggles alone do not enable it:

1. Approved isolated Move/parent/backend pairing, narrow service channel, current
   verified parent session/confirmation, P13 browser exchange and rate limiter.
2. Parent's concrete browser form-POST confirmation/return route. The published
   JSON facade is frozen, but no real browser form target/bootstrap was supplied;
   test-only `/fixture-only-confirm` and `/mock-parent-confirm` are NOT endpoints
   invented for parent deployment. Parent sign-in UI integration remains queued.
3. Durable specialist stage storage/policies; see UNAPPLIED source-store proposal.
   Parent/source split-stage consistency, PostgreSQL RLS and permissions remain
   unverified; SQLite fixtures are not substitutes for those security gates.
4. At least one reviewed current Move network binding and exact class mapping.
5. Parent grant reauthorization after expiry/session change (parent handoff itself
   marks this unfinished). Keep local research and restart explicit confirmation
   on expiry; never widen a ten-minute grant just because a receipt exists.

## Exact public identity evidence (read-only; 2026-09-19)

Authorized read-only metadata/public-identity queries, no private consumer data:

- Parent `network.network_entity_bindings WHERE hub='move' AND valid_to IS NULL`
  returned **zero rows**. No accepted live Move binding was available to certify.
- Move `public.companies` returned `id=usdot-1002530`,
  `slug=hindman-isaacs-moving-storage-inc`, `publication_state=PUBLISHABLE`.
- This is an observed public native profile, **not a verified bound end-to-end
  identity**. Its observed release behavior must be local-only until reviewed
  binding/class evidence exists. No binding was created or inferred from USDOT,
  name/email/geography. The integration fixture's accepted binding/network ID
  is explicitly SYNTHETIC. Real bound-profile requirement is NOT MET.

## Validation actually run

| Evidence | Result |
| --- | --- |
| Move legacy `test:v2-1` | 15 PASS, retained tests |
| Default-off legacy browser matrix | 12 groups PASS, including QA-M9 reload/icon/legacy-account distinction, timeout, storage, module and owner-change cases |
| New `test:v2-3-move` | 16 PASS: strict selection, expiry/CSRF, missing binding/classes/publication, replay/retries, receipt forgery, owner change, Project partial failure, bounded returns, no Watch |
| Actual Move adapter + immutable Ask HTTP/runtime | PASS with disk-backed SQLite source/parent; Auth/P13/P12/binding MOCKED; no hosted backend |
| Browser conversion fixture | PASS: real local Save/notes preservation, selected-only payload, MOCKED form/receipt, Project failure, forged query, edited projection, 1440/390/320 keyboard/focus/status/no overflow |
| Typecheck | FAIL: base and current each 532 diagnostics; no diagnostics in changed adapter/control files. Not a full PASS. |
| Build | BLOCKED by existing missing NEXT_PUBLIC_SUPABASE_URL guard; no production env pulled or guard bypassed |
| Lint | BLOCKED: repository has no eslint config for installed ESLint 9; no rule suppression/config rewrite |
| Diff whitespace | PASS |
| Real Auth/provider, cross-domain parent browser session, RLS | NOT RUN |

Cross-repository reproduction:
`PARENT_REVIEW_ROOT=<detached exact Ask runtime checkout> node --import tsx scripts/test-v2-3-parent-integration.mjs`.
The script verifies the parent's immutable SHA before imports. Actual source and
parent runtime/HTTP handlers are exercised in-process with Request/Response;
it is not a browser/provider or hosted HTTP service certification.

Browser fixture: `node scripts/qa-v2-1-save.mjs --conversion`, then
`node scripts/test-v2-3-browser.mjs` with the existing agent-browser binary.
Two fixture API/scope mistakes were corrected without weakening assertions. The
keyboard check then found actual disabled-button focus loss; changed to guarded
`aria-disabled`, rerun PASS. Parent BFF is MOCKED in this UI fixture. Full deployed
page styles and live account journeys are NOT RUN.

## Related repair handoff / sequencing

- Insurance #55: `58446e4d8c585bfc2c3c3f775f54d98cdbf956d6`, ready for Builder 4
  independent re-QA; 6 focused tests/browser/typecheck/build pass, unrelated
  existing server-action lint failure documented there.
- Lender #52: `2b836356871694441e39daf867e490d58a3ebef4`, ready for Builder 4
  independent re-QA; 10 tests/browser/typecheck/lint/build pass. No localhost repair.
- Do not start their V2-3 adapters until independent repair QA and the Move real
  isolated vertical slice pass. This packet does not close independent QA itself.

Supabase/React/browser skills guided owner checks, least-privilege store proposal
and accessible persistent status. No new dependencies, credentials, roles,
production merge/deploy/signup/Watch/Alert/data/configuration mutations.

Rollback: leave gates off/return unavailable, retain all local and parent research
and receipts. Do not force-reset shared branches or delete identities. Production
mutations **NONE**. Adapter **PARTIAL**; parent sync **MOCKED ONLY**; production HOLD.
