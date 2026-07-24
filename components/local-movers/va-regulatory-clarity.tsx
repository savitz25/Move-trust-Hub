import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Virginia regulatory clarity — DMV Motor Carrier / HHG Certificate of Fitness
 * (and shorter-move Property Carrier framing) vs FMCSA interstate.
 * Do not reuse NCUC, FDACS, TxDMV, NYSDOT, GA DPS, BHGS, TDOR, or NJ public-mover language.
 */
export function VaRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="va-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="va-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="va-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Virginia: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Virginia or cross a state line — and, for many in-state jobs, how far the
            road miles run. FMCSA alone does not cover every local Virginia move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Virginia moves</span>{' '}
              — household goods movers operating within Virginia are generally regulated through{' '}
              <span className="font-medium text-foreground">Virginia DMV Motor Carrier Services</span>
              . Longer in-state household goods hauls (commonly described around 31+ road miles)
              typically require Household Goods Carrier authority / a Certificate of Fitness
              framework. Shorter local jobs (commonly described around 30 miles or less) may fall
              under Property Carrier-style authority. Confirm which Virginia DMV authorization
              covers your exact origin, destination, and road miles before you deposit — distance
              can change the framework. Match the legal name on the estimate to DMV credentials.
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
              . Do not treat a USDOT alone as Virginia intrastate permission.
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Use our{' '}
            <Link href="/verify-dot" className="text-primary font-medium hover:underline">
              USDOT lookup
            </Link>{' '}
            for interstate carriers, and check{' '}
            <a
              href="https://www.dmv.virginia.gov/businesses/motor-carriers/intrastate/house-goods"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Virginia DMV household goods carrier
            </a>{' '}
            resources for in-state authority before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
