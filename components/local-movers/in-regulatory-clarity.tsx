import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Indiana regulatory clarity — DOR Motor Carrier Services household goods operating authority vs FMCSA interstate.
 * Do not reuse OH PUCO, IL ICC, MI MSP, KY, NJ, MD Labor, OR ODOT, WA UTC, etc. on Indiana pages.
 *
 * Accurate current IN framing (IC 8-2.1-22):
 * Intrastate for-hire household goods carriers must obtain a Certificate of Public Convenience and Necessity
 * (Indiana Operating Authority) from the Indiana Department of Revenue (DOR) Motor Carrier Services.
 * Interstate: FMCSA USDOT/MC.
 */
export function InRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="in-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="in-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="in-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Indiana: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Indiana or cross a state line. FMCSA alone does not cover every local Indiana
            move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Indiana moves</span> —
              carriers transporting household goods for hire within Indiana generally must hold a{' '}
              <span className="font-medium text-foreground">
                Certificate of Public Convenience and Necessity
              </span>{' '}
              (Indiana Operating Authority) from the{' '}
              <span className="font-medium text-foreground">
                Indiana Department of Revenue (DOR) Motor Carrier Services
              </span>{' '}
              under IC 8-2.1-22. Confirm active permanent authority, required insurance, and written
              estimates that match the legal name on the paperwork before you book an in-state-only job.
              Tariffs and rates must match what DOR has on file.
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
              href="https://www.in.gov/dor/motor-carrier-services/usdot-and-ucr/indiana-intrastate-passenger-and-household-good-authority/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Indiana DOR household goods operating authority
            </a>{' '}
            and{' '}
            <a
              href="https://www.in.gov/dor/motor-carrier-services/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Motor Carrier Services resources
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
