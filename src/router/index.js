import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/enterpriseReportMobile',
      name: 'enterpriseReportMobile',
      meta: {
        title: '企业报表'
      },
      component: resolve => require(['../views/Enterprise/enterpriseReportMobile'],resolve)
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
    {
      path: '/infoDetail',
      name: 'infoDetail',
      meta: {
        title: '资讯详情'
      },
      component: resolve => require(['../views/Info/infoDetail'],resolve)
    },
    {
      path: '/aioMallStmt',
      name: 'aioMallStmt',
      meta: {
        title: '隐私声明'
      },
      component: resolve => require(['../views/Secrecy/aioMallStmt'],resolve)
    },
    {
      path: '/QRCodeDownload',
      name: 'QRCodeDownload',
      meta: {
        title: '聚点商城'
      },
      component: resolve => require(['../views/Download/QRCodeDownload'],resolve)
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '申请开户'
      },
      component: resolve => require(['../views/sqPay/register'],resolve)
    },
    {
      path: '/registerResult',
      name: 'registerResult',
      meta: {
        title: '结果回馈'
      },
      component: resolve => require(['../views/sqPay/registerResult'],resolve)
    },
    {
      path: '/recharge',
      name: 'recharge',
      meta: {
        title: '充值'
      },
      component: resolve => require(['../views/sqPay/recharge'],resolve)
    },
    {
      path: '/withDraws',
      name: 'withDraws',
      meta: {
        title: '提现'
      },
      component: resolve => require(['../views/sqPay/withDraws'],resolve)
    },
    {
      path: '/accountApply',
      name: 'accountApply',
      meta: {
        title: '期货开户申请'
      },
      component: resolve => require(['../views/Account/accountApply'],resolve)
    },
    {
      path: '/withDrawsApp',
      name: 'withDrawsApp',
      meta: {
        title: '账户提现'
      },
      component: resolve => require(['../views/sqPay/withDrawsApp'],resolve)
    },
    {
      path: '/withDrawsResult',
      name: 'withDrawsResult',
      meta: {
        title: '提现反馈'
      },
      component: resolve => require(['../views/sqPay/withDrawsResult'],resolve)
    },
    {
      path: '/rechargeResult',
      name: 'rechargeResult',
      meta: {
        title: '充值反馈'
      },
      component: resolve => require(['../views/sqPay/rechargeResult'],resolve)
    },
    {
      path: '/paymentResult',
      name: 'paymentResult',
      meta: {
        title: '支付反馈'
      },
      component: resolve => require(['../views/sqPay/paymentResult'],resolve)
    },
    {
      path: '/payment',
      name: 'payment',
      meta: {
        title: '支付'
      },
      component: resolve => require(['../views/sqPay/payment'],resolve)
    },
    {
      path: '/pledge',
      name: 'Pledge',
      meta: {
        title: '仓库质押'
      },
      component: resolve => require(['../views/Pledge/pledge'],resolve)
    },
    {
      path: '/newGuidelinesMenu', name: 'newGuidelinesMenu', component: resolve => require(['../views/NewGuidelines/NewGuidelinesMenu'],resolve),
    },
    {
      path: '/newGuidelines', name: 'newguidelines', component: resolve => require(['../views/NewGuidelines/NewGuidelines'],resolve),
      children: [
        {
          path: 'newGuidelinesDetails', name: 'newGuidelinesDetails', component: resolve => require(['../views/NewGuidelines/NewGuidelinesDetails'],resolve),
        }
      ]
    },
  ]
})
