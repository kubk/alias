import React from "react";
import { css } from "@emotion/css";
import { CardDeck } from "./card-deck";
import { observer } from "mobx-react-lite";
import { colors } from "./colors";
import { store } from "./store";
import { Counter } from "./counter";
import { Countdown } from "./countdown";

export const Page = observer(() => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <button onClick={() => store.startTimer()}>Start</button>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          marginTop: 16,
        })}
      >
        <Countdown />
      </div>

      <div
        className={css({
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          marginTop: 24,
        })}
      >
        <CardDeck />
      </div>

      <div
        className={css({ display: "flex", justifyContent: "center", gap: 48 })}
      >
        <Counter color={colors.error} value={store.skipped.length} />
        <Counter color={colors.success} value={store.guessed.length} />
      </div>
    </div>
  );
});
