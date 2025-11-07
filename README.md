# 🌦️ Weather Dashboard (React + MUI + i18next)

A modern, bilingual (English–Persian) weather dashboard built with **React**, **TypeScript**, **Material UI (MUI)**, and **Recharts**.  
It displays current weather data and monthly temperature trends using the **Open-Meteo API**, featuring dark/light theme switching, language localization, and a simple authentication system.

---

## 🚀 Features

- 🔐 **Simple Login System** (context-based, no backend)
- 🌓 **Light & Dark Mode** with persistent theme preference
- 🌍 **Multi-language Support** (English / فارسی)
- 📊 **Monthly Temperature Chart** using Recharts
- ☁️ **Live Weather Data** from [Open-Meteo API](https://open-meteo.com/)
- 🧭 **Responsive Design** powered by MUI
- ⚙️ **Settings Menu** for theme, language, and logout
- 🪶 **Persian RTL Support** (Right-to-Left layout)
- 🖋️ **Custom Persian Font Integration**
- 🔍 **City Search Functionality**

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| UI Library | [Material UI (MUI)](https://mui.com/) |
| Charts | [Recharts](https://recharts.org/en-US/) |
| Internationalization | [i18next](https://www.i18next.com/) |
| Routing | [React Router DOM](https://reactrouter.com/) |
| State Management | React Context API |
| Language | TypeScript |
| Weather Data | [Open-Meteo API](https://open-meteo.com/) |

---

## 🏗️ Project Structure

```
src/
├── api/
│   └── weatherApi.ts          # Centralized API fetch functions
├── components/
│   ├── Header/                # Header with settings and search
│   ├── Dashboard/             # Weather and chart components
│   └── LoginPage/             # Login page
├── contexts/
│   └── AuthContext.tsx        # User authentication context
├── i18n/
├── App.tsx                    # Main app with routing
├── index.tsx                  # Entry point
└── theme.ts                   # MUI theme setup (light/dark)
```

---

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Hossein-Khedmati/weather-app
cd weather-dashboard
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Run the Project
```bash
npm start
# or
yarn start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Environment Variables

No API key is needed because Open-Meteo is a free and public API.  
If you wish to replace it with another API (like OpenWeatherMap), create a `.env` file and add:


Then update your API function accordingly.

---

## 🧠 How It Works

- The **LoginPage** authenticates users via local context.
- Once logged in, users are redirected to the **Dashboard**.
- The **Dashboard** fetches live weather data and historical monthly averages from the `api/weatherApi.ts` file.
- Users can switch language (English/فارسی) and theme (Light/Dark) directly from the **Header Settings**.
- All Persian UI is fully RTL and uses a Persian font for better readability.

---

## 🖋️ Adding Persian Font

You can add your Persian font (like *Vazirmatn* or *IRANSans*) in your `index.css` or MUI theme like this:

```css
@font-face {
  font-family: "Vazirmatn";
  src: url("/fonts/Vazirmatn.woff2") format("woff2");
  font-display: swap;
}

body {
  font-family: "Vazirmatn", "Roboto", sans-serif;
}
```

## 🧰 Future Improvements

- 🪣 Save user preferences in `localStorage`
- 🗺️ Add map-based location selection
- 📱 PWA support for offline access
- 🔔 Weather alerts and notifications

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 💡 Author

Developed with ❤️ by **Hossein Khedmati**
