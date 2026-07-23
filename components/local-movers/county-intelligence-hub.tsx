import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Building2,
  Calendar,
  ChevronDown,
  DollarSign,
  ExternalLink,
  GraduationCap,
  HeartPulse,
  Home,
  MapPinned,
  Navigation,
  Sparkles,
  Users,
  Briefcase,
  Trees,
} from 'lucide-react';
import type {
  CountyIntelligencePack,
  CountyIntelligenceSectionId,
  CountyRelocationModule,
  CountySpecializedModule,
} from '@/lib/local-movers/county-intelligence/types';
import { DEFAULT_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';
import { cn } from '@/lib/utils';

type Props = {
  pack: CountyIntelligencePack;
  className?: string;
};

/** Schematic zone map — CSS grid, no external assets. */
function ZoneMapSchematic({ pack }: { pack: CountyIntelligencePack }) {
  return (
    <div
      className="rounded-2xl border bg-gradient-to-br from-sky-50 via-background to-amber-50/60 p-4 dark:from-sky-950/40 dark:to-amber-950/20"
      role="img"
      aria-label={`${pack.hubTitle} zone map schematic`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
        <MapPinned className="h-3.5 w-3.5" aria-hidden />
        Zone map (schematic)
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] sm:text-xs">
        {pack.zones.map((z, i) => (
          <a
            key={z.id}
            href={`#zone-${z.id}`}
            className={cn(
              'rounded-xl border bg-background/90 px-2 py-3 font-medium shadow-sm transition-colors hover:border-primary/50 hover:bg-primary/5',
              i % 3 === 0 && 'sm:col-span-1',
              z.id === 'antelope' && 'sm:col-span-2',
              z.id === 'hills' && 'border-amber-300/70 dark:border-amber-800/50'
            )}
          >
            <span className="block text-foreground leading-snug">{z.shortName}</span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
        Zones are for planning — not political boundaries. Jump to a zone for housing types and
        access tips.
      </p>
    </div>
  );
}

function AccordionSection({
  id,
  title,
  icon,
  children,
  defaultOpen = false,
  collapsible,
}: {
  id: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  collapsible: boolean;
}) {
  if (!collapsible) {
    return (
      <section className="rounded-2xl border bg-card p-6 sm:p-7" aria-labelledby={id}>
        <h2 id={id} className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 flex items-center gap-2">
          {icon}
          {title}
        </h2>
        {children}
      </section>
    );
  }

  return (
    <details
      id={id}
      className="group rounded-2xl border bg-card open:bg-card"
      open={defaultOpen || undefined}
    >
      <summary className="cursor-pointer list-none flex items-center justify-between gap-3 p-5 sm:p-6 font-semibold tracking-tight text-base sm:text-lg [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2 min-w-0">
          {icon}
          <span className="truncate">{title}</span>
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-border/60 pt-4">{children}</div>
    </details>
  );
}

function relocationIcon(moduleId: string) {
  if (moduleId.includes('school') || moduleId.includes('education'))
    return <GraduationCap className="h-5 w-5 text-primary shrink-0" aria-hidden />;
  if (moduleId.includes('hospital') || moduleId.includes('health'))
    return <HeartPulse className="h-5 w-5 text-primary shrink-0" aria-hidden />;
  if (moduleId.includes('hous') || moduleId.includes('cost'))
    return <Home className="h-5 w-5 text-primary shrink-0" aria-hidden />;
  if (moduleId.includes('job') || moduleId.includes('commute'))
    return <Briefcase className="h-5 w-5 text-primary shrink-0" aria-hidden />;
  if (moduleId.includes('town') || moduleId.includes('neighbor') || moduleId.includes('fit'))
    return <Building2 className="h-5 w-5 text-primary shrink-0" aria-hidden />;
  if (moduleId.includes('demo') || moduleId.includes('who'))
    return <Users className="h-5 w-5 text-primary shrink-0" aria-hidden />;
  if (moduleId.includes('life') || moduleId.includes('outdoor') || moduleId.includes('climate'))
    return <Trees className="h-5 w-5 text-primary shrink-0" aria-hidden />;
  return <Sparkles className="h-5 w-5 text-primary shrink-0" aria-hidden />;
}

function RelocationBlock({
  module,
  collapsible,
}: {
  module: CountyRelocationModule;
  collapsible: boolean;
}) {
  return (
    <AccordionSection
      id={`reloc-${module.id}`}
      title={module.title}
      icon={relocationIcon(module.id)}
      collapsible={collapsible}
    >
      {module.intro ? (
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{module.intro}</p>
      ) : null}
      <ul className="space-y-3">
        {module.bullets.map((b, i) => (
          <li key={b.title ?? i} className="text-sm leading-relaxed flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <div>
              {b.title ? (
                <span className="font-semibold text-foreground">{b.title}. </span>
              ) : null}
              <span className="text-muted-foreground">{b.detail}</span>
            </div>
          </li>
        ))}
      </ul>
    </AccordionSection>
  );
}

function SpecializedBlock({
  module,
  collapsible,
}: {
  module: CountySpecializedModule;
  collapsible: boolean;
}) {
  return (
    <AccordionSection
      id={`spec-${module.id}`}
      title={module.title}
      icon={<AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" aria-hidden />}
      collapsible={collapsible}
    >
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{module.intro}</p>
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {module.bullets.map((b) => (
          <li key={b} className="flex gap-2 leading-relaxed">
            <span className="text-primary">·</span>
            {b}
          </li>
        ))}
      </ul>
    </AccordionSection>
  );
}

/**
 * Hyper-local county intelligence + relocation research.
 * When collapsibleDeepContent is set, sections accordion so movers stay primary on the page.
 */
export function CountyIntelligenceHub({ pack, className }: Props) {
  const reviewed = new Date(pack.lastReviewed).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const collapsible = Boolean(pack.collapsibleDeepContent);
  const order =
    pack.sectionOrder?.length ? pack.sectionOrder : DEFAULT_INTELLIGENCE_SECTION_ORDER;

  const renderSection = (id: CountyIntelligenceSectionId) => {
    switch (id) {
      case 'whatMakesDifferent':
        return (
          <AccordionSection
            key={id}
            id="county-diff-heading"
            title={pack.whatMakesDifferent.title}
            icon={<AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" aria-hidden />}
            collapsible={collapsible}
            defaultOpen={!collapsible}
          >
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {pack.whatMakesDifferent.intro}
            </p>
            <ul className="space-y-4">
              {pack.whatMakesDifferent.bullets.map((b) => (
                <li key={b.title} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{b.title}</p>
                    <p className="text-muted-foreground mt-0.5">{b.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionSection>
        );
      case 'zones':
        return (
          <div key={id} className="space-y-4">
            <AccordionSection
              id="county-zones-heading"
              title={pack.zonesHeading ?? 'Hyper-local zone breakdown'}
              icon={<Navigation className="h-5 w-5 text-primary shrink-0" aria-hidden />}
              collapsible={collapsible}
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {pack.zonesIntro ??
                  'Treat each zone as its own logistics problem. Housing stock and truck access differ across the county.'}
              </p>
              <ZoneMapSchematic pack={pack} />
              <div className="grid gap-4 sm:grid-cols-2 mt-5">
                {pack.zones.map((z) => (
                  <article
                    key={z.id}
                    id={`zone-${z.id}`}
                    className="rounded-2xl border bg-muted/15 p-5 scroll-mt-24"
                  >
                    <h3 className="font-semibold text-foreground tracking-tight">{z.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {z.neighborhoods.slice(0, 6).join(' · ')}
                      {z.neighborhoods.length > 6 ? '…' : ''}
                    </p>
                    <p className="text-sm mt-3">
                      <span className="font-medium text-foreground">Housing: </span>
                      <span className="text-muted-foreground">{z.housingTypes}</span>
                    </p>
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {z.challenges.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="text-primary">·</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-sm leading-relaxed rounded-lg border bg-background/80 px-3 py-2">
                      <span className="font-medium text-foreground">Mover tip: </span>
                      <span className="text-muted-foreground">{z.moverTips}</span>
                    </p>
                  </article>
                ))}
              </div>
            </AccordionSection>
          </div>
        );
      case 'costDrivers':
        return (
          <AccordionSection
            key={id}
            id="county-cost-intel-heading"
            title={pack.costDrivers.title}
            icon={<DollarSign className="h-5 w-5 text-primary shrink-0" aria-hidden />}
            collapsible={collapsible}
          >
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {pack.costDrivers.intro}
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {pack.costDrivers.ranges.map((r) => (
                <div key={r.label} className="rounded-xl border bg-muted/20 p-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    {r.label}
                  </div>
                  <div className="text-lg font-semibold tabular-nums">{r.value}</div>
                  {r.note ? (
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.note}</p>
                  ) : null}
                </div>
              ))}
            </div>
            <ul className="space-y-3">
              {pack.costDrivers.drivers.map((d) => (
                <li key={d.title} className="text-sm leading-relaxed">
                  <span className="font-semibold text-foreground">{d.title}. </span>
                  <span className="text-muted-foreground">{d.detail}</span>
                </li>
              ))}
            </ul>
          </AccordionSection>
        );
      case 'seasonal':
        return (
          <AccordionSection
            key={id}
            id="county-seasonal-heading"
            title={pack.seasonal.title}
            icon={<Calendar className="h-5 w-5 text-primary shrink-0" aria-hidden />}
            collapsible={collapsible}
          >
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {pack.seasonal.intro}
            </p>
            <ul className="space-y-4">
              {pack.seasonal.items.map((item) => (
                <li key={item.title} className="text-sm leading-relaxed">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-muted-foreground mt-0.5">{item.detail}</p>
                </li>
              ))}
            </ul>
          </AccordionSection>
        );
      case 'specialized':
        if (!pack.specialized?.length) return null;
        return (
          <div key={id} className="space-y-4">
            {pack.specialized.map((m) => (
              <SpecializedBlock key={m.id} module={m} collapsible={collapsible} />
            ))}
          </div>
        );
      case 'relocation':
        if (!pack.relocation?.modules.length) return null;
        return (
          <div key={id} className="space-y-4">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                {pack.relocation.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
                {pack.relocation.intro}
              </p>
            </div>
            {pack.relocation.modules.map((m) => (
              <RelocationBlock key={m.id} module={m} collapsible={collapsible} />
            ))}
          </div>
        );
      case 'resources':
        return (
          <AccordionSection
            key={id}
            id="county-resources-heading"
            title={pack.resources.title}
            icon={<Sparkles className="h-5 w-5 text-primary shrink-0" aria-hidden />}
            collapsible={collapsible}
          >
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {pack.resources.intro}
            </p>
            <ul className="space-y-2.5">
              {pack.resources.items.map((item) => {
                const isExternal = item.external || item.href.startsWith('http');
                return (
                  <li key={item.href + item.label}>
                    {isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex flex-wrap items-baseline gap-x-2 text-sm font-medium text-primary hover:underline"
                      >
                        {item.label}
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                        {item.note ? (
                          <span className="font-normal text-muted-foreground">— {item.note}</span>
                        ) : null}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="inline-flex flex-wrap items-baseline gap-x-2 text-sm font-medium text-primary hover:underline"
                      >
                        {item.label}
                        {item.note ? (
                          <span className="font-normal text-muted-foreground">— {item.note}</span>
                        ) : null}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="text-xs text-muted-foreground mt-5">
              Intelligence last reviewed {reviewed}. Rules, fees, and district boundaries change —
              verify on official sites before move day.
            </p>
          </AccordionSection>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn('space-y-4 mb-10', className)}
      id="county-intelligence"
      data-testid="county-intelligence-hub"
    >
      {collapsible ? (
        <p className="text-sm text-muted-foreground leading-relaxed rounded-xl border bg-muted/20 px-4 py-3">
          Expand sections below for county-specific moving logistics and relocation research
          (schools, healthcare, towns, and commute patterns). Mover listings stay above this guide.
        </p>
      ) : null}
      {order.map((sectionId) => renderSection(sectionId))}
    </div>
  );
}
