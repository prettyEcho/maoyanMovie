<template>
  <header>
    <nav class="nav">
      <ul class="wrap">
        <li class="tab"
            :class="{active: item.name === navTitle}"
            v-for="item in nav">
          <router-link :to="{name: item.mark}">{{item.name}}</router-link>
        </li>
      </ul>
    </nav>
    <div class="city">
      <span class="local">{{locate}}</span>
    </div>
    <div class="search">
      <icon class="icon" type="search"></icon>
    </div>
  </header>
</template>

<script>
  import {Icon, Box} from 'vux';
  import {mapState} from 'vuex'

  export default {
    name: 'innerHeader',
    data(){
      return {
        nav: [
          {
            name: '热映',
            mark: 'hot'
          },
          {
            name: '待映',
            mark: 'await'
          }
        ] //导航
      }
    },
    computed:{
      ...mapState({
        locate: state => state.locate, //当前城市
      }),
      navTitle() {
       return  /\hot/.test(this.$route.path) ? '热映' : '待映';
      }
    },
    components:{
      Icon
    },
    mounted(){
      console.log(this.$route.path);
    }
  }
</script>

<style lang="less" scoped>

  @import "../../../style/base";

  header{
    height: 130 / @rem;
  }
  .nav{
    float: left;
    width: 100%;
    height: 130 / @rem;
  }
  .city{
    float: left;
    width: 180 / @rem;
    height: 130 / @rem;
    line-height: 130 / @rem;
    text-align: center;
    margin-left: -100%;
    color: @cityC;
    .local{
      &:after{
        content: '';
        position: relative;
        top: 8px;
        left: 5px;
        .triangle-bottom(12/@rem, #cacaca);
      }
    }
  }
  .search{
    float: left;
    width: 130 / @rem;
    height: 130 / @rem;
    line-height: 130 / @rem;
    margin-left: -130 / @rem;
    border-left: 1px solid @grey;
    text-align: center;
    .icon{
      font-size: 50 / @rem;
      color: @orange;
    }
  }
  .wrap{
    margin: 0 auto;
    overflow: hidden;
    width: 436 / @rem;
    .tab{
      float: left;
      width: 130 / @rem;
      height: 110 / @rem;
      line-height: 120 / @rem;
      margin: 0 44/@rem;
      text-align: center;
      font-weight: bold;
      a{
        color: #8e8e8e;
      }
    }
    .active{
      border-bottom: 1px solid @orange;
      a{
        color: @orange;
      }
    }
  }
</style>
