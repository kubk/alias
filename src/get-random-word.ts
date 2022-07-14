import randomWords from "random-words";
import { assert } from "ts-essentials";

const usedWords: string[] = [];

export const getRandomWord = (): string => {
  const word = randomWords(1) as any as string;

  if (usedWords.includes(word)) {
    return getRandomWord();
  }

  usedWords.push(word);

  return word;
};
