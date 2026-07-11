import type { Metadata } from 'next';
import { LenderOnboardClient } from '@/components/lender/onboarding/lender-onboard-client';
import { LENDER_LOOKUP_TAGLINE } from '@/lib/lender/onboarding/constants';
import { LENDER_TRANSPARENCY_DISCLAIMER } from '@/lib/lender/onboarding/transparency';
import { NmlsOfficialSourceLink } from '@/components/lender/onboarding/nmls-official-source-link';

export const metadata: Metadata = {
  title: 'NMLS Lender Lookup & Onboarding',
  description:
    'Verify mortgage lenders by NMLS ID, name, or location. Live NMLS Consumer Access data plus Google, BBB, and CFPB enrichment — all on Lender Trust Hub.',
  robots: { index: true, follow: true },
};

type Props = {
  searchParams: Promise<{ nmls?: string; mode?: string }>;
};

export default async function LenderOnboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialNmlsId = params.nmls?.replace(/\D/g, '').slice(0, 10) || undefined;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-[#3B82F6] uppercase mb-2">
          NMLS Lookup · On-Site Verification
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0A2540] tracking-tight">
          NMLS Lender Lookup &amp; Onboarding
        </h1>
        <p className="mt-4 text-zinc-600 leading-relaxed">{LENDER_LOOKUP_TAGLINE}</p>
        <div className="mt-3">
          <NmlsOfficialSourceLink />
        </div>
      </div>

      <LenderOnboardClient initialNmlsId={initialNmlsId} />

      <section className="mt-10 text-sm text-zinc-600 leading-relaxed max-w-none">
        <h2 className="text-lg font-semibold text-[#0A2540] mb-2">Two paths</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Just verify</strong> — look up any lender and review NMLS, Google, BBB, and CFPB
            data. No submission required.
          </li>
          <li>
            <strong>Directory inclusion</strong> — submit your company for admin review and a
            published profile on Lender Trust Hub.
          </li>
        </ul>
        <h2 className="text-lg font-semibold text-[#0A2540] mt-6 mb-2">Transparency</h2>
        <p>{LENDER_TRANSPARENCY_DISCLAIMER}</p>
      </section>
    </div>
  );
}