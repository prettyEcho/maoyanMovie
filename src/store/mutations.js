import {
  CHANGE_TITLE,
  GET_HOT,
  GET_LOCATE
} from "./mutation-types";

export default {

  //改变title
  [CHANGE_TITLE](state, val){
    state.title = val;
  },

  //储存hot
  [GET_HOT](state, val){
    const json = JSON.parse(val);
    //拆分取属性错误
    state.hot = json.data.hot;
    state.paging = json.data.paging;
  },

  //储存当前城市
  [GET_LOCATE](state, val){
    state.locate = val;
  }
}
