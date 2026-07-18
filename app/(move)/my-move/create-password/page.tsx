import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { getMyMovePasswordStatus } from '@/lib/save-my-move/password';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { MyMoveCreatePasswordForm } from '@/components/save-my-move/my-move-create-password-form';

export const dynamic = 'force-dynamic';

export default async function MyMoveCreatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next = sanitizePostLoginPath(params.next ?? '/my-move');
  // Keep customers out of portal intermediate steps from this screen
  const safeNext = next.startsWith('/portal') ? '/my-move' : next;

  const user = await getAuthenticatedUser();
  if (!user) {
    redirect('/my-move');
  }

  const pw = await getMyMovePasswordStatus();
  if (!pw?.shouldOfferCreatePassword) {
    redirect(
      safeNext.startsWith('/my-move/create-password') ? '/my-move' : safeNext
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 via-background to-background"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.07] via-transparent to-transparent"
        aria-hidden
      />

      <div className="container mx-auto flex max-w-lg flex-col items-center px-4 py-10 sm:py-14">
        <header className="mb-8 w-full text-center sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            My Move
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Optional convenience login for your Move HQ
          </p>
        </header>

        <MyMoveCreatePasswordForm nextPath={safeNext} email={user.email ?? null} />
      </div>
    </div>
  );
}
