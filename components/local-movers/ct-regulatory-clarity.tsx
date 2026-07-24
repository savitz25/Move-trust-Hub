import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Connecticut regulatory clarity — CTDOT household goods carrier certificate vs FMCSA interstate.
 * Do not reuse NY, NJ public-mover, MA DPU, etc. on Connecticut pages.
 *
 * Accurate current CT framing:
 * Intrastate household goods carriers generally require a Household Goods Carrier Certificate from the
 * Connecticut Department of Transportation (CTDOT) Bureau of Public Transportation / Regulatory Compliance.
 * Interstate: FMCSA USDOT/MC.
 */
export function CtRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="ct-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="ct-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="ct-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Connecticut: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Connecticut or cross a state line. FMCSA alone does not cover every local
            Connecticut move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Connecticut moves</span>{' '}
              — household goods carriers operating for hire within Connecticut generally require a{' '}
              <span className="font-medium text-foreground">
                Household Goods Carrier Certificate
              </span>{' '}
              from the{' '}
              <span className="font-medium text-foreground">
                Connecticut Department of Transportation (CTDOT)
              </span>
              , administered through Public Transportation / Regulatory Compliance frameworks. Confirm
              active certificate status, required insurance, and written estimates that match the legal
              name on the paperwork before you book an in-state-only job.
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
              href="https://portal.ct.gov/dot/permits/new-household-goods-carrier-certificate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              CTDOT household goods carrier certificate resources
            </a>{' '}
            and{' '}
            <a
              href="https://portal.ct.gov/dot/publictrans/bureau-of-public-transportation/regulatory-compliance-unit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Regulatory Compliance Unit guidance
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
