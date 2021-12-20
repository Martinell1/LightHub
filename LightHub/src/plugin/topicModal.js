import TopicModal from '../components/TopicComponents/TopicModal.vue'
import {h,render} from 'vue'

export default {
  install: (app) => {

    const topic = (topicInfo)=>{

      console.log(topicInfo);
      const container = document.createElement('div')
     
      const topicVNode = h(TopicModal)

      render(topicVNode, container)
      
      if(topicInfo){
        topicVNode.component.exposed.setTopic(topicInfo)
      }

      document.body.appendChild(container)
    }

    app.provide('TopicModal', topic)
  }
}