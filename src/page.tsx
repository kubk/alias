import React from "react";
import { css } from "@emotion/css";
import { CardDeck } from "./card-deck";
import { observer } from "mobx-react-lite";
import { colors } from "./theme";
import { store } from "./store";
import { Counter } from "./counter";
import { Countdown } from "./countdown";
import { StartModal } from "./start-modal";
import { FinishModal } from "./finish-modal";

export const Page = observer(() => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <StartModal />
      <FinishModal />
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
