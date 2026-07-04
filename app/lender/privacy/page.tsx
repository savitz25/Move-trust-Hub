import type { Metadata } from 'next';
import { hubPath } from '@/lib/hub/paths';
import { SITE_EMAIL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lender Trust Hub',
  description: 'Privacy policy for Lender Trust Hub — how we collect, use, and protect your information.',
  alternates: { canonical: `https://www.movetrusthub.com${hubPath('lender', '/privacy')}` },
};

export default function LenderPrivacyPage() {
  const effectiveDate = 'June 1, 2026';

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Effective date: {effectiveDate}</p>

      <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">Overview</h2>
          <p>
            Lender Trust Hub operates as an independent mortgage lender directory on movetrusthub.com.
            This policy explains how we collect, use, and safeguard information when you browse lender
            listings, use calculators, or contact us.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">Information we collect</h2>
          <p>
            We may collect analytics data, form submissions (name, email, message), and calculator inputs
            stored locally in your browser. We do not sell personal information to lenders or brokers.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">Contact</h2>
          <p>
            Privacy questions:{' '}
            <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">
              {SITE_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}