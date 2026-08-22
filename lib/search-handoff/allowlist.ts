/**
 * ASK-SEARCH-006C — Move-owned copy of the locked Ask structured handoff allowlist.
 * Do not accept raw query text or PII. Do not deserialize arbitrary JSON.
 */

export const ASK_HANDOFF_KEYS = [
  'src',
  'journey',
  'state',
  'county',
  'intent',
  'entity',
  'category',
  'city',
  'zip',
  'sid',
] as const;

export type AskHandoffKey = (typeof ASK_HANDOFF_KEYS)[number];

export const ASK_HANDOFF_FORBIDDEN_KEYS = [
  'q',
  'query',
  'email',
  'phone',
  'name',
  'street_address',
  'address',
  'document',
  'account',
  'ssn',
  'lat',
  'lng',
  'latitude',
  'longitude',
  'financial',
  'health',
] as const;

export const MOVE_HANDOFF_ENTITY_TYPES = [
  'mover',
  'interstate_mover',
  'intrastate_mover',
  'moving_broker',
  'auto_transporter',
] as const;

export type MoveHandoffEntityType = (typeof MOVE_HANDOFF_ENTITY_TYPES)[number];

export const MOVER_ENTITY_TYPES = new Set<string>([
  'mover',
  'interstate_mover',
  'intrastate_mover',
]);

export type MoveAskSearchContext = {
  source: 'ask';
  entityType?: MoveHandoffEntityType;
  /** Present when `entity=` was sent but is not a supported Move search type. */
  unsupportedEntity?: string;
  category?: string;
  state?: string;
  county?: string;
  city?: string;
  zip?: string;
  intent?: string;
  journey?: string;
  sid?: string;
};
