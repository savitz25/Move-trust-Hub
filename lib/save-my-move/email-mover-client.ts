export async function emailMoverDetailsClient(
  companySlug: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/save-my-move/email-mover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companySlug }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      return { success: false, error: data.error ?? 'Could not send email' };
    }
    return { success: true };
  } catch {
    return { success: false, error: 'Could not send email' };
  }
}