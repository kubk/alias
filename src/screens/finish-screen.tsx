import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { store } from "../store/store";

export function FinishScreen() {
  return (
    <Modal marginTop={"32px"}>
      <div className="flex flex-col items-center z-[11]">
        <span className="text-4xl">Result — {store.guessed.length}</span>

        <div className="flex w-full justify-between text-lg mt-6">
          <ul className="list-none p-0 m-0">
            <li>Skipped — {store.skipped.length}</li>
            {store.skipped.map((word) => (
              <li key={word} className="text-error font-semibold capitalize">
                {word}
              </li>
            ))}
          </ul>
          <ul className="list-none p-0 m-0">
            <li>Guessed — {store.guessed.length}</li>
            {store.guessed.map((word) => (
              <li key={word} className="text-success font-semibold capitalize">
                {word}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-9" />
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
