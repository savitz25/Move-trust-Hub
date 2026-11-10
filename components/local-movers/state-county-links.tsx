import Link from 'next/link';
import { getPublishedIndexableCounties } from '@/lib/local-movers/county-indexability-async';
import type { LocalCounty } from '@/lib/local-movers/types';

export function StateCountyLinkList({
  stateSlug,
  stateName,
  counties,
}: {
  stateSlug: string;
  stateName: string;
  counties: readonly LocalCounty[];
}) {
  const headingId = `${stateSlug}-counties`;
  const ordered = [...counties].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h2 id={headingId} className="text-xl font-semibold">{stateName} counties</h2>
      <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((county) => (
          <li key={county.slug}>
            <Link prefetch={false} href={`/local-movers/${stateSlug}/${county.slug}`} className="underline underline-offset-4">
              {county.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm">
        <Link prefetch={false} href={`/local-movers/${stateSlug}`} className="underline underline-offset-4">
          All local movers in {stateName}
        </Link>
      </p>
    </section>
  );
}

/** State directory links. Uses the same decision as the local sitemap. */
export async function StateCountyLinks({ stateSlug, stateName }: {
  stateSlug: string;
  stateName: string;
}) {
  const counties = await getPublishedIndexableCounties(stateSlug);
  return <StateCountyLinkList stateSlug={stateSlug} stateName={stateName} counties={counties} />;
}
