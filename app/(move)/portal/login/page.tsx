import Link from 'next/link';
import { PortalLoginForm } from '@/components/portal/portal-login-form';
import { PORTAL_NAME, PORTAL_TAGLINE } from '@/lib/portal/messaging';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';

function portalLoginErrorMessage(params: {
  auth?: string;
  reason?: string;
}): string | null {
  if (params.auth !== 'error') return null;
  const reason = params.reason?.toLowerCase() ?? '';
  if (reason.includes('not_configured') || reason.includes('provider')) {
    return 'Google sign-in is not available right now. Use a magic link or password, or try again later.';
  }
  if (reason.includes('google') || reason.includes('oauth')) {
    return 'Google sign-in did not complete. Try again, or use a magic link or password instead.';
  }
  return 'That sign-in attempt failed or expired. Try Google again, or request a new magic link below.';
}

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; auth?: string; reason?: string }>;
}) {
  const params = await searchParams;
  const next = sanitizePostLoginPath(params.next ?? '/portal');
  const initialError = portalLoginErrorMessage(params);

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{PORTAL_NAME}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-2 text-sm text-muted-foreground">{PORTAL_TAGLINE}</p>
      <div className="mt-8">
        <PortalLoginForm next={next.startsWith('/portal') ? next : '/portal'} initialError={initialError} />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        New here?{' '}
        <Link href="/for-movers" className="text-primary underline-offset-2 hover:underline">
          Learn about the portal
        </Link>{' '}
        or{' '}
        <Link href="/companies" className="text-primary underline-offset-2 hover:underline">
          find your listing
        </Link>{' '}
        to claim it.
      </p>
    </div>
  );
}
