'use client';

import Link from 'next/link';
import { ArrowRight, Home, Landmark, ShieldCheck } from 'lucide-react';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

type Rec = {
  hub: HubId;
  title: string;
  description: string;
  href: string;
  cta: string;
};

const RECS_BY_HUB: Record<HubId, Rec[]> = {
  move: [
    {
      hub: 'lender',
      title: 'Financing your new place?',
      description: 'Compare NMLS-verified mortgage lenders in your destination county.',
      href: hubPath('lender', '/local-lenders'),
      cta: 'Find lenders',
    },
    {
      hub: 'insurance',
      title: 'Updating coverage?',
      description: 'Health and homeowners insurance often change when you relocate.',
      href: hubPath('insurance', '/resources/how-to-choose-health-insurance-plan'),
      cta: 'Health plan guide',
    },
  ],
  lender: [
    {
      hub: 'move',
      title: 'Relocating for the purchase?',
      description: 'Research FMCSA-licensed interstate movers before closing day.',
      href: hubPath('move', '/companies'),
      cta: 'Browse movers',
    },
    {
      hub: 'insurance',
      title: 'Protect the new home',
      description: 'Shop DOI-verified agents for homeowners and health coverage.',
      href: hubPath('insurance', '/directory'),
      cta: 'Agent directory',
    },
  ],
  insurance: [
    {
      hub: 'move',
      title: 'Moving soon?',
      description: 'Line up licensed movers and understand valuation protection options.',
      href: hubPath('move', '/resources/interstate-moving-insurance'),
      cta: 'Insurance guide',
    },
    {
      hub: 'lender',
      title: 'Buying with new coverage?',
      description: 'Match with county-level mortgage lenders for your loan scenario.',
      href: hubPath('lender', '/calculators'),
      cta: 'Mortgage calculators',
    },
  ],
};

const ICONS = { move: Home, lender: Landmark, insurance: ShieldCheck } as const;

export function HubRecommendationStrip({ hub }: { hub: HubId }) {
  const recs = RECS_BY_HUB[hub];

  return (
    <section
      className="border-t bg-card py-8"
      aria-label="Related services after your move"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          After your move
        </p>
        <h2 className="mt-1 text-center text-lg font-semibold tracking-tight">
          Moving support resources
        </h2>
        <div className="mx-auto mt-5 grid max-w-3xl gap-3 sm:grid-cols-2">
          {recs.map((rec) => {
            const Icon = ICONS[rec.hub];
            return (
              <Link
                key={rec.href}
                href={rec.href}
                className="group rounded-xl border bg-background p-4 transition-all duration-200 hover:border-primary/35 hover:shadow-trust hover-lift"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold leading-snug">{rec.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{rec.description}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {rec.cta}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}