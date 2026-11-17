import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { gameStore } from "../store/game-store";
import { t } from "../store/i18n-store";

type Props = {
  guessed: string[];
  skipped: string[];
};

export function FinishScreen({ guessed, skipped }: Props) {
  return (
    <Modal>
      <div className="flex flex-col items-center z-[11] w-full">
        <span className="text-5xl font-bold mb-8">
          {t("score")} {guessed.length}
        </span>

        <div className="w-full mb-8 space-y-3">
          {guessed.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {guessed.map((word) => (
                <div
                  key={`guess-${word}`}
                  className="flex items-center gap-1.5 bg-success/10 px-3 py-1.5 rounded-lg"
                >
                  <span className="text-success text-sm">✓</span>
                  <span className="text-success font-semibold capitalize">
                    {word}
                  </span>
                </div>
              ))}
            </div>
          )}

          {skipped.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {skipped.map((word) => (
                <div
                  key={`skip-${word}`}
                  className="flex items-center gap-1.5 bg-error/10 px-3 py-1.5 rounded-lg"
                >
                  <span className="text-error text-sm">✗</span>
                  <span className="text-error font-semibold capitalize">
                    {word}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          <Button
            variant="success"
            onClick={() => {
              gameStore.playAgain();
            }}
          >
            <span className="font-semibold text-lg">{t("playAgain")}</span>
          </Button>

          <button
            onClick={() => {
              gameStore.restart();
            }}
            className="w-full py-3 -mb-3 text-text/60 text-lg font-semibold hover:text-text/80 transition-colors cursor-pointer select-none"
          >
            {t("quit")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
