import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Tennessee regulatory clarity — TDOR motor carrier intrastate authority vs FMCSA interstate.
 * Do not reuse NCUC, FDACS, TxDMV, NYSDOT, GA DPS, BHGS, or NJ public-mover language on TN pages.
 */
export function TnRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="tn-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="tn-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="tn-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Tennessee: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Tennessee or cross a state line. FMCSA alone does not cover every local
            Tennessee move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Tennessee moves</span>{' '}
              — for-hire household goods carriers operating within Tennessee are generally subject to
              Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements
              as applicable. Confirm the company holds active Tennessee intrastate motor carrier
              authority, carries required insurance, and provides written estimates that match the
              legal name on the paperwork before you book an in-state-only job.
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
              href="https://www.tn.gov/revenue.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Tennessee Department of Revenue
            </a>{' '}
            motor carrier / intrastate authority resources before you put down a deposit. When in
            doubt, ask the mover which authority applies to your exact origin and destination.
          </p>
        </div>
      </div>
    </section>
  );
}
