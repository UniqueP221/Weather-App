var apiKey = "d899707429dae12637678613a5874634";
var searchBtn = $(".searchButton");
var searchInput = "";
var currentWeatherIconEl = document.getElementById("image-icon");
var currentTempElement = document.getElementById("todaytemp");
var currentWindElement = document.getElementById("todaywind");
var currentHumidityEl = document.getElementById("todayhumidity");
var currentUvIndexEl = document.getElementById("todayuvindex");
var currentDate = moment().format("M/D/YYYY");
var cityName = "";
var dailyDivs = [$("#day-1-div"), $("#day-2-div"), $("#day-3-div"), $("#day-4-div"), $("#day-5-div")];



searchBtn.click(function() {
    console.log("btnwasclicked");
    searchInput = $(".searchcity").val().trim();
    getLocation(searchInput);

});



function getLocation(searchInput){
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=1&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
    if(response.ok){
        response.json().then(function(data){
            console.log(data);
            var locationLat = data[0].lat;
            var locationLon = data [0].lon;
            cityName = data [0].name;
            var latString = locationLat.toString();
            var lonString = locationLon.toString();
            getWeather(latString, lonString);
        });
    } else{
        alert("Location Not Found.");
    }
    })
}


function getWeather(lat, lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                var currentCityNameEl = $(".subtitle");
                currentCityNameEl.text(cityName.toUpperCase() + '(' + currentDate + ')');

                var currentWeatherIconEl = $("#current-icon");
                currentWeatherIconEl.attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png")

                var currentTempEl = $("#todaytemp");
                currentTempEl.text (data.current.temp);

                var currentWindEl = $("#todaywind");
                currentWindEl.text (data.current.wind_speed);

                var currentHumidityEl = $("#todayhumidity");
                currentHumidityEl.text (data.current.humidity);



                for(var i = 0; i < dailyDivs.length; i++){
                    var humanDateFormat = new Date(data.daily[i + 1].dt * 1000).toLocaleDateString("en-US");


                    dailyDivs [i].find(".dateText").text(humanDateFormat);
                    dailyDivs[i].find(".weathericon").attr("src", "https://openweathermap.org/img/wn/" + data.daily[i + 1].weather[0].icon + ".png");
                    dailyDivs[i].find(".tempText").text(data.daily[i+1].temp.day);
                    dailyDivs[i].find(".humidityText").text(data.daily[i+1].humidity);
                    dailyDivs[i].find(".windText").text(data.daily[i+1].wind_speed);
                }
            })
        }
    })
}



