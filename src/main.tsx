import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { configureDevtools } from "mobx-log";
import { Page } from "./page";
import { StoreContext } from "./store/store-context";
import { Store } from "./store/store";

configureDevtools();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StoreContext.Provider value={new Store()}>
    <Page />
  </StoreContext.Provider>
);
