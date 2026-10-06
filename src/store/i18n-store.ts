import { makeAutoObservable } from "mobx";
import { persist } from "../lib/persist";
import {
  Language,
  getTranslations,
  TranslationKey,
} from "../i18n/translations";

class I18nStore {
  language: Language = "en";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    persist(this, { name: "I18nStore", fields: ["language"] });
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
