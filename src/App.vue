<template>
  <div style="height: 100%">
    <animation v-if="loading"></animation>
    <view-box v-if="!loading" class="body" ref="viewBox">
      <m-header slot="header" :myTitle="myTitle"></m-header>
      <transition name="home" mode="out-in">
        <router-view></router-view>
      </transition>
      <m-footer slot="bottom"></m-footer>
    </view-box>
  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'
import ViewBox from '../node_modules/vux/src/components/view-box/index.vue'
import mHeader from './components/header/header'
import mFooter from './components/footer/footer'
import animation from './components/common/animation'
import getStyle from './script/getStyle'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      myTitle: state => state.title, // 标题
      loading: state => state.loading, // 开机动画
    })
  },
  methods: {
    ...mapActions([
      'locate'
    ]),
    ...mapMutations([
      'CHANGE_LOADING'
    ]),
    getLoad () { // 首次加载
      let that = this
      setTimeout(() => {
        that.CHANGE_LOADING(false) // 开机动画
        that.$nextTick(() => {
          that.toPath = that.$route.path
          //that.specifyParam() // 指定参数
          //that.scroll()
        })
      }, 1500)
    },
    /* specifyParam () { // 指定参数
      if (/hot/.test(this.toPath)) {
        this.page = this.hot
        this.hasMore = this.hotMore
      } else {
        this.page = this.comingMore
        this.hasMore = this.awaitMore
      }
    } */
  },
  /*  watch: {
     hotMore: {
       handler: function (val, oldVal) {
         if (/hot/.test(this.toPath)) {
           this.hasMore = this.hotMore
         }
       },
       immediate: true
     },
     awaitMore: {
       handler: function (val, oldVal) {
         if (/await/.test(this.toPath)) {
           this.hasMore = this.awaitMore
         }
       },
       immediate: true
     }
   }, */
  components: {
    ViewBox,
    mHeader,
    mFooter,
    animation
  },
  created () {
    // this.locate();  请求当前城市失败
  },
  mounted () {
    this.getLoad() // 开机动画，加载更多
  },
  beforeRouteUpdate (to, from, next) { // tab切换时状态切换
    this.toPath = to.path
    this.specifyParam() // 指定参数
    // this.scroll()
    next()
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset';
@import './style/common';
@import './style/base';

#app {
  height: 100%;
}
.weui-tab__panel {
  padding-bottom: 318 / @rem !important;
}

.home-enter-active,
.home-leave-active {
  transition: opacity 0.3s;
}

.home-enter,
.home-leave-to {
  opacity: 0;
}

.body {
  background-color: #f7f6fb;
}
</style>
