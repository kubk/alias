import { useState } from "react";
import { Card } from "./card";
import { store } from "../store/store";
import { Button } from "./button";
import { AnimatePresence } from "../lib/animate-presence";

export function CardDeck() {
  const [index, setIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleSkip = () => {
    const currentCard = store.cards[store.cards.length - 1];
    if (currentCard && !isExiting) {
      setIsExiting(true);
      setExitX(-250);

      setTimeout(() => {
        store.addToSkipped(currentCard);
        setIndex(index + 1);
        setIsExiting(false);
        setExitX(0);
      }, 100);
    }
  };

  const handleCorrect = () => {
    const currentCard = store.cards[store.cards.length - 1];
    if (currentCard && !isExiting) {
      setIsExiting(true);
      setExitX(250);

      setTimeout(() => {
        setIndex(index + 1);
        setIsExiting(false);
        setExitX(0);
        store.addToCorrect(currentCard);
      }, 100);
    }
  };

  const currentCard = store.cards[store.cards.length - 1];
  const nextCard = store.cards[store.cards.length - 2];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-[320px]">
        <AnimatePresence initial={false}>
          {nextCard && <Card key={nextCard} word={nextCard} isFront={false} />}
          {currentCard && (
            <Card
              key={currentCard}
              word={currentCard}
              isFront={true}
              exitX={exitX}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mt-12 w-[290px]">
        <Button onClick={handleSkip} variant="error" className="flex-1">
          Skip
        </Button>
        <Button onClick={handleCorrect} variant="success" className="flex-1">
          Correct
        </Button>
      </div>
    </div>
  );
}
