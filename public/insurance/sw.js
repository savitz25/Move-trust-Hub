/* InsuranceTrustHub PWA service worker — scope: / (registered as /sw.js on ITH host)
 * Conservative: network-first HTML, no private account cache, offline fallback.
 */
const VERSION = 'ith-pwa-v1';
const PRECACHE = `${VERSION}-shell`;
const RUNTIME = `${VERSION}-runtime`;

const PRECACHE_URLS = [
  '/',
  '/offline',
  '/tools',
  '/directory',
  '/manifest.webmanifest',
  '/insurance/brand/insurance-trust-hub-icon-192.png?v=20260728r2',
  '/insurance/brand/insurance-trust-hub-icon.png?v=20260728r2',
];

/** Paths that must never be stored (auth / account / APIs). */
function isPrivatePath(pathname) {
  if (!pathname) return false;
  if (pathname.startsWith('/api')) return true;
  if (pathname.startsWith('/my-insurance')) return true;
  if (pathname.startsWith('/admin')) return true;
  if (pathname.startsWith('/insurance/admin')) return true;
  if (pathname.includes('/auth') || pathname.includes('/login')) return true;
  if (pathname.startsWith('/_next/data')) return true;
  return false;
}

function isStaticAsset(url) {
  const p = url.pathname;
  return (
    p.startsWith('/_next/static/') ||
    p.startsWith('/insurance/brand/') ||
    p.startsWith('/fonts/') ||
    /\.(?:js|css|woff2?|png|jpg|jpeg|gif|webp|avif|svg|ico)$/i.test(p)
  );
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k.startsWith('ith-pwa-') && k !== PRECACHE && k !== RUNTIME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }

  // Same-origin only
  if (url.origin !== self.location.origin) return;

  if (isPrivatePath(url.pathname)) {
    // Network only — never cache personalized or auth responses
    event.respondWith(fetch(req).catch(() => caches.match('/offline')));
    return;
  }

  // Navigations: network-first, offline fallback
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // Optionally keep a copy of successful HTML shells for soft offline (non-private only)
          if (res.ok && res.type === 'basic') {
            const copy = res.clone();
            caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          const offline = await caches.match('/offline');
          return offline || new Response('You are offline.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        })
    );
    return;
  }

  // Static assets: stale-while-revalidate
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.open(RUNTIME).then(async (cache) => {
        const cached = await cache.match(req);
        const network = fetch(req)
          .then((res) => {
            if (res.ok) cache.put(req, res.clone()).catch(() => {});
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Default: network-first with runtime cache
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
