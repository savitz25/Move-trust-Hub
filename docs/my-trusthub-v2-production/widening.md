# My TrustHub V2 — Move widening (any eligible published mover)

The one-click Save / Saved / Unsave path no longer depends on the Hindman
canary attestation. In production the Move runtime decides eligibility from the
real publication source at the moment of each Save.

## Publication source

- **Source:** `public.companies` in the Move production project
  `arepfylnilkjmyduhwbz`, read anonymously (public RLS, anon key) — the same
  read that renders `/companies/<slug>`, judged with the same rules
  (`isAnonymousPublicProfileAllowed`, `classifyProvider`).
- **Grain:** one `companies` row. The stable native identity is the USDOT
  number, `usdot-<number>`. Row ids are not uniform (some `usdot-<number>`,
  some legacy names), so the row id is never the identity.
- **Read shape:** two exact-equality lookups (`slug = …`, `usdot_number = …`),
  at most three rows each. No search, pattern, alias or enumeration.
- Code: `lib/my-trusthub/publication-source.ts` (rules),
  `lib/my-trusthub/companies-publication-port.ts` (the read).

## Eligibility (all must hold)

1. Exactly one `companies` row carries the USDOT number.
2. `publication_state = 'PUBLISHABLE'` explicitly (a row merely existing, or a
   legacy row with no state, is not eligible).
3. Not out of service.
4. Class `mover`: the profile page's classifier gives a household-goods carrier
   capability (`hhg_interstate_carrier`, `hhg_intrastate`, `hhg_local`).
   Broker-only and auto-only profiles are not supported.
5. Well-formed canonical slug, equal to the profile being saved.
6. Ask returns exactly one **accepted** network binding for that identity
   (`move` / `mover` / `fmcsa.usdot` / `US` / the same number). Zero, several or
   `review_required` is not eligible.

Not eligible means: the device Save still happens, nothing is staged with Ask,
no account success is shown ("This profile can’t be added to My TrustHub yet.").

## What changed in production objects

Nothing on the Move database. `mth_profile_transfer.certified_publication` is no
longer read by the production runtime; leave it in place (dropping it is a
separate cleanup). The isolated preview pair still reads its own copy in the
isolated database and never reads production.

No new environment variable. The existing publication attestation pair
(`MTH_V23_MOVE_PRODUCTION_SOURCE[_APPROVED]`) still gates the source.

## Widening canary (three movers)

| # | Slug | USDOT | Legal name |
| --- | --- | --- | --- |
| 1 | `hindman-isaacs-moving-storage-inc` | 1002530 | HINDMAN & ISAACS MOVING & STORAGE, INC. |
| 2 | `gentle-giant-moving` | 373544 | GENTLE GIANT INTERSTATE COMPANY LLC |
| 3 | `caraway-moving-inc` | 1684331 | CARAWAY MOVING INC |

#2 is a curated legacy row (row id `gentle-giant`, slug differs from id); #3 is
a federal-ingest row like Hindman (row id `usdot-1684331`).

Activation order (operator; none of this is done by the code deploy):

1. Ask database: apply `09-ask-prod-move-binding-resolver-forward.sql`.
2. Ask database: for #2 and #3, run `10-ask-prod-move-mover-binding.sql`
   (preflight, then the conditional forward) — one mover at a time.
3. Confirm the three profiles are eligible from Move's side (read-only):
   `tsx --env-file=.env.local --require ./scripts/stub-server-only.cjs scripts/qa/mth-publication-source-probe.ts hindman-isaacs-moving-storage-inc gentle-giant-moving caraway-moving-inc`
4. Move Vercel production: set
   `NEXT_PUBLIC_MOVE_PARENT_SAVE_CANARY_SLUGS=hindman-isaacs-moving-storage-inc,gentle-giant-moving,caraway-moving-inc`
   with the existing handoff flags, and rebuild (the value is bundled).
5. Ask Vercel production: enable the existing handoff flag as for the Hindman canary.

Rollback: turn the flags off (no rebuild needed for
`MTH_MOVE_PARENT_SAVE_MODE`); the Ask resolver packet has its own rollback file.

Do not remove the three-slug list until the live three-mover proof passes.
Removing it turns on one-click sync on every mover profile page and the
one-account presentation (header entry, My Move card); movers without an
accepted Ask binding simply stay device-only.

## Known limits

- A mover is eligible only once Ask holds an accepted binding for it. Today
  that is a governed, per-mover operator step; there is no bulk binding of the
  published directory in this ship.
- Ask's existing hand-off limit is 10 account Saves per minute per session; an
  11th inside a minute stays a device Save.
