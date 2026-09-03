# TrustHub Social Card Standard V1

Status: accepted SHARE-004A handoff. AskTrustHub is the visual master; MoveTrustHub is the canonical specialist reference.

## Frozen visual contract

- Canvas: 1200 x 630 PNG; keep important text inside the central safe area.
- Use the shared dark navy field, restrained illumination, sparse network nodes, large outer bracket treatment, centered hierarchy, divider, and centered domain.
- Hub name is the primary display line. Descriptor/context is a tracked sans-serif eyebrow. Contextual title follows on state and entity cards. Supporting evidence is short and secondary.
- Keep generous negative space. Brackets and nodes are decorative and must never become a rail, logo substitute, or page UI.
- Website chrome remains Inter/Geist; social cards are self-contained and must not contain browser chrome, screenshots, forms, filters, or hero UI.
- Controls and page layout are out of scope. This standard governs share metadata and images only.

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

Port the frame and model pattern, changing only Hub constants and route-native context. Keep each specialist's existing publication, routing, and evidence logic. Do not add cross-repo runtime dependencies.

## Acceptance prohibitions

No homepage/chassis redesign, data or evidence changes, Google Places calls, claim/account changes, monitoring changes, DNS/Vercel relinking, cross-domain image references, private/research-only entities, unsupported claims, or new score/risk/index semantics.
