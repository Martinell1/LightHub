import UserInfo from '../components/Common/UserInfo.vue'
import {h,render} from 'vue'

export default {
  install: (app) => {
    const container = document.createElement('div')
    const hoverInfo = (index,user,info)=>{
      const aimNode = document.querySelector(".article-"+index)

      container.classList.add('absolute')
      container.classList.add('top-5')

      const userInfoVNode = h(UserInfo)

      render(userInfoVNode, container)


      userInfoVNode.component.exposed.setCurrentUserInfo(user,info)

      aimNode.appendChild(container)
    }

    const removeHoverInfo = (index) =>{
      const aimNode = document.querySelector(".article-"+index)
      if(aimNode.contains(container)){
        aimNode.removeChild(container)
      }
      console.log("leave");
      
    }
    app.provide('hoverInfo', hoverInfo)
    app.provide('remove',removeHoverInfo)

  }
}