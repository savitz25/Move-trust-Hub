# SHARE-004A Completion Report

## Status and release identity

SHARE-004A is the accepted Ask-to-Move social-card reference for Builder 2. The accepted Move reference line is `6fb35632c20436427220c16476f3f4796765aeca`.

- Repository: `savitz25/Move-trust-Hub`
- Vercel project: `move-trust-hub`
- Canonical: `https://www.movetrusthub.com`
- Starting/reference SHA: `6fb35632c20436427220c16476f3f4796765aeca`
- Accepted feature/merge/Production line: `6fb35632c20436427220c16476f3f4796765aeca`
- PR: SHARE-004A accepted Move reference
- Database/publication/data writes: none

## Ask reference inspected

Ask master asset: `public/og/ask-trust-hub-social-card.png`.
Ask metadata source: `lib/seo/metadata.ts`.
The master is a 1200 x 630 PNG using the navy field, bracket/network treatment, centered hierarchy, divider, and canonical domain. Ask was not modified.

## Move implementation reference

Files and functions to port are listed in `docs/TRUSTHUB-SOCIAL-CARD-STANDARD-V1.md`. The implementation supports homepage, contextual state/content, and publication-gated entity/evidence variants through `ImageResponse`, with deterministic bounded text and canonical metadata.

## QA and safeguards

- Card format: PNG, 1200 x 630.
- Metadata: canonical absolute URL, Open Graph dimensions/alt, and Twitter `summary_large_image`.
- Context: route-specific titles and public-safe entity identity only.
- Publication: existing specialist gates remain authoritative; no publication expansion.
- Cache: stable image routes with deliberate revisioning; no random timestamps.
- Deployment identity: Move repo -> `move-trust-hub` -> `movetrusthub.com`; no relinking or DNS changes.
- iMessage previews: external cache refresh is not automatable; resend canonical URLs after deployment to verify on-device previews.

Existing repository checks include `npm run check:share-004a`, SHARE-002/003 regressions, `git diff --check`, and repository production build/typecheck gates. Builder 2 must rerun equivalent checks after each port and verify live metadata/image responses, not rely on source assertions alone.

## Exact Builder 2 instructions

For Lender, Insurance, Senior, Contractor, and Investor, copy the Move frame/model/metadata pattern exactly. Change only Hub name, descriptor, canonical domain, approved accent, and route-native contextual text. Preserve actual route specificity and entity classes. Record N/A where a state or entity route does not exist. Investor must deploy only to `investor-trust-hub-web`; Senior uses `apps/web`; all other repo/Vercel/domain mappings follow the SHARE-004B hard map.

Produce a seven-Hub 1200 x 630 board, contextual/entity boards where available, live metadata/image QA, and per-repo starting/implementation/merge SHAs. Do not change Ask or Move, touch data/evidence, add Places calls, alter claims/monitoring, or relink Vercel/DNS.
