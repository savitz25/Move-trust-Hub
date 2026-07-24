import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Wyoming regulatory clarity — WYDOT Operating Authority (Letter of Authority) vs FMCSA interstate.
 * Do not reuse CO PUC, MT, ID IPUC, UT, ND, SD, NJ, etc. onto Wyoming pages.
 *
 * Accurate current WY framing (site state hub + WYDOT Motor Carrier Services):
 * Intrastate for-hire carriers transporting goods they do not own for compensation — including
 * household goods — generally need Operating Authority from WYDOT. A Letter of Authority is
 * commonly expected in each vehicle. Insurance filings apply. Interstate: FMCSA USDOT/MC.
 * @see https://www.dot.state.wy.us/home/trucking_commercial_vehicles/operating_authority.html
 */
export function WyRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="wy-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="wy-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="wy-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Wyoming: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Wyoming or cross a state line. FMCSA alone does not cover every local Wyoming
            move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Wyoming moves</span> —
              for-hire carriers transporting goods they do not own for compensation within Wyoming —
              including household goods hauls — generally require{' '}
              <span className="font-medium text-foreground">
                Operating Authority from the Wyoming Department of Transportation (WYDOT) Motor
                Carrier Services
              </span>
              . A Letter of Authority is commonly expected in each vehicle operating under that
              authority. Confirm authority and insurance filings matching the legal name on your
              estimate, and get a written estimate before you book an in-state-only job.
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
              href="https://www.dot.state.wy.us/home/trucking_commercial_vehicles/operating_authority.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              WYDOT Operating Authority
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
