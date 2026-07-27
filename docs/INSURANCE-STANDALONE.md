# InsuranceTrustHub Standalone Destination

**Domain:** `https://www.insurancetrusthub.com`  
**Code surface:** monorepo `app/insurance/*` (still available at `movetrusthub.com/insurance/*` until selective migration)

## What changed (Phase 2 kickoff)

1. **No 308** from `insurancetrusthub.com` → MoveTrustHub (removed from `HUB_DOMAIN_REDIRECTS` / `vercel.json`).
2. **Host rewrite** in `middleware.ts`: bare paths on the insurance apex map to `/insurance/*` internally.
3. **Canonicals & sitemap** use `https://www.insurancetrusthub.com` with **no** `/insurance` prefix.
4. **Branding:** InsuranceTrustHub identity; primary nav is insurance-only; discreet ConsumerTrust Hub network footer note.
5. **Schema:** Organization + WebSite + parentOrganization → ConsumerTrust Hub network.
6. **robots.txt** is host-aware (insurance sitemap only on the insurance host).

## What we did **not** do

- No 301s from `movetrusthub.com/insurance/*` → insurance domain
- No deletion of Move `/insurance` content
- No mass thin location/provider page expansion

## Verify after deploy

```powershell
curl.exe -sI https://www.insurancetrusthub.com/
curl.exe -sI https://www.insurancetrusthub.com/directory
curl.exe -sI https://www.insurancetrusthub.com/tools/license-verification
# Expect: 200 (or 308 only for http→https), Location must NOT be movetrusthub.com
```

## Google Search Console

1. Add property for `https://www.insurancetrusthub.com` (or domain property).
2. Verify DNS/HTML as needed.
3. Submit `https://www.insurancetrusthub.com/sitemap.xml`.

## Core pages live (relative public paths on insurance apex)

| Path | Purpose |
|------|---------|
| `/` | Homepage |
| `/directory` | Main agent directory |
| `/tools` | Tools hub |
| `/tools/license-verification` | License verification |
| `/calculators/aca-subsidy` | ACA subsidy calculator |
| `/tools/medicare-plan-finder` | Medicare tools |
| `/tools/needs-assessment` | Needs assessment |
| `/calculators`, `/calculators/*` | Calculator suite |
| `/resources/*` | Guides (verify license, choose agent, MA vs Medigap, ACA, etc.) |
| `/hubs`, `/hubs/browse` | Health hubs |
| `/about` | Independence & methodology |
| `/contact`, `/privacy`, `/terms` | Standalone legal |

On Move, the same routes remain under `/insurance/*` until later migration.
