const cacheName = 'v1';
const cacheFiles = [
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/js/main.js',
  '/css/styles.css',
  '/data/restaurants.json',
  '/index.html',
  '/restaurant.html',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg'
]



self.addEventListener('install', function(e) {
  console.log('sw install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[sw] Caching cachefiles");
      return cache.addAll(cacheFiles);
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log('sw activate');
  e.waitUntil(
    caches.keys().then(function(cacheName) {
      return Promise.all(cacheName.map(function(thisCacheName) {
        if (thisCacheName !== cacheName && thisCacheName !== cacheFiles) {
          console.log('[ServiceWorker] Removing old cache');
          return caches.delete(thisCacheName);
        }
      }));
    })
  );
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request).then(function(response) {
      if (response.status == 404) {
        return new Response("Page not found");
      }
      return response;
    }).catch(function() {
      return new Response("Page failed");
    })
  );
});
