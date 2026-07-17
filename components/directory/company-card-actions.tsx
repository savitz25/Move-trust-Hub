'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Plus, X } from 'lucide-react';
import type { Company } from '@/types';
import { Button } from '@/components/ui/button';
import { MethodologyLink } from '@/components/trust/methodology-link';

const SaveMoverButton = dynamic(
  () =>
    import('@/components/save-my-move/save-mover-button').then((m) => m.SaveMoverButton),
  { ssr: false, loading: () => <span className="inline-block h-8 w-8" aria-hidden /> }
);

const MoverEmailButton = dynamic(
  () =>
    import('@/components/save-my-move/mover-email-button').then((m) => m.MoverEmailButton),
  { ssr: false, loading: () => null }
);

const ClaimProfileCta = dynamic(
  () => import('@/components/portal/claim-cta').then((m) => m.ClaimProfileCta),
  { ssr: false, loading: () => null }
);

type CompareStore = {
  isSelected: (slug: string) => boolean;
  canAddMore: () => boolean;
  toggleCompany: (company: Company) => void;
};

type Props = {
  company: Company;
  profileHref: string;
  reviewHref: string;
  compareStore: CompareStore;
};

/** Lazy Save/Email/Claim so the directory card shell stays light. */
export function CompanyCardActions({
  company,
  profileHref,
  reviewHref,
  compareStore,
}: Props) {
  const isSelected = compareStore.isSelected(company.slug);
  const canAdd = compareStore.canAddMore();

  return (
    <div className="border-t px-5 py-3.5 bg-muted/20 space-y-2">
      <div className="flex items-center justify-between text-sm gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="min-w-0">
            <MethodologyLink
              anchor="reputationScore"
              className="font-semibold tabular-nums no-underline"
            >
              {company.reputationScore}
            </MethodologyLink>
            <span className="text-muted-foreground"> rep</span>
          </div>
          <MoverEmailButton companySlug={company.slug} companyName={company.name} />
        </div>
        <div className="flex gap-2 shrink-0 items-center">
          <SaveMoverButton companySlug={company.slug} companyName={company.name} />
          <Link href={reviewHref}>
            <Button size="sm" variant="ghost" className="h-8 px-2 text-xs">
              Review
            </Button>
          </Link>
          <Link href={profileHref}>
            <Button size="sm" variant="ghost" className="h-8 px-3">
              Details
            </Button>
          </Link>
          <Button
            size="sm"
            variant={isSelected ? 'default' : 'outline'}
            className="h-8 px-3 gap-1"
            onClick={() => compareStore.toggleCompany(company)}
            disabled={!isSelected && !canAdd}
          >
            {isSelected ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {isSelected ? 'Remove' : 'Compare'}
          </Button>
        </div>
      </div>
      <ClaimProfileCta companySlug={company.slug} variant="card" />
    </div>
  );
}
