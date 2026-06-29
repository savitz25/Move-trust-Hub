import Link from 'next/link';
import Image from 'next/image';
import { TrustBadges } from '@/components/trust/trust-badges';
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-y-9">
          <div className="col-span-2 md:col-span-1">
            <Link prefetch={false} href="/" className="flex items-center gap-2 font-semibold text-base tracking-tight">
              <span className="relative block h-12 w-[192px] shrink-0" aria-hidden="true">
                <Image
                  src="/logo.png"
                  alt="Move Trust Hub logo — compare licensed long-distance movers"
                  width={192}
                  height={48}
                  loading="lazy"
                  sizes="192px"
                  className="h-12 w-[192px] object-contain object-left"
                />
              </span>
            </Link>
            <p className="mt-2.5 text-sm text-muted-foreground max-w-[210px] leading-snug">
              Independent directory for trusted interstate movers.
            </p>
          </div>

          <div>
            <div className="font-semibold mb-2.5 text-xs tracking-widest text-muted-foreground/80">DIRECTORY</div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div><Link prefetch={false} href="/companies" className="hover:text-foreground transition-colors">All Companies</Link></div>
              <div><Link prefetch={false} href="/companies?sort=reputation" className="hover:text-foreground transition-colors">Top Rated</Link></div>
              <div><Link prefetch={false} href="/compare" className="hover:text-foreground transition-colors">Compare Tool</Link></div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2.5 text-xs tracking-widest text-muted-foreground/80">DESTINATIONS</div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div><Link prefetch={false} href="/moving-to" className="hover:text-foreground transition-colors">All Destinations</Link></div>
              <div><Link prefetch={false} href="/moving-to/south-carolina" className="hover:text-foreground transition-colors">South Carolina</Link></div>
              <div><Link prefetch={false} href="/moving-to/north-carolina" className="hover:text-foreground transition-colors">North Carolina</Link></div>
              <div><Link prefetch={false} href="/moving-to/florida" className="hover:text-foreground transition-colors">Florida Corridor</Link></div>
              <div><Link prefetch={false} href="/moving-to/florida/miami" className="hover:text-foreground transition-colors">Miami</Link></div>
              <div><Link prefetch={false} href="/local-movers" className="hover:text-foreground transition-colors">Local Movers by State</Link></div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2.5 text-xs tracking-widest text-muted-foreground/80">RESOURCES</div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div><Link prefetch={false} href="/resources" className="hover:text-foreground transition-colors">All Guides</Link></div>
              <div><Link prefetch={false} href="/resources/how-to-choose" className="hover:text-foreground transition-colors">How to Choose a Mover</Link></div>
              <div><Link prefetch={false} href="/resources/interstate-moving-costs" className="hover:text-foreground transition-colors">Moving Costs 2026</Link></div>
              <div><Link prefetch={false} href="/resources/routes" className="hover:text-foreground transition-colors">Route Guides</Link></div>
              <div><Link prefetch={false} href="/resources/scams" className="hover:text-foreground transition-colors">Avoid Scams</Link></div>
              <div><Link prefetch={false} href="/resources/packing-checklist" className="hover:text-foreground transition-colors">Packing Checklist</Link></div>
              <div><Link prefetch={false} href="/verify-dot" className="hover:text-foreground transition-colors">Verify DOT Number</Link></div>
              <div><Link prefetch={false} href="/review" className="hover:text-foreground transition-colors">Leave a Review</Link></div>
              <div><Link prefetch={false} href="/resources/fmcsa" className="hover:text-foreground transition-colors">FMCSA Guide</Link></div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2.5 text-xs tracking-widest text-muted-foreground/80">COMPANY</div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div><Link prefetch={false} href="/about" className="hover:text-foreground transition-colors">About Us</Link></div>
              <div><Link prefetch={false} href="/about#disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></div>
              <div><Link prefetch={false} href="/contact" className="hover:text-foreground transition-colors">Contact</Link></div>
              <div><Link prefetch={false} href="/verify-dot" className="hover:text-foreground transition-colors">DOT Lookup Tool</Link></div>
              <div><a href="https://www.fmcsa.dot.gov/" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">FMCSA.gov ↗</a></div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 text-sm text-muted-foreground">
            <div className="font-semibold text-foreground mb-2 text-xs tracking-widest text-muted-foreground/80">TRUST &amp; TRANSPARENCY</div>
            <p className="leading-snug text-[13px]">
              Data from FMCSA, BBB, Google, Trustpilot &amp; disclosures. <strong>Not affiliated</strong> with any mover.
            </p>
            <div className="mt-3 text-[11px] text-muted-foreground/70">
              © {year} Move Trust Hub
            </div>
          </div>
        </div>
      </div>
      <div className="border-t py-5">
        <div className="container mx-auto px-4 mb-4">
          <TrustBadges variant="compact" className="justify-center" />
        </div>
        <p className="text-center text-[10px] text-muted-foreground/70 tracking-wide">
          Always verify licensing directly with{' '}
          <a href="https://www.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
            FMCSA
          </a>{' '}
          and state authorities.
        </p>
      </div>
    </footer>
  );
}
