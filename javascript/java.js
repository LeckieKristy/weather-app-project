let currentTime = new Date();

function updatedDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

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

  return `${day} <br /> ${hours}:${minutes}`;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = updatedDate(currentTime);

function convertFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = -9;
}
function convertCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = -23;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertCelcius);

function updatedWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#percipitation").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML =
    response.data.weather[0].main;
}
function citySearch(city) {
  let apiKey = "a16f20b5b1975498f29ae71008574cdb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(updatedWeatherCondition);
  console.log(apiUrl);
}
function searchFormSubmission(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  citySearch(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchFormSubmission);

citySearch("winnipeg");

function retriveLiveLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "afae547135be25a69958ef7a45df8190";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updatedWeatherCondition);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retriveLiveLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentLocation);
