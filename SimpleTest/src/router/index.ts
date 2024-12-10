//路由
import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router"
//引入store 的 userStore
import { userStore } from "../store/user";
//创建路由规则
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../view/login.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../view/home.vue')
    }
]

//创建 路由的实例对象
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//路由导航守卫
// router.beforeEach((to, from, next) => {
//     const store = userStore()
//     if (store.token) {
//         next('')
//     }else {
//         if (to.path == "/login") {
//           next()
//         } else {
//           next("/login")
//         }
//     }
// })

export default router