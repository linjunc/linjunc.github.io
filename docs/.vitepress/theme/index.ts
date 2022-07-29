import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/vars.css'

import SvgImage from './components/SvgImage.vue'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
    })
  },
  enhanceApp({ app }) {
    app.component('SvgImage', SvgImage)
  }
}
