// versin 6
console.log('We are a service worker!');

// eslint-disable-next-line
importScripts('events.js');

self.addEventListener('fetch', (e) => {
  console.log(`Fetching ${e.request.url}`);
  const response = new Response(`Fetching ${e.request.url}`);
  e.respondWith(response);
});
