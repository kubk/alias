import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import mobxReactPlugin from "mobx-react-plugin/vite";
import { execSync } from "child_process";

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  plugins: [
    // No React Compiler here, so the "use no memo" directives are not needed
    mobxReactPlugin({ observer: { useNoMemo: false } }),
    tailwindcss(),
    preact(),
  ],
  base: "/alias/",
  server: {
    port: 35396,
  },
});
