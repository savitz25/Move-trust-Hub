import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Delaware regulatory clarity — no dedicated statewide HHG certificate (unlike PA PUC / NJ public movers).
 * Delaware DMV Motor Carrier Services handles IRP/IFTA/UCR commercial frameworks under DelDOT context.
 * Do not copy MD HHG registration, PA PUC, NJ public-mover, VA DMV HHG language onto Delaware pages.
 *
 * Accurate current DE framing (site state hub + Delaware DMV Motor Carrier Services):
 * Delaware does not issue a special state household-goods certificate for pure intrastate movers
 * according to commonly cited consumer guidance. For pure in-state jobs: written estimates, insurance,
 * clear legal names. Commercial carriers may still face DMV motor-carrier frameworks when applicable.
 * Interstate: FMCSA USDOT/MC — many DE jobs become interstate within minutes (MD/PA/NJ).
 * @see https://dmv.de.gov/VehicleServices/MC/index.shtml
 */
export function DeRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="de-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="de-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="de-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Delaware: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Delaware or cross a state line. Do not apply New Jersey public-mover credential
            language or Pennsylvania PUC household goods certificates to pure Delaware jobs by default.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Delaware moves</span>{' '}
              — Delaware does not issue a special statewide household-goods mover certificate for pure
              intrastate operators according to commonly cited consumer guidance. For pure in-state
              jobs, insist on a written estimate matching the legal business name, cargo and liability
              insurance certificates, and clear inventory terms. Commercial motor carriers may still
              need to comply with{' '}
              <span className="font-medium text-foreground">
                Delaware DMV Motor Carrier Services
              </span>{' '}
              frameworks (IRP, IFTA, UCR, and related commercial programs) when applicable — ask what
              credentials apply to the company named on your estimate.
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
              . Many Delaware jobs become interstate within minutes when they touch Maryland,
              Pennsylvania, or New Jersey.
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Use our{' '}
            <Link href="/verify-dot" className="text-primary font-medium hover:underline">
              USDOT lookup
            </Link>{' '}
            for interstate carriers, and review{' '}
            <a
              href="https://dmv.de.gov/VehicleServices/MC/index.shtml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Delaware DMV Motor Carrier Services
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
