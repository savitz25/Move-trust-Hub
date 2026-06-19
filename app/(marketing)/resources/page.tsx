import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Moving Resources & Guides | How to Choose an Interstate Mover',
  description: 'Free educational resources: FMCSA explained, how to avoid moving scams, interstate moving checklist, pricing guides, and more.',
};

const guides = [
  {
    slug: 'move-size-weight',
    title: 'Why Knowing the Size and Weight of Your Move Is the Most Important First Step',
    excerpt: 'Stop guessing your move size. Learn why accurate cubic footage protects you from lowball quotes and inflated prices.',
    category: 'Planning',
  },
  {
    slug: 'how-to-choose',
    title: 'How to Choose an Interstate Mover in 2026',
    excerpt: 'A step-by-step framework using reputation scores, licensing verification, and quote evaluation.',
    category: 'Buying Guide',
  },
  {
    slug: 'fmcsa',
    title: 'Understanding FMCSA Safety Ratings & Complaint Data',
    excerpt: 'What the USDOT numbers, safety ratings, and complaint ratios actually mean for your move.',
    category: 'Regulation',
  },
  {
    slug: 'scams',
    title: '8 Red Flags of Interstate Moving Scams',
    excerpt: 'Protect yourself from rogue brokers and bait-and-switch operators.',
    category: 'Safety',
  },
  {
    slug: 'checklist',
    title: 'Complete Interstate Moving Checklist',
    excerpt: 'Timeline from 8 weeks out through delivery day + post-move tasks.',
    category: 'Checklist',
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-4xl font-semibold tracking-tight mb-2">Moving Resources</h1>
      <p className="text-lg text-muted-foreground mb-8">Free, unbiased guides to help you make a confident interstate move.</p>

      <div className="grid gap-4">
        {guides.map((guide, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl"><Link href={`/resources/${guide.slug}`}>{guide.title}</Link></CardTitle>
                <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{guide.category}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{guide.excerpt}</p>
              <Link href={`/resources/${guide.slug}`} className="text-primary text-sm font-medium mt-3 inline-block">Read full guide →</Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div id="fmcsa" className="mt-12 border-t pt-8">
        <h2 className="font-semibold mb-3">Quick FMCSA Tips</h2>
        <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
          <li>Always ask for the mover&apos;s USDOT and MC numbers and look them up yourself on fmcsa.dot.gov.</li>
          <li>Prefer companies with “Satisfactory” safety rating and low complaint-to-shipment ratios.</li>
          <li>Brokers must be registered. If a company only brokers your move, they still need proper authority.</li>
          <li>Get everything in writing — especially pickup/delivery windows and valuation options.</li>
        </ul>
      </div>

      <div id="scams" className="mt-8">
        <h2 className="font-semibold mb-3">Common Scam Warnings</h2>
        <div className="text-sm text-muted-foreground space-y-1.5">
          <p>• Extremely lowball quotes (30-50% under everyone else)</p>
          <p>• No physical address or only a P.O. Box</p>
          <p>• Demands large deposit via wire, Venmo, or gift cards</p>
          <p>• Refuses to do in-home estimate or video survey</p>
          <p>• Changes price dramatically on delivery day</p>
        </div>
      </div>

      <div id="checklist" className="mt-8">
        <h2 className="font-semibold mb-3">Interstate Moving Timeline (High Level)</h2>
        <div className="text-sm grid sm:grid-cols-2 gap-x-8 text-muted-foreground">
          <ul className="list-disc pl-5 space-y-0.5">
            <li>8 weeks: Research &amp; get 3+ written estimates</li>
            <li>6 weeks: Book your mover + confirm dates</li>
            <li>4 weeks: Notify utilities, schools, change address</li>
          </ul>
          <ul className="list-disc pl-5 space-y-0.5 mt-4 sm:mt-0">
            <li>2 weeks: Pack non-essentials, confirm inventory</li>
            <li>Move week: Confirm arrival window daily</li>
            <li>Delivery: Inspect, note damage, file claims within 9 months</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
