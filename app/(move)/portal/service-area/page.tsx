import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { getActiveOwnersForUser, ensurePortalProfile } from '@/lib/portal/ownership';
import { getVerifiedCoverageSignals } from '@/lib/portal/service-area';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { PortalShell } from '@/components/portal/portal-shell';
import { ServiceAreaEditor } from '@/components/portal/service-area-editor';

export const dynamic = 'force-dynamic';

export default async function PortalServiceAreaPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/portal/login');

  const owners = await getActiveOwnersForUser(user.id);
  if (owners.length === 0) redirect('/portal');

  const primary = owners[0];
  const company = await getCompanyBySlugAsync(primary.company_slug);
  const profile = await ensurePortalProfile(primary.company_id, primary.company_slug);
  const verified = await getVerifiedCoverageSignals({
    companyId: primary.company_id,
    headquarters: company?.headquarters,
    usdotNumber: company?.usdotNumber,
  });

  return (
    <PortalShell
      pathname="/portal/service-area"
      companyName={primary.company_name ?? primary.company_slug}
    >
      <div className="mb-6">
        <Link href="/portal" className="text-sm text-primary hover:underline">
          ← Dashboard
        </Link>
      </div>
      <ServiceAreaEditor
        companySlug={primary.company_slug}
        mode={profile.service_area_mode}
        states={profile.service_area_states}
        counties={profile.service_area_counties}
        radiusMiles={profile.service_area_radius_miles}
        lanes={profile.primary_interstate_lanes}
        coverageNotes={profile.coverage_notes}
        verifiedStates={verified.verifiedStates}
        verifiedNotes={verified.notes}
      />
    </PortalShell>
  );
}
