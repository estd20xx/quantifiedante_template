import svgr from "@svgr/rollup"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
export default defineConfig({
  plugins: [svgr({ exportType: "named" }), react(), tsconfigPaths()],
  server: { port: 5175 },
})
