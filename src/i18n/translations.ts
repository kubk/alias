export const languages = ["en", "ru", "tr", "es"] as const;
export type Language = typeof languages[number];

export const languageNames: Record<Language, string> = {
  en: "English",
  ru: "Русский",
  tr: "Türkçe",
  es: "Español",
};

const translations = {
  en: {
    appTitle: "Alias game",
    secondsPerRound: "Seconds per round",
    start: "Start!",
    skip: "Skip",
    correct: "Correct",
    score: "Score:",
    playAgain: "Play again!",
    quit: "Quit",
    settings: "Settings",
    language: "App Language",
    back: "Back",
  },
  ru: {
    appTitle: "Алиас",
    secondsPerRound: "Секунд на раунд",
    start: "Старт!",
    skip: "Пропуск",
    correct: "Верно",
    score: "Счёт:",
    playAgain: "Ещё раз!",
    quit: "Выход",
    settings: "Настройки",
    language: "Язык приложения",
    back: "Назад",
  },
  tr: {
    appTitle: "Alias",
    secondsPerRound: "Tur süresi",
    start: "Başla!",
    skip: "Geç",
    correct: "Doğru",
    score: "Puan:",
    playAgain: "Tekrar oyna!",
    quit: "Çık",
    settings: "Ayarlar",
    language: "Uygulama Dili",
    back: "Geri",
  },
  es: {
    appTitle: "Alias",
    secondsPerRound: "Segundos por ronda",
    start: "¡Empezar!",
    skip: "Saltar",
    correct: "Correcto",
    score: "Puntos:",
    playAgain: "¡Otra vez!",
    quit: "Salir",
    settings: "Ajustes",
    language: "Idioma de la app",
    back: "Volver",
  },
} as const;

export type TranslationKey = keyof typeof translations["en"];

export function getTranslations(lang: Language) {
  return translations[lang];
}
