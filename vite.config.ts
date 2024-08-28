import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    // devOptions: {
    //   enabled: true,
    // },
    manifest: {
      name: 'Alias game',
      theme_color: '#e7d0a4',
    }
  })],
  base: '/alias/',
});
