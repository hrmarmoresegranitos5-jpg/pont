/* ══════════════════════════════════════════════════════════
   SERVICE WORKER — Sistema de Ponto
   Estratégia: Cache First para assets, Network First para dados
══════════════════════════════════════════════════════════ */

const CACHE_NAME = 'ponto-v2';
const ASSETS = [
  './',
  './index.html',
  './gerente.html',
  './manifest.json',
];

/* ── INSTALL ──────────────────────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

/* ── ACTIVATE ─────────────────────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ── FETCH ────────────────────────────────────────────── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // GitHub API e outros externos: Network only (sem cache)
  if (url.hostname === 'api.github.com' || url.origin !== self.location.origin) {
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // Assets locais: Cache First, fallback para network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      }).catch(() => {
        // Fallback para index.html (SPA)
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

/* ── SYNC em background (quando volta online) ─────────── */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-ponto') {
    // O app lida com o sync ao voltar online
    console.log('[SW] Background sync: sync-ponto');
  }
});
