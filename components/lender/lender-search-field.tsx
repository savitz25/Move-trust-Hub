'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLenderSearch } from '@/components/lender/lender-search-context';

type Props = {
  className?: string;
  variant?: 'light' | 'dark';
  helperText?: string;
};

export function LenderSearchField({
  className,
  variant = 'light',
  helperText,
}: Props) {
  const { input, setInput, submit } = useLenderSearch();
  const isDark = variant === 'dark';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className={className ?? 'mx-auto w-full max-w-xl'}
      aria-label="Search mortgage lenders by ZIP code or company name"
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ZIP code or lender name (e.g. 33301, Veterans United)"
          className={
            isDark
              ? 'h-12 w-full rounded-xl border border-white/20 bg-white/95 px-4 text-base text-[#0A2540] shadow-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/30'
              : 'h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-base text-[#0A2540] shadow-sm focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20'
          }
          aria-label="ZIP code or lender name"
          autoComplete="off"
        />
        <Button
          type="submit"
          size="lg"
          className={`h-12 shrink-0 gap-2 px-6 ${isDark ? 'bg-teal-500 text-white hover:bg-teal-400' : ''}`}
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Search
        </Button>
      </div>
      {helperText ? (
        <p className={`mt-2 text-left text-xs ${isDark ? 'text-zinc-300' : 'text-muted-foreground'}`}>
          {helperText}
        </p>
      ) : null}
    </form>
  );
}