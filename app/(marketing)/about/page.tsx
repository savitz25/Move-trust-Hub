import Link from 'next/link';
import {
  Shield,
  Award,
  Users,
  BarChart3,
  Clock,
  AlertTriangle,
  ArrowRight,
  Target,
  Zap,
  TrendingUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EditorialTeamPanel } from '@/components/trust/editorial-team-panel';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import { buildAboutPageSchemaGraph } from '@/lib/seo/schemas';
import {
  REPUTATION_SCORE_FACTORS,
  REPUTATION_SCORE_THRESHOLD,
} from '@/lib/trust/reputation-score-factors';

export const metadata = buildResourceMetadata(
  '/about',
  'About Move Trust Hub & Trust Center (2026)',
  'Our mission, how we calculate reputation scores, FMCSA data sources, free moving tools, and important disclaimers. Independent directory — no paid placements or commissions.'
);

const FACTOR_ICONS: Record<(typeof REPUTATION_SCORE_FACTORS)[number]['id'], LucideIcon> = {
  reviews: BarChart3,
  fmcsa: Shield,
  longevity: Clock,
  bbb: Award,
  trend: TrendingUp,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={buildAboutPageSchemaGraph()} />

      {/* Hero */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-4">Est. 2026 • Independent</Badge>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-4">
              About Move Trust Hub
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
              We make it easy to research and compare trusted interstate movers and auto transport companies using real data — no paid placements, no hidden agendas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/companies">
                <Button size="lg" className="gap-2">
                  Browse Mover Directory <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auto-transport">
                <Button size="lg" variant="outline" className="gap-2">
                  Explore Auto Transport <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-20">
        {/* Mission */}
        <section>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary mb-3">
                <Target className="h-5 w-5" />
                <span className="uppercase tracking-[2px] text-xs font-semibold">Our Purpose</span>
              </div>
              <h2 className="text-4xl font-semibold tracking-tight mb-6">Transparency in an opaque industry</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The long-distance moving and auto transport industries are full of hidden fees, unreliable carriers, and hard-to-compare options. We aggregate FMCSA, BBB, and attributable customer reviews into clean, filterable directories so you can make confident decisions without the guesswork.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                We also built free tools like the Smart Move Estimator (volume + weight) and our independent mover directory to remove friction from the research process.
              </p>
            </div>
            <Card className="p-8 bg-muted/50 border-0">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 text-primary"><Zap className="h-6 w-6" /></div>
                  <div>
                    <div className="font-semibold mb-1">No paid placements</div>
                    <p className="text-sm text-muted-foreground">Every company is listed on merit only.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 text-primary"><Shield className="h-6 w-6" /></div>
                  <div>
                    <div className="font-semibold mb-1">Real, aggregated data</div>
                    <p className="text-sm text-muted-foreground">FMCSA safety ratings, complaint ratios, BBB, and attributable reviews only.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 text-primary"><Users className="h-6 w-6" /></div>
                  <div>
                    <div className="font-semibold mb-1">Built for customers</div>
                    <p className="text-sm text-muted-foreground">No commissions. No broker fees. Just better information.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Reputation Score Breakdown */}
        <section>
          <div className="text-center mb-12">
            <div className="uppercase tracking-[2px] text-xs text-primary font-semibold mb-3">The Trust Engine</div>
            <h2 className="text-4xl font-semibold tracking-tight mb-3">How We Calculate Reputation Scores</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A transparent, weighted formula that rewards real performance over marketing. Scores above{' '}
              <strong className="text-foreground">{REPUTATION_SCORE_THRESHOLD}</strong> generally indicate safer interstate choices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REPUTATION_SCORE_FACTORS.map((factor) => {
              const Icon = FACTOR_ICONS[factor.id];
              return (
                <Card key={factor.id} className="group hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="font-mono text-xs">{factor.weight}</Badge>
                    </div>
                    <CardTitle className="text-xl mt-4">{factor.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{factor.detail}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6 max-w-md mx-auto">
            Scores are recalculated regularly. We never fabricate reviews or inflate ratings.{' '}
            <Link href="/resources/how-to-choose#reputation-score" className="text-primary hover:underline">
              Full methodology
            </Link>
          </p>
        </section>

        <EditorialTeamPanel contentType="directory" />

        {/* What We Offer */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-semibold tracking-tight mb-3">Tools Built for Real Decisions</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything we build is designed to give you clarity before you spend thousands on a move.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Users className="h-5 w-5" /></div>
                <div className="font-semibold text-xl">Mover &amp; Auto Transport Directories</div>
              </div>
              <p className="text-muted-foreground mb-4">
                Filter and compare dozens of companies by reputation, price, services, complaints, and more. Includes both household movers and specialized car shipping providers.
              </p>
              <div className="flex gap-3 text-sm">
                <Link href="/companies" className="text-primary hover:underline flex items-center gap-1">Movers Directory <ArrowRight className="h-3 w-3" /></Link>
                <Link href="/auto-transport" className="text-primary hover:underline flex items-center gap-1">Auto Transport <ArrowRight className="h-3 w-3" /></Link>
              </div>
            </Card>

            <Card className="p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><BarChart3 className="h-5 w-5" /></div>
                <div className="font-semibold text-xl">Smart Move Estimator</div>
              </div>
              <p className="text-muted-foreground mb-4">
                Enter your rooms or items and get an instant cubic feet + weight estimate (we use 7 lbs per cu ft). Includes truck size and mover recommendations.
              </p>
              <Link href="/moving-calculator" className="text-primary hover:underline flex items-center gap-1 text-sm">Try the Calculator <ArrowRight className="h-3 w-3" /></Link>
            </Card>
          </div>
        </section>

        {/* Data Sources & Transparency */}
        <section className="bg-muted/30 -mx-4 px-4 py-12 rounded-2xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight mb-6 text-center">Data Sources &amp; Transparency</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-medium mb-2">Primary Sources</div>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• FMCSA (USDOT &amp; MC numbers, safety ratings, complaints)</li>
                  <li>• BBB (ratings &amp; accreditation)</li>
                  <li>• Attributable Google reviews (named reviewers only)</li>
                </ul>
              </div>
              <div>
                <div className="font-medium mb-2">Our Principles</div>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• No paid placements or sponsored results</li>
                  <li>• No referral commissions</li>
                  <li>• Data is aggregated and presented neutrally</li>
                </ul>
              </div>
              <div>
                <div className="font-medium mb-2">What We Don&apos;t Do</div>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• We are not movers or brokers</li>
                  <li>• We do not take deposits or book moves</li>
                  <li>• We do not sell leads</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section id="disclaimer">
          <Card className="border-amber-500/30 bg-amber-50/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <CardTitle>Important Disclaimer</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                This website is an <strong>independent informational directory</strong> and is <strong>not affiliated with, endorsed by, or a partner of</strong> any of the companies listed. Company names, logos, and data are used for identification and informational purposes only.
              </p>
              <p>
                Licensing, safety ratings, and reviews can change. Always verify current information directly with the FMCSA, your state regulators, and the company before signing any contract or paying a deposit.
              </p>
              <p className="font-medium text-foreground">
                We do not arrange moves, take deposits, or act as a broker. We earn no commissions from any company.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center pt-8">
          <h3 className="text-2xl font-semibold mb-4">Ready to research your move?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/companies">
              <Button size="lg">Explore Mover Directory</Button>
            </Link>
            <Link href="/moving-calculator">
              <Button size="lg" variant="outline">Estimate Your Move</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="ghost">Contact Us</Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            Questions?{' '}
            <Link href="/contact" className="text-primary underline underline-offset-2">Contact us</Link>
            {' · '}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">Privacy</Link>
            {' · '}
            <Link href="/terms-of-service" className="text-primary underline underline-offset-2">Terms</Link>
          </p>
        </section>
      </div>
    </div>
  );
}