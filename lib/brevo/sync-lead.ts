import { normalizePhoneForBrevo } from '@/lib/brevo/phone';

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
  listId?: number;
  error?: string;
  skippedReason?: string;
  attempts?: Array<{
    label: string;
    status: number;
    ok: boolean;
    message?: string;
    contactId?: number;
  }>;
};

function logBrevo(message: string, data?: Record<string, unknown>) {
  if (data) {
    console.log(`[Brevo] ${message}`, data);
  } else {
    console.log(`[Brevo] ${message}`);
  }
}

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

type BrevoAttempt = NonNullable<BrevoSyncResult['attempts']>[number];

async function postBrevoContact(params: {
  apiKey: string;
  email: string;
  listId: number;
  attributes: Record<string, string>;
  label: string;
}): Promise<BrevoAttempt> {
  const requestBody = {
    email: params.email,
    listIds: [params.listId],
    updateEnabled: true,
    attributes: params.attributes,
  };

  logBrevo(`Attempt: ${params.label}`, {
    email: params.email,
    listId: params.listId,
    attributeKeys: Object.keys(params.attributes),
  });

  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': params.apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(requestBody),
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

  const attempt: BrevoAttempt = {
    label: params.label,
    status: response.status,
    ok: response.ok,
    message: data.message,
    contactId: data.id,
  };

  logBrevo(`Response: ${params.label}`, {
    status: response.status,
    ok: response.ok,
    message: data.message,
    code: data.code,
    contactId: data.id,
    raw: responseText.slice(0, 500),
  });

  return attempt;
}

function isRetriableBrevoError(message: string | undefined): boolean {
  if (!message) return false;
  return (
    /attribute/i.test(message) ||
    /invalid phone number/i.test(message) ||
    /sms is already associated/i.test(message)
  );
}

export async function syncLeadToBrevo(
  payload: QuoteLeadPayload
): Promise<BrevoSyncResult> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const listId = parseListId();

  logBrevo('Starting lead sync', {
    hasApiKey: Boolean(apiKey),
    listId,
    email: payload.email || null,
    source: payload.source || 'quote-modal',
    rawPhone: payload.phone || null,
  });

  if (!apiKey) {
    logBrevo('Skipped — BREVO_API_KEY not configured');
    return { synced: false, skippedReason: 'BREVO_API_KEY not configured', listId };
  }

  const email = payload.email?.trim().toLowerCase();
  if (!email) {
    logBrevo('Skipped — lead email missing');
    return { synced: false, skippedReason: 'Lead email is required', listId };
  }

  const { firstName, lastName } = splitName(payload.name || '');
  const normalizedPhone = normalizePhoneForBrevo(payload.phone);

  if (payload.phone?.trim() && !normalizedPhone) {
    logBrevo('Phone provided but could not normalize — syncing without SMS', {
      rawPhone: payload.phone,
    });
  } else if (normalizedPhone) {
    logBrevo('Phone normalized for Brevo SMS', {
      rawPhone: payload.phone,
      normalizedPhone,
    });
  }

  const standardAttributes: Record<string, string> = {};
  if (firstName) standardAttributes.FIRSTNAME = firstName;
  if (lastName) standardAttributes.LASTNAME = lastName;
  if (normalizedPhone) standardAttributes.SMS = normalizedPhone;

  const fullAttributes: Record<string, string> = {
    ...standardAttributes,
    MOVE_DETAILS: formatMoveDetails(payload),
    LEAD_SOURCE: payload.source || 'quote-modal',
  };

  const fullWithoutSms: Record<string, string> = {
    MOVE_DETAILS: formatMoveDetails(payload),
    LEAD_SOURCE: payload.source || 'quote-modal',
  };
  if (firstName) fullWithoutSms.FIRSTNAME = firstName;
  if (lastName) fullWithoutSms.LASTNAME = lastName;

  const nameOnly: Record<string, string> = {};
  if (firstName) nameOnly.FIRSTNAME = firstName;
  if (lastName) nameOnly.LASTNAME = lastName;

  const attempts: BrevoAttempt[] = [];
  const attemptPlans: Array<{ label: string; attributes: Record<string, string> }> = [
    { label: 'full-with-move-details', attributes: fullAttributes },
    { label: 'full-without-sms', attributes: fullWithoutSms },
    { label: 'standard-name-phone', attributes: standardAttributes },
    { label: 'name-only', attributes: nameOnly },
    { label: 'email-only', attributes: {} },
  ];

  let lastError = 'Brevo contact sync failed';

  try {
    for (const plan of attemptPlans) {
      if (
        (plan.label === 'standard-name-phone' ||
          plan.label === 'name-only') &&
        Object.keys(plan.attributes).length === 0
      ) {
        continue;
      }

      const attempt = await postBrevoContact({
        apiKey,
        email,
        listId,
        attributes: plan.attributes,
        label: plan.label,
      });
      attempts.push(attempt);

      if (attempt.ok) {
        logBrevo(`Contact synced to list #${listId}`, {
          contactId: attempt.contactId ?? 'updated',
          strategy: plan.label,
        });
        return {
          synced: true,
          contactId: attempt.contactId,
          listId,
          attempts,
        };
      }

      lastError =
        attempt.message ||
        `Brevo API error (${attempt.status})`;

      if (!isRetriableBrevoError(attempt.message)) {
        logBrevo('Non-retriable Brevo error — stopping retries', {
          message: lastError,
          strategy: plan.label,
        });
        break;
      }

      logBrevo('Retriable Brevo error — trying fallback strategy', {
        message: lastError,
        strategy: plan.label,
      });
    }

    logBrevo('All Brevo sync attempts failed', { lastError, attempts });
    return { synced: false, error: lastError, listId, attempts };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown Brevo error';
    logBrevo('Unexpected sync error', { message });
    return { synced: false, error: message, listId, attempts };
  }
}