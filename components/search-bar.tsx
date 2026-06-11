'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar({ defaultValue = '', compact = false }: { defaultValue?: string; compact?: boolean }) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/companies?search=${encodeURIComponent(q)}`);
    } else {
      router.push('/companies');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movers by name, city, or specialty (e.g. military, piano)..."
            className="pl-11 h-12 text-base rounded-l-xl rounded-r-none border-r-0"
          />
        </div>
        <Button type="submit" className="rounded-l-none rounded-r-xl h-12 px-8">
          Search
        </Button>
      </div>
      <p className="text-[11px] text-muted-foreground mt-1.5 text-center md:text-left">Try: “Allied”, “military”, “New York”, “JK Moving”, or “auto transport”</p>
    </form>
  );
}
