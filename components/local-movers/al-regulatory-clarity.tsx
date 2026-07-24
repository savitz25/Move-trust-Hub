import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Alabama regulatory clarity — APSC Motor Carrier Services household goods authority vs FMCSA interstate.
 * Do not reuse GA, FL FDACS, TN TDOR, MS, NJ, LA LPSC, etc. on Alabama pages.
 *
 * Accurate current AL framing (Alabama Motor Carrier Act, Title 37 Chapter 3):
 * Intrastate for-hire household goods carriers generally require Alabama Public Service Commission (APSC)
 * Motor Carrier Services intrastate authority, cargo/liability insurance filings, and an approved tariff.
 * Interstate: FMCSA USDOT/MC.
 */
export function AlRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="al-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="al-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="al-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Alabama: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Alabama or cross a state line. FMCSA alone does not cover every local Alabama
            move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Alabama moves</span> —
              for-hire household goods carriers operating between points in Alabama generally require{' '}
              <span className="font-medium text-foreground">
                Alabama Public Service Commission (APSC) Motor Carrier Services intrastate authority
              </span>{' '}
              under the Alabama Motor Carrier Act (Title 37 Chapter 3). Confirm active authority, cargo
              and liability insurance filings, and written estimates that match the legal name on the
              paperwork before you book an in-state-only job. Household goods carriers must also keep an
              approved tariff on file with the Commission.
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
              href="https://psc.alabama.gov/motor-carrier-section/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              APSC Motor Carrier Services
            </a>{' '}
            and{' '}
            <a
              href="https://psc.alabama.gov/motor-carrier-applications-forms/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              intrastate authority applications & forms
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
