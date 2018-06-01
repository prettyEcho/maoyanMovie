export default {
  hotCities (state) { // 热门城市
    return state.cities.slice(0, 11)
  },
  cityList (state) { // 城市列表
    let objWrap = {}
    for (let i = 65; i < 91; i++) {
      let temp = state.cities.filter(item => item.py.toUpperCase().charCodeAt(0) === i)
      if (temp.length) {
        Object.defineProperty(objWrap, String.fromCharCode(i), {
          value: temp,
          configurable: true,
          enumerable: true,
          writable: true
        })
      }
    }

    return objWrap
  }
}
