import type { Metadata } from 'next';
import Link from 'next/link';
import { BadgeCheck, Shield, MessageSquare, MapPin, RefreshCw, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  PORTAL_NAME,
  PORTAL_TAGLINE,
  PORTAL_PROMISES,
  PORTAL_CANNOT,
} from '@/lib/portal/messaging';
import { SITE_URL } from '@/lib/seo/site-metadata';

export const metadata: Metadata = {
  title: 'For Moving Companies — Verified Mover Portal',
  description:
    'Claim your free Move Trust Hub profile. No lead fees. No paid placements. Verified owners respond to reviews and keep listings accurate.',
  alternates: { canonical: `${SITE_URL}/for-movers` },
};

const FEATURES = [
  {
    icon: BadgeCheck,
    title: 'Claim & verify',
    body: 'Match your USDOT, confirm a work contact, and sign in with a magic link. Ownership is reviewed before portal access.',
  },
  {
    icon: MessageSquare,
    title: 'Respond to reviews',
    body: 'Reply to moderated Move Trust Hub reviews with a Verified Owner badge. Legitimate reviews stay public.',
  },
  {
    icon: RefreshCw,
    title: 'Sync reputation data',
    body: 'Refresh Google, BBB, and FMCSA public data once every 30 days. Rankings are never for sale.',
  },
  {
    icon: MapPin,
    title: 'Manage service areas',
    body: 'National, regional, or local coverage plus primary interstate lanes — with verified coverage signals to deter spam.',
  },
];

export default function ForMoversPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          For Moving Companies
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{PORTAL_NAME}</h1>
        <p className="mt-3 text-xl text-muted-foreground">{PORTAL_TAGLINE}</p>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          Free forever. No lead fees. No paid placements. Verified owners can respond to reviews
          and keep their listing accurate — without ever buying a higher rank.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/portal">Open portal</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/companies">Find your listing</Link>
          </Button>
        </div>
      </div>

      <div className="mt-14 grid sm:grid-cols-2 gap-4">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid sm:grid-cols-2 gap-4">
        <Card className="p-5 bg-emerald-50/50 border-emerald-100">
          <div className="flex items-center gap-2 font-semibold">
            <Shield className="h-4 w-4 text-emerald-700" aria-hidden />
            What you get
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {PORTAL_PROMISES.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-5 bg-muted/30">
          <div className="flex items-center gap-2 font-semibold">
            <Ban className="h-4 w-4" aria-hidden />
            What you cannot do
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {PORTAL_CANNOT.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-12 p-6 text-center">
        <h2 className="text-xl font-semibold">How claiming works</h2>
        <ol className="mt-4 text-sm text-muted-foreground space-y-2 text-left max-w-lg mx-auto">
          <li>
            <strong className="text-foreground">1.</strong> Open your company profile in the
            directory and click “Is this your company? Claim this profile.”
          </li>
          <li>
            <strong className="text-foreground">2.</strong> Confirm USDOT, work email/phone, and
            role. We email a magic link.
          </li>
          <li>
            <strong className="text-foreground">3.</strong> Sign in and wait for ownership
            verification (domain match speeds this up).
          </li>
          <li>
            <strong className="text-foreground">4.</strong> Manage responses, service areas, and
            monthly data sync in the Carrier Command Center.
          </li>
        </ol>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/portal/login">Sign in to portal</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/verify-dot">Verify a DOT number</Link>
          </Button>
        </div>
      </Card>

      <p className="mt-10 text-center text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
        Move Trust Hub is an independent directory. Claiming a profile does not affiliate your
        company with us, and does not affect consumer rankings. Always verify licensing on FMCSA.gov.
      </p>
    </div>
  );
}
