import Link from 'next/link';
import { PortalLoginForm } from '@/components/portal/portal-login-form';
import { PORTAL_NAME, PORTAL_TAGLINE } from '@/lib/portal/messaging';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; auth?: string }>;
}) {
  const params = await searchParams;
  const next = sanitizePostLoginPath(params.next ?? '/portal');
  const initialError =
    params.auth === 'error'
      ? 'That sign-in link is invalid or expired. Request a new magic link below.'
      : null;

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
