$(document).ready(function() {
 
  var apiKey = "06606e544a946ac567964601f7ed0813";
  var cityName = "";

  var searchHistoryList = document.querySelector("#searchHistoryList");
  var searchedCities = [];
  
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
  
  // When form is submitted...
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
  
    cityName = $("#cityNameSearch").val().trim();
    cityName =  cityName.charAt(0).toUpperCase() + cityName.slice(1); //First letter of char capitalized
  
    // Return from function early if submitted cityNameSearchText is blank
    if (cityName === "") {
      return;
    };
  
    // Add new cityNameSearchText to searchedCities array, clear the input
    searchedCities.push(cityName);
    cityName.value = "";
  
    // Store updated searchedCities in localStorage, re-render the list
    storesearchedCities();
    rendersearchedCities();
  });

    // Store updated searchedCities in localStorage, re-render the list
    storesearchedCities();
    rendersearchedCities();

  });