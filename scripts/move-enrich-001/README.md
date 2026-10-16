# Move enrichment 001

Loader prep for `provider_contact_observation`.

- Source: `dot_enrich_move_final_2026-10-12`
- Batch: `move-enrich-001-2026-10-16`
- Fields: website, phone, email, address
- `quality_class` is the source tier (`strict` or `partial`)
- Company identity columns are not updated
- Existing observations from another source are a hard stop
- Generated SQL ends in `ROLLBACK`

The graded CSV, rollback file, and pre-state file stay outside this repository. A committed load requires the exact phrase `GO MOVE ENRICH LOAD`. This package does not emit a commit statement.

```bash
npm run check:move-enrich-001
node scripts/move-enrich-001/build-sql.mjs --csv PATH --sql-out PATH --rollback-out PATH --prestate-out PATH
```
