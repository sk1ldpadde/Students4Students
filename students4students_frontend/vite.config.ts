/// <reverence types="vite/client" />
/// <reverence types="vitest" />
// Extended defineConfig from vitest, supports pure vite-defineconfig
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["./src/setupTests.ts"],
  },
  server: {
    host: "0.0.0.0",
    // Thanks @sergiomoura for the window fix
    // add the next lines if you're using windows and hot reload doesn't work
    watch: {
      usePolling: true,
    },
  },
});
