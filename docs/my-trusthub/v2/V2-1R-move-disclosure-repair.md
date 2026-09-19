# V2-1R — Move QA-M9 disclosure repair

2026-09-19, Builder 3. Updates existing PR #156; no merge or production deployment.
Starting exact head: `db6d640398ee622d0c3153e968ce14d621ec744a`.
Own worktree: `mth-v2-2r-move-review-b4`; local branch `mth-v2-1r-disclosure-b3`, pushed to PR branch `mth-v2-1-move-save-b3`. Original builder worktree remains untouched.

## Root cause

`SaveMoverButton` restored `localSaved` on mount but initialized the live status message to empty. The successful click populated device-specific copy only in component memory. Reload therefore showed `Saved` without its local-storage meaning. In addition, the provider's `savedMoverSlugs` combines local and account rows: that set plus a signed-in user is not evidence of an account write.

## Narrow correction

- Derive persistent device disclosure from actual local shortlist presence when no current-owner account confirmation exists. Reload says “saved on this device. My TrustHub account sync has not been confirmed.” The icon accessible name uses the same status.
- Track an account-only, owner-bound slug snapshot separately from the existing combined set. The verified server read takes an optional expected-owner hint; an owner mismatch returns no confirmation and never reads another user's rows into that UI context. On owner change the previous account snapshot is invalidated.
- A successful existing legacy account write returns its already-verified owner identity to the component. Confirmed state says **“saved to your Move account shortlist”**, not “Saved to My TrustHub.” The latter requires a future parent receipt and cannot truthfully be shown here.
- Local success/account failure remains “saved on this device. Account sync unavailable.” After reload, storage cannot prove a historical account failure, so it shows the truthful unconfirmed device state. No new failure metadata or storage schema is introduced.
- No successful storage write means retry error, not Saved. No global banner, automatic parent Save/Project/Watch/Alert or storage key/shape changes.

## Tests actually run

| Check | Result / evidence class |
| --- | --- |
| `npm.cmd run test:v2-1` | PASS: 15 tests. Real local-storage logic; on-demand auth adapters and actual server action are MOCKED. New tests verify expected-owner account reads and mismatch rejection without client/database creation. |
| `node scripts/test-v2-1-browser.mjs` against `node scripts/qa-v2-1-save.mjs` | PASS: 12 grouped checks, BROWSER LOCAL + explicitly MOCKED auth/cloud. Real component/runtime and browser localStorage on loopback only. |
| QA-M9 guest Save → reload | PASS: one correct slug remains, Saved state and device/unconfirmed-parent disclosure remain. Icon accessible name also tested. |
| Local-versus-account disclosure | PASS with MOCKED context: combined/local Saved plus authenticated user is still device-only; explicit account confirmation gets legacy-account copy; changed owner loses that confirmation. Actual provider SDK lifecycle is not certified by this mock. |
| Failed cloud write → reload | PASS with MOCKED cloud: local row retained, sync-unavailable copy before reload; unconfirmed device copy afterward. |
| Existing browser regressions | PASS: initial keyboard action before deferred provider, rapid duplicates, delayed auth, navigation/account-switch cancellation, failed storage/retry, failed module, bounded 16-second delayed-module failure with no late write. |
| 1440/390/320 | PASS in isolated component fixture: keyboard focus, no horizontal overflow before and after Save/reload disclosure. Not a certification of the full production page layout. |
| Initial browser visual/error check | PASS: rendered Save control, screenshot inspected, no browser errors reported. Harness contains synthetic public fixture names only. |
| `tsc --noEmit --incremental false --pretty false` | FAIL unchanged: 532 diagnostics at exact starting head and corrected tree; identical complete output SHA-256 `09ae156349c77a7465f8f9483efbe5ee58e405e29dfed29964d9b25f4a9dcc37`. No diagnostics in changed Save/account files. Separate detached baseline worktree, same dependencies/compiler. Full suite is NOT green. |
| Changed-file ESLint | BLOCKED: ESLint 9 cannot find `eslint.config.*`; no repository configuration supplied. No assertions/configuration weakened to hide it. |
| `npm.cmd run build` | BLOCKED at canonical Supabase guard: `NEXT_PUBLIC_SUPABASE_URL` missing. No production environment copied or guard bypassed. |
| `git diff --check` | PASS. |
| Real authenticated provider/preview journey | NOT RUN: isolated backend/session not established. Browser account outcomes above are mocked, not provider certification. |

PowerShell initially rejected `npm.ps1`; the focused suite was then actually executed successfully with `npm.cmd`. This shell retry is not a test failure hidden behind a subsection.

React/Supabase guidance informed separation of UI evidence from server-authorized ownership; Next.js guidance kept the existing server-action boundary; browser-verification guidance required an initial visual/error check and the local-only end-to-end storage path. No new dependencies or external settings were needed.

## Re-QA and rollback

Use the new exact PR head recorded in the GitHub handoff comment. Run the two commands above in a clean review worktree with existing locked dependencies; set `AGENT_BROWSER_BIN` to the existing browser binary if necessary. The harness serves only `127.0.0.1:4311`, mocks all Auth/cloud operations and needs no environment file. Verify reload copy and account distinctions independently. Do not treat a protected preview or local harness as an isolated real Auth environment.

Rollback is a reviewed revert of this narrow correction on the PR branch, preserving subsequent work; it would restore QA-M9 and is not a release recommendation. Never reset the branch or erase local/account research. Insurance #55 and Lender #52 heads are preserved. Their independent QA can proceed; no new defect was returned under this packet.

Production mutations: **NONE**. Local repair is READY FOR RE-QA, not parent synchronization or production approval. Shared-contract review and exact Wave A/B/C mappings are in `V2-3-specialist-adapter-plan.md`.
