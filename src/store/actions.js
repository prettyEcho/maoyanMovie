import {
    getLocate,
    getHot
} from "../service/getData"

import {
    GET_LOCATE,
    GET_HOT
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
            limit: state.paging.limit,
            offset: state.paging.offset,
            ct: state.locate
        };
        const hots = await getHot(limit, offset, ct);
        commit('GET_HOT',hots); //存储热播列表
    }
}
