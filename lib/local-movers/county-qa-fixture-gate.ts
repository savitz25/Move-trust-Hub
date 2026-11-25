/**
 * Edge-safe gate for the county QA fixture.
 * Middleware may import this file. Keep it free of server packages, node crypto,
 * geography, a database client, cache tags, and path revalidation.
 * The fixture is default-off. Production project identity never activates it.
 */

export const COUNTY_QA_FIXTURE_ENV = 'COUNTY_QA_FIXTURE';
export const COUNTY_QA_PROJECT_ID_ENV = 'COUNTY_QA_PROJECT_ID';
export const COUNTY_QA_PROJECT_NAME_ENV = 'COUNTY_QA_PROJECT_NAME';
export const COUNTY_QA_FIXTURE_ON = '1';

export const PRODUCTION_VERCEL_PROJECT_ID = 'prj_gudPGeW9SZBkgiL8zxvi3Swfo6T0';
export const PRODUCTION_VERCEL_PROJECT_NAME = 'move-trust-hub';

export const COUNTY_QA_STATE_SLUG = 'florida';
export const COUNTY_QA_TARGET_SLUG = 'qa-cache-fixture';
export const COUNTY_QA_CONTROL_SLUG = 'qa-cache-control';
export const COUNTY_QA_TARGET_PATH = '/local-movers/florida/qa-cache-fixture';
export const COUNTY_QA_CONTROL_PATH = '/local-movers/florida/qa-cache-control';

export const COUNTY_QA_TARGET_LABEL = 'county-florida-qa-cache-fixture';
export const COUNTY_QA_CONTROL_LABEL = 'county-florida-qa-cache-control';

function exactEnv(name: string): string | undefined {
  const value = process.env[name];
  return typeof value === 'string' ? value : undefined;
}

/** True only for an exact non-production project match. No trim. */
export function countyQaFixtureActive(): boolean {
  if (exactEnv(COUNTY_QA_FIXTURE_ENV) !== COUNTY_QA_FIXTURE_ON) return false;

  const expectedId = exactEnv(COUNTY_QA_PROJECT_ID_ENV);
  const expectedName = exactEnv(COUNTY_QA_PROJECT_NAME_ENV);
  const projectId = exactEnv('VERCEL_PROJECT_ID');
  const projectName = exactEnv('VERCEL_PROJECT_NAME');
  if (!expectedId || !expectedName || !projectId || !projectName) return false;
  if (expectedId !== projectId || expectedName !== projectName) return false;
  if (
    projectId === PRODUCTION_VERCEL_PROJECT_ID ||
    projectName === PRODUCTION_VERCEL_PROJECT_NAME ||
    expectedId === PRODUCTION_VERCEL_PROJECT_ID ||
    expectedName === PRODUCTION_VERCEL_PROJECT_NAME
  ) {
    return false;
  }
  return true;
}

export function isCountyQaFixturePath(pathname: string): boolean {
  return pathname === COUNTY_QA_TARGET_PATH || pathname === COUNTY_QA_CONTROL_PATH;
}

/**
 * Middleware skips the unknown-county 404 only for this request.
 * Geography stays unresolved, so the fixture-off 404 test remains valid.
 */
export function countyQaFixtureRequestAllowed(pathname: string): boolean {
  return countyQaFixtureActive() && isCountyQaFixturePath(pathname);
}
