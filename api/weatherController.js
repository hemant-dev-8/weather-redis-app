const axios = require('axios');
const redisClient = require('./redisClient');
require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function getWeather(req, res) {
  const city = req.query.city;

  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const cached = await redisClient.get(city.toLowerCase());

    if (cached) {
      return res.json({ source: 'cache', data: JSON.parse(cached) });
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    const { data } = await axios.get(url);

    await redisClient.set(city.toLowerCase(), JSON.stringify(data), { EX: 600 });

    res.json({ source: 'api', data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
}

module.exports = { getWeather };