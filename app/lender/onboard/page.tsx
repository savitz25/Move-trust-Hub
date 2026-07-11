import type { Metadata } from 'next';
import { LenderOnboardClient } from '@/components/lender/onboarding/lender-onboard-client';
import { LENDER_TRANSPARENCY_DISCLAIMER } from '@/lib/lender/onboarding/transparency';

export const metadata: Metadata = {
  title: 'Lender Provider Onboarding',
  description:
    'Join the Lender Trust Hub directory. NMLS-verified onboarding with Google, BBB, and CFPB data for transparent lender profiles.',
  robots: { index: true, follow: true },
};

export default function LenderOnboardPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-[#3B82F6] uppercase mb-2">
          Provider Onboarding · NMLS Verified
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0A2540] tracking-tight">
          List Your Lending Company
        </h1>
        <p className="mt-4 text-zinc-600 leading-relaxed">
          Mirror our mover onboarding: verify via NMLS Consumer Access, enrich with Google
          reviews and BBB data, then submit for admin approval. Published profiles appear at{' '}
          <code className="text-sm">/lender/lenders/[slug]</code>.
        </p>
      </div>

      <LenderOnboardClient />

      <section className="mt-10 text-sm text-zinc-600 leading-relaxed prose prose-zinc max-w-none">
        <h2 className="text-lg font-semibold text-[#0A2540]">Transparency &amp; disclaimers</h2>
        <p>{LENDER_TRANSPARENCY_DISCLAIMER}</p>
        <p>
          We never sell placement. Profiles are moderated for accuracy and policy compliance before
          publication.
        </p>
      </section>
    </div>
  );
}