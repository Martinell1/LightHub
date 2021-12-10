import UserInfo from '../components/Common/UserInfo.vue'
import {h,render} from 'vue'

export default {
  install: (app) => {
    const container = document.createElement('div')
    const hoverInfo = (index,user,info)=>{
   
        const aimNode = document.querySelector(".item-"+index)
        container.classList.add('absolute')
        container.classList.add('top-5')
  
        const userInfoVNode = h(UserInfo)
  
        render(userInfoVNode, container)
  
        userInfoVNode.component.exposed.setCurrentUserInfo(user,info)
  
        aimNode.appendChild(container)
      
    }

    const removeHoverInfo = (index) =>{
      const aimNode = document.querySelector(".item-"+index)
      if(aimNode.contains(container)){
        aimNode.removeChild(container)
      }
      
    }
    app.provide('hoverInfo', hoverInfo)
    app.provide('removeHoverInfo',removeHoverInfo)

  }
}