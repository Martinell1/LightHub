import Message from '../components/Common/Message.vue'
import {h,render} from 'vue'

export default {
  install: (app) => {
    const msg = (info)=>{
      const container = document.createElement('div')
  
      const messageVNode = h(Message)

      render(messageVNode, container)
      // 最后将 container 追加到 body 上
      document.body.appendChild(container)
    
      console.log(Message);
      // Message.props.info() = info
      messageVNode.component.exposed.log(info)

      console.log(container);

      setTimeout(() => {
        document.body.removeChild(container)
      }, 3000);


  
      return messageVNode
    }

    app.provide('Message', msg)
  }
}