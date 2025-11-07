import { createApp } from 'vue'
import App from './App.vue'
import { createNaiveUi } from './naive'

import './assets/main.css'

const app = createApp(App)
app.use(createNaiveUi())
app.mount('#app')
