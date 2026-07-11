import 'server-only';

function readEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Default submitter identity for logged-in admin directory onboarding. */
export function getAdminSubmitterDefaults(): { name: string; email: string } {
  return {
    name: readEnv(process.env.ADMIN_SUBMITTER_NAME) ?? 'Michael Henry',
    email: readEnv(process.env.ADMIN_SUBMITTER_EMAIL) ?? 'info@movetrusthub.com',
  };
}