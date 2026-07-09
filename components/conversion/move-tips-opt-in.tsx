'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'mth-tips-optin-dismissed';

export function MoveTipsOptIn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = window.setTimeout(() => setVisible(true), 12000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  return (
    <aside
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md rounded-2xl border border-primary/20 bg-card p-4 shadow-trust-lg sm:left-auto sm:right-6"
      role="dialog"
      aria-label="Get moving tips"
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 top-3 rounded-lg p-1 text-muted-foreground hover:bg-muted"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex gap-3 pr-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
            Free move planning tips
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            No spam, no lead selling — just independent checklists and scam alerts from our team.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" asChild>
              <Link href="/contact?subject=move-tips">Get tips via email</Link>
            </Button>
            <Button size="sm" variant="ghost" onClick={dismiss}>
              Maybe later
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}