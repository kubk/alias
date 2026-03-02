import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { appStore } from "../store/app-store";
import { t } from "../i18n/i18n-store";

export function FinishScreen() {
  return (
    <Modal>
      <div className="flex flex-col items-center z-[11] w-full">
        <span className="text-5xl font-bold mb-8">
          {t("score")} {appStore.guessed.length}
        </span>

        <div className="w-full mb-8 space-y-3">
          {appStore.guessed.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {appStore.guessed.map((word) => (
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

          {appStore.skipped.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {appStore.skipped.map((word) => (
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
              appStore.playAgain();
            }}
          >
            <span className="font-semibold text-lg">{t("playAgain")}</span>
          </Button>

          <button
            onClick={() => {
              appStore.restart();
            }}
            className="text-text/60 text-sm hover:text-text/80 transition-colors mt-1"
          >
            {t("quit")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
