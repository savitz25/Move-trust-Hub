# SHARE-004A / SHARE-004A1 Completion Report

## A. Status

Implementation and local acceptance gates: **COMPLETE**. Feature implementation commit: `c4349a6d7c5e6b9101e2188ae3da9a3ffaef0531`. PR/Preview details are recorded after push in the final release report.

## B–D. Original blockers, causes, and fixes

### Florida safe-area clipping

Root cause: contextual supporting text was an unconstrained Satori flex child. Long content could size itself beyond the central column even though the parent was visually centered.

Fix: one reusable bounded typography contract now gives semantic content an 820 × 520 safe area, explicit 760px title/eyebrow widths and 720px supporting widths, deterministic two-line word wrapping, limited responsive title sizes, and deterministic final-line ellipsis for exceptional names. Context minimum is 38px; entity minimum is 32px. No meaningful title line is CSS-clipped.

QA: homepage, Florida, long context, short entity, and long legal-name stress renders visually passed at 1200 × 630.

### Entity generation timeout

Root cause: the original QA script rendered three `ImageResponse` cards serially under one 30-second command window, while each fresh process needed roughly 8–15 seconds. Live route QA also showed the general company loader waiting for its 20-second database timeout before consulting committed catalog data.

Fix: artifact generation supports individually timed cases. The entity OG route resolves the existing committed public catalog first and bounds database-only lookup at four seconds, falling back safely if unresolved. It retains existing publication and license-display gates and performs no scraping or external marketing/data request.

Measured direct fresh-process renders: 8.26s initial entity, 14.33s and 15.41s subsequent isolated runs on the local machine. Final real-entity artifact: 13.61s. Built route responses: homepage 17.55s, Florida 16.67s, real entity 17.07s. All returned HTTP 200 `image/png`.

## E–F. Safe-area and entity QA

- Safe area: 820 × 520 centered.
- Titles: maximum two lines.
- Context size: 50/44/38px, minimum 38px.
- Entity size: 44/38/32px, minimum 32px.
- Long-line budgets: context 29/31/33 characters; entity 28/32/36 characters, varying with size.
- Supporting content: width 720px, normalized and bounded at 68 characters.
- Exceptional legal names: word-wrap, minimum size, deterministic line-two ellipsis.
- Real entity: International Van Lines, canonical route `/companies/international-van-lines`, USDOT 1865578.

## G. Ask reference audit

Ask `origin/main` audited at `4a78502d2300d5fcf54921cfc94880ff593e18b5`. Ask remains unchanged.

- Master asset: `public/og/ask-trust-hub-social-card.png`
- Metadata: `lib/seo/metadata.ts`
- Public asset: `https://www.asktrusthub.com/og/ask-trust-hub-social-card.png?v=20260819`
- Result: HTTP 200, `image/png`, 1200 × 630, 908,802 bytes
- Mechanism: static master PNG, explicit Open Graph dimensions/alt, Twitter `summary_large_image`, stable manual query revision

## H–J. Move release identity

- Repository: `savitz25/Move-trust-Hub`
- Original starting SHA: `6fb35632c20436427220c16476f3f4796765aeca`
- Intervening compatible docs-only main: `f6bf82cc3fd5e49a2c6fd178e4d8d2abfd5bb096`
- Feature implementation SHA: `c4349a6d7c5e6b9101e2188ae3da9a3ffaef0531`
- Documentation/handoff commit and PR: recorded after publication

## K–L. Files and variants

- Renderer: `lib/og/move-share-card.tsx`
- Models: `lib/seo/share-card-model.ts`
- Metadata: `lib/seo/share-hub.ts`, `lib/seo/site-metadata.ts`, homepage/Florida page metadata
- State route: `app/(move)/florida/share-og/route.tsx`
- Entity route: `app/(move)/companies/[slug]/share-og/route.tsx`
- QA: `scripts/assert-share-004a.ts`, `scripts/generate-share-004a-artifacts.ts`, `scripts/qa-share-004a-metadata.ts`
- Visual evidence: `artifacts/share-004a/`

Variants: generic Hub/homepage, state/intelligence, and publication-gated entity/evidence summary. They share one Next.js `ImageResponse` renderer and PNG 1200 × 630 contract. No dependency was added.

## M–N. Metadata and image QA

Built-server results:

| Route | Title / OG title | Canonical | OG / Twitter image | Alt |
|---|---|---|---|---|
| `/` | `Independent Moving Research | Move Trust Hub` | `https://www.movetrusthub.com` | `https://www.movetrusthub.com/opengraph-image?v=20260903` | `Move Trust Hub — Independent Moving Research` |
| `/florida` | `Florida Moving Intelligence | Move Trust Hub` | `https://www.movetrusthub.com/florida` | `https://www.movetrusthub.com/florida/share-og` | `Move Trust Hub — Florida Moving Intelligence` |
| `/companies/international-van-lines` | `International Van Lines — USDOT 1865578 Moving Company Research | Move Trust Hub` | exact canonical company URL | exact canonical `/share-og` URL | contextual company-research alt |

All metadata declares Open Graph width 1200, height 630, meaningful alt, and Twitter `summary_large_image`. All three built image routes returned HTTP 200 and `image/png`. No localhost/Preview URL appears in emitted canonical metadata.

## O. Visual artifacts

- `artifacts/share-004a/move-homepage.png`
- `artifacts/share-004a/move-florida.png`
- `artifacts/share-004a/move-entity.png`
- `artifacts/share-004a/move-long-context.png`
- `artifacts/share-004a/move-long-entity.png`
- `artifacts/share-004a/ask-homepage-master.png`
- `artifacts/share-004a/ask-vs-move-board.png`

Ask and Move visibly share the navy field, centered hierarchy, bracket/data-node language, divider/domain rhythm, and negative-space philosophy; Move uses its orange identity.

## P. Tests and build

- `npm run check:share-004a`: PASS
- SHARE-002: PASS
- SHARE-003: PASS
- canonical `npm test`, including current NJ suites: PASS
- production build: PASS (1,877 static pages; existing large-cache warnings only)
- `git diff --check`: PASS
- repository typecheck: existing baseline 531 errors; SHARE-004A changed-file errors: 0
- image dimension/MIME/render checks: PASS

## Q. Cache notes

Generic metadata uses stable `/opengraph-image?v=20260903`. Image responses use immutable shared-cache headers plus `X-TrustHub-Card-Revision`. Increment the explicit revision only when artwork changes. Contextual routes remain stable; never append request timestamps.

## R. Real-world/iMessage limitation

Automated iMessage cache refresh was not available and is not claimed. After Production deployment, resend the canonical homepage, Florida, and International Van Lines URLs on iPhone. Platform caches may require their normal refresh/debugger workflow.

## S. Builder 2 porting notes

Port the frame/model/metadata pattern exactly, changing only Hub name, approved accent, domain, and route-native context. Preserve each Hub's publication and identity rules. Retain the 820 × 520 semantic safe area, responsive size floors, two-line limit, deterministic ellipsis, stable revisioning, explicit OG/Twitter metadata, and bounded entity-resolution behavior. Never add a runtime cross-repository dependency or relink a Vercel project/domain.

Database writes, publication changes, Google Places calls, DNS changes, and Vercel relinking: **0**.
