import englishWords from "./top-2000-english-words.json";
import russianWords from "./top-2000-russian-words.json";
import type { Language } from "../i18n/translations";

const wordLists: Record<Language, string[]> = {
  en: englishWords,
  ru: russianWords,
};

const usedWords = new Set<string>();

export function resetUsedWords() {
  usedWords.clear();
}

export function getRandomWord(language: Language): string {
  const words = wordLists[language];

  // Reset when pool is exhausted
  if (usedWords.size >= words.length) {
    usedWords.clear();
  }

  let word: string;
  do {
    word = words[Math.floor(Math.random() * words.length)];
  } while (usedWords.has(word));

  usedWords.add(word);
  return word;
}
