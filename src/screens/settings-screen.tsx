import { observer } from "mobx-react-lite";
import * as m from "framer-motion/m";
import { ArrowLeft } from "lucide-preact";
import { Modal } from "../ui/modal";
import { routerStore } from "../store/router-store";
import { gameStore } from "../store/game-store";
import { i18nStore, t } from "../store/i18n-store";
import { languages, languageNames } from "../i18n/translations";

export const SettingsScreen = observer(function SettingsScreen() {
  return (
    <Modal
      footer={
        <p className="mt-2 text-xs text-yellow-800/50">
          {t("appVersion")}: {__COMMIT_HASH__}
        </p>
      }
    >
      <div className="flex flex-col items-center">
        <div className="w-full flex items-center mb-6">
          <m.button
            onClick={() => routerStore.closeSettings()}
            className="p-2 -ml-2 rounded-lg text-text/60 hover:text-text hover:bg-text/5 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={24} />
          </m.button>
          <span className="flex-1 text-center text-2xl font-semibold pr-8">
            {t("settings")}
          </span>
        </div>

        <div className="w-full space-y-6">
          <div>
            <p className="text-base text-text/70 mb-3">{t("language")}</p>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <m.button
                  key={lang}
                  onClick={() => gameStore.changeLanguage(lang)}
                  className="h-12 rounded-lg font-medium text-base"
                  animate={{
                    backgroundColor:
                      i18nStore.language === lang
                        ? "var(--color-success)"
                        : "rgba(34, 34, 34, 0.05)",
                    color:
                      i18nStore.language === lang
                        ? "var(--color-white)"
                        : "var(--color-text)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  {languageNames[lang]}
                </m.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});
