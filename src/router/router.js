import Vue from "vue" //导入vue
import Router from "vue-router" //导入vue-router
import App from "../App.vue" //导入App

//按需加载组件
const Hot = r => require.ensure([],() => r(require('../pages/home/hot'),'hot'));
const Await = r => require.ensure([],() => r(require('../pages/home/await'),'await'));
const City = r => require.ensure([],() => r(require('../pages/city/city'),'city'));
const Me = r => require.ensure([],() => r(require('../pages/me/me'),'me'));
const SearchMovie = r => require.ensure([],() => r(require('../pages/searchMoive/searchMovie'),'searchMovie'));
const Theater = r => require.ensure([],() => r(require('../pages/theater/theater'),'theater'));


Vue.use(Router); //使用Router

const routes = [
    {
        path: "/",
        component: App, //顶级组件:index.html
        children: [  //二级组件: App
            //当请求地址为空时，转移到hot页
            {
                path: '',
                redirect: '/hot'
            },
            {
                path: '/hot',
                name: 'hot',
                component: Hot
            },
            {
                path: '/await',
                name: 'await',
                component: Await
            },
            {
                path: '/city',
                name: 'city',
                component: City
            },
            {
                path: '/me',
                name: 'me',
                component: Me
            },{
                path: '/searchMovie',
                name: 'searchMovie',
                component: SearchMovie
            },
            {
                path: '/theater',
                name: 'theater',
                component: Theater
            }
        ]
    }
];

export default new Router({
  routes: routes
})
