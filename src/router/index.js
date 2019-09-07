import Vue from 'vue'
import Router from 'vue-router'

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
  console.log(111);
  console.log(to);
  console.log(to.meta.requireArth);
  if(to.meta.requireArth){
    var token = window.localStorage.getItem('token');//获取浏览器缓存的用户信息
    if(token){ //如果有就直接到首页咯
        next();
    } else {
      console.log(22);
        if(to.path=='/register'){ //如果是登录页面路径，就直接next()
            next();
        } else { //不然就跳转到登录；
            next('/register');
        }
    }
  }else{
    next()
  }
  
})

export default router;
