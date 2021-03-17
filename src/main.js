import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import axios from "axios";
import 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseURL = 'https://5f5533f7-edc6-432d-90c4-0a4d8dcccf25.mock.pstmn.io/'
Object.defineProperty(Vue.prototype, '$http', {
    value: axios
})
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
