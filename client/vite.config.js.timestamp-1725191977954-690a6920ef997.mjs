// vite.config.js
import { defineConfig } from "file:///C:/Users/smimt/Dropbox/Docmate-Final/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/smimt/Dropbox/Docmate-Final/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 3e3,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
      },
    },
  },
});
export { vite_config_default as default };
