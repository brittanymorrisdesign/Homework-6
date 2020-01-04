/* eslint-disable vars-on-top */
$(document).ready(function () {
  var cityName = "";
  var searchHistoryList = document.querySelector("#searchHistoryList");
  var searchedCities = [];
  var cityLat;
  var cityLong;
  apiKey = `06606e544a946ac567964601f7ed0813`;

  //Moment.js to display date
    var currentDay = moment().format('MMMM Do, YYYY');
    $('#currentDay').text(currentDay);

    var dayTwo = moment().add(1, 'days').format('l');
    $('#dayTwo').text(dayTwo.slice(0, 8));

    var dayThree = moment().add(2, 'days').format('l');
    $('#dayThree').text(dayThree.slice(0, 8));

    var dayFour = moment().add(3, 'days').format('l');
    $('#dayFour').text(dayFour.slice(0, 8));

    var dayFive = moment().add(4, 'days').format('l');
    $('#dayFive').text(dayFive.slice(0, 8));

    var daySix = moment().add(5, 'days').format('l');
    $('#daySix').text(daySix.slice(0, 8));

  init();

  //displaying searched cities
  function rendersearchedCities() {
    // Clear searchHistoryList element 
    searchHistoryList.innerHTML = "";

    // Empty current city list before displaying next city name button
    $("#searchHistoryList").empty();

    // Loop through the array of cities entered, then generate list items for each city in the array
    for (var i = 0; i < searchedCities.length; i++) {
      var newCity = $("<button>");
      newCity.addClass("newCityBtn");
      newCity.text(searchedCities[i]);
      newCity.attr('data-name', searchedCities[i]);
      newCity.attr("href", "#");
      $("#searchHistoryList").append(newCity);
      $("#searchHistoryList").attr("style", "display:block");
    }
  };
  
 // Click Searched Cities
  $(document).on("click", ".newCityBtn", function () {
    currentWeather($(this).text());
  });

   // Click Popular Cities
   $(document).on("click", "#austin", function () {
    var popularCities = "https://api.openweathermap.org/data/2.5/weather?q=" + "#austin" + "&units=imperial&appid=" + apiKey;
    
    $.ajax({
      url: popularCities,
      method: "GET"
    }).then(function (response) {
  
      var iconCode = response.weather[0].icon;
      var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  
      var city = response.name;
      var temp = Math.round(response.main.temp);
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed;
   
      $("#city").text(city);
      $("#temp").text("Temperature: " + temp + String.fromCharCode(176) + "F"); //degree sign
      $("#humidity").text("Humidity: " + humidity + " %");
      $("#windSpeed").text("Wind Speed: " + windSpeed + " MPH");
      $("#weatherIcon").attr("src", iconURL);
    });

    currentWeather(cityName);
    searchedCities = [];

 });  

  function init() {
    // Get stored searchedCities from localStorage
    // Parsing the JSON string to an object
    var storedsearchedCities = JSON.parse(localStorage.getItem("searchedCities"));

    // If searchedCities were retrieved from localStorage, update the searchedCities array to it
    if (storedsearchedCities !== null) {
      searchedCities = storedsearchedCities;
    }

    // Render searchedCities to the DOM
    rendersearchedCities();
  }

  function storesearchedCities() {
    // Stringify and set "searchedCities" key in localStorage to searchedCities array
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
  }

  // When form is submitted (API Request)
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();

    let cityName = $("#cityNameSearch").val().trim();
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1); //First letter of char capitalized
    currentWeather(cityName);

    $("#searchHistoryList").on("click", function (event) {
      event.preventDefault();

      let cityName = $(this).text();
      currentWeather(cityName);
  

      // Return from function early if submitted cityNameSearchText is blank
      if (cityName !== null) {
        city = cityName[0].name;
      };
    });

    // Add new cityNameSearchText to searchedCities array, clear the input
    searchedCities.push(cityName);
    cityName.value = "";

    // Store updated searchedCities in localStorage, re-render the list
    storesearchedCities();
    rendersearchedCities();
  });


// Click on previous city button
$(document).on("click", "newCity", function () {
  currentWeather($(this).text());
});

// Display Current Weather
function currentWeather(cityName) {

  apiKey = "06606e544a946ac567964601f7ed0813";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
  var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var iconCode = response.weather[0].icon;
    var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

    var city = response.name;
    var temp = Math.round(response.main.temp);
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var indexQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    //console.log(response)

    $("#city").text(city);
    $("#temp").text("Temperature: " + temp + "° F"); 
    $("#humidity").text("Humidity: " + humidity + " %");
    $("#windSpeed").text("Wind Speed: " + windSpeed + " MPH");
    $("#weatherIcon").attr("src", iconURL);
  
  // Uv Index
  $.ajax({
    url: indexQueryURL,
   method: "GET" 
 }).then(function(resp) {
  $("#uvIndex").text("UV Index: " + resp.value);
 })
})

// 5 Day Forecast
$.ajax({
  url: fiveDayQueryURL,
  method: "GET" 
}).then(function(response) {
  //Day 1
  var iconCode = response.list[0].weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

  $("#tempTwo").text("Temp: " + parseInt(response.list[0].main.temp) + "° F");
  $("#iconTwo").attr("src", iconURL);
  $("#humidTwo").text("Humidity: " + response.list[0].main.humidity + "%");
  $("#weatherIconTwo").attr("src", iconURL);
  //Day 2
  var iconCode = response.list[8].weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  $("#tempThree").text("Temp: " + parseInt(response.list[8].main.temp) + "° F");
  $("#iconThree").attr("src", iconURL);
  $("#humidThree").text("Humidity: " + response.list[8].main.humidity + "%");
  $("#weatherIconThree").attr("src", iconURL);
  //Day 3
  var iconCode = response.list[16].weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  $("#tempFour").text("Temp: " + parseInt(response.list[16].main.temp) + "° F");
  $("#iconFour").attr("src", iconURL);
  $("#humidFour").text("Humidity: " + response.list[16].main.humidity + "%");
  $("#weatherIconFour").attr("src", iconURL);
  //Day 4
  var iconCode = response.list[24].weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  $("#tempFive").text("Temp: " + parseInt(response.list[24].main.temp) + "° F");
  $("#iconFive").attr("src", iconURL);
  $("#humidFive").text("Humidity: " + response.list[24].main.humidity + "%");
  $("#weatherIconFive").attr("src", iconURL);
  //Day 5
  var iconCode = response.list[32].weather[0].icon;
  var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  $("#tempSix").text("Temp: " + parseInt(response.list[32].main.temp) + "° F");
  $("#iconSix").attr("src", iconURL);
  $("#humidSix").text("Humidity: " + response.list[32].main.humidity + "%");
  $("#weatherIconSix").attr("src", iconURL);
})
  }
});