import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import {
  getActiveOwnersForUser,
  ensurePortalProfile,
} from '@/lib/portal/ownership';
import { getClaimsForUser, linkClaimToUser } from '@/lib/portal/claims';
import { getSyncCooldownState } from '@/lib/portal/reputation-sync';
import { getPortalMfaStatus } from '@/lib/portal/mfa';
import { PortalShell } from '@/components/portal/portal-shell';
import { PortalLoginForm } from '@/components/portal/portal-login-form';
import { ReputationSyncPanel } from '@/components/portal/reputation-sync-panel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PORTAL_CANNOT } from '@/lib/portal/messaging';

export const dynamic = 'force-dynamic';

export default async function PortalDashboardPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-lg">
        <h1 className="text-2xl font-semibold">Verified Mover Portal</h1>
        <p className="mt-2 text-sm text-muted-foreground mb-6">
          Sign in to manage claimed profiles. You cannot buy rankings or remove legitimate reviews.
        </p>
        <PortalLoginForm next="/portal" />
        <p className="mt-4 text-sm">
          <Link href="/for-movers" className="text-primary hover:underline">
            For moving companies →
          </Link>
        </p>
      </div>
    );
  }

  const mfa = await getPortalMfaStatus();
  if (mfa?.needsChallenge) {
    redirect('/portal/mfa?next=%2Fportal');
  }

  const owners = await getActiveOwnersForUser(user.id);
  const claims = user.email
    ? await getClaimsForUser(user.id, user.email)
    : [];

  // Link pending claims that match this email so admin can approve
  if (user.email) {
    for (const claim of claims) {
      if (claim.status === 'pending' && !claim.claimant_user_id) {
        await linkClaimToUser(claim.id, user.id, user.email);
      }
    }
  }

  const claimsAfterLink = user.email
    ? await getClaimsForUser(user.id, user.email)
    : claims;

  if (owners.length === 0) {
    return (
      <PortalShell pathname="/portal">
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">No verified companies yet</h2>
          <p className="text-sm text-muted-foreground">
            Signed in as <strong>{user.email}</strong>. Claim a directory profile, complete the
            magic-link step, and wait for ownership approval.
          </p>
          {claimsAfterLink.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Your claims</p>
              {claimsAfterLink.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3 text-sm"
                >
                  <span>
                    {c.company_name}{' '}
                    <span className="text-muted-foreground">({c.company_slug})</span>
                  </span>
                  <Badge variant={c.status === 'pending' ? 'warning' : c.status === 'approved' ? 'success' : 'secondary'}>
                    {c.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/companies">Find your listing</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/for-movers">How claiming works</Link>
            </Button>
          </div>
        </Card>
      </PortalShell>
    );
  }

  // Primary company for v1 dashboard (first ownership)
  const primary = owners[0];
  const profile = await ensurePortalProfile(primary.company_id, primary.company_slug);
  const cooldown = getSyncCooldownState(profile.last_reputation_sync_at);

  return (
    <PortalShell
      pathname="/portal"
      companyName={primary.company_name ?? primary.company_slug}
    >
      <div className="space-y-6">
        {owners.length > 1 ? (
          <Card className="p-4 text-sm">
            <p className="font-medium mb-2">Your companies</p>
            <ul className="space-y-1 text-muted-foreground">
              {owners.map((o) => (
                <li key={o.id}>
                  {o.company_name ?? o.company_slug}{' '}
                  <Link
                    href={`/companies/${o.company_slug}`}
                    className="text-primary hover:underline"
                  >
                    View public profile
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/companies/${primary.company_slug}`}>View public profile</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/portal/reviews">Manage reviews</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/portal/service-area">Service area</Link>
            </Button>
          </div>
        )}

        <ReputationSyncPanel
          companySlug={primary.company_slug}
          canSync={cooldown.canSync}
          daysRemaining={cooldown.daysRemaining}
          lastSyncAt={cooldown.lastSyncAt}
          lastSummary={profile.last_reputation_sync_summary}
        />

        <Card className="p-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">Account security</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mfa?.enabled
                ? 'Two-factor authentication is on. Manage authenticator and backup codes.'
                : 'Protect your portal with Google Authenticator (optional, strongly recommended).'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={mfa?.enabled ? 'success' : 'secondary'}>
              {mfa?.enabled ? '2FA on' : '2FA off'}
            </Badge>
            <Button asChild size="sm" variant={mfa?.enabled ? 'outline' : 'default'}>
              <Link href="/portal/security">
                {mfa?.enabled ? 'Manage 2FA' : 'Enable 2FA'}
              </Link>
            </Button>
          </div>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="p-5">
            <h2 className="font-semibold">Reviews</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Respond with a Verified Owner badge. Dispute only clear policy violations — reviews
              stay visible with an Under Review tag.
            </p>
            <Button asChild className="mt-3" size="sm">
              <Link href="/portal/reviews">Open reviews</Link>
            </Button>
          </Card>
          <Card className="p-5">
            <h2 className="font-semibold">Service area</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              National / regional / local editor plus primary interstate lanes. Verified coverage
              signals help prevent spam.
            </p>
            <Button asChild className="mt-3" size="sm">
              <Link href="/portal/service-area">Edit coverage</Link>
            </Button>
          </Card>
        </div>

        <Card className="p-4 bg-muted/30 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Trust rules</p>
          <ul className="space-y-1">
            {PORTAL_CANNOT.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </Card>
      </div>
    </PortalShell>
  );
}
