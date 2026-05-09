// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://bandung.awscommunity.id",
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: true,
      allowedHosts: ["astro.avei.ovh", "localhost"],
    },
  },
});
