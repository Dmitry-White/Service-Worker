// versin 6
console.log('We are a service worker!');

// eslint-disable-next-line
importScripts('events.js');

self.addEventListener('fetch', (e) => {
  console.log(`Fetching ${e.request.url}`);
  const body = `
  <!DOCTYPE html>
  <title>Service Worker HTML generation</title>
  <h1>The URL is ${e.request.url}</h1>
  `;

  const response = new Response(body, {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-type': 'text/html',
    }
  });

  e.respondWith(response);
});
