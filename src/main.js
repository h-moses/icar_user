import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import axios from "axios"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import './assets/css/global.css'

Vue.use(ElementUI)
axios.defaults.baseURL = 'https://5f5533f7-edc6-432d-90c4-0a4d8dcccf25.mock.pstmn.io/'
Object.defineProperty(Vue.prototype, '$http', {
    value: axios
})
Vue.config.errorHandler = function (err, vm, info) {
    console.log('err:' + err)
    console.log('vm:' + vm)
    console.log('info:' + info)
}

Vue.config.warnHandler = function (msg, vm, trace) {
    console.log('msg:' + msg)
    console.log('vm:' + vm)
    console.log('trace:' + trace)
}
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
