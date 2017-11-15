import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

const state = {
  locate: '北京', //当前城市
  nowPage: '电影', //当前尾页
  title: '猫眼电影', //标题
  hot: [], //热播剧
  citys: [], //城市列表
  paging: { //请求页信息
    limit: 12,
    offset: 0,
    hasMore: true,
    total: 0
  },
  stid: "", //当前电影id分类
  stids: [], //当前电影分类细节
  total: 0, //电影总数
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
