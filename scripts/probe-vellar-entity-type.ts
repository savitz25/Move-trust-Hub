import { resolveEntityTypeForDisplay } from '@/lib/fmcsa/entity-type-display';
import { getCompanyBySlugOrUsdotFromDb } from '@/lib/supabase/queries/companies';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

async function main() {
  const company = await getCompanyBySlugOrUsdotFromDb('vellar-holdings-llc');
  if (!company) {
    console.log('No company from getCompanyBySlugOrUsdotFromDb');
    return;
  }

  console.log({
    slug: company.slug,
    entityType: company.entityType,
    usdotStatus: company.usdotStatus,
    services: company.services,
    resolve: resolveEntityTypeForDisplay({
      entityType: company.entityType,
      services: company.services,
    }),
  });
}

main().catch(console.error);