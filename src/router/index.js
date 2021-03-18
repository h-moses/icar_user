import Vue from 'vue'
import VueRouter from "vue-router"
import Index from "../views/Index";
import UserLogin from "../views/UserLogin";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: Index,
        component: Index
    },
    {
        path: '/userLogin',
        name: UserLogin,
        component: UserLogin
    }
]


const router = new VueRouter({
    routes
})

export default router
