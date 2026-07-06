'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Loader2, Search, ShieldCheck } from 'lucide-react';
import { verifyCarrierNumber, type VerifyDotResult } from '@/actions/verify-dot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

import { DotVerifierResults } from '@/components/verify-dot/dot-verifier-results';
import { popularDestinationLinks } from '@/lib/verify-dot/seo';

type Props = {
  sourcePage?: string;
};

export function DotVerifier({ sourcePage = '/verify-dot' }: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const prefill = searchParams.get('q') || searchParams.get('carrier') || '';
    if (prefill) setQuery(prefill);
  }, [searchParams]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyDotResult | null>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await verifyCarrierNumber({
        query,
        sourcePage,
      });

      if (!res.success) {
        setError(res.error ?? 'Verification failed. Please try again.');
        setLoading(false);
        return;
      }

      setResult(res);
      setLoading(false);
    } catch (err) {
      console.error('[DOT Verify]', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="border-2 border-primary/15 shadow-lg p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="dot-query" className="block text-sm font-medium">
            USDOT or MC Number
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="dot-query"
                name="dot-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 1234567, DOT 1234567, or MC-123456"
                className="h-14 pl-11 text-lg"
                inputMode="text"
                autoComplete="off"
                disabled={loading}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'dot-error' : 'dot-hint'}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 text-base gap-2 min-w-[160px]"
              disabled={loading || !query.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  Verify Now
                  <ShieldCheck className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
          <p id="dot-hint" className="text-xs text-muted-foreground">
            Accepts USDOT numbers (3–8 digits) or MC docket numbers. We log
            searches to improve our tools — never sold to movers.
          </p>
          {error ? (
            <p id="dot-error" className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </form>

        {result?.success ? (
          <div className="mt-6 pt-6 border-t">
            <DotVerifierResults result={result} />
          </div>
        ) : null}
      </Card>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Popular moving destinations</h2>
        <div className="flex flex-wrap gap-2">
          {popularDestinationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}