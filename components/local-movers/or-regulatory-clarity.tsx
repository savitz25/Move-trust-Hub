import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Oregon regulatory clarity — ODOT Commerce & Compliance Division household goods certificate vs FMCSA interstate.
 * Do not reuse WA UTC, CO PUC, CA BHGS, OH PUCO, MI MSP, IL ICC, PA PUC, NJ public-mover language, FDACS, NCUC, or TDOR on Oregon pages.
 *
 * Intrastate: Oregon Department of Transportation (ODOT) certificate of authority is required for for-hire
 * transportation of household goods between two points in Oregon (ORS 825), administered via Commerce and
 * Compliance Division (CCD). Interstate: FMCSA USDOT/MC.
 */
export function OrRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="or-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="or-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="or-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Oregon: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Oregon or cross a state line. FMCSA alone does not cover every local Oregon
            move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Oregon moves</span> —
              for-hire household goods transportation between two points in Oregon generally requires a{' '}
              <span className="font-medium text-foreground">
                certificate of authority from the Oregon Department of Transportation (ODOT)
              </span>
              , administered through the{' '}
              <span className="font-medium text-foreground">
                Commerce and Compliance Division (CCD)
              </span>{' '}
              under ORS 825 motor carrier rules. Confirm the company holds active Oregon household
              goods authority, carries required insurance, and provides written estimates that match
              the legal name on the paperwork before you book an in-state-only job.
            </li>
            <li>
              <span className="font-medium text-foreground">Interstate moves</span> — require active
              FMCSA USDOT (and usually MC) authority. Verify on{' '}
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
            for interstate carriers, and review{' '}
            <a
              href="https://www.oregon.gov/odot/mct/pages/household-goods-mover-application-process.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              ODOT household goods mover resources
            </a>{' '}
            and{' '}
            <a
              href="https://www.oregon.gov/odot/mct/pages/frequently-asked-questions.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              CCD motor carrier FAQs
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
