import TopicModal from '../components/TopicComponents/TopicModal.vue'
import {h,render} from 'vue'

export default {
  install: (app) => {

    const topic = (userInfo)=>{

      console.log(userInfo);
      const container = document.createElement('div')
     
      const topicVNode = h(TopicModal)

      render(topicVNode, container)

      topicVNode.component.exposed.setUserInfo(userInfo)

      document.body.appendChild(container)
    }

    app.provide('TopicModal', topic)
  }
}