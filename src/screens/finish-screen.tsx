import React from "react";
import { css, cx } from "@emotion/css";
import { observer } from "mobx-react-lite";
import { store } from "../store/store";
import { Button } from "../ui/button";
import { reset } from "../lib/reset";
import { Modal } from "../ui/modal";
import { colors } from "../lib/theme";

export const FinishScreen = observer(() => {
  return (
    <Modal marginTop={"32px"}>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 11,
        })}
      >
        <span className={css({ fontSize: 36 })}>
          Result — {store.guessed.length}
        </span>

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
            <li>Skipped — {store.skipped.length}</li>
            {store.skipped.map((word) => (
              <li
                key={word}
                className={css({
                  color: colors.error,
                  fontWeight: 600,
                  textTransform: "capitalize",
                })}
              >
                {word}
              </li>
            ))}
          </ul>
          <ul className={cx(reset.ul)}>
            <li>Guessed — {store.guessed.length}</li>
            {store.guessed.map((word) => (
              <li
                key={word}
                className={css({
                  color: colors.success,
                  fontWeight: 600,
                  textTransform: "capitalize",
                })}
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
