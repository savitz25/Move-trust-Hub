import Link from 'next/link';

export const metadata = { title: 'How to Choose an Interstate Mover in 2026' };

export default function HowToChoose() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl prose prose-neutral dark:prose-invert">
      <Link href="/resources" className="text-sm">← All Resources</Link>
      <h1>How to Choose an Interstate Mover</h1>
      <p>Use reputation data + licensing verification. Never choose on price alone.</p>

      <h2>1. Start with Reputation Score</h2>
      <p>Our composite score weighs customer ratings, volume of feedback, complaint ratios, longevity, and accreditation. Prioritize companies above 80.</p>

      <h2>2. Verify FMCSA Authority</h2>
      <p>Go to fmcsa.dot.gov and search by USDOT or company name. Confirm active authority and look at the complaint history yourself.</p>

      <h2>3. Get 3 Written Estimates</h2>
      <p>Never accept a quote over the phone. Ask for binding or not-to-exceed estimates after a video or in-home survey.</p>

      <h2>4. Understand Valuation Options</h2>
      <p>Released value (60¢/lb) is almost worthless. Choose full-value protection or third-party insurance for valuable items.</p>

      <p className="text-sm text-muted-foreground mt-10">This is educational content. Always perform your own due diligence.</p>
    </div>
  );
}
