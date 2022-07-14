import React from "react";
import { Modal } from "./modal";
import { css, cx } from "@emotion/css";
import { store } from "./store";
import { observer } from "mobx-react-lite";
import { Button } from "./button";
import { colors } from "./theme";
import { reset } from "./reset";

export const FinishModal = observer(() => {
  return (
    <Modal isVisible={store.screen === "finish"} id={"finalModal"}>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        })}
      >
        <span className={css({ fontSize: 36 })}>Result</span>

        <div
          className={css({
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            fontSize: 18,
            marginTop: 24,
          })}
        >
          <ul className={cx(reset.ul)}>
            <li>Skipped ({store.skipped.length}): </li>
            {store.skipped.map((word) => (
              <li
                key={word}
                className={css({ color: colors.error, fontWeight: 600 })}
              >
                {word}
              </li>
            ))}
          </ul>
          <ul className={cx(reset.ul)}>
            <li>Guessed ({store.guessed.length}): </li>
            {store.guessed.map((word) => (
              <li
                key={word}
                className={css({ color: colors.success, fontWeight: 600 })}
              >
                {word}
              </li>
            ))}
          </ul>
        </div>

        <div className={css({ marginTop: 36 })} />
        <Button
          mainColor={colors.success}
          onClick={() => {
            // A little workaround due to final-form not removing modal correctly
            setTimeout(() => {
              document.getElementById("finalModal")?.remove();
            }, 1000);

            store.restart();
          }}
        >
          <span className={css({ fontWeight: 600, fontSize: 18 })}>
            Play again!
          </span>
        </Button>
      </div>
    </Modal>
  );
});
