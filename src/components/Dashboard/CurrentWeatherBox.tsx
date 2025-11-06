import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { getCurrentWeather, getDailyForecast } from "../../api/openMeteo";
import { mapWeatherCode } from "../../utils/weatherCodes";
import { useTranslation } from "react-i18next";

interface CurrentWeatherBoxProps {
  lat: number;
  lon: number;
  cityName: string;
}

const CurrentWeatherBox: React.FC<CurrentWeatherBoxProps> = ({ lat, lon, cityName }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState<any>(null);
  const [daily, setDaily] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        const [curData, dailyData] = await Promise.all([
          getCurrentWeather(lat, lon),
          getDailyForecast(lat, lon),
        ]);
        setCurrent(curData);
        setDaily(dailyData);
      } catch (err) {
        console.error("Weather error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [lat, lon]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={300}>
        <CircularProgress />
      </Box>
    );

  const code = current?.current?.weather_code ?? 0;
  const { label, icon } = mapWeatherCode(code);

  const currentTemp = Math.round(current?.current?.temperature_2m ?? 0);
  const feelsLike = Math.round(current?.current?.apparent_temperature ?? 0);
  const todayMax = Math.round(daily?.daily?.temperature_2m_max?.[0] ?? 0);
  const todayMin = Math.round(daily?.daily?.temperature_2m_min?.[0] ?? 0);

  // 📅 Persian or English locale
  const locale = i18n.language === "fa" ? "fa-IR" : "en-US";
  const dateStr = time.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = time.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: theme.palette.background.paper,
        height: "100%",
        direction: i18n.language === "fa" ? "rtl" : "ltr",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {cityName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dateStr}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {timeStr}
            </Typography>
          </Box>
          <Typography fontSize={60}>{icon}</Typography>
        </Box>

        <Box mt={3} display="flex" alignItems="center" justifyContent="space-between" flexGrow={1}>
          <Box>
            <Typography variant="h2" fontWeight={500}>
              {currentTemp}°C
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {t("feelsLike")} {feelsLike}°C
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {t("high")}: {todayMax}°C {t("low")}: {todayMin}°C
            </Typography>
          </Box>
          <Box textAlign={i18n.language === "fa" ? "left" : "right"}>
            <Typography variant="h6">{label}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentWeatherBox;
