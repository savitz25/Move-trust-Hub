import { z } from 'zod';

const zipSchema = z
  .string()
  .trim()
  .regex(/^\d{5}$/, 'Enter a valid 5-digit ZIP');

const inventoryItemSchema = z.object({
  name: z.string().min(1).max(120),
  quantity: z.number().int().min(1).max(99),
  volume: z.number().min(0).max(500),
  room: z.string().max(60).optional(),
});

const autoTransportSchema = z
  .object({
    vehicleCategory: z.string().max(40).optional(),
    transportMethod: z.string().max(20).optional(),
    distanceMiles: z.number().min(0).max(10000).optional(),
    lowTotal: z.number().min(0).optional(),
    highTotal: z.number().min(0).optional(),
  })
  .passthrough();

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(100),
  email: z.string().trim().email('Enter a valid email').max(254),
  phone: z.string().trim().max(30).optional().nullable(),
  from_zip: zipSchema,
  to_zip: zipSchema,
  move_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .nullable()
    .or(z.literal('').transform(() => null)),
  home_size: z.string().max(30).optional().nullable(),
  estimated_volume: z.number().min(0).max(50000).optional().nullable(),
  estimated_weight: z.number().min(0).max(200000).optional().nullable(),
  inventory: z.array(inventoryItemSchema).max(200).optional().nullable(),
  notes: z.string().max(4000).optional().nullable(),
  destination_slug: z.string().max(120).optional().nullable(),
  market_priority: z.number().int().min(1).max(999).optional().nullable(),
  source: z.string().max(120).optional().nullable(),
  service_type: z.enum(['moving', 'auto-transport']).default('moving'),
  auto_transport: autoTransportSchema.optional().nullable(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export type QuoteRequestInsert = {
  name: string;
  email: string;
  phone: string | null;
  from_zip: string;
  to_zip: string;
  move_date: string | null;
  home_size: string | null;
  estimated_volume: number | null;
  estimated_weight: number | null;
  inventory: QuoteRequestInput['inventory'];
  notes: string | null;
  destination_slug: string | null;
  market_priority: number | null;
  source: string;
  service_type: 'moving' | 'auto-transport';
  auto_transport: QuoteRequestInput['auto_transport'];
};

export function toQuoteInsert(input: QuoteRequestInput): QuoteRequestInsert {
  return {
    name: input.name,
    email: input.email.toLowerCase(),
    phone: input.phone?.trim() || null,
    from_zip: input.from_zip,
    to_zip: input.to_zip,
    move_date: input.move_date || null,
    home_size: input.home_size || null,
    estimated_volume: input.estimated_volume ?? null,
    estimated_weight: input.estimated_weight ?? null,
    inventory: input.inventory ?? null,
    notes: input.notes?.trim() || null,
    destination_slug: input.destination_slug ?? null,
    market_priority: input.market_priority ?? null,
    source: input.source || 'quote-modal',
    service_type: input.service_type,
    auto_transport: input.auto_transport ?? null,
  };
}