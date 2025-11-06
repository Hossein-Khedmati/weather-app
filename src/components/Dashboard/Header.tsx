import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContext";
import { ExitToApp } from "@mui/icons-material";

interface HeaderProps {
  onSearch: (query: string) => void;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, toggleTheme }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (
    event: React.MouseEvent<HTMLElement>,
    newLang: string | null
  ) => {
    if (newLang) {
      i18n.changeLanguage(newLang);
      document.dir = newLang === "fa" ? "rtl" : "ltr";
    }
  };

  const handleThemeToggle = (
    event: React.MouseEvent<HTMLElement>,
    newTheme: "light" | "dark" | null
  ) => {
    if (newTheme && newTheme !== theme.palette.mode) {
      toggleTheme();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(search);
    }
  };

  return (
    <>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {/* App Name */}
          <Typography variant="h6" sx={{ flexShrink: 0 }}>
            {t("title")}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Search TextField */}
            <TextField
              size="small"
              placeholder={t("cityName")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)", // Same on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)", // Same when focused
                  },
                },
              }}
            />

            {/* Settings Button */}
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <SettingsIcon />
            </IconButton>
          </Box>

          {/* Settings Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              mt: 1,
              "& .MuiPaper-root": {
                borderRadius: 3,
                p: 2,
                minWidth: 220,
              },
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              {t("theme")}
            </Typography>

            {/* Theme Toggle */}
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={theme.palette.mode}
              onChange={handleThemeToggle}
              size="small"
              fullWidth
              dir="ltr"
            >
              <ToggleButton value="light">{t("light")}</ToggleButton>
              <ToggleButton value="dark">{t("dark")}</ToggleButton>
            </ToggleButtonGroup>

            <Divider sx={{ my: 1.5 }} />

            <Typography variant="subtitle2" gutterBottom>
              {t("language")}
            </Typography>

            {/* Language Toggle */}
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={i18n.language}
              onChange={handleLanguageChange}
              size="small"
              fullWidth
              dir="ltr"

            >
              <ToggleButton value="en">{t("english")}</ToggleButton>
              <ToggleButton value="fa">{t("persian")}</ToggleButton>
            </ToggleButtonGroup>

            <Divider sx={{ my: 1.5 }} />

            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={() => {
                logout();
                handleCloseMenu();
              }}
            >
              <ExitToApp />
              {t("logout")}
            </Button>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
