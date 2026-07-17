import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { getPortalMfaStatus } from '@/lib/portal/mfa';
import { getPortalPasswordStatus } from '@/lib/portal/password';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { PortalCreatePasswordForm } from '@/components/portal/portal-create-password-form';
import { PORTAL_NAME } from '@/lib/portal/messaging';

export const dynamic = 'force-dynamic';

export default async function PortalCreatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next = sanitizePostLoginPath(params.next ?? '/portal');
  const safeNext = next.startsWith('/portal') ? next : '/portal';

  const user = await getAuthenticatedUser();
  if (!user) {
    redirect(`/portal/login?next=${encodeURIComponent(safeNext)}`);
  }

  const mfa = await getPortalMfaStatus();
  if (mfa?.needsChallenge) {
    redirect(`/portal/mfa?next=${encodeURIComponent(`/portal/create-password?next=${encodeURIComponent(safeNext)}`)}`);
  }

  const pw = await getPortalPasswordStatus();
  if (!pw?.shouldOfferCreatePassword) {
    redirect(safeNext.startsWith('/portal/create-password') ? '/portal' : safeNext);
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg flex flex-col items-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary self-start mb-4">
        {PORTAL_NAME}
      </p>
      <PortalCreatePasswordForm nextPath={safeNext} email={user.email ?? null} />
    </div>
  );
}
