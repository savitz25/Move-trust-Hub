import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import { MyMoveDashboard } from '@/components/save-my-move/my-move-dashboard';
import { AuthErrorToast } from '@/components/save-my-move/auth-error-toast';
import { HandoffStatusBanner } from '@/components/save-my-move/handoff-status-banner';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { getMyMovePasswordStatus } from '@/lib/save-my-move/password';
import { getMyMoveDashboardData } from '@/actions/save-my-move';
import {
  ResearchNextSteps,
  type ResearchNextLink,
} from '@/components/research/research-next-steps';

const MY_MOVE_RESEARCH: ResearchNextLink[] = [
  {
    href: '/tools/move-quote-check',
    label: 'Move Quote Check',
    description: 'Review estimate terms before you sign or pay a deposit.',
    icon: 'verify',
  },
  {
    href: '/moving-calculator',
    label: 'Update inventory in the Moving Calculator',
    description: 'Refresh cubic feet and weight for comparable estimates.',
    icon: 'calculator',
  },
  {
    href: '/companies',
    label: 'Research more movers',
    description: 'Independent FMCSA-oriented directory — no lead fees.',
    icon: 'directory',
  },
  {
    href: '/verify-dot',
    label: 'Verify USDOT numbers on your shortlist',
    description: 'Authority context before deposits.',
    icon: 'verify',
  },
  {
    href: '/compare',
    label: 'Open the Compare tool',
    description: 'Side-by-side reputation and licensing signals.',
    icon: 'compare',
  },
  {
    href: '/local-movers',
    label: 'County local mover guides',
    description: 'Local vs Regional honesty rules by market.',
    icon: 'local',
  },
];

export const metadata = buildResourceMetadata(
  '/my-move',
  'My Move — Move HQ Dashboard',
  'Your Move HQ — saved inventories, mover shortlists, comparisons, and move readiness in one independent dashboard.'
);

type PageProps = {
  searchParams: Promise<{ demo?: string }>;
};

export default async function MyMovePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const demo = params.demo === '1';

  const user = await getAuthenticatedUser();
  let initialData = null;
  let passwordEnabled = false;

  if (user && !demo) {
    const pw = await getMyMovePasswordStatus();
    if (pw?.shouldOfferCreatePassword) {
      redirect('/my-move/create-password?next=%2Fmy-move');
    }
    passwordEnabled = pw?.passwordEnabled ?? false;

    // Soft-fail: empty arrays are success; never leave signed-in users without a shell
    try {
      initialData = await getMyMoveDashboardData();
    } catch (err) {
      console.error('[my-move page] getMyMoveDashboardData', err);
      initialData = null;
    }
    if (!initialData) {
      initialData = {
        user: { id: user.id, email: user.email ?? '' },
        profile: null,
        inventories: [],
        movers: [],
        comparisons: [],
        companyNames: {},
        companySummaries: {},
      };
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <Suspense fallback={null}>
        <HandoffStatusBanner />
      </Suspense>
      <header className="mb-6 md:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
          Move HQ
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Move</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl">
          Your independent command center — inventories, shortlists, and comparisons synced across
          devices. Every tool on Move Trust Hub still works without signing in.
        </p>
      </header>
      <Suspense fallback={null}>
        <AuthErrorToast />
      </Suspense>
      <MyMoveDashboard
        initialData={initialData}
        demo={demo}
        passwordEnabled={passwordEnabled}
      />
      <ResearchNextSteps
        className="mt-10"
        title="Continue research from My Move"
        subtitle="Your workspace stays connected to independent tools — no paid placements."
        links={MY_MOVE_RESEARCH}
      />
    </div>
  );
}