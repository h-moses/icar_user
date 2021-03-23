import Vue from 'vue'
import VueRouter from "vue-router"
import Index from "../views/Index";
import UserLogin from "../views/user/UserLogin";
import UserRegister from "../views/user/UserRegister";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/userLogin',
        name: 'UserLogin',
        component: UserLogin
    },
    {
        path: '/userRegister',
        name: 'UserRegister',
        component: UserRegister
    }
]


const router = new VueRouter({
    routes
})

export default router
