import Vue from 'vue'
import axios from 'axios'
import request from '@/utils/request'
import global_ from '@/api/Base.vue'
Vue.prototype.GLOBAL = global_
axios.defaults.baseURL = global_.BASE_URL

export function login(data) {
  return request({
    url: global_.BASE_URL + '/api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
