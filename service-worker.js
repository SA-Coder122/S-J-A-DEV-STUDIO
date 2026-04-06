// Service Worker for Portfolio Website - Caching Strategy
const CACHE_NAME = "sja-dev-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/scripts/script.js",
  "/assets/images/github.svg",
  "/assets/images/linkedin.svg",
  "/assets/images/mail.svg",
];

// Install Service Worker and cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching assets");
      return cache.addAll(ASSETS_TO_CACHE).catch((error) => {
        console.warn("Service Worker: Cache error", error);
        // Continue even if some assets fail to cache
      });
    }),
  );
  self.skipWaiting();
});

// Activate Service Worker and clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Clearing old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch Event - Network first, fallback to cache
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Don't cache non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Strategy: Network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone the response for caching
        const responseClone = response.clone();

        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }

        return response;
      })
      .catch(() => {
        // Return cached response or offline page
        return caches.match(request).then((response) => {
          return response || caches.match("/index.html");
        });
      }),
  );
});
