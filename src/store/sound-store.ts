import { makeAutoObservable } from "mobx";
import { play, unlock, type PlayOptions, type SoundName } from "cuelume";
import { persist } from "../lib/persist";

class SoundStore {
  isEnabled = true;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    persist(this, { name: "SoundStore", fields: ["isEnabled"] });
  }

  play(sound: SoundName, options?: PlayOptions) {
    if (this.isEnabled) {
      play(sound, options);
    }
  }

  async setIsEnabled(isEnabled: boolean) {
    if (isEnabled === this.isEnabled) return;
    this.isEnabled = isEnabled;
    if (isEnabled && (await unlock())) {
      this.play("toggle");
    }
  }
}

export const soundStore = new SoundStore();
