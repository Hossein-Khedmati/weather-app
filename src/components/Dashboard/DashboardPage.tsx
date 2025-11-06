import React, { useState } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import { getCoordinates } from "../../api/geocoding";
import CurrentWeatherBox from "./CurrentWeatherBox";
import TwoWeekForecastBox from "./TwoWeekForecastBox";
import MonthlyAverageBox from "./MonthlyAverageBox";

const DashboardPage: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lon: number; name: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleCitySearch = async (query: string) => {
    if (!query.trim()) return;
    setCity(query);
    setError("");
    setLoading(true);
    try {
      const { lat, lon, name } = await getCoordinates(query);
      setCoords({ lat, lon, name });
    } catch (err) {
      console.error(err);
      setError("City not found");
      setCoords(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header onSearch={handleCitySearch} toggleTheme={toggleTheme} />

      <Box sx={{ p: 4 }}>
        {!city && (
          <Typography variant="h6" color="text.secondary">
            {t("welcome")}
          </Typography>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        )}

        {coords && !loading && (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {/* Row 1 */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ width: "100%", height: "100%" }}>
                <CurrentWeatherBox
                  lat={coords.lat}
                  lon={coords.lon}
                  cityName={coords.name}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ width: "100%", height: "100%" }}>
                <MonthlyAverageBox lat={coords.lat} lon={coords.lon} />
              </Box>
            </Grid>

            {/* Row 2 */}
            <Grid size={{ xs: 12}}>
              <Box sx={{ width: "100%" }}>
                <TwoWeekForecastBox lat={coords.lat} lon={coords.lon} />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
