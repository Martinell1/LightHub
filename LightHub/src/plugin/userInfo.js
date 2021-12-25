import UserInfo from '../components/Common/UserInfo.vue'
import {getOneById} from '@/api/user'
import {h,render} from 'vue'

export default {
  install: (app) => {
    const container = document.createElement('div')
    const hoverInfo = async(index,current_id,my_id)=>{
      const user = await getOneById(current_id);
      if(user._id === my_id){
        user.identify = true
      }else{
        user.isFollow = user.fans.some(item => item === my_id)
      }
  
      const aimNode = document.querySelector(".item-"+index)
      container.classList.add('absolute')
      container.classList.add('top-5')
  
      const userInfoVNode = h(UserInfo)
  
      render(userInfoVNode, container)
  
  
      userInfoVNode.component.exposed.setUserInfo(user)
  
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