'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Search, ShieldCheck } from 'lucide-react';
import { lookupCarrierForReview, type LookupCarrierPreview } from '@/actions/reviews';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import Link from 'next/link';

type Props = {
  initialQuery?: string;
  onCarrierSelected: (preview: LookupCarrierPreview, displayNumber: string) => void;
};

export function CarrierReviewSearch({ initialQuery = '', onCarrierSelected }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<LookupCarrierPreview | null>(null);
  const [displayNumber, setDisplayNumber] = useState<string | null>(null);
  const autoSearched = useRef(false);

  async function runLookup(searchQuery: string) {
    setLoading(true);
    setError(null);
    setPreview(null);

    const res = await lookupCarrierForReview(searchQuery);
    setLoading(false);

    if (!res.success || !res.preview) {
      setError(res.error ?? 'Lookup failed');
      return;
    }

    setPreview(res.preview);
    setDisplayNumber(res.displayNumber ?? null);
  }

  useEffect(() => {
    if (!initialQuery.trim() || autoSearched.current) return;
    autoSearched.current = true;
    void runLookup(initialQuery.trim());
  }, [initialQuery]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    await runLookup(query);
  }

  function handleContinue() {
    if (preview && displayNumber) {
      onCarrierSelected(preview, displayNumber);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="USDOT or MC number, e.g. 1234567"
            className="h-12 pl-11"
            required
            disabled={loading}
          />
        </div>
        <Button type="submit" size="lg" className="h-12 gap-2" disabled={loading || !query.trim()}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Looking up…
            </>
          ) : (
            <>
              Find Carrier <ShieldCheck className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      {preview ? (
        <Card className="border-primary/20 bg-primary/5 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Badge variant="secondary" className="mb-2">
                {preview.inDatabase ? 'In our database' : 'New carrier — will be added on submit'}
              </Badge>
              <h3 className="text-lg font-semibold">{preview.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {preview.dotNumber ? `DOT ${preview.dotNumber}` : null}
                {preview.dotNumber && preview.mcNumber ? ' · ' : null}
                {preview.mcNumber ? `MC-${preview.mcNumber}` : null}
              </p>
              {preview.address ? (
                <p className="text-sm text-muted-foreground mt-1">{preview.address}</p>
              ) : null}
            </div>
            {preview.approvedReviewCount > 0 ? (
              <div className="text-right">
                <StarRating rating={preview.avgRating} size="sm" />
                <p className="text-xs text-muted-foreground mt-1">
                  {preview.approvedReviewCount} approved review
                  {preview.approvedReviewCount === 1 ? '' : 's'}
                </p>
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {preview.inDatabase ? (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/company/${preview.slug}`}>View profile</Link>
              </Button>
            ) : null}
            {preview.legacyProfileSlug ? (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/companies/${preview.legacyProfileSlug}`}>Directory profile</Link>
              </Button>
            ) : null}
            <Button size="sm" onClick={handleContinue}>
              Write a review for this carrier →
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}