import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requirePortalSession } from '@/lib/portal/mfa';
import { getActiveOwnersForUser, ensurePortalProfile } from '@/lib/portal/ownership';
import { getVerifiedCoverageSignals } from '@/lib/portal/service-area';
import {
  buildServiceAreaPrefill,
  loadCompanyFmcsaRaw,
} from '@/lib/portal/service-area-prefill';
import { buildCountyCatalog } from '@/lib/portal/county-catalog';
import { localStates } from '@/lib/local-movers/states';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { PortalShell } from '@/components/portal/portal-shell';
import { ServiceAreaEditor } from '@/components/portal/service-area-editor';

export const dynamic = 'force-dynamic';

export default async function PortalServiceAreaPage() {
  const session = await requirePortalSession({ nextPath: '/portal/service-area' });

  const owners = await getActiveOwnersForUser(session.userId);
  if (owners.length === 0) redirect('/portal');

  const primary = owners[0];
  const company = await getCompanyBySlugAsync(primary.company_slug);
  const profile = await ensurePortalProfile(primary.company_id, primary.company_slug);
  const fmcsaRaw = await loadCompanyFmcsaRaw(primary.company_id);

  const prefill = await buildServiceAreaPrefill({
    companyId: primary.company_id,
    profile,
    headquarters: company?.headquarters,
    fmcsaRaw,
    legalName: company?.name,
  });

  const verified = await getVerifiedCoverageSignals({
    companyId: primary.company_id,
    headquarters: company?.headquarters,
    usdotNumber: company?.usdotNumber,
  });

  const countyCatalog = buildCountyCatalog();
  const stateSlugByCode = Object.fromEntries(localStates.map((s) => [s.code, s.slug]));

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
        mode={prefill.mode}
        states={prefill.states}
        counties={prefill.counties}
        radiusMiles={prefill.radiusMiles}
        lanes={prefill.lanes}
        coverageNotes={prefill.coverageNotes}
        verifiedStates={verified.verifiedStates}
        verifiedNotes={verified.notes}
        countyCatalog={countyCatalog}
        stateSlugByCode={stateSlugByCode}
        prefillSources={prefill.prefillSources}
      />
    </PortalShell>
  );
}
