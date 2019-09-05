// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/'
// import ElementUI from 'element-ui'
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.css'
import {httpClient} from '@/utils/httpClient'
import {projectConfig} from '@/utils/projectConfig'
// import echarts from 'echarts'
import Vant from 'vant';
import 'vant/lib/index.css';
import './utils/rem'
let Base64 = require('js-base64').Base64;

// Vue.use(ElementUI, {size: 'small'})
// Vue.use(Mint)
Vue.prototype.httpClient = httpClient
Vue.prototype.projectConfig = projectConfig
Vue.config.productionTip = false
// Vue.use(echarts)
Vue.use(Vant)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  el: '#app',
  components: {App}
})
