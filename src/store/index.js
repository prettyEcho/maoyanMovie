import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  loading: true, // 开机动画开
  switch: false, // 页面切换动画
  more: false, // 加载更多
  locate: { // 当前城市
    'country': '中国',
    'marslat': 40.0677,
    'province': '北京市',
    'lng': 116.2977,
    'city': '北京',
    'district': '昌平区',
    'marslng': 116.30379,
    'detail': '龙域环路附近',
    'lat': 40.066436,
    'status': 2,
    'ci': 1
  },
  nowPage: '电影', // 当前尾页
  title: '猫眼电影', // 标题
  hot: {
    hot: [], // 热播剧
    paging: { // 请求页信息
      limit: 12,
      offset: 0,
      hasMore: true,
      total: 0
    },
    stid: '', // 当前电影id分类
    stids: [], // 当前电影分类细节
    total: 0 // 电影总数
  },
  wish: {
    coming: [], // 最受欢迎
    paging: {
      limit: 30,
      offset: 0,
      hasMore: true,
      total: 0
    }
  },
  coming: {
    coming: [], // 第一屏待映影片
    movieIds: [], // 其他待映影片id集合
    paging: {
      offset: 10,
      limit: 10,
      hasMore: true
    }
  },
  cities: [], // 城市列表
  recentCities: ['北京'], // 最近访问城市
  hotSearch: [], // 热门搜索
  searchMovie: {}, // 搜索关键词电影结果
  searchTheater: {}, // 搜索关键词电影院结果
  point: '', // 正确关键词提示
  movieId: '' // 电影id
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
