import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { Language, getTranslations, TranslationKey } from "./translations";

class I18nStore {
  language: Language = "en";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: "I18nStore",
      properties: ["language"],
      storage: window.localStorage,
    });
  }

  setLanguage(lang: Language) {
    this.language = lang;
  }

  get translations() {
    return getTranslations(this.language);
  }
}

export const i18nStore = new I18nStore();

export function t(key: TranslationKey): string {
  return i18nStore.translations[key];
}
