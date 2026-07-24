import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Utah regulatory clarity — UDOT Motor Carrier Division credentials vs FMCSA interstate.
 * Do not reuse CO PUC, AZ ACC-only framing, NV, WA UTC, CTDOT, etc. on Utah pages.
 *
 * Accurate current UT framing:
 * Intrastate commercial motor carriers (including household goods operations) generally must comply with
 * Utah Department of Transportation (UDOT) Motor Carrier Division registration, insurance, and safety
 * frameworks. Utah does not mirror California-style dedicated HHG bureau certificates in all cases —
 * consumers should still verify UDOT-applicable credentials, insurance, and written estimates.
 * Interstate: FMCSA USDOT/MC.
 */
export function UtRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="ut-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="ut-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="ut-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Utah: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Utah or cross a state line. FMCSA alone does not cover every local Utah move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Utah moves</span> —
              for-hire household goods carriers operating commercial motor vehicles within Utah
              generally must comply with{' '}
              <span className="font-medium text-foreground">
                Utah Department of Transportation (UDOT) Motor Carrier Division
              </span>{' '}
              registration, insurance, and safety frameworks that apply to intrastate motor carriers.
              Confirm the company carries required insurance, provides written estimates matching the
              legal name on the paperwork, and holds any applicable UDOT credentials before you book
              an in-state-only job.
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
              href="https://connect.udot.utah.gov/business/motor-carriers/motor-carrier-registration-credentials/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              UDOT motor carrier registration resources
            </a>{' '}
            and{' '}
            <a
              href="https://connect.udot.utah.gov/business/motor-carriers/motor-carrier-registration-credentials/motor-carrier-insurance-requirements-mcs-90/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              insurance / MCS-90 guidance
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
