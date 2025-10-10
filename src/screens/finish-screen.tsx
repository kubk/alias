import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { store } from "../store/store";

export function FinishScreen() {
  return (
    <Modal marginTop={"32px"}>
      <div className="flex flex-col items-center z-[11] w-full">
        <span className="text-5xl font-bold mb-8">
          Score: {store.guessed.length}
        </span>

        <div className="w-full mb-8 space-y-3">
          {/* Success chips */}
          {store.guessed.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {store.guessed.map((word) => (
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

          {/* Skipped chips */}
          {store.skipped.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {store.skipped.map((word) => (
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

        <Button
          variant="success"
          onClick={() => {
            store.restart();
          }}
        >
          <span className="font-semibold text-lg">Play again!</span>
        </Button>
      </div>
    </Modal>
  );
}
