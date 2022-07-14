import randomWords from 'random-words';
import {assert} from "ts-essentials";

export const getRandomWord = (): string => {
  // @ts-ignore
  return randomWords(1);
}
