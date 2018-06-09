<template>
  <div style="height: 100%">
    <animation v-if="loading"></animation>
    <!-- body -->
    <view-box v-if="!loading" class="body" ref="viewBox">
      <m-header slot="header" :myTitle="myTitle"></m-header>
      <transition name="home" mode="out-in">
        <keep-alive>
          <router-view v-if="!switchFlag"></router-view>
        </keep-alive>
      </transition>
      <m-footer slot="bottom"></m-footer>
    </view-box>
    <!-- body -->
    <!-- 组建间切换 -->
    <div v-transfer-dom>
      <loading :show="switchFlag" :text="loadingText"></loading>
    </div>
    <!-- 组建间切换 -->
  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'
import { Loading, TransferDomDirective as TransferDom } from 'vux'
import ViewBox from '../node_modules/vux/src/components/view-box/index.vue'
import mHeader from './components/header/header'
import mFooter from './components/footer/footer'
import animation from './components/common/animation'

export default {
  name: 'app',
  data () {
    return {
      loadingText: '数据加载'
    }
  },
  computed: {
    ...mapState({
      switchFlag: state => state.switch, // 切换loading标识
      myTitle: state => state.title, // 标题
      loading: state => state.loading // 开机动画
    })
  },
  methods: {
    ...mapActions([
      'locate'
    ]),
    ...mapMutations([
      'CHANGE_LOADING',
      'CHANGE_SWITCH'
    ]),
    getLoad () { // 首次加载
      let that = this
      setTimeout(() => {
        that.CHANGE_LOADING(false) // 开机动画
      }, 1500)
    }
  },
  components: {
    ViewBox,
    mHeader,
    mFooter,
    animation,
    Loading
  },
  created () {
    // this.locate();  请求当前城市失败
  },
  mounted () {
    this.getLoad() // 开机动画，加载更多
  },
  directives: {
    TransferDom
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
  padding-bottom: 180 / @rem !important;
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
