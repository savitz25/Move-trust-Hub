import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { companyIsClaimed } from '@/lib/portal/ownership';
import { ClaimForm } from '@/components/portal/claim-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PORTAL_NAME, PORTAL_TAGLINE } from '@/lib/portal/messaging';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ companySlug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { companySlug } = await params;
  const company = await getCompanyBySlugAsync(companySlug);
  return {
    title: company ? `Claim ${company.name}` : 'Claim company',
    robots: { index: false, follow: false },
  };
}

export default async function ClaimCompanyPage({ params }: Props) {
  const { companySlug } = await params;
  const company = await getCompanyBySlugAsync(companySlug);
  if (!company) notFound();

  const user = await getAuthenticatedUser();
  const claimed = await companyIsClaimed(company.id);

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{PORTAL_NAME}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Claim this profile</h1>
      <p className="mt-1 text-muted-foreground">{PORTAL_TAGLINE}</p>
      <p className="mt-2 text-sm">
        <Link href={`/companies/${company.slug}`} className="text-primary hover:underline">
          ← Back to {company.name}
        </Link>
      </p>

      {claimed ? (
        <Card className="mt-8 p-6 space-y-3">
          <h2 className="font-semibold">Already claimed</h2>
          <p className="text-sm text-muted-foreground">
            This listing already has a verified owner. If you need access transferred, contact
            support with your USDOT and role.
          </p>
          <Button asChild variant="outline">
            <Link href="/portal">Go to portal</Link>
          </Button>
        </Card>
      ) : (
        <div className="mt-8">
          <ClaimForm
            companySlug={company.slug}
            companyName={company.name}
            usdotNumber={company.usdotNumber}
            defaultEmail={user?.email ?? undefined}
          />
        </div>
      )}
    </div>
  );
}
