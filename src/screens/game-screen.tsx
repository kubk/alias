import { Counter } from "../ui/counter";
import { Countdown } from "../ui/countdown";
import { CardDeck } from "../ui/card-deck";
import { appStore } from "../store/app-store";

export function GameScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex justify-center mb-8">
        <Countdown />
      </div>

      <div className="flex justify-center">
        <CardDeck />
      </div>

      <div className="flex justify-center gap-12 mt-8">
        <Counter variant="error" value={appStore.skipped.length} />
        <Counter variant="success" value={appStore.guessed.length} />
      </div>
    </div>
  );
}
