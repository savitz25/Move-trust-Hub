/** Known batch-generation artifacts and concatenated geography strings to purge at runtime. */
const ARTIFACT_REPLACEMENTS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bloup river sherman\b/gi, 'Loup River Valley'],
  [/\bhigh plains sioux\b/gi, 'northern High Plains'],
  [/\bplatte river upper\b/gi, 'upper Platte River Valley'],
  [/\bplatte river mid\b/gi, 'mid Platte River Valley'],
  [/\bplatte river lower\b/gi, 'lower Platte River Valley'],
  [/\belkhorn river mid\b/gi, 'mid Elkhorn River Valley'],
  [/\belkhorn valley central\b/gi, 'central Elkhorn River Valley'],
  [/\belkhorn valley east\b/gi, 'eastern Elkhorn River Valley'],
  [/\bmissouri bluff north\b/gi, 'northern Missouri River bluffs'],
  [/\bmissouri bluff west\b/gi, 'western Missouri River bluffs'],
  [/\bmissouri plateau\b/gi, 'Missouri River plateau'],
  [/\bnorth platte valley mid\b/gi, 'mid North Platte River Valley'],
  [/\bniobrara plateau\b/gi, 'Niobrara River plateau'],
  [/\bsandhills central\b/gi, 'central Nebraska Sandhills'],
  [/\brepublican river southwest\b/gi, 'southwestern Republican River Valley'],
  [/\blittle blue valley\b/gi, 'Little Blue River Valley'],
  [/\bnemaha river basin\b/gi, 'Nemaha River basin'],
  [/\bnemaha river valley\b/gi, 'Nemaha River Valley'],
  [/\bpine ridge foothills\b/gi, 'Pine Ridge foothills'],
  [/\bpanhandle north\b/gi, 'northern Panhandle'],
  [/\bhigh plains east\b/gi, 'eastern High Plains'],
  [/\bplatte valley east\b/gi, 'eastern Platte River Valley'],
  [/\bplatte valley south\b/gi, 'southern Platte River Valley'],
  [/\bplatte valley lower\b/gi, 'lower Platte River Valley'],
  [/\bomaha nation corridor corridor\b/gi, 'Omaha Nation corridor'],
  [/\bcorridor corridor\b/gi, 'corridor'],
];

/** Detects lowercase concatenated place-name chains used as fake geography descriptors. */
const CONCATENATED_DESCRIPTOR =
  /\b(?:[a-z]+(?:\s+[a-z]+){1,3})\s+corridor\s+demand\b/gi;

export function containsResearchArtifact(text: string): boolean {
  if (CONCATENATED_DESCRIPTOR.test(text)) return true;
  return ARTIFACT_REPLACEMENTS.some(([pattern]) => {
    pattern.lastIndex = 0;
    return /\bloup river sherman\b/i.test(text);
  });
}

export function sanitizeCountyResearchText(text: string | undefined): string | undefined {
  if (!text) return text;
  let out = text;
  for (const [pattern, replacement] of ARTIFACT_REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }
  out = out.replace(CONCATENATED_DESCRIPTOR, 'regional moving demand');
  return out.replace(/\s{2,}/g, ' ').trim();
}