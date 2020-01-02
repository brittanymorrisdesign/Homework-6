$(document).ready(function() {
 
  var apiKey = "06606e544a946ac567964601f7ed0813";
  var cityName = "";
  var searchedCities = [];

  //Retrieve searches from local storage, and pasrse JSON string to object
  function getCities() {
    var storedCities = JSON.parse(localStorage.getItem("searchedCities"));
  // Update local storage info to array
    if (storedCities !== null) {
      searchedCities = storedCities;

  // Render citiesList to the DOM
    }
  }


  function saveLocalStorage() {
    var userInput9 = localStorage.getItem("9");
    $("#9").children(".description").text(userInput9);
  }
    
function currentWeather() {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET"


  }).then(function(response) {
// Display weather results
$(".city").text(response.name);
$(".temp").text(response.main.temp);
$(".humidity").text(response.main.humidity);
$(".windspeed").text(response.wind.speed);
$("#icon").attr("src", iconURL);

})
}



// Display 5 day weather results
  });
