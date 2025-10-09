import { css } from "@emotion/css";
import { Counter } from "../ui/counter";
import { Countdown } from "../ui/countdown";
import { CardDeck } from "../ui/card-deck";
import { colors } from "../lib/theme";
import { store } from "../store/store";

export function GameScreen() {
  return (
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
          paddingTop: 40,
        })}
      >
        <CardDeck />
      </div>

      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          gap: 48,
          marginTop: 32,
        })}
      >
        <Counter color={colors.error} value={store.skipped.length} />
        <Counter color={colors.success} value={store.guessed.length} />
      </div>
    </div>
  );
}
