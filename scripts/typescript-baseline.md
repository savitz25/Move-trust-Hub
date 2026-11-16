# TypeScript baseline

`npx tsc --noEmit --pretty false --incremental false` reports 537 `error TS` lines at parent `5e9fac9023fd9762e9fc909723188d61b620758e` and at the privacy branch before this corrective patch. None of those diagnostics named the privacy files.

`npm run lint:privacy` does not hide that baseline. `next build` still skips its own type validation. The 537 diagnostics stay visible to `tsc` and are not listed in an ESLint ignore or a `// @ts-expect-error` added for this patch.
