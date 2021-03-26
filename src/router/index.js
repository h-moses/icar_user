import Vue from 'vue'
import VueRouter from "vue-router"
import Index from "../views/Index";
import UserLogin from "../views/user/UserLogin";
import UserRegister from "../views/user/UserRegister";
import UserHome from "../views/user/UserHome";
import SubmitOrder from "../components/order/SubmitOrder";

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
    },
    {
        path: '/userHome',
        name: 'UserHome',
        // redirect: '/index',
        component: UserHome,
        children: [
            {
                path: '/index',
                name: ''
            },
            {
                path: '/submit',
                name: 'SubmitOrder',
                component:SubmitOrder
            }
        ]
    }
]


const router = new VueRouter({
    routes
})

export default router
