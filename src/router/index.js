import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '聚点商城',
        keepAlive: true,
      },
      component: resolve => require(['../views/Home/index'],resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      meta: {
        title: '聚点商城',
        keepAlive: false,
      },
      component: resolve => require(['../views/Mine/index'],resolve)
    }
  ]
})
