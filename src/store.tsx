import { makeAutoObservable } from "mobx";
import { makeLoggable } from "mobx-log";
import { getRandomWord } from "./get-random-word";

export class Store {
  cards = [getRandomWord(), getRandomWord()];
  skipped: string[] = [];
  guessed: string[] = [];

  constructor() {
    makeAutoObservable(this);
    makeLoggable(this);
  }

  addRandomCard() {
    this.cards.pop();
    this.cards.unshift(getRandomWord());
  }

  addToSkipped(word: string) {
    this.skipped.push(word);
  }

  addToCorrect(word: string) {
    this.guessed.push(word);
  }
}

export const store = new Store();
