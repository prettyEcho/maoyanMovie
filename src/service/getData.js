import getJson from "./ajax"


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
  url: '/echo/mmdb/movie/v2/list/hot.json',
  data: `limit=${limit}&offset=${offset}&ct=${ct}` //默认为''
});


/*
* 获取城市列表
*
* */

export const getCities = () => getJson({
  url: '/echo/hostproxy/dianying/cities.json'
});


/*
* 获取当前城市
*
* */

export const getLocate = () => getJson({
  url: '/echo/hostproxy/locate/v2/rgeo',
  data: 'coord=40.0684,116.3036,1'
});
