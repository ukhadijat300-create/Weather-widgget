// ========== WEATHER PROGRAM ========//
const form = document.querySelector("form");

const apikey = "93d10eda1167ee72c75e95b8697a74b8";


async function getweatherData(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const city_name = city.toUpperCase();

    const eyebrown = document.getElementById("eyebrown");
    const maincity = document.getElementById("cityName");
    const weather = document.getElementById("weather");
    const emoji = document.getElementById("emoji");
    const temperature = document.getElementById("temp");

    try {

        let response = await fetch(url);

        if (!response.ok) {
            console.log(`HTTP ERROR: ${response.status}`);
            return;
        }

        let data = await response.json();
        let weather_report = data.weather[0];
        let weather_status = weather_report.main;
        let weather_emoji;

        switch (weather_status) {
            case "Thunderstorm":
                weather_emoji = "🌧️";
                break;
            case "Drizzle":
            case "Rain":
                weather_emoji = "⛈️";
                break;
            case "Snow":
                weather_emoji = "❄️";
                break;
            case "Clear":
                weather_emoji = "☀️";
                break;
            case "Clouds":
                weather_emoji = "☁️";
                break;
            case "Mist":
            case "Smoke":
            case "Haze":
            case "dust":
            case "Fog":
            case "Sand":
            case "Ash":
            case "Squall":
            case "Tornado":
                weather_emoji = "💨";
                break;
            default:
                weather_emoji = "🌡️";

        }

        let temp = data.main.temp;
        let kelvintoCelsius = temp - 273.15;
        kelvintoCelsius = kelvintoCelsius.toFixed(2);


        // output of the weather data
        eyebrown.textContent = city_name;
        maincity.textContent = `City: ${city_name}`;
        weather.textContent = `weather: ${weather_status}`;
        emoji.textContent = weather_emoji;
        temperature.textContent = `Temperature: ${kelvintoCelsius}`;
    } catch (e) {
        console.error(`Error: ${e.name}`);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const getCity = document.getElementById("city").value.trim().toLowerCase();
    getweatherData(getCity);
});