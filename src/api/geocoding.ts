import axios from "axios";

/**
 * Get coordinates for a city name using Open-Meteo geocoding API
 * @param city City name (e.g. "Tehran")
 */
export async function getCoordinates(city: string) {
  const url = "https://geocoding-api.open-meteo.com/v1/search";
  const { data } = await axios.get(url, {
    params: {
      name: city,
      count: 1,
      language: "en",
      format: "json",
    },
  });

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  const { latitude, longitude, name, country } = data.results[0];
  return { lat: latitude, lon: longitude, name, country };
}
