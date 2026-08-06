# Migrate mover data: FREE (uvq) → PRO (are)

## Projects

| Role | Ref | URL |
|------|-----|-----|
| **SOURCE (FREE)** | `uvqkyupfnpswdozmuzih` | `https://uvqkyupfnpswdozmuzih.supabase.co` |
| **TARGET (PRO)** | `arepfylnilkjmyduhwbz` | `https://arepfylnilkjmyduhwbz.supabase.co` |

**Auth:** Google / magic-link / Save My Move stay on **are**. Migration never touches `auth.*` or `saved_*` / `user_profiles` by default.

## 1. Credentials in `.env.local`

```bash
# PRO / live app (are) — already used by Next.js
NEXT_PUBLIC_SUPABASE_URL=https://arepfylnilkjmyduhwbz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # are service_role

# FREE source (uvq) — Dashboard → Project Settings → API → service_role
SOURCE_SUPABASE_URL=https://uvqkyupfnpswdozmuzih.supabase.co
SOURCE_SUPABASE_SERVICE_ROLE_KEY=...   # uvq service_role only
```

Do **not** wrap values in `<angle brackets>`.

## 2. Schema parity on are

1. Open [are SQL Editor](https://supabase.com/dashboard/project/arepfylnilkjmyduhwbz/sql)
2. Paste and run: `supabase/migrations/20260806180000_are_mover_ops_schema_parity.sql`
3. Confirm tables exist: `companies`, `company_destination_assignments`, `company_suggestions`, …

Or:

```bash
npm run migrate:uvq-to-are -- --schema-only
# then apply the printed SQL path on are
```

## 3. Data migration

```bash
npm run migrate:uvq-to-are -- --dry-run
npm run migrate:uvq-to-are -- --confirm
```

Reports:

- `scripts/output/supabase-schema-diff-uvq-are.json`
- `scripts/output/supabase-migrate-uvq-to-are.json`

## 4. Post-migrate

```bash
# Uses TARGET (are) credentials as default SUPABASE_*
npm run backfill:local-mover-counties -- --confirm
npm run audit:county-local-visibility -- --all-states
npm run audit:county-local-visibility -- --state=florida --county=broward
```

## 5. Vercel Production

Keep **only are** keys in Vercel Production:

- `NEXT_PUBLIC_SUPABASE_URL` = are
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = are anon
- `SUPABASE_SERVICE_ROLE_KEY` = are service_role

Remove FREE/uvq keys from Production env so onboard/admin cannot dual-brain.

## Success checks

1. are `companies` count ≈ uvq `companies` count  
2. Broward audit `supabaseEligible` > 0 when locals exist  
3. Google / magic-link login still works on production  
4. Sample `/companies/{slug}` from former FREE data resolves  
