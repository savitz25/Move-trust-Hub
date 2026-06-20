const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';

export type QuoteLeadPayload = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  from_zip?: string | null;
  to_zip?: string | null;
  move_date?: string | null;
  home_size?: string | number | null;
  estimated_volume?: number | null;
  estimated_weight?: number | null;
  inventory?: Array<{
    name: string;
    quantity: number;
    volume: number;
    room?: string;
  }> | null;
  notes?: string | null;
  source?: string | null;
};

export type BrevoSyncResult = {
  synced: boolean;
  contactId?: number;
  error?: string;
  skippedReason?: string;
};

function splitName(name: string): { firstName: string; lastName: string } {
  const trimmed = name.trim();
  if (!trimmed) return { firstName: '', lastName: '' };

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function getHomeSizeLabel(size: string | number | null | undefined): string {
  if (!size) return 'Not provided';
  const s = String(size).trim().toLowerCase();
  const map: Record<string, string> = {
    studio: 'Studio / Small apartment',
    '1': '1 Bedroom',
    '2': '2 Bedrooms',
    '3': '3 Bedrooms',
    '4+': '4+ Bedrooms / Large',
  };
  return map[s] || String(size);
}

function formatInventorySummary(
  inventory: NonNullable<QuoteLeadPayload['inventory']>
): string {
  if (!inventory.length) return '';

  const lines = inventory.map((item) => {
    const room = item.room ? ` (${item.room})` : '';
    const lineVolume = item.volume * item.quantity;
    return `- ${item.name}${room}: qty ${item.quantity}, ${lineVolume} cu ft`;
  });

  const totalCf = inventory.reduce(
    (sum, item) => sum + item.volume * item.quantity,
    0
  );
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);

  return [
    `Inventory (${totalItems} items, ${totalCf.toLocaleString()} cu ft):`,
    ...lines,
  ].join('\n');
}

function formatMoveDetails(payload: QuoteLeadPayload): string {
  const inventory = Array.isArray(payload.inventory) ? payload.inventory : [];
  const sections = [
    `Submitted: ${new Date().toISOString()}`,
    `Source: ${payload.source || 'quote-modal'}`,
    `From ZIP: ${payload.from_zip || '—'}`,
    `To ZIP: ${payload.to_zip || '—'}`,
    `Move date: ${payload.move_date || 'Flexible'}`,
    `Home size: ${getHomeSizeLabel(payload.home_size)}`,
    `Est. volume: ${
      payload.estimated_volume ? `${payload.estimated_volume} cu ft` : '—'
    }`,
    `Est. weight: ${
      payload.estimated_weight ? `${payload.estimated_weight} lbs` : '—'
    }`,
  ];

  if (inventory.length) {
    sections.push(formatInventorySummary(inventory));
  }

  if (payload.notes?.trim()) {
    sections.push(`Notes: ${payload.notes.trim()}`);
  }

  return sections.join('\n');
}

function parseListId(): number {
  const raw = process.env.BREVO_LIST_ID || '7';
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : 7;
}

export async function syncLeadToBrevo(
  payload: QuoteLeadPayload
): Promise<BrevoSyncResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return { synced: false, skippedReason: 'BREVO_API_KEY not configured' };
  }

  const email = payload.email?.trim().toLowerCase();
  if (!email) {
    return { synced: false, skippedReason: 'Lead email is required' };
  }

  const { firstName, lastName } = splitName(payload.name || '');
  const listId = parseListId();

  const attributes: Record<string, string> = {
    MOVE_DETAILS: formatMoveDetails(payload),
    LEAD_SOURCE: payload.source || 'quote-modal',
  };

  if (firstName) attributes.FIRSTNAME = firstName;
  if (lastName) attributes.LASTNAME = lastName;

  const phone = payload.phone?.trim();
  if (phone) attributes.SMS = phone;

  const standardAttributes: Record<string, string> = {};
  if (firstName) standardAttributes.FIRSTNAME = firstName;
  if (lastName) standardAttributes.LASTNAME = lastName;
  if (phone) standardAttributes.SMS = phone;

  const attributeSets = [
    attributes,
    standardAttributes,
  ].filter((set) => Object.keys(set).length > 0);

  try {
    let lastError = 'Brevo contact sync failed';

    for (const attributeSet of attributeSets) {
      const response = await fetch(BREVO_API_URL, {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          listIds: [listId],
          updateEnabled: true,
          attributes: attributeSet,
        }),
      });

      const responseText = await response.text();
      let data: { id?: number; message?: string; code?: string } = {};
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          data = { message: responseText };
        }
      }

      if (response.ok) {
        console.log(
          `[Brevo] Contact synced to list #${listId}. Contact ID: ${data.id ?? 'updated'}`
        );
        return {
          synced: true,
          contactId: data.id,
        };
      }

      lastError =
        data.message ||
        `Brevo API error (${response.status} ${response.statusText})`;

      const invalidAttribute =
        response.status === 400 &&
        /attribute/i.test(lastError) &&
        attributeSet !== standardAttributes;

      if (!invalidAttribute) {
        console.error('[Brevo] Contact sync failed:', lastError, data);
        return { synced: false, error: lastError };
      }

      console.warn(
        '[Brevo] Custom attributes missing — retrying with standard fields only'
      );
    }

    console.error('[Brevo] Contact sync failed:', lastError);
    return { synced: false, error: lastError };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown Brevo error';
    console.error('[Brevo] Contact sync error:', message);
    return { synced: false, error: message };
  }
}