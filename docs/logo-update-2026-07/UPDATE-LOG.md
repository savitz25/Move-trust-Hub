# MoveTrustHub Logo Update — 2026-07-27

**Source:** `Consumer Trust Hub/logos for all verticals/MoveTrustHub-logo-transparent.png`  
**Cache bust:** `TRUST_HUB_LOGO_VERSION = 20260727`  
**Install script:** `node scripts/install-mth-logo.mjs`

## Locations updated

| Location | Asset / change |
|----------|----------------|
| Header / main nav (desktop + mobile) | `/logo.png?v=20260727` via `TrustHubLogoImage` / `HubLogo` |
| Footer | Same logo URL (`hub.logoSrc`) |
| Favicon (browser tab) | `/favicon-16.png`, `/favicon-32.png`, `/favicon.png`, `/favicon.jpg` |
| Apple touch icon | `/apple-touch-icon.png` (180×180) |
| PWA / web app icons | `/icon-192.png`, `/icon-512.png`, `manifest.webmanifest` |
| Metadata `icons` / `apple` | `lib/seo/site-metadata.ts` |
| Organization schema logo | `trustHubLogoUrl()` → `/logo.png?v=20260727` |
| Auth email layout | `supabase/auth-emails/layout.ts` logoUrl version |
| Auth email HTML previews | All `previews/*.html` version query |
| Open Graph brand mark | `app/opengraph-image.tsx` (A mark gradient, no emoji house) |
| Brand kit archive | `/public/brand/movetrusthub-logo.png`, source copy |
| Fallback formats | `logo-transparent.png`, `logo-dark.png`, `logo.jpg`, `logo-icon.jpg` |

## Not updated (out of scope / external)

| Area | Notes |
|------|--------|
| Social media profile images (X, LinkedIn, FB) | Manual upload outside repo |
| Google Business Profile | Manual |
| Partner/media kits outside this repo | Manual if they exist |
| PDF generators | No Move site PDF logo pipeline found in code |
| Insurance / Lender hub logos | Separate brand systems (unchanged) |

## Visual QA artifacts

- `docs/logo-update-2026-07/before-logo.png` — previous site logo
- `docs/logo-update-2026-07/after-logo.png` — new wordmark
- `docs/logo-update-2026-07/after-icon.png` — favicon mark
- `docs/logo-update-2026-07/header-desktop.png` — header mock (desktop)
- `docs/logo-update-2026-07/header-mobile.png` — header mock (mobile)
- `docs/logo-update-2026-07/footer-dark.png` — footer mock on navy

## Notes

- Header/footer layout unchanged; logo only.
- Transparent PNG cleaned (matte/halo removal + trim).
- Wordmark aspect ~3.84:1; CSS `.hub-logo-slot` already uses `object-contain`.
