import Link from 'next/link';

export const metadata = {
  title: 'Understanding FMCSA Safety Ratings & Complaint Data',
  description: 'Learn exactly what USDOT numbers, safety ratings, and complaint ratios mean when choosing an interstate mover. Includes how to look up data yourself and what to watch for.',
};

export default function FmcsaPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl prose prose-neutral dark:prose-invert">
      <Link href="/resources" className="text-sm hover:underline">← Back to all resources</Link>

      <h1>Understanding FMCSA Safety Ratings &amp; Complaint Data</h1>
      
      <p className="text-lg text-muted-foreground">
        Before you trust any interstate moving company with your belongings, you need to understand the official government data that actually matters. The Federal Motor Carrier Safety Administration (FMCSA) tracks every licensed mover. Here’s exactly what those numbers mean and how to use them.
      </p>

      <h2>What Are USDOT and MC Numbers?</h2>
      <p>
        Every company that moves household goods across state lines must have two numbers:
      </p>
      <ul>
        <li><strong>USDOT Number</strong>: A unique identifier assigned by the Department of Transportation. Think of it as the company’s federal ID.</li>
        <li><strong>MC Number</strong> (Motor Carrier number): Shows the company is authorized to operate as a for-hire carrier.</li>
      </ul>
      <p>
        <strong>How to check:</strong> Go to <a href="https://www.fmcsa.dot.gov" target="_blank" rel="noopener">fmcsa.dot.gov</a> → “Company Snapshot” and search by name or number. If a company won’t give you their numbers, walk away.
      </p>

      <h2>FMCSA Safety Ratings Explained</h2>
      <p>
        The FMCSA rates carriers based on roadside inspections, crash data, and compliance reviews. Here’s what each rating actually means for your move:
      </p>

      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-muted">
              <th className="p-3 text-left font-medium">Rating</th>
              <th className="p-3 text-left font-medium">What It Means</th>
              <th className="p-3 text-left font-medium">Risk Level</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="p-3 font-medium text-green-600">Satisfactory</td>
              <td className="p-3">The company has an acceptable safety record and is in compliance with regulations.</td>
              <td className="p-3">Low</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-yellow-600">Conditional</td>
              <td className="p-3">The carrier has some safety or compliance issues. They are allowed to operate but are under closer scrutiny.</td>
              <td className="p-3">Medium</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-red-600">Unsatisfactory</td>
              <td className="p-3">Significant safety problems. The company should not be operating. Avoid at all costs.</td>
              <td className="p-3">High</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">Not Rated</td>
              <td className="p-3">Newer carriers or those with insufficient data. Not automatically bad, but you have less history to evaluate.</td>
              <td className="p-3">Unknown</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        On our <Link href="/companies">Mover Directory</Link>, we display the current safety rating for every company so you don’t have to look it up manually.
      </p>

      <h2>How to Read Complaint Data</h2>
      <p>
        Raw complaint numbers can be misleading. A company with 200 shipments and 10 complaints is very different from a company with 5,000 shipments and 10 complaints.
      </p>

      <h3>Key Metrics to Understand</h3>
      <ul>
        <li><strong>Complaints per 1,000 shipments</strong>: This is the most useful number. Lower is better.</li>
        <li><strong>Types of complaints</strong>: Look for patterns — repeated “lost items,” “damage,” or “price increases on delivery day.”</li>
        <li><strong>Trend over time</strong>: Is the company improving or getting worse?</li>
      </ul>

      <p>
        Our directory shows complaint ratios alongside shipment volume so you can quickly spot the true high-risk companies.
      </p>

      <h2>How We Use This Data at Move Trust Hub</h2>
      <p>
        We combine official FMCSA data with customer reviews, BBB ratings, and years in business to calculate our <strong>Reputation Score</strong>. This gives you a single number that reflects real risk, not just marketing claims.
      </p>

      <div className="not-prose bg-muted/50 border rounded-lg p-4 my-6 text-sm">
        <p className="font-medium mb-1">Pro Tip:</p>
        <p>
          Always verify the information yourself on the official FMCSA site. Our data is updated regularly, but government records are the final source of truth.
        </p>
      </div>

      <h2>Quick Checklist Before Booking</h2>
      <ul>
        <li>Confirm the company has an active USDOT and MC number</li>
        <li>Check that the safety rating is Satisfactory (or at worst Conditional with explanation)</li>
        <li>Review complaint ratio relative to shipment volume</li>
        <li>Look at the nature of recent complaints</li>
        <li>Cross-reference with our Reputation Score on the directory</li>
      </ul>

      <div className="not-prose mt-10 p-6 bg-primary/5 border border-primary/20 rounded-xl">
        <h3 className="font-semibold mb-2">Ready to compare real movers?</h3>
        <p className="text-sm mb-4">Browse companies with transparent FMCSA data and reputation scores.</p>
        <Link 
          href="/companies" 
          className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
        >
          Browse the Directory →
        </Link>
      </div>

      <p className="text-xs text-muted-foreground mt-12">
        This information is for educational purposes. Always verify licensing and safety data directly on fmcsa.dot.gov.
      </p>
    </div>
  );
}
