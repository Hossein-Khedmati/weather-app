import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

/** ✅ 1. Get current weather */
export async function getCurrentWeather(lat: number, lon: number, timezone = "auto") {
  const params = {
    latitude: lat,
    longitude: lon,
    current: [
      "temperature_2m",
      "apparent_temperature",
      "weather_code",
      "wind_speed_10m",
      "relative_humidity_2m"
    ].join(","),
    timezone,
  };
  const { data } = await axios.get(BASE_URL, { params });
  return data;
}

/** ✅ 2. Get 14-day daily forecast */
export async function getDailyForecast(lat: number, lon: number, timezone = "auto") {
  const params = {
    latitude: lat,
    longitude: lon,
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "weather_code",
      "precipitation_sum"
    ].join(","),
    timezone,
    forecast_days: 14,
  };
  const { data } = await axios.get(BASE_URL, { params });
  return data;
}

/** ✅ 3. Get past year daily data to build monthly averages */
export async function getHistoricalDaily(lat: number, lon: number, startDate: string, endDate: string, timezone = "auto") {
  // historical/archive API (automatically served by /v1/archive on Open-Meteo)
  const url = "https://archive-api.open-meteo.com/v1/archive";
  const params = {
    latitude: lat,
    longitude: lon,
    start_date: startDate,
    end_date: endDate,
    daily: "temperature_2m_max,temperature_2m_min",
    timezone,
  };
  const { data } = await axios.get(url, { params });
  return data;
}
