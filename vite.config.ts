import svgr from "@svgr/rollup"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/predictive-application",
  server: {
    port: 3000,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    host: true
  },
  plugins: [svgr({ exportType: "named" }), react(), tsconfigPaths()],
})