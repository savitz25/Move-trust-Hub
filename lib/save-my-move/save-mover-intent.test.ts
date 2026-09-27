import test from 'node:test';
import assert from 'node:assert/strict';
import { saveMoverIntent, type MoverSaveDependencies } from './save-mover-intent';

const profile = { companySlug: 'b3-test-mover', companyName: 'B3 Test Mover' };
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(done => { resolve = done; });
  return { promise, resolve };
}
function setup(user: Promise<{ id: string } | null>) {
  const local: unknown[] = [];
  const cloud: unknown[] = [];
  const dependencies: MoverSaveDependencies = {
    resolveUser: () => user,
    persistLocal: input => local.push(input),
    saveCloud: async input => { cloud.push(input); return { ok: true, cloud: true }; },
  };
  return { local, cloud, dependencies };
}

test('B3-05: loading-to-guest waits, then executes the captured profile once', async () => {
  const auth = deferred<null>();
  const env = setup(auth.promise);
  const pending = saveMoverIntent(profile, new AbortController().signal, env.dependencies);
  assert.equal(env.local.length, 0);
  auth.resolve(null);
  assert.deepEqual(await pending, { destination: 'device', cloudFailed: false });
  assert.deepEqual(env.local, [profile]);
  assert.deepEqual(env.cloud, []);
});

test('B3-05/B3-06 mocked: loading-to-user preserves slug and binds cloud save to resolved owner', async () => {
  const auth = deferred<{ id: string }>();
  const env = setup(auth.promise);
  const pending = saveMoverIntent(profile, new AbortController().signal, env.dependencies);
  assert.equal(env.local.length, 0);
  auth.resolve({ id: 'isolated-test-owner' });
  assert.deepEqual(await pending, { destination: 'account', cloudFailed: false, confirmedUserId: 'isolated-test-owner' });
  assert.deepEqual(env.cloud, [{ companySlug: profile.companySlug, expectedUserId: 'isolated-test-owner' }]);
  assert.deepEqual(env.local, [profile]);
});

test('B3-07: navigation cancels delayed auth without local or account writes', async () => {
  const auth = deferred<{ id: string }>();
  const env = setup(auth.promise);
  const controller = new AbortController();
  const pending = saveMoverIntent(profile, controller.signal, env.dependencies);
  controller.abort();
  auth.resolve({ id: 'later-owner' });
  await assert.rejects(pending, { name: 'AbortError' });
  assert.deepEqual(env.local, []);
  assert.deepEqual(env.cloud, []);
});

test('B3-08: auth errors are not guests and cannot write', async () => {
  const env = setup(Promise.reject(new Error('Auth unavailable')));
  await assert.rejects(saveMoverIntent(profile, new AbortController().signal, env.dependencies), /Auth unavailable/);
  assert.equal(env.local.length + env.cloud.length, 0);
});

test('B3-08: local write failure cannot call cloud or the success callback', async () => {
  const env = setup(Promise.resolve({ id: 'owner' }));
  let success = false;
  env.dependencies.persistLocal = () => { throw new Error('Storage blocked'); };
  env.dependencies.onLocalSaved = () => { success = true; };
  await assert.rejects(saveMoverIntent(profile, new AbortController().signal, env.dependencies), /Storage blocked/);
  assert.equal(success, false);
  assert.deepEqual(env.cloud, []);
});

test('B3-06 mocked: cloud failure honestly retains a successful device save', async () => {
  const env = setup(Promise.resolve({ id: 'owner' }));
  env.dependencies.saveCloud = async () => { throw new Error('Cloud unavailable'); };
  assert.deepEqual(await saveMoverIntent(profile, new AbortController().signal, env.dependencies),
    { destination: 'device', cloudFailed: true });
  assert.deepEqual(env.local, [profile]);
});
