# Insurance Trust Hub — primary navigation

Header chrome is shared via `HubNavbar` (`components/hub/hub-navbar.tsx`) when `hubId === 'insurance'`.

## Labels → hrefs (published routes only)

| Label | Href | Notes |
|-------|------|--------|
| Directory (dropdown) | `/directory` | Primary entry; dropdown also links hubs |
| → All agencies & agents | `/directory` | |
| → Health insurance hubs | `/hubs` | |
| → Browse by state | `/hubs/browse` | |
| → Relocation destinations | `/destinations` | |
| → Featured providers | `/providers` | |
| Calculators | `/calculators` | Educational tools hub |
| Guides | `/resources` | Coverage research |
| Methodology | `/methodology` | How we verify / list |
| Trust & Transparency | `/about` | Independence & standards |
| My Insurance | `/my-insurance` | Account / research HQ |
| Contact | `/contact` | |
| Compare agencies (CTA) | `/directory` | Primary green CTA — no lead-gen copy |

## Breakpoints

- **lg+ (desktop):** full primary row always visible (not gated at `xl` only).
- **&lt; lg (mobile):** My Insurance + Directory CTA chip + hamburger drawer with the same primary items.

## Source files

- `lib/nav/insurance-nav-config.ts` — links + active-path helpers
- `components/nav/insurance-desktop-nav.tsx`
- `components/nav/insurance-mobile-nav.tsx`
- `components/nav/my-insurance-nav-link.tsx`

Ask Trust Hub network switcher remains above the header (`AskNetworkBar`). No stub pages were required.
