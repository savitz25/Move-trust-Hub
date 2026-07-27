# LenderTrustHub Logo Update — 2026-07-27

**Project:** `move-trust-hub` (`/lender/*` section)  
**Source:** `Consumer Trust Hub/logos for all verticals/LenderTrustHub-logo-transparent.png`  
**Cache bust:** `LENDER_LOGO_VERSION = 20260727`  
**Install:** `node scripts/install-lender-logo.mjs`

## Behavior

| Section | Logo |
|---------|------|
| Moving pages (`/`, `/companies`, etc.) | MoveTrustHub |
| `/lender/*` | **LenderTrustHub** (new) |
| Insurance host / `/insurance/*` | InsuranceTrustHub (unchanged) |

## Locations updated

| Placement | Asset |
|-----------|--------|
| Hub navbar header (`HubLogo` hubId=lender) | `/lender/brand/lender-trust-hub-logo-nav.png?v=20260727` |
| Hub footer (`TrustHubLogoImage` hubId=lender) | full-color logo.png |
| `components/lender/BrandLogo` | hubId=lender header mark |
| `components/lender/BrandLogoStacked` + navy footer | light logo for dark bg |
| Lender brand kit files | nav / horizontal / stacked / favicon / icons |
| Lender Open Graph brand mark | A-mark gold/blue gradient |

## Favicon note

Site-wide favicon remains MoveTrustHub while lender is a path segment under movetrusthub.com. Lender-specific favicons are generated under `public/lender/brand/` for future standalone domain use.

## Screenshots

- `header-desktop.png` / `header-mobile.png` / `footer-dark.png`
- `after-logo.png` / `after-icon.png`

## External (manual later)

Social profiles, Google Business, standalone lendertrusthub.com when launched.
