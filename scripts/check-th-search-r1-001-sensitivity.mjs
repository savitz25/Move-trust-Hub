import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const report = [];
for (const mutation of [
  { file: 'lib/move-ask/identifier.ts', from: "const value = groups.join('');", to: 'const value = groups[0]!;', name: 'truncate-spaced-identifier' },
  { file: 'lib/move-ask/execute.ts', from: 'records ${labels}.', to: 'records USDOT 3244.', name: 'false-returned-identifier-explanation' },
]) {
  const original = readFileSync(mutation.file, 'utf8');
  assert.ok(original.includes(mutation.from), `Mutation target absent: ${mutation.name}`);
  try {
    writeFileSync(mutation.file, original.replace(mutation.from, mutation.to));
    const run = spawnSync(process.execPath, ['node_modules/tsx/dist/cli.mjs', '--require', './scripts/stub-server-only.cjs', '--test', '--test-name-pattern', 'identifier variants', 'lib/move-ask/r1-behavior.test.ts'], { encoding: 'utf8', timeout: 45000 });
    assert.ok(run.status !== null && run.status !== 0, `Gate failed to detect ${mutation.name}`);
    assert.match(run.stdout + run.stderr, /AssertionError|ERR_ASSERTION/);
    report.push({ mutation: mutation.name, exitCode: run.status, detectedByBehavioralAssertion: true });
  } finally { writeFileSync(mutation.file, original); }
  assert.equal(readFileSync(mutation.file, 'utf8'), original);
}
console.log(JSON.stringify({ testedAt: new Date().toISOString(), mutations: report, originalFilesRestored: true }, null, 2));
