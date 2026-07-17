import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { getPortalMfaStatus } from '@/lib/portal/mfa';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { PortalMfaChallenge } from '@/components/portal/portal-mfa-challenge';
import { PORTAL_NAME } from '@/lib/portal/messaging';

export const dynamic = 'force-dynamic';

export default async function PortalMfaPage({
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

  const status = await getPortalMfaStatus();
  if (!status?.needsChallenge) {
    // Already AAL2 or MFA not enrolled
    redirect(safeNext.startsWith('/portal/mfa') ? '/portal' : safeNext);
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg flex flex-col items-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary self-start">
        {PORTAL_NAME}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight self-start">Verify it&apos;s you</h1>
      <p className="mt-2 text-sm text-muted-foreground self-start mb-8">
        Signed in as <strong className="text-foreground">{user.email}</strong>. Complete 2FA to open
        the Verified Mover Portal.
      </p>
      <PortalMfaChallenge nextPath={safeNext} factorId={status.factorId} />
      <p className="mt-6 text-sm text-muted-foreground">
        <Link href="/portal/login" className="text-primary hover:underline">
          Use a different account
        </Link>
      </p>
    </div>
  );
}
