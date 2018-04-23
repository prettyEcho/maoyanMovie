import getJson from "./ajax"
 
const phost = process.env.PHOST; // proxy host
const controlHost = process.env.MODE;

if( controlHost !== 'db' && controlHost !== 'file' ) {
  debug('please set the correct control host');
}

if( controlHost === 'db') {
  var uhost = process.env.DHOST; // db host
}else{
  var uhost = process.env.FHOST; // file host
} 

/*
* 获取热播剧
* @param:
*
*   limit: 每页展示的条数
*   offset: 起始页
*   ct: 城市
* */

export const getHot = (limit, offset, ct) => getJson({
  type: 'get', //默认为get
  url: `${phost}/mmdb/movie/v2/list/hot.json`,
  data: `limit=${limit}&offset=${offset}&ct=${ct}` //默认为''
});

/*
* 获取当前城市
*
* */

export const getLocate = () => getJson({
  url: `${phost}/hostproxy/locate/v2/rgeo`,
  data: 'coord=40.0684,116.3036,1'
});


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
});


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
});


/*

* 待映下拉加载
* @param:
*   ci: 第几次,
*   movieIds: 电影id集合
* */

export const getComingMore = (ci, ids) => getJson({
  url: `${phost}/mmdb/movie/list/info.json`,
  data: `ci=${ci}&movieIds=${ids}`
});

/*
* 获取热门搜索
*
* */

export const getHotSearch = () => getJson({
  url: `${phost}/hostproxy/mmdb/search/movie/hotmovie/list.json`
});

/*
* 搜索关键词电影结果
*
* */

export const searchKeyword = (keyword,ci) => getJson({
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