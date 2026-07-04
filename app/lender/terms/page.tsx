import type { Metadata } from 'next';
import { hubPath } from '@/lib/hub/paths';
import { SITE_EMAIL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Terms of Service | Lender Trust Hub',
  description: 'Terms of service for using Lender Trust Hub directory, calculators, and resources.',
  alternates: { canonical: `https://www.movetrusthub.com${hubPath('lender', '/terms')}` },
};

export default function LenderTermsPage() {
  const effectiveDate = 'June 1, 2026';

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Effective date: {effectiveDate}</p>

      <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">Agreement</h2>
          <p>
            By using Lender Trust Hub, you agree to these terms. We provide an informational directory
            and educational calculators — we are not a lender, broker, or loan originator.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">No lending advice</h2>
          <p>
            Calculator outputs and lender listings are for research only. Verify rates, fees, and NMLS
            licensing directly with lenders and official registries before applying.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">Contact</h2>
          <p>
            Questions about these terms:{' '}
            <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">
              {SITE_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}