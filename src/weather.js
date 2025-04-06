import { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [source, setSource] = useState('');

  const getWeather = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_APP_URL}/weather?city=${city}`);
      setWeather(res.data.data);
      setSource(res.data.source);
    } catch (err) {
      alert('Failed to fetch weather data');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  }

  const handleCityName = (e) => {
    setCity(e.target.value.trim())
  }

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>{'🌦️ Weather App (Redis Cache)'}</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => handleCityName(e)}
        />

        <input type="submit" value="Get Weather" />
      </form>

      <br />

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}</h2>
          <p>🌡️ Temp: {weather.main.temp}°C</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>⛅ Description: {weather.weather[0].description}</p>
          <p className="source">🔁 Source: {source}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
