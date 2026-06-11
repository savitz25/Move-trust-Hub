import Link from 'next/link';
export const metadata = { title: 'FMCSA Ratings Explained' };
export default function FmcsaPage() {
  return <div className="container mx-auto px-4 py-10 max-w-3xl prose"><Link href="/resources">← Back</Link><h1>FMCSA Safety Ratings &amp; Data</h1><p>Satisfactory = acceptable safety record. Conditional or Unsatisfactory = higher risk. Always cross-check complaint counts against total shipments reported.</p></div>;
}
