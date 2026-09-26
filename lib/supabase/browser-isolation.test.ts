import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  CANONICAL_SUPABASE_URL,
  ISOLATED_MOVE_BROWSER_SUPABASE_URL,
} from './canonical-project';
import { createAdminClient } from './admin';
import {
  getServiceRoleSupabaseTarget,
  getSupabaseAnonKey,
  getSupabaseUrl,
  isIsolatedMoveBrowserAuthAdmitted,
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from './config';
import {
  approvedIsolatedAuthOrigin,
  ensureProductionOAuthUrl,
  productionAuthRedirect,
} from '../save-my-move/redirect';

const PROD = 'arepfylnilkjmyduhwbz';
const ISO = 'zvoijbohtyuhqfuvteoy';
const OTHER = 'bbbbbbbbbbbbbbbbbbbb';
const KEYS = [
  'VERCEL_ENV',
  'NEXT_PUBLIC_VERCEL_ENV',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED',
  'NEXT_PUBLIC_MOVE_ISOLATED_AUTH_ORIGIN',
  'ALLOW_NON_CANONICAL_SUPABASE',
  'ENFORCE_CANONICAL_SUPABASE',
  'CI',
] as const;

function jwt(ref: string, role: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ iss: 'supabase', ref, role })).toString('base64url');
  return `${header}.${payload}.sig`;
}

function withEnv(values: Record<string, string | undefined>, run: () => void) {
  const saved = new Map<string, string | undefined>();
  for (const key of KEYS) saved.set(key, process.env[key]);
  for (const key of KEYS) delete process.env[key];
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined) process.env[key] = value;
  }
  try {
    run();
  } finally {
    for (const [key, value] of saved) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

const previewIsolated = {
  VERCEL_ENV: 'preview',
  NEXT_PUBLIC_SUPABASE_URL: ISOLATED_MOVE_BROWSER_SUPABASE_URL,
  NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED: '1',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(ISO, 'anon'),
  NEXT_PUBLIC_MOVE_ISOLATED_AUTH_ORIGIN: 'https://move-preview.example.com',
};

test('production rejects the isolated project even with approval', () => {
  withEnv(
    {
      VERCEL_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: ISOLATED_MOVE_BROWSER_SUPABASE_URL,
      NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED: '1',
      ALLOW_NON_CANONICAL_SUPABASE: '1',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(ISO, 'anon'),
    },
    () => {
      assert.equal(isIsolatedMoveBrowserAuthAdmitted(), false);
      assert.throws(() => getSupabaseUrl(), /must be/);
    }
  );
});

test('preview without approval rejects the isolated project', () => {
  withEnv(
    {
      ...previewIsolated,
      NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED: undefined,
    },
    () => {
      assert.equal(isIsolatedMoveBrowserAuthAdmitted(), false);
      assert.equal(getSupabaseUrl(), undefined);
    }
  );
});

test('preview approval does not admit a different project', () => {
  withEnv(
    {
      VERCEL_ENV: 'preview',
      NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED: '1',
      NEXT_PUBLIC_SUPABASE_URL: `https://${OTHER}.supabase.co`,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(OTHER, 'anon'),
    },
    () => {
      assert.equal(isIsolatedMoveBrowserAuthAdmitted(), false);
      assert.equal(getSupabaseUrl(), undefined);
    }
  );
});

test('preview admits only the exact isolated URL with approval', () => {
  withEnv(previewIsolated, () => {
    assert.equal(isIsolatedMoveBrowserAuthAdmitted(), true);
    assert.equal(getSupabaseUrl(), ISOLATED_MOVE_BROWSER_SUPABASE_URL);
    assert.equal(isSupabaseConfigured(), true);
  });
});

test('malformed and decorated isolated URLs are rejected', () => {
  for (const url of [
    'not a url',
    'http://zvoijbohtyuhqfuvteoy.supabase.co',
    `${ISOLATED_MOVE_BROWSER_SUPABASE_URL}?x=1`,
    `${ISOLATED_MOVE_BROWSER_SUPABASE_URL}#frag`,
    'https://user:pass@zvoijbohtyuhqfuvteoy.supabase.co',
    `${ISOLATED_MOVE_BROWSER_SUPABASE_URL}/auth/v1`,
  ]) {
    withEnv(
      {
        VERCEL_ENV: 'preview',
        NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED: '1',
        NEXT_PUBLIC_SUPABASE_URL: url,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(ISO, 'anon'),
      },
      () => {
        assert.equal(isIsolatedMoveBrowserAuthAdmitted(), false, url);
        assert.equal(getSupabaseUrl(), undefined, url);
      }
    );
  }
});

test('production canonical browser config is unchanged', () => {
  withEnv(
    {
      VERCEL_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: CANONICAL_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'fixture-anon-not-a-jwt',
      SUPABASE_SERVICE_ROLE_KEY: 'fixture-service-not-a-jwt',
    },
    () => {
      assert.equal(isIsolatedMoveBrowserAuthAdmitted(), false);
      assert.equal(getSupabaseUrl(), CANONICAL_SUPABASE_URL);
      assert.equal(getSupabaseAnonKey(), 'fixture-anon-not-a-jwt');
      const target = getServiceRoleSupabaseTarget();
      assert.equal(target?.url, CANONICAL_SUPABASE_URL);
      assert.equal(target?.key, 'fixture-service-not-a-jwt');
    }
  );
});

test('isolated URL cannot pair with the production anon key', () => {
  withEnv(
    {
      ...previewIsolated,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(PROD, 'anon'),
    },
    () => {
      assert.equal(getSupabaseUrl(), ISOLATED_MOVE_BROWSER_SUPABASE_URL);
      assert.equal(getSupabaseAnonKey(), undefined);
      assert.equal(isSupabaseConfigured(), false);
    }
  );
});

test('production URL cannot pair with the isolated anon key', () => {
  withEnv(
    {
      VERCEL_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: CANONICAL_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(ISO, 'anon'),
    },
    () => {
      assert.equal(getSupabaseAnonKey(), undefined);
      assert.equal(isSupabaseConfigured(), false);
    }
  );
});

test('isolated admission returns no service-role target before any production fallback', () => {
  withEnv(
    {
      ...previewIsolated,
      SUPABASE_SERVICE_ROLE_KEY: jwt(PROD, 'service_role'),
    },
    () => {
      assert.equal(isIsolatedMoveBrowserAuthAdmitted(), true);
      assert.equal(getServiceRoleSupabaseTarget(), null);
      assert.equal(isSupabaseAdminConfigured(), false);
      assert.throws(() => createAdminClient(), /SUPABASE_SERVICE_ROLE_KEY/);
    }
  );
});

test('without isolation a production service-role key stays on the production project', () => {
  withEnv(
    {
      VERCEL_ENV: 'preview',
      NEXT_PUBLIC_SUPABASE_URL: CANONICAL_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(PROD, 'anon'),
      SUPABASE_SERVICE_ROLE_KEY: jwt(PROD, 'service_role'),
    },
    () => {
      assert.equal(isIsolatedMoveBrowserAuthAdmitted(), false);
      const target = getServiceRoleSupabaseTarget();
      assert.equal(target?.url, CANONICAL_SUPABASE_URL);
      assert.equal(target?.key, jwt(PROD, 'service_role'));
      assert.equal(isSupabaseAdminConfigured(), true);
    }
  );
});

test('isolated service-role key is not aimed at production or the isolated URL', () => {
  withEnv(
    {
      VERCEL_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: CANONICAL_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: jwt(ISO, 'service_role'),
    },
    () => {
      assert.equal(getServiceRoleSupabaseTarget(), null);
    }
  );
  withEnv(
    {
      ...previewIsolated,
      SUPABASE_SERVICE_ROLE_KEY: jwt(ISO, 'service_role'),
    },
    () => {
      assert.equal(getServiceRoleSupabaseTarget(), null);
    }
  );
});

test('unprovable service-role key is refused when the public URL is isolated', () => {
  withEnv(
    {
      ...previewIsolated,
      SUPABASE_SERVICE_ROLE_KEY: 'fixture-service-not-a-jwt',
    },
    () => {
      assert.equal(getServiceRoleSupabaseTarget(), null);
    }
  );
});

test('isolated auth callback stays off the production origin', () => {
  withEnv(previewIsolated, () => {
    assert.equal(approvedIsolatedAuthOrigin(), 'https://move-preview.example.com');
    assert.equal(
      productionAuthRedirect('/my-move'),
      'https://move-preview.example.com/my-move'
    );
    const oauth = ensureProductionOAuthUrl(
      'https://zvoijbohtyuhqfuvteoy.supabase.co/auth/v1/authorize?redirect_to=' +
        encodeURIComponent('https://www.movetrusthub.com/auth/callback')
    );
    assert.equal(oauth.includes('www.movetrusthub.com'), false);
    assert.match(oauth, /redirect_to=https%3A%2F%2Fmove-preview\.example\.com%2Fauth%2Fcallback/);
  });
  withEnv(
    { ...previewIsolated, NEXT_PUBLIC_MOVE_ISOLATED_AUTH_ORIGIN: 'https://www.movetrusthub.com' },
    () => {
      assert.equal(approvedIsolatedAuthOrigin(), null);
      assert.throws(() => productionAuthRedirect('/auth/callback'), /not used/);
    }
  );
  withEnv(
    { ...previewIsolated, NEXT_PUBLIC_MOVE_ISOLATED_AUTH_ORIGIN: undefined },
    () => {
      assert.throws(() => productionAuthRedirect('/my-move'), /not used/);
    }
  );
});

test('production auth redirect stays on movetrusthub.com', () => {
  withEnv(
    {
      VERCEL_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: CANONICAL_SUPABASE_URL,
      NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED: '1',
      NEXT_PUBLIC_MOVE_ISOLATED_AUTH_ORIGIN: 'https://move-preview.example.com',
    },
    () => {
      assert.equal(productionAuthRedirect('/my-move'), 'https://www.movetrusthub.com/my-move');
    }
  );
});

test('service-role constructors do not read the browser URL', () => {
  const admin = readFileSync(new URL('./admin.ts', import.meta.url), 'utf8');
  const ask = readFileSync(new URL('../move-ask/execute.ts', import.meta.url), 'utf8');
  const backfill = readFileSync(new URL('../verification/run-production-backfill.ts', import.meta.url), 'utf8');
  assert.equal(admin.includes('getSupabaseUrl'), false);
  assert.match(admin, /getServiceRoleSupabaseTarget/);
  assert.match(ask, /getServiceRoleSupabaseTarget/);
  assert.equal(ask.includes('getSupabaseUrl()'), false);
  assert.match(backfill, /getServiceRoleSupabaseTarget/);
  assert.equal(backfill.includes('createClient(url, serviceKey'), false);
});
