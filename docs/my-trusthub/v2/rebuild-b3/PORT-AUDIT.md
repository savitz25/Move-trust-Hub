# Builder 3 current-main port audit

Prepared before application edits, 2026-09-22. Production and hosted activation HOLD.

Base: `01aa71fc32981eecdd4934397ef12b3b3665bb86`.
Historical #156: `35a83ca97f98fb5ee46bb849569808fd5e962a90`.
Historical #157: `333b0063abf1ec4950cf907469e585809bb515bf`.
Their common main ancestor: `5018639dee0901bbc630cafdd633015421f86e00`.
Ask #185 contract reviewed at `56e480633c50478b6ac7c29f46b41914232b1379`.
During implementation #185 advanced to `7184f53706f6ab8b94d6151794a3b54f090a6662`.
Its complete delta was reviewed: transport, origins, contracts and current-grant
wire shapes are unchanged. Interoperability/CI now pin that newer head. Its
pg_net absence and separately proven session-pool constraints are retained.

Rebuilt from current main after Fable audit; prior #156/#157 evidence retired for final V2-3 certification.

## Mapping

| Historical files/behavior | Classification | Decision |
| --- | --- | --- |
| `lib/save-my-move/local-shortlist.ts` and its tests | PORT AS-IS | Preserve notes/time, reject unreadable storage and failed writes. Re-run tests on the new tree. |
| `actions/save-my-move.ts` owner check; provider/context distinction between device and account evidence | PORT AS-IS | Owner-bound account evidence remains separate from local storage. Add preview isolation outside this legacy behavior. |
| `save-mover-button.tsx`, `save-mover-runtime.ts`, `save-mover-intent.ts` | PORT WITH CHANGES | Keep activation, duplicate/navigation guards and hydration-safe initial state; write locally before any Auth work. Mount conversion only on eligible canonical profile. |
| Old Auth-before-local ordering | UNSAFE | A failed production Auth request must not prevent local Save; isolated preview must not invoke legacy Auth/writes. |
| `save-mover-action.test.mjs`, `save-mover-intent.test.ts` | PORT WITH CHANGES | Retain owner-change/storage assertions; replace Auth-before-local expectations. |
| `.github/workflows/move-network-metrics.yml`, package scripts/lock | PORT WITH CHANGES | Keep current-main scripts; add the new security/storage/contract suites to CI rather than replace the manifest. |
| `scripts/qa-v2-1-save.mjs`, `test-v2-1-browser.mjs` | PORT WITH CHANGES | Useful component fixtures only; current Next hydration and profile QA need new evidence. |
| `lib/my-trusthub/selection.ts` | PORT AS-IS | Exact selected local projection; no notes, names or tool payload. |
| `lib/my-trusthub/vendor/*` | PORT WITH CHANGES | Compare with current Ask #185 and record provenance; preserve the parent protocol. |
| `profile-save-adapter.ts` | PORT WITH CHANGES | Strict PUBLISHABLE, exact identity/binding checks, fresh grant per finish, receipt-only success. |
| Adapter fallback `commitProfileSave` | UNSAFE | Remove: parent confirmation owns commit authority. |
| `keep-in-my-trusthub.tsx` | PORT WITH CHANGES | Replace blur-abort with explicit popup attempt lifecycle; exact origin/source/message validation and accessible states. |
| `parent-facade.ts` | PORT WITH CHANGES | Concrete Ed25519 channel; four permitted operations, fixed URL, no redirects, 5-second timeout and bounded responses. |
| `profile-save-http.ts`, `source-callback-http.ts`, API routes | PORT WITH CHANGES | Preserve same-origin POST/CSRF; add challenge/proof and independent source resolve with signed raw-body verification. |
| `isolated-runtime.ts`, `profile-save-server.ts` | PORT WITH CHANGES | Replace null/type-only ports with real assembly, still fail closed when infrastructure/config absent. |
| `postgres-transfer-store.ts`, `source-pool.ts` | PORT WITH CHANGES | Retain durable immutable records/locking; add durable nonce/browser registration, bounded cleanup, exact narrow capability and pooling restrictions. |
| Old migration, rollback and SQL assertions | PORT WITH CHANGES | Prepare an explicitly unapplied isolated packet with nonce/browser state and role checks; prove locally on PostgreSQL, not SQL mocks. |
| Old adapter/store/pool tests | PORT WITH CHANGES | Retain useful negative cases, identify mocks, add real signature and PostgreSQL evidence. |
| `test-v2-3-parent-integration.mjs` | OBSOLETE | Superseded Ask pin, SQLite and mocked caller are not transport certification. Replace with current-parent signed contract tests. |
| `test-v2-3-browser.mjs` | OBSOLETE | Blur expectation conflicts with popup; createRoot cannot certify hydration. Replace new component/security checks and current profile QA. |
| `test-v2-3-destinations.mjs` | PORT WITH CHANGES | Preserve approved identity checks, pin current contract; never fall back to production. |
| Historical V2-1/V2-3 handoff, readiness, validation and adapter-plan documents | OBSOLETE | Reference history only. No historical PASS is inherited by this branch. |
| Legacy profile evidence/reputation sections and historical page/a11y snapshots | REPLACED BY MAIN | Preserve #164 and current entity schema; no score/rating restoration. |
| Source `resolve`; Ed25519 signer/verifier; durable nonce claim | NOT YET IMPLEMENTED | New implementation required. |
| Current-grant BFF and popup, exact publication/binding resolver, isolated preview write fence | NOT YET IMPLEMENTED | New implementation required; never fabricate parent authority. |

## Fable coverage and boundaries

Reviewed REPORT sections J–P, S, U–Y and appendix C. Move blockers/highs:
FABLE-V23-002 (unwired transport), 005 (blur/popup), 006 (retired build evidence),
007 (production legacy backend), 008 (superseded mocked transport).
Related parent blockers 001/003 and highs 004/009/010/011 remain Builder 4 dependencies;
this ticket cannot claim hosted composition or fix parent infrastructure.
Also track C-06–C-14: CI, quotas, actual SQL/session affinity, recovery copy,
current a11y, analytics privacy, exact origins, hydration and bounded receipt retention.

No conflict in the main/#164 hero mount: `/companies/[slug]` renders
`CompanyResearchHero`, which renders `SaveMoverButton`. The company hero and
Save/provider paths are unchanged between the old stack's base and current main.
The reputation/statistics/review changes in main are retained intact. The new
conversion is not implicitly mounted on `/company/[slug]` community routes or
auto transport/directory cards.

The handoff currently pins the historical Move branch alias. The fresh branch
must not silently invent a new trusted pair or activate that old alias. A reviewed
pair/alias-to-SHA decision belongs to the later coordinated activation gate.
No hosted configuration, database operation, final key generation or JQA is
authorized here. #156/#157 remain open/HOLD.
