import svgr from "@svgr/rollup"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  server: {
    port: 5174,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    host: true
  },
  plugins: [svgr({ exportType: "named" }), react(), tsconfigPaths()],
})