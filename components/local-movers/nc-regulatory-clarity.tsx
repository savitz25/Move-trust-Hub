import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * North Carolina regulatory clarity — NCUC intrastate household goods vs FMCSA interstate.
 * Do not reuse FDACS, TxDMV, NYSDOT, GA DPS/MCCD, BHGS, or AZ ACC language on NC pages.
 */
export function NcRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="nc-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="nc-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="nc-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in North Carolina: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside North Carolina or cross a state line. FMCSA alone does not cover every local
            North Carolina move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local North Carolina moves</span>{' '}
              — household goods movers operating within North Carolina are generally regulated by the
              North Carolina Utilities Commission (NCUC). Confirm the company holds a current NCUC
              household goods certificate (often shown as a C-# on estimates and paperwork) and
              understand Maximum Rate Tariff / consumer-information requirements that apply to
              regulated NC household moves before you book an in-state-only job.
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
              href="https://www.ncuc.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              North Carolina Utilities Commission
            </a>{' '}
            for household goods mover certification and consumer resources before you put down a
            deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
