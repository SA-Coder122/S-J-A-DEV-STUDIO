// Service Worker for Portfolio Website - Optimized Caching Strategy
const CACHE_NAME = "sja-dev-v2";
const CRITICAL_CACHE = "sja-dev-critical-v1";
const IMAGE_CACHE = "sja-dev-images-v1";

const CRITICAL_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/scripts/script.js",
  "/assets/images/github.svg",
  "/assets/images/linkedin.svg",
  "/assets/images/mail.svg",
];

// Install Service Worker and cache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CRITICAL_CACHE).then((cache) => {
        console.log("Service Worker: Caching critical assets");
        return cache.addAll(CRITICAL_ASSETS).catch((error) => {
          console.warn("Service Worker: Critical cache error", error);
        });
      }),
      caches.open(CACHE_NAME).then((cache) => {
        console.log("Service Worker: Caching general assets");
      }),
    ]),
  );
  self.skipWaiting();
});

// Activate Service Worker and clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![CRITICAL_CACHE, CACHE_NAME, IMAGE_CACHE].includes(cacheName)) {
            console.log("Service Worker: Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch Event - Different strategies for different asset types
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Don't cache non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Strategy 1: Critical assets - Cache first, network fallback
  if (url.pathname === "/" || url.pathname === "/index.html") {
    event.respondWith(
      caches
        .match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Update cache in background
            fetch(request).then((response) => {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, response.clone());
              });
            });
            return cachedResponse;
          }
          return fetch(request).then((response) => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response.clone());
            });
            return response;
          });
        })
        .catch(() => caches.match("/index.html")),
    );
    return;
  }

  // Strategy 2: CSS/JS - Network first, cache fallback
  if (url.pathname.endsWith(".css") || url.pathname.endsWith(".js")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
          });
          return response;
        })
        .catch(() => caches.match(request)),
    );
    return;
  }

  // Strategy 3: Images - Cache first, network fallback
  if (
    request.destination === "image" ||
    url.pathname.includes("/assets/images/")
  ) {
    event.respondWith(
      caches
        .open(IMAGE_CACHE)
        .then((cache) => {
          return cache.match(request).then((cachedResponse) => {
            return (
              cachedResponse ||
              fetch(request).then((response) => {
                if (response.ok) {
                  cache.put(request, response.clone());
                }
                return response;
              })
            );
          });
        })
        .catch(() => {
          // Return a placeholder or cached asset
          return caches.match(request);
        }),
    );
    return;
  }

  // Default strategy: Network first, cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then((response) => {
          return response || caches.match("/index.html");
        });
      }),
  );
});

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
