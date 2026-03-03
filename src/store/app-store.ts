import { makeAutoObservable } from "mobx";
import { makeLoggable } from "mobx-log";
import { assert } from "ts-essentials";
import { getRandomWord, resetUsedWords } from "../lib/get-random-word";
import { makePersistable } from "mobx-persist-store";
import { i18nStore } from "./i18n-store";
import type { Language } from "../i18n/translations";
import { haptic } from "../lib/haptics";

type Screen = "start-modal" | "game" | "finish" | "settings";

export class Store {
  cards: string[] = [];
  skipped: string[] = [];
  guessed: string[] = [];
  secondsPerRound = 60;
  secondsLeft?: number;
  screen: Screen = "start-modal";
  isWaitingLastWord = false;
  private intervalId?: NodeJS.Timeout;

  constructor() {
    this.cards = [
      getRandomWord(i18nStore.language),
      getRandomWord(i18nStore.language),
    ];
    makeAutoObservable(this, {}, { autoBind: true });
    makeLoggable(this);
    makePersistable(this, {
      name: this.constructor.name,
      properties: ["secondsPerRound"],
      storage: window.localStorage,
    });
  }

  private addRandomCard() {
    this.cards.pop();
    this.cards.unshift(getRandomWord(i18nStore.language));
  }

  addToSkipped(word: string) {
    haptic("light");
    this.skipped.push(word);
    if (this.isWaitingLastWord) {
      this.screen = "finish";
    }
    this.addRandomCard();
  }

  addToCorrect(word: string) {
    haptic("success");
    this.guessed.push(word);
    if (this.isWaitingLastWord) {
      this.screen = "finish";
    }
    this.addRandomCard();
  }

  startTimer() {
    haptic("light");
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
      haptic("heavy");
    }
  }

  changeSecondsPerRound(seconds: number) {
    haptic("selection");
    this.secondsPerRound = seconds;
  }

  private resetGame() {
    this.skipped = [];
    this.guessed = [];
    this.cards = [
      getRandomWord(i18nStore.language),
      getRandomWord(i18nStore.language),
    ];
  }

  playAgain() {
    haptic("light");
    this.resetGame();
    this.startTimer();
  }

  restart() {
    haptic("light");
    this.resetGame();
    this.screen = "start-modal";
  }

  openSettings() {
    haptic("light");
    this.screen = "settings";
  }

  changeLanguage(lang: Language) {
    if (lang === i18nStore.language) return;
    haptic("selection");
    i18nStore.setLanguage(lang);
    resetUsedWords();
    this.resetGame();
  }

  closeSettings() {
    haptic("light");
    this.screen = "start-modal";
  }

  get isWarning() {
    if (this.secondsLeft === undefined) {
      return false;
    }
    return this.secondsLeft <= 10;
  }
}

export const appStore = new Store();
