import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import observerPlugin from "mobx-react-observer/babel-plugin";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [observerPlugin()],
      }
    })
  ],
  base: '/alias/',
  server: {
    port: 35396,
  },
});
