import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Florida regulatory clarity — FDACS Ch. 507 intrastate vs FMCSA interstate.
 * Do not reuse CA BHGS language on Florida pages.
 */
export function FlRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="fl-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="fl-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="fl-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Florida: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Florida or cross a state line. FMCSA alone does not cover every local Florida move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Florida moves</span> —
              household movers operating within Florida are generally subject to registration and consumer
              protections under Florida Statutes Chapter 507, administered by the Florida Department of
              Agriculture and Consumer Services (FDACS). Confirm current registration before you book an
              in-state-only job.
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
              href="https://www.fdacs.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              FDACS
            </a>{' '}
            consumer resources for Florida in-state household mover registration before you put down a
            deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
