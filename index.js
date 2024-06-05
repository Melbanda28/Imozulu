function updateWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  let currentTemperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#weather-app-city");
  currentTemperatureElement.innerHTML = temperature;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  console.log(response.data.condition.description);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class="temperature-icon"/>`;
  timeElement.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "0a266418598ob604ae10378et2402a5f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updateWeather);
}

function searchWeatherCity(event) {
  event.preventDefault(event);
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);
  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "0a266418598ob604ae10378et2402a5f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
    <div class = "weather-forecast-day">
    <div class = "weather-forecast-date">Tue</div>
    <img src="${day.condition.icon_url}" id = "weather-forecast-icon" />
    <div class ="weather-forecast-temperatures">
      <div class =" weather-forecast-temperature">
        <strong>${Math.round(day.temperature.maximum)}°</strong></div>
    <div class = " weather-forecas-temperature">${Math.round(
      day.temperature.minimum
    )}°</div>
    </div>
  </div>
  `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchWeatherCity);

searchCity("Cape Town");
