# TrustHub Social Card Standard V1

Status: accepted SHARE-004A1 implementation contract. AskTrustHub is the visual master; MoveTrustHub feature commit `c4349a6d7c5e6b9101e2188ae3da9a3ffaef0531` is the canonical specialist reference.

## Frozen visual contract

- Canvas: 1200 x 630 PNG. The semantic safe area is centered at 820 x 520; Hub name, eyebrow, contextual title, supporting line, divider, and domain stay inside it.
- Use the shared dark navy field, restrained illumination, sparse network nodes, large outer bracket treatment, centered hierarchy, divider, and centered domain.
- Hub name is the primary display line. Descriptor/context is a tracked sans-serif eyebrow. Contextual title follows on state and entity cards. Supporting evidence is short and secondary.
- Keep generous negative space. Brackets and nodes are decorative and must never become a rail, logo substitute, or page UI.
- Website chrome remains Inter/Geist; social cards are self-contained and must not contain browser chrome, screenshots, forms, filters, or hero UI.
- Controls and page layout are out of scope. This standard governs share metadata and images only.

## Bounded typography contract

- Contextual titles render at 50px normally, 44px for medium strings, and no smaller than 38px.
- Entity names render at 44px normally, 38px for medium strings, and no smaller than 32px.
- Contextual and entity titles are deterministically word-wrapped to at most two centered lines.
- Content lines use conservative per-line character budgets of 29/31/33 at 50/44/38px.
- Entity lines use budgets of 28/32/36 at 44/38/32px.
- Eyebrow width is 760px. Contextual title width is 760px. Subtitle and evidence widths are 720px.
- Eyebrow/supporting strings are normalized and bounded at 68 characters.
- Unusually long names are reduced to the documented minimum size, wrapped, and then deterministically ellipsized on line two. Never use CSS clipping or silently hide a full line.
- Homepage typography does not responsively shrink because its fixed canonical strings are part of the master contract.
- Divider/domain spacing is fixed below the bounded content block; title content may not collide with either.

## Approved identity accents

| Hub | Accent |
| --- | --- |
| Ask | `#4F46E5` |
| Move | `#FF5A1F` |
| Lender | `#0D9488` |
| Insurance | `#0284C7` |
| Senior | `#681860` |
| Contractor | `#F5C518` with `#0A2540` navy |
| Investor | `#0F766E` |

Only identity, descriptor, domain, contextual title, and approved accent vary by Hub. Do not introduce stock charts, shields as the primary Insurance mark, Contractor's yellow marketing rail, giant slogans, rankings, scores, endorsements, or paid-order language.

## Card variants

1. **Homepage:** Hub name, independent-research descriptor, divider, and canonical domain.
2. **State/intelligence/content:** actual geography/intelligence eyebrow, precise route title, and one short source/evidence descriptor. Do not invent routes.
3. **Entity/evidence:** exact published entity name, research/evidence eyebrow, and only public-safe identity context (for example a stable identifier or recorded location). Publication gates remain authoritative.

Do not flatten entity classes, merge identities, or turn a social card into a new claim or ranking.

## Metadata and caching

Every canonical page must emit server-rendered `title`, `canonical`, `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, image width/height/alt, and matching Twitter `summary_large_image` metadata. Images must be absolute canonical production URLs, HTTP 200, PNG, 1200 x 630, and must not reference localhost, preview hosts, or another Hub.

Use stable routes and a deliberate revision (for example `?v=YYYYMMDD`) when artwork changes. Never use per-request timestamps or random cache keys. External platforms may retain old previews; validate current metadata and document cache refresh limitations.

## Exact Move reference to port

- `lib/og/move-share-card.tsx`: `MOVE_OG_SIZE`, `MOVE_OG_CONTENT_TYPE`, `renderMoveShareImage`, `renderMoveFallbackImage`, shared frame, bracket, nodes, typography, and domain placement.
- `lib/seo/share-card-model.ts`: `MoveShareCardModel`, `moveFallbackShareModel`, `moveStateShareModel`, `moveCountyShareModel`, `moveEntityShareModel`, and bounded text helpers.
- `app/opengraph-image.tsx` and `app/twitter-image.tsx`: generic image entrypoints.
- `app/(move)/florida/share-og/route.tsx`: contextual state image route.
- `app/(move)/companies/[slug]/share-og/route.tsx`: publication-gated entity image route.
- `lib/seo/share-hub.ts` and `lib/seo/site-metadata.ts`: canonical origin, revision, dimensions, alt, and Twitter metadata.
- `scripts/assert-share-004a.ts`: source-level certification assertions; `scripts/generate-share-004a-artifacts.ts`: visual artifact generation.

Entity route behavior uses an existing committed public-catalog fast path. Database-only profiles have a four-second bounded identity lookup and fail closed to the generic card if the profile cannot be resolved safely. Image generation does not scrape a webpage or call an external marketing/data source. Fresh-process reference renders should complete within 20 seconds; repeated Preview/Production route checks must be HTTP 200 PNG responses.

Port the frame and model pattern, changing only Hub constants and route-native context. Keep each specialist's existing publication, routing, and evidence logic. Do not add cross-repo runtime dependencies.

## Acceptance prohibitions

No homepage/chassis redesign, screenshot-style card, page UI, giant slogan, different composition per Hub, unrelated marketing-banner layout, sibling-Hub branding leakage, Insurance shield replacing network identity, Contractor yellow-rail treatment as the canonical card, Investor stock-chart cliché, data/evidence changes, Google Places calls, claim/account changes, monitoring changes, DNS/Vercel relinking, cross-domain image references, private/research-only entities, unsupported claims, or new score/risk/index semantics.
