// 按需引入
import {
  Loading,
  MessageBox,
  Notification,
  Message,
  Input,
  Button,
  Carousel,
  CarouselItem,
} from 'element-ui'

const install = Vue => {
  Vue.use(Loading.directive).use(Input).use(Button).use(Carousel).use(CarouselItem)

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message
}

export default { install }
