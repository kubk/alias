import React from "react";
import { Modal } from "./modal";
import { css } from "@emotion/css";
import { store } from "./store";
import { observer } from "mobx-react-lite";
import { Button } from "./button";
import { colors } from "./theme";

export const StartModal = observer(() => {
  return (
    <Modal isVisible={store.screen === "start-modal"}>
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
          {[3, 30, 60, 90].map((item, i) => (
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
