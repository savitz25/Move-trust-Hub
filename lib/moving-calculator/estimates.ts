export type MoveSizeBracket = {
  id: string;
  label: string;
  min: number;
  max: number;
  truck: string;
  movers: string;
  duration: string;
  gaugePercent: number;
};

export const MOVE_SIZE_BRACKETS: MoveSizeBracket[] = [
  {
    id: 'studio',
    label: 'Studio / Small',
    min: 0,
    max: 900,
    truck: '10–12 ft truck or 1 container',
    movers: '2 movers',
    duration: '2–4 hours',
    gaugePercent: 20,
  },
  {
    id: '1-bedroom',
    label: '1 Bedroom',
    min: 901,
    max: 1800,
    truck: '16–20 ft truck or 2 containers',
    movers: '2–3 movers',
    duration: '4–6 hours',
    gaugePercent: 40,
  },
  {
    id: '2-bedroom',
    label: '2 Bedroom',
    min: 1801,
    max: 2800,
    truck: '22–26 ft truck or 3 containers',
    movers: '3–4 movers',
    duration: '6–8 hours',
    gaugePercent: 60,
  },
  {
    id: '3-bedroom',
    label: '3 Bedroom',
    min: 2801,
    max: 4000,
    truck: '26–28 ft truck or 4 containers',
    movers: '4 movers',
    duration: '8–10 hours',
    gaugePercent: 80,
  },
  {
    id: '4-plus',
    label: '4+ Bedroom / Large',
    min: 4001,
    max: Infinity,
    truck: '28+ ft truck or 5+ containers',
    movers: '4–6 movers',
    duration: '10+ hours',
    gaugePercent: 100,
  },
];

export const LBS_PER_CU_FT = 7;

export function getMoveRecommendation(cuFt: number): MoveSizeBracket {
  return (
    MOVE_SIZE_BRACKETS.find((b) => cuFt >= b.min && cuFt <= b.max) ??
    MOVE_SIZE_BRACKETS[MOVE_SIZE_BRACKETS.length - 1]
  );
}

export function getBracketProgress(cuFt: number): number {
  const bracket = getMoveRecommendation(cuFt);
  const idx = MOVE_SIZE_BRACKETS.indexOf(bracket);
  if (idx === -1 || idx === MOVE_SIZE_BRACKETS.length - 1) return 100;
  const next = MOVE_SIZE_BRACKETS[idx + 1];
  const range = next.min - bracket.min;
  const pos = cuFt - bracket.min;
  return Math.min(100, Math.max(8, Math.round((pos / range) * 100)));
}

export type BoxSuggestion = {
  name: string;
  quantity: number;
  volume: number;
};

/** Suggest moving boxes based on total cubic footage */
export function suggestBoxes(totalCuFt: number): BoxSuggestion[] {
  if (totalCuFt < 200) {
    return [
      { name: 'Box, Small (1.5. Cf) 16X12X12', quantity: 5, volume: 2 },
      { name: 'Box, Med (3.0 Cf) 18X18X16', quantity: 8, volume: 3 },
      { name: 'Box, Large (4.5 Cf) 18X18X24', quantity: 3, volume: 5 },
    ];
  }
  if (totalCuFt < 1200) {
    return [
      { name: 'Box, Small (1.5. Cf) 16X12X12', quantity: 10, volume: 2 },
      { name: 'Box, Med (3.0 Cf) 18X18X16', quantity: 15, volume: 3 },
      { name: 'Box, Large (4.5 Cf) 18X18X24', quantity: 8, volume: 5 },
      { name: 'Box, Wardrobe', quantity: 2, volume: 13 },
    ];
  }
  if (totalCuFt < 2500) {
    return [
      { name: 'Box, Small (1.5. Cf) 16X12X12', quantity: 15, volume: 2 },
      { name: 'Box, Med (3.0 Cf) 18X18X16', quantity: 25, volume: 3 },
      { name: 'Box, Large (4.5 Cf) 18X18X24', quantity: 15, volume: 5 },
      { name: 'Box, Wardrobe', quantity: 4, volume: 13 },
      { name: 'Box, China/Dish 18X18X28', quantity: 3, volume: 5 },
    ];
  }
  return [
    { name: 'Box, Small (1.5. Cf) 16X12X12', quantity: 25, volume: 2 },
    { name: 'Box, Med (3.0 Cf) 18X18X16', quantity: 40, volume: 3 },
    { name: 'Box, Large (4.5 Cf) 18X18X24', quantity: 25, volume: 5 },
    { name: 'Box, Wardrobe', quantity: 6, volume: 13 },
    { name: 'Box, China/Dish 18X18X28', quantity: 5, volume: 5 },
    { name: 'Box, Extra Large 23X23X16', quantity: 5, volume: 6 },
  ];
}

export function estimateWeight(cuFt: number): number {
  return Math.round(cuFt * LBS_PER_CU_FT);
}