import Link from 'next/link';
import { ArrowRight, Calculator, Truck, BookOpen, MapPin } from 'lucide-react';
import { getCountyPath, getStatePath } from '@/lib/local-movers/index';
import type { NearbyCountyLink } from '@/lib/local-movers/florida-nearby';

export function CountyInternalLinks({
  stateName,
  stateSlug,
  countyLabel,
  nearbyCounties = [],
}: {
  stateName: string;
  stateSlug: string;
  countyLabel: string;
  nearbyCounties?: NearbyCountyLink[];
}) {
  const tools = [
    {
      href: '/moving-calculator',
      label: 'Moving Calculator',
      description: 'Estimate cubic feet and weight for interstate moves',
      icon: Calculator,
    },
    {
      href: '/companies',
      label: 'Interstate Directory',
      description: 'Browse FMCSA-licensed long-distance carriers',
      icon: Truck,
    },
    {
      href: getStatePath(stateSlug),
      label: `All ${stateName} Counties`,
      description: `Browse local mover guides across ${stateName}`,
      icon: MapPin,
    },
  ];

  const guides = [
    { href: '/resources/how-to-choose', label: 'How to Choose a Mover' },
    { href: '/resources/fmcsa', label: 'FMCSA Licensing Guide' },
    { href: '/resources/scams', label: 'Avoid Moving Scams' },
    { href: '/resources/checklist', label: 'Moving Checklist' },
    { href: '/resources/routes', label: 'Interstate Route Guides' },
    { href: '/compare', label: 'Compare Movers Side-by-Side' },
  ];

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold tracking-tight mb-4">
        Plan your move{countyLabel ? ` in ${countyLabel}` : ''}
      </h2>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-xl border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <tool.icon className="h-4 w-4 text-primary mb-2" aria-hidden="true" />
            <div className="font-semibold text-sm group-hover:text-primary transition-colors">
              {tool.label}
            </div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
      {nearbyCounties.length > 0 && (
        <div className="rounded-xl border bg-muted/20 p-4 mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-3">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            Nearby {stateName} county guides
          </div>
          <div className="flex flex-wrap gap-2">
            {nearbyCounties.map((nearby) => (
              <Link
                key={nearby.slug}
                href={getCountyPath(stateSlug, nearby.slug)}
                className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1.5 text-xs font-medium hover:border-primary/40 hover:text-primary transition-colors"
              >
                {nearby.name} County
                {nearby.seat ? ` (${nearby.seat})` : ''}
                <ArrowRight className="h-3 w-3 opacity-50" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="rounded-xl border bg-muted/20 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold mb-3">
          <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
          Helpful moving resources
        </div>
        <div className="flex flex-wrap gap-2">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1.5 text-xs font-medium hover:border-primary/40 hover:text-primary transition-colors"
            >
              {guide.label}
              <ArrowRight className="h-3 w-3 opacity-50" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}