import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * New York regulatory clarity — NYSDOT intrastate household goods vs FMCSA interstate.
 * Do not reuse GA DPS, TxDMV, FDACS, or BHGS language on New York pages.
 */
export function NyRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="ny-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="ny-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="ny-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in New York: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside New York State or cross a state line. FMCSA alone does not cover every local New
            York move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local New York moves</span> —
              household goods movers operating within New York State are generally subject to New York
              State Department of Transportation (NYSDOT) authority and consumer-information requirements.
              Confirm the company holds current New York household goods mover credentials and review any
              required Summary of Information materials before you book an in-state-only job.
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
              href="https://www.dot.ny.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              NYSDOT
            </a>{' '}
            household goods / motor carrier consumer resources for in-state authority before you put down
            a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
