# FMCSA load runbook

Prerequisites: Node/npm, service-role credentials in local environment, PostgreSQL bulk-load access, and enough disk for immutable release artifacts. Never put credentials in commands or logs.

```powershell
npm ci
npm run fmcsa:build-spine -- --release 2026-08-16
npm run fmcsa:migrate
npm run fmcsa:publish
npm run fmcsa:publish-dockets
npm run fmcsa:qa-db
```

Download is a separate release-acquisition step: use one official bulk request per dataset, stream to a temporary filename, verify header/count/hash, then rename into the dated release directory. The committed loader assumes these verified artifacts already exist. It uses the direct PostgreSQL endpoint derived internally from `DATABASE_URL`, isolated unlogged staging, parameterized batches, release-scoped evidence, reconciliation, and a short transaction for the final visibility flip. The read model filters out every release not marked `PUBLISHED`. Loading the same six dataset hashes is a no-op because registry and evidence uniqueness constraints reject duplicates.

Validation: `npm run lint:move-v2`, `npm run typecheck:move-v2`, `npm run test:move-v2`, schema tests, two identical build runs and output-hash comparison, then representative indexed `EXPLAIN (ANALYZE, BUFFERS)` queries.
