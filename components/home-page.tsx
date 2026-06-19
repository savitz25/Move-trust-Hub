'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, ArrowRight, Clock, DollarSign, Star, Truck, Headphones } from 'lucide-react';
import { QuoteModal } from '@/components/quote-modal';
import { FaqSection } from '@/components/seo/faq-section';
import { homepageFaqItems } from '@/lib/seo/schemas';
import { TrustBadges } from '@/components/trust/trust-badges';
import { ReviewHighlights } from '@/components/trust/review-highlights';
import { TestimonialsSection } from '@/components/trust/testimonials-section';

export function HomePage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  return (
    <div className="flex flex-col">
      {/* MARKETING HERO - Strong CTA focused */}
      <section className="relative bg-gradient-to-br from-primary/8 via-background to-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-4 py-1 text-sm font-medium mb-6">
              <Truck className="h-4 w-4" /> FREE QUOTES • LICENSED MOVERS • 24HR RESPONSE
            </div>

            <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6 leading-tight">
              Compare Trusted Interstate Movers<br />&amp; Get Free Long-Distance Quotes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Compare real reviews,{' '}
              <Link href="/resources/fmcsa" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                FMCSA licensing data
              </Link>
              , and pricing from America&apos;s top{' '}
              <Link href="/companies" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                long-distance moving companies
              </Link>
              . Use our{' '}
              <Link href="/moving-calculator" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                free moving calculator
              </Link>{' '}
              first, then get matched with the best options — completely free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button 
                size="lg" 
                className="gap-2 text-base px-10 h-14 text-lg" 
                onClick={() => setShowQuoteModal(true)}
              >
                Get My Free Quotes <ArrowRight className="h-5 w-5" />
              </Button>
              <Link href="/moving-calculator">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8 h-14">
                  Estimate My Move First
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">Takes less than 60 seconds. No obligation.</p>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* HOW IT WORKS - Classic marketing section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-primary font-semibold tracking-widest text-sm mb-2">3 SIMPLE STEPS</div>
          <h2 className="text-4xl font-semibold tracking-tight">How Move Trust Hub Works</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">We make finding and booking the right interstate mover easy and transparent.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: "01",
              title: "Tell Us About Your Move",
              desc: (
                <>
                  Use our <Link href="/moving-calculator" className="text-primary underline underline-offset-2">free moving calculator</Link> or quick form to share your from/to locations, date, and home size.
                </>
              ),
              icon: Truck,
            },
            {
              step: "02",
              title: "Compare Personalized Quotes",
              desc: "Receive 2-3 competitive quotes from top-rated, licensed interstate movers within 24 hours.",
              icon: Star,
            },
            {
              step: "03",
              title: "Book with Confidence",
              desc: (
                <>
                  Review real feedback in our <Link href="/companies" className="text-primary underline underline-offset-2">mover directory</Link>, <Link href="/compare" className="text-primary underline underline-offset-2">compare companies side-by-side</Link>, and book with confidence.
                </>
              ),
              icon: Shield,
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center mb-5">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-sm font-mono text-primary mb-1">STEP {item.step}</div>
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PROPS / BENEFITS */}
      <section className="bg-muted/30 border-y py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold tracking-tight">Why Families Choose Us for Long-Distance Moves</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: DollarSign, title: "Save Money", desc: "Compare multiple quotes side-by-side so you never overpay." },
              { icon: Shield, title: "Move with Confidence", desc: "Every mover is FMCSA licensed with verified reviews and low complaint ratios." },
              { icon: Clock, title: "Save Time", desc: "Skip the phone calls. Get matched with the right movers instantly." },
              { icon: Headphones, title: "Dedicated Support", desc: "Our team is here to answer questions before, during, and after your move." },
            ].map((benefit, i) => (
              <Card key={i} className="p-6 border border-border/50 shadow-trust">
                <benefit.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FREE TOOLS - Highlight our existing features as value */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">FREE TOOLS</Badge>
          <h2 className="text-4xl font-semibold tracking-tight">Research &amp; Plan Your Move</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Powerful free tools to help you make the smartest decision for your interstate move.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link href="/moving-calculator" className="group">
            <Card className="h-full p-6 hover:border-primary/50 transition-all">
              <div className="text-3xl mb-4">📦</div>
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary">Smart Move Estimator</h3>
              <p className="text-muted-foreground">Build your inventory by room or quick add. Get instant cubic feet estimates and recommended truck sizes.</p>
              <div className="mt-4 text-primary font-medium flex items-center gap-1">Estimate your move →</div>
            </Card>
          </Link>

          <Link href="/companies" className="group">
            <Card className="h-full p-6 hover:border-primary/50 transition-all">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary">Mover Directory</h3>
              <p className="text-muted-foreground">Browse 25+ major interstate movers. Filter by reputation, price, services, and FMCSA compliance data.</p>
              <div className="mt-4 text-primary font-medium flex items-center gap-1">Explore movers →</div>
            </Card>
          </Link>

          <Link href="/compare" className="group">
            <Card className="h-full p-6 hover:border-primary/50 transition-all">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary">Side-by-Side Comparison</h3>
              <p className="text-muted-foreground">Select up to 4 movers and compare reputation, pricing, licensing, services, and real customer reviews.</p>
              <div className="mt-4 text-primary font-medium flex items-center gap-1">Start comparing →</div>
            </Card>
          </Link>

          <Link href="/auto-transport" className="group">
            <Card className="h-full p-6 hover:border-primary/50 transition-all">
              <div className="text-3xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary">Auto Transport Directory</h3>
              <p className="text-muted-foreground">Research top car shipping companies. Compare ratings, pricing for open/enclosed transport, FMCSA data, and customer reviews.</p>
              <div className="mt-4 text-primary font-medium flex items-center gap-1">Explore auto transport →</div>
            </Card>
          </Link>

          <Link href="/resources" className="group md:col-span-3">
            <Card className="h-full p-6 hover:border-primary/50 transition-all">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary">Moving Guides &amp; Resources</h3>
              <p className="text-muted-foreground">
                Learn <Link href="/resources/move-size-weight" className="text-primary underline underline-offset-2" onClick={(e) => e.stopPropagation()}>why move size matters</Link>, <Link href="/resources/how-to-choose" className="text-primary underline underline-offset-2" onClick={(e) => e.stopPropagation()}>how to choose a mover</Link>, <Link href="/resources/routes" className="text-primary underline underline-offset-2" onClick={(e) => e.stopPropagation()}>route guides</Link>, and <Link href="/resources/packing-checklist" className="text-primary underline underline-offset-2" onClick={(e) => e.stopPropagation()}>packing checklists</Link>.
              </p>
              <div className="mt-4 text-primary font-medium flex items-center gap-1">Read free guides →</div>
            </Card>
          </Link>
        </div>
      </section>

      <ReviewHighlights className="py-16" />

      <TestimonialsSection columns={4} />

      {/* SEO / INTERNAL LINKS */}
      <section className="container mx-auto px-4 py-14 max-w-3xl text-center border-t">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          Plan a Smarter Interstate Move
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Start with our{' '}
          <Link href="/moving-calculator" className="text-foreground underline underline-offset-2 hover:text-primary">
            moving inventory calculator
          </Link>{' '}
          to know your cubic footage and weight. Read{' '}
          <Link href="/resources/move-size-weight" className="text-foreground underline underline-offset-2 hover:text-primary">
            why accurate move size matters
          </Link>
          , browse our{' '}
          <Link href="/companies" className="text-foreground underline underline-offset-2 hover:text-primary">
            licensed mover directory
          </Link>
          , use the{' '}
          <Link href="/compare" className="text-foreground underline underline-offset-2 hover:text-primary">
            comparison tool
          </Link>
          , or explore{' '}
          <Link href="/resources" className="text-foreground underline underline-offset-2 hover:text-primary">
            free moving guides
          </Link>{' '}
          on scams, FMCSA checks, and checklists.
        </p>
      </section>

      <FaqSection title="Frequently Asked Questions" items={homepageFaqItems} />

      {/* FINAL CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Ready to start your move?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">Join thousands of families who found their perfect interstate mover through us.</p>
        
        <Button 
          size="lg" 
          className="text-lg px-12 h-14"
          onClick={() => setShowQuoteModal(true)}
        >
          Get Your Free Quotes Now
        </Button>
        <p className="text-xs text-muted-foreground mt-4">Takes 60 seconds • Completely free • No spam</p>
      </section>

      <QuoteModal open={showQuoteModal} onOpenChange={setShowQuoteModal} />
    </div>
  );
}
