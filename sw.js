const CACHE = 'aim-v1';
const SHELL = [
'./', 'index.html', 'navigator.html', 'trainer.html', 'tools.html', 'research.html', 'resources.html', 'blog.html', 'report.html', 'request.html',
'site.css', 'site.js', 'flip.js', 'alerts.js', 'manifest.webmanifest',
'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png', 'trainers/index.json',
];
self.addEventListener('install', (e) => {
e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
const url = new URL(e.request.url);
if (e.request.method !== 'GET' || url.origin !== location.origin) return;
e.respondWith(caches.open(CACHE).then(async (c) => {
const hit = await c.match(e.request, { ignoreSearch: url.pathname.endsWith('.html') });
const fresh = fetch(e.request).then((r) => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => null);
return hit || (await fresh) || new Response('Offline, and this page isn\'t saved yet.', { status: 503, headers: { 'content-type': 'text/plain' } });
}));
});