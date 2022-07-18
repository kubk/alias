import { action, makeAutoObservable } from "mobx";
import { makeLoggable } from "mobx-log";
import { assert } from "ts-essentials";
import { getRandomWord } from "../lib/get-random-word";
import { makePersistable } from "mobx-persist-store";

type Screen = "start-modal" | "game" | "finish";

export class Store {
  cards = [getRandomWord(), getRandomWord()];
  skipped: string[] = [];
  guessed: string[] = [];
  secondsPerRound = 60;
  secondsLeft?: number;
  screen: Screen = "start-modal";
  private intervalId?: NodeJS.Timer;

  constructor() {
    makeAutoObservable(this);
    makeLoggable(this);
    makePersistable(this, {
      name: this.constructor.name,
      properties: ["secondsPerRound"],
      storage: window.localStorage,
    });
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
    this.secondsLeft = this.secondsPerRound;
    this.intervalId = setInterval(
      action(() => {
        assert(this.secondsLeft);
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

  changeSecondsPerRound(seconds: number) {
    this.secondsPerRound = seconds;
  }

  restart() {
    this.skipped = [];
    this.guessed = [];
    this.cards = [getRandomWord(), getRandomWord()];
    this.screen = "start-modal";
  }

  get isWarning() {
    if (!this.secondsLeft) {
      return false;
    }
    return this.secondsLeft <= 10
  }
}

export const store = new Store();
