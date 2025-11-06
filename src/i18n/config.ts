// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Login Page
      welcome: "Welcome to Weather Dashboard plaesese enter your city name and press Enter",
      enterName: "Enter your name",
      namePlaceholder: "Your name",
      submit: "Get Started",
      nameRequired: "Name is required",

      // Dashboard
      title: "Weather Dashboard",
      settings: "Settings",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      language: "Language",
      english: "English",
      persian: "Persian",
      logout: "Logout",
      cityName: "Enter City Name",

      // Weather texts
      feelsLike: "Feels like",
      high: "H",
      low: "L",
    },
  },
  fa: {
    translation: {
      // Login Page
      welcome: " به داشبورد آب و هوا خوش آمدید لطفا نام شهر خود را وارد کرده و اینتر را بزنید به انگلیسی",
      enterName: "نام خود را وارد کنید",
      namePlaceholder: "نام شما",
      submit: "شروع کنید",
      nameRequired: "نام الزامی است",

      // Dashboard
      title: "داشبورد آب و هوا",
      settings: "تنظیمات",
      theme: "تم",
      light: "روشن",
      dark: "تاریک",
      language: "زبان",
      english: "انگلیسی",
      persian: "فارسی",
      logout: "خروج",
      cityName: "نام شهر را وارد کنید",

      // Weather texts
      feelsLike: "دمای احساس‌شده",
      high: "حداکثر",
      low: "حداقل",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
