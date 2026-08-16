# FMCSA load runbook

Prerequisites: Node/npm, service-role credentials in local environment, PostgreSQL bulk-load access, and enough disk for immutable release artifacts. Never put credentials in commands or logs.

```powershell
npm ci
npm run fmcsa:download -- --release 2026-08-16
npm run fmcsa:verify -- --release 2026-08-16
npm run fmcsa:build-spine -- --release 2026-08-16
npm run fmcsa:load -- --release 2026-08-16
npm run fmcsa:validate -- --release 2026-08-16
npm run fmcsa:publish -- --release 2026-08-16
```

Download uses one official bulk request per dataset, streams to a temporary filename, verifies header/count/hash, then renames into the release directory. Build writes a new normalized directory. Load uses parameterized/bulk COPY into release-scoped rows. Publication runs in one transaction: validate counts and relationships, supersede the prior current classifications, mark the new release published, commit. On failure, roll back the transaction and mark the attempted release `FAILED`; do not delete the previous release. Loading the same dataset SHA is a no-op because registry and evidence uniqueness constraints reject duplicates.

Validation: `npm run lint:move-v2`, `npm run typecheck:move-v2`, `npm run test:move-v2`, schema tests, two identical build runs and output-hash comparison, then representative indexed `EXPLAIN (ANALYZE, BUFFERS)` queries.
