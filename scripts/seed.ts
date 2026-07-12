/**
 * Seed script: Populates Supabase (or can be adapted for other DBs).
 * Run with: npm run seed   (requires tsx + valid Supabase env)
 *
 * This script is idempotent (upserts by id).
 */
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

function loadEnvLocal() {
  const path = resolve(process.cwd(), '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) {
      process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}

loadEnvLocal();
import { seedCompanies } from '../data/seed-companies';
import { seedReviews } from '../data/seed-reviews';
import type { Database } from '../types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for seeding

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('Seeding companies...');

  // Companies
  const companiesToInsert = seedCompanies.map(c => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    short_description: c.shortDescription,
    description: c.description,
    founded_year: c.foundedYear,
    headquarters: c.headquarters,
    website: c.website,
    usdot_number: c.usdotNumber,
    mc_number: c.mcNumber,
    fmcsa_safety_rating: c.fmcsaSafetyRating,
    fmcsa_complaints: c.fmcsaComplaints,
    fmcsa_shipments: c.fmcsaShipments,
    bbb_rating: c.bbbRating,
    bbb_accredited: c.bbbAccredited,
    overall_rating: c.overallRating,
    review_count: c.reviewCount,
    reputation_score: c.reputationScore,
    years_in_business: c.yearsInBusiness,
    avg_price_per_move: c.avgPricePerMove,
    price_range: c.priceRange,
    coverage: c.coverage,
    services: c.services,
    specialties: c.specialties,
    rating_breakdown: c.ratingBreakdown,
    is_verified: c.isVerified,
    last_updated: c.lastUpdated,
  }));

  const { error: companyError } = await supabase
    .from('companies')
    .upsert(companiesToInsert, { onConflict: 'id' });

  if (companyError) {
    console.error('Error seeding companies:', companyError);
    process.exit(1);
  }
  console.log(`✓ Seeded ${companiesToInsert.length} companies`);

  // Reviews
  console.log('Seeding reviews...');
  const reviewsToInsert = seedReviews.map(r => ({
    id: r.id,
    company_id: r.companyId,
    author: r.author,
    rating: r.rating,
    date: r.date,
    source: r.source,
    title: r.title ?? null,
    content: r.content,
    verified: r.verified,
    location: r.location ?? null,
  }));

  const { error: reviewError } = await supabase
    .from('reviews')
    .upsert(reviewsToInsert, { onConflict: 'id' });

  if (reviewError) {
    console.error('Error seeding reviews:', reviewError);
  } else {
    console.log(`✓ Seeded ${reviewsToInsert.length} reviews`);
  }

  console.log('\n✅ Seed complete!');
}

seed().catch(console.error);
