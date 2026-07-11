# Move Trust Hub

**The most trusted, transparent directory for comparing interstate moving companies in the United States.**

A production-ready, full-stack Next.js 15 website featuring 25+ major movers (Allied, United, North American, JK Moving, etc.), advanced filters, side-by-side comparison, verified reviews, FMCSA licensing data, reputation scoring, interactive coverage maps, educational resources, admin tools, and excellent SEO.

## Key Features

- **Comprehensive Directory** — 25 seeded major interstate movers with rich structured data
- **Advanced Filtering & Sorting** — Reputation, rating, price, complaint ratio, years, BBB, services, coverage
- **Powerful Search** — Name, headquarters, specialties, keywords
- **Company Profiles** — Full details: overview, licensing (USDOT/MC), pricing, pros/cons via data, services, coverage map, recent reviews (multi-source)
- **Side-by-Side Compare** — Select up to 4 companies. Deep-linkable. Persistent in localStorage via Zustand
- **Reviews System** — Aggregated + filterable by source and verified status. Easy to extend
- **Interactive Coverage Map** — Lightweight SVG region highlighting (no paid map APIs)
- **Resources / Guides** — How to choose, FMCSA explained, scam avoidance, checklists
- **Admin Dashboard** — In-browser add/edit/delete (demo). Ready to wire to Supabase RLS
- **Trust Signals** — Prominent badges for FMCSA, BBB, Verified, etc.
- **Modern Stack** — Next.js 15 (App Router) + TypeScript + Tailwind + Framer Motion + shadcn-style components + TanStack concepts + Zustand + Supabase-ready

## Tech Stack & Architecture

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind v4, Framer Motion
- **UI Components**: Custom shadcn-inspired (Button, Card, Badge, StarRating, Dialog, etc.)
- **State**: Zustand (compare selections + persistence)
- **Data Layer**: `lib/data.ts` with seamless fallback from Supabase → local seed data
- **Backend**: Next.js API routes + Supabase (PostgreSQL)
- **SEO**: Server components + generateMetadata, full sitemap.xml + robots.txt, rich schema-ready markup
- **Theming**: next-themes (light/dark) with professional blue/green trustworthy palette
- **Accessibility**: WCAG 2.2 AA focus states, semantic HTML, keyboard friendly

## Project Structure

```
app/
  layout.tsx                 # Root layout + SEO metadata + Navbar/Footer
  page.tsx                   # Homepage (hero, stats, top movers, value props)
  companies/
    page.tsx                 # Directory (SSR initial data)
    [slug]/page.tsx          # Dynamic company profile
  compare/page.tsx           # Comparison tool
  admin/page.tsx             # Simple CMS-like admin (demo)
  api/companies/route.ts
  (marketing)/               # Marketing pages (about, contact, resources)
  globals.css
  sitemap.ts
  robots.ts

components/
  ui/                        # Reusable primitives (button, card, badge, star-rating, dialog...)
  directory/
  compare/
  reviews/
  map/
  navbar.tsx, footer.tsx

lib/
  data.ts                    # Unified data access (Supabase + seed fallback)
  supabase/
  utils.ts

data/
  seed-companies.ts          # 25 high-quality realistic companies
  seed-reviews.ts

store/
  compare-store.ts           # Zustand persisted selection

supabase/
  schema.sql                 # Complete production schema + RLS + indexes

types/
  index.ts                   # Core Company / Review / Filter types
```

## Getting Started

### 1. Install Dependencies

```bash
cd interstate-movers-usa
npm install
```

### 2. (Recommended) Set Up Supabase (Optional but Production-Ready)

1. Create a new Supabase project at https://supabase.com
2. Run the full schema:

```bash
# Copy contents of supabase/schema.sql into the Supabase SQL Editor and execute
```

3. Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# For seeding only (server-side)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Seed the database:

```bash
npm run seed
```

If Supabase vars are not present, the site gracefully falls back to the high-quality local seed data (perfect for demos and development).

### 3. Run the Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 4. Other Scripts

- `npm run build` — Production build (includes sitemap generation)
- `npm run lint`
- `npm run typecheck`
- `npm run seed` — Populate Supabase

## Environment Variables

| Variable                        | Required | Purpose                              |
|--------------------------------|----------|--------------------------------------|
| NEXT_PUBLIC_SUPABASE_URL       | No*      | Live data source                     |
| NEXT_PUBLIC_SUPABASE_ANON_KEY  | No*      | Public client access                 |
| SUPABASE_SERVICE_ROLE_KEY      | Only for seed | Admin seeding script          |
| RESEND_API_KEY                 | For email leads | Powers quote request notifications via Resend |
| RESEND_FROM                    | Recommended for prod | Sender address e.g. `Move Trust Hub <quotes@movetrusthub.com>` (requires verified domain in Resend) |
| QUOTE_TEAM_EMAIL               | No       | Recipient for new quote leads (defaults to mhenry@amerisafemoving.com) |

*Without Supabase the site uses realistic local seed data.

### Lead Emails via Resend

Quote requests from the "Get Free Quotes" modal are:

- Always logged to the browser console (`[Quote Lead Captured]`) — 100% reliable for visibility
- Inserted into the `quote_requests` table in Supabase (when the two NEXT_PUBLIC_ keys are set)
- Sent as a nicely formatted email + confirmation receipt to the submitter (when `RESEND_API_KEY` is present)

**To deliver emails to the team (and confirmation to leads):**

1. In the [Resend dashboard](https://resend.com), add and **verify** your domain (e.g. `movetrusthub.com`). Follow the DNS instructions (TXT, MX or CNAME records).
2. On Vercel, set these environment variables (Production + Preview):
   - `RESEND_API_KEY` (the one you created in Resend)
   - `RESEND_FROM="Move Trust Hub <quotes@movetrusthub.com>"` (or `hello@...` — must match the verified domain)
   - Optionally `QUOTE_TEAM_EMAIL` if you want a different internal inbox
3. Redeploy.

Until the domain is verified, Resend's test sender (`onboarding@resend.dev`) only allows sending to the address associated with your Resend account. External addresses (e.g. mhenry@amerisafemoving.com) will get a 403.

Once verified + envs set, the next form submission will:
- Email the full lead details to the team address
- Email a friendly confirmation + summary to the person who filled out the form (using their submitted email)

The modal always shows success to the user immediately (non-blocking). Check the Network tab or browser console for `[Quote Email Sent]` logs containing `messageIds` from Resend for tracking.

## Adding / Updating Companies (Extensibility)

### Option A — Local Seed (fastest for prototyping)
Edit `data/seed-companies.ts` and `data/seed-reviews.ts`. The data layer will pick it up.

### Option B — Admin Dashboard
Visit `/admin` while running. Add/edit/delete. (Session-only until you persist.)

### Option C — Supabase (recommended for production)
Use the Supabase dashboard or write a small import script. The schema is fully normalized with proper indexes and RLS.

The `lib/data.ts` file is the single source of truth — extend the functions there when you add new sources (Airtable, CSV, etc.).

## SEO & Performance

- All critical pages are server-rendered or statically generated where possible
- Full `sitemap.ts` + `robots.ts`
- Rich metadata per company profile
- Optimized images + font loading
- Fast filtering via client-side with small dataset (easily swapped for server-side filtering + infinite scroll later)
- Clean, semantic markup ready for Organization / LocalBusiness / Review schema (add JSON-LD in a follow-up PR if desired)

## Design System Notes

- Deep trustworthy blue (`#0A4D8C`) + teal accents (`#0F766E`)
- Heavy use of cards, subtle elevation, star ratings, and trust badges
- Mobile-first fully responsive
- Dark mode supported out of the box

## Deployment (Vercel — Recommended)

1. Push to GitHub
2. Import project on Vercel
3. Add your Supabase environment variables (or skip for seed-only)
4. Add Resend variables (RESEND_API_KEY + RESEND_FROM after domain verification) to enable real quote lead emails
5. Deploy — automatic sitemap and everything works

The project is already optimized for Vercel (edge functions not required, but easy to add).

## Future Enhancements (Ideas)

- Real user-submitted reviews (with moderation queue)
- TanStack Table v8 with column sorting, pagination, virtualization
- Full JSON-LD schema markup
- Email alerts / saved searches (requires auth)
- Real interactive Leaflet or MapLibre map with actual agent locations
- CSV/Excel bulk import in admin
- Price estimator tool based on move distance + size

## Marketing Site Positioning

The site has been evolved into a **customer-focused marketing and lead-generation platform** (inspired by moving.com, moveadvisor.com, and movingleads.com) while keeping all the powerful research tools you loved:

- Strong value proposition in the hero
- Prominent "Get Free Quotes" CTAs throughout (opens a professional multi-field quote request modal)
- "How it Works" and benefits sections
- Tools section highlighting the Calculator, Directory, and Comparison as free resources
- Social proof and testimonials
- Lead capture that feels helpful ("We'll match you with 2-3 verified movers")

The directory, comparison tool, and moving calculator remain core features but are now framed as powerful free tools that help users make better decisions (and naturally lead to quote requests).

### Quote Request Flow
- Accessible from Navbar (primary CTA)
- Hero on home
- End of the Moving Calculator results
- Collects move details + contact info
- On submit: Friendly success message + "we'll connect you with movers"

In a real production setup you would send these leads to your CRM/email system or a Supabase `leads` table.

## Moving Calculator (Smart Move Estimator)

A self-contained, production-ready **Moving Size Calculator** has been added at `/moving-calculator`.

### Features Implemented
- **Dual Modes**: "By Room" (recommended — room-specific items) and "Quick Add" (search any item).
- **Furniture Database**: 70+ real-world items with accurate cubic foot volumes, parsed and categorized from industry data (originally provided in `items-volume.xlsx`).
- **Real-time Calculation**: Prominent total volume, item count, and live recommendation.
- **Move Recommendations**: Studio → 4+ Bedroom with suggested truck size, number of movers, and duration.
- **Visual Feedback**: Progress bar, grouped inventory by room, quantity +/- controls, remove.
- **Custom Items**: Users can add their own items with manual volume.
- **Persistence**: Inventory saved to localStorage automatically.
- **Quote CTA**: Opens a simple form modal (demo — logs to console; easy to wire to email/API).
- **Animations**: Smooth Framer Motion transitions on add/remove.
- **Mobile-first + Dark Mode**: Fully responsive and uses the site's existing theme.

### How It Was Integrated
- Page: `app/moving-calculator/page.tsx` (client component)
- Data: `data/furniture.ts` (typed + categorized)
- State: `store/calculator-store.ts` (Zustand + persist middleware)
- Navigation: Added "Move Calculator" link in `components/navbar.tsx`

### To Integrate Into Another Existing Next.js Project

1. Copy these files/folders:
   - `app/moving-calculator/page.tsx`
   - `data/furniture.ts`
   - `store/calculator-store.ts`
   - (optional) Update your navbar with a link to `/moving-calculator`

2. Ensure you have the required dependencies (already in this project):
   ```bash
   npm install zustand framer-motion sonner lucide-react
   ```

3. If you don't have shadcn/ui components yet, the page uses:
   - Button, Card, Input, Badge, Dialog (from `@/components/ui/*`)
   - You can either copy the minimal UI components or replace with your own (Tailwind + native elements work too).

4. (Optional) Update `app/layout.tsx` metadata or add a link in your marketing pages.

5. The calculator is 100% client-side. No API calls required.

6. To customize the furniture list: edit `data/furniture.ts`. Each item needs `name`, `volume` (cu ft), and `category`.

7. To change move size brackets / recommendations: edit the `MOVE_SIZES` array inside the page component.

### Standalone Usage
The page is fully functional as `/moving-calculator`. It matches the trustworthy blue/green design language of the rest of the site.

Run the dev server and visit http://localhost:3000/moving-calculator to test.

## Data Sources & Attribution

All seed data is synthesized to be realistic and representative based on publicly known characteristics of these brands. **In a real production site you would regularly refresh from**:

- FMCSA SAFER / SMS
- BBB.org
- Google / Trustpilot reviews (with proper attribution)
- Company websites

Always display fresh "last updated" dates.

## Lender Profile Enrichment (LenderTrustHub)

Bulk-enriches all mortgage lender profiles with Google Places, BBB, CFPB, and county experience scores. Results are stored in Supabase (`lenders` table) and exported to `data/lender/enrichments.json` for static profile pages.

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GOOGLE_PLACES_API_KEY` | Recommended | Google Places API (New) — ratings & review snippets |
| `BBB_API_KEY` | Optional | Official BBB partner API (falls back to public scrape) |
| `SUPABASE_SERVICE_ROLE_KEY` | For DB persist | Upsert enriched rows to `lenders` |
| `NEXT_PUBLIC_SUPABASE_URL` | For DB persist | Lender Supabase project URL |
| `CRON_SECRET` | For scheduled refresh | Auth header for `/api/refresh/lenders` |

### One-time full run

```bash
# Apply migration first (Supabase SQL editor or CLI)
# supabase/migrations/20260710190000_lender_enrichment.sql

# Dry-run single lender
npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-lenders-batch.ts --slug=<lender-slug>

# Dry-run first 10 lenders
npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-lenders-batch.ts --limit=10

# Live run (writes JSON + Supabase)
npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-lenders-batch.ts --confirm --mode=full
```

Process all 647 lenders in batches to respect rate limits:

```bash
npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-lenders-batch.ts --confirm --mode=full --limit=40 --offset=0
npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-lenders-batch.ts --confirm --mode=full --limit=40 --offset=40
# ... repeat until offset >= 647
```

### Scheduled refresh (Vercel Cron)

`vercel.json` includes:

- Daily incremental: `/api/refresh/lenders?mode=incremental&limit=40` at 08:00 UTC
- Weekly full batch: `/api/refresh/lenders?mode=full&limit=80` Sunday 03:00 UTC

Manual trigger (admin session or cron secret):

```bash
curl -H "Authorization: Bearer $CRON_SECRET" "https://www.movetrusthub.com/api/refresh/lenders?mode=incremental&limit=5"
```

### Testing checklist

1. **Single lender dry-run** — confirm Google/BBB/CFPB logs in `scripts/output/lender-enrichment-*.json`
2. **Profile page** — visit `/lender/lenders/<slug>` and verify Trust Signals section
3. **Directory filters** — county page `?minRating=4.5&bbbAccredited=true`
4. **Bulk dry-run** — `--limit=10` without `--confirm` should not write files

## License & Legal

Educational / informational use. Not affiliated with any listed moving company.

---

Built with care for customers who deserve transparency when making one of life's biggest and most stressful decisions.

Questions or feedback? Open an issue or email the contact address listed on the site.
