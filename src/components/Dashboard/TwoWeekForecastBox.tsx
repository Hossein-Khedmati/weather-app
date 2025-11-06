import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getDailyForecast } from "../../api/openMeteo";
import { mapWeatherCode } from "../../utils/weatherCodes";

interface Props {
  lat: number;
  lon: number;
}

const TwoWeekForecastBox: React.FC<Props> = ({ lat, lon }) => {
  const { i18n, t } = useTranslation();
  const [forecast, setForecast] = useState<
    { date: Date; max: number; min: number; code: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const weekdaysFA = ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];

  useEffect(() => {
    async function fetchForecast() {
      setLoading(true);
      try {
        const data = await getDailyForecast(lat, lon);
        const items = data.daily.time.map((day: string, i: number) => ({
          date: new Date(day),
          max: data.daily.temperature_2m_max[i],
          min: data.daily.temperature_2m_min[i],
          code: data.daily.weather_code[i],
        }));
        setForecast(items);
      } catch (error) {
        console.error("Forecast fetch failed", error);
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [lat, lon]);

  if (loading) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        {i18n.language === "fa" ? "پیش‌بینی دو هفته آینده" : "2-Week Forecast"}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {forecast.slice(0, 14).map((item, index) => {
          const weather = mapWeatherCode(item.code);
          const weekday = i18n.language === "fa"
            ? weekdaysFA[item.date.getDay()]
            : item.date.toLocaleDateString(undefined, { weekday: "short" });

          return (
            <Paper
              key={index}
              sx={{
                flex: "0 0 auto",
                width: 100,
                textAlign: "center",
                p: 2,
                bgcolor: "background.paper",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {weekday}
              </Typography>

              <Box my={1} sx={{ fontSize: "1.8rem" }}>
                {weather.icon}
              </Box>

              <Typography variant="body2" color="text.secondary">
                {i18n.language === "fa"
                  ? t(weather.label) || weather.label // اگر ترجمه داشت
                  : weather.label}
              </Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                {Math.round(item.max)}° / {Math.round(item.min)}°
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Paper>
  );
};

export default TwoWeekForecastBox;
