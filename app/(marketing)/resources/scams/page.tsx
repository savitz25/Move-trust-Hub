import Link from 'next/link';
export const metadata = { title: 'Moving Scams to Avoid' };
export default function Scams() {
  return <div className="container mx-auto px-4 py-10 max-w-3xl prose"><Link href="/resources">← Back</Link><h1>8 Red Flags of Interstate Moving Scams</h1><ul><li>Price 40%+ lower than competitors</li><li>No physical address</li><li>Pressure for large upfront payment via non-refundable methods</li><li>Refuse to provide written estimate</li></ul></div>;
}
