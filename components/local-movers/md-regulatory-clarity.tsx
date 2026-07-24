import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Maryland regulatory clarity — MD Department of Labor household goods mover registration vs FMCSA interstate.
 * Do not reuse VA DMV, PA PUC, DC, NJ, OR ODOT, WA UTC, OH PUCO, etc. on Maryland pages.
 *
 * Accurate current MD framing (Business Regulation Title 8.5 / HHG registration law effective 2019):
 * Intrastate household goods movers using commercial motor vehicles must register with the Maryland
 * Department of Labor, Division of Occupational and Professional Licensing (Household Goods Movers
 * Registration Unit). PSC Transportation Division regulates passenger-for-hire carriers, not HHG movers.
 * Interstate: FMCSA USDOT/MC.
 */
export function MdRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="md-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="md-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="md-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Maryland: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Maryland or cross a state line. FMCSA alone does not cover every local Maryland
            move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Maryland moves</span> —
              persons providing household goods moving services in Maryland with a commercial motor
              vehicle generally must hold{' '}
              <span className="font-medium text-foreground">
                Maryland household goods mover registration
              </span>{' '}
              with the{' '}
              <span className="font-medium text-foreground">
                Maryland Department of Labor, Division of Occupational and Professional Licensing
              </span>{' '}
              (Household Goods Movers Registration Unit). Confirm active registration, required
              insurance, and written estimates that match the legal name on the paperwork before you
              book an in-state-only job. (Maryland PSC Transportation primarily regulates
              passenger-for-hire carriers — not household goods movers.)
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
              href="https://labor.maryland.gov/license/hgm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Maryland household goods mover registration
            </a>{' '}
            and{' '}
            <a
              href="https://labor.maryland.gov/license/hgm/hhmcon.shtml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              consumer complaint resources
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
