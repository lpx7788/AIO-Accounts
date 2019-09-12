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
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '注册',
        keepAlive: false,
        requireArth: false
      },
      component: resolve => require(['../views/Login/index'],resolve)
    }
  ]
})

//进行登录拦截
router.beforeEach((to, from, next) => {

  if(to.meta.requireArth&&to.name!='login'){
    var token = window.localStorage.getItem('token');
    if(token){ 
        next();
    } else {

      // 发起请求拿到微信授权地址
      getWxLogin.request(projectConfig.WECHAT_LOGIN,'','get')

      // 获取code
      let code = commonJS.getUrlKey(window.location.href,"code")
      console.log(code);
      // next('/login')
    }
  }else{
    next()
  }
  
})

export default router;
