export const languages = ["en", "ru"] as const;
export type Language = typeof languages[number];

export const languageNames: Record<Language, string> = {
  en: "English",
  ru: "Русский",
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
    language: "Language & words",
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
    language: "Язык и слова",
    back: "Назад",
  },
} as const;

export type TranslationKey = keyof typeof translations["en"];

export function getTranslations(lang: Language) {
  return translations[lang];
}
