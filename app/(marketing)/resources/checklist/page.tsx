import Link from 'next/link';
export const metadata = { title: 'Interstate Moving Checklist' };
export default function Checklist() {
  return <div className="container mx-auto px-4 py-10 max-w-3xl prose"><Link href="/resources">← Back</Link><h1>Interstate Moving Checklist</h1><p>8 weeks out: Research movers using this directory. 4 weeks: Confirm dates &amp; inventory. Delivery day: Photograph everything and note condition on the inventory sheet.</p></div>;
}
