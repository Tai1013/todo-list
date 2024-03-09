import { Plugin } from 'vue'
import { createPinia } from 'pinia'

const install: Plugin = app => {
  const pinia = createPinia()
  app.use(pinia)
}

export default install
