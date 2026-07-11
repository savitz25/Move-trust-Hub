import { redirect } from 'next/navigation';
import { LenderModerationQueue } from '@/components/lender/onboarding/lender-moderation-queue';
import { listPendingLenderOnboarding } from '@/actions/moderate-lender-onboarding';
import { isAdminSession } from '@/lib/admin/auth';
import { isSupabaseAdminConfigured } from '@/lib/lender/supabase/config';

export const metadata = {
  title: 'Lender Onboarding — Admin',
  robots: { index: false, follow: false },
};

export default async function LenderOnboardingAdminPage() {
  const authed = await isAdminSession();
  if (!authed) {
    redirect('/lender/admin/login?next=/lender/admin/onboarding');
  }

  const queue = isSupabaseAdminConfigured() ? await listPendingLenderOnboarding() : [];

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-2xl font-bold text-[#0A2540] mb-2">Lender Onboarding Queue</h1>
      <p className="text-sm text-zinc-600 mb-8">
        Approve submissions to publish profiles under <code>/lender/lenders/[slug]</code>. Confirmation
        emails are sent via Resend on approval.
      </p>
      <LenderModerationQueue initialQueue={queue} />
    </div>
  );
}