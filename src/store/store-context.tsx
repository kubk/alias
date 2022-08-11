import React, { createContext, useContext } from "react";
import { Store } from "./store";
import { assert } from "ts-essentials";

export const StoreContext = createContext<Store | null>(null);

export const useStore = () => {
  const store = useContext(StoreContext);
  assert(store);
  return store;
};
