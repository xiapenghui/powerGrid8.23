import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import getNowDate from './api/commonData.js'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control

import * as filters from './filters' // global filters

import axios from 'axios'
Vue.prototype.$ajax = axios
import { getToken } from '@/utils/auth'

import moment from 'moment'// 导入文件

Vue.prototype.$moment = moment// 赋值使用

// 设置全局变量
import global_ from './api/Base'
Vue.prototype.GLOBAL = global_
axios.defaults.baseURL = global_.BASE_URL

// // 图片上传全局变量
// Vue.prototype.GLOIMG = global_
// axios.defaults.imgURL = global_.IMG_URL

axios.defaults.headers.common['Authorization'] = getToken()
Vue.prototype.$token = getToken()

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.directive('rest-styleBackground', function(dom, definition) { // 背景颜色
  dom.style.background = definition.value
  dom.style.borderColor = definition.value
})

Vue.directive('rest-styleColor', function(dom, definition) { // 字体颜色
  dom.style.color = definition.value
})

Vue.prototype.$getDate = getNowDate // 获取全局维护时间。

Vue.use(Element, {
  size: Cookies.get('size') || 'mini', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
