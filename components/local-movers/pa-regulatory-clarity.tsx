import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Pennsylvania regulatory clarity — PA PUC household goods authority vs FMCSA interstate.
 * Do not reuse VA DMV, TN TDOR, NCUC, FDACS, TxDMV, NYSDOT, GA DPS, BHGS, or NJ public-mover language.
 */
export function PaRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="pa-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="pa-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="pa-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Pennsylvania: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Pennsylvania or cross a state line. FMCSA alone does not cover every local
            Pennsylvania move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Pennsylvania moves</span>{' '}
              — household goods movers operating within Pennsylvania are generally regulated by the{' '}
              <span className="font-medium text-foreground">
                Pennsylvania Public Utility Commission (PUC)
              </span>
              . Confirm the company holds active PUC household goods authority, carries required
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
              href="https://www.puc.pa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Pennsylvania Public Utility Commission
            </a>{' '}
            for household goods mover authority and consumer resources before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
