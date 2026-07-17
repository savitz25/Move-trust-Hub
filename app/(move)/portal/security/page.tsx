import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requirePortalSession, getPortalMfaStatus } from '@/lib/portal/mfa';
import { getPortalPasswordStatus } from '@/lib/portal/password';
import { getActiveOwnersForUser } from '@/lib/portal/ownership';
import { PortalShell } from '@/components/portal/portal-shell';
import { PortalMfaManager } from '@/components/portal/portal-mfa-manager';
import { PortalPasswordManager } from '@/components/portal/portal-password-manager';

export const dynamic = 'force-dynamic';

export default async function PortalSecurityPage({
  searchParams,
}: {
  searchParams: Promise<{ recovered?: string }>;
}) {
  const params = await searchParams;
  // Allow AAL1 so owners can enable 2FA right after magic-link (when MFA is still off)
  const session = await requirePortalSession({
    nextPath: '/portal/security',
    allowAal1: true,
  });

  const status = await getPortalMfaStatus();
  // If 2FA is already on, require the authenticator challenge before managing it
  if (status?.needsChallenge) {
    redirect('/portal/mfa?next=%2Fportal%2Fsecurity');
  }

  const passwordStatus = await getPortalPasswordStatus();
  const owners = await getActiveOwnersForUser(session.userId);

  return (
    <PortalShell
      pathname="/portal/security"
      companyName={owners[0]?.company_name ?? owners[0]?.company_slug}
    >
      <div className="mb-6">
        <Link href="/portal" className="text-sm text-primary hover:underline">
          ← Dashboard
        </Link>
        <h2 className="mt-3 text-xl font-semibold">Security</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Password and two-factor authentication for your Verified Mover Portal account (
          {session.email ?? 'signed in'}).
        </p>
      </div>

      <div className="space-y-6">
        <PortalPasswordManager passwordEnabled={passwordStatus?.passwordEnabled ?? false} />

        <PortalMfaManager
          initiallyEnabled={status?.enabled ?? false}
          factorFriendlyName={status?.factorFriendlyName ?? null}
          backupCodesRemaining={status?.backupCodesRemaining ?? 0}
          showRecoveredBanner={params.recovered === '1'}
        />
      </div>
    </PortalShell>
  );
}
