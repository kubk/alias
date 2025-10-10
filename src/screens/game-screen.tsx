import { Counter } from "../ui/counter";
import { Countdown } from "../ui/countdown";
import { CardDeck } from "../ui/card-deck";
import { store } from "../store/store";

export function GameScreen() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-center mt-8">
        <Countdown />
      </div>

      <div className="overflow-hidden flex justify-center pt-10">
        <CardDeck />
      </div>

      <div className="flex justify-center gap-12 mt-8">
        <Counter variant="error" value={store.skipped.length} />
        <Counter variant="success" value={store.guessed.length} />
      </div>
    </div>
  );
}
