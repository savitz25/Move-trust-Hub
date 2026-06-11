import Link from 'next/link';

export const metadata = {
  title: 'About InterstateMovers USA & Trust Center',
  description: 'Our mission, how we calculate reputation scores, data sources, and important disclaimers.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-4xl font-semibold tracking-tight mb-2">About Us &amp; Trust Center</h1>
      <p className="text-xl text-muted-foreground">Independent. Unbiased. Built to help you choose better.</p>

      <div className="prose prose-neutral dark:prose-invert mt-8">
        <h2>Our Mission</h2>
        <p>InterstateMovers USA exists to bring transparency to the long-distance moving industry. We aggregate publicly available data (FMCSA, BBB, review platforms) and present it in a clean, comparable format without paid placements or referral kickbacks.</p>

        <h2>How Reputation Score Is Calculated</h2>
        <ul>
          <li>Customer rating (weighted 40%)</li>
          <li>Review volume &amp; recency (20%)</li>
          <li>FMCSA complaint ratio (20%)</li>
          <li>BBB rating + accreditation (10%)</li>
          <li>Years operating + verification bonus (10%)</li>
        </ul>

        <h2 id="disclaimer">Important Disclaimer</h2>
        <p className="text-sm p-4 bg-muted rounded-lg">This website is an independent informational directory and is <strong>not affiliated with, endorsed by, or a partner of</strong> any of the moving companies listed. All company names, logos, and data are used for identification and informational purposes only. Licensing and safety data can change. Always verify current information directly with the FMCSA, your state regulators, and the company before signing a contract.</p>

        <p>We do not arrange moves, take deposits, or act as a broker. We earn no commissions from companies.</p>
      </div>

      <div className="mt-10 text-sm">
        <Link href="/contact" className="text-primary">Contact us →</Link>
      </div>
    </div>
  );
}
