import React from "react";
import { observer } from "mobx-react-lite";
import { StartScreen } from "./screens/start-screen";
import { GameScreen } from "./screens/game-screen";
import { FinishScreen } from "./screens/finish-screen";
import { AnimatePresence } from "./lib/animate-presence";
import { store } from "./store/store";

export const Page = observer(() => {
  return (
    <AnimatePresence exitBeforeEnter>
      {store.screen === "start-modal" && <StartScreen />}
      {store.screen === "finish" && <FinishScreen />}
      {store.screen === "game" && <GameScreen />}
    </AnimatePresence>
  );
});
