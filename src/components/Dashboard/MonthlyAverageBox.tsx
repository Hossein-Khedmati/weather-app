import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import { getHistoricalDaily } from "../../api/openMeteo";

interface MonthlyAverageBoxProps {
  lat: number;
  lon: number;
}

interface ChartData {
  month: string;
  avgTemp: number;
}

const MonthlyAverageBox: React.FC<MonthlyAverageBoxProps> = ({ lat, lon }) => {
  const { i18n } = useTranslation();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  const monthNamesEN = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const monthNamesFA = [
    "ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن",
    "جولای", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر",
  ];

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const year = new Date().getFullYear() - 1;
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;

        const data = await getHistoricalDaily(lat, lon, startDate, endDate);

        const tempsMax = data.daily.temperature_2m_max;
        const tempsMin = data.daily.temperature_2m_min;
        const dates = data.daily.time;

        const monthlyTemps: { [month: number]: number[] } = {};

        dates.forEach((date: string, i: number) => {
          const month = new Date(date).getMonth();
          const avg = (tempsMax[i] + tempsMin[i]) / 2;
          if (!monthlyTemps[month]) monthlyTemps[month] = [];
          monthlyTemps[month].push(avg);
        });

        const names = i18n.language === "fa" ? monthNamesFA : monthNamesEN;

        const chartFormatted: ChartData[] = Object.keys(monthlyTemps).map((m) => {
          const month = parseInt(m, 10);
          const temps = monthlyTemps[month];
          const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
          return { month: names[month], avgTemp: Number(avgTemp.toFixed(1)) };
        });

        setChartData(chartFormatted);
      } catch (err) {
        console.error("Error loading monthly average data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lat, lon, i18n.language]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        p: 3,
        boxShadow: 3,
        height: 400,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {i18n.language === "fa"
          ? "میانگین دمای ماهانه"
          : "Average Monthly Temperature"}
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="avgTemp"
              stroke="#1976d2"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default MonthlyAverageBox;
