import Link from 'next/link';
import type { StateHubCountyRow } from '@/lib/local-movers/state-hub-helpers';

type StateHubTier1LinksProps = {
  stateName: string;
  links: StateHubCountyRow[];
};

/** Quick internal links to top Tier 1 / deep-guide counties on state hubs. */
export function StateHubTier1Links({ stateName, links }: StateHubTier1LinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="mb-8 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 px-4 py-4 sm:px-5">
      <h2 className="text-sm font-semibold text-emerald-900">
        Featured {stateName} county guides
      </h2>
      <p className="mt-1 text-xs text-emerald-800/80">
        Tier 1 indexable guides with cited research — independent directory, not mover endorsements.
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map(({ county, href, guideBadge }) => (
          <li key={county.slug}>
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
            >
              <span>{county.name}</span>
              {guideBadge ? (
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                  {guideBadge}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}