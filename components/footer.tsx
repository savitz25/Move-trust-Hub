import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-9">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold text-base tracking-tight">
              <img src="/logo.png" alt="Move Trust Hub" className="h-14 w-auto dark:hidden" />
              <img src="/logo-dark.png" alt="Move Trust Hub" className="h-14 w-auto hidden dark:block" />
            </Link>
            <p className="mt-2.5 text-sm text-muted-foreground max-w-[210px] leading-snug">
              Independent directory for trusted interstate movers.
            </p>
          </div>

          <div>
            <div className="font-semibold mb-2.5 text-xs tracking-widest text-muted-foreground/80">DIRECTORY</div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div><Link href="/companies" className="hover:text-foreground transition-colors">All Companies</Link></div>
              <div><Link href="/companies?sort=reputation" className="hover:text-foreground transition-colors">Top Rated</Link></div>
              <div><Link href="/compare" className="hover:text-foreground transition-colors">Compare Tool</Link></div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2.5 text-xs tracking-widest text-muted-foreground/80">RESOURCES</div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div><Link href="/resources" className="hover:text-foreground transition-colors">Moving Guides</Link></div>
              <div><Link href="/resources#fmcsa" className="hover:text-foreground transition-colors">FMCSA Tips</Link></div>
              <div><Link href="/resources#checklist" className="hover:text-foreground transition-colors">Checklist</Link></div>
              <div><Link href="/resources#scams" className="hover:text-foreground transition-colors">Avoid Scams</Link></div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2.5 text-xs tracking-widest text-muted-foreground/80">COMPANY</div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></div>
              <div><Link href="/about#disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></div>
              <div><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></div>
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
      <div className="border-t py-3 text-center text-[10px] text-muted-foreground/70 tracking-wide">
        Always verify licensing directly with FMCSA and state authorities.
      </div>
    </footer>
  );
}
