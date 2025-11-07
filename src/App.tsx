import { useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginPage from "./components/Login/LoginPage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import "./i18n/config";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/Login/ProtectedRoutes";

function App() {
  const { i18n } = useTranslation();
  const storedMode = localStorage.getItem("themeMode") as
    | "light"
    | "dark"
    | null;
  const [mode, setMode] = useState<"light" | "dark">(storedMode || "dark");

  // تابع تغییر تم
  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  // ✅ ساخت تم با فونت فارسی و جهت درست بر اساس زبان
  const theme = useMemo(
    () =>
      createTheme({
        direction: i18n.language === "fa" ? "rtl" : "ltr",
        palette: {
          mode,
          primary: {
            main: "#0099e0", // قرمز
          },
          secondary: {
            main: "#dafeff",
          },
          background: {
            default: mode === "dark" ? "#121212" : "#ffffff",
            paper: mode === "dark" ? "#1e1e1e" : "#f5f5f5",
          },
        },
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
              element={
                <ProtectedRoute>
                  <DashboardPage toggleTheme={toggleTheme} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;