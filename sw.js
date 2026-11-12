const CACHE = 'yoram-hero-visible-update-v1';
const COUNTS = [8,10,12,12,12,15,15,18,18,20];
const ASSETS = ['./', './index.html', './assets/yoram-full-body-cutout.png', './assets/yoram-portrait-cutout.png', './assets/blender/game.css',
  ...['cover','ball','shield','plane','heart','faith',...['apple','grape','orange','strawberry','peach','pineapple','banana','cherry','kiwi','watermelon'].map(n=>'fruit-'+n)].map(n=>'./assets/blender/'+n+'.webp'),
  ...COUNTS.flatMap((count,i)=>[...Array.from({length:count+1},(_,n)=>'./assets/blender/world-'+(i+1)+'-'+n+'.webp'),'./assets/album/chapter-'+String(i+1).padStart(2,'0')+'.webp'])];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('message', event => {
  if (event.data?.type === 'GAME_VERSION' && event.ports[0]) event.ports[0].postMessage({cache:CACHE});
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).catch(() => caches.open(CACHE).then(cache => cache.match(event.request)).then(response => response || Response.error())));
});
