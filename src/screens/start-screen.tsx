import React from "react";
import { css } from "@emotion/css";
import { observer } from "mobx-react-lite";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { colors } from "../lib/theme";
import { motion } from "framer-motion";
import { store } from "../store/store";

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
        <span className={css({ fontSize: 36 })}>Alias game</span>
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
          {[10, 60, 90].map((item, i) => (
            <label key={i}>
              <input
                type="radio"
                name="time"
                checked={store.secondsPerRound === item}
                onChange={() => {
                  store.changeSecondsPerRound(item);
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
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            className={css({ fontWeight: 600, fontSize: 20 })}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.3,
            }}
          >
            Start!
          </motion.div>
        </Button>
      </div>
    </Modal>
  );
});
