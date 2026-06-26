'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';

const QuoteModal = dynamic(
  () => import('@/components/quote-modal').then((m) => m.QuoteModal),
  { ssr: false }
);

type HomeQuoteContextValue = {
  openQuote: () => void;
};

const HomeQuoteContext = createContext<HomeQuoteContextValue | null>(null);

export function HomeQuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <HomeQuoteContext.Provider value={{ openQuote: () => setOpen(true) }}>
      {children}
      {open ? <QuoteModal open={open} onOpenChange={setOpen} /> : null}
    </HomeQuoteContext.Provider>
  );
}

export function useHomeQuote() {
  const ctx = useContext(HomeQuoteContext);
  if (!ctx) {
    throw new Error('useHomeQuote must be used within HomeQuoteProvider');
  }
  return ctx;
}