import { Counter } from "../ui/counter";
import { Countdown } from "../ui/countdown";
import { CardDeck } from "../ui/card-deck";
import { gameStore } from "../store/game-store";

export function GameScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <div className="flex justify-center mb-8">
        <Countdown />
      </div>

      <div className="flex justify-center">
        <CardDeck />
      </div>

      <div className="flex justify-center gap-12 mt-8">
        <Counter variant="error" value={gameStore.skipped.length} />
        <Counter variant="success" value={gameStore.guessed.length} />
      </div>
    </div>
  );
}
