let url = 'https://darksky.net/forecast';

window.addEventListener('load', () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
    });
  } else {
    long = 52.52;
    lat = 13.405;
  }
});
