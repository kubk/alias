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
  isWaitingLastWord = false;
  private intervalId?: NodeJS.Timer;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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
    if (this.isWaitingLastWord) {
      this.screen = "finish";
    }
  }

  addToCorrect(word: string) {
    this.guessed.push(word);
    if (this.isWaitingLastWord) {
      this.screen = "finish";
    }
  }

  startTimer() {
    this.isWaitingLastWord = false;
    this.screen = "game";
    this.secondsLeft = this.secondsPerRound;
    this.intervalId = setInterval(this.handleTimerTick, 1000);
  }

  private handleTimerTick() {
    assert(this.secondsLeft);
    this.secondsLeft--;
    if (this.secondsLeft === 0) {
      assert(this.intervalId);
      clearInterval(this.intervalId);
      this.isWaitingLastWord = true;
    }
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
    if (this.secondsLeft === undefined) {
      return false;
    }
    return this.secondsLeft <= 10;
  }
}

export const store = new Store();
