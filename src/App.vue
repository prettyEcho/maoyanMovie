<template>
    <div style="height: 100%">
      <animation v-if="loading"></animation>
      <view-box v-if="!loading" class="body" ref="viewBox">
        <m-header slot="header" :myTitle="myTitle"></m-header>
        <transition name="home" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
        <inner-footer slot="bottom" v-if="$route.meta.footerRequire"></inner-footer>
      </view-box>
    </div>
</template>

<script>

import {mapState,mapMutations,mapActions} from 'vuex';
import ViewBox from "../node_modules/vux/src/components/view-box/index.vue";
import mHeader from "./components/header/header"
import innerFooter from './components/footer/footer'
import animation from './components/common/animation'
import getStyle from './script/getStyle'

export default {
  name: 'app',
  data(){
    return {
      page: this.hot,  //当前组件的数据调取
      hasMore: false, //当前组件的加载更多,对象为了实现引用
      toPath: '', //目标路由的path
    }
  },
  computed:{
    ...mapState({
      myTitle: state => state.title,  //标题
      loading: state => state.loading, //开机动画
      hotMore: state => state.hot.paging.hasMore,  //是否还有数据
      awaitMore: state => state.coming.paging.hasMore //是否还有数据
    }),
  },
  methods: {
    ...mapActions([
        'hot',
        'comingMore',
        'locate'
    ]),
    ...mapMutations([
      'CHANGE_LOADING',
      'CHANGE_MORE'
    ]),
    getLoad(){ //首次加载
      let that = this;
      setTimeout(() => {
        that.CHANGE_LOADING(false); //开机动画
        that.$nextTick(() => {
          that.toPath = that.$route.path;
          that.specifyParam(); //指定参数
          that.scroll();
        })
      },1500);
    },
    scroll(){     //加载更多
      const scrollBody =  this.$refs.viewBox.getScrollBody(),
            that = this;

      scrollBody.addEventListener('scroll', scrollFn, false);

      function scrollFn(){
        let scrollerHeight,
            bodyHeight,
            offsetT,
            disT;
        const scroller = scrollBody.firstElementChild;
          //获取数据
        bodyHeight = parseFloat(getStyle(scrollBody).height) - parseFloat(getStyle(scrollBody).paddingBottom);
        scrollerHeight = parseFloat(getStyle(scroller).height);
        disT = Math.round(scrollerHeight - bodyHeight);
        offsetT = that.$refs.viewBox.getScrollTop();

        //判断是否到底
        if(disT === offsetT && that.hasMore){
          let newT = disT + 30;
          that.CHANGE_MORE(true);  //显示加载更多...
          that.$refs.viewBox.scrollTo(newT);  //增加显示更多的空间
          that.page();  //加载数据
        }
      }
    },
    specifyParam(){ //指定参数
      if(/\hot/.test(this.toPath)){
        this.page = this.hot;
        this.hasMore = this.hotMore;
      }else{
        this.page = this.comingMore;
        this.hasMore = this.awaitMore;
      }
    }
  },
  watch:{
    hotMore: {
      handler: function(val, oldVal){
        if(/\hot/.test(this.toPath)){
          this.hasMore = this.hotMore;
        }
      },
      immediate: true
    },
    awaitMore: {
      handler: function(val, oldVal){
        if(/\await/.test(this.toPath)){
          this.hasMore = this.awaitMore;
        }
      },
      immediate: true
    }
  },
  components: {
    ViewBox,
    mHeader,
    innerFooter,
    animation
  },
  created(){
   // this.locate();  请求当前城市失败
  },
  mounted(){
    this.getLoad(); //开机动画，加载更多
  },
  beforeRouteUpdate(to, from, next){  //tab切换时状态切换
    this.toPath = to.path;
    this.specifyParam(); //指定参数
    //this.scroll();
    next();
  }
}
</script>

<style lang="less">

  @import '~vux/src/styles/reset';
  @import "./style/common";
  @import "./style/base";

  #app{
    height: 100%;
  }
  .weui-tab__panel{
    padding-bottom: 180 / @rem !important;
  }

  .home-enter-active, .home-leave-active{
    transition: opacity .3s;
  }

  .home-enter, .home-leave-to{
    opacity: 0;
  }
</style>
