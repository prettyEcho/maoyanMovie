<template>
    <view-box class="body">
      <div v-if="animate">动画</div>
      <m-header v-if="!animate" slot="header" :myTitle="myTitle"></m-header>
      <router-view v-if="!animate" ></router-view>
      <inner-footer v-if="!animate" slot="bottom"></inner-footer>
    </view-box>
</template>

<script>

import {mapState,mapMutations,mapActions} from 'vuex';
import ViewBox from "../node_modules/vux/src/components/view-box/index.vue";
import mHeader from "./components/header/header"
import innerFooter from './components/footer/footer'

export default {
  name: 'app',
  data(){
    return {
      animate: true
    }
  },
  computed:{
    ...mapState({
      myTitle: state => state.title
    })
  },

  methods: {
    ...mapActions([
        'hot'
    ])
  },
  components: {
    ViewBox,
    mHeader,
    innerFooter
  },
  mounted(){
    this.animate = false;
    this.hot();
  },
}
</script>

<style lang="less">

  @import '~vux/src/styles/reset';
  @import "./style/common";
  @import "./style/base";

  #app{
    height: 100%;
  }
  .body{
    padding-bottom: 160 / @rem;
  }

</style>
