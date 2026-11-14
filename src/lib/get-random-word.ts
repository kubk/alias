import { assert } from "./assert";
import type { Language } from "../i18n/translations";

const wordListLoaders: Record<Language, () => Promise<{ default: string[] }>> =
  {
    en: () => import("./top-2000-english-words.json"),
    ru: () => import("./top-2000-russian-words.json"),
  };

const wordLists: Partial<Record<Language, string[]>> = {};
const loadingWordLists: Partial<Record<Language, Promise<void>>> = {};

export function loadWords(language: Language): Promise<void> {
  return (loadingWordLists[language] ??= wordListLoaders[language]().then(
    (module) => {
      wordLists[language] = module.default;
    },
    (error) => {
      delete loadingWordLists[language];
      throw error;
    },
  ));
}

export function hasWords(language: Language): boolean {
  return language in wordLists;
}

const usedWords = new Set<string>();

export function resetUsedWords() {
  usedWords.clear();
}

export function getRandomWord(language: Language): string {
  const words = wordLists[language];
  assert(words, `Words for "${language}" are not loaded`);

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
