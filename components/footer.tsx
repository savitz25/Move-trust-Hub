import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              <span>Move Trust Hub</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-[220px]">
              Independent directory helping Americans choose trusted interstate movers since 2024.
            </p>
          </div>

          <div>
            <div className="font-semibold mb-3 text-sm">Directory</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div><Link href="/companies" className="hover:text-foreground">All Companies</Link></div>
              <div><Link href="/companies?sort=reputation" className="hover:text-foreground">Top Rated</Link></div>
              <div><Link href="/compare" className="hover:text-foreground">Compare Tool</Link></div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-3 text-sm">Resources</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div><Link href="/resources" className="hover:text-foreground">Moving Guides</Link></div>
              <div><Link href="/resources#fmcsa" className="hover:text-foreground">FMCSA Tips</Link></div>
              <div><Link href="/resources#checklist" className="hover:text-foreground">Moving Checklist</Link></div>
              <div><Link href="/resources#scams" className="hover:text-foreground">Avoid Scams</Link></div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-3 text-sm">Company</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div><Link href="/about" className="hover:text-foreground">About Us</Link></div>
              <div><Link href="/about#disclaimer" className="hover:text-foreground">Disclaimer</Link></div>
              <div><Link href="/contact" className="hover:text-foreground">Contact</Link></div>
              <div><a href="https://www.fmcsa.dot.gov/" target="_blank" rel="noopener" className="hover:text-foreground">FMCSA.gov ↗</a></div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 text-sm text-muted-foreground">
            <div className="font-semibold text-foreground mb-3">Trust &amp; Transparency</div>
            <p className="leading-relaxed">
              All data sourced from FMCSA, BBB, Google, Trustpilot, and company disclosures. 
              This site is <strong>not affiliated</strong> with any moving company. We earn no referral commissions.
            </p>
            <div className="mt-4 text-xs">
              © {year} Move Trust Hub. Educational &amp; informational purposes only.
            </div>
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        Data updated regularly. Always verify current licensing directly with FMCSA and state authorities before booking.
      </div>
    </footer>
  );
}
