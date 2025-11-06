import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "./Header";
import { useTranslation } from "react-i18next";

const DashboardPage: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
  const [city, setCity] = useState("");
  const { t } = useTranslation();

  const handleCitySearch = (query: string) => {
    setCity(query);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header onSearch={handleCitySearch} toggleTheme={toggleTheme} />

      <Box sx={{ p: 4 }}>
        {city ? (
          <Typography variant="h5">
            {t("searchResultsFor")} {city}
          </Typography>
        ) : (
          <Typography variant="h6">{t("welcome")}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
