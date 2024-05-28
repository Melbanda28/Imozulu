function updateWeather(response) {}

function searchCity(city) {
  let apiKey = ` 0a266418598ob604ae10378et2402a5f`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key={ 0a266418598ob604ae10378et2402a5f}`;
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
