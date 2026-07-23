import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * CA-specific regulatory clarity — intrastate BHGS vs interstate FMCSA.
 * Pattern matches NJ regulatory module; shown only on California county pages.
 */
export function CaRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="ca-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="ca-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="ca-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in California: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside California or cross a state line. FMCSA alone does not cover every local CA move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local CA moves</span> — generally
              overseen by the California Bureau of Household Goods and Services (BHGS) for licensed
              household movers. Confirm the company holds proper California household-mover credentials
              when the job never leaves the state.
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
            for interstate carriers, and check{' '}
            <a
              href="https://bhgs.dca.ca.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              BHGS
            </a>{' '}
            for California in-state household movers before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
