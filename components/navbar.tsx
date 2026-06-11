'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { QuoteModal } from '@/components/quote-modal';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const navLinks = [
    { href: '/companies', label: 'Directory' },
    { href: '/moving-calculator', label: 'Move Calculator' },
    { href: '/compare', label: 'Compare Movers' },
    { href: '/resources', label: 'Resources' },
    { href: '/about', label: 'About & Trust' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl tracking-tighter">
            <img src="/logo.svg" alt="Move Trust Hub" className="h-8 w-auto" />
          </Link>
          <div className="hidden md:flex items-center rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium tracking-widest text-muted-foreground">
            TRUSTED DIRECTORY
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button 
            size="sm" 
            onClick={() => setShowQuoteModal(true)}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <FileText className="h-4 w-4" /> Get Free Quotes
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4">
          <div className="flex flex-col gap-3 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              className="w-full mt-2" 
              onClick={() => { setIsOpen(false); setShowQuoteModal(true); }}
            >
              Get Free Quotes
            </Button>
            <Link href="/companies" onClick={() => setIsOpen(false)} className="text-center py-2 text-primary">
              Browse Movers →
            </Link>
          </div>
        </div>
      )}

      <QuoteModal open={showQuoteModal} onOpenChange={setShowQuoteModal} />
    </nav>
  );
}
