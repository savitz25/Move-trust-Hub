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
- **2026.08.06:** ownership seal contract — replace bare “Independently operated” with common-ownership line

### Ownership seal (Priority 5)

| Field | Value |
|-------|--------|
| Short | `Common ownership · Separated research & listing order · No paid placements` |
| Long | Move, Insurance, and Lender Trust Hub are part of the Ask Trust Hub network — common ownership, separated research and ordering, no paid placements. |

Independence = no paid placements / research order not for sale. Not “unaffiliated companies.”

### Hero intent (Priority 4 — vertical copy, version optional)

| Hub | Hero intent question |
|-----|----------------------|
| Ask | What are you preparing for? |
| Move | Where are you going? |
| Lender | What are you trying to accomplish? |
| Insurance | What are you trying to protect? |

Hero copy is **vertical product intent**, not network chrome. Do **not** bump `ASK_NETWORK_STANDARD_VERSION` for hero-only wording unless the shared belonging line / Trust Mark / bar contract also changes.

### Trust Mark contract (Priority 3)

| Field | Value |
|-------|--------|
| Primary label | `Ask Trust Hub Standard` |
| Long form | `Researched to the Ask Trust Hub Standard` |
| URL | `https://www.asktrusthub.com/methodology` |
| Network bar **Standards** | → Ask `/methodology` (not independence-only) |

Do not invent badges that imply provider endorsement. Component: `TrustMark` / `TrustStandardMark`.

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

## Domain ownership cheat-sheet (2026)

| Domain | Owns deploy | Do not assume |
|--------|-------------|----------------|
| `movetrusthub.com` | This monorepo (`Move-trust-Hub`) Vercel project | — |
| `insurancetrusthub.com` | **`Insurance-trust-hub`** standalone Vercel project | `app/insurance` on Move does not update ITH |
| `lendertrusthub.com` | **`Lender-Trust-Hub`** standalone Vercel project | `app/lender` on Move does not update LTH |

**Example:** Commit `9a273f76` (Insurance always-visible primary nav) on Move monorepo only updated Move’s deployment. Live `insurancetrusthub.com` header required a matching change on **`Insurance-trust-hub` `main`**.

See also: Insurance repo `docs/VERCEL-DOMAIN-OWNERSHIP.md`.
