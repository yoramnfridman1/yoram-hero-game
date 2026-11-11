const CACHE = 'yoram-hero-candy-final-art-v2';
const ASSETS = ['./', './index.html', './assets/yoram-full-body-cutout.png', './assets/yoram-portrait-cutout.png', './assets/fruit-symbols.svg', ...Array.from({length:10}, (_, i) => './assets/scenes/chapter-' + String(i + 1).padStart(2, '0') + '.jpg')];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).catch(() => caches.open(CACHE).then(cache => cache.match(event.request))));
});
