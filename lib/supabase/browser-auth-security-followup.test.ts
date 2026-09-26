import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { requestMagicLink } from '../auth/request-magic-link';
import {
  buildCountyServiceClient,
  countyServiceClientBuilds,
  countyServiceRoleTarget,
  fetchPublishedCountyCredentialsForPublicProfile,
} from '../county-regulatory/shared/fetch-published-county-credentials';
import {
  createPublicSupabaseClient,
  publicSupabaseClientBuilds,
  publicSupabasePrivilegedTarget,
} from '../local-movers/public-supabase';
import { CANONICAL_SUPABASE_URL, ISOLATED_MOVE_BROWSER_SUPABASE_URL } from './canonical-project';

const PROD = 'arepfylnilkjmyduhwbz';
const ISO = 'zvoijbohtyuhqfuvteoy';
const KEYS = [
  'VERCEL_ENV',
  'NEXT_PUBLIC_VERCEL_ENV',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED',
  'NEXT_PUBLIC_MOVE_ISOLATED_AUTH_ORIGIN',
] as const;

function jwt(ref: string, role: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ iss: 'supabase', ref, role })).toString('base64url');
  return `${header}.${payload}.sig`;
}

function withEnv(values: Record<string, string | undefined>, run: () => Promise<void> | void) {
  const saved = new Map<string, string | undefined>();
  for (const key of KEYS) saved.set(key, process.env[key]);
  for (const key of KEYS) delete process.env[key];
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined) process.env[key] = value;
  }
  const finish = () => {
    for (const [key, value] of saved) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
  try {
    const result = run();
    if (result && typeof (result as Promise<void>).then === 'function') {
      return (result as Promise<void>).finally(finish);
    }
    finish();
    return result;
  } catch (error) {
    finish();
    throw error;
  }
}

const isolated = {
  VERCEL_ENV: 'preview',
  NEXT_PUBLIC_SUPABASE_URL: ISOLATED_MOVE_BROWSER_SUPABASE_URL,
  NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED: '1',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(ISO, 'anon'),
  NEXT_PUBLIC_MOVE_ISOLATED_AUTH_ORIGIN: 'https://move-preview.example.com',
  SUPABASE_SERVICE_ROLE_KEY: jwt(PROD, 'service_role'),
};

test('isolated county reads do not build a service-role client or call production', async () => {
  await withEnv(isolated, async () => {
    const before = countyServiceClientBuilds.count;
    assert.equal(countyServiceRoleTarget(), null);
    const rows = await fetchPublishedCountyCredentialsForPublicProfile({
      companyId: 'company-1',
      sourceKey: 'fl-county',
    });
    assert.deepEqual(rows, []);
    assert.equal(countyServiceClientBuilds.count, before);
  });
});

test('production county reads stay on the canonical service-role target', async () => {
  await withEnv(
    {
      VERCEL_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: CANONICAL_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(PROD, 'anon'),
      SUPABASE_SERVICE_ROLE_KEY: jwt(PROD, 'service_role'),
    },
    async () => {
      const before = countyServiceClientBuilds.count;
      const target = countyServiceRoleTarget();
      assert.equal(target?.url, CANONICAL_SUPABASE_URL);
      assert.equal(target?.url.includes(ISO), false);
      assert.equal(target?.key, jwt(PROD, 'service_role'));
      const client = buildCountyServiceClient();
      assert.notEqual(client, null);
      assert.equal(countyServiceClientBuilds.count, before + 1);
    }
  );
});

test('isolated public supabase helper builds no privileged client', () => {
  withEnv(isolated, () => {
    const before = publicSupabaseClientBuilds.count;
    assert.equal(publicSupabasePrivilegedTarget(), null);
    assert.equal(createPublicSupabaseClient(), null);
    assert.equal(publicSupabaseClientBuilds.count, before);
  });
});

test('public supabase privileged fallback stays on the canonical project', () => {
  withEnv(
    {
      VERCEL_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: CANONICAL_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: jwt(PROD, 'service_role'),
    },
    () => {
      const before = publicSupabaseClientBuilds.count;
      const target = publicSupabasePrivilegedTarget();
      assert.equal(target?.url, CANONICAL_SUPABASE_URL);
      assert.equal(target?.url.includes(ISO), false);
      assert.equal(target?.key, jwt(PROD, 'service_role'));
      const client = createPublicSupabaseClient();
      assert.notEqual(client, null);
      assert.equal(publicSupabaseClientBuilds.count, before + 1);
    }
  );
});

test('isolated magic link does not create users or use production admin or Resend', async () => {
  await withEnv(isolated, async () => {
    const otp: Array<{ options: { shouldCreateUser: boolean } }> = [];
    const adminCalls: string[] = [];
    const resendCalls: string[] = [];
    const result = await requestMagicLink(
      { email: 'unknown@example.com' },
      {
        session: async () => ({
          auth: {
            signInWithOtp: async (args) => {
              otp.push(args);
              return { error: { message: 'Signups not allowed for otp', code: 'otp_disabled' } };
            },
          },
        }),
        admin: () => {
          adminCalls.push('admin');
          return {
            auth: {
              admin: {
                generateLink: async () => {
                  adminCalls.push('generateLink');
                  return { data: {}, error: null };
                },
              },
            },
          };
        },
        adminConfigured: () => true,
        resendReady: () => {
          resendCalls.push('ready');
          return true;
        },
        sendResend: async () => {
          resendCalls.push('send');
          return { ok: true };
        },
      }
    );
    assert.equal(result.ok, false);
    assert.equal(otp.length, 1);
    assert.equal(otp[0].options.shouldCreateUser, false);
    assert.deepEqual(adminCalls, []);
    assert.equal(resendCalls.includes('send'), false);
    if (!result.ok) assert.equal(result.error.includes('unknown@example.com'), false);
  });
});

test('non-isolated magic link still allows signup and can use the admin path', async () => {
  await withEnv(
    {
      VERCEL_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: CANONICAL_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(PROD, 'anon'),
    },
    async () => {
      const otp: Array<{ options: { shouldCreateUser: boolean } }> = [];
      const adminCalls: string[] = [];
      await requestMagicLink(
        { email: 'person@example.com' },
        {
          session: async () => ({
            auth: {
              signInWithOtp: async (args) => {
                otp.push(args);
                return { error: null };
              },
            },
          }),
          admin: () => {
            adminCalls.push('admin');
            return { auth: { admin: { generateLink: async () => ({ data: {}, error: { message: 'skip' } }) } } };
          },
          adminConfigured: () => false,
          resendReady: () => false,
          sendResend: async () => ({ ok: true }),
        }
      );
      assert.equal(otp[0].options.shouldCreateUser, true);
      assert.deepEqual(adminCalls, []);

      const generated: string[] = [];
      const sent: string[] = [];
      const branded = await requestMagicLink(
        { email: 'person@example.com' },
        {
          session: async () => {
            throw new Error('otp');
          },
          admin: () => ({
            auth: {
              admin: {
                generateLink: async () => {
                  generated.push('generateLink');
                  return {
                    data: { properties: { hashed_token: 'hash', verification_type: 'magiclink' } },
                    error: null,
                  };
                },
              },
            },
          }),
          adminConfigured: () => true,
          resendReady: () => true,
          sendResend: async () => {
            sent.push('send');
            return { ok: true };
          },
        }
      );
      assert.equal(branded.ok, true);
      assert.deepEqual(generated, ['generateLink']);
      assert.deepEqual(sent, ['send']);
    }
  );
});

test('live server code does not pair the browser URL with the service-role key', () => {
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const hits: string[] = [];
  const pairing =
    /createClient(?:\s*<[^>]{0,160}>)?\s*\([^)]{0,300}getSupabaseUrl\(\)!?[^)]{0,300}getSupabaseServiceRoleKey\(\)/;
  const rawUrlKey =
    /createClient(?:\s*<[^>]{0,160}>)?\s*\(\s*url\s*,\s*getSupabaseServiceRoleKey\(\)/;
  function walk(dir: string) {
    for (const name of readdirSync(dir)) {
      if (name === 'node_modules' || name === '.next' || name === 'scripts') continue;
      const path = join(dir, name);
      if (statSync(path).isDirectory()) {
        walk(path);
        continue;
      }
      if (!/\.(ts|tsx|mjs|js)$/.test(name) || name.endsWith('.test.ts')) continue;
      const source = readFileSync(path, 'utf8').replace(/\s+/g, ' ');
      const rel = relative(root, path).replaceAll('\\', '/');
      if (!rel.startsWith('lib/') && !rel.startsWith('app/') && !rel.startsWith('actions/')) continue;
      if (pairing.test(source) || rawUrlKey.test(source)) hits.push(rel);
    }
  }
  walk(root);
  assert.deepEqual(hits, []);
});
