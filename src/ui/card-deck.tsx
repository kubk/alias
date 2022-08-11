import React, { useState } from "react";
import {
  PanInfo,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Card } from "./card";
import { observer } from "mobx-react-lite";
import { css } from "@emotion/css";
import { colors } from "../lib/theme";
import { useStore } from "../store/store-context";

const swipeOffset = 50;
const swipeBorder = 80;

export const CardDeck = observer(() => {
  const store = useStore();
  const [frontCardX, setFrontCardX] = useState(0);
  const x = useMotionValue(0);
  const scaleBelowCard = useTransform(
    x,
    [-swipeBorder, 0, swipeBorder],
    [1, 0.5, 1]
  );
  const shadowBlurBelowCard = useTransform(
    x,
    [-swipeBorder, 0, swipeBorder],
    [0, 25, 0]
  );
  const shadowOpacityBelowCard = useTransform(
    x,
    [-swipeBorder, 0, swipeBorder],
    [0, 0.2, 0]
  );
  const backgroundColorFrontCard = useTransform(
    x,
    [-swipeBorder, 0, swipeBorder],
    [colors.error, colors.card, colors.success]
  );
  const opacityFrontCard = useTransform(
    x,
    [
      -swipeBorder * 5,
      -swipeBorder * 3.5,
      0,
      swipeBorder * 3.5,
      swipeBorder * 5,
    ],
    [0, 1, 1, 1, 0]
  );
  const rotateFrontCard = useTransform(
    x,
    [-swipeBorder, 0, swipeBorder],
    [-10, 0, 10]
  );
  const boxShadowBelowCard = useMotionTemplate`0 ${shadowBlurBelowCard}px 25px -5px rgba(0, 0, 0, ${shadowOpacityBelowCard})`;

  const animateCardSwipe = (newFrontCardX: number) => {
    setFrontCardX(newFrontCardX);

    setTimeout(() => {
      setFrontCardX(0);
      x.set(0);
      store.addRandomCard();
    }, 500);
  };

  const onDragEnd = (info: PanInfo, word: string) => {
    const isCorrect = info.offset.x >= swipeOffset;
    const isSkip = info.offset.x <= -swipeOffset;
    if (isSkip) {
      store.addToSkipped(word);
      animateCardSwipe(-swipeBorder * 5);
    }
    if (isCorrect) {
      store.addToCorrect(word);
      animateCardSwipe(swipeBorder * 5);
    }
  };

  return (
    <div
      className={css({
        height: 400,
        position: "relative",
        width: "100%",
        marginTop: 25,
      })}
    >
      {store.cards.map((card, index) => {
        const isInFront = index === store.cards.length - 1;
        if (isInFront) {
          return (
            <Card
              word={card}
              key={index}
              style={{
                x,
                zIndex: index,
                backgroundColor: backgroundColorFrontCard,
                rotate: rotateFrontCard,
                opacity: opacityFrontCard,
              }}
              onDragEnd={(e, info) => onDragEnd(info, card)}
              animate={{ x: frontCardX }}
            />
          );
        }

        return (
          <Card
            word={card}
            key={index}
            style={{
              scale: scaleBelowCard,
              boxShadow: boxShadowBelowCard,
              zIndex: index,
            }}
          />
        );
      })}
    </div>
  );
});
