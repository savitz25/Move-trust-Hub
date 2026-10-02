import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CANONICAL_SUPABASE_URL,
  ISOLATED_MOVE_BROWSER_SUPABASE_URL,
} from '../lib/supabase/canonical-project';
import { assessSupabaseProjectGuard } from './supabase-project-guard';

const ISO = 'zvoijbohtyuhqfuvteoy';
const OTHER = 'othertestproject11111';
const KEYS = [
  'VERCEL_ENV',
  'NEXT_PUBLIC_VERCEL_ENV',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED',
  'ALLOW_NON_CANONICAL_SUPABASE',
  'ENFORCE_CANONICAL_SUPABASE',
  'CI',
  'NODE_ENV',
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

const isolatedPreview = {
  VERCEL_ENV: 'preview',
  NEXT_PUBLIC_SUPABASE_URL: ISOLATED_MOVE_BROWSER_SUPABASE_URL,
  NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED: '1',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(ISO, 'anon'),
};

test('preview canonical project still passes', () => {
  withEnv({ VERCEL_ENV: 'preview', NEXT_PUBLIC_SUPABASE_URL: CANONICAL_SUPABASE_URL }, () => {
    const result = assessSupabaseProjectGuard();
    assert.equal(result.ok, true);
    if (result.ok) assert.equal(result.mode, 'vercel-canonical');
  });
});

test('preview exact isolated URL with approval passes', () => {
  withEnv(isolatedPreview, () => {
    const result = assessSupabaseProjectGuard();
    assert.equal(result.ok, true);
    if (result.ok) assert.equal(result.mode, 'isolated');
  });
});

test('preview exact isolated URL without approval fails', () => {
  withEnv({ ...isolatedPreview, NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED: undefined }, () => {
    const result = assessSupabaseProjectGuard();
    assert.equal(result.ok, false);
  });
});

test('preview approval does not admit a different project', () => {
  withEnv(
    {
      VERCEL_ENV: 'preview',
      NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED: '1',
      NEXT_PUBLIC_SUPABASE_URL: `https://${OTHER}.supabase.co`,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(OTHER, 'anon'),
      ALLOW_NON_CANONICAL_SUPABASE: '1',
    },
    () => {
      assert.equal(assessSupabaseProjectGuard().ok, false);
    }
  );
});

test('preview decorated isolated URLs fail', () => {
  for (const url of [
    `http://${ISO}.supabase.co`,
    `${ISOLATED_MOVE_BROWSER_SUPABASE_URL}?x=1`,
    `${ISOLATED_MOVE_BROWSER_SUPABASE_URL}#frag`,
    `https://user:pass@${ISO}.supabase.co`,
    `${ISOLATED_MOVE_BROWSER_SUPABASE_URL}/auth/v1`,
  ]) {
    withEnv({ ...isolatedPreview, NEXT_PUBLIC_SUPABASE_URL: url }, () => {
      assert.equal(assessSupabaseProjectGuard().ok, false, url);
    });
  }
});

test('preview isolated URL rejects a non-anon or mismatched key', () => {
  withEnv({ ...isolatedPreview, NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt(ISO, 'service_role') }, () => {
    assert.equal(assessSupabaseProjectGuard().ok, false);
  });
  withEnv(
    { ...isolatedPreview, NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt('arepfylnilkjmyduhwbz', 'anon') },
    () => {
      assert.equal(assessSupabaseProjectGuard().ok, false);
    }
  );
});

test('production canonical project passes', () => {
  withEnv(
    {
      VERCEL_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: CANONICAL_SUPABASE_URL,
      NEXT_PUBLIC_VERCEL_ENV: 'preview',
      NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED: '1',
    },
    () => {
      const result = assessSupabaseProjectGuard();
      assert.equal(result.ok, true);
      if (result.ok) assert.equal(result.mode, 'production');
    }
  );
});

test('production rejects the isolated project even with approval', () => {
  withEnv(
    {
      ...isolatedPreview,
      VERCEL_ENV: 'production',
      NEXT_PUBLIC_VERCEL_ENV: 'preview',
    },
    () => {
      assert.equal(assessSupabaseProjectGuard().ok, false);
    }
  );
});

test('production rejects the isolated project when the old escape is set', () => {
  withEnv(
    {
      ...isolatedPreview,
      VERCEL_ENV: 'production',
      ALLOW_NON_CANONICAL_SUPABASE: '1',
    },
    () => {
      assert.equal(assessSupabaseProjectGuard().ok, false);
    }
  );
});

test('production rejects a wrong project', () => {
  withEnv(
    {
      VERCEL_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: `https://${OTHER}.supabase.co`,
      ALLOW_NON_CANONICAL_SUPABASE: '1',
    },
    () => {
      assert.equal(assessSupabaseProjectGuard().ok, false);
    }
  );
});

test('local escape stays off production and does not apply to a Vercel env', () => {
  withEnv(
    {
      ENFORCE_CANONICAL_SUPABASE: '1',
      ALLOW_NON_CANONICAL_SUPABASE: '1',
      NEXT_PUBLIC_SUPABASE_URL: `https://${OTHER}.supabase.co`,
    },
    () => {
      const result = assessSupabaseProjectGuard();
      assert.equal(result.ok, true);
      if (result.ok) assert.equal(result.mode, 'local');
    }
  );
  withEnv(
    {
      NEXT_PUBLIC_SUPABASE_URL: `https://${OTHER}.supabase.co`,
    },
    () => {
      assert.equal(assessSupabaseProjectGuard().ok, true);
    }
  );
});
