import Link from 'next/link';
import { getIndexableCounties } from '@/lib/local-movers/indexable-counties';

export function StateCountyLinks({ stateSlug, stateName }: {
  stateSlug: string;
  stateName: string;
}) {
  const counties = [...getIndexableCounties(stateSlug)].sort((a, b) => a.name.localeCompare(b.name));
  const headingId = `${stateSlug}-counties`;
  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h2 id={headingId} className="text-xl font-semibold">{stateName} counties</h2>
      <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
        {counties.map((county) => (
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
