import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";
const resources = {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem("i18nextLng") ?? "en",
        fallbackLng: ["en"],
        debug: false,
        keySeparator: false,
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false,
            formatSeparator: ",",
        },
    });

export default i18n;
