import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getHubConfig } from '@/lib/hub/config';
import { hubPath } from '@/lib/hub/paths';
import type { LegacyResolution } from '@/lib/migration/hub-legacy-resolver';
import type { HubId } from '@/lib/hub/types';

type Props = {
  hub: HubId;
  resolution: Extract<LegacyResolution, { type: 'fallback' }>;
};

export function LegacyFallbackPage({ hub, resolution }: Props) {
  const config = getHubConfig(hub);
  const accent =
    hub === 'insurance' ? 'text-emerald-600' : hub === 'lender' ? 'text-[#3B82F6]' : 'text-primary';

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className={`mb-2 text-sm font-semibold uppercase tracking-widest ${accent}`}>
          {config.siteName}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{resolution.title}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">{resolution.message}</p>
        {resolution.requestedPath ? (
          <p className="mt-3 font-mono text-xs text-muted-foreground/80">
            Requested: {resolution.requestedPath}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href={hubPath(hub, '/')}>
              {config.shortName} home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={config.ctaHref ?? hubPath(hub, '/')}>
              {config.ctaLabel ?? 'Explore directory'}
            </Link>
          </Button>
        </div>
      </div>

      <section className="mx-auto mt-14 max-w-3xl" aria-labelledby="legacy-suggestions">
        <h2 id="legacy-suggestions" className="mb-6 text-center text-lg font-semibold">
          Popular destinations
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {resolution.suggestions.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="flex items-start justify-between gap-3 pt-5">
                  <div className="text-left">
                    <p className="font-medium text-sm">{item.label}</p>
                    {item.description ? (
                      <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                    ) : null}
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <p className="mx-auto mt-10 max-w-lg text-center text-xs text-muted-foreground">
        Independent directory — not affiliated with listed providers. Paths may change as we merge
        legacy Trust Hub sites onto movetrusthub.com.
      </p>
    </div>
  );
}