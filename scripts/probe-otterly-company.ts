import { loadEnvLocal } from '../lib/verification/load-env-local';
loadEnvLocal();
import { createClient } from '@supabase/supabase-js';

async function main() {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await admin
    .from('companies')
    .select('id, slug, name, is_verified, usdot_number, headquarters')
    .ilike('name', '%otterly%');
  console.log('companies error', error?.message);
  console.log('companies', data);

  const { data: s, error: se } = await admin
    .from('company_suggestions')
    .select('id, name, status, company_id, selected_counties, service_scope')
    .ilike('name', '%otterly%');
  console.log('suggestions error', se?.message);
  console.log('suggestions', JSON.stringify(s, null, 2));

  if (data?.[0]) {
    const { data: a, error: ae } = await admin
      .from('company_destination_assignments')
      .select('*')
      .or(`company_id.eq.${data[0].id},company_slug.eq.${data[0].slug}`);
    console.log('assignments error', ae?.message);
    console.log('assignments', a);
  }

  // List columns via a wide select error if needed
  const { data: one } = await admin.from('companies').select('*').limit(1).maybeSingle();
  console.log('company columns sample keys', one ? Object.keys(one).sort() : null);
}
main();
