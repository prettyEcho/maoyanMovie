import {
  CHANGE_LOADING,
  CHANGE_SWITCH,
  CHANGE_TITLE,
  GET_COMING,
  GET_HOT,
  GET_LOCATE,
  GET_WISH,
  GET_COMING_MORE,
  GET_HOT_SEARCH,
  GET_CITIES,
  RECENT_CITIES,
  SEARCH_KEYWORD,
  CHANGE_MOVIEID
} from './mutation-types'

export default {

  // 改变loading
  [CHANGE_LOADING] (state, val) {
    state.loading = val
  },

  // 改变switch
  [CHANGE_SWITCH] (state, val) {
    state.switch = val
  },

  // 改变title
  [CHANGE_TITLE] (state, val) {
    state.title = val
  },

  // 储存hot
  [GET_HOT] (state, val) {
    const json = JSON.parse(val)
    state.hot.hot = state.hot.hot.concat(json.data.hot)
    state.hot.paging = json.data.paging
    state.hot.paging.offset += state.hot.paging.limit
  },

  // 储存当前城市
  [GET_LOCATE] (state, val) {
    state.locate = val
  },

  // 储存城市列表
  [GET_CITIES] (state, val) {
    state.cities = val
  },

  // 储存待映最受欢迎
  [GET_WISH] (state, val) {
    const json = JSON.parse(val)
    state.wish.coming = json.data.coming
  },

  // 储存待映第一屏
  [GET_COMING] (state, val) {
    const json = JSON.parse(val)
    let title = ''
    title = json.data.coming[0].comingTitle
    for (let i = 1; i < json.data.coming.length; i++) {
      if (title !== json.data.coming[i].comingTitle) {
        title = json.data.coming[i].comingTitle
      } else {
        json.data.coming[i].comingTitle = ''
      }
    }
    state.coming.coming = json.data.coming
    state.coming.movieIds = json.data.movieIds
  },

  // 储存待映跟多
  [GET_COMING_MORE] (state, val) {
    const json = JSON.parse(val)
    let len, // movieIds长度
      end, // 下一页的开始
      title
    state.coming.coming = state.coming.coming.concat(json.data.movies)
    title = state.coming.coming[0].comingTitle
    for (let i = 1; i < state.coming.coming.length; i++) {
      if (title !== state.coming.coming[i].comingTitle) {
        title = state.coming.coming[i].comingTitle
      } else {
        state.coming.coming[i].comingTitle = ''
      }
    }
    state.coming.paging.offset += state.coming.paging.limit

    len = state.coming.movieIds.length
    end = state.coming.paging.offset

    if (len <= end) {
      state.coming.paging.hasMore = false
    }
  },

  // 获取热门搜索
  [GET_HOT_SEARCH] (state, val) {
    let json = JSON.parse(val)
    state.hotSearch = json.data
  },

  // 最近访问城市
  [RECENT_CITIES] (state, val) {
    if (state.recentCities.length >= 2) {
      state.recentCities.splice(1, 1)
    }
    state.recentCities.unshift(val)
  },

  // 搜索关键词电影结果
  [SEARCH_KEYWORD] (state, val) {
    const json = JSON.parse(val)
    state.point = json.correctionV2
    state.searchMovie = {} // 清空
    state.searchTheater = {} // 清空
    for (let i of json.data) {
      if (i.type === 0) {
        state.searchMovie = i
      } else if (i.type === 2) {
        state.searchTheater = i
      }
    }
  },

  // 改变电影id
  [CHANGE_MOVIEID] (state, val) {
    state.movieId = val
  }
}
