import Vue from 'vue' // 导入vue
import Router from 'vue-router' // 导入vue-router

// 按需加载组件
const Hot = r => require.ensure([], () => r(require('../pages/home/hot'), 'hot'))
const Await = r => require.ensure([], () => r(require('../pages/home/await'), 'await'))
const City = r => require.ensure([], () => r(require('../pages/city/city'), 'city'))
const User = r => require.ensure([], () => r(require('../pages/user/user'), 'user'))
const Main = r => require.ensure([], () => r(require('../pages/user/children/main'), 'user'))
const Login = r => require.ensure([], () => r(require('../pages/user/children/login'), 'user'))
const Coupon = r => require.ensure([], () => r(require('../pages/user/children/coupon'), 'user'))
const Order = r => require.ensure([], () => r(require('../pages/user/children/order'), 'user'))
const Viewed = r => require.ensure([], () => r(require('../pages/user/children/viewed'), 'user'))
const Vip = r => require.ensure([], () => r(require('../pages/user/children/vip'), 'user'))
const Wish = r => require.ensure([], () => r(require('../pages/user/children/wish'), 'user'))
const SearchMovie = r => require.ensure([], () => r(require('../pages/searchMoive/searchMovie'), 'searchMovie'))
const Theater = r => require.ensure([], () => r(require('../pages/theater/theater'), 'theater'))
const SearchTheater = r => require.ensure([], () => r(require('../pages/theater/searchTheater'), 'theater'))
const TheaterDetail = r => require.ensure([], () => r(require('../pages/theater/theaterDetail'), 'theater'))
const Article = r => require.ensure([], () => r(require('../pages/article/article'), 'article'))

Vue.use(Router) // 使用Router

const routes = [

  // 当请求地址为空时，转移到hot页
  {
    path: '',
    redirect: '/hot'
  },
  {
    path: '/hot',
    name: 'hot',
    component: Hot,
    meta: {
      footerRequire: true
    }
  },
  {
    path: '/await',
    name: 'await',
    component: Await,
    meta: {
      footerRequire: true
    }
  },
  {
    path: '/city',
    name: 'city',
    component: City,
    meta: {
      footerRequire: false
    }
  },
  {
    path: '/user',
    component: User,
    children: [{
      path: '',
      name: 'main',
      component: Main
    },
    {
      path: 'login',
      name: 'login',
      component: Login
    },
    {
      path: 'coupon',
      name: 'coupon',
      component: Coupon
    },
    {
      path: 'order',
      name: 'order',
      component: Order
    },
    {
      path: 'viewed',
      name: 'viewed',
      component: Viewed
    },
    {
      path: 'wish',
      name: 'wish',
      component: Wish
    },
    {
      path: 'vip',
      name: 'vip',
      component: Vip
    }

    ]
  },
  {
    path: '/searchMovie',
    name: 'searchMovie',
    component: SearchMovie,
    meta: {
      footerRequire: false
    }
  },
  {
    path: '/theater',
    name: 'theater',
    component: Theater
  },
  {
    path: '/searchTheater',
    name: 'searchTheater',
    component: SearchTheater
  },
  {
    path: '/theaterDetail',
    name: 'theaterDetail',
    component: TheaterDetail
  },
  {
    path: '/article',
    name: 'article',
    component: Article
  }
]

export default new Router({
  routes: routes
})
