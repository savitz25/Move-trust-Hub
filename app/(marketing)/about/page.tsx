import Link from 'next/link';
import { Shield, Award, Users, BarChart3, Clock, AlertTriangle, ArrowRight, CheckCircle, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'About Move Trust Hub & Trust Center',
  description: 'Our mission, how we calculate reputation scores, data sources, tools we offer, and important disclaimers.',
};

const reputationFactors = [
  {
    icon: BarChart3,
    title: 'Customer Rating',
    weight: '40%',
    desc: 'Weighted average across Google, BBB, Trustpilot and other platforms. We prioritize recent reviews.',
  },
  {
    icon: Users,
    title: 'Review Volume & Recency',
    weight: '20%',
    desc: 'More reviews = more confidence. We give extra weight to reviews from the last 24 months.',
  },
  {
    icon: Shield,
    title: 'FMCSA Compliance',
    weight: '20%',
    desc: 'Complaint ratio (complaints per 1,000 shipments) and safety rating. Lower is better.',
  },
  {
    icon: Award,
    title: 'BBB & Accreditation',
    weight: '10%',
    desc: 'BBB letter grade + accreditation status. A+ accredited companies score higher.',
  },
  {
    icon: Clock,
    title: 'Years in Business + Verification',
    weight: '10%',
    desc: 'Longevity bonus + our manual verification for accuracy and legitimacy.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
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
                The long-distance moving and auto transport industries are full of hidden fees, unreliable carriers, and hard-to-compare options. We aggregate FMCSA, BBB, and real customer reviews into clean, filterable directories so you can make confident decisions without the guesswork.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                We also built free tools like the Smart Move Estimator (volume + weight) and instant quote matching to remove friction from the process.
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
                    <p className="text-sm text-muted-foreground">FMCSA safety ratings, complaint ratios, BBB, and verified reviews.</p>
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
              A transparent, weighted formula that rewards real performance over marketing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reputationFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <Card key={index} className="group hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="font-mono text-xs">{factor.weight}</Badge>
                    </div>
                    <CardTitle className="text-xl mt-4">{factor.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{factor.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6 max-w-md mx-auto">
            Scores are recalculated regularly. Higher reputation score = stronger overall track record.
          </p>
        </section>

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
                  <li>• Google, Trustpilot, Yelp reviews</li>
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
                <div className="font-medium mb-2">What We Don't Do</div>
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
          <p className="text-xs text-muted-foreground mt-6">Questions? We’re happy to help clarify how the directories or estimator work.</p>
        </section>
      </div>
    </div>
  );
}
