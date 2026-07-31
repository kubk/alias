import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import observerPlugin from "mobx-react-observer/vite-plugin";
import { execSync } from "child_process";

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  plugins: [observerPlugin(), tailwindcss(), react()],
  base: "/alias/",
  server: {
    port: 35396,
  },
});
