# Migrate mover data: FREE (uvq) → PRO (are)

## Projects

| Role | Ref | URL | Product |
|------|-----|-----|---------|
| **SOURCE (FREE)** | `uvqkyupfnpswdozmuzih` | `https://uvqkyupfnpswdozmuzih.supabase.co` | Legacy multi-product data |
| **TARGET (PRO Move)** | `arepfylnilkjmyduhwbz` | `https://arepfylnilkjmyduhwbz.supabase.co` | **Move Trust Hub** (auth + movers) |
| **Lender (separate)** | `hidcrbexurginnuqgjpx` | *(Lender-Trust-Hub project)* | **Lender** — do **not** put lender tables on `are` |

**Auth:** Google / magic-link / Save My Move stay on **are**. Migration never touches `auth.*` or `saved_*` / `user_profiles` by default.

### Lenders — out of scope for Move

`uvq.lenders` (~647 rows) were **legacy multi-product** data on FREE. They must **not** be migrated onto Move-Trust-Hub (`are`).

| Do | Don’t |
|----|--------|
| Keep Move `are` free of `lenders` / `lender_onboarding_*` | `npm run migrate:*` copying lenders onto are |
| Plan future Lender copy → **hidcrbexurginnuqgjpx** | Create `public.lenders` on are “for convenience” |

`migrate:uvq-to-are:remaining` **explicitly excludes** lenders.

## 1. Credentials in `.env.local`

```bash
# PRO / live Move app (are)
NEXT_PUBLIC_SUPABASE_URL=https://arepfylnilkjmyduhwbz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # are service_role

# FREE source (uvq)
SOURCE_SUPABASE_URL=https://uvqkyupfnpswdozmuzih.supabase.co
SOURCE_SUPABASE_SERVICE_ROLE_KEY=...   # uvq service_role only
```

Do **not** wrap values in `<angle brackets>`.

## 2. Schema parity on are (Move only)

1. Open [are SQL Editor](https://supabase.com/dashboard/project/arepfylnilkjmyduhwbz/sql)
2. Core movers: `supabase/migrations/20260806180000_are_mover_ops_schema_parity.sql`
3. Remaining Move ops (verification backfill, magic_link_*, views, etc.):  
   `supabase/migrations/20260806190000_are_remaining_ops_tables.sql`  
   or `scripts/output/APPLY-ON-ARE-REMAINING.sql`  
   **No lenders DDL.**

## 3. Data migration (Move)

```bash
npm run migrate:uvq-to-are -- --dry-run
npm run migrate:uvq-to-are -- --confirm

npm run migrate:uvq-to-are:remaining -- --dry-run
npm run migrate:uvq-to-are:remaining -- --confirm
# optional legacy quotes:
npm run migrate:uvq-to-are:remaining -- --confirm --include-quotes
```

Reports:

- `scripts/output/supabase-schema-diff-uvq-are.json`
- `scripts/output/supabase-migrate-uvq-to-are.json`
- `scripts/output/supabase-migrate-uvq-to-are-remaining.json`
- `scripts/output/supabase-table-parity-uvq-are.json`

## 4. Post-migrate (county locals)

```bash
npm run backfill:local-mover-counties -- --confirm
npm run audit:county-local-visibility -- --state=florida --county=broward
```

## 5. Vercel Production (Move)

Keep **only are** keys on Move Vercel:

- `NEXT_PUBLIC_SUPABASE_URL` = are  
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = are anon  
- `SUPABASE_SERVICE_ROLE_KEY` = are service_role  

Remove FREE/uvq keys from Move Production.

## Remaining Move-only tables (after main company migrate)

| Priority | Action |
|----------|--------|
| `company_verification_backfill_runs` | Create (SQL) + copy if still used (~80 on uvq) |
| `magic_link_rate_limits` / `magic_link_ip_rate_limits` | Optional create + copy |
| `company_verification_status` / `companies_with_stats` | **Views** — SQL only |
| `moving_companies` + `company_reviews` | Done when schema present |
| **lenders\*** | **Skip forever on are** → Lender project |

## Order notes

- `company_reviews` → requires `moving_companies` first (FK). Migrator filters orphans.
- `my_move_activity_events` only copies rows whose `user_id` exists on **are**.
- Never copies `user_profiles`, `saved_*`, `auth.*`, portal ownership tables, or **lenders**.
