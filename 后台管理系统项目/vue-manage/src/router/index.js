import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '../store/index'
Vue.use(VueRouter)

const routes =
    [{
        path: '/',
        name: 'Main',
        redirect:'/login',
        component: () => import('../views/Main.vue'),
         //路由元信息
         meta:{
            isLogin:true
         },
        children:[
            {
                path:'/home',
                name:'home',
                component: () => import('../views/Home/index.vue'),
            },
            {
                path:'/user',
                name:'user',
                component: () => import('../views/User/index.vue'),
            },
            {
                path:'/mallManage',
                name:'mallManage',
                component: () => import('../views/MallManage/index.vue'),
            },
            {
                path:'/addgoods',
                name:'addgoods',
                component: () => import('../views/MallManage/AddGoods.vue'),
            },
            {
                path:'/usermanage',
                name:'usermanage',
                component: () => import('../views/UserManage/index.vue'),
            },
        ]
    },
    {
        path:'/login',
        name:'login',
        component: () => import('../views/login/index.vue'),
    },
    ]


const router = new VueRouter({
    mode:'history',
    routes
})


export default router