import { seedCompanies } from '@/data/seed-companies';
import { assessLicense } from '@/lib/trust/license-verification';

/** Seed-only verified directory set — client-safe (no Supabase). */
export function getVerifiedDirectoryCompaniesSeed() {
  return seedCompanies.filter(
    (c) => c.isVerified && assessLicense(c.usdotNumber, c.mcNumber).isDisplayable
  );
}
