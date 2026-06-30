'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DestinationsMegaMenuLazy } from '@/components/navbar/destinations-mega-menu-lazy';
import { DestinationsMobileNav } from '@/components/navbar/destinations-mobile-nav';

const QuoteModal = dynamic(
  () => import('@/components/quote-modal').then((m) => m.QuoteModal),
  { ssr: false }
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const navLinks = [
    { href: '/companies', label: 'Movers Directory' },
    { href: '/local-movers', label: 'Local Movers' },
    { href: '/auto-transport', label: 'Auto Transport' },
    { href: '/moving-calculator', label: 'Move Calculator' },
    { href: '/verify-dot', label: 'Verify DOT' },
    { href: '/review', label: 'Reviews' },
    { href: '/compare', label: 'Compare' },
    { href: '/resources', label: 'Resources' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link prefetch={false} href="/" className="group">
            <Image
              src="/logo.png"
              alt="Move Trust Hub — trusted interstate moving directory and free quote matching"
              width={300}
              height={75}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 180px, 300px"
              className="h-12 w-auto transition-transform group-hover:scale-[1.02] max-w-[300px]"
            />
          </Link>
          <div className="hidden md:flex items-center rounded-full bg-muted/70 px-1.5 py-px text-[8px] font-medium tracking-[1px] text-muted-foreground border border-border/50">
            TRUSTED
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link
            prefetch={false}
            href="/companies"
            className="font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
          >
            Movers Directory
          </Link>
          <DestinationsMegaMenuLazy />
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              prefetch={false}
              href={link.href}
              className="font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <Button
            size="sm"
            onClick={() => setShowQuoteModal(true)}
            className="gap-2 bg-primary hover:bg-primary/90 shadow-sm"
          >
            <FileText className="h-4 w-4" /> Get Free Quotes
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Button
            size="sm"
            className="gap-1.5 min-h-[44px] px-3"
            onClick={() => setShowQuoteModal(true)}
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Quotes
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 min-h-[44px] min-w-[44px]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4">
          <div className="flex flex-col gap-3 text-sm">
            <Link
              prefetch={false}
              href="/companies"
              className="py-3 min-h-[44px] flex items-center font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Movers Directory
            </Link>
            <DestinationsMobileNav
              onClose={() => setIsOpen(false)}
              onRequestQuote={() => setShowQuoteModal(true)}
            />
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                prefetch={false}
                href={link.href}
                className="py-3 min-h-[44px] flex items-center font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              className="w-full mt-2 min-h-[48px]"
              onClick={() => {
                setIsOpen(false);
                setShowQuoteModal(true);
              }}
            >
              Get Free Quotes
            </Button>
            <Link
              prefetch={false}
              href="/auto-transport"
              onClick={() => setIsOpen(false)}
              className="text-center py-2 text-primary"
            >
              Browse Auto Transport →
            </Link>
          </div>
        </div>
      )}

      {showQuoteModal ? (
        <QuoteModal open={showQuoteModal} onOpenChange={setShowQuoteModal} />
      ) : null}
    </nav>
  );
}