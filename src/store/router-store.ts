import { makeAutoObservable } from "mobx";
import { makeLoggable } from "mobx-log";
import { soundStore } from "./sound-store";

type Screen = "start-modal" | "game" | "finish" | "settings";

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
    soundStore.play("open");
    this.screen = "settings";
  }

  closeSettings() {
    soundStore.play("close");
    this.screen = "start-modal";
  }
}

export const routerStore = new RouterStore();
