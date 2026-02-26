import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Modal } from "../ui/modal";
import { store } from "../store/store";
import { i18nStore, t } from "../i18n/i18n-store";
import { languages, languageNames, Language } from "../i18n/translations";

export function SettingsScreen() {
  return (
    <Modal>
      <div className="flex flex-col items-center">
        <div className="w-full flex items-center mb-6">
          <motion.button
            onClick={() => store.closeSettings()}
            className="p-2 -ml-2 rounded-lg text-text/60 hover:text-text hover:bg-text/5 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <span className="flex-1 text-center text-2xl font-semibold pr-8">
            {t("settings")}
          </span>
        </div>

        <div className="w-full">
          <p className="text-sm text-text/70 mb-3">{t("language")}</p>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <motion.button
                key={lang}
                onClick={() => i18nStore.setLanguage(lang)}
                className="h-12 rounded-lg font-medium text-base relative"
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                {languageNames[lang as Language]}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
