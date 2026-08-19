export type OperationalKind = "REAL_SOURCE_PILOT" | "SYNTHETIC_CONTROL_TEST";
export type ImmutableRelease = {
  id: string;
  fingerprint: string;
  status: "CURRENT" | "HISTORICAL";
  dependencyEvidenceIds: string[];
  createdAt: string;
};
export class ImmutableReleaseRegistry {
  readonly releases: ImmutableRelease[] = [];
  currentId: string | null = null;
  publish(input: Omit<ImmutableRelease, "status">) {
    const same = this.releases.find((r) => r.fingerprint === input.fingerprint);
    if (same) return { action: "NO_OP" as const, release: same };
    for (const r of this.releases)
      if (r.status === "CURRENT") r.status = "HISTORICAL";
    const release = { ...input, status: "CURRENT" as const };
    this.releases.push(release);
    this.currentId = release.id;
    return { action: "CREATED" as const, release };
  }
  rollback(id: string) {
    if (!this.releases.some((r) => r.id === id))
      throw new Error("Unknown historical release");
    for (const r of this.releases)
      r.status = r.id === id ? "CURRENT" : "HISTORICAL";
    this.currentId = id;
  }
  trace(releaseId: string, evidenceId: string) {
    return Boolean(
      this.releases
        .find((r) => r.id === releaseId)
        ?.dependencyEvidenceIds.includes(evidenceId),
    );
  }
}
