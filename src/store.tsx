import { action, makeAutoObservable } from "mobx";
import { makeLoggable } from "mobx-log";
import { getRandomWord } from "./get-random-word";
import { assert } from "ts-essentials";

export class Store {
  cards = [getRandomWord(), getRandomWord()];
  skipped: string[] = [];
  guessed: string[] = [];
  secondsLeft = 60;
  private intervalId?: number;

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

  startTimer() {
    this.intervalId = setInterval(
      action(() => {
        this.secondsLeft--;
        if (this.secondsLeft === 0) {
          assert(this.intervalId);
          clearInterval(this.intervalId);
        }
      }),
      1000
    );
  }

  get isRunning() {
    return !!this.intervalId;
  }
}

export const store = new Store();
