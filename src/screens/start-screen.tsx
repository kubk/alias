import React from "react";
import { css } from "@emotion/css";
import { observer } from "mobx-react-lite";
import { store } from "../store/store";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { colors } from "../lib/theme";

export const StartScreen = observer(() => {
  return (
    <Modal>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        })}
      >
        <span className={css({ fontSize: 36 })}>Alias</span>
        <p className={css({ fontSize: 18, marginBottom: 0, paddingBottom: 8 })}>
          Seconds per round
        </p>
        <div
          className={css({
            fontSize: 18,
            display: "flex",
            gap: 18,
            alignItems: "center",
          })}
        >
          {[10, 30, 60, 90].map((item, i) => (
            <label key={i}>
              <input
                type="radio"
                name="time"
                checked={store.secondsLeft === item}
                onChange={() => {
                  store.changeSecondsType(item);
                }}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <div className={css({ marginTop: 36 })} />
        <Button
          mainColor={colors.success}
          onClick={() => {
            store.startTimer();
          }}
        >
          <span className={css({ fontWeight: 600, fontSize: 18 })}>Start!</span>
        </Button>
      </div>
    </Modal>
  );
});
