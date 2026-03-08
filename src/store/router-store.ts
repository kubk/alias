import { makeAutoObservable } from "mobx";
import { makeLoggable } from "mobx-log";
import { haptic } from "../lib/haptics";

export type Screen = "start-modal" | "game" | "finish" | "settings";

class RouterStore {
  screen: Screen = "start-modal";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makeLoggable(this);
  }

  navigate(screen: Screen) {
    this.screen = screen;
  }

  openSettings() {
    haptic("light");
    this.screen = "settings";
  }

  closeSettings() {
    haptic("light");
    this.screen = "start-modal";
  }
}

export const routerStore = new RouterStore();
