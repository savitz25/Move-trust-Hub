/** Stub server-only + next/cache.unstable_cache for tsx scripts outside Next runtime. */
const Module = require('module');
const originalLoad = Module._load;

Module._load = function stubServerOnlyAndCache(request, parent, isMain) {
  if (request === 'server-only') {
    return {};
  }
  if (request === 'next/cache') {
    let real = {};
    try {
      real = originalLoad.call(this, request, parent, isMain) || {};
    } catch {
      real = {};
    }
    return {
      ...real,
      // Passthrough — no ISR cache outside Next request context.
      unstable_cache: (fn) => fn,
      revalidateTag: real.revalidateTag || (() => undefined),
      revalidatePath: real.revalidatePath || (() => undefined),
    };
  }
  return originalLoad.call(this, request, parent, isMain);
};
