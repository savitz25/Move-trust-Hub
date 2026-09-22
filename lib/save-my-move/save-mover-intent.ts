/** One profile activation. No durable queue: navigation cancels unresolved intent. */
export type MoverSaveInput = { companySlug: string; companyName: string };
export type MoverSaveDependencies = {
  resolveUser: () => Promise<{ id: string } | null>;
  persistLocal: (input: MoverSaveInput) => unknown;
  saveCloud: (input: { companySlug: string; expectedUserId: string }) => Promise<{ ok: boolean; cloud?: boolean }>;
  onLocalSaved?: () => void;
};

export async function saveMoverIntent(
  input: MoverSaveInput,
  signal: AbortSignal,
  dependencies: MoverSaveDependencies,
) {
  signal.throwIfAborted();
  // Device Save is first-class, including when account infrastructure is down.
  dependencies.persistLocal(input);
  dependencies.onLocalSaved?.();
  try {
    const user = await dependencies.resolveUser();
    signal.throwIfAborted();
    if (!user) return { destination: 'device' as const, cloudFailed: false };
    const result = await dependencies.saveCloud({ companySlug: input.companySlug, expectedUserId: user.id });
    return result.ok && result.cloud
      ? { destination: 'account' as const, cloudFailed: false, confirmedUserId: user.id }
      : { destination: 'device' as const, cloudFailed: true };
  } catch {
    // Success here is honest: the synchronous local write above succeeded.
    return { destination: 'device' as const, cloudFailed: true };
  }
}
