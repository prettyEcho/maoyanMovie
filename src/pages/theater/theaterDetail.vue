<template>
  <section class="theater-detial">
    <!-- 电影院详情头部 -->
    <section class="theater-header">
      <h5 class="theater-header-name">{{detail.cinemaName}}</h5>
      <p class="theater-header-addr">{{addr}}</p>
    </section>
    <!-- 电影院详情头部 -->
    <!-- 电影院详情goods -->
    <section class="theater-goods">
    </section>
    <!-- 电影院详情goods -->
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { CinemaMovies, CinemaAddr } from '../../service/getData'

export default {
  name: 'search-theater',
  data () {
    return {
      detail: {}, // 电影院详情
      addr: '' // 电影院地址
    }
  },
  computed: {
    ...mapState({
      locate: state => state.locate,
      cinemaId: state => state.cinemaId
    })
  },
  methods: {
    ...mapMutations([
      'CHANGE_TITLE'
    ])
  },
  created () {
    this.CHANGE_TITLE('影院') // 更改标题
    CinemaMovies(this.cinemaId, this.locate.ci).then(res => {
      let { data } = JSON.parse(res)
      this.detail = data
    })

    CinemaAddr(this.cinemaId).then(res => {
      let { data } = JSON.parse(res)
      this.addr = data.addr
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../style/base';

.theater-detial {
  .theater-header {
    padding: 40 / @rem;
    border-bottom: 1px solid #d4d3d3;
    .theater-header-name {
      font-size: 40 / @rem;
      color: #000;
    }
    .theater-header-addr {
      font-size: 28 / @rem;
      color: #b9b9b9;
      font-weight: 400;
    }
  }
}
</style>
