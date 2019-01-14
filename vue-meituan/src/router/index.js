import Vue from 'vue'

import VueRouter from 'vue-router'

import List from '@/components/list/List'
import Cart from '@/components/cart/Cart'

// 安装路由
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {path: '/', redirect: '/list'},
    {path: '/list', component: List},
    {path: '/cart', component: Cart}
  ],
  // 路由跳转切换类名
  linkActiveClass: 'active'
})
