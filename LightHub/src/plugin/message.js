import Message from '../components/Common/Message.vue'
import {h,render} from 'vue'

export default {
  install: (app) => {

    const msg = (type,info)=>{
      const container = document.createElement('div')
      container.classList.add('fixed')
      container.classList.add('top-16')
      container.classList.add('right-0')
      container.classList.add('flex')
      container.classList.add('flex-col')
     
      const messageVNode = h(Message)

      render(messageVNode, container)

      messageVNode.component.exposed.setType(type)
      messageVNode.component.exposed.setTinfo(info)

      document.body.appendChild(container)
      setTimeout(() => {
        document.body.removeChild(container)
      }, 5000);
    }

    app.provide('Message', msg)
  }
}