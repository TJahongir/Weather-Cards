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
    navigator.geolocation.getCurrentPosition(async position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      await searchCoordinates(long, lat);
    });
  } else {
    alert('Refresh the Page or Search for a city;');
  }
});

/* function activatePlacesSearch() {
  const input = document.querySelector('.search-box');
  let autocomplete = new google.maps.places.Autocomplete(input);
} */

const searchCity = async city => {
  const timezoneDOM = document.querySelector('.city');
  const geoApi = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=d6eae1b4d90d4bb5bff15f2b29fd2776`;
  const res = await fetch(geoApi);
  const data = await res.json();

  long = data.results[0].geometry.lng;
  lat = data.results[0].geometry.lat;

  city = data.results[0].components.city || data.results[0].components.state;
  let country = data.results[0].components.country;
  console.log(data);

  timezoneDOM.innerHTML = `${city}, ${country}`;
  await getWeather(long, lat);
};

const searchCoordinates = async (long, lat) => {
  const timezoneDOM = document.querySelector('.city');
  const geoApi = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${long}&pretty=1&key=d6eae1b4d90d4bb5bff15f2b29fd2776`;
  const res = await fetch(geoApi);
  const data = await res.json();

  city = data.results[0].components.city || data.results[0].components.state;
  let country = data.results[0].components.country;
  console.log(data);

  timezoneDOM.innerHTML = `${city}, ${country}`;
  await getWeather(long, lat);
};

const getWeather = async (long, lat) => {
  const temperatureDOM = document.querySelector('.temperature');
  const windSpeedDOM = document.querySelector('.wind-speed');
  const humidityDOM = document.querySelector('.humidity');
  const pressureDOM = document.querySelector('.pressure');
  const descriptionDOM = document.querySelector('.description');
  const iconDOM = document.querySelector('.icon');

  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const api = `${proxy}https://api.darksky.net/forecast/9638da9b952374c4e4123853d9ff5169/${lat},${long}`;

  const res = await fetch(api);
  const data = await res.json();

  const {
    temperature,
    windSpeed,
    humidity,
    pressure,
    summary,
    icon
  } = data.currently;

  const temperatureC = Math.floor(((temperature - 32) * 5) / 9);
  temperatureDOM.textContent = `${temperatureC}°C`;
  windSpeedDOM.innerHTML = `<i class="fas fa-wind"></i> ${windSpeed} m/s, SE`;
  humidityDOM.innerHTML = `<i class="fas fa-tint"></i> ${humidity * 100}%`;
  pressureDOM.innerHTML = `<i class="fas fa-gem"></i> ${pressure}mmhg`;
  descriptionDOM.textContent = summary;

  setIcons(icon, iconDOM);
};

// Icons
function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: 'white' });
  const currentIcon = icon.replace(/-/g, '_').toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}
