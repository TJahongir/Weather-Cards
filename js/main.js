// Google API = AIzaSyBSUbC8bzhm1S09Q9DJ71au4G7MMiPJUo0

window.addEventListener('load', () => {
  let long;
  let lat;

  // Search
  const searchInput = document.querySelector('.search-box');
  searchInput.addEventListener('keydown', e => {
    if (e.keyCode == '13') {
      searchCity(searchInput.value.toLowerCase());
    }
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      getWeather(long, lat);
    });
  } else {
    alert('Refresh the Page or Search for a city;');
  }
});

function activatePlacesSearch() {
  const input = document.querySelector('.search-box');
  let autocomplete = new google.maps.places.Autocomplete(input);
}

function searchCity(city) {
  const geoApi = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=d6eae1b4d90d4bb5bff15f2b29fd2776`;
  fetch(geoApi)
    .then(response => {
      return response.json();
    })
    .then(data => {
      long = data.results[0].geometry.lng;
      lat = data.results[0].geometry.lat;
      getWeather(long, lat);
    });
}

function getWeather(long, lat) {
  const timezoneDOM = document.querySelector('.city');
  const temperatureDOM = document.querySelector('.temperature');
  const windSpeedDOM = document.querySelector('.wind-speed');
  const humidityDOM = document.querySelector('.humidity');
  const pressureDOM = document.querySelector('.pressure');
  const descriptionDOM = document.querySelector('.description');
  const iconDOM = document.querySelector('.icon');

  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const api = `${proxy}https://api.darksky.net/forecast/9638da9b952374c4e4123853d9ff5169/${lat},${long}`;

  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      const {
        temperature,
        windSpeed,
        humidity,
        pressure,
        summary,
        icon
      } = data.currently;

      const timezone = data.timezone
        ? data.timezone.replace(/_/g, ' ')
        : data.timezone;
      const temperatureC = Math.floor(((temperature - 32) * 5) / 9);
      timezoneDOM.textContent = timezone;
      temperatureDOM.textContent = `${temperatureC}°C`;
      windSpeedDOM.innerHTML = `<i class="fas fa-wind"></i> ${windSpeed} m/s, SE`;
      humidityDOM.innerHTML = `<i class="fas fa-tint"></i> ${humidity * 100}%`;
      pressureDOM.innerHTML = `<i class="fas fa-gem"></i> ${pressure}mmhg`;
      descriptionDOM.textContent = summary;

      setIcons(icon, iconDOM);
    });
}

// Icons
function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: 'white' });
  const currentIcon = icon.replace(/-/g, '_').toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}
