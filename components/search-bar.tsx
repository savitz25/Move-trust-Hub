'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  LocationPlaceInput,
  type ConfirmedPlace,
} from '@/components/location/location-place-input';

/**
 * Directory search that also routes city/ZIP queries to county movers pages.
 * Name-like queries still go to /companies?search=.
 */
export function SearchBar({
  defaultValue = '',
  compact = false,
}: {
  defaultValue?: string;
  compact?: boolean;
}) {
  const [query, setQuery] = useState(defaultValue);
  const [placeText, setPlaceText] = useState('');
  const [place, setPlace] = useState<ConfirmedPlace | null>(null);
  const [mode, setMode] = useState<'all' | 'location'>('all');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'location' && place?.moversHref) {
      router.push(place.moversHref);
      return;
    }
    const q = query.trim();
    if (q) {
      // ZIP shortcut
      if (/^\d{5}$/.test(q)) {
        void fetch(`/api/place-resolve?zip=${q}`)
          .then(async (res) => {
            if (!res.ok) {
              router.push(`/companies?search=${encodeURIComponent(q)}`);
              return;
            }
            const data = await res.json();
            router.push(data.moversHref || `/companies?search=${encodeURIComponent(q)}`);
          })
          .catch(() => {
            router.push(`/companies?search=${encodeURIComponent(q)}`);
          });
        return;
      }
      router.push(`/companies?search=${encodeURIComponent(q)}`);
    } else {
      router.push('/companies');
    }
  };

  const onPlaceConfirm = useCallback(
    (p: ConfirmedPlace | null) => {
      setPlace(p);
      if (p?.moversHref) {
        // Immediate route on city confirmation for location mode
        router.push(p.moversHref);
      }
    },
    [router]
  );

  if (mode === 'location') {
    return (
      <div className="relative w-full space-y-2">
        <LocationPlaceInput
          label="Find movers by city"
          placeholder="e.g. Boca Raton or 33433"
          value={placeText}
          onChange={setPlaceText}
          confirmed={place}
          onConfirm={onPlaceConfirm}
          variant="default"
        />
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            className="text-xs font-medium text-primary hover:underline"
            onClick={() => {
              setMode('all');
              setPlace(null);
              setPlaceText('');
            }}
          >
            ← Search by company name instead
          </button>
          {place?.moversHref ? (
            <Button
              type="button"
              size="sm"
              onClick={() => router.push(place.moversHref)}
            >
              View county movers
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              compact
                ? 'Search movers…'
                : 'Search movers by name, city, or specialty (e.g. military, piano)...'
            }
            className="pl-11 h-12 text-base rounded-l-xl rounded-r-none border-r-0"
          />
        </div>
        <Button type="submit" className="rounded-l-none rounded-r-xl h-12 px-8">
          Search
        </Button>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] text-muted-foreground md:text-left">
          Try: “Allied”, “military”, “New York”, “JK Moving”, or “auto transport”
        </p>
        <button
          type="button"
          className="text-[11px] font-semibold text-primary hover:underline"
          onClick={() => setMode('location')}
        >
          Search by city / ZIP →
        </button>
      </div>
    </form>
  );
}
