import { makeAutoObservable } from "mobx";
import { makeLoggable } from "mobx-log";
import { assert } from "../lib/assert";
import {
  getRandomWord,
  hasWords,
  loadWords,
  resetUsedWords,
} from "../lib/get-random-word";
import { persist } from "../lib/persist";
import { i18nStore } from "./i18n-store";
import type { Language } from "../i18n/translations";
import { soundStore } from "./sound-store";
import { routerStore } from "./router-store";

class GameStore {
  cards: string[] = [];
  skipped: string[] = [];
  guessed: string[] = [];
  secondsPerRound = 60;
  secondsLeft?: number;
  isWaitingLastWord = false;
  isLoadingWords = false;
  private intervalId?: ReturnType<typeof setInterval>;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makeLoggable(this);
    persist(this, { name: "GameStore", fields: ["secondsPerRound"] });
    loadWords(i18nStore.language);
  }

  private addRandomCard() {
    this.cards.pop();
    this.cards.unshift(getRandomWord(i18nStore.language));
  }

  addToSkipped(word: string) {
    soundStore.play("close", { emphasis: "subtle" });
    this.skipped.push(word);
    if (this.isWaitingLastWord) {
      routerStore.navigate("finish");
    }
    this.addRandomCard();
  }

  addToCorrect(word: string) {
    soundStore.play("success", { emphasis: "subtle" });
    this.guessed.push(word);
    if (this.isWaitingLastWord) {
      routerStore.navigate("finish");
    }
    this.addRandomCard();
  }

  async startTimer() {
    if (this.isLoadingWords) return;
    soundStore.play("tap");
    const { language } = i18nStore;
    if (!hasWords(language)) {
      this.isLoadingWords = true;
      try {
        await loadWords(language);
      } finally {
        this.isLoadingWords = false;
      }
      if (
        routerStore.screen !== "start-modal" ||
        i18nStore.language !== language
      ) {
        return;
      }
    }
    this.cards = [getRandomWord(language), getRandomWord(language)];
    this.isWaitingLastWord = false;
    routerStore.navigate("game");
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
      soundStore.play("attention");
    }
  }

  changeSecondsPerRound(seconds: number) {
    soundStore.play("select");
    this.secondsPerRound = seconds;
  }

  private resetGame() {
    this.skipped = [];
    this.guessed = [];
  }

  playAgain() {
    this.resetGame();
    this.startTimer();
  }

  restart() {
    soundStore.play("navigate", { direction: "back" });
    this.resetGame();
    routerStore.navigate("start-modal");
  }

  changeLanguage(lang: Language) {
    if (lang === i18nStore.language) return;
    soundStore.play("select");
    i18nStore.setLanguage(lang);
    resetUsedWords();
    loadWords(lang);
  }

  get currentCard() {
    return this.cards[this.cards.length - 1];
  }

  get nextCard() {
    return this.cards[this.cards.length - 2];
  }

  get isWarning() {
    if (this.secondsLeft === undefined) {
      return false;
    }
    return this.secondsLeft <= 10;
  }
}

export const gameStore = new GameStore();
