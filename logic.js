let cityInput = document.getElementById("city"); // user input
let todayDate = document.getElementById("todayDate");
let cityForm = document.getElementById("formCity"); // form for input
let buttons = document.getElementById("buttons"); // buttons past search
let cityEl = document.querySelector("#searchedCity"); // city as displayed
// API CALLS
// GET WEATHER FOR TODAY DISPLAY
let getWeather = (city) => {
  let apiURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=4204bfdd6f4f063ef67429ec56df1142";
  fetch(apiURL1)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // getWeather => showWeather
      showWeather(data, city);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
};
// GET 5-DAY FORECAST + UV DATA
let getForecast = (city) => {
  let apiURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=4204bfdd6f4f063ef67429ec56df1142";
  fetch(apiURL3)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // getForecast => showForecast
      showForecast(data, city);
    })
    .catch((error) => {
      console.error('Error fetching forecast data:', error);
    });
};
// SUBMIT CITY SEARCH AND STORE CITY SEARCH
let submitQuery = (event) => {
  event.preventDefault();
  let cityEl = cityInput.value.trim();
  if (cityEl) {
    getWeather(cityEl);
    getForecast(cityEl);
    cityInput.value = "";
  } else {
    alert("Enter a city name to get the weather!");
  }
};
// TODAY WEATHER
// Content for central weather feature
todayDate.textContent = moment()
  .format("MM/DD/YYYY");
// getWeather (API Call) => showWeather
let showWeather = (weather, searchQuery) => {
  cityEl.textContent = searchQuery;
  document.getElementById("todayTemp").innerHTML = weather.main.temp;
  document.getElementById("todayHumidity").innerHTML = weather.main.humidity;
  document.getElementById("todayWind").innerHTML = weather.wind.speed;
};
// 5 DAY FORECAST
let showForecast = (forecast, searchQuery) => {
  let forecastContainer = document.getElementById("forecast5day");
  if (!forecastContainer) {
    console.error("Forecast container not found.");
    return;
  }
  forecastContainer.innerHTML = ""; // Clear previous forecast data
  let forecastList = forecast.list;
  for (let i = 0; i < forecastList.length; i++) {
    if (forecastList[i].dt_txt.includes("12:00:00")) { // Only show forecast for 12:00 PM
      let day = moment(forecastList[i].dt_txt).format("dddd");
      let temp = forecastList[i].main.temp;
      let humidity = forecastList[i].main.humidity;
      let wind = forecastList[i].wind.speed;
      let icon = forecastList[i].weather[0].icon;
      let card = document.createElement("div");
      card.className = "col-sm-2";
      card.innerHTML = `
        <div class="card card5day">
          <h6>${day}</h6>
          <img src="https://openweathermap.org/img/wn/${icon}.png">
          <p><strong>Temp:</strong> ${temp} °F</p>
          <p><strong>Humidity:</strong> ${humidity}%</p>
          <p><strong>Wind:</strong> ${wind}</p>
          <p>
        </div>
      `;
      forecastContainer.appendChild(card);
    }
  }
};
// LISTEN FOR CITY FORM SUBMISSION
cityForm.addEventListener("submit", submitQuery);
// Event listeners for buttons
document.getElementById("popular-cities1").addEventListener("click", function() {
  getWeather("Atlanta");
  getForecast("Atlanta");
});
document.getElementById("popular-cities2").addEventListener("click", function() {
  getWeather("Denver");
  getForecast("Denver");
});
document.getElementById("popular-cities3").addEventListener("click", function() {
    getWeather("Seattle");
    getForecast("Seattle");
  });
document.getElementById("popular-cities4").addEventListener("click", function() {
  getWeather("San Francisco");
  getForecast("San Francisco");
});
document.getElementById("popular-cities5").addEventListener("click", function() {
  getWeather("Orlando");
  getForecast("Orlando");
});
document.getElementById("popular-cities6").addEventListener("click", function() {
  getWeather("New York");
  getForecast("New York");
});
document.getElementById("popular-cities7").addEventListener("click", function() {
    getWeather("Chicago");
    getForecast("Chicago");
  });
document.getElementById("popular-cities8").addEventListener("click", function() {
    getWeather("Austin");
    getForecast("Austin");
  });
// OPEN WITH DEFAULT VALUES
getWeather("Dallas");
getForecast("Dallas");
