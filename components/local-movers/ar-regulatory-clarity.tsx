import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Arkansas regulatory clarity — ArDOT Intrastate Authority vs FMCSA interstate.
 * Do not reuse OK OCC, TX TxDMV, MO MoDOT, TN TDOR, LA LPSC, NJ, etc. on Arkansas pages.
 *
 * Accurate current AR framing (ArDOT Intrastate Authority):
 * All for-hire motor carriers transporting property or passengers in intrastate commerce
 * (wholly within Arkansas) generally must hold Arkansas Intrastate Operating Authority
 * from the Arkansas Department of Transportation. Household goods moves wholly inside
 * Arkansas fall under this framework for for-hire carriers. Interstate: FMCSA USDOT/MC.
 * @see https://ardot.gov/divisions/legal/arkansas-intrastate-authority/
 */
export function ArRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="ar-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="ar-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="ar-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Arkansas: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Arkansas or cross a state line. FMCSA alone does not cover every local
            Arkansas move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Arkansas moves</span>{' '}
              — for-hire motor carriers transporting property (including household goods) wholly
              within Arkansas generally require{' '}
              <span className="font-medium text-foreground">
                Arkansas Intrastate Operating Authority from the Arkansas Department of
                Transportation (ArDOT)
              </span>
              . Confirm active intrastate authority matching the legal name on your estimate, cargo
              and liability insurance, and a written estimate before you book an in-state-only job.
              Ask carriers whether their authority covers household goods and your exact origin and
              destination.
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
              href="https://ardot.gov/divisions/legal/arkansas-intrastate-authority/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              ArDOT Arkansas Intrastate Authority
            </a>{' '}
            and{' '}
            <a
              href="https://ardot.gov/divisions/legal/arkansas-intrastate-authority/applications/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              intrastate authority applications
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
