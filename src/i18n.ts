import i18n from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  // load translations using HTTP -> see /public/locales
  .use(I18NextHttpBackend)
  // detect user language from browser
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "uk"],
    fallbackLng: "en",
  });

export default i18n;
