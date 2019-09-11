import Vue from 'vue'
import Router from 'vue-router'
import getWxLogin from '../utils/authorization'
import {projectConfig} from '@/utils/projectConfig'
import commonJS from '@/utils/common'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '聚点商城',
        keepAlive: true,
        requireArth: true
      },
      component: resolve => require(['../views/Home/index'],resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      meta: {
        title: '我的',
        keepAlive: false,
        requireArth: true
      },
      component: resolve => require(['../views/Mine/index'],resolve)
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册',
        keepAlive: false,
        requireArth: false
      },
      component: resolve => require(['../views/Register/index'],resolve)
    }
  ]
})

//进行登录拦截
router.beforeEach((to, from, next) => {
  
  if(to.meta.requireArth){
    var token = window.localStorage.getItem('token');
    if(token){ 
        next();
    } else {
      // let code = commonJS.getUrlKey('http://ypv9s8.natappfree.cc/wechat/callBack?code=071DrUrj1bk7qu0MPeqj1WGSrj1DrUrm&state=STATE',"code")
      // console.log(code);
      // getWxLogin.request(projectConfig.WECHAT_LOGIN,'','get')
      // console.log(111);
      let code2 = commonJS.getUrlKey('http://ypv9s8.natappfree.cc/wechat/callBack?code=071DrUrj1bk7qu0MPeqj1WGSrj1DrUrm&state=STATE',"code")
      console.log(222);
       console.log(code2);
  
        // if(to.path=='/register'){ //如果是登录页面路径，就直接next()
        //     next();
        // } else { //不然就跳转到登录；
        //     next('/register');
        // }
    }
  }else{
    next()
  }
  
})

export default router;
