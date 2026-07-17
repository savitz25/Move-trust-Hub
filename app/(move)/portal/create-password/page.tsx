import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { getPortalMfaStatus } from '@/lib/portal/mfa';
import { getPortalPasswordStatus } from '@/lib/portal/password';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { PortalCreatePasswordForm } from '@/components/portal/portal-create-password-form';
import { PORTAL_NAME, PORTAL_TAGLINE } from '@/lib/portal/messaging';

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
    redirect(
      `/portal/mfa?next=${encodeURIComponent(`/portal/create-password?next=${encodeURIComponent(safeNext)}`)}`
    );
  }

  const pw = await getPortalPasswordStatus();
  if (!pw?.shouldOfferCreatePassword) {
    redirect(safeNext.startsWith('/portal/create-password') ? '/portal' : safeNext);
  }

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      {/* Soft page backdrop — matches portal trust aesthetic */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 via-background to-background"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.07] via-transparent to-transparent"
        aria-hidden
      />

      <div className="container mx-auto flex max-w-lg flex-col items-center px-4 py-10 sm:py-14">
        <header className="mb-8 w-full text-center sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {PORTAL_NAME}
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">{PORTAL_TAGLINE}</p>
        </header>

        <PortalCreatePasswordForm nextPath={safeNext} email={user.email ?? null} />
      </div>
    </div>
  );
}
