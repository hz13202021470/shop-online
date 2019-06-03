import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Member from '@/components/Member/Member'
import Shopcart from '@/components/Shopcart/Shopcart'
import Search from '@/components/Search/Search'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    // 新闻列表
    {
      path: '/home/newslist',
      name: 'newslist',
      component: resolve => require(['@/components/News/NewsList'], resolve)
    },
    // 新闻详情
    {
      path: '/home/newsdetail/:id',
      name: 'newsdetail',
      component: resolve => require(['@/components/News/NewsDetail'], resolve)
    },
    // 图文分享
    {
      name: 'photolist',
      path: '/home/photolist',
      component: resolve => require(['@/components/Photo/PhotoList'], resolve)
    },
    // 图文详情
    {
      name: 'photodetail',
      path: '/home/photodetail/:id',
      component: resolve => require(['@/components/Photo/PhotoDetail'], resolve)
    },
    // 商品列表
    {
      name: 'goodlist',
      path: '/home/goodslist',
      component: resolve => require(['@/components/GoodsList/GoodsList'], resolve)
    }
  ]
})
