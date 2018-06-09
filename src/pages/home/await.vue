<template>
  <div class="await-page">
    <inner-header></inner-header>
    <recent></recent>
    <inner-body></inner-body>
    <more v-if="moreFlag"></more>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import innerHeader from './children/innerHeader'
import recent from './children/recent'
import innerBody from './children/innerBody'
import more from '../../components/common/more'
import getStyle from '../../script/getStyle'
const _ = require('lodash')

export default {
  name: 'await',
  data () {
    return {
      moreFlag: false // 加载更多
    }
  },
  created () {
    this.UPDATE_COMING_PAGEING({ offset: 10 }) // 更新coming加载更多列表开始位置
    this.wish() // 获取最受欢迎
    this.CHANGE_TITLE('猫眼电影') // 改变标题
    this.$nextTick(() => {
      this.CHANGE_SWITCH(false) // 关闭组件间跳转动画
    })
    this.coming() // 获取待映第一屏
  },
  mounted () {
    let scroller = document.querySelector('.await-page')
    scroller.addEventListener('scroll', _.throttle(this.scroll, 500, { 'trailing': true }), false)
    this.CHANGE_SWITCH(false) // 关闭组件间跳转动画
  },
  updated () {
    this.$nextTick(() => {
      this.moreFlag = false // 隐藏加载更多...
    })
  },
  computed: {
    ...mapState({
      awaitMore: state => state.coming.paging.hasMore // 是否还有数据
    })
  },
  methods: {
    ...mapMutations([
      'CHANGE_TITLE',
      'CHANGE_SWITCH',
      'UPDATE_COMING_PAGEING'
    ]),
    ...mapActions([
      'wish',
      'coming',
      'comingMore'
    ]),
    scroll () { // 加载更多
      let scroller = document.querySelector('.await-page')
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
      if (disT <= 0 && this.awaitMore) {
        this.comingMore() // 加载更多数据
        this.moreFlag = true // 显示加载更多...
        // scroller.scrollTop += scroller.scrollTop + 30 // 增加显示更多空间
      }
    }
  },
  components: {
    innerHeader,
    innerBody,
    recent,
    more
  }
}
</script>

<style lang="less" scoped>
@import '../../style/base';

.await-page {
  height: 100%;
  overflow: scroll;
  background-color: @body;
}
</style>
