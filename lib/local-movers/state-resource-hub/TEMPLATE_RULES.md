# State Resource Hub — Master Template Rules

California (`/local-movers/california`) is the polished reference implementation.
Other states register a `StateResourceHubPack` only when they can support real,
state-specific substance. Do not force the full California-length experience on
small or thinly curated states.

## Crawlability (non-negotiable)

- Hub body content (hero, intents, snapshot, regulations, regions, costs, routes,
  challenges, county directory, tools, trust, FAQ) must render in the **server
  component tree** so it is present in the initial HTML.
- Client components are allowed only for progressive enhancement (sticky nav,
  interactive map tooltips, expand/collapse polish). Critical text must not
  depend on JS.

## Regions

| Curated county count | Display mode | Behavior |
|---------------------|--------------|----------|
| &lt; ~8 | `flat_county_list` | Skip regional cards; show county grid only |
| ~8–25 | `regions_as_anchors` | Compact region anchors; short lists OK |
| 25+ with distinct sub-markets | `full_regions` | Full region cards + progressive county reveal |

- Every curated county belongs to **exactly one** primary region (when regions exist).
- Use correct pluralization: “1 county” / “N counties”.
- Top metros may later graduate to dedicated region pages; keep IDs stable.

## Regulation module

Support one of:

1. **strong_state_regulator** (e.g. California BHGS)
2. **partial_state_regulation**
3. **primarily_federal** (FMCSA focus)
4. **limited_or_none**

Never invent a state household-goods regulator. Always include:

- Intrastate vs interstate distinction (as it applies in that state)
- Official verification links when they exist
- A “rules can change — verify current status” disclaimer

## Migration / routes

- Tag pack with `outbound_dominant` | `inbound_dominant` | `balanced`.
- Lead with the dominant direction; keep the other as a short secondary list.
- Prefer real destination/route hub links over empty keyword lists.

## Costs & challenges

- Include only claims you can defend with planning methodology + state context.
- Always show cost methodology near ranges (planning estimates, not quotes).
- Challenges must be state-specific (no national boilerplate fillers).

## County content tiers (site-wide)

| Tier | Role |
|------|------|
| Tier 1 / Deep | Major markets — full intelligence packs where justified |
| Tier 2 | Solid county guides |
| Tier 3 | Lean guides — accurate, useful, not padded |

Not every county needs flagship depth. Natural tiering protects site quality.

## CTA hierarchy (repeat after major sections)

1. **Primary** — Calculate moving cost (`/moving-calculator` or state-specific)
2. **Secondary** — Find & compare movers (`/companies`)
3. **Tertiary** — Explore region / county (`#regions` or map)

## Onboarding a new state

1. Confirm curated county coverage and regulation reality.
2. Choose region display mode via county count + distinct sub-markets.
3. Author pack content (no invented regulators or generic costs).
4. Register in `registry.ts`.
5. Smoke-test SSR HTML contains H1, BHGS/regs block (or federal alternative), FAQ.
