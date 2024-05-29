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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchWeatherCity);
