import { action, makeAutoObservable } from "mobx";
import { makeLoggable } from "mobx-log";
import { assert } from "ts-essentials";
import { getRandomWord } from "../get-random-word";

type Screen = "start-modal" | "game" | "finish";

export class Store {
  cards = [getRandomWord(), getRandomWord()];
  skipped: string[] = [];
  guessed: string[] = [];
  secondsLeft = 60;
  lastSecondsPerRound?: number;
  screen: Screen = "start-modal";
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
    this.screen = "game";
    this.intervalId = setInterval(
      action(() => {
        this.secondsLeft--;
        if (this.secondsLeft === 0) {
          assert(this.intervalId);
          clearInterval(this.intervalId);
          this.screen = "finish";
        }
      }),
      1000
    );
  }

  changeSecondsType(seconds: number) {
    this.secondsLeft = seconds;
    this.lastSecondsPerRound = seconds;
  }

  restart() {
    assert(this.lastSecondsPerRound);
    this.secondsLeft = this.lastSecondsPerRound;
    this.skipped = [];
    this.guessed = [];
    this.cards = [getRandomWord(), getRandomWord()];
    this.screen = "start-modal";
  }
}

export const store = new Store();
