import React from "react";
import { css } from "@emotion/css";
import { CardDeck } from "./card-deck";
import { observer } from "mobx-react-lite";
import { colors } from "./colors";
import { store } from "./store";
import { Counter } from "./counter";

export const Page = observer(() => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <div
        className={css({ width: "100%", height: "100%", overflow: "hidden" })}
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
