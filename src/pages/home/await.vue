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

export default {
  name: 'await',
  data () {
    return {
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
  },
  computed: {
    ...mapState({
      switchFlag: state => state.switch, // 切换loading标识
      moreFlag: state => state.more // 加载更多
    })
  },
  methods: {
    ...mapMutations([
      'CHANGE_TITLE',
      'CHANGE_SWITCH'
    ]),
    ...mapActions([
      'wish',
      'coming'
    ])
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
  background-color: @body;
}
</style>
