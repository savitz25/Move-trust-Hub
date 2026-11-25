# Move host residue for Insurance and Lender

Reviewed on `06de26a5dcd744256f7504e47c8b961bb9fea34a` plus this M5 commit. Documentation only. No route was removed and no account code was changed.

## What Move serves

Move does not serve Insurance or Lender HTML.

`lib/hub/domains.ts` states that Insurance and Lender are standalone apex destinations. `INSURANCE_SITE_URL` is `https://www.insurancetrusthub.com`. `LENDER_SITE_URL` is `https://www.lendertrusthub.com`.

`middleware.ts` on a non-insurance host sends public `/insurance` and `/insurance/*` to `INSURANCE_SITE_URL` with a 301, and sends `/lender` and `/lender/*` to `LENDER_SITE_URL` with a 301. Both redirects strip the prefix. `/insurance/admin` stays on the monorepo host. On the insurance host, move-only prefixes, including `/lender`, redirect away from that apex.

`components/hub/hub-navbar.tsx` renders `MoveNetworkHeader` when `hubId` is `move`. The insurance desktop and mobile nav loaders render only when `hubId` is `insurance`.

## Residue that stays

These files remain in the monorepo. This commit does not delete them.

| Path | Role |
| --- | --- |
| `components/nav/my-insurance-nav-link.tsx` | Client link to `/my-insurance`. Imported by `components/nav/insurance-desktop-nav.tsx` and `components/nav/insurance-mobile-nav.tsx`. |
| `components/nav/insurance-desktop-nav.tsx` | Insurance header. Loaded from `hub-navbar.tsx` only for the insurance hub. |
| `components/nav/insurance-mobile-nav.tsx` | Insurance mobile header. Same insurance-hub gate. |
| `hooks/lender/useCalculatorStorage.ts` | Lender calculator `localStorage` prefix `lth-calc-`. No other file imports it. |

`hooks/lender/` contains only `useCalculatorStorage.ts`.
