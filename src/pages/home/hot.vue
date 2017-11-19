<template>
  <div class="hot-page">
    <inner-header></inner-header>
    <inner-body></inner-body>
    <more v-if="moreFlag"></more>
  </div>
</template>

<script>
  import {mapMutations,mapActions} from 'vuex'
  import innerHeader from './children/innerHeader'
  import innerBody from './children/innerBody'
  import more from '../../components/common/more'

  export default{
    name: 'hot',
    data(){
      return {
      }
    },
    created(){
      this.hot(); //初始化hot
    },
    beforeMount(){
      this.CHANGE_TITLE('猫眼电影');  //改变标题
    },
    computed:{
      moreFlag(){
        return this.$store.state.more //加载更多
      }
    },
    methods: {
      ...mapMutations([
        'CHANGE_TITLE',
        'CHANGE_SWITCH'
      ]),
      ...mapActions([
        'hot'
      ])
    },
    components: {
      innerHeader,
      innerBody,
      more
    },
    beforeRouteLeave(to, from, next){
      //this.CHANGE_SWITCH(true); //打开组件间跳转动画
      next();
    }
  }
</script>

<style lang="less" scoped>

  .hot-page{
    background-color: #f7f6fb;
  }

</style>
