/**
 * Move DOT enrichment loader prep.
 * Writes provider_contact_observation only. Never updates companies.
 * The generated script always ends in ROLLBACK.
 */

export const SOURCE = "dot_enrich_move_final_2026-10-12";
export const BATCH = "move-enrich-001-2026-10-16";
export const GO_PHRASE = "GO MOVE ENRICH LOAD";
export const MISMATCH_LIMIT = 0.005;
export const BLOCKED_USDOT = "1398726";

const FIELD_MAP = [
  ["website", "website_url", "website"],
  ["phone", "phone_primary", "business_phone"],
  ["email", "email", "business_email"],
  ["address", "address", "physical_address"],
];

export function parseCsv(text) {
  const input = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  const header = rows.shift() || [];
  return rows
    .filter((cells) => cells.some((cell) => cell.trim() !== ""))
    .map((cells) => {
      const record = {};
      header.forEach((name, index) => {
        record[name] = cells[index] ?? "";
      });
      return record;
    });
}

export function classifyRow(row) {
  const tier = (row.publish_tier || "").trim().toLowerCase();
  const entity = (row.entity_type || "").trim().toLowerCase();
  const decision = (row.decision_applied || "").trim().toLowerCase();
  if (tier === "excluded" || entity === "excluded" || decision === "excluded") return "excluded";
  if (tier === "non_mover" || entity === "non_mover" || decision === "non_mover") return "non_mover";
  if ((row.usdot || "").trim() === BLOCKED_USDOT) return "usdot_1398726";
  return "candidate";
}

export function regulatoryId(row) {
  const usdot = (row.usdot || "").trim();
  if (usdot) return usdot;
  return `cid:${(row.company_id || "").trim()}`;
}

export function normalizeValue(kind, value) {
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (kind === "phone") return trimmed.replace(/\D/g, "");
  if (kind === "email") return trimmed.toLowerCase();
  return trimmed;
}

export function selectCandidates(rows) {
  const buckets = {
    input: rows.length,
    excluded: 0,
    non_mover: 0,
    usdot_1398726: 0,
    candidates: [],
  };
  for (const row of rows) {
    const kind = classifyRow(row);
    if (kind === "candidate") buckets.candidates.push(row);
    else buckets[kind] += 1;
  }
  return buckets;
}

export function identityGate(candidates, companiesById) {
  const seen = new Map();
  let notFound = 0;
  let mismatches = 0;
  let ambiguous = 0;
  const eligible = [];
  for (const row of candidates) {
    const companyId = (row.company_id || "").trim();
    const usdot = (row.usdot || "").trim();
    if (seen.has(companyId)) {
      ambiguous += 1;
      continue;
    }
    seen.set(companyId, usdot);
    const company = companiesById.get(companyId);
    if (!company) {
      notFound += 1;
      continue;
    }
    if (company.ambiguous) {
      ambiguous += 1;
      continue;
    }
    if ((company.usdot || "").trim() !== usdot) {
      mismatches += 1;
      continue;
    }
    eligible.push(row);
  }
  const failures = notFound + mismatches + ambiguous;
  const rate = candidates.length === 0 ? 0 : failures / candidates.length;
  return {
    eligible,
    notFound,
    mismatches,
    ambiguous,
    failures,
    rate,
    pass: rate <= MISMATCH_LIMIT,
  };
}

export function buildObservations(rows) {
  const observations = [];
  for (const row of rows) {
    const tier = (row.publish_tier || "").trim().toLowerCase();
    if (tier !== "strict" && tier !== "partial") {
      throw new Error(`Refusing unclassified publish_tier for company ${row.company_id}`);
    }
    for (const [kind, column, observationType] of FIELD_MAP) {
      const raw = (row[column] || "").trim();
      if (!raw) continue;
      observations.push({
        companyId: row.company_id.trim(),
        usdot: (row.usdot || "").trim(),
        regulatoryId: regulatoryId(row),
        kind,
        observationType,
        rawValue: raw,
        normalizedValue: normalizeValue(kind, raw),
        qualityClass: tier,
        sourceUrl: (row.coverage_source_url || "").trim(),
      });
    }
  }
  return observations;
}

export function summarize(observations) {
  const profiles = new Set();
  const strictProfiles = new Set();
  const partialProfiles = new Set();
  const counts = {
    total: observations.length,
    website: 0,
    phone: 0,
    email: 0,
    address: 0,
    strictObservations: 0,
    partialObservations: 0,
  };
  for (const observation of observations) {
    profiles.add(observation.companyId);
    counts[observation.kind] += 1;
    if (observation.qualityClass === "strict") {
      counts.strictObservations += 1;
      strictProfiles.add(observation.companyId);
    } else {
      counts.partialObservations += 1;
      partialProfiles.add(observation.companyId);
    }
  }
  return {
    ...counts,
    profiles: profiles.size,
    strictProfiles: strictProfiles.size,
    partialProfiles: partialProfiles.size,
  };
}

export function maskSample(observation) {
  const raw = observation.rawValue;
  if (observation.kind === "email") {
    const at = raw.indexOf("@");
    if (at <= 0) return "email:***";
    return `email:${raw[0]}***@${raw.slice(at + 1)}`;
  }
  if (observation.kind === "phone") {
    const digits = observation.normalizedValue;
    const tail = digits.slice(-2);
    return `phone:***${tail}`;
  }
  if (observation.kind === "website") {
    try {
      return `website:${new URL(raw).host}`;
    } catch {
      return "website:***";
    }
  }
  return `address:${raw.length} chars`;
}

function sqlQuote(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

export function buildRollbackSql(rows) {
  const selected = selectCandidates(rows);
  const values = selected.candidates
    .map((row) => {
      const cells = [
        row.company_id.trim(),
        (row.usdot || "").trim(),
        (row.publish_tier || "").trim().toLowerCase(),
        (row.website_url || "").trim(),
        (row.phone_primary || "").trim(),
        (row.email || "").trim(),
        (row.address || "").trim(),
        (row.coverage_source_url || "").trim(),
      ].map(sqlQuote);
      return `(${cells.join(",")})`;
    })
    .join(",\n");
  return `BEGIN;\nCREATE TEMP TABLE move_enrich_incoming (\n  company_id text,\n  usdot text,\n  publish_tier text,\n  website text,\n  phone text,\n  email text,\n  address text,\n  source_url text\n) ON COMMIT DROP;\nINSERT INTO move_enrich_incoming VALUES\n${values};\nCREATE TEMP TABLE move_enrich_gate ON COMMIT DROP AS\nSELECT i.*, (c.id IS NOT NULL) AS found,\n       btrim(coalesce(c.usdot_number, '')) = btrim(i.usdot) AS usdot_ok\nFROM move_enrich_incoming i\nLEFT JOIN public.companies c ON c.id = i.company_id\nWHERE btrim(i.usdot) <> '${BLOCKED_USDOT}';\nCREATE TEMP TABLE move_enrich_proposed ON COMMIT DROP AS\nSELECT g.company_id,\n       CASE WHEN btrim(g.usdot) = '' THEN 'cid:' || g.company_id ELSE btrim(g.usdot) END AS regulatory_id,\n       g.publish_tier AS quality_class,\n       field.observation_type,\n       field.raw_value,\n       field.normalized_value,\n       NULLIF(g.source_url, '') AS source_url\nFROM move_enrich_gate g\nCROSS JOIN LATERAL (\n  VALUES\n    ('website', g.website, btrim(g.website)),\n    ('business_phone', g.phone, regexp_replace(g.phone, '[^0-9]', '', 'g')),\n    ('business_email', g.email, lower(btrim(g.email))),\n    ('physical_address', g.address, regexp_replace(btrim(g.address), '\\s+', ' ', 'g'))\n) AS field(observation_type, raw_value, normalized_value)\nWHERE g.found AND g.usdot_ok AND btrim(field.raw_value) <> ''\n  AND g.publish_tier IN ('strict', 'partial');\nDO $$\nDECLARE\n  conflict_count integer;\nBEGIN\n  SELECT count(*) INTO conflict_count\n  FROM move_enrich_proposed p\n  JOIN public.provider_contact_observation o\n    ON o.regulatory_id = p.regulatory_id\n   AND o.observation_type = p.observation_type\n  WHERE o.source IS DISTINCT FROM '${SOURCE}'\n     OR coalesce(o.match_evidence->>'batch', '') IS DISTINCT FROM '${BATCH}';\n  IF conflict_count > 0 THEN\n    RAISE EXCEPTION 'move enrich conflict with another observation source';\n  END IF;\nEND $$;\nCREATE TEMP TABLE move_enrich_prior_count ON COMMIT DROP AS\nSELECT count(*) AS n\nFROM move_enrich_proposed p\nJOIN public.provider_contact_observation o\n  ON o.regulatory_id = p.regulatory_id\n AND o.observation_type = p.observation_type\n AND o.source = '${SOURCE}'\n AND coalesce(o.match_evidence->>'batch', '') = '${BATCH}';\nINSERT INTO public.provider_contact_observation (\n  company_id, regulator, regulatory_id, observation_type, raw_value, normalized_value,\n  source, source_record_id, source_url, verification_state, match_status, match_evidence, quality_class\n)\nSELECT company_id, 'FMCSA', regulatory_id, observation_type, raw_value, normalized_value,\n       '${SOURCE}', company_id, source_url, 'UNRESOLVED', 'identity_usdot_exact',\n       jsonb_build_object('batch', '${BATCH}'), quality_class\nFROM move_enrich_proposed\nON CONFLICT (regulatory_id, observation_type) DO UPDATE\nSET raw_value = EXCLUDED.raw_value,\n    normalized_value = EXCLUDED.normalized_value,\n    quality_class = EXCLUDED.quality_class,\n    source_url = EXCLUDED.source_url,\n    source_record_id = EXCLUDED.source_record_id,\n    match_evidence = EXCLUDED.match_evidence,\n    company_id = EXCLUDED.company_id,\n    regulator = EXCLUDED.regulator\nWHERE public.provider_contact_observation.source = '${SOURCE}'\n  AND public.provider_contact_observation.match_evidence->>'batch' = '${BATCH}';\nSELECT json_build_object(\n  'input_rows', (SELECT count(*) FROM move_enrich_incoming),\n  'not_found', (SELECT count(*) FROM move_enrich_gate WHERE NOT found),\n  'usdot_mismatches', (SELECT count(*) FROM move_enrich_gate WHERE found AND NOT usdot_ok),\n  'profiles', (SELECT count(DISTINCT company_id) FROM move_enrich_proposed),\n  'observations', (SELECT count(*) FROM public.provider_contact_observation WHERE source = '${SOURCE}' AND match_evidence->>'batch' = '${BATCH}'),\n  'website', (SELECT count(*) FROM public.provider_contact_observation WHERE source = '${SOURCE}' AND match_evidence->>'batch' = '${BATCH}' AND observation_type = 'website'),\n  'phone', (SELECT count(*) FROM public.provider_contact_observation WHERE source = '${SOURCE}' AND match_evidence->>'batch' = '${BATCH}' AND observation_type = 'business_phone'),\n  'email', (SELECT count(*) FROM public.provider_contact_observation WHERE source = '${SOURCE}' AND match_evidence->>'batch' = '${BATCH}' AND observation_type = 'business_email'),\n  'address', (SELECT count(*) FROM public.provider_contact_observation WHERE source = '${SOURCE}' AND match_evidence->>'batch' = '${BATCH}' AND observation_type = 'physical_address'),\n  'strict_profiles', (SELECT count(DISTINCT company_id) FROM move_enrich_proposed WHERE quality_class = 'strict'),\n  'strict_observations', (SELECT count(*) FROM public.provider_contact_observation WHERE source = '${SOURCE}' AND match_evidence->>'batch' = '${BATCH}' AND quality_class = 'strict'),\n  'partial_profiles', (SELECT count(DISTINCT company_id) FROM move_enrich_proposed WHERE quality_class = 'partial'),\n  'partial_observations', (SELECT count(*) FROM public.provider_contact_observation WHERE source = '${SOURCE}' AND match_evidence->>'batch' = '${BATCH}' AND quality_class = 'partial'),\n  'prior_rows', (SELECT n FROM move_enrich_prior_count)\n) AS receipt;\nROLLBACK;\n`;
}

export function commitAuthorized(phrase) {
  return phrase === GO_PHRASE;
}

export function evidenceRows(observations) {
  return observations.map((observation) => ({
    company_id: observation.companyId,
    regulatory_id: observation.regulatoryId,
    observation_type: observation.observationType,
    quality_class: observation.qualityClass,
    source: SOURCE,
    batch: BATCH,
    prior_existed: "false",
    restore_action: "delete_inserted_row",
  }));
}

function csvCell(value) {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export function toCsv(rows) {
  const header = [
    "company_id",
    "regulatory_id",
    "observation_type",
    "quality_class",
    "source",
    "batch",
    "prior_existed",
    "restore_action",
  ];
  const lines = [header.join(",")];
  for (const row of rows) {
    lines.push(header.map((key) => csvCell(row[key])).join(","));
  }
  return `${lines.join("\n")}\n`;
}
