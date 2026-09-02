# NJ-MOVE-001 production runbook

Internal-only New Jersey Public Movers & Warehousemen evidence for MoveTrustHub.

## Safety

- Repository: `savitz25/Move-trust-Hub`
- Branch: `nj-move-001-nj-pmw-authority-enforcement`
- Do not run Vercel commands or change domains.
- Do not create `/new-jersey` or mover rankings.
- Do not treat FMCSA ACTIVE as NJ licensed, or NJ licensed as interstate authorized.
- Do not scrape RGB/MyLicense search results.
- Do not copy credentials from another hub.
- A PW-only license must not appear as a consumer mover.

## Commands

```bash
python scripts/nj-move-001-discover.py
python scripts/nj-move-001.py inspect
python scripts/nj-move-001.py dry-run
python scripts/nj-move-001.py execute
python scripts/nj-move-001.py verify
python scripts/nj-move-001-tests.py
```

## Roster

Current statewide PM/PW/PC file is `SOURCE_AVAILABLE_BY_REQUEST`. See `docs/nj-move-001-pmw-records-request.md`.

## Database

Apply `supabase/migrations/20260903120000_nj_move_001_state_regulatory_ledger.sql` only against the MoveTrustHub database. If no authorized session exists, merge dormant code and leave execute pending. Reconciliation: `docs/sql/nj-move-001-reconciliation.sql`.
