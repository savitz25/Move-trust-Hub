'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeaderTrustBadge } from '@/components/trust/header-trust-badge';
import { MOVE_PRIMARY_NAV } from '@/lib/nav/move-primary-nav';

/** Legacy move navbar — aligned with five-item primary nav. */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [...MOVE_PRIMARY_NAV];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 sm:h-[4.5rem] items-center justify-between px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link prefetch={false} href="/" className="group">
            <Image
              src="/logo.png"
              alt="Move Trust Hub — independent interstate moving directory"
              width={300}
              height={75}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 180px, 300px"
              className="h-12 w-auto transition-transform group-hover:scale-[1.02] max-w-[300px]"
            />
          </Link>
          <HeaderTrustBadge className="hidden xl:flex" />
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              prefetch={false}
              href={link.href}
              className="font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-11 w-11"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isOpen ? (
        <div className="lg:hidden border-t bg-background px-4 py-4">
          <div className="flex flex-col gap-1 text-sm">
            {navLinks.map((link) => (
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
          </div>
        </div>
      ) : null}
    </nav>
  );
}