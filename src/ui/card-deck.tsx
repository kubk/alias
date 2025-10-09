import { useState } from "react";
import { Card } from "./card";
import { css } from "@emotion/css";
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
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      })}
    >
      <div
        className={css({
          position: "relative",
          width: "100%",
          height: 290,
        })}
      >
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
            const backgroundColor = exitDirection
              ? exitDirection === "left"
                ? colors.error
                : colors.success
              : colors.card;

            return (
              <Card
                word={card}
                key={card}
                style={{
                  zIndex: index,
                  backgroundColor,
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

      <div
        className={css({
          display: "flex",
          gap: 12,
          marginTop: 48,
          width: 310,
        })}
      >
        <Button
          onClick={handleSkip}
          mainColor={colors.error}
          className={css({ flex: 1 })}
        >
          Skip
        </Button>
        <Button
          onClick={handleCorrect}
          mainColor={colors.success}
          className={css({ flex: 1 })}
        >
          Correct
        </Button>
      </div>
    </div>
  );
}
