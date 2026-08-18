// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://legionlunari.gg",
  server: {
    port: 4321,
    host: true,
    allowedHosts: ["involve-shorter-mandate-min.trycloudflare.com"],
  },
});
