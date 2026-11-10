import * as m from "framer-motion/m";
import type { ComponentChildren } from "preact";
import { ArrowLeft } from "lucide-preact";
import { Modal } from "../ui/modal";
import { routerStore } from "../store/router-store";
import { gameStore } from "../store/game-store";
import { soundStore } from "../store/sound-store";
import { i18nStore, t } from "../store/i18n-store";
import { languages, languageNames } from "../i18n/translations";

function OptionButton(props: {
  isSelected: boolean;
  onClick: () => void;
  children: ComponentChildren;
}) {
  return (
    <m.button
      onClick={props.onClick}
      className="h-12 rounded-lg font-medium text-base"
      animate={{
        backgroundColor: props.isSelected
          ? "var(--color-success)"
          : "rgba(34, 34, 34, 0.05)",
        color: props.isSelected ? "var(--color-white)" : "var(--color-text)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      {props.children}
    </m.button>
  );
}

export function SettingsScreen() {
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
                <OptionButton
                  key={lang}
                  isSelected={i18nStore.language === lang}
                  onClick={() => gameStore.changeLanguage(lang)}
                >
                  {languageNames[lang]}
                </OptionButton>
              ))}
            </div>
          </div>
          <div>
            <p className="text-base text-text/70 mb-3">{t("sounds")}</p>
            <div className="grid grid-cols-2 gap-2">
              <OptionButton
                isSelected={soundStore.isEnabled}
                onClick={() => soundStore.setIsEnabled(true)}
              >
                {t("on")}
              </OptionButton>
              <OptionButton
                isSelected={!soundStore.isEnabled}
                onClick={() => soundStore.setIsEnabled(false)}
              >
                {t("off")}
              </OptionButton>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
