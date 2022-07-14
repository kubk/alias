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
import { store } from "../store/store";

const swipeOffset = 100;
const swipeBorder = 175;

export const CardDeck = observer(() => {
  const [animationX, setAnimationX] = useState({ x: 0 });
  const x = useMotionValue(0);
  const scale = useTransform(x, [-swipeBorder, 0, swipeBorder], [1, 0.5, 1]);
  const shadowBlur = useTransform(
    x,
    [-swipeBorder, 0, swipeBorder],
    [0, 25, 0]
  );
  const shadowOpacity = useTransform(
    x,
    [-swipeBorder, 0, swipeBorder],
    [0, 0.2, 0]
  );
  const backgroundColor = useTransform(
    x,
    [-swipeBorder, 0, swipeBorder],
    [colors.error, colors.card, colors.success]
  );
  const boxShadow = useMotionTemplate`0 ${shadowBlur}px 25px -5px rgba(0, 0, 0, ${shadowOpacity})`;

  const animateCardSwipe = (animation: { x: number }) => {
    setAnimationX(animation);

    setTimeout(() => {
      setAnimationX({ x: 0 });
      x.set(0);
      store.addRandomCard();
    }, 0);
  };

  const onDragEnd = (info: PanInfo, word: string) => {
    const isCorrect = info.offset.x >= swipeOffset;
    const isSkip = info.offset.x <= -swipeOffset;
    if (isSkip) {
      store.addToSkipped(word);
      animateCardSwipe({ x: swipeBorder });
    }
    if (isCorrect) {
      store.addToCorrect(word);
      animateCardSwipe({ x: -swipeBorder });
    }
  };

  return (
    <div
      className={css({
        height: 350,
        position: "relative",
        width: "100%",
      })}
    >
      {store.cards.map((card, index) => {
        if (index === store.cards.length - 1) {
          return (
            <Card
              word={card}
              key={index}
              style={{
                x,
                zIndex: index,
                backgroundColor,
              }}
              onDragEnd={(e, info) => onDragEnd(info, card)}
              animate={animationX}
            />
          );
        }

        return (
          <Card
            word={card}
            key={index}
            style={{
              scale,
              boxShadow,
              zIndex: index,
            }}
          />
        );
      })}
    </div>
  );
});
