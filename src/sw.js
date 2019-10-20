console.log('We are a service worker!');

// eslint-disable-next-line
self.addEventListener('install', e => {
  console.log('Install event');
});

// eslint-disable-next-line
self.addEventListener('activate', e => {
  console.log('Activate event');
});
