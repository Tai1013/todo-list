import { createApp } from 'vue'
import 'tailwindcss/tailwind.css'
import App from './App.vue'
import Pinia from './plugins/pinia'

import './assets/scss/main.scss'

const app = createApp(App)
app.use(Pinia)
app.mount('#app')
