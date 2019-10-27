const precacheList = [
  '/', 'mission.html', 'resources.html', 'tours.html',
  'app.js', 'weather.js',
  '_css/fonts.css', '_css/main.css', '_css/mobile.css', '_css/tablet.css',
  '_images/back_bug.gif', '_images/desert_desc_bug.gif', '_images/nature_desc_bug.gif',
  '_images/backpack_bug.gif', '_images/flag.jpg', '_images/snow_desc_bug.gif',
  '_images/calm_bug.gif', '_images/home_page_back.jpg', '_images/springs_desc_bug.gif',
  '_images/calm_desc_bug.gif', '_images/kids_desc_bug.gif', '_images/star_bullet.gif',
  '_images/cycle_desc_bug.gif', '_images/logo.gif', '_images/taste_bug.gif',
  '_images/cycle_logo.png', '_images/looking.jpg', '_images/taste_desc_bug.gif',
  '_images/desert_bug.gif', '_images/mission_look.jpg', '_images/tour_badge.png',
];

const CACHE_NAME = 'california-assests';

const installHandler = (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(precacheList)),
  );
};

const fetchHandler = (event) => {
  const { request } = event;
  const parsedUrl = new URL(request.url);
  const isCSS = parsedUrl.pathname.match(/^\/_css*/);
  const isFont = parsedUrl.pathname.match(/^\/_fonts*/);

  const putInCache = (originRequest) => (networkResponse) => caches.open(CACHE_NAME)
    .then((cache) => {
      cache.put(originRequest, networkResponse.clone());
      return networkResponse;
    });

  // Network-first policy
  // const networkPromise = () => fetch(request)
  //   .catch(() => caches.match(request));

  // Stale While Revalidate policy
  const stalePromise = () => caches.match(request)
    .then((response) => {
      const staleFetch = fetch(request)
        .then(putInCache(request));

      return response || staleFetch;
    });

  // Cache-first policy
  const cachePromise = () => caches.match(request)
    .then((response) => {
      if (response) {
        return response;
      } if (isFont) {
        const fetchRequest = fetch(request)
          .then(putInCache(request));
        return fetchRequest;
      }
      return fetch(request);
    });

  if (isCSS) {
    event.respondWith(stalePromise());
  } else event.respondWith(cachePromise());
};

// eslint-disable-next-line
self.addEventListener('install', installHandler);

// eslint-disable-next-line
self.addEventListener('fetch', fetchHandler);
