import { useState } from "react";
import { Card } from "./card";
import { colors } from "../lib/theme";
import { store } from "../store/store";
import { Button } from "./button";

const swipeBorder = 80;

export function CardDeck() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(
    null
  );

  const animateCardExit = (direction: "left" | "right", word: string) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setExitDirection(direction);

    if (direction === "left") {
      store.addToSkipped(word);
    } else {
      store.addToCorrect(word);
    }

    setTimeout(() => {
      setIsAnimating(false);
      setExitDirection(null);
      setTimeout(() => {
        store.addRandomCard();
      }, 0);
    }, 500);
  };

  const getCurrentCard = () => {
    return store.cards[store.cards.length - 1];
  };

  const handleSkip = () => {
    const currentCard = getCurrentCard();
    if (currentCard) {
      animateCardExit("left", currentCard);
    }
  };

  const handleCorrect = () => {
    const currentCard = getCurrentCard();
    if (currentCard) {
      animateCardExit("right", currentCard);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-[290px]">
        {store.cards.map((card, index) => {
          const isInFront = index === store.cards.length - 1;
          const isBelowCard = index === store.cards.length - 2;

          if (isInFront) {
            const targetX = exitDirection
              ? exitDirection === "left"
                ? -swipeBorder * 5
                : swipeBorder * 5
              : 0;
            const targetOpacity = exitDirection ? 0 : 1;
            const targetRotate = exitDirection
              ? exitDirection === "left"
                ? -10
                : 10
              : 0;
            const bgColor = exitDirection
              ? exitDirection === "left"
                ? ("error" as const)
                : ("success" as const)
              : ("card" as const);

            return (
              <Card
                word={card}
                key={card}
                bgColor={bgColor}
                style={{
                  zIndex: index,
                }}
                animate={{
                  x: targetX,
                  opacity: targetOpacity,
                  rotate: targetRotate,
                }}
              />
            );
          }

          if (isBelowCard) {
            return (
              <Card
                word={card}
                key={card}
                style={{
                  zIndex: index,
                }}
                animate={{
                  scale: isAnimating ? 1 : 0.9,
                }}
              />
            );
          }

          return (
            <Card
              word={card}
              key={card}
              style={{
                zIndex: index,
                scale: 0.9,
              }}
            />
          );
        })}
      </div>

      <div className="flex gap-3 mt-12 w-[290px]">
        <Button
          onClick={handleSkip}
          mainColor={colors.error}
          className="flex-1"
        >
          Skip
        </Button>
        <Button
          onClick={handleCorrect}
          mainColor={colors.success}
          className="flex-1"
        >
          Correct
        </Button>
      </div>
    </div>
  );
}
