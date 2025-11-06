import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Login Page
      welcome: "Welcome to Weather Dashboard",
      enterName: "Enter your name",
      namePlaceholder: "Your name",
      submit: "Get Started",
      nameRequired: "Name is required",

      //Dahsborard
      title:"weather dashboard",
      language: "Language",
      english: "en",
      persian: "fa",
      settings: "Settings",
      theme: "Theme",
      logout: "Logout",
      close: "Close",
      searchResultsFor: "Search results for",
    },
  },
  fa: {
    translation: {
      // Login Page
      welcome: "خوش آمدید به داشبورد آب و هوا",
      enterName: "نام خود را وارد کنید",
      namePlaceholder: "نام شما",
      submit: "شروع کنید",
      nameRequired: "نام الزامی است",
      //Dahsborard
      title:"داشبورد آب و هوا",

      settings: "تنظیمات",
      theme: "تم",
      light: "روشن",
      dark: "تاریک",
      language: "زبان",
      english: "en",
      persian: "fa",
      logout: "خروج",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
