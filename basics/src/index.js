const init = () => {
  const output = document.querySelector('output');
  const updateButton = document.querySelector('#update');
  const unregisterButton = document.querySelector('#unregister');
  const MESSAGE_SW_REGISTERED = 'Service Worker registered properly';
  const MESSAGE_SW_NOT_REGISTERED = 'Service Worker NOT registered';
  const MESSAGE_SW_NOT_AVAILABLE = 'Service Worker NOT available';
  const MESSAGE_SW_NEW_INSTALLED = 'A new service worker is installed and waiting';
  const MESSAGE_SW_NEW_CONTROLLING = 'A new Service Worker is now controlling the page';

  const swRegisteredHandler = () => {
    output.innerHTML = MESSAGE_SW_REGISTERED;
  };

  const swNotRegisteredHandler = () => {
    output.innerHTML = MESSAGE_SW_NOT_REGISTERED;
  };

  const swNotAvailableHandler = () => {
    output.innerHTML = MESSAGE_SW_NOT_AVAILABLE;
  };

  const swStateChangeHandler = (swInstalling) => {
    if (swInstalling.state === 'installed') {
      output.innerHTML = MESSAGE_SW_NEW_INSTALLED;
    } else {
      output.innerHTML = MESSAGE_SW_NEW_CONTROLLING;
    }
  };

  const swUpdateFoundHandler = (registration) => {
    const swInstalling = registration.installing;
    swInstalling.addEventListener('statechange', () => swStateChangeHandler(swInstalling));
  };

  const swUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration()
        .then((registration) => registration.update())
        .catch(swNotAvailableHandler);
    }
  };

  const swUnregister = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration()
        .then((registration) => registration.unregister())
        .catch(swNotAvailableHandler);
    }
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(swRegisteredHandler)
      .catch(swNotRegisteredHandler);

    navigator.serviceWorker.getRegistration()
      .then((registration) => {
        registration.addEventListener('updatefound', () => swUpdateFoundHandler(registration));
      });
  } else {
    swNotAvailableHandler();
  }

  updateButton.addEventListener('click', swUpdate);
  unregisterButton.addEventListener('click', swUnregister);
};

window.addEventListener('load', init);
