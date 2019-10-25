// versin 6
console.log('We are a service worker!');

// eslint-disable-next-line
importScripts('events.js');

// eslint-disable-next-line
self.addEventListener('fetch', (e) => {
  const {
    url,
    cache,
    credential,
    destination,
    method,
    referrer,
  } = e.request;

  console.log(`Fetching ${url}`);

  const parsedUrl = new URL(url);

  if (parsedUrl.pathname === '/basics/') {
    return;
  }

  if (parsedUrl.pathname.match(/^\/basics\/api\/*/)) {
    console.log('!!!');
    const object = {
      temp: 42,
    };

    const jsonResponse = new Response(JSON.stringify(object), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-type': 'application/json',
      },
    });

    e.respondWith(jsonResponse);
  }

  const body = `
    <!DOCTYPE html>
    <title>Service Worker HTML generation</title>
    <h1>The URL is ${url}</h1>
    <ul>
      <li>Cache: ${cache}</li>
      <li>Credential: ${credential}</li>
      <li>Destination: ${destination}</li>
      <li>Method: ${method}</li>
      <li>Referrer: ${referrer}</li>
    </ul> 
  `;

  const response = new Response(body, {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-type': 'text/html',
    },
  });

  e.respondWith(response);
});
