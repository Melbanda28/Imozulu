function updateWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  let currentTemperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#weather-app-city");
  currentTemperatureElement.innerHTML = temperature;
  cityElement.innerHTML = response.data.city;
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

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

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

  let formattedDay = days[day];
  let currentTime = `${hours}:${minutes}`;
  return `${formattedDay} ${currentTime}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchWeatherCity);

let currentDateELement = document.querySelector("#current-date");
let currentTimeElement = document.querySelector("#current-time");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
currentTimeElement.innerHTML = formatDate(currentTime);
searchCity("paris");
