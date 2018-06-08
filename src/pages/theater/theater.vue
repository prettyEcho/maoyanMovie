<template>
  <section class="theater">
    <section class="scrollBody">
      <section class="theater-header">
        <!-- 城市选择 -->
        <div class="city">
          <router-link class="local" :to="{name: 'city'}">{{locate.city}}</router-link>
        </div>
        <!-- 城市选择 -->
        <!-- 搜索框 -->
        <section class="theater-search">
          <input type="text" class="search" placeholder="找影院" disabled>
          <icon class="icon" type="search"></icon>
        </section>
        <!-- 搜索框 -->
      </section>
      <!-- 影院列表 -->
      <ul class="theater-list">
        <li class="theater-item" v-for="item in cinemas" :key="item.id">
          <h5 class="theater-name">
            {{item.nm}}
            <span class="theater-sellPrice">{{item.sellPrice}}</span>
          </h5>
          <p class="theater-addr">{{item.addr}}</p>
          <p class="theater-labels">
            <span class="theater-label" v-for="label in item.labels" :key="label.name">{{label.name}}</span>
          </p>
          <p class="theater-favourable" v-if="item.promotion.cardPromotionTag">
            <span class="theater-favourable-label">卡</span>
            {{item.promotion.cardPromotionTag}}
          </p>
        </li>
      </ul>
      <!-- 影院列表 -->
    </section>
    <!-- more -->
    <more v-if="moreFlag"></more>
    <!-- more -->
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { GetCinemas } from '../../service/getData'
import getStyle from '../../script/getStyle'
import more from '../../components/common/more'
import { Icon } from 'vux'
const _ = require('lodash')

export default {
  name: 'theater',
  data () {
    return {
      cinemas: [], // cinemas list
      moreFlag: false, // 加载更多
      hasMore: true // 是否还有更多
    }
  },
  computed: {
    ...mapState({
      locate: state => state.locate, // 当前城市
      offset: state => state.cinemaOffset // cinema offset
    })
  },
  methods: {
    ...mapMutations([
      'CHANGE_TITLE',
      'UPDATE_CINEMA_OFFSET'
    ]),
    scroll () {
      let scroller = document.querySelector('.theater')
      let scrollBody = document.querySelector('.scrollBody')

      let scrollerHeight, // 滚动条元素高度
        bodyHeight, // 滚动体元素高度
        scrollerTop, // 滚动条元素滚动高度
        disT // 高度差

      // 高度计算
      scrollerHeight = parseFloat(getStyle(scroller).height)
      bodyHeight = parseFloat(getStyle(scrollBody).height)
      scrollerTop = scroller.scrollTop
      disT = Math.round(bodyHeight - scrollerHeight - scrollerTop) // 高度差
      if (disT > 0) { return }
      // 判断是否到底
      if (disT <= 0 && this.hasMore) {
        // 加载更多数据
        GetCinemas(this.locate.ci, 12, this.offset).then(res => {
          let { data } = JSON.parse(res)
          let offset = data.paging.offset + 12
          this.cinemas = this.cinemas.concat(data.cinemas)
          this.hasMore = data.paging.hasMore
          this.UPDATE_CINEMA_OFFSET(offset) // 更新开始位置
        })
        this.moreFlag = true // 显示加载更多...
        scroller.scrollTop += scroller.scrollTop + 30 // 增加显示更多空间
      }
    },
    throttle () {
      _.throttle(this.scroll, 800, { 'trailing': true })() // 节流
    }
  },
  created () {
    this.UPDATE_CINEMA_OFFSET(0) // 初始化theater列表开始位置
    this.CHANGE_TITLE('影院') // 更改标题
    GetCinemas(this.locate.ci, 12, this.offset).then(res => {
      let { data } = JSON.parse(res)
      let offset = data.paging.offset + 12
      this.cinemas = data.cinemas
      this.hasMore = data.paging.hasMore
      this.UPDATE_CINEMA_OFFSET(offset) // 更新开始位置
    })
  },
  mounted () {
    let scroller = document.querySelector('.theater')
    scroller.removeEventListener('scroll', this.throttle, false) // 取消事件监听
    scroller.addEventListener('scroll', this.throttle, false)
  },
  updated () {
    let scroller = document.querySelector('.theater')
    scroller.removeEventListener('scroll', this.throttle, false) // 取消事件监听
    scroller.addEventListener('scroll', this.throttle, false)
    this.moreFlag = false // 隐藏加载更多...
  },
  components: {
    Icon,
    more
  }
}
</script>

<style lang="less" scoped>
@import '../../style/base';

.theater {
  height: 100%;
  overflow: scroll;
}

.theater-header {
  width: 100%;
  height: 130 / @rem;
  background-color: #fff;
  display: flex;
  padding: 24 / @rem;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
  z-index: 1000;
  .city {
    width: 150 / @rem;
    height: 76 / @rem;
    line-height: 76 / @rem;
    text-align: left;
    .local {
      color: @cityC;
      font-size: 34 / @rem;
      &:after {
        content: '';
        position: relative;
        top: 8px;
        left: 5px;
        .triangle-bottom(12/@rem, #cacaca);
      }
    }
  }
  .theater-search {
    position: relative;
    .search {
      width: 874 / @rem;
      height: 80 / @rem;
      padding-left: 400 / @rem;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
    }
    .icon {
      position: absolute;
      left: 340 / @rem;
      top: 20 / @rem;
      font-size: 40 / @rem;
      color: #cfcfcf;
    }
  }
}

.theater-list {
  padding-left: 34 / @rem;
  background-color: #ffffff;
  .theater-item {
    padding: 54 / @rem 0;
    border-bottom: 1px solid #dddddd;
    .theater-name {
      font-size: 42 / @rem;
    }
    .theater-sellPrice {
      padding-left: 20 / @rem;
      font-size: 36 / @rem;
      color: #dd4039;
      &::after {
        content: '元起';
        color: #dd4039;
        font-size: 26 / @rem;
      }
    }
    .theater-addr {
      padding: 20 / @rem 0;
      font-size: 36 / @rem;
    }
    .theater-labels {
      .theater-label {
        margin-right: 12 / @rem;
        padding: 12 / @rem;
        font-size: 28 / @rem;
        color: #ff9900;
        border: 1px solid #ff9900;
        border-radius: 2px;
      }
    }
    .theater-favourable {
      padding: 20 / @rem 0 0;
      font-size: 26 / @rem;
      color: #a6a6a6;
      .theater-favourable-label {
        font-size: 28 / @rem;
        color: #fff8eb;
        background-color: #a877e0;
        border: 1px solid #a877e0;
        border-radius: 2px;
      }
    }
  }
}
</style>
