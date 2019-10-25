const precacheList = [
  '/california',
  'mission.html',
  'resources.html',
  'tours.html',
];

// eslint-disable-next-line
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('california-assests')
      .then((cache) => cache.addAll(precacheList)),
  );
});
