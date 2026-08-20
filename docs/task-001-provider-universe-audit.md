# Provider universe audit (Task 001)

Generated from live `public.companies` on 2026-08-20. Regenerable via:

`npm run audit:provider-universe`

Google Places API requests: **0**

| Metric | Count |
| --- | ---: |
| Total company records | 468 |
| Interstate HHG carrier | 112 |
| HHG broker | 3 |
| HHG carrier + broker | 4 |
| Local / intrastate mover | 330 |
| Auto carrier | 8 |
| Auto broker | 10 |
| Auto carrier + broker | 0 |
| Companies in both HHG and auto | 6 |
| Unknown / unclassified | 7 |
| Inactive | 0 |
| Duplicate USDOT groups | 3 |
| Duplicate MC groups | 0 |
| Duplicate legal-name/address groups | 10 |

Machine-readable detail: `docs/task-001-provider-universe-audit.json`.

The first USDOT collision group (`125563`) is a shared placeholder across several national brand seeds (Allied, Mayflower, Atlas, Wheaton, Graebel, Arpin). That is `REVIEW_REQUIRED`, not a silent merge.
