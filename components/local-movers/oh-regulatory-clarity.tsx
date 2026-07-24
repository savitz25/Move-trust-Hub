import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Ohio regulatory clarity — PUCO household goods authority vs FMCSA interstate.
 * Do not reuse PA PUC, VA DMV, TN TDOR, NCUC, FDACS, IL ICC, or NJ public-mover language on Ohio pages.
 */
export function OhRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="oh-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="oh-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="oh-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Ohio: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Ohio or cross a state line. FMCSA alone does not cover every local Ohio move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Ohio moves</span> —
              household goods movers operating within Ohio are generally regulated by the{' '}
              <span className="font-medium text-foreground">
                Public Utilities Commission of Ohio (PUCO)
              </span>
              . Confirm the company holds active PUCO household goods authority, carries required
              insurance, and provides written estimates that match the legal name on the paperwork
              before you book an in-state-only job.
            </li>
            <li>
              <span className="font-medium text-foreground">Interstate moves</span> — require active FMCSA
              USDOT (and usually MC) authority. Verify on{' '}
              <a
                href="https://safer.fmcsa.dot.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                FMCSA SAFER
              </a>
              .
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Use our{' '}
            <Link href="/verify-dot" className="text-primary font-medium hover:underline">
              USDOT lookup
            </Link>{' '}
            for interstate carriers, and check the{' '}
            <a
              href="https://puco.ohio.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Public Utilities Commission of Ohio
            </a>{' '}
            for household goods mover authority and consumer resources before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
