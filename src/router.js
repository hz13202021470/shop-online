import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Member from '@/components/Member/Member'
import Shopcart from '@/components/Shopcart/Shopcart'
import Search from '@/components/Search/Search'
import NewsList from '@/components/News/NewsList'
import NewsDetail from '@/components/News/NewsDetail'

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
      path: '/home/news/list',
      name: 'newslist',
      component: NewsList
    },
    {
      path: '/newsdetail',
      name: 'newsdetail',
      component: NewsDetail
    }
  ]
})
