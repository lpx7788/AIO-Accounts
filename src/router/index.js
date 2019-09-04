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
      path: '/infoList',
      name: 'infoList',
      meta: {
        title: '要闻',
        keepAlive: true,
      },
      component: resolve => require(['../views/Info/infoList'],resolve)
    },
  ]
})
