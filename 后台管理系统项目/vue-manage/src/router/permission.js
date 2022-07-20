
import router from './index'
import store from "../store/index";
//路由拦截
router.beforeEach((to,from,next)=>{
    console.log('to',to);
    //1.判断是否需要登录
    if(to.matched.some(ele=>ele.meta.isLogin)){
         //2.判断当前用户是否已经登录
         let token=store.state.login.userinfo.token;
         if(token){
            next()
         }else{
            next('/login')
         }
    }else{//不需要登录
        next();
    }

})