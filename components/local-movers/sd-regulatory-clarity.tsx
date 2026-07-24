import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * South Dakota regulatory clarity — no dedicated consumer HHG permit board like ND NDDOT / NE PSC.
 * SD DOR Motor Carrier Services handles commercial vehicle frameworks; interstate is FMCSA.
 * Do not copy ND HHG permit, MN, IA, NE PSC, WY WYDOT, NJ, etc. onto South Dakota pages.
 *
 * Accurate current SD framing (site state hub + consumer.sd.gov style guidance):
 * South Dakota does not operate a dedicated statewide household-goods consumer permit directory
 * comparable to North Dakota’s NDDOT HHG permit. For pure in-state jobs: written estimates,
 * insurance certificates, clear legal names. Interstate: FMCSA USDOT/MC.
 */
export function SdRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="sd-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="sd-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="sd-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in South Dakota: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside South Dakota or cross a state line. Do not invent a North Dakota–style
            household goods permit number for pure South Dakota local jobs.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">
                Intrastate / local South Dakota moves
              </span>{' '}
              — South Dakota does not maintain a dedicated statewide household-goods consumer permit
              board comparable to North Dakota’s NDDOT Household Goods Carrier Permit or Nebraska’s
              PSC Household Goods Mover License. For pure in-state jobs, insist on a written estimate
              matching the legal business name, cargo and liability insurance certificates, and clear
              inventory terms. Commercial motor carriers may still face{' '}
              <span className="font-medium text-foreground">
                South Dakota Department of Revenue Motor Carrier Services
              </span>{' '}
              and related commercial frameworks when applicable — ask what credentials apply.
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
              href="https://consumer.sd.gov/fastfacts/moving.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              South Dakota consumer moving guidance
            </a>{' '}
            and{' '}
            <a
              href="https://dor.sd.gov/businesses/motor-vehicle/motor-carrier-services/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              SD DOR Motor Carrier Services
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
