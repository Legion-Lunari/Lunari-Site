// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://legionlunari.org",

  server: {
    port: 4321,
    host: true,
    allowedHosts: ["involve-shorter-mandate-min.trycloudflare.com"],
  },

  output: "server",
  adapter: cloudflare(),
});
