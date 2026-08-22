# Future Real Integration Runbook — Strategy 3

**Do not execute in FL-C010.**

## Preferred method

`STRATEGY_3_SELECTIVE_TRANSPLANT`

**Do not:**

- sequentially merge PR #45 → #62 into main
- squash-merge the entire stacked history onto main

Research PRs remain historical evidence.

## Exact future process (FL-C011)

```bash
git fetch origin
MAIN=$(git rev-parse origin/main)
echo "target main: $MAIN"

git checkout -b task-fl-c011-county-research-stack-integration origin/main

# Copy ONLY paths from:
#   data/county-regulatory/fl/architecture/c010/transplant-allowlist.json → include
# Human-resolve review list; never copy exclude principles (secrets, migrations, PII).

# Invoke validators directly (prefer OMIT package.json script mutations):
node scripts/validate-fl-c001-catalog.mjs
node scripts/validate-fl-c002-palm-beach.mjs
node scripts/validate-fl-c003-palm-beach-evidence.mjs
node scripts/validate-fl-c003-palm-beach-qualification.mjs
node scripts/validate-fl-c004-broward-acquisition.mjs
node scripts/validate-fl-c005-miami-dade-acquisition.mjs
node scripts/validate-fl-c006-miami-dade-qualification.mjs
node scripts/validate-fl-c007-pinellas-acquisition.mjs
node scripts/validate-fl-c008-county-architecture-discovery.mjs
node scripts/validate-fl-c009-palm-beach-production-spec.mjs
node scripts/validate-fl-c010-integration-gate.mjs

npm run build
npm run test:state-hhg
npm run test:directory-engine
npm run test:state-hhg-canary   # or project canary equivalent

# Open PR against main with checklist in FL_COUNTY_STACK_INTEGRATION_RUNBOOK_V1.md
```

## Expected behavior delta

`0` — research/docs/data/scripts only; no runtime publication changes.
