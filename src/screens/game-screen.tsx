import { observer } from "mobx-react-lite";
import { css } from "@emotion/css";
import React from "react";
import { store } from "../store/store";
import { Counter } from "../ui/counter";
import { Countdown } from "../ui/countdown";
import { CardDeck } from "../ui/card-deck";
import { colors } from "../lib/theme";

export const GameScreen = observer(() => (
  <div
    className={css({
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    })}
  >
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        marginTop: 32,
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
      className={css({
        display: "flex",
        justifyContent: "center",
        gap: 48,
      })}
    >
      <Counter color={colors.error} value={store.skipped.length} />
      <Counter color={colors.success} value={store.guessed.length} />
    </div>
  </div>
));
