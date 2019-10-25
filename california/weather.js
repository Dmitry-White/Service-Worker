const fetchWeather = (city) => fetch(`http://explorecalifornia.org/api/weather/?city=${encodeURIComponent(city)}`);

const init = () => {
  const ulWeather = document.querySelector('ul#weather');
  ulWeather.innerHTML = '';
  Promise.all([fetchWeather('san diego'), fetchWeather('sacramento'), fetchWeather('fresno')])
    .then((responses) => {
      responses.forEach((response) => {
        response.json()
          .then((data) => {
            const li = `<li>${data[0].name}: 
                                ${Math.round(data[0].forecast[0].temp_min)}F -
                                ${Math.round(data[0].forecast[0].temp_max)}F</li>`;
            ulWeather.innerHTML += li;
          });
      });
    });
};

window.addEventListener('load', init);
