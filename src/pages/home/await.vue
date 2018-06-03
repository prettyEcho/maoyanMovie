<template>
  <div class="await-page">
    <loading v-if="switchFlag"></loading>
    <inner-header v-show="!switchFlag"></inner-header>
    <recent v-show="!switchFlag"></recent>
    <inner-body v-show="!switchFlag"></inner-body>
    <more v-if="moreFlag"></more>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import innerHeader from './children/innerHeader'
import recent from './children/recent'
import innerBody from './children/innerBody'
import loading from '../../components/common/switch'
import more from '../../components/common/more'
import getStyle from '../../script/getStyle'

export default {
  name: 'await',
  data () {
    return {
      moreFlag: false // 加载更多      
    }
  },
  created () {
    this.wish() // 获取最受欢迎   
    this.CHANGE_TITLE('猫眼电影') // 改变标题
    this.CHANGE_SWITCH(true) // 打开组件间跳转动画    
    this.coming().then(() => { // 获取待映第一屏
      setTimeout(() => {
        this.CHANGE_SWITCH(false) // 关闭组件间跳转动画
      }, 500)
    })
  },
  mounted () {
    console.log('here')
    let scroller = document.querySelector('.await-page')
    scroller.addEventListener('scroll', this.scroll, false)
  },
  updated () {
    let scroller = document.querySelector('.await-page')
    scroller.addEventListener('scroll', this.scroll, false)
    this.moreFlag = false // 隐藏加载更多...
    scroller.style.height = parseFloat(getStyle(scroller).height) + 30 + 'px' // 取消显示更多空间
  },
  computed: {
    ...mapState({
      switchFlag: state => state.switch, // 切换loading标识
      awaitMore: state => state.coming.paging.hasMore // 是否还有数据     
    })
  },
  methods: {
    ...mapMutations([
      'CHANGE_TITLE',
      'CHANGE_SWITCH'
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
      console.log(disT)
      if (disT > 0) { return }
      // 判断是否到底
      if (disT <= 0 && this.awaitMore) {
        this.comingMore() // 加载更多数据
        this.moreFlag = true // 显示加载更多...
        scroller.scrollTop += scroller.scrollTop + 30 + 'px' //增加显示更多空间
        scroller.style.height = scrollerHeight - 30 + 'px'
        scroller.removeEventListener('scroll', this.scroll, false) // 取消事件监听
      }
    }
  },
  components: {
    innerHeader,
    innerBody,
    recent,
    loading,
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
