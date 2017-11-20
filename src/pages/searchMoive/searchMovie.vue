<template>
  <section class="searchMovie">
    <section class="btn-wrap">
      <input type="text" class="search" autofocus placeholder="找影视剧、影院"><icon class="icon" type="search"></icon>
      <span class="cancel">取消</span>
    </section>
    <section class="hot-wrap">
      <h3 class="title">热门搜索</h3>
      <button class="movie" v-for="item in hotSearch" :key="item.id">{{item.nm}}</button>
    </section>
  </section>
</template>


<script>
  import {mapState,mapMutations} from 'vuex'
  import {getHotSearch} from '../../service/getData'
  import {Icon} from 'vux';

  export default{
    name: 'searchMovie',
    created(){
      getHotSearch()
        .then((val) => {
          this.GET_HOT_SEARCH(val);
      })
        .catch((e) => {
          console.log(e);
        })
    },
    beforeMount(){
      this.CHANGE_TITLE(`搜索`);  //改变标题
    },
    computed:{
      ...mapState({
        hotSearch: state => state.hotSearch  //热门搜索
      })
    },
    methods:{
      ...mapMutations([
        'CHANGE_TITLE',
        'GET_HOT_SEARCH'
      ])
    },
    components:{
      Icon
    }
  }
</script>


<style lang="less" scoped>
  @import "../../style/base";

  .searchMovie{
    height: 100%;
    background-color: @f5;
    .btn-wrap{
      position: relative;
      display: flex;
      padding: 20/@rem 0 20/@rem 25/@rem;
      border-bottom: 1px solid #e5e5e5;
      .search{
        width: 905/@rem;
        height: 80/@rem;
        padding-left: 80/@rem;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        box-shadow: 0 0 1px rgba(107, 102, 102, 0.33);
      }
      .cancel{
        width: 150/@rem;
        height: 80/@rem;
        line-height: 80/@rem;
        text-align: center;
        color: @orange;
        font-size: 40/@rem;
      }
      .icon{
        position: absolute;
        left: 40/@rem;
        top: 40/@rem;
        font-size: 40 / @rem;
      }
    }
    .hot-wrap{
      padding: 47/@rem 0 8/@rem 35/@rem ;
      background-color: #fff;
      .title{
        padding: 18/@rem 0;
        color: #858585;
      }
      .movie{
        margin: 22/@rem 30/@rem 22/@rem 0;
        padding: 20/@rem 25/@rem;
        border: 0;
        background-color: @f5;
      }
    }
  }
</style>
