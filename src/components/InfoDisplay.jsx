import React, { useEffect, useState } from "react";
import cloud from "../assets/cloud.png";
import clear from "../assets/clear.png";
import mist from "../assets/mist.png";
import snow from "../assets/snow.png";
import rain from "../assets/rain.png";
import thunderstorm from "../assets/thunderstorm.png";

function InfoDisplay({ city }) {
  const OPENWEATHERMAP_API_KEY = "7d5ec2b45acc3f6eb3622b6341303b8e";
  const [weatherData, setWeatherData] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": cloud,
    "04n": cloud,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const predict = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== "200") {
        setForecast(null);
        return;
      }

      const fiveday_forecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(fiveday_forecast.slice(0, 5));
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setForecast(null);
    }
  };

  const search = async (city) => {
    try {
      const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;

      const response2 = await fetch(url2);
      const data = await response2.json();

      if (data.cod !== 200) {
        setError(data.message || "City not found");
        setWeatherData(false);
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        desc: data.weather[0].description,
        feels_like: data.main.feels_like,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        gust: data.wind.gust,
        icon: icon,
        lat: data.coord.lat,
        long: data.coord.lon,
      });

      setError(null);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setError("Unable to fetch weather data");
      setWeatherData(false);
    }
  };

  useEffect(() => {
    if (city) {
      search(city);
      predict(city);
    }
  }, [city]);

  if (error) {
    return (
      <div className="text-center text-red-600 p-6 rounded-xl bg-red-100 m-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Oops!</h2>
        <p>{error}</p>
      </div>
    );
  } else {
    return (
      <div className="info w-fit rounded-2xl flex flex-col gap-4 shadow-black m-4">
        <div className="flex gap-8">
          <div className="">
            <div className="flex items-end gap-4">
              <div className="weather-img">
                <img
                  src={weatherData.icon}
                  width={160}
                  height={160}
                  alt="img"
                />
              </div>
              <div className="">
                <div className="city capitalize text-xs mb-2 ml-0.5">
                  <span className="font-bold">{city}</span> •{" "}
                  {weatherData.lat > 0
                    ? `${Math.abs(weatherData.lat)}°N`
                    : `${Math.abs(weatherData.lat)}°S`}{" "}
                  /{" "}
                  {weatherData.long > 0
                    ? `${Math.abs(weatherData.long)}°E`
                    : `${Math.abs(weatherData.long)}°W`}
                </div>
                <div className="temp text-7xl font-medium">
                  {weatherData.temperature}°C
                </div>
                <div className="weather-condition text-3xl font-medium capitalize">
                  {weatherData.desc}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="info flex justify-around">
          <div className="info-card flex flex-col justify-center text-center w-full m-7 p-4 rounded-xl">
            <span className="font-medium">{weatherData.humidity}%</span>
            <p className="text-xs">Humidity</p>
          </div>
          <div className="info-card flex flex-col justify-center text-center w-full m-7 p-4 rounded-xl">
            <span className="font-medium">
              {Math.round(weatherData.windSpeed)}Km/h
            </span>
            <p className="text-xs">Wind Speed</p>
          </div>
          <div className="info-card flex flex-col justify-center text-center w-full m-7 p-4 rounded-xl">
            <span className="font-medium">{weatherData.gust}Km/h</span>
            <p className="text-xs">Gust</p>
          </div>
          <div className="info-card flex flex-col justify-center text-center w-full m-7 p-4 rounded-xl">
            <span className="font-medium">
              {Math.floor(weatherData.feels_like)}°C
            </span>
            <p className="text-xs">Feels like</p>
          </div>
          <div className="info-card flex flex-col justify-center text-center w-full m-7 p-4 rounded-xl">
            <span className="font-medium">
              {Math.floor(weatherData.temp_min)}°C /{" "}
              {Math.floor(weatherData.temp_max)}°C
            </span>
            <p className="text-xs">Min / Max</p>
          </div>
        </div>
        {forecast && (
          <div className="five-day flex justify-between">
            {forecast.map((item, index) => {
              const date = new Date(item.dt_txt);
              const day = days[date.getDay()];
              const icon = allIcons[item.weather[0].icon] || clear;

              return (
                <div
                  key={index}
                  className="day text-center p-4 flex flex-col flex-grow"
                >
                  <div className="font-medium text-sm mb-1">{day}</div>
                  <img
                    src={icon}
                    alt="icon"
                    width={40}
                    className="mx-auto mb-1"
                  />
                  <div className="text-sm">{Math.floor(item.main.temp)}°C</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default InfoDisplay;
