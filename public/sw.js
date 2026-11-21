const CACHE_NAME = 'mototrack-shell-v1';
const APP_SHELL = [
	'/',
	'/manifest.webmanifest',
	'/icon.svg',
	'/icons/icon-192.png',
	'/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
	);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames
					.filter((cacheName) => cacheName.startsWith('mototrack-shell-') && cacheName !== CACHE_NAME)
					.map((cacheName) => caches.delete(cacheName)),
			),
		),
	);
	self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	const request = event.request;
	const url = new URL(request.url);

	if (request.method !== 'GET' || url.origin !== self.location.origin) {
		return;
	}

	if (request.mode === 'navigate') {
		event.respondWith(
			fetch(request)
				.then((response) => {
					if (response.ok) {
						const copy = response.clone();
						caches.open(CACHE_NAME).then((cache) => cache.put('/', copy));
					}
					return response;
				})
				.catch(async () => (await caches.match(request)) || caches.match('/')),
		);
		return;
	}

	event.respondWith(
		caches.match(request).then((cachedResponse) => {
			if (cachedResponse) {
				return cachedResponse;
			}

			return fetch(request).then((response) => {
				if (response.ok) {
					const copy = response.clone();
					caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
				}
				return response;
			});
		}),
	);
});
