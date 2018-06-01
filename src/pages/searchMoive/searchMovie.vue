<template>
  <section class="searchMovie">
    <section class="btn-wrap">
      <input type="text" class="search" autofocus placeholder="找影视剧、影院" v-model="keyword"><icon class="icon" type="search"></icon>
      <span class="cancel" @click="cancel">取消</span>
    </section>
    <section class="body-wrap">
      <!--热门搜索-->
      <section class="hot-wrap">
        <h3 class="title">热门搜索</h3>
        <button class="movie" v-for="item in hotSearch" :key="item.id">{{item.nm}}</button>
      </section>
      <!--提示搜索-->
      <section v-if="point" class="point">
        您要找的是不是<mark class="mark">{{point}}</mark>
      </section>
      <!--电影／电视剧-->
      <child-movie v-if="JSON.stringify(searchMovie) !== '{}'" :movie="searchMovie"></child-movie>
      <!--电影院-->
      <!--<child-theater v-if="JSON.stringify(searchTheater) === '{}'" :theater="searchTheater"></child-theater>-->
    </section>
  </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getHotSearch, searchKeyword} from '../../service/getData'
import {Icon} from 'vux'
import childMovie from './children/childMovie'
import childTheater from './children/childTheater'

export default{
  name: 'searchMovie',
  data () {
    return {
      keyword: '' // 关键词
    }
  },
  created () {
    // 搜索热门电影
    getHotSearch()
      .then((val) => {
        this.GET_HOT_SEARCH(val)
      })
      .catch((e) => {
        console.error(e)
      })
  },
  beforeMount () {
    this.CHANGE_TITLE(`搜索`) // 改变标题
  },
  computed: {
    ...mapState({
      hotSearch: state => state.hotSearch, // 热门搜索
      locate: state => state.locate, // 当前城市
      searchMovie: state => state.searchMovie, // 电影
      searchTheater: state => state.searchTheater, // 电影院
      point: state => state.point // 关键词提示
    })
  },
  methods: {
    ...mapMutations([
      'CHANGE_TITLE',
      'GET_HOT_SEARCH',
      'SEARCH_KEYWORD'
    ]),
    cancel () {
      this.keyword = ''
    }
  },
  components: {
    Icon,
    childMovie,
    childTheater
  },
  watch: {
    keyword (newVal) {
      if (newVal) {
        // 搜索关键词
        setTimeout(() => {
          searchKeyword(newVal, this.locate.ci)
            .then((val) => {
              this.SEARCH_KEYWORD(val)
            })
            .catch((e) => {
              console.error(e)
            })
        }, 500)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .searchMovie{
    height: 100%;
    background-color: @f5;
    .btn-wrap{
      position: fixed;
      top: 130/@rem;
      display: flex;
      padding: 20/@rem 0 20/@rem 25/@rem;
      border-bottom: 1px solid #e5e5e5;
      background-color: #fff;
      z-index: 1000;
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
    .body-wrap{
      margin-top: 130/@rem;
      .point{
        margin-bottom: 25/@rem;
        padding-left: 35/@rem;
        height: 116/@rem;
        line-height: 116/@rem;
        border-bottom: 1px solid #e5e5e5;
        color: #858585;
        font-size: 38/@rem;
        .mark{
          padding: 2px;
          color: @orange;
          font-size: 38/@rem;
          background-color: #ffeaf9;
        }
      }
    }
  }
</style>
