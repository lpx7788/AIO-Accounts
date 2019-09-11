// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/'
import {httpClient} from '@/utils/httpClient'
import {projectConfig} from '@/utils/projectConfig'
import commonJs   from '@/utils/common'    
import sdk from '@/utils/sdk'
 

import Vant from 'vant';
import 'vant/lib/index.css';
import './utils/rem'
let Base64 = require('js-base64').Base64;

// authorization.service.getWxLogin
Vue.prototype.commonJs=commonJs   //注册全局方法
Vue.prototype.sdk=sdk   //注册全局方法
Vue.prototype.httpClient = httpClient
Vue.prototype.projectConfig = projectConfig
Vue.config.productionTip = false
import {Lazyload} from 'vant';
Vue.use(Lazyload)
Vue.use(Vant)


/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  el: '#app',
  components: {App}
})
