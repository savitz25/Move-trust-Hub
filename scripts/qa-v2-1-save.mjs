/** Local-only component harness. Real Save button/storage/runtime; mocked auth/cloud.
 * npm exec -- node scripts/qa-v2-1-save.mjs [--baseline]
 * No credentials, database, Next route, or production mutation endpoint.
 */
import { build } from 'esbuild';
import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';
import { resolve, basename } from 'node:path';

const baseline = process.argv.includes('--baseline');
const conversion = process.argv.includes('--conversion');
const root = process.cwd();
const entry = `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { SaveMoverButton } from './components/save-my-move/save-mover-button';
import { DeferredSaveMyMove } from './components/performance/deferred-save-my-move';
import { Ctx, DEFERRED_FALLBACK } from './components/save-my-move/save-my-move-context';
window.b3 = {
  cloud: [], analytics: [], authCalls: 0, user: null, authError: null,
  wait: null, listener: null, pathname: '/companies/b3-test-mover',
  resolveAuth() { this.wait?.(); this.wait = null; },
  authEvent(id) { this.listener?.('SIGNED_IN', id ? { user: { id } } : null); },
  render(slug = 'b3-test-mover', variant = 'button') {
    this.pathname = '/companies/' + slug;
    root.render(<DeferredSaveMyMove><Ctx.Provider value={this.context ?? DEFERRED_FALLBACK}><main><h1>B3 isolated component fixture</h1>
      <SaveMoverButton companySlug={slug} companyName={slug} variant={variant} />
    </main></Ctx.Provider></DeferredSaveMyMove>);
  },
  accountContext(id, confirmed) {
    this.context = { ...DEFERRED_FALLBACK, loading: false, user: id ? {id} : null,
      isMoverSaved: () => true, isMoverAccountSaved: () => Boolean(id && confirmed) };
    this.render();
  }
};
${conversion ? `
window.b3.transferCalls=[];window.b3.parentState='unavailable';
const originalFetch=window.fetch.bind(window);
window.fetch=async (url,options)=>{
  if(url!=='/api/my-trusthub/profile-save')return originalFetch(url,options);
  const body=JSON.parse(options.body);window.b3.transferCalls.push(body);
  if(body.action==='bootstrap')return Response.json({csrf:'c'.repeat(43)});
  if(window.b3.delayTransfer)await new Promise(done=>window.b3.finishTransfer=done);
  return Response.json(body.action==='prepare' && window.b3.parentState==='continue'
    ? {state:'continue',ticket:'t'.repeat(43),target:'http://127.0.0.1:4322/my/profile-save',fields:{continuationRef:'r'.repeat(43)},localCopy:'keep'}
    : {state:window.b3.parentState,projectFailed:window.b3.projectFailed,localCopy:'keep'});
};
HTMLFormElement.prototype.submit=function(){window.b3.form={method:this.method,target:this.action,fields:Object.fromEntries(new FormData(this))};this.remove()};
` : ''}
const root = createRoot(document.getElementById('root'));
window.b3.render();
`;
const mocks = {
  'next/navigation': `export const usePathname = () => window.b3.pathname;`,
  '@/components/save-my-move/save-my-move-provider': `
    export { useSaveMyMove } from '${root.replaceAll('\\', '/')}/components/save-my-move/save-my-move-context';
    export function SaveMyMoveProvider() { return null; }`,
  '@/lib/supabase/client': `export function createBrowserSupabaseClient() { return { auth: {
    async getUser() {
      window.b3.authCalls++;
      if (window.b3.delayAuth) await new Promise(done => window.b3.wait = done);
      return { data: { user: window.b3.user }, error: window.b3.authError };
    },
    onAuthStateChange(callback) {
      window.b3.listener = callback;
      return { data: { subscription: { unsubscribe() { window.b3.listener = null; } } } };
    }
  } }; }`,
  '@/actions/save-my-move': `export async function saveMoverAction(input) {
    window.b3.cloud.push(input); return { ok: true, cloud: !window.b3.cloudFailed };
  }`,
  '@/components/ga-events': `export function trackSaveMyMoveMover(input) { window.b3.analytics.push(input); }`,
};
const result = await build({
  stdin: { contents: entry, resolveDir: root, loader: 'tsx' },
  bundle: true, write: false, format: 'esm', splitting: true,
  outdir: resolve(root, '.b3-memory'), chunkNames: '[name]-[hash]',
  jsx: 'automatic', define: { 'process.env.NODE_ENV': '"development"', 'process.env.NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED': JSON.stringify(conversion?'1':'0') },
  plugins: [{ name: 'isolated-adapters', setup(builder) {
    builder.onResolve({ filter: /.*/ }, args => mocks[args.path] ? { path: args.path, namespace: 'b3' } : null);
    builder.onLoad({ filter: /.*/, namespace: 'b3' }, args => ({ contents: mocks[args.path], loader: 'js', resolveDir: root }));
    if (baseline) builder.onLoad({ filter: /save-mover-button\.tsx$/ }, () => ({
      contents: execFileSync('git', ['show', '5018639dee0901bbc630cafdd633015421f86e00:components/save-my-move/save-mover-button.tsx'], { encoding: 'utf8' }),
      loader: 'tsx', resolveDir: resolve(root, 'components/save-my-move'),
    }));
  } }],
});
const assets = new Map(result.outputFiles.map(file => ['/' + basename(file.path), file.text]));
let delayRuntime = 0;
let failRuntime = false;
const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  if (url.pathname === '/control') {
    delayRuntime = Number(url.searchParams.get('delay') ?? 0);
    failRuntime = url.searchParams.get('fail') === '1';
    response.end('OK'); return;
  }
  if (assets.has(url.pathname)) {
    if (url.pathname.includes('save-mover-runtime')) {
      if (delayRuntime) await new Promise(done => setTimeout(done, delayRuntime));
      if (failRuntime) { response.writeHead(503); response.end('Test module failure'); return; }
    }
    response.setHeader('Content-Type', 'text/javascript');
    response.end(assets.get(url.pathname)); return;
  }
  response.setHeader('Content-Type', 'text/html');
  response.end('<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>B3 isolated Save QA</title><style>body{font:16px sans-serif;margin:16px}button{padding:12px}svg{width:16px;height:16px}span[role=status]{display:block;max-width:256px;overflow-wrap:anywhere}button:focus-visible{outline:3px solid blue}</style><div id="root"></div><script type="module" src="/stdin.js"></script></html>');
});
server.listen(4311, '127.0.0.1', () => console.log(`B3 ${baseline ? 'BASELINE' : 'HEAD'} harness: http://127.0.0.1:4311; auth/cloud MOCKED; conversion BFF MOCKED=${conversion}; provider deliberately never resolves.`));
