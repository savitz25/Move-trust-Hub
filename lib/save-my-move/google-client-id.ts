/** OAuth 2.0 web client ID — same value as Supabase Auth → Google provider. */
export function getGoogleOAuthClientId(): string | null {
  const id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim();
  return id || null;
}