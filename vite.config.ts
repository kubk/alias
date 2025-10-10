import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import observerPlugin from "mobx-react-observer/babel-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [observerPlugin()],
      }
    })
  ],
  base: '/alias/',
});
