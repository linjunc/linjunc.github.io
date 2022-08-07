import { h } from "vue";
import Theme from "vitepress/theme";
import "./styles/vars.css";

import My from './components/My.vue'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      "aside-ads-after": () => h(My),
    });
  }
};
