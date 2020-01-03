$(document).ready(function () {
    var cityName = "";
    var searchHistoryList = document.querySelector("#searchHistoryList");
    var searchedCities = [];

//Moment.js to display date
var currentDay = moment().format('MMMM Do, YYYY');
    $('#currentDay').text(currentDay);

var dayTwo = moment().add(1, 'days').format('l'); 
    $('#dayTwo').text(dayTwo.slice(0,8));

var dayThree = moment().add(2, 'days').format('l'); 
    $('#dayThree').text(dayThree.slice(0,8));

var dayFour = moment().add(3, 'days').format('l'); 
    $('#dayFour').text(dayFour.slice(0,8));

var dayFive = moment().add(4, 'days').format('l'); 
    $('#dayFive').text(dayFive.slice(0,8));

var daySix = moment().add(5, 'days').format('l'); 
    $('#daySix').text(daySix.slice(0,8)); 

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
          newCity.text(searchedCities[i]);
          newCity.attr('data-name', searchedCities[i]);
          newCity.attr("href", "#");
          $("#searchHistoryList").append(newCity);
          $("#searchHistoryList").attr("style", "display:block");
        }
      };

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

    




      
      })
      // Display Current Weather

      
      function currentWeather(cityName) {
        apiKey = `06606e544a946ac567964601f7ed0813`;
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
       // var fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
        //var longtitude;
        //var latitude;
       // var citynamedisplay;
      

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          var iconCode = response.weather[0].icon;
          var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";


         var city = response.name;
         var cityIcon = response.weather[0].icon;
         var temp = Math.round(response.main.temp);
         var humidity = response.main.humidity;
         var windSpeed = response.wind.speed;
         var weatherIcon = $("<img>").attr("src", `https://openweathermap.org/img/w/${cityIcon}.png`)
         console.log(response)
          $("#city").text(city);
          $("#temp").text("Temperature: " + temp + String.fromCharCode(176) + "F"); //degree sign
          $("#humidity").text("Humidity: " + humidity + " %");
          $("#windSpeed").text("Wind Speed: " + windSpeed + " MPH");
          $("#weatherIcon").attr("src", iconURL);
        });
    }

      // Uv Index
 // $.ajax({
  //  url: 'https://api.openweathermap.org/data/2.5/uvi?' + 
  //  "APPID=48bc438037e2bdcc406efdc80b46134e" + 
  //  "&lat=" + response.coord.lat + 
 //   "&lon=" + response.coord.lon,
  //  method: "GET" 
//  }).then(function(response) {
 //  var uvIndex = response.value;
 //   $(".uvIndex).text(uvIndex);
 // }
     //   })