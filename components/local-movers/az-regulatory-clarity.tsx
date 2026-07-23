import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Arizona regulatory clarity — honest framing:
 * Arizona does NOT run a CA/FL/TX/NY-style statewide household-goods mover certificate program.
 * Intrastate: ACC entity registration + insurance/contract diligence; Interstate: FMCSA.
 */
export function AzRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="az-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="az-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="az-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Arizona: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the verification path depends on whether your household goods stay
            inside Arizona or cross a state line. Arizona does <strong className="font-semibold text-foreground">not</strong>{' '}
            operate a dedicated statewide household-goods mover certificate program comparable to California
            BHGS, Florida FDACS, Texas TxDMV, or New York NYSDOT authority.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Arizona moves</span> — there
              is no separate statewide “AZ mover license number” regime for household goods in the same
              sense as those other states. Still verify the company is a legitimate Arizona business entity
              via the{' '}
              <a
                href="https://www.azcc.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                Arizona Corporation Commission
              </a>
              , demand written estimates and clear contracts, confirm insurance, and use state consumer
              complaint channels when needed.
            </li>
            <li>
              <span className="font-medium text-foreground">Interstate moves</span> — require active FMCSA
              USDOT (and usually MC) authority. Verify on{' '}
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
            for interstate carriers. For in-state jobs, prioritize ACC entity status, insurance proof, and
            written terms — do not assume a California- or Texas-style state mover certificate number exists
            in Arizona.
          </p>
        </div>
      </div>
    </section>
  );
}
