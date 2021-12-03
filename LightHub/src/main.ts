import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

import message from './plugin/message.js'

createApp(App)
  .use(message)
  .use(router)
  .use(store)
  .mount('#app')
