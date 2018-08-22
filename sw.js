let cacheName = "v1";
let cacheFiles = [
  "./",
  "./sw_registration.js",
  "index.html",
  "restaurant.html",
  "css/styles.css",
  "data/restaurants.json",
  "js/dbhelper.js",
  "js/main.js",
  "js/restaurant_info.js",
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
  "img/9.jpg",
  "img/10.jpg"
];

self.addEventListener("install", event => {
   console.log('sw install');
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => cache.addAll(cacheFiles))
      .then(self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  console.log('sw activate')
  event.waitUntil(
    caches.keys().then(CacheNames => Promise.all(CacheNames.map(cache => {
      if (cache !== cacheName) {
        console.log("removing cached files from ", cache);
        return caches.delete(cache);
      }
    })))
  )
})

self.addEventListener("fetch", event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
  }
});
