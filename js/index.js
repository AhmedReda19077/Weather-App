// Start Light Mood
var toggleBtn = document.getElementById("modeToggle");

toggleBtn.onclick = function () {

    if (document.body.classList.contains("light-mode")) {
        document.body.classList.remove("light-mode");
    } else {
        document.body.classList.add("light-mode");
    }

};
// End Light Mood

let todayName = document.getElementById("todayDateDayName");
let todayNumber = document.getElementById("todayDateDayNumber");
let todayMonth = document.getElementById("todayDateMonth");
let todayLocation = document.getElementById("todayLocation");
let todayTemp = document.getElementById("todayTemp");
let todayConditionImg = document.getElementById("todayConditionImg");
let todayConditionText = document.getElementById("todayConditionText");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");


let nextDay = document.getElementsByClassName("next-day-name");
let nextMaxTemp = document.getElementsByClassName("next-max-temp")
let nextMinTemp = document.getElementsByClassName("next-min-temp")
let nextConditionImg = document.getElementsByClassName("next-condition-img")
let nextConditionText = document.getElementsByClassName("next-condition-text")


let searchInput = document.getElementById("search")


// Fetch API Data

async function getWeatherData(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=19f63d49741042cb8ee20521251007&q=${cityName}&days=3`);
    let weatherData = await weatherResponse.json();
    return weatherData;
}


// Display Today Data

function displayTodayData(data) {
    let todaydate = new Date();
    todayName.innerHTML = todaydate.toLocaleDateString("en-US", { weekday: "long" });
    todayNumber.innerHTML = todaydate.getDate();
    todayMonth.innerHTML = todaydate.toLocaleDateString("en-US", { month: "long" })
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src", "https:" + data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph + "Km/h";
    compass.innerHTML = data.current.wind_dir;
}

// Display Next Days Data

function displayNextData(data) {
    let forcastdata = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forcastdata[i + 1].date);
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" });
        nextMaxTemp[i].innerHTML = forcastdata[i + 1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forcastdata[i + 1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src", "https:" + forcastdata[i + 1].day.condition.icon);
        nextConditionText[i].innerHTML = forcastdata[i + 1].day.condition.text;
    }
}

// Weather App

async function weatherApp(city = "Kafr Ash Shaykh") {
    let weatherData = await getWeatherData(city);
    if(!weatherData.error) {
        displayTodayData(weatherData);
        displayNextData(weatherData);
    }
}

weatherApp()

searchInput.addEventListener("input", function () {
    weatherApp(searchInput.value)
})