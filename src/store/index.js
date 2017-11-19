import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

const state = {
  loading: true, //开机动画开
  switch: false, //页面切换动画
  more: false, //加载更多
  locate: '北京', //当前城市
  nowPage: '电影', //当前尾页
  title: '猫眼电影', //标题
  hot: {
    hot: [], //热播剧
    paging: { //请求页信息
      limit: 12,
      offset: 0,
      hasMore: true,
      total: 0
    },
    stid: "", //当前电影id分类
    stids: [], //当前电影分类细节
    total: 0, //电影总数
  },
  citys: [], //城市列表
  wish: {
    coming: [], //最受欢迎
    paging: {
      limit: 30,
      offset: 0,
      hasMore: true,
      total: 0
    }
  },
  coming: {
    coming: [], //第一屏待映影片
    movieIds: [],  //其他待映影片id集合
    paging:{
      offset: 10,
      limit: 10,
      hasMore: true
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
