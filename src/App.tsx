import { useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginPage from "./components/Login/LoginPage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import "./i18n/config";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const { i18n } = useTranslation();
  const [mode, setMode] = useState<"light" | "dark">("light");

  // تابع تغییر تم
  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ✅ ساخت تم با فونت فارسی و جهت درست بر اساس زبان
  const theme = useMemo(
    () =>
      createTheme({
        direction: i18n.language === "fa" ? "rtl" : "ltr",
        palette: { mode },
        typography: {
          fontFamily: [
            "Vazirmatn",
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif",
          ].join(","),
        },
      }),
    [mode, i18n.language]
  );

  // ✅ ست کردن dir در body برای هماهنگی کامل
  document.body.dir = i18n.language === "fa" ? "rtl" : "ltr";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={<DashboardPage toggleTheme={toggleTheme} />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
