<template>
  <section class="movie-wrap">
    <p class="title">电影／电视剧</p>
    <ul class="scroller">
      <li class="item" v-for="item in movieList">
        <section class="center">
          <h2 class="nm">{{item.nm}}</h2>
          <p class="enm">{{item.enm}}</p>
          <p class="cat">{{item.cat}}</p>
          <p class="showInfo">{{item.pubDesc}}</p>
        </section>
        <img :src="item.img.replace(/\/w.h/,'')" alt="" class="left">
        <section class="right">
          <span class="grade"><span class="mark">{{item.showst[0]}}</span>{{item.showst[1]}}</span>
          <button v-if="item.show" :class="[item.show === '预售' ? 'blue' : 'red' , 'btn']" >{{item.show}}</button>
        </section>
      </li>
    </ul>
  </section>
</template>


<script>
  import {mapState} from 'vuex'
  export default{
    name: 'childMovie',
    props:{
      movie: Object
    },
    computed:{
      movieList(){
        for(let i of this.movie.list){
          if(i.showst === 3){
            i.showst = [i.sc,'分'];
            i.show = '购票';
          }else if(i.showst === 4){
            i.showst = [i.wish,'想看'];
            i.show = '预售';
          }else{
            i.showst = [i.sc,'分'];
          }
        }
        console.log(this.movie.list);
        return this.movie.list;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../style/base';

  .movie-wrap{
    padding-left: 32 / @rem;
    border-top: 1px solid @grey;
    background-color: #fff;
    .title{
      margin-bottom: 25/@rem;
      padding-left: 35/@rem;
      height: 116/@rem;
      line-height: 116/@rem;
      border-bottom: 1px solid #e5e5e5;
      color: @movieInfo;
      font-size: 38/@rem;
    }
    .item{
      padding: 50/@rem 0 50/@rem;
      border-bottom: 1px solid @grey;
      .clearfix;
      .title{
        padding-bottom: 30/@rem;
      }
      .left{
        float: left;
        width: 185 / @rem;
        height: 255 / @rem;
        margin-left: -100%;
      }
      .center{
        position: relative;
        float: left;
        width: 100%;
        height: 255 / @rem;
        padding-left: 225/@rem;
        padding-right: 180/@rem;
        .nm{
          font-weight: 400;
          font-size: 42 / @rem;
          .ellipsis;
        }
        .enm{
          color: @movieInfo;
          padding: 5/@rem 0;
        }
        .cat{
          color: @movieInfo;
          padding: 5/@rem 0;
          .ellipsis;
        }
        .showInfo{
          color: @showInfo;
          padding: 5/@rem 0;
        }
        &:after{
          content: '';
          position: absolute;
          top: 87 / @rem;
          left: 52 / @rem;
          width: 80 / @rem;
          height: 80 / @rem;
          z-index: 999999;
          background: url("../../../images/sprite.png") no-repeat -160/@rem 0;
          background-size: 320 / @rem 240 / @rem;
        }
      }
      .right{
        position: relative;
        float: left;
        width: 160 / @rem;
        height: 255 / @rem;
        margin-left: -160 / @rem;
        .grade{
          position: absolute;
          right: 30 / @rem;
          color: @mark;
          font-size: 30 / @rem;
          white-space: nowrap;
          .mark{
            font-size: 46 / @rem;
          }
        }
        .btn{
          position: absolute;
          top: 130 / @rem;
          width: 130 / @rem;
          height: 80 / @rem;
          border-radius: 4px;
          font-size: 10px;
          border: 0;
          color: #fff;
        }
        .blue{
          background-color: @btn-blue;
        }
        .red{
          background-color: @btn-red;
        }
      }
    }
  }
</style>
