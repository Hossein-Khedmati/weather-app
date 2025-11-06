import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Menu,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
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

          {/* Search bar */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              px: 2,
              flex: 1,
              maxWidth: 400,
            }}
          >
            <SearchIcon color="action" />
            <InputBase
              placeholder={t("enterName")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
            />
          </Box>

          {/* Settings Button */}
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <SettingsIcon />
          </IconButton>

          {/* Small Settings Dropdown */}
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
              <ExitToApp />{t("logout")}
            </Button>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
