import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../../../../public/locales/en-US/translation.json";
import translationPT from "../../../../public/locales/pt-BR/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

i18n.use(initReactI18next).init({
  debug: false,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18n;
