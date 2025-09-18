/**
 * BFT Fibra Óptica - Service Worker
 * PWA Support with Caching Strategy
 */

const CACHE_NAME = 'bft-v1.0.0';
const STATIC_CACHE = 'bft-static-v1';
const DYNAMIC_CACHE = 'bft-dynamic-v1';
const IMAGE_CACHE = 'bft-images-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/styles.css',
  '/assets/js/main.js',
  '/assets/images/Mesa de trabajo 1.png',
  '/assets/images/3x5 equipo ax50.png',
  '/assets/images/400MEGAS PLAN MENSUAL.png',
  '/assets/images/anual rrss.png',
  '/assets/images/camara rrss.png',
  '/assets/images/TPLINK-NEW.jpg',
  '/assets/images/samsung-8.svg',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('SW: Install event');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('SW: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(IMAGE_CACHE),
      caches.open(DYNAMIC_CACHE)
    ]).then(() => {
      console.log('SW: Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('SW: Activate event');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages
      self.clients.claim()
    ]).then(() => {
      console.log('SW: Activation complete');
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip Chrome extensions and other non-http requests
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Route requests to appropriate cache strategy
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (isImage(request)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
  } else if (isAPI(request)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else if (isCDN(request)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  } else {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Cache-first strategy - good for static assets
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('SW: Serving from cache:', request.url);
      return cachedResponse;
    }
    
    console.log('SW: Fetching and caching:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('SW: Cache-first failed:', error);
    return getOfflineFallback(request);
  }
}

// Network-first strategy - good for API calls and dynamic content
async function networkFirst(request, cacheName) {
  try {
    console.log('SW: Network-first for:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('SW: Network failed, trying cache:', request.url);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return getOfflineFallback(request);
  }
}

// Stale-while-revalidate strategy - good for CDN resources
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.error('SW: Revalidation failed:', error);
    return cachedResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Helper functions to determine request types
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.includes('/assets/') || 
         url.pathname.endsWith('.html') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js');
}

function isImage(request) {
  const url = new URL(request.url);
  return /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(url.pathname);
}

function isAPI(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || 
         url.hostname.includes('api.');
}

function isCDN(request) {
  const url = new URL(request.url);
  return url.hostname.includes('cdn.') ||
         url.hostname.includes('unpkg.') ||
         url.hostname.includes('fonts.') ||
         url.hostname.includes('cdnjs.');
}

// Offline fallbacks
function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  if (request.destination === 'document') {
    return caches.match('/offline.html') || createOfflinePage();
  }
  
  if (isImage(request)) {
    return caches.match('/assets/images/offline-placeholder.svg') || 
           createOfflineImage();
  }
  
  return new Response('Offline - Content not available', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: new Headers({
      'Content-Type': 'text/plain',
    }),
  });
}

function createOfflinePage() {
  const offlineHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sin Conexión - BFT Fibra Óptica</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .container {
          max-width: 400px;
          padding: 2rem;
        }
        .icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          font-weight: bold;
        }
        p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        .button {
          background: white;
          color: #3b82f6;
          padding: 1rem 2rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: bold;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }
        .button:hover {
          background: #f3f4f6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">📡</div>
        <h1>Sin Conexión</h1>
        <p>No hay conexión a internet. Algunos contenidos están disponibles sin conexión.</p>
        <button class="button" onclick="location.reload()">Reintentar</button>
      </div>
    </body>
    </html>
  `;
  
  return new Response(offlineHTML, {
    headers: new Headers({
      'Content-Type': 'text/html',
    }),
  });
}

function createOfflineImage() {
  const offlineSVG = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" 
            font-family="Arial, sans-serif" font-size="24" fill="#6b7280">
        Imagen no disponible
      </text>
      <text x="50%" y="60%" text-anchor="middle" dy=".3em" 
            font-family="Arial, sans-serif" font-size="16" fill="#9ca3af">
        Sin conexión
      </text>
    </svg>
  `;
  
  return new Response(offlineSVG, {
    headers: new Headers({
      'Content-Type': 'image/svg+xml',
    }),
  });
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('SW: Background sync event:', event.tag);
  
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  }
  
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncContactForms() {
  try {
    const db = await openDB();
    const pendingForms = await getAllFromStore(db, 'pending-forms');
    
    for (const form of pendingForms) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form.data),
        });
        
        if (response.ok) {
          await deleteFromStore(db, 'pending-forms', form.id);
          console.log('SW: Form synced successfully:', form.id);
        }
      } catch (error) {
        console.error('SW: Form sync failed:', error);
      }
    }
  } catch (error) {
    console.error('SW: Background sync failed:', error);
  }
}

async function syncAnalytics() {
  try {
    const db = await openDB();
    const pendingEvents = await getAllFromStore(db, 'pending-analytics');
    
    for (const event of pendingEvents) {
      try {
        // Send to Google Analytics
        await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${event.measurementId}&api_secret=${event.apiSecret}`, {
          method: 'POST',
          body: JSON.stringify({
            client_id: event.clientId,
            events: [event.data]
          })
        });
        
        await deleteFromStore(db, 'pending-analytics', event.id);
        console.log('SW: Analytics event synced:', event.id);
      } catch (error) {
        console.error('SW: Analytics sync failed:', error);
      }
    }
  } catch (error) {
    console.error('SW: Analytics sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('SW: Push event received');
  
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  
  const options = {
    title: data.title || 'BFT Fibra Óptica',
    body: data.body || 'Nueva oferta disponible',
    icon: '/assets/images/Mesa de trabajo 1.png',
    badge: '/assets/images/notification-badge.png',
    image: data.image,
    data: data.url,
    actions: [
      {
        action: 'view',
        title: 'Ver oferta',
        icon: '/assets/images/view-icon.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/assets/images/close-icon.png'
      }
    ],
    requireInteraction: true,
    vibrate: [200, 100, 200],
    tag: data.tag || 'bft-notification'
  };
  
  event.waitUntil(
    self.registration.showNotification(options.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('SW: Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'view') {
    const urlToOpen = event.notification.data || '/';
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        // If a window is already open, focus it
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise, open a new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('SW: Message received:', event.data);
  
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data.action === 'getCacheInfo') {
    getCacheInfo().then(info => {
      event.ports[0].postMessage(info);
    });
  }
  
  if (event.data.action === 'clearCache') {
    clearAllCaches().then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});

async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const info = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    info[cacheName] = {
      count: keys.length,
      urls: keys.map(request => request.url)
    };
  }
  
  return info;
}

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
  console.log('SW: All caches cleared');
}

// IndexedDB helpers for offline storage
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BFT_DB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('pending-forms')) {
        db.createObjectStore('pending-forms', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('pending-analytics')) {
        db.createObjectStore('pending-analytics', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('user-preferences')) {
        db.createObjectStore('user-preferences', { keyPath: 'key' });
      }
    };
  });
}

function getAllFromStore(db, storeName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

function deleteFromStore(db, storeName, key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// Performance monitoring
self.addEventListener('fetch', (event) => {
  const startTime = performance.now();
  
  event.respondWith(
    handleRequest(event.request).then(response => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Log slow requests
      if (duration > 1000) {
        console.warn(`SW: Slow request (${duration.toFixed(2)}ms):`, event.request.url);
      }
      
      return response;
    })
  );
});

async function handleRequest(request) {
  // Route to appropriate cache strategy based on earlier logic
  if (isStaticAsset(request)) {
    return cacheFirst(request, STATIC_CACHE);
  } else if (isImage(request)) {
    return cacheFirst(request, IMAGE_CACHE);
  } else if (isAPI(request)) {
    return networkFirst(request, DYNAMIC_CACHE);
  } else if (isCDN(request)) {
    return staleWhileRevalidate(request, STATIC_CACHE);
  } else {
    return networkFirst(request, DYNAMIC_CACHE);
  }
}

// Periodic cleanup of old cache entries
setInterval(async () => {
  try {
    const cacheNames = await caches.keys();
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      // Remove entries older than 30 days for dynamic cache
      if (cacheName === DYNAMIC_CACHE) {
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        
        for (const request of requests) {
          const response = await cache.match(request);
          const dateHeader = response.headers.get('date');
          
          if (dateHeader) {
            const responseDate = new Date(dateHeader).getTime();
            if (responseDate < thirtyDaysAgo) {
              await cache.delete(request);
              console.log('SW: Cleaned old cache entry:', request.url);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('SW: Cache cleanup failed:', error);
  }
}, 24 * 60 * 60 * 1000); // Run daily

console.log('SW: Service Worker loaded and ready');