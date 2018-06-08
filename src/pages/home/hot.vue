<template>
  <div class="hot-page">
    <inner-header></inner-header>
    <inner-body></inner-body>
    <more v-if="moreFlag"></more>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import innerHeader from './children/innerHeader'
import innerBody from './children/innerBody'
import more from '../../components/common/more'
import getStyle from '../../script/getStyle'
const _ = require('lodash')

export default {
  name: 'hot',
  data () {
    return {
      moreFlag: false // 加载更多
    }
  },
  created () {
    this.UPDATE_HOT_PAGEING({ offset: 0 }) // 更新hot列表开始位置
    this.CHANGE_SWITCH(true) // 打开组件切换动画
    this.CHANGE_TITLE('猫眼电影') // 改变标题
    this.hot()// 初始化hot
  },
  mounted () {
    console.log('=========mounted')
    let scroller = document.querySelector('.hot-page')
    scroller.removeEventListener('scroll', this.throttle, false) // 取消事件监听
    scroller.addEventListener('scroll', this.throttle, false)
    this.CHANGE_SWITCH(false) // 关闭组件间跳转动画
  },
  updated () {
    console.log('=========update')
    let scroller = document.querySelector('.hot-page')
    scroller.removeEventListener('scroll', this.throttle, false) // 取消事件监听
    scroller.addEventListener('scroll', this.throttle, false)
    this.moreFlag = false // 隐藏加载更多...
  },
  computed: {
    ...mapState({
      hotMore: state => state.hot.paging.hasMore // 是否还有数据
    })
  },
  methods: {
    ...mapMutations([
      'CHANGE_TITLE',
      'CHANGE_SWITCH',
      'UPDATE_HOT_PAGEING'
    ]),
    ...mapActions([
      'hot'
    ]),
    scroll () { // 加载更多
      let scroller = document.querySelector('.hot-page')
      let scrollBody = document.querySelector('#scrollBody')

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
      if (disT <= 0 && this.hotMore) {
        this.hot() // 加载更多数据
        this.moreFlag = true // 显示加载更多...
        scroller.scrollTop += scroller.scrollTop + 30 // 增加显示更多空间
      }
    },
    throttle () {
      _.throttle(this.scroll, 800, { 'trailing': true })() // 节流
    }
  },
  components: {
    innerHeader,
    innerBody,
    more
  }
}
</script>

<style lang="less" scoped>
.hot-page {
  height: 100%;
  overflow: scroll;
  background-color: #f7f6fb;
}
</style>
