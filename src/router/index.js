import Vue from 'vue'
import VueRouter from "vue-router"
import Index from "../views/Index";
import UserLogin from "../views/user/UserLogin";
import UserRegister from "../views/user/UserRegister";
import UserHome from "../views/user/UserHome";
import SubmitOrder from "../components/order/SubmitOrder";
import CheckOrder from "../components/order/CheckOrder";
import HomePage from "../components/HomePage";
import DrivingVideo from "../components/video/DrivingVideo";
import DrivingWarning from "../components/warning/DrivingWarning";

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
        redirect: '/homePage',
        component: UserHome,
        children: [
            {
                path: '/homePage',
                name: 'HomePage',
                component: HomePage
            },
            {
                path: '/drivingWarning',
                name: 'DrivingWarning',
                component: DrivingWarning
            },
            {
                path: '/drivingVideo',
                name: 'DrivingVideo',
                component: DrivingVideo
            },
            {
                path: '/submitOrder',
                name: 'SubmitOrder',
                component: SubmitOrder
            },
            {
                path: '/checkOrder',
                name: 'CheckOrder',
                component: CheckOrder
            }
        ]
    }
]


const router = new VueRouter({
    routes
})

export default router
