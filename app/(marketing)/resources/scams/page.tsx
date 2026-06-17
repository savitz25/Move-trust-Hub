import Link from 'next/link';

export const metadata = {
  title: '8 Red Flags of Interstate Moving Scams',
  description: 'Learn how to spot and avoid common interstate moving scams. Protect yourself from rogue brokers, lowball quotes, and bait-and-switch tactics with this detailed guide.',
};

export default function Scams() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl prose prose-neutral dark:prose-invert">
      <Link href="/resources" className="text-sm hover:underline">← Back to all resources</Link>

      <h1>8 Red Flags of Interstate Moving Scams</h1>
      
      <p className="text-lg text-muted-foreground">
        Every year, thousands of families lose money or have their belongings held hostage by dishonest moving companies. The good news? Most scams follow predictable patterns. Here are the eight biggest warning signs — and exactly what to do instead.
      </p>

      <h2>1. The Price Is Dramatically Lower Than Everyone Else</h2>
      <p>
        If one quote is 30–50% cheaper than the others, it is almost certainly a scam or bait-and-switch. Legitimate movers have similar operating costs.
      </p>
      <p><strong>What to do instead:</strong> Get three written estimates from companies with strong <Link href="/companies">reputation scores</Link>. Extremely low prices are a red flag, not a bargain.</p>

      <h2>2. They Refuse an In-Home or Video Survey</h2>
      <p>
        Reputable movers need to see what they’re moving. Companies that give binding quotes over the phone without seeing your home are either guessing or planning to raise the price later.
      </p>
      <p><strong>What to do:</strong> Insist on a video survey or in-person estimate. If they won’t do it, move on.</p>

      <h2>3. They Demand Large Upfront Deposits via Wire, Venmo, or Gift Cards</h2>
      <p>
        Legitimate movers usually require only a small deposit (10–20%) and accept credit cards or checks. Scammers often demand 50%+ paid via non-reversible methods.
      </p>
      <ul>
        <li>Never pay large sums by wire transfer, Zelle, Venmo, or gift cards.</li>
        <li>Credit cards offer some protection if something goes wrong.</li>
      </ul>

      <h2>4. No Real Physical Address or Only a P.O. Box</h2>
      <p>
        Scammers often operate from a P.O. Box or give fake addresses. Real companies have a physical office you can verify.
      </p>
      <p><strong>Quick check:</strong> Google the address. If it’s a residential home or doesn’t exist, walk away.</p>

      <h2>5. They Pressure You to Sign Immediately</h2>
      <p>
        High-pressure tactics like “This price is only good for 24 hours” or “We have a truck in your area tomorrow” are classic signs of a scam.
      </p>
      <p>Take your time. A legitimate company will give you space to compare options.</p>

      <h2>6. They Won’t Provide a Written Estimate</h2>
      <p>
        Everything must be in writing — including pickup and delivery windows, valuation options, and extra charges.
      </p>
      <p>
        Verbal agreements mean nothing when your belongings are on a truck halfway across the country.
      </p>

      <h2>7. The Company Has Almost No Independent Reviews</h2>
      <p>
        Be extremely cautious of companies with only a handful of reviews or reviews that all look similar.
      </p>
      <p>
        Use our <Link href="/companies">directory</Link> to see real review volume and recent complaint history from the FMCSA.
      </p>

      <h2>8. Price Changes Dramatically on Delivery Day</h2>
      <p>
        This is the classic bait-and-switch. The mover shows up and suddenly claims your shipment is much larger or heavier than quoted.
      </p>
      <p>
        <strong>Protection:</strong> Get everything in writing and take photos/videos of your items before loading. Never pay the balance until your goods are delivered and you’ve had a chance to inspect them.
      </p>

      <h2>How to Protect Yourself</h2>
      <ul>
        <li>Use our <Link href="/moving-calculator">moving calculator</Link> first so you know your approximate volume.</li>
        <li>Get at least three written estimates from companies with strong reputation scores.</li>
        <li>Verify USDOT and MC numbers on fmcsa.dot.gov.</li>
        <li>Never pay large deposits via untraceable methods.</li>
        <li>Read the contract carefully before signing.</li>
      </ul>

      <div className="not-prose mt-10 p-6 bg-primary/5 border border-primary/20 rounded-xl">
        <h3 className="font-semibold mb-2">Want to compare real, licensed movers?</h3>
        <p className="text-sm mb-4">Browse companies with verified FMCSA data and transparent pricing.</p>
        <Link 
          href="/companies" 
          className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
        >
          Browse Trusted Movers →
        </Link>
      </div>

      <p className="text-xs text-muted-foreground mt-12">
        This guide is for educational purposes. Always perform your own due diligence and report suspected scams to the FMCSA and your state consumer protection agency.
      </p>
    </div>
  );
}
