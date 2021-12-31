import TopicModal from '../components/TopicComponents/TopicModal.vue'
import {h,render} from 'vue'

export default {
  install: (app) => {

    const topic = (userInfo,topicInfo)=>{
      if(userInfo.id ==='' || !userInfo._id === ''){
        const result = window.confirm("尚未登录，前往登录界面?")
        if(result){
          window.location.href = '/login';
        }
      }else{
        const container = document.createElement('div')
     
        const topicVNode = h(TopicModal)
  
        render(topicVNode, container)
        
        if(topicInfo){
          topicVNode.component.exposed.setTopic(topicInfo)
        }
  
        document.body.appendChild(container)
      }

    }

    app.provide('TopicModal', topic)
  }
}