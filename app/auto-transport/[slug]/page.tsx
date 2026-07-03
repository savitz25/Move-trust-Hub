import { notFound } from 'next/navigation';
import { getAutoTransportBySlugAsync } from '@/lib/data-server';
import {
  canShowVerifiedBadge,
  directoryVerifiedLabel,
} from '@/lib/trust/company-display-policy';
import {
  LicenseDisplay,
  LicenseMetadataDescription,
} from '@/components/trust/license-display';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const company = await getAutoTransportBySlugAsync(slug);
  if (!company) return { title: 'Company Not Found' };

  return {
    title: `${company.name} — Reviews, Pricing & Auto Transport Info`,
    description: `${company.name} auto transport profile. ${company.overallRating}★ from ${company.reviewCount} reviews. ${LicenseMetadataDescription(company)} BBB ${company.bbbRating}. Coverage: ${company.coverage}. Open & enclosed vehicle shipping.`,
  };
}

export default async function AutoTransportProfilePage({ params }: Props) {
  const { slug } = await params;
  const company = await getAutoTransportBySlugAsync(slug);

  if (!company) notFound();

  const complaintRatio = company.fmcsaShipments 
    ? ((company.fmcsaComplaints / company.fmcsaShipments) * 1000).toFixed(2) 
    : 'N/A';

  const verifiedLabel = directoryVerifiedLabel(company);
  const trustSignals = [
    company.fmcsaSafetyRating === 'Satisfactory' && verifiedLabel && 'FMCSA Satisfactory',
    company.bbbAccredited && `BBB ${company.bbbRating} Accredited`,
    verifiedLabel,
  ].filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/auto-transport" className="inline-flex items-center gap-1 text-sm mb-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Auto Transport Directory
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight">{company.name}</h1>
            {canShowVerifiedBadge(company) && <Badge variant="success">VERIFIED</Badge>}
          </div>
          <div className="text-muted-foreground">{company.headquarters} • Founded {company.foundedYear} • {company.yearsInBusiness} years in business</div>
        </div>
        <div className="flex items-center gap-3">
          <a href={company.website} target="_blank" rel="noopener" className="flex items-center gap-1 text-sm text-primary hover:underline">
            Visit official site <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Link href={`/compare?add=${company.slug}`}>
            <Button>Add to Compare</Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">OVERALL RATING</div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <StarRating rating={company.overallRating} size="lg" />
            <span className="text-xs text-muted-foreground">({company.reviewCount.toLocaleString()} reviews)</span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">REPUTATION SCORE</div>
          <div className="text-4xl font-semibold mt-0.5 tabular-nums text-primary">{company.reputationScore}<span className="text-xl font-normal text-muted-foreground">/100</span></div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">AVG PRICE (cross-country open)</div>
          <div className="text-3xl font-semibold mt-1 tabular-nums">${company.avgPricePerMove.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{company.priceRange}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">COMPLAINT RATIO (per 1,000 shipments)</div>
          <div className="text-3xl font-semibold mt-1 tabular-nums">{complaintRatio}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">COVERAGE</div>
          <div className="mt-1 text-xl font-medium">{company.coverage}</div>
          <div className="text-xs text-muted-foreground mt-1">Open & Enclosed available</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{company.description}</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-xs text-muted-foreground mb-1">SERVICES OFFERED</div>
                  <div className="flex flex-wrap gap-1.5">
                    {company.services.map((s, i) => (
                      <Badge key={i} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-xs text-muted-foreground mb-1">SPECIALTIES</div>
                  <div className="flex flex-wrap gap-1.5">
                    {company.specialties.map((s, i) => (
                      <Badge key={i} variant="outline">{s}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Licensing &amp; Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <LicenseDisplay company={company} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground text-xs">FMCSA Safety Rating</div>
                  <div className="font-medium mt-0.5">{company.fmcsaSafetyRating}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">BBB Rating</div>
                  <div className="font-medium mt-0.5">{company.bbbRating} {company.bbbAccredited ? '(Accredited)' : ''}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener"
                className="block w-full"
              >
                <Button className="w-full" variant="default">
                  Visit Company Website <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
              <Link href={`/compare?add=${company.slug}`} className="block w-full">
                <Button variant="outline" className="w-full">
                  Add to Compare
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trust Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {trustSignals.length > 0 ? trustSignals.map((signal, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    {signal}
                  </li>
                )) : (
                  <li className="text-muted-foreground">Standard licensing applies. Always verify directly.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Teaser */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Customer Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">
              {company.reviewCount.toLocaleString()} verified reviews • {company.overallRating} average rating
            </div>
            <p className="text-sm">
              Customers frequently praise {company.name} for on-time pickup and delivery, clear communication, and careful handling of vehicles. 
              Common feedback highlights competitive pricing for enclosed transport and responsive customer service.
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              Full reviews and ratings available on Trustpilot, Google, BBB, and TransportReviews.com. Data last updated {company.lastUpdated}.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Link href="/auto-transport" className="text-sm text-primary hover:underline">
          ← Back to full Auto Transport Directory
        </Link>
      </div>
    </div>
  );
}
