import * as m from "framer-motion/m";
import { LoaderCircle } from "lucide-preact";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { gameStore } from "../store/game-store";
import { t } from "../store/i18n-store";

export function StartScreen() {
  return (
    <Modal>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-semibold pt-2">{t("appTitle")}</span>
        <p className="text text-text/70 mt-8 mb-0 pb-2">
          {t("secondsPerRound")}
        </p>
        <div className="flex gap-3 w-full relative">
          <div
            className="absolute top-0 h-full rounded-lg bg-success transition-[left] duration-300 ease-out"
            style={{
              width: "calc((100% - 2.25rem) / 4)",
              left: `calc(${[10, 30, 60, 90].indexOf(
                gameStore.secondsPerRound
              )} * (100% + 0.75rem) / 4)`,
            }}
          />
          {[10, 30, 60, 90].map((seconds) => (
            <button
              key={seconds}
              onClick={() => gameStore.changeSecondsPerRound(seconds)}
              className="flex-1 h-12 rounded-lg font-bold text-lg relative z-10"
            >
              <m.span
                className="relative top-px"
                animate={{
                  color:
                    gameStore.secondsPerRound === seconds
                      ? "var(--color-white)"
                      : "var(--color-text)",
                }}
                transition={{ duration: 0.2 }}
              >
                {seconds}
              </m.span>
            </button>
          ))}
        </div>

        <div className="mt-9" />
        {/* Wiggle only once the player has hesitated; picking a round length restarts the wait */}
        <Button
          key={gameStore.secondsPerRound}
          variant="success"
          onClick={() => {
            gameStore.startTimer();
          }}
          animate={{ rotate: [0, -3, 3, -3, 3, 0] }}
          transition={{
            delay: 3,
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2.5,
          }}
        >
          {gameStore.isLoadingWords ? (
            <LoaderCircle size={28} className="animate-spin" />
          ) : (
            <span className="font-semibold text-xl">{t("start")}</span>
          )}
        </Button>
      </div>
    </Modal>
  );
}
