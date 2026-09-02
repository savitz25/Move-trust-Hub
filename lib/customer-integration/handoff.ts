import { createHmac, randomBytes } from "node:crypto";

export const HANDOFF_TTL_SECONDS = 15 * 60;
export type MoveHandoffPayload = {
  v: 2;
  aud: "asktrusthub";
  hub_id: "move";
  native_profile_id: string;
  slug: string;
  external_key: string;
  source_system: "fmcsa";
  home_state: string | null;
  identifier_namespace: "USDOT";
  entity_class: "mover";
  display_name: string;
  iat: number;
  exp: number;
  nonce: string;
};

export function mintMoveHandoff(
  secret: string,
  profile: { id: string; slug: string; usdot: string; displayName: string },
  options: { now?: Date; nonce?: string } = {},
) {
  if (secret.length < 32) throw new Error("ATH_HANDOFF_SECRET is unavailable");
  const iat = Math.floor((options.now ?? new Date()).getTime() / 1000);
  const payload: MoveHandoffPayload = {
    v: 2,
    aud: "asktrusthub",
    hub_id: "move",
    native_profile_id: profile.id,
    slug: profile.slug,
    external_key: profile.usdot,
    source_system: "fmcsa",
    home_state: null,
    identifier_namespace: "USDOT",
    entity_class: "mover",
    display_name: profile.displayName,
    iat,
    exp: iat + HANDOFF_TTL_SECONDS,
    nonce: options.nonce ?? randomBytes(24).toString("base64url"),
  };
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url",
  );
  const signature = createHmac("sha256", secret)
    .update(body, "utf8")
    .digest("base64url");
  return { token: `${body}.${signature}`, payload };
}
