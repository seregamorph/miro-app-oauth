import path from "path";
import fs from "fs";
import dns from "dns";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/server-options.html#server-host
dns.setDefaultResultOrder("verbatim");

// make sure vite picks up all html files in root, needed for vite build
const allHtmlEntries = fs
  .readdirSync(".")
  .filter((file) => path.extname(file) === ".html")
  .reduce<Record<string, string>>(
    (acc, file) => ({
      ...acc,
      [path.basename(file, ".html")]: path.resolve(__dirname, file),
    }),
    {}
  );

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: allHtmlEntries,
    },
  },
  envPrefix: "SPELLCHECK_",
  plugins: [react(), mkcert()],
  server: {
    port: 3344,
    https: true,
  },
});
