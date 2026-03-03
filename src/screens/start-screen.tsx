import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { motion } from "framer-motion";
import { appStore } from "../store/app-store";
import { t } from "../store/i18n-store";

export function StartScreen() {
  return (
    <Modal>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-semibold pt-2">{t("appTitle")}</span>
        <p className="text mt-8 mb-0 pb-2">{t("secondsPerRound")}</p>
        <div className="flex gap-3 w-full relative">
          <div
            className="absolute top-0 h-full rounded-lg bg-success transition-[left] duration-300 ease-out"
            style={{
              width: "calc((100% - 2.25rem) / 4)",
              left: `calc(${[10, 30, 60, 90].indexOf(appStore.secondsPerRound)} * (100% + 0.75rem) / 4)`,
            }}
          />
          {[10, 30, 60, 90].map((seconds) => (
            <button
              key={seconds}
              onClick={() => appStore.changeSecondsPerRound(seconds)}
              className="flex-1 h-12 rounded-lg font-bold text-lg relative z-10"
            >
              <motion.span
                animate={{
                  color:
                    appStore.secondsPerRound === seconds
                      ? "var(--color-white)"
                      : "var(--color-text)",
                }}
                transition={{ duration: 0.2 }}
              >
                {seconds}
              </motion.span>
            </button>
          ))}
        </div>

        <div className="mt-9" />
        <Button
          variant="success"
          onClick={() => {
            appStore.startTimer();
          }}
        >
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            className="font-semibold text-xl"
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.3,
            }}
          >
            {t("start")}
          </motion.div>
        </Button>
      </div>
    </Modal>
  );
}
