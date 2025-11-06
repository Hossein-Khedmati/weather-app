import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  useTheme,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const theme = useTheme(); // ✅ Get current MUI theme (light or dark)
  const { user } = useAuth();

  // Redirect to dashboard if already logged in

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  // Set document direction based on language
  useEffect(() => {
    document.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(t("nameRequired"));
      return;
    }

    login(name.trim());
    navigate("/dashboard");
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default, // ✅ Dynamic background
        color: theme.palette.text.primary,
        padding: 2,
        gap: 2,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxHeight: "70vh",
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper, // ✅ Dynamic paper color
            transition: "background-color 0.3s ease",
          }}
        >
          <Grid container columns={10}>
            {/* Left Side - Login Form */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                padding: { xs: 3, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                {t("login")}
              </Typography>

              <Typography variant="body1" sx={{ marginBottom: 3 }}>
                {t("enterName")}
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={t("namePlaceholder")}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  error={!!error}
                  helperText={error}
                  sx={{ marginBottom: 2 }}
                  autoFocus
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  {t("submit")}
                </Button>
              </Box>
            </Grid>

            {/* Right Side - Weather Image */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                backgroundColor: theme.palette.primary.light, // ✅ match theme tone
                minHeight: "400px",
                maxHeight: "70vh",
                transition: "background-color 0.3s ease",
              }}
            >
              <Box
                component="img"
                src="./login.png"
                alt="Weather illustration"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Language Selector - Outside the Box */}
      <Box sx={{ width: "100%", maxWidth: "200px" }}>
        <FormControl fullWidth size="small">
          <InputLabel>{t("language")}</InputLabel>
          <Select
            value={i18n.language}
            label={t("language")}
            onChange={handleLanguageChange}
            sx={{ backgroundColor: theme.palette.background.paper }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fa">فارسی</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default LoginPage;
