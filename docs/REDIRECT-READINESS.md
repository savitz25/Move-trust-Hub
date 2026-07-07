# Redirect Readiness — movetrusthub.com

**Primary site:** `https://www.movetrusthub.com`  
**GA4:** `G-433BDVV8MJ` (see `components/ga-events.tsx`)  
**Legacy domains (308 → subdirectories):** `lendertrusthub.com`, `insurancetrusthub.com`

| Hub | URL prefix | Legacy domain |
|-----|------------|---------------|
| Move | `/` | *(primary — no redirect)* |
| Lender | `/lender/*` | `lendertrusthub.com` |
| Insurance | `/insurance/*` | `insurancetrusthub.com` |

---

## Pre-deploy checklist

- [ ] `npm run build` passes locally
- [ ] `vercel.json` **host redirects are first** in the `redirects` array (prevents `/lender/lender/...` double-prefix bug)
- [ ] Host redirects include `?from=` query (welcome banner + GA4 attribution)
- [ ] Vercel project domains include all four legacy hosts (see below)
- [ ] GA4 Admin → Data Streams → Configure domains lists movetrusthub + legacy domains

---

## Vercel domains (single project)

Attach to the **Move Trust Hub** Vercel project:

- `movetrusthub.com`, `www.movetrusthub.com` *(primary)*
- `lendertrusthub.com`, `www.lendertrusthub.com`
- `insurancetrusthub.com`, `www.insurancetrusthub.com`

Host-based 308 rules in `vercel.json` fire when legacy domains hit this deployment.

---

## Deploy

```bash
git add components/hub/legacy-welcome-banner.tsx components/hub/hub-chrome.tsx \
  components/ga-events.tsx components/performance/deferred-gtag.tsx \
  lib/migration/legacy-sources.ts lib/migration/hub-redirects.ts vercel.json docs/REDIRECT-READINESS.md
git commit -m "feat: legacy 308 welcome banner, GA4 cross-domain linker, ?from= redirects"
git push origin main
```

Wait for Vercel **Production** deploy → **Ready**.

---

## Verify 308 redirects (production)

```powershell
curl.exe -sI https://www.lendertrusthub.com/calculators
curl.exe -sI https://www.insurancetrusthub.com/directory
```

**Expected:**

| Request | Status | Location |
|---------|--------|----------|
| `lendertrusthub.com/calculators` | `308` | `https://www.movetrusthub.com/lender/calculators?from=lendertrusthub` |
| `insurancetrusthub.com/directory` | `308` | `https://www.movetrusthub.com/insurance/directory?from=insurancetrusthub` |

Path aliases on movetrusthub.com itself (no host change):

| Legacy path | New path |
|-------------|----------|
| `/local-lenders` | `/lender/local-lenders` |
| `/directory` | `/insurance/directory` |
| `/calculators` | `/lender/calculators` |
| `/calculators/premium-estimator` | `/insurance/calculators/premium-estimator` |

---

## Verify welcome banner

1. Visit `https://www.movetrusthub.com/lender?from=lendertrusthub`
2. Confirm gradient welcome bar below navbar
3. Dismiss → refresh → banner stays hidden (sessionStorage)
4. Repeat for `https://www.movetrusthub.com/insurance?from=insurancetrusthub`

---

## Verify GA4 Realtime

1. Open [GA4 Realtime](https://analytics.google.com/) → property `G-433BDVV8MJ`
2. Visit `https://www.movetrusthub.com/`
3. Confirm **1 active user** within ~30s
4. Navigate to `/lender` → hub-dimensioned `page_view` (custom param `hub: lender`)
5. Visit `/lender?from=lendertrusthub` → `legacy_redirect_arrival` event (register as custom event in GA4 if needed)
6. After 308 cutover: hit `lendertrusthub.com` → confirm same session continues (cross-domain linker)

**GA4 Admin → Configure tag settings → Configure your domains:**

```
movetrusthub.com
www.movetrusthub.com
lendertrusthub.com
www.lendertrusthub.com
insurancetrusthub.com
www.insurancetrusthub.com
```

---

## Google Search Console (cutover day)

- [ ] Submit `https://www.movetrusthub.com/sitemap.xml`
- [ ] Submit `https://www.movetrusthub.com/lender/sitemap.xml`
- [ ] Submit `https://www.movetrusthub.com/insurance/sitemap.xml`
- [ ] Change of Address for `lendertrusthub.com` and `insurancetrusthub.com`
- [ ] Monitor Coverage for 7 days

---

## Rollback

Remove legacy domains from Vercel project or disable host redirects in `vercel.json` → redeploy. Legacy domains resume serving their prior hosts if DNS still points elsewhere.

---

## Readiness sign-off

| Item | Status |
|------|--------|
| GA4 `G-433BDVV8MJ` + cross-domain linker | ✅ |
| Hub selector (Move \| Lender \| Insurance) | ✅ |
| `/lender` + `/insurance` hub chrome | ✅ |
| Legacy welcome banner (`?from=`) | ✅ |
| `vercel.json` 308 host redirects | ✅ |
| Path alias redirects (calculators, directory, etc.) | ✅ |
| Legacy fallback pages for unmigrated URLs | ✅ |
| Hub-dimensioned analytics (`hub` param) | ✅ |
| `legacy_redirect_arrival` event | ✅ |
| Production build | Run before deploy |