import Link from 'next/link';
import { Calculator, MapPinned, Scale, ShieldCheck } from 'lucide-react';
import { NetworkBelongingLine } from '@/components/network/network-belonging-line';
import { TrustMark } from '@/components/network/trust-mark';

/**
 * Server-rendered homepage hero chrome for crawlers and no-JS users.
 * Intent: Where are you going? — route / From–To stays primary (wizard below).
 */
export function HomeHeroSsr() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0066b8]">
        Move Trust Hub · Independent FMCSA mover research
      </p>
      <NetworkBelongingLine className="mt-2" />
      <div className="mt-2 flex justify-center">
        <TrustMark />
      </div>
      {/* Primary LCP element — solid paint, no client island dependency */}
      <h1 className="mt-4 text-balance font-semibold leading-[1.1] tracking-tighter text-[#0A2540] text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem]">
        Where are you going?
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-base font-medium text-[#0A2540]/80 sm:text-lg">
        Tell us where you&apos;re moving from and to.
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#3d4f63] sm:text-lg">
        Lock your route, shortlist FMCSA-licensed movers for that corridor, estimate volume, and
        compare carriers — independent research, not a lead marketplace or paid ranking board.
      </p>

      <ul className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-[#3d4f63] sm:text-sm">
        <li className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
          FMCSA licensing context
        </li>
        <li className="inline-flex items-center gap-1.5">
          <MapPinned className="h-3.5 w-3.5 text-primary" aria-hidden />
          County local-mover guides
        </li>
        <li className="inline-flex items-center gap-1.5">
          <Calculator className="h-3.5 w-3.5 text-primary" aria-hidden />
          Free volume calculator
        </li>
        <li className="inline-flex items-center gap-1.5">
          <Scale className="h-3.5 w-3.5 text-primary" aria-hidden />
          Side-by-side compare
        </li>
      </ul>

      <nav
        aria-label="Secondary research tools"
        className="mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm"
      >
        <Link
          href="/verify-dot"
          className="min-h-11 inline-flex items-center font-medium text-primary underline underline-offset-2 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
        >
          Verify a DOT number
        </Link>
        <Link
          href="/moving-calculator"
          className="min-h-11 inline-flex items-center font-medium text-primary underline underline-offset-2 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
        >
          Moving calculator
        </Link>
        <Link
          href="/companies"
          className="min-h-11 inline-flex items-center font-medium text-primary underline underline-offset-2 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
        >
          Mover directory
        </Link>
        <Link
          href="/local-movers"
          className="min-h-11 inline-flex items-center font-medium text-primary underline underline-offset-2 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
        >
          Local movers by state
        </Link>
        <Link
          href="/compare"
          className="min-h-11 inline-flex items-center font-medium text-primary underline underline-offset-2 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
        >
          Compare movers
        </Link>
      </nav>

      <p className="mx-auto mt-4 max-w-xl text-xs text-[#3d4f63] leading-relaxed">
        Independent research only — Move Trust Hub is not a booking marketplace. Always verify
        current licensing on FMCSA and state sources before you book.
      </p>
    </div>
  );
}
