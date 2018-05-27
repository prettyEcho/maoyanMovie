import getJson from './ajax'

const phost = process.env.PHOST // proxy host
const controlHost = process.env.MODE

if (controlHost !== 'db' && controlHost !== 'file') {
  console.log('please set the correct control host')
}

// db host or // file host
let uhost = controlHost === 'db' ? process.env.DHOST : process.env.FHOST

/*
* 获取热播剧
* @param:
*
*   limit: 每页展示的条数
*   offset: 起始页
*   ct: 城市
* */

export const getHot = (limit, offset, ct) => getJson({
  type: 'get', // 默认为get
  url: `${phost}/mmdb/movie/v2/list/hot.json`,
  data: `limit=${limit}&offset=${offset}&ct=${ct}` // 默认为''
})

/*
* 获取当前城市
*
* */

export const getLocate = () => getJson({
  url: `${phost}/hostproxy/locate/v2/rgeo`,
  data: 'coord=40.0684,116.3036,1'
})

/*
* 待映最受欢迎
* @param:
*   ci: 第几次,
*   limit: 条目
*   offset：位置
* */

export const getWish = (ci) => getJson({
  url: `${phost}/mmdb/movie/v1/list/wish/order/coming.json`,
  data: `ci=${ci}&limit=30&offset=0`
})

/*
* 待映首次加载影片
* @param:
*   ci: 城市序列号,
*   limit: 条目
*
* @return:
*   coming: 待映影片,
*   hot: 空,
*   movieIds: 后续电影id集合,
*   stid:
* */

export const getComing = (ci) => getJson({
  url: `${phost}/mmdb/movie/v2/list/rt/order/coming.json`,
  data: `ci=${ci}&limit=10`
})

/*

* 待映下拉加载
* @param:
*   ci: 第几次,
*   movieIds: 电影id集合
* */

export const getComingMore = (ci, ids) => getJson({
  url: `${phost}/mmdb/movie/list/info.json`,
  data: `ci=${ci}&movieIds=${ids}`
})

/*
* 获取热门搜索
* https://wx.maoyan.com/hostproxy/mmdb/search/movie/hotmovie/list.json
* */

export const getHotSearch = () => getJson({
  url: `${phost}/hostproxy/mmdb/search/movie/hotmovie/list.json`
})

/*
* 搜索关键词电影结果
*
* */

export const searchKeyword = (keyword, ci) => getJson({
  url: `${phost}/hostproxy/mmdb/search/integrated/keyword/list.json`,
  data: `keyword=${keyword}&almtype=1&iscorrected=false&stype=-1&ci=${ci}`
})

/**
 * 登录
 *
 * @param {string} username
 * @param {string or number} password
 */
export const Login = (username, password) => getJson({
  url: `${uhost}/login`,
  data: `username=${username}&password=${password}`
})

/**
 * 注销
 *
 */
export const Logout = () => getJson({
  url: `${uhost}/logout`
})

/**
 * 获取订单
 *
 */
export const GetOrder = () => getJson({
  url: `${uhost}/getOrder`
})

/**
 * 获取想看
 *
 */
export const GetWish = () => getJson({
  url: `${uhost}/getWish`
})

/**
 * 获取看过
 *
 */
export const GetViewed = () => getJson({
  url: `${uhost}/getViewed`
})

/**
 * 获取优惠券
 *
 */
export const GetConpon = () => getJson({
  url: `${uhost}/getConpon`
})

/**
 * 获取vip
 *
 */
export const GetVip = () => getJson({
  url: `${uhost}/getVip`
})

/**
 * 获取电影详情演员表
 * https://wx.maoyan.com/hostproxy/mmdb/v7/movie/1208942/celebrities.json
 * https://wx.maoyan.com/hostproxy/mmdb/v7/movie/248170/celebrities.json
 * 参数：
 *   id: 电影id
 */
export const GetCelebrities = (id) => getJson({
  url: `${phost}/mmdb/v7/movie/${id}/celebrities.json`
})

/**
 * 获取电影详情
 * https://wx.maoyan.com/hostproxy/mmdb/movie/v5/1208942.json?ci=1
 * https://wx.maoyan.com/hostproxy/mmdb/movie/v5/248170.json?ci=1
 * 参数：
 *   id: 电影id
 */
export const GetDetail = (id) => getJson({
  url: `${phost}/mmdb/movie/v5/${id}.json?ci=1`
})

/**
 * 获取电影详情
 * https://wx.maoyan.com/hostproxy/mmdb/comments/movie/v2/1208942.json?limit=3&offset=0&uuid=1A6E888B4A4B29B16FBA1299108DBE9CD47DBF5B6DDEF3614D607643E4DEA3CA&token=C0y7a0LKIfh_f_bFfeUmZa8cWxMAAAAAtwUAABMoE1m5fB9diEzvncgcRd4qE-MuHNwx1tSfk8q5Ktv_gsRqURYciyPVz_eGcF-KYA&userid=63866329&ci=1&clientType=wechat_small_program&channelId=40000
 * https://wx.maoyan.com/hostproxy/mmdb/comments/movie/v2/248170.json?limit=3&offset=0&uuid=1A6E888B4A4B29B16FBA1299108DBE9CD47DBF5B6DDEF3614D607643E4DEA3CA&token=C0y7a0LKIfh_f_bFfeUmZa8cWxMAAAAAtwUAABMoE1m5fB9diEzvncgcRd4qE-MuHNwx1tSfk8q5Ktv_gsRqURYciyPVz_eGcF-KYA&userid=63866329&ci=1&clientType=wechat_small_program&channelId=40000
 * 参数：
 *   id: 电影id
 */
export const GetComments = (id) => getJson({
  url: `${phost}/mmdb/comments/movie/v2/248170.json?limit=3&offset=0&uuid=1A6E888B4A4B29B16FBA1299108DBE9CD47DBF5B6DDEF3614D607643E4DEA3CA&token=C0y7a0LKIfh_f_bFfeUmZa8cWxMAAAAAtwUAABMoE1m5fB9diEzvncgcRd4qE-MuHNwx1tSfk8q5Ktv_gsRqURYciyPVz_eGcF-KYA&userid=63866329&ci=1&clientType=wechat_small_program&channelId=40000`
})
