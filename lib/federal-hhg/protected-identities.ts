/** Task 002 remediated identities — national staging must not overwrite these USDOTs. */
export const TASK_002_PROTECTED_IDENTITIES: Record<string, string | null> = {
  allied: '76235',
  mayflower: '125563',
  atlas: '125550',
  wheaton: '70719',
  arpin: '49922',
  national: '76628',
  'north-american': '70851',
  graebel: null,
  'northern-michigan-moving': '1398726',
  'northern-michigan-moving-2': '1398726',
};

export const FORBIDDEN_COPIED_USDOT_ASSIGNMENTS: ReadonlyArray<{
  companyId: string;
  forbiddenUsdot: string;
}> = [
  { companyId: 'allied', forbiddenUsdot: '125563' },
  { companyId: 'atlas', forbiddenUsdot: '125563' },
  { companyId: 'wheaton', forbiddenUsdot: '125563' },
  { companyId: 'arpin', forbiddenUsdot: '125563' },
  { companyId: 'graebel', forbiddenUsdot: '125563' },
  { companyId: 'national', forbiddenUsdot: '70851' },
];
