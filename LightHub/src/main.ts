import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

import message from './plugin/message.js'
import userInfo from './plugin/userInfo.js'
import topicModal from './plugin/topicModal.js'

createApp(App)
  .use(message)
  .use(userInfo)
  .use(topicModal)
  .use(router)
  .use(store)
  .mount('#app')
