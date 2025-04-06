const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getWeather } = require('./weatherController');

const app = express();
app.use(cors());

app.get('/weather', getWeather);

const PORT = process.env.REACT_APP_BACKEND_PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));