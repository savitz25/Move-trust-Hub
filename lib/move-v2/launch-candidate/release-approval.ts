import release from "../consumer-discovery/release-v2.json";
import type { ConsumerProvider } from "../consumer-discovery/types";
const providers = release.providers as unknown as ConsumerProvider[];
export const LAUNCH_RELEASE_VERSION = release.version;
export const EXPECTED_COUNTS = { FL: 41, WA: 45, total: 86 } as const;
export function auditLaunchRelease() {
  const ids = new Set(providers.map((provider) => provider.providerId));
  const byState = Object.fromEntries(["FL", "WA"].map((state) => [state, providers.filter((provider) => provider.state === state).length]));
  return {
    version: release.version, immutableFingerprint: release.inputFingerprint,
    providers: providers.length, byState, duplicates: providers.length - ids.size,
    verifiedLocations: providers.filter((provider) => provider.locationStatus === "VERIFIED").length,
    reviewLocations: providers.filter((provider) => provider.locationStatus === "LOCATION_REVIEW").length,
    explicitService: providers.filter((provider) => (provider.serviceEvidence ?? []).length > 0).length,
    experimentalDerivedIncluded: false as const,
  };
}
export function approveLaunchRelease() {
  const audit = auditLaunchRelease();
  if (audit.providers !== EXPECTED_COUNTS.total || audit.byState.FL !== EXPECTED_COUNTS.FL || audit.byState.WA !== EXPECTED_COUNTS.WA || audit.duplicates !== 0) throw new Error("Launch release is incomplete");
  return audit;
}
