window.addEventListener("load", () => {
  let long;
  let lat;

  var mykey = config.API_KEY;

  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let feelsLikeDegree = document.querySelector(".feels-like-degree");
  let weatherIcon = document.querySelector(".weather-icon");

  if (navigator.geolocation) {
    //'navigator.geolocation' is built in, allows a web site or app to offer customized results based on the user's location
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log("position", position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const getForecast = async () => {
        // const proxy = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${mykey}
          `
        );

        const data = await apiUrl.json();
        console.log("data", data);

        const { temp, feels_like } = data.main;
        const { description, id, icon } = data.weather[0];
        const location = data.name;

        temperatureDegree.textContent = `${Math.round(temp)} °C`;
        temperatureDescription.textContent = description;
        locationTimezone.textContent = location;
        feelsLikeDegree.textContent = `Feels like ${Math.round(feels_like)} °C`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      };
      getForecast();
    });
  }
});
