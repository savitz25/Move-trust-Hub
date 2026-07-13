import { Suspense } from 'react';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import { MyMoveDashboard } from '@/components/save-my-move/my-move-dashboard';
import { AuthErrorToast } from '@/components/save-my-move/auth-error-toast';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { getMyMoveDashboardData } from '@/actions/save-my-move';

export const metadata = buildResourceMetadata(
  '/my-move',
  'My Move — Saved Inventories & Movers',
  'Optional Save My Move dashboard. Access saved moving inventories, mover shortlists, and comparisons across devices. No account required to use our tools.'
);

export default async function MyMovePage() {
  const user = await getAuthenticatedUser();
  let initialData = null;

  if (user) {
    try {
      initialData = await getMyMoveDashboardData();
    } catch {
      initialData = null;
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Move</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Optional convenience — save inventories and mover shortlists across devices.
          Every tool on Move Trust Hub works without signing in.
        </p>
      </header>
      <Suspense fallback={null}>
        <AuthErrorToast />
      </Suspense>
      <MyMoveDashboard initialData={initialData} />
    </div>
  );
}