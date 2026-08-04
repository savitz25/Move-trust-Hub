# Network deploy discipline

**Hard rule:** Production hosts are **not** the same Git repo. Network work that must appear on a domain must land in the repo that Vercel deploys for that domain.

## Production source of truth

| Domain | Production Git repo | Production URL | Vercel must track |
|--------|---------------------|----------------|-------------------|
| `www.asktrusthub.com` | **Conumers-Trust-Hub** | https://www.asktrusthub.com | Ask project → Ask `main` |
| `www.movetrusthub.com` | **Move-trust-Hub** (this repo) | https://www.movetrusthub.com | Move project → this `main` |
| `www.insurancetrusthub.com` | **Insurance-trust-hub** | https://www.insurancetrusthub.com | Insurance project → Insurance `main` |
| `www.lendertrusthub.com` | **Lender-Trust-Hub** | https://www.lendertrusthub.com | Lender project → Lender `main` |

## When you change X, push to Y

| Change type | Push to |
|-------------|---------|
| Ask router, Trust Center, Standard, life journeys | **Conumers-Trust-Hub** only |
| Move journey modules, Move chrome, Move methodology | **Move-trust-Hub** (this repo) |
| Insurance homepage / methodology / journey / seal / meta | **Insurance-trust-hub** |
| Lender homepage / methodology / journey / seal / meta / scores copy | **Lender-Trust-Hub** |
| Shared *idea* (Trust Mark, belonging line, journey label) | **All repos that render it on production** |

- Optional monorepo parity under `app/insurance` or `app/lender` is fine **in addition**, never instead of the standalone production repo.
- **Forbidden assumption:** “It’s in this monorepo under `app/insurance` so insurancetrusthub.com is updated.” **It is not.** Those apex domains deploy from **Insurance-trust-hub** / **Lender-Trust-Hub**.

## Network standard version

Constant: `lib/network/standard-version.ts` → `ASK_NETWORK_STANDARD_VERSION`

- **Bump when:** network bar/seal contract, journey module label API, Trust Mark, belonging line, methodology cross-links
- **Do not bump for:** unrelated vertical content, local SEO pages, data refreshes
- Live hosts expose `data-network-standard` on `<body>` for view-source checks

## Post-deploy smoke

Canonical script lives in **this repo**:

```bash
npm run smoke:network
```

Quick curls:

```bash
curl -sI https://www.asktrusthub.com/methodology
curl -sI https://www.movetrusthub.com/about/how-we-score-movers
curl -sI https://www.insurancetrusthub.com/methodology
curl -sI https://www.lendertrusthub.com/methodology
curl -sI https://www.asktrusthub.com/moving-to
```

Run after every network deploy across the four Vercel projects.

See also: [NETWORK-PR-CHECKLIST.md](./NETWORK-PR-CHECKLIST.md)

## Human: verify Vercel Git connections

1. Vercel → **Insurance** project → Settings → Git → repo = `Insurance-trust-hub`, branch `main`
2. Vercel → **Lender** project → repo = `Lender-Trust-Hub`, branch `main`
3. Vercel → **Move** project → repo = `Move-trust-Hub`, branch `main`
4. Vercel → **Ask** project → repo = `Conumers-Trust-Hub`, branch `main`
5. Production aliases match the `www` hosts in the table above

## Future option (out of scope)

Merging Insurance/Lender into this monorepo with multi-project deploy is optional process work — not required if standalones stay correctly connected.
