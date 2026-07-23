import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Georgia regulatory clarity — GA DPS / MCCD intrastate household goods vs FMCSA interstate.
 * Do not reuse TxDMV, FDACS, or BHGS language on Georgia pages.
 */
export function GaRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="ga-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="ga-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="ga-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Georgia: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Georgia or cross a state line. FMCSA alone does not cover every local Georgia move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Georgia moves</span> —
              household goods movers operating within Georgia are generally regulated by the Georgia
              Department of Public Safety (DPS) Motor Carrier Compliance Division (MCCD). Confirm the
              company holds current Georgia household goods mover credentials before you book an
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
              href="https://dps.georgia.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Georgia DPS
            </a>{' '}
            / MCCD consumer and motor-carrier resources for in-state household goods mover licensing
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
