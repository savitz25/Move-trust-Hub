import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Michigan regulatory clarity — MSP CVED motor carrier / household goods authority vs FMCSA interstate.
 * Do not reuse OH PUCO, IL ICC, PA PUC, CO PUC, WA UTC, VA DMV, NJ public-mover language, FDACS, NCUC, or TDOR on Michigan pages.
 *
 * Current MI framing (accurate for consumer guidance):
 * Intrastate household goods carriers operating under Michigan's Motor Carrier Act are regulated through
 * Michigan State Police Commercial Vehicle Enforcement Division (MSP CVED) operating authority.
 * Consumers should verify active Michigan authority (MSP CAP search) for pure in-state moves.
 * Interstate: FMCSA USDOT/MC.
 */
export function MiRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="mi-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="mi-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="mi-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Michigan: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Michigan or cross a state line. FMCSA alone does not cover every local Michigan
            move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Michigan moves</span> —
              household goods movers operating within Michigan are generally subject to{' '}
              <span className="font-medium text-foreground">
                Michigan motor carrier / household goods operating authority
              </span>{' '}
              under the state&apos;s Motor Carrier Act, administered through the{' '}
              <span className="font-medium text-foreground">
                Michigan State Police Commercial Vehicle Enforcement Division (MSP CVED)
              </span>
              . Confirm the company holds active Michigan authority, carries required insurance, and
              provides written estimates that match the legal name on the paperwork before you book an
              in-state-only job. Use the official CAP search tools when available.
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
            for interstate carriers, and check{' '}
            <a
              href="https://mspcapsearch.state.mi.us/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Michigan MSP CAP authority search
            </a>{' '}
            and{' '}
            <a
              href="https://www.michigan.gov/msp/divisions/cved/regulatory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              MSP CVED regulatory resources
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
