import words from './top-2000-english-words.json';

const usedWords: string[] = [];

export const getRandomWord = (): string => {
  const word = words[Math.floor(Math.random() * words.length)]

  // If a word was used during the session - try another word
  if (usedWords.includes(word)) {
    return getRandomWord();
  }

  usedWords.push(word);

  return word;
};
