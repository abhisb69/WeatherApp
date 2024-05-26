import React, { useEffect, useState } from "react";
import axios from "axios";
import "./weather.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { LuWind } from "react-icons/lu";
import { WiHumidity } from "react-icons/wi";
import { MdLocationOn } from "react-icons/md";
function Weather(props) {
  const [city, setCity] = useState("Bijapur");
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  async function getweather() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f94e29a28c6701444dd46bf288788198`
      );
      setData({
        name: response.data.name,
        icon: response.data.weather[0].icon,
        temp: response.data.main.temp,
        climate: response.data.weather[0].main,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
      });
    } catch (error) {
      setError(true);
    }
  }
  const handleWeather = () => {
    if (city.length === 0) {
      setError(true);
    } else {
      getweather();
      setError(false);
      setCity("");
    }
  };
  useEffect(() => {
    getweather();
  }, []);
  return (
    <div className="main-wrapper">
      <div className="weather-wrapper">
        <div className="input">
          <input
            type="text"
            placeholder="search..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <button onClick={handleWeather}>
            <HiMiniMagnifyingGlass />
          </button>
        </div>
        {error === true ? (
          <>
            <h1 className="error-wrapper">Enter a valid City!!!</h1>
          </>
        ) : (
          <>
            {" "}
            <div className="climate-info">
              <img
                src={`https://openweathermap.org/img/w/${data.icon}.png`}
                alt="icon"
              />
              <p className="temp">{data.temp} C</p>
              <p className="climate">{data.climate}</p>
              <div className="wind-humid">
                <div className="wind-info">
                  <h1 className="wind-icon">
                    <LuWind />
                  </h1>
                  <div>
                    <p className="windy-data">
                      {data.wind} <span>m/s</span>
                    </p>
                    <p className="windy">Wind speed</p>
                  </div>
                </div>
                <div className="wind-info">
                  <h1 className="wind-icon">
                    <WiHumidity />
                  </h1>
                  <div>
                    <p className="windy-data">{data.humidity}%</p>
                    <p className="windy">Humidity</p>
                  </div>
                </div>
              </div>
              <p className="city-name">
                <MdLocationOn />
                {data.name}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
