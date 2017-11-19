import {
    getLocate,
    getHot,
    getWish,
    getComing,
    getComingMore
} from "../service/getData"

import {
    GET_LOCATE,
    GET_HOT,
    GET_WISH,
    GET_COMING,
    GET_COMING_MORE
} from "./mutation-types"

export default {
    //获取城市当前城市
    async locate({dispatch, commit}){
        commit('GET_LOCATE',await getLocate().city); //存储当前城市
        await dispatch('hot');
    },

    //获取热播列表
    async hot({commit, state}){
        const {limit,offset,ct} = {
            limit: state.hot.paging.limit,
            offset: state.hot.paging.offset,
            ct: state.locate
        };
        const hots = await getHot(limit, offset, ct);
        commit('GET_HOT',hots); //存储热播列表
    },

    //获取待映最受欢迎影片
    async wish({commit, state}){
      commit('GET_WISH',await getWish());
    },

    //获取待映电影第一屏
    coming({commit}){
      getComing()
        .then((val) => {
          commit('GET_COMING',val);
        })
        .catch((e) => {
          console.log(e);
        })
    },

    //获取待映电影其他
    comingMore({commit, state}){
      let start = state.coming.paging.offset,
          end = state.coming.paging.offset + state.coming.paging.limit;

      let ids = state.coming.movieIds.slice(start, end).join(',');

      getComingMore(ids)
        .then((val) => {
          commit('GET_COMING_MORE',val);
        })
    }
}
