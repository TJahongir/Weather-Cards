let url = 'https://darksky.net/forecast';

window.addEventListener('load', () => {
  let long;
  let lat;
  const timezoneDOM = document.querySelector('.city');
  const temperatureDOM = document.querySelector('.temperature');
  const windSpeedDOM = document.querySelector('.wind-speed');
  const humidityDOM = document.querySelector('.humidity');
  const pressureDOM = document.querySelector('.pressure');
  const descriptionDOM = document.querySelector('.description');
  const iconDOM = document.querySelector('.icon');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

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

          const timezone = data.timezone;
          const temperatureC = Math.floor(((temperature - 32) * 5) / 9);
          timezoneDOM.textContent = timezone;
          temperatureDOM.textContent = `${temperatureC}C`;
          windSpeedDOM.innerHTML = `<i class="fas fa-wind"></i> ${windSpeed} m/s, SE`;
          humidityDOM.innerHTML = `<i class="fas fa-tint"></i> ${humidity}%`;
          pressureDOM.innerHTML = `<i class="fas fa-gem"></i> ${pressure}mmhg`;
          descriptionDOM.textContent = summary;

          setIcons(icon, iconDOM);
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
