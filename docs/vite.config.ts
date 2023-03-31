import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";

//default options
var options = {
  encode: false,
  tokenize: "full",
  previewLength: 62,
  buttonLabel: "Search",
  placeholder: "快速检索",
};

export default defineConfig({
  plugins: [SearchPlugin(options)],
});
