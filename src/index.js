const init = () => {
  const output = document.querySelector('output');
  const MESSAGE_SW_REGISTERED = 'Service Worker registered properly';
  const MESSAGE_SW_NOT_REGISTERED = 'Service Worker NOT registered';
  const MESSAGE_SW_NOT_AVAILABLE = 'Service Worker NOT available';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => {
        output.innerHTML = MESSAGE_SW_REGISTERED;
      })
      .catch(() => {
        output.innerHTML = MESSAGE_SW_NOT_REGISTERED;
      });
  } else {
    output.innerHTML = MESSAGE_SW_NOT_AVAILABLE;
  }
};

window.addEventListener('load', init);
