import type { Metadata } from 'next';
import Link from 'next/link';
import { localStates } from '@/lib/local-movers/states';
import { STATEWIDE_ROUTES } from '@/lib/seo/statewide-routes';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const metadata: Metadata = buildMovePageMetadata({
  title: 'Moving Research by State',
  description: 'Browse published Move Trust Hub state research and county mover directories.',
  path: '/states',
});

export default function StatesPage() {
  const states = STATEWIDE_ROUTES.map((path) => ({
    path,
    name: localStates.find((state) => `/${state.slug}` === path)!.name,
  })).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold">Moving research by state</h1>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {states.map((state) => (
          <li key={state.path}>
            <Link prefetch={false} href={state.path} className="underline underline-offset-4">{state.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
